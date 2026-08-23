import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const outDir = path.resolve('docs')
const outFile = path.join(outDir, 'screenshot.png')

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
})

const sampleTodos = [
  {
    id: crypto.randomUUID(),
    title: 'Proje README dosyasını yaz',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'GitHub reposuna yükle',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Netlify ile yayına al',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

await page.addInitScript((todos) => {
  localStorage.setItem('sira-todos', JSON.stringify(todos))
}, sampleTodos)

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: outFile, fullPage: true })
await browser.close()

console.log(`Saved ${outFile}`)
