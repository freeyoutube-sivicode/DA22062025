import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  Username: string;
  Email: string;
  Role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performAuthCheck = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`/api/nguoi-dung/${userId}`);
          setUser(response.data.data);
          toast.success('Đã xác thực phiên đăng nhập.');
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    performAuthCheck();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/nguoi-dung/login', {
        UserName: email,
        Password: password,
      });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post('/api/nguoi-dung/register', {
        username,
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.Role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 