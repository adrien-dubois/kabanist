import styled from 'styled-components';

export const Box = styled.div`
    margin-top : 2rem;
    display    : flex;
    align-items: flex-start;
    width      : calc(100vw - 400px);
    height     : 100%;
    overflow-x : auto;

    ::-webkit-scrollbar{
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track{
        background: var(--hrColor);
    }

    ::-webkit-scrollbar-thumb{
        background: ${props => props.theme.thumb};
    }

    ::-webkit-scrollbar-thumb:hover{
        background: #555;
    }
    .kanban{
        width        : 250px;
        max-height   : calc(100% - 350px);
        margin-right : 20px;
        margin-bottom: 15px;
        padding-right: 10px;
        overflow-x   : hidden;
        overflow-y   : auto;
        
        ::-webkit-scrollbar{
            width : 5px;
            height: 5px;
        }

        ::-webkit-scrollbar-track{
            background: var(--hrColor);
        }

        ::-webkit-scrollbar-thumb{
            background: ${props => props.theme.thumb};
        }

        ::-webkit-scrollbar-thumb:hover{
            background: #555;
        }


        &__droppable{
            width       : 250px;
            padding     : 10px;

            &__child{
                display        : flex;
                align-items    : center;
                justify-content: space-between;
                margin-bottom  : 10px;
            }
        }
    }
`;

export const Title = styled.div`

    display: grid;
    grid-template-columns: 1fr 30%;

    input{
        flex-grow  : 1;
        padding    : 0;
        border     : unset;
        font-size  : 1rem;
        font-weight: 500;
        color: ${props => props.theme.primary};
        background-color: transparent;
    }

    .pictos{
        color: #717575;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        svg{
            font-size: 1.2rem;
            cursor: pointer;

            &:nth-of-type(1){
                &:hover{
                    color: green;
                }
            }
            &:nth-of-type(2){
                &:hover{
                    color: var(--error-color);
                }
            }
        }

    }
`;