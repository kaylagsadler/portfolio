/**
 * Theme generator: reads design tokens and writes theme-generated.css
 * Run: npm run generate-theme
 */
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { brandBaseColors } from '../src/tokens/1-colors'
import { gray, pink } from '../src/tokens/2-schemes'
import { fontFamily, fontWeight, fontSize, lineHeight, typeStyles } from '../src/tokens/3-typography'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirname, '../src/tokens/theme-generated.css')

function toCssVarName(prefix: string, key: string): string {
  const name = key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
  return `--${prefix}-${name}`.replace(/--+/g, '--')
}

function emitVars(
  prefix: string,
  obj: Record<string, string>,
  aliases: Record<string, string> = {},
  order: string[] = []
): string {
  const entries = Object.entries(obj)
  const sortedEntries =
    order.length > 0
      ? [...entries].sort(
          ([leftKey], [rightKey]) =>
            order.indexOf(leftKey) - order.indexOf(rightKey) ||
            leftKey.localeCompare(rightKey)
        )
      : entries

  return sortedEntries
    .map(([key, value]) => {
      const cssValue = aliases[key] ?? value
      return `  ${toCssVarName(prefix, key)}: ${cssValue};`
    })
    .join('\n')
}

function emitSingleVar(name: string, value: string): string {
  return `  --${name}: ${value};`
}

const scaleOrder = ['900', '800', '700', '600', '500', '400', '300', '200', '100', '050', '010', '001']

function emitTypeStyles(
  prefix: string,
  styles: Record<
    string,
    {
      fontFamily: string
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
  >
): string {
  return Object.entries(styles)
    .map(([name, style]) => {
      const base = toCssVarName(prefix, name) // e.g. --type-display-d1
      return [
        `  ${base}-font-family: ${style.fontFamily};`,
        `  ${base}-font-size: ${style.fontSize};`,
        `  ${base}-font-weight: ${style.fontWeight};`,
        `  ${base}-line-height: ${style.lineHeight};`,
      ].join('\n')
    })
    .join('\n')
}

const themeVars = [
  `  /* Gray scale */`,
  emitVars(
    'color-gray',
    gray as Record<string, string>,
    {
      '900': brandBaseColors.black,
    },
    scaleOrder
  ),
  '',
  `  /* Pink scale */`,
  emitVars(
    'color-pink',
    pink as Record<string, string>,
    {
      '500': brandBaseColors.pink,
    },
    scaleOrder
  ),
  '',
  `  /* Named color aliases */`,
  emitSingleVar('color-white', brandBaseColors.white),
  '',
  `  /* Typography base tokens */`,
  emitVars('font-family', fontFamily as Record<string, string>),
  emitVars(
    'font-weight',
    Object.fromEntries(
      Object.entries(fontWeight).map(([key, value]) => [key, String(value)])
    ) as Record<string, string>
  ),
  emitVars('font-size', fontSize as Record<string, string>),
  emitVars(
    'line-height',
    Object.fromEntries(
      Object.entries(lineHeight).map(([key, value]) => [key, String(value)])
    ) as Record<string, string>
  ),
  '',
  `  /* Typography styles */`,
  emitTypeStyles('type', typeStyles),
]
  .filter(Boolean)
  .join('\n')

function emitTypeUtilityClasses(
  styles: Record<
    string,
    {
      fontFamily: string
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
  >
): string {
  return Object.keys(styles)
    .map((name) => {
      const className = `.font-${name}` // e.g. .font-display-d1
      const baseVar = `--type-${name}`
      return [
        `${className} {`,
        `  font-family: var(${baseVar}-font-family);`,
        `  font-size: var(${baseVar}-font-size);`,
        `  font-weight: var(${baseVar}-font-weight);`,
        `  line-height: var(${baseVar}-line-height);`,
        `}`,
      ].join('\n')
    })
    .join('\n\n')
}

const css = `/* Generated from design tokens - DO NOT EDIT BY HAND; run npm run generate-theme */

@theme inline {
${themeVars}
}

:root {
${themeVars}
}

/* Typography utility classes */
${emitTypeUtilityClasses(typeStyles)}
`

fs.writeFileSync(outPath, css, 'utf8')
console.log('Wrote', outPath)
