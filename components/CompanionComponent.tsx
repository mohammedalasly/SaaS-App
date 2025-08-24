"use client"

import { useEffect, useRef, useState } from "react"
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk"
import Image from "next/image"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import soundwaves from "@/constants/soundwaves.json"
import { addToSessionHistory } from "@/lib/actions/companion.actions"
import { BsMicFill, BsMicMuteFill } from "react-icons/bs"

enum CallStatus {
	INACTIVE = "INACTIVE",
	CONNECTING = "CONNECTING",
	ACTIVE = "ACTIVE",
	FINISHED = "FINISHED",
}

const CompanionComponent = ({
	companionId,
	subject,
	topic,
	name,
	userName,
	userImage,
	style,
	voice,
}: CompanionComponentProps) => {
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const [messages, setMessages] = useState<SavedMessage[]>([])

	const lottieRef = useRef<LottieRefCurrentProps>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// auto scroll to bottom on new message
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	useEffect(() => {
		if (lottieRef) {
			if (isSpeaking) {
				lottieRef.current?.play()
			} else {
				lottieRef.current?.stop()
			}
		}
	}, [isSpeaking, lottieRef])

	useEffect(() => {
		const onCallStart = () => setCallStatus(CallStatus.ACTIVE)

		const onCallEnd = () => {
			setCallStatus(CallStatus.FINISHED)
			addToSessionHistory(companionId)
		}

		const onMessage = (message: Message) => {
			if (message.type === "transcript" && message.transcriptType === "final") {
				const newMessage = { role: message.role, content: message.transcript }
				// append message instead of prepend
				setMessages((prev) => [...prev, newMessage])
			}
		}

		const onSpeechStart = () => setIsSpeaking(true)
		const onSpeechEnd = () => setIsSpeaking(false)

		const onError = (error: Error) => console.log("Error", error)

		vapi.on("call-start", onCallStart)
		vapi.on("call-end", onCallEnd)
		vapi.on("message", onMessage)
		vapi.on("error", onError)
		vapi.on("speech-start", onSpeechStart)
		vapi.on("speech-end", onSpeechEnd)

		return () => {
			vapi.off("call-start", onCallStart)
			vapi.off("call-end", onCallEnd)
			vapi.off("message", onMessage)
			vapi.off("error", onError)
			vapi.off("speech-start", onSpeechStart)
			vapi.off("speech-end", onSpeechEnd)
		}
	}, [companionId])

	const toggleMicrophone = () => {
		const isMuted = vapi.isMuted()
		vapi.setMuted(!isMuted)
		setIsMuted(!isMuted)
	}

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING)

		const assistantOverrides = {
			variableValues: { subject, topic, style },
			clientMessages: ["transcript"],
			serverMessages: [],
		}

		// @ts-expect-error mmm
		vapi.start(configureAssistant(voice, style), assistantOverrides)
	}

	const handleDisconnect = () => {
		setCallStatus(CallStatus.FINISHED)
		vapi.stop()
	}

	return (
		<section className="flex flex-col h-screen">
			<section className="flex gap-8 max-sm:flex-col pb-8">
				<div
					className="companion-section"
					style={{
						borderColor: getSubjectColor(subject),
					}}
				>
					<div
						className="companion-avatar"
						style={{ backgroundColor: getSubjectColor(subject) }}
					>
						<div
							className={cn(
								"absolute transition-opacity duration-1000",
								callStatus === CallStatus.FINISHED ||
									callStatus === CallStatus.INACTIVE
									? "opacity-1001"
									: "opacity-0",
								callStatus === CallStatus.CONNECTING &&
									"opacity-100 animate-pulse"
							)}
						>
							<Image
								src={`/icons/${subject}.svg`}
								alt={subject}
								width={150}
								height={150}
								className="max-sm:w-20"
							/>
						</div>

						<div
							className={cn(
								"absolute transition-opacity duration-1000",
								callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
							)}
						>
							<Lottie
								lottieRef={lottieRef}
								animationData={soundwaves}
								autoplay={false}
								className="companion-lottie"
							/>
						</div>
					</div>
					<p className="font-bold text-2xl">{name}</p>
				</div>

				<div className="user-section">
					<div className="user-avatar">
						<Image
							src={userImage}
							alt={userName}
							width={130}
							height={130}
							className="rounded-lg"
						/>
						<p className="font-bold text-2xl">{userName}</p>
					</div>
					<button
						className="btn-mic"
						onClick={toggleMicrophone}
						disabled={callStatus !== CallStatus.ACTIVE}
					>
						{isMuted ? <BsMicMuteFill size={28} /> : <BsMicFill size={28} />}

						<p className="max-sm:hidden">
							{isMuted ? "Turn on microphone" : "Turn off microphone"}
						</p>
					</button>
					<button
						className={cn(
							"rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
							callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
							callStatus === CallStatus.CONNECTING && "animate-pulse"
						)}
						onClick={
							callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
						}
					>
						{callStatus === CallStatus.ACTIVE
							? "End Session"
							: callStatus === CallStatus.CONNECTING
							? "Connecting"
							: "Start Session"}
					</button>
				</div>
			</section>

			{/* TRANSCRIPT */}
			<section className="transcript relative w-full h-full flex flex-col overflow-hidden border-1 border-gray-100 rounded-lg">
				<div className="transcript-message no-scrollbar flex flex-col gap-3 overflow-y-auto">
					{messages.map((message, index) =>
						message.role === "assistant" ? (
							<div
								key={index}
								className="flex items-center justify-center gap-1.5 w-auto self-start"
							>
								{/* Assistant Avatar */}
								<div className="w-8 h-8 flex-shrink-0">
									<Image
										src="/images/chatbot.png"
										alt="chatbot"
										width={32}
										height={32}
										className="rounded-full w-8 h-8 object-cover"
									/>
								</div>

								{/* Assistant Bubble */}
								<div
									className="rounded-md px-3 py-1.5 text-gray-900"
									style={{ backgroundColor: getSubjectColor(subject) }}
								>
									<span className="text-[1rem]">{message.content}</span>
								</div>
							</div>
						) : (
							<div
								key={index}
								className="flex items-start gap-2 w-auto self-end"
							>
								{/* User Bubble */}
								<div className="rounded-md bg-[#EBE5C2] px-3 py-1.5 text-gray-900 flex items-center justify-center">
									<span className="text-[1rem]">{message.content}</span>
								</div>

								{/* User Avatar */}
								<div className="rounded-full order-2 w-8 h-8 flex-shrink-0">
									<Image
										src={userImage}
										alt={userName}
										width={32}
										height={32}
										className="rounded-full"
									/>
								</div>
							</div>
						)
					)}
					{/* auto-scroll target */}
					<div ref={messagesEndRef} />
				</div>
			</section>
		</section>
	)
}

export default CompanionComponent
