import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('app renders', () => {
  const { getByText } = render(<App />)
  const el = getByText(/welcome/i)
  expect(el).toBeInTheDocument()
})
