function InputText({label, value, onchange, name}) {
    return (
        <label className="flex flex-col w-52 text-third"> 
          {label}:
          <input value={value} onchange={onchange} name={name} className="w-full h-8 border border-second rounded-lg outline-none px-2" type='text' />
        </label>
        );
    }
  
export default InputText;
  