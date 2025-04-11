import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// Mock data for reports
const appointmentsByDepartment = [
  { name: "Cardiologia", value: 125 },
  { name: "Neurologia", value: 87 },
  { name: "Ortopedia", value: 104 },
  { name: "Dermatologia", value: 93 },
  { name: "Oftalmologia", value: 76 },
  { name: "Pediatria", value: 112 },
];

const monthlyAppointments = [
  { name: "Jan", consultas: 45, exames: 32 },
  { name: "Fev", consultas: 52, exames: 38 },
  { name: "Mar", consultas: 48, exames: 35 },
  { name: "Abr", consultas: 60, exames: 42 },
  { name: "Mai", consultas: 55, exames: 40 },
  { name: "Jun", consultas: 65, exames: 45 },
];

const revenueData = [
  { name: "Jan", receita: 125000, despesas: 95000 },
  { name: "Fev", receita: 137000, despesas: 97000 },
  { name: "Mar", receita: 145000, despesas: 102000 },
  { name: "Abr", receita: 152000, despesas: 104000 },
  { name: "Mai", receita: 159000, despesas: 108000 },
  { name: "Jun", receita: 147000, despesas: 101000 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#22c55e", "#f97316", "#06b6d4", "#ec4899"];

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Relatórios</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="hover:bg-muted/50">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-card">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="appointments">Consultas</TabsTrigger>
          <TabsTrigger value="revenue">Faturamento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Consultas por Especialidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={appointmentsByDepartment}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {appointmentsByDepartment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Consultas e Exames Mensais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyAppointments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="consultas" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="exames" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Detalhes das Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentsByDepartment}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Faturamento vs Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                    <Legend />
                    <Area type="monotone" dataKey="receita" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="despesas" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
