import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Components/Button'
function Modal({content, btnAccept, btnCancel,accept,cancel}) {
    
    return (
        <div >
            <div className="w-96 flex rounded-lg items-center flex-col p-8 h-auto bg-white shadow-md shadow-slate-900">
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
  