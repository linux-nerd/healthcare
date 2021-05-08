import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AddServiceForm } from "./index";

test('renders a AddServiceForm', () => {
  const nameCb = jest.fn();
  const webCb = jest.fn();
  const submitForm = jest.fn();

  const { container, getByPlaceholderText, getByText } = render(<AddServiceForm onChangeName={nameCb} onChangeWebLink={webCb} addServiceHandler={submitForm} />)
  expect(container).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText("Example Service"), { target: { value: "a" } })
  expect(nameCb).toHaveBeenCalledTimes(1);

  fireEvent.change(getByPlaceholderText(/www.example.com/i), { target: { value: "https://www.abhishekprakash.com" } })
  expect(webCb).toHaveBeenCalledTimes(1);

  fireEvent.click(getByText("Add Service"));
  expect(submitForm).toHaveBeenCalledTimes(1);
});