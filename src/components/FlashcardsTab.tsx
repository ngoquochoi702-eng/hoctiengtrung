import React, { useState } from 'react';
import { Volume2, RotateCcw, Check, X, Sparkles, Filter, Eye, EyeOff } from 'lucide-react';
import { HSK_VOCAB_LIST } from '../data/hskVocab';
import { HskLevel, WordItem } from '../types';
import { speechService } from '../utils/speech';

interface FlashcardsTabProps {
  favorites: string[];
}

export const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ favorites }) => {
  const [selectedHsk, setSelectedHsk] = useState<HskLevel | 'Favorites'>('HSK 1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [showPinyinOnFront, setShowPinyinOnFront] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const HSK_OPTIONS: (HskLevel | 'Favorites')[] = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'Favorites', 'Tất cả'];

  const cardList: WordItem[] = React.useMemo(() => {
    if (selectedHsk === 'Favorites') {
      return HSK_VOCAB_LIST.filter((w) => favorites.includes(w.id));
    }
    if (selectedHsk === 'Tất cả') {
      return HSK_VOCAB_LIST;
    }
    return HSK_VOCAB_LIST.filter((w) => w.hsk === selectedHsk);
  }, [selectedHsk, favorites]);

  const currentCard = cardList[currentIndex] || cardList[0];

  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    if (nextFlipped && autoPlayAudio && currentCard) {
      speechService.speak(currentCard.hanzi);
    }
  };

  const handleMarkMastered = () => {
    if (currentCard && !masteredIds.includes(currentCard.id)) {
      setMasteredIds((prev) => [...prev, currentCard.id]);
    }
    handleNext();
  };

  const handleMarkNeedReview = () => {
    if (currentCard) {
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    }
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cardList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(cardList.length - 1);
    }
  };

  const handleResetDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (cardList.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 max-w-lg mx-auto space-y-4">
        <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-stone-900">Chưa có thẻ nào trong bộ sưu tập này</h3>
        <p className="text-xs text-stone-500">
          Hãy chọn cấp độ HSK khác hoặc đánh dấu sao từ vựng để thêm vào thẻ yêu thích nhé!
        </p>
        <button
          onClick={() => setSelectedHsk('HSK 1')}
          className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold"
        >
          Chuyển sang HSK 1
        </button>
      </div>
    );
  }

  const isMastered = currentCard && masteredIds.includes(currentCard.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Deck Controls Header */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-rose-600" />
          <span className="text-xs font-bold text-stone-700">Bộ thẻ:</span>
          <div className="flex flex-wrap gap-1.5">
            {HSK_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setSelectedHsk(opt);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  selectedHsk === opt
                    ? 'bg-rose-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {opt === 'Favorites' ? '⭐ Yêu thích' : opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-600">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={autoPlayAudio}
              onChange={(e) => setAutoPlayAudio(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Tự đọc khi lật</span>
          </label>

          <button
            onClick={() => setShowPinyinOnFront(!showPinyinOnFront)}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-800"
            title="Ẩn/Hiện gợi ý Pinyin mặt trước"
          >
            {showPinyinOnFront ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showPinyinOnFront ? 'Ẩn Pinyin mặt trước' : 'Gợi ý Pinyin'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Status */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Thẻ số <strong>{currentIndex + 1}</strong> / {cardList.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-emerald-700 font-semibold">
            Đã thuộc: {masteredIds.filter((id) => cardList.some((c) => c.id === id)).length}
          </span>
          <div className="w-32 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
            <div
              className="h-full bg-rose-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cardList.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3D Flip Flashcard */}
      <div
        onClick={handleFlip}
        className="relative w-full h-[360px] cursor-pointer select-none perspective-1000 group"
      >
        <div
          className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-3d shadow-lg border border-stone-200 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face: Hanzi */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-b from-white to-stone-50/80 rounded-3xl p-8 flex flex-col justify-between items-center text-center">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                {currentCard.hsk}
              </span>
              <span className="text-xs text-stone-400">Bấm để lật thẻ</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="text-7xl sm:text-8xl font-bold font-serif text-stone-900 tracking-tight">
                {currentCard.hanzi}
              </div>
              {showPinyinOnFront && (
                <div className="text-xl font-bold text-rose-600 tracking-wide">
                  {currentCard.pinyin}
                </div>
              )}
              {isMastered && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3" /> Đã thuộc từ này
                </span>
              )}
            </div>

            <div className="w-full flex items-center justify-between text-xs text-stone-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speechService.speak(currentCard.hanzi);
                }}
                className="p-2 rounded-full bg-stone-100 hover:bg-rose-100 hover:text-rose-700 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span>{currentCard.category}</span>
            </div>
          </div>

          {/* Back Face: Meaning, Pinyin, Han Viet, Example */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white rounded-3xl p-8 flex flex-col justify-between border-2 border-rose-500/30">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-serif text-stone-900">{currentCard.hanzi}</span>
                <span className="text-lg font-bold text-rose-600">{currentCard.pinyin}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speechService.speak(currentCard.hanzi);
                }}
                className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 my-auto">
              <div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-1">
                  Âm Hán Việt: {currentCard.hanViet}
                </span>
                <h4 className="text-xl font-bold text-stone-900 mt-1">
                  {currentCard.meaning}
                </h4>
              </div>

              {/* Example */}
              <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-100 text-left space-y-1">
                <span className="text-[11px] font-bold text-rose-900 block">Ví dụ:</span>
                <p className="text-sm font-medium font-serif text-stone-900">{currentCard.exampleZh}</p>
                <p className="text-xs text-rose-600">{currentCard.examplePinyin}</p>
                <p className="text-xs text-stone-600 italic">→ {currentCard.exampleVi}</p>
              </div>
            </div>

            <div className="text-center text-xs text-stone-400">
              Bấm lại để lật về mặt trước
            </div>
          </div>
        </div>
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
        >
          ← Thẻ trước
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkNeedReview}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition cursor-pointer border border-rose-200"
          >
            <X className="w-4 h-4" />
            <span>Chưa nhớ (Ôn lại)</span>
          </button>
          <button
            onClick={handleMarkMastered}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>Đã thuộc rồi!</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
        >
          Tiếp theo →
        </button>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={handleResetDeck}
          className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Bắt đầu lại bộ thẻ này</span>
        </button>
      </div>
    </div>
  );
};
