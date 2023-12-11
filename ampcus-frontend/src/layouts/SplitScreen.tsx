// SplitScreen.tsx

import  { ReactNode } from 'react';

interface SplitScreenProps {
  left: ReactNode;
  right: ReactNode;
}

function SplitScreen({ left, right }: SplitScreenProps) {
  return (
    <div className="split-screen">
      <div className="left-pane">{left}</div>
      <div className="right-pane">{right}</div>
    </div>
  );
}

export default SplitScreen;
