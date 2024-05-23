import ProductEdit from "@/app/(dashboard)/components/AdminComponents/ProductEdit";
import { getDraft } from "@/firebase";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const draft = await getDraft(params.slug);
  !draft && redirect("/admin/products/drafts");
  return (
    <div>
      <ProductEdit source={draft} place="drafts" />
    </div>
  );
}
