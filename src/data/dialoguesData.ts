import { DialogueTopic } from '../types';

export const DIALOGUES_LIST: DialogueTopic[] = [
  {
    id: 'dia-1',
    titleZh: '初次见面 - Chào hỏi & Làm quen',
    titleVi: 'Lần đầu gặp mặt & Tự giới thiệu bản thân',
    level: 'HSK 1 - Cơ bản',
    icon: 'Handshake',
    description: 'Học cách chào hỏi lịch sự, hỏi tên, quốc tịch và nghề nghiệp trong lần đầu gặp gỡ.',
    keyVocabulary: [
      { zh: '认识', pinyin: 'rènshi', vi: 'Quen biết' },
      { zh: '高兴', pinyin: 'gāoxìng', vi: 'Vui mừng' },
      { zh: '贵姓', pinyin: 'guìxìng', vi: 'Quý danh / Quý tính' },
      { zh: '留学生', pinyin: 'liúxuéshēng', vi: 'Du học sinh' }
    ],
    lines: [
      {
        speaker: 'A',
        speakerName: 'Trương Vĩ (张伟)',
        zh: '你好！请问您贵姓？',
        pinyin: 'Nǐ hǎo! Qǐngwèn nín guìxìng?',
        vi: 'Xin chào! Xin hỏi quý danh của bạn là gì?'
      },
      {
        speaker: 'B',
        speakerName: 'Minh (小明)',
        zh: '免贵姓阮，我叫阮文明。你是中国人吗？',
        pinyin: 'Miǎn guì xìng Ruǎn, wǒ jiào Ruǎn Wénmíng. Nǐ shì Zhōngguó rén ma?',
        vi: 'Tôi họ Nguyễn, tên tôi là Nguyễn Văn Minh. Bạn là người Trung Quốc phải không?'
      },
      {
        speaker: 'A',
        speakerName: 'Trương Vĩ (张伟)',
        zh: '是的，我是北京人。很高兴认识你！',
        pinyin: 'Shì de, wǒ shì Běijīng rén. Hěn gāoxìng rènshi nǐ!',
        vi: 'Đúng vậy, tôi là người Bắc Kinh. Rất vui được quen biết bạn!'
      },
      {
        speaker: 'B',
        speakerName: 'Minh (小明)',
        zh: '认识你我也很高兴！我是来自越南的留学生。',
        pinyin: 'Rènshi nǐ wǒ yě hěn gāoxìng! Wǒ shì láizì Yuènán de liúxuéshēng.',
        vi: 'Quen bạn tôi cũng rất vui! Tôi là du học sinh đến từ Việt Nam.'
      }
    ]
  },
  {
    id: 'dia-2',
    titleZh: '在餐厅点菜 - Gọi món tại nhà hàng',
    titleVi: 'Kinh nghiệm gọi món ăn ngon tại nhà hàng Trung Hoa',
    level: 'HSK 2 - Giao tiếp',
    icon: 'Utensils',
    description: 'Nắm vững các câu khẩu ngữ khi gọi món, hỏi món đặc sắc, độ cay và thanh toán.',
    keyVocabulary: [
      { zh: '菜单', pinyin: 'càidān', vi: 'Thực đơn' },
      { zh: '招牌菜', pinyin: 'zhāopáicài', vi: 'Món đặc sản/món tủ' },
      { zh: '微辣', pinyin: 'wēilà', vi: 'Cay ít/cay nhẹ' },
      { zh: '买单', pinyin: 'mǎidān', vi: 'Thanh toán tiền' }
    ],
    lines: [
      {
        speaker: 'A',
        speakerName: 'Phục vụ (服务员)',
        zh: '欢迎光临！请问几位？请这边坐。',
        pinyin: 'Huānyíng guānglín! Qǐngwèn jǐ wèi? Qǐng zhèbiān zuò.',
        vi: 'Kính chào quý khách! Xin hỏi có mấy người ạ? Xin mời ngồi lối này.'
      },
      {
        speaker: 'B',
        speakerName: 'Khách (顾客)',
        zh: '两位。服务员，请给我们一份菜单。',
        pinyin: 'Liǎng wèi. Fúwùyuán, qǐng gěi wǒmen yí fèn càidān.',
        vi: 'Hai người. Phục vụ ơi, cho chúng tôi xin quyển thực đơn với.'
      },
      {
        speaker: 'A',
        speakerName: 'Phục vụ (服务员)',
        zh: '好的。本店的招牌菜是北京烤鸭和宫保鸡丁，非常受欢迎。',
        pinyin: 'Hǎo de. Běndiàn de zhāopáicài shì Běijīng kǎoyā hé Gōngbǎo jīdīng, fēicháng shòu huānyíng.',
        vi: 'Dạ vâng. Món tủ của quán là Vịt quay Bắc Kinh và Gà Kung Pao xào ớt, rất được ưa chuộng.'
      },
      {
        speaker: 'B',
        speakerName: 'Khách (顾客)',
        zh: '那就要一份北京烤鸭，再来一碗米饭。请少放辣，谢谢！',
        pinyin: 'Nà jiù yào yí fèn Běijīng kǎoyā, zài lái yì wǎn mǐfàn. Qǐng shǎo fàng là, xièxie!',
        vi: 'Vậy cho một phần vịt quay Bắc Kinh, thêm một bát cơm trắng. Làm ơn cho ít cay thôi nhé, cảm ơn!'
      }
    ]
  },
  {
    id: 'dia-3',
    titleZh: '在市场讨价还价 - Mua sắm mặc cả',
    titleVi: 'Nghệ thuật trả giá & mua đồ lưu niệm khi đi chợ',
    level: 'HSK 2 - Thực tế',
    icon: 'ShoppingBag',
    description: 'Học cách hỏi giá, chê đắt khéo léo và thương lượng mức giá tốt nhất.',
    keyVocabulary: [
      { zh: '多少钱', pinyin: 'duōshao qián', vi: 'Bao nhiêu tiền' },
      { zh: '太贵了', pinyin: 'tài guì le', vi: 'Đắt quá' },
      { zh: '打折', pinyin: 'dǎzhé', vi: 'Giảm giá' },
      { zh: '便宜一点', pinyin: 'piányi yìdiǎn', vi: 'Bớt rẻ hơn chút' }
    ],
    lines: [
      {
        speaker: 'B',
        speakerName: 'Người mua (买家)',
        zh: '老板，这件旗袍多少钱一件？',
        pinyin: 'Lǎobǎn, zhè jiàn qípáo duōshao qián yí jiàn?',
        vi: 'Ông chủ ơi, chiếc sườn xám này bao nhiêu tiền một bộ vậy?'
      },
      {
        speaker: 'A',
        speakerName: 'Chủ tiệm (店主)',
        zh: '这件质量特别好，纯丝绸的，三百块。',
        pinyin: 'Zhè jiàn zhìliàng tèbié hǎo, chún sīchóu de, sānbǎi kuài.',
        vi: 'Bộ này chất lượng cực tốt, lụa tơ tằm nguyên chất đấy, ba trăm tệ.'
      },
      {
        speaker: 'B',
        speakerName: 'Người mua (买家)',
        zh: '哎呀，太贵了！能便宜一点吗？两百块行不行？',
        pinyin: 'Āiyā, tài guì le! Néng piányi yìdiǎn ma? Liǎngbǎi kuài xíng bù xíng?',
        vi: 'Ái chà, đắt quá! Có thể bớt rẻ chút không? Hai trăm tệ được không ông chủ?'
      },
      {
        speaker: 'A',
        speakerName: 'Chủ tiệm (店主)',
        zh: '两百太低了，亏本啦！看你真心喜欢，两百五十块拿走吧！',
        pinyin: 'Liǎngbǎi tài dī le, kuīběn la! Kàn nǐ zhēnxīn xǐhuan, liǎngbǎi wǔshí kuài ná zǒu ba!',
        vi: 'Hai trăm thấp quá, lỗ vốn mất! Thấy bạn thật lòng thích, hai trăm năm mươi tệ lấy đi nhé!'
      }
    ]
  },
  {
    id: 'dia-4',
    titleZh: '打车与问路 - Đi lại & Hỏi đường',
    titleVi: 'Bắt taxi, chỉ đường và xác định phương hướng du lịch',
    level: 'HSK 3 - Nâng cao',
    icon: 'Navigation',
    description: 'Tự tin khi di chuyển bằng taxi, tàu điện ngầm hoặc hỏi đường người đi đường.',
    keyVocabulary: [
      { zh: '师傅', pinyin: 'shīfu', vi: 'Bác tài, sư phụ' },
      { zh: '转弯', pinyin: 'zhuǎnwān', vi: 'Rẽ, quẹo' },
      { zh: '红绿灯', pinyin: 'hónglǜdēng', vi: 'Đèn giao thông' },
      { zh: '目的地', pinyin: 'mùdìdì', vi: 'Điểm đến' }
    ],
    lines: [
      {
        speaker: 'A',
        speakerName: 'Tài xế (司机)',
        zh: '您好，请问您去哪里？',
        pinyin: 'Nín hǎo, qǐngwèn nín qù nǎlǐ?',
        vi: 'Chào anh, xin hỏi anh muốn đi đâu ạ?'
      },
      {
        speaker: 'B',
        speakerName: 'Hành khách (乘客)',
        zh: '师傅，我想去故宫博物院，大概需要多长时间？',
        pinyin: 'Shīfu, wǒ xiǎng qù Gùgōng Bówùyuàn, dàgài xūyào duō cháng shíjiān?',
        vi: 'Bác tài ơi, tôi muốn đến Viện Bảo tàng Cố Cung, đi mất khoảng bao lâu vậy?'
      },
      {
        speaker: 'A',
        speakerName: 'Tài xế (司机)',
        zh: '现在不堵车，大概二十分钟就能到。您系好安全带。',
        pinyin: 'Xiànzài bù dǔchē, dàgài èrshí fēnzhōng jiù néng dào. Nín jì hǎo ānquándài.',
        vi: 'Giờ không kẹt xe, tầm hai mươi phút là tới nơi thôi. Anh thắt dây an toàn vào nhé.'
      },
      {
        speaker: 'B',
        speakerName: 'Hành khách (乘客)',
        zh: '好的，到了前面的路口麻烦您停一下。谢谢！',
        pinyin: 'Hǎo de, dào le qiánmiàn de lùkǒu máfan nín tíng yíxià. Xièxie!',
        vi: 'Vâng ạ, đến ngã rẽ phía trước phiền bác dừng lại giúp tôi nhé. Cảm ơn bác!'
      }
    ]
  }
];
