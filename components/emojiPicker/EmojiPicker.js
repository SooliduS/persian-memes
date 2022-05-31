import { useState , useEffect } from 'react';
import Picker from 'emoji-picker-react';

const EmojiPicker = ({setEmoji}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  useEffect(() => {
      setEmoji(chosenEmoji);
  } , [chosenEmoji])

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default EmojiPicker