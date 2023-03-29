import styled from "styled-components";

export const Container = styled.main`
    color: #202020;
    background-image: ${props => props.theme.bgImage};
    background-color: ${props => props.theme.bgColor};
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Div = styled.section`
    display: grid;
    align-items: center;
    grid-template-columns: 266px 1fr;
    height: calc(100vh - 44px);
`;