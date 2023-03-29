import styled from 'styled-components';

export const Card = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    width: 220px;
    border-radius: 6px;
    background-color: ${props => props.theme.squareHover};
    
    span{
        color: ${props => props.theme.primary};
        font-weight: 500;
        font-family: var(--barlow);
    }
`;