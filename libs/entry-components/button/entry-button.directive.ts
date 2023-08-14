import { Directive, ElementRef, Inject, OnInit, Optional } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { ENTRY_BUTTON_CONFIG, EntryButtonConfig, MatButtonConfig } from './entry-button-config';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `[mat-button][entry-submit-button],[mat-button][entry-cancel-button]`
})
export class EntryButtonDirective implements OnInit {

  matClasses: { [key: string]: string[] } = {
    basic: ['mdc-button', 'mat-mdc-button'],
    raised: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    stroked: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
    flat: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button']
  };

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(ENTRY_BUTTON_CONFIG) private _config: EntryButtonConfig,
    @Optional() private _matButton?: MatButton,
    @Optional() private _matAnchor?: MatAnchor) {
  }

  ngOnInit(): void {
    const entryButtonType = this.getEntryType();
    const buttonConfig: MatButtonConfig = this._config[entryButtonType];

    const entryClasses: string[] = ['entry-button', `entry-${entryButtonType}-button`];
    const matClasses = this.matClasses[buttonConfig.type];

    this._elementRef.nativeElement.classList.add(...entryClasses, ...matClasses);

    const color: ThemePalette = buttonConfig.color;
    if (color) {
      if (this._matButton) { this._matButton.color = color; }
      if (this._matAnchor) { this._matAnchor.color = color; }
    }
  }

  private getEntryType(): string {
    return this._elementRef.nativeElement.hasAttribute('entry-submit-button')
      ? 'submit' : 'cancel';
  }
}
