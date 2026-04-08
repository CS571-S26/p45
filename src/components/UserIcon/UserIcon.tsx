import "./UserIcon.css";

interface Props {
  initial: string;
}

const UserIcon = ({ initial }: Props) => {
  return (
    <div className="user-icon-container">
      <p>{initial}</p>
    </div>
  );
};

export default UserIcon;