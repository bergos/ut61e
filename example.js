var UT61E = require('.')

var ut64e = new UT61E({
  he2335u: {
    path: '/home/bergi/Projects/c/ut61e_cpp/he2325u/he2325u'
  },
  es51922: {
    path: '/home/bergi/Projects/c/ut61e_cpp/es51922/es51922'
  }
})

ut64e.on('data', function (chunk) {
  console.log(new Date(chunk.timestamp))
  console.log(chunk)
})

ut64e.on('end', function () {
  console.log('end')
})

ut64e.on('error', function (err) {
  console.error(err.stack || err.message)
})
