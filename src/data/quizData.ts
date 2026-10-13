import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Pinyin Mode
  {
    id: 'q-p1',
    type: 'pinyin',
    question: 'Phiên âm Pinyin chuẩn của chữ "谢谢" là gì?',
    subText: 'Chọn câu trả lời chính xác nhất kèm thanh điệu',
    options: ['xièxie', 'xiēxiē', 'xíxí', 'xièxié'],
    correctAnswer: 'xièxie',
    explanation: 'Chữ thứ nhất đọc thanh 4 "xiè", chữ thứ hai là thanh nhẹ "xie".'
  },
  {
    id: 'q-p2',
    type: 'pinyin',
    question: 'Chữ "高兴" (Vui mừng, phấn khởi) có pinyin là gì?',
    subText: 'Chú ý thanh điệu của từ',
    options: ['kāoxìng', 'gāoxìng', 'gǎoxìng', 'gāoshèng'],
    correctAnswer: 'gāoxìng',
    explanation: 'Gāo (thanh 1) + xìng (thanh 4) = gāoxìng.'
  },
  {
    id: 'q-p3',
    type: 'pinyin',
    question: 'Pinyin của từ "便宜" trong cụm "便宜一点" (Rẻ một chút) là gì?',
    subText: 'Lưu ý từ có nhiều cách đọc tùy ngữ cảnh',
    options: ['piányi', 'biànyí', 'piǎnyí', 'biānyì'],
    correctAnswer: 'piányi',
    explanation: 'Khi mang nghĩa là "giá rẻ", 便宜 đọc là piányi. Khi mang nghĩa là "tiện lợi, thuận tiện" đọc là biànyí.'
  },
  {
    id: 'q-p4',
    type: 'pinyin',
    question: 'Thanh điệu và pinyin của chữ "中国" là gì?',
    subText: 'Tên đất nước Trung Quốc',
    options: ['Zhōngguó', 'Zhòngguò', 'Zhǒngguǒ', 'Zhōngguò'],
    correctAnswer: 'Zhōngguó',
    explanation: 'Zhōng (thanh 1) + guó (thanh 2) = Zhōngguó.'
  },

  // Meaning Mode
  {
    id: 'q-m1',
    type: 'meaning',
    question: 'Từ "准备" (zhǔnbèi) có nghĩa là gì trong tiếng Việt?',
    subText: 'Hán Việt: Chuẩn bị',
    options: ['Chuẩn bị, dự định', 'Tiến hành', 'Nghi ngờ', 'Hoàn thành'],
    correctAnswer: 'Chuẩn bị, dự định',
    explanation: '准备 (zhǔnbèi) nghĩa là chuẩn bị, lên kế hoạch cho một việc gì đó.'
  },
  {
    id: 'q-m2',
    type: 'meaning',
    question: 'Thành ngữ "入乡随俗" (rù xiāng suí sú) tương đương với thành ngữ nào của Việt Nam?',
    subText: 'Thành ngữ 4 chữ thông dụng',
    options: ['Nhập gia tùy tục', 'Ăn quả nhớ kẻ trồng cây', 'Vạn sự khởi đầu nan', 'Nước chảy đá mòn'],
    correctAnswer: 'Nhập gia tùy tục',
    explanation: '入 (vào) + 乡 (làng) + 随 (theo) + 俗 (phong tục) = Nhập gia tùy tục.'
  },
  {
    id: 'q-m3',
    type: 'meaning',
    question: 'Câu "太贵了，能便宜一点吗？" dùng trong tình huống nào?',
    subText: 'Khẩu ngữ giao tiếp đời sống',
    options: ['Mặc cả trả giá khi mua sắm', 'Khen ngợi đồ ăn ngon', 'Hỏi đường đi sân bay', 'Chào hỏi đồng nghiệp'],
    correctAnswer: 'Mặc cả trả giá khi mua sắm',
    explanation: 'Nghĩa là "Đắt quá, có thể bớt rẻ hơn một chút được không?".'
  },
  {
    id: 'q-m4',
    type: 'meaning',
    question: 'Từ "坚持" (jiānchí) có nghĩa là gì?',
    subText: 'Hán Việt: Kiên trì',
    options: ['Kiên trì, giữ vững', 'Từ bỏ', 'Lo lắng', 'Vội vã'],
    correctAnswer: 'Kiên trì, giữ vững',
    explanation: '坚持 (jiānchí) mang ý nghĩa bền bỉ, kiên trì không bỏ cuộc.'
  },

  // Listening Mode
  {
    id: 'q-l1',
    type: 'listening',
    question: 'Hãy bấm nghe âm thanh và chọn chữ Hán chính xác:',
    audioPrompt: '机场',
    subText: 'Gợi ý: Phi trường / Sân bay (jīchǎng)',
    options: ['机场', '机会', '机器', '基础'],
    correctAnswer: '机场',
    explanation: 'Âm thanh phát ra là "jīchǎng" (机场 - Sân bay).'
  },
  {
    id: 'q-l2',
    type: 'listening',
    question: 'Hãy nghe phát âm và chọn chữ Hán tương ứng:',
    audioPrompt: '满意',
    subText: 'Gợi ý: Hài lòng / Mãn ý (mǎnyì)',
    options: ['满意', '同意', '主意', '愿意'],
    correctAnswer: '满意',
    explanation: 'Âm thanh phát ra là "mǎnyì" (满意 - Hài lòng, vừa ý).'
  },
  {
    id: 'q-l3',
    type: 'listening',
    question: 'Bấm nghe và nhận diện từ vựng:',
    audioPrompt: '喝水',
    subText: 'Gợi ý: Uống nước (hē shuǐ)',
    options: ['喝水', '吃饭', '说话', '看书'],
    correctAnswer: '喝水',
    explanation: 'Âm thanh phát ra là "hē shuǐ" (喝水 - Uống nước).'
  },

  // Sentence Order Mode
  {
    id: 'q-s1',
    type: 'sentence_order',
    question: 'Sắp xếp các từ sau thành câu hoàn chỉnh đúng ngữ pháp:',
    subText: 'Nghĩa tiếng Việt: "Hôm nay tôi đi Trung Quốc du lịch."',
    wordsForSentence: ['我', '今天', '去', '中国', '旅游'],
    options: ['我 今天 去 中国 旅游', '去 我 今天 中国 旅游', '今天 中国 我 去 旅游', '旅游 去 我 今天 中国'],
    correctAnswer: '我 今天 去 中国 旅游',
    explanation: 'Cấu trúc chuẩn tiếng Trung: Chủ ngữ (我) + Trạng từ thời gian (今天) + Động từ (去) + Nơi chốn (中国) + Mục đích (旅游).'
  },
  {
    id: 'q-s2',
    type: 'sentence_order',
    question: 'Sắp xếp từ để tạo thành câu hỏi:',
    subText: 'Nghĩa tiếng Việt: "Cái này bao nhiêu tiền?"',
    wordsForSentence: ['这个', '请问', '多少钱'],
    options: ['请问 这个 多少钱', '多少钱 这个 请问', '这个 多少钱 请问', '请问 多少钱 这个'],
    correctAnswer: '请问 这个 多少钱',
    explanation: 'Cấu trúc lịch sự: Lời chào hỏi/thưa gửi (请问) + Đối tượng (这个) + Nghi vấn giá cả (多少钱).'
  },
  {
    id: 'q-s3',
    type: 'sentence_order',
    question: 'Sắp xếp các từ sau thành câu hoàn chỉnh:',
    subText: 'Nghĩa tiếng Việt: "Thời tiết hôm nay rất đẹp."',
    wordsForSentence: ['今天', '天气', '很', '好'],
    options: ['今天 天气 很 好', '很 好 今天 天气', '天气 好 很 今天', '今天 很 好 天气'],
    correctAnswer: '今天 天气 很 好',
    explanation: 'Cấu trúc vị ngữ tính từ: Thời gian/Chủ ngữ (今天天气) + Phó từ chỉ mức độ (很) + Tính từ (好).'
  }
];
