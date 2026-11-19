import { describe, expect, it } from 'vitest';
import { dispatch, renderHost, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

const editedAmount = '1234.5';
const formattedAmount = '\u20ac1,234.50';

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

    it('shows the formatted value when a focused field is disabled, and still does when it lost its focus before it is enabled', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      control.disable();
      expect(input.value).toBe(formattedAmount);
      control.enable();
      expect(input.value).toBe(formattedAmount);
      control.setValue(99);
      expect(input.value).toBe('\u20ac99.00');
    });

    it('keeps the text being typed when the control is enabled while it already is', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      typeText(input, '1.');
      fixture.componentInstance.control().enable();
      expect(input.value).toBe('1.');
    });
  });
});
