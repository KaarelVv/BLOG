import { useState } from "react";
import { axios } from "@bundled-es-modules/axios";

function PostCreate({ onPostCreate }) {
    const [title, setTitle] = useState("");

    const onChange = (event) => {
        setTitle(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }
  

        try {
            const response = await axios.post("http://localhost:4000/posts", {
                title: trimmedTitle
            });
            setTitle("");
            onPostCreate?.({
                ...response.data.post,
                comments: []
            });
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default PostCreate;
