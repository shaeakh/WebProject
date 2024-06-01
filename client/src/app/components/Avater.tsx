import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/SCavatar"
 
export default function Aavatar() {
  return (
    <Avatar className="h-full w-full">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}