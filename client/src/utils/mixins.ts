
import { css } from "styled-components";

export const variables = {
    genericBoxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0 ,0 ,0 , 0.1) 0px 4px 11px',
    genericBorder: '1px solid #F1F1F1',
    genericBg: '#DB4C3F'
};

export const vaVars = {
    vaAlign: 'center'
}

export const mixins = {
    boxOverlay : () => css`
        box-shadow: ${variables.genericBoxShadow};
        position: absolute;
        width: 100%;
        z-index: 1;
        top: 95px;
        border-radius: 3px;
    `,

    va : () => css<{position: string}>`
        display: flex;
        align-items: center;
        justify-content: left;

        ${({position}) => {
            switch(position) {
                case 'center':
                    return css`
                        justify-content: center;
                    `;
                default:
                    return css``;
            }
        }}
    `,

    noSelect : () => css`
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    `,

    cancel: () => css`
        color: #555;
        cursor: pointer;
        font-size: 14px;
        margin: 2px 5px;
    `,

    taskItem : () => css`
        list-style-type: none;
        display: flex;
        line-height: 18px;
        color: #333;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 14px;
        border-bottom: 1px solid #F0F0F0;
        padding-left: 10px;
        cursor: pointer;
    `,

}
