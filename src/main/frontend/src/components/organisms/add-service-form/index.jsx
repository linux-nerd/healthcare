import { useCallback, useState } from "react";
import { Button } from "../../atoms/button"
import { InputField } from "../../molecules/input-field"
import "./add-service.css";

export const AddServiceForm = ({ addServiceHandler }) => {
  const [name, setName] = useState("");
  const [webLink, setWebLink] = useState("");

  const onChangeName = useCallback((event) => {
    setName(event.target.value)
  }, [setName]);

  const onChangeWebLink = useCallback((event) => {
    setWebLink(event.target.value)
  }, [setWebLink]);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    addServiceHandler(name, webLink);
    setName("");
    setWebLink("");
  }, [addServiceHandler, name, webLink])
  return (
    <form className="add-service__form" onSubmit={onSubmit}>
      <InputField
        value={name}
        label="Enter Name"
        placeholder="Example Service"
        onChange={onChangeName}
        pattern="[A-Za-z0-9]{3,8}"
      />
      <InputField
        value={webLink}
        label="Enter web link"
        placeholder="https://www.example.com"
        onChange={onChangeWebLink}
        pattern="(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?"
      />
      <Button onClick={addServiceHandler}>Add Service</Button>
    </form>
  )
}