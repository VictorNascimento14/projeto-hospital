package com.hospital.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medicos")
public class Medico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    @Column(nullable = false)
    private String nome;
    
    @NotBlank(message = "O CRM é obrigatório")
    @Pattern(regexp = "\\d{4,6}", message = "CRM deve conter entre 4 e 6 dígitos numéricos")
    @Column(nullable = false, unique = true)
    private String crm;
    
    @NotBlank(message = "A especialidade é obrigatória")
    @Column(nullable = false)
    private String especialidade;
    
    @NotBlank(message = "O telefone é obrigatório")
    @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 dígitos numéricos")
    @Column(nullable = false)
    private String telefone;
    
    @Email(message = "Email inválido")
    @Column(nullable = false)
    private String email;
    
    @OneToMany(mappedBy = "medico")
    private List<Consulta> consultas;
} 