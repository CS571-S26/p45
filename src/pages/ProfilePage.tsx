import { useContext } from "react";
import ProfileCard from "../components/Profile/ProfileCard";
import { UserContext } from "../contexts/UserContext";

const ProfilePage = () => {
  const context = useContext(UserContext);

  if (!context) return null;

  const { username } = context;

  if (!username) {
    return <h2>Please log in to view your profile.</h2>;
  }

  return (
    <div>
      <h1>{username}'s Profile</h1>
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
