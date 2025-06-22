import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Vui lòng đăng nhập để xem thông tin cá nhân</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Thông tin cá nhân</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <p className="mt-1 text-gray-900">{user.FullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user.Email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <p className="mt-1 text-gray-900">{user.Phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <p className="mt-1 text-gray-900">{user.Address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 