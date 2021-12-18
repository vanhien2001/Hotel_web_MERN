import axiosClient from "./axiosClient"

const serviceApi = {
    getAll: (params) => {
        return axiosClient.get('/service', { params })
    },

    getAllDelete: (params) => {
        return axiosClient.get('/service', { params:{...params, onlyDelete: true } })
    },

    get: (id) => {
        return axiosClient.get(`/service/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/service/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/service/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/service/${id}`)
    },

    deleteMulti: (ids) => {
        return axiosClient.delete('/service', { params: { ids } })
    },

    restore: (id) => {
        return axiosClient.put(`/service/${id}/restore`)
    },

    restoreMulti: (ids) => {
        return axiosClient.get('/service/restore', { params: { ids } })
    }
}

export default serviceApi