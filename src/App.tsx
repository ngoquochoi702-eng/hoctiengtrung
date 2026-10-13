import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { DictionaryTab } from './components/DictionaryTab';
import { PinyinTab } from './components/PinyinTab';
import { HskVocabTab } from './components/HskVocabTab';
import { FlashcardsTab } from './components/FlashcardsTab';
import { QuizTab } from './components/QuizTab';
import { DialoguesTab } from './components/DialoguesTab';
import { AiTutorTab } from './components/AiTutorTab';
import { NotebookTab } from './components/NotebookTab';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dict');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hanyu_favorites');
      return saved ? JSON.parse(saved) : ['hsk1-1', 'hsk1-2', 'hsk1-3'];
    } catch {
      return ['hsk1-1', 'hsk1-2', 'hsk1-3'];
    }
  });

  // Streak state persisted in localStorage
  const [streakCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('hanyu_streak');
      return saved ? parseInt(saved, 10) : 5; // Default 5 days streak
    } catch {
      return 5;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hanyu_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-stone-900 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        streakCount={streakCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dict' && (
          <DictionaryTab
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'pinyin' && <PinyinTab />}

        {activeTab === 'hsk' && (
          <HskVocabTab
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsTab favorites={favorites} />
        )}

        {activeTab === 'quiz' && <QuizTab />}

        {activeTab === 'dialogue' && <DialoguesTab />}

        {activeTab === 'ai_tutor' && <AiTutorTab />}

        {activeTab === 'notebook' && (
          <NotebookTab
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onClearFavorites={clearFavorites}
          />
        )}
      </main>

      {/* Motivational Chinese Proverb Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white/80 py-6 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-rose-800 font-serif font-bold text-sm">
            <span>“千里之行，始于足下”</span>
            <span className="text-stone-400 font-normal font-sans">
              (Hành trình vạn dặm bắt đầu từ một bước chân — Lão Tử)
            </span>
          </div>
          <p className="text-stone-400 text-[11px]">
            HanYu Master • Ứng dụng học tiếng Trung chuyên nghiệp với đầy đủ tiện ích: Bính âm, Hán tự, Ô Mễ, HSK, Flashcard, Đàm thoại & Gia sư AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
