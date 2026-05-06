import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase kullanıcı durumunu dinle
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firestore'dan kullanıcı bilgilerini al
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            name: userData.name,
            email: firebaseUser.email || '',
            avatar: userData.avatar
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase ile kayıt ol
  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Kullanıcı bilgilerini Firestore'a kaydet
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name,
        email,
        createdAt: new Date(),
        avatar: ''
      });
      
    } catch (error) {
      console.error('Kayıt hatası:', error);
      throw error;
    }
  };

  // Firebase ile giriş yap
  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Giriş hatası:', error);
      throw error;
    }
  };

  const login = (userData: User) => {
    // Demo için eski fonksiyon korundu
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Firestore'u güncelle
      try {
        await setDoc(doc(db, 'users', user.id), {
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar || ''
        }, { merge: true });
      } catch (error) {
        console.error('Profil güncelleme hatası:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      loginWithEmail, 
      logout, 
      updateUser 
    }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};