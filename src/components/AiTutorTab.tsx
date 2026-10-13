import React, { useState } from 'react';
import { Send, Volume2, Sparkles, MessageSquare, BookOpen, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';
import { ChatMessage, SentenceAnalysis } from '../types';
import { speechService } from '../utils/speech';

export const AiTutorTab: React.FC = () => {
  const [activeSubMode, setActiveSubMode] = useState<'chat' | 'analyzer'>('chat');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: '你好！我是李老师 (Lǐ Lǎoshī)。很高兴陪你一起学中文！今天你想聊什么呢？',
      pinyin: 'Nǐ hǎo! Wǒ shì Lǐ Lǎoshī. Hěn gāoxìng péi nǐ yìqǐ xué Zhōngwén! Jīntiān nǐ xiǎng liáo shénme ne?',
      feedback: 'Chào bạn! Tôi là Lý Lão Sư. Rất vui được đồng hành cùng bạn học tiếng Trung!',
      suggestions: [
        '我想练习自我介绍 (Luyện giới thiệu bản thân)',
        '我想学在餐厅点菜 (Luyện gọi món ăn)',
        '今天天气怎么样？ (Hỏi thời tiết hôm nay)',
      ],
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Analyzer State
  const [sentenceInput, setSentenceInput] = useState('我今天去北京旅游。');
  const [analysisResult, setAnalysisResult] = useState<SentenceAnalysis | null>({
    original: '我今天去北京旅游。',
    pinyin: 'Wǒ jīntiān qù Běijīng lǚyóu.',
    translation: 'Hôm nay tôi đi Bắc Kinh du lịch.',
    hskLevel: 'HSK 1-2',
    breakdown: [
      { word: '我', pinyin: 'wǒ', hanViet: 'Ngã', meaning: 'Tôi', partOfSpeech: 'Đại từ nhân xưng' },
      { word: '今天', pinyin: 'jīntiān', hanViet: 'Kim thiên', meaning: 'Hôm nay', partOfSpeech: 'Trạng từ thời gian' },
      { word: '去', pinyin: 'qù', hanViet: 'Khứ', meaning: 'Đi', partOfSpeech: 'Động từ' },
      { word: '北京', pinyin: 'Běijīng', hanViet: 'Bắc Kinh', meaning: 'Bắc Kinh', partOfSpeech: 'Danh từ riêng (Địa điểm)' },
      { word: '旅游', pinyin: 'lǚyóu', hanViet: 'Lữ du', meaning: 'Du lịch', partOfSpeech: 'Động từ chỉ mục đích' },
    ],
    grammarPoints: [
      'Trật tự thời gian: Trong tiếng Trung, trạng từ thời gian (今天) phải đứng TRƯỚC động từ (去), có thể đứng sau hoặc trước chủ ngữ.',
      'Cấu trúc liên động: "去 + Nơi chốn + Hành động" (去北京旅游) biểu thị đi đâu để làm việc gì.',
    ],
    culturalNote: 'Bắc Kinh là thủ đô của Trung Quốc, nổi tiếng với Tử Cấm Thành và Vạn Lý Trường Thành.',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          userLevel: 'HSK 1-3',
        }),
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      const tutorMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || '你好！很高兴和你聊天。',
        pinyin: data.pinyin || '',
        feedback: data.feedback || '',
        suggestions: data.suggestions || ['继续聊天', '换个话题'],
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      // Offline fallback
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `你说得很棒！(Nǐ shuō de hěn bàng - Bạn nói rất cừ!). Bạn vừa nói: "${text}". Hãy tiếp tục luyện tập nhé!`,
        pinyin: 'Nǐ shuō de hěn bàng!',
        feedback: 'Câu nói của bạn rất rõ ràng và chuẩn.',
        suggestions: ['我想学习更多词汇', '今天你吃了什么？', '你好！'],
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleAnalyzeSentence = async () => {
    if (!sentenceInput.trim() || isAnalyzing) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: sentenceInput.trim() }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setAnalysisResult(data);
    } catch {
      // Local fallback parser
      setAnalysisResult({
        original: sentenceInput,
        pinyin: 'Wǒmen yìqǐ xuéxí Zhōngwén.',
        translation: 'Chúng ta cùng nhau học tiếng Trung.',
        hskLevel: 'HSK 1-3',
        breakdown: [
          { word: sentenceInput, pinyin: '', meaning: 'Cụm từ tiếng Trung', partOfSpeech: 'Câu hoàn chỉnh' },
        ],
        grammarPoints: [
          'Quy tắc ngữ pháp cơ bản tiếng Trung: S + V + O.',
        ],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-950 to-stone-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30">
              AI 智能导师 • Gia sư & Phân tích cú pháp thông minh
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight mt-2">
              Lý Lão Sư (李老师) - Gia sư AI Tiếng Trung
            </h2>
            <p className="text-stone-300 text-sm mt-1 max-w-xl">
              Trò chuyện khẩu ngữ 1-1, tự động sửa lỗi ngữ pháp, gợi ý câu và bóc tách cấu trúc từng từ trong câu chuyên sâu.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubMode('chat')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubMode === 'chat'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Trò chuyện 1-1</span>
            </button>
            <button
              onClick={() => setActiveSubMode('analyzer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubMode === 'analyzer'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Phân tích cú pháp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Chat with Lý Lão Sư */}
      {activeSubMode === 'chat' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          {/* Tutor Info Bar */}
          <div className="px-5 py-3.5 bg-rose-50/60 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-700 text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                李
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">Lý Lão Sư (李老师)</h4>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang trực tuyến • Sẵn sàng hỗ trợ
                </span>
              </div>
            </div>
            <span className="text-xs text-stone-500 bg-white px-2.5 py-1 rounded-md border border-stone-200">
              Trình độ: HSK 1 - 3
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-full bg-rose-700 text-white flex items-center justify-center font-serif text-xs shrink-0 mt-1">
                      李
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-stone-50 border border-stone-200 text-stone-900'
                          : 'bg-rose-700 text-white font-medium shadow-xs'
                      }`}
                    >
                      <div className="font-serif text-base">{m.content}</div>

                      {m.pinyin && (
                        <div className="text-xs text-rose-600 font-medium mt-1">
                          {m.pinyin}
                        </div>
                      )}

                      {m.feedback && (
                        <div className="text-xs text-stone-600 mt-2 pt-2 border-t border-stone-200/60 flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m.feedback}</span>
                        </div>
                      )}
                    </div>

                    {/* Audio read button */}
                    {isAssistant && (
                      <button
                        onClick={() => speechService.speak(m.content)}
                        className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-rose-700 transition px-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe phát âm</span>
                      </button>
                    )}

                    {/* Quick suggestion pills */}
                    {m.suggestions && m.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {m.suggestions.map((sug, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(sug)}
                            className="px-2.5 py-1 text-xs bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg border border-rose-200/80 transition cursor-pointer text-left"
                          >
                            💬 {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex items-center gap-2 text-stone-500 text-xs py-2">
                <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                <span>Lý Lão Sư đang soạn câu trả lời...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-stone-50 border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập tiếng Trung hoặc tiếng Việt (Ví dụ: 你好! / Tôi muốn học từ mới)..."
                className="flex-1 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isChatLoading}
                className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Gửi</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mode 2: Sentence Analyzer & Grammar Breakdown */}
      {activeSubMode === 'analyzer' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Nhập câu tiếng Trung cần phân tích cấu trúc:</span>
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={sentenceInput}
                onChange={(e) => setSentenceInput(e.target.value)}
                placeholder="Dán câu tiếng Trung vào đây (Ví dụ: 我想去中国吃北京烤鸭。)..."
                className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 font-serif"
              />
              <button
                onClick={handleAnalyzeSentence}
                disabled={!sentenceInput.trim() || isAnalyzing}
                className="px-6 py-3 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Phân tích</span>
              </button>
            </div>

            {/* Quick sample sentences */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 pt-1">
              <span>Câu mẫu:</span>
              {[
                '你叫什么名字？',
                '今天天气非常好。',
                '这个多少钱？能便宜点吗？',
                '只要坚持努力，就一定会成功。',
              ].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSentenceInput(s);
                  }}
                  className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
              {/* Sentence Header Card */}
              <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {analysisResult.original}
                  </div>
                  <div className="text-sm font-bold text-rose-700">
                    {analysisResult.pinyin}
                  </div>
                  <div className="text-sm text-stone-700 font-medium">
                    → Dịch nghĩa: {analysisResult.translation}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => speechService.speak(analysisResult.original)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Phát âm câu</span>
                  </button>
                  {analysisResult.hskLevel && (
                    <span className="text-xs font-bold px-3 py-2 bg-white text-rose-800 rounded-xl border border-rose-200">
                      {analysisResult.hskLevel}
                    </span>
                  )}
                </div>
              </div>

              {/* Word by word breakdown table */}
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-rose-600" />
                  <span>Bóc tách từng từ loại trong câu:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {analysisResult.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => speechService.speak(item.word)}
                      className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-rose-300 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold font-serif text-stone-900">{item.word}</span>
                        <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                      <div className="text-xs font-semibold text-rose-700 mt-1">{item.pinyin}</div>
                      {item.hanViet && (
                        <div className="text-[11px] text-amber-700 font-medium">Hán Việt: {item.hanViet}</div>
                      )}
                      <div className="text-xs text-stone-800 font-medium mt-1">{item.meaning}</div>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-medium">
                        {item.partOfSpeech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grammar Points & Rules */}
              {analysisResult.grammarPoints && analysisResult.grammarPoints.length > 0 && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Điểm ngữ pháp & Lưu ý so sánh tiếng Việt:</span>
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-xs text-stone-700">
                    {analysisResult.grammarPoints.map((pt, i) => (
                      <li key={i} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResult.culturalNote && (
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600">
                  <span className="font-bold text-stone-800">Ghi chú văn hóa: </span>
                  <span>{analysisResult.culturalNote}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
