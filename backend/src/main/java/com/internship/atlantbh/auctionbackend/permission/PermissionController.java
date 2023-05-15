package com.internship.atlantbh.auctionbackend.permission;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/permissions")
public class PermissionController {

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    public Iterable<Permission> findAllPermissions() {
        return permissionService.findAllPermission();
    }

    @GetMapping("/{id}")
    public Optional<Permission> findPermissionById(@PathVariable("id") final UUID id) {
        return permissionService.findById(id);
    }
}
