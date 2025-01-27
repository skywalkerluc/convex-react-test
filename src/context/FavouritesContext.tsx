import React, { createContext, useContext, useState } from 'react';

import { FavouriteEstablishment } from '../types/favourites';

type FavouritesContextType = {
  favourites: FavouriteEstablishment[];
  toggleFavourite: (establishment: FavouriteEstablishment) => void;
  removeFavourite: (id: number) => void;
  clearFavourites: () => void;
};

const FavouritesContext = createContext<FavouritesContextType>({} as FavouritesContextType);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<FavouriteEstablishment[]>([]);

  const toggleFavourite = (establishment: FavouriteEstablishment) => {
    setFavourites((prev) => {
      const exists = prev.some((fav) => fav.id === establishment.id);
      return exists ? prev.filter((fav) => fav.id !== establishment.id) : [...prev, establishment];
    });
  };

  const removeFavourite = (id: number) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, removeFavourite, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
