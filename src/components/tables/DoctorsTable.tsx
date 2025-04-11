
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

// Mock data for doctors
const DOCTORS_DATA = [
  { id: 1, name: "Dr. Carlos Mendes", specialty: "Cardiologia", crm: "CRM-SP 54321", contact: "(11) 98765-4321", availability: "Seg-Sex" },
  { id: 2, name: "Dra. Ana Ferreira", specialty: "Neurologia", crm: "CRM-SP 65432", contact: "(11) 91234-5678", availability: "Ter-Qui" },
  { id: 3, name: "Dr. Paulo Ribeiro", specialty: "Ortopedia", crm: "CRM-SP 76543", contact: "(11) 99876-5432", availability: "Seg-Qua-Sex" },
  { id: 4, name: "Dra. Luiza Costa", specialty: "Dermatologia", crm: "CRM-SP 87654", contact: "(11) 95432-1098", availability: "Seg-Sex" },
  { id: 5, name: "Dr. Roberto Alves", specialty: "Oftalmologia", crm: "CRM-SP 98765", contact: "(11) 92345-6789", availability: "Ter-Qui" },
  { id: 6, name: "Dra. Mariana Lima", specialty: "Pediatria", crm: "CRM-SP 12345", contact: "(11) 93456-7890", availability: "Qua-Sex" },
];

export const DoctorsTable = () => {
  const [doctors, setDoctors] = useState(DOCTORS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    crm: "",
    contact: "",
    availability: "",
  });
  
  const { toast } = useToast();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    const id = doctors.length > 0 ? Math.max(...doctors.map((d) => d.id)) + 1 : 1;
    const doctorToAdd = { ...newDoctor, id };
    setDoctors([...doctors, doctorToAdd]);
    setNewDoctor({ name: "", specialty: "", crm: "", contact: "", availability: "" });
    setIsDialogOpen(false);
    toast({
      title: "Médico adicionado",
      description: "O médico foi adicionado com sucesso!",
    });
  };

  const handleEditDoctor = () => {
    setDoctors(
      doctors.map((doctor) => (doctor.id === editingDoctor.id ? editingDoctor : doctor))
    );
    setEditingDoctor(null);
    setIsDialogOpen(false);
    toast({
      title: "Médico atualizado",
      description: "Os dados do médico foram atualizados com sucesso!",
    });
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
    toast({
      title: "Médico removido",
      description: "O médico foi removido com sucesso!",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar médicos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingDoctor(null)}>
              <Plus className="mr-2 h-4 w-4" /> Novo Médico
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingDoctor ? "Editar Médico" : "Adicionar Médico"}
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
                  value={editingDoctor ? editingDoctor.name : newDoctor.name}
                  onChange={(e) => {
                    if (editingDoctor) {
                      setEditingDoctor({ ...editingDoctor, name: e.target.value });
                    } else {
                      setNewDoctor({ ...newDoctor, name: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty" className="text-right">
                  Especialidade
                </Label>
                <Input
                  id="specialty"
                  className="col-span-3"
                  value={editingDoctor ? editingDoctor.specialty : newDoctor.specialty}
                  onChange={(e) => {
                    if (editingDoctor) {
                      setEditingDoctor({ ...editingDoctor, specialty: e.target.value });
                    } else {
                      setNewDoctor({ ...newDoctor, specialty: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="crm" className="text-right">
                  CRM
                </Label>
                <Input
                  id="crm"
                  className="col-span-3"
                  value={editingDoctor ? editingDoctor.crm : newDoctor.crm}
                  onChange={(e) => {
                    if (editingDoctor) {
                      setEditingDoctor({ ...editingDoctor, crm: e.target.value });
                    } else {
                      setNewDoctor({ ...newDoctor, crm: e.target.value });
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
                  value={editingDoctor ? editingDoctor.contact : newDoctor.contact}
                  onChange={(e) => {
                    if (editingDoctor) {
                      setEditingDoctor({ ...editingDoctor, contact: e.target.value });
                    } else {
                      setNewDoctor({ ...newDoctor, contact: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Disponibilidade
                </Label>
                <Input
                  id="availability"
                  className="col-span-3"
                  value={editingDoctor ? editingDoctor.availability : newDoctor.availability}
                  onChange={(e) => {
                    if (editingDoctor) {
                      setEditingDoctor({ ...editingDoctor, availability: e.target.value });
                    } else {
                      setNewDoctor({ ...newDoctor, availability: e.target.value });
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={editingDoctor ? handleEditDoctor : handleAddDoctor}>
                {editingDoctor ? "Salvar" : "Adicionar"}
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
              <th className="data-table-cell text-left">Especialidade</th>
              <th className="data-table-cell text-left">CRM</th>
              <th className="data-table-cell text-left">Contato</th>
              <th className="data-table-cell text-left">Disponibilidade</th>
              <th className="data-table-cell text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id} className="data-table-row">
                <td className="data-table-cell">{doctor.name}</td>
                <td className="data-table-cell">{doctor.specialty}</td>
                <td className="data-table-cell">{doctor.crm}</td>
                <td className="data-table-cell">{doctor.contact}</td>
                <td className="data-table-cell">{doctor.availability}</td>
                <td className="data-table-cell text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingDoctor(doctor);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteDoctor(doctor.id)}
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
