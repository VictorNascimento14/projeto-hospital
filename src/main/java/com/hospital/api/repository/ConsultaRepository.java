package com.hospital.api.repository;

import com.hospital.api.model.Consulta;
import com.hospital.api.model.Medico;
import com.hospital.api.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    List<Consulta> findByPacienteAndDataHoraGreaterThanEqual(Paciente paciente, LocalDateTime dataHora);
    List<Consulta> findByMedicoAndDataHoraGreaterThanEqual(Medico medico, LocalDateTime dataHora);
    boolean existsByMedicoAndDataHora(Medico medico, LocalDateTime dataHora);
    boolean existsByPacienteAndDataHoraBetween(Paciente paciente, LocalDateTime inicio, LocalDateTime fim);
} 