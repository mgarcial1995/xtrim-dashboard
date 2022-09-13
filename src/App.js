import { useLocation, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Views/Home";
import Login from "./Views/Login";
import SendEmail from "./Views/SendEmail";
import Settings from "./Views/Settings";
import Tables from "./Views/Tables";
import Table from "./Views/Table";
import Users from "./Views/Users";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCircleUser, faEnvelopeOpenText, faGear, faRightFromBracket, faTable, faRightLong, 
  faLeftLong, faMagnifyingGlass, faPlus, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import SideBar from "./Components/SideBar";

library.add(fab, faCircleUser, faEnvelopeOpenText, faGear, faRightFromBracket, faTable, faRightLong, 
  faLeftLong, faMagnifyingGlass, faPlus, faLock, faUser, faEye, faEyeSlash)
function App() {
  const location = useLocation();

  const [navBar, setNavbar] = useState(true);
  const [expandNav, setExpandNav] = useState(true);
  const [tables, setTables] = useState([
    { path: "/table/incidents", name: "Incidentes", icon:'fa-solid fa-table', isActive: false },
    { path: "/table/retenctions", name: "Retenciones", icon:'fa-solid fa-table', isActive: false },
    { path: "/table/cancels", name: "Cancelaciones", icon:'fa-solid fa-table', isActive: false },
  ]);
  const [routes, setRoutes] = useState([
    // { path: "/tables", name: "Tabla", icon:'fa-solid fa-table', isActive: false },
    { path: "/users", name: "Usuarios", icon:'fa-solid fa-circle-user', isActive: false},
    { path: "/email", name: "Enviar correos", icon:'fa-solid fa-envelope-open-text', isActive: false },
    { path: "/settings", name: "Configuración", icon:'fa-solid fa-gear', isActive: false },
    // { path: "Logout", name: "Desconectar" },
  ]);
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
    newTables.map((el,i)=>{
      if(i===index){
        el.isActive = true
      } else{
        el.isActive = false
      }
      return el
    })
    newRoutes.map(el=> {el.isActive = false; return el;})
  }
  const changeRoutes = (index) => {
    let newTables = [...tables]
    let newRoutes = [...routes]
    newTables.map((el)=>{
      el.isActive = false; return el;
    })
    newRoutes.map((el,i)=> {
      if(i===index) {
        el.isActive = true
      }else{
        el.isActive = false
      }
      return el
    })
  }
  return (
    <div className='flex'>
      {navBar && <SideBar setTables={changeTables} setRoutes={changeRoutes} routes={routes} tables={tables} expandNav={expandNav} setExpandNav={setExpandNav} expandNav={expandNav}  />}
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/' element={<Home />} />
        <Route path='/tables' element={<Tables />} />
        <Route path='/table/:nameTable' element={<Table />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/email' element={<SendEmail />} />
        <Route exact path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
