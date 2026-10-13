import React, { useState } from 'react';
import { Volume2, Award, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import {
  PINYIN_INITIALS,
  PINYIN_FINALS,
  CHINESE_TONES,
  TONE_TRAINER_QUESTIONS,
} from '../data/pinyinData';
import { speechService } from '../utils/speech';

export const PinyinTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'initials' | 'finals' | 'tones' | 'trainer'>('initials');

  // Tone Trainer state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = TONE_TRAINER_QUESTIONS[currentQIndex];

  const handleSelectTone = (tone: number) => {
    if (selectedTone !== null) return;
    setSelectedTone(tone);
    setShowExplanation(true);
    setAnsweredCount((prev) => prev + 1);
    if (tone === currentQ.correctTone) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedTone(null);
    setShowExplanation(false);
    if (currentQIndex < TONE_TRAINER_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Loop or restart
      setCurrentQIndex(0);
    }
  };

  const handleResetTrainer = () => {
    setCurrentQIndex(0);
    setSelectedTone(null);
    setScore(0);
    setAnsweredCount(0);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
              汉语拼音 • Chinese Pinyin System
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight mt-2">
              Bảng Bính âm Pinyin & 4 Thanh điệu
            </h2>
            <p className="text-stone-300 text-sm mt-1 max-w-xl">
              Nền tảng phát âm chuẩn Bắc Kinh: 21 Thanh mẫu, 36 Vận mẫu, 4 thanh điệu cùng mẹo khẩu hình và luyện tai nghe.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveSubTab('trainer');
              speechService.speak(currentQ.audioText);
            }}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Thử thách luyện tai thanh điệu</span>
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mt-6 border-t border-stone-800 pt-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('initials')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              activeSubTab === 'initials'
                ? 'bg-white text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            21 Thanh mẫu (声母)
          </button>
          <button
            onClick={() => setActiveSubTab('finals')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              activeSubTab === 'finals'
                ? 'bg-white text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            36 Vận mẫu (韵母)
          </button>
          <button
            onClick={() => setActiveSubTab('tones')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
              activeSubTab === 'tones'
                ? 'bg-white text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            4 Thanh điệu & Biến âm (声调)
          </button>
          <button
            onClick={() => setActiveSubTab('trainer')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'trainer'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-amber-300 hover:bg-stone-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Luyện tai phân biệt thanh</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: Initials (Thanh mẫu) */}
      {activeSubTab === 'initials' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-center justify-between">
            <span>
              💡 <strong>Mẹo ghi nhớ:</strong> Chú ý các cặp âm bật hơi như <strong>b - p</strong>, <strong>d - t</strong>, <strong>g - k</strong>, <strong>j - q</strong>, <strong>z - c</strong>, <strong>zh - ch</strong>. Bấm vào từng thẻ để nghe phát âm!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {PINYIN_INITIALS.map((init) => (
              <div
                key={init.symbol}
                onClick={() => speechService.speak(init.examplePinyin)}
                className="group bg-white p-4 rounded-xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-serif text-rose-700 group-hover:scale-110 transition-transform">
                      {init.symbol}
                    </span>
                    <Volume2 className="w-4 h-4 text-stone-300 group-hover:text-rose-600 transition" />
                  </div>
                  <p className="text-[11px] text-stone-600 mt-2 line-clamp-2 leading-tight">
                    {init.vietnameseEquivalent}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-stone-800">{init.exampleWord}</span>
                  <span className="text-rose-600 font-medium">{init.examplePinyin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Finals (Vận mẫu) */}
      {activeSubTab === 'finals' && (
        <div className="space-y-6">
          {/* Simple Finals */}
          <div>
            <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>Vận mẫu đơn (单韵母: a, o, e, i, u, ü)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {PINYIN_FINALS.filter((f) => f.category === 'simple_final').map((f) => (
                <div
                  key={f.symbol}
                  onClick={() => speechService.speak(f.examplePinyin)}
                  className="group bg-white p-4 rounded-xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-rose-700">{f.symbol}</span>
                    <Volume2 className="w-4 h-4 text-stone-300 group-hover:text-rose-600" />
                  </div>
                  <p className="text-[11px] text-stone-600 mt-2 leading-tight">
                    {f.vietnameseEquivalent}
                  </p>
                  <div className="mt-2 text-[11px] text-stone-700 font-medium">
                    {f.exampleWord} ({f.exampleMeaning})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compound Finals */}
          <div>
            <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span>Vận mẫu kép (复韵母: ai, ei, ui, ao, ou, iu, ie, üe, er)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {PINYIN_FINALS.filter((f) => f.category === 'compound_final').map((f) => (
                <div
                  key={f.symbol}
                  onClick={() => speechService.speak(f.examplePinyin)}
                  className="group bg-white p-4 rounded-xl border border-stone-200 hover:border-amber-300 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-700">{f.symbol}</span>
                    <Volume2 className="w-4 h-4 text-stone-300 group-hover:text-amber-600" />
                  </div>
                  <p className="text-[11px] text-stone-600 mt-2 leading-tight">
                    {f.vietnameseEquivalent}
                  </p>
                  <div className="mt-2 text-[11px] text-stone-700 font-medium">
                    {f.exampleWord} ({f.exampleMeaning})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nasal Finals */}
          <div>
            <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>Vận mẫu mũi (鼻韵母: an, en, in, ang, eng, ing, ong...)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {PINYIN_FINALS.filter((f) => f.category === 'nasal_final').map((f) => (
                <div
                  key={f.symbol}
                  onClick={() => speechService.speak(f.examplePinyin)}
                  className="group bg-white p-4 rounded-xl border border-stone-200 hover:border-emerald-300 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-emerald-700">{f.symbol}</span>
                    <Volume2 className="w-4 h-4 text-stone-300 group-hover:text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-stone-600 mt-2 leading-tight">
                    {f.vietnameseEquivalent}
                  </p>
                  <div className="mt-2 text-[11px] text-stone-700 font-medium">
                    {f.exampleWord} ({f.exampleMeaning})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Tones (Thanh điệu & Quy tắc biến điệu) */}
      {activeSubTab === 'tones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {CHINESE_TONES.map((t) => (
              <div
                key={t.toneNumber}
                onClick={() => speechService.speak(t.example)}
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-rose-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                      {t.pitch}
                    </span>
                    <Volume2 className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-stone-900 font-serif my-2 text-center">
                    {t.symbol}
                  </div>
                  <h4 className="text-sm font-bold text-stone-800 text-center">{t.nameVi}</h4>
                  <p className="text-xs text-stone-500 text-center">{t.nameZh}</p>
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">{t.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-center">
                  <span className="text-sm font-bold text-rose-700 block">{t.example}</span>
                  <span className="text-xs text-stone-500">({t.exampleMeaning})</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tone change rules (Biến điệu quan trọng) */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>3 Quy tắc biến điệu sống còn trong tiếng Trung</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                <span className="font-bold text-xs text-amber-900 block mb-1">
                  1. Hai thanh 3 đi liền nhau (3 + 3 → 2 + 3)
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Khi hai âm tiết thanh 3 đứng liền, âm thứ nhất đọc thành thanh 2.
                </p>
                <div className="mt-2 text-xs font-semibold text-rose-700 bg-white p-2 rounded border border-amber-200">
                  Ví dụ: 你 (nǐ) + 好 (hǎo) → đọc là <strong>ní hǎo</strong>.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80">
                <span className="font-bold text-xs text-rose-900 block mb-1">
                  2. Biến điệu của chữ 不 (bù)
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Đứng trước thanh 1, 2, 3 giữ nguyên thanh 4 (bù). Đứng trước thanh 4 đổi thành thanh 2 (bú).
                </p>
                <div className="mt-2 text-xs font-semibold text-rose-700 bg-white p-2 rounded border border-rose-200">
                  Ví dụ: 不是 (bú shì), 不要 (bú yào), 不好 (bù hǎo).
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                <span className="font-bold text-xs text-emerald-900 block mb-1">
                  3. Biến điệu của chữ 一 (yī)
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Đứng trước thanh 1, 2, 3 đổi thành thanh 4 (yì). Đứng trước thanh 4 đổi thành thanh 2 (yí).
                </p>
                <div className="mt-2 text-xs font-semibold text-rose-700 bg-white p-2 rounded border border-emerald-200">
                  Ví dụ: 一天 (yì tiān), 一样 (yí yàng), 一起 (yì qǐ).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Tone Trainer Drill Game */}
      {activeSubTab === 'trainer' && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Luyện tai • Thử thách nghe
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-1">Đoán thanh điệu của từ</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-500 block">Điểm số</span>
              <span className="text-lg font-bold text-rose-600">
                {score} / {answeredCount}
              </span>
            </div>
          </div>

          {/* Sound player card */}
          <div className="text-center py-6 bg-gradient-to-b from-rose-50/50 to-white rounded-2xl border border-rose-100 space-y-3">
            <span className="text-xs text-stone-500 font-medium">Bấm vào biểu tượng để nghe âm thanh:</span>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => speechService.speak(currentQ.audioText)}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer mx-auto"
                title="Nghe lại âm"
              >
                <Volume2 className="w-8 h-8" />
              </button>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900">{currentQ.wordZh}</div>
            <span className="text-xs text-stone-400">Câu số {currentQIndex + 1} / {TONE_TRAINER_QUESTIONS.length}</span>
          </div>

          {/* Tone choices 1, 2, 3, 4 */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-700 block">
              Từ trên thuộc thanh điệu nào?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((t) => {
                const isSelected = selectedTone === t;
                const isCorrect = t === currentQ.correctTone;
                let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';

                if (selectedTone !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-600 border-rose-600 text-white font-bold';
                  }
                }

                return (
                  <button
                    key={t}
                    disabled={selectedTone !== null}
                    onClick={() => handleSelectTone(t)}
                    className={`py-3.5 px-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${btnStyle}`}
                  >
                    <span className="text-lg font-bold">Thanh {t}</span>
                    <span className="text-xs opacity-80">
                      {t === 1 ? 'mā (55)' : t === 2 ? 'má (35)' : t === 3 ? 'mǎ (214)' : 'mà (51)'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & explanation */}
          {showExplanation && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                selectedTone === currentQ.correctTone
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {selectedTone === currentQ.correctTone ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs leading-relaxed">
                <span className="font-bold block">
                  {selectedTone === currentQ.correctTone ? 'Chính xác!' : 'Chưa đúng rồi!'}
                </span>
                <span>{currentQ.explanation}</span>
              </div>
            </div>
          )}

          {/* Next / Reset controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleResetTrainer}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bắt đầu lại</span>
            </button>

            {selectedTone !== null && (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-md transition cursor-pointer"
              >
                Câu tiếp theo →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
