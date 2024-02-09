'use client'

import { AiFillDashboard, AiFillSchedule } from 'react-icons/ai'
import { MdChangeCircle } from 'react-icons/md'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import Link from 'next/link'

function Sidebar() {

    const [isApproval,setIsApproval] =useState(false)
    const {member}=useAuth()
    
    const handleClick =()=>{
      setIsApproval(!isApproval)
    }



    return (
      <div className="navbar sidebar flex flex-col pl-2 h-screen">
        <div className="mb-4 pt-8 flex flex-row items-center">
          <AiFillDashboard size="20px" color="white" />
          <Link href= "/dashboard" className=" ml-2 text-white font-black">
            Dashboard
          </Link>
        </div>
        <div className="mb-2 pt-8 cursor-pointer flex flex-row items-center">
          <AiFillSchedule size="20px" color="white" />
          <Link href= "/loan-request" className=" ml-2 text-white font-bold">
            Loan Request
          </Link>
        </div>
        <div className="mb-4 pt-8  flex flex-row items-center">
          <MdChangeCircle size="20px" color="white" />
          <Link
            href= "/change-contribution"
            className="  lg:block ml-2 text-white font-bold "
          >
            Change Contribution
          </Link>
        </div>
        <div className="mb-2 pt-8 cursor-pointer flex flex-row items-center">
          <AiFillSchedule size="20px" color="white" />
          <Link href= "/loan-repayment" className=" ml-2 text-white font-bold">
            Loan Repayment
          </Link>{" "}
        </div>

        {member?.is_president && (
          <>
            <div className="mb-4 pt-8  flex flex-row items-center">
              <AiFillSchedule size="20px" color="white" />
              <a className=" ml-2 text-white font-bold" onClick={handleClick}>
                Request Approval
              </a>
            </div>
            {isApproval && (
              <div className="ml-4">
                <Link href= "/admin/awaiting-presinent-approvals">
                  Awaiting Loan Approvals
                </Link>
              </div>
            )}
          </>
        )}
        {member?.is_treasurer && (
          <>
            <div className="mb-4 pt-8  flex flex-row items-center">
              <AiFillSchedule size="20px" color="white" />
              <a className=" ml-2 text-white font-bold" onClick={handleClick}>
                Request Approval
              </a>
            </div>
            {isApproval && (
              <div className="ml-4">
                <Link href= "treasurer-approvals">Awaiting Loan Approvals</Link>
              </div>
            )}
          </>
        )}
      </div>
    );
}

export default Sidebar