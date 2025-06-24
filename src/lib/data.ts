export type Appointment = {
  id: number;
  timeRange: string;
  course: string;
  professor: string;
  room: string;
  type: 'Lecture' | 'Seminar';
  status: 'Лекция' | 'Семинар';
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

export const user: User = {
  name: 'Sunnatilla Kholdarboeva',
  description: 'Computer Science student passionate about AI and machine learning. Dedicated to exploring the frontiers of technology and applying knowledge to solve real-world problems.',
  email: 'sunnatilla@example.com',
  university: 'Westminster University in Tashkent',
  faculty: 'Computer Science',
  course: 3,
  group: 'CS-301',
};

export const appointments: Appointment[] = [
  {
    id: 1,
    timeRange: '09:00 - 10:30',
    course: 'Economics 101',
    professor: 'Dr. Nodira Azimova',
    room: 'Room 305',
    type: 'Lecture',
    status: 'Лекция',
  },
  {
    id: 2,
    timeRange: '11:00 - 12:30',
    course: 'Mathematics Analysis',
    professor: 'Prof. Rustam Ibragimov',
    room: 'Room 401',
    type: 'Lecture',
    status: 'Лекция',
  },
  {
    id: 3,
    timeRange: '14:00 - 15:30',
    course: 'English Language',
    professor: 'Sarah Johnson',
    room: 'Room 102',
    type: 'Seminar',
    status: 'Семинар',
  },
  {
    id: 4,
    timeRange: '16:00 - 17:30',
    course: 'Introduction to AI',
    professor: 'Dr. Alan Turing',
    room: 'Lab 7',
    type: 'Seminar',
    status: 'Семинар',
  },
  {
    id: 5,
    timeRange: '09:00 - 10:30',
    course: 'Data Structures',
    professor: 'Prof. Ada Lovelace',
    room: 'Room 210',
    type: 'Lecture',
    status: 'Лекция',
  },
];
