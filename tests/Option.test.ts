import { describe, test, expect } from "bun:test"
import { Option } from "../classes/Option"

describe("Option", () => {
	test("should create an Option instance", () => {
		const option = new Option({ name: "Apple", value: "apple" })

		expect(option.name).toBe("Apple")
		expect(option.value).toBe("apple")
	})

	test("should extend Answer class", () => {
		const option = new Option({ name: "Test", value: "test-value" })

		expect(option.value).toBe("test-value")
		expect(typeof option.value).toBe("string")
	})
})
