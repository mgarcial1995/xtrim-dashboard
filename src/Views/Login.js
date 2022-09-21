import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { url_base } from '../function/util/global'
import { SpinnerCircular, SpinnerDotted } from 'spinners-react'

import useAuth from "../hook/useAuth";
import axios from 'axios';


function Login() {

  const navigate = useNavigate()
  const [typeInput, setTypeInput] = useState("password")
  const [showPass, setShowPass] = useState(false)
  // const loggin = () => {
  //   navigate("/table/incidents")
  // }

  const [loading, setLoading] = useState(false);
  const [color, setcolor] = useState(true);
  const [error, seterror] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  function handleuser(e) {
    seterror(null);
    setcolor(true);
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  const { login } = useAuth()

  const logup = async () => {
    if (user.username !== '' && user.password !== '') {
      setLoading(true);
      try {
        const { data } = await axios.post(`${url_base}login`, user, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic YWRtaW46YWRtaW4=`
          }
        });
        if (data.success !== false) {
          setcolor(true)
          login(data.token)
          setLoading(false);
        } else {
          setcolor(false)
          setLoading(false);
          seterror(data.message)
        }
      } catch (error) {
        seterror(error.message);
        setLoading(false);
      }
    }
  }
  
  return (
    <div
      style={{
        transition: "all 0.5s ease",
      }}
      className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-third via-second to-first">
      <div className="inline min-w-xs w-auto bg-white h-auto p-10 rounded-lg">
        <p className="text-center text-xl text-second font-bold mb-8">Iniciar sesión</p>
        <div style={{position: 'relative'}} className="flex flex-col gap-y-6">
          <div className="w-full border border-second rounded-lg flex justify-between gap-x-4 items-center px-4 py-2">
            <FontAwesomeIcon icon="fa-solid fa-user" />
            <input className="w-full h-8 outline-none" type="text" placeholder="Nombre de usuario" name="username" onChange={handleuser} />
          </div>
          <div className="w-full border border-second rounded-lg flex justify-between gap-x-4 items-center px-4 py-2">
            <FontAwesomeIcon icon="fa-solid fa-lock" />
            <input className="w-full h-8 outline-none" type={typeInput} placeholder="Contraseña" name="password" onChange={handleuser} />
            <div className="w-4 h-4 cursor-pointer" onClick={() => { setShowPass(!showPass); setTypeInput(showPass ? 'password' : 'text') }}>
              {showPass ?
                <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                :
                <FontAwesomeIcon icon="fa-solid fa-eye" />
              }
            </div>
          </div>
          {error && <p style={{position: 'absolute', bottom: -20, width:'100%'}} className="text-red-500 text-center">{error}</p>}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              width: '100%',
              left: 0,
            }}>
              <SpinnerDotted
                color="#2F22BA"
                speed={300}
                enabled={loading}
              />
            </div>
            <div onClick={() => logup()}
              className="flex px-10 py-2 mt-4 justify-center rounded-lg text-white font-semibold gap-x-4 items-center cursor-pointer bg-gradient-to-t from-first to-second hover:bg-third">
              Ingresar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
