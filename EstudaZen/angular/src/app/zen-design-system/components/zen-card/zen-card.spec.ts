import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenCard } from './zen-card';

describe('ZenCard', () => {
  let component: ZenCard;
  let fixture: ComponentFixture<ZenCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZenCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
