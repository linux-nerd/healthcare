import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { InputField } from "./index"

test("render an InputLabel", () => {
  const cb = jest.fn();
  const { container, getByPlaceholderText } = render(<InputField label="Enter name" onChange={cb} placeholder="Enter name" />);
  expect(container).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText("Enter name"), { target: { value: "a" } });
  expect(cb).toHaveBeenCalledTimes(1);
});