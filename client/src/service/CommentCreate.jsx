import { useState } from "react";
import axios from "axios";

function CommentCreate({ postId, onCommentCreate }) {
    const [content, setContent] = useState("");
    const [submitError, setSubmitError] = useState("");

    const onChange = (event) => {
        setContent(event.target.value);
        if (submitError) {
            setSubmitError("");
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const trimmedContent = content.trim();

        if (!trimmedContent) {
            return;
        }

        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                content: trimmedContent,
            });
            setContent("");
            setSubmitError("");
            onCommentCreate?.();
        } catch (error) {
            setSubmitError("Unable to submit comment. Check that the comments service is running.");
            console.error("Failed to create comment", error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input
                    className="form-control"
                    type="text"
                    required
                    value={content}
                    onChange={onChange}
                />
            </div>
            {submitError ? <p className="text-danger mt-2 mb-0">{submitError}</p> : null}
            <button className="btn btn-primary mt-2" type="submit">Submit</button>
        </form>
    );
}

export default CommentCreate;
