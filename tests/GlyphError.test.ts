import { describe, test, expect } from "bun:test"
import { GlyphError } from "../classes/GlyphError.js"

describe("GlyphError", () => {
	test("should extend Error class", () => {
		const error = new GlyphError("Test error message")

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(GlyphError)
	})

	test("should have correct error message", () => {
		const message = "This is a test error"
		const error = new GlyphError(message)

		expect(error.message).toBe(message)
	})

	test("should be throwable", () => {
		expect(() => {
			throw new GlyphError("Test error")
		}).toThrow(GlyphError)

		expect(() => {
			throw new GlyphError("Test error")
		}).toThrow("Test error")
	})
})
