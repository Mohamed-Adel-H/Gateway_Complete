import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Device} from '../../service/models';

interface StatusMenu {
  value: string;
  viewValue: string;
}

export interface DevicePopupData {
  title: string;
  device: Device;
}

@Component({
  selector: 'app-device-popup',
  templateUrl: './device-popup.component.html',
  styleUrls: ['./device-popup.component.css']
})
export class DevicePopupComponent implements OnInit {

  popupTitle = ' ';
  statuses: StatusMenu[] = [
    {value: 'online', viewValue: 'Online'},
    {value: 'offline', viewValue: 'Offline'},
  ];

  constructor(public dialogRef: MatDialogRef<DevicePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DevicePopupData) {
  }

  ngOnInit(): void {
    this.popupTitle = this.data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
