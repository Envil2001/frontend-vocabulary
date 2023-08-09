import React, { useMemo } from "react";
import "./input.css";

export const Input = React.memo(
    React.forwardRef(
        (
            { value, label, name, placeholder, type = "text", onChange, stylesElement, onKeyDown, onClick, error, autocompleteOFF },
            ref
        ) => {
            const isError = useMemo(() => error?.errors.find((err) => err.path === name), [error, name]);

            return (
                <div className="field__wrapper">
                    <div className={`field__input${isError ? ` error` : ""}`} style={stylesElement}>
                        {label && <label htmlFor="input-field">{label}</label>}
                        <input
                            ref={ref}
                            type={type}
                            value={value}
                            name={name}
                            className="form-control"
                            placeholder={placeholder}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            onClick={onClick}
                            autoComplete={autocompleteOFF ? "off" : "on"}
                        />
                    </div>
                    {isError && <small>{isError.msg}</small>}
                </div>
            );
        }
    )
);