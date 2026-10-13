import { RadicalItem } from '../types';

export const RADICALS_LIST: RadicalItem[] = [
  {
    id: 'rad-1',
    radical: '亻 (人)',
    pinyin: 'rén',
    hanViet: 'Nhân (Nhân đứng)',
    meaning: 'Người, con người',
    strokeCount: 2,
    examples: [
      { hanzi: '你', pinyin: 'nǐ', meaning: 'Bạn, anh, chị' },
      { hanzi: '他', pinyin: 'tā', meaning: 'Anh ấy, cậu ấy' },
      { hanzi: '休', pinyin: 'xiū', meaning: 'Nghỉ ngơi (người tựa gốc cây)' },
    ],
    explanation: 'Xuất hiện trong các chữ biểu thị tính cách, hành động, hoặc danh xưng con người.'
  },
  {
    id: 'rad-2',
    radical: '氵 (水)',
    pinyin: 'shuǐ',
    hanViet: 'Thủy (Ba chấm thủy)',
    meaning: 'Nước, chất lỏng, sông hồ',
    strokeCount: 3,
    examples: [
      { hanzi: '河', pinyin: 'hé', meaning: 'Dòng sông' },
      { hanzi: '海', pinyin: 'hǎi', meaning: 'Biển cả' },
      { hanzi: '洗', pinyin: 'xǐ', meaning: 'Tẩy, rửa, giặt' },
    ],
    explanation: 'Ba giọt nước bắn ra, chỉ những gì liên quan đến nước và chất lỏng.'
  },
  {
    id: 'rad-3',
    radical: '口',
    pinyin: 'kǒu',
    hanViet: 'Khẩu',
    meaning: 'Miệng, cửa ngõ, tiếng nói',
    strokeCount: 3,
    examples: [
      { hanzi: '吃', pinyin: 'chī', meaning: 'Ăn' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'Uống' },
      { hanzi: '问', pinyin: 'wèn', meaning: 'Hỏi han' },
    ],
    explanation: 'Hình dáng cái miệng mở ra, chỉ ăn uống, lời nói, phát âm hoặc mở lối.'
  },
  {
    id: 'rad-4',
    radical: '木',
    pinyin: 'mù',
    hanViet: 'Mộc',
    meaning: 'Cây cối, gỗ, thực vật thân gỗ',
    strokeCount: 4,
    examples: [
      { hanzi: '林', pinyin: 'lín', meaning: 'Khu rừng (2 cây mộc)' },
      { hanzi: '森', pinyin: 'sēn', meaning: 'Rừng rậm (3 cây mộc)' },
      { hanzi: '桌', pinyin: 'zhuō', meaning: 'Cái bàn gỗ' },
    ],
    explanation: 'Vẽ hình cái cây có cành và rễ cắm xuống đất.'
  },
  {
    id: 'rad-5',
    radical: '忄 / 心',
    pinyin: 'xīn',
    hanViet: 'Tâm (Tâm đứng / Trái tim)',
    meaning: 'Trái tim, tình cảm, cảm xúc, suy nghĩ',
    strokeCount: 3,
    examples: [
      { hanzi: '想', pinyin: 'xiǎng', meaning: 'Nghĩ, nhớ, muốn' },
      { hanzi: '怕', pinyin: 'pà', meaning: 'Sợ hãi' },
      { hanzi: '快', pinyin: 'kuài', meaning: 'Nhanh chóng / Vui vẻ' },
    ],
    explanation: 'Chỉ các trạng thái tâm lý, tình cảm, rung động nơi trái tim con người.'
  },
  {
    id: 'rad-6',
    radical: '女',
    pinyin: 'nǚ',
    hanViet: 'Nữ',
    meaning: 'Phụ nữ, phái đẹp, mẹ, con gái',
    strokeCount: 3,
    examples: [
      { hanzi: '好', pinyin: 'hǎo', meaning: 'Tốt đẹp' },
      { hanzi: '妈', pinyin: 'mā', meaning: 'Mẹ' },
      { hanzi: '姐', pinyin: 'jiě', meaning: 'Chị gái' },
    ],
    explanation: 'Hình người phụ nữ quỳ gối tao nhã, xuất hiện trong các danh từ chỉ phái nữ.'
  },
  {
    id: 'rad-7',
    radical: '辶',
    pinyin: 'chuò',
    hanViet: 'Xước (Quai xước)',
    meaning: 'Đi lại, di chuyển, bước chân, khoảng cách',
    strokeCount: 3,
    examples: [
      { hanzi: '进', pinyin: 'jìn', meaning: 'Tiến vào' },
      { hanzi: '远', pinyin: 'yuǎn', meaning: 'Xa xôi' },
      { hanzi: '近', pinyin: 'jìn', meaning: 'Gần gũi' },
    ],
    explanation: 'Hình dáng bước chân đang đi, gắn liền với chuyển động, hành trình hoặc cự ly.'
  },
  {
    id: 'rad-8',
    radical: '饣 (食)',
    pinyin: 'shí',
    hanViet: 'Thực',
    meaning: 'Thức ăn, đồ ăn, việc ăn uống',
    strokeCount: 3,
    examples: [
      { hanzi: '饭', pinyin: 'fàn', meaning: 'Cơm, bữa ăn' },
      { hanzi: '饱', pinyin: 'bǎo', meaning: 'No bụng' },
      { hanzi: '馆', pinyin: 'guǎn', meaning: 'Quán ăn, nhà bảo tàng' },
    ],
    explanation: 'Liên quan đến ẩm thực, ngũ cốc và các món ăn nuôi sống con người.'
  },
  {
    id: 'rad-9',
    radical: '钅 (金)',
    pinyin: 'jīn',
    hanViet: 'Kim',
    meaning: 'Kim loại, vàng bạc, đồ sắt nhọn',
    strokeCount: 5,
    examples: [
      { hanzi: '钱', pinyin: 'qián', meaning: 'Tiền bạc' },
      { hanzi: '银', pinyin: 'yín', meaning: 'Bạc' },
      { hanzi: '铁', pinyin: 'tiě', meaning: 'Sắt thép' },
    ],
    explanation: 'Chỉ các nguyên tố khoáng sản, vật dụng kim loại đúc tạo nên tiền tài, công cụ.'
  },
  {
    id: 'rad-10',
    radical: '火 / 灬',
    pinyin: 'huǒ',
    hanViet: 'Hỏa (Lửa / Bốn chấm hỏa)',
    meaning: 'Ngọn lửa, sức nóng, nấu nướng, bốc cháy',
    strokeCount: 4,
    examples: [
      { hanzi: '热', pinyin: 'rè', meaning: 'Nóng nực' },
      { hanzi: '烤', pinyin: 'kǎo', meaning: 'Nướng, quay' },
      { hanzi: '点', pinyin: 'diǎn', meaning: 'Chấm, điểm tâm, thắp lửa' },
    ],
    explanation: 'Hình ngọn lửa đang bùng cháy, thường gắn với nấu nướng, nhiệt độ cao.'
  }
];
