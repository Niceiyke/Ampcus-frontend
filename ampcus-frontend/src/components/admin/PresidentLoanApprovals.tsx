import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import useFetchGet from "../../hooks/useFetchGet";
import { LoanData, Member } from "../../models/models";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/dateFormater";
import { formatToNaira } from "../../utils/CurrencyFormater";
import { error } from "console";

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

const PresidentApprovals: React.FC = () => {
  const { member } = useAuth();
  const api = useFetchGet();

  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const awaitingLoans = async () => {
      try {
        setIsLoading(true);
        const response = await api(`/loans-awaiting-approvals/`);

        setData(response["loans_awaiting_approvals"]);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    };

    awaitingLoans();
  }, []);

  return (
    <div>
      {member?.id && (
        <div className=" p-4 ">
          <div className="overflow-x-auto">
            <h3 className="text-center mt-4 mb-4">Loans Awaiting Approvals</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      Type Of Loan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      Date Initiated
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      Request Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      Loan Approval Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data
                    .filter((loan: LoanData) => !loan.is_president_approved)
                    .map((loan: LoanData) => (
                      <tr className="bg-white border-b" key={loan.id}>
                        <td scope="row" className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/loan-detail/${loan.id}`}>
                            {loan.loan_types}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/loan-detail/${loan.id}`}>
                            {formatDate(loan.date_initiated)}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/loan-detail/${loan.id}`}>
                            {formatToNaira(loan.borrowed_amount)}
                          </Link>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/loan-detail/${loan.id}`}>
                            {loan.is_declined ? (
                              <strong className="text-red-500">Declined</strong>
                            ) : loan.is_approved ? (
                              <strong className="text-green-500">
                                Approved
                              </strong>
                            ) : (
                              <strong className="text-orange-500">
                                Awaiting Approval
                              </strong>
                            )}
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PresidentApprovals;
