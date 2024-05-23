import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { query, where } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};
export const app = initializeApp(firebaseConfig);
export const app2 = initializeApp(firebaseConfig2, "admin-login");
export const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export async function createDraft(productConfig, customId) {
  const draftDocRef = doc(collection(db, "drafts"), customId);

  const docSnap = await getDoc(draftDocRef);
  if (docSnap.exists()) {
    // Document with customId already exists, do not create a new one
    return draftDocRef;
  } else {
    await setDoc(draftDocRef, {
      ...productConfig,
      createdAt: Date.now(),
    });
    return draftDocRef;
  }
}
export async function deleteBlogPost(postId) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      await updateDoc(docRef, { posts });
    }
  }
}
export async function getBlogPosts() {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
export async function addBlogPost(post) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (!docSnap.data()) {
    await setDoc(doc(db, "blog", "blog"), { posts: [post] });
  } else {
    await updateDoc(doc(db, "blog", "blog"), {
      posts: arrayUnion(post),
    });
  }
}
export async function updateBlogPost(postId, updatedPost) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      await updateDoc(docRef, { posts });
    }
  }
}

export async function getDrafts() {
  const querySnapshot = await getDocs(collection(db, "drafts"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  const draftDoc = await getDoc(draftDocRef);
  return draftDoc.exists() ? { ...draftDoc.data(), id: draftDoc.id } : null;
}

export async function updateDraft(draftId, updates) {
  console.log(draftId);
  const draftDocRef = doc(db, "drafts", draftId);
  return await updateDoc(draftDocRef, updates);
}

export async function deleteDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  return await deleteDoc(draftDocRef);
}

export async function deleteMultipleDrafts(draftIds) {
  const promises = draftIds.map(async (draftId) => {
    const draftDocRef = doc(db, "drafts", draftId);
    await deleteDoc(draftDocRef);
  });
  await Promise.all(promises);
}

export async function deleteMultipleProducts(productIds) {
  const promises = productIds.map(async (productId) => {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
  });
  await Promise.all(promises);
}
export async function createProduct(productConfig) {
  const productDocRef = doc(collection(db, "products"), productConfig.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    // Document with customId already exists, do not create a new one
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...productConfig,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getProduct(productId) {
  const productDocRef = doc(db, "products", productId);
  const productDoc = await getDoc(productDocRef);
  return productDoc.exists()
    ? { ...productDoc.data(), id: productDoc.id }
    : null;
}
export async function getProductByUrl(url) {
  const products = await getProducts();
  const product = products.find((product) => product.url === url);
  return product ? { ...product, url } : null;
}

export async function updateProduct(productId, updates) {
  const productDocRef = doc(db, "products", productId);
  return await updateDoc(productDocRef, updates);
}

export async function deleteProduct(productId) {
  const productDocRef = doc(db, "products", productId);
  return await deleteDoc(productDocRef);
}
export async function addBooking(req, id) {
  await setDoc(doc(db, "bookings", id), req);
}

export async function updateBooking(uid, id) {
  const docRef = doc(db, "bookings", id);
  await updateDoc(docRef, {
    uid: uid,
    isReliable: true,
  });
}
async function getBookingById(id) {
  const docRef = doc(db, "bookings", id);
  const docSnapshot = await getDoc(docRef);
  const booking = {
    id: docSnapshot.id,
    ...docSnapshot.data(),
  };
  return booking;
}

async function getBookingsByUserId(uid) {
  const ref = collection(db, "bookings");
  const filter = query(ref, where("uid", "==", uid));
  const response = await getDocs(filter);
  const bookings = response.docs.map((doc) => doc.data());
  return bookings;
}
async function getAllBookings() {
  const ref = collection(db, "bookings");
  const response = await getDocs(ref);
  const bookings = response.docs.map((doc) => doc.data());
  return bookings;
}
async function getBookings(uid) {
  const requestsCollection = collection(db, "bookings");
  const userRequestsQuery = query(requestsCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(userRequestsQuery);
  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return bookings;
}

export async function getUsers() {
  const ref = collection(db, "users");
  const response = await getDocs(ref);
  const users = response.docs.map((doc) => doc.data());
  return users;
}
export async function getDocument(collectionName, key) {
  const docRef = doc(db, collectionName, key);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.data();
}
export async function getDocuments(collectionName) {
  const ref = collection(db, collectionName);
  const response = await getDocs(ref);
  const res = response.docs.map((doc) => doc.data());
  return res;
}
export async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}
export async function removeDocument(collectionName, uniqueId) {
  await deleteDoc(doc(db, collectionName, uniqueId));
}
export async function updateDocument(keys, values, collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const existingData = docSnapshot.data();
    const updatedData = { ...existingData };
    keys.forEach((key, index) => {
      updatedData[key] = values[index];
    });
    await updateDoc(docRef, updatedData);
  } else {
    const initialData = {};
    keys.forEach((key, index) => {
      initialData[key] = values[index];
    });

    await setDoc(docRef, initialData);
  }
}

export { storage, auth };
