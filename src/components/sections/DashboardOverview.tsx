
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserRound, Calendar, FileBarChart } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const chartData = [
  { name: "Jan", value: 40 },
  { name: "Fev", value: 30 },
  { name: "Mar", value: 45 },
  { name: "Abr", value: 50 },
  { name: "Mai", value: 35 },
  { name: "Jun", value: 60 },
  { name: "Jul", value: 40 },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-dark">2.350</div>
            <p className="text-xs text-muted-foreground">
              +5.2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Médicos</CardTitle>
            <UserRound className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-dark">185</div>
            <p className="text-xs text-muted-foreground">
              +2.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-warning shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas do Dia</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">57</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação à semana anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-success shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <FileBarChart className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">78%</div>
            <p className="text-xs text-muted-foreground">
              +3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-primary">Consultas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <p className="font-medium">Paciente {i}</p>
                    <p className="text-sm text-muted-foreground">Dr. Silva • Cardiologia</p>
                  </div>
                  <div className="text-sm bg-primary-light/10 text-primary-dark px-2 py-1 rounded-full">Hoje, 14:3{i}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-secondary">Atendimentos Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  formatter={(value) => [`${value} atendimentos`, 'Total']}
                  contentStyle={{ background: 'white', border: 'none', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
