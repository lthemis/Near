import { useState, createContext, useContext } from "react";
import { LoginData } from '../Models/user'

interface ContextInterface {
  login: Function,
  logout: Function,
  user: LoginData
}

const AuthContext = createContext<ContextInterface|null>(null)

export const AuthProvider = ({ children }:any) => {

  const [user, setUser] = useState<LoginData>({} as LoginData)
  // const [user, setUser] = useState<LoginData | null>(null)

  console.log('auth',user);
  
  // const login = (user:LoginData) => {
  const login = (user:LoginData) => {

    setUser(user)
  }
  
  const logout = () => {
    console.log('logout');
    
    setUser({} as LoginData)
    // setUser(null)

  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}