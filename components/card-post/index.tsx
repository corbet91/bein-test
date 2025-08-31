import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getDetailUser } from "@/services/user.service";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

interface ICardPost {
  title: string;
  body: string;
  userId: number;
  tags: string[];
}

export const CardPost = ({ title, body, userId, tags }: ICardPost) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`userDetail_${userId}`],
    queryFn: () => getDetailUser(userId),
  });

  return (
    <Card className="w-1/2 rounded-lg shadow-sm">
      <CardHeader>
        <div className="flex flex-row gap-3 items-center">
          <Avatar className="w-10 h-10 z-0">
            <AvatarImage src={data?.image} alt={data?.fristName} />
            <AvatarFallback className="rounded-lg cursor-pointer">
              {data?.fristName}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <span>{data?.username}</span>
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>{body}</div>
        <div className="flex flex-row gap-2 items-center">
          {tags.map((item: string, index: number) => {
            return (
              <div
                className="bg-[#ECEEF6] px-1 py-0.5 text-xs font-normal uppercase"
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>
        <Image
          src="https://media.beincom.com/image/variants/post/content/c1672d28-26b8-4339-8d2e-e15dcf935ecf?width=1920"
          alt="image"
          width={0}
          height={640}
          sizes="100vw"
          style={{ width: "100%", height: 640 }}
        />
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2 w-full">
          <Avatar className="w-10 h-10 z-0">
            <AvatarImage
              src={
                "https://bic-pro-entity-attribute-s3-bucket.s3.ap-southeast-1.amazonaws.com/static/user/default-avatar.png"
              }
              alt={"default"}
            />
          </Avatar>
          <Textarea placeholder="Write your comment" className="w-full" />
        </div>
      </CardFooter>
    </Card>
  );
};
