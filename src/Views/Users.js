import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import Modal from '../Components/Modal'
import ModalForm from '../Components/ModalForm'
import InputText from '../Components/InputText'
function Users() {
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [contentModal, setContentModal] = useState({
    title: "",
    text: ""
  });
  const generatePhoto = (name) => {
    let arr = name.split(" ");
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
    return avatar
  }
  const deleteUser = (data, index) => {
    setContentModal({
      title:"Eliminar elemento",
      text:"Se eliminará permanentemente este dato, ¿esta seguro?"
    })
    setShowModal(true)
    console.log("borrar",data,index)
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
  const users = [
    {
      name:"Giovanni Martin Garcia Lagos",
      email: "martin@martin.com",
      rol: "Administrador",
    },
    {
      name:"Sergio Santana",
      email: "sergio@aaaa.com",
      rol: "Agente",
    },

  ]
  const accept = () => {
    console.log("accept")
    setShowModal(false)
  }
  const edit = () => {
    console.log("edit")
    setShowModalCreate(false)
  }
  const cancel = () => {
    console.log("cancel")
    setShowModal(false)
    setShowModalCreate(false)
  }
  return (
    <div className="relative w-full p-8">
      {showModal && <Modal content={contentModal} btnAccept={btcAcept} btnCancel={btcCancel} accept={accept} cancel={cancel} />}
        {showModalCreate && 
        <ModalForm title="Agregar elemento" save={edit} cancel={cancel} >
          <InputText label="Nombre" />
          <InputText label="Correo" />
          <div className="w-52">
            <select className="w-full h-8 border border-second rounded-lg outline-none px-2">
              <option value="0" disabled className="p-2">Seleccionar rol</option>
              {listRoles.map((el,i)=>{
                return <option key={i} value={el.value} className="p-2">{el.label}</option>
              })}
            </select>
          </div>
        </ModalForm>
        }
      <h1 className="font-bold capitalize text-3xl text-first">Usuarios</h1>
      <div className="w-full mt-10 flex rounded-lg gap-x-10 gap-y-8 flex-wrap">
        {
          users.map((user,i)=>{
            return (
            <div key={i} className="max-w-md w-full flex justify-between bg-white shadow-md shadow-slate-400 ">
              <div className="flex p-4 gap-x-6">
                <div className="w-20  flex justify-center items-center text-white font-semibold text-4xl h-20 bg-gradient-to-b from-first to-third rounded-full ">
                  <p>{generatePhoto(user.name)}</p>
                </div>
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.rol}</p>
                </div>
              </div>
              <div className="h-full w-14 bg-first">
                <div onClick={()=>setShowModalCreate(true)} className="bg-green-600 hover:bg-green-400 w-full h-1/2 flex items-center justify-center cursor-pointer">
                  <FontAwesomeIcon className="text-2xl text-white" icon="fa-solid fa-pen-to-square" />
                </div>
                <div onClick={()=>deleteUser()} className="bg-red-600 hover:bg-red-400 w-full h-1/2 flex items-center justify-center cursor-pointer">
                  <FontAwesomeIcon className="text-2xl text-white" icon="fa-solid fa-trash" />
                </div>
              </div>
            </div>
            )
          })
        }
        
      </div>
    </div>
  );
}

export default Users;
  
