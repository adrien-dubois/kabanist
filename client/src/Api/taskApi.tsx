import API from ".";

const taskApi = {
    create: (boardId: string | undefined, params: any) => API.post(`boards/${boardId}/tasks`, params),

    updatePosition: (boardId: string | undefined, params: any) => API.put(`boards/${boardId}/tasks/update-position`, params),

    delete: (boardId: string | undefined, taskId: string | undefined) => API.delete(`boards/${boardId}/tasks/${taskId}`),

    update: (boardId: string | undefined, taskId: string | undefined, params: any) => API.put(`boards/${boardId}/tasks/${taskId}`, params),
}

export default taskApi;