import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password, role = 'user', storeInfo = null) => {
    // In a real app, you would validate credentials with a backend
    // This is just a mock implementation
    if (email && password) {
      setUser({
        email,
        name: email.split('@')[0],
        role,
        storeInfo
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isSeller: user?.role === 'seller'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 