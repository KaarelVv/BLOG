function CommentList({ comments = [] }) {
    const commentsForRender = comments.map((comment) => {
        if (comment.status === 'pending') {
            return <li key={comment.id}>This comment is awaiting moderation</li>;
        }

        if (comment.status === 'rejected') {
            return <li key={comment.id}>This comment has been rejected</li>;
        }

        return <li key={comment.id}>{comment.content}</li>;
    });

    return (
        <ul>
            {commentsForRender}
        </ul>
    );
}

export default CommentList;
