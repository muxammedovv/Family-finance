// Shared nav definition consumed by both the desktop Sidebar and the mobile
// bottom navigation, so the two stay in sync automatically.

function Icon({ children }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export const navItems = [
  {
    path: "/",
    labelKey: "nav.dashboard",
    icon: (
      <Icon>
        <path d="M3 10.5 10 4l7 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9v7h10V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    ),
  },
  {
    path: "/transactions",
    labelKey: "nav.transactions",
    icon: (
      <Icon>
        <path d="M4 6.5h9.5M4 6.5l2.5-2.5M4 6.5l2.5 2.5M16 13.5H6.5M16 13.5l-2.5-2.5M16 13.5l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    ),
  },
  {
    path: "/budget",
    labelKey: "nav.budget",
    icon: (
      <Icon>
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8.5h14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </Icon>
    ),
  },
  {
    path: "/savings",
    labelKey: "nav.savings",
    icon: (
      <Icon>
        <path d="M10 2.5a7.5 7.5 0 1 0 7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 2.5v7.5h7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    ),
  },
  {
    path: "/settings",
    labelKey: "nav.settings",
    icon: (
      <Icon>
        <circle cx="10" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 3.3v1.6M10 15.1v1.6M16.7 10h-1.6M4.9 10H3.3M14.7 5.3l-1.1 1.1M6.4 13.6l-1.1 1.1M14.7 14.7l-1.1-1.1M6.4 6.4 5.3 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </Icon>
    ),
  },
];
