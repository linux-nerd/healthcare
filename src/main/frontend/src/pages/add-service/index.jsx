import { useEffect } from "react";
import { useCallback } from "react"
import { ServiceRow } from "../../components/molecules/service-row";
import { AddServiceForm } from "../../components/organisms/add-service-form"
import { addService, fetchServices, useAddService, removeService, editService as editServiceHandler } from "../../providers/add-service-provider";
import "./add-service.css";

export const AddService = () => {
  const { state: serviceState, dispatch: serviceDispatch } = useAddService();

  useEffect(() => {
    fetchServices(serviceDispatch)
  }, [serviceDispatch]);

  const onAddService = useCallback((name, url) => {
    addService(serviceDispatch, { name, url })
  }, [serviceDispatch]);

  const onEditService = useCallback((service) => {
    editServiceHandler(serviceDispatch, service);

  }, [serviceDispatch]);

  const onRemoveService = useCallback((serviceName) => () => {
    removeService(serviceDispatch, serviceName);
  }, [serviceDispatch]);

  return (
    <main className="service-main">
      <h2>Add Service</h2>
      <AddServiceForm
        addServiceHandler={onAddService}
      />
      <div className="services-container">
        <h2>Services</h2>
        {
          serviceState.services.map(service => (
            <ServiceRow
              key={service.name}
              service={service}
              onEditService={onEditService}
              onRemoveService={onRemoveService}
            />
          ))
        }
      </div>
    </main>

  )
}