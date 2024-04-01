import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import parse, { domToReact } from "html-react-parser"; // Import the parse and domToReact functions from html-react-parser

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await appwriteService.getPost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (slug) {
            fetchPost();
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deletFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <h1 className="text-4xl text-center font-bold py-4">{post.title}</h1>

                <div className="w-full h-[30.6rem] flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={`${appwriteService.getFilePreview(post.featuredImage)}&mode=admin`}
                        alt={post.title}
                        className="rounded-xl object-contain"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="font-bold text-3xl py-5 px-2"><span className="text-red-500">Author:</span> {post.author}</h1>
                </div>

                <div className="content">
                    {parse(post.content, {
                        replace: (domNode) => {
                            if (domNode.name === 'h1') {
                                return <h1 className="font-bold text-3xl">{domToReact(domNode.children)}</h1>;
                            } else if (domNode.name === 'h2') {
                                return <h2 className="font-bold text-2xl">{domToReact(domNode.children)}</h2>;
                            } else if (domNode.name === 'p') {
                                return <p className="my-3 font-medium">{domToReact(domNode.children)}</p>;
                            } else if (domNode.name === 'pre') {
                                return <pre className="my-3 bg-gray-500 rounded-md p-2 w-fit ">{domToReact(domNode.children)}</pre>;
                            } else if (domNode.name === 'code') {
                                return <code className=" rounded-md">{domToReact(domNode.children)}</code>;
                            } else if (domNode.name === 'hr') {
                                return <hr className="my-6" />;
                            }
                        }
                    })}
                </div>
            </Container>
        </div>
    ) : null;
}
