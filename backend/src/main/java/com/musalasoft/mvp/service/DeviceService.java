package com.musalasoft.mvp.service;

import com.musalasoft.mvp.model.Device;
import com.musalasoft.mvp.model.Gateway;
import com.musalasoft.mvp.repo.DeviceRepository;
import com.musalasoft.mvp.repo.GatewayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class DeviceService {

    private final GatewayRepository gatewayRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository, GatewayRepository gatewayRepository) {
        this.deviceRepository = deviceRepository;
        this.gatewayRepository = gatewayRepository;
    }


    public Device addDeviceToGateway(Long gatewayId, Device device) {
        Optional<Gateway> gateway = gatewayRepository.findById(gatewayId);

        if (gateway.isPresent()) {

            Long numberOfDevices = deviceRepository.countByGatewayId(gatewayId);
            if (numberOfDevices >= 10) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "No more than 10 peripheral devices are allowed for a gateway");
            }

            device.setGateway(gateway.get());
            try {
                return deviceRepository.save(device);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Duplicate Device UID" + device.getUid());
            }

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gateway with id " + gatewayId + " not found");
        }
    }

    public Device updateGatewayDevice(Long gatewayId, Long deviceId, Device newDevice) {
        Optional<Device> device = deviceRepository.findById(deviceId);
        if (device.isPresent()) {
            device.get().setUid(newDevice.getUid());
            device.get().setVendor(newDevice.getVendor());
            device.get().setStatus(newDevice.getStatus());
            return deviceRepository.save(device.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Device with id " + deviceId +
                    " not found for gateway with id " + gatewayId);
        }
    }

    public Page<Device> getAllDevices(Long gatewayId, Pageable pageable) {
        if (gatewayRepository.existsById(gatewayId)) {
            return deviceRepository.findByGatewayId(gatewayId, pageable);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gateway with id " + gatewayId + " not found");
        }
    }

    public ResponseEntity<Object> deleteGatewayDevice(Long gatewayId, Long deviceId) {
        Optional<Device> device = deviceRepository.findByIdAndGatewayId(deviceId, gatewayId);
        if (device.isPresent()) {
            deviceRepository.delete(device.get());
            return ResponseEntity.ok().build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Device with id " + deviceId +
                    " not found for gateway with id " + gatewayId);
        }
    }
}
