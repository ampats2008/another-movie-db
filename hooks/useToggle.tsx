import { useState, useCallback } from "react";

export const useToggle : (initial: any) => [any, () => void] = (initial) => {  
  const [open, setOpen] = useState(initial);   
  
  return [open, useCallback(() => setOpen((status:any) => !status), [open])];
};