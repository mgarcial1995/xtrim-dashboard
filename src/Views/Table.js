import Search from '../Components/Search'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Tables() {
    const {nameTable} = useParams();
    const [table, setTable] = useState("");
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
      <div className="w-full h-full p-8">
        <h1 className="font-bold capitalize text-3xl text-first">{table} </h1>
        <div className="flex justify-between mt-8">
          <Search />
          <div className="flex px-10 justify-center rounded-full text-white font-semibold gap-x-4 items-center cursor-pointer bg-gradient-to-t from-first to-second hover:bg-third">
          <FontAwesomeIcon icon="fa-solid fa-plus" />Agregar</div>
        </div>
        <div className="w-full h-auto"></div>
      </div>
    );
  }
  
  export default Tables;
  