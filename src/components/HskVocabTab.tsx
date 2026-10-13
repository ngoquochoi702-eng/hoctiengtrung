import React, { useState, useMemo } from 'react';
import { Search, Volume2, Star, Filter, PenTool, X } from 'lucide-react';
import { HSK_VOCAB_LIST } from '../data/hskVocab';
import { HskLevel, VocabCategory, WordItem } from '../types';
import { speechService } from '../utils/speech';
import { StrokeCanvas } from './StrokeCanvas';

interface HskVocabTabProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const HskVocabTab: React.FC<HskVocabTabProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  const [selectedHsk, setSelectedHsk] = useState<HskLevel>('Tất cả');
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [practicingWord, setPracticingWord] = useState<WordItem | null>(null);

  const HSK_LEVELS: HskLevel[] = ['Tất cả', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];

  const CATEGORIES: VocabCategory[] = [
    'Tất cả',
    'Chào hỏi & Xã giao',
    'Ẩm thực & Nhà hàng',
    'Mua sắm & Giá cả',
    'Giao thông & Du lịch',
    'Gia đình & Cuộc sống',
    'Công sở & Thương mại',
    'Thành ngữ 4 chữ',
  ];

  const filteredList = useMemo(() => {
    return HSK_VOCAB_LIST.filter((w) => {
      const matchHsk = selectedHsk === 'Tất cả' || w.hsk === selectedHsk;
      const matchCat = selectedCategory === 'Tất cả' || w.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        w.hanzi.includes(searchQuery) ||
        w.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.hanViet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      return matchHsk && matchCat && matchQuery;
    });
  }, [selectedHsk, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 text-white rounded-2xl p-6 shadow-md">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30">
            HSK 标准词汇 • Lộ trình HSK 1 - 6
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight mt-2">
            Kho từ vựng HSK & Chủ đề giao tiếp
          </h2>
          <p className="text-rose-100 text-sm mt-1">
            Từ vựng phân cấp chuẩn kèm âm Hán Việt độc quyền cho người Việt, ví dụ đàm thoại thực tế và audio chuẩn giọng phổ thông.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-5 relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo chữ Hán, Pinyin, Hán Việt hoặc nghĩa..."
            className="w-full pl-10 pr-4 py-2.5 bg-white text-stone-900 rounded-xl text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
          <Filter className="w-4 h-4 text-rose-600" />
          <span>Bộ lọc cấp độ HSK:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {HSK_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedHsk(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedHsk === level
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-stone-700 pt-2 border-t border-stone-100">
          <span>Chủ đề đời sống:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>Hiển thị <strong>{filteredList.length}</strong> từ vựng</span>
        <span>Bấm vào biểu tượng bút để mở ô chữ Mễ tập viết</span>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map((word) => {
          const isFav = favorites.includes(word.id);
          return (
            <div
              key={word.id}
              className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-rose-300 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-serif font-bold text-stone-900">{word.hanzi}</span>
                    <div>
                      <div className="text-base font-bold text-rose-700">{word.pinyin}</div>
                      <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Hán Việt: {word.hanViet}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speechService.speak(word.hanzi)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                      title="Phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onToggleFavorite(word.id)}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        isFav ? 'text-amber-500' : 'text-stone-300 hover:text-amber-500'
                      }`}
                      title="Lưu sổ tay"
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-semibold text-stone-800">{word.meaning}</div>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-stone-500">
                    <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-medium">
                      {word.hsk}
                    </span>
                    <span>• {word.category}</span>
                    {word.radical && <span>• Bộ {word.radical}</span>}
                  </div>
                </div>

                {/* Example */}
                <div className="mt-3 pt-3 border-t border-stone-100 bg-stone-50/70 p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-medium text-stone-900">{word.exampleZh}</span>
                    <button
                      onClick={() => speechService.speak(word.exampleZh)}
                      className="text-stone-400 hover:text-rose-600 p-0.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-rose-600 text-[11px]">{word.examplePinyin}</div>
                  <div className="text-stone-500 text-[11px] italic">→ {word.exampleVi}</div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-2 flex items-center justify-end">
                <button
                  onClick={() => setPracticingWord(word)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 transition cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5 text-rose-600" />
                  <span>Tập viết chữ này</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Practice Modal if selected */}
      {practicingWord && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setPracticingWord(null)}
              className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-2">
              <h3 className="text-lg font-bold text-stone-900">Luyện viết chữ Hán trên ô Mễ</h3>
              <p className="text-xs text-stone-500">
                Hãy quan sát chữ mẫu và viết đúng thứ tự nét bút
              </p>
            </div>
            <StrokeCanvas
              char={practicingWord.hanzi.charAt(0)}
              pinyin={practicingWord.pinyin}
              hanViet={practicingWord.hanViet}
              meaning={practicingWord.meaning}
            />
          </div>
        </div>
      )}
    </div>
  );
};
