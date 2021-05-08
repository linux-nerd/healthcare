import { Input } from "../../atoms/input"
import { Label } from "../../atoms/label"
import "./input-field.css";

export const InputField = ({ label, placeholder, onChange, ...props }) => {
  return (
    <>
      <Label className="field__direction">
        {label}
        <Input type="text" onChange={onChange} placeholder={placeholder} {...props} />
      </Label>
    </>
  )
}