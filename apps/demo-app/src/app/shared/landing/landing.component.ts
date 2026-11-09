import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IComponentDefinition, COMPONENT_DEFINITIONS } from '../../features/component-definitions';
import { SortPipe } from '../pipes/sort.pipe';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatButton, SortPipe]
})
export class LandingComponent {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly clipboard: Clipboard = inject(Clipboard);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  protected readonly menuItems = COMPONENT_DEFINITIONS;

  protected readonly redirect = async(item: IComponentDefinition): Promise<void> => {
    await this.router.navigate([item.route], { relativeTo: this.activatedRoute });
  };

  protected readonly share = (item: IComponentDefinition): void => {
    this.snackBar.open(`Link copied to the clipboard!`);
    this.clipboard.copy(`${location.href}${item.route}`);
  };
}
