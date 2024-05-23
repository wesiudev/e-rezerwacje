import Dashboard from "./Dashboard";

async function getRelatedUsers(uid: string) {
  "use server";
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/listRelatedUsers?secret=${process.env.API_SECRET_KEY}&uid=${uid}`,
    {
      cache: "no-store",
    }
  );

  const users = req.json();
  return users;
}
export default async function Page() {
  return (
    <div>
      <Dashboard getUsers={getRelatedUsers} />
    </div>
  );
}
