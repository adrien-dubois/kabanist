import styled from 'styled-components';

export const Background = styled.div`
    width           : 100vw;
    height          : 100vh;
    backdrop-filter : blur(2px);
    display         : flex;
    background-color: rgba(0, 0, 0, 0.8);
    position        : fixed;
    justify-content : center;
    align-items     : center;
    top             : 0;
    right           : 0;
    left            : 0;
    z-index         : 5;
`;

export const Div = styled.div`
    width           : 60%;
    height          : 80%;
    border-radius   : 12px;
    background-color: ${props => props.theme.modalKanbanBg};
    box-shadow      : rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display         : flex;
    flex-direction  : column;
    padding         : 25px;
    color: ${props => props.theme.primary};

    .ck.ck-editor__main>.ck-editor__editable {
        background-color: transparent;
        border: none;
        outline: none;
    }

    .ck.ck-editor__main>.ck-editor__editable.ck-focused {
        border: none;
    }

    .ck.ck-toolbar .ck.ck-toolbar__separator {
        background-color: transparent;
    }

    .ck.ck-toolbar.ck-toolbar_grouping {
        background-color: transparent;
        border: none;
    }

    .ck.ck-button,
    .ck.ck-button.ck-on {
        color: ${props => props.theme.primary};
        background-color: transparent;
    }

    .ck.ck-button:hover,
    .ck.ck-button.ck-off:hover,
    .ck.ck-button.ck-on:hover {
        background-color: transparent !important;
        cursor: pointer;
        /* color: gray; */
        color: ${props => props.theme.ckEditorGrey};
    }

    .ck-dropdown__panel .ck.ck-button.ck-off.ck-button__with-text {
        background-color: ${props => props.theme.ckEditorBanner} !important;
        z-index: 5;
    }
    
    .ck.ck-list__item {
        background-color: ${props => props.theme.ckEditorBanner} !important;
        z-index: 9999 !important;
    }
    
    .ck-dropdown__panel .ck-dropdown__panel-visible {
        z-index: 9999 !important;
        border: none;
    }

    .ck-editor__top {
        position     : sticky !important;
        top          : 0 !important;
        background   : ${props => props.theme.ckEditorBanner} !important;
        border-radius: 5px;
    }

    .ck.ck-content ul,
    .ck.ck-content ul li {
    list-style-type: disc ;
    }

    .todo-list,
    .todo-list li{
        list-style-type: none !important;
    }

    .ck-content .todo-list .todo-list__label>input:before {
        border: 1px solid ${props => props.theme.primary} !important;
    }

    .ck.ck-content ul {
        padding-left: 40px;
    }

    .ck.ck-content ol,
    .ck.ck-content ol li {
        list-style-type: decimal;
    }
    .ck.ck-content ol {
        padding-left: 40px;
    }
    
    .ck-content .todo-list .todo-list__label>input[checked]:before{
        background: #FAFAFA;
    }
    
    .ck-content .todo-list .todo-list__label>input[checked]:after{
        border-color: #000 !important;
    }

    // EMBED HTML
    .ck-widget.raw-html-embed{

        background-color: transparent !important;
    }

    .ck .ck-widget.ck-widget_selected, .ck .ck-widget.ck-widget_selected:hover {
        outline: var(--ck-widget-outline-thickness) solid ${props => props.theme.ckEditorBanner};
    }

    .ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected, .ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected:hover {
        outline-color: ${props => props.theme.btnHover};
    }

    .ck-widget.raw-html-embed:not(.ck-widget_selected):not(:hover) {
        outline: var(--ck-html-embed-unfocused-outline-width) dashed ${props => props.theme.ckEditorBanner};
    }

    .ck .ck-widget:hover {
        outline-color: ${props => props.theme.btnHover};
    }

    .ck .ck-widget.ck-widget_with-selection-handle:hover>.ck-widget__selection-handle {
        background-color: ${props => props.theme.btnHover};
    }

    .ck .ck-widget:not(.ck-widget_selected)>.ck-widget__type-around>.ck-widget__type-around__button {
        background: ${props => props.theme.btnHover};
    }

    .ck-widget.raw-html-embed .raw-html-embed__source[disabled] {
        -webkit-text-fill-color: var(--ck-html-embed-source-disabled-color);
        background: transparent;
        color: ${props => props.theme.primary};
        opacity: 1;
    }

    .ck.ck-input {
        border: ${props => props.theme.genericBorder};
        color: ${props => props.theme.primary};
        background: transparent;
    }


        .delete-picto{
            display        : flex;
            align-items    : center;
            justify-content: flex-end;
            width          : 100%;
            cursor         : pointer;

            svg{
                color: var(--error-color);
            }
        }

        .modal{
            display: flex;
            height: 100%;
            flex-direction: column;
            padding: 2rem 5rem 2rem;

            .title{
                padding         : 0.5rem;
                border          : none;
                font-size       : 1.8rem;
                font-weight     : 700;
                color           : ${props => props.theme.primary};
                background-color: transparent;
                width           : 100%;
                border-radius   : 4px;
                margin-bottom   : 10px;

                &:focus{
                    border: ${props => props.theme.genericBorder};
                }
            }

            &__task{
                font-weight: 700;
                font-family: var(--barlow);
                padding: 0.5rem;
            }

            &__editor{
                height    : 80%;
                overflow-x: hidden;
                overflow-y: auto;
                position  : relative;
            }

            .divider{
                margin: 1.5rem 0;
                border: ${props => props.theme.genericBorder};
            }
        }

`;

