import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Undo2, Eye, EyeOff, Palette, Volume2 } from 'lucide-react';
import { speechService } from '../utils/speech';

interface StrokeCanvasProps {
  char: string;
  pinyin?: string;
  meaning?: string;
  hanViet?: string;
}

export const StrokeCanvas: React.FC<StrokeCanvasProps> = ({
  char,
  pinyin,
  meaning,
  hanViet,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [brushColor, setBrushColor] = useState('#1e293b'); // Dark slate ink
  const [brushWidth, setBrushWidth] = useState(12);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const STROKE_RULES = [
    { title: 'Ngang trước, sổ sau (先横后竖)', example: '十 (Thập: 一 rồi 丨)' },
    { title: 'Phẩy trước, mác sau (先撇后捺)', example: '八 (Bát: 丿 rồi 捺)' },
    { title: 'Trên trước, dưới sau (从上到下)', example: '三 (Tam: trên xuống dưới)' },
    { title: 'Trái trước, phải sau (从左到右)', example: '你 (Nhĩ: bộ Nhân rồi chữ Nhĩ)' },
    { title: 'Ngoài trước, trong sau (先外后内)', example: '月 (Nguyệt: khung ngoài rồi nét trong)' },
    { title: 'Vào trước, đóng sau (先进入后关门)', example: '回, 国 (Vào khung, viết ruột, rồi đóng đáy)' },
    { title: 'Giữa trước, hai bên sau (先中间后两边)', example: '小, 水 (Sổ móc giữa rồi 2 bên)' },
  ];

  // Draw traditional Mi Zi Ge (米字格) red grid background
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    // Clear
    ctx.fillStyle = '#fffdf7'; // Warm Xuan paper tone
    ctx.fillRect(0, 0, width, height);

    // Outer border
    ctx.strokeStyle = '#e11d48'; // Cinnabar red
    ctx.lineWidth = 2.5;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    // Inner dashed guide lines
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // Horizontal center
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical center
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Diagonals (X shape for Mi Zi Ge)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();

    ctx.restore();
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawGrid(ctx, canvas.width, canvas.height);
    // Save blank state
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, [drawGrid]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas, char]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), imageData]); // Keep up to 15 states
  };

  const handleUndo = () => {
    if (history.length <= 1) {
      handleClear();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const prevState = newHistory[newHistory.length - 1];
    if (prevState) {
      ctx.putImageData(prevState, 0, 0);
      setHistory(newHistory);
    }
  };

  const handleClear = () => {
    initCanvas();
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
              米字格 • Ô chữ Mễ
            </span>
            <span className="text-xs text-stone-500">Tập viết theo quy tắc bút thuận</span>
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <h3 className="text-2xl font-bold font-serif text-stone-900">{char}</h3>
            {pinyin && <span className="text-base text-rose-600 font-medium">{pinyin}</span>}
            {hanViet && (
              <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                Hán Việt: {hanViet}
              </span>
            )}
          </div>
          {meaning && <p className="text-sm text-stone-600 mt-0.5">{meaning}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => speechService.speak(char)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            title="Nghe phát âm chuẩn"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            <span>Phát âm</span>
          </button>
          <button
            onClick={() => setShowRulesModal(!showRulesModal)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 cursor-pointer"
          >
            7 Quy tắc viết
          </button>
        </div>
      </div>

      {/* Canvas container with ghost overlay */}
      <div className="relative mx-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] select-none touch-none rounded-xl overflow-hidden shadow-inner border border-rose-200">
        {/* Ghost character guide underneath */}
        {showGuide && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-rose-200 font-serif leading-none"
            style={{ fontSize: '210px', opacity: 0.4 }}
          >
            {char}
          </div>
        )}

        {/* Real drawing canvas */}
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Controls toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
        {/* Color and size palette */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-stone-400" />
            <button
              onClick={() => setBrushColor('#1e293b')}
              className={`w-6 h-6 rounded-full bg-slate-900 border-2 transition-transform cursor-pointer ${
                brushColor === '#1e293b' ? 'scale-110 border-rose-500 ring-2 ring-rose-200' : 'border-transparent'
              }`}
              title="Mực đen thư pháp"
            />
            <button
              onClick={() => setBrushColor('#e11d48')}
              className={`w-6 h-6 rounded-full bg-rose-600 border-2 transition-transform cursor-pointer ${
                brushColor === '#e11d48' ? 'scale-110 border-slate-900 ring-2 ring-rose-200' : 'border-transparent'
              }`}
              title="Son chu sa đỏ"
            />
            <button
              onClick={() => setBrushColor('#0284c7')}
              className={`w-6 h-6 rounded-full bg-sky-600 border-2 transition-transform cursor-pointer ${
                brushColor === '#0284c7' ? 'scale-110 border-slate-900 ring-2 ring-sky-200' : 'border-transparent'
              }`}
              title="Mực lam"
            />
          </div>

          <div className="h-4 w-px bg-stone-200" />

          {/* Brush thickness */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setBrushWidth(8)}
              className={`px-2 py-0.5 text-xs rounded transition cursor-pointer ${
                brushWidth === 8 ? 'bg-stone-800 text-white font-medium' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Nét mảnh
            </button>
            <button
              onClick={() => setBrushWidth(13)}
              className={`px-2 py-0.5 text-xs rounded transition cursor-pointer ${
                brushWidth === 13 ? 'bg-stone-800 text-white font-medium' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Chuẩn
            </button>
            <button
              onClick={() => setBrushWidth(18)}
              className={`px-2 py-0.5 text-xs rounded transition cursor-pointer ${
                brushWidth === 18 ? 'bg-stone-800 text-white font-medium' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Đậm
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition cursor-pointer ${
              showGuide ? 'bg-rose-50 border-rose-300 text-rose-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
            title="Bật/Tắt chữ mẫu mờ"
          >
            {showGuide ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showGuide ? 'Chữ mẫu' : 'Tự do'}</span>
          </button>

          <button
            onClick={handleUndo}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer transition"
            title="Lùi lại nét trước"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Hoàn tác</span>
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-stone-100 hover:bg-rose-100 hover:text-rose-700 text-stone-700 cursor-pointer transition"
            title="Xóa trắng ô chữ"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa</span>
          </button>
        </div>
      </div>

      {/* Rules Modal / Collapse */}
      {showRulesModal && (
        <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-900">7 Quy tắc vàng viết chữ Hán (Bút thuận):</h4>
            <button
              onClick={() => setShowRulesModal(false)}
              className="text-amber-700 hover:text-amber-900 font-bold px-1"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STROKE_RULES.map((r, idx) => (
              <div key={idx} className="bg-white/80 p-2 rounded border border-amber-100">
                <span className="font-semibold text-rose-700">{idx + 1}. {r.title}</span>
                <p className="text-stone-600 mt-0.5">Ví dụ: {r.example}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
