import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserRound, Calendar, FileBarChart, TrendingUp } from "lucide-react";

const DashboardOverview = () => {
  const cards = [
    {
      title: "Total de Pacientes",
      value: "1,234",
      change: "+12%",
      icon: <Users className="h-7 w-7" />,
      gradient: "gradient-blue",
      trend: "up",
    },
    {
      title: "Total de Médicos",
      value: "48",
      change: "+2%",
      icon: <UserRound className="h-7 w-7" />,
      gradient: "gradient-purple",
      trend: "up",
    },
    {
      title: "Consultas do Dia",
      value: "24",
      change: "+18%",
      icon: <Calendar className="h-7 w-7" />,
      gradient: "gradient-green",
      trend: "up",
    },
    {
      title: "Taxa de Ocupação",
      value: "85%",
      change: "+5%",
      icon: <FileBarChart className="h-7 w-7" />,
      gradient: "gradient-orange",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            className={`dashboard-card hover-card ${card.gradient}`}
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <div className="w-14 h-14 text-white">
                {card.icon}
              </div>
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-medium text-white/90">{card.title}</CardTitle>
              <div className="rounded-full bg-white/10 p-2.5">
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-3">{card.value}</div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 w-fit">
                <TrendingUp className="h-4 w-4 text-white/90" />
                <p className="text-sm text-white/90">
                  {card.change} em relação ao mês anterior
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="list-card">
          <CardHeader className="list-header px-6 py-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Consultas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-[460px] overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-gray-100">
              {[
                {
                  patient: "Maria Silva",
                  doctor: "Dr. João Santos",
                  specialty: "Cardiologia",
                  time: "14:30",
                  status: "Confirmada",
                },
                {
                  patient: "Pedro Oliveira",
                  doctor: "Dra. Ana Lima",
                  specialty: "Neurologia",
                  time: "15:00",
                  status: "Pendente",
                },
                {
                  patient: "Lucia Costa",
                  doctor: "Dr. Carlos Mendes",
                  specialty: "Ortopedia",
                  time: "15:30",
                  status: "Confirmada",
                },
                {
                  patient: "João Pereira",
                  doctor: "Dra. Beatriz Rocha",
                  specialty: "Dermatologia",
                  time: "16:00",
                  status: "Cancelada",
                },
                {
                  patient: "Ana Santos",
                  doctor: "Dr. Ricardo Alves",
                  specialty: "Oftalmologia",
                  time: "16:30",
                  status: "Confirmada",
                },
              ].map((appointment, i) => (
                <div 
                  key={i} 
                  className="list-item flex items-center justify-between px-6 py-4"
                >
                  <div className="space-y-1">
                    <p className="text-base font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.doctor} • {appointment.specialty}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      appointment.status === "Confirmada" 
                        ? "status-confirmed"
                        : appointment.status === "Pendente"
                        ? "status-pending"
                        : "status-cancelled"
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="list-card">
          <CardHeader className="list-header px-6 py-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Pacientes Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-[460px] overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-gray-100">
              {[
                {
                  name: "Ana Silva",
                  age: 32,
                  gender: "Feminino",
                  id: "10231",
                  lastVisit: "2 dias atrás",
                },
                {
                  name: "Carlos Santos",
                  age: 45,
                  gender: "Masculino",
                  id: "10232",
                  lastVisit: "1 semana atrás",
                },
                {
                  name: "Mariana Lima",
                  age: 28,
                  gender: "Feminino",
                  id: "10233",
                  lastVisit: "3 dias atrás",
                },
                {
                  name: "José Oliveira",
                  age: 56,
                  gender: "Masculino",
                  id: "10234",
                  lastVisit: "5 dias atrás",
                },
                {
                  name: "Patricia Costa",
                  age: 39,
                  gender: "Feminino",
                  id: "10235",
                  lastVisit: "1 dia atrás",
                },
              ].map((patient, i) => (
                <div 
                  key={i} 
                  className="list-item flex items-center justify-between px-6 py-4"
                >
                  <div className="space-y-1">
                    <p className="text-base font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-500">
                      {patient.age} anos • {patient.gender}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-sm font-medium text-gray-700">ID: {patient.id}</div>
                    <span className="text-xs text-gray-500">
                      {patient.lastVisit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
