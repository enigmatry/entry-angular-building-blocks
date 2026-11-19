import { describe, expect, it, vi } from 'vitest';
import { dispatch, dispatchImeInput, renderHost, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';
import { FieldFormatTextareaTestHostComponent } from './testing/field-format-textarea-test-host.component';

describe('EntryFieldComposition', () => {
  describe('IME input after a composition ended, with EntryFieldFormatDirective', () => {
    it.each<[string]>([
      ['insertFromComposition'],
      ['insertCompositionText']
    ])('keeps the typed amount when the IME sends an %s input event after a composition that was blurred', async inputType => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '2.499');
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      dispatchImeInput(input, inputType);
      expect(control.value).toBe(2.499);
      expect(input.value).toBe('\u20ac2.50');
    });

    it('commits a composition once when the IME repeats the composed text after it ends', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const commit = vi.spyOn(control, 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      input.value = '12';
      dispatchImeInput(input, 'insertCompositionText');
      expect(commit).not.toHaveBeenCalled();
      dispatch(input, 'compositionend');
      expect(commit).toHaveBeenCalledTimes(1);
      dispatchImeInput(input, 'insertCompositionText');
      expect(commit).toHaveBeenCalledTimes(1);
      expect(control.value).toBe(12);
    });

    it('parses input that repeats the composed text after the form wrote another value', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'compositionend');
      control.setValue(5);
      typeText(input, '12');
      expect(control.value).toBe(12);
    });

    it('parses the IME input after a composition when it changes the text', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'compositionend');
      input.value = '123';
      dispatchImeInput(input);
      expect(fixture.componentInstance.control().value).toBe(123);
      typeText(input, '12');
      expect(fixture.componentInstance.control().value).toBe(12);
    });

    it('keeps a form value with Windows line breaks when the IME sends an input event after the composition in a textarea', async() => {
      const host = FieldFormatTextareaTestHostComponent;
      const { fixture, input } = await renderHost<FieldFormatTextareaTestHostComponent, HTMLTextAreaElement>(host, [], 'textarea');
      const writtenText = 'third line\r\nfourth line';

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, 'draft');
      fixture.componentInstance.control.setValue(writtenText);
      dispatch(input, 'compositionend');
      dispatchImeInput(input);
      expect(input.value).toBe('third line\nfourth line');
      expect(fixture.componentInstance.control.value).toBe(writtenText);
    });

    it('keeps the typed amount when the field is blurred between the end of a composition and the IME input after it', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '2.499');
      dispatch(input, 'compositionend');
      dispatch(input, 'blur');
      dispatchImeInput(input);
      expect(fixture.componentInstance.control().value).toBe(2.499);
      expect(input.value).toBe('\u20ac2.50');
    });

    it('parses the composed text when a blurred composition ends before any input event arrived', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      input.value = '2.499';
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      expect(fixture.componentInstance.control().value).toBe(2.499);
      expect(input.value).toBe('\u20ac2.50');
    });

    it('commits the composed text once when the IME sends its only input event after the composition ended', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const commit = vi.spyOn(control, 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      input.value = '12';
      dispatch(input, 'compositionend');
      dispatchImeInput(input);
      expect(control.value).toBe(12);
      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
