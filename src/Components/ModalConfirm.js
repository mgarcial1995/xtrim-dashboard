import Button from './Button'
function ModalConfirm({accept, cancel, dataConfirm, setDataConfirm}) {
    return (
        <div className="fixed w-full h-full top-0 left-0 z-50" >
            <div onClick={()=>cancel()} className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-30 bg-black z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] flex rounded-lg items-center flex-col  h-auto bg-white shadow-md shadow-slate-900 z-10">
                <div className="font-bold text-lg text-white w-full h-auto py-4 bg-gradient-to-l from-[#5D52CF] to-[#221987] rounded-t-lg flex justify-center">
                    CONFIRMACIÓN DE REPORTE
                </div>
                <div className="w-full p-4 py-10">
                    <div className='w-full flex justify-center gap-x-10'>
                        <div onClick={()=>setDataConfirm({...dataConfirm, confirmacion: 'OK'})} 
                        className='cursor-pointer text-white w-28 text-center font-semibold text-xl rounded-lg p-4 bg-[#54C775]'>
                            OK
                        </div>
                        <div onClick={()=>setDataConfirm({...dataConfirm, confirmacion: 'ERROR'})} 
                        className='cursor-pointer text-white w-28 text-center font-semibold text-xl rounded-lg p-4 bg-[#F13131]'>
                            ERROR
                        </div>
                        {/* <p className='text-[#828894] font-bold text-2xl my-4'>Datos de contacto </p>
                        <div className='w-full flex flex-col gap-y-6'>
                        </div> */}
                    </div>
                    {dataConfirm.confirmacion === "ERROR" &&
                    <div className="w-full mt-10">
                        <p className='text-[#828894] font-bold text-lg my-4'>Observación</p>
                        <textarea onChange={(e)=>setDataConfirm({...dataConfirm, observacion:e.target.value})} value={dataConfirm.observacion} placeholder='Escribir observacion...' className=' rounded-lg w-full resize-none h-20 outline-none p-2 border border-[#828894]'></textarea>
                    </div>}
                    {dataConfirm.confirmacion !== "" && <div className={`w-full h-auto flex justify-evenly mt-10 gap-x-2 `}>
                        <Button click={cancel} text="Cancelar" type="white" />
                        <Button click={()=>accept(dataConfirm)} text="Enviar" type="color" />
                    </div>}
                </div>
            </div>
        </div>
        );
    }
  
export default ModalConfirm;
  