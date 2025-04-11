
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pacientes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPatient(null)}>
              <Plus className="mr-2 h-4 w-4" /> Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPatient ? "Editar Paciente" : "Adicionar Paciente"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={editingPatient ? editingPatient.name : newPatient.name}
                  onChange={(e) => {
                    if (editingPatient) {
                      setEditingPatient({ ...editingPatient, name: e.target.value });
                    } else {
                      setNewPatient({ ...newPatient, name: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Idade
                </Label>
                <Input
                  id="age"
                  type="number"
                  className="col-span-3"
                  value={editingPatient ? editingPatient.age : newPatient.age}
                  onChange={(e) => {
                    if (editingPatient) {
                      setEditingPatient({
                        ...editingPatient,
                        age: parseInt(e.target.value),
                      });
                    } else {
                      setNewPatient({ ...newPatient, age: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gênero
                </Label>
                <Input
                  id="gender"
                  className="col-span-3"
                  value={editingPatient ? editingPatient.gender : newPatient.gender}
                  onChange={(e) => {
                    if (editingPatient) {
                      setEditingPatient({ ...editingPatient, gender: e.target.value });
                    } else {
                      setNewPatient({ ...newPatient, gender: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contato
                </Label>
                <Input
                  id="contact"
                  className="col-span-3"
                  value={editingPatient ? editingPatient.contact : newPatient.contact}
                  onChange={(e) => {
                    if (editingPatient) {
                      setEditingPatient({ ...editingPatient, contact: e.target.value });
                    } else {
                      setNewPatient({ ...newPatient, contact: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="diagnosis" className="text-right">
                  Diagnóstico
                </Label>
                <Input
                  id="diagnosis"
                  className="col-span-3"
                  value={editingPatient ? editingPatient.diagnosis : newPatient.diagnosis}
                  onChange={(e) => {
                    if (editingPatient) {
                      setEditingPatient({ ...editingPatient, diagnosis: e.target.value });
                    } else {
                      setNewPatient({ ...newPatient, diagnosis: e.target.value });
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={editingPatient ? handleEditPatient : handleAddPatient}>
                {editingPatient ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead className="data-table-header">
            <tr>
              <th className="data-table-cell text-left">Nome</th>
              <th className="data-table-cell text-left">Idade</th>
              <th className="data-table-cell text-left">Gênero</th>
              <th className="data-table-cell text-left">Contato</th>
              <th className="data-table-cell text-left">Diagnóstico</th>
              <th className="data-table-cell text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="data-table-row">
                <td className="data-table-cell">{patient.name}</td>
                <td className="data-table-cell">{patient.age}</td>
                <td className="data-table-cell">{patient.gender}</td>
                <td className="data-table-cell">{patient.contact}</td>
                <td className="data-table-cell">{patient.diagnosis}</td>
                <td className="data-table-cell text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingPatient(patient);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
