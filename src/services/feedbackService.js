import { db } from '../config/firebase';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    setDoc,
    increment,
    serverTimestamp
} from 'firebase/firestore';

// Generar un ID de usuario si no existe
const getUserId = () => {
    let userId = localStorage.getItem('sushi_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('sushi_user_id', userId);
    }
    return userId;
};

// Obtener estadísticas de feedback
export const getFeedbackStats = async () => {
    const statsRef = doc(db, 'stats', 'feedback');
    const statsDoc = await getDoc(statsRef);

    if (statsDoc.exists()) {
        return statsDoc.data();
    } else {
        // Si no existe, crea el documento con valores iniciales
        await setDoc(statsRef, {
            likes: 0,
            dislikes: 0
        });
        return { likes: 0, dislikes: 0 };
    }
};

// Enviar feedback
export const submitFeedback = async (type, comment = '') => {
    const userId = getUserId();
    const userFeedback = localStorage.getItem('userFeedback');

    // Añadir el nuevo feedback
    await addDoc(collection(db, 'feedback'), {
        type,
        comment,
        timestamp: serverTimestamp(),
        userId
    });

    // Actualizar estadísticas
    const statsRef = doc(db, 'stats', 'feedback');
    const statsDoc = await getDoc(statsRef);

    // Comprobar si el documento de estadísticas existe
    if (!statsDoc.exists()) {
        // Si no existe, crearlo primero
        await setDoc(statsRef, {
            likes: 0,
            dislikes: 0
        });
    }

    // Corrección aquí para el contador
    if (userFeedback && userFeedback !== type) {
        // Si el usuario ya había dado feedback, decrementar el anterior y incrementar el nuevo
        await updateDoc(statsRef, {
            [userFeedback + 's']: increment(-1), // Disminuir el anterior
            [type + 's']: increment(1)           // Aumentar el nuevo
        });
    } else if (!userFeedback) {
        // Si es la primera vez, solo incrementar el nuevo
        await updateDoc(statsRef, {
            [type + 's']: increment(1)
        });
    }

    // Guardar la selección del usuario
    localStorage.setItem('userFeedback', type);

    return { success: true };
};

export const initializeFeedbackStats = async () => {
    const statsRef = doc(db, 'stats', 'feedback');
    const statsDoc = await getDoc(statsRef);

    if (!statsDoc.exists()) {
        await setDoc(statsRef, {
            likes: 0,
            dislikes: 0
        });
    }
};