import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CepContext = createContext();

export function CepProvider({ children }) {
  const { user } = useAuth();
  const [cepInfo, setCepInfo] = useState(null);

  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`astro_cep_${user.id}`);
      setCepInfo(saved ? JSON.parse(saved) : null);
    } else {
      setCepInfo(null);
    }
  }, [user?.id]);

  function salvarCep(info) {
    setCepInfo(info);
    if (user?.id) {
      localStorage.setItem(`astro_cep_${user.id}`, JSON.stringify(info));
    }
  }

  return (
    <CepContext.Provider value={{ cepInfo, salvarCep }}>
      {children}
    </CepContext.Provider>
  );
}

export function useCep() {
  return useContext(CepContext);
}
