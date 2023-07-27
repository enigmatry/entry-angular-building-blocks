import { Directive, ElementRef, Inject, OnInit, Optional } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { ENTRY_BUTTON_CONFIG, EntryButtonConfig, MatButtonConfig } from './entry-button-config';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `[mat-button][entry-submit-button],
  [mat-button][entry-cancel-button]`
})
export class EntryButtonDirective implements OnInit {

  classes: { [key: string]: string[] } = {
    basic: ['mdc-button', 'mat-mdc-button'],
    raised: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    stroked: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
    flat: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button']
  };

  constructor(
    private _elementRef: ElementRef,
    @Inject(ENTRY_BUTTON_CONFIG) private _config: EntryButtonConfig,
    @Optional() private _matButton?: MatButton,
    @Optional() private _matAnchor?: MatAnchor) {
  }

  ngOnInit(): void {
    const buttonConfig = this.getButtonConfig();

    const classes = this.classes[buttonConfig.type];
    this._elementRef.nativeElement.classList.add(...classes);

    const color: ThemePalette = buttonConfig.color;
    if (color) {
      if (this._matButton) { this._matButton.color = color; }
      if (this._matAnchor) { this._matAnchor.color = color; }
    }
  }

  private getButtonConfig(): MatButtonConfig {
    const isSubmitButton = this.hostHasAttribute('entry-submit-button');
    return isSubmitButton ? this._config.submitButton : this._config.cancelButton;
  }

  private hostHasAttribute(...attributes: string[]) {
    return attributes.some(attribute => this._elementRef.nativeElement.hasAttribute(attribute));
  }
}
