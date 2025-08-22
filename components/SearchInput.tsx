"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"

const SearchInput = () => {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const [searchQuery, setSearchQuery] = useState("")

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchQuery) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "topic",
					value: searchQuery,
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
	}, [searchQuery, router, searchParams, pathname])

	return (
		<div className="relative border-2 border-black rounded-lg items-center 
		flex gap-2 px-2 py-1 ">
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
