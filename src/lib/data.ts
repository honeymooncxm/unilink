export type Appointment = {
  id: number;
  day: string;
  timeRange: string;
  course: string;
  professor: string;
  room: string;
  type: 'Lecture' | 'Seminar' | 'Lab';
};

export type User = {
  name: string;
  description: string;
  email: string;
  university: string;
  faculty: string;
  course: number;
  group: string;
};

export type Club = {
  id: number;
  name: string;
  description: string;
  avatarUrl: string;
};

export type Client = {
  id: number;
  name: string;
  email: string;
  university: string;
  avatarUrl: string;
};

export const user: User = {
  name: 'Sunnatilla Kholdarboeva',
  description: 'Welcome to UniLink, your student platform',
  email: 'sunnatilla@example.com',
  university: 'Westminster University in Tashkent',
  faculty: 'Computer Science',
  course: 3,
  group: 'CS-301',
};

export const appointments: Appointment[] = [
  {
    id: 1,
    day: 'Monday',
    timeRange: '09:00 - 10:30',
    course: 'Introduction to Programming',
    professor: 'Dr. Alisher Usmanov',
    room: 'Room 101',
    type: 'Lecture',
  },
  {
    id: 2,
    day: 'Monday',
    timeRange: '11:00 - 12:30',
    course: 'Data Structures',
    professor: 'Prof. Kamila Rakhimova',
    room: 'Room 203',
    type: 'Lecture',
  },
  {
    id: 3,
    day: 'Monday',
    timeRange: '14:00 - 15:30',
    course: 'Introduction to Programming',
    professor: 'Timur Karimov',
    room: 'Lab 3',
    type: 'Lab',
  },
  {
    id: 4,
    day: 'Tuesday',
    timeRange: '16:00 - 17:30',
    course: 'Introduction to AI',
    professor: 'Dr. Alan Turing',
    room: 'Lab 7',
    type: 'Seminar',
  },
  {
    id: 5,
    day: 'Wednesday',
    timeRange: '09:00 - 10:30',
    course: 'Data Structures',
    professor: 'Prof. Ada Lovelace',
    room: 'Room 210',
    type: 'Lecture',
  },
   {
    id: 6,
    day: 'Wednesday',
    timeRange: '11:00 - 12:30',
    course: 'Calculus I',
    professor: 'Prof. Rustam Ibragimov',
    room: 'Room 401',
    type: 'Lecture',
  },
  {
    id: 7,
    day: 'Friday',
    timeRange: '14:00 - 15:30',
    course: 'English for Academic Purposes',
    professor: 'Sarah Johnson',
    room: 'Room 102',
    type: 'Seminar',
  },
];

export const clubs: Club[] = [
  {
    id: 1,
    name: 'Debate Club',
    description: 'Sharpen your arguments and public speaking skills.',
    avatarUrl: 'https://placehold.co/150x150.png',
  },
  {
    id: 2,
    name: 'AI & Robotics Society',
    description: 'Explore the cutting edge of technology and build cool projects.',
    avatarUrl: 'https://placehold.co/150x150.png',
  },
  {
    id: 3,
    name: 'Photography Club',
    description: 'Capture moments and learn new techniques.',
    avatarUrl: 'https://placehold.co/150x150.png',
  },
];

export const clients: Client[] = [];
