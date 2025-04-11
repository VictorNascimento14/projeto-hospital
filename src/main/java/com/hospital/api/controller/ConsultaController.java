package com.hospital.api.controller;

import com.hospital.api.dto.ConsultaDTO;
import com.hospital.api.service.ConsultaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @GetMapping
    public ResponseEntity<List<ConsultaDTO>> findAll() {
        List<ConsultaDTO> consultas = consultaService.findAll();
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultaDTO> findById(@PathVariable Long id) {
        ConsultaDTO consulta = consultaService.findById(id);
        return ResponseEntity.ok(consulta);
    }

    @PostMapping
    public ResponseEntity<ConsultaDTO> create(@Valid @RequestBody ConsultaDTO consultaDTO) {
        ConsultaDTO consulta = consultaService.create(consultaDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(consulta.getId())
                .toUri();
        return ResponseEntity.created(uri).body(consulta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConsultaDTO> update(@PathVariable Long id, @Valid @RequestBody ConsultaDTO consultaDTO) {
        ConsultaDTO consulta = consultaService.update(id, consultaDTO);
        return ResponseEntity.ok(consulta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        consultaService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 