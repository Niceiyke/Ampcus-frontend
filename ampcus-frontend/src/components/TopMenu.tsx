import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth';
import { formatToNaira } from '../utils/CurrencyFormater';

function TopMenu() {

  const {  member} = useAuth();
  return (
    <main className='flex justify-center'>
        <section className='w-2/3 flex text-center justify-center gap-4 border border-blue-400'>
            <div className='border-2 p-12 m-2 w-1/4'><h3 className='text-sm '>Total Contribution</h3> <p>{formatToNaira(member.total_contribution)}</p></div>
            <div className='border-2 p-12 m-2 w-1/4'><h3 className='text-sm '>Total Loan</h3> <p>{formatToNaira(member.total_loan)}</p></div>
            <div className='border-2 p-12 m-2 w-1/4'><h3 className='text-sm ' >Avaliable Amount</h3> <p>{formatToNaira(member.avaliable_balance)}</p></div>
        </section>
    </main>
  )
}

export default TopMenu