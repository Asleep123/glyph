import { Answer } from "./Answer"

export class Option extends Answer {
	name: string

	constructor({
		name,
		value
	}: {
		name: string
		value: string
	}) {
		super(value)
		this.name = name
	}
}
