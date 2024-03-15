import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts([]).then((fetchedPosts) => {
            if (fetchedPosts) {
                // Sort the fetched posts by creation date in descending order
                const sortedPosts = fetchedPosts.documents.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setPosts(sortedPosts);
            }
        });
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.length !== 0 ? posts.map((post) => (
                        <div key={post.$id} className='w-1/2 p-1 '>
                            <PostCard {...post} />
                        </div>
                    )) : <h1>No Post Found</h1>}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
