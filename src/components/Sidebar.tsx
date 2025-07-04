import { FileText, Home, Plus } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: "home", label: "Accueil", icon: <Home className="w-5 h-5" /> },
    { id: "create", label: "Nouveau", icon: <Plus className="w-5 h-5" /> },
    { id: "view", label: "Visualiser", icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold text-primary mb-8">Cahier des Charges</h2>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                activeSection === item.id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;