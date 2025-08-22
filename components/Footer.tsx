import Link from "next/link"
import {
	BsHeartFill,
	BsInstagram,
	BsDiscord,
} from "react-icons/bs"
import { LuGithub } from "react-icons/lu"

import { FiLinkedin } from "react-icons/fi"



const Footer = () => {
	return (
		<footer className="navbar border-t py-5">
			<div className="mx-auto flex w-full flex-col items-center justify-between gap-6  md:flex-row">
				{/* Left: Logo */}
				<div className="flex items-center gap-2">
					<p className="text-sm text-center text-gray-600">
						&copy; {new Date().getFullYear()}.{" "}
						<span>
							Built with <BsHeartFill className="inline text-red-500" /> by
							Mohammad Alasli
						</span>
					</p>
				</div>

				{/* socials */}
				<div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
					<div className="flex gap-6 text-gray-600">
						<Link
							href="https://github.com/mohammedalasly/SaaS-App"
							target="_blank"
							aria-label="Github"
						>
							<LuGithub size={22} className="hover:text-[#7367f5]" />
						</Link>

						<Link
							href="https://www.linkedin.com/in/mohammedalasli/"
							target="_blank"
							aria-label="LinkedIn"
						>
							<FiLinkedin size={22} className="hover:text-[#7367f5]" />
						</Link>

						<Link
							href="https://www.instagram.com/mohammad_alasli/"
							target="_blank"
							aria-label="Instagram"
						>
							<BsInstagram size={22} className="hover:text-[#7367f5]" />
						</Link>

						<Link
							href="https://discord.com/users/1015208430358769686"
							target="_blank"
							aria-label="discord"
						>
							<BsDiscord size={22} className="hover:text-[#7367f5]" />
						</Link>
					</div>
				</div>

				{/* Right: policy links */}
				<div className="flex gap-6">
					<Link
						href="/#"
						className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
					>
						Privacy Policy
					</Link>
					<Link
						href="/#"
						className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
					>
						Terms & Conditions
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
