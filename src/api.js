import axios from 'axios'

class API {
  constructor(host, version) {
    this.prefix = `${host}/api/v${version}`
    this.headers = {
      'Content-Type': 'application/json'
    }
  }

  async get(path) {
    return (await axios.get(`${this.prefix}${path}`, { headers: this.headers })).data
  }

  async post(path, data) {
    return (await axios.post(`${this.prefix}${path}`, data, { headers: this.headers })).data
  }

  async login({email, password}) {
    const response = await this.post('/base/open/login', { email, password })
    if (response.token) this.headers['Authorization'] = response.token
    return response
  }

  async find({entity, contains, size, offset, sort}) {
    const response = await this.post(`/base/find`, { entity, contains, size, offset, sort })
    return response
  }

  async get(id) {
    const response = await this.post('/base/get', { id })
    return response
  }

  delete(id) {
    return this.post('/base/delete', { id })
  }

  async upsert({entity, body, id}) {
    const response = await this.post('/base/upsert', { entity, body: JSON.stringify(body), id })
    return response
  }

  setToken(token) {
    this.headers['Authorization'] = token
  }

  getToken() {
    return this.headers['Authorization']
  }
}

export default API