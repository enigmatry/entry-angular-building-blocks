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
  menuItems = COMPONENT_DEFINITIONS;

  private readonly router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private clipboard: Clipboard = inject(Clipboard);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  redirect = async(item: IComponentDefinition) => {
    await this.router.navigate([item.route], { relativeTo: this.activatedRoute });
  };

  share = (item: IComponentDefinition) => {
    this.snackBar.open(`Link copied to the clipboard!`);
    this.clipboard.copy(`${location.href}${item.route}`);
  };
}
