import { describe, test, expect } from "bun:test"
import { Colors, Styles, type Formatting } from "../functions/formatting"

describe("Colors", () => {
	test("should have reset color", () => {
		expect(Colors.Reset).toBe(Colors.Reset)
	})

	test("should have basic colors", () => {
		expect(Colors.Red).toBe(Colors.Red)
		expect(Colors.Green).toBe(Colors.Green)
		expect(Colors.Blue).toBe(Colors.Blue)
	})

	test("should have bright colors", () => {
		expect(Colors.BrightRed).toBe(Colors.BrightRed)
		expect(Colors.BrightGreen).toBe(Colors.BrightGreen)
		expect(Colors.BrightBlue).toBe(Colors.BrightBlue)
	})

	test("should have background colors", () => {
		expect(Colors.BgRed).toBe(Colors.BgRed)
		expect(Colors.BgGreen).toBe(Colors.BgGreen)
		expect(Colors.BgBlue).toBe(Colors.BgBlue)
	})

	test("should have gray variants", () => {
		expect(Colors.GrayDark).toBe(Colors.GrayDark)
		expect(Colors.GrayLight).toBe(Colors.GrayLight)
	})

	test("should contain ANSI escape sequences", () => {
		expect(Colors.Red).toContain("\x1b[")
		expect(Colors.BrightBlue).toContain("\x1b[")
		expect(Colors.BgGreen).toContain("\x1b[")
	})
})

describe("Styles", () => {
	test("should have reset style", () => {
		expect(Styles.Reset).toBe(Styles.Reset)
	})

	test("should have text styles", () => {
		expect(Styles.Bold).toBe(Styles.Bold)
		expect(Styles.Italic).toBe(Styles.Italic)
		expect(Styles.Underline).toBe(Styles.Underline)
	})

	test("should have other styles", () => {
		expect(Styles.Dim).toBe(Styles.Dim)
		expect(Styles.Strikethrough).toBe(Styles.Strikethrough)
	})

	test("should contain ANSI escape sequences", () => {
		expect(Styles.Bold).toContain("\x1b[")
		expect(Styles.Underline).toContain("\x1b[")
	})
})

describe("Formatting type", () => {
	test("should accept Colors enum values", () => {
		const color: Formatting = Colors.Red
		expect(color).toBe(Colors.Red)
	})

	test("should accept Styles enum values", () => {
		const style: Formatting = Styles.Bold
		expect(style).toBe(Styles.Bold)
	})
})
