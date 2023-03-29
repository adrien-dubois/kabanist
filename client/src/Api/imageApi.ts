import API from ".";

const imageApi = {
    uploadImg: (params: any) => API.post('/store-image', params)
}

export default imageApi;