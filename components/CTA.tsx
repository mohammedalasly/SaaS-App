import Image from "next/image"
import Link from "next/link"
import { BsPlus } from "react-icons/bs"


const Cta = () => {
	return (
		<section className="cta-section shadow-lg shadow-gray-300">
			<div className="cta-badge">Start learning your way.</div>
			<h2 className="text-3xl font-bold">
				Build and Personalize Learning Companion
			</h2>
			<p>
				Pick a name, subject, voice, & personality — and start learning through
				voice conversations that feel natural and fun.
			</p>
			<Image src="/images/cta.png" alt="cta" width={362} height={232} className="rounded-lg" />
			<button className="btn-primary">
				<BsPlus size={26} />
				<Link href="/companions/new">
					<p>Build a New Companion</p>
				</Link>
			</button>
		</section>
	)
}
export default Cta
