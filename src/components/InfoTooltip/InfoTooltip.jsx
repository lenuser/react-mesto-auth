import Popup from '../Popup/Popup.jsx'


export default function InfoTooltip({name, isSuccessful, isOpen, onClose}) {
   
    return (
        <Popup  name = {name} isOpen={isOpen} onClose={onClose}>

            <div className= {` popup__registration-img ${!isSuccessful ? 'popup__registration-img_type_error' : ''}`}/>
            <h2 className='popup__registration-title'>{isSuccessful ? 
            'Вы успешно зарегистрировались' : "Что-то пошло не так!Попробуйте еще раз."}</h2>

        </Popup>
    )}

   