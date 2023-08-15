
import Main from "../Main/Main"
import Header from "../Header/Header"

export default function ProtectedHome ({ userEmail, ...props }) {
return(
    <>
   <Header dataUser = {userEmail}/>
   <Main 
   name ={"main"}
   {...props}
   />
   </>
)
}