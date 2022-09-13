function Button({text, type, click}) {
    return (
        <div onClick={()=>click()} className={`cursor-pointer inline py-2 px-8 rounded-lg font-semibold text-center
        ${type === 'color'?
        'bg-gradient-to-b from-first to-second hover:bg-none hover:bg-second text-white'
        :'bg-white border border-gray-400 text-first hover:bg-graysel'}`}>
            {text}
        </div>
        );
    }
  
export default Button;