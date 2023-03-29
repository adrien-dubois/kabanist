import API from ".";

const boardApi = {
    create: () => API.post('/boards'),
    getAll: () => API.get('/boards'),
    updatePosition: (params: any) => API.put('/boards', params),
    getOne: (id: string | undefined) => API.get(`/boards/${id}`),
    delete: (id: string | undefined) => API.delete(`/boards/${id}`),
    update: (id: string | undefined, params: any ) => API.put(`/boards/${id}`, params),
    favourites: () => API.get('/boards/favourites '),
    updateFavouritePosition: (params: any) => API.put('/boards/favourites', params),
}

export default boardApi;