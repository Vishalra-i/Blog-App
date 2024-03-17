import conf from "../conf/conf";
import { Client, Databases,Storage ,Query, ID } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    
    }

    async createPost({title,slug,content,featuredImage,status,userId,author,category}){
       try {
          let post = await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteUrlCollectionId,slug,{
            title,
            content,
            featuredImage ,
            status,
            userId,
            author,
            // created,
            category

          })
          return post;
       } catch (error) {
         console.log(
            "Appwrite Service :: Create-Post Error ::",error
         )
       }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            await this.databases.updateDocument(conf.appwriteDatabaseId,
                conf.appwriteUrlCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )
        } catch (error) {
            console.log("Appwrite Service :: Update-Post Error ::",error)
        }
        
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,
                conf.appwriteUrlCollectionId,
                slug
            )
            return true ;
        } catch (error) {
            console.log("Appwrite Service :: Delete-Post Error ::", error)
            return false ;
        }
         return null; // return null if no error occured. 
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteUrlCollectionId,slug);
        
        } catch (error) {
            console.log("Appwrite Service :: Get-Post Error ::", error)
            return false ;
        }
    }

    async getPosts(queries){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteUrlCollectionId, queries);
            
        } 
        catch (error) {
            console.log("Appwrite Service :: Get-Posts Error ::", error)
        }
    }

    async getUserPost(userData){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteUrlCollectionId, [Query.equal('userId',userData)]);

        }
        catch (error) {
            console.log("Appwrite Service :: Get-Posts Error ::", error)
        }
    }
    
          
 

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteUrlBuketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
     
    async deletFile(fileID){
        try {
            return await this.bucket.deleteFile(conf.appwriteUrlBuketId, fileID);
        } catch (error) {
            console.log("Appwrite Service :: Delete-File Error ::", error)
            return false;
        }
        return null; // return null if no error occured.
    }
    
    getFilePreview(fileID){
       return this.bucket.getFilePreview(conf.appwriteUrlBuketId,fileID)
    }
        
    
}

const service = new Service();

export default service;