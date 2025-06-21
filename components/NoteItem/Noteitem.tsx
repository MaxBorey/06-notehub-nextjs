import { Note } from "../../types/TEST";

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