import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {test} from 'node:test'

const script = readFileSync(new URL('../script.js', import.meta.url), 'utf8')

test('full-width layout includes the communities overview', () => {
  assert.match(script, /FULL_WIDTH_BODY_PSEUDO\s*=\s*[^\n]*\.Communities/)
})

test('full-width layout includes the lists overview', () => {
  assert.match(script, /FULL_WIDTH_BODY_PSEUDO\s*=\s*[^\n]*\.Lists/)
  assert.match(script, /classList\.toggle\('Lists', isOnListsPage\(\)\)/)
})

test('full-width layout includes individual tweets unless relevant people are shown', () => {
  assert.match(script, /FULL_WIDTH_BODY_PSEUDO\s*=\s*[^\n]*\.Tweet:not\(\.ShowRelevantPeople\)/)
  assert.match(script, /classList\.toggle\('ShowRelevantPeople', config\.showRelevantPeople\)/)
})
