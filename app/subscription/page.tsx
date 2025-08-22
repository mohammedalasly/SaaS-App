import { PricingTable } from "@clerk/nextjs"
import HeroSection from "@/components/HeroSection"

const Subscription = () => {
	return (
		<>
			<HeroSection title="Pricing Plans and Subscriptions" />
			<section className="max-w-7xl mx-auto py-20 px-2">
				<div className="flex justify-center items-center">
					<PricingTable />
				</div>
			</section>
		</>
	)
}

export default Subscription
