import { GlyphError } from "./GlyphError"
import type { Answer } from "./Answer"
import type { Question } from "./Question"

export class View {
	private output: string
	private currentQuestionOutput: string
	private currentQuestion?: Question
	questions: Question[]
	answers: Answer[]
	callback: (_: Answer[]) => void

	constructor(callback: (_: Answer[]) => void) {
		this.output = ""
		this.questions = []
		this.currentQuestionOutput = ""
		this.currentQuestion = undefined
		this.callback = callback
		this.answers = []
	}

	updateQuestionOutput(text: string) {
		this.currentQuestionOutput = text
		console.clear()
		console.log(`${this.output}\n\n${this.currentQuestionOutput}`)
	}

	finalizeCurrentQuestion() {
		this.output = `${this.output}\n${this.currentQuestionOutput}`
		this.currentQuestionOutput = ""
		console.clear()
		console.log(this.output)
		this.answers.push(this.currentQuestion!.getAnswer())

		const currentIndex = this.questions.indexOf(this.currentQuestion!)
		if (currentIndex === this.questions.length - 1) {
			this.callback(this.answers)
		} else {
			this.advanceQuestion()
		}
	}

	setQuestions(questions: Question[]) {
		this.questions = questions
		if (!this.currentQuestion) this.setCurrentQuestion(questions[0]!)
	}

	addQuestion(question: Question) {
		this.questions.push(question)
		if (!this.currentQuestion) this.setCurrentQuestion(question)
	}

	setCurrentQuestion(question: Question) {
		if (!this.questions.includes(question)) this.questions.push(question)

		this.currentQuestion = question
		this.currentQuestionOutput = ""
	}

	start() {
		if (!this.currentQuestion)
			throw new GlyphError("No current question is selected.")
		this.currentQuestion.start()
	}

	advanceQuestion() {
		const currentIndex = this.questions.indexOf(this.currentQuestion!)

		if (currentIndex + 1 < this.questions.length) {
			this.setCurrentQuestion(this.questions[currentIndex + 1]!)
			this.start()
		}
	}
}
