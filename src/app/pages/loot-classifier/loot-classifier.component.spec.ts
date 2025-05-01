import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LootClassifierComponent } from './loot-classifier.component';

describe('LootClassifierComponent', () => {
  let component: LootClassifierComponent;
  let fixture: ComponentFixture<LootClassifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LootClassifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LootClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
