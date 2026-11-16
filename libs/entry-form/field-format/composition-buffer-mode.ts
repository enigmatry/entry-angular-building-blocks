import { inject } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

const isAndroid = (): boolean => typeof navigator !== 'undefined' && /android (\d+)/iu.test(navigator.userAgent);

export const compositionBufferMode = (): boolean => inject(COMPOSITION_BUFFER_MODE, { optional: true }) ?? !isAndroid();
