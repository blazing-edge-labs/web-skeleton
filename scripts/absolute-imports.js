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

const CHILD = new Set(fs.readdirSync('.').map(it => it.replace(/\.js$/, '')))

const isRelative = path => /^\.\.?\//.test(path)

const conflictsWithChild = path => CHILD.has(path.split('/')[0])

function traverse(root, ignoreChildJS) {
  // console.log(root)
  const names = fs.readdirSync(root)

  for (const name of names) {
    const fullPath = path.join(root, name)

    if (IGNORE.has(fullPath)) {
      continue
    }

    if (fs.lstatSync(fullPath).isDirectory()) {
      traverse(fullPath)
    }

    if (!ignoreChildJS && name.endsWith('.js')) {
      processJSFile(root, fullPath)
    }
  }
}

function processJSFile(dirName, filePath) {
  const code = fs.readFileSync(filePath, { encoding: 'utf-8' })

  const parsed = babylon.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'asyncGenerators', 'dynamicImport', 'throwExpressions'],
  })

  const pathTokens = extractPathTokens(parsed.tokens)

  const newCode = pathTokens.reduceRight((code, t) => {
    let v = t.value;
    if (isRelative(v)) { v = path.join(dirName, v).replace(/\/+$/, '') }
    else if (conflictsWithChild(v)) { v = 'node_modules/' + v }
    else { return code }
    return code.slice(0, t.start + 1) + v + code.slice(t.end - 1)
  }, code)

  if (newCode !== code) {
    // console.log(filePath)
    fs.writeFileSync(filePath, newCode, { encoding: 'utf-8' })
  }
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

if (path.sep !== '/') {
  throw 'Running this script this system is not supported - sep is not "/".'
}

traverse('.', true)
