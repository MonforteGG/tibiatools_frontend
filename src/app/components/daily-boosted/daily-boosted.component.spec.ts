import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBoostedComponent } from './daily-boosted.component';

describe('DailyBoostedComponent', () => {
  let component: DailyBoostedComponent;
  let fixture: ComponentFixture<DailyBoostedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyBoostedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyBoostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
