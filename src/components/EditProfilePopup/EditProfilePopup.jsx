import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSend,
}) {
  const { values, error, isValid, isInputValid, handleChange, reset, setValue } =
    useFormValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValue("profilename", currentUser.name);
    setValue("profilejob", currentUser.about);
  }, [currentUser, setValue, isOpen]);

  function resetForClose() {
    onClose();
    reset({ profilename: currentUser.name, profilejob: currentUser.about });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(
      { profilename: values.profilename, profilejob: values.profilejob },
      reset
    );
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      isSend={isSend}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`popup__text ${
          isInputValid.profilename === undefined || isInputValid.profilename
            ? " "
            : "popup__text_invalid"
        }`}
        placeholder="Жак-Ив Кусто"
        name="profilename"
        id="profilename"
        minLength={2}
        maxLength={40}
        required
        disabled={isSend}
        value={values.profilename ? values.profilename : ""}
        onChange={handleChange}
      />
      <span className="error-message" id="error-profilename">
        {error.profilename}
      </span>
      <input
        type="text"
        className={`popup__text  popup__text_type_job ${
          isInputValid.profilejob === undefined || isInputValid.profilejob
            ? " "
            : "popup__text_invalid"
        }`}
        placeholder="Исследователь океана"
        name="profilejob"
        id="profilejob"
        minLength={2}
        maxLength={200}
        required
        autoComplete="off"
        disabled={isSend}
        value={values.profilejob ? values.profilejob : ""}
        onChange={handleChange}
      />
      <span className="error-message" id="error-profilejob">
        {error.profilejob}
      </span>
    </PopupWithForm>
  );
}
