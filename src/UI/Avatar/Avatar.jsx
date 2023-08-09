import "./Avatar.css"

export const Avatar = ({ className = "", size = 40, title, image, colorAvatar }) => {
    const sizeInner = `${size}px`
    const sizeTitle = `${size / 2}px`
    const firstNameInitial = title?.substring(0, 1);
    const lastNameInitial = title?.substring(title.indexOf(' ') + 1, title.indexOf(' ') + 2);

    return (
        <div className={`avatar ${className}`} style={{ width: sizeInner, height: sizeInner }}>
            {image && (
                <img
                    className="AvatarFace"
                    src={image}
                    alt=""
                    width={sizeInner}
                    height={sizeInner}
                />
            )}
            {title && !image && (
                <div className="AvatarFace" style={{ fontSize: sizeTitle, background: colorAvatar }} >
                    {firstNameInitial + lastNameInitial}
                </div>
            )}
        </div>
    )
}