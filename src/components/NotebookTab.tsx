import React, { useState } from 'react';
import { Star, Volume2, BookOpen, Trash2, Award, Sparkles, PenTool } from 'lucide-react';
import { HSK_VOCAB_LIST } from '../data/hskVocab';
import { RADICALS_LIST } from '../data/radicalsData';
import { speechService } from '../utils/speech';
import { StrokeCanvas } from './StrokeCanvas';

interface NotebookTabProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onClearFavorites: () => void;
}

export const NotebookTab: React.FC<NotebookTabProps> = ({
  favorites,
  onToggleFavorite,
  onClearFavorites,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'favorites' | 'radicals'>('favorites');
  const [practicingChar, setPracticingChar] = useState<string | null>(null);

  const favoriteWords = HSK_VOCAB_LIST.filter((w) => favorites.includes(w.id));

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-rose-950 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              生词本与部首 • Sổ tay & Bộ thủ Khang Hy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight mt-2">
              Sổ tay từ vựng & 214 Bộ thủ
            </h2>
            <p className="text-stone-300 text-sm mt-1 max-w-xl">
              Kho lưu trữ các từ vựng cần khắc phục và cẩm nang bộ thủ giải mã ý nghĩa của hàng nghìn chữ Hán.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('favorites')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'favorites'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Từ yêu thích ({favorites.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('radicals')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'radicals'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>214 Bộ thủ</span>
            </button>
          </div>
        </div>
      </div>

      {/* SubTab 1: Saved Favorites */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>
              Bạn đã lưu <strong>{favoriteWords.length}</strong> từ vựng quan trọng
            </span>
            {favoriteWords.length > 0 && (
              <button
                onClick={onClearFavorites}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-800 cursor-pointer font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa toàn bộ sổ tay</span>
              </button>
            )}
          </div>

          {favoriteWords.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-stone-300 max-w-md mx-auto space-y-3">
              <Star className="w-12 h-12 text-amber-300 mx-auto" />
              <h4 className="text-base font-bold text-stone-800">Sổ tay hiện đang trống</h4>
              <p className="text-xs text-stone-500">
                Hãy bấm biểu tượng ngôi sao ⭐ ở bất kỳ từ vựng nào trong Từ điển hoặc Lộ trình HSK để lưu vào đây ôn tập nhé!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteWords.map((word) => (
                <div
                  key={word.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-serif font-bold text-stone-900">{word.hanzi}</span>
                        <div>
                          <div className="text-base font-bold text-rose-700">{word.pinyin}</div>
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {word.hanViet}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speechService.speak(word.hanzi)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleFavorite(word.id)}
                          className="p-1.5 text-amber-500 hover:text-rose-600 rounded-lg"
                          title="Bỏ lưu khỏi sổ tay"
                        >
                          <Star className="w-4 h-4 fill-amber-400" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm font-semibold text-stone-800">{word.meaning}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold mt-1 inline-block">
                        {word.hsk}
                      </span>
                    </div>

                    <div className="mt-3 bg-stone-50 p-2.5 rounded-xl text-xs space-y-1">
                      <p className="font-serif font-medium text-stone-900">{word.exampleZh}</p>
                      <p className="text-rose-600 text-[11px]">{word.examplePinyin}</p>
                      <p className="text-stone-500 text-[11px] italic">→ {word.exampleVi}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-end">
                    <button
                      onClick={() => setPracticingChar(word.hanzi.charAt(0))}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 transition cursor-pointer"
                    >
                      <PenTool className="w-3.5 h-3.5 text-amber-600" />
                      <span>Luyện viết chữ này</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Radicals 214 Khang Hy */}
      {activeSubTab === 'radicals' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            💡 <strong>Tầm quan trọng của bộ thủ:</strong> Hán tự là chữ tượng hình kết hợp từ 214 bộ thủ Khang Hy (康熙部首). Nắm vững các bộ thủ quen thuộc giúp bạn đoán được đến 80% trường nghĩa của một chữ Hán lạ mà chưa từng gặp!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RADICALS_LIST.map((rad) => (
              <div
                key={rad.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-amber-400 hover:shadow-md transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl font-serif font-bold text-rose-700">
                      {rad.radical}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{rad.hanViet}</h4>
                      <span className="text-xs text-rose-600 font-medium">{rad.pinyin}</span>
                      <span className="text-[10px] text-stone-400 block">• {rad.strokeCount} nét</span>
                    </div>
                  </div>

                  <button
                    onClick={() => speechService.speak(rad.pinyin)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-xs font-semibold text-stone-800 block">Ý nghĩa: {rad.meaning}</span>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{rad.explanation}</p>
                </div>

                {/* Example characters containing this radical */}
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-500 block mb-1.5">
                    Các chữ chứa bộ này:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {rad.examples.map((ex, i) => (
                      <div
                        key={i}
                        onClick={() => speechService.speak(ex.hanzi)}
                        className="p-1.5 rounded-lg bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-200 transition text-center cursor-pointer"
                      >
                        <span className="text-base font-serif font-bold text-stone-900 block">{ex.hanzi}</span>
                        <span className="text-[10px] text-rose-600 block">{ex.pinyin}</span>
                        <span className="text-[10px] text-stone-500 block truncate">{ex.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice Canvas Modal */}
      {practicingChar && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setPracticingChar(null)}
              className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              ✕
            </button>
            <div className="mb-2">
              <h3 className="text-lg font-bold text-stone-900">Luyện viết chữ Hán trên ô Mễ</h3>
              <p className="text-xs text-stone-500">
                Hãy viết từng nét theo thứ tự bút thuận
              </p>
            </div>
            <StrokeCanvas char={practicingChar} />
          </div>
        </div>
      )}
    </div>
  );
};
