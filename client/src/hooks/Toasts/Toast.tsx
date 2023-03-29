import { Div } from "./Toast.elements";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type Props = {
    title?: string;
    content: string;
    type?: "success" | "danger";
}

const Toast = ({title, content, type = "success"}: Props) => {
  return (
    <Div type={type}>
        <div className="toast">
            <span className="toast__right-border"></span>
            <div className="toast__icon-holder">
                <span className="state-icon">
                    {type === 'danger' ?
                        <FaExclamation/> : <FaCheck/> 
                    }
                </span>
            </div>

            <div className="toast__text-container">
                {title && (
                    <p className="toast-title">
                        <strong>{title}</strong>
                    </p>
                )}
                <p className="toast-text">
                    {content}
                </p>
            </div>

            <div className="toast__close-icon-holder">
                <span className="close-icon">
                    <IoMdClose/>
                </span>
            </div>
        </div>
    </Div>
  )
}

export default Toast

