import { Colors, Styles } from "../functions/formatting"
import { getMargin } from "../functions/margin"
import type { Option } from "./Option"
import type readline from "node:readline"
import { Question } from "./Question"
import { Listener } from "./Listener"
import type { View } from "./View"
import { GlyphError } from "./GlyphError"

export class Select extends Question {
	options: Option[]
	selectedFormat: string
	unselectedFormat: string
	selected: Option
	private listener?: Listener

	constructor(
		view: View,
		question: string,
		options: Option[],
		selectedFormat?: string,
		unselectedFormat?: string,
		questionFormat?: string,
		selected?: Option
	) {
		if (options.length < 1)
			throw new GlyphError("You must specify at least one option.")
		super(question, () => {}, view, questionFormat)
		this.startCallback = this.start
		this.options = options
		this.selectedFormat =
			selectedFormat ??
			`${Styles.Bold}>${Colors.Reset} ${Styles.Underline}${Colors.GrayLighter}{{option}}${Colors.Reset}`
		this.unselectedFormat =
			unselectedFormat ?? `${Colors.GrayLight}{{option}}${Colors.Reset}`
		this.selected = selected ?? options[0]!
		this.listener = undefined
		if (selected && !options.includes(selected))
			throw new GlyphError(
				"The selected option must be present in the options array."
			)
	}

	protected renderQuestion() {
		const formattedQuestion = this.questionFormat.replace(
			"{{question}}",
			this.question
		)
		const selectedOption = this.selectedFormat.replace(
			"{{option}}",
			this.selected.name
		)
		const indexOfSelectedOption = this.options.indexOf(this.selected)
		let list = ""
		this.options.forEach((option) => {
			if (this.options.indexOf(option) === indexOfSelectedOption) {
				list = `${list}\n${selectedOption}`
				return
			}
			const margin = getMargin(this.selectedFormat, {}, "{{option}}")
			const formattedOption = this.unselectedFormat.replace(
				"{{option}}",
				option.name
			)
			list = `${list}\n${margin}${formattedOption}`
		})
		const rendered = `${formattedQuestion}${list}`
		return rendered
	}

	protected processKeypress(key: readline.Key) {
		if (key.name === "down") {
			const currentIndex = this.options.indexOf(this.selected)
			if (currentIndex === this.options.length - 1) {
				this.selected = this.options[0]!
			} else {
				this.selected = this.options[currentIndex + 1]!
			}
			this.view.updateQuestionOutput(this.renderQuestion())
		} else if (key.name === "up") {
			const currentIndex = this.options.indexOf(this.selected)
			if (currentIndex === 0) {
				this.selected = this.options[this.options.length - 1]!
			} else {
				this.selected = this.options[currentIndex - 1]!
			}
			this.view.updateQuestionOutput(this.renderQuestion())
		} else if (key.name === "return") {
			this.listener!.close()
			this.view.finalizeCurrentQuestion()
		}
	}

	start() {
		this.view.updateQuestionOutput(this.renderQuestion())
		this.listener = new Listener(this.processKeypress.bind(this))
	}

	getAnswer(): Option {
		return this.selected
	}
}
