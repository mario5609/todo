export default function Button({label, name, type, onClick, className}) {
    return (
      <button name={name} type={type} onClick={onClick} className={className}>{label}</button>
    )
  }