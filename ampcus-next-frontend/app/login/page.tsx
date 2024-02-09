"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import InputField from '../components/InputField';
import { Token } from '../models/models';
import { useRouter } from 'next/navigation';
import { getMember } from '../api/apis';
import { useAuth } from '../hooks/useAuth';


const Login: React.FC = () => {
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const {setMember,member}=useAuth()

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const token = await response.json()
                const access_token = token.access
                const refresh_token = token.refresh

               const user=jwtDecode<Token>(access_token)
               const res= await getMember(user.member)
               setMember(res)

               localStorage.setItem('member', JSON.stringify(res))

                localStorage.setItem("access", JSON.stringify(access_token))
                localStorage.setItem("refresh", JSON.stringify(refresh_token))

                router.push('/dashboard')
           
                


            } else {
                // Handle Login failure
                setError('Incorrect email or password');
                console.error('Login failed');
                throw new Error('some message');
            }
        } catch (error) {
            console.error('Error during Login:', error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 p-8 rounded shadow-md text-white w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <p className="text-red-500 font-extralight text-center">{error}</p>
                <form onSubmit={handleLogin}>
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <div className="mb-6">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${loading ? 'cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
