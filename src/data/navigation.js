import { ActivateUser, FolderPage, Home, Login, Profile, Quiz, Registration, TestPage } from "../pages";

const navigationData = [
  {
    link: '/',
    element: <Home />
  },
  {
    link: '/login',
    element: <Login />
  },
  {
    link: '/registration',
    element: <Registration />
  },
  {
    link: '/field/:id',
    element: <FolderPage />
  },
  {
    link: '/field/:id/quiz1',
    element: <Quiz />
  },
  {
    link: '/user/:id',
    element: <Profile />
  },
  {
    link: '/activation',
    element: <ActivateUser />
  },
  {
    link: '/test',
    element: <TestPage />
  },
];

export default navigationData;
