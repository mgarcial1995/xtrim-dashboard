import Search from '../Components/Search'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataTable from 'react-data-table-component';
import Modal from '../Components/Modal'
function Tables() {
    const {nameTable} = useParams();
    const [table, setTable] = useState("");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [contentModal, setContentModal] = useState({
      title: "",
      text: ""
    }); 
    let btcAcept= {
      text: 'Aceptar',
      type: 'color'
    }
    let btcCancel= {
      text: 'Cancelar',
      type: 'white'
    }
    const accept = () => {
      console.log("accept")
      setShowModal(false)
    }
    const cancel = () => {
      console.log("cancel")
      setShowModal(false)
    }
    const editRow = (data, index) => {
      console.log("edit",data,index)
      
    }
    const deleteRow = (data, index) => {
      setContentModal({
        title:"Eliminar elemento",
        text:"Se eliminará permanentemente este dato, ¿esta seguro?"
      })
      setShowModal(true)
      console.log("borrar",data,index)
    }
    const headers = [
      {
        name: 'Cedula',
        selector: row => row.title,
        sortable: true,
      },
      {
        name: 'Cuenta',
        selector: row => row.year,
        sortable: true,
      },
      {
        name: 'Contrato',
        selector: row => row.title,
        sortable: true,
      },
      {
        name: 'Servicio',
        selector: row => row.year,
        sortable: true,
      },
      {
        name: 'Apellido',
        selector: row => row.title,
        sortable: true,
      },
      {
        name: 'Email',
        selector: row => row.year,
        sortable: true,
      },
      {
        name: 'Acciones',
        button: true,
        cell: (data,i) => (
        <div className="flex justify-start items-center gap-x-2">
          <FontAwesomeIcon className="cursor-pointer text-red-600 p-2" onClick={()=>deleteRow(data,i)} icon="fa-solid fa-trash" />
          <FontAwesomeIcon className="cursor-pointer text-blue-600 p-2" onClick={()=>editRow(data,i)} icon="fa-solid fa-pen-to-square" />
        </div>
        ),
      },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
            actions: "a"
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 3,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 4,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 5,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 6,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 7,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]
    
    useEffect(() => {
        if(nameTable==='incidents'){
            setTable('Incidentes')
        }
        else if(nameTable==='retenctions'){
            setTable('Retenciones')
        }
        else if(nameTable==='cancels'){
            setTable('Cancelaciones')
        }
    }, [nameTable]);
    return (
      <div className="relative w-full h-screen">
        {showModal && <Modal content={contentModal} btnAccept={btcAcept} btnCancel={btcCancel} accept={accept} cancel={cancel} />}
        <div className="w-full h-full p-8">
          <h1 className="font-bold capitalize text-3xl text-first">{table} </h1>
          <div className="flex justify-between mt-8">
            <Search value={search} setSearch={setSearch} />
            <div className="flex px-10 justify-center rounded-full text-white font-semibold gap-x-4 items-center cursor-pointer bg-gradient-to-t from-first to-second hover:bg-third">
            <FontAwesomeIcon icon="fa-solid fa-plus" />Agregar</div>
            
          </div>
          <div className="w-full h-auto mt-8">
            <DataTable
                columns={headers}
                data={data}
                actions
                pagination
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default Tables;
  