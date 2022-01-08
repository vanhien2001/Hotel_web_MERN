import axiosClient from "./axiosClient"

const typeRoomApi = {
    getAll: (params) => {
        return axiosClient.get('/typeRoom', { params })
    },

    getAllDelete: (params) => {
        return axiosClient.get('/typeRoom', { params:{...params, onlyDelete: true }})
    },

    getStatistics: (params) => {
        return axiosClient.get('/typeRoom/statistics', { params })
    },

    get: (id) => {
        return axiosClient.get(`/typeRoom/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/typeRoom/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/typeRoom/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/typeRoom/${id}`)
    },

    deleteMulti: (ids) => {
        return axiosClient.delete('/typeRoom', { params: { ids } })
    },

    restore: (id) => {
        return axiosClient.put(`/typeRoom/${id}/restore`)
    },

    restoreMulti: (ids) => {
        return axiosClient.get('/typeRoom/restore', { params: { ids } })
    }
}

export default typeRoomApi