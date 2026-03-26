function CommentList({ comments = [] }) {

    const commentsForRender = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
    });
    return (
        <ul>
            {commentsForRender}
        </ul>
    )

}
export default CommentList;
