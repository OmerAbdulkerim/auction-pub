package com.internship.atlantbh.auctionbackend.permission;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public Iterable<Permission> findAllPermission () {
        return permissionRepository.findAll();
    }

    public Optional<Permission> findById(UUID id) {
        return permissionRepository.findById(id);
    }
}
