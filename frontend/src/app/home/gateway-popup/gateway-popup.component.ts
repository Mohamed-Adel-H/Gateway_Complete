import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface GatewayPopupData {
  title: string;
  serialNumber: string;
  name: string;
  ipv4: string;
}

@Component({
  selector: 'app-gateway-popup',
  templateUrl: './gateway-popup.component.html',
  styleUrls: ['./gateway-popup.component.css']
})
export class GatewayPopupComponent implements OnInit {

  popupTitle = ' ';

  constructor(public dialogRef: MatDialogRef<GatewayPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GatewayPopupData) {
  }

  ngOnInit(): void {
    this.popupTitle = this.data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
