import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMonstersKilledComponent } from './top-monsters-killed.component';

describe('TopMonstersKilledComponent', () => {
  let component: TopMonstersKilledComponent;
  let fixture: ComponentFixture<TopMonstersKilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMonstersKilledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMonstersKilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
