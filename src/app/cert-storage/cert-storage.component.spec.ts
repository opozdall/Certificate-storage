import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertStorageComponent } from './cert-storage.component';

describe('CertificatesStorageComponent', () => {
  let component: CertStorageComponent;
  let fixture: ComponentFixture<CertStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
