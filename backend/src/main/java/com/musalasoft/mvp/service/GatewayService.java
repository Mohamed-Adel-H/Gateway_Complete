package com.musalasoft.mvp.service;

import com.musalasoft.mvp.model.Gateway;
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
public class GatewayService {

    private final GatewayRepository gatewayRepository;

    @Autowired
    public GatewayService(GatewayRepository gatewayRepository) {
        this.gatewayRepository = gatewayRepository;
    }

    public Gateway save(Gateway gateway) {
        return gatewayRepository.save(gateway);
    }

    public Page<Gateway> getAllGateways(Pageable pageable) {
        return gatewayRepository.findAll(pageable);
    }

    public ResponseEntity<Object> deleteGateway(Long gatewayId) {
        Optional<Gateway> gateway = gatewayRepository.findById(gatewayId);
        if (gateway.isPresent()) {
            try {
                gatewayRepository.delete(gateway.get());
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot Delete Gateway with id " +
                        gatewayId + " please check if still has devices");
            }
            return ResponseEntity.ok().build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gateway with id " + gatewayId + " not found");
        }

    }

    public Gateway updateGateway(Long gatewayId, Gateway newGateway) {
        Optional<Gateway> oldGateway = gatewayRepository.findById(gatewayId);
        if (oldGateway.isPresent()) {
            oldGateway.get().setSerialNumber(newGateway.getSerialNumber());
            oldGateway.get().setName(newGateway.getName());
            oldGateway.get().setIpv4(newGateway.getIpv4());
            return gatewayRepository.save(oldGateway.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gateway with id " + gatewayId + " not found");
        }
    }
}
