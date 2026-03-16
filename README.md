# YAML Formatter & Validator

Format and validate YAML documents using js-yaml with configurable indentation and line width, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/developer-tools/yaml-formatter

## How It Works

Formatting calls `jsyaml.load(text)` to parse the YAML input into a JavaScript object — this validates the YAML syntax and throws a descriptive error on failure. The parsed object is then passed to `jsyaml.dump(parsed, { indent: indentSize, lineWidth: -1 })` where `indent` is 2 or 4 and `lineWidth: -1` disables automatic line wrapping. Validation-only mode calls `jsyaml.load(text)` without re-dumping, reporting valid or displaying the parse error message. Both operations check that `jsyaml` is available (CDN load required).

## Features

- YAML parse validation via `jsyaml.load`
- Format/beautify with 2- or 4-space indentation
- `lineWidth: -1` disables line wrapping
- Separate validate button for syntax-only check
- Copy formatted output to clipboard

## Browser APIs Used

- Clipboard API (`navigator.clipboard.writeText`)
- js-yaml library (external CDN)

## Code Structure

| File | Description |
|------|-------------|
| `yaml-formatter.js` | `jsyaml.load` parse + validation, `jsyaml.dump({indent, lineWidth:-1})` format, indent option, library availability check |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| YAML input textarea | YAML document input |
| Indent selector | 2-space or 4-space indentation |
| Format button | Parse and re-dump with indent |
| Validate button | Syntax check only |
| Output textarea | Formatted YAML |
| Copy button | Copy output to clipboard |
| Clear button | Reset both fields |

## License

MIT
