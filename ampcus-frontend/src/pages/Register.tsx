import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import StateSelector from '../components/StateSelector'
import LocalGovernmentSelector from '../components/LocalGovernmentSelector';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        sap_number: '',
        phone_number: '',
        password: '',
        date_of_birth: '',
        place_of_birth: '',
        state: '',
        lga: '',
        next_of_kin: '',
        current_grade: '',
        date_joined_nb: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleStateSelection = (state: string) => {
        setFormData({ ...formData, state, lga: '' }); // Reset lga when state changes
    };

    const handleLocalGovernmentSelection = (lga: string) => {
        setFormData({ ...formData, lga });
    };

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();

        console.log(formData)

        try {
            setLoading(true)

            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful signup
                navigate('/login');
            } else {
                // Handle signup failure
                const errorData = await response.json();

                if (errorData.email && errorData.email[0].includes('custom')) {
                    const errorMessage = errorData.email[0].replace('custom ', '')
                    console.log(errorMessage)
                    setError(errorMessage);
                    console.error('Signup failed');
                }
                if (errorData.sap_number && errorData.sap_number[0].includes('custom')) {
                    const errorMessage = errorData.sap_number[0].replace('custom ', '')
                    console.log(errorMessage)
                    setError(errorMessage);
                    console.error('Signup failed');
                }
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 text-white p-8 rounded shadow-md w-full sm:w-96">
                <h3 className="mb-4 text-center">Register</h3>
                {error ? <p className='text-red-500 text-center'>{error}</p> : ''}
                <form onSubmit={handleSignup}>
                    <InputField
                        label="First Name"
                        id="first_name"
                        type="text"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                    <InputField
                        label="Last Name"
                        id="last_name"
                        type="text"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required />
                    <InputField
                        label="Sap Number"
                        id="sap_number"
                        type="number"
                        value={formData.sap_number}
                        onChange={handleChange}
                        placeholder="Sap Number"
                        required
                    />
                    <InputField
                        label="Phone Number"
                        id="phone_number"
                        type="number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Phone Number"
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
                    <InputField
                        label="date_of_birth"
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        placeholder="Date of Birth"
                        required
                    />
                    <InputField
                        label="place_of_birth"
                        id="place_of_birth"
                        type="text"
                        value={formData.place_of_birth}
                        onChange={handleChange}
                        placeholder="place of Birth"
                        required
                    />
                    {/* Add StateSelector and LocalGovernmentSelector components */}
                    <StateSelector onSelectState={handleStateSelection} />

                    {formData.state && (
                        <LocalGovernmentSelector selectedState={formData.state} onSelectLocalGovernment={handleLocalGovernmentSelection
                        } />
                    )}

                    <InputField
                        label="date_joined_nb"
                        id="date_joined_nb"
                        type="date"
                        value={formData.date_joined_nb}
                        onChange={handleChange}
                        placeholder="date joined NB"
                        required
                    />
                    <InputField
                        label="current_grade"
                        id="current_grade"
                        type="text"
                        value={formData.current_grade}
                        onChange={handleChange}
                        placeholder="Current Grade"
                        required
                    />



                    <div className="mb-6">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${loading ? 'cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
