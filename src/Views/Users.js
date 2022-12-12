import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import Modal from '../Components/Modal'
import ModalForm from '../Components/ModalForm'
import InputText from '../Components/InputText'
import loaderimg from '../Assests/loader.svg'
import axios from 'axios';
import Button from '../Components/Button';
const userSchema = {
  "nombre":"",
  "email":"",
  "usuario":"",
  "password":"",
  "perfil":"",
  "estado":"ACTIVO",
}
function Users() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [typeFunction, setTypeFunction] = useState("create");
  const [listProfiles, setListProfiles] = useState([]);
  const [userData, setUserData] = useState(userSchema);
  const [contentModal, setContentModal] = useState({
    title: "",
    text: "",
  });
  const generatePhoto = (name) => {
    let arr = name && name !== null && name !== undefined ? name.split(" ") : "No Definido";
    let avatar
    if(arr.length === 2){
      avatar = arr[0].substring(0, 1)+arr[1].substring(0, 1)
    }
    else if(arr.length === 3){
      avatar = arr[0].substring(0, 1)+arr[2].substring(0, 1)
    }
    else if(arr.length === 4){
      avatar = arr[0].substring(0, 1)+arr[2].substring(0, 1)
    }else{
      avatar = name.substring(0, 2)
    }
    return name && name !== null && name !== undefined ? avatar : ""
  }
  const deleteUser = (data) => {
    setUserData(data)
    setContentModal({
      title:"Eliminar elemento",
      text:"Se eliminará permanentemente este dato, ¿esta seguro?"
    })
    setShowModal(true)
  }
  let btcAcept= {
    text: 'Aceptar',
    type: 'color'
  }
  let btcCancel= {
    text: 'Cancelar',
    type: 'white'
  }
  const listRoles = [
    {label:"Administrador", value: 1},
    {label:"Agente", value: 2},
  ]
  const changeUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  const sendUser = () => {
    const postuser = {
      method: 'post',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/crear_usuario`,
      data: userData
    };
    const putuser = {
      method: 'put',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/actualizar_usuario/${userData._id}`,
      data: userData
    };
    console.log(userData)
    if(typeFunction === "create"){
      axios(postuser)
      .then(function (response) {
        getListUsers()
        setShowModalCreate(false)
      }).catch(function (error) {
        console.log(error);
      });
    } else if (typeFunction === "edit") {
      axios(putuser)
      .then(function (response) {
        getListUsers()
        setShowModalCreate(false)
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
  useEffect(() => {
    const configroles = {
      method: 'get',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/roles`
    };
    axios(configroles)
    .then(function (response) {
      const profiles = response.data.roles.map((item) => {
        return {label:item.perfil, value: item.perfil.toLowerCase()} 
      });
      setListProfiles(profiles)
    }).catch(function (error) {
      console.log("Error al cargar roles",error);
    });
    getListUsers()
  }, [])
  const getListUsers = () => {
    const config = {
      method: 'get',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/usuarios`
    };
    axios(config)
    .then(function (response) {
      console.log(response.data)
      setUsers(response.data.usuarios)
      setLoader(false)
    }).catch(function (error) {
      console.log(error);
    });
  }
  const accept = (user) => {
    console.log(user)
    const config = {
      method: 'delete',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/eliminar_usuario/${userData._id}`
    };
    axios(config)
    .then(function (response) {
      console.log(response.data)
      getListUsers()
      setUserData(userSchema)
      setShowModal(false)
    }).catch(function (error) {
      console.log(error);
    });
    
  }
  const updateUser = (user) => {
    setTypeFunction("edit")
    setUserData(user)
    setShowModalCreate(true)
  }
  const cancel = () => {
    console.log("cancel")
    setShowModal(false)
    setShowModalCreate(false)
  }
  return (
    <div className="relative w-full p-8 overflow-hidden h-screen overflow-y-auto">
      {showModal && <Modal content={contentModal} btnAccept={btcAcept} btnCancel={btcCancel} accept={accept} cancel={cancel} />}
        {showModalCreate && 
        <ModalForm title="Agregar elemento" save={sendUser} cancel={cancel} >
          <InputText onchange={changeUserData} value={userData.nombre} name="nombre" label="Nombre" />
          <InputText onchange={changeUserData} value={userData.email} name="email" label="Correo" />
          <InputText onchange={changeUserData} value={userData.usuario} name="usuario" label="Usuario" />
          <InputText onchange={changeUserData} value={userData.password} name="password" label="Contraseña" />
          <div className="w-52">
            <select onChange={(e)=>changeUserData(e)} value={userData.perfil} name="perfil" className="w-full h-8 border border-[#B1B5BD] rounded-sm outline-none px-2">
              <option value="0" disabled className="p-2">Seleccionar perfil</option>
              {listProfiles.map((el,i)=>{
                return <option key={i} value={el.value} className="p-2">{el.label}</option>
              })}
            </select>
          </div>
        </ModalForm>
        }
      
      <h1 className="font-bold capitalize text-3xl text-first">Usuarios</h1>
      {
        loader ? <div className="w-full h-full flex justify-center items-center">
        <img className='w-20 h-auto' alt="loader" src={loaderimg} /></div> :
        <div className='w-full'>
          <div className='mt-10'>
            <Button click={()=>{setShowModalCreate(true);setTypeFunction("create")}} text="Agregar usuario" type="color" />
          </div>
          <div className="w-full mt-10 flex rounded-lg gap-x-10 gap-y-8 flex-wrap">
          {
            users.map((user,i)=>{
              return (
              <div key={i} className="max-w-md w-full flex justify-between bg-white shadow-md shadow-slate-400 ">
                <div className="flex p-4 gap-x-6">
                  <div className="w-20  flex justify-center items-center text-white font-semibold text-4xl h-20 bg-gradient-to-b from-[#221987] to-[#4A3CDBCC] rounded-full ">
                    <p>{generatePhoto(user.nombre)}</p>
                  </div>
                  <div>
                    <p>{user.nombre}</p>
                    <p>{user.email}</p>
                    <p>{user.perfil}</p>
                  </div>
                </div>
                <div className="h-full w-14 bg-first">
                  <div onClick={()=>updateUser(user)} className="bg-green-600 hover:bg-green-400 w-full h-1/2 flex items-center justify-center cursor-pointer">
                    <FontAwesomeIcon className="text-2xl text-white" icon="fa-solid fa-pen-to-square" />
                  </div>
                  <div onClick={()=>deleteUser(user)} className="bg-red-600 hover:bg-red-400 w-full h-1/2 flex items-center justify-center cursor-pointer">
                    <FontAwesomeIcon className="text-2xl text-white" icon="fa-solid fa-trash" />
                  </div>
                </div>
              </div>
              )
            })
          }
          </div>
      </div>
      }
      
    </div>
  );
}

export default Users;
  
