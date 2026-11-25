import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Mock, beforeAll, describe, expect, it, vi } from 'vitest';
import { EntryFieldFormatDirective } from './entry-field-format.directive';
import { dutchEuroDefinition } from './testing/field-format-test-data';
import { RenderedHost, dispatch, dispatchInput, renderHost, settle, typeText, unchangedInputs } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

const renderWithTouchSpy = async(): Promise<RenderedHost<FieldFormatTestHostComponent> & { touched: Mock<() => void> }> => {
  const host = await renderHost(FieldFormatTestHostComponent);
  const touched = vi.fn<() => void>();
  host.fixture.debugElement.query(By.directive(EntryFieldFormatDirective)).injector.get(EntryFieldFormatDirective).registerOnTouched(touched);
  return { ...host, touched };
};

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

    it('reports the field as touched once when a blur that happened during the composition is completed', async() => {
      const { input, touched } = await renderWithTouchSpy();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      expect(touched).toHaveBeenCalledTimes(1);
    });

    it('reports the field as touched once when the definition also changed during that composition', async() => {
      const { fixture, input, touched } = await renderWithTouchSpy();

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      typeText(input, '12');
      fixture.componentInstance.definition.set(dutchEuroDefinition);
      await settle(fixture);
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      expect(touched).toHaveBeenCalledTimes(1);
    });

    it('does not commit when a composition ends without changing the text', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const commit = vi.spyOn(fixture.componentInstance.control(), 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      dispatch(input, 'compositionend');
      expect(commit).not.toHaveBeenCalled();
    });

    it.each(unchangedInputs)('reports invalid number text once when a composition ends before %s input event', async(_kind, inputType) => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(null);
      fixture.componentInstance.type.set('number');
      fixture.componentInstance.control.set(control);
      await settle(fixture);
      const commit = vi.spyOn(control, 'setValue');

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      vi.spyOn(input.validity, 'badInput', 'get').mockReturnValue(true);
      dispatch(input, 'compositionend');
      expect(control.hasError('entryFieldFormat')).toBe(true);
      dispatchInput(input, inputType);
      expect(control.hasError('entryFieldFormat')).toBe(true);
      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('leaves invalid text in a number input as it is when a blur during the composition is completed', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      const control = new FormControl<number | null>(null);
      fixture.componentInstance.type.set('number');
      fixture.componentInstance.control.set(control);
      await settle(fixture);

      dispatch(input, 'focus');
      dispatch(input, 'compositionstart');
      const write = vi.spyOn(input, 'value', 'set');
      vi.spyOn(input.validity, 'badInput', 'get').mockReturnValue(true);
      dispatch(input, 'blur');
      dispatch(input, 'compositionend');
      expect(control.hasError('entryFieldFormat')).toBe(true);
      expect(control.touched).toBe(true);
      expect(write).not.toHaveBeenCalled();
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
