import { describe, expect, it, vi } from 'vitest';
import { FieldFormatDateTestHostComponent } from './testing/field-format-date-test-host.component';
import { editedAmount, formattedDate } from './testing/field-format-test-data';
import { dispatch, focusSilently, renderHost, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

describe('EntryFieldFormatDirective', () => {
  describe('focus', () => {
    it('keeps the whole text selected when it was selected before the focus event', async() => {
      const { input } = await renderHost(FieldFormatTestHostComponent);

      input.select();
      dispatch(input, 'focus');
      expect([input.value, input.selectionStart, input.selectionEnd]).toStrictEqual([editedAmount, 0, editedAmount.length]);
    });

    it('leaves the caret at the end of the plain number when the text was not selected', async() => {
      const { input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      expect([input.selectionStart, input.selectionEnd]).toStrictEqual([editedAmount.length, editedAmount.length]);
    });

    it('keeps showing a Date in the format of its definition, and writes text that is typed over it to the model as text', async() => {
      const { fixture, input } = await renderHost(FieldFormatDateTestHostComponent);

      dispatch(input, 'focus');
      expect(input.value).toBe(formattedDate);
      typeText(input, '07-11-2026');
      expect(fixture.componentInstance.control.value).toBe('07-11-2026');
    });
  });

  describe('text that arrives without a focus event', () => {
    it('handles text put into an unfocused field as if the field had been focused and left: parsed, touched and formatted', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      typeText(input, '2.499');
      expect(control.value).toBe(2.499);
      expect(control.touched).toBe(true);
      expect(input.value).toBe('\u20ac2.50');
    });

    it('completes the blur once when a subscriber to the value moves the focus away while typed text is handled', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const touched = vi.spyOn(control, 'markAsTouched');
      control.valueChanges.subscribe(() => input.blur());

      input.focus();
      typeText(input, '2.499');
      expect(touched).toHaveBeenCalledTimes(1);
      expect(input.value).toBe('\u20ac2.50');
    });

    it('leaves text put into an unfocused field as it is when a subscriber to the value moves the focus into the field', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      control.valueChanges.subscribe(() => input.focus());

      typeText(input, '2.499');
      expect([input.value, control.touched]).toStrictEqual(['2.499', false]);
    });

    it('leaves typed text as it is when the field has focus although no focus event reached it', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      focusSilently(input);
      typeText(input, '2.499');
      expect(control.value).toBe(2.499);
      expect(control.touched).toBe(false);
      expect(input.value).toBe('2.499');
    });
  });
});
