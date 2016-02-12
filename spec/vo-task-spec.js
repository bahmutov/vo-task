/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')

describe('vo-task', () => {
  const voTask = require('vo-task')

  it('is a function', () => {
    la(is.fn(voTask))
  })
})
