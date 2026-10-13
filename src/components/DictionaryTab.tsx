import React, { useState, useMemo } from 'react';
import { Search, Volume2, Sparkles, BookOpen, PenTool, Star } from 'lucide-react';
import { HSK_VOCAB_LIST } from '../data/hskVocab';
import { WordItem } from '../types';
import { speechService } from '../utils/speech';
import { StrokeCanvas } from './StrokeCanvas';

interface DictionaryTabProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const DictionaryTab: React.FC<DictionaryTabProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<WordItem>(HSK_VOCAB_LIST[0]);
  const [customChar, setCustomChar] = useState('');

  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return HSK_VOCAB_LIST;
    return HSK_VOCAB_LIST.filter(
      (w) =>
        w.hanzi.includes(q) ||
        w.pinyin.toLowerCase().includes(q) ||
        w.hanViet.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        (w.traditional && w.traditional.includes(q))
    );
  }, [searchQuery]);

  const activeChar = customChar.trim()
    ? customChar.trim().charAt(0)
    : selectedWord.hanzi.charAt(0);

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white rounded-2xl p-6 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-700/60 border border-rose-500/40 text-xs font-medium text-rose-100 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tra cứu Hán tự • Bính âm Pinyin • Hán Việt • Tập viết nét</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif">
            Từ điển & Tập viết chữ Mễ
          </h2>
          <p className="text-rose-100/90 text-sm mt-1.5 leading-relaxed">
            Tra cứu nhanh bằng chữ Hán, Pinyin hoặc nghĩa tiếng Việt. Tích hợp ô chữ Mễ để tập viết đúng thứ tự nét bút thuận.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="mt-5 relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập chữ Hán (你好), Pinyin (ni hao), âm Hán Việt (nhĩ hảo) hoặc nghĩa..."
            className="w-full pl-12 pr-4 py-3 bg-white text-stone-900 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-100 rounded-md px-2 py-1"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left is Word List / Search Results, Right is Detail & Stroke Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 px-1">
            <span>KẾT QUẢ TÌM KIẾM ({filteredWords.length} TỪ)</span>
            <span>Bấm từ để xem chi tiết & tập viết</span>
          </div>

          <div className="max-h-[640px] overflow-y-auto space-y-2 pr-1">
            {filteredWords.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center border border-dashed border-stone-300">
                <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-600">Không tìm thấy từ vựng phù hợp</p>
                <p className="text-xs text-stone-400 mt-1">
                  Bạn có thể nhập chữ Hán tùy ý vào ô dưới để tập viết trên ô Mễ!
                </p>
              </div>
            ) : (
              filteredWords.map((word) => {
                const isSelected = selectedWord.id === word.id && !customChar;
                const isFav = favorites.includes(word.id);
                return (
                  <div
                    key={word.id}
                    onClick={() => {
                      setSelectedWord(word);
                      setCustomChar('');
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-rose-50/80 border-rose-300 shadow-sm ring-1 ring-rose-300'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200/60">
                        <span className="text-2xl font-serif font-bold text-stone-900">{word.hanzi}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-rose-700">{word.pinyin}</span>
                          <span className="text-[11px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                            {word.hanViet}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                            {word.hsk}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 truncate mt-0.5">{word.meaning}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speechService.speak(word.hanzi);
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(word.id);
                        }}
                        className={`p-1.5 rounded-lg transition ${
                          isFav ? 'text-amber-500 hover:text-amber-600' : 'text-stone-300 hover:text-amber-500'
                        }`}
                        title="Lưu vào sổ tay"
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Details & Interactive Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Custom Practice Box */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-3">
            <PenTool className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="text-xs font-semibold text-stone-700 shrink-0">
              Tập viết chữ bất kỳ:
            </span>
            <input
              type="text"
              maxLength={1}
              value={customChar}
              onChange={(e) => setCustomChar(e.target.value)}
              placeholder="Gõ 1 chữ Hán để luyện (ví dụ: 学, 爱, 龙...)"
              className="flex-1 text-sm px-3 py-1.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            {customChar && (
              <button
                onClick={() => setCustomChar('')}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Đặt lại
              </button>
            )}
          </div>

          {/* Interactive Stroke Order Canvas */}
          <StrokeCanvas
            char={activeChar}
            pinyin={customChar ? '' : selectedWord.pinyin}
            hanViet={customChar ? '' : selectedWord.hanViet}
            meaning={customChar ? 'Chữ tùy chọn người dùng nhập' : selectedWord.meaning}
          />

          {/* Word Deep Details Card */}
          {!customChar && (
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-rose-600" />
                  <span>Chi tiết từ vựng & Cấu tạo ngữ nghĩa</span>
                </h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700">
                  {selectedWord.category}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 block">Bộ thủ</span>
                  <span className="text-sm font-bold text-stone-800 mt-0.5 block">
                    {selectedWord.radical || 'Chưa cập nhật'}
                  </span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 block">Số nét</span>
                  <span className="text-sm font-bold text-stone-800 mt-0.5 block">
                    {selectedWord.strokeCount ? `${selectedWord.strokeCount} nét` : 'Nhiều nét'}
                  </span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 block">Âm Hán Việt</span>
                  <span className="text-sm font-bold text-amber-700 mt-0.5 block">
                    {selectedWord.hanViet}
                  </span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 block">Cấp độ</span>
                  <span className="text-sm font-bold text-rose-700 mt-0.5 block">
                    {selectedWord.hsk}
                  </span>
                </div>
              </div>

              {/* Example Sentence with Audio */}
              <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900">Câu ví dụ thực tế:</span>
                  <button
                    onClick={() => speechService.speak(selectedWord.exampleZh)}
                    className="flex items-center gap-1 text-xs text-rose-700 font-semibold hover:text-rose-900 transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe câu mẫu</span>
                  </button>
                </div>
                <p className="text-base font-medium font-serif text-stone-900">
                  {selectedWord.exampleZh}
                </p>
                <p className="text-xs text-rose-600 font-medium">
                  {selectedWord.examplePinyin}
                </p>
                <p className="text-xs text-stone-600 italic">
                  → {selectedWord.exampleVi}
                </p>
              </div>

              {selectedWord.tips && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <span className="font-bold">Mẹo ghi nhớ: </span>
                  <span>{selectedWord.tips}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
