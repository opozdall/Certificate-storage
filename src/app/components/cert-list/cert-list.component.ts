import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cert-list',
  templateUrl: './cert-list.component.html',
  styleUrls: ['./cert-list.component.sass']
})
export class CertListComponent implements OnInit {
  @Input() certificates: any[] = [];
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.certificates[0].name);
  }

}
