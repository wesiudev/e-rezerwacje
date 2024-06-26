"use client";
import ProductEdit from "@/app/(dashboard)/components/AdminComponents/ProductEdit";
import { v4 as uuid } from "uuid";
export default function Page() {
  const uniqueId = uuid();

  const product = {
    title: "",
    shortDesc: "",
    text1Title: "",
    text1Desc: "",
    text2Title: "",
    text2Desc: "",
    text3Title: "",
    text3Desc: "",
    text4Title: "",
    text4Desc: "",
    imagesHeadingSmallText: "",
    imagesHeadingMainText: "",
    images: [],
    primaryImage: "",
    secondaryImage: "",
    googleTitle: "",
    googleDescription: "",
    googleKeywords: "",
    id: uniqueId,
    url: "",
    urlLabel: "",
    additionalPage: true,
  };

  return <ProductEdit source={product} place="new" />;
}
