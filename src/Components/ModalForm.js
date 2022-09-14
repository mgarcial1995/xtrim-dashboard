import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'
function ModalForm(props) {
    const {title} = props
    return (
        <div className="fixed w-full h-full top-0 left-0 z-50" >
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-30 bg-black z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl flex rounded-lg flex-col p-8 h-auto bg-white shadow-md shadow-slate-900 z-10">
                <p className="text-left text-second text-2xl font-bold">{title}</p>
                <div className="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-4">
                    {props.children}
                </div>
                <div className={`w-full h-auto flex justify-end gap-x-4 mt-10`}>
                    <Button click={props.cancel} text="Cancelar" type="white" />
                    <Button click={props.save} text="Guardar" type="color" />
                </div>
            </div>
        </div>
        );
    }
  
export default ModalForm;
  