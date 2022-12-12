import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserContext } from '../context/UserContext';
import Modal from '../Components/Modal'
import ModalAlert from '../Components/ModalAlert'
import ModalForm from '../Components/ModalForm'
import ModalConfirm from '../Components/ModalConfirm'
import InputText from '../Components/InputText'
import TableFilter from '../Components/TableFilter'
import loaderimg from '../Assests/loader.svg'
import axios from 'axios';

// SI ES DESACTIVADO YA NO SE PUEDE EDITAR
const headerCells = [
  { id: "order", label: "N°", numeric: false, click: true },
  { id: "cedula", label: "Cedula", numeric: false, click: true },
  { id: "cuenta", label: "Cuenta", numeric: false, click: true },
  { id: "apellidos", label: "Apellido", numeric: false, click: true },
  { id: "email", label: "Email", numeric: false, click: true },
  { id: "comentario", label: "Comentarios", numeric: false, click: true },
  { id: "estado", label: "Estado", numeric: false, click: true },
  // { id: "accion", label: "Accion" },
]
const dataCells = [
  {
    order:{
      isEdit:false,
      value: 0
    },
    cedula:{
      isEdit:false,
      value:"13453524"
    },
    cuenta:{
      isEdit:false,
      value:"aaaaa"
    },
    apellidos: {
      isEdit:false,
      value: "garcia"
    },
    email: {
      isEdit:false,
      value: "aa@gmail.com"
    },
    comentario: {
      isEdit:false,
      value: "aa@gmail.com"
    },
    estado: {
      isEdit:false,
      value: "pendiente"
    },
  },
]
function Tables() {
  const { authUser, setAthUser } = useContext(UserContext);
  const { nameTable } = useParams();
  const [loaderTable, setLoaderTable] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  const [messageAlert, setMessageAlert] = useState({
    title: "",
    text: "",
  });
  const [modalAlert, setModalAlert] = useState(false);

  const [validateTable, setValidateTable] = useState(true);

  const [headers, setHeaders] = useState(headerCells);
  const [dataTable, setDataTable] = useState(dataCells);

  const [typeConfirm, setTypeConfirm] = useState("");
  

  const [modalConfirm, setModalConfirm] = useState(false);
  const [dataConfirm, setDataConfirm] = useState({});

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
    setShowModal(false)
  }
  const save = () => {
    setShowModalCreate(false)
  }
  const cancel = () => {
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
    setDataTable(newdata);
  }

  useEffect(() => {
    setLoaderTable(true);
    getDataTables();
  }, [nameTable]);
  
  const getDataTables=()=>{
    const config = {
      method: 'get',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/${nameTable}`,
    };
    axios(config)
    .then(function (response) {
      const resp = response.data[nameTable];
      if(resp.length === 0){
        setLoaderTable(false);
        setValidateTable(false);
      }else{
        setValidateTable(true);
        const nameHeaders = Object.keys(resp[0]);
        // HEADERS
        const listHeaders = [];
        nameHeaders.map((item) => {
          if(item !== '_id' && item !== 'observacion'){
            listHeaders.push({
              id: item,
              label: item
            })
          }
        });
        const index = listHeaders.findIndex(item => item.id === 'confirmacion')
        const valueLast = listHeaders[listHeaders.length-1]
        listHeaders.splice(listHeaders.length, 1, listHeaders[index]);
        listHeaders.splice(index, 1, valueLast);
        setHeaders(listHeaders)
        //CUERPO DE LA TABLA
        const dataOutConfirm = resp.filter((item) => item.confirmacion === "" && item.observacion === "");
        setDataTable(dataOutConfirm)
        setLoaderTable(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const changeItemTable = (index, e) => {
    let data = [...dataTable]
    data[index][e.target.name].value = e.target.value
    setDataTable(data)
  }
  const changeItemEdit = (index, item, value) => {
    let data = [...dataTable]
    data[index][item].isEdit = value
    setDataTable(data)
  }
  const updateItem = (item) => {
    const config = {
      method: 'put',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/${nameTable}/${item._id}`,
      data: item
    };
    axios(config)
    .then(function (response) {
      sendNotificationUser(item)
      getDataTables()
      setModalConfirm(false)

      //MUESTRA EL MODAL DE APROBACIÓN
      setMessageAlert({
        title: "Solicitud actualizada",
        text: "Se ha actualizado la solicitud correctamente."
      })
      setModalAlert(true)
    })
    .catch(function (error) {
      console.log("Error al actualizar item",error);
      setMessageAlert({
        title: "Error al actualizar solicitud",
        text: error
      })
      setModalAlert(true)
    });
  }
  const sendNotificationUser = (data) => {
    const config = {
      method: 'post',
      url: `https://incoming.xfiv.chat/dashboard/api/v1/notificacion`,
      data: {
        email: data.email,
        nombre: data.nombres,
        solicitud: data.solicitud,
        confirmacion: data.confirmacion,
        observacion: data.observacion,
        asunto: data.confirmacion === 'OK' ? "Su solicitud ha sido atendida." : "Ocurrió un problema con su solcitud."
      }
    };
    axios(config)
    .then(function (response) {
      console.log('Notificacion enviada', response)
    })
    .catch(function (error) {
      console.log("Error al enviar notificacion",error);
    });
  }
  const openModalConfirm = (data, index) => {
    setDataConfirm(data)
    setModalConfirm(true)
  }
  return (
    <div className="relative w-full h-screen overflow-y-auto">
      {modalAlert && <ModalAlert alertMessages={messageAlert} cancel={()=>setModalAlert(false)} />}
      {modalConfirm && <ModalConfirm dataConfirm={dataConfirm} setDataConfirm={setDataConfirm} accept={(item)=>updateItem(item)} cancel={()=>setModalConfirm(false)} />}
      {showModal && <Modal content={contentModal} btnAccept={btcAcept} btnCancel={btcCancel} accept={accept} cancel={cancel} />}
      {showModalCreate &&
        <ModalForm title="Agregar elemento" save={save} cancel={cancel} >
          <InputText label="Nombre" />
          <InputText label="Apellido" />
          <InputText label="Documento" />
        </ModalForm>
      }

      {loaderTable ? 
        <div className="w-full h-full flex justify-center items-center">
          <img className='w-20 h-auto' alt="loader" src={loaderimg} />
        </div>
      : 
      <div className="w-full h-full p-8">
        {validateTable ? 
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
          openModalConfirm={(item, index) => openModalConfirm(item, index)}
          setModalConfirm={setModalConfirm}
        />
        : 
        <div className="w-full h-full flex justify-center items-center">
          No se encontraron datos para mostrar
        </div>
        }
      </div>
      }
    </div>
  );
}

export default Tables;
