import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default () => {
  return (
    <div className="content">
      <Header />
      <div style={{ textAlign: 'center' }}>
        sorry, can't find that attester or user.
      </div>
      <Footer />
    </div>
  )
}
