import React, { useState } from 'react';
import Button from '../../../UI/button/Button';
import './CommentSection.scss';

const CommentsSection = () => {
    const [comments, setComments] = useState([])

    const addComment = () => {
        
    }

    return (
        <div className="infourok-main-item">
            <p className="infourok-main-item__title">Комментарии к уроку</p>
            <div className="infourok-main-box">
                {comments.length === 0 ? (
                    <p className="infourok-main-box__title">Вы пока не добавили ни одного комментария к уроку</p>
                    ) : (
                        comments.map((comment, index) => (
                            <div className="comment-item" key={index}>
                                <p className="comment-item__text">{comment.text}</p>
                                <Button classNameElement="btn-red">Удалить</Button>
                                
                            </div>
                        ))
                    )}
            </div>
            <Button classNameElement="btn-blue material-add" onClick={() => addComment()}>
                + Добавить комментарий
            </Button>
        </div>
    );
};

export default CommentsSection;
