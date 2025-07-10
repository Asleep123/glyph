export enum Colors {
	Reset = "\x1b[0m",

	Black = "\x1b[30m",
	Red = "\x1b[31m",
	Green = "\x1b[32m",
	Yellow = "\x1b[33m",
	Blue = "\x1b[34m",
	Magenta = "\x1b[35m",
	Cyan = "\x1b[36m",
	White = "\x1b[37m",

	BrightBlack = "\x1b[90m",
	BrightRed = "\x1b[91m",
	BrightGreen = "\x1b[92m",
	BrightYellow = "\x1b[93m",
	BrightBlue = "\x1b[94m",
	BrightMagenta = "\x1b[95m",
	BrightCyan = "\x1b[96m",
	BrightWhite = "\x1b[97m",

	BgBlack = "\x1b[40m",
	BgRed = "\x1b[41m",
	BgGreen = "\x1b[42m",
	BgYellow = "\x1b[43m",
	BgBlue = "\x1b[44m",
	BgMagenta = "\x1b[45m",
	BgCyan = "\x1b[46m",
	BgWhite = "\x1b[47m",

	BgBrightBlack = "\x1b[100m",
	BgBrightRed = "\x1b[101m",
	BgBrightGreen = "\x1b[102m",
	BgBrightYellow = "\x1b[103m",
	BgBrightBlue = "\x1b[104m",
	BgBrightMagenta = "\x1b[105m",
	BgBrightCyan = "\x1b[106m",
	BgBrightWhite = "\x1b[107m",

	GrayDarker = "\x1b[38;5;232m",
	GrayDark = "\x1b[38;5;236m",
	GrayLight = "\x1b[38;5;244m",
	GrayLighter = "\x1b[38;5;250m",

	BgGrayDarker = "\x1b[48;5;232m",
	BgGrayDark = "\x1b[48;5;236m",
	BgGrayLight = "\x1b[48;5;244m",
	BgGrayLighter = "\x1b[48;5;250m"
}

export enum Styles {
	Reset = "\x1b[0m",

	Bold = "\x1b[1m",
	Dim = "\x1b[2m",
	Italic = "\x1b[3m",
	Underline = "\x1b[4m",
	Blink = "\x1b[5m",
	Inverse = "\x1b[7m",
	Hidden = "\x1b[8m",
	Strikethrough = "\x1b[9m",
	DoubleUnderline = "\x1b[21m",
	NormalIntensity = "\x1b[22m"
}

export type Formatting = Colors | Styles
