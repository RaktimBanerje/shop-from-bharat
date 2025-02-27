// "use client" to specify that this file should be treated as a client-side component in Next.js
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";

const usePasswordVisible = () => {
  const [visible, setVisible] = useState(false);

  // Ternary operator to choose which icon to use based on visibility
  const Icon = visible ? EyeOff : Eye;

  const toggleVisibility = () => {
    setVisible(prevVisible => !prevVisible);  // Toggle visibility state
  };

  return [visible, Icon, toggleVisibility];  // Return state and icons
};

export default usePasswordVisible;
