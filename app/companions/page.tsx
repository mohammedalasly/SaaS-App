import { attachBookmarkStatusToCompanions } from "@/lib/actions/companion.bookmark"
import { currentUser } from "@clerk/nextjs/server"
import { getAllCompanions } from "@/lib/actions/companion.actions"
import CompanionCard from "@/components/CompanionCard"
import HeroSection from "@/components/HeroSection"
import { getSubjectColor } from "@/lib/utils"
import SearchInput from "@/components/SearchInput"
import SubjectFilter from "@/components/SubjectFilter"
import Image from "next/image"

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

	const noResultsMessage =
		selectedSubject && searchTopic
			? `No companions found for "${searchTopic}" in ${selectedSubject}`
			: selectedSubject
			? `No companions found in ${selectedSubject}`
			: searchTopic
			? `No companions found for "${searchTopic}"`
			: "No companions available at the moment"

	return (
		<>
			<HeroSection title="Welcome to the Companion Library" />
			<main className="pb-40 py-20">
				<section className="flex items-center justify-between gap-4 max-sm:flex-col">
					<h1 className="text-3xl max-md:text-2xl">Companion Library</h1>
					<span className="flex items-center justify-between gap-4 max-sm:flex-col">
						<SearchInput />
						<SubjectFilter />
					</span>
				</section>

				{companionsWithBookmarkStatus.length > 0 ? (
					<section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
						{companionsWithBookmarkStatus.map((companion) => (
							<CompanionCard
								key={companion.id}
								{...companion}
								color={getSubjectColor(companion.subject)}
							/>
						))}
					</section>
				) : (
					<div className="flex flex-col items-center justify-center pt-20 gap-4">
						<Image
							src="/icons/hot-air-balloon.svg"
							alt="No companions found"
							width={100}
							height={100}
							className="bg-[#5fd9f7] rounded-full"
						/>
						<h2 className="text-xl max-sm:text-lg text-center font-semibold text-[#2b3055]">
							{noResultsMessage}
						</h2>
					</div>
				)}
			</main>
		</>
	)
}

export default CompanionsLibraryPage
