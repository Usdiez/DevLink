import { db } from "../config/firebaseInit";
import { Post } from "../models/db";

export const createPost = async (post: Post): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc().create(post);
  } catch (error) {
    console.log("Error creating document", error);
    throw error;
  }
};

export const editPost = async (
  post: Partial<Post>,
  postId: string
): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc(postId).update(post);
  } catch (error) {
    console.log(`Error editing document for ${postId}:`, error);
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc(postId).delete();
  } catch (error) {
    console.log(`Error deleteing document for ${postId}:`, error);
    throw error;
  }
};

export const getPost = async (
  queryFilters: string[]
): Promise<Post[] | undefined> => {
  const lowercaseFilters = queryFilters.map((filter) => filter.toLowerCase());

  const doc = await db
    .collection("Posts")
    .where("SkillsWanted", "array-contains-any", lowercaseFilters)
    .get();

  const additionalPostsData = doc.docs.map((doc) => doc.data() as Post);

  // Assuming you already have some postsData, you can concatenate the new posts
  const postsData: Post[] = []; // Initialize or use your existing postsData array
  postsData.push(...additionalPostsData);

  return postsData;
};
