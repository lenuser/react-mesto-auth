export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_image popup_type_bg ${
        isOpen && "popup_opened"
      }`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__close-button popup__close-button_type_img "
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <img
          className="popup__img"
          src={card.link ? card.link : "#"}
          alt={card.name ? `Изображение ${card.name}` : "#"}
        />
        <figcaption className="popup__title popup__title_type_size">
          {card.name}
        </figcaption>
      </div>
    </div>
  );
}
