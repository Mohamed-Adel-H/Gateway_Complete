package com.musalasoft.mvp.controller;

import com.musalasoft.mvp.model.Gateway;
import com.musalasoft.mvp.service.GatewayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/gateways")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class GatewayController {

    private final GatewayService gatewayService;

    @Autowired
    public GatewayController(GatewayService gatewayService) {
        this.gatewayService = gatewayService;
    }

    @PostMapping
    public Gateway createGateway(@Valid @RequestBody Gateway gateway) {
        return gatewayService.save(gateway);
    }

    @PutMapping("/{gatewayId}")
    public Gateway updateGateway(@PathVariable Long gatewayId, @Valid @RequestBody Gateway newGateway) {
        return gatewayService.updateGateway(gatewayId, newGateway);
    }

    @DeleteMapping("/{gatewayId}")
    public ResponseEntity<Object> deleteGateway(@PathVariable Long gatewayId) {
        return gatewayService.deleteGateway(gatewayId);
    }


    @GetMapping
    public Page<Gateway> getGateways(Pageable pageable) {
        return gatewayService.getAllGateways(pageable);
    }


}
