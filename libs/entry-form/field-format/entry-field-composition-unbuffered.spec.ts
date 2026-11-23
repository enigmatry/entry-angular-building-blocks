import { FormControl } from '@angular/forms';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { dispatch, dispatchInput, renderHost, settle, typeText, unbuffered } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

describe('EntryFieldComposition', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('unbuffered, with EntryFieldFormatDirective', () => {
    it('parses input during a composition at once on Android when no buffer mode is provided, as Angular does', async() => {
      vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36');
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      expect(fixture.componentInstance.control().value).toBe(12);
    });

    it('parses IME input that repeats the text the field shows, so the control becomes dirty', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      dispatchInput(input, 'insertCompositionText');
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
      dispatchInput(input, 'insertFromComposition');
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
      dispatchInput(input, 'insertFromComposition');
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
      dispatchInput(input, 'insertFromComposition');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(12);
    });
  });
});
