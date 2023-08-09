

export const ProfileSkeleton = () => {

    return (
        <div className="profile__wrapper">
            <div className="bg__profile skeleton">
            </div>
            <div className="profile__avatar skeleton">
            </div>
            <h2 className="profile__fullname skeleton"></h2>
            <p className="profile__description skeleton"></p>
        </div>
    )
}