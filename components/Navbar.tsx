"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { RiMenu3Line, RiXrpLine } from "react-icons/ri"
import NavItems from "@/components/NavItems"

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<>
			<nav
				className="navbar sticky top-0 z-50 bg-white/60 dark:bg-gray-900/90 backdrop-blur-md 
			dark:border-gray-700"
			>
				<Link href="/" onClick={closeMenu}>
					<div className="flex items-center gap-2.5 cursor-pointer">
						<Image
							src="/images/logo.png"
							alt="logo"
							width={150}
							height={60}
							className="rounded"
						/>
					</div>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-8">
					<NavItems />
					<SignedOut>
						<SignInButton>
							<button className="btn-signin">Sign In</button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden flex items-center gap-4">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<button
						onClick={toggleMenu}
						className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
						aria-label="Toggle menu"
					>
						{isMenuOpen ? (
							<RiXrpLine className="w-6 h-6" />
						) : (
							<RiMenu3Line className="w-6 h-6" />
						)}
					</button>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
					<div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white dark:bg-gray-900 shadow-2xl">
						{/* Mobile Menu Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
							<Link href="/" onClick={closeMenu}>
								<div className="flex items-center gap-2.5 cursor-pointer">
									<Image
										src="/images/logo.png"
										alt="logo"
										width={90}
										height={45}
										className="rounded"
									/>
								</div>
							</Link>
							<button
								onClick={closeMenu}
								className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
								aria-label="Close menu"
							>
								<RiXrpLine className="w-6 h-6" />
							</button>
						</div>

						{/* Mobile Menu Content */}
						<div className="p-6 space-y-6">
							<div className="space-y-4">
								<NavItems onItemClick={closeMenu} />
							</div>

							<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
								<SignedOut>
									<SignInButton>
										<button className="btn-signin w-full" onClick={closeMenu}>
											Sign In
										</button>
									</SignInButton>
								</SignedOut>
								<SignedIn>
									<div className="flex items-center gap-2 px-1.5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800">
										<UserButton />
										<span className="text-sm text-gray-600 dark:text-gray-400">
											Account Settings
										</span>
									</div>
								</SignedIn>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Navbar
