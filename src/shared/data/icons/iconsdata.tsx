interface IconItem {
  name: string;
  className: string;
}

interface IconCategory {
  title: string;
  items: IconItem[];
  description?: string;
}

export const IconCatalog: IconCategory[] = [
  {
    title: "Feather Icons",
    description: "Lightweight vector icons typically used throughout the dashboard shell.",
    items: [
      { name: "Activity", className: "fe fe-activity" },
      { name: "Bell", className: "fe fe-bell" },
      { name: "Calendar", className: "fe fe-calendar" },
      { name: "Camera", className: "fe fe-camera" },
      { name: "Heart", className: "fe fe-heart" },
      { name: "Settings", className: "fe fe-settings" },
    ],
  },
  {
    title: "Remix Icons",
    description: "Remix icon set leveraged by the existing UI components.",
    items: [
      { name: "Dashboard", className: "ri-dashboard-line" },
      { name: "User", className: "ri-user-3-line" },
      { name: "Mail", className: "ri-mail-line" },
      { name: "Lock", className: "ri-lock-line" },
      { name: "Sun", className: "ri-sun-line" },
      { name: "Moon", className: "ri-moon-line" },
    ],
  },
  {
    title: "Bootstrap Icons",
    description: "Bootstrap flavored icons for utility actions and form affordances.",
    items: [
      { name: "Alarm", className: "bi bi-alarm" },
      { name: "Chat", className: "bi bi-chat-dots" },
      { name: "Check", className: "bi bi-check-circle" },
      { name: "Download", className: "bi bi-download" },
      { name: "Shield", className: "bi bi-shield-lock" },
      { name: "Star", className: "bi bi-star" },
    ],
  },
];

export type { IconCategory, IconItem };

