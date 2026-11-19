import { COMPOSITION_BUFFER_MODE, FormControl } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { dispatch, dispatchImeInput, renderHost, settle, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

const unbuffered = [{ provide: COMPOSITION_BUFFER_MODE, useValue: false }];

describe('EntryFieldComposition', () => {
  describe('unbuffered, with EntryFieldFormatDirective', () => {
    it('parses IME input that repeats the text the field shows, so the control becomes dirty', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      dispatchImeInput(input, 'insertCompositionText');
      dispatch(input, 'compositionend');
      expect(fixture.componentInstance.control().dirty).toBe(true);
    });

    it('parses the final text that the IME announces only after the composition ended', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '1');
      input.value = '12';
      dispatch(input, 'compositionend');
      dispatchImeInput(input);
      expect(fixture.componentInstance.control().value).toBe(12);
    });

    it('parses the final text before it completes a blur that happened during the composition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);
      const control = new FormControl<number | null>(null, { updateOn: 'blur' });
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '1');
      input.value = '12';
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      dispatchImeInput(input);
      expect(control.value).toBe(12);
      expect(input.value).toBe('\u20ac12.00');
    });

    it('parses IME input that repeats earlier text after the form wrote another value during a new composition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'compositionend');
      dispatch(input, 'compositionstart');
      control.setValue(5);
      dispatchImeInput(input);
      dispatch(input, 'compositionend');
      expect(control.value).toBe(12);
    });
  });
});
