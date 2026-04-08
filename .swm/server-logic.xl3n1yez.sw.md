---
title: Server logic
---
<SwmSnippet path="/posts/index.js" line="25">

---

This function creates new posts using /posts endpoint.

```javascript
app.post('/posts', (req, res) => {
    const title = req.body.title;
    const post = {
        id: randomBytes(16).toString('hex'),
        title
    };
    posts.push(post);
    axios.post('http://localhost:4004/events', {
        type: 'PostCreated',
        data: post
    }).catch((err) => {
        console.log('Error posting event', err.message);
    });
    res.status(201).json({
        post: post
    });
});
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBQkxPRyUzQSUzQUthYXJlbFZ2" repo-name="BLOG"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
