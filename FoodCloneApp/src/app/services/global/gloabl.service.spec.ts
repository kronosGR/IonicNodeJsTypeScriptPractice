import { TestBed } from '@angular/core/testing';

import { GloablService } from './gloabl.service';

describe('GloablService', () => {
  let service: GloablService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloablService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
