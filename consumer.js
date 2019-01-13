
const pump = require('pump')
const ndjson = require('ndjson')
const through = require('through2')
const hyperquest = require('hyperquest')
const marker = require('@ajar/marker')
require('dotenv').config()

const port = process.env.PORT || 3000;

pump(
  hyperquest(`http://localhost:${port}`),
  ndjson.parse(),
  through.obj(write),
  process.stdout
)

function write (row, enc, next) {
  next(null, String(row.value * row.value) + '\n')
}