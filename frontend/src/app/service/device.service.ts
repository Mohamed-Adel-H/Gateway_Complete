import {Injectable} from '@angular/core';
import {Device, DevicePopupData, Gateway, GatewayDevicesResponse, Pageable} from './models';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  href = 'http://localhost:8080/gateways';

  constructor(private httpClient: HttpClient) {
  }

  getGatewayDevices(row: Gateway): Observable<GatewayDevicesResponse> {
    const pageable: Pageable = {
      pageNumber: 0,
      pageSize: 10,
      sort: ''
    };
    const requestUrl = `${(this.href + '/' + row.id + '/devices')}?pageSize=${pageable.pageSize}&pageNumber=${pageable.pageNumber}`;

    return this.httpClient.get<GatewayDevicesResponse>(requestUrl);
  }

  addDeviceToGateway(device: DevicePopupData): Observable<Device> {
    return this.httpClient.post<Device>(this.href + '/' + device.gatewayId + '/devices', device);
  }

  editDevice(device: any): Observable<Device> {
    return this.httpClient.put<Device>(this.href + '/' + device.gatewayId + '/devices/' + device.id, device);
  }

  deleteDevice(device: Device): Observable<any> {
    return this.httpClient.delete<Device>(this.href + '/' + device.gateway.id + '/devices/' + device.id);
  }
}
