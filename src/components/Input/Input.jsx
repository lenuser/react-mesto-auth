import React, { useContext } from 'react'
//import { SendContext } from "../contexts/SendContext.jsx";
//import './Input.css'

export default function Input  ({name, type, placeholder,minLength, maxLength, isInputValid, value, onChange,error}) {
    const isSend = useContext()

    return(
        <>
        {name ===  'password' || name ===  'email'}
        <>
        <input
        name = {name}
        type={type}
        required
        placeholder={placeholder}
        minLength={minLength ? minLength : ''}
        maxLength = {maxLength ? maxLength : ''}
        className = {`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
        onChange={onChange}
        value={value ? value : ''}
        disabled = {isSend}
      />
      <span className={'login__error'}>{error}</span>
        </>
        :
        <>
        <input
        name = {name}
        type={type}
        required
        placeholder={placeholder}
        minLength={minLength ? minLength : ''}
        maxLength = {maxLength ? maxLength : ''}
        className = {`popup__input ${isInputValid === undefined || isInputValid ? '' : 'popup__input_invalid'}`}
        onChange={onChange}
        value={value ? value : ''}
        disabled = {isSend}
      />
      <span className={'popup__error'}>{error}</span>
        </>




        </>
    )
}