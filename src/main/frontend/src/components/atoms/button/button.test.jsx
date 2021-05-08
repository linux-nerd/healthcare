import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Button } from "./index";

test('renders a button', () => {
  const cb = jest.fn();
  const { getByText, container } = render(<Button onClick={cb}>Add</Button>)
  expect(getByText('Add')).toBeInTheDocument();

  fireEvent.click(container.firstChild)
  expect(cb).toHaveBeenCalledTimes(1);

});