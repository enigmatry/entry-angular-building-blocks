import { By } from '@angular/platform-browser';
import { describe, expect, it, vi } from 'vitest';
import { EntryFieldFormatDirective } from './entry-field-format.directive';
import { FieldFormatInputTypesTestHostComponent } from './testing/field-format-input-types-test-host.component';
import { writtenAmount } from './testing/field-format-test-data';
import { dispatch, renderHost, settle, typeText } from './testing/field-format-test-helpers';
import { FieldFormatTestHostComponent } from './testing/field-format-test-host.component';

describe('EntryFieldFormatDirective', () => {
  describe('input types', () => {
    it.each<[string]>([['number'], ['range']])('shows the plain number in an input of type %s that has no focus', async type => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      fixture.componentInstance.type.set(type);
      await settle(fixture);

      fixture.componentInstance.control().setValue(writtenAmount);
      expect(input.value).toBe(String(writtenAmount));
    });

    it('parses every edit of a field that reports bad input while it still exposes its text, as an email input can', async() => {
      const { fixture, input } = await renderHost(FieldFormatTestHostComponent);
      vi.spyOn(input.validity, 'badInput', 'get').mockReturnValue(true);

      dispatch(input, 'focus');
      typeText(input, '1');
      typeText(input, '12');
      expect(fixture.componentInstance.control().value).toBe(12);
    });

    it('leaves checkbox, radio and file inputs that carry its attribute to Angular', async() => {
      const { fixture } = await renderHost(FieldFormatInputTypesTestHostComponent);

      const matched = fixture.debugElement.queryAll(By.directive(EntryFieldFormatDirective)).map(element => element.attributes['type']);
      expect(matched).toStrictEqual(['text']);
    });
  });
});
