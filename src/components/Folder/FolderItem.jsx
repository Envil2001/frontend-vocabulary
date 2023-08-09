import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { Link } from "react-router-dom"
import { checkOwnership } from "../../helpers/checkOwnership/checkOwnership"
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { useDispatch } from "react-redux";
import { CreateField } from "../Modal/modalComponents/CreateFields/CreateFields";
import { deleteField } from "../../features/fields/fieldsApiSlice";

export const FolderItem = ({ _id, title, words, viewsCount, account, user }) => {
    const { handleModal } = useContext(ModalContext);
    const isOwner = checkOwnership(user._id, account?.id);
    const dispatch = useDispatch();
    return (
        <>
            {
                <div className="folder">
                    <Link to={`/field/${_id}`}>
                        <h2 className="folder__title">{title}</h2>
                        <p className="folder__subtitle">{words.length} {words.length > 1 ? 'терминов' : 'термин'}</p>
                    </Link>

                    <div className="folder__views">
                        <div className="folder__views___details">
                            <AiOutlineEye />
                            <span>{viewsCount}</span>
                        </div>
                        {isOwner &&
                            <div className="folder--icon__wrapper">
                                <div className="folder--icon" onClick={() => dispatch(deleteField(_id))}>
                                    <AiOutlineDelete />
                                </div>
                                <div className="folder--icon" onClick={() => handleModal(<CreateField folderId={_id} data={title} />)}>
                                    <AiOutlineEdit  />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </>

    )
}