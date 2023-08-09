import { useRef, useState } from "react";
import { Input } from "../../UI";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../../features/search/searchSlice";
import { AiOutlineEye } from "react-icons/ai"
const HeaderCenter = () => {
    const [showResults, setShowResults] = useState(false);
    const { filteredItems, loading } = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const handleInputChange = () => {
        const value = inputRef.current.value.toLowerCase();
        dispatch(searchPosts(value));
        setShowResults(value.length > 0);
    };

    return (
        <div className="header__section header__section--center">
            <Input
                type="text"
                ref={inputRef}
                placeholder="Поиск"
                name="search"
                onChange={handleInputChange}
                stylesElement={{ background: "#ffdee5" }}
                autocompleteOFF
            />

            {showResults && (
                <div className="search__list">
                    <div className="search__list--wrapper">
                        {
                            loading ?
                                <div className="search__list--item skeleton"></div>
                                :
                                <>
                                    {filteredItems.length > 0 ? filteredItems.map((item, _) => (
                                        <Link to={`/field/${item._id}`} key={item._id}>
                                            <div className="search__list--item" key={item._id}>
                                                {item.title}
                                                <div className="views">
                                                    <AiOutlineEye />
                                                    {item.viewsCount}
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                        :
                                        <p className="search__list--notfound">Ничего не найдено</p>
                                    }
                                </>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default HeaderCenter;