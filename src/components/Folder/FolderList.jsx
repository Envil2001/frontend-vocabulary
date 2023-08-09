
import { FolderSkeleton } from "./FolderSkeleton";
import { FolderItem } from "./FolderItem";
import "./Folder.css"
import { Title } from "../Title/Title";
export const FolderList = ({ fields, loading, title, account, currentPage, hasMore }) => {
    return (
        <div className="folder--content">
            <Title title={title} styleElement={{ marginBottom: "1rem" }} />
            <div className="folder--wrapper">
                {/* {loading
                    ? [...Array(3)].map((_, index) => <FolderSkeleton key={index} />)
                    : fields.map((field, index) => (
                        <FolderItem
                            key={index}
                            account={account}
                            {...field}
                        />
                    ))} */}
                {/* Вывод плейсхолдера для текущей страницы, если она загружается */}


                {/* Вывод постов для текущей страницы, если она уже загружена */}
                {fields.map((field, index) => (
                    <FolderItem
                        key={index}
                        account={account}
                        {...field}
                    />
                ))}

                {/* Вывод плейсхолдера для следующих страниц */}
                {loading && (
                    <>
                        {[...Array(10)].map((_, index) => (
                            <FolderSkeleton key={index} />
                        ))}
                    </>
                )}

                {/* Вывод сообщения, если больше нет страниц */}
                {!loading && !hasMore && fields.length === 0 && (
                    <div className="notFound" style={{gridColumn: "1 / span 3"}}>
                        <div className="icon">
                            😔
                        </div>
                        <p>No data found</p>
                    </div>
                )}
            </div>
        </div>
    );
}