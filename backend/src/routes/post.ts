import express, { Router } from "express";
import {
  createInitialPost,
  editExistingPost,
  deleteExistingPost,
  getExistingPost,
} from "../controllers/post";

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the post
 *         body:
 *           type: string
 *           description: Body of the post
 *         owner:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               description:
 *                 type: string
 *                 description: Description of the group
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Members of the group
 *               posts:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Posts by the group
 *         skillsWanted:
 *           type: array
 *           description: Wanted skills from the post
 *       example:
 *         title: DevLink Post
 *         body: This is our post
 *         owner: [{ id: "123", firstName: "John", lastName: "Smith", email: "johnsmith@gmail.com", github: "github.com", skills: [JavaScript] }]
 *         skillsWanted: [Python]
 */

// Create a new router instance
const router: Router = express.Router();

/**
 * @swagger
 * /posts/createPost:
 *   post:
 *     summary: Create a new post
 *     tags:
 *      - Posts
 *     description: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the post
 *               body:
 *                 type: string
 *                 description: The body of the post
 *             example:
 *               title: DevLink Post
 *               body: This is our post
 *     responses:
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Post created
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/createPost", createInitialPost);

/**
 * @swagger
 * /posts/editPost:
 *   put:
 *     summary: Edit a post
 *     tags:
 *      - Posts
 *     description: Edit a post's information, only pass the post's fields you want to update
 *     requestBody:
 *       description: Post object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               body:
 *                 type: string
 *                 required: true
 *             example:
 *               title: DevLink Post
 *               body: This is our post
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.put("/editPost", editExistingPost);

/**
 * @swagger
 * /posts/deletePost:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *      - Posts
 *     description: Delete a post
 *     requestBody:
 *       description: Post object to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 required: true
 *             example:
 *               postId: a1b2c3
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.delete("/deletePost", deleteExistingPost);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Get post(s) by filter
 *     tags:
 *      - Posts
 *     description: Retrieve a post(s) by their filter
 *     parameters:
 *       - in: path
 *         filter: filter
 *         schema:
 *           type: array
 *         required: true
 *         description: Filter(s) of the post to retrieve
 *     responses:
 *       '200':
 *         description: A single post object
 *         content:
 *           application/json:
 *             schema:
 *       '404':
 *         description: Post not found
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get("/search", getExistingPost);

export default router;
