import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../Components/Modal'
import ModalForm from '../Components/ModalForm'
import InputText from '../Components/InputText'
import TableFilter from '../Components/TableFilter'

const headerCells = [
  { id: "cedula", label: "Cedula", numeric: false, click: true },
  { id: "cuenta", label: "Cuenta", numeric: false, click: true },
  { id: "apellidos", label: "Apellido", numeric: false, click: true },
  { id: "email", label: "Email", numeric: false, click: true },
  { id: "accion", label: "Accion" },
]
const dataCells = [
  {
    cedula:{
      isEdit:false,
      value:"13453524"
    },
    cuenta:{
      isEdit:false,
      value:"mgmgarcia"
    },
    apellidos: {
      isEdit:false,
      value: "garcia"
    },
    email: {
      isEdit:false,
      value: "aa@gmail.com"
    },
  },
  {
    cedula:{
      isEdit:false,
      value:"5466565"
    },
    cuenta:{
      isEdit:false,
      value:"martin2"
    },
    apellidos: {
      isEdit:false,
      value: "aaaaa"
    },
    email: {
      isEdit:false,
      value: "ghghhgh@gmail.com"
    },
  },
  {
    cedula:{
      isEdit:false,
      value:"5466565"
    },
    cuenta:{
      isEdit:false,
      value:"martin2"
    },
    apellidos: {
      isEdit:false,
      value: "aaaaa"
    },
    email: {
      isEdit:false,
      value: "ghghhgh@gmail.com"
    },
  },
  {
    cedula:{
      isEdit:false,
      value:"5466565"
    },
    cuenta:{
      isEdit:false,
      value:"martin2"
    },
    apellidos: {
      isEdit:false,
      value: "aaaaa"
    },
    email: {
      isEdit:false,
      value: "ghghhgh@gmail.com"
    },
  },
  {
    cedula:{
      isEdit:false,
      value:"5466565"
    },
    cuenta:{
      isEdit:false,
      value:"martin2"
    },
    apellidos: {
      isEdit:false,
      value: "aaaaa"
    },
    email: {
      isEdit:false,
      value: "ghghhgh@gmail.com"
    },
  },
]
function Tables() {
  const { nameTable } = useParams();
  const [table, setTable] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  const [headers, setHeaders] = useState(headerCells);
  const [dataTable, setDataTable] = useState(dataCells);

  const [contentModal, setContentModal] = useState({
    title: "",
    text: ""
  })

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
  const deleteRow = (data, index) => {
    // setContentModal({
    //   title: "Eliminar elemento",
    //   text: "Se eliminará permanentemente este dato, ¿esta seguro?"
    // })
    // setShowModal(true)
    let newdata = [...dataTable];
    newdata.splice(index, 1);
    console.log("borrar",newdata)
    setDataTable(newdata);
  }

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
  }, [nameTable]);

  const changeItemTable = (index, e) => {
    console.log(e.target.name, e.target.value)
    let data = [...dataTable]
    data[index][e.target.name].value = e.target.value
    console.log("data",data)
    setDataTable(data)
  }
  const changeItemEdit = (index, item, value) => {
    console.log(index, item, value)
    let data = [...dataTable]
    data[index][item].isEdit = value
    console.log("data",data)
    setDataTable(data)
  }
  return (
    <div className="relative w-full h-screen overflow-y-auto">
      {showModal && <Modal content={contentModal} btnAccept={btcAcept} btnCancel={btcCancel} accept={accept} cancel={cancel} />}
      {showModalCreate &&
        <ModalForm title="Agregar elemento" save={save} cancel={cancel} >
          <InputText label="Nombre" />
          <InputText label="Apellido" />
          <InputText label="Documento" />
        </ModalForm>
      }

      <div className="w-full h-full p-8">
        <TableFilter
          headerTitle={headers}
          data={dataTable}
          rowFila={10}
          title={nameTable}
          valueFinder={search}
          setSearchFinder={setSearch}
          changeItemTable={(index, e) => changeItemTable(index, e)}
          changeItemEdit={(index, item, value) => changeItemEdit(index, item, value)}
          deleteRow={(item, index) => deleteRow(item, index)}
        />
      </div>
    </div>
  );
}

export default Tables;
