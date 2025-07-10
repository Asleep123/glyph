import { stripVTControlCharacters } from "node:util"

export function getMargin(format: string, toReplace: object, until: string) {
	const strippedFormat = stripVTControlCharacters(format)
	if (!strippedFormat.includes(until)) return ""

	let replacedFormat = strippedFormat
	for (const [text, replace] of Object.entries(toReplace)) {
		replacedFormat = replacedFormat.replaceAll(text, replace)
	}
	const indexOfUntil = replacedFormat.indexOf(until)
	return " ".repeat(indexOfUntil)
}
