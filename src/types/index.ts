export type HskLevel = 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6' | 'Tất cả';

export type VocabCategory = 
  | 'Tất cả'
  | 'Chào hỏi & Xã giao'
  | 'Ẩm thực & Nhà hàng'
  | 'Mua sắm & Giá cả'
  | 'Giao thông & Du lịch'
  | 'Gia đình & Cuộc sống'
  | 'Công sở & Thương mại'
  | 'Thời gian & Thời tiết'
  | 'Cảm xúc & Tính cách'
  | 'Thành ngữ 4 chữ';

export interface WordItem {
  id: string;
  hanzi: string;
  traditional?: string;
  pinyin: string;
  hanViet: string; // Âm Hán Việt
  meaning: string; // Nghĩa tiếng Việt
  hsk: 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
  category: VocabCategory;
  radical?: string; // Bộ thủ
  strokeCount?: number; // Số nét
  exampleZh: string;
  examplePinyin: string;
  exampleVi: string;
  strokes?: string[]; // Thứ tự nét hoặc miêu tả nét
  tips?: string; // Mẹo nhớ hoặc điểm lưu ý
}

export interface PinyinItem {
  symbol: string;
  ipa?: string;
  vietnameseEquivalent: string;
  exampleWord: string;
  examplePinyin: string;
  exampleMeaning: string;
  category: 'initial' | 'simple_final' | 'compound_final' | 'nasal_final';
}

export interface RadicalItem {
  id: string;
  radical: string;
  pinyin: string;
  hanViet: string;
  meaning: string;
  strokeCount: number;
  examples: {
    hanzi: string;
    pinyin: string;
    meaning: string;
  }[];
  explanation: string;
}

export interface DialogueLine {
  speaker: 'A' | 'B';
  speakerName: string;
  zh: string;
  pinyin: string;
  vi: string;
}

export interface DialogueTopic {
  id: string;
  titleZh: string;
  titleVi: string;
  level: string;
  icon: string;
  description: string;
  lines: DialogueLine[];
  keyVocabulary: {
    zh: string;
    pinyin: string;
    vi: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  type: 'pinyin' | 'meaning' | 'listening' | 'sentence_order';
  question: string;
  subText?: string;
  audioPrompt?: string; // Chữ Hán cần phát âm
  options: string[];
  correctAnswer: string;
  explanation: string;
  wordsForSentence?: string[]; // Dành cho bài xếp từ thành câu
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  pinyin?: string;
  feedback?: string;
  suggestions?: string[];
  timestamp: number;
}

export interface SentenceAnalysis {
  original: string;
  pinyin: string;
  translation: string;
  hskLevel?: string;
  breakdown: {
    word: string;
    pinyin: string;
    hanViet?: string;
    meaning: string;
    partOfSpeech: string;
  }[];
  grammarPoints: string[];
  culturalNote?: string;
}
