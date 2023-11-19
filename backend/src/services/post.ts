import { db } from "../config/firebaseInit";
import { Post } from "../models/db";

export const createPost = async (
  post: Post
): Promise<void | undefined> => {
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

export const deletePost = async (
  postId: string
): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc(postId).delete();
  } catch (error) {
    console.log(`Error deleteing document for ${postId}:`, error);
    throw error;
  }
};

export const queryPostbyFilter = async (
  queryFilter: string
): Promise<Post[] | undefined> => {
  try {
    // Need to figure out whether to keep a lowercase version of "SkillsWanted" inside docs for queries
    queryFilter = queryFilter.toLowerCase();
    
    const doc = await db
      .collection("Posts")
      .where("SkillsWanted", "array-contains", `${queryFilter}`)
      .get();

    const postsData = doc.docs.map((doc) => doc.data() as Post);

    return postsData;
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};