import React ,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { Container,PostCard } from '../components';


function Home() {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
    appwriteService.getPosts().then((post)=>{
        if(post){
            setPosts(post.documents)
        }
    })
    },[])

    if(posts.length === 0){
        return <p>No posts found</p>
    }
    return(
        <div className="w-full py-8">
            <Container>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className='w-1/4 p-2 '>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>    
            </Container>
        </div>
    )
  
}

export default Home