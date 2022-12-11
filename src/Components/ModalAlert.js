import Button from './Button'
import Alert from '../Assests/alert.png'
import {useState} from 'react'

function ModalAlert({cancel, alertMessages, isOptional,accept}) {

    return (
        <div className="fixed w-full h-full top-0 left-0 z-50" >
            <div onClick={()=>cancel()} className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-30 bg-black z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full w-80 flex rounded-lg items-center flex-col  h-auto bg-white shadow-md shadow-slate-900 z-10">
                <div className="w-full h-auto py-4 bg-gradient-to-l from-[#5D52CF] to-[#221987] rounded-t-lg flex justify-center">
                   <img  className={`w-20 h-auto `} src={Alert} alt="" /> 
                </div>
                <div className="w-full px-10 py-4">
                    <div className="w-full">
                        <p className="text-center text-customheader text-xl mt-2 mb-4 font-bold">{alertMessages.title}</p>
                        <p className="text-center text-customheader text-lg ">{alertMessages.text}</p>
                    </div>
                    <div className={`w-full h-auto flex justify-evenly mt-10 gap-x-2 `}>
                    {
                        isOptional ? 
                        <>
                            <Button click={()=>cancel()} addclass="py-4 text-xl" text="Volver" type="white" />
                            <Button click={()=>accept()} addclass="py-4 text-xl" text="Aceptar" type="color" />
                        </>
                        :
                        <Button click={()=>cancel()} addclass="py-2 text-lg" text="Aceptar" type="color" />
                    }
                    </div>
                </div>
            </div>
        </div>
        );
    }
export default ModalAlert;
  