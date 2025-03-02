// src/services/factService.js
import { db } from '../config/firebase';
import { 
  collection, 
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';

const FACTS_COLLECTION = 'sushi-facts';

// Obtener todos los facts
export const getAllFacts = async () => {
  try {
    const factsCollection = collection(db, FACTS_COLLECTION);
    const snapshot = await getDocs(factsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting facts:", error);
    return [];
  }
};

// Agregar un nuevo fact
export const addFact = async (factData) => {
  try {
    const factsCollection = collection(db, FACTS_COLLECTION);
    const newFact = {
      ...factData,
      createdAt: serverTimestamp()
    };
    const docRef = await addDoc(factsCollection, newFact);
    return { id: docRef.id, ...newFact };
  } catch (error) {
    console.error("Error adding fact:", error);
    throw error;
  }
};

// Eliminar un fact
export const deleteFact = async (factId) => {
  try {
    const factDoc = doc(db, FACTS_COLLECTION, factId);
    await deleteDoc(factDoc);
    return { success: true };
  } catch (error) {
    console.error("Error deleting fact:", error);
    throw error;
  }
};

// Método para verificar si hay facts en Firestore
export const initializeFactsIfEmpty = async () => {
  try {
    const factsCollection = collection(db, FACTS_COLLECTION);
    const snapshot = await getDocs(factsCollection);

    if (snapshot.empty) {
      console.warn("No facts found in Firestore.");
    } else {
      console.log("Facts already exist, skipping initialization.");
    }
  } catch (error) {
    console.error("Error initializing facts:", error);
  }
};
