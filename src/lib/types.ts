export type Appointment = {
  id: string; // Firestore IDs are strings
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  timeRange: string;
  course: string;
  professor: string;
  room: string;
  type: "Lecture" | "Seminar" | "Lab";
  startTime: string; // Сделать обязательным
  endTime: string; // Сделать обязательным
};

export type User = {
  id?: string;
  name: string;
  description: string;
  email: string;
  university: string;
  faculty: string;
  course: number;
  group: string;
};

export type Club = {
  id: string; // Firestore IDs are strings
  name: string;
  description: string;
  avatarUrl: string;
};

export type Client = {
  id: string; // Firestore IDs are strings
  name:string;
  email: string;
  university: string;
  avatarUrl: string;
};
