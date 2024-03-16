import { Component, OnInit } from '@angular/core';
import { Certificate } from 'crypto';
import { CertService } from 'src/app/cert.service';
// import x509 from 'js-x509-utils';

@Component({
  selector: 'app-cert-storage',
  templateUrl: './cert-storage.component.html',
  styleUrls: ['./cert-storage.component.sass']
})
export class CertStorageComponent implements OnInit {
  isAddingCert: boolean = true;
  isDragOver: boolean = false;
  certificates: Certificate[] = [];
  selectedFiles: File[] = [];

  constructor(
    private certService: CertService,
  ) { }

  ngOnInit(): void {
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

    try {
      this.certService.uploadFiles(this.selectedFiles);
      this.isAddingCert = false;
    }
    catch (error) {
      console.error(error);
      alert(error);
    }
  }

  deleteFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(function (w) { return w.name != file.name });
    console.log(this.selectedFiles);
  }
}
