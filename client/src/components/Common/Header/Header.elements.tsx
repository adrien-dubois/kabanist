import styled from 'styled-components';
import { mixins } from "../../../utils/mixins";

export const Container = styled.header`

    border-bottom  : ${props => props.theme.headerBorder};
    background     : ${props => props.theme.headerBg};
    transition     : height 200ms ease-in;
    box-shadow     : ${props => props.theme.headerBxShadow};
    backdrop-filter: ${props => props.theme.filterHeader}
    height         : 44px;
    z-index        : 5;
    width          : 100%;

    @media (max-width: 900px) {
        padding: 0 10px;
    }

    nav {
        display              : grid;
        align-items          : center;
        grid-template-columns: 1fr 1fr;
        grid-template-rows   : 1fr;
        grid-column-gap      : 0px;
        grid-row-gap         : 0px;
        margin               : auto;
        width: 100%;
        height               : 44px;

        p, li {
            color: white;
        }



        .logo{
            grid-area   : 1/1;
            display     : flex;
            align-items : center;
            justify-content: center;
            width: 266px;

            p{
                margin-top    : 0.3rem;
                text-transform: uppercase;
                font-weight   : 700;
                ${mixins.noSelect}
                font-size: 1.2rem;
                font-family: var(--rubik);
            }
        }
        

        .settings{
            grid-area : 1/2;
            text-align: right;
            margin-right: 8%;

            .list{
                float: right;
                display: flex;

                .il{
                    ${mixins.va}
                    cursor        : pointer;
                    width         : 30px;
                    height        : 30px;
                    text-align    : center;
                    vertical-align: middle;
                    float         : left;

                    &:hover{
                        border-radius   : 3px;
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }
            }

            &__user{
                    font-size   : 25px;
                    margin-right: 15px;
            }

            &__add{
                margin-right: 15px;
                font-size   : 30px;
            }


            &__darkmode{
                margin-right: 15px;
                svg{
                    width : 20px;
                    height: 20px;
                }
            }
            &__logout{
                svg{
                    width : 20px;
                    height: 20px;
                }
            }
        }
    }
`;

export const DropdownMenu = styled.div`
    position: relative;

    .menu{
        position     : absolute;
        top          : 25px;
        right        : 0px;
        padding      : 10px 20px;
        background   : ${props => props.theme.dropdownUserMenuBg };
        box-shadow   : ${props => props.theme.headerBxShadow};
        width        : 200px;
        box-sizing   : 0 5px 25px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        transition   : 0.5s ease-in-out;
        visibility   : hidden;
        opacity      : 0;
        
        &.active{
            visibility: visible;
            opacity   : 1;
            top       : 55px;
        }

        &::before{
            content   : '';
            position  : absolute;
            top       : -5px;
            right     : 20px;
            height    : 20px;
            width     : 20px;
            background: ${props => props.theme.dropdownUserMenuBg };
            transform : rotate(45deg);
        }
    
        h3{
            width      : 100%;
            text-align : center;
            font-size  : 18px;
            padding    : 20px 0;
            font-weight: 600;
            color      : ${props => props.theme.primary};
            line-height: 1.2rem;
        }
    
        &__ul{
            li{
                padding    : 10px 0;
                border-top : ${props => props.theme.genericBorder};
                display    : flex;
                align-items: center;
                flex-wrap  : wrap;
    
                button{
                    display        : inline-flex;
                    align-items    : center;
                    justify-content: center;
    
                    svg{
                        margin-right: 10px;
                        transition  : .3s ease-in-out;
                    }
                }
    
                a, button{
                    color      : ${props => props.theme.primary};
                    font-size  : 16px;
                    font-family: var(--barlow);
                    font-weight: 500;
                    border     : none;
                    outline    : 0;
                    background : 0 0;
                    cursor     : pointer;
                    transition : .3s ease-in-out;
                }
    
                &:hover{
                    svg, a, button{
                        opacity: .8;
                    }
                }
    
            }
    
        }
    }


`;