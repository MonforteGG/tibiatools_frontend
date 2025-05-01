import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopExperienceComponent } from './top-experience.component';

describe('TopExperienceComponent', () => {
  let component: TopExperienceComponent;
  let fixture: ComponentFixture<TopExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
