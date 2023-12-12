import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import decryptData from '../utils/encryptdycrpt';
import { Token, Member } from '../models/models';



interface AuthContextProps {
    user: Token;
    member: Member;
    accessToken: string;
    refreshToken: string;
    setMember: Dispatch<SetStateAction<any>>;
    setRefreshToken: Dispatch<SetStateAction<any>>;
    logout: () => void;
    setUser: Dispatch<SetStateAction<any>>;
    setAccessToken: Dispatch<SetStateAction<any>>;
}
const usersdata = {
    id: '',
    email: '',
    sap_number: '',
    first_name: '',
    last_name: '',
    place_of_birth: '',
    state_of_origin: '',
    lga: '',
    marital_status: '',
    next_of_kin: '',
    phone_number: '',
    date_joined_nb: '',
    date_of_birth: '',
    currnent_grade: '',
}

const initialMemberData =
{
    id: 0,
    location: '',
    user: usersdata,
    monthly_contribution: 0,
    profile_picture: '',
    bank_name: '',
    bank_account: '',
    department: '',
    job_title: '',
    total_contribution: 0,
    total_loan: 0,
    available_balance: 0,
    existing_loan: [],
}


export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState(decryptData('user'));
    const [accessToken, setAccessToken] = useState(decryptData('access'));
    const [refreshToken, setRefreshToken] = useState(decryptData('refresh'));
    const [member, setMember] =  useState(decryptData('member'));

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    };

    return (
        <AuthContext.Provider
            value={{ user, accessToken, refreshToken, member, setMember, setRefreshToken, logout, setUser, setAccessToken }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
