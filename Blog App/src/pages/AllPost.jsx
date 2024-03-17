import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Category, Container, PostCard } from '../components';
import { Query } from 'appwrite';

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading,setLoading]= useState(true)
    const [category, setCategory] = useState('All');

    const selectCat = (selectedCategory) => {
        setLoading(true)
        
        setCategory(selectedCategory);
    };

    useEffect(() => {
        if (!category) return; // Don't fetch posts if category is empty

        if (category === 'All') {
            appwriteService.getPosts([
                Query.equal("status", "active")
            ]).then((fetchedPosts) => {
                if (fetchedPosts) {
                    // Sort the fetched posts by creation date in descending order
                    const sortedPosts = fetchedPosts.documents.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });
                    setPosts(sortedPosts);
                }
            }).finally(
                setLoading(false),
            );
        } else {
            appwriteService.getPosts([
                Query.equal("category", category),
                Query.equal("status", "active")
            ]).then((fetchedPosts) => {
                if (fetchedPosts) {
                    // Sort the fetched posts by creation date in descending order
                    const sortedPosts = fetchedPosts.documents.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });
                    setPosts(sortedPosts);
                }
            }).finally(
                setLoading(false),
            );
        }
    }, [category]); // Run the effect whenever category changes

    return (
        <div className='w-full min-h-[500px] py-8'>
            <Container>
                <div className='fixed py-12 my-5'>
                <Category onChange={selectCat} />
                </div>
                {loading && 
                    <div className="flex justify-center items-center space-x-5 h-[500px]">
                        <div className="border-t-2 border-t-black animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                        </div>
                            <span className="visually-hidden">Loading...</span>
                    </div> 
                
                }
                <div className="flex flex-col gap-5  items-center">
                    {posts.length !== 0 ? posts.map((post) => (
                        <div key={post.$id} className='w-[600px] p-1 '>
                            <PostCard {...post} />
                        </div>
                    )) : <h1 className='text-center my-20 text-xl font-semibold text-red-500'>No Post Found</h1>}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
