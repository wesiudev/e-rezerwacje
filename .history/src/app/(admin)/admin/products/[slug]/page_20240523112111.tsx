import ProductEdit from "@/app/(dashboard)/components/AdminComponents/ProductEdit";
import { getProduct } from "@/firebase";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const product = await getProduct(params.slug);
  !product && redirect("/admin/products");
  return (
    <div>
      <ProductEdit source={product} place="products" />
    </div>
  );
}
