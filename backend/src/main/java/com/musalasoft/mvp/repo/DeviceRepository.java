package com.musalasoft.mvp.repo;

import com.musalasoft.mvp.model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    Page<Device> findByGatewayId(Long gatewayId, Pageable pageable);

    Optional<Device> findByIdAndGatewayId(Long deviceId, Long gatewayId);

    Long countByGatewayId(Long gatewayId);
}
