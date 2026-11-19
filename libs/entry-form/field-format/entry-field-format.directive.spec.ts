import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { FormControl } from '@angular/forms';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { dutchEuroDefinition, euroDefinition, initialAmount } from './testing/field-format-test-data';
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

    it('keeps the text being typed when the definition is replaced by one with the same content', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      typeText(input, '1.');
      fixture.componentInstance.definition.set({ ...euroDefinition });
      await settle(fixture);
      expect(input.value).toBe('1.');
      expect(fixture.componentInstance.control().value).toBe(1);
    });
  });

  describe('parsing', () => {
    it('writes the typed amount to the control when the text is valid', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      typeText(input, '1,999.5');
      expect(fixture.componentInstance.control().value).toBe(1999.5);
    });

    it('marks the control dirty when the text the field shows is typed again', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      typeText(input, editedAmount);
      expect(control.dirty).toBe(true);
      expect(control.value).toBe(initialAmount);
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

    it('reports an error for invalid text in a number input, although the field reads as empty', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(null);
      fixture.componentInstance.type.set('number');
      fixture.componentInstance.control.set(control);
      await settle(fixture);
      vi.spyOn(input.validity, 'badInput', 'get').mockReturnValue(true);

      dispatch(input, 'input');
      expect(input.value).toBe('');
      expect(control.hasError('entryFieldFormat')).toBe(true);
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
});
