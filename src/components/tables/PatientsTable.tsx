import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for patients
const PATIENTS_DATA = [
  { id: 1, name: "Maria Silva", age: 45, gender: "Feminino", contact: "(11) 98765-4321", diagnosis: "Hipertensão" },
  { id: 2, name: "João Santos", age: 62, gender: "Masculino", contact: "(11) 91234-5678", diagnosis: "Diabetes Tipo 2" },
  { id: 3, name: "Ana Oliveira", age: 28, gender: "Feminino", contact: "(11) 99876-5432", diagnosis: "Asma" },
  { id: 4, name: "Carlos Pereira", age: 53, gender: "Masculino", contact: "(11) 95432-1098", diagnosis: "Artrite" },
  { id: 5, name: "Luísa Fernandes", age: 38, gender: "Feminino", contact: "(11) 92345-6789", diagnosis: "Enxaqueca" },
  { id: 6, name: "Pedro Almeida", age: 71, gender: "Masculino", contact: "(11) 93456-7890", diagnosis: "Alzheimer" },
  { id: 7, name: "Beatriz Costa", age: 19, gender: "Feminino", contact: "(11) 94567-8901", diagnosis: "Ansiedade" },
  { id: 8, name: "Rafael Martins", age: 42, gender: "Masculino", contact: "(11) 95678-9012", diagnosis: "Depressão" },
];

export const PatientsTable = () => {
  const [patients, setPatients] = useState(PATIENTS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    diagnosis: "",
  });
  
  const { toast } = useToast();

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    const id = patients.length > 0 ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
    const patientToAdd = { ...newPatient, id, age: parseInt(newPatient.age) };
    setPatients([...patients, patientToAdd]);
    setNewPatient({ name: "", age: "", gender: "", contact: "", diagnosis: "" });
    setIsDialogOpen(false);
    toast({
      title: "Paciente adicionado",
      description: "O paciente foi adicionado com sucesso!",
    });
  };

  const handleEditPatient = () => {
    setPatients(
      patients.map((patient) => (patient.id === editingPatient.id ? editingPatient : patient))
    );
    setEditingPatient(null);
    setIsDialogOpen(false);
    toast({
      title: "Paciente atualizado",
      description: "Os dados do paciente foram atualizados com sucesso!",
    });
  };

  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id));
    toast({
      title: "Paciente removido",
      description: "O paciente foi removido com sucesso!",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-8" />
          </div>
          <Button>Novo Paciente</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Nome
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    CPF
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Telefone
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">Nenhum paciente cadastrado</td>
                  <td className="p-4 align-middle">-</td>
                  <td className="p-4 align-middle">-</td>
                  <td className="p-4 align-middle">-</td>
                  <td className="p-4 align-middle">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientsTable;
