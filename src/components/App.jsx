import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
//import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup";
import React,{ useState, useCallback, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import DeletePopup from "./DeletePopup/DeletePopup.jsx";


import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { registration, authorization, getUserData } from "../utils/ayth.js";
import ProtectedHome from "./ProtectedHome/ProtectedHome.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import  SendContext  from "../contexts/SendContext.js";


function App() {
  const navigate = useNavigate()
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImgPopup, setIsImgPopup] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [currentUser, setСurrentUser] = useState({});
  //пропс для почты
  const [userEmail, setUserEmail] = useState('');
  //стейты карточки
  const [card, setCards] = useState([]);
  const [isLoadingCard, setIsLoadingCard] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState(" ");
  //стейт для регистрации и логина 
  const [isSuccessful, setIsSuccessful] = useState(false);
  //пропс залогинин ли пользователь или нет
  const [loggedIn, setLoggedIn] = useState(false);
//
  const [isCheckToken, setIsCheckToken] = useState(true);
  //стейт а открытие sSuccessful
  const [isResultOpenPopup, setIsResuitPopupOpen] = useState(true);
 
  //переменная состояния попапов 
  const isOpen = isEditProfilePopupOpen 
  || isAddPlacePopupOpen 
  || isDeletePopupOpen 
  || isEditAvatarPopupOpen 
  || isImgPopup 
  || isResultOpenPopup

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImgPopup(false);
    setIsDeletePopupOpen(false);
    setIsResuitPopupOpen(false);
  }, []);
//функция по закрытию Escape
useEffect(() => {
  function closePopupEsc (evt){
  if( evt.key === "Escape"){
    closeAllPopups()
  }
}
if (isOpen){
  document.addEventListener("keydown", closePopupEsc)
  return()=>{
    document.removeEventListener("keydown", closePopupEsc)
  }
}
},[isOpen, closeAllPopups])

//авторизация при вводе повторных данных,юз эфект на гет запрос
  useEffect(() => {
    if(localStorage.jwt){
    getUserData(localStorage.jwt)
    .then(res=> {
      setUserEmail(res.data.email)
      setLoggedIn(true)
      setIsCheckToken(false)
      navigate('/')
    })
    .catch((error) =>console.error(`Ошибка авторизации при вводе повторных данных ${error}`))}
    else{
      setLoggedIn(false)
      setIsCheckToken(false)
    }
  }, [navigate]);

  
  const handleAddPlaceClick = useCallback(() =>{
   setIsEditAddPlacePopupOpen(true)
  },[]) 

  const handleEditAvatarClick = useCallback(() =>{
    setIsEditAvatarPopupOpen(true)
   },[])

   const handleDeleteClick = useCallback((cardId) =>{
    setIsDeletePopupOpen(true);
    setDeleteCardId(cardId);
   },[])

   const handleCardClick = useCallback((card) =>{
    setSelectedCard(card)
    setIsImgPopup(true)
   },[])

   const handleEditProfileClick = useCallback(() =>{
    setIsEditProfilePopupOpen(true);
   },[])

useEffect(() => {
  if(loggedIn){
    setIsLoadingCard(true)
  Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) => {
      setСurrentUser(dataUser);
      setCards(dataCard);
      setIsLoadingCard(false);
    })
    .catch((error) =>
      console.error(
        `Ошибка при создании первоначальных данных на странице ${error}`))
}}, [loggedIn]);


  const handleSubmit = useCallback((request, textError)=>{
    setIsSend(true)
    request()
    .then(closeAllPopups)
    .catch ((err)=> console.error(`${textError} ${err}`))
    .finally(() => setIsSend(false))

  },[closeAllPopups])


  const hendleDeleteSubmit = useCallback (()=> { 
    function makeRequest(){
      return(api.deleteCard(deleteCardId)
      .then(()=>{
        setCards(card.filter(card => {
          return card._id !== deleteCardId}))
      })
      )}
      handleSubmit (makeRequest,'Ошибка при удалении карточки' )
  },[card, deleteCardId, handleSubmit])

  //профиль 
  const handleUpdateUser = useCallback ((userEmail)=> { 
    function makeRequest() {
      return (api.setUserInfo(userEmail)
      .then(res => {
        setСurrentUser(res)
      }))
    }
    handleSubmit (makeRequest,'Ошибка при редактировании профиля' )
  },[handleSubmit])

  //аватар 
  const handleAvatarPopup = useCallback ((userEmail)=> { 
    function makeRequest() {
      return (api.setAvatarNew(userEmail)
      .then(res => {
        setСurrentUser(res)
      }))
    }
    handleSubmit (makeRequest,'Ошибка при редактировании аватара ' )
  },[handleSubmit])
 
  //карточка 
  const handleAddPlaceSubmit = useCallback ((dataCard)=> { 
    function makeRequest() {
      return (api.addCard(dataCard)
      .then(res => {
        setCards([res, ...card])
      }))
    }
    handleSubmit (makeRequest,'Ошибка при добавлении карточки ' )
  },[card, handleSubmit])

