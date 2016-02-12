const vo = require('vo')
const Task = require('data.task')

function voTask (fn) {
  // wait for arguments
  return function () {
    const args = Array.prototype.slice.call(arguments, 0)
    return new Task(function (reject, resolve) {
      const thunk = vo(fn)
      function cb (err, result) {
        if (err) {
          return reject(err)
        }
        resolve(result)
      }
      args.push(cb)
      thunk.apply(null, args)
    })
  }
}

module.exports = voTask
