/* eslint-disable jsx-a11y/alt-text */
import logo from '../Assests/logocolor.png'
import xlogo from '../Assests/xlogo.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useAuth from "../hook/useAuth";


function SideBar({ routes, expandNav, setExpandNav, tables, setTables, setRoutes }) {
    const navigate = useNavigate()
    const [select, setSelect] = useState(null)

    const { logout } = useAuth()

    return (
        <div
            style={{
                maxWidth: expandNav ? '250px' : '70px',
                minWidth: expandNav ? '250px' : '70px',
                transition: 'all 0.5s ease',
            }}
            className={`${expandNav ? 'w-80' : 'auto'} max-w-xs bg-first h-screen flex flex-col justify-between transition-transform bg-gradient-to-t from-third to-first`}>
            <div>
                <Link to="/" className="my-6 flex justify-center">
                    <img src={expandNav ? logo : xlogo} atl="Logo Xtrim" />
                </Link>
                <div>
                    <h2 className={`text-textnavbar font-bold text-lg mt-8 ${expandNav ? 'ml-6' : 'text-center'}`}>Tablas</h2>
                    <div className="flex flex-col text-white">
                        {tables.map((tables, i) => {
                            return <Link key={i} onClick={() => setTables(i)} to={tables.path}
                                onMouseEnter={() => setSelect(i)}
                                onMouseLeave={() => setSelect(null)}
                                className={`relative flex items-center justify-start w-full py-4 text-lg font-semibold gap-x-4 px-6 hover:bg-second ${tables.isActive ? 'border-l-2 border-extralight bg-second' : ''}`}>
                                <FontAwesomeIcon className={`${expandNav ? '' : 'text-2xl'}`} icon={tables.icon} /> {expandNav ? tables.name : ''}
                                {select === i && !expandNav && <div className={`absolute z-10 top-2 left-20 w-auto bg-white rounded-lg border-2 border-first text-first py-2 px-6`}> {tables.name}</div>}
                            </Link>
                        })}
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className={`text-textnavbar font-bold text-lg ${expandNav ? 'ml-6' : 'text-center'}`}>Cuenta</h2>
                    <div className="flex flex-col text-white">
                        {routes.map((rout, i) => {
                            return <Link key={i} onClick={() => setRoutes(i)} to={rout.path}
                                className={`flex items-center justify-start w-full py-4 text-lg font-semibold gap-x-4 px-6 hover:bg-second ${rout.isActive ? 'border-l-2 border-extralight bg-second' : ''}`}>
                                <FontAwesomeIcon className={`${expandNav ? '' : 'text-2xl'}`} icon={rout.icon} /> {expandNav ? rout.name : ''}
                            </Link>
                        })}
                        <div onClick={() => setExpandNav(!expandNav)} className={`flex items-center justify-start w-full py-4 text-lg font-semibold gap-x-4 px-6 hover:bg-hover cursor-pointer text-white`}>
                            <FontAwesomeIcon className={`${expandNav ? '' : 'text-2xl'}`} icon={`${expandNav ? 'fa-solid fa-left-long' : 'fa-solid fa-right-long'}`} /> {expandNav ? 'Contraer' : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full' >
                <div onClick={() => logout()} className={`flex items-center justify-start w-full py-4 text-lg font-semibold gap-x-4 px-6 hover:bg-hover cursor-pointer text-white`}>
                    <FontAwesomeIcon className={`${expandNav ? '' : 'text-2xl'}`} icon="fa-solid fa-right-from-bracket" /> {expandNav ? 'Desconectar' : ''}
                </div>
                <a href='https://xfiv.chat/' target="_blank"
                className='text-white text-sm font-medium flex justify-center my-4 gap-x-6' rel="noreferrer">
                    <img className='rounded-full w-4 h-auto' src='https://cloud.xfiv.chat/brand-assets/logo_thumbnail.png' />
                    <p>Desarrollado por Xfiv</p>
                </a>
            </div>
        </div>
    );
}

export default SideBar;
