import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import UserCard from './UserCard'

export default observer(() => {
  const { attester } = useContext(state)
  const signupIds = attester.signUpIds

  return (
    <div className="scroll">
      <div className="flex">
        <h4>Semaphore ID</h4>
        <h4>Signed up at epoch #</h4>
      </div>
      <div className="scroll">
        {signupIds.map((id) => (
          <UserCard key={id} id={id}/>
        ))}
      </div>
    </div>
  )
})
