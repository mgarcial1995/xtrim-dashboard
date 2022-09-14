import ModalForm from '../Components/ModalForm'
import InputText from '../Components/InputText'

function Home() {
  let contentModal = {
    title: 'Agregar nuevo',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry is simply dummy text of the printing and.'
  }
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
  }
  const cancel = () => {
    console.log("cancel")
  }
  return (
    <div className="relative w-full h-screen">
      {/* <ModalForm title="Agregar elemento" accept={accept} cancel={cancel} >
        <InputText label="Nombre" />
        <InputText label="Apellido" />
        <InputText label="Documento" />
      </ModalForm> */}
      <div className="w-full h-full p-8">
        Home
      </div>
    </div>
  );
}
export default Home;