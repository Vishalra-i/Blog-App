import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import appwriteService from "../../appwrite/config";
import Container from '../Container/Container';
import PostCard from '../PostCard';
import authservice from '../../appwrite/auth';
import Logoutbtn from '../Header/Logoutbtn';

function Userprofile() {
    const [posts,setPosts] = useState([]);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
 
    useEffect(() => {
        if(userData) {
            appwriteService.getUserPost(userData.userData.$id).then((post) => {
                if(post) {
                    setPosts(post.documents);
                }
            });
        } else {
            navigate("/login");
        }
    }, [navigate, userData]);

    return (
        <Container>
            {userData ? (
                <div className="max-w-4xl mx-auto py-10 p-4">
                    <h1 className="text-3xl font-bold mb-4">Profile</h1>
                    <div className="bg-white shadow-xl rounded-lg p-4 mb-6 space-y-10 shadow-slate-400">
                        <p className="text-lg font-semibold">Name: {userData.userData.name}</p>
                        <p className="text-lg font-semibold">Email: {userData.userData.email}</p>
                        <p className="text-lg font-semibold">Phone: {userData.userData.phone}</p>
                    </div>
                    <h1 className="text-3xl font-bold color-gray-800 py-6">Your Articles</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </Container>
    );
}

export default Userprofile;
