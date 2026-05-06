import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileDropdownProps {
  onOpenProfile: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onOpenProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    onOpenProfile();
    setIsOpen(false);
  };

  // Kullanıcı adının ilk harflerini al
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
      >
        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <span className="hidden sm:block font-medium">{user.name.split(' ')[0]}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-black">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          <button
            onClick={handleProfileClick}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <User className="h-4 w-4" />
            <span>Profil Ayarları</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;