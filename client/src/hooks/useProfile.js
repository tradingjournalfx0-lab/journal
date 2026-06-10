import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

export default function useProfile() {

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchProfile =
  async()=>{

    try{

      setLoading(true);

      const data =
        await getProfile();

      setProfile(data);

    }catch(err){

      setError(
        err.message
      );

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    fetchProfile();

  },[]);

  const saveProfile =
  async(profileData)=>{

    try{

      const updated =
        await updateProfile(
          profileData
        );

      setProfile(updated);

    }catch(err){

      setError(
        err.message
      );

    }

  };

  return {

    profile,
    loading,
    error,
    fetchProfile,
    saveProfile,

  };

}