import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { toast } from 'react-toastify';
import styles from './LoginPage.module.scss'; // Import SCSS module
import { LoginCredentials } from '../api/types'; // Keep if needed for form data type, although not directly used by useAuth login

// Import icons (assuming you are using Font Awesome or similar) or use Ant Design icons if preferred
// For simplicity, I'll use placeholder <i> tags and suggest adding icon libraries if needed.
// If using Ant Design icons, you would import them like: import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // Get login function and loading state from AuthContext
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    UserNameOrEmail: '',
    Password: '',
    rememberMe: false, // Added remember me state
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.UserNameOrEmail || !formData.Password) {
        toast.error('Vui lòng điền đầy đủ Tên đăng nhập hoặc Email và Mật khẩu.');
        return;
    }

    // Set loading state handled by AuthContext's login function now
    // setLoading(true);
    try {
      // Call login function from AuthContext
      await login(formData.UserNameOrEmail, formData.Password);
      // setUser is called inside AuthContext's login
      // dispatch(setUser(user));
      // Success toast is shown inside AuthContext's login
      // toast.success('Đăng nhập thành công!');
      navigate('/'); // Navigate after successful login
    } catch (error: any) {
      // Error handling can remain here or be centralized in AuthContext
      const errorMessage = error.message || 'Có lỗi xảy ra khi đăng nhập';
      toast.error(errorMessage);
    } finally {
      // Loading state is managed by AuthContext
      // setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h2 className={styles.login__title}>Đăng nhập</h2>
        {/* You can add an Alert component here for displaying errors if needed */}
        {/* {error && <div className="alert alert-danger">{error}</div>} */}

        <form onSubmit={handleSubmit} className={styles.login__form}>
          <div className={styles['login__form-group']}>
            {/* Visually hidden label */}
            <label htmlFor="usernameOrEmail" className="sr-only">Tên đăng nhập hoặc Email</label>
            <div className={styles['login__input-group']}>
              {/* Icon for username/email field */}
              <div className={styles['login__input-group-icon']}>
                 <i className="fas fa-user"></i> {/* Example using Font Awesome */}
                 {/* Or if using Ant Design: <UserOutlined /> */}
              </div>
              <input
                type="text"
                id="usernameOrEmail"
                name="UserNameOrEmail"
                value={formData.UserNameOrEmail}
                onChange={handleInputChange}
                required
                placeholder="Tên đăng nhập"
                className={styles.login__input}
              />
            </div>
          </div>

          <div className={styles['login__form-group']}>
             {/* Visually hidden label */}
            <label htmlFor="password" className="sr-only">Mật khẩu</label>
            <div className={styles['login__input-group']}>
              {/* Icon for password field */}
              <div className={styles['login__input-group-icon']}>
                <i className="fas fa-lock"></i> {/* Example using Font Awesome */}
                {/* Or if using Ant Design: <LockOutlined /> */}
              </div>
              <input
                type="password"
                id="password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                required
                placeholder="Mật khẩu"
                className={styles.login__input}
              />
            </div>
          </div>

          <div className={styles.login__options}>
             <div className={styles['login__form-check']}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={styles['login__form-check-input']}
                />
                <label htmlFor="rememberMe" className={styles['login__form-check-label']}>Ghi nhớ đăng nhập</label>
             </div>
             {/* Add Forgot Password Link */}
             <Link to="/forgot-password" className={styles['login__forgot-password-link']}>Quên mật khẩu?</Link>
          </div>

          <div className={styles['login__form-group']}>
            <button
              type="submit"
              disabled={loading}
              className={styles.login__button}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </div>
        </form>
        <p className={styles['login__register-text']}>
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 