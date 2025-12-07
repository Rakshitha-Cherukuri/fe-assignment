import Profile from "../models/profile";
import User from "../models/user";

export class ProfileService {
  
  /**
   * to create new profile using userId and avatar
   * @param userId 
   * @param avatar 
   * @returns 
   */
  async createProfile(userId: string, avatar?: string): Promise<any> {
    const user = await User.findById(userId);
    // checks if the user exists or not - cannot create profile for non-existant users
    if (!user) {
      throw new Error("User not found");
    }

    const existingProfile = await Profile.findOne({ userId });
    // checks if there is a profile for the user or not - creates profile only if there is none
    if (existingProfile) {
      throw new Error("Profile already exists");
    }


    const profile = await Profile.create({ userId, avatar });
    
    return {
      ...user,
      ...profile,
      profileId: (profile._id as any).toString(),
      userId: (user._id as any).toString(),
    };
  }

  /**
   * to get the profile of a user based on the id
   * @param userId 
   * @returns 
   */
  async getProfileByUserId(userId: string): Promise<any> {
    const user = await User.findById(userId);
    // checks for the user existence
    if (!user) {
      throw new Error("User not found");
    }

    const profile = await Profile.findOne({ userId });
      return {
        ...user,
        ...profile?.toObject(),
        profileId: (profile?._id as any).toString(),
        userId: (user._id as any).toString(),
        avatar: profile?.avatar || ""
      };
  }

  /**
   * to update profile of a user - allows updation of avatar only
   * @param userId 
   * @param avatar 
   * @returns 
   */
  async updateProfile(userId: string, avatar: string): Promise<any> {
    const user = await User.findById(userId);
    // checks for the user
    if (!user) {
      throw new Error("User not found");
    }

    let profile = await Profile.findOne({ userId });
    // checks for the profile
    // if profile does not exist, creates one with the id and avatar
    if (!profile) {
      profile = await Profile.create({ userId, avatar });
    } 
    // updates the avatar for existing profiles
    else {
      profile.avatar = avatar;
      await profile.save();
    }

    return {
      ...user,
      ...profile,
      profileId: (profile._id as any).toString(),
      userId: (user._id as any).toString(),
    };
  }

  /**
   * to delete profile by user id
   * @param userId 
   * @returns 
   */
  async deleteProfile(userId: string): Promise<boolean> {
    await Profile.findOneAndDelete({ userId });
    return true;
  }
}