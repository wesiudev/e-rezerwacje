"use client";
import Link from "next/link";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import ProductCard from "../ProductCard";
export default function DraggableProductList({
  products,
}: {
  products: any[];
}) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div
      {...events}
      ref={ref}
      className="relative w-full mx-auto mt-12 flex flex-row overflow-x-scroll space-x-6 scrollbar pb-4 pr-24"
    >
      {products.map((item: any, i: number) => (
        <ProductCard key={i} product={item} />
      ))}
    </div>
  );
}
