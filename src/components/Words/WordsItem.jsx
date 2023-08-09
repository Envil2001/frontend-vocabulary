
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { BsPlay } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { timeFromNow } from "../../helpers/timeFromNow/timeFromNow";
import { checkOwnership } from "../../helpers/checkOwnership/checkOwnership";
import { deleteWord } from "../../features/fields/fieldsApiSlice";
import { useDispatch } from "react-redux";

export const WordsItem = ({ _id, user_id, post_id, currentId, description, translate, title, createdAt, account, handleEdit}) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(null);
    const isOwner = checkOwnership(user_id, account?.id);
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };

    const handleEditWord = () => {
        handleEdit(_id); // Передаем информацию о редактируемом слове в родительский компонент
    }
    return (
        <>
            {
                <div className="word">
                    <div className="word__header">
                        <div className="word__header_item">
                            <div className="word__border"></div>
                            <div>
                                <h4 className="word__title">{title}</h4>
                                <p className="word__translate">{translate}</p>
                            </div>
                        </div>
                        <div className="word__btns">
                            {isOwner && (
                                    <>
                                        <div className="word__btn" onClick={handleEditWord}>
                                            <AiOutlineEdit size={20} />
                                        </div>
                                        <div className="word__btn" onClick={() => dispatch(deleteWord({post_id, _id}))}>
                                            <AiOutlineDelete size={20} />
                                        </div>
                                    </>
                                )}
                            <div className="word__btn">
                                <BsPlay size={20} />
                            </div>
                            <div className="word__btn" onClick={() => toggle(currentId)}>
                                <IoIosArrowDown size={20} />
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            selected === currentId ? "word__details show" : "word__details"
                        }
                    >
                        <div className="word__details_content">{description}</div>
                        <data>{timeFromNow(createdAt)}</data>
                    </div>
                </div>
            }

        </>

    )
}