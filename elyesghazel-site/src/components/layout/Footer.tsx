import { LinkIcon } from "lucide-react"

export default function Footer() {
    return (
        <div className="flex flex-col w-full md:h-[190px] h-[180px] bg-(--footer-bg) justify-between items-center pt-5 pb-2 px-8">
            <div className="flex flex-col contact text-center gap-2">
                <h2 className="text-[18px]">Contact me</h2>
                <a href="mailto:info@elyesghazel.ch" className="hover:cursor-pointer">
                    <div className="mail bg-[#1d1d1d] flex flex-row p-3 rounded-xl justify-center gap-4 px-5 items-center">
                        <h2 className="text-[14px]">info@elyesghazel.ch</h2>
                        <LinkIcon/>
                    </div>
                </a>
            </div>
            <div className="flex flex-col text-center">
                <h2>© 2025 Elyes Ghazel</h2>
                <span className="text-(--text-subtitle) text-sm">All rights reserved</span>
            </div>
        </div>
    )
}