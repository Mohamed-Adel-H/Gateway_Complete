import {HttpClient} from '@angular/common/http';
import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {GatewayService} from '../service/gateway.service';
import {Device, DevicePopupData, Gateway, GatewayPopupData} from '../service/models';
import {MatDialog} from '@angular/material/dialog';
import {GatewayPopupComponent} from './gateway-popup/gateway-popup.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DevicePopupComponent} from './device-popup/device-popup.component';
import {DeviceService} from '../service/device.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['serialNumber', 'name', 'ipv4', 'actions'];
  displayedDetailsColumns: string[] = ['uid', 'vendor', 'created', 'status'];
  expandedElement: Device | null;
  devices: Device[] = [];
  result: Gateway[];
  gatewayPopupData: GatewayPopupData = {
    Ipv4: '',
    Name: '',
    SerialNumber: '',
  };
  devicePopupData: DevicePopupData;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClient: HttpClient, public dialog: MatDialog,
              private gatewayService: GatewayService,
              private deviceService: DeviceService,
              private changeDetectorRefs: ChangeDetectorRef, private snackBar: MatSnackBar) {
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.updateTableModel();
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  updateTableModel(): void {
    this.gatewayService.getGateways(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
      this.result = data.content;
      this.resultsLength = data.totalElements;
      this.changeDetectorRefs.detectChanges();
    });
  }

  openDetails(row: Gateway): any {
    this.deviceService.getGatewayDevices(row).subscribe(devices => {
      this.devices = devices.content;
    });
    return row;
  }

  closeDetails(row): string {
    return null;
  }

  openCreationPopup(): void {
    const createPopupRef = this.dialog.open(GatewayPopupComponent, {
      width: '400px',
      data: {
        name: this.gatewayPopupData.Name,
        ipv4: this.gatewayPopupData.Ipv4,
        serialNumber: this.gatewayPopupData.SerialNumber,
        title: 'Create Gateway'
      }
    });

    createPopupRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.gatewayService.createGateway(result).subscribe(response => {
          this.updateTableModel();
          this.handleSuccess();
        }, error => {
          this.handleError(error);
        });
      }
    });
  }

  editGateway(currentRow: Gateway): void {
    const updatePopupRef = this.dialog.open(GatewayPopupComponent, {
      width: '400px',
      data: {
        name: currentRow.name, ipv4: currentRow.ipv4, serialNumber: currentRow.serialNumber, id: currentRow.id,
        title: 'Update Gateway'
      }
    });

    updatePopupRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.gatewayService.updateGateWay(result).subscribe(response => {
          this.updateTableModel();
          this.handleSuccess();
        }, error => {
          this.handleError(error);
        });
      }
    });
  }

  editDevice(device: Device): void {

    this.devicePopupData = {
      id: device.id, created: device.created,
      gatewayId: device.gateway.id, status: device.status, uid: device.uid, vendor: device.vendor
    };
    this.devicePopupData.gatewayId = device.gateway.id;

    const updatePopupRef = this.dialog.open(DevicePopupComponent, {
      width: '400px',
      data: {device: this.devicePopupData, title: 'Add Device to Gateway'}
    });

    updatePopupRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deviceService.editDevice(result.device).subscribe(response => {
          this.updateTableModel();
          this.handleSuccess();
        }, error => {
          this.handleError(error);
        });
      }
    });


  }

  addDevice(currentRow): void {
    this.devicePopupData = {id: 0, created: '', gatewayId: 0, status: '', uid: 0, vendor: ''};
    this.devicePopupData.gatewayId = currentRow.id;
    const updatePopupRef = this.dialog.open(DevicePopupComponent, {
      width: '400px',
      data: {device: this.devicePopupData, title: 'Add Device to Gateway'}
    });

    updatePopupRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deviceService.addDeviceToGateway(result.device).subscribe(response => {
          this.updateTableModel();
          this.handleSuccess();
        }, error => {
          this.handleError(error);
        });
      }
    });
  }

  deleteGateway(currentRow: Gateway): void {
    if (currentRow !== undefined) {
      this.gatewayService.deleteGateway(currentRow).subscribe(response => {
        this.updateTableModel();
        this.handleSuccess();
      }, error => {
        this.handleError(error);
      });
    }
  }

  deleteDevice(device: Device): void {
    if (device !== undefined) {
      this.deviceService.deleteDevice(device).subscribe(response => {
        this.updateTableModel();
        this.handleSuccess();
      }, error => {
        this.handleError(error);
      });
    }
  }

  handleError(error): void {
    this.snackBar.open(error.error.message, 'Dismiss', {
      panelClass: ['red-snackbar']
    });
  }

  handleSuccess(): void {
    this.snackBar.open('Success', 'Dismiss', {
      duration: 2000,
      panelClass: ['green-snackbar']
    });
  }

}



