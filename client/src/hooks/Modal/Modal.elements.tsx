import styled from "styled-components";

export const Background = styled.div`
    width           : 100vw;
    height          : 100vh;
    display         : flex;
    background-color: rgba(0, 0, 0, 0.8);
    position        : fixed;
    justify-content : center;
    align-items     : center;
    top             : 0;
    right           : 0;
    left            : 0;
    z-index         : 5;
`;

export const Container = styled.div<{showModal: boolean}>`
    width           : 500px;
    height          : 350px;
    border-radius   : 12px;
    background-color: white;
    box-shadow      : rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display         : flex;
    flex-direction  : column;
    padding         : 25px;

    .modal-title{
        display   : inline-block;
        text-align: center;
        margin-top: 10px;
        font-size : 1.5rem;
    }
    
    .modal-close-button{
        display        : flex;
        justify-content: flex-end;

        button{
            background-color: transparent;
            border          : none;
            font-size       : 25px;
            cursor          : pointer;
        }
    }

    .modal-body{
        flex           : 50%;
        display        : flex;
        justify-content: center;
        align-items    : center;
        font-size      : 1.4rem;
        text-align     : center;
    }

    .modal-footer{
        flex           : 20%;
        display        : flex;
        justify-content: center;
        align-items    : center;

        button{
            width           : 150px;
            height          : 45px;
            margin          : 10px;
            border          : none;
            background-color: cornflowerblue;
            color           : white;
            border-radius   : 8px;
            font-size       : 20px;
            cursor          : pointer;
        }

        #cancel-btn{
            background-color: crimson;
        }
    }
    
`;