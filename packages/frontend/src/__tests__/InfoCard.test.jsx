import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InfoCard from '../components/InfoCard'

const renderInfoCard = (heading, value1, value2, value3) => {
  return render(
    <InfoCard
      heading={heading}
      value1={value1}
      value2={value2}
      value3={value3}
    />
  )
}

test('To test if InfoCard is exactly rendered', async () => {
  renderInfoCard('header', 1, 2, 3)

  expect(screen.getByText('header')).toBeInTheDocument()
})
