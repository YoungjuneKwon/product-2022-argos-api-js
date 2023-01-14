import API from '../index'
import config from './test.config'

const ctx = {}
const version = require('../package.json').version

test("basic CRUD", async () => {
  var res = {}
  ctx.api = new API(config.prefix, version)
  res = await ctx.api.login(config.sampleUser)
  expect(res.token).toBeTruthy()
  res = await ctx.api.upsert({ entity: 'sample', body: {hello: 'world'}})
  expect(res.id).toBeTruthy()
  res.body.hello = 'world2'
  res = await ctx.api.upsert(res)
  expect(res.body.hello).toBe('world2')
  res = await ctx.api.delete(res.id)
  expect(res.id).toBeTruthy()
})
