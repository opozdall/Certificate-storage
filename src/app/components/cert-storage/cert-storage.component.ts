import { Component, OnInit } from '@angular/core';
import { CertService } from 'src/app/cert.service';
import { CertificateUI } from '../models/certificate-ui';

@Component({
  selector: 'app-cert-storage',
  templateUrl: './cert-storage.component.html',
  styleUrls: ['./cert-storage.component.sass']
})
export class CertStorageComponent implements OnInit {
  isAddingCert: boolean = false;
  isDragOver: boolean = false;
  certificates: CertificateUI[] = [];
  displayedCert: CertificateUI | undefined;
  selectedFiles: File[] = [];

  constructor(
    private certService: CertService,
  ) { }

  ngOnInit(): void {
    this.certificates = this.certService.getCertificates();
  }

  toggleCertAdding(isAddingCert: boolean) {
    this.isAddingCert = isAddingCert;
  }

  dragHandler(event: DragEvent, isDragOver: boolean) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = isDragOver;
  }

  dropFile(event: DragEvent) {
    this.dragHandler(event, false)
    if (!event.dataTransfer) {
      return;
    }
    this.selectedFiles = Array.from(event.dataTransfer.files);
  }

  async uploadFileFromDialog(event: any): Promise<void> {
    this.selectedFiles = Array.from(event.target.files);
  }

  async uploadFiles() {
    this.certService.uploadFiles(this.selectedFiles);
    this.isAddingCert = false;
    this.selectedFiles = [];
  }

  deleteFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(function (w) { return w.name != file.name });
  }

  setItem(certificate: CertificateUI) {
    this.displayedCert = certificate;
  }

  deleteCert() {
    if (!this.displayedCert) {
      return;
    }
    this.certService.deleteCert(this.displayedCert);
    this.certificates = this.certService.getCertificates();
    this.displayedCert = undefined;
  }

  deleteAllCerts() {
    this.certService.deleteAllCerts();
    this.certificates = this.certService.getCertificates();
    this.displayedCert = undefined;
  }
}
