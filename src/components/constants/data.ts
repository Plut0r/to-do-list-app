export interface TaskItem {
  id: string;
  title: string;
  projectName: string;
  progress: {
    completed: number;
    total: number;
  };
  dueDate: string;
  commentsCount: number;
  attachmentsCount: number;
  assignedUsersCount: number;
}

export interface TaskColumn {
  id: number;
  name: string;
  tasks: TaskItem[];
}

export const navLinks = [
  {
    id: 1,
    name: "Home",
    icon: "/icons/home.svg",
    path: "/",
  },
  {
    id: 2,
    name: "Profile",
    icon: "/icons/profile.svg",
    path: "/profile",
  },
  {
    id: 3,
    name: "Calendar",
    icon: "/icons/calendar.svg",
    path: "/calendar",
  },
  {
    id: 4,
    name: "Analytics",
    icon: "/icons/analytics.svg",
    path: "/analytics",
  },
  {
    id: 5,
    name: "Import",
    icon: "/icons/import.svg",
    path: "/import",
  },
  {
    id: 6,
    name: "Notes",
    icon: "/icons/notes.svg",
    path: "/notes",
  },
  {
    id: 7,
    name: "Settings",
    icon: "/icons/settings.svg",
    path: "/settings",
  },
];

export const homeQuickLinks = [
  {
    id: 1,
    name: "Team",
    data: [],
  },
  {
    id: 2,
    name: "Projects",
    data: ["Design system", "User flow", "Ux research"],
  },
  {
    id: 3,
    name: "Tasks",
    data: ["To do", "In progress", "Done"],
  },
  {
    id: 4,
    name: "Reminders",
    data: [],
  },
  {
    id: 5,
    name: "Messengers",
    data: [],
  },
];

export const tasks: TaskColumn[] = [
  {
    id: 1,
    name: "To do",
    tasks: [
      {
        id: 't1',
        title: "Design new ui presentation",
        projectName: "Dribbble marketing",
        progress: { completed: 7, total: 10 },
        dueDate: "24 Aug 2022",
        commentsCount: 7,
        attachmentsCount: 2,
        assignedUsersCount: 0,
      },
      {
        id: 't2',
        title: "Add more ui/ux mockups",
        projectName: "Pinterest promotion",
        progress: { completed: 4, total: 10 },
        dueDate: "25 Aug 2022",
        commentsCount: 0,
        attachmentsCount: 0,
        assignedUsersCount: 4,
      },
      {
        id: 't3',
        title: "Design few mobile screens",
        projectName: "Dropbox mobile app",
        progress: { completed: 3, total: 10 },
        dueDate: "26 Aug 2022",
        commentsCount: 6,
        attachmentsCount: 4,
        assignedUsersCount: 0,
      },
      {
        id: 't4',
        title: "Create a tweet and promote",
        projectName: "Twitter marketing",
        progress: { completed: 2, total: 14 },
        dueDate: "27 Aug 2022",
        commentsCount: 0,
        attachmentsCount: 0,
        assignedUsersCount: 4,
      },
    ],
  },
  {
    id: 2,
    name: "In progress",
    tasks: [
      {
        id: 't5',
        title: "Design system update",
        projectName: "Oreo website project",
        progress: { completed: 3, total: 10 },
        dueDate: "12 Nov 2022",
        commentsCount: 0,
        attachmentsCount: 0,
        assignedUsersCount: 4,
      },
      {
        id: 't6',
        title: "Create brand guideline",
        projectName: "Oreo branding project",
        progress: { completed: 7, total: 10 },
        dueDate: "13 Nov 2022",
        commentsCount: 2,
        attachmentsCount: 13,
        assignedUsersCount: 0,
      },
      {
        id: 't7',
        title: "Create wireframe for ios app",
        projectName: "Oreo ios app project",
        progress: { completed: 4, total: 10 },
        dueDate: "14 Nov 2022",
        commentsCount: 0,
        attachmentsCount: 0,
        assignedUsersCount: 4,
      },
      {
        id: 't8',
        title: "Create ui kit for layout",
        projectName: "Crypto mobile app",
        progress: { completed: 3, total: 10 },
        dueDate: "15 Nov 2022",
        commentsCount: 23,
        attachmentsCount: 12,
        assignedUsersCount: 0,
      },
    ],
  },
  {
    id: 3,
    name: "Done",
    tasks: [
      {
        id: 't9',
        title: "Add product to the market",
        projectName: "Ui8 marketplace",
        progress: { completed: 10, total: 10 },
        dueDate: "6 Jan 2022",
        commentsCount: 1,
        attachmentsCount: 5,
        assignedUsersCount: 0,
      },
      {
        id: 't10',
        title: "Launch product promotion",
        projectName: "Kickstarter campaign",
        progress: { completed: 10, total: 10 },
        dueDate: "7 Jan 2022",
        commentsCount: 17,
        attachmentsCount: 3,
        assignedUsersCount: 0,
      },
      {
        id: 't11',
        title: "Make twitter banner",
        projectName: "Twitter marketing",
        progress: { completed: 10, total: 10 },
        dueDate: "8 Jan 2022",
        commentsCount: 0,
        attachmentsCount: 0,
        assignedUsersCount: 4,
      },
    ],
  },
];
