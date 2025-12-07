import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import "./ProfilePage.css";

const API_URL = "http://localhost:3000/api";

function ProfilePage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
      setAvatarUrl(data.avatar || "");
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAvatar = async () => {
    if (!token || !avatarUrl.trim()) {
      alert("Please enter a valid avatar URL");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const data = await response.json();
      setProfile(data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to update profile");
    }
  };

  const handleDeleteProfile = async () => {
    if (!token) return;

    if (window.confirm("Are you sure you want to delete your profile? This will remove your profile picture.")) {
      try {
        const response = await fetch(`${API_URL}/profile`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete profile");
        }

        await fetchProfile();
        alert("Profile deleted successfully!");
      } catch (error: any) {
        alert(error.message || "Failed to delete profile");
      }
    }
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="profile-container">
          <p>Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <Header />
        <div className="profile-container">
          <p>Profile not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Profile</h2>
          </div>
          
          <div className="profile-avatar">
            <img src={profile.avatar} alt="Profile" />
          </div>

          {isEditing ? (
            <div className="edit-section">
              <label>Avatar URL:</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <div className="edit-buttons">
                <button onClick={handleUpdateAvatar} className="save-btn">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <label>Username:</label>
                <span>{profile._doc.username}</span>
              </div>

              <div className="info-row">
                <label>Email:</label>
                <span>{profile._doc.email}</span>
              </div>

              <div className="info-row">
                <label>Phone:</label>
                <span>{profile._doc.phoneNumber}</span>
              </div>

              <div className="info-row">
                <label>Member Since:</label>
                <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          <div className="profile-actions">
            {!isEditing && (
              <>
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Edit Avatar
                </button>
                <button onClick={handleDeleteProfile} className="delete-btn">
                  Delete Profile
                </button>
              </>
            )}
            <button onClick={() => navigate('/tasks')} className="back-btn">
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;