import { FormControl } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { editedAmount, formattedAmount, formattedWrittenAmount, writtenAmount } from './testing/field-format-test-data';
import { loseFocusSilently, renderHost, settle, typeText, withoutBlurEvent } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

describe('EntryFieldFormatDirective', () => {
  describe('disabled', () => {
    it('disables the input when the control is disabled', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      fixture.componentInstance.control().disable();
      expect(input.disabled).toBe(true);
    });

    it('returns to the plain number when a field that kept its focus while disabled is enabled again', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      input.focus();
      expect(input.value).toBe(editedAmount);
      control.disable();
      expect(input.value).toBe(formattedAmount);
      control.enable();
      expect(input.value).toBe(editedAmount);
    });

    it('keeps showing the formatted value when a field that lost its focus without a blur event while disabled is enabled again', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      input.focus();
      control.disable();
      expect(input.value).toBe(formattedAmount);
      loseFocusSilently(input);
      control.enable();
      expect(input.value).toBe(formattedAmount);
      control.setValue(writtenAmount);
      expect(input.value).toBe(formattedWrittenAmount);
    });

    it('keeps the text being typed when the control is enabled while it already is', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      input.focus();
      typeText(input, '1.');
      fixture.componentInstance.control().enable();
      expect(input.value).toBe('1.');
    });

    it('keeps a pending value when the focused field is disabled without a blur event, and commits it at the next blur', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(1, { updateOn: 'blur' });
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      input.focus();
      typeText(input, '7');
      withoutBlurEvent(input, () => control.disable());
      expect(control.value).toBe(1);
      control.enable();
      input.focus();
      input.blur();
      expect(control.value).toBe(7);
    });

    it('shows the formatted value after a field that another binding disabled, and that lost its focus silently, is enabled', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      input.focus();
      input.disabled = true;
      loseFocusSilently(input);
      control.enable();
      control.setValue(writtenAmount);
      expect([input.disabled, input.value]).toStrictEqual([false, formattedWrittenAmount]);
    });
  });
});
