import styled, { keyframes } from "styled-components";

const spin = keyframes`
    { to{transform: rotate(1turn)} }
`;

export const Box = styled.div`
    display        : flex;
    align-items    : center;
    justify-content: center;
    width          : 100%;
    height         : 100vh;
    position       : absolute;
    top            : 50%;
    left           : 50%;
    transform      : translate(-50%, -50%);
`;

export const Spinner = styled.div`
    width        : 50px;
    padding      : 8px;
    aspect-ratio : 1;
    border-radius: 50%;
    background   : #25B09B;

    -webkit-mask: var(--_m);
          mask: var(--_m);
    -webkit-mask-composite: source-out;
          mask-composite: subtract;
    animation: ${spin} 1s infinite linear ;
`;