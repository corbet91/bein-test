import axios from "./axios";

interface IParams {
    search: string
}

export async function getAllPost(params: IParams) {
    const { data } = await axios.get(`/post/search?q=${params.search}`,);
    return data;
}