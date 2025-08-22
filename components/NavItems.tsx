"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FaHome, FaFolderOpen, FaBookReader, FaCrown } from "react-icons/fa"

const navItems = [
	{ label: "Home", href: "/", icon: FaHome },
	{ label: "Companions", href: "/companions", icon: FaFolderOpen },
	{ label: "My Journey", href: "/my-journey", icon: FaBookReader },
	{ label: "Pricing", href: "/subscription", icon: FaCrown },
]

interface NavItemsProps {
	onItemClick?: () => void
}

const NavItems = ({ onItemClick }: NavItemsProps) => {
	const pathname = usePathname()

	return (
		<nav className="flex md:flex-row flex-col md:items-center gap-4 md:gap-2 lg:gap-10 ">
			{navItems.map(({ label, href, icon: Icon }) => (
				<Link
					href={href}
					key={label}
					onClick={onItemClick}
					className={cn(
						`flex gap-1.5 px-2.5 py-1 rounded transition-colors duration-200 
						hover:bg-gradient-to-r from-[#8f87f1] to-[#5170ff] hover:text-white dark:hover:bg-gray-800`,
						pathname === href
							? "text-white font-semibold bg-gradient-to-r from-[#8f87f1] to-[#5170ff]"
							: "text-gray-600 dark:text-gray-300"
					)}
				>
					<Icon className="w-5 h-5" />
					{label}
				</Link>
			))}
		</nav>
	)
}

export default NavItems