//лайки
 const handleLike = useCallback ((card)=> { 
  const isLikes = card.likes.some(element => currentUser._id === element._id)
  if (isLikes){
    api.deleteLike(card._id)
    .then (res=> {
      setCards(card => card.map((item)=> item._id === card._id ? res : item ))
    })
    .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
  }else{
    api.addLike(card._id)
    .then (res =>{
      setCards(card => card.map((item)=> item._id === card._id ? res : item ))
    })
    .catch((error) => console.error(`Ошибка при установке лайка ${error}`))
  }
 },[currentUser._id])


 // авторизация
 function handleLogin(password, email) {
  setIsSend(true)
  authorization(password,email)   
    .then(res => {
   localStorage.setItem('jwt', res.token)
   setLoggedIn(true)
   window.scrollTo(0,0)//скрол чтобы в начале страницы открывалось после входа 
   navigate('/')
    })
    .catch((error) =>{
      setIsResuitPopupOpen(true)
      setIsSuccessful(false)
      console.error(`Ошибка при авторизации ${error}`)
})
    .finally(() => setIsSend(false));
}

  // регистрация
  function handleRegister(password, email) {
    setIsSend(true);
    registration(password,email)   
      .then(() => {
     setIsResuitPopupOpen(true)
     setIsSuccessful(true)
     window.scrollTo(0,0)
     navigate('/sign-in')
     
      })
      .catch((error) =>{
        setIsResuitPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${error}`)
  })
      .finally(() => setIsSend(false));
  }

  return (

<CurrentUserContext.Provider value={currentUser}>
      <div className="page">
       
<SendContext.Provider value={isSend}>
<Routes>
<Route path ='/' element = 
{<ProtectedRoute
 element ={ProtectedHome}
 userEmail={userEmail}
 openCard = {handleAddPlaceClick}
 openProfile = {handleEditProfileClick}
 openAvatar={handleEditAvatarClick}
 openDelete={handleDeleteClick}
 onCardClick={handleCardClick}
 onCardLike={handleLike}
 card={card}
 isLoadingCard={isLoadingCard}
 loggedIn ={loggedIn}
 isCheckToken={isCheckToken}/>
}/>
<Route path ='/sign-up' element = { 
  <>
 
  <Header name='signup'/> 
  <Main name='signup' isCheckToken={isCheckToken} handleRegister ={handleRegister}/>
  </>
}/>

<Route path ='/sign-in' element = {  
  <>
  <Header name='signin'/>
  <Main name='signin' isCheckToken={isCheckToken} handleLogin ={handleLogin}/>
  </>
}/>

<Route path ='*' element = {<Navigate to='/' replace />}/> 

</Routes>
 </SendContext.Provider>

        <Footer/>

 <SendContext.Provider value={isSend}>
      
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSend={isSend}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSend={isSend}
        />
        
        <EditAvatarPopup
          onUpdateAvatar={handleAvatarPopup}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />
        <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onSubmit={hendleDeleteSubmit}
        />
        {/* <PopupWithForm
          name="popup_type_delete"
          title="Вы уверены ?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={hendleDeleteSubmit}
          isSend={isSend}
        /> */}
</SendContext.Provider>

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={isImgPopup}
        />
       
        <InfoTooltip
          name={'result'}
          isSuccessful={isSuccessful}
          onClose={closeAllPopups}
          isOpen={isResultOpenPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
