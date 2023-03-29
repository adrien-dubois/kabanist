import styled from 'styled-components';
import { mixins } from '../../../utils/mixins';

export const Wrapper = styled.div.attrs({
    className: 'sidebar'
})`
        ${mixins.noSelect}
        width           : 266px;
        height          : 100%;
        /* margin-top      : -55px; */
        /* position        : fixed; */
        overflow-x      : hidden;
        overflow-y      : hidden;
        border-right    : ${props => props.theme.genericBorder};
        background-color: ${props => props.theme.sidebarBg} ;

        .sidebar{
            &__project {
                margin-left: 1.5rem;

                &-name{
                    white-space  : nowrap;
                    overflow     : hidden;
                    text-overflow: ellipsis;
                }

                &-delete{
                    margin-left: auto;
                    display    : none;

                    svg{
                        color: #CACACA;
                    }

                }

                &.active, &:hover{
                    font-weight: bold;
                    background-color: ${props => props.theme.activeProject};
                }

                &:nth-child(1){
                    .sidebar__dot{
                        color: #6ACCBC;
                    }
                }
                &:nth-child(2){
                    .sidebar__dot{
                        color: #FAD003;
                    }
                }
                &:nth-child(3){
                    .sidebar__dot{
                        color: #FF8D85;
                    }
                }
                &:nth-child(4){
                    .sidebar__dot{
                        color: #FF9932;
                    }
                }
                &:nth-child(5){
                    .sidebar__dot{
                        color: #AF38EB;
                    }
                }

            }

        &__top, &__projects{
            position: relative;
        

            li{
                color          : ${props => props.theme.primary};
                display        : flex;
                align-items    : center;
                justify-content: flex-start;
                font-weight    : 500;
                line-height    : 1.5;
                font-size      : 1rem;
                padding-left   : 0;
                padding-right  : 0;
                border-radius  : 10px 0 0 10px;
                margin-top: 0.2rem;
                margin-bottom: 0.2rem;

                a{
                    color      : ${props => props.theme.primary};
                    display    : flex;
                    align-items: center;
                }

                div:nth-child(1) {
                    display: flex;
                    padding: 10px 0 10px 10px;
                    width  : 100%;

                    span:first-of-type{
                        margin-right: 10px;
                        display     : flex;
                        align-items : center;
                        
                        svg{
                            width : 18px;
                            height: 18px;
                            color : ${props => props.theme.sidebarIcons};
                        }
                    }
                }
            }
        }

        &__dot{
            /* padding-left : 12px; */
            /* margin-right: 10px; */
            font-size   : 2rem;
            visibility: hidden;
        }

        &__middle{
            margin-top   : 20px;
            margin-bottom: 20px;
            display      : flex;
            border-bottom: ${props => props.theme.genericBorder};
            padding-left : 10px;
            
            &__tab{
                display        : flex;
                align-items    : center;;
                justify-content: space-between;
                width          : 100%;
                padding-bottom : 20px;

                .projectbar{
                    display       : flex;
                    align-items   : center;
                    vertical-align: center;
                    cursor        : pointer;
                    span{
                        color       : ${props => props.theme.primary};
                        margin-right: 10px;
                        cursor      : pointer;
                        
                        svg{
                            &.hidden-projects {
                                transform: rotate(-90deg);
                            }
                        }
                    }
                    h2{
                        cursor     : pointer;
                        color      : ${props => props.theme.primary};
                        font-size  : 15px;
                        font-weight: bold;
                    }
                }

                .add_project{
                    cursor         : pointer;
                    width          : 30px;
                    height         : 30px;
                    text-align     : center;
                    color          : ${props => props.theme.primary};
                    display        : flex;
                    justify-content: center;
                    font-size      : 30px;
                    margin-right   : 10px;

                    &:hover{
                        border-radius   : 3px;
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }
                
            }
        }
    }
`;