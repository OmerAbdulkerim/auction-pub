package com.internship.atlantbh.auctionbackend.role;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Iterable<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    public Set<Role> findByRoleName(final String roleName) {
        return roleRepository.findByName(roleName);
    }

    public Optional<Role> findById(UUID id) {
        return roleRepository.findById(id);
    }
}
