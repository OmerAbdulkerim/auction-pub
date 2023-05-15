package com.internship.atlantbh.auctionbackend.role;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public Iterable<Role> findAllRoles() {
        return roleService.findAllRoles();
    }

    @GetMapping("/{id}")
    public Optional<Role> findRoleById(@PathVariable("id") final UUID id) {
        return roleService.findById(id);
    }
}
