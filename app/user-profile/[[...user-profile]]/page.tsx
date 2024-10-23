import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex h-screen items-center justify-center">
    <UserProfile path="/user-profile" />
  </div>
);

export default UserProfilePage;
