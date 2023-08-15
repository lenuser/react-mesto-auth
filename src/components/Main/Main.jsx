import React,{ memo, useContext } from "react";
import pen from "../../images/pen.svg";
import plus from "../../images/pl.svg";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Spiner from "../Spiner/Spiner.jsx";
import '../Main/Main.css'
import Register from "../Register/Register";
import Login from "../Login/Login";

const Main= memo(({name,onEditAvatar,onEditProfile,onAddPlace,onDeleteClick,
  card,isLoadingCard,isCheckToken,handleLogin, handleRegister,onCardClick  })=> {
   const currentUser = useContext(CurrentUserContext);
 
  return (
     <main className="main">
      {/* {isCheckToken ? 
      <Spiner check={isCheckToken}/>
      :
      name === "main" 
       ?  */}
    { {main:
       <>
       <section className="profile">
            <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : "#"} alt="фото профиля" />
            </button>

            <div className="profile__info">
              <div className="profile__container">
                <h1 className="profile__title">{currentUser.name ? currentUser.name : " "}</h1>
                <button className="profile__edit-button" type="button">
                  <img className="profile__edit" src={pen} alt="кнопка карандашик" onClick={onEditProfile} />
                </button>
              </div>
              <p className="profile__subtitle">{currentUser.about ? currentUser.about : " "}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}>
              <img className="profile__edit-pl" src={plus} alt="кнопка плюсик" />
            </button>
          </section><ul className="elements cards-grid">{isLoadingCard ? (<Spiner />
          ) : (card.map((data) => {
            return (<li className="element__list" key={data._id}>
              <Card card={data} onCardClick={onCardClick} onDeleteClick={onDeleteClick} />
            </li>)
          })
          )}
            </ul>
            </>
            ,

            signup: <Register   name ={name} handleRegister={handleRegister}/>,
            signin: <Login name ={name} handleLogin={handleLogin}/>}[name]
          }
</main>
  )
        })

  {/* // :
  // name === "signup" ?
  // <Register   name ={name} handleRegister={handleRegister}/>
  // :
  // <Login name ={name} handleLogin={handleLogin}/>}

  //   </main>)}
  // ) */}


export default  Main;