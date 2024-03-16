import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertListComponent } from './cert-list.component';

describe('CertListComponent', () => {
  let component: CertListComponent;
  let fixture: ComponentFixture<CertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
