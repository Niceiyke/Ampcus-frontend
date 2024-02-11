import React from "react"; // Added React and useEffect
import { useAuth } from "../../hooks/useAuth";
import { Member } from "../../models/models";
import { Link } from "react-router-dom";
import { formatToNaira } from "../../utils/CurrencyFormater";
import { formatDate } from "../../utils/dateFormater";

const FetchMembers: React.FC = () => {
  const {  member} = useAuth();

  console.log(member)



  return (
    <div>
      {member?.id && (
        <div className=" p-4 ">
          <div className="overflow-x-auto">
            <h3 className="text-center mt-4 mb-4">Active Loan</h3>
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
                    Date Approved
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Amount Borrowed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Amount Repaid
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Loan Approval Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Loan Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {member.existing_loan.map((loan) => (
                  <tr className="bg-white border-b" key={loan.id}>
                    <td scope="row" className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {loan.loan_type}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {formatDate(loan.date_approved)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {formatToNaira(loan.borrowed_amount)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {formatToNaira(loan.repaid_amount)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {loan.is_declined ? (
                          <strong className="text-red-500">Declined</strong>
                        ) : loan.is_approved ? (
                          <strong className="text-green-500">Approved</strong>
                        ) : (
                          <strong className="text-orange-500">
                            Awaiting Approval
                          </strong>
                        )}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail-unapproved/${loan.id}`}>
                        {loan.is_approved ? <p>Active</p> : <p></p>}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchMembers;
