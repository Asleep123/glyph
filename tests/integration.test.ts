import { describe, test, expect } from "bun:test"
import { Select } from "../classes/Select"
import { Text } from "../classes/Text"
import { View } from "../classes/View"
import { Option } from "../classes/Option"
import type { Answer } from "../classes/Answer"

describe("Integration Tests", () => {
	test("should create a complete form workflow", () => {
		const answers: Answer[] = []
		const callback = (formAnswers: Answer[]) => {
			answers.push(...formAnswers)
		}

		const view = new View(callback)

		// Create options for select question
		const fruitOptions = [
			new Option({ name: "Apple", value: "apple" }),
			new Option({ name: "Banana", value: "banana" }),
			new Option({ name: "Orange", value: "orange" })
		]

		// Create questions
		const fruitQuestion = new Select(
			view,
			"What is your favorite fruit?",
			fruitOptions
		)
		const nameQuestion = new Text(view, "What is your name?")

		// Add questions to view
		view.addQuestion(fruitQuestion)
		view.addQuestion(nameQuestion)

		// Verify questions are added
		expect(view.questions).toHaveLength(2)
		expect(view.questions[0]).toBe(fruitQuestion)
		expect(view.questions[1]).toBe(nameQuestion)

		// Verify initial state
		expect(fruitQuestion.getAnswer().value).toBe("apple") // Default first option
		expect(nameQuestion.getAnswer().value).toBe("") // Default empty text
	})

	test("should handle custom formatting", () => {
		const callback = (_answers: Answer[]) => {}
		const view = new View(callback)

		const options = [new Option({ name: "Test", value: "test" })]
		const select = new Select(
			view,
			"Question?",
			options,
			"SELECTED: {{option}}",
			"UNSELECTED: {{option}}"
		)

		const text = new Text(view, "Name?", "INPUT: {{text}}")

		expect(select.selectedFormat).toBe("SELECTED: {{option}}")
		expect(select.unselectedFormat).toBe("UNSELECTED: {{option}}")
		expect(text.format).toBe("INPUT: {{text}}")
	})

	test("should export all public classes and functions", () => {
		// Test that all main exports are available
		expect(Select).toBeDefined()
		expect(Text).toBeDefined()
		expect(View).toBeDefined()
		expect(Option).toBeDefined()
	})
})
