import { TestBed } from '@angular/core/testing';
import { Pleitos } from './pleitos';

describe('Pleitos', () => {
  let service: Pleitos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pleitos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
