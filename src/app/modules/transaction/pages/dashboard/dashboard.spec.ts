import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Dashboard} from './dashboard';
import {provideZonelessChangeDetection} from '@angular/core';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SubmitForm()', () => {
    const submithSpyOn = spyOn(component, 'submitForm').and.callThrough();

    component.submitForm();

    expect(submithSpyOn).toHaveBeenCalled();
  })
});
