import styled from 'styled-components';
import { mixins } from '../../utils/mixins';

export const Div = styled.div`
    height          : 100vh;
    display         : flex;
    justify-content : center;
    align-items     : center;
    background-image: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
    background-color: #0F0E13;

    .container{
        width                : 50vw;
        height               : 60vh;
        display              : grid;
        grid-template-columns: 100%;
        grid-template-areas  : "login";
        box-shadow           : 0 0 17px 10px rgb(255 255 255 / 20%);
        border-radius        : 20px;
        background           : white;
        overflow             : hidden;
        
        .design{
            grid-area: design;
            display  : none;
            position : relative;

            .rotate-45{
                transform: rotate(-45deg);
            }

            .pill-1{
                bottom       : 0;
                left         : -40px;
                position     : absolute;
                width        : 80px;
                height       : 200px;
                background   : linear-gradient(#1B0909, #2F3E6A, #722741);
                border-radius: 40px;
            }

            .pill-2{
                top          : -100px;
                left         : -80px;
                position     : absolute;
                height       : 450px;
                width        : 220px;
                background   : linear-gradient(#1B0909, #2F3E6A, #722741);
                border-radius: 200px;
                border       : 30px solid #E2C5E2;
            }
            .pill-3{
                top          : -100px;
                left         : 160px;
                position     : absolute;
                height       : 200px;
                width        : 100px;
                background   : linear-gradient(#1B0909, #2F3E6A, #722741);
                border-radius: 70px;
            }
            .pill-4{
                bottom       : -180px;
                left         : 220px;
                position     : absolute;
                height       : 300px;
                width        : 120px;
                background   : linear-gradient(#722741, #2F3E6A);
                border-radius: 70px;
            }
        }

        .login-error {
            font-size       : 14px;
            font-weight     : 500;
            font-style      : italic;
            color           : var(--error-color);
            padding         : 10px;
            line-height     : 1;
            width           : 60%;
            visibility      : hidden;
            text-align      : center;
            background-color: var(--hrColor);

            &.active{
                visibility: visible;
            }
        }

        .explain{
            margin    : 0 auto;
            text-align: center;
        }
        
        .login{
            grid-area      : login;
            display        : flex;
            flex-direction : column;
            align-items    : center;
            justify-content: center;
            position       : relative;
            background     : #FFF;

            .site-title{
                font-family            : var(--rubik);
                font-size              : 2.5rem;
                text-transform         : uppercase;
                background             : linear-gradient(to right,#722741, #2F3E6A, #1B0909);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                user-select            : none;
                /* margin-top: 15px; */
            }
            
            img{
                width: 15%;
            }

            
            .title{
                margin-top: 15px ;
                ${mixins.noSelect}

                &-error{
                    margin-top    : 4rem;
                    font-size     : 2rem;
                    text-transform: uppercase;
                }
            }

            .qcq{
                font-size     : 1.2rem;
                margin-top    : 1rem;
                font-style    : italic;
                text-transform: uppercase;
                font-weight   : 500;
            }
            .confirmed{
                font-size     : 1.2rem;
                margin-top    : 1.2rem;
                text-align    : center;
                font-style    : italic;
                text-transform: uppercase;
                font-weight   : 700;
            }

            .logo-checked{
                margin-top: 2rem;
                width     : 120px;
            }

            .backBtn{
                width        : 68%;
                padding      : 10px;
                color        : white;
                background   : linear-gradient(to right,#722741, #2F3E6A, #1B0909);
                border-radius: 20px;
                cursor       : pointer;
                margin-top   : 4rem;
            }

            form{
                display        : flex;
                flex-direction : column;
                align-items    : center;
                justify-content: center;
                width          : 100%;
    
                .input{
                    background   : #E6E6E6;
                    height       : 40px;
                    width        : 70%;
                    display      : flex;
                    align-items  : center;
                    border-radius: 10px;
                    padding      : 0 15px;
                    margin       : 5px 0;
                    border: 1px solid transparent;
                    
                    &.is-error{
                        border: 1px solid var(--error-color);
                    }
                    
                    svg{
                        color: #686868;
                    }
                    
                    input{
                        background : none;
                        width      : 100%;
                        height     : 95%;
                        margin-left: 10px;

                        
                        ::placeholder{
                            color: #9A9A9A;
                        }
                    }
                    
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    input:-webkit-autofill:active {
                        transition: background-color 5000s ease-in-out 0s;
                        -webkit-text-fill-color: black !important;
                    }
                }
    
                .btn{
                    width        : 68%;
                    padding      : 10px;
                    color        : white;
                    background   : linear-gradient(to right,#722741, #2F3E6A, #1B0909);
                    border-radius: 20px;
                    cursor       : pointer;
                    margin-top   : 10px;
                }

                a{
                    font-size  : 12px;
                    color      : #9A9A9A;
                    cursor     : pointer;
                    user-select: none;
                }

                .create{
                    font-size  : 12px;
                    display    : flex;
                    align-items: center;
                    position   : absolute;
                    bottom     : 20px;
                    user-select: none;
                }

                .forgot{
                    margin-top: 15px;
                }
            }
            


        }
    
        @media (min-width: 768px){
            grid-template-columns: 50% 50%;
            grid-template-areas  : "design login";

            .design{
                display: block;
            }
        }
    }
`;