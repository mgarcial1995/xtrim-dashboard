import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Home from "./Views/Home";
import Login from "./Views/Login";
import SendEmail from "./Views/SendEmail";
import Settings from "./Views/Settings";
import Tables from "./Views/Tables";
import Table from "./Views/Table";
import Users from "./Views/Users";

import AuthContext from "./context/AuthContext";
import { getDatosUsuario, removeDatosUsuario, setDatosUsuario } from "./function/localstore/storeUsuario";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCircleUser, faEnvelopeOpenText, faGear, faRightFromBracket, faTable, faRightLong,
  faLeftLong, faMagnifyingGlass, faPlus, faLock, faUser, faEye, faEyeSlash, faTrash, faPenToSquare
} from '@fortawesome/free-solid-svg-icons'

import SideBar from "./Components/SideBar";
import Asesores from "./Views/Asesores";

library.add(fab, faCircleUser, faEnvelopeOpenText, faGear, faRightFromBracket, faTable, faRightLong,
  faLeftLong, faMagnifyingGlass, faPlus, faLock, faUser, faEye, faEyeSlash, faTrash, faPenToSquare)
function App() {
  const location = useLocation();
  const navigate = useNavigate()

  const [auth, setAuth] = useState(undefined)
  const [ReloadUser, setReloadUser] = useState(false)

  const [navBar, setNavbar] = useState(true);
  const [expandNav, setExpandNav] = useState(true);
  const tables = [
    { path: "/table/ventas", name: "Ventas", icon: 'fa-solid fa-table', isActive: false },
    { path: "/table/retencio", name: "Retenciones", icon: 'fa-solid fa-table', isActive: false },
    // { path: "/table/cancels", name: "Cancelaciones", icon: 'fa-solid fa-table', isActive: false },
    { path: "/table/gestion", name: "Gestión", icon: 'fa-solid fa-table', isActive: false },
  ]
  const routes = [
    // { path: "/tables", name: "Tabla", icon:'fa-solid fa-table', isActive: false },
    { path: "/users", name: "Usuarios", icon: 'fa-solid fa-circle-user', isActive: false },
    { path: "/email", name: "Enviar correos", icon: 'fa-solid fa-envelope-open-text', isActive: false },
    { path: "/settings", name: "Configuración", icon: 'fa-solid fa-gear', isActive: false },
    // { path: "Logout", name: "Desconectar" },
  ];

  useEffect(() => {
    (() => {
      const dataC = getDatosUsuario();
      if (dataC != null) {
        setAuth(dataC);
      } else {
        setAuth(null);
      }
      setReloadUser(false);
    })()
  }, [ReloadUser]);

  useEffect(() => {
    if (location.pathname === "/login") {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  }, [location]);

  const changeTables = (index) => {
    let newTables = [...tables]
    let newRoutes = [...routes]
    newTables.map((el, i) => {
      if (i === index) {
        el.isActive = true
      } else {
        el.isActive = false
      }
      return el
    })
    newRoutes.map(el => { el.isActive = false; return el; })
  }
  const changeRoutes = (index) => {
    let newTables = [...tables]
    let newRoutes = [...routes]
    newTables.map((el) => {
      el.isActive = false; return el;
    })
    newRoutes.map((el, i) => {
      if (i === index) {
        el.isActive = true
      } else {
        el.isActive = false
      }
      return el
    })
  }

  const login = (data) => {
    setDatosUsuario(data)
    setAuth(data)
    navigate('/table/incidents')
  };

  const logout = () => {
    removeDatosUsuario()
    setAuth(null);
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );


  return (
    <AuthContext.Provider value={authData}>
      {auth == null || auth == undefined ? (
        <Login />
      ) : (
        <div className='flex'>
          {navBar && <SideBar setTables={changeTables} setRoutes={changeRoutes} routes={routes} tables={tables} expandNav={expandNav} setExpandNav={setExpandNav} />}
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/' element={<Home />} />
            {/* <Route path='/tables' element={<Tables />} /> */}
            <Route path='/table/:nameTable' element={<Table />} />
            <Route path='/table/asesores' element={<Asesores />} />
            <Route exact path='/users' element={<Users />} />
            <Route exact path='/email' element={<SendEmail />} />
            <Route exact path='/settings' element={<Settings />} />
          </Routes>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export default App;
