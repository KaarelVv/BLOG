import { useEffect } from "react";
import { axios } from "@bundled-es-modules/axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList({ posts, setPosts }) {
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:4002/posts");
                setPosts(Object.values(res.data));
            } catch (error) {
                console.log(error);
            }
        };
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [posts.length, setPosts]);


    const postsForRender = posts.map(post => {
        return (
            <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList
                        comments={post.comments ?? []}
                    />
                    <CommentCreate
                        postId={post.id}
                    />
                </div>
            </div>
        );
    });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {postsForRender}
        </div>
    )

};

export default PostList;
