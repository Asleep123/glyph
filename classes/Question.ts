import type { Answer } from "./Answer"
import { Colors, Styles } from "../functions/formatting"
import type readline from "node:readline"
import type { View } from "./View"

export abstract class Question {
	question: string
	questionFormat: string
	startCallback: () => void
	protected view: View

	constructor(
		question: string,
		startCallback: () => void,
		view: View,
		questionFormat?: string
	) {
		this.question = question
		this.questionFormat =
			questionFormat ??
			`\n${Colors.BrightWhite}${Styles.Bold}{{question}}${Colors.Reset}`
		this.startCallback = startCallback
		this.view = view
	}

	abstract start(): void

	abstract getAnswer(): Answer

	protected abstract renderQuestion(): string

	protected abstract processKeypress(key: readline.Key): void
}
