import styled, { keyframes } from 'styled-components'

type Props = {
    onClick: () => void,
    loading: string,
    text: string
}

const ButtonLoading = ({ onClick, loading, text }: Props) => {
  return  (
    <Button onClick={onClick}>
      <LoadingSpinner loading={loading} />
      <ButtonText loading={loading}>
        {text}
      </ButtonText>
    </Button>
  )
}

export default ButtonLoading

const ButtonText = styled.p<{loading: string}>`
font-weight     : bold;
transition      : opacity 200ms;
transition-delay: ${({ loading }) => (loading === 'true' ? '0ms' : '200ms')};
width           : 100%;
opacity         : ${({ loading }) => (loading === 'true' ? 0 : 1)};
`

const rotate = keyframes`
    100% {
    transform: rotate(360deg);
    }
}`

const LoadingSpinner = styled.div<{loading: string}>`
  border                   : 4px solid rgba(255, 255, 255, 0.5);
  border-radius            : 50%;
  border-top-color         : white;
  opacity                  : ${({ loading }) => (loading === 'true' ? 1 : 0)};
  position                 : absolute;
  left                     : 25%;
  right                    : 25%;
  top                      : 25%;
  bottom                   : 25%;
  margin                   : auto;
  width                    : 16px;
  height                   : 16px;
  transition               : opacity 200ms;
  animation                : ${rotate} 1s linear;
  animation-iteration-count: infinite;
  transition-delay         : ${({ loading }) => (loading === 'true' ? '200ms' : '0ms')};
`;

const Button = styled.button`
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