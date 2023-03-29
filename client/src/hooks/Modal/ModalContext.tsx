import { ComponentProps, createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from "react";
import Modal from "./Modal";

type Params = Partial<
    Omit<ComponentProps<typeof Modal>, "showModal"| "onConfirm"| "onCancel"
>>;

const defaultFunction = (props: Params) => Promise.resolve(true);

const defaultValue = {
    confirmRef: {
        current: defaultFunction
    }
}

const ModalContext = createContext(defaultValue);

export function ModalContextProvider({children} : PropsWithChildren) {
    const confirmRef = useRef(defaultFunction)

    return <ModalContext.Provider value={{confirmRef}}>
        { children  }
        <ConfirmModalWithContext />
    </ModalContext.Provider>
}

function ConfirmModalWithContext() {
    const [open, setOpen] = useState<boolean>(false);
    const [props, setProps] = useState<undefined | Params>({});
    const resolveRef = useRef<any>((value: boolean) => {});

    const { confirmRef } = useContext(ModalContext);
    confirmRef.current = (props: Params) => 
      new Promise(resolve => {
        setProps(props)
        setOpen(true);
        resolveRef.current = resolve;
    });

    return <Modal 
                onCancel={() => {
                    resolveRef.current(false);
                    setOpen(false)
                }}
                onConfirm={() => {
                    resolveRef.current(true);
                    setOpen(false)
                }} 
                showModal={open}
                { ...props }
            />
}

export function useModal(){
    const { confirmRef } = useContext(ModalContext);
    return{
        modal: useCallback((p: Params) => {
            return confirmRef.current(p)
        }, [confirmRef])
    }
} 