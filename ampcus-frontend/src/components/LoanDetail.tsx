import React from "react";
import { useParams } from "react-router-dom";
import useFetchGet from "../hooks/useFetchGet";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div>
      {/* Display loan detail information here */}
      <h2>{loanDetail.loan_types}</h2>
      {/* Add more details as needed */}
    </div>
  );
}

export default LoanDetail;
