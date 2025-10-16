import { LayoutPanelTopIcon, BrushCleaningIcon, PaletteIcon, DatabaseIcon, TargetIcon, PictureInPicture2Icon, BrushIcon, HammerIcon, CpuIcon } from "lucide-react";
import Badge from "./Badge";

export default function services() {
    return [
        {
            title: "UI & UX Design",
            usp: [
                {
                    icon: BrushCleaningIcon,
                    title: "Polished Designs",
                    description: "Besides  clean and responsive designs, you will get polished and modern designs ready for seamless user journey."
                },
                {
                    icon: PaletteIcon,
                    title: "Customizability",
                    description: "Something just isn't right with your current design? Dont worry - your ideas and vision will be brought to life."
                }
            ],
            cta: "Design me something",
            link: "design",
            tags: [
                Badge({label: "Figma", primary: true}),
                Badge({label: "Design", primary: false})
            ],
        },
        {
            title: "Web Development",
            usp: [
                {
                    icon: LayoutPanelTopIcon,
                    title: "Responsive websites",
                    description: "You'll get fully responsive and modern websites. Engineered by professional web developers."
                },
                {
                    icon: DatabaseIcon,
                    title: "Fullstack apps",
                    description: "You'll get robust, scalable web apps from front to back everything fully integrated."
                }
            ],
            cta: "I'm interested!",
            link: "/quote?type=web",
            tags: [
                Badge({label: "HTML", primary: true}),
                Badge({label: "CSS", primary: false})
            ],
        },
        {
            title: "3D Printing & CAD",
            usp: [
                {
                    icon: TargetIcon,
                    title: "Precision & Creativity",
                    description: "Every model is designed and printed with accuracy — from functional prototypes to aesthetic pieces."
                },
                {
                    icon: BrushIcon,
                    title: "Custom models",
                    description: "Need something unique? I design and print parts tailored exactly to your dimensions and purpose."
                }
            ],
            cta: "Visit the shop",
            link: "https://shop.elyesghazel.ch",
            tags: [
                Badge({label: "3D Printing", primary: true}),
                Badge({label: "CAD", primary: false})
            ],
        },
        {
            title: "Custom project",
            usp: [
                {
                    icon: HammerIcon,
                    title: "Built from scratch",
                    description: "Every model is designed and printed with accuracy — from functional prototypes to aesthetic pieces."
                },
                {
                    icon: CpuIcon,
                    title: "Full Integration",
                    description: "Hardware, software, and design all working together seamlessly — no off-the-shelf limits."
                }
            ],
            cta: "Start your project",
            link: "/quote?type=custom",
            tags: [
                Badge({label: "Web", primary: true}),
                Badge({label: "CAD", primary: false}),
                Badge({label: "3D Printing", primary: false}),
                Badge({label: "Electronics", primary: false}),
            ],
        }
    ]
}