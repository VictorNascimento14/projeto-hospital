
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
    <>
      <div className="block md:hidden fixed top-4 left-4 z-50">
        <SidebarTrigger>
          <Menu className="h-6 w-6" />
        </SidebarTrigger>
      </div>
      <Sidebar className="border-r">
        <SidebarHeader className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-semibold text-lg text-primary">
            <User className="h-6 w-6" />
            <span>Hospital Admin</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 w-full",
                    activeSection === item.id &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AdminSidebar;
