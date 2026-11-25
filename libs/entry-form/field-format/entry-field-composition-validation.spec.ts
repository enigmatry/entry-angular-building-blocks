import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { Provider } from '@angular/core';
import { FormControl } from '@angular/forms';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { dutchEuroDefinition, initialAmount } from './testing/field-format-test-data';
import { RenderedHost, dispatch, renderHost, settle, typeText, unbuffered } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

type BlurHost = RenderedHost<FieldFormatTestHostComponent> & { control: FormControl<number | null> };

const renderBlurHost = async(providers: Provider[] = []): Promise<BlurHost> => {
  const host = await renderHost(FieldFormatTestHostComponent, providers);
  const control = new FormControl<number | null>(initialAmount, { updateOn: 'blur' });
  host.fixture.componentInstance.control.set(control);
  await settle(host.fixture);
  return { ...host, control };
};

const switchToDutch = async({ fixture }: BlurHost): Promise<void> => {
  fixture.componentInstance.definition.set(dutchEuroDefinition);
  await settle(fixture);
};

describe('EntryFieldComposition', () => {
  beforeAll(() => {
    registerLocaleData(localeNl);
  });

  describe('validation with EntryFieldFormatDirective and updateOn blur', () => {
    it('commits text that becomes valid in a new definition while the field is not focused', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;

      dispatch(input, 'focus');
      typeText(input, '1,99');
      dispatch(input, 'blur');
      expect(control.hasError('entryFieldFormat')).toBe(true);
      await switchToDutch(host);
      expect(control.value).toBe(1.99);
      expect(control.hasError('entryFieldFormat')).toBe(false);
    });

    it('does not revalidate a pending value that stays valid when the definition changes during composition', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;
      const revalidation = vi.spyOn(control, 'updateValueAndValidity');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      await switchToDutch(host);
      dispatch(input, 'compositionend');
      expect(revalidation).not.toHaveBeenCalled();
      dispatch(input, 'blur');
      expect(control.value).toBe(12);
    });

    it('commits a blur deferred by composition without revalidating the old value first', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;
      const revalidation = vi.spyOn(control, 'updateValueAndValidity');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, 'abc');
      await switchToDutch(host);
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      dispatch(input, 'compositionend');
      expect(control.value).toBeNull();
      expect(revalidation).toHaveBeenCalledTimes(1);
    });

    it('does not show an error for text that waits for a submit when the definition changes', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(initialAmount, { updateOn: 'submit' });
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      typeText(input, 'abc');
      await switchToDutch({ fixture, input, control });
      expect(control.valid).toBe(true);
    });

    it('commits composed text once when the blur that happened during the composition is completed', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'blur');
      const revalidation = vi.spyOn(control, 'updateValueAndValidity');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(12);
      expect(revalidation).toHaveBeenCalledTimes(1);
    });

    it('commits text that becomes valid in a new definition when a blur was deferred by composition', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;

      typeText(input, '1,99');
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      await switchToDutch(host);
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(1.99);
      expect(control.hasError('entryFieldFormat')).toBe(false);
    });

    it('publishes the new error text when a definition change parses different invalid text', async() => {
      const host = await renderBlurHost();
      const { control, input } = host;

      typeText(input, 'abc');
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, 'xyz');
      await switchToDutch(host);
      dispatch(input, 'compositionend');
      expect(control.getError('entryFieldFormat')).toStrictEqual({ text: 'xyz' });
    });

    it('clears an obsolete error when unbuffered input parses with a definition that changed during composition', async() => {
      const host = await renderBlurHost(unbuffered);
      const { control, input } = host;

      typeText(input, '1,99');
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      await switchToDutch(host);
      typeText(input, '1,99');
      dispatch(input, 'compositionend');
      expect(control.hasError('entryFieldFormat')).toBe(false);
      dispatch(input, 'blur');
      expect(control.value).toBe(1.99);
    });
  });
});
