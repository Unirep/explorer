import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default () => {
  const { network } = useParams()

  return (
    <div className="content">
      <Header network={network} />
      <div style={{ textAlign: 'center' }}>
        sorry, can't find that attester, user, or epoch key.
      </div>
      <Footer />
    </div>
  )
}
