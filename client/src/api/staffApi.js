import axiosClient from "./axiosClient"

const staffApi = {
    getAll: (params) => {
        return axiosClient.get('/staff', { params })
    },

    getAllDelete: (params) => {
        return axiosClient.get('/staff', { params:{...params, onlyDelete: true }})
    },

    get: (id) => {
        return axiosClient.get(`/staff/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/staff/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/staff/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/staff/${id}`)
    },

    deleteMulti: (ids) => {
        return axiosClient.delete('/staff', { params: { ids } })
    },

    restore: (id) => {
        return axiosClient.put(`/staff/${id}/restore`)
    },

    load: () => {
        return axiosClient.get('staff/load')
    },

    login: (data) => {
        return axiosClient.post(`staff/login`, data)
    },

    restoreMulti: (ids) => {
        return axiosClient.get('/staff/restore', { params: { ids } })
    }
}

export default staffApi