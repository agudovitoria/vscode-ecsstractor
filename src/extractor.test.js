const test = require('ava')
const fs = require('fs')
const util = require('util')
const Extractor = require('./extractor')

const extractor = new Extractor()
const readFile = util.promisify(fs.readFile)

test('extract class selectors', async t => {
  const content = await readFile(`${process.cwd()}/testcases/list.html`, 'utf8')
  const actual = extractor.extractClassSelectors(content)

  t.is(actual.length, 6)
  t.is(actual[0], '.list')
  t.is(actual[1], '.list-item')
})

test('extract multiple class selectors', async t => {
  const content = await readFile(
    `${process.cwd()}/testcases/multiple-classes.html`,
    'utf8',
  )
  const actual = extractor.extractClassSelectors(content)

  t.is(actual.length, 3)
  t.is(actual[0], '.container.container-fluid.article')
  t.is(actual[1], '.article.content')
  t.is(actual[2], '.article.title')
})

test('extract id selectors', async t => {
  const content = await readFile(`${process.cwd()}/testcases/id.html`, 'utf8')
  const actual = extractor.extractIDSelectors(content)

  t.is(actual.length, 3)
  t.is(actual[0], '#global-header')
  t.is(actual[1], '#site-title')
  t.is(actual[2], '#global-footer')
})
