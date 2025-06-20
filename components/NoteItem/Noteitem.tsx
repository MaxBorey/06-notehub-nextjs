import { Note } from "../../types/Note";

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li>
      <p>{item.title}</p>
    </li>
  );
}

export default NoteItem;