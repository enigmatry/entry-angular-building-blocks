import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { COMPOSITION_BUFFER_MODE, FormControl } from '@angular/forms';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { dutchEuroDefinition, initialAmount } from './testing/field-format-test-data';
import { dispatch, renderHost, settle, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

describe('EntryFieldComposition', () => {
  beforeAll(() => {
    registerLocaleData(localeNl);
  });

  describe('with EntryFieldFormatDirective', () => {
    it('completes a blur that happens during composition when the composition ends', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'blur');
      expect(control.touched).toBe(false);
      dispatch(input, 'compositionend');
      expect(control.value).toBe(12);
      expect(control.touched).toBe(true);
      expect(input.value).toBe('\u20ac12.00');
    });

    it('keeps the composed text when focus returns during composition, and still completes the blur', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      expect(input.value).toBe('12');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(12);
      expect(control.touched).toBe(true);
    });

    it('shows the formatted value when the field becomes read-only during composition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      fixture.componentInstance.locked.set(true);
      await settle(fixture);
      dispatch(input, 'compositionend');
      expect(input.value).toBe('\u20ac12.00');
    });

    it('does not revalidate a pending value that stays valid when the definition changes during composition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(initialAmount, { updateOn: 'blur' });
      fixture.componentInstance.control.set(control);
      await settle(fixture);
      const revalidation = vi.spyOn(control, 'updateValueAndValidity');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      dispatch(input, 'compositionend');
      expect(revalidation).not.toHaveBeenCalled();
    });

    it('does not parse twice when unbuffered input already used the new definition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, [{ provide: COMPOSITION_BUFFER_MODE, useValue: false }]);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      typeText(input, '12,5');
      const commit = vi.spyOn(control, 'setValue');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(12.5);
      expect(commit).not.toHaveBeenCalled();
    });

    it('keeps a value the form writes during composition, and shows it in the current definition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const writtenAmount = 2.499;

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      control.setValue(writtenAmount);
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      dispatch(input, 'compositionend');
      expect(control.value).toBe(writtenAmount);
      expect(input.value).toBe('2,499');
    });

    it('commits a blur deferred by composition without revalidating the old value first', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(initialAmount, { updateOn: 'blur' });
      fixture.componentInstance.control.set(control);
      await settle(fixture);
      const revalidation = vi.spyOn(control, 'updateValueAndValidity');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, 'abc');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      dispatch(input, 'compositionend');
      expect(control.value).toBeNull();
      expect(revalidation).toHaveBeenCalledTimes(1);
    });

    it('publishes the new error text when a definition change parses different invalid text', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(initialAmount, { updateOn: 'blur' });
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      typeText(input, 'abc');
      dispatch(input, 'blur');
      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, 'xyz');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      dispatch(input, 'compositionend');
      expect(control.getError('entryFieldFormat')).toStrictEqual({ text: 'xyz' });
    });
  });
});
