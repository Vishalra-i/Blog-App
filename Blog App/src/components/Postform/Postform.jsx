import React ,{useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {Button,Input,Select,RTE} from "../index";
import appwriteService from "../../appwrite/config";
import {useNavigate } from "react-router-dom";
import {  useSelector } from 'react-redux';


function Postform({post}) {
   let {register,handleSubmit,watch,setValue,control,getValues} = useForm({
      defaultValues:{
         title: post?.title || "",
         content: post?.content || "",
         status: post?.status || "active",
      }
   });
   console.log(!post)
   const navigate = useNavigate();
   const userData = useSelector(state=> state.auth.userData)
//    console.log(userData.userData.$id)
   const Submit = async (data) => {
       if(post){
         const file = data.Image[0] ? appwriteService.uploadFile(data.Image[0]) : null
       if(file){
         appwriteService.deletFile(post.featuredImage)
       }
       const dbPost = appwriteService.updatePost(post.$id,{
         ...data,
         featuredImage: file ? file.$id : undefined
       })
       if(dbPost){
         navigate(`/post/${dbPost.$id}`)
       }
      }else{
        console.log(`aara hu `)
         const file = data.Image[0] ? await appwriteService.uploadFile(data.Image[0]) : null
         console.log(data , userData.userData.name)

         if(file){
            const fileId = file.$id
            data.featuredImage = fileId
            const dbPost = await appwriteService.createPost({...data , userId: userData.userData.$id ,author: userData.userData.name})
            console.log(dbPost)
           
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
         }
      }
      }

      const slugTransform = useCallback(value => {
         if(value && typeof value === 'string')
           return value
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z\d\s]+/g, "-")
                  .replace(/\s/g, "-");
         
            return ''
      },[])


      React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
         if(name === 'title'){
            setValue('slug',slugTransform(value.title,
               {shouldValidate:true}))
         }
        })

        return()=>{
         subscription.unsubscribe()
        }
      },[watch,slugTransform,setValue])

  return (
     <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("Image", { required: !post })}
                />
                {post && (
                    
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type='submit' bgColor={post ? "bg-green-500" : "bg-red-600"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
                
            </div>
        </form>
  )
}

export default Postform