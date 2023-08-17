//import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from '../Input/Input.jsx'
import { memo, useEffect } from "react";



const EditAvatarPopup = memo (({isOpen,onClose,onUpdateAvatar}) => {
  // const input = useRef();
  const { handleChange, values, error, isValid, isInputValid, reset } = useFormValidation();

    useEffect(() => {
      if(isOpen){
        reset()
      }
    },[isOpen, reset])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: values.avatar });
  }

  return (
    <PopupWithForm
      name="popup_type_avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        className={`popup__text popup__text_type_avatar ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? " "
            : "popup__text_invalid"
        }`}
        type="url"
        required
        placeholder="Ссылка на картинку"
        name="avatar"
        id="avatar"
        minLength={2}
        autoComplete="off"
        onChange={handleChange}
        value={values.avatar}
        error = {error.avatar}
        isInputValid = {isInputValid.avatar}
      />
    </PopupWithForm>
  );
})
export default EditAvatarPopup;