import { useState } from "react";
import { axios } from "@bundled-es-modules/axios";

function CommentCreate({ postId}) {
    const [content, setContent] = useState("");

    const onChange = (event) => {
        setContent(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const trimmedContent = content.trim();

        if (!trimmedContent) {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                content: trimmedContent,
            });
            setContent("");
        } catch (error) {
            console.error("Failed to create comment", error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input
                   className="form-control"
                    value={content}
                    onChange={onChange}
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CommentCreate;
