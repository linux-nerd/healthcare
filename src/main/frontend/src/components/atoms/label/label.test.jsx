import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Label } from "./index";

test('renders a label', () => {
  const { getByText } = render(<Label>Label Text</Label>)
  expect(getByText("Label Text")).toBeInTheDocument();
});