import { BugIcon, MedalIcon, UserIcon } from "lucide-react";

export default function quickstats() {
  return [
    {
      label: "Bugs fixed",
      value: "700",
      icon: BugIcon,
    },
    {
      label: "Years experience",
      value: "7",
      icon: MedalIcon,
    },
    {
      label: "Clients satisfied",
      value: "10  ",
      icon: UserIcon,
    },
  ];
}
