import styled, { createGlobalStyle } from "styled-components";
import { variables } from "./utils/mixins";

const GlobalStyle = createGlobalStyle`
:root{
        /*----- FONTS -----*/
        --roboto: 'Roboto', sans-serif;
        --barlow: 'Barlow', sans-serif;
        --rubik : 'Rubik',  sans-serif;

        /*----- COLORS -----*/
        --black         : #242d49;
        --white         : #FAECD9;
        --yellow        : #f5c32c;
        --orange        : #fca61f;
        --gray          : rgba(36, 45, 73, 0.65);
        --profileShadow : 0px 4px 17px 2px rgba(0, 0, 0, 0.25);
        --darkBg        : #0F0E13;
        --hrColor       : #cfcdcd;
        --hrBlack       : #4d4d4e ;
        --cardColor     : rgba(255, 255, 255, 0.64);
        --cardColorBlack: rgba(0, 0, 0, 0.205);
        --error-color   : #F43B47;
        --_m: conic-gradient(#0000 10%,#000),
            linear-gradient(#000 0 0) content-box;
        /*----- GRADIENT ------*/
        --dark-welcome: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
    }

        * {
            margin         : 0;
            padding        : 0;
            list-style-type: none;
            list-style     : none;
            outline        : none;
            border         : none;
            text-decoration: none;
        }
        html {
            overscroll-behavior: contain;
            overflow           : hidden;
            box-sizing         : border-box;
            height             : 100%;
            font-size          : 16px;
            @media (prefers-reduced-motion: no-preference) {
                scroll-behavior: smooth;
            }
        }

        body{
            margin                 : 0;
            height: 100%;
            padding                : 0;
            line-height            : 1;
            font-smooth            : always;
            font-family            : var(--roboto);
            -webkit-font-smoothing : antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow               : hidden;
            display                : block;
            
            @media screen and (max-width: 1200px){
                overflow: visible;
            }
        }

        textarea, input{
            font-family: var(--ubuntu-font);
        }

        .toast-container{
            position: fixed;
            right   : 20px;
            top     : 20px;
            z-index : 999;
        }
`;

export default GlobalStyle;

export const Btn = styled.button<{width: string}>`
    width           : ${props => props.width };
    background-color: ${variables.genericBg};
    color           : #FFF;
    border          : 1px solid transparent;
    margin-right    : 5px;
    margin-top      : 10px;
    font-weight     : bold;
    font-size       : 1rem;
    line-height     : 17px;
    padding         : 6px 12px 7px 12px;
    position        : relative;
    display         : inline-block;
    white-space     : nowrap;
    border-radius   : 3px;
    text-decoration : none;
    text-align      : center;
    cursor          : pointer;
`;

export const Button = styled.button`
    bottom    : none;
    outline   : none;
    background: transparent;
    cursor    : pointer;

    svg {
        margin-bottom: .2rem;
        color        : #000;
        font-size    : 1.2rem;
    }
`;

export const lightTheme = {
    primary           : "#202020",
    bgColor           : "#FAFAFA",
    primaryBg         : "#FFF",
    genericBorder     : '1.5px solid #F1F1F1',
    bgImage           : "",
    sidebarBg         : '#FAFAFA',
    modalKanbanBg     : '#FAFAFA',
    sidebarIcons      : '#555',
    headerBg          : "#DB4C3F",
    headerBorder      : "1px solid #CA2100",
    headerBxShadow    : "0 1px 2px rgba(0, 0, 0, 0.15)",
    filterHeader      : '',
    addTask           : "#545454",
    btnHover          : '#999',
    btnBgHover        : '',
    activeProject     : '#FFF',
    squareHover       : '#f5f5f5',
    thumb             : '#b9b9b9',
    ckEditorGrey      : 'darkslategray',
    ckEditorBanner    : '#f0f0f0',
    dropdownUserMenuBg: '#FAFAFA',
}

export const darkTheme = {
    primary           : "#FAFAFA",
    bgColor           : "var(--darkBg)",
    primaryBg         : "var(--darkBg)",
    genericBorder     : '1.5px solid #202020',
    bgImage           : "var(--dark-welcome)",
    sidebarBg         : 'rgba(255, 255, 255, 0.2)',
    modalKanbanBg     : '#292929',
    sidebarIcons      : '#FFF',
    headerBg          : "rgb(39, 51, 89, 0.4)",
    headerBorder      : "1px solid rgba(0, 0, 0, 0.2)",
    headerBxShadow    : "0 4px 30px rgba(0, 0, 0, 0.2)",
    filterHeader      : 'blur(5px)',
    addTask           : "#FAFAFA",
    btnHover          : '#202020',
    btnBgHover        : '#202020',
    activeProject     : '#202020',
    squareHover       : 'rgba(255, 255, 255, 0.2)',
    thumb             : 'darkslategray',
    ckEditorGrey      : 'gray',
    ckEditorBanner    : '#202020',
    dropdownUserMenuBg: 'rgb(39, 51, 89, 0.4)',
}