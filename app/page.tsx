import { attachBookmarkStatusToCompanions } from "@/lib/actions/companion.bookmark"
import { currentUser } from "@clerk/nextjs/server"
import {
	getAllCompanions,
	getRecentSessions,
} from "@/lib/actions/companion.actions"
import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/CTA"
import { getSubjectColor } from "@/lib/utils"
import HeroSection from "@/components/HeroSection"

const HomePage = async () => {
	const authenticatedUser = await currentUser()
	const popularCompanions = await getAllCompanions({ limit: 3 })
	const popularCompanionsWithBookmarks = await attachBookmarkStatusToCompanions(
		popularCompanions,
		authenticatedUser?.id ?? null
	)

	const recentlyCompletedSessions = (await getRecentSessions(10)) || []

	return (
		<>
			<HeroSection
				title="Teaching Platform"
				highlight="Trenavo AI"
				subtitle="Level up your learning."
				description="Browse through many of study companions tailored to your subjects and needs."
			/>
			<main className="pt-20">
				<h1>Popular Companions</h1>

				<section className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
					{popularCompanionsWithBookmarks.map((companion) => (
						<CompanionCard
							key={companion.id}
							{...companion}
							color={getSubjectColor(companion.subject)}
						/>
					))}
				</section>

				<section className="home-section">
					<CompanionsList
						title="Recently Completed Sessions"
						companions={recentlyCompletedSessions}
						classNames="w-2/3 max-lg:w-full"
					/>
					<CTA />
				</section>
			</main>
		</>
	)
}

export default HomePage
