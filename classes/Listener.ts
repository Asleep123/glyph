import readline from "node:readline"

export class Listener {
	rl: readline.Interface
	callback: (key: readline.Key) => void
	private boundHandleKeypress: (str: string, key: readline.Key) => void // I have no clue why I need this but it was the result of 20 minutes of frustrating debugging

	constructor(callback: (key: readline.Key) => void) {
		this.rl = readline.createInterface({
			input: process.stdin
		})
		this.callback = callback
		this.boundHandleKeypress = this.handleKeypress.bind(this)

		readline.emitKeypressEvents(process.stdin, this.rl)

		process.stdin.setRawMode(true)
		process.stdout.write("\x1B[?25l") // hide cursor
		process.stdin.on("keypress", this.boundHandleKeypress)
	}

	close() {
		process.stdin.off("keypress", this.boundHandleKeypress)
		process.stdout.write("\x1B[?25h") // show cursor
		process.stdin.setRawMode(false)
		this.rl.close()
	}

	// biome-ignore lint/suspicious/noExplicitAny: no (parameter not needed and I could care less about what type it is)
	private handleKeypress(_: any, key: readline.Key) {
		if (key.ctrl && key.name === "c") {
			process.exit(0)
		}
		this.callback(key)
	}
}
