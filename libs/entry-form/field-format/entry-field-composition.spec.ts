import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { dutchEuroDefinition } from './testing/field-format-test-data';
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

    it('does not commit when a composition ends without changing the text', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const commit = vi.spyOn(fixture.componentInstance.control(), 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      dispatch(input, 'compositionend');
      expect(commit).not.toHaveBeenCalled();
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

    it('keeps the composed text until the composition ends when the form writes a value, then shows that value', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const writtenAmount = 2.499;

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      control.setValue(writtenAmount);
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      expect(input.value).toBe('12');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(writtenAmount);
      expect(input.value).toBe('2,499');
    });
  });
});
