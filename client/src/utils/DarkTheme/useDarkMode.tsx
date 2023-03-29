import { useEffect, useState } from "react"

/**
 * Personnal hook to set the dark or light mode with styled component
 * @returns 
 */
export const useDarkMode = (): [string, (() => void), boolean] => {
    const [theme, setTheme] = useState<string>('');
    const [mountedComponent, setMountedComponent] = useState<boolean>(false);

    // Set the Mode in localStorage
    const setMode = (mode: string) => {
        localStorage.setItem("theme", mode);
        setTheme(mode);
    }

    // If Dark mode is enabled in Chrome, get it
    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Change theme
    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light');
    };

    useEffect(() => {
        // If there is already a defined theme biy the app get it
        const localTheme = localStorage.getItem('theme');

        // If there is no theme defined by the app, we will check the user preferences and set the theme in function of it
        if(!localTheme){
            if(prefersDark){
                setTheme("dark");
                setMode("dark");
            }
            else if(!prefersDark){
                setTheme("light");
                setMode("light");
            }
        }

        // Finally set the theme et declare that component is mounted
        localTheme && setTheme(localTheme);
        setMountedComponent(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [theme, themeToggler, mountedComponent];
 }