import Form from '../Form/Form.jsx'
import Popup from '../Popup/Popup.jsx'


export default function PopupWithForm({name, title, titleButton,children,isOpen,onClose,onSubmit,isSend,isValid = true,
}) {
  return (

//     <Popup
//     name= {name}
//     isOpen={isOpen}
//     onClose={onClose}
//     >
// <h2  className={`popup__title ${name === "popup_type_delete" && "popup__title_type_change"}`} >{title}</h2>
// <Form
//  name= {name}
//  titleButton={titleButton}
//  children={children}
//  onSubmit= {onSubmit}
//  isSend={isSend}
//  isValid={isValid}
//  />

    <Popup>
     <div
       className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
       onClick={onClose}>
       <form
         className="popup__form"
         name={name}
         autoComplete="off"
         noValidate
         onClick={(evt) => evt.stopPropagation()}
         onSubmit={onSubmit}
       >
         <button className="popup__close-button"type="button"onClick={onClose}></button>
         <h2 className={`popup__title ${name === "popup_type_delete" && "popup__title_type_change"}`}>
           {title}
         </h2>
         {children}
         <button className={`popup__button  ${isValid ? " " : "popup__button-disabled "}`}type="submit"disabled={isSend}id="submit">
           {" "}{isSend ? "..." : titleButton || "Сохранить"}{" "}
       </button>
       </form>
     </div>
     </Popup>
  )
}
