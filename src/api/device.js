import axios from 'axios'

const API_BASE_URL = 'http://192.168.179.122:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const deviceApi = {
  async getDevices(params = {}) {
    const { skip = 0, limit = 100 } = params
    const response = await api.get('/devices', { params: { skip, limit } })
    return response.data
  },

  async getDeviceById(deviceId) {
    const response = await api.get(`/devices/${deviceId}`)
    return response.data
  },

  async createDevice(deviceData) {
    const response = await api.post('/devices', deviceData)
    return response.data
  },

  async updateDevice(deviceId, deviceData) {
    const response = await api.put(`/devices/${deviceId}`, deviceData)
    return response.data
  },

  async deleteDevice(deviceId) {
    const response = await api.delete(`/devices/${deviceId}`)
    return response.data
  }
}

export default api
