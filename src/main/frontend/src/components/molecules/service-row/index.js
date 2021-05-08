import { useCallback, useState } from "react";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { Status } from "../../atoms/status";
import "./service-row.css";

export const ServiceRow = ({ service, onEditService, onRemoveService }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editService, setEditService] = useState({});

  const handleEdit = useCallback((service) => () => {
    setEditService({ ...service, status: JSON.parse(service.status) })
    setIsEdit(true);
  }, [setIsEdit]);

  const onEditServiceChange = useCallback((event) => {
    setEditService({ ...editService, status: { ...editService.status, url: event.target.value } });
  }, [editService, setEditService]);

  const onEditSubmit = useCallback((event) => {
    event.preventDefault();
    onEditService({ name: editService.name, url: editService.status.url })
    setEditService({});
    setIsEdit(false);
  }, [editService, onEditService]);

  const onCancelEdit = useCallback(() => {
    setEditService({});
    setIsEdit(false);
  }, [])

  return (
    <div className="services-row" key={service.name}>
      <aside className="services-column__status"><Status status={JSON.parse(service.status).status} /></aside>
      <section className="services-column__body">
        <span className="services-column__body__name">{service.name}</span>
        {
          !isEdit ?
            <span className="services-column__body__url">{JSON.parse(service.status).url}</span> :
            (
              <form onSubmit={onEditSubmit}>
                <Input
                  className="service-row__input"
                  pattern="(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?"
                  value={editService.status.url}
                  onChange={onEditServiceChange}
                />
                <Button variant="primary" size="small">Save</Button>
              </form>
            )
        }


      </section>
      <aside className="services-column__action">
        <Button variant="danger" size="small" onClick={onRemoveService(service.name)}>Del</Button>
        {
          isEdit ?
            <Button type="button" variant="secondary" size="small" onClick={onCancelEdit}>Cancel</Button> :
            <Button variant="secondary" size="small" onClick={handleEdit(service)}>Edit</Button>
        }


      </aside>
    </div>
  )
}