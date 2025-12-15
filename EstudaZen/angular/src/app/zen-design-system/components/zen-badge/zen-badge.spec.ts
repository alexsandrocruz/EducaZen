import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenBadge } from './zen-badge';

describe('ZenBadge', () => {
  let component: ZenBadge;
  let fixture: ComponentFixture<ZenBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZenBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
