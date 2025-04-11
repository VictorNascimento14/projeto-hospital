package com.hospital.api.dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import com.hospital.api.model.StatusConsulta;

@Data
public class ConsultaDTO {
    private Long id;
    
    @NotNull(message = "O ID do paciente é obrigatório")
    private Long pacienteId;
    
    @NotNull(message = "O ID do médico é obrigatório")
    private Long medicoId;
    
    @NotNull(message = "A data/hora é obrigatória")
    @Future(message = "A data/hora deve ser no futuro")
    private LocalDateTime dataHora;
    
    @NotBlank(message = "O motivo da consulta é obrigatório")
    @Size(min = 10, max = 255, message = "O motivo deve ter entre 10 e 255 caracteres")
    private String motivo;
    
    private StatusConsulta status;
    
    private String observacoes;
} 