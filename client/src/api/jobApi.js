import axiosClient from "./axiosClient"

const jobApi = {
    getAll: (params) => {
        return axiosClient.get('/job', { params })
    },

    getAllDelete: (params) => {
        return axiosClient.get('/job', { params:{...params, onlyDelete: true }})
    },

    get: (id) => {
        return axiosClient.get(`/job/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/job/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/job/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/job/${id}`)
    },

    deleteMulti: (ids) => {
        return axiosClient.delete('/job', { params: { ids } })
    },

    restore: (id) => {
        return axiosClient.put(`/job/${id}/restore`)
    },

    restoreMulti: (ids) => {
        return axiosClient.get('/job/restore', { params: { ids } })
    }
}

export default jobApi