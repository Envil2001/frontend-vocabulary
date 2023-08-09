import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "../../UI";
import { Container, FolderList, MainLayout } from "../../components";
import { useParams } from "react-router-dom";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { userGetById } from "../../features/users/usersApiSlice";
import { fetchFieldOwner } from "../../features/fields/fieldsApiSlice";
import { ModalContext } from "../../context/modalContext";
import { EditProfile } from "../../components/Modal/modalComponents/EditProfile/EditProfile";
import "./Profile.css";

export const Profile = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const { loading, userFields } = useSelector((state) => state.fields);
  const { handleModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetById(id));
  }, [dispatch, id]);

  // Функция для определения, это текущий авторизованный пользователь или нет
  const isCurrentUser = useMemo(() => userInfo?.id === id, [userInfo, id]);

  return (
    <MainLayout>
      <Container>
        <div>
          {loading ? (
            <ProfileSkeleton />
          ) : (
            <div>
              <div className="profile__wrapper">
                <div
                  className="bg__profile"
                  style={{
                    backgroundImage: `url(https://leonardo.osnova.io/72741815-21a2-51ad-b5f1-6952fad191a8/-/scale_crop/1920/-/format/webp/)`,
                  }}
                ></div>
                <Avatar
                  className="profile__avatar"
                  size={112}
                  title={isCurrentUser ? userInfo?.fullName : user?.fullName}
                  image={isCurrentUser ? (userInfo?.avatarPath !== "" && `http://localhost:5000${userInfo?.avatarPath}`) : (user?.avatarPath !== "" && `http://localhost:5000${user?.avatarPath}`)}
                  colorAvatar={isCurrentUser ? userInfo?.colorAvatar : user?.colorAvatar}
                />
                <h2 className="profile__fullname">{isCurrentUser ? userInfo?.fullName : user?.fullName}</h2>
                <p className="profile__description">{isCurrentUser ? userInfo?.aboutInfo : user?.aboutInfo}</p>
                {isCurrentUser && (
                  <div className="profile__subscribe__wrapper">
                    <Button stylesElement={{ background: "#4683d9", color: "#fff" }} onClick={() => handleModal(<EditProfile userInfo={userInfo} />)}>Редактировать</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </MainLayout>
  );
};