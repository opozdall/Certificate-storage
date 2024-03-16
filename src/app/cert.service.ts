import { Injectable } from '@angular/core';
import * as ASN1 from '@lapo/asn1js';
import { CertificateUI } from './components/models/certificate-ui';

@Injectable({
  providedIn: 'root'
})
export class CertService {
  certificates: CertificateUI[];
  constructor() {
    const certificates = localStorage.getItem('certificates');
    if (!certificates) {
      this.certificates = [];
      return;
    }
    this.certificates = JSON.parse(certificates) as CertificateUI[];
  }

  getCertificates(): CertificateUI[] {
    return this.certificates;
  }

  uploadFiles(files: File[]) {
    for (const file of files) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = async (event: any) => {
        try {
          if (!this.validFileType(file)) {
            throw (`Формат файлу не підходить для завантаження.\nНеобхідний формат ".cer"`);
          }

          const certData = event.target.result;
          const result: ASN1 = ASN1.decode(certData);
          if (result.typeName() !== 'SEQUENCE') {
            throw `Неправильна структура конверта сертифіката (очікується SEQUENCE)`;
          }
          const certificate = this.certFromASN1(result);
          if (this.certificates.some((item) => item.commonName === certificate.commonName)) {
            throw (`Сертифікат вже міститься у сховищі`);
          }
          localStorage.setItem(
            'certificates',
            JSON.stringify(this.certificates.concat([certificate]))
          );
          this.certificates.push(certificate);
        } catch (error) {
          console.error(error, file.name);
          alert(`${error}  \n\nФайл: ${file.name} не може бути завантажений`);
        }
      }
    }
  }

  validFileType(file: any) {
    const allowedFileTypes = [
      "application/x-x509-ca-cert",
    ];
    return allowedFileTypes.includes(file.type);
  }

  certFromASN1 = (asn: any) => {
    const person = asn.sub[0].sub[5]
    const commonName = person.sub.find((item: any) => item?.sub[0]?.sub[0].content().split('\n')[1] === 'commonName').sub[0].sub[1].content();
    const issuer = asn.sub[0].sub[3]
    const issuerCn = issuer.sub.find((obj: any) => obj?.sub[0]?.sub[0].content().split('\n')[1] === 'commonName').sub[0].sub[1].content();
    const time = asn.sub[0].sub[4]
    const validFrom = time.sub[0].content();
    const validTo = time.sub[1].content();
    return { commonName, issuerCn, validFrom, validTo }
  }

  deleteCert(certificate: CertificateUI) {
    this.certificates = this.certificates.filter((cert: CertificateUI) => (cert != certificate));
    localStorage.setItem('certificates', JSON.stringify(this.certificates));
  }

  deleteAllCerts() {
    this.certificates = [];
    localStorage.setItem('certificates', '');
  }

}
