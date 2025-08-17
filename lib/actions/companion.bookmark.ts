import { getBookmarkedCompanions } from "@/lib/actions/companion.actions"

export const attachBookmarkStatusToCompanions = async <
	T extends { id: string }
>(
	companionsList: T[],
	userId: string | null
): Promise<(T & { bookmarked: boolean })[]> => {
	if (!userId) {
		return companionsList.map((companion) => ({
			...companion,
			bookmarked: false,
		}))
	}

	const rawBookmarkedCompanions = await getBookmarkedCompanions(userId)
	const flattenedBookmarkedCompanions = rawBookmarkedCompanions.flat()

	return companionsList.map((companion) => ({
		...companion,
		bookmarked: flattenedBookmarkedCompanions.some(
			(bookmarkedCompanion) => bookmarkedCompanion.id === companion.id
		),
	}))
}
