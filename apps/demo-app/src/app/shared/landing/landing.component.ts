import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IComponentDefinition, COMPONENT_DEFINITIONS } from '../../features/component-definitions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  standalone: false
})
export class LandingComponent {
  protected readonly menuItems = COMPONENT_DEFINITIONS;

  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly clipboard: Clipboard = inject(Clipboard);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  protected readonly redirect = async(item: IComponentDefinition): Promise<void> => {
    await this.router.navigate([item.route], { relativeTo: this.activatedRoute });
  };

  protected readonly share = (item: IComponentDefinition): void => {
    this.snackBar.open(`Link copied to the clipboard!`);
    this.clipboard.copy(`${location.href}${item.route}`);
  };
}
