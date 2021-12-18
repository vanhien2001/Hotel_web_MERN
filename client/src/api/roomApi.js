import axiosClient from "./axiosClient"

const roomApi = {
    getAll: (params) => {
        return axiosClient.get('/room', { params })
    },

    getAllDelete: (params) => {
        return axiosClient.get('/room', { params:{...params, onlyDelete: true } })
    },

    get: (id) => {
        return axiosClient.get(`/room/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/room/store`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    edit: (id, data) => {
        return axiosClient.put(`/room/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    delete: (id) => {
        return axiosClient.delete(`/room/${id}`)
    },

    deleteMulti: (ids) => {
        return axiosClient.delete('/room', { params: { ids } })
    },

    restore: (id) => {
        return axiosClient.put(`/room/${id}/restore`)
    },

    restoreMulti: (ids) => {
        return axiosClient.get('/room/restore', { params: { ids } })
    }
}

export default roomApi