import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pleitos } from './pleitos';

describe('Pleitos', () => {
  let component: Pleitos;
  let fixture: ComponentFixture<Pleitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pleitos],
    }).compileComponents();

    fixture = TestBed.createComponent(Pleitos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
