import { Component, OnInit } from '@angular/core';
import { IComponentDefinition, COMPONENT_DEFINITIONS } from '../models/component-definitions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  menuItems = COMPONENT_DEFINITIONS;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  redirect = (item: IComponentDefinition) => {
    this.router.navigate([item.route], { relativeTo: this.activatedRoute });
  };

  share = (item: IComponentDefinition) => {
    this.snackBar.open(`Link copied to clipboard!`);
    this.clipboard.copy(`${location.href}${item.route}`);
  };
}
