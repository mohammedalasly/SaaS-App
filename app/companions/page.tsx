import { attachBookmarkStatusToCompanions } from "@/lib/actions/companion.bookmark"
import { currentUser } from "@clerk/nextjs/server"
import { getAllCompanions } from "@/lib/actions/companion.actions"
import CompanionCard from "@/components/CompanionCard"
import { getSubjectColor } from "@/lib/utils"
import SearchInput from "@/components/SearchInput"
import SubjectFilter from "@/components/SubjectFilter"

const CompanionsLibraryPage = async ({ searchParams }: SearchParams) => {
	const appliedFilters = (await searchParams) ?? {}
	const selectedSubject = appliedFilters.subject ?? ""
	const searchTopic = appliedFilters.topic ?? ""

	const authenticatedUser = await currentUser()
	const companionsList = await getAllCompanions({
		subject: selectedSubject,
		topic: searchTopic,
	})
	const companionsWithBookmarkStatus = await attachBookmarkStatusToCompanions(
		companionsList,
		authenticatedUser?.id ?? null
	)

	return (
		<main>
			<section className="flex justify-between gap-4 max-sm:flex-col">
				<h1>Companion Library</h1>
				<div className="flex gap-4">
					<SearchInput />
					<SubjectFilter />
				</div>
			</section>

			<section className="companions-grid">
				{companionsWithBookmarkStatus.map((companion) => (
					<CompanionCard
						key={companion.id}
						{...companion}
						color={getSubjectColor(companion.subject)}
					/>
				))}
			</section>
		</main>
	)
}

export default CompanionsLibraryPage
