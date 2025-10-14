import {
  HomeIcon,
  GridIcon,
  NotebookPenIcon,
  BadgeDollarSign,
} from "lucide-react"; // lightweight icons

export default function navigationItems() {
  return [
    {
      label: "Home",
      path: "/",
      icon: HomeIcon, // optional, if you want to pair it with a lucide-react icon
    },
    {
      label: "Services",
      path: "/services",
      icon: GridIcon,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: NotebookPenIcon,
    },
    {
      label: "Request a quote",
      path: "/quote",
      icon: BadgeDollarSign,
    },
  ];
}
