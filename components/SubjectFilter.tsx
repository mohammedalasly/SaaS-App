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
	const currentSubject = searchParams.get("subject") || "all"

	const [subject, setSubject] = useState(currentSubject)

	// Sync state with URL params only when URL changes
	useEffect(() => {
		setSubject(currentSubject)
	}, [currentSubject])

	// Handle subject change - only navigate when value actually changes
	const handleSubjectChange = (newSubject: string) => {
		// Prevent navigation if the value hasn't changed
		if (newSubject === currentSubject) return

		setSubject(newSubject)

		let newUrl = ""
		if (newSubject === "all") {
			newUrl = removeKeysFromUrlQuery({
				params: searchParams.toString(),
				keysToRemove: ["subject"],
			})
		} else {
			newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "subject",
				value: newSubject,
			})
		}
		router.push(newUrl, { scroll: false })
	}

	return (
		<Select onValueChange={handleSubjectChange} value={subject}>
			<SelectTrigger className="input capitalize border-2">
				<SelectValue placeholder="Subject" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All subjects</SelectItem>
				{subjects.map((subject) => (
					<SelectItem key={subject} value={subject}>
						{subject}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default SubjectFilter
