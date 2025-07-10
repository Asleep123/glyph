import { describe, test, expect, beforeEach } from "bun:test"
import { Select } from "../classes/Select.js"
import { Option } from "../classes/Option.js"
import { View } from "../classes/View.js"
import { GlyphError } from "../classes/GlyphError.js"
import type { Answer } from "../classes/Answer.js"

describe("Select", () => {
	let view: View
	let options: Option[]
	let mockCallback: (answers: Answer[]) => void

	beforeEach(() => {
		mockCallback = () => {}
		view = new View(mockCallback)
		options = [
			new Option({ name: "Apple", value: "apple" }),
			new Option({ name: "Banana", value: "banana" }),
			new Option({ name: "Orange", value: "orange" })
		]
	})

	test("should create a Select instance with valid options", () => {
		const select = new Select(view, "What is your favorite fruit?", options)

		expect(select.question).toBe("What is your favorite fruit?")
		expect(select.options).toEqual(options)
		expect(select.selected).toBe(options[0]!)
	})

	test("should throw error if no options provided", () => {
		expect(() => {
			new Select(view, "Question?", [])
		}).toThrow(GlyphError)
	})

	test("should throw error if selected option is not in options array", () => {
		const invalidOption = new Option({ name: "Grape", value: "grape" })

		expect(() => {
			new Select(
				view,
				"Question?",
				options,
				undefined,
				undefined,
				undefined,
				invalidOption
			)
		}).toThrow(GlyphError)
	})

	test("should set custom selected option if valid", () => {
		const customSelected = options[1]!
		const select = new Select(
			view,
			"Question?",
			options,
			undefined,
			undefined,
			undefined,
			customSelected
		)

		expect(select.selected).toBe(customSelected)
	})

	test("should render question with options", () => {
		const select = new Select(view, "What is your favorite fruit?", options)
		// biome-ignore lint/suspicious/noExplicitAny: Testing protected method
		const rendered = (select as any).renderQuestion()

		expect(rendered).toContain("What is your favorite fruit?")
		expect(rendered).toContain("Apple")
		expect(rendered).toContain("Banana")
		expect(rendered).toContain("Orange")
	})

	test("should return selected option as answer", () => {
		const select = new Select(view, "Question?", options)
		const answer = select.getAnswer()

		expect(answer).toBe(options[0]!)
		expect(answer.value).toBe("apple")
	})

	test("should use custom formats when provided", () => {
		const selectedFormat = "SELECTED: {{option}}"
		const unselectedFormat = "UNSELECTED: {{option}}"

		const select = new Select(
			view,
			"Question?",
			options,
			selectedFormat,
			unselectedFormat
		)

		expect(select.selectedFormat).toBe(selectedFormat)
		expect(select.unselectedFormat).toBe(unselectedFormat)
	})
})
