import { Directive, ElementRef, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { ENTRY_BUTTON_CONFIG, EntryButtonConfig, MatButtonConfig } from './entry-button-config';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `[mat-button][entry-submit-button],[mat-button][entry-cancel-button]`,
  standalone: false
})
export class EntryButtonDirective {
  matClasses: { [key: string]: string[] } = {
    basic: ['mdc-button', 'mat-mdc-button'],
    raised: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    stroked: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
    flat: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button']
  };

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  private readonly config: EntryButtonConfig = inject(ENTRY_BUTTON_CONFIG);
  private readonly matButton = inject(MatButton, { optional: true });

  // Constructor, not a lifecycle or after-render hook: `MatButton.color` feeds its own host bindings and must be set before its first check.
  constructor() {
    const entryButtonType: 'submit' | 'cancel' = this.getEntryType();
    const buttonConfig: MatButtonConfig = this.config[entryButtonType];

    const entryClasses: string[] = ['entry-button', `entry-${entryButtonType}-button`];
    const matClasses = this.matClasses[buttonConfig.type];

    this.elementRef.nativeElement.classList.add(...entryClasses, ...matClasses);

    const color: ThemePalette = buttonConfig.color;
    if (color && this.matButton) {
      this.matButton.color = color;
    }
  }

  private readonly getEntryType = (): 'submit' | 'cancel' =>
    this.elementRef.nativeElement.hasAttribute('entry-submit-button') ? 'submit' : 'cancel';
}
