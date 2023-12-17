
export interface LoanData {
  id: string;
  borrowed_amount: string;
  repaid_amount: string;
  member: string;
  loan_type: number;
  attachments: null | any[];
  comments: any[];
  is_active: boolean;
  is_approved: boolean;
  is_treasurer_approved: boolean;
  is_declined: boolean;
  is_president_approved: boolean;
  is_user_declined: boolean;
  is_treasurer_declined: boolean;
  is_president_declined: boolean;
  owner: string;
  loan_types: string;
  date_initiated: string;
  date_declined: string | null;
  date_updated: string;
  date_approved: string | null;
}



interface Loan {
  id: string;
  member: string;
  loan_type: string;
  borrowed_amount: string;
  repaid_amount: string;
  attachments: any;
  comments: any[];
  is_active: boolean;
  is_treasurer_approved: boolean;
  is_president_approved: boolean;
  is_treasurer_declined: boolean;
  is_president_declined: boolean;
  is_user_declined: boolean;
  is_approved: boolean;
  is_declined: boolean;
  date_initiated: string;
  date_declined: string;
  date_updated: string;
  date_approved: string;
}

interface User {
  id: string;
  email: string;
  sap_number: string;
  first_name: string;
  last_name: string;
  place_of_birth: string;
  state_of_origin: string;
  lga: string;
  marital_status: string;
  next_of_kin: string;
  phone_number: string;
  date_joined_nb: string;
  date_of_birth: string;
  currnent_grade: string;

}

export interface Member {
  id: string;
  location: string;
  user: User;
  monthly_contribution: string;
  profile_picture: string;
  bank_name: string;
  bank_account: string;
  department: string;
  job_title: string
  total_contribution: string;
  total_loan: string;
  avaliable_balance: string;
  existing_loan: Loan[];
  is_president:boolean;
  is_treasurer:boolean;
  is_admin_officer:boolean
}


export interface Token {
  email: string;
  exp: number;
  iat: number;
  jti: string;
  member: string;
  token_type: string;
  id: string;
  user_id: number;
}