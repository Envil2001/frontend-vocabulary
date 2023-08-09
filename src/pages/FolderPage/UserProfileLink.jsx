import { Link } from "react-router-dom";
import { Avatar } from "../../UI";
import { Form } from "../../components";


export const UserProfileLink = ({ user }) => {
    return (
        <Form>
            <Link to={`/user/${user?._id}`}>
                <div className="content-title__profile">
                    <Avatar className="profile-avatar" size={40} title={user?.fullName} image={user?.avatarPath !== "" && `http://localhost:5000${user?.avatarPath}`} colorAvatar={user?.colorAvatar} />
                    <div className="about">
                        <p style={{ fontWeight: "700", fontSize: "15px" }}>{user?.fullName}</p>
                        <p style={{ opacity: "0.5", fontSize: "15px" }}>{user?.email}</p>
                    </div>
                </div>
            </Link>
        </Form>
    );
};