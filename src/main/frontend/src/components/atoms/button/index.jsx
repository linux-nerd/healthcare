import "./button.css";

export const Button = ({ onClick, variant = "primary", size = "default", children, ...props }) => {
  let className = `btn--${variant} btn--${size}`;
  return <button className={`btn ${className}`} onClick={onClick} {...props}>{children}</button>
}