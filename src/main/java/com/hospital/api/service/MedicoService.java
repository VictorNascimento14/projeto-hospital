package com.hospital.api.service;

import com.hospital.api.model.Medico;
import com.hospital.api.repository.MedicoRepository;
import com.hospital.api.dto.MedicoDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicoService {
    
    @Autowired
    private MedicoRepository medicoRepository;
    
    @Transactional(readOnly = true)
    public List<MedicoDTO> findAll() {
        return medicoRepository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public MedicoDTO findById(Long id) {
        return medicoRepository.findById(id)
            .map(this::toDTO)
            .orElseThrow(() -> new EntityNotFoundException("Médico não encontrado"));
    }
    
    @Transactional
    public MedicoDTO create(MedicoDTO dto) {
        if (medicoRepository.existsByCrm(dto.getCrm())) {
            throw new IllegalArgumentException("CRM já cadastrado");
        }
        
        Medico medico = toEntity(dto);
        medico = medicoRepository.save(medico);
        return toDTO(medico);
    }
    
    @Transactional
    public MedicoDTO update(Long id, MedicoDTO dto) {
        Medico medico = medicoRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Médico não encontrado"));
            
        if (!medico.getCrm().equals(dto.getCrm()) && medicoRepository.existsByCrm(dto.getCrm())) {
            throw new IllegalArgumentException("CRM já cadastrado");
        }
        
        BeanUtils.copyProperties(dto, medico, "id");
        medico = medicoRepository.save(medico);
        return toDTO(medico);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!medicoRepository.existsById(id)) {
            throw new EntityNotFoundException("Médico não encontrado");
        }
        medicoRepository.deleteById(id);
    }
    
    private MedicoDTO toDTO(Medico medico) {
        MedicoDTO dto = new MedicoDTO();
        BeanUtils.copyProperties(medico, dto);
        return dto;
    }
    
    private Medico toEntity(MedicoDTO dto) {
        Medico medico = new Medico();
        BeanUtils.copyProperties(dto, medico);
        return medico;
    }
} 