import s from "./UserInfo.module.css";

export const UserInfo = () => (
    <div className={s.userWrapper}>
        <div className={s.avatarCircle}>B</div>
        <span className={s.name}>Bohdan Palamarchuk</span>
    </div>
);