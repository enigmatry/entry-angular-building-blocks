import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { FormControl } from '@angular/forms';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  dutchEuroDefinition, editedAmount, euroDefinition, formattedAmount, formattedWrittenAmount, initialAmount, numberDefinition, writtenAmount
} from './testing/field-format-test-data';
import { dispatch, dispatchInput, renderHost, settle, typeText, unchangedInputs } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

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

    it('renders an empty field without reading the validity API, which a server-side DOM may lack', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const validity = vi.spyOn(input, 'validity', 'get');

      fixture.componentInstance.control().setValue(null);
      dispatch(input, 'focus');
      dispatch(input, 'blur');
      expect(input.value).toBe('');
      expect(validity).not.toHaveBeenCalled();
    });

    it('shows the formatted value when the form sets it', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      fixture.componentInstance.control().setValue(writtenAmount);
      expect(input.value).toBe(formattedWrittenAmount);
    });

    it('leaves text that is being typed as it is when another definition object with the same settings is bound', async() => {
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

    it.each(unchangedInputs)('changes nothing when %s input event leaves the text the field shows as it is', async(_kind, inputType) => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const commit = vi.spyOn(control, 'setValue');

      dispatch(input, 'focus');
      dispatchInput(input, inputType);
      expect(commit).not.toHaveBeenCalled();
      expect(control.dirty).toBe(false);
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

    it('parses invalid text again when a changed copy of the definition object is bound', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(null);
      const definition = numberDefinition();
      fixture.componentInstance.definition.set(definition);
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      typeText(input, '1,99');
      definition.locale = 'nl';
      fixture.componentInstance.definition.set({ ...definition });
      await settle(fixture);
      expect(control.value).toBe(1.99);
      expect(control.hasError('entryFieldFormat')).toBe(false);
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

    it('drops the error of invalid text when the form writes a value', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      typeText(input, 'abc');
      control.setValue(writtenAmount);
      expect(control.hasError('entryFieldFormat')).toBe(false);
      expect(input.value).toBe(String(writtenAmount));
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
