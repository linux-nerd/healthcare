import { createContext, useContext, useReducer } from "react";

const AddServiceContext = createContext();

export const SERVICE_ACTION = {
  FETCH_SERVICE_START: "fetch_service_start",
  FETCH_SERVICE_FINISHED: "fetch_service_finished",
  FETCH_SERVICE_ERRORED: "fetch_service_errored",
  ADD_SERVICE_START: "add_service_start",
  ADD_SERVICE_FINISHED: "add_service_finished",
  ADD_SERVICE_ERRORED: "add_service_errored",
  REMOVE_SERVICE_START: "remove_service_start",
  REMOVE_SERVICE_FINISHED: "remove_service_finished",
  REMOVE_SERVICE_ERRORED: "remove_service_errored",
  EDIT_SERVICE_START: "edit_service_start",
  EDIT_SERVICE_FINISHED: "edit_service_finished",
  EDIT_SERVICE_ERRORED: "edit_service_errored"
};

const SERVICE_API = "http://localhost:8080/service"

const serviceReducer = (state, action) => {
  switch (action.type) {
    case SERVICE_ACTION.FETCH_SERVICE_START:
    case SERVICE_ACTION.ADD_SERVICE_START:
    case SERVICE_ACTION.REMOVE_SERVICE_START:
    case SERVICE_ACTION.EDIT_SERVICE_START:
      return { ...state, loading: true };
    case SERVICE_ACTION.FETCH_SERVICE_FINISHED:
      return { ...state, loading: false, services: action.services };
    case SERVICE_ACTION.FETCH_SERVICE_ERRORED:
    case SERVICE_ACTION.ADD_SERVICE_ERRORED:
    case SERVICE_ACTION.REMOVE_SERVICE_ERRORED:
    case SERVICE_ACTION.EDIT_SERVICE_ERRORED:
      return { ...state, error: true, loading: false };
    case SERVICE_ACTION.ADD_SERVICE_FINISHED:
    case SERVICE_ACTION.REMOVE_SERVICE_FINISHED:
    case SERVICE_ACTION.EDIT_SERVICE_FINISHED:
      return { ...state, loading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
};

const initialState = {
  services: [],
  loading: false,
  error: false
}
export const AddServiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serviceReducer, { ...initialState });
  const value = { state, dispatch };
  return (
    <AddServiceContext.Provider value={value}>
      {children}
    </AddServiceContext.Provider>
  )
}

export const fetchServices = async (dispatch) => {
  dispatch({ type: SERVICE_ACTION.FETCH_SERVICE_START })
  try {
    const response = await fetch(SERVICE_API);
    if (!response.ok) {
      dispatch({ type: SERVICE_ACTION.FETCH_SERVICE_ERRORED })
    }
    const json = await response.json();
    const services = json.map(service => ({ ...service, status: service.status }))
    console.log(services)
    dispatch({ type: SERVICE_ACTION.FETCH_SERVICE_FINISHED, services })
  } catch (err) {
    dispatch({ type: SERVICE_ACTION.FETCH_SERVICE_ERRORED });
  }
}

export const addService = async (dispatch, service) => {
  dispatch({ type: SERVICE_ACTION.ADD_SERVICE_START, service });
  try {
    const response = await fetch(SERVICE_API, { method: "POST", body: JSON.stringify(service) });
    if (!response.ok) {
      dispatch({ type: SERVICE_ACTION.ADD_SERVICE_ERRORED })
    }
    // const services = await response.json();
    dispatch({ type: SERVICE_ACTION.ADD_SERVICE_FINISHED, service });
    fetchServices(dispatch);
  } catch (err) {
    dispatch({ type: SERVICE_ACTION.ADD_SERVICE_ERRORED });
  }
}

export const removeService = async (dispatch, serviceName) => {
  dispatch({ type: SERVICE_ACTION.REMOVE_SERVICE_START, serviceName });
  try {
    const response = await fetch(SERVICE_API, { method: "DELETE", body: JSON.stringify({ name: serviceName }) });
    if (!response.ok) {
      dispatch({ type: SERVICE_ACTION.REMOVE_SERVICE_ERRORED })
    }
    // const services = await response.json();
    dispatch({ type: SERVICE_ACTION.REMOVE_SERVICE_FINISHED, serviceName });
    fetchServices(dispatch);
  } catch (err) {
    dispatch({ type: SERVICE_ACTION.REMOVE_SERVICE_ERRORED });
  }
}

export const editService = async (dispatch, service) => {
  dispatch({ type: SERVICE_ACTION.EDIT_SERVICE_START, service });
  try {
    const response = await fetch(SERVICE_API, { method: "PUT", body: JSON.stringify(service) });
    if (!response.ok) {
      dispatch({ type: SERVICE_ACTION.EDIT_SERVICE_ERRORED })
    }
    // const services = await response.json();
    dispatch({ type: SERVICE_ACTION.EDIT_SERVICE_FINISHED, service });
    fetchServices(dispatch);
  } catch (err) {
    dispatch({ type: SERVICE_ACTION.EDIT_SERVICE_ERRORED });
  }
}

export const useAddService = () => {
  const context = useContext(AddServiceContext);

  if (!context) {
    throw new Error("useAddService must be used within a AddServiceProvider");
  }

  return context;
}