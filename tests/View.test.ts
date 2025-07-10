import { describe, test, expect } from "bun:test"
import { View } from "../classes/View.js"
import { Select } from "../classes/Select.js"
import { Text } from "../classes/Text.js"
import { Option } from "../classes/Option.js"
import { GlyphError } from "../classes/GlyphError.js"
import type { Answer } from "../classes/Answer.js"

describe("View", () => {
	test("should create a View instance", () => {
		const callback = (_answers: Answer[]) => {}
		const view = new View(callback)

		expect(view.questions).toEqual([])
		expect(view.answers).toEqual([])
		expect(view.callback).toBe(callback)
	})

	test("should add questions to the view", () => {
		const callback = (_answers: Answer[]) => {}
		const view = new View(callback)
		const options = [new Option({ name: "Test", value: "test" })]
		const select = new Select(view, "Question?", options)

		view.addQuestion(select)

		expect(view.questions).toContain(select)
		expect(view.questions.length).toBe(1)
	})

	test("should set questions array", () => {
		const callback = (_answers: Answer[]) => {}
		const view = new View(callback)
		const options = [new Option({ name: "Test", value: "test" })]
		const questions = [
			new Select(view, "Question 1?", options),
			new Text(view, "Question 2?")
		]

		view.setQuestions(questions)

		expect(view.questions).toEqual(questions)
	})

	test("should throw error when starting without current question", () => {
		const callback = (_answers: Answer[]) => {}
		const view = new View(callback)

		expect(() => {
			view.start()
		}).toThrow(GlyphError)
	})

	test("should set current question when adding first question", () => {
		const callback = (_answers: Answer[]) => {}
		const view = new View(callback)
		const options = [new Option({ name: "Test", value: "test" })]
		const select = new Select(view, "Question?", options)

		view.addQuestion(select)

		// biome-ignore lint/suspicious/noExplicitAny: Testing private property
		expect((view as any).currentQuestion).toBe(select)
	})
})
