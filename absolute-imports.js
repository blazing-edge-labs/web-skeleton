/* eslint-disable */

const babylon = require('babylon')
const path = require('path')
const fs = require('fs')

const IGNORE = new Set([
  'node_modules',
  '.next',
  '.test',
  '.vscode',
  '.git',
  'next-style-loader',
])

function traverse(root, ignoreChildJS) {
  // console.log(root)
  const names = fs.readdirSync(root)

  for (const name of names) {
    const fullPath = path.join(root, name)

    if (IGNORE.has(fullPath)) {
      continue
    }

    const absPath = path.join(__dirname, fullPath)

    if (fs.lstatSync(absPath).isDirectory()) {
      traverse(fullPath)
    }

    if (!ignoreChildJS && name.endsWith('.js')) {
      processJSFile(root, fullPath, absPath)
    }
  }
}

function processJSFile(dirName, filePath, absPath) {
  const code = fs.readFileSync(absPath, { encoding: 'utf-8' })

  const parsed = babylon.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'asyncGenerators', 'dynamicImport', 'throwExpressions'],
  })

  const relPathTokens = extractPathTokens(parsed.tokens)
  .filter(t => t.value[0] && t.value.includes('/'))

  if (relPathTokens.length === 0) {
    return
  }

  console.log(filePath, relPathTokens.length)

  const newCode = relPathTokens.reduceRight((code, t) => {
    return code.slice(0, t.start + 1) + path.join(dirName, t.value) + code.slice(t.end - 1)
  }, code)

  fs.writeFileSync(filePath, newCode, { encoding: 'utf-8' })
}

function extractPathTokens(tokens) {
  const res = []
  const n = tokens.length

  for (let i = 0; i < n; ++i) {
    let t = tokens[i]

    if (t.type.label === 'import') {
      t = tokens[++i]
      if (t.type.label === 'string') {
        res.push(tokens[i])
        continue
      }
      do { t = tokens[++i] } while (t.value !== 'from' || t.type.label !== 'name')
      res.push(tokens[++i])
    } else if (t.value === 'require' && t.type.label === 'name') {
      if (tokens[++i].type.label = '(') {
        res.push(tokens[++i])
      }
    }
  }

  return res.filter(t => t.type.label === 'string')
}

traverse('.', true)
