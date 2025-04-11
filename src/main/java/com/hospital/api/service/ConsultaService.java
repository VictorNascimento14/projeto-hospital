package com.hospital.api.service;

import com.hospital.api.model.Consulta;
import com.hospital.api.model.Medico;
import com.hospital.api.model.Paciente;
import com.hospital.api.repository.ConsultaRepository;
import com.hospital.api.repository.MedicoRepository;
import com.hospital.api.repository.PacienteRepository;
import com.hospital.api.dto.ConsultaDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaService {
    
    @Autowired
    private ConsultaRepository consultaRepository;
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    @Autowired
    private MedicoRepository medicoRepository;
    
    @Transactional(readOnly = true)
    public List<ConsultaDTO> findAll() {
        return consultaRepository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public ConsultaDTO findById(Long id) {
        return consultaRepository.findById(id)
            .map(this::toDTO)
            .orElseThrow(() -> new EntityNotFoundException("Consulta não encontrada"));
    }
    
    @Transactional
    public ConsultaDTO create(ConsultaDTO dto) {
        validarHorarioConsulta(dto.getDataHora());
        validarDisponibilidadeMedico(dto.getMedicoId(), dto.getDataHora());
        validarDisponibilidadePaciente(dto.getPacienteId(), dto.getDataHora());
        
        Consulta consulta = new Consulta();
        preencherConsulta(consulta, dto);
        
        consulta = consultaRepository.save(consulta);
        return toDTO(consulta);
    }
    
    @Transactional
    public ConsultaDTO update(Long id, ConsultaDTO dto) {
        Consulta consulta = consultaRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Consulta não encontrada"));
            
        if (!consulta.getDataHora().equals(dto.getDataHora())) {
            validarHorarioConsulta(dto.getDataHora());
            validarDisponibilidadeMedico(dto.getMedicoId(), dto.getDataHora());
            validarDisponibilidadePaciente(dto.getPacienteId(), dto.getDataHora());
        }
        
        preencherConsulta(consulta, dto);
        consulta = consultaRepository.save(consulta);
        return toDTO(consulta);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!consultaRepository.existsById(id)) {
            throw new EntityNotFoundException("Consulta não encontrada");
        }
        consultaRepository.deleteById(id);
    }
    
    private void validarHorarioConsulta(LocalDateTime dataHora) {
        LocalTime hora = dataHora.toLocalTime();
        if (hora.isBefore(LocalTime.of(9, 0)) || hora.isAfter(LocalTime.of(17, 0))) {
            throw new IllegalArgumentException("Consultas só podem ser marcadas entre 9h e 17h");
        }
    }
    
    private void validarDisponibilidadeMedico(Long medicoId, LocalDateTime dataHora) {
        if (consultaRepository.existsByMedicoAndDataHora(
                medicoRepository.getReferenceById(medicoId), dataHora)) {
            throw new IllegalArgumentException("Médico já possui consulta agendada neste horário");
        }
    }
    
    private void validarDisponibilidadePaciente(Long pacienteId, LocalDateTime dataHora) {
        LocalDateTime inicioIntervalo = dataHora.minusHours(1);
        LocalDateTime fimIntervalo = dataHora.plusHours(1);
        
        if (consultaRepository.existsByPacienteAndDataHoraBetween(
                pacienteRepository.getReferenceById(pacienteId), 
                inicioIntervalo, 
                fimIntervalo)) {
            throw new IllegalArgumentException(
                "Paciente já possui consulta agendada em um intervalo de 1 hora antes ou depois");
        }
    }
    
    private void preencherConsulta(Consulta consulta, ConsultaDTO dto) {
        if (dto.getId() != null) {
            consulta.setId(dto.getId());
        }
        
        Medico medico = medicoRepository.findById(dto.getMedicoId())
            .orElseThrow(() -> new EntityNotFoundException("Médico não encontrado"));
            
        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
            .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));
            
        consulta.setDataHora(dto.getDataHora());
        consulta.setMedico(medico);
        consulta.setPaciente(paciente);
        consulta.setMotivo(dto.getMotivo());
        consulta.setStatus(dto.getStatus());
        consulta.setObservacoes(dto.getObservacoes());
    }
    
    private ConsultaDTO toDTO(Consulta consulta) {
        ConsultaDTO dto = new ConsultaDTO();
        dto.setId(consulta.getId());
        dto.setDataHora(consulta.getDataHora());
        dto.setPacienteId(consulta.getPaciente().getId());
        dto.setMedicoId(consulta.getMedico().getId());
        dto.setMotivo(consulta.getMotivo());
        dto.setStatus(consulta.getStatus());
        dto.setObservacoes(consulta.getObservacoes());
        return dto;
    }
} 