import Input from '../Input/Input.jsx'
import useFormValidation from '../../utils/useFormValidation.js'
import SectionLogin from '../SectionLogin/SectionLogin.jsx'

export default function Register ({name, handeleRegister}) {
    const { values, error, isValid, isInputValid, handleChange } = useFormValidation()

function onRegister(evt){
    evt.preventDefault()
    handeleRegister( values.password, values.email )
}
return (
    <SectionLogin name={name} onSumbit={onRegister} isValid={isValid}>
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
