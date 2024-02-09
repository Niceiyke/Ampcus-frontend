import React from 'react'

import TopMenu from './TopMenu'
import FetchMembers from './user/Member'

function  Dashboard() {
  return (
    <div className=''>
        <TopMenu/>
        <FetchMembers/>
    </div>
  )
}

export default Dashboard 