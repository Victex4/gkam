import { list } from "postcss"
import { IoIosArrowForward } from "react-icons/io"
import { notes, shortcutLink } from "../../conts/Dash"
import Title from "../../ui/Title"

const ShortCut = ({ platform }) => {
  return (
    <div className="flex gap-4 flex-col bg-[#FFF5FF] rounded-lg p-3">
      <h2 className="font-bold">Note for {platform}</h2>
      <ul className="list-disc ml-4">
        {notes[platform]?.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </div>
  )
}

export default ShortCut
