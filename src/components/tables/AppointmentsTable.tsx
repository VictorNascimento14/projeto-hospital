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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for appointments
const APPOINTMENTS_DATA = [
  { id: 1, patient: "Maria Silva", doctor: "Dr. Carlos Mendes", date: "2025-04-15", time: "09:00", status: "Agendada", type: "Consulta" },
  { id: 2, patient: "João Santos", doctor: "Dra. Ana Ferreira", date: "2025-04-15", time: "10:30", status: "Confirmada", type: "Retorno" },
  { id: 3, patient: "Ana Oliveira", doctor: "Dr. Paulo Ribeiro", date: "2025-04-16", time: "14:00", status: "Agendada", type: "Exame" },
  { id: 4, patient: "Carlos Pereira", doctor: "Dra. Luiza Costa", date: "2025-04-16", time: "15:30", status: "Cancelada", type: "Consulta" },
  { id: 5, patient: "Luísa Fernandes", doctor: "Dr. Roberto Alves", date: "2025-04-17", time: "08:30", status: "Confirmada", type: "Cirurgia" },
  { id: 6, patient: "Pedro Almeida", doctor: "Dra. Mariana Lima", date: "2025-04-17", time: "11:00", status: "Agendada", type: "Consulta" },
];

export const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState(APPOINTMENTS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    status: "Agendada",
    type: "",
  });
  
  const { toast } = useToast();

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAppointment = () => {
    const id = appointments.length > 0 ? Math.max(...appointments.map((a) => a.id)) + 1 : 1;
    const appointmentToAdd = { ...newAppointment, id };
    setAppointments([...appointments, appointmentToAdd]);
    setNewAppointment({
      patient: "",
      doctor: "",
      date: "",
      time: "",
      status: "Agendada",
      type: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Consulta adicionada",
      description: "A consulta foi adicionada com sucesso!",
    });
  };

  const handleEditAppointment = () => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === editingAppointment.id ? editingAppointment : appointment
      )
    );
    setEditingAppointment(null);
    setIsDialogOpen(false);
    toast({
      title: "Consulta atualizada",
      description: "Os dados da consulta foram atualizados com sucesso!",
    });
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
    toast({
      title: "Consulta removida",
      description: "A consulta foi removida com sucesso!",
      variant: "destructive",
    });
  };

  const statusOptions = ["Agendada", "Confirmada", "Em andamento", "Concluída", "Cancelada"];
  const typeOptions = ["Consulta", "Retorno", "Exame", "Cirurgia", "Emergência"];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar consultas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAppointment(null)}>
              <Plus className="mr-2 h-4 w-4" /> Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? "Editar Consulta" : "Adicionar Consulta"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  Paciente
                </Label>
                <Input
                  id="patient"
                  className="col-span-3"
                  value={editingAppointment ? editingAppointment.patient : newAppointment.patient}
                  onChange={(e) => {
                    if (editingAppointment) {
                      setEditingAppointment({
                        ...editingAppointment,
                        patient: e.target.value,
                      });
                    } else {
                      setNewAppointment({ ...newAppointment, patient: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Médico
                </Label>
                <Input
                  id="doctor"
                  className="col-span-3"
                  value={editingAppointment ? editingAppointment.doctor : newAppointment.doctor}
                  onChange={(e) => {
                    if (editingAppointment) {
                      setEditingAppointment({
                        ...editingAppointment,
                        doctor: e.target.value,
                      });
                    } else {
                      setNewAppointment({ ...newAppointment, doctor: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                  value={editingAppointment ? editingAppointment.date : newAppointment.date}
                  onChange={(e) => {
                    if (editingAppointment) {
                      setEditingAppointment({
                        ...editingAppointment,
                        date: e.target.value,
                      });
                    } else {
                      setNewAppointment({ ...newAppointment, date: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Hora
                </Label>
                <Input
                  id="time"
                  type="time"
                  className="col-span-3"
                  value={editingAppointment ? editingAppointment.time : newAppointment.time}
                  onChange={(e) => {
                    if (editingAppointment) {
                      setEditingAppointment({
                        ...editingAppointment,
                        time: e.target.value,
                      });
                    } else {
                      setNewAppointment({ ...newAppointment, time: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingAppointment ? editingAppointment.status : newAppointment.status}
                  onValueChange={(value) => {
                    if (editingAppointment) {
                      setEditingAppointment({
                        ...editingAppointment,
                        status: value,
                      });
                    } else {
                      setNewAppointment({ ...newAppointment, status: value });
                    }
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select
                  value={editingAppointment ? editingAppointment.type : newAppointment.type}
                  onValueChange={(value) => {
                    if (editingAppointment) {
                      setEditingAppointment({
                        ...editingAppointment,
                        type: value,
                      });
                    } else {
                      setNewAppointment({ ...newAppointment, type: value });
                    }
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={
                  editingAppointment ? handleEditAppointment : handleAddAppointment
                }
              >
                {editingAppointment ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead className="data-table-header">
            <tr>
              <th className="data-table-cell text-left">Paciente</th>
              <th className="data-table-cell text-left">Médico</th>
              <th className="data-table-cell text-left">Data</th>
              <th className="data-table-cell text-left">Hora</th>
              <th className="data-table-cell text-left">Status</th>
              <th className="data-table-cell text-left">Tipo</th>
              <th className="data-table-cell text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="data-table-row">
                <td className="data-table-cell">{appointment.patient}</td>
                <td className="data-table-cell">{appointment.doctor}</td>
                <td className="data-table-cell">{new Date(appointment.date).toLocaleDateString('pt-BR')}</td>
                <td className="data-table-cell">{appointment.time}</td>
                <td className="data-table-cell">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      appointment.status === "Agendada"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "Confirmada"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "Em andamento"
                        ? "bg-yellow-100 text-yellow-800"
                        : appointment.status === "Concluída"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="data-table-cell">{appointment.type}</td>
                <td className="data-table-cell text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingAppointment(appointment);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteAppointment(appointment.id)}
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
