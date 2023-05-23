import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsContentComponent } from './docs-content.component';

describe('ComponentDocsContentComponent', () => {
  let component: DocsContentComponent;
  let fixture: ComponentFixture<DocsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
