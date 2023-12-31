import express, { Router } from "express";
import { createInitialGroup, editExistingGroup, requestToJoinGroup, handleGroupJoinRequest, retreiveGroupData } from "../controllers/group";

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the group
 *         description:
 *           type: string
 *           description: Description of the group
 *         id:
 *           type: string
 *           description: Id of the group
 *         color:
 *           type: string
 *           description: Color of the group
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User's ID
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               github:
 *                 type: string
 *                 description: Github username of the user
 *               linkedin:
 *                 type: string
 *                 description: LinkedIn of the user
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: skills of the user
 *         posts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Post's ID
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               body:
 *                 type: string
 *                 description: Body of the post
 *               skillsWanted:
 *                 type: Array
 *                 description: Email of the user
 *       example:
 *         id: 2ws2snj3dfbh
 *         name: DevLink
 *         description: This is our group
 *         members: [{ id: "123", firstName: "John", lastName: "Smith", email: "johnsmith@gmail.com", github: "github.com", skills: [JavaScript] }]
 *         posts: [{ title: "Post Title", body: "Post Body", skillsWanted: [Python] }]
 *         color: "#FFFFFF"
 */

// Create a new router instance
const router: Router = express.Router();

/**
 * @swagger
 * /groups/createGroup:
 *   post:
 *     summary: Create a new group
 *     tags:
 *      - Groups
 *     description: Create a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               description:
 *                 type: string
 *                 description: A description of the group
 *               color:
 *                 type: string
 *                 description: Color of the group
 *             example:
 *               name: DevLink
 *               description: This is our group
 *               color: "#FFFFFF"
 * 
 *     responses:
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Group created
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/createGroup", createInitialGroup);

/**
 * @swagger
 * /groups/editGroup:
 *   put:
 *     summary: Edit a group
 *     tags:
 *      - Groups
 *     description: Edit a group's information, only pass the group's fields you want to update
 *     requestBody:
 *       description: Group object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 required: true
 *               name:
 *                 type: string
 *                 required: false
 *               description:
 *                 type: string
 *                 required: false
 *               color:
 *                 type: string
 *                 required: false
 *             example:
 *               groupId: 123
 *               name: DevLink
 *               description: This is our group
 *               color: "#FFFFFF"
 *     responses:
 *       '200':
 *         description: Group updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.put("/editGroup", editExistingGroup);

/**
 * @swagger
 * /groups/requestJoin:
 *   post:
 *     summary: Request to join a group
 *     tags:
 *      - Groups
 *     description: Request to join a group
 *     requestBody:
 *       description: Group id to join
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 required: true
 *             example:
 *               groupId: 123
 *     responses:
 *       '200':
 *         description: Request sent successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/requestJoin", requestToJoinGroup);

/**
 * @swagger
 * /groups/handleJoinRequest:
 *   post:
 *     summary: Handle a group join request
 *     tags:
 *      - Groups
 *     description: Handle a group join request
 *     requestBody:
 *       description: Group id to join
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              groupId:
 *                 type: string
 *                 required: true
 *              accept:
 *                 type: boolean
 *                 required: true
 *              requestedUserId:
 *                 type: string
 *                 required: true
 *             example:
 *               groupId: 123
 *               accept: true
 *               requestedUserId: 2323Ah3ud
 *     responses:
 *       '200':
 *         description: Request sent successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/handleJoinRequest", handleGroupJoinRequest);

/**
 * @swagger
 * /groups/get/{id}:
 *   get:
 *     summary: Get a group by id
 *     tags:
 *      - Groups
 *     description: Get a group by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Group id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get("/get/:id", retreiveGroupData);

export default router;
