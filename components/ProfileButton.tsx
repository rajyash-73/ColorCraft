import React from 'react';
import Link from 'next/link';
import { useAuth } from '../client/src/hooks/use-auth';
import { User, LogOut } from 'lucide-react';

const ProfileButton: React.FC = () => {
  const { user, logoutMutation } = useAuth();
  
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutMutation.mutate();
  };
  
  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center space-x-3">
          <Link href="/profile" className="flex items-center hover:text-blue-600 transition-colors">
            <User size={18} className="mr-2" />
            <span className="hidden sm:inline">{user.username}</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full"
            aria-label="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        <Link 
          href="/auth" 
          className="flex items-center hover:text-blue-600 transition-colors font-medium"
        >
          <User size={18} className="mr-2" />
          <span>Log In</span>
        </Link>
      )}
    </div>
  );
};

export default ProfileButton;