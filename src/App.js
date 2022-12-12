import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useEffect, useState, useMemo, useContext } from "react";
import { UserContext } from "./context/UserContext";
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
  faLeftLong, faMagnifyingGlass, faPlus, faLock, faUser, faEye, faEyeSlash, faTrash, faPenToSquare, faCaretRight,
  faCheck, faXmark, faCircleCheck, faListCheck, faUsers
} from '@fortawesome/free-solid-svg-icons'

import SideBar from "./Components/SideBar";
import Asesores from "./Views/Asesores";

library.add(fab, faCircleUser, faEnvelopeOpenText, faGear, faRightFromBracket, faTable, faRightLong,
  faLeftLong, faMagnifyingGlass, faPlus, faLock, faUser, faEye, faEyeSlash, faTrash, faPenToSquare, faCaretRight,
  faCheck, faXmark, faCircleCheck, faListCheck, faUsers)
function App() {
  const tables = [
    { path: "/table/gestion", name: "Gestión", id:"gestion", icon: 'fa-solid fa-table', isActive: false },
    { path: "/table/retencion", name: "Retención", id:"retencion", icon: 'fa-solid fa-table', isActive: false },
    { path: "/table/ventas", name: "Ventas", id:"ventas", icon: 'fa-solid fa-table', isActive: false },
  ]
  const routes = [
    // { path: "/tables", name: "Tabla", icon:'fa-solid fa-table', isActive: false },
    { path: "/users", name: "Usuarios", id:"users", icon: 'fa-solid fa-users', isActive: false },
    { path: "/email", name: "Enviar correos", id:"emails", icon: 'fa-solid fa-envelope-open-text', isActive: false },
    // { path: "/email", name: "Edificios", icon: 'fa-solid fa-envelope-open-text', isActive: false },
    // { path: "/settings", name: "Configuración", icon: 'fa-solid fa-gear', isActive: false },
    // { path: "Logout", name: "Desconectar" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const { authUser, setAthUser } = useContext(UserContext);

  const [auth, setAuth] = useState(undefined)
  const [ReloadUser, setReloadUser] = useState(false)

  const [navBar, setNavbar] = useState(true);
  const [expandNav, setExpandNav] = useState(true);

  const [accessTables, setAccessTables] = useState(tables);
  const [accessOther, setAccessOthers] = useState(routes);

  useEffect(() => {
    const userlog = JSON.parse(localStorage.getItem("user"));
    if(userlog && userlog !== undefined && userlog.perfil === "administrador"){
      setAccessTables(tables)
      setAccessOthers(routes)
    } else if(userlog && userlog !== undefined && userlog.perfil === "gestion") {
      setAccessTables(tables.filter(el => el.id === "gestion"))
      setAccessOthers(routes.filter(el => el.id === "emails"))
    } else if(userlog && userlog !== undefined && userlog.perfil === "retencion"){
      setAccessTables(tables.filter(el => el.id === "retencion"))
      setAccessOthers(routes.filter(el => el.id === "emails"))
    } else if(userlog && userlog !== undefined && userlog.perfil === "ventas"){
      setAccessTables(tables.filter(el => el.id === "ventas"))
      setAccessOthers(routes.filter(el => el.id === "emails"))
    }else{
      setAccessTables(tables)
      setAccessOthers(routes)
    }
  }, [auth]);

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
    let newTables = [...accessTables]
    let newRoutes = [...accessOther]
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
    let newTables = [...accessTables]
    let newRoutes = [...accessOther]
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
    navigate(`/table/${data.perfil === "administrador" ? accessTables[0].id : data.perfil}`)
  };

  const logout = () => {
    removeDatosUsuario()
    localStorage.setItem('user', null)
    setAuth(null);
    navigate('/login')
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
          {navBar && <SideBar setTables={changeTables} setRoutes={changeRoutes} routes={accessOther} tables={accessTables} expandNav={expandNav} setExpandNav={setExpandNav} />}
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
