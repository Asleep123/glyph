# Glyph - Build and Testing Setup

This document outlines the complete build process and testing setup for the Glyph npm library.

## 📦 Build Process

### TypeScript Configuration

The project uses multiple TypeScript configurations:

- **`tsconfig.json`** - Main development configuration with modern settings
- **`tsconfig.build.json`** - CommonJS build configuration for Node.js compatibility  
- **`tsconfig.esm.json`** - ES Modules build configuration for modern environments

### Build Scripts

```bash
# Clean build artifacts
npm run clean

# Build both CommonJS and ESM versions
npm run build

# Build only CommonJS version
npm run build:cjs

# Build only ESM version  
npm run build:esm
```

### Dual Package Setup

The library supports both CommonJS and ES Modules:

- **CommonJS**: `dist/index.js` with `.d.ts` declaration files
- **ES Modules**: `dist/esm/index.js` as native ES modules

The build process uses TypeScript's native compilation:
1. **CommonJS Build**: Compiles TypeScript directly to `.js` files with type declarations
2. **ESM Build**: Compiles TypeScript to ES module `.js` files in `dist/esm/`

Since the project is TypeScript-only, no post-processing scripts are needed - TypeScript handles all the module formats natively.

## 🧪 Testing Setup

### Test Framework

- **Bun Test** - Fast JavaScript test runner with built-in TypeScript support
- **Coverage**: Automatic code coverage reporting with 80% threshold
- **Watch Mode**: Real-time test execution during development

### Test Structure

```
tests/
├── Select.test.ts       # Select component tests
├── Text.test.ts         # Text input component tests  
├── View.test.ts         # View manager tests
├── Option.test.ts       # Option class tests
├── GlyphError.test.ts   # Error handling tests
├── margin.test.ts       # Utility function tests
├── formatting.test.ts   # Color/style tests
└── integration.test.ts  # End-to-end tests
```

### Test Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 🔍 Code Quality

### Linting and Formatting

- **Biome** - Fast linter and formatter for JavaScript/TypeScript
- **Strict TypeScript** - Full type safety with strict compiler options
- **Import Protocol** - Enforces `node:` protocol for Node.js built-ins

### Quality Scripts

```bash
# Check code style and types
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking only
npm run typecheck
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

The project includes a comprehensive CI/CD pipeline (`.github/workflows/ci.yml`):

**Testing Stage:**
- Matrix testing across Node.js 16.x, 18.x, 20.x
- Runs on Ubuntu latest
- Executes linting, type checking, tests, and builds
- Validates package installation

**Publishing Stage:**
- Automatic publishing to npm on main branch pushes
- Requires NPM_TOKEN secret to be configured
- Only publishes if version has changed

### Required Secrets

- `NPM_TOKEN` - npm authentication token for publishing

## 📁 Package Structure

```
dist/
├── classes/           # Compiled class files
│   ├── *.js          # CommonJS versions
│   ├── *.mjs         # ES Module versions  
│   └── *.d.ts        # TypeScript declarations
├── functions/         # Compiled utility functions
│   ├── *.js          # CommonJS versions
│   ├── *.mjs         # ES Module versions
│   └── *.d.ts        # TypeScript declarations
├── index.js          # Main CommonJS entry
├── index.mjs         # Main ES Module entry
└── index.d.ts        # Main TypeScript declarations
```

## 🔧 Development Workflow

1. **Make Changes** - Edit source files in `classes/` or `functions/`
2. **Run Tests** - `npm test` or `npm run test:watch`
3. **Check Quality** - `npm run lint` and `npm run typecheck`
4. **Build Package** - `npm run build`
5. **Test Build** - Verify both CommonJS and ESM outputs work

## 📋 Pre-publish Checklist

The `prepublishOnly` script automatically runs:

1. ✅ Clean build
2. ✅ Run all tests  
3. ✅ Lint code
4. ✅ Generate both CommonJS and ESM builds
5. ✅ Validate TypeScript declarations

## 🎯 Key Features

- **Zero Dependencies** - No external runtime dependencies
- **Dual Package** - Supports both CommonJS and ES Modules
- **Type Safe** - Full TypeScript support with strict typing
- **Well Tested** - Comprehensive test suite with high coverage
- **Modern Tooling** - Uses Bun and Biome for fast development
- **CI/CD Ready** - Automated testing and publishing pipeline

## 🔗 Related Files

- `package.json` - Package configuration and scripts
- `tsconfig.*.json` - TypeScript configurations
- `biome.json` - Linting and formatting rules
- `bunfig.toml` - Bun test configuration
- `.github/workflows/ci.yml` - CI/CD pipeline
- `scripts/build-esm.js` - ESM build post-processing (copy and rename)
