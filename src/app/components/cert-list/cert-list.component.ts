import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CertificateUI } from '../models/certificate-ui';

@Component({
  selector: 'app-cert-list',
  templateUrl: './cert-list.component.html',
  styleUrls: ['./cert-list.component.sass']
})
export class CertListComponent {
  @Input() certificates: CertificateUI[] = [];
  @Output() setCertificate = new EventEmitter<CertificateUI>();

  constructor() { }

  onClickItem(cert: CertificateUI) {
    this.setCertificate.emit(cert);
  }
}
