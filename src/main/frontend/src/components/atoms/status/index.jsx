import "./status.css";
export const Status = ({ status }) => {
  return (
    <div className={`status__container ${status.toLowerCase()}`}>
      <div></div>
    </div>
  );
};