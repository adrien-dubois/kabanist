import styled from 'styled-components';

export const Container = styled.div`
    height         : 70vh;
    display        : flex;
    align-items    : center;
    justify-content: center;
`;

export const Btn = styled.button`
    width           : 300px;
    color           : ${props => props.theme.primary};
    background-color: transparent;
    border          : 2px solid ${props => props.theme.btnHover};
    margin-right    : 5px;
    margin-top      : 10px;
    font-size       : 1rem;
    line-height     : 17px;
    padding         : 8px 12px 8px 12px;
    position        : relative;
    display         : inline-block;
    white-space     : nowrap;
    border-radius   : 3px;
    text-decoration : none;
    text-align      : center;
    cursor          : pointer;

    &:hover{
        background-color: ${props => props.theme.btnBgHover};
    }
`;

