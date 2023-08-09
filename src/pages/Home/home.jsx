import { useEffect } from "react";
import { MainLayout, Container, FolderList } from "../../components/index"
import { useDispatch, useSelector } from "react-redux";
import { fetchFieldOwner, fetchFields, resetFields } from "../../features/fields/fieldsApiSlice";
import { useLocation } from "react-router-dom";


export const Home = () => {
    const dispatch = useDispatch();
    const { fields, userFields, currentPage, loading, hasMore } = useSelector(state => state.fields);
    const { userInfo } = useSelector(state => state.auth);
    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            if (!loading && hasMore) {
                dispatch(fetchFields(currentPage + 1));
            }
        }
    };
    const location = useLocation();

    useEffect(() => {
        // Обновляем ключ компонента при изменении маршрута
        dispatch(resetFields());
        dispatch(fetchFields(1));
    }, [location]);

    // При монтировании компонента добавляем обработчик события скроллинга
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    return (
        <MainLayout>
            <Container>
                {/* <FolderList title="Мои файлы" fields={userFields} loading={loading} account={userInfo} currentPage={currentPage} hasMore={hasMore} /> */}
                <FolderList title="Популярные файлы" fields={fields} loading={loading} account={userInfo} currentPage={currentPage} hasMore={hasMore} />
            </Container>
        </MainLayout>
    );
}