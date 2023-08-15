import { useEffect, useState } from "react";
import hard from "../../images/hard.svg";
import api from "../../utils/api";

export default function Likes({ likes, myid, cardId }) {
  const [isLikes, setIsLikes] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLikes(likes.some((element) => myid === element._id));
  }, [likes, myid]);

  function handleLike() {
    if (isLikes) {
      api
        .deleteLike(cardId)
        .then((res) => {
          setIsLikes(false);
          setCount(res.likes.length);
        })
        .catch((error) => console.error(`Ошибка при снятии лайка $[error]`));
    } else {
      api
        .addLike(cardId)
        .then((res) => {
          setIsLikes(true);
          setCount(res.likes.length);
        })
        .catch((error) => console.error(`Ошибка при установе лайка $[error]`));
    }
  }

  return (
    <>
      <button
        className={`element__group-hard ${
          isLikes ? "element__group-hard_active" : " "
        }`}
        type="button"
        onClick={handleLike}
      >
        <img src={hard} alt="лайк" />
      </button>
      <span className="element__counter"> {count}</span>
    </>
  );
}
