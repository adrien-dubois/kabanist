import styled from 'styled-components';

export const Div = styled.div`
    background-color: ${props => props.theme.primaryBg};
    background-image: ${props => props.theme.bgImage};
    border-right    : ${props => props.theme.genericBorder};
    vertical-align  : top;
    padding-left    : 20px;
    padding-right   : 20px;
    height          : 100%;
    /* padding-top     : 60px; */
    /* padding-bottom  : 84px; */
`;

export const Box = styled.div`
    display        : flex;
    align-items    : center;
    justify-content: space-between;
    width          : 100%;

    .fav-icon{
        color: ${props => props.theme.primary};
    }
    .fav-icon, .del-icon{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width         : 30px;
        height        : 30px;
        text-align    : center;
        vertical-align: middle;
        float         : left;

        &:hover{
            border-radius   : 3px;
            background-color: ${props => props.theme.squareHover};
        }
    }
`;

export const Wrapper = styled.div`
    padding: 10px 40px;

    .emoji{

    }

    .title{
        padding         : 0.5rem;
        border          : none;
        font-size       : 1.5rem;
        font-weight     : 700;
        color           : ${props => props.theme.primary};
        background-color: transparent;
        width: 100%;

        &:focus{
            border: ${props => props.theme.genericBorder};
        }
    }

    .description{
        padding         : 0.5rem;
        border          : none;
        font-size       : 0.8rem;
        color           : ${props => props.theme.primary};
        background-color: transparent;
        width           : 100% !important;
        min-height: 80px !important;

        &:focus{
            border: ${props => props.theme.genericBorder};
        }

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
    }

    
`;

export const Sections = styled.div`

    color   : ${props => props.theme.primary};
    width   : 100%;
    position: relative;
    
    .sections__box{
        display        : flex;
        align-items    : center;
        justify-content: space-between;

        &__btn{
            cursor         : pointer;
            height         : 35px;
            display        : flex;
            align-items    : center;
            width          : 145px;
            padding        : 0 5px;
            text-align     : center;
            justify-content: center;

            &:hover{
                border-radius   : 3px;
                background-color: ${props => props.theme.squareHover};
                font-weight     : 500;
            }
        }
    }
    
    &::after{
        position: absolute;
        content: '';
        border-bottom: ${props => props.theme.genericBorder};
        width: 100%;
        bottom: -15px;
    }
`;