import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {
	getUserCompanions,
	getUserSessions,
	getBookmarkedCompanions,
} from "@/lib/actions/companion.actions"
import Image from "next/image"
import CompanionsList from "@/components/CompanionsList"
import HeroSection from "@/components/HeroSection"
import { FaCheckCircle } from "react-icons/fa"
import { FaFolderOpen } from "react-icons/fa"

const Profile = async () => {
	const user = await currentUser()

	if (!user) redirect("/sign-in")

	const companions = await getUserCompanions(user.id)
	const sessionHistory = await getUserSessions(user.id)
	const bookmarkedCompanions = await getBookmarkedCompanions(user.id)

	return (
		<>
			<HeroSection title="My Journey and Progress" />
			<main className="min-lg:w-3/4 pb-40 pt-20">
				<section
					className="flex justify-between gap-4 max-md:flex-col 
				items-center pb-10 border-b"
				>
					<div className="flex gap-2 items-center mx-2">
						<Image
							src={user.imageUrl}
							alt={user.firstName!}
							width={80}
							height={80}
							className="rounded-lg"
						/>
						<div className="flex flex-col gap-2">
							<h1 className="font-bold text-xl">
								{user.firstName} {user.lastName}
							</h1>
							<p className="text-sm text-muted-foreground">
								{user.emailAddresses[0].emailAddress}
							</p>
						</div>
					</div>
					<div className="flex gap-4 mx-1">
						<div className="bg-[#dbf4f3] rounded-lg p-3 gap-2 flex flex-col h-fit">
							<div className="flex gap-1.5 items-center">
								<FaCheckCircle size={26} className="fill-[#3e9c96]" />
								<p className="text-2xl font-medium">{sessionHistory.length}</p>
							</div>
							<div>
								<p className="text-[14px]">Lessons completed</p>
							</div>
						</div>
						<div className="bg-[#dbf4f3] rounded-lg p-3 gap-2 flex flex-col">
							<div className="flex gap-1.5 items-center">
								<FaFolderOpen size={26} className="fill-[#1591be]" />
								<p className="text-2xl font-medium">{companions.length}</p>
							</div>
							<div>
								<p className="text-[14px]">Companions created</p>
							</div>
						</div>
					</div>
				</section>
				<section className="mx-1">
					<Accordion type="multiple">
						<AccordionItem value="bookmarks">
							<AccordionTrigger className="text-lg md:text-2xl font-bold cursor-pointer items-center">
								<span className="flex items-center">
									Bookmarked Companions
									{bookmarkedCompanions.length > 0 && (
										<span
											className="text-gray-100 w-6 h-6 mx-1 flex items-center justify-center 
										rounded-full text-sm bg-[#408495]"
										>
											{bookmarkedCompanions.length}
										</span>
									)}
								</span>
							</AccordionTrigger>

							<AccordionContent>
								<CompanionsList
									companions={bookmarkedCompanions}
									title="Bookmarked Companions"
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="recent">
							<AccordionTrigger className="text-lg md:text-2xl font-bold cursor-pointer items-center">
								Recent Sessions
							</AccordionTrigger>
							<AccordionContent>
								<CompanionsList
									title="Recent Sessions"
									companions={sessionHistory}
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="companions">
							<AccordionTrigger className="text-lg md:text-2xl font-bold cursor-pointer items-center">
								<span className="flex items-center">
									My Companions
									{companions.length > 0 && (
										<span
											className="text-gray-100 w-6 h-6 mx-1 flex items-center justify-center 
										rounded-full text-sm bg-[#408495]"
										>
											{companions.length}
										</span>
									)}
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<CompanionsList title="My Companions" companions={companions} />
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>
			</main>
		</>
	)
}
export default Profile
