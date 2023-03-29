import Picker from "@emoji-mart/react";
import data from '@emoji-mart/data'
import { useEffect, useState } from "react"
import { Div } from "./EmojiPicker.elements";


const EmojiPicker = (props: any) => {

  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);
  const [theme, setTheme] = useState<string | null>('');

  useEffect(() => {
    
      const currentTheme = localStorage.getItem('theme');
      if(currentTheme){
        setTheme(currentTheme);
      }
      console.log(theme)
    
      function checkTheme(event: any){
        if(event.key === 'theme' ){
          setTheme(currentTheme);
        } 
      }
    window.addEventListener("storage", checkTheme)
    return () => {
      window.removeEventListener("storage", checkTheme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('theme')])

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon])


  const selectEmoji = (e: any) => {
    const sym = e.unified.split('-')
    let codesArray: any[] = [];
    sym.forEach((el: any) => codesArray.push('0x' + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  }

  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Div>
      <h3 onClick={showPicker} >
        { selectedEmoji }
      </h3>
      <div className={ isShowPicker ? "picker show" : "picker"}>
        <Picker
          onEmojiSelect={ selectEmoji }
          locale={"fr"}
          data={data}
          theme={theme}
        />
      </div>
    </Div>
  )
}

export default EmojiPicker