import { DocumentReference } from "@google-cloud/firestore";
import { type } from "os";

export type User = {
  email?: string;
  github?: string;
  firstName: string;
  lastName: string;
  groups: DocumentReference[];
  skills: string[];
};

export type UserPage = User & {
 groups: condensedGroup[];
}

export type condensedGroup = {
  id: string;
  name: string;
  description: string;
};

export type Group = {
  name: string;
  description: string;
  owner: DocumentReference;
  members: DocumentReference[];
  userQueue: DocumentReference[];
  posts: DocumentReference[];
};

export type Post = {
  title: string;
  body: string;
  postId: string;
  owner: DocumentReference;
  skillsWanted: string[];
};
