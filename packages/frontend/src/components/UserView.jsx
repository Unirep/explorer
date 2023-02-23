import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import UserCard from './UserCard'

export default observer(({ attesterId }) => {
  const { attester } = useContext(state)
  const signupIds = attester.signUpsByAttesterId.get(attesterId) ?? []

  return (
    <>
      <div className="flex events-header">
        <h4>Semaphore ID</h4>
        <h4>Signed up at epoch #</h4>
      </div>
      <div>
        {signupIds.map((id) => (
          <UserCard key={id} id={id} />
        ))}
      </div>
    </>
  )
})
