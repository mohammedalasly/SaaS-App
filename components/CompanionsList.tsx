import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { BsClock } from "react-icons/bs"


interface CompanionsListProps {
	title: string
	companions?: Companion[]
	classNames?: string
}

const CompanionsList = ({
	title,
	companions,
	classNames,
}: CompanionsListProps) => {
	return (
		<article className={cn("companion-list", classNames)}>
			<h2 className="font-bold text-2xl pb-5">{title}</h2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-lg w-2/4">Lessons</TableHead>
						<TableHead className="text-lg">Subject</TableHead>
						<TableHead className="text-lg text-right">Duration</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{companions?.map(({ id, subject, name, topic, duration }, index) => (
						<TableRow key={`${id}-${index}`}>
							<TableCell>
								<Link href={`/companions/${id}`}>
									<div className="flex items-center gap-2">
										<div
											className="size-[80px] flex items-center justify-center rounded-lg max-md:hidden"
											style={{ backgroundColor: getSubjectColor(subject) }}
										>
											<Image
												src={`/icons/${subject}.svg`}
												alt={subject}
												width={60}
												height={60}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<p className="font-bold md:text-xl text-lg">{name}</p>
											<p className="text-sm md:text-lg">{topic}</p>
										</div>
									</div>
								</Link>
							</TableCell>
							<TableCell>
								<div className="subject-badge w-fit max-md:hidden text-[12]">
									{subject}
								</div>
								<div
									className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
									style={{ backgroundColor: getSubjectColor(subject) }}
								>
									<Image
										src={`/icons/${subject}.svg`}
										alt={subject}
										width={18}
										height={18}
									/>
								</div>
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-1 w-full justify-end">
									<p className="text-base">
										{duration} <span className="max-md:hidden">mins</span>
									</p>
									<BsClock className="text-sm" />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</article>
	)
}

export default CompanionsList
