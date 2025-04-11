import { useEffect, useState } from 'react';
import api from '../services/api';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export function PacienteList() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get('/pacientes');
        setPacientes(response.data);
      } catch (err) {
        setError('Erro ao carregar pacientes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Pacientes</h2>
      <div className="grid gap-4">
        {pacientes.map((paciente) => (
          <div key={paciente.id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{paciente.nome}</h3>
            <p>CPF: {paciente.cpf}</p>
            <p>Email: {paciente.email}</p>
            <p>Telefone: {paciente.telefone}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 