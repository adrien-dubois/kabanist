import styled from "styled-components";

export const Div = styled.div`
    width           : 30%;
    height          : 40%;
    border-radius   : 12px;
    background-color: ${props => props.theme.modalKanbanBg};
    box-shadow      : rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display         : flex;
    flex-direction  : column;
    padding         : 25px;
    color: ${props => props.theme.primary};

    .close{
        display        : flex;
        justify-content: flex-end;
        
        svg{
            font-size: 1.5rem;
            cursor   : pointer;
        }
    }

    .user{
        display        : flex;
        justify-content: center;
        align-items    : center;
        flex-direction : column;

        &__icon{
            font-size: 2.5rem;
        }

        &__title{
            margin-top: 1rem;
        }
    }

    .user-table{
        border-collapse: collapse;
        margin         : 25px 0;
        min-width      : 400px;
        box-shadow     : 0 0 20px rgba(0, 0, 0, 0.15);

        tr{
            border-bottom: 1px solid #dddddd;

            td{
                padding: 12px 15px;
                &:first-child{
                    text-transform: uppercase;
                    font-weight   : bold;
                    
                }
            }
        }
        &__password{
            svg{
                color        : ${props => props.theme.primary};
                margin-left  : 50px;
                margin-bottom: 0.2rem;
                cursor       : pointer;
            }
        }
    }

`; 

export const Background = styled.div`
    width           : 100vw;
    height          : 100vh;
    display         : flex;
    backdrop-filter : blur(2px);
    background-color: rgba(0, 0, 0, 0.8);
    position        : fixed;
    justify-content : center;
    align-items     : center;
    top             : 0;
    right           : 0;
    left            : 0;
    z-index         : 5;
`;