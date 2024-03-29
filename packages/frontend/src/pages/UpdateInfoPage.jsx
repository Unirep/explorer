import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { utils } from 'ethers'
import state from '../contexts/state'
import Header from '../components/Header'
import Button from '../components/Button'
import Footer from '../components/Footer'
import './updateInfo.css'

export default observer(() => {
  const { id, network } = useParams()
  const { unirep, wallet } = useContext(state)

  // load existing attester description to populate form
  useEffect(() => {
    const loadData = async () => {
      await unirep.loadAttesterDescription(id, network)
    }
    loadData()
  }, [])

  const attesterDesc = unirep.descriptionsByAttesterId.get(id)
  const [icon, setIcon] = useState(attesterDesc ? attesterDesc.icon : '')
  const [name, setName] = useState(attesterDesc ? attesterDesc.name : '')
  const [description, setDescription] = useState(
    attesterDesc ? attesterDesc.description : ''
  )
  const [url, setUrl] = useState(attesterDesc ? attesterDesc.url : '')
  let nonce = Math.floor(Math.random() * 10000)
  let attesterDescHash = utils.keccak256(
    utils.toUtf8Bytes(JSON.stringify([nonce, icon, name, description, url]))
  )
  const [responseMessage, setResponseMessage] = useState('')

  return (
    <div className="content">
      <Header />

      <div className="info-page-container">
        <div>
          <div className="info-h3">Update Attester Information</div>
          <div className="info-p">
            Enable users to discover your application.
          </div>
          <div className="signature-container">
            <h5 style={{ marginBottom: '1rem' }}>
              Updating the project information requires a signature from the
              owner of the attester contract.
            </h5>
            <div className="info-p" style={{ fontWeight: '600' }}>
              Hash of attester info:
            </div>
            <div className="message-box">{attesterDescHash}</div>
            <Button
              loadingText="verifying signature..."
              onClick={async () => {
                await wallet.load()
                nonce = Math.floor(Math.random() * 1000)
                attesterDescHash = utils.solidityKeccak256(
                  ['uint256', 'string'],
                  [nonce, description]
                )
                const signature = await wallet.signMessage(attesterDescHash)
                if (signature) {
                  const response = await unirep.updateAttesterDescription(
                    id,
                    network,
                    icon,
                    url,
                    name,
                    description,
                    signature,
                    nonce
                  )
                  setResponseMessage(response)
                }
              }}
            >
              sign message
            </Button>
            {responseMessage ? (
              <div className="form-heading response">{responseMessage}</div>
            ) : null}
            {responseMessage === 'info updated!' ? (
              <h5 style={{ textAlign: 'center' }}>
                Check out your new attester page
                <Link to={`/${network}/attester/${id}`}>
                  {' '}
                  <span style={{ textDecoration: 'underline' }}>here</span>
                </Link>
              </h5>
            ) : null}
          </div>
        </div>

        <div></div>

        <div className="form-container">
          <div className="form-section">
            <div className="form-heading">Attester name</div>
            <h5>Your application's title.</h5>
            <input
              className="info-input"
              placeholder="My Unirep App"
              maxLength="25"
              value={name ?? ''}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>

          <div className="form-section">
            <div className="form-heading">App icon</div>
            <h5>Square format. SVG only.</h5>
            <input
              className="info-input"
              placeholder="Filename..."
              defaultValue={''}
              type="file"
              accept=".svg"
              onChange={async (event) => {
                const svg = await event.target.files[0].text()
                setIcon(svg)
              }}
            />
          </div>

          <div className="form-section">
            <div className="form-heading">Description</div>
            <h5>
              Tell us about your attester. What does it do? What problem does it
              solve?
            </h5>
            <textarea
              placeholder="ZKP..."
              maxLength="500"
              value={description ?? ''}
              onChange={(event) => {
                setDescription(event.target.value)
              }}
            />
          </div>

          <div className="form-section">
            <div className="form-heading">Application URL</div>
            <h5>Where can users go to sign up and start using?</h5>
            <div style={{ display: 'flex' }}>
              <div className="input-lead">https://</div>
              <input
                className="info-input split"
                placeholder="myunirepapp.com"
                value={url ?? ''}
                onChange={(event) => {
                  setUrl(event.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
})
