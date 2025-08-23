"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { BsSearch } from "react-icons/bs"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"

const SearchInput = () => {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentTopic = searchParams.get("topic") || ""

	const [searchQuery, setSearchQuery] = useState(currentTopic)
	const previousQueryRef = useRef(currentTopic)

	// Sync state with URL params only when URL changes
	useEffect(() => {
		if (currentTopic !== previousQueryRef.current) {
			setSearchQuery(currentTopic)
			previousQueryRef.current = currentTopic
		}
	}, [currentTopic])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Prevent navigation if the query hasn't actually changed
			if (searchQuery === currentTopic) return

			if (searchQuery.trim()) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "topic",
					value: searchQuery.trim(),
				})
				router.push(newUrl, { scroll: false })
			} else {
				if (pathname === "/companions") {
					const newUrl = removeKeysFromUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ["topic"],
					})
					router.push(newUrl, { scroll: false })
				}
			}
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [searchQuery, router, searchParams, pathname, currentTopic])

	return (
		<div
			className="relative border-2 border-black rounded-lg items-center 
		flex gap-2 px-2 py-1"
		>
			<BsSearch size={20} />
			<input
				placeholder="Search companions..."
				className="outline-none"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
	)
}

export default SearchInput
