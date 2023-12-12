import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchGet from "../hooks/useFetchGet";
import { useAuth } from "../hooks/useAuth";
import { LoanData } from "../models/models";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { formatToNaira } from "../utils/CurrencyFormater";

const initialLoanData: LoanData = {
  id: "",
  borrowed_amount: "",
  repaid_amount: "",
  member: "",
  loan_type: 0,
  attachments: null,
  comments: [],
  is_active: false,
  is_approved: false,
  is_treasurer_approved: false,
  is_declined: false,
  is_president_approved: false,
  is_user_declined: false,
  is_treasurer_declined: false,
  is_president_declined: false,
  owner: "",
  loan_types: "",
  date_initiated: "",
  date_declined: null,
  date_updated: "",
  date_approved: null,
};

function LoanDetail() {

  const { loanId } = useParams();
  const api = useFetchGet();
  const { member,user } = useAuth();
  const [loadData, setLoanData] = useState(initialLoanData)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)


  useEffect(()=>{
    
  const fetchLoanDetail = async () => {
    const response = await api(`/loan-detail-unapproved/${loanId}`);
    return setLoanData(response);
  };
  fetchLoanDetail()
  },[loanId])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <p>Error occurred: {error.message}</p>;
  }

  const comments = [
    {
      avatar: 'url_to_avatar1',
      name: 'John Doe',
      text: 'This is the first comment.',
      date: '2023-12-11',
    },
    {
      avatar: 'url_to_avatar1',
      name: 'John Doe',
      text: 'This is the first comment.',
      date: '2023-12-11',
    },
    // Add more comments as needed
  ];

  const getPresidentStatus = () => {
    if (loadData.is_president_approved && !loadData.is_president_declined) {
      return <strong className="text-green-500 pl-4">Approved</strong>;
    } else if (!loadData.is_president_approved && loadData.is_president_declined) {
      return <strong className="text-red-500 pl-4">Declined</strong>;
    } else {
      return <strong className="text-gray-500 pl-4">Not Approved Yet</strong> 
    }
  };
  
  const getTreasurerStatus = () => {
    if (loadData.is_treasurer_approved && !loadData.is_treasurer_declined) {
      return <strong className="text-green-500 pl-4">Approved</strong>;
    } else if (!loadData.is_treasurer_approved && loadData.is_treasurer_declined) {
      return <strong className="text-red-500 pl-4">Declined</strong>;
    } else {
      return <strong className="text-gray-500 pl-4">Not Approved Yet</strong>;
    }
  };

  const presidentStatus =getPresidentStatus()
  const treasurerStatus =getTreasurerStatus()


  return (
    <div>
      <div className="block md:flex gap-2">
        <div className="w-[100%] md:w-[50%] ">
          <div className="border-2 rounded-md m-2">
            <h3 className="mx-4 pt-4">Approval detail</h3>
            <div className="" >
              <div className="mt-2 mb-4 bg-gray-100 mx-4 p-4 ">
                <span className="flex"><strong className="">Name:</strong> <p className="pl-4">Agwu Samuel</p><p className="pl-2">(Treasurer)</p></span>
                <span className="flex"><strong>status:</strong > {treasurerStatus}</span>
                <span className="flex"><strong>Date:</strong> <p className="pl-4">12-12-2023</p></span>
              </div>
              <div className="mt-2 mb-4 bg-gray-100 mx-4 p-4 ">
                <span className="flex"><strong className="">Name:</strong> <p className="pl-4">Duke Ahuruezema</p> <p className="pl-2">(President)</p></span>
                <span className="flex"><strong>status:</strong> {presidentStatus}  </span>
                <span className="flex"><strong>Date:</strong> <p className="pl-4">{loadData.date_approved?loadData.date_approved:loadData.date_declined}</p></span>
              </div>

            </div>

          </div>
          <div className="border-2 rounded-md m-2">
            <h3 className="mx-4 pt-4">Request detail</h3>

            <div className=" mt-4 mx-4">
              <div className="flex gap-16"> <strong className="">Request ID:</strong> <p className="">{loadData.id}</p></div>
              <div className="flex gap-12 mt-2"> <strong className="">Request Date:</strong> <p className="">{loadData.date_initiated}</p></div>
              <div className="flex gap-12 mt-2"> <strong className="">Loan Type:</strong> <p className="">{loadData.loan_types}</p></div>
              <div className="flex gap-20 mt-2"> <strong className="">Location:</strong> <p className="">{member.location}</p></div>
              <div className="flex gap-14 mt-2"> <strong className="">Department:</strong> <p className="">{member.department}</p></div>
              <div className="flex gap-20 mt-2"> <strong className="">Job Title:</strong> <p className="">{member.job_title}</p></div>
              <div className="flex gap-4 mt-2"> <strong className="">Amount Required:</strong> <p className="">{formatToNaira(loadData.borrowed_amount)}</p></div>
              <div className="flex gap-4 mt-2"> <strong className="">Total Contribution:</strong> <p className="">{formatToNaira(member.total_contribution)}</p></div>
              <div className="flex gap-4 mt-2"> <strong className="">Avaliable Balance:</strong> <p className="">{formatToNaira(member.avaliable_balance)}</p></div>
              <div className="flex gap-16 mt-2"> <strong className="">Bank name:</strong> <p className="">{member.bank_name}</p></div>
              <div className="flex gap-4 mt-2"> <strong className="">Account Number:</strong> <p className="">{member.bank_account}</p></div>
            </div>

          </div>
        </div>
        <div>comments

          <CommentForm user={user.id} loan={loadData.id}/>
          <div>
            <CommentList comments={comments} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoanDetail;
