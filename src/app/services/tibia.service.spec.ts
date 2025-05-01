import { TestBed } from '@angular/core/testing';

import { TibiaService } from './tibia.service';

describe('TibiaService', () => {
  let service: TibiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TibiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
