
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import MainContent from "@/components/MainContent";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <MainContent activeSection={activeSection} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
