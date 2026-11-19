import { describe, expect, it } from 'vitest';
import { FieldFormatMaterialTestHostComponent } from './testing/field-format-material-test-host.component';
import { FieldFormatReadonlyTestHostComponent } from './testing/field-format-readonly-test-host.component';
import { initialAmount } from './testing/field-format-test-data';
import { dispatch, renderHost, settle, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

const formattedAmount = '\u20ac1,234.50';
const editedAmount = String(initialAmount);

describe('EntryFieldFormatDirective', () => {
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

    it('shows the formatted value when a focused field becomes read-only', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);

      dispatch(input, 'focus');
      expect(input.value).toBe(editedAmount);
      fixture.componentInstance.locked.set(true);
      await settle(fixture);
      expect(input.value).toBe(formattedAmount);
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

    it('follows the read-only state Material changes when a disabled interactive field is enabled and disabled again', async() => {
      const { fixture, input } = await renderHost(FieldFormatMaterialTestHostComponent);

      dispatch(input, 'focus');
      fixture.componentInstance.control.enable();
      await settle(fixture);
      expect(input.readOnly).toBe(false);
      expect(input.value).toBe(editedAmount);
      fixture.componentInstance.control.disable();
      await settle(fixture);
      expect(input.readOnly).toBe(true);
      expect(input.value).toBe(formattedAmount);
    });
  });
});
