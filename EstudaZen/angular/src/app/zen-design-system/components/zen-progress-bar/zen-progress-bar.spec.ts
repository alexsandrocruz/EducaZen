import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenProgressBar } from './zen-progress-bar';

describe('ZenProgressBar', () => {
  let component: ZenProgressBar;
  let fixture: ComponentFixture<ZenProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenProgressBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZenProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
