import styled from "styled-components";

export const Div = styled.div<{type: string}>`
    position      : relative;
    margin-bottom : 1rem;
    width         : 320px;
    display       : flex;
    flex-direction: column-reverse;
    gap           : 12px;
    direction     : rtl;
        .toast{
            width           : 320px;
            height          : 80px;
            background-color: #fff;
            box-shadow      : 0px 0px 10px #0000001A;
            border-radius   : 10px;
            display         : flex;
            align-items     : stretch;
            text-align      : left;
            gap             : 12px;

            &__right-border{
                width           : 6px;
                border-radius   : 0 10px 10px 0;
                margin          : 0 0 0 2px;
                background-color: ${({type}) => type === 'danger' ? '#F43B47' :'#0ABF30' };
            }

            &__icon-holder{
                width      : 40px;
                display    : grid;
                place-items: center;
                
                .state-icon{
                    width           : 40px;
                    height          : 40px;
                    display         : grid;
                    place-items     : center;
                    border-radius   : 50%;
                    background-color: ${({type}) => type === 'danger' ? '#F43B47' :'#0ABF30' };

                    svg{
                        color: #FFF;
                    }
                }
            }

            &__text-container{
                display        : flex;
                flex-direction : column;
                justify-content: center;
                gap            : 6px;
                flex           : 1;

                .toast-title{
                    font-size: 12px;
                }

                .toast-text{
                    font-size: 13px;
                    color    : #18181A;
                }
            }

            &__close-icon-holder{
                padding: 12px;

                .close-icon{
                    width           : 22px;
                    height          : 22px;
                    background-color: #F1F1F1;
                    border-radius   : 50%;
                    display         : grid;
                    place-items     : center;
                    cursor          : pointer;
                }
            }
        }
`;