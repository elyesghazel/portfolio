import {
  HomeIcon,
  GridIcon,
  NotebookPenIcon,
  CircleUserIcon,
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
      label: "Contact Me",
      path: "/contact",
      icon: CircleUserIcon,
    },
  ];
}
