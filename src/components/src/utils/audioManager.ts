class AudioManager {
  private audio: HTMLAudioElement;
  private isAudioPlaying = false;
  private volume = 0.5;
  
  constructor() {
    this.audio = new Audio();
    this.audio.volume = this.volume;
    this.audio.loop = true;
  }
  
  play(src: string) {
    if (this.audio.src !== src) {
      this.audio.src = src;
    }
    this.audio.play().then(() => { this.isAudioPlaying = true; })
  }
  
  togglePlay() {
    if (this.isAudioPlaying) {
      this.audio.pause();
      this.isAudioPlaying = false;
    } else {
      this.audio.play().then(() => this.isAudioPlaying = true)
    }
  }
  
  setVolume(value: number) {
    this.volume = value;
    this.audio.volume = this.volume;
  }
  
  getStatus() {
    return { isPlaying: this.isAudioPlaying, volume: this.volume };
  }
}

export default new AudioManager();
