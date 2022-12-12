import InputText from '../Components/InputText'
function SendEmail() {
    const send =()=>{

    }
    return (
      <div className="w-full p-8">
        <h1 className="font-bold capitalize text-3xl text-first"> Enviar correo</h1>
        <div className="w-full mt-10 flex flex-col gap-y-4">
          <label className="flex flex-col text-[#6A7180] font-semibold">
            Correo
            <input className="w-96 font-normal h-8 border border-[#B1B5BD] rounded-sm outline-none px-2" 
            type="type" placeholder="" />
          </label>
          <label className="flex flex-col text-[#6A7180] font-semibold">
            Asunto
            <input className="font-normal w-96 h-8 border border-[#B1B5BD] rounded-sm outline-none px-2" 
            type="type" placeholder="" />
          </label>
          <label className="flex flex-col text-[#6A7180] font-semibold">
            Mensaje
            <textarea className="font-normal w-96 h-48 border border-[#B1B5BD] rounded-sm outline-none px-2 py-2" type="" ></textarea>
          </label>
          <div className="flex mt-4">
            <div onClick={()=>send()} className="flex px-10 py-2 justify-center rounded-full text-white font-semibold gap-x-4 items-center cursor-pointer bg-gradient-to-t from-first to-second hover:bg-third">
              Enviar
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SendEmail;
  