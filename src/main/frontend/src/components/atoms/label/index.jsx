import "./label.css";

export const Label = ({ className, children }) => {
  return <label className={`label ${className}`}>{children}</label>
}