import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../types';

interface AppContextType {
  wishlist: Car[];
  compareList: Car[];
  addToWishlist: (car: Car) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  addToCompare: (car: Car) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Car[]>([]);
  const [compareList, setCompareList] = useState<Car[]>([]);

  const addToWishlist = (car: Car) => {
    if (!wishlist.find(c => c.id === car.id)) {
      setWishlist([...wishlist, car]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(c => c.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(c => c.id === id);
  };

  const addToCompare = (car: Car) => {
    if (compareList.length < 3 && !compareList.find(c => c.id === car.id)) {
      setCompareList([...compareList, car]);
    } else if (compareList.length >= 3) {
      alert('You can only compare up to 3 cars at a time.');
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter(c => c.id !== id));
  };

  const isInCompare = (id: string) => {
    return compareList.some(c => c.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        compareList,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
