import { memo } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'

const DeletePopup = memo(({isOpen,onClose,onSubmit}) => {

function handleSubmit(evt){
    evt.preventDefault()
    onSubmit()
}

  return (
    <PopupWithForm 
    name= "popup_type_delete"
    title='Вы уверны?'
    titleButton='Да'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    />
  )
})



export default DeletePopup;