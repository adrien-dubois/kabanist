# Project Manager

## MERN Stack

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) 	![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)

## Configuration

For install :
`cd server && npm install`
`cd ../client && npm install --legacy-peer-deps`
`cd ckeditor5 && npm install & npm run build`

For the client .env : 
```env
REACT_APP_API='http://localhost:5005/api/v1'
```

For the server .env:
```env
PORT=5005
MONGODB_URL="url mongo db"
PASSWORD_SECRET_KEY=for the encryption of password
TOKEN_SECRET_KEY= for the JWT passphrase

BASE_URL=http://localhost:3000

# SERVICE EMAIL
HOST=
SERVICE=
PORT_EMAIL=
SECURE=true
USER=
PASS=
```

## Projet

Application that allows you to manage current projects, via Todolist, Trello-style Agile boards

## Front

### Custom Hooks & Features

#### Toasts *(notifications)*

Call custom hook `useToasts()` in a constant and the method you want to notify with some parameters : 

```js
const { pushToast } = useToasts(); 

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    await yourMethod()
        .then(() => {

        pushToast({  
            title: "Notification title",
            content: "Notification content",
            type: "danger"
            })

        })
        .catch(
        (error: any) => {
            console.log(error);
        })
}
```

Parameters for `pushToast` are :

- title?: string
- content: string
- type?: "success" | "danger"

For the Success type it will be green and the Danger type red, for errors etc...
If no type is chosen, Success is set by default, and the title will not be set by default.
#### Modal de confirmation

Call custom hook `useModal()` in a constant and the method you want to confirm with some parameters:

```js
const { modal } = useModal();

if( await modal({
    title: 'Title',
    content: 'Modal question ?'
})){
    ...your code
}

```
