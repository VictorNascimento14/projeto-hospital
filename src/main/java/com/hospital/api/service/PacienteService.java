package com.hospital.api.service;

import com.hospital.api.model.Paciente;
import com.hospital.api.repository.PacienteRepository;
import com.hospital.api.dto.PacienteDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    @Transactional(readOnly = true)
    public List<PacienteDTO> findAll() {
        return pacienteRepository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public PacienteDTO findById(Long id) {
        return pacienteRepository.findById(id)
            .map(this::toDTO)
            .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));
    }
    
    @Transactional
    public PacienteDTO create(PacienteDTO dto) {
        if (pacienteRepository.existsByCpf(dto.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        
        Paciente paciente = toEntity(dto);
        paciente = pacienteRepository.save(paciente);
        return toDTO(paciente);
    }
    
    @Transactional
    public PacienteDTO update(Long id, PacienteDTO dto) {
        Paciente paciente = pacienteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));
            
        if (!paciente.getCpf().equals(dto.getCpf()) && pacienteRepository.existsByCpf(dto.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        
        BeanUtils.copyProperties(dto, paciente, "id");
        paciente = pacienteRepository.save(paciente);
        return toDTO(paciente);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new EntityNotFoundException("Paciente não encontrado");
        }
        pacienteRepository.deleteById(id);
    }
    
    private PacienteDTO toDTO(Paciente paciente) {
        PacienteDTO dto = new PacienteDTO();
        BeanUtils.copyProperties(paciente, dto);
        return dto;
    }
    
    private Paciente toEntity(PacienteDTO dto) {
        Paciente paciente = new Paciente();
        BeanUtils.copyProperties(dto, paciente);
        return paciente;
    }
} 