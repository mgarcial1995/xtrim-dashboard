import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import Search from "../Components/Search";
import { url_base } from "../function/util/global";

function Users() {

  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const editRow = (data, index) => {
    console.log("edit", data, index)
    // setShowModalCreate(true)
  }
  const addRow = () => {
    // setShowModalCreate(true)
  }
  const deleteRow = (data, index) => {
    // setContentModal({
    //   title:"Eliminar elemento",
    //   text:"Se eliminará permanentemente este dato, ¿esta seguro?"
    // })
    // setShowModal(true)
    console.log("borrar", data, index)
  }


  const headers = [
    {
      name: 'Nombre',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Usuario',
      selector: row => row.year,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Perfil',
      selector: row => row.year,
      sortable: true,
    },
    {
      name: 'Acciones',
      button: true,
      cell: (data, i) => (
        <div className="flex justify-start items-center gap-x-2">
          <FontAwesomeIcon className="cursor-pointer text-red-600 p-2" onClick={() => deleteRow(data, i)} icon="fa-solid fa-trash" />
          <FontAwesomeIcon className="cursor-pointer text-blue-600 p-2" onClick={() => editRow(data, i)} icon="fa-solid fa-pen-to-square" />
        </div>
      ),
    },
  ]

  useEffect(() => {
    (async()=>{
      const response = await fetch(`${url_base}listas_user`)
      const data = await response.json()
      const { success, message, users } = data
      if(success){
        setData(users)
      }else{
        console.log(message)
      }
    })()
  }, []);

  return (
    <div className="w-full p-8">
      <h1 className="font-bold capitalize text-3xl text-first"> USUARIOS </h1>
      <div className="flex justify-between mt-8">
        <Search value={search} setSearch={setSearch} />
        <div onClick={() => addRow()} className="flex px-10 justify-center rounded-full text-white font-semibold gap-x-4 items-center cursor-pointer bg-gradient-to-t from-first to-second hover:bg-third">
          <FontAwesomeIcon icon="fa-solid fa-plus" />Agregar</div>
      </div>
      <div className="w-full h-auto mt-4">
        <DataTable
          columns={headers}
          data={data}
          actions
          pagination
        />
      </div>
    </div>
  );
}

export default Users;
