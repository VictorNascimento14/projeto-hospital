
import { useState } from "react";
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

const patientsByAge = [
  { name: "0-18", value: 145 },
  { name: "19-35", value: 302 },
  { name: "36-50", value: 287 },
  { name: "51-65", value: 256 },
  { name: "66+", value: 173 },
];

const monthlyAppointments = [
  { name: "Jan", consultas: 65, exames: 42 },
  { name: "Fev", consultas: 78, exames: 51 },
  { name: "Mar", consultas: 92, exames: 63 },
  { name: "Abr", consultas: 87, exames: 59 },
  { name: "Mai", consultas: 105, exames: 71 },
  { name: "Jun", consultas: 93, exames: 65 },
  { name: "Jul", consultas: 89, exames: 57 },
  { name: "Ago", consultas: 97, exames: 68 },
  { name: "Set", consultas: 110, exames: 75 },
  { name: "Out", consultas: 98, exames: 62 },
  { name: "Nov", consultas: 85, exames: 58 },
  { name: "Dez", consultas: 72, exames: 49 },
];

const financialData = [
  { month: "Jan", receita: 125000, despesas: 95000 },
  { month: "Fev", receita: 137000, despesas: 97000 },
  { month: "Mar", receita: 145000, despesas: 102000 },
  { month: "Abr", receita: 152000, despesas: 104000 },
  { month: "Mai", receita: 159000, despesas: 108000 },
  { month: "Jun", receita: 147000, despesas: 101000 },
];

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

export const Reports = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Relatórios</h2>
          <p className="text-muted-foreground">
            Visualize e analise os dados do hospital
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="appointments" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="appointments">Consultas</TabsTrigger>
          <TabsTrigger value="patients">Pacientes</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Consultas por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={appointmentsByDepartment}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
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

            <Card>
              <CardHeader>
                <CardTitle>Consultas Mensais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyAppointments}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultas" fill="#0088FE" />
                      <Bar dataKey="exames" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Pacientes por Idade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={patientsByAge}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884D8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={financialData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="receita"
                      stroke="#00C49F"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="despesas" stroke="#FF8042" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
