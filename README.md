# @winm2m/argos-api

## Description
An API for the Argos project, and also could be used as a library as general CRUD purposes.

## Installation

```bash
npm install --save @winm2m/argos-api
```

## Usage

```javascript
const { API } = require('@winm2m/argos-api')

const API_PREFIX = 'https://wherever.you.host'
const API_VERSION = '0.3.0' // current version of this package

const api = new API(API_PREFIX, API_VERSION)

var result

// login
result = await api.login({ email: 'admin', password: 'admin' })
const token = result.token

// upsert ( insert or update )
result = await api.upsert({
  entity: 'sample',
  body: {
    name: 'sample',
    description: 'sample'
  }
})
console.log(`id of new content : ${result.id}`)

// find
const results = await api.find({
  entity: 'sample',
  contains: {
    name: 'sample'
  }
})

// delete
result = await api.delete(result.id)
```