import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  User,
  Users,
  UserRound,
  Calendar,
  FileBarChart,
  Home,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const menuItems = [
    {
      title: "Dashboard",
      id: "dashboard",
      icon: <Home size={20} />,
    },
    {
      title: "Pacientes",
      id: "patients",
      icon: <Users size={20} />,
    },
    {
      title: "Médicos",
      id: "doctors",
      icon: <UserRound size={20} />,
    },
    {
      title: "Consultas",
      id: "appointments",
      icon: <Calendar size={20} />,
    },
    {
      title: "Relatórios",
      id: "reports",
      icon: <FileBarChart size={20} />,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger>
          <Menu size={20} />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.id}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            >
              <SidebarMenuButton>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
