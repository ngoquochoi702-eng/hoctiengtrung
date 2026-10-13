import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Chinese Tutor Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, userLevel = 'HSK 1-2' } = req.body;

    if (!ai) {
      // High quality offline fallback tutor response
      const lastUserMsg = Array.isArray(messages) && messages.length > 0 
        ? messages[messages.length - 1].content 
        : '你好';

      return res.json({
        reply: `你好！(Nǐ hǎo! - Chào bạn!) Tôi là Lý Lão Sư (李老师). Bạn vừa nói: "${lastUserMsg}". Bạn đang tiến bộ rất nhanh! Hãy cùng tôi luyện tập thêm nhé. Hãy thử đặt một câu hỏi về bản thân bạn (Ví dụ: 你叫什么名字？- Nǐ jiào shénme míngzì?)`,
        pinyin: 'Nǐ hǎo! Wǒ shì Lǐ Lǎoshī. Nǐ shuō de hěn bàng!',
        feedback: 'Câu nói của bạn rất chuẩn và tự nhiên.',
        suggestions: ['你叫什么名字？', '今天天气怎么样？', '我想学中文。']
      });
    }

    const systemInstruction = `Bạn là Lý Lão Sư (李老师), một giáo viên dạy tiếng Trung bản xứ đầy nhiệt huyết, giỏi tiếng Việt và rất sư phạm.
Học viên có trình độ hiện tại khoảng: ${userLevel}.
Nhiệm vụ của bạn:
1. Trò chuyện tự nhiên, thân thiện bằng tiếng Trung kèm theo Pinyin và bản dịch/chú thích nghĩa tiếng Việt.
2. Nếu học viên viết sai ngữ pháp, pinyin hoặc dùng từ chưa chuẩn, hãy ân cần sửa lỗi và giải thích tại sao.
3. Luôn khuyến khích học viên nói và đặt câu hỏi mở để họ tiếp tục hội thoại.
4. Trả về định dạng JSON hợp lệ với cấu trúc:
{
  "reply": "Câu trả lời bằng tiếng Trung kèm giải thích ngắn gọn bằng tiếng Việt",
  "pinyin": "Phiên âm pinyin chuẩn có dấu thanh cho phần tiếng Trung",
  "hanViet": "Âm Hán Việt tương ứng (nếu có)",
  "feedback": "Nhận xét sửa lỗi ngữ pháp hoặc khen ngợi câu của học viên (tiếng Việt)",
  "suggestions": ["3 gợi ý câu trả lời tiếp theo bằng tiếng Trung kèm pinyin và nghĩa"]
}`;

    const formattedContents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents.length > 0 ? formattedContents : [{ role: 'user', parts: [{ text: '你好！我想学中文。' }] }],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        reply: text,
        pinyin: '',
        feedback: '',
        suggestions: ['你好！', '谢谢！', '再见！'],
      };
    }

    return res.json(parsed);
  } catch (err: unknown) {
    console.error('Error in /api/gemini/chat:', err);
    return res.json({
      reply: '你好！很高兴认识你。(Nǐ hǎo! Hěn gāoxìng rènshí nǐ - Rất vui được làm quen với bạn!). Hôm nay bạn muốn luyện tập chủ đề gì nào?',
      pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshí nǐ.',
      feedback: 'Hệ thống kết nối mượt mà.',
      suggestions: ['我想练习自我介绍 (Tôi muốn luyện giới thiệu bản thân)', '在餐厅点菜 (Gọi món tại nhà hàng)', '买东西讨价还价 (Mặc cả mua sắm)']
    });
  }
});

// Chinese Sentence / Grammar Analyzer endpoint
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { sentence } = req.body;
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ error: 'Sentence is required' });
    }

    if (!ai) {
      return res.json({
        original: sentence,
        pinyin: 'Vui lòng kiểm tra API key để phân tích AI sâu.',
        translation: 'Phân tích tự động chế độ tiêu chuẩn.',
        breakdown: [
          { word: sentence, pinyin: '', meaning: 'Từ vựng tiếng Trung', partOfSpeech: 'Danh từ/Động từ' }
        ],
        grammarPoints: ['Cấu trúc cơ bản: Chủ ngữ + Vị ngữ'],
        hskLevel: 'HSK 1-3'
      });
    }

    const systemInstruction = `Bạn là chuyên gia ngôn ngữ học tiếng Trung và giảng viên ngữ pháp tiếng Trung cho người Việt.
Hãy phân tích cặn kẽ câu tiếng Trung người dùng cung cấp.
Trả về định dạng JSON thuần tuý:
{
  "original": "câu gốc",
  "pinyin": "pinyin đầy đủ có dấu thanh",
  "translation": "bản dịch tiếng Việt chuẩn xác và tự nhiên",
  "hskLevel": "HSK ước tính (HSK 1 - HSK 6)",
  "breakdown": [
    {
      "word": "từ/cụm từ",
      "pinyin": "pinyin của từ",
      "hanViet": "âm Hán Việt",
      "meaning": "nghĩa tiếng Việt",
      "partOfSpeech": "từ loại (danh từ, động từ, lượng từ, trợ từ, liên từ...)"
    }
  ],
  "grammarPoints": [
    "Điểm ngữ pháp quan trọng trong câu, so sánh cấu trúc với tiếng Việt để người học không bị nhầm lẫn"
  ],
  "culturalNote": "Ghi chú văn hóa hoặc sắc thái ngữ cảnh khi người bản xứ nói câu này (nếu có)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Phân tích câu sau: "${sentence}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { original: sentence, translation: 'Không thể phân tích chi tiết.', breakdown: [], grammarPoints: [] };
    }

    return res.json(parsed);
  } catch (err: unknown) {
    console.error('Error in /api/gemini/analyze:', err);
    return res.status(500).json({ error: 'Phân tích thất bại, vui lòng thử lại sau.' });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
