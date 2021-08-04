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
  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.initAudioRecorder();
  }

  initAudioRecorder(): void {
    // set up basic variables for app

    const record = this.querySelector('.record') as HTMLButtonElement;
    const stop = this.querySelector('.stop') as HTMLButtonElement;
    const soundClips = this.querySelector('.sound-clips') as HTMLElement;
    const canvas = this.querySelector('.visualizer') as HTMLCanvasElement;
    const mainSection = this.querySelector('.main-controls') as HTMLElement;

    // disable stop button while not recording

    stop.disabled = true;

    // visualiser setup - create web audio api context and canvas

    let audioCtx: AudioContext;
    const canvasCtx = canvas.getContext('2d');

    // main block for doing the audio recording

    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');

      const constraints = { audio: true };
      let chunks: any[] | undefined = [];

      const onSuccess = (stream: MediaStream) => {
        const mediaRecorder = new MediaRecorder(stream);

        visualize(stream);

        record.onclick = () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log('recorder started');
          record.style.background = 'red';

          stop.disabled = false;
          record.disabled = true;
        };

        stop.onclick = () => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log('recorder stopped');
          record.style.background = '';
          record.style.color = '';
          stop.disabled = true;
          record.disabled = false;
        };

        mediaRecorder.onstop = (e: any) => {
          console.log('data available after MediaRecorder.stop() called.');

          const clipName = prompt('Enter a name for your sound clip?', 'My unnamed clip');

          const clipContainer = document.createElement('article');
          const clipLabel = document.createElement('p');
          const audio = document.createElement('audio');
          const deleteButton = document.createElement('button');

          clipContainer.classList.add('clip');
          audio.setAttribute('controls', '');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'delete';

          if (clipName === null) {
            clipLabel.textContent = 'My unnamed clip';
          } else {
            clipLabel.textContent = clipName;
          }

          clipContainer.appendChild(audio);
          clipContainer.appendChild(clipLabel);
          clipContainer.appendChild(deleteButton);
          soundClips.appendChild(clipContainer);

          audio.controls = true;
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
          console.log('recorder stopped');

          deleteButton.onclick = (event) => {
            const evtTgt = event.target as HTMLElement;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          };

          clipLabel.onclick = () => {
            const existingName = clipLabel.textContent;
            const newClipName = prompt('Enter a new name for your sound clip?');
            if (newClipName === null) {
              clipLabel.textContent = existingName;
            } else {
              clipLabel.textContent = newClipName;
            }
          };
        };

        mediaRecorder.ondataavailable = (e: { data: any }) => {
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

    function visualize(stream: MediaStream) {
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }

      const source = audioCtx.createMediaStreamSource(stream);

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      draw();

      function draw() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        const sliceWidth = WIDTH * 1.0 / bufferLength;
        let x = 0;


        for (let i = 0; i < bufferLength; i++) {

          const v = dataArray[i] / 128.0;
          const y = v * HEIGHT / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();

      }
    }

    window.onresize = () => {
      canvas.width = mainSection.offsetWidth;
    };

    // window.onresize();
  }

  hasResult(): boolean {
    return false;
  }
  getResult(): ResultDeclaration {
    return null;
  }

  reset(): void {
  }

  showAnswers(): void {
  }
}
