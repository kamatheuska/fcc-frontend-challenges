process.env.NODE_ENV = 'test'

const test = require('tape')
const request = require('supertest')

const { app } = require('../app')
const { populateCollection, clearCollection, setupUsers, setupProducts, teardown } = require('./seed/utils')


test.onFinish(() => teardown())
test.onFailure(() => teardown(null, true))

test('some test', { skip: false }, (t) => {

})
