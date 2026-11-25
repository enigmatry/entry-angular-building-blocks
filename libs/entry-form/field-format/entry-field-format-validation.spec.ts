import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { FormControl } from '@angular/forms';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { dutchEuroDefinition, initialAmount, numberDefinition, writtenAmount } from './testing/field-format-test-data';
import { FieldFormatFormTestHostComponent } from './testing/field-format-form-test-host.component';
import { RenderedHost, dispatch, renderHost, settle, submitForm, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

type ControlHost = RenderedHost<FieldFormatTestHostComponent> & { control: FormControl<number | null> };

const renderBlurHost = async(): Promise<ControlHost> => {
  const host = await renderHost(FieldFormatTestHostComponent);
  const control = new FormControl<number | null>(initialAmount, { updateOn: 'blur' });
  host.fixture.componentInstance.control.set(control);
  await settle(host.fixture);
  return { ...host, control };
};

const switchToDutch = async({ fixture }: ControlHost): Promise<void> => {
  fixture.componentInstance.definition.set(dutchEuroDefinition);
  await settle(fixture);
};

describe('EntryFieldFormatDirective', () => {
  beforeAll(() => {
    registerLocaleData(localeNl);
  });

  describe('a change inside the bound definition object', () => {
    it('keeps rendering and parsing in the format the object was bound with', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const definition = numberDefinition();
      fixture.componentInstance.definition.set(definition);
      await settle(fixture);

      definition.locale = 'nl';
      fixture.componentInstance.control().setValue(writtenAmount + initialAmount);
      expect(input.value).toBe('1,333.5');
      dispatch(input, 'focus');
      typeText(input, '1.5');
      expect(fixture.componentInstance.control().value).toBe(1.5);
    });
  });

  describe('validation after a definition change', () => {
    it('clears the error of a submitted value when its text is valid in the new definition', async() => {
      const { fixture, input } = await renderHost(FieldFormatFormTestHostComponent);
      const control = fixture.componentInstance.form.controls.amount;

      dispatch(input, 'focus');
      typeText(input, '1,99');
      submitForm(fixture);
      expect([control.value, control.hasError('entryFieldFormat')]).toStrictEqual([null, true]);
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      expect(control.hasError('entryFieldFormat')).toBe(false);
    });

    it('does not validate again when the text is as invalid in the new definition as the error says', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;

      dispatch(input, 'focus');
      typeText(input, 'abc');
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      const revalidation = vi.spyOn(control, 'updateValueAndValidity');
      await switchToDutch(host);
      expect(control.getError('entryFieldFormat')).toStrictEqual({ text: 'abc' });
      expect(revalidation).not.toHaveBeenCalled();
    });

    it('emits the new value once when a blur during the composition commits it, although the focus has returned', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;
      const emitted: (number | null)[] = [];

      typeText(input, '1,99');
      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      await switchToDutch(host);
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      control.valueChanges.subscribe(value => emitted.push(value));
      dispatch(input, 'compositionend');
      expect(emitted).toStrictEqual([1.99]);
    });
  });
});
