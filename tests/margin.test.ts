import { describe, test, expect } from "bun:test"
import { getMargin } from "../functions/margin"

describe("getMargin", () => {
	test("should return empty string when format does not contain until string", () => {
		const format = "Hello world"
		const result = getMargin(format, {}, "{{missing}}")

		expect(result).toBe("")
	})

	test("should return correct margin for basic format", () => {
		const format = "  > {{option}}"
		const result = getMargin(format, {}, "{{option}}")

		expect(result).toBe("    ") // 4 spaces (length of "  > ")
	})

	test("should handle ANSI escape sequences correctly", () => {
		const format = "\x1b[1m>\x1b[0m \x1b[4m{{option}}\x1b[0m"
		const result = getMargin(format, {}, "{{option}}")

		expect(result).toBe("  ") // 2 spaces ("> " after stripping ANSI)
	})

	test("should replace placeholders before calculating margin", () => {
		const format = "PREFIX {{placeholder}} {{target}}"
		const toReplace = { "{{placeholder}}": "REPLACED" }
		const result = getMargin(format, toReplace, "{{target}}")

		expect(result).toBe("                ") // 16 spaces for "PREFIX REPLACED "
	})

	test("should handle empty format", () => {
		const format = ""
		const result = getMargin(format, {}, "{{option}}")

		expect(result).toBe("")
	})

	test("should handle multiple replacements", () => {
		const format = "{{a}} {{b}} {{target}}"
		const toReplace = { "{{a}}": "A", "{{b}}": "B" }
		const result = getMargin(format, toReplace, "{{target}}")

		expect(result).toBe("    ") // 4 spaces for "A B "
	})
})
