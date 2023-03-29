import { Title } from "./Kanban.elements"
import { MdAddCircleOutline } from 'react-icons/md'
import { FaRegTrashAlt } from "react-icons/fa"

type Props = {
    value: string | number | readonly string[] | undefined,
    placeholder: string | undefined,
    delAction: () => void,
    addAction: () => void,
    updateTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TitleSection = ({value, placeholder, delAction, addAction, updateTitle} : Props) => {
  return (
    <Title>
        <input
            value={value}
            placeholder={placeholder}
            onChange={ updateTitle }
        />
        <div className="pictos">
            <MdAddCircleOutline onClick={addAction} />
            <FaRegTrashAlt onClick={delAction} />
        </div>
    </Title>
  )
}

export default TitleSection