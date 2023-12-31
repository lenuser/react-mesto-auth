
export default function Popup ({name, children, isOpen, onClose}) {
    return(
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`} onMouseDown={onClose}>
        
        <div className={`${name === 'img' ? 'popup__img-container' : 'popup__form'}${name === 'result' ? 
        'popup__container_type_registration': ''}`} onMouseDown={(evt) => evt.stopPropagation()} >
            <button className="popup__close-button" type="button" onClick={onClose} />
{children}
</div>
</div>
    )
    }