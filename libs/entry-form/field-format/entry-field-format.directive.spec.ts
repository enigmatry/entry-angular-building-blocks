import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { beforeAll, describe, expect, it } from 'vitest';
import { FieldFormatMaterialTestHostComponent } from './testing/field-format-material-test-host.component';
import { FieldFormatReadonlyTestHostComponent } from './testing/field-format-readonly-test-host.component';
import { FieldFormatTextareaTestHostComponent } from './testing/field-format-textarea-test-host.component';
import { dutchEuroDefinition, initialAmount } from './testing/field-format-test-data';
import { dispatch, renderHost, settle, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

const formattedAmount = '\u20ac1,234.50';
const editedAmount = String(initialAmount);

describe('EntryFieldFormatDirective', () => {
  beforeAll(() => {
    registerLocaleData(localeNl);
  });

  describe('display', () => {
    it('shows the formatted value when unfocused and the plain number when focused', async() => {
      const { input } = await renderHost(FieldFormatTestHostComponent);

      expect(input.value).toBe(formattedAmount);
      dispatch(input, 'focus');
      expect(input.value).toBe(editedAmount);
      dispatch(input, 'blur');
      expect(input.value).toBe(formattedAmount);
    });

    it('shows the formatted value when the form sets it', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      fixture.componentInstance.control().setValue(99);
      expect(input.value).toBe('\u20ac99.00');
    });

    it('disables the input when the control is disabled', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      fixture.componentInstance.control().disable();
      expect(input.disabled).toBe(true);
    });
  });

  describe('parsing', () => {
    it('writes the typed amount to the control when the text is valid', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      typeText(input, '1,999.5');
      expect(fixture.componentInstance.control().value).toBe(1999.5);
    });

    it('writes null with an entryFieldFormat error when the text is invalid', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      typeText(input, '1,99');
      expect(control.value).toBeNull();
      expect(control.hasError('entryFieldFormat')).toBe(true);
    });

    it('parses invalid text again when the definition changes', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      typeText(input, '1,99');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      expect(control.value).toBe(1.99);
      expect(control.hasError('entryFieldFormat')).toBe(false);
      expect(input.value).toBe('\u20ac\u00a01,99');
    });

    it('keeps the form value when an input event leaves a textarea unchanged after it normalized the line breaks', async() => {
      const { fixture } = await renderHost(FieldFormatTextareaTestHostComponent);
      const textarea = (fixture.nativeElement as HTMLElement).querySelector('textarea') as HTMLTextAreaElement;

      textarea.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.control.value).toBe('first line\r\nsecond line');
    });

    it('parses text the field showed before when it is typed again after an error', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      typeText(input, 'abc');
      typeText(input, editedAmount);
      expect(control.value).toBe(initialAmount);
      expect(control.hasError('entryFieldFormat')).toBe(false);
    });
  });

  describe('read-only', () => {
    it('keeps the formatted value while a read-only field is focused, and edits once it is not', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      fixture.componentInstance.locked.set(true);
      await settle(fixture);
      dispatch(input, 'focus');
      expect(input.value).toBe(formattedAmount);
      fixture.componentInstance.locked.set(false);
      await settle(fixture);
      expect(input.readOnly).toBe(false);
      expect(input.value).toBe(editedAmount);
    });

    it('keeps the formatted value of a field that is read-only through a static attribute or [attr.readonly]', async() => {
      const { fixture } = await renderHost(FieldFormatReadonlyTestHostComponent);
      const [staticInput, boundInput] = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('input'));

      dispatch(staticInput, 'focus');
      dispatch(boundInput, 'focus');
      expect(staticInput.value).toBe(formattedAmount);
      expect(boundInput.value).toBe(formattedAmount);
      fixture.componentInstance.locked.set(false);
      await settle(fixture);
      expect(boundInput.value).toBe(editedAmount);
    });

    it('keeps the read-only state Material sets on a disabled interactive field', async() => {
      const { input } = await renderHost(FieldFormatMaterialTestHostComponent);

      dispatch(input, 'focus');
      expect(input.disabled).toBe(false);
      expect(input.readOnly).toBe(true);
      expect(input.value).toBe(formattedAmount);
    });
  });
});
