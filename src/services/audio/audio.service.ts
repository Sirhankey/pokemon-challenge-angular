import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  public isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.audio.src = 'assets/audio/pokemon-theme.mp3';
    this.audio.load();
    this.audio.loop = true;
    this.audio.volume = 0.5;
  }

  play(): void {
    this.audio.play();
    this.isPlayingSubject.next(true);
  }

  pause(): void {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlayingSubject.next(false);
  }
}

