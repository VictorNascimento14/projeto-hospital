import { PatientsTable } from "./tables/PatientsTable";
import { DoctorsTable } from "./tables/DoctorsTable";
import { AppointmentsTable } from "./tables/AppointmentsTable";
import Reports from "./sections/Reports";
import DashboardOverview from "./sections/DashboardOverview";

interface MainContentProps {
  activeSection: string;
}

const MainContent = ({ activeSection }: MainContentProps) => {
  return (
    <main className="flex-1 overflow-auto">
      <div className="container p-6 mx-auto max-w-7xl">
        {/* Header for each section */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            {activeSection === "dashboard" && "Visão Geral"}
            {activeSection === "patients" && "Pacientes"}
            {activeSection === "doctors" && "Médicos"}
            {activeSection === "appointments" && "Consultas"}
            {activeSection === "reports" && "Relatórios"}
          </h1>
        </header>

        {/* Content based on active section */}
        {activeSection === "dashboard" && <DashboardOverview />}
        {activeSection === "patients" && <PatientsTable />}
        {activeSection === "doctors" && <DoctorsTable />}
        {activeSection === "appointments" && <AppointmentsTable />}
        {activeSection === "reports" && <Reports />}
      </div>
    </main>
  );
};

export default MainContent;
