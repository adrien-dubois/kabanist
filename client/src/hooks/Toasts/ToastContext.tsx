import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from 'react';
import Toast from './Toast';

type Params = ComponentProps<typeof Toast> & { duration?: number }
type ToastItem = ComponentProps<typeof Toast> & { id: number, timer: ReturnType<typeof setTimeout> }

const defaultPush = (toast: Params) => {}

const defaultValue = {
    pushToastRef: { current: defaultPush }
}


const ToastContext = createContext(defaultValue);

export const ToastContextProvider = ({children} : PropsWithChildren) => {
    const pushToastRef = useRef(defaultPush)

    return <ToastContext.Provider value={{ pushToastRef }} >
        <Toasts/>
        { children }
    </ToastContext.Provider>
}

export function useToasts() {
    const { pushToastRef } = useContext(ToastContext)
    return {
        pushToast: useCallback(
            (toast: Params) => {
                pushToastRef.current(toast)
        }, [pushToastRef])
    }
}

function Toasts(){
    const [toasts, setToasts] = useState([] as ToastItem[])
    const { pushToastRef } = useContext(ToastContext);

    pushToastRef.current = ({ duration, ...props }: Params) => {
        
        const id = Date.now();

        const timer = setTimeout(() => {
            setToasts((value) => value.filter((t) => t.id !== id))
        }, (duration ?? 2) * 2000)    

        const toast = { ...props, id, timer };

        setToasts(v => [...v, toast]);

    };

    const onRemove = ( toast: ToastItem ) => {
        clearTimeout(toast.timer);
        setToasts((value) => value.filter((t) => t !== toast))
    }

    return (
        <div className="toast-container">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        onClick={() => onRemove(toast)}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        key={toast.id}
                    >
                        <Toast {...toast}/>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}