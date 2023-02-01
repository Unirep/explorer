import React from 'react'
import { observer } from 'mobx-react-lite'
import UserCard from './UserCard'

export default observer(({ signups }) => {
  return (
    <div className="scroll">
      <div className="flex">
        <h4>Semaphore ID</h4>
        <h4>Signed up at</h4>
      </div>
      <div className="scroll">
        {signups.map(({ commitment, epoch }) => (
          <UserCard key={commitment} commitment={commitment} epoch={epoch} />
        ))}
      </div>
    </div>
  )
})
