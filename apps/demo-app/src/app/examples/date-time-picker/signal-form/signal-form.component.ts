import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormField, FormRoot, form, required, submit } from '@angular/forms/signals';
import { EntryDateTimePickerModule } from '@enigmatry/entry-components/date-time-picker';

/**
 * The picker under a signal form. Worth its own example because every other one drives it with
 * `[formControl]` or `[(ngModel)]`, so this is the only place the `FormValueControl` contract and
 * the picker's own `focus()` are actually exercised - the latter is what makes
 * `focusBoundControl()` land inside the picker rather than on its non-focusable host.
 */
@Component({
  selector: 'app-date-time-picker-signal-form',
  imports: [EntryDateTimePickerModule, FormField, FormRoot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signal-form.component.html'
})
export class SignalFormComponent {
  protected readonly expiryModel = signal<{ expiresOn: Date | null }>({ expiresOn: null });

  protected readonly expiryForm = form(this.expiryModel, path => {
    required(path.expiresOn, { message: 'Pick a date and time.' });
  }, {
    submission: { action: () => Promise.resolve() }
  });

  protected readonly focusFirstInvalid = (): void => {
    const summary = this.expiryForm().errorSummary();
    const firstError = summary.at(0);
    if (firstError) {
      firstError.fieldTree().focusBoundControl();
    }
  };

  protected readonly submitForm = (): Promise<boolean> => submit(this.expiryForm);
}
