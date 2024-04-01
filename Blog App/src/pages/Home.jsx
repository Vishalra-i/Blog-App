import React ,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { Container,Logo,PostCard } from '../components';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";




function Home() {
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
    appwriteService.getPosts().then((post)=>{
        if(post){
            setPosts(post.documents)
        }
    }).finally(
       setTimeout(
        setLoading(false),
        1000
       )
    )
    },[])

    if(loading){
        return(
            <div className="w-full h-screen flex justify-center items-center">
                <Loading/>
            </div>
        )
    }
    const words = [
        {
          text: "Build",
        },
        {
          text: "awesome",
        },
        {
          text: "Blogs",
        },
        {
          text: "with",
        },
        {
          text: "Bloghunter.",
          className: "text-blue-500 dark:text-blue-500",
        },
      ];

      const words2 = "Enter a world where reading inspires writing. Discover it all with BlogHunter"

    if(posts.length === 0){
        return (
            <Container>
            <div className='flex flex-col  gap-8 justify-center w-full items-center h-[400px]'>
               <TypewriterEffect words={words}/>
                 <TextGenerateEffect words={words2}/>
               <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
                    <Link to={"/signup"}>
                    <button className="w-40 h-10 rounded-xl bg-black border hover:bg-black/55 dark:border-white border-transparent text-white text-sm">
                      Join now
                    </button>
                    </Link>
                    <Link to={"/login"}>
                    <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                      Login
                    </button>
                    </Link>
                 </div>
            </div> 
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
                    <div className="lg:w-1/2 lg:mr-8 mb-6 lg:mb-0">
                    <img src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=600&h=400&fit=crop&dpr=1" alt="Blog Illustration" className="w-full rounded-lg shadow-lg" />
                    </div>
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-bold mb-4">Unlock Your Voice, Share Your Story</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Writing a blog empowers you to express yourself, connect with others, and make a difference.
                            Whether you're sharing personal experiences, professional insights, or creative ideas,
                            your voice matters. Start your journey today.
                        </p>
                        <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Get Started
                        </Link>
                    </div>
                </div>       
            </Container>      
        )   
    }
    return(
        <div className="w-full py-8">
            <Container>
            <div className="flex flex-col gap-5 flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className=' p-1 '>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>    
            </Container>
        </div>
    )
  
}

export default Home