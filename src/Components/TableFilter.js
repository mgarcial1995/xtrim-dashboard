import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search from './Search'

function TableFilter(props) {
    const { data, headerTitle, title, rowFila, changeItemTable, changeItemEdit, deleteRow, openModalConfirm } = props;
    const LongData = data.length
    const [rowh, setRowh] = useState(10)
    const [currentPage, setcurrentPage] = useState(0);
    const [search, setsearch] = useState('');

    const RowFile = () => {
        if (search.length === 0) return data.slice(currentPage, rowFila ? currentPage + rowFila : currentPage + 5)
        const filtered = data.filter((element) => {
            var cumple = false;
            for (var key in element) {
                if (element[key] && element[key].toString().toLowerCase().indexOf(search) > -1) {
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
    const gridHeader = () => {
        let grid = []
        console.log({headerTitle})
        for (let i = 0; i < headerTitle.length; i++) {
            const element = headerTitle[i];
            if(element.label === "email"){
                grid.push("15rem")
            }else{
                grid.push("8rem")
            }
        }
        console.log(grid.join(" "))
        return String(grid.join(" "))
    }
    const inputTypeValue = (item, value, name, index, extra) => {
        switch (item) {
            case 'confirmacion':
                return <select onChange={(e)=>changeItemTable(index, e)} value={value} name={name} 
                className="py-1 px-2 border border-grey-400 rounded-sm outline-none">
                    <option value="0"></option>
                    <option value="OK"> OK</option> 
                    <option value="ERROR">ERROR</option>
                </select>
                break;
            default:
                return <input type="text" onChange={(e)=>changeItemTable(index, e)} 
                    className="border-grey-400 border rounded-sm outline-none px-1 w-20" 
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
                    gridTemplateColumns: gridHeader(),
                }} 
                className={`grid mt-8`}
                >
                    {
                        headerTitle ?
                            headerTitle.map((items, index) => (
                                <div key={index} className={`font-semibold capitalize text-lg py-4 text-sm ${items.id === 'accion' ?' w-[2rem]': 'w-[10rem]'}`} >
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
                                <div key={indexItem} className="w-full">
                                    <div style={{
                                        gridTemplateColumns: gridHeader(),
                                    }}  className={`w-full grid py-2 `} key={indexItem}>
                                        {
                                            headerTitle.map((hear, indexheader) => (
                                                <div key={indexheader} className="flex items-center text-sm w-[10rem]">
                                                    {
                                                        hear.id === "confirmacion" ?
                                                            <div onClick={()=>openModalConfirm(items, indexItem)} className='bg-gradient-to-l from-first to-[#4A3CDB] text-white font-semibold px-4 py-1 rounded-full cursor-pointer'
                                                            >
                                                            {/* <FontAwesomeIcon icon="fa-regular fa-circle-check" /> */}
                                                            Confirmar
                                                            </div> 
                                                        :
                                                            <p className='word-brake'>{items[hear.id]}</p>
                                                    }
                                                    {/* {
                                                        hear.id === "confirmacion" || hear.id === "observacion" ?
                                                        <div >
                                                            {
                                                                !items[hear.id].isEdit ?
                                                                <div onClick={()=>changeItemEdit(indexItem,hear.id, !items[hear.id].isEdit)}>
                                                                    <FontAwesomeIcon className="cursor-pointer text-blue-600 p-2" icon="fa-solid fa-pen-to-square" />
                                                                </div>
                                                                :
                                                                <div className='flex gap-x-1'>
                                                                    <div onClick={()=>changeItemEdit(indexItem,hear.id, !items[hear.id].isEdit)}>
                                                                        <FontAwesomeIcon className="cursor-pointer text-green-600 p-2" icon="fa-solid fa-check" />
                                                                    </div>
                                                                    <div onClick={()=>changeItemEdit(indexItem,hear.id, !items[hear.id].isEdit)}>
                                                                        <FontAwesomeIcon className="cursor-pointer text-red-600 p-2" icon="fa-solid fa-xmark" />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>:''
                                                    } */}
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
                    onClick={prevPage}> 
                    {/* <FontAwesomeIcon icon="fa-solid fa-caret-left" />  */}
                    </button>
                &nbsp;
                <button className="btn"
                    style={{
                        borderWidth: 0,
                        outlineWidth: 'none'
                    }}
                    onClick={nextPage}> 
                    {/* <FontAwesomeIcon icon="fa-solid fa-caret-right" />  */}
                    </button>
            </div>
        </div>
    );
}

export default TableFilter;