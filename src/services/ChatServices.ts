// src/services/chatService.ts
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const createChatRoom = async (jobId: string, adminId: string, serviceProviderId: string) => {
  const chatRoomId = `${jobId}-${adminId}-${serviceProviderId}`; // Unique chat room ID
  const chatRoomRef = doc(db, 'chatRooms', chatRoomId);

  await setDoc(chatRoomRef, {
    jobId,
    adminId,
    serviceProviderId,
  });

  return chatRoomId;
};

export { createChatRoom };
