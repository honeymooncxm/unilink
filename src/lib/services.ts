import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
} from "firebase/firestore";
import type { User, Appointment, Club, Client } from "./types";

// For this prototype, we'll use a hardcoded user ID.
// In a real app, you would get this from an authentication service.
const MOCK_USER_ID = "sunnatilla-kholdarboeva";

// --- INITIAL DATA (from original data.ts) ---
const initialUser: Omit<User, 'id'> = {
  name: 'Sunnatilla Kholdarboeva',
  description: 'Welcome to UniLink, your student platform',
  email: 'sunnatilla@example.com',
  university: 'Westminster University in Tashkent',
  faculty: 'Computer Science',
  course: 3,
  group: 'CS-301',
};

const initialAppointments: Omit<Appointment, 'id'>[] = [
  {
    day: 'Monday',
    timeRange: '09:00 - 10:30',
    course: 'Introduction to Programming',
    professor: 'Dr. Alisher Usmanov',
    room: 'Room 101',
    type: 'Lecture',
  },
  {
    day: 'Monday',
    timeRange: '11:00 - 12:30',
    course: 'Data Structures',
    professor: 'Prof. Kamila Rakhimova',
    room: 'Room 203',
    type: 'Lecture',
  },
  {
    day: 'Monday',
    timeRange: '14:00 - 15:30',
    course: 'Introduction to Programming',
    professor: 'Timur Karimov',
    room: 'Lab 3',
    type: 'Lab',
  },
  {
    day: 'Tuesday',
    timeRange: '16:00 - 17:30',
    course: 'Introduction to AI',
    professor: 'Dr. Alan Turing',
    room: 'Lab 7',
    type: 'Seminar',
  },
  {
    day: 'Wednesday',
    timeRange: '09:00 - 10:30',
    course: 'Data Structures',
    professor: 'Prof. Ada Lovelace',
    room: 'Room 210',
    type: 'Lecture',
  },
   {
    day: 'Wednesday',
    timeRange: '11:00 - 12:30',
    course: 'Calculus I',
    professor: 'Prof. Rustam Ibragimov',
    room: 'Room 401',
    type: 'Lecture',
  },
  {
    day: 'Friday',
    timeRange: '14:00 - 15:30',
    course: 'English for Academic Purposes',
    professor: 'Sarah Johnson',
    room: 'Room 102',
    type: 'Seminar',
  },
];

const initialClubs: Omit<Club, 'id'>[] = [
  {
    name: 'Debate Club',
    description: 'Sharpen your arguments and public speaking skills.',
    avatarUrl: 'https://placehold.co/150x150.png',
  },
  {
    name: 'AI & Robotics Society',
    description: 'Explore the cutting edge of technology and build cool projects.',
    avatarUrl: 'https://placehold.co/150x150.png',
  },
  {
    name: 'Photography Club',
    description: 'Capture moments and learn new techniques.',
    avatarUrl: 'https://placehold.co/150x150.png',
  },
];


// --- USER SERVICE ---

export async function getUserProfile(): Promise<User> {
  const userDocRef = doc(db, "users", MOCK_USER_ID);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return { id: userDocSnap.id, ...userDocSnap.data() } as User;
  } else {
    // If user doesn't exist, create them with initial data
    await setDoc(userDocRef, initialUser);
    
    const batch = writeBatch(db);
    const appointmentsColRef = collection(db, "users", MOCK_USER_ID, "appointments");
    initialAppointments.forEach(app => {
        const newAppDoc = doc(appointmentsColRef);
        batch.set(newAppDoc, app);
    });
    
    const clubsColRef = collection(db, "clubs");
    const clubsSnapshot = await getDocs(clubsColRef);
    if (clubsSnapshot.empty) {
        initialClubs.forEach(club => {
            const newClubDoc = doc(clubsColRef);
            batch.set(newClubDoc, club);
        });
    }

    await batch.commit();

    return { id: MOCK_USER_ID, ...initialUser };
  }
}

export async function updateUserProfile(userData: Partial<User>): Promise<void> {
  const userDocRef = doc(db, "users", MOCK_USER_ID);
  await updateDoc(userDocRef, userData);
}

// --- APPOINTMENTS SERVICE ---

export async function getAppointments(): Promise<Appointment[]> {
  const appointmentsColRef = collection(db, "users", MOCK_USER_ID, "appointments");
  const querySnapshot = await getDocs(appointmentsColRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
}

export async function addAppointment(appointmentData: Omit<Appointment, "id">): Promise<string> {
  const appointmentsColRef = collection(db, "users", MOCK_USER_ID, "appointments");
  const newDocRef = await addDoc(appointmentsColRef, appointmentData);
  return newDocRef.id;
}

export async function updateAppointment(appointmentId: string, appointmentData: Partial<Appointment>): Promise<void> {
  const appointmentDocRef = doc(db, "users", MOCK_USER_ID, "appointments", appointmentId);
  await updateDoc(appointmentDocRef, appointmentData);
}

export async function deleteAppointment(appointmentId: string): Promise<void> {
  const appointmentDocRef = doc(db, "users", MOCK_USER_ID, "appointments", appointmentId);
  await deleteDoc(appointmentDocRef);
}

// --- CLUBS SERVICE ---

export async function getClubs(): Promise<Club[]> {
    const querySnapshot = await getDocs(collection(db, "clubs"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Club));
}

export async function addClub(clubData: Omit<Club, 'id'>): Promise<string> {
    const newDocRef = await addDoc(collection(db, "clubs"), clubData);
    return newDocRef.id;
}

// --- CLIENTS SERVICE ---

export async function getClients(): Promise<Client[]> {
    const querySnapshot = await getDocs(collection(db, "clients"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
}

export async function addClient(clientData: Omit<Client, 'id'>): Promise<string> {
    const newDocRef = await addDoc(collection(db, "clients"), clientData);
    return newDocRef.id;
}
