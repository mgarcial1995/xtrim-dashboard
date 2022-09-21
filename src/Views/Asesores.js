import Search from '../Components/Search'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataTable from 'react-data-table-component'
import Modal from '../Components/Modal'
import ModalForm from '../Components/ModalForm'
import InputText from '../Components/InputText'

import io from "socket.io-client";


var socket = null;

// socket = io.connect("http://localhost:5042");
socket = io.connect(`http://localhost:5042`, {
    path: `/socket.io/socket.io.js`,
    transports: ["websocket"] // use WebSocket first, if available
});
function Asesores() {
    const { nameTable } = useParams();
    const [table, setTable] = useState("");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [editar, setEditar] = useState({
        _id: '',
        confirmacion: '',
        nombres: '',
        fecha_creacion: '',
        cuenta: '',
        apellidos: '',
        telefono: '',
        email: '',
        cedula: '',
        servicios: '',
        contrato: '',
        protocolo: '',
        telefono_bot: '',
        resultado: '',
        envioCliente: '',
    });

    const [data, setData] = useState([])

    const [contentModal, setContentModal] = useState({
        title: "",
        text: ""
    });
    let btcAcept = {
        text: 'Aceptar',
        type: 'color'
    }
    let btcCancel = {
        text: 'Cancelar',
        type: 'white'
    }
    const accept = () => {
        console.log("accept")
        setShowModal(false)
    }
    const save = () => {
        console.log("save")
        setShowModalCreate(false)
    }
    const cancel = () => {
        console.log("cancel")
        setShowModal(false)
        setShowModalCreate(false)
    }
    const editRow = (data, index) => {
        console.log("edit", data, index)
        setShowModalCreate(true)
        setEditar(data)
    }
    const addRow = () => {
        setShowModalCreate(true)
    }
    const deleteRow = (data, index) => {
        setContentModal({
            title: "Eliminar elemento",
            text: "Se eliminará permanentemente este dato, ¿esta seguro?"
        })
        setShowModal(true)
        console.log("borrar", data, index)
    }
    const headers = [
        {
            name: 'Cedula',
            selector: row => row.cedula,
            sortable: true,
        },
        {
            name: 'Cuenta',
            selector: row => row.cuenta,
            sortable: true,
        },
        {
            name: 'Contrato',
            selector: row => row.contrato,
            sortable: true,
        },
        {
            name: 'Servicio',
            selector: row => row.servicios,
            sortable: true,
        },
        {
            name: 'Fecha Chat',
            selector: row => row.fecha_creacion,
            sortable: true,
        },
        {
            name: 'Nombres',
            selector: row => row.nombres,
            sortable: true,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellidos,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Confiramacion',
            selector: row => row.confirmacion,
            sortable: true,
        },
        {
            name: 'Resultado',
            selector: row => row.resultado,
            sortable: true,
        },
        {
            name: 'Envio Cliente',
            selector: row => row.envioCliente,
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
        socket.emit("asesor:", "conetado")
        socket.on("asesor:", (data) => {
            console.log("data", data)
            setData(data)
        })
    }, [])

    useEffect(() => {
        if (nameTable === 'incidents') {
            setTable('Incidentes')
        }
        else if (nameTable === 'retenctions') {
            setTable('Retenciones')
        }
        else if (nameTable === 'cancels') {
            setTable('Cancelaciones')
        }
    }, [nameTable])

    return (
        <div className="relative w-full h-screen">
            {showModal && <Modal content={contentModal} btnAccept={btcAcept} btnCancel={btcCancel} accept={accept} cancel={cancel} />}
            {showModalCreate &&
                <ModalForm title="Agregar elemento" save={save} cancel={cancel} >
                    <InputText
                        label="Cedula"
                        name="cedula"
                        value={editar.cedula}
                        onChange={(e) => setEditar({ ...editar, cedula: e.target.value })}
                    />
                    <InputText
                        label="Cuenta"
                        name="cuenta"
                        value={editar.cuenta}
                        onChange={(e) => setEditar({ ...editar, cuenta: e.target.value })}
                    />
                    <InputText
                        label="Contrato"
                        name="contrato"
                        value={editar.contrato}
                        onChange={(e) => setEditar({ ...editar, contrato: e.target.value })}
                    />
                    <InputText
                        label="Servicio"
                        name="servicios"
                        value={editar.servicios}
                        onChange={(e) => setEditar({ ...editar, servicios: e.target.value })}
                    />
                    <InputText
                        label="Fecha Chat"
                        name="fecha_creacion"
                        value={editar.fecha_creacion}
                        onChange={(e) => setEditar({ ...editar, fecha_creacion: e.target.value })}
                    />
                    <InputText
                        label="Nombres"
                        name="nombres"
                        value={editar.nombres}
                        onChange={(e) => setEditar({ ...editar, nombres: e.target.value })}
                    />
                    <InputText
                        label="Apellidos"
                        name="apellidos"
                        value={editar.apellidos}
                        onChange={(e) => setEditar({ ...editar, apellidos: e.target.value })}
                    />
                    <InputText
                        label="Email"
                        name="email"
                        value={editar.email}
                        onChange={(e) => setEditar({ ...editar, email: e.target.value })}
                    />
                    <InputText
                        label="Confimacion"
                        name="confirmacion"
                        value={editar.confirmacion}
                        onChange={(e) => setEditar({ ...editar, confirmacion: e.target.value })}
                    />
                    <InputText
                        label="Resultado"
                        name="resultado"
                        value={editar.resultado}
                        onChange={(e) => setEditar({ ...editar, resultado: e.target.value })}
                    />
                    <InputText
                        label="Envio Cliente"
                        name="envioCliente"
                        value={editar.envioCliente}
                        onChange={(e) => setEditar({ ...editar, envioCliente: e.target.value })}
                    />
                </ModalForm>
            }
            <div className="w-full h-full p-8">
                <h1 className="font-bold capitalize text-3xl text-first">{table} </h1>
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
        </div>
    );
}

export default Asesores;
