/* eslint-disable prefer-arrow/prefer-arrow-functions */
/// <reference types="@types/dom-mediacapture-record" />
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ResultDeclaration } from '../../models/response-declaration';
import { QtiInteractionElement } from '../qti-interaction.component';

@Component({
  templateUrl: './qti-custom-interaction.component.html',
  styleUrls: ['./qti-custom-interaction.component.scss']
})
export class QtiCustomInteractionComponent extends QtiInteractionElement implements AfterViewInit, OnInit, OnDestroy {
  isRecording = false;
  audioRecorded = false;
  playingAudio = false;
  audio: HTMLAudioElement;
  record: HTMLElement;
  soundClips: HTMLElement;

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.audio = document.createElement('audio');
    this.audio.hidden = true;
    this.audio.setAttribute('controls', '');
    this.audio.classList.add('class', 'listening');
    this.audio.controls = true;
    this.record = this.querySelector('.btn-record') as HTMLButtonElement;
    this.soundClips = this.querySelector('.sound-clips') as HTMLElement;
    this.soundClips.appendChild(this.audio);
  }

  ngAfterViewInit(): void {
    this.initAudioRecorder();
    this.audio.onended = () => {
      this.playingAudio = false;
    };
  }

  initAudioRecorder(): void {
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');

      const constraints = { audio: true };
      let chunks = [];

      const onSuccess = (stream: MediaStream) => {
        const mediaRecorder = new MediaRecorder(stream);

        this.record.onclick = () => {
          if (this.isRecording) {
            this.isRecording = false;
            mediaRecorder.stop();
            this.audioRecorded = true;
            console.log('recorder stopped');
          } else {
            this.isRecording = true;
            mediaRecorder.start();
            console.log('recorder started');
          }
        };

        mediaRecorder.onstop = (e) => {
          console.log('data available after MediaRecorder.stop() called.');

          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);
          this.audio.src = audioURL;
          this.audioRecorded = true;
          console.log('recorder stopped');
        };

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
      };

      const onError = (err: string) => {
        console.log('The following error occured: ' + err);
      };

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }

  playOrStopAudio() {
    if (this.playingAudio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.playingAudio = false;
    }
    else {
      this.audio.play();
      this.playingAudio = true;
    }
  }

  hasResult(): boolean {
    return false;
  }
  getResult(): ResultDeclaration {
    return { identifier: this.responseIdentifier, values: [] };
  }

  reset(): void {
  }

  showAnswers(): void {
  }
}
