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

const HomePage = async () => {
	const authenticatedUser = await currentUser()
	const popularCompanions = await getAllCompanions({ limit: 3 })
	const popularCompanionsWithBookmarks = await attachBookmarkStatusToCompanions(
		popularCompanions,
		authenticatedUser?.id ?? null
	)

	const recentlyCompletedSessions = (await getRecentSessions(10)) || []

	return (
		<main>
			<h1>Popular Companions</h1>

			<section className="home-section">
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
	)
}

export default HomePage
