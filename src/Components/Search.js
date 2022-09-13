import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Search({value,setSearch}) {
    return (
        <div className="w-96 border-2 border-second rounded-full py-1 px-4 pr-6 flex items-center justify-around gap-x-4">
            <FontAwesomeIcon className="text-second" icon="fa-solid fa-magnifying-glass" />
            <input value={value} onChange={(e)=>setSearch(e.target.value)} type='text' className="w-full h-8 outline-none" placeholder="Buscar" />
        </div>
        );
    }
  
export default Search;
  