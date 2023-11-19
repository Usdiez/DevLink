import { Request, Response, NextFunction } from "express";
import { createPost, editPost, deletePost, queryPostbyFilter } from "../services/post";
import { Post } from "../models/db";
import { validateNewPost, validateEdit, validateDelete } from "../utils/post";

export const createInitialPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title = "", body = "" }: Post = req.body;
  const post: Post = { title, body, postId: "", owner: null, skillsWanted: []};

  // Validates request body
  try {
    validateNewPost(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }
  try {
    await createPost(post);
    res.send({ message: "Post created!" });
  } catch (error) {
    next(error);
  }
};

export const editExistingPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, body, postId }: Post = req.body;

  // Checks for undefined and inserts them into user object
  const post: Partial<Post> = {
    ...(title && { title }),
    ...(body && { body }),
    ...(postId && { postId }),
  };
  try {
    validateEdit(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }

  try {
    await editPost(post, postId);
    res.send({ message: "Post edited!" });
  } catch (error) {
    next(error);
  }
};

export const deleteExistingPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId }: Post = req.body;

  // Checks for undefined and inserts them into user object
  const post: Partial<Post> = {
    ...(postId && { postId }),
  };
  try {
    validateDelete(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  try {
    await deletePost(postId);
    res.send({ message: "Post deleted!" });
  } catch (error) {
    next(error);
  }
};

export const getExistingPost = async (req: Request, res: Response, next: NextFunction) => {
  const queryFilter = req.params.filter;
  try {
      const postResult: (Post[]) = await queryPostbyFilter(queryFilter);
      res.send(postResult);
  } catch (error) {
      next(error);
  }
};
