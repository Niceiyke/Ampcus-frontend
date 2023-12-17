import React, { useState, ChangeEvent } from 'react';

const NigerianStates: string[] = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

interface StateSelectorProps {
    onSelectState: (selectedState: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ onSelectState }) => {
    const [selectedState, setSelectedState] = useState < string > ('');

    const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const state = e.target.value;
        setSelectedState(state);
        onSelectState(state);
    };

    return (
        <div>
            <label htmlFor="state">Select State:</label>
            <select id="state" value={selectedState} onChange={handleStateChange}>
                <option value="">Select a state</option>
                {NigerianStates.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StateSelector;
