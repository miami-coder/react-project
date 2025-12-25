import type { FC } from "react";
import s from "./UserInfo.module.css";

export const UserInfo: FC = () => {
    return (
        <div className={s.userInfo}>
            <div className={s.avatar}>U</div>
            <span className={s.userName}>User Name</span>
        </div>
    );
};