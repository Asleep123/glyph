import type { Answer } from "./Answer"
import { Listener } from "./Listener"
import { Question } from "./Question"
import { Colors, Styles } from "../functions/formatting"
import type { View } from "./View"
import type readline from "node:readline"

export class Text extends Question {
	format: string
	text: Answer
	private listener?: Listener
	private showCursor = true
	private cursorIntervalId?: NodeJS.Timeout

	constructor(view: View, question: string, format?: string, text?: Answer) {
		super(question, () => {}, view)
		this.startCallback = this.start
		this.format =
			format ??
			`${Styles.Bold}>${Colors.Reset} ${Colors.GrayLight}{{text}}${Colors.Reset}`
		this.text = text ?? { value: "" }
		this.listener = undefined
		this.cursorIntervalId = undefined
	}

	private startCursor() {
		this.cursorIntervalId = setInterval(() => {
			this.showCursor = !this.showCursor
			this.view.updateQuestionOutput(this.renderQuestion())
		}, 500)
	}

	protected renderQuestion(): string {
		const formattedQuestion = this.questionFormat.replace(
			"{{question}}",
			this.question
		)
		const formattedText = this.format.replace("{{text}}", this.text.value)
		const rendered = `${formattedQuestion}\n${formattedText}${this.showCursor ? "|" : " "}`
		return rendered
	}

	protected processKeypress(key: readline.Key) {
		if (key.name === "return") {
			this.showCursor = false
			clearInterval(this.cursorIntervalId)
			this.view.updateQuestionOutput(this.renderQuestion())
			this.listener!.close()
			this.view.finalizeCurrentQuestion()
		} else if (key.name === "backspace") {
			this.text.value = this.text.value.slice(0, -1)
			this.view.updateQuestionOutput(this.renderQuestion())
		} else {
			this.text.value = `${this.text.value}${key.sequence}`
			this.view.updateQuestionOutput(this.renderQuestion())
		}
	}

	start() {
		this.view.updateQuestionOutput(this.renderQuestion())
		this.listener = new Listener(this.processKeypress.bind(this))
		this.startCursor()
	}

	getAnswer(): Answer {
		return this.text
	}
}
