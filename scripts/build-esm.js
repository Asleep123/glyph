#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function copyAndRename(srcDir, destDir) {
	if (!fs.existsSync(destDir)) {
		fs.mkdirSync(destDir, { recursive: true })
	}

	const items = fs.readdirSync(srcDir)

	for (const item of items) {
		const srcPath = path.join(srcDir, item)
		const stat = fs.statSync(srcPath)

		if (stat.isDirectory()) {
			const newDestDir = path.join(destDir, item)
			copyAndRename(srcPath, newDestDir)
		} else if (item.endsWith(".js")) {
			// Copy .js as .mjs
			const destPath = path.join(destDir, item.replace(".js", ".mjs"))
			fs.copyFileSync(srcPath, destPath)
		}
	}
}

// Copy ESM files from dist/esm to dist and rename .js to .mjs
const esmDir = path.join(__dirname, "..", "dist", "esm")
const distDir = path.join(__dirname, "..", "dist")

if (fs.existsSync(esmDir)) {
	copyAndRename(esmDir, distDir)

	// Remove the esm directory since we've copied everything
	fs.rmSync(esmDir, { recursive: true, force: true })

	console.log("ESM files copied and renamed successfully")
} else {
	console.log("ESM directory not found")
}
