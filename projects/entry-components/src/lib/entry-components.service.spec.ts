import { TestBed } from '@angular/core/testing';

import { EntryComponentsService } from './entry-components.service';

describe('EntryComponentsService', () => {
  let service: EntryComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
