import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search from './Search'

function TableFilter(props) {
    const { data, headerTitle, title, rowFila, changeItemTable, changeItemEdit, deleteRow } = props;
    const LongData = data.length
    const [rowh, setRowh] = useState(10)
    const [currentPage, setcurrentPage] = useState(0);
    const [search, setsearch] = useState('');

    const RowFile = () => {
        if (search.length === 0) return data.slice(currentPage, rowFila ? currentPage + rowFila : currentPage + 5)
        const filtered = data.filter(function (element) {
            var cumple = false;
            for (var key in element) {
                if (element[key] && element[key].value.toString().toLowerCase().indexOf(search) > -1) {
                    cumple = true;
                    break;
                }
            }
            if (cumple) {
                return element;
            }
        });
        return filtered.slice(currentPage, rowFila ? currentPage + rowFila : currentPage + 5)

    }
    const nextPage = () => {
        if (currentPage <= LongData) {
            let diff = LongData - currentPage
            if (diff > rowFila) {
                setcurrentPage(currentPage + rowFila)
            }
        }
    }
    const prevPage = () => {
        if (currentPage > 0)
            setcurrentPage(currentPage - rowFila)
    }
    const onChangeSearch = (event) => {
        setcurrentPage(0)
        setsearch(event.target.value)
    }
    const onChangeRowFile = (optionValue) => {
        setRowh(optionValue)
    }
    const selectState = (index, item, value, event) => {
        console.log(event.target.value);
    }
    const inputTypeValue = (item, value, name, index, extra) => {
        switch (item) {
            case 'estado':
                return <select onChange={(e)=>changeItemTable(index, e)} value={value} name={name} 
                className="py-1 px-2 border border-grey-400 rounded-sm outline-none">
                    <option value="pendiente">Pendiente</option>
                    <option value="gestionado">Gestionado</option>
                    <option value="rechazado">Rechazado</option>
                </select>
                break;
            default:
                return <input type="text" onChange={(e)=>changeItemTable(index, e)} 
                    className="border-grey-400 border rounded-sm outline-none px-1" 
                    name={name} 
                    value={value} 
                />
                break;
        }
    }
    return (
        <div className="w-full">
            <p className="font-bold capitalize text-3xl text-first">{title} </p>
            <div className="w-96 border-2 border-second rounded-full py-1 px-4 pr-6 flex items-center justify-around gap-x-4 mt-6">
                <FontAwesomeIcon className="text-second" icon="fa-solid fa-magnifying-glass" />
                <input value={search} onChange={(event)=>onChangeSearch(event)} type='text' className="w-full h-8 outline-none" placeholder="Buscar" />
            </div>
            <div className="w-full">
                <div style={{
                    gridTemplateColumns: `repeat(${headerTitle.length}, auto)`,
                }} 
                className={`grid grid-flow-col mt-8`}
                >
                    {
                        headerTitle ?
                            headerTitle.map((items, index) => (
                                <div key={index} className={`font-semibold text-lg py-4 text-sm ${items.id === 'accion' ?' w-[2rem]': 'w-[10rem]'}`} >
                                        {items.label}
                                </div>
                            )) : ''
                    }
                </div>
                <hr/>
                <div className="w-full">
                    {
                        data ?
                            RowFile().map((items, indexItem) => (
                                <div className="w-full">
                                    <div style={{
                                        gridTemplateColumns: `repeat(${headerTitle.length}, auto)`,
                                    }}  className={`w-full grid grid-flow-col py-2`} key={indexItem}>
                                        {
                                            headerTitle.map((hear, indexheader) => (
                                                <div key={indexheader} className="flex items-center text-sm w-[10rem]">
                                                            {/* <input type="text" onChange={(e)=>changeItemTable(indexItem, e)} 
                                                                className="border-grey-400 border rounded-sm outline-none px-1" 
                                                                name={hear.id} 
                                                                value={items[hear.id].value} 
                                                            /> */}
                                                    {
                                                        items[hear.id].isEdit ?
                                                            inputTypeValue(hear.id, items[hear.id].value, hear.id, indexItem, '')
                                                        :
                                                            <p>{hear.id === 'order' ? indexItem + 1 : items[hear.id].value}</p>
                                                    }
                                                    {
                                                        hear.id !== 'order' ?
                                                        <div >
                                                            {
                                                                !items[hear.id].isEdit ?
                                                                <div onClick={()=>changeItemEdit(indexItem,hear.id, !items[hear.id].isEdit)}>
                                                                    {/* EDITAR */}
                                                                    <FontAwesomeIcon className="cursor-pointer text-blue-600 p-2" icon="fa-solid fa-pen-to-square" />
                                                                </div>
                                                                :
                                                                <div className='flex gap-x-1'>
                                                                    {/* ACEPTAR EDICION */}
                                                                    <div onClick={()=>changeItemEdit(indexItem,hear.id, !items[hear.id].isEdit)}>
                                                                        <FontAwesomeIcon className="cursor-pointer text-green-600 p-2" icon="fa-solid fa-check" />
                                                                    </div>
                                                                    {/* CANCELAR EDICION */}
                                                                    <div onClick={()=>changeItemEdit(indexItem,hear.id, !items[hear.id].isEdit)}>
                                                                        <FontAwesomeIcon className="cursor-pointer text-red-600 p-2" icon="fa-solid fa-xmark" />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>:''
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <hr/>
                                </div>
                            )) : ''
                    }
                </div>
            </div>
            <div className="d-flex justify-content-end m-3">
                <select name="" id=""
                    style={{
                        borderWidth: 0,
                        outlineWidth: 'none'
                    }}
                    onChange={(e)=>onChangeRowFile(e.target.value)}
                >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value="">Todo</option>
                </select>
                <button className="btn"
                    style={{
                        borderWidth: 0,
                        outlineWidth: 'none'
                    }}
                    onClick={prevPage}> <FontAwesomeIcon icon="fa-solid fa-caret-left" /> </button>
                &nbsp;
                <button className="btn"
                    style={{
                        borderWidth: 0,
                        outlineWidth: 'none'
                    }}
                    onClick={nextPage}> <FontAwesomeIcon icon="fa-solid fa-caret-right" /> </button>
            </div>
        </div>
    );
}

export default TableFilter;