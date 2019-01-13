
const marker = require('@ajar/marker')
const pump = require('pump')
const { pipeline } = require('stream');
const ndjson = require('ndjson')
const through = require('through2')
const hyperquest = require('hyperquest')
require('dotenv').config()

const port = process.env.PORT || 3000;


  hyperquest(`http://localhost:${port}`)
        .pipe(ndjson.parse())
        .pipe(through.obj(write))
        .pipe(process.stdout)


// pump(
//   hyperquest(`http://localhost:${port}`),
//   ndjson.parse(),
//   through.obj(write),
//   process.stdout
// )

// pipeline(
//   hyperquest(`http://localhost:${port}`),
//   ndjson.parse(),
//   through.obj(write),
//   process.stdout,
//   (err) => {
//     if (err) {
//       marker.error('Pipeline failed.', err);
//     } else {
//       marker.log('Pipeline succeeded.');
//     }
//   }
// )

function write (row, enc, next) {
  next(null, String(row.value * row.value) + '\n')
}