import { useContext } from "react";
import UserContext from "Contexts/user";

const Profile = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <ul>
        {Object.keys(user).map((key) => (
          <li key={key}>
            {key}: {user[key].toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
