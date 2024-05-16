export function Input({type, value, name, id, onChange, className, placeholder}){
    return(
        <input type={type} value={value} name={name} id={id} onChange={onChange} className={className} placeholder={placeholder}/>
    )
}
