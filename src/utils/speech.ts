// Web Speech API utility for Mandarin Chinese (zh-CN)

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private isInitialized = false;
  private preferredRate = 0.9; // Slightly natural for learners

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize Chinese voices: zh-CN, zh, cmn
    const zhVoice = voices.find(v => v.lang.includes('zh-CN') || v.lang.includes('cmn') || v.lang.toLowerCase().includes('chinese') || v.lang.includes('zh'));
    if (zhVoice) {
      this.voice = zhVoice;
      this.isInitialized = true;
    }
  }

  public setRate(rate: number) {
    this.preferredRate = Math.max(0.5, Math.min(1.5, rate));
  }

  public getRate(): number {
    return this.preferredRate;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public speak(text: string, customRate?: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('Speech synthesis not supported in this browser');
        resolve(false);
        return;
      }

      this.stop(); // Stop any currently playing audio

      if (!this.voice) {
        this.initVoices();
      }

      const cleanText = text.replace(/[（(].*?[)）]/g, '').trim();
      if (!cleanText) {
        resolve(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'zh-CN';
      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.rate = customRate !== undefined ? customRate : this.preferredRate;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        resolve(true);
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        resolve(false);
      };

      this.synth.speak(utterance);
    });
  }
}

export const speechService = new SpeechService();
