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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Médicos</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-8" />
          </div>
          <Button>Novo Médico</Button>
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
                    CRM
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Especialidade
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Telefone
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">Nenhum médico cadastrado</td>
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

export default DoctorsTable;
