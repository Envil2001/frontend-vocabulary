import "./Words.css"
import { WordsItem } from "./WordsItem"
import { WordsItemSkeleton } from "./WordsItemSkeleton"


export const WordsList = ({ loading, data, account, handleEdit }) => {
    return (
        <>

            {data?.words?.map((word, index) => (
                <WordsItem
                    key={index}
                    account={account}
                    currentId={index}
                    handleEdit={handleEdit}
                    {...word}
                />
            ))}

            {loading && (
                <>
                    {[...Array(3)].map((_, index) => (
                        <WordsItemSkeleton key={index} />
                    ))}
                </>
            )}

            {!loading && data?.words?.length === 0 && (
                <div className="notFound">
                    <div className="icon">
                        😔
                    </div>
                    <p>No data found</p>
                </div>
            )}

            {/* {loading ? (
                [...Array(3)].map((_, index) => <WordsItemSkeleton key={index} />)
            ) : data?.words?.length === 0 ? (
                <div className="notFound">
                    <div className="icon">
                        😔
                    </div>
                    <p>No data found</p>
                </div>
            ) : (
                data?.words?.map((word, index) => (
                    <WordsItem
                        key={index}
                        account={account}
                        currentId={index}
                        handleEdit={handleEdit}
                        {...word}
                    />
                ))
            )} */}

        </>
    )
}