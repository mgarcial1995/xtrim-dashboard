import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Login() {

    const navigate = useNavigate()
    const [typeInput, setTypeInput] = useState("password")
    const [showPass, setShowPass] = useState(false)
    const loggin = () => {
      navigate("/")
    }
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-third via-second to-first">
        <div className="inline min-w-xs w-auto bg-white h-auto p-10 rounded-lg">
          <p className="text-center text-xl text-second font-bold mb-8">Iniciar sesión</p>
          <div className="flex flex-col gap-y-6">
            <div className="w-full border border-second rounded-lg flex justify-between gap-x-4 items-center px-4 py-2">
              <FontAwesomeIcon icon="fa-solid fa-user" />
              <input className="w-full h-8 outline-none" type="text" placeholder="Nombre de usuario" />
            </div>
            <div className="w-full border border-second rounded-lg flex justify-between gap-x-4 items-center px-4 py-2">
              <FontAwesomeIcon icon="fa-solid fa-lock" />
              <input  className="w-full h-8 outline-none" type={typeInput} placeholder="Contraseña" />
              <div className="w-4 h-4 cursor-pointer" onClick={()=>{setShowPass(!showPass); setTypeInput(showPass?'password':'text')} }>
                {showPass ?
                <FontAwesomeIcon  icon="fa-solid fa-eye-slash" />
                :
                <FontAwesomeIcon  icon="fa-solid fa-eye" />
                }
              </div>                 
            </div>
            <div>
            <div onClick={()=>loggin()} className="flex px-10 py-2 mt-4 justify-center rounded-lg text-white font-semibold gap-x-4 items-center cursor-pointer bg-gradient-to-t from-first to-second hover:bg-third">
              Ingresar
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;
  