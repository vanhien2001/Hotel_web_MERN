import axiosClient from "./axiosClient"

const bookingApi = {
    getAll: (params) => {
        return axiosClient.get('/booking', { params })
    },

    getAllDelete: (params) => {
        return axiosClient.get('/booking', { params:{...params, onlyDelete: true } })
    },

    getAllWithDelete: (params) => {
        return axiosClient.get('/booking', { params:{...params, withDelete: true } })
    },

    get: (id) => {
        return axiosClient.get(`/booking/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/booking/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/booking/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/booking/${id}`)
    },

    deleteMulti: (ids) => {
        return axiosClient.delete('/booking', { params: { ids } })
    },

    restore: (id) => {
        return axiosClient.put(`/booking/${id}/restore`)
    },

    restoreMulti: (ids) => {
        return axiosClient.get('/booking/restore', { params: { ids } })
    }
}

export default bookingApi