import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ASN1 from '@lapo/asn1js';
@Component({
  selector: 'app-cert-storage',
  templateUrl: './cert-storage.component.html',
  styleUrls: ['./cert-storage.component.sass']
})
export class CertStorageComponent implements OnInit {
  isAddingCert: boolean = true;
  certificates: string[] = ['a', 'b', 'c'];
  // certificates: string[] = [];
  // @ViewChild('fileInput') fileInput: ElementRef ;
  fileToUpload: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  addCert() {
    this.isAddingCert = true;
  }

  backFromAddingCert() {
    this.isAddingCert = false;
  }

  clickUpload() {
    // this.fileInput.nativeElement.value = '';

  }

  async uploadFile(event: any): Promise<void> {
    console.log(event);
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    console.log(selectedFile.type);
    const result = ASN1.decode(selectedFile);
    console.log(result);

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = async (event: any) => {
      let binaryData = event.target.result;
      console.log(binaryData);
    }

    const input = document.querySelector("input");
    const preview = document.querySelector(".preview");

    while (preview?.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    // const curFiles = input?.files;
    // if (curFiles?.length === 0) {
    //   const para = document.createElement("p");
    //   para.textContent = "No files currently selected for upload";
    //   preview?.appendChild(para);
    // } else {
    //   const list = document.createElement("ol");
    //   preview?.appendChild(list);

    //   for (const file of curFiles) {
    //     const listItem = document.createElement("li");
    //     const para = document.createElement("p");
    //     if (this.validFileType(file)) {
    //       para.textContent = `File name ${file.name}, file size ${returnFileSize(
    //         file.size,
    //       )}.`;
    //       const image = document.createElement("img");
    //       image.src = URL.createObjectURL(file);
    //       image.alt = image.title = file.name;

    //       listItem.appendChild(image);
    //       listItem.appendChild(para);
    //     } else {
    //       para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
    //       listItem.appendChild(para);
    //     }

    //     list.appendChild(listItem);
    //   }
    // }

  }

  validFileType(file: File) {
    const fileTypes = [
      "cer",
    ];
    return fileTypes.includes(file.type);
  }

}
