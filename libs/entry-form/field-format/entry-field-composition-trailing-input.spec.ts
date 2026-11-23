import { FormControl } from '@angular/forms';
import { describe, expect, it, vi } from 'vitest';
import { dispatch, dispatchInput, renderHost, settle, typeText, unchangedInputs } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';
import { FieldFormatTextareaTestHostComponent } from './testing/field-format-textarea-test-host.component';

describe('EntryFieldComposition', () => {
  describe('input after a composition ended, with EntryFieldFormatDirective', () => {
    it.each(unchangedInputs)('keeps the typed amount when %s input event follows a composition that was blurred', async(_kind, inputType) => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '2.499');
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      dispatchInput(input, inputType);
      expect(control.value).toBe(2.499);
      expect(input.value).toBe('\u20ac2.50');
    });

    it.each(unchangedInputs)('commits a composition once when %s input event repeats the composed text after it ends', async(_kind, inputType) => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const commit = vi.spyOn(control, 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      input.value = '12';
      dispatchInput(input, 'insertCompositionText');
      expect(commit).not.toHaveBeenCalled();
      dispatch(input, 'compositionend');
      expect(commit).toHaveBeenCalledTimes(1);
      dispatchInput(input, inputType);
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

    it('parses the input event after a composition when it changes the text', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'compositionend');
      input.value = '123';
      dispatchInput(input, 'insertFromComposition');
      expect(fixture.componentInstance.control().value).toBe(123);
      typeText(input, '12');
      expect(fixture.componentInstance.control().value).toBe(12);
    });

    it('commits and formats text that an input event brings after a blurred composition, when the control updates on blur', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(null, { updateOn: 'blur' });
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '1');
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(1);
      input.value = '12';
      dispatchInput(input, 'insertFromComposition');
      expect(control.value).toBe(12);
      expect(input.value).toBe('\u20ac12.00');
    });

    it('keeps a form value with Windows line breaks when an input event follows the composition in a textarea', async() => {
      const host = FieldFormatTextareaTestHostComponent;
      const { fixture, input } = await renderHost<FieldFormatTextareaTestHostComponent, HTMLTextAreaElement>(host, [], 'textarea');
      const writtenText = 'third line\r\nfourth line';

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, 'draft');
      fixture.componentInstance.control.setValue(writtenText);
      dispatch(input, 'compositionend');
      dispatchInput(input);
      expect(input.value).toBe('third line\nfourth line');
      expect(fixture.componentInstance.control.value).toBe(writtenText);
    });

    it('keeps the typed amount when the field is blurred between the end of a composition and the input event after it', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '2.499');
      dispatch(input, 'compositionend');
      dispatch(input, 'blur');
      dispatchInput(input);
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

    it('commits the composed text once when its only input event arrives after the composition ended', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const commit = vi.spyOn(control, 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      input.value = '12';
      dispatch(input, 'compositionend');
      dispatchInput(input);
      expect(control.value).toBe(12);
      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
