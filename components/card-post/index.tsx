import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface ICardPost {
  title: string;
  body: string;
}

export const CardPost = ({ title, body }: ICardPost) => {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{body}</CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  );
};
