function InputText({label, value, onchange, name}) {
    return (
        <label className="flex font-medium flex-col w-52 text-[#6A7180]"> 
          {label}:
          <input value={value} onChange={onchange} name={name} 
          className="w-full h-8 border border-[#B1B5BD] rounded-sm outline-none px-2" type={name === 'password' ? 'password' :'text'} />
        </label>
        );
    }
  
export default InputText;
  