// Copie le Vault genere (webapp/data.js, 635 docs) vers le proto isole.
// Usage depuis webapp_v2_react/ :  npm run sync:vault
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root2 = path.resolve(here, '..')
const src = path.resolve(root2, '..', 'webapp', 'data.js')
const dst = path.resolve(root2, 'public', 'vault-data.js')
fs.mkdirSync(path.dirname(dst), { recursive: true })
fs.copyFileSync(src, dst)
const kb = (fs.statSync(dst).size / 1024).toFixed(0)
console.log(`Vault sync OK -> public/vault-data.js (${kb} KB, source webapp/data.js)`)
