# vo-task
> Wraps data.task around VO async function

[![NPM][vo-task-icon] ][vo-task-url]

[![Build status][vo-task-ci-image] ][vo-task-ci-url]
[![semantic-release][semantic-image] ][semantic-url]

## Install and use

    npm install --save vo-task
    const voTask = require('vo-task')

## Use

Suppose you have a plain function, like `add(a, b) { return a + b }`.
You can convert this function into a Task-returning function

```js
function add(a, b) { return a + b }
const makeTask = voTask(add)
const addTask = makeTask(2, 3)
// nothing has been executed so far
```

Or you have a promise-returning function that you want to convert into a Task-returning function

```js
function addAsync(a, b) {
  return Promise.resolve(a + b)
}
const makeTask = voTask(addAsync)
const addTask = makeTask(2, 3)
// nothing has been executed so far
```

Or any other asynchronous function (like generators, callbacks, etc - see 
[vo](https://www.npmjs.com/package/vo) docs for all supported types).
Then you can combine the tasks into longer tasks *before executing anything*.
The original function only runs when you call `task.fork(onError, onSuccess)` method.

```js
addTask.fork(console.error, function (result) {
  console.log('add result', result)
})
```

`vo-task` makes longer chains across multiple async styles easy.

## Related projects

* [data.task](https://github.com/folktale/data.task) - Task monad for delayed computation
* [vo](https://www.npmjs.com/package/vo) - minimal async wrapper around promises, generators, callbacks
* [@bahmutov/taskify](https://www.npmjs.com/package/@bahmutov/taskify) - converts a Promise into Task
* [task-task](https://github.com/bahmutov/task-task) - combines result of two tasks
* [Difference between a Promise and a Task](https://glebbahmutov.com/blog/difference-between-promise-and-task/)
* [From callbacks to Tasks](https://glebbahmutov.com/blog/from-callbacks-to-tasks/)

### Small print

Author: Gleb Bahmutov &copy; 2016

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/vo-task/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[vo-task-icon]: https://nodei.co/npm/vo-task.png?downloads=true
[vo-task-url]: https://npmjs.org/package/vo-task
[vo-task-ci-image]: https://travis-ci.org/bahmutov/vo-task.png?branch=master
[vo-task-ci-url]: https://travis-ci.org/bahmutov/vo-task
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
