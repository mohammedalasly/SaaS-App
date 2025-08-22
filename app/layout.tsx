import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const bricolage = Bricolage_Grotesque({
	variable: "--font-bricolage",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Trenavo",
	description: "Real-time AI Teaching Platform",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${bricolage.variable} antialiased`}>
				<ClerkProvider appearance={{ variables: { colorPrimary: "#19af86" } }}>
					<Navbar />
					<div className="min-h-screen">{children}</div>
				</ClerkProvider>
				<div>
					<Footer />
				</div>
			</body>
		</html>
	)
}
