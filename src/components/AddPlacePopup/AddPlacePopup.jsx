import { memo, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from '../Input/Input.jsx'

 const AddPlacePopup = memo (({ isOpen, onClose, onAddPlace }) => {
  const { values, error, isValid, isInputValid, handleChange, reset } = useFormValidation();

useEffect(() => {
  if(isOpen){
    reset()
  }
},[isOpen, reset])

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({nameCardsInput: values.nameCardsInput,linkCardsInput: values.linkCardsInput });
  }

  return (
    <PopupWithForm
      name="popup_type_cards"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        className={`popup__text ${
          isInputValid.nameCardsInput === undefined || isInputValid.nameCardsInput
            ? " "
            : "popup__text_invalid"
        }`}
        required
        placeholder="Название"
        name="nameCardsInput"
        id="nameCardsInput"
        minLength={2}
        maxLength={40}
        autoComplete="off"
        onChange={handleChange}
        value={values.nameCardsInput }
        error = {error.nameCardsInput}
        isInputValid = {isInputValid.nameCardsInput}
      />
      <input
        type="url"
        className={`popup__text popup__text_type_link ${
          isInputValid.linkCardsInput === undefined || isInputValid.linkCardsInput
            ? " "
            : "popup__text_invalid"
        }`}
        required
        placeholder="Ссылка на картинку"
        name="linkCardsInput"
        id="linkCardsInput"
        minLength={2}
        autoComplete="off"
        onChange={handleChange}
        value={values.linkCardsInput}
        error = {error.linkCardsInput}
        isInputValid = {isInputValid.linkCardsInput}
      />
    </PopupWithForm>
  );
})
export default AddPlacePopup;