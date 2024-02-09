"use client"

import React, { useState, ChangeEvent, FormEvent } from "react";
import InputField from "../components/InputField";
import StateSelector from "../components/user/StateSelector";
import LocalGovernmentSelector from "../components/user/LocalGovernmentSelector";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const router = useRouter();

  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    sap_number: "",
    phone_number: "",
    password: "",
    date_of_birth: "",
    place_of_birth: "",
    state_of_origin: "",
    lga: "",
    next_of_kin: "",
    current_grade: "",
    date_joined_nb: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleStateSelection = (state_of_origin: string) => {
    setFormData({ ...formData, state_of_origin, lga: "" });
  };

  const handleLocalGovernmentSelection = (lga: string) => {
    setFormData({ ...formData, lga });
  };

  const handleSignup = async (e: FormEvent) => {
    console.log(formData);
    e.preventDefault();

    // Additional client-side validation can be added here

    try {
      setLoading(true);

      const response = await fetch(
        `http://127.0.0.1:8000/api/signup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();

        if (errorData.email || errorData.sap_number) {
          const errorMessage = (errorData.email ||
            errorData.sap_number)[0].replace("custom ", "");
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred during signup.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-2">
      <div className="bg-slate-800 text-white p-8 rounded shadow-md w-full sm:w-96">
        <h3 className="mb-4 text-center">Register</h3>
        {error ? <p className="text-red-500 text-center">{error}</p> : ""}
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
            required
          />
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

          {formData.state_of_origin && (
            <LocalGovernmentSelector
              selectedState={formData.state_of_origin}
              onSelectLocalGovernment={handleLocalGovernmentSelection}
            />
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
          <InputField
            label="next_of_kin"
            id="next_of_kin"
            type="text"
            value={formData.next_of_kin}
            onChange={handleChange}
            placeholder="Next of Kin"
            required
          />

          <div className="mb-6">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
