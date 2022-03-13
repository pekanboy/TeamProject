import React from "react";
import style from './MapButton.module.css';
import classNames from "classnames";

export interface MapButtonProps {
    className?: string;
    isActive?: boolean;
    onClick: () => void;
}

export const MapButton: React.FC<MapButtonProps> = ({className, isActive, children, onClick,}) => {
    return (
        <button
            className={classNames(
                className,
                style.button,
                {
                    [style.active]: isActive
                })
            }
            onClick={onClick}
        >{children}</button>
    )
}