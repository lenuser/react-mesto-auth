
import  SendContext  from "../../contexts/SendContext";
import  React, { useContext } from 'react';
 

export default function Form({name, titleButton, children, onSubmit, isValid}) {
    const isSend = useContext(SendContext)


  return (
      <form   noValidate name={name} onSubmit={onSubmit} >
    {children}
   
    {{login:
       <button 
       className={`login__button ${isSend ? 'login__button_loading' : ''} ${ isValid ? '' : 'login__button_disable'}`}
       disabled = {isSend || !isValid }>
        {isSend ? '' : titleButton || 'Сохранить'}
       </button>,
       
       popup:
       <button 
       className={`popup__button ${isSend ? 'popup__button_loading' : ''} ${ isValid ? '' : 'popup__button_disable'}`}
       disabled = {isSend || !isValid }>
        {isSend ? '' : titleButton || 'Сохранить'}
       </button>
    }
    [`${name === 'signin' || name === 'signup' ? 'login' : 'popup' }`]}


    </form>
  )
}