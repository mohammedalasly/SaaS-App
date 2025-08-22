"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

interface HeroSectionProps {
	title: string
	subtitle?: string
	description?: string
	highlight?: string
	ctaPrimary?: { label: string; href: string }
	imageSrc?: string
	imageAlt?: string
	reverse?: boolean
	className?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({
	title,
	subtitle,
	description,
	highlight,
	ctaPrimary,
	imageSrc,
	imageAlt,
	reverse = false,
	className,
}) => {
	const { isSignedIn } = useAuth()
	const pathname = usePathname()
	const isHomePage = pathname === "/"

	return (
		<div
			className={cn(
				"relative w-screen mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 py-16 lg:py-24",
				reverse && "lg:flex-row-reverse",
				className
			)}
			style={{
				background: `url('/images/robo.jpg')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

			{/* Inner content wrapper */}
			<div className="relative max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 px-4 w-full">
				{/* Text */}
				<div className="flex-1 space-y-6 text-center lg:text-left z-10 text-white">
					{subtitle && (
						<p className="text-lg font-semibold text-[#6bdbe3]">{subtitle}</p>
					)}

					<h1 className="lg:text-[5.5rem] sm:text-5xl font-bold leading-tight uppercase">
						{isHomePage && highlight && (
							<span className="bg-gradient-to-r from-[#8f87f1] via-[#5170ff] to-[] rounded p-1.5">
								{highlight}
							</span>
						)}{" "}
						{title}
					</h1>

					{description && (
						<p className="text-lg max-w-xl mx-auto lg:mx-0">{description}</p>
					)}

					{/* CTA button only if user NOT signed in */}
					{!isSignedIn && (
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start">
							<Link
								href="/sign-in"
								className="bg-black px-8 py-2.5 text-2xl rounded-md border border-[#358287] 
								 hover:bg-gradient-to-r from-[#358287] via-[#44a6ad] to-[#43cad4]"
							>
								{ctaPrimary?.label || "Get Started"}
							</Link>
						</div>
					)}
				</div>

				{/* Image */}
				{imageSrc && (
					<div className=" flex justify-center z-10">
						<Image
							src={imageSrc}
							alt={imageAlt || "Hero image"}
							width={200}
							height={100}
							className="rounded"
							priority
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default HeroSection
