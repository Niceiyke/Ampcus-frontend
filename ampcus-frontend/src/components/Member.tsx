import React, { useState, useEffect } from "react"; // Added React and useEffect
import useFetchGet from "../hooks/useFetchGet";
import { useAuth } from "../hooks/useAuth";
import { Member } from "../models/models";
import { Link } from "react-router-dom";

const FetchMembers: React.FC<Member> = () => {
  const { user } = useAuth();
  const api = useFetchGet();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [member, setMember] = useState<Member | null>(null);
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await api(`/member/${user?.member}`);
        setMember(response); // Set the member data
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberData();
  }, [user]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <p>Error occurred {error.message}</p>;
  }

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
                    Date Collected
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
                        {loan.loan_types}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {loan.date_approved}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {loan.borrowed_amount}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {loan.repaid_amount}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail/${loan.id}`}>
                        {loan.is_approved ? (
                          <p>Approved</p>
                        ) : (
                          <p>Not Approved</p>
                        )}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/loan-detail-unapproved/${loan.id}`}>
                        {loan.is_approved ? (
                          loan.is_active ? (
                            <p>Active</p>
                          ) : (
                            <p>Repaid</p>
                          )
                        ) : (
                          ""
                        )}
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
