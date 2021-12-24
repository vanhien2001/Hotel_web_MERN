import axiosClient from "./axiosClient"

const commentApi = {
    getAll: (params) => {
        return axiosClient.get('/comment', { params })
    },

    get: (id) => {
        return axiosClient.get(`/comment/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/comment/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/comment/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/comment/${id}`)
    },
}

export default commentApi