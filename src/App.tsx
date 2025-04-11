import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainContent from "./components/MainContent";
import AdminSidebar from "./components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const App = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="min-h-screen flex">
          <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <MainContent activeSection={activeSection} />
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default App;
