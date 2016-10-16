var spawn = require('child_process').spawn
var util = require('util')
var LineStream = require('byline').LineStream
var Transform = require('stream').Transform

function UT61E (options) {
  Transform.call(this, {decodeStrings: true})

  this._readableState.objectMode = true
  this._writableState.objectMode = true

  this.options = options || {}

  this.he2335u = spawn(this.options.he2335u.path, this.options.he2335u.options)
  this.es51922 = spawn(this.options.es51922.path, this.options.es51922.options)
  this.linestream = new LineStream()

  this.he2335u.stdout.pipe(this.es51922.stdin)
  this.es51922.stdout.pipe(this.linestream)
  this.linestream.pipe(this)

  this.timestampOffset = (new Date()).valueOf()
}

util.inherits(UT61E, Transform)

UT61E.prototype._transform = function (chunk, encoding, done) {
  var values = chunk.toString().split(';')

  var measurement = {
    timestamp: parseInt(values[0]) + this.timestampOffset,
    sequence: parseInt(values[1]),
    value: parseFloat(values[2]),
    unit: values[6]
  }

  this.push(measurement)

  done()
}

UT61E.prototype._flush = function (done) {
  done()
}

module.exports = UT61E
