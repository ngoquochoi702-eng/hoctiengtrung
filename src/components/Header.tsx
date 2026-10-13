import React from 'react';
import {
  BookOpen,
  Volume2,
  PenTool,
  Award,
  Layers,
  MessageSquare,
  Bot,
  Star,
  Settings,
  Sparkles,
} from 'lucide-react';
import { speechService } from '../utils/speech';

export type TabType =
  | 'dict'
  | 'pinyin'
  | 'hsk'
  | 'flashcards'
  | 'quiz'
  | 'dialogue'
  | 'ai_tutor'
  | 'notebook';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  favoritesCount: number;
  streakCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  streakCount,
}) => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [currentRate, setCurrentRate] = React.useState(speechService.getRate());

  const handleRateChange = (r: number) => {
    speechService.setRate(r);
    setCurrentRate(r);
  };

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dict', label: 'Từ điển & Ô Mễ', icon: <PenTool className="w-4 h-4" /> },
    { id: 'pinyin', label: 'Bảng Pinyin', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'hsk', label: 'Lộ trình HSK', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="w-4 h-4" /> },
    { id: 'quiz', label: 'Luyện thi Quiz', icon: <Award className="w-4 h-4" /> },
    { id: 'dialogue', label: 'Hội thoại', icon: <MessageSquare className="w-4 h-4" /> },
    {
      id: 'ai_tutor',
      label: 'Gia sư AI',
      icon: <Bot className="w-4 h-4 text-rose-500" />,
      badge: 'AI',
    },
    {
      id: 'notebook',
      label: 'Sổ tay & Bộ thủ',
      icon: <Star className="w-4 h-4 text-amber-500" />,
      badge: favoritesCount > 0 ? String(favoritesCount) : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top brand row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('dict')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Traditional Chinese seal imprint */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-700 to-rose-900 text-amber-200 flex items-center justify-center font-serif text-2xl font-bold shadow-md shadow-rose-950/20 ring-2 ring-rose-600/30">
              漢
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg font-serif text-stone-900 tracking-tight">
                  HanYu Master
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold font-serif">
                  汉语大师
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                Học Tiếng Trung Toàn Diện • Đầy đủ tiện ích
              </p>
            </div>
          </div>

          {/* Quick status & Audio speech settings */}
          <div className="flex items-center gap-3">
            {/* Streak count */}
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-semibold text-amber-900">
              <span>🔥 Streak:</span>
              <span className="text-amber-700 font-bold">{streakCount} ngày</span>
            </div>

            {/* Audio settings button */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-medium cursor-pointer transition"
                title="Cài đặt tốc độ giọng nói"
              >
                <Settings className="w-4 h-4 text-stone-500" />
                <span className="hidden md:inline">Giọng đọc ({currentRate}x)</span>
              </button>

              {showSettings && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-xs font-bold text-stone-900">Tốc độ phát âm</span>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-stone-400 hover:text-stone-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      { rate: 0.7, label: '0.7x (Rất chậm, nghe rõ từng âm)' },
                      { rate: 0.85, label: '0.85x (Chậm vừa cho người mới)' },
                      { rate: 1.0, label: '1.0x (Tốc độ người bản xứ chuẩn)' },
                    ].map((item) => (
                      <button
                        key={item.rate}
                        onClick={() => {
                          handleRateChange(item.rate);
                          speechService.speak('你好，欢迎学习中文！');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                          currentRate === item.rate
                            ? 'bg-rose-50 text-rose-800 font-bold border border-rose-200'
                            : 'text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        {currentRate === item.rate && <span className="text-rose-600">✓</span>}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 italic">
                    Bấm để nghe thử mẫu giọng!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 -mb-px scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-amber-300 text-stone-950'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
