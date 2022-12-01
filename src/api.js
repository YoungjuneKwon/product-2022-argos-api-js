import axios from 'axios'

const notionDataConverter = r => ({
  id: r.id,
  createdAt: r.created_time,
  updatedAt: r.last_edited_time,
  entity: r.properties.entity.title[0].plain_text,
  body: JSON.parse(r.properties.body.rich_text[0].plain_text),
  owner: r.properties.owner.relation[0].id
})

class API {
  constructor(host) {
    this.prefix = host
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
    const response = await this.post('/login', { email, password })
    if (response.token) this.headers['Authorization'] = response.token
    return response
  }

  async find({entity, contains}) {
    const response = await this.post(`/find`, { entity, contains })
    return response.map(notionDataConverter)
  }

  async get(id) {
    const response = await this.post('/get', { id })
    return notionDataConverter(response)
  }

  delete(id) {
    return this.post('/delete', { id })
  }

  async upsert({entity, body, id}) {
    const response = await this.post('/upsert', { entity, body: JSON.stringify(body), id })
    return notionDataConverter(response)
  }

  setToken(token) {
    this.headers['Authorization'] = token
  }

  getToken() {
    return this.headers['Authorization']
  }
}

export default API