import { SplitwiseUser } from "@/types/splitwise";
import { Card, CardTitle, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface UserCardProps {
  user: SplitwiseUser;
}

export default function UserCard(props: UserCardProps) {
  const { user } = props;
  return (
    <Card className="w-fit">
      <CardContent>
        <div className="flex flex-col items-center justify-between gap-4 *:w-full">
          <CardTitle className="flex items-center gap-4">
            <p>
              {user.first_name} {user.last_name}
            </p>
            <Avatar>
              <AvatarImage src={user.picture.small} alt={user.first_name} />
              <AvatarFallback>
                {user.first_name?.charAt(0)}
                {user.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </CardTitle>
          <Button variant="outline">Logout</Button>
        </div>
      </CardContent>
    </Card>
  );
}
