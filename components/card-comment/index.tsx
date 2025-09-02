import { Avatar, AvatarImage } from "../ui/avatar";

interface ICardComment {
  username: string;
  fullName: string;
  body: string;
}

export const CardComment = ({ username, fullName, body }: ICardComment) => {
  return (
    <div className="flex flex-row gap-2 items-center w-full">
      <Avatar className="w-10 h-10 z-0">
        <AvatarImage
          src={
            "https://bic-pro-entity-attribute-s3-bucket.s3.ap-southeast-1.amazonaws.com/static/user/default-avatar.png"
          }
          alt={username}
        />
      </Avatar>
      <div className="flex flex-col gap-2 rounded-lg px-4 py-2 bg-[#F8F8FB] w-full">
       <span className="text-[#2E3660]">{fullName}</span>
       <span className="text-base text-[#2E3660]">{body}</span>
      </div>
    </div>
  );
};
