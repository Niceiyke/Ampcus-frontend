import React from "react";
import { useParams } from "react-router-dom";
import useFetchGet from "../hooks/useFetchGet";
import { useQuery } from "@tanstack/react-query";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function LoanDetail() {
   
  const { loanId } = useParams();
  const api = useFetchGet();

  const fetchLoanDetail = async () => {
    const response = await api(`/loan-detail-unapproved/${loanId}`);
    return response;
  };

  const {
    data: loanDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["loan", loanId],
    queryFn: fetchLoanDetail,
  });

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


  return (
    <div>
      <div className="block md:flex gap-2">  
       <div className="w-[100%] md:w-[50%] ">
       <div className="border-2 rounded-md m-2">
       <h3 className="mx-4 pt-4">Approval detail</h3>
          <div className="" >
             <div className="mt-2 mb-4 bg-gray-100 mx-4 p-4 ">
             <span className="flex"><h4>Name:</h4> <p>oyom Ikechukwu</p></span>
              <span className="flex"><h4>status:</h4> <p>approved</p></span>
              <span className="flex"><h4>Date:</h4> <p>12-12-2023</p></span>
             </div>
             <div className="mt-2 mb-4 bg-gray-100 mx-4 p-4">
             <span className="flex"><h4>Name:</h4> <p>oyom Ikechukwu</p></span>
              <span className="flex"><h4>status:</h4> <p>approved</p></span>
              <span className="flex"><h4>Date:</h4> <p>12-12-2023</p></span>
             </div>
            
          </div>
          
        </div>
        <div className="border-2 rounded-md m-2">
            <h3 className="mx-4 pt-4">Request detail</h3>

            <div className=" mt-4 mx-4">
              <div className="flex gap-16"> <p className="">Request ID:</p> <p className="">23456789-595</p></div>
              <div className="flex gap-12 mt-2"> <p className="">Request Date:</p> <p className="">23489-595</p></div>
              <div className="flex gap-20 mt-2"> <p className="">Location:</p> <p className="">Ama Brewery</p></div>
              <div className="flex gap-14 mt-2"> <p className="">Department:</p> <p className="">Engineering</p></div>
              <div className="flex gap-20 mt-2"> <p className="">Job Title:</p> <p className="">Pm Specialist</p></div>
              <div className="flex gap-4 mt-2"> <p className="">Amount Required:</p> <p className="">5000000</p></div>
              <div className="flex gap-16 mt-2"> <p className="">Bank name:</p> <p className="">Zenith Bank</p></div>
              <div className="flex gap-4 mt-2"> <p className="">Account Number:</p> <p className="">2002435642</p></div>
            </div>
        
        </div>
       </div>
       <div>comments

<CommentForm/>
<div>
  <CommentList comments={comments}/>
</div>

       </div>
      </div>
    </div>
  );
}

export default LoanDetail;
