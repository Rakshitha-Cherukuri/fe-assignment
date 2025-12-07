import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000/api";

interface Profile {
  profileId: string;
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  createdAt: string;
}

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, avatar: string) => Promise<void>;
  deleteProfile: (userId: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`);
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userId: string, avatar: string) => {
    try {
      const response = await axios.put(`${API_URL}/profile/${userId}`, { avatar });
      setProfile(response.data);
    } catch (error) {
      throw error;
    }
  };

  const deleteProfile = async (userId: string) => {
    try {
      await axios.delete(`${API_URL}/profile/${userId}`);
      setProfile(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, isLoading, fetchProfile, updateProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};