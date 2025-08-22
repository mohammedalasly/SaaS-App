import CompanionForm from "@/components/CompanionForm"
import HeroSection from "@/components/HeroSection"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { newCompanionPermissions } from "@/lib/actions/companion.actions"
import Image from "next/image"
import Link from "next/link"

const NewCompanion = async () => {
	const { userId } = await auth()
	if (!userId) redirect("/sign-in")

	const canCreateCompanion = await newCompanionPermissions()

	return (
		<>
			<HeroSection
				title="Build and Personalize Learning Companion"
			/>
			<main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center pb-20">
				{canCreateCompanion ? (
					<article className="w-full gap-4 flex flex-col py-20">
						<h1 className="pb-20">Companion Builder</h1>

						<CompanionForm />
					</article>
				) : (
					<article className="companion-limit">
						<div className="cta-badge">Upgrade your plan</div>
						<Image
							src="/images/cta.png"
							alt="Companion limit reached"
							width={360}
							height={230}
							className="rounded-lg"
						/>
						<h1>You’ve Reached Your Limit</h1>
						<p>
							You’ve reached your companion limit. Upgrade to create more
							companions and premium features.
						</p>
						<Link
							href="/subscription"
							className="btn-primary w-full justify-center"
						>
							Upgrade My Plan
						</Link>
					</article>
				)}
			</main>
		</>
	)
}

export default NewCompanion
