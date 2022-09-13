import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Components/Button'
function Modal({content, btnAccept, btnCancel,accept,cancel}) {
    
    return (
        <div className="fixed w-full h-full top-0 left-0 z-50" >
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-30 bg-black z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 flex rounded-lg items-center flex-col p-8 h-auto bg-white shadow-md shadow-slate-900 z-10">
                <p className="text-center text-second text-2xl font-bold">{content.title}</p>
                <p className="text-center mt-4 px-4">{content.text}</p>
                <div className={`w-full h-auto flex justify-around mt-10`}>
                    {btnCancel && cancel && <Button click={cancel} text={btnCancel.text} type={btnCancel.type} />}
                    {btnAccept && accept && <Button click={accept} text={btnAccept.text} type={btnAccept.type} />}
                </div>
            </div>
        </div>
        );
    }
  
export default Modal;
  