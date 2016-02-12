/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')

describe('vo-task', () => {
  const voTask = require('vo-task')

  function add (a, b) {
    return a + b
  }

  function addAsync (a, b) {
    return Promise.resolve(a + b)
  }

  function * addGenerator (a, b) {
    const result = yield { sum: a + b }
    return result.sum
  }

  function checkResult (task, expected, done) {
    task.fork(
      (err) => la(false, err),
      (x) => {
        la(x === expected, 'expected', expected, 'got', x)
        done()
      }
    )
  }

  it('is a function', () => {
    la(is.fn(voTask))
  })

  it('returns another function', () => {
    const addTask = voTask(add)
    la(is.fn(addTask))
  })

  it('can executes only when forked', (done) => {
    const makeTask = voTask(add)
    const addTask = makeTask(2, 3)
    la(is.fn(addTask.fork), 'has fork method')
    checkResult(addTask, 5, done)
  })

  it('tests promises', () => {
    return addAsync(2, 4)
      .then((sum) => la(sum === 6, sum))
  })

  it('works with promise returning functions', (done) => {
    const makeAdd = voTask(addAsync)
    const addTask = makeAdd(10, 20)
    checkResult(addTask, 30, done)
  })

  it('works with generators', (done) => {
    const makeAdd = voTask(addGenerator)
    const addTask = makeAdd(10, 20)
    checkResult(addTask, 30, done)
  })
})
