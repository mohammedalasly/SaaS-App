import { PricingTable } from "@clerk/nextjs"
import HeroSection from "@/components/HeroSection"

const Subscription = () => {
	return (
		<>
			<HeroSection
				title="Pricing Plans and Subscriptions"
			/>
			<main className="min-h-screen pt-10 pb-20 px-2">
				<div className="flex justify-center items-center ">
					<PricingTable />
				</div>
			</main>
		</>
	)
}

export default Subscription
