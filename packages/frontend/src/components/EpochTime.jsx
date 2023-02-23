import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import InfoCard from './InfoCard'
import dayjs from 'dayjs'

export default observer(({ deployment }) => {
  const { startTimestamp, epochLength } = deployment
  const timeSinceDeployment = new Date() / 1000 - startTimestamp
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [nextEpoch, setNextEpoch] = useState(0)
  const calculateCurrentEpoch = () => {
    const now = Math.floor(new Date() / 1000)
    const current = Math.floor((now - startTimestamp) / epochLength)
    const next = startTimestamp + epochLength * (current + 1)
    setCurrentEpoch(current)
    setNextEpoch(next)
  }
  useEffect(() => {
    calculateCurrentEpoch()
    setTimeout(() => {
      calculateCurrentEpoch()
      setInterval(() => {
        calculateCurrentEpoch()
      }, epochLength * 1000)
    }, (epochLength - (timeSinceDeployment % epochLength)) * 1000)
  }, [])

  return (
    <>
      <InfoCard heading="Current Epoch #" value1={currentEpoch} />
      <InfoCard
        heading="Next Epoch Transition Time"
        value1={dayjs(nextEpoch * 1000).format('MM-DD-YYYY HH:mm:ss')}
      />
    </>
  )
})
