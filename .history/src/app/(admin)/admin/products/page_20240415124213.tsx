"use client";
import moment from "moment";
import "moment/locale/pl";
import Products from "@/components/AdminComponents/Products";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";

import { app, deleteMultipleProducts } from "@/firebase";
export default function Page() {
  moment.locale("pl");
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const ref = collection(getFirestore(app), "products");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setProducts(snapshotData);
    });
  }, []);
  return (
    <div className="pt-24">
      <h2 className="text-white font-bold text-3xl mx-auto w-max">
        Wszystkie produkty
      </h2>
      <Products
        array={products}
        deleteRows={deleteMultipleProducts}
        place="products"
      />
    </div>
  );
}
