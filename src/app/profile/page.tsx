import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ProfileClientComponent from "./ProfileClientComponent";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return <ProfileClientComponent user={session.user} />;
}
