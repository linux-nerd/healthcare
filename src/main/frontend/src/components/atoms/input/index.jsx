import "./input.css";

export const Input = ({ type, placeholder, onChange, ...props }) => {
  return <input type={type} placeholder={placeholder} onChange={onChange} {...props} />
} 