import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { COMPOSITION_BUFFER_MODE, FormControl } from '@angular/forms';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { dutchEuroDefinition, euroDefinition, initialAmount, numberDefinition } from './testing/field-format-test-data';
import { dispatch, renderHost, settle, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

const unbuffered = [{ provide: COMPOSITION_BUFFER_MODE, useValue: false }];

describe('EntryFieldComposition', () => {
  beforeAll(() => {
    registerLocaleData(localeNl);
  });

  describe('definition changes with EntryFieldFormatDirective', () => {
    it('does not parse twice when unbuffered input already used the new definition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);
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

    it('parses unbuffered input again when the definition changes once more during composition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);
      const control = fixture.componentInstance.control();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      typeText(input, '12,5');
      fixture.componentInstance.definition.set(euroDefinition);
      await settle(fixture);
      dispatch(input, 'compositionend');
      expect(control.value).toBeNull();
      expect(control.hasError('entryFieldFormat')).toBe(true);
    });

    it('keeps the value when the composition leaves the text it rendered unchanged and the definition changes', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = fixture.componentInstance.control();
      const commit = vi.spyOn(control, 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      dispatch(input, 'compositionend');
      expect(control.value).toBe(initialAmount);
      expect(commit).not.toHaveBeenCalled();
      expect(input.value).toBe('1234,5');
    });

    it('parses input that repeats the composed text after the definition changed', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(null);
      fixture.componentInstance.definition.set(numberDefinition());
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '1.234');
      dispatch(input, 'compositionend');
      fixture.componentInstance.definition.set(numberDefinition('nl'));
      await settle(fixture);
      typeText(input, '1.234');
      expect(control.value).toBe(1234);
    });

    it('parses unbuffered input again in a new definition when the form wrote a value earlier in the composition', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent, unbuffered);
      const control = new FormControl<number | null>(null);
      fixture.componentInstance.definition.set(numberDefinition());
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      control.setValue(5);
      typeText(input, '1.234');
      fixture.componentInstance.definition.set(numberDefinition('nl'));
      await settle(fixture);
      dispatch(input, 'compositionend');
      expect(control.value).toBe(1234);
    });

    it('parses text that was edited and restored during composition when the definition changed', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(1.234);
      fixture.componentInstance.definition.set(numberDefinition());
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      fixture.componentInstance.definition.set(numberDefinition('nl'));
      await settle(fixture);
      typeText(input, '1.2345');
      typeText(input, '1.234');
      dispatch(input, 'compositionend');
      expect(control.value).toBe(1234);
    });
  });
});
