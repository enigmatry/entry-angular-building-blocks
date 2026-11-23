import { describe, expect, it } from 'vitest';
import { FieldFormatMaterialTestHostComponent } from './testing/field-format-material-test-host.component';
import { FieldFormatReadonlyTestHostComponent } from './testing/field-format-readonly-test-host.component';
import { editedAmount, formattedAmount } from './testing/field-format-test-data';
import { dispatch, fieldsOf, loseFocusSilently, renderHost, settle, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

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
      const [staticInput, boundInput] = fieldsOf(fixture);

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

      input.focus();
      expect(input.disabled).toBe(false);
      expect(input.readOnly).toBe(true);
      expect(input.value).toBe(formattedAmount);
    });

    it('follows the read-only state Material changes when a disabled interactive field is enabled and disabled again', async() => {
      const { fixture, input } = await renderHost(FieldFormatMaterialTestHostComponent);

      input.focus();
      fixture.componentInstance.control.enable();
      await settle(fixture);
      expect(input.readOnly).toBe(false);
      expect(input.value).toBe(editedAmount);
      fixture.componentInstance.control.disable();
      await settle(fixture);
      expect(input.readOnly).toBe(true);
      expect(input.value).toBe(formattedAmount);
    });

    it('leaves a disabledInteractive field natively disabled when its control is disabled after creation, as Angular\'s accessors do', async() => {
      const { fixture, input } = await renderHost(FieldFormatMaterialTestHostComponent);

      fixture.componentInstance.control.enable();
      await settle(fixture);
      fixture.componentInstance.control.disable();
      await settle(fixture);
      expect([input.disabled, input.readOnly]).toStrictEqual([true, true]);
    });

    it('shows the formatted value of a disabled field whichever way disabledInteractive is switched', async() => {
      const { fixture, input } = await renderHost(FieldFormatMaterialTestHostComponent);

      input.focus();
      fixture.componentInstance.interactive.set(false);
      await settle(fixture);
      expect([input.disabled, input.readOnly, input.value]).toStrictEqual([true, false, formattedAmount]);
      fixture.componentInstance.interactive.set(true);
      await settle(fixture);
      expect([input.disabled, input.readOnly, input.value]).toStrictEqual([false, true, formattedAmount]);
    });

    it('shows the formatted value when a field that lost its focus while disabled became interactive before it is enabled', async() => {
      const { fixture, input } = await renderHost(FieldFormatMaterialTestHostComponent);
      const { control, interactive } = fixture.componentInstance;
      interactive.set(false);
      control.enable();
      await settle(fixture);

      input.focus();
      control.disable();
      await settle(fixture);
      loseFocusSilently(input);
      interactive.set(true);
      await settle(fixture);
      expect([input.disabled, input.readOnly]).toStrictEqual([false, true]);
      control.enable();
      await settle(fixture);
      expect(input.value).toBe(formattedAmount);
    });
  });
});
