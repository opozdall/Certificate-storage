import { Injectable } from '@angular/core';
import * as ASN1 from '@lapo/asn1js';

@Injectable({
  providedIn: 'root'
})
export class CertService {

  constructor() { }

  uploadFiles(files: File[]) {
    for (const file of files) {
      if (!this.validFileType(file)) {
        throw (`Формат файлу ${file.name} не підходить для завантаження. Необхідний формат ".cer"`);
      }
      const fileReader = new FileReader();

      fileReader.readAsBinaryString(file);
      fileReader.onload = async (event: any) => {
        let certData = event.target.result;
        const result = ASN1.decode(certData);
        if (result.typeName() !== 'SEQUENCE') {
          throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE)';
        }
        if (!result.sub) {
          return;
        }

        const tbsCertificate = result.sub[0];
        console.log(result.sub[0]);
      }
    }
    // this.certificates = this.selectedFiles.map((file: File)=> ASN1.decode(file).sub[0]);
  }

  validFileType(file: any) {
    const allowedFileTypes = [
      "application/x-x509-ca-cert",
    ];
    return allowedFileTypes.includes(file.type);
  }

}
