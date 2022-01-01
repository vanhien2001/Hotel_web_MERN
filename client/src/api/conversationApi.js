import axiosClient from "./axiosClient"

const conversationApi = {
    getAll: (params) => {
        return axiosClient.get('/conversation', { params })
    },

    get: (id) => {
        return axiosClient.get(`/conversation/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/conversation/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/conversation/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/conversation/${id}`)
    },
}

export default conversationApi