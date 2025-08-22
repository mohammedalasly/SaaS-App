"use client"

import { removeBookmark, addBookmark } from "@/lib/actions/companion.actions"
import Link from "next/link"
import {
	BsBookmarkCheckFill,
	BsBookmarkPlus,
	BsClock,
	BsExclamationCircleFill,
} from "react-icons/bs"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

interface CompanionCardProps {
	id: string
	name: string
	topic: string
	subject: string
	duration: number
	color: string
	bookmarked: boolean
}

const CompanionCard: React.FC<CompanionCardProps> = ({
	id,
	name,
	topic,
	subject,
	duration,
	color,
	bookmarked: initialBookmarked,
}) => {
	const pathname = usePathname()
	const [bookmarked, setBookmarked] = useState(initialBookmarked)
	const [popupVisible, setPopupVisible] = useState(false)
	const { isSignedIn } = useUser()

	const handleBookmark = async () => {
		if (!isSignedIn) {
			setPopupVisible(true)
			setTimeout(() => setPopupVisible(false), 2500)
			return
		}

		try {
			if (bookmarked) {
				await removeBookmark(id, pathname)
				setBookmarked(false)
			} else {
				await addBookmark(id, pathname)
				setBookmarked(true)
			}
		} catch (error) {
			console.error("Failed to update bookmark", error)
		}
	}

	return (
		<article
			className="companion-card relative"
			style={{ backgroundColor: color }}
		>
			<div className="flex justify-between items-center">
				<div className="subject-badge">{subject}</div>

				{/* Bookmark Button Always Visible */}
				<div className="relative">
					<button
						className="companion-bookmark bg-transparent"
						onClick={handleBookmark}
					>
						{bookmarked ? (
							<BsBookmarkCheckFill size={28} />
						) : (
							<BsBookmarkPlus size={28} />
						)}
					</button>

					{/* Popup message */}
					{popupVisible && (
						<div
							className="absolute -top-8 right-0 
							bg-gradient-to-r from-[#8f87f1] to-[#5170ff] 
							text-white text-base w-60 px-3 py-2 rounded shadow-md 
							opacity-100 transition-opacity duration-300
							flex items-start gap-1.5"
						>
							<BsExclamationCircleFill
								size={30}
								className="-mt-1.5 fill-[#5de6f0]"
							/>

							<span className="leading-tight">
								Please sign in to save a companion
							</span>
						</div>
					)}
				</div>
			</div>

			<h2 className="text-2xl font-bold">{name}</h2>
			<p className="text-sm">{topic}</p>
			<div className="flex items-center gap-1.5">
				<BsClock />
				<p className="text-sm">{duration} minutes</p>
			</div>

			<Link href={`/companions/${id}`} className="w-full">
				<button className="btn-primary w-full justify-center">
					Launch Lesson
				</button>
			</Link>
		</article>
	)
}

export default CompanionCard
