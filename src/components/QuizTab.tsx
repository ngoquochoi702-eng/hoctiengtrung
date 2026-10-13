import React, { useState } from 'react';
import { Volume2, Award, Flame, CheckCircle, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types';
import { speechService } from '../utils/speech';

export const QuizTab: React.FC = () => {
  const [selectedType, setSelectedType] = useState<QuizQuestion['type'] | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // For sentence ordering
  const [selectedWordsOrder, setSelectedWordsOrder] = useState<string[]>([]);

  const filteredQuestions = React.useMemo(() => {
    if (selectedType === 'all') return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter((q) => q.type === selectedType);
  }, [selectedType]);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    setShowExplanation(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 10);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleToggleSentenceWord = (w: string) => {
    if (selectedOption !== null) return;
    let next: string[];
    if (selectedWordsOrder.includes(w)) {
      next = selectedWordsOrder.filter((item) => item !== w);
    } else {
      next = [...selectedWordsOrder, w];
    }
    setSelectedWordsOrder(next);

    // If user selected all words, submit answer
    if (currentQ.wordsForSentence && next.length === currentQ.wordsForSentence.length) {
      const builtString = next.join(' ');
      handleSelectOption(builtString);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setSelectedWordsOrder([]);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setSelectedWordsOrder([]);
    setScore(0);
    setStreak(0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Quiz Header Bar */}
      <div className="bg-gradient-to-r from-stone-900 to-rose-950 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
              考试与练习 • Luyện thi & Thử thách
            </span>
            <h2 className="text-2xl font-bold font-serif tracking-tight mt-1.5">
              Đấu trí trắc nghiệm tiếng Trung
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              Kiểm tra toàn diện Pinyin, ngữ nghĩa, nghe hiểu và trật tự câu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-stone-800/80 px-3.5 py-2 rounded-xl text-center border border-stone-700">
              <span className="text-[10px] text-stone-400 block uppercase font-bold">Điểm số</span>
              <span className="text-lg font-bold text-amber-400">{score}</span>
            </div>
            <div className="bg-stone-800/80 px-3.5 py-2 rounded-xl text-center border border-stone-700">
              <span className="text-[10px] text-stone-400 block uppercase font-bold flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-orange-500" />
                <span>Streak</span>
              </span>
              <span className="text-lg font-bold text-orange-400">{streak} 🔥</span>
            </div>
          </div>
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-2 mt-5 border-t border-stone-800 pt-3 overflow-x-auto pb-1">
          <button
            onClick={() => {
              setSelectedType('all');
              setCurrentIndex(0);
              setSelectedOption(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              selectedType === 'all' ? 'bg-white text-stone-950' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            Tất cả dạng bài
          </button>
          <button
            onClick={() => {
              setSelectedType('pinyin');
              setCurrentIndex(0);
              setSelectedOption(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              selectedType === 'pinyin' ? 'bg-white text-stone-950' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            Chọn Pinyin
          </button>
          <button
            onClick={() => {
              setSelectedType('meaning');
              setCurrentIndex(0);
              setSelectedOption(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              selectedType === 'meaning' ? 'bg-white text-stone-950' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            Nghĩa tiếng Việt
          </button>
          <button
            onClick={() => {
              setSelectedType('listening');
              setCurrentIndex(0);
              setSelectedOption(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              selectedType === 'listening' ? 'bg-white text-stone-950' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            Luyện nghe
          </button>
          <button
            onClick={() => {
              setSelectedType('sentence_order');
              setCurrentIndex(0);
              setSelectedOption(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              selectedType === 'sentence_order' ? 'bg-white text-stone-950' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            Xếp câu ngữ pháp
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-100 pb-3">
          <span className="font-semibold text-rose-700 uppercase">
            {currentQ.type === 'pinyin'
              ? 'Phát âm Pinyin'
              : currentQ.type === 'meaning'
              ? 'Ý nghĩa từ vựng'
              : currentQ.type === 'listening'
              ? 'Kỹ năng nghe hiểu'
              : 'Ngữ pháp & Trật tự câu'}
          </span>
          <span>
            Câu {currentIndex + 1} / {filteredQuestions.length}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-stone-900 leading-snug">
            {currentQ.question}
          </h3>
          {currentQ.subText && (
            <p className="text-xs text-stone-500 mt-1 font-medium">{currentQ.subText}</p>
          )}
        </div>

        {/* Audio prompt for Listening type */}
        {currentQ.type === 'listening' && currentQ.audioPrompt && (
          <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 text-center space-y-2">
            <button
              onClick={() => speechService.speak(currentQ.audioPrompt!)}
              className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center mx-auto shadow-md transition cursor-pointer active:scale-95"
            >
              <Volume2 className="w-7 h-7" />
            </button>
            <span className="text-xs text-rose-800 font-medium block">
              Bấm để nghe lại phát âm
            </span>
          </div>
        )}

        {/* Sentence Ordering Interactive Mode */}
        {currentQ.type === 'sentence_order' && currentQ.wordsForSentence && (
          <div className="space-y-4">
            {/* Built sentence display */}
            <div className="min-h-[52px] p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center gap-2">
              {selectedWordsOrder.length === 0 ? (
                <span className="text-xs text-stone-400 italic">
                  Chạm vào các từ bên dưới theo thứ tự để ghép câu...
                </span>
              ) : (
                selectedWordsOrder.map((w, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleToggleSentenceWord(w)}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-sm font-bold font-serif shadow-xs cursor-pointer hover:bg-rose-700"
                  >
                    {w}
                  </span>
                ))
              )}
            </div>

            {/* Available word tiles */}
            <div className="flex flex-wrap gap-2">
              {currentQ.wordsForSentence.map((w, idx) => {
                const isUsed = selectedWordsOrder.includes(w);
                return (
                  <button
                    key={idx}
                    disabled={isUsed || selectedOption !== null}
                    onClick={() => handleToggleSentenceWord(w)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold font-serif transition cursor-pointer ${
                      isUsed
                        ? 'bg-stone-100 text-stone-300 border border-stone-100 cursor-not-allowed'
                        : 'bg-white border border-stone-300 text-stone-900 hover:border-rose-400 hover:shadow-xs'
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Standard Options Grid */}
        {currentQ.type !== 'sentence_order' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.correctAnswer;
              let style = 'bg-stone-50/70 border-stone-200 text-stone-800 hover:bg-stone-100';

              if (selectedOption !== null) {
                if (isCorrect) {
                  style = 'bg-emerald-600 border-emerald-600 text-white font-bold ring-2 ring-emerald-300';
                } else if (isSelected) {
                  style = 'bg-rose-600 border-rose-600 text-white font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${style}`}
                >
                  <span className="text-sm font-medium font-serif">{opt}</span>
                  {selectedOption !== null && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-white shrink-0" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation Card */}
        {showExplanation && (
          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedOption === currentQ.correctAnswer ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Xuất sắc! Bạn trả lời hoàn toàn chính xác. (+10 điểm)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Chưa chính xác! Đáp án đúng là: "{currentQ.correctAnswer}"</span>
                </>
              )}
            </div>
            <p className="pt-1">{currentQ.explanation}</p>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại từ đầu</span>
          </button>

          {selectedOption !== null && (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-md transition cursor-pointer"
            >
              Câu tiếp theo →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
