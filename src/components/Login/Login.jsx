import useFormValidation from "../../utils/useFormValidation"
import Input from "../Input/Input"
import SectionLogin from "../SectionLogin/SectionLogin"


export default function Login ({name, handleLogin}) {
    const { values, error, isValid, isInputValid, handleChange } = useFormValidation()

function onLogin(evt){
    evt.preventDefault()
    handleLogin( values.password, values.email )
}
return (
    <SectionLogin name={name} onSumbit={onLogin} isValid={isValid}>
        <Input
           name="email"
           type = "email"
           placeholder={"Email"}
           autoComplete="off"
           onChange={handleChange}
           value={values.email}
           error = {error.email}
           isInputValid = {isInputValid.email}
           />
              <Input
           name="password"
           type = "password"
           placeholder={"Пароль"}
           minLength = {3}
           autoComplete="off"
           onChange={handleChange}
           value={values.password}
           error = {error.password}
           isInputValid = {isInputValid.password}
           />
           </SectionLogin>

)
}
