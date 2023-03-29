import API from ".";

const sectionApi = {
    create: (boardId: string | undefined) => API.post(`boards/${boardId}/sections`),
    update: (boardId: string | undefined, sectionId: string | undefined, params: any) => API.put(`/boards/${boardId}/sections/${sectionId}`, params),
    delete: (boardId: string | undefined, sectionId: string | undefined ) => API.delete(`/boards/${boardId}/sections/${sectionId}` ),
}

export default sectionApi;