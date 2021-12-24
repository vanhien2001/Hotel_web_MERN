import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/reducer/userSlice";

const WriteComment = ({ title, handleSubmit, handleOnChange, handleCancel, value, showCancel =true, reply = false }) => {
    const { user } = useSelector(userSelector);

    return (
        <div className={`write_comment ${reply && 'reply' }`}>
            <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                <div className="title">{title}</div>
                <textarea
                    name="content"
                    placeholder={
                        user
                            ? "Nhập bình luận của bạn"
                            : "Bạn cần đăng nhập để viết bình luận"
                    }
                    value={value}
                    onChange={(e) => handleOnChange(e)}
                    disabled={user ? false : true}
                    required
                ></textarea>
                <button
                    className="btn"
                    type="submit"
                    disabled={user ? false : true}
                >
                    Gửi
                </button>
                {showCancel && 
                    <button className="btn" type="submit" onClick={(e) =>{e.preventDefault(); handleCancel()}}>
                        Huỷ
                    </button>
                }
            </form>
        </div>
    );
};

export default WriteComment;
