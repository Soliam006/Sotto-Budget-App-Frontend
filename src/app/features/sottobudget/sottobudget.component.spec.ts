import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SottobudgetComponent } from './sottobudget.component';

describe('SottobudgetComponent', () => {
  let component: SottobudgetComponent;
  let fixture: ComponentFixture<SottobudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SottobudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SottobudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
