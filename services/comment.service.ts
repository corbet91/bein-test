import { IComments } from "@/types";
import axios from "./axios";

interface IPayload {
    postId: number
    userId: number
    body: string
}

export async function getCommentsByPost(postId: number): Promise<IComments> {
    const { data } = await axios.get(`/comments/post/${postId}`);
    return data;
}

export async function addNewComment(payload: IPayload) {
    const { data } = await axios.post(`/comments/add`, { ...payload });
} 