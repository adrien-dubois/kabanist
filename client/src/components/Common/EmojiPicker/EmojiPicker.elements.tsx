import styled from 'styled-components';

export const Div = styled.div`
    position: relative;
    width   : max-content;

    h3{
        font-size: 2rem;
        font-weight: 500;
        cursor     : pointer;
    }

    .picker{
        display : none;
        position: absolute;
        top     : 100%;
        z-index : 9999;

        &.show{
            display: block;
        }
    }
`;