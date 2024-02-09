// SplitScreen.tsx

import  { ReactNode } from 'react';

interface SplitScreenProps {
  left: ReactNode;
  right: ReactNode;
}

function SplitScreen({ left, right }: SplitScreenProps) {
  return (
    <div className="flex">
      <div className="hidden md:block">{left}</div>
      <div className=" w-[100%] mt-2">{right}</div>
    </div>
  );
}

export default SplitScreen;
