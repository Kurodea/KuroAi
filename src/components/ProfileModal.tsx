import React, { useState } from 'react';
import { X, User, Mail, Save, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    // Burada API çağrısı yapılabilir
    console.log('Profile updated:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Profil Ayarları</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Avatar Section */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
                ) : (
                  getInitials(user.name)
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                Ad Soyad
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : ''
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : ''
                  }`}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Düzenle
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name,
                        email: user.email,
                      });
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Kaydet</span>
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Account Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-black mb-3">Hesap Bilgileri</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Hesap ID: {user.id}</p>
              <p>Üyelik Tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
              <p>Son Giriş: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;