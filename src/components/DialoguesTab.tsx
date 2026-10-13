import React, { useState } from 'react';
import { Volume2, Play, Square, Eye, EyeOff, BookOpen, User, CheckCircle } from 'lucide-react';
import { DIALOGUES_LIST } from '../data/dialoguesData';
import { DialogueTopic } from '../types';
import { speechService } from '../utils/speech';

export const DialoguesTab: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<DialogueTopic>(DIALOGUES_LIST[0]);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      speechService.stop();
      setIsPlayingAll(false);
      setActiveLineIndex(null);
      return;
    }

    setIsPlayingAll(true);
    for (let i = 0; i < selectedTopic.lines.length; i++) {
      setActiveLineIndex(i);
      await speechService.speak(selectedTopic.lines[i].zh);
      await new Promise((r) => setTimeout(r, 600)); // Pause between lines
    }
    setIsPlayingAll(false);
    setActiveLineIndex(null);
  };

  const handlePlaySingleLine = (text: string, index: number) => {
    setActiveLineIndex(index);
    speechService.speak(text);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-rose-900 to-stone-900 text-white rounded-2xl p-6 shadow-md">
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
          情景会话 • Giao tiếp đàm thoại thực chiến
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight mt-2">
          Hội thoại tình huống đời sống
        </h2>
        <p className="text-stone-300 text-sm mt-1 max-w-2xl">
          Luyện phản xạ giao tiếp với các tình huống thực tế tại Trung Quốc: làm quen, nhà hàng, mua sắm mặc cả, đi taxi... Nghe từng câu hoặc chạy cả đoạn hội thoại.
        </p>
      </div>

      {/* Main Grid: Left is Topic selector, Right is Dialogue lines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topic List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-stone-500 px-1 uppercase">
            CHỦ ĐỀ ĐÀM THOẠI ({DIALOGUES_LIST.length})
          </span>
          <div className="space-y-2">
            {DIALOGUES_LIST.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    speechService.stop();
                    setIsPlayingAll(false);
                    setActiveLineIndex(null);
                    setSelectedTopic(topic);
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50 border-rose-300 shadow-xs ring-1 ring-rose-200'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {topic.level}
                    </span>
                    <span className="text-xs text-stone-400">{topic.lines.length} câu thoại</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mt-2 font-serif">
                    {topic.titleZh}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">{topic.titleVi}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Dialogue viewer (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayAll}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer ${
                  isPlayingAll
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {isPlayingAll ? (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>Dừng phát</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Phát toàn bộ đoạn</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition cursor-pointer ${
                  showPinyin
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {showPinyin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showPinyin ? 'Hiện Pinyin' : 'Ẩn Pinyin'}</span>
              </button>

              <button
                onClick={() => setShowVietnamese(!showVietnamese)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition cursor-pointer ${
                  showVietnamese
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {showVietnamese ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showVietnamese ? 'Hiện Dịch nghĩa' : 'Ẩn Dịch nghĩa'}</span>
              </button>
            </div>
          </div>

          {/* Dialogue Lines */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                {selectedTopic.titleZh}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">{selectedTopic.description}</p>
            </div>

            <div className="space-y-3.5">
              {selectedTopic.lines.map((line, idx) => {
                const isSpeakerA = line.speaker === 'A';
                const isActive = activeLineIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handlePlaySingleLine(line.zh, idx)}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      isActive
                        ? 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-200'
                        : isSpeakerA
                        ? 'bg-stone-50/60 border-stone-200/80 hover:border-stone-300'
                        : 'bg-amber-50/40 border-amber-100 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSpeakerA
                              ? 'bg-rose-700 text-white'
                              : 'bg-amber-600 text-white'
                          }`}
                        >
                          {line.speaker}
                        </div>
                        <span className="text-xs font-semibold text-stone-700">
                          {line.speakerName}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySingleLine(line.zh, idx);
                        }}
                        className="p-1 rounded-md text-stone-400 hover:text-rose-600 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2 pl-8 space-y-1">
                      <p className="text-base sm:text-lg font-serif font-medium text-stone-900">
                        {line.zh}
                      </p>
                      {showPinyin && (
                        <p className="text-xs font-medium text-rose-700">
                          {line.pinyin}
                        </p>
                      )}
                      {showVietnamese && (
                        <p className="text-xs text-stone-600 italic">
                          → {line.vi}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Vocabulary Cheat Sheet */}
            {selectedTopic.keyVocabulary && selectedTopic.keyVocabulary.length > 0 && (
              <div className="mt-6 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-2.5">
                  <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                  <span>Từ vựng trọng tâm trong bài:</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedTopic.keyVocabulary.map((v, i) => (
                    <div
                      key={i}
                      onClick={() => speechService.speak(v.zh)}
                      className="p-2 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-200 transition cursor-pointer text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-serif text-stone-900">{v.zh}</span>
                        <Volume2 className="w-3 h-3 text-stone-400" />
                      </div>
                      <span className="text-rose-600 text-[11px] block">{v.pinyin}</span>
                      <span className="text-stone-500 text-[11px] block truncate">{v.vi}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
