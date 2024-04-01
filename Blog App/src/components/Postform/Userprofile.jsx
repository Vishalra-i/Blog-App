import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import appwriteService from "../../appwrite/config";
import Container from '../Container/Container';
import PostCard from '../PostCard';
import Logoutbtn from '../Header/Logoutbtn';
import Button from '../Button';

function Userprofile() {
    const [posts, setPosts] = useState([]);
    const [nopost, setNopost] = useState(false);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (userData) {
                try {
                    const userPosts = await appwriteService.getUserPost(userData.userData.$id);
                    if (userPosts) {
                        setPosts(userPosts.documents);
                        setNopost(userPosts.documents.length === 0);
                    }
                } catch (error) {
                    console.error('Error fetching user posts:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                navigate('/login');
            }
        };

        fetchUserPosts();
    }, [navigate, userData]);

    return (
        <Container>
            {userData ? (
                <div className="max-w-4xl mx-auto py-10 p-4">
                    <h1 className="text-3xl font-bold mb-4">Profile</h1>
                    <div className="bg-white shadow-xl rounded-lg p-4 mb-6 space-y-10 shadow-slate-400">
                        <p className="text-lg font-semibold">Name: {userData.userData.name}</p>
                        <p className="text-lg font-semibold">Email: {userData.userData.email}</p>
                        <p className="text-lg font-semibold">Phone: {userData.userData.phone || ' Add Your Number'}</p>
                        <Logoutbtn />
                    </div>
                    <h1 className="text-3xl font-bold color-gray-800 py-6">Your Articles</h1>
                    <div className="flex w-full gap-4 justify-center items-center">
                        {!loading ? (
                            posts.map((post) => (
                                <div key={post.$id}>
                                    <PostCard {...post} />
                                </div>
                            ))
                        ) : (
                            <h1 className='text-green-400 text-2xl animate-bounce font-bold text-center m-10'>Please Wait While we fetching Your Post...</h1>
                        )}
                        {nopost && (
                            <div className='flex justify-between w-full flex-col items-center'>
                                <h1 className='text-red-400 text-2xl font-bold text-center m-10'>You Do Not Post Anything Yet</h1>
                                <Link to='/add-post'>
                                    <Button className='hover:bg-green-200'>Add your first blog</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Navigate to='/login' />
            )}
        </Container>
    );
}

export default Userprofile;
