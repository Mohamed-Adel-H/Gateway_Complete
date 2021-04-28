package com.musalasoft.mvp.controller;

import com.musalasoft.mvp.model.Device;
import com.musalasoft.mvp.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/gateways/{gatewayId}/devices")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class DeviceController {

    private final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping
    public Device createGatewayDevice(@PathVariable Long gatewayId, @Valid @RequestBody Device device) {
        return deviceService.addDeviceToGateway(gatewayId, device);
    }

    @PutMapping("/{deviceId}")
    public Device updateGatewayDevice(@PathVariable Long gatewayId, @PathVariable Long deviceId, @Valid @RequestBody Device newDevice) {
        return deviceService.updateGatewayDevice(gatewayId, deviceId, newDevice);
    }

    @GetMapping
    public Page<Device> getAllGatewayDevices(@PathVariable Long gatewayId, Pageable pageable) {
        return deviceService.getAllDevices(gatewayId, pageable);
    }

    @DeleteMapping("/{deviceId}")
    public ResponseEntity<Object> deleteGatewayDevice(@PathVariable Long gatewayId, @PathVariable Long deviceId) {
        return deviceService.deleteGatewayDevice(gatewayId, deviceId);
    }


}
