import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/reducer/userSlice";

const Comment = ({ comment, handleReply, setShowEdit, setCommentEdit, reply = false }) => {
    const { user } = useSelector(userSelector);
    const date = new Date(comment.createdAt);
    const dateToString = [(date.getDate() > 9 ? '' : '0') + date.getDate(), (date.getMonth()+1 > 9 ? '' : '0') + (date.getMonth()+1), date.getFullYear()].join('-');

    return (
        <div className={`comment_main ${reply && 'reply' }`}>
            <img className="comment_avatar" src="Img/avatar.png" alt="avatar" />
            <div className="comment_content">
                <div className="content_header">
                    <span className="name">{comment.user.firstname}</span>
                    <i className="fas fa-history"></i>
                    <span className="date">{dateToString}</span>
                </div>
                <div className="content_text">{comment.content}</div>
                <div className="content_footer">
                    <div onClick={() => handleReply()}>
                        <i className="fas fa-comments"></i>
                        <span>Trả lời</span>
                    </div>
                    {user && user._id === comment.user._id && (
                        <div
                            onClick={() => {
                                setShowEdit(comment._id);
                                setCommentEdit(comment.content);
                            }}
                        >
                            <i className="fas fa-edit"></i>
                            <span>Chỉnh sửa</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
