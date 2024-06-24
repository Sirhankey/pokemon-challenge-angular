import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.audio.src = 'assets/audio/pokemon-theme.mp3';
    this.audio.load();
    this.audio.loop = true;
    this.audio.volume = 0.5;
  }

  play(): void {
    this.audio.play().catch(error => console.log('Error playing audio:', error));
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }
}

