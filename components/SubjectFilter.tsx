"use client"
import React, { useEffect, useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import { subjects } from "@/constants"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
// Utility functions to handle URL query manipulation
function formUrlQuery({
	params,
	key,
	value,
}: {
	params: string
	key: string
	value: string
}) {
	const url = new URLSearchParams(params)
	url.set(key, value)
	return `?${url.toString()}`
}

function removeKeysFromUrlQuery({
	params,
	keysToRemove,
}: {
	params: string
	keysToRemove: string[]
}) {
	const url = new URLSearchParams(params)
	keysToRemove.forEach((key) => url.delete(key))
	return `?${url.toString()}`
}

const SubjectFilter = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const query = searchParams.get("subject") || ""

	const [subject, setSubject] = useState(query)

	useEffect(() => {
		let newUrl = ""
		if (subject === "all") {
			newUrl = removeKeysFromUrlQuery({
				params: searchParams.toString(),
				keysToRemove: ["subject"],
			})
		} else {
			newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "subject",
				value: subject,
			})
		}
		router.push(newUrl, { scroll: false })
	}, [subject, router, searchParams])

	return (
		<Select onValueChange={setSubject} value={subject}>
			<SelectTrigger className="input capitalize border-2">
				<SelectValue placeholder="Subject" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All subjects</SelectItem>
				{subjects.map((subject) => (
					<SelectItem key={subject} value={subject} className="capitalize">
						{subject}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default SubjectFilter
