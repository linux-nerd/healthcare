import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Input } from "./index";

test('renders an input', () => {
  const onChangeCallback = jest.fn();
  const { container, getByPlaceholderText } = render(<Input type="text" onChange={onChangeCallback} placeholder="Enter text" />)
  expect(container).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText("Enter text"), { target: { value: "a" } })
  expect(onChangeCallback).toHaveBeenCalledTimes(1)
});