
type Props = {
    icon: JSX.Element;
    text: string;
    onClick: () => void; 
}

const DropdownItem = ({icon, text, onClick}: Props) => {
  return (
    <li onClick={onClick} >
        
            <button>
                { icon }{ text }
            </button>
        
    </li>
  )
}

export default DropdownItem