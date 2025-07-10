import { describe, test, expect, beforeEach } from "bun:test"
import { Text } from "../classes/Text"
import { View } from "../classes/View"
import type { Answer } from "../classes/Answer"

describe("Text", () => {
	let view: View
	let mockCallback: (answers: Answer[]) => void

	beforeEach(() => {
		mockCallback = () => {}
		view = new View(mockCallback)
	})

	test("should create a Text instance", () => {
		const text = new Text(view, "What is your name?")

		expect(text.question).toBe("What is your name?")
		expect(text.text.value).toBe("")
	})

	test("should create Text instance with custom format and initial text", () => {
		const customFormat = "Input: {{text}}"
		const initialText = { value: "John" }

		const text = new Text(view, "Name?", customFormat, initialText)

		expect(text.format).toBe(customFormat)
		expect(text.text.value).toBe("John")
	})

	test("should render question with text input", () => {
		const text = new Text(view, "What is your name?")
		// biome-ignore lint/suspicious/noExplicitAny: Testing protected method
		const rendered = (text as any).renderQuestion()

		expect(rendered).toContain("What is your name?")
		expect(rendered).toContain(">")
	})

	test("should return text as answer", () => {
		const text = new Text(view, "Question?")
		text.text.value = "Test Answer"

		const answer = text.getAnswer()

		expect(answer.value).toBe("Test Answer")
	})

	test("should use default format when none provided", () => {
		const text = new Text(view, "Question?")

		expect(text.format).toContain("{{text}}")
		expect(text.format).toContain(">")
	})
})
