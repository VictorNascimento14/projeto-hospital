package com.hospital.api.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class MedicoDTO {
    private Long id;
    
    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "O CRM é obrigatório")
    @Pattern(regexp = "\\d{4,6}", message = "CRM deve conter entre 4 e 6 dígitos numéricos")
    private String crm;
    
    @NotBlank(message = "A especialidade é obrigatória")
    private String especialidade;
    
    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    private String email;
    
    @NotBlank(message = "O telefone é obrigatório")
    @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 dígitos numéricos")
    private String telefone;
} 