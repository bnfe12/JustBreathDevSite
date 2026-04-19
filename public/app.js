const icons = {
  menu: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5" stroke-linecap="round"/></svg>',
  sort: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 6h10M7 12h7M7 18h4" stroke-linecap="round"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>',
  plane: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12 20 4l-4 16-4-6-8-2Z" stroke-linejoin="round"/><path d="m20 4-8 10" stroke-linecap="round"/></svg>',
  attach: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m8 12 5-5a3 3 0 1 1 4 4l-7 7a4 4 0 1 1-6-5l7.5-7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sticker: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4h10a3 3 0 0 1 3 3v10l-6 3-7-7V7a3 3 0 0 1 3-3Z" stroke-linejoin="round"/><path d="M14 20v-6h6" stroke-linejoin="round"/></svg>',
  bell: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 18H5.5c1.2-1.2 2-2.6 2-6a4.5 4.5 0 0 1 9 0c0 3.4.8 4.8 2 6H15" stroke-linejoin="round"/><path d="M10 20a2 2 0 0 0 4 0" stroke-linecap="round"/></svg>',
  settings: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m10.3 3.3-.4 2a6.8 6.8 0 0 0-1.6.9L6.5 5l-2 2 1.2 1.8a6.7 6.7 0 0 0-.9 1.6l-2 .4v2.8l2 .4a6.7 6.7 0 0 0 .9 1.6L4.5 18l2 2 1.8-1.2a6.8 6.8 0 0 0 1.6.9l.4 2h2.8l.4-2a6.8 6.8 0 0 0 1.6-.9l1.8 1.2 2-2-1.2-1.8a6.8 6.8 0 0 0 .9-1.6l2-.4V11l-2-.4a6.8 6.8 0 0 0-.9-1.6L19.5 7l-2-2-1.8 1.2a6.8 6.8 0 0 0-1.6-.9l-.4-2Z" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.6"/></svg>',
  home: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10.5 12 4l8 6.5V20H4Z" stroke-linejoin="round"/></svg>',
  feed: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 6h14M5 12h14M5 18h10" stroke-linecap="round"/></svg>',
  message: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 3V8a2 2 0 0 1 2-2Z" stroke-linejoin="round"/></svg>',
  messages: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 3V8a2 2 0 0 1 2-2Z" stroke-linejoin="round"/></svg>',
  user: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
  project: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" stroke-linejoin="round"/></svg>',
  site: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 8h18"/><path d="M7 6h.01M11 6h.01" stroke-linecap="round"/></svg>',
  privacy: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 5 6v6c0 5 2.9 8 7 9 4.1-1 7-4 7-9V6Z" stroke-linejoin="round"/><path d="M12 10v4" stroke-linecap="round"/><circle cx="12" cy="8" r=".8" fill="currentColor"/></svg>',
  heart: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" stroke-linejoin="round"/></svg>',
  comment: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3V8a2 2 0 0 1 2-2Z" stroke-linejoin="round"/></svg>',
  share: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m14 5 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11h16" stroke-linecap="round"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18" stroke-linecap="round"/></svg>',
  more: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 4 5 5-2 2-2-2-4 4 3 3-1 1-4-4-4 4-1-1 3-3-4-4-2 2-2-2 5-5" stroke-linejoin="round"/></svg>',
  mute: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 5 9 9H5v6h4l5 4V5Z" stroke-linejoin="round"/><path d="m18 9 4 4M22 9l-4 4" stroke-linecap="round"/></svg>',
  archive: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" stroke-linejoin="round"/><path d="M3 7V4h18v3M9 12h6" stroke-linecap="round"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M7 7l1 12h8l1-12" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  people: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21a5 5 0 0 0-10 0"/><circle cx="12" cy="8" r="3.2"/><path d="M21 20a4 4 0 0 0-4-4M3 20a4 4 0 0 1 4-4"/><path d="M18.5 8.5a2.5 2.5 0 1 0-1-4.8M5.5 8.5a2.5 2.5 0 1 1 1-4.8"/></svg>',
  file: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14l7-3 7 3V10Z" stroke-linejoin="round"/></svg>',
  image: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m7 14 3-3 2 2 4-4 3 3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="9" r="1" fill="currentColor"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 12 4 4 10-10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  statusSent: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.85"><path d="M6.35 6.35A8 8 0 0 1 20 12" stroke-linecap="round"/></svg>',
  statusRead: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.85"><circle cx="12" cy="12" r="8"/></svg>',
  statusConfirmed: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.85"><circle cx="12" cy="12" r="8"/><path d="m8.6 12.1 2.2 2.2 4.8-4.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 4 2.5 5.1 5.6.8-4 3.9 1 5.6L12 16.8 6.9 19.4l1-5.6-4-3.9 5.6-.8L12 4Z" stroke-linejoin="round"/></svg>',
  external: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 5h6v6" stroke-linecap="round" stroke-linejoin="round"/><path d="m19 5-9 9" stroke-linecap="round"/><path d="M5 9v10h10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m5 7 7 6 7-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  upload: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V5" stroke-linecap="round"/><path d="m8 9 4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19h14" stroke-linecap="round"/></svg>',
  eye: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke-linejoin="round"/><circle cx="12" cy="12" r="3"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 14 14 10" stroke-linecap="round"/><path d="M7.5 15.5 5 18a3 3 0 1 0 4.2 4.2l2.5-2.5" stroke-linecap="round"/><path d="m16.5 8.5 2.5-2.5A3 3 0 0 0 14.8 1.8L12.3 4.3" stroke-linecap="round"/></svg>',
  key: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="14" r="4"/><path d="M12 14h9M18 14v-3M21 14v-2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  lock: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3" stroke-linecap="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 5 6v6c0 5 3 8 7 9 4-1 7-4 7-9V6Z" stroke-linejoin="round"/><path d="m9.5 12 1.7 1.7L15 10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1L6.5 8.5l4.1-1.4L12 3ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 14l.9 2.1L8 17l-2.1.9L5 20l-.9-2.1L2 17l2.1-.9L5 14Z" stroke-linejoin="round"/></svg>',
  bot: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="8" width="14" height="10" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 18v2M15 18v2M5 13H3M21 13h-2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  card: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3" stroke-linecap="round"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z"/><path d="M16 13h4v-3h-4a1.5 1.5 0 0 0 0 3Z" stroke-linejoin="round"/></svg>',
  currency: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v16M16 7.5c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.8 3 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3" stroke-linecap="round"/></svg>',
  database: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke-linecap="round"/></svg>',
  help: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.8.6-1.5 1.1-1.5 2.5" stroke-linecap="round"/><circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none"/></svg>',
  info: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11.5V16M12 8h.01" stroke-linecap="round"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 11a8 8 0 1 0 2 5.3" stroke-linecap="round"/><path d="M20 4v7h-7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21.6 8.2a2.8 2.8 0 0 0-2-2C17.8 5.7 12 5.7 12 5.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 10 2 12 2 12s0 2 .4 3.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2C22 14 22 12 22 12s0-2-.4-3.8ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none"/></svg>',
  steam: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="17" cy="7" r="3"/><circle cx="8" cy="15" r="2.5"/><path d="m10.2 13.7 4.8-3.2M4 14.2l2 1.1" stroke-linecap="round"/><path d="M5.5 13.6A5.5 5.5 0 1 1 12 19.4" stroke-linecap="round"/></svg>',
  users: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 20a4 4 0 0 0-8 0"/><circle cx="12" cy="9" r="3"/><path d="M21 19a3.5 3.5 0 0 0-3-3.5M3 19A3.5 3.5 0 0 1 6 15.5"/><path d="M18 8.5a2.5 2.5 0 1 0-1-4.8M6 8.5a2.5 2.5 0 1 1 1-4.8"/></svg>',
  badge: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 2 2.4 3.2-.3.9 3 2.9 1.3-1.3 2.9 1.3 2.9-2.9 1.3-.9 3-3.2-.3L12 21l-2-2.4-3.2.3-.9-3L3 14.6l1.3-2.9L3 8.8l2.9-1.3.9-3 3.2.3L12 3Z" stroke-linejoin="round"/><path d="m9.5 12.4 1.6 1.6 3.6-3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  verified: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 2.4 2 3.1-.2.9 3 2.8 1.4-1 3 1 3-2.8 1.4-.9 3-3.1-.2L12 21l-2.4-2-3.1.2-.9-3L2.8 14l1-3-1-3 2.8-1.4.9-3 3.1.2L12 3Z" stroke-linejoin="round"/><path d="m9.3 12.2 1.8 1.8 3.9-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  alert: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4 3.8 18h16.4L12 4Z" stroke-linejoin="round"/><path d="M12 9v4.5M12 17h.01" stroke-linecap="round"/></svg>',
  theme: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v4M12 17v4M4.2 6.2l2.8 2.8M17 15l2.8 2.8M3 12h4M17 12h4M4.2 17.8 7 15M17 9l2.8-2.8" stroke-linecap="round"/><circle cx="12" cy="12" r="3.5"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 20 4-1 10.5-10.5-3-3L5 16l-1 4Z" stroke-linejoin="round"/><path d="m14.5 6.5 3 3" stroke-linecap="round"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 12H5M11 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4c3 1 5 4 6 8l-5 5c-4-1-7-3-8-6l7-7Z" stroke-linejoin="round"/><path d="M9 14 5 18M11 19l-2-4M5 18l4 1" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" stroke-linejoin="round"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 13V9l10-4v12L4 13ZM14 9h3a3 3 0 0 1 0 6h-3" stroke-linejoin="round"/><path d="m6 13 1 5h3l-1-4" stroke-linecap="round"/></svg>',
  film: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M17 9h4M3 15h4M17 15h4" stroke-linecap="round"/></svg>',
  mic: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" stroke-linecap="round"/></svg>',
  record: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/></svg>',
  smile: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8.5 14a4.5 4.5 0 0 0 7 0M9 10h.01M15 10h.01" stroke-linecap="round"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 6.5a4.5 4.5 0 0 0 5.2 5.2L11 20l-3-3 8.2-8.3A4.5 4.5 0 0 1 14 6.5Z" stroke-linejoin="round"/><path d="m5 19-2 2" stroke-linecap="round"/></svg>',
  grid: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>',
  chart: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19h16M7 16V9M12 16V5M17 16v-3" stroke-linecap="round"/></svg>',
  discord: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.3 4.5A17 17 0 0 0 14.8 3l-.2.4a15 15 0 0 1 4 2 14 14 0 0 0-12 0 15 15 0 0 1 4-2L10.4 3a17 17 0 0 0-4.6 1.5C2.9 8.8 2.1 13 2.5 17.1a17 17 0 0 0 5.1 2.6l.4-.5-.3-.2c-.8-.3-1.6-.6-2.4-1.1l.2-.2a12 12 0 0 0 10.9 0l.2.2a11 11 0 0 1-2.4 1.1l-.3.2.4.5a17 17 0 0 0 5.1-2.6c.5-4.7-.5-8.9-3.1-12.6ZM8.9 14.6c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9 1 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Zm6.3 0c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9 1 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Z"/></svg>',
  edit: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z" stroke-linejoin="round"/><path d="m14 6 4 4" stroke-linecap="round"/></svg>'
};

const EMOJI_DATA = {
  'Smileys': ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖'],
  'People': ['👋','🤚','🖐','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👀','👁','👅','👄','💋','🩸'],
  'Animals': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🐓','🦃','🦚','🦜','🦢','🦩','🕊','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀','🐿','🦔'],
  'Food': ['🍎','🍊','🍋','🍇','🍓','🫐','🍈','🍉','🍑','🍒','🥭','🍍','🥥','🥝','🍅','🫒','🥑','🍆','🥦','🥬','🥒','🌶','🫑','🧄','🧅','🥔','🍠','🫘','🌽','🍞','🥐','🥖','🫓','🥨','🥯','🧀','🍳','🫕','🥞','🧇','🥓','🌭','🍔','🍟','🍕','🫔','🥪','🥙','🧆','🌮','🌯','🥗','🥘','🫙','🍜','🍝','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥮','🍢','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🍺','🥂','🍷','🥃','🍸','🍹','🧃','🥤','🧋','☕','🫖','🍵','🧉'],
  'Travel': ['🚗','🚕','🚙','🛻','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🛵','🏍','🛺','🚲','🛴','🛹','🛼','🚏','🛣','🛤','⛽','🚨','🚥','🚦','🛑','🚧','⚓','⛵','🚤','🛥','🛳','⛴','🚢','✈️','🛩','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰','🚀','🛸','🌍','🌎','🌏','🗺','🧭','🏔','⛰','🌋','🗻','🏕','🏖','🏜','🏝','🏞','🏟','🏛','🏗','🏘','🏚','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽'],
  'Objects': ['⌚','📱','💻','⌨️','🖥','🖨','🖱','🕹','💾','💿','📀','📼','📷','📸','📹','🎥','📽','🎞','📞','☎️','📟','📠','📺','📻','🧭','⏱','⏲','⏰','🕰','⌛','⏳','📡','🔋','🪫','🔌','💡','🔦','🕯','🪔','🧱','🔮','🪄','🔭','🔬','🩺','💊','💉','🩹','🩼','🩻','🌡','🪒','🧴','🧷','🧹','🧺','🧻','🪣','🧼','🫧','🪥','🧽','🧯','🛒','🚪','🪑','🚽','🪠','🚿','🛁','🪤','🧲','🖼','🪞','🛋','🛏','🛍','🎁','🎀','🎊','🎉','🪅','🎎','🎏','🎐','🧧','🎑','🎃','🎄','🎆','🎇','🧨','✨','🎍','🎋','🎗','🎟','🎫','🎖','🏆','🥇','🥈','🥉','⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🎱','🪀','🏓','🏸','🥏','🥊','🥋','🎽','⛸','🛹','🛼','🛷','🥌','🎯','🪃','🎱','🎮','🕹','🎲','🧩','🃏','🀄','🎭','🎨'],
  'Symbols': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💝','💘','💟','☮️','✝️','☪️','🕉','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🚭','❗','❕','❓','❔','‼️','⁉️','🔅','🔆','〽️','⚠️','🚸','🔱','⚜️','🔰','♻️','✅','🈯','💹','❎','🌐','💠','Ⓜ️','🌀','💤','🏧','🚾','♿','🅿️','🛗','🈳','🈂️','🛂','🛃','🛄','🛅']
};
const QUICK_EMOJIS = ['👍','❤️','😂','😮','😢','🔥','✅','👀','💯','🎉','😎','🤔'];
const CHAT_THEME_PRESETS = [
  {
    id: 'platform',
    label: { en: 'Platform', ru: 'Платформа' },
    preview: 'linear-gradient(135deg, #141414 0%, #1c1c24 50%, #101522 100%)',
    wallpaper: 'radial-gradient(circle at 0% 0%, rgba(56,189,248,.05), transparent 18%), radial-gradient(circle at 100% 100%, rgba(124,58,237,.06), transparent 18%), linear-gradient(180deg, rgba(17,17,17,1), rgba(17,17,17,1))',
    panel: 'rgba(17,17,17,.72)',
    list: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
    bubble: 'rgba(34,34,34,.92)',
    own: 'rgba(var(--accent-rgb), 0.14)',
    border: 'rgba(255,255,255,.09)'
  },
  {
    id: 'aurora',
    label: { en: 'Aurora', ru: 'Аврора' },
    preview: 'linear-gradient(135deg, #09111d 0%, #5b21b6 45%, #0891b2 100%)',
    wallpaper: 'radial-gradient(circle at 14% 18%, rgba(168,85,247,.30), transparent 24%), radial-gradient(circle at 82% 22%, rgba(14,165,233,.26), transparent 28%), linear-gradient(160deg, #070b14 0%, #120f26 48%, #0a1321 100%)',
    panel: 'rgba(7,11,20,.54)',
    list: 'linear-gradient(180deg, rgba(7,10,18,.12), rgba(7,10,18,.52))',
    bubble: 'rgba(9,15,27,.80)',
    own: 'rgba(139,92,246,.22)',
    border: 'rgba(255,255,255,.12)'
  },
  {
    id: 'night-grid',
    label: { en: 'Night Grid', ru: 'Ночной грид' },
    preview: 'linear-gradient(135deg, #09090b 0%, #111827 45%, #0f172a 100%)',
    wallpaper: 'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(150deg, #07090d 0%, #101827 52%, #08121b 100%)',
    panel: 'rgba(7,10,16,.62)',
    list: 'linear-gradient(180deg, rgba(7,10,16,.12), rgba(7,10,16,.56))',
    bubble: 'rgba(13,18,28,.84)',
    own: 'rgba(59,130,246,.20)',
    border: 'rgba(255,255,255,.12)'
  },
  {
    id: 'sunset-room',
    label: { en: 'Sunset Room', ru: 'Сансет' },
    preview: 'linear-gradient(135deg, #2a1014 0%, #9a3412 42%, #f59e0b 100%)',
    wallpaper: 'radial-gradient(circle at 18% 12%, rgba(251,146,60,.30), transparent 24%), radial-gradient(circle at 82% 16%, rgba(244,114,182,.22), transparent 24%), linear-gradient(160deg, #16080b 0%, #3a1313 42%, #1f1118 100%)',
    panel: 'rgba(20,9,12,.56)',
    list: 'linear-gradient(180deg, rgba(20,9,12,.14), rgba(20,9,12,.52))',
    bubble: 'rgba(35,14,16,.82)',
    own: 'rgba(249,115,22,.20)',
    border: 'rgba(255,255,255,.12)'
  },
  {
    id: 'paper-latte',
    label: { en: 'Paper Latte', ru: 'Бумага' },
    preview: 'linear-gradient(135deg, #f3eadc 0%, #d6c0a5 50%, #b7916e 100%)',
    wallpaper: 'radial-gradient(circle at 24% 18%, rgba(255,255,255,.48), transparent 22%), linear-gradient(160deg, #f2e9dc 0%, #ddcab4 48%, #c69a72 100%)',
    panel: 'rgba(249,241,231,.66)',
    list: 'linear-gradient(180deg, rgba(255,248,240,.24), rgba(244,232,218,.52))',
    bubble: 'rgba(255,247,238,.88)',
    own: 'rgba(216,180,138,.36)',
    border: 'rgba(107,74,47,.16)'
  },
  {
    id: 'ocean-depth',
    label: { en: 'Ocean Depth', ru: 'Глубина' },
    preview: 'linear-gradient(135deg, #03131f 0%, #0f3d5e 50%, #0d9488 100%)',
    wallpaper: 'radial-gradient(circle at 18% 16%, rgba(45,212,191,.26), transparent 24%), radial-gradient(circle at 84% 18%, rgba(56,189,248,.18), transparent 24%), linear-gradient(165deg, #031018 0%, #08304a 52%, #07161b 100%)',
    panel: 'rgba(4,17,25,.58)',
    list: 'linear-gradient(180deg, rgba(4,17,25,.12), rgba(4,17,25,.54))',
    bubble: 'rgba(7,24,32,.82)',
    own: 'rgba(45,212,191,.18)',
    border: 'rgba(255,255,255,.12)'
  },
  {
    id: 'mono-noise',
    label: { en: 'Mono Noise', ru: 'Моно' },
    preview: 'linear-gradient(135deg, #0e0e10 0%, #29292f 50%, #141416 100%)',
    wallpaper: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,.08), transparent 16%), radial-gradient(circle at 80% 18%, rgba(255,255,255,.06), transparent 14%), linear-gradient(160deg, #0a0a0b 0%, #17171b 52%, #101014 100%)',
    panel: 'rgba(10,10,11,.62)',
    list: 'linear-gradient(180deg, rgba(10,10,11,.14), rgba(10,10,11,.56))',
    bubble: 'rgba(22,22,24,.84)',
    own: 'rgba(124,58,237,.16)',
    border: 'rgba(255,255,255,.12)'
  }
];
const MESSAGE_STYLE_OPTIONS = [
  { id: 'soft', label: { en: 'Soft', ru: 'Мягкий' } },
  { id: 'glass', label: { en: 'Glass', ru: 'Стекло' } },
  { id: 'minimal', label: { en: 'Minimal', ru: 'Минимал' } }
];

const beaverMascot = `
<svg viewBox="0 0 180 160" width="140" height="124" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="32" y1="20" x2="148" y2="142" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7c3aed"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <ellipse cx="90" cy="82" rx="54" ry="50" fill="url(#g1)" opacity=".96"/>
  <ellipse cx="55" cy="36" rx="18" ry="22" fill="#7c3aed" opacity=".94"/>
  <ellipse cx="125" cy="36" rx="18" ry="22" fill="#38bdf8" opacity=".94"/>
  <ellipse cx="74" cy="78" rx="8" ry="11" fill="#0b1020"/>
  <ellipse cx="106" cy="78" rx="8" ry="11" fill="#0b1020"/>
  <path d="M71 104c7 7 31 7 38 0" stroke="#0b1020" stroke-width="7" stroke-linecap="round"/>
  <rect x="70" y="102" width="16" height="24" rx="6" fill="#f8fafc"/>
  <rect x="94" y="102" width="16" height="24" rx="6" fill="#f8fafc"/>
  <path d="M142 112c20 8 26 16 24 28-2 10-11 16-22 15-14-1-24-14-24-29 0-4 1-8 3-14l19 0Z" fill="#7b4c22" opacity=".9"/>
</svg>`;

const translations = {
  en: {
    home: 'Home', feed: 'Feed', messages: 'Messages', sites: 'Sites', settings: 'Settings', discover: 'Discover',
    signIn: 'Sign in', signOut: 'Sign out', profile: 'Profile', notifications: 'Notifications',
    friends: 'Friends', following: 'Following', personal: 'Personal', work: 'Work', groups: 'Groups',
    popularUsers: 'Popular users', recentProjects: 'Recent projects', creatorSites: 'Creator sites', openSpaces: 'Open spaces',
    quickPost: 'Quick post', devlog: 'Devlog', createProject: 'Create project', createSite: 'Create site', createGroup: 'Create group', createWorkspace: 'Create workspace',
    search: 'Search', sort: 'Sort', relevance: 'Relevance', popularity: 'Popularity', date: 'Date',
    writeMessage: 'Write a message…', send: 'Send', attach: 'Attach', stickers: 'Stickers', comments: 'Comments',
    deleteAccount: 'Delete account', requestVerification: 'Request verification', save: 'Save changes', billing: 'Billing', privacy: 'Privacy', appearance: 'Appearance', chat: 'Chat',
    launchSite: 'Launch site', openProfile: 'Open profile', openSite: 'Open site', follow: 'Follow', unfollow: 'Following', addFriend: 'Add friend', message: 'Message',
    accountCenter: 'Account center', dataAndBackups: 'Data and backups', exportData: 'Export my data', createBackup: 'Create backup',
    templateSite: 'Template site', uploadSite: 'Upload HTML site', theme: 'Theme', language: 'Language', badgeRequest: 'Badge request',
    followersOnly: 'Followers only', everyone: 'Everyone', nobody: 'Nobody', public: 'Public', handleOnly: 'Handle only', private: 'Private',
    settingsLead: 'Manage your profile, privacy, notifications, billing and account security.',
    homeLead: 'Build profiles, ship independent sites, collaborate in workspaces and message directly — all in one platform.',
    noRoom: 'Choose a conversation to start.', noPosts: 'Nothing published yet.', noSites: 'No sites yet.', noProjects: 'No projects yet.',
    hiddenByPrivacy: 'This profile is private.', schedule: 'Schedule', title: 'Title', body: 'Body', summary: 'Summary', slug: 'Slug', visibility: 'Visibility',
    profileUpdated: 'Profile updated.', settingsUpdated: 'Settings saved.', accountRemoved: 'Account deleted.', chatSent: 'Message sent.', postPublished: 'Post published.',
    siteCreated: 'Site created.', projectCreated: 'Project created.', groupCreated: 'Group created.', workspaceCreated: 'Workspace created.',
    invite: 'Invite', tasks: 'Tasks', addPack: 'Add sticker pack', addSticker: 'Add sticker', addPhotos: 'Add image',
    verificationStatus: 'Verification', subscribedTo: 'Subscriptions', savedAccounts: 'Saved accounts', billingLead: 'Choose a plan to unlock more storage and features.',
    friendRequests: 'Requests', members: 'Members', role: 'Role', tags: 'Tags', close: 'Close', viewAll: 'View all', launch: 'Launch', openMessages: 'Open messages',
    switchAccount: 'Switch account', accountDeleted: 'This action permanently removes your account.', confirmDelete: 'Type DELETE to confirm.',
    enterToSend: 'Send with Enter', reducedMotion: 'Reduced motion', compactMode: 'Compact density', highContrast: 'High contrast', showFollowers: 'Show followers publicly', showLastSeen: 'Show last seen',
    allowDMs: 'Who can message you', allowFriendRequests: 'Allow friend requests', allowInvites: 'Allow invite links', showEmail: 'Show email publicly',
    lineContact: 'Contact', heroCopy: 'Hero headline', aboutCopy: 'About copy', status: 'Status',
    activity: 'Activity', projects: 'Projects', dark: 'Dark', light: 'Light', system: 'System', details: 'Details', publish: 'Publish',
    displayName: 'Display name', bio: 'Bio', avatar: 'Avatar', banner: 'Banner', website: 'Website', github: 'GitHub', discord: 'Discord', telegram: 'Telegram',
    description: 'Description', excerpt: 'Excerpt', expiresHours: 'Hours until expiry', requestedBadge: 'Requested badge', reason: 'Reason', password: 'Password',
    cover: 'Cover', image: 'Image', html: 'HTML', links: 'Links', name: 'Name', sticker: 'Sticker', hero: 'Hero', scheduledFor: 'Scheduled for', confirm: 'Confirm', verification: 'Verification',
    copyLink: 'Copy link', scheduleFor: 'Schedule for', create: 'Create', update: 'Update', archive: 'Archive', mute: 'Mute', pin: 'Pin', leave: 'Leave', remove: 'Remove',
    notificationsSettings: 'Notifications', accentColor: 'Accent color', onlineStatus: 'Online status', security: 'Security', social: 'Social', data: 'Data', bots: 'API Tokens',
    twoFactor: 'Two-factor auth', sessions: 'Sessions', dangerZone: 'Danger zone', adminPanel: 'Admin Panel',
    stats: 'Stats', users: 'Users', rooms: 'Rooms', logs: 'Logs', ads: 'Ads', moderation: 'Moderation',
    emailVerified: 'Email verified', emailNotVerified: 'Email not verified', verifyNow: 'Verify now',
    statusSending: 'Sending…', statusSentUnread: 'Sent, not read yet.', statusRead: 'Delivered and read.',
    statusReadPendingConfirm: 'Read, waiting for confirmation.', statusConfirmed: 'Read and confirmed.',
    confirmReceipt: 'Confirm',
  },
  ru: {
    home: 'Главная', feed: 'Лента', messages: 'Сообщения', sites: 'Сайты', settings: 'Настройки', discover: 'Поиск',
    signIn: 'Войти', signOut: 'Выйти', profile: 'Профиль', notifications: 'Уведомления',
    friends: 'Друзья', following: 'Подписки', personal: 'Личные', work: 'Рабочие', groups: 'Группы',
    popularUsers: 'Популярные пользователи', recentProjects: 'Свежие проекты', creatorSites: 'Сайты авторов', openSpaces: 'Открытые пространства',
    quickPost: 'Пост', devlog: 'Девлог', createProject: 'Создать проект', createSite: 'Создать сайт', createGroup: 'Создать группу', createWorkspace: 'Создать воркспейс',
    search: 'Поиск', sort: 'Сортировка', relevance: 'Релевантность', popularity: 'Популярность', date: 'Дата',
    writeMessage: 'Написать сообщение…', send: 'Отправить', attach: 'Вложение', stickers: 'Стикеры', comments: 'Комментарии',
    deleteAccount: 'Удалить аккаунт', requestVerification: 'Подать на верификацию', save: 'Сохранить', billing: 'Биллинг', privacy: 'Конфиденциальность', appearance: 'Внешний вид', chat: 'Чат',
    launchSite: 'Запустить сайт', openProfile: 'Открыть профиль', openSite: 'Открыть сайт', follow: 'Подписаться', unfollow: 'Подписка', addFriend: 'Добавить в друзья', message: 'Написать',
    accountCenter: 'Центр аккаунта', dataAndBackups: 'Данные и бэкапы', exportData: 'Экспорт данных', createBackup: 'Создать бэкап',
    templateSite: 'Шаблонный сайт', uploadSite: 'Загрузить HTML-сайт', theme: 'Тема', language: 'Язык', badgeRequest: 'Запрос бейджа',
    followersOnly: 'Только подписчики', everyone: 'Все', nobody: 'Никто', public: 'Публичный', handleOnly: 'Только ник', private: 'Приватный',
    settingsLead: 'Управляй профилем, приватностью, уведомлениями, биллингом и безопасностью аккаунта.',
    homeLead: 'Профили, независимые сайты, рабочие пространства и личные диалоги — всё в одном месте.',
    noRoom: 'Выбери диалог, чтобы начать.', noPosts: 'Пока ничего не опубликовано.', noSites: 'Пока нет сайтов.', noProjects: 'Пока нет проектов.',
    hiddenByPrivacy: 'Этот профиль закрыт.', schedule: 'Запланировать', title: 'Заголовок', body: 'Текст', summary: 'Кратко', slug: 'Slug', visibility: 'Видимость',
    profileUpdated: 'Профиль обновлён.', settingsUpdated: 'Настройки сохранены.', accountRemoved: 'Аккаунт удалён.', chatSent: 'Сообщение отправлено.', postPublished: 'Публикация создана.',
    siteCreated: 'Сайт создан.', projectCreated: 'Проект создан.', groupCreated: 'Группа создана.', workspaceCreated: 'Воркспейс создан.',
    invite: 'Инвайт', tasks: 'Задачи', addPack: 'Добавить стикерпак', addSticker: 'Добавить стикер', addPhotos: 'Добавить изображение',
    verificationStatus: 'Верификация', subscribedTo: 'Подписки', savedAccounts: 'Сохранённые аккаунты', billingLead: 'Выбери план для увеличения хранилища и возможностей.',
    friendRequests: 'Заявки', members: 'Участники', role: 'Роль', tags: 'Теги', close: 'Закрыть', viewAll: 'Показать всё', launch: 'Запустить', openMessages: 'Открыть сообщения',
    switchAccount: 'Переключить аккаунт', accountDeleted: 'Это действие удаляет аккаунт без возможности восстановления.', confirmDelete: 'Напиши DELETE для подтверждения.',
    enterToSend: 'Отправка по Enter', reducedMotion: 'Меньше анимации', compactMode: 'Компактнее', highContrast: 'Высокий контраст', showFollowers: 'Показывать подписчиков публично', showLastSeen: 'Показывать онлайн-статус',
    allowDMs: 'Кто может писать', allowFriendRequests: 'Разрешить заявки в друзья', allowInvites: 'Разрешить инвайты', showEmail: 'Показывать почту публично',
    lineContact: 'Контакт', heroCopy: 'Главный заголовок', aboutCopy: 'Основной текст', status: 'Статус',
    activity: 'Активность', projects: 'Проекты', dark: 'Тёмная', light: 'Светлая', system: 'Системная', details: 'Детали', publish: 'Опубликовать',
    displayName: 'Имя', bio: 'Описание', avatar: 'Аватар', banner: 'Баннер', website: 'Сайт', github: 'GitHub', discord: 'Discord', telegram: 'Telegram',
    description: 'Описание', excerpt: 'Выдержка', expiresHours: 'Часов до окончания', requestedBadge: 'Бейдж', reason: 'Причина', password: 'Пароль',
    cover: 'Обложка', image: 'Изображение', html: 'HTML', links: 'Ссылки', name: 'Название', sticker: 'Стикер', hero: 'Hero', scheduledFor: 'Время публикации', confirm: 'Подтвердить', verification: 'Верификация',
    copyLink: 'Скопировать ссылку', scheduleFor: 'Время публикации', create: 'Создать', update: 'Обновить', archive: 'Архив', mute: 'Без звука', pin: 'Закрепить', leave: 'Выйти', remove: 'Удалить',
    notificationsSettings: 'Уведомления', accentColor: 'Цвет акцента', onlineStatus: 'Онлайн-статус', security: 'Безопасность', social: 'Социальное', data: 'Данные', bots: 'API-токены',
    twoFactor: 'Двухфакторная аутентификация', sessions: 'Сессии', dangerZone: 'Опасная зона', adminPanel: 'Панель управления',
    stats: 'Статистика', users: 'Пользователи', rooms: 'Комнаты', logs: 'Логи', ads: 'Реклама', moderation: 'Модерация',
    emailVerified: 'Email подтверждён', emailNotVerified: 'Email не подтверждён', verifyNow: 'Подтвердить',
    statusSending: 'Отправляется…', statusSentUnread: 'Отправлено, но ещё не прочитано.', statusRead: 'Доставлено и прочитано.',
    statusReadPendingConfirm: 'Прочитано, ожидает подтверждения.', statusConfirmed: 'Прочитано и подтверждено.',
    confirmReceipt: 'Подтвердить',
  },
  pt: {
    home: 'Início', feed: 'Feed', messages: 'Mensagens', sites: 'Sites', settings: 'Configurações', discover: 'Descobrir',
    signIn: 'Entrar', signOut: 'Sair', profile: 'Perfil', notifications: 'Notificações',
    friends: 'Amigos', following: 'Seguindo', personal: 'Pessoal', work: 'Trabalho', groups: 'Grupos',
    popularUsers: 'Usuários populares', recentProjects: 'Projetos recentes', creatorSites: 'Sites de criadores', openSpaces: 'Espaços abertos',
    quickPost: 'Post rápido', devlog: 'Devlog', createProject: 'Criar projeto', createSite: 'Criar site', createGroup: 'Criar grupo', createWorkspace: 'Criar workspace',
    search: 'Buscar', sort: 'Ordenar', relevance: 'Relevância', popularity: 'Popularidade', date: 'Data',
    writeMessage: 'Escreva uma mensagem…', send: 'Enviar', attach: 'Anexar', stickers: 'Figurinhas', comments: 'Comentários',
    deleteAccount: 'Excluir conta', requestVerification: 'Solicitar verificação', save: 'Salvar', billing: 'Pagamentos', privacy: 'Privacidade', appearance: 'Aparência', chat: 'Chat',
    follow: 'Seguir', unfollow: 'Seguindo', addFriend: 'Adicionar amigo', message: 'Mensagem',
    accountCenter: 'Central de conta', theme: 'Tema', language: 'Idioma',
    everyone: 'Todos', nobody: 'Ninguém', public: 'Público', private: 'Privado',
    settingsLead: 'Gerencie seu perfil, privacidade, notificações e segurança.',
    homeLead: 'Perfis, sites, workspaces e mensagens diretas — tudo em um só lugar.',
    noRoom: 'Escolha uma conversa.', noPosts: 'Nada publicado ainda.', noSites: 'Sem sites ainda.', noProjects: 'Sem projetos ainda.',
    dark: 'Escuro', light: 'Claro', system: 'Sistema', save: 'Salvar alterações',
    status: 'Status', adminPanel: 'Painel Admin', emailVerified: 'Email verificado', verifyNow: 'Verificar',
  },
  pl: {
    home: 'Strona główna', feed: 'Aktualności', messages: 'Wiadomości', sites: 'Strony', settings: 'Ustawienia', discover: 'Odkryj',
    signIn: 'Zaloguj się', signOut: 'Wyloguj', profile: 'Profil', notifications: 'Powiadomienia',
    friends: 'Znajomi', following: 'Obserwujesz', personal: 'Osobiste', work: 'Praca', groups: 'Grupy',
    popularUsers: 'Popularni użytkownicy', recentProjects: 'Ostatnie projekty', creatorSites: 'Strony twórców', openSpaces: 'Otwarte przestrzenie',
    quickPost: 'Szybki post', devlog: 'Devlog', createProject: 'Utwórz projekt', createSite: 'Utwórz stronę', createGroup: 'Utwórz grupę', createWorkspace: 'Utwórz przestrzeń',
    search: 'Szukaj', sort: 'Sortuj', relevance: 'Trafność', popularity: 'Popularność', date: 'Data',
    writeMessage: 'Napisz wiadomość…', send: 'Wyślij', attach: 'Załącz', stickers: 'Naklejki', comments: 'Komentarze',
    deleteAccount: 'Usuń konto', requestVerification: 'Poproś o weryfikację', save: 'Zapisz zmiany', billing: 'Płatności', privacy: 'Prywatność', appearance: 'Wygląd', chat: 'Czat',
    follow: 'Obserwuj', unfollow: 'Obserwujesz', addFriend: 'Dodaj znajomego', message: 'Wiadomość',
    accountCenter: 'Centrum konta', theme: 'Motyw', language: 'Język',
    everyone: 'Wszyscy', nobody: 'Nikt', public: 'Publiczny', private: 'Prywatny',
    settingsLead: 'Zarządzaj profilem, prywatnością i bezpieczeństwem.',
    homeLead: 'Profile, strony, przestrzenie robocze i wiadomości — wszystko w jednym miejscu.',
    noRoom: 'Wybierz rozmowę.', noPosts: 'Brak publikacji.', noSites: 'Brak stron.', noProjects: 'Brak projektów.',
    dark: 'Ciemny', light: 'Jasny', system: 'Systemowy',
    status: 'Status', adminPanel: 'Panel admina', emailVerified: 'Email zweryfikowany', verifyNow: 'Zweryfikuj',
  },
  fr: {
    home: 'Accueil', feed: 'Fil', messages: 'Messages', sites: 'Sites', settings: 'Paramètres', discover: 'Découvrir',
    signIn: 'Se connecter', signOut: 'Déconnexion', profile: 'Profil', notifications: 'Notifications',
    friends: 'Amis', following: 'Abonnements', personal: 'Personnel', work: 'Travail', groups: 'Groupes',
    popularUsers: 'Utilisateurs populaires', recentProjects: 'Projets récents', creatorSites: 'Sites créateurs', openSpaces: 'Espaces ouverts',
    quickPost: 'Post rapide', devlog: 'Devlog', createProject: 'Créer projet', createSite: 'Créer site', createGroup: 'Créer groupe', createWorkspace: 'Créer espace',
    search: 'Chercher', sort: 'Trier', relevance: 'Pertinence', popularity: 'Popularité', date: 'Date',
    writeMessage: 'Écrire un message…', send: 'Envoyer', attach: 'Joindre', stickers: 'Autocollants', comments: 'Commentaires',
    deleteAccount: 'Supprimer le compte', requestVerification: 'Demander vérification', save: 'Enregistrer', billing: 'Facturation', privacy: 'Confidentialité', appearance: 'Apparence', chat: 'Chat',
    follow: 'Suivre', unfollow: 'Abonné', addFriend: 'Ajouter ami', message: 'Message',
    accountCenter: 'Centre de compte', theme: 'Thème', language: 'Langue',
    everyone: 'Tout le monde', nobody: 'Personne', public: 'Public', private: 'Privé',
    settingsLead: 'Gérez votre profil, confidentialité et sécurité.',
    homeLead: 'Profils, sites, espaces de travail et messages directs — tout en un.',
    noRoom: 'Choisissez une conversation.', noPosts: 'Rien de publié.', noSites: 'Aucun site.', noProjects: 'Aucun projet.',
    dark: 'Sombre', light: 'Clair', system: 'Système',
    status: 'Statut', adminPanel: 'Panneau admin', emailVerified: 'Email vérifié', verifyNow: 'Vérifier',
  },
  uk: {
    home: 'Головна', feed: 'Стрічка', messages: 'Повідомлення', sites: 'Сайти', settings: 'Налаштування', discover: 'Пошук',
    signIn: 'Увійти', signOut: 'Вийти', profile: 'Профіль', notifications: 'Сповіщення',
    friends: 'Друзі', following: 'Підписки', personal: 'Особисті', work: 'Робочі', groups: 'Групи',
    popularUsers: 'Популярні користувачі', recentProjects: 'Нові проєкти', creatorSites: 'Сайти авторів', openSpaces: 'Відкриті простори',
    quickPost: 'Пост', devlog: 'Девлог', createProject: 'Створити проєкт', createSite: 'Створити сайт', createGroup: 'Створити групу', createWorkspace: 'Створити воркспейс',
    search: 'Пошук', sort: 'Сортування', relevance: 'Релевантність', popularity: 'Популярність', date: 'Дата',
    writeMessage: 'Написати повідомлення…', send: 'Надіслати', attach: 'Вкласти', stickers: 'Стікери', comments: 'Коментарі',
    deleteAccount: 'Видалити акаунт', requestVerification: 'Запит верифікації', save: 'Зберегти', billing: 'Оплата', privacy: 'Конфіденційність', appearance: 'Вигляд', chat: 'Чат',
    follow: 'Підписатись', unfollow: 'Підписка', addFriend: 'Додати друга', message: 'Написати',
    accountCenter: 'Центр акаунту', theme: 'Тема', language: 'Мова',
    everyone: 'Всі', nobody: 'Ніхто', public: 'Публічний', private: 'Приватний',
    settingsLead: 'Керуй профілем, приватністю та безпекою акаунту.',
    homeLead: 'Профілі, сайти, робочі простори та повідомлення — все в одному місці.',
    noRoom: 'Обери розмову.', noPosts: 'Ще нічого не опубліковано.', noSites: 'Немає сайтів.', noProjects: 'Немає проєктів.',
    dark: 'Темна', light: 'Світла', system: 'Системна',
    status: 'Статус', adminPanel: 'Панель адміна', emailVerified: 'Email підтверджено', verifyNow: 'Підтвердити',
  }
};

const state = {
  route: parseRoute(location.pathname),
  currentPath: location.pathname,
  bootstrap: null, meta: null, home: null,
  me: null, meLoaded: false,
  feed: { items: [], tab: 'quick', search: '', sort: 'date', comments: {} },
  discover: { users: [], projects: [], sites: [], rooms: [], search: '', sort: 'relevance' },
  profile: null, project: null,
  chat: {
    bootstrap: null, selectedSlug: null, room: null, messages: [], tasks: [],
    tab: 'personal', search: '', attachment: null, stickerPackId: null,
    stickerPicker: false, mobileView: 'list', unread: {}, sending: false,
    emojiPickerMsgId: null, replyingToMessage: null, editingMessageId: null,
    mediaPicker: false, mediaTab: 'emoji', mediaPackId: null, mediaSearch: '', gifResults: [],
    unreadCount: 0, lastSeenMessageId: 0, previewOnly: false,
    friendsExpanded: false, roomInfoTab: 'info',
    attachments: [],
    forceScrollBottom: false
  },
  sites: { mine: [], public: [], filter: 'mine' },
  mail: { inbox: [], sent: [], unread: 0, folder: 'inbox', selected: null, composing: false },
  guest: false,
  settingsTab: 'profile',
  drawerOpen: false, modal: null,
  profileScrollByPath: {},
  pendingWindowScroll: null,
  toasts: [], hover: null,
  lightbox: null,
  loading: true,           // start loading=true for splash screen
  appReady: false,         // splash screen control
  maintenance: false,      // maintenance mode flag
  crypto: null,
  profileDraftMedia: { avatarDataUrl: '', bannerDataUrl: '' },
  savedAccounts: loadSavedAccounts(),
  refreshTimer: null, fastRefreshTimer: null,
  routeLoadSeq: 0,
  // SSE
  sse: null, sseStatus: 'off',
  sseUserId: 0,
  // Chat extras
  typing: {}, readReceipts: {}, pinnedMessages: [], memberList: [], memberListRoom: null, memberListLoading: false,
  // Admin
  adminStats: null, adminUsers: [], adminTab: 'stats',
  // Search
  searchResults: { messages: [], query: '' },
  // Ads — safe default, overwritten by server
  ads: [
    { id: 'jb-hosting', type: 'banner', icon: 'rocket', title: 'justbreath Hosting',
      desc: 'Deploy your sites and bots. 500MB free storage for creators.',
      cta: 'Get started', href: '/sites', internal: true, active: true },
    { id: 'jb-upgrade', type: 'card', icon: 'bolt', title: 'Go Pro',
      desc: 'More storage, custom domains and priority support from €5/mo.',
      cta: 'See plans →', href: '/#billing', internal: true, active: true }
  ],
};

function parseRoute(pathname) {
  if (pathname === '/feed') return { name: 'feed' };
  if (pathname === '/messages') return { name: 'messages' };
  if (pathname.startsWith('/messages/')) return { name: 'messages', slug: pathname.split('/').at(-1) };
  if (pathname === '/settings') return { name: 'settings' };
  if (pathname === '/sites') return { name: 'sites' };
  if (pathname === '/discover') return { name: 'discover' };
  if (pathname === '/admin') return { name: 'admin' };
  if (pathname === '/mail') return { name: 'mail', folder: 'inbox' };
  if (pathname.startsWith('/mail/')) return { name: 'mail', folder: pathname.split('/').at(-1) };
  if (pathname === '/verify') return { name: 'verify' };
  if (pathname === '/developers' || pathname.startsWith('/developers/')) return { name: 'developers', section: pathname.split('/')[2] || 'overview' };
  if (pathname === '/privacy' || pathname.startsWith('/privacy/')) return { name: 'privacy', section: pathname.split('/')[2] || 'overview' };
  if (pathname === '/terms' || pathname.startsWith('/terms/')) return { name: 'terms', section: pathname.split('/')[2] || 'overview' };
  if (pathname === '/contact') return { name: 'contact' };
  if (pathname === '/about') return { name: 'about' };
  if (pathname.startsWith('/project/')) return { name: 'project', slug: pathname.split('/').at(-1) };
  if (pathname.startsWith('/join/')) return { name: 'join', code: pathname.split('/').at(-1) };
  if (/^\/@[^/]+$/.test(pathname)) return { name: 'profile', handle: pathname.slice(2) };
  return { name: 'home' };
}

function getWindowScrollTop() {
  return Math.max(window.scrollY || 0, document.documentElement?.scrollTop || 0, document.body?.scrollTop || 0);
}

function rememberProfileScroll(path = state.currentPath, route = state.route) {
  if (!path || route?.name !== 'profile') return;
  state.profileScrollByPath[path] = getWindowScrollTop();
}

function queueWindowScroll(path = location.pathname, route = state.route) {
  if (!path) return;
  state.pendingWindowScroll = {
    path,
    top: route?.name === 'profile' ? Number(state.profileScrollByPath[path] || 0) : 0
  };
}

function currentLang() {
  if (state.me?.user?.languagePreference) return state.me.user.languagePreference;
  const stored = localStorage.getItem('jb_lang');
  if (stored && translations[stored]) return stored;
  // auto-detect from browser
  const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase().slice(0, 2);
  const map = { ru: 'ru', pt: 'pt', pl: 'pl', fr: 'fr', uk: 'uk' };
  return map[nav] || 'en';
}
function currentTheme() {
  const pref = state.me?.user?.themePreference || localStorage.getItem('jb_theme') || 'dark';
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return pref;
}
function localeLabel(source) {
  if (!source) return '';
  if (typeof source === 'string') return source;
  return currentLang() === 'ru' ? (source.ru || source.en || '') : (source.en || source.ru || '');
}
function getChatSettings() {
  return currentUser()?.settings || state.me?.user?.settings || {};
}
function getChatThemePreset(id) {
  return CHAT_THEME_PRESETS.find((item) => item.id === id) || CHAT_THEME_PRESETS[0];
}
function normalizeChatTheme(theme) {
  if (!theme || typeof theme !== 'object') return { mode: 'preset', preset: 'platform', from: '#6d28d9', to: '#0ea5e9', imageUrl: '' };
  return {
    mode: ['preset', 'gradient', 'image'].includes(theme.mode) ? theme.mode : 'preset',
    preset: theme.preset || 'platform',
    from: theme.from || '#6d28d9',
    to: theme.to || '#0ea5e9',
    imageUrl: theme.imageUrl || ''
  };
}
function resolveMessageStyle() {
  const style = getChatSettings().messageStyle;
  return MESSAGE_STYLE_OPTIONS.some((item) => item.id === style) ? style : 'soft';
}
function resolveChatTheme(roomSlug = state.chat.room?.slug) {
  const settings = getChatSettings();
  const roomThemes = settings.chatThemesByRoom || {};
  if (roomSlug && roomThemes[roomSlug]) return normalizeChatTheme(roomThemes[roomSlug]);
  if (settings.chatThemeGlobal) return normalizeChatTheme(settings.chatThemeGlobal);
  return normalizeChatTheme(null);
}
function chatThemePreviewStyle(theme) {
  const normalized = normalizeChatTheme(theme);
  if (normalized.mode === 'gradient') return `background:linear-gradient(135deg, ${normalized.from}, ${normalized.to});`;
  if (normalized.mode === 'image' && normalized.imageUrl) return `background-image:url('${escapeHtml(normalized.imageUrl)}');background-size:cover;background-position:center;`;
  return `background:${getChatThemePreset(normalized.preset).preview};`;
}
function chatThemeInlineStyle(theme) {
  const normalized = normalizeChatTheme(theme);
  const preset = getChatThemePreset(normalized.preset);
  const wallpaper = normalized.mode === 'gradient'
    ? `linear-gradient(145deg, ${normalized.from}, ${normalized.to})`
    : normalized.mode === 'image' && normalized.imageUrl
      ? `url('${escapeHtml(normalized.imageUrl)}')`
      : preset.wallpaper;
  const list = normalized.mode === 'gradient'
    ? 'linear-gradient(180deg, rgba(7,10,18,.16), rgba(7,10,18,.48))'
    : normalized.mode === 'image' && normalized.imageUrl
      ? 'linear-gradient(180deg, rgba(7,10,18,.18), rgba(7,10,18,.58))'
      : preset.list;
  const panel = normalized.mode === 'gradient'
    ? 'rgba(7,10,18,.56)'
    : normalized.mode === 'image' && normalized.imageUrl
      ? 'rgba(7,10,18,.52)'
      : preset.panel;
  const bubble = normalized.mode === 'gradient'
    ? 'rgba(10,16,24,.82)'
    : normalized.mode === 'image' && normalized.imageUrl
      ? 'rgba(9,14,22,.82)'
      : preset.bubble;
  const own = normalized.mode === 'gradient'
    ? 'rgba(var(--accent-rgb), .20)'
    : normalized.mode === 'image' && normalized.imageUrl
      ? 'rgba(var(--accent-rgb), .22)'
      : preset.own;
  const border = normalized.mode === 'gradient'
    ? 'rgba(255,255,255,.12)'
    : normalized.mode === 'image' && normalized.imageUrl
      ? 'rgba(255,255,255,.14)'
      : preset.border;
  return [
    `--chat-wallpaper:${wallpaper}`,
    `--chat-list-bg:${list}`,
    `--chat-panel-bg:${panel}`,
    `--chat-bubble-bg:${bubble}`,
    `--chat-bubble-own-bg:${own}`,
    `--chat-bubble-border:${border}`
  ].join(';');
}
function normalizeMessageForViewer(message) {
  const meId = Number(currentUser()?.id || 0);
  const authorId = Number(message?.author?.id || 0);
  return { ...message, ownedBySession: Boolean(authorId && meId && authorId === meId) };
}
function getRoomMediaItems(room = state.chat.room) {
  if (!room) return [];
  const items = [];
  for (const message of state.chat.messages || []) {
    if (!message || message.deleted) continue;
    const attachments = Array.isArray(message.attachments) && message.attachments.length
      ? message.attachments
      : (message.attachment?.url ? [message.attachment] : []);
    for (const attachment of attachments) {
      const type = attachment?.type || 'image';
      if (!attachment?.url || type === 'audio') continue;
      items.push({
        src: attachment.url,
        alt: attachment.name || message.author?.displayName || '',
        type,
        author: message.author?.displayName || '',
        createdAt: message.createdAt
      });
    }
  }
  return items;
}
function openLightboxState(src, alt = '', type = 'image') {
  let items = [{ src, alt, type }];
  let index = 0;
  if (state.route.name === 'messages' && state.chat.room) {
    const roomItems = getRoomMediaItems(state.chat.room);
    const roomIndex = roomItems.findIndex((item) => item.src === src);
    if (roomIndex >= 0) {
      items = roomItems;
      index = roomIndex;
    }
  }
  state.lightbox = { items, index };
}
function shiftLightbox(delta) {
  if (!state.lightbox?.items?.length) return;
  const total = state.lightbox.items.length;
  state.lightbox.index = (state.lightbox.index + delta + total) % total;
  render();
}
function renderChatThemeSwatches(inputName, selectedChoice, allowImage = false) {
  const choice = selectedChoice || 'preset:platform';
  return `<div class="chat-theme-swatch-grid">
    ${CHAT_THEME_PRESETS.map((preset) => `
      <label class="chat-theme-swatch ${choice === `preset:${preset.id}` ? 'active' : ''}">
        <input type="radio" name="${inputName}" value="preset:${preset.id}" ${choice === `preset:${preset.id}` ? 'checked' : ''} />
        <span class="chat-theme-art" style="${chatThemePreviewStyle({ mode: 'preset', preset: preset.id })}"></span>
        <strong>${escapeHtml(localeLabel(preset.label))}</strong>
      </label>`).join('')}
    <label class="chat-theme-swatch ${choice === 'gradient' ? 'active' : ''}">
      <input type="radio" name="${inputName}" value="gradient" ${choice === 'gradient' ? 'checked' : ''} />
      <span class="chat-theme-art" style="background:linear-gradient(135deg, #6d28d9, #0ea5e9)"></span>
      <strong>${currentLang() === 'ru' ? 'Градиент' : 'Gradient'}</strong>
    </label>
    ${allowImage ? `<label class="chat-theme-swatch ${choice === 'image' ? 'active' : ''}">
      <input type="radio" name="${inputName}" value="image" ${choice === 'image' ? 'checked' : ''} />
      <span class="chat-theme-art" style="background:linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.03)), radial-gradient(circle at 30% 30%, rgba(255,255,255,.18), transparent 26%), #101114"></span>
      <strong>${currentLang() === 'ru' ? 'Свое фото' : 'Own image'}</strong>
    </label>` : ''}
  </div>`;
}
function currentThemePref() {
  return state.me?.user?.themePreference || localStorage.getItem('jb_theme') || 'dark';
}
function t(key) {
  return translations[currentLang()]?.[key] || translations.en[key] || key;
}
function currentUser() {
  return state.me?.user || state.bootstrap?.session || null;
}
function isGuestSession() {
  if (state.guest) return true;
  return currentUser()?.roleInternal === 'guest';
}
function applyCustomAccent(user) {
  const root = document.documentElement;
  const custom = user?.accentCustom;
  const useCustom = user?.accent === 'custom' && custom?.from;
  if (useCustom) {
    const from = custom.from;
    const to = custom.to || from;
    const gradient = custom.gradient !== false;
    root.style.setProperty('--accent', from);
    root.style.setProperty('--accent-2', to);
    root.style.setProperty('--accent-gradient', gradient ? `linear-gradient(135deg, ${from}, ${to})` : from);
    root.style.setProperty('--accent-glow', `${from}33`);
  } else {
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-2');
    root.style.removeProperty('--accent-gradient');
    root.style.removeProperty('--accent-glow');
  }
}

function setDocMeta() {
  document.documentElement.lang = currentLang();
  document.documentElement.dataset.theme = currentTheme();
  // Apply accent color to HTML element for CSS theming
  const u = currentUser();
  if (u?.accent) document.documentElement.dataset.accent = u.accent;
  else document.documentElement.removeAttribute('data-accent');
  applyCustomAccent(u);
  // Apply chat density
  const density = u?.settings?.chatDensity;
  if (density === 'compact') document.documentElement.dataset.density = 'compact';
  else document.documentElement.removeAttribute('data-density');
  // Apply high contrast
  const hc = u?.settings?.highContrast;
  document.documentElement.dataset.highcontrast = hc ? 'true' : 'false';
  // Apply reduced motion
  if (u?.settings?.reducedMotion) document.documentElement.style.setProperty('--motion', 'none');
  else document.documentElement.style.removeProperty('--motion');
  document.title = state.route.name === 'home' ? 'justbreath.life' : `justbreath.life — ${state.route.name}`;
}

function storageKey(name) {
  const user = currentUser();
  return user ? `jb:${user.id}:${name}` : `jb:guest:${name}`;
}

function loadSavedAccounts() {
  try {
    const raw = localStorage.getItem('jb_saved_accounts');
    const list = raw ? JSON.parse(raw) : [];
    // deduplicate by id, keep most recent
    const seen = new Set();
    return list.filter(a => {
      if (!a?.id || !a?.sessionToken) return false;
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    }).slice(0, 8);
  } catch {
    return [];
  }
}
function persistSavedAccounts() {
  localStorage.setItem('jb_saved_accounts', JSON.stringify(state.savedAccounts.slice(0, 8)));
}
function saveAccountSession(user, sessionToken) {
  if (!sessionToken || !user) return;
  const next = {
    id: user.id,
    handle: user.handle,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    avatarText: user.avatarText,
    sessionToken
  };
  state.savedAccounts = [next, ...state.savedAccounts.filter((item) => item.id !== next.id)].slice(0, 8);
  persistSavedAccounts();
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error || 'Request failed.';
    const error = new Error(message);
    error.status = response.status;
    Object.assign(error, data || {});
    throw error;
  }
  return data;
}

function navigate(path) {
  if (location.pathname === path) return;
  rememberProfileScroll();
  history.pushState({}, '', path);
  state.currentPath = location.pathname;
  state.route = parseRoute(location.pathname);
  queueWindowScroll(state.currentPath, state.route);
  routeLoad();
  render();
}
window.addEventListener('popstate', () => {
  rememberProfileScroll();
  state.currentPath = location.pathname;
  state.route = parseRoute(location.pathname);
  queueWindowScroll(state.currentPath, state.route);
  routeLoad();
  render();
});

function toast(message, tone = 'info') {
  const item = { id: Math.random().toString(36).slice(2), message, tone };
  state.toasts = [...state.toasts, item].slice(-4);
  render();
  setTimeout(() => {
    state.toasts = state.toasts.filter((entry) => entry.id !== item.id);
    render();
  }, 3400);
}

function initials(user) {
  return user?.avatarText || (user?.displayName || user?.handle || '?').slice(0, 2).toUpperCase();
}
function badgePills(user) {
  const badges = user?.badges?.length ? user.badges : ['USR'];
  return badges.map((badge) => `<span class="badge-pill badge-${badge.toLowerCase()}">${badge}</span>`).join('');
}
function isUserOnline(user) {
  if (!user?.lastSeenAt) return false;
  if (Date.now() - new Date(user.lastSeenAt).getTime() >= 3 * 60 * 1000) return false;
  const me = currentUser();
  if (!me) return false;
  if (Number(me.id) === Number(user.id)) return true;
  const friends = state.me?.friends || state.chat?.bootstrap?.segments?.friends || [];
  const friendHandles = new Set(
    friends
      .map((f) => (f?.handleCanonical || f?.handle || '').toString().toLowerCase())
      .filter(Boolean)
  );
  const handle = (user.handleCanonical || user.handle || '').toString().toLowerCase();
  return friendHandles.has(handle);
}

function avatar(user, size = 'md', extra = '') {
  if (!user) return `<span class="avatar avatar-${size} ${extra}">?</span>`;
  const online = isUserOnline(user);
  return `<span class="avatar-wrap ${online ? 'online' : ''}"><span class="avatar avatar-${size} ${extra}" ${user.handle ? `data-action="open-profile" data-handle="${user.handleCanonical || user.handle.toLowerCase()}"` : ''}>${user.avatarUrl ? `<img src="${user.avatarUrl}" alt="${user.displayName || user.handle}" />` : `<strong>${initials(user)}</strong>`}</span>${online ? '<span class="online-dot"></span>' : ''}</span>`;
}
function roomAvatar(room, size = 'md') {
  const label = room?.avatarText || room?.title?.slice(0, 2)?.toUpperCase() || '??';
  const body = room?.avatarUrl ? `<img src="${room.avatarUrl}" alt="${room.title}" />` : `<strong>${label}</strong>`;
  return `<span class="avatar avatar-${size} room-avatar room-surface-${room?.surface || 'group'}">${body}</span>`;
}
function formatDate(iso, style = 'short') {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  if (style === 'time') return date.toLocaleTimeString(currentLang(), { hour: '2-digit', minute: '2-digit' });
  if (style === 'full') return date.toLocaleString(currentLang(), { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const diff = Date.now() - date.getTime();
  if (diff < 55000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return date.toLocaleTimeString(currentLang(), { hour: '2-digit', minute: '2-digit' });
  return date.toLocaleString(currentLang(), { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const DECOR_ICON_MAP = {
  '🚀': 'rocket',
  '⚡': 'bolt',
  '📢': 'megaphone',
  '🌐': 'site',
  '📁': 'project',
  '🏢': 'grid',
  '📊': 'chart',
  '📧': 'mail',
  '✅': 'verified',
  '🤖': 'bot',
  '🎭': 'sticker',
  '🎬': 'film',
  '🔧': 'wrench',
  '😊': 'smile',
  '🎤': 'mic',
  '👻': 'user',
  '⚠': 'alert',
  '⚠️': 'alert',
  '📌': 'pin'
};

function resolveIconMarkup(value, fallback = 'sparkles') {
  const raw = String(value || '').trim();
  if (raw.includes('<svg')) return raw;
  const key = raw && icons[raw] ? raw : (DECOR_ICON_MAP[raw] || fallback);
  return icons[key] || icons[fallback] || '';
}

function iconBadge(value, tone = 'neutral', extra = '') {
  return `<span class="icon-badge icon-badge-${tone} ${extra}">${resolveIconMarkup(value)}</span>`;
}

function metricIcon(label) {
  const map = {
    Members: 'users',
    Projects: 'project',
    Sites: 'site',
    Workspaces: 'grid'
  };
  return `<span class="metric-icon">${resolveIconMarkup(map[label] || 'chart')}</span>`;
}

function adFallbackIcon(slot = {}) {
  if (slot.id === 'jb-hosting') return 'rocket';
  if (slot.id === 'jb-upgrade') return 'bolt';
  return slot.type === 'banner' ? 'megaphone' : 'sparkles';
}

function renderAdVisual(slot = {}, variant = 'banner') {
  if (slot.logo) return `<img src="${escapeHtml(slot.logo)}" alt="${escapeHtml(slot.title || 'Sponsored')}" />`;
  const className = variant === 'admin' ? 'ad-admin-icon' : (variant === 'banner' ? 'ad-banner-icon' : 'ad-card-icon');
  return `<span class="${className}">${resolveIconMarkup(slot.icon || adFallbackIcon(slot), adFallbackIcon(slot))}</span>`;
}

function statusMeta(status) {
  return {
    active: { label: 'Online', short: 'Online', tone: 'active' },
    away: { label: 'Away', short: 'Away', tone: 'away' },
    dnd: { label: 'Do not disturb', short: 'Busy', tone: 'dnd' },
    offline: { label: 'Invisible', short: 'Hidden', tone: 'offline' }
  }[status] || { label: 'Online', short: 'Online', tone: 'active' };
}

function renderStatusPill(status, compact = false) {
  const meta = statusMeta(status);
  return `<span class="status-pill status-pill-${meta.tone}"><span class="status-pill-dot"></span><span>${compact ? meta.short : meta.label}</span></span>`;
}


// Markdown → HTML renderer (no deps)
function renderMarkdown(raw) {
  if (!raw) return '';
  let t = escapeHtml(raw);
  // fenced code
  t = t.replace(/```([a-z]*)\n?([\s\S]*?)```/g, function(_, lang, code) {
    return '<pre class="code-block' + (lang ? ' lang-'+lang : '') + '"><code>' + code.trim() + '</code></pre>';
  });
  // inline code
  t = t.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');
  // bold
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // italic
  t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // strikethrough
  t = t.replace(/~~(.+?)~~/g, '<del>$1</del>');
  // links
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a class="md-link" href="$2" target="_blank" rel="noreferrer noopener">$1</a>');
  // blockquote
  t = t.replace(/^&gt; (.+)$/gm, '<blockquote class="md-quote">$1</blockquote>');
  // list
  t = t.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
  // newlines
  t = t.replace(/\n/g, '<br>');
  return t;
}

function searchControl(scope, placeholder) {
  const model = scope === 'feed' ? state.feed : (scope === 'chat' ? { search: state.chat.search || '' } : state.discover);
  const showSort = scope !== 'chat';
  const isOpen = state.modal?.type === 'sort-menu' && state.modal.scope === scope;
  return `
    <div class="search-control">
      ${icons.search}
      <input type="search" data-input="${scope}-search" placeholder="${placeholder || t('search')}" value="${escapeHtml(model.search || '')}" />
      ${showSort ? `<button class="icon-button compact ghost-button" data-action="toggle-sort-menu" data-scope="${scope}" title="${t('sort')}">${icons.sort}</button>` : ''}
      ${isOpen ? renderSortMenu(scope) : ''}
    </div>`;
}
function renderSortMenu(scope) {
  if (!state.modal || state.modal.type !== 'sort-menu' || state.modal.scope !== scope) return '';
  const model = scope === 'feed' ? state.feed : state.discover;
  return `<div class="sort-menu-popover">
    ${['relevance','popularity','date'].map((key) => `<button class="sort-option ${model.sort === key ? 'active' : ''}" data-action="set-sort" data-scope="${scope}" data-value="${key}">${t(key)}</button>`).join('')}
  </div>`;
}

async function loadMail(folder) {
  if (!currentUser() || isGuestSession()) return;
  const f = folder || state.mail.folder || 'inbox';
  const data = await api(`/api/mail?folder=${f}`);
  state.mail[f === 'inbox' ? 'inbox' : 'sent'] = data.items || [];
  state.mail.unread = data.unread || 0;
  state.mail.folder = f;
}

async function loadBootstrap() {
  const payload = await api('/api/bootstrap');
  state.bootstrap = payload;
  state.meta = payload.meta;
  state.home = payload.home;
  state.me = payload.me;
  state.meLoaded = Boolean(payload.me);
  if (state.me?.user) {
    localStorage.setItem('jb_lang', state.me.user.languagePreference || 'en');
    localStorage.setItem('jb_theme', state.me.user.themePreference || 'dark');
    await ensureE2EEKeys();
  }
  // Load server-defined ad slots
  try {
    const adsPayload = await api('/api/ads');
    if (adsPayload?.ads?.length) state.ads = adsPayload.ads;
  } catch {}

  // Check maintenance mode
  try {
    const m = await api('/api/maintenance');
    state.maintenance = Boolean(m?.maintenance);
  } catch {}
  // Load mail unread count
  if (currentUser() && currentUser().roleInternal !== 'guest') {
    api('/api/mail/unread').then(r => { state.mail.unread = r.count || 0; }).catch(() => {});
  }
  syncRealtimeTransport();
}

async function loadMe(force = false) {
  if (state.meLoaded && !force) return;
  if (!currentUser()) return;
  state.me = await api('/api/me');
  state.meLoaded = true;
  await ensureE2EEKeys();
}

async function loadFeed() {
  const kind = state.feed.tab === 'devlog' ? 'devlog' : 'quick';
  const payload = await api(`/api/public/feed?kind=${encodeURIComponent(kind)}&q=${encodeURIComponent(state.feed.search || '')}&sort=${encodeURIComponent(state.feed.sort || 'date')}`);
  state.feed.items = payload.items || [];
}

async function loadDiscover() {
  const payload = await api(`/api/search/all?q=${encodeURIComponent(state.discover.search || '')}&sort=${encodeURIComponent(state.discover.sort || 'relevance')}`);
  state.discover = { ...state.discover, ...payload };
}

async function loadProfile(handle) {
  const payload = await api(`/api/public/profile/${encodeURIComponent(handle)}`);
  state.profile = payload;
}

async function loadProject(slug) {
  const payload = await api(`/api/public/projects/${encodeURIComponent(slug)}`);
  state.project = payload;
}

async function loadChatBootstrap() {
  if (!currentUser() || isGuestSession()) return;
  const payload = await api('/api/chat/bootstrap');
  state.chat.bootstrap = payload;
  if (state.route.slug) {
    state.chat.selectedSlug = state.route.slug;
  } else if (!state.chat.selectedSlug) {
    state.chat.selectedSlug = state.route.slug || payload.selectedRoom?.slug || payload.segments.personal?.[0]?.slug || payload.segments.work?.[0]?.slug || payload.segments.groups?.[0]?.slug || null;
  }
  if (state.chat.selectedSlug) await loadChatRoom(state.chat.selectedSlug);
}

async function loadSitesMine() {
  if (!currentUser() || isGuestSession()) return;
  const own = await api('/api/me/sites');
  state.sites.mine = own.items || [];
  const pub = await api('/api/public/sites?sort=popularity');
  state.sites.public = pub.items || [];
}

// FIX: scrollToBottom=true for user-initiated navigation, false for background polling
async function loadChatRoom(slug, scrollToBottom = true) {
  if (!slug) return;
  const payload = await api(`/api/chat/rooms/${encodeURIComponent(slug)}/messages`);
  state.chat.selectedSlug = slug;
  state.chat.room = payload.room;
  state.chat.tasks = payload.tasks || [];
  state.chat.previewOnly = Boolean(payload.previewOnly);
  state.readReceipts[slug] = payload.readReceipts || {};
  state.chat.messages = await Promise.all((payload.messages || []).map(async (message) => {
    const normalized = normalizeMessageForViewer(message);
    return { ...normalized, displayBody: await decryptMessage(payload.room, normalized) };
  }));
  if (state.memberListRoom !== slug) state.memberList = [];
  state.chat.forceScrollBottom = Boolean(scrollToBottom);
  if (scrollToBottom && window.matchMedia('(max-width: 900px)').matches) state.chat.mobileView = 'room';
  if (state.route.name !== 'messages' || state.route.slug !== slug) {
    history.replaceState({}, '', `/messages/${slug}`);
    state.currentPath = location.pathname;
    state.route = parseRoute(location.pathname);
  }
  render();
  if (scrollToBottom) {
    scrollChatToBottom(true);
    // Mark as read
    const lastMsg = state.chat.messages[state.chat.messages.length - 1];
    if (lastMsg) emitReadReceipt(slug, lastMsg.id);
  }
}

function compressImageFile(file, maxWidth = 1440, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const ratio = Math.min(1, maxWidth / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * ratio));
        const height = Math.max(1, Math.round(image.height * ratio));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl, width, height, name: file.name });
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function ensureE2EEKeys() {
  if (!window.crypto?.subtle || !currentUser()) return;
  const key = `jb_e2ee_keypair_${currentUser().id}`;
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(key) || 'null');
  } catch {}
  state.crypto = saved || null;
}
function bufToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
function base64ToArrayBuffer(value) {
  const binary = atob(value);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) array[i] = binary.charCodeAt(i);
  return array.buffer;
}
async function deriveSharedKey(otherPublicJwk) {
  if (!state.crypto?.privateKeyJwk || !otherPublicJwk) throw new Error('E2EE unavailable');
  const privateKey = await crypto.subtle.importKey('jwk', state.crypto.privateKeyJwk, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveKey']);
  const publicKey = await crypto.subtle.importKey('jwk', otherPublicJwk, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  return crypto.subtle.deriveKey({ name: 'ECDH', public: publicKey }, privateKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function encryptTextForRoom(room, text) {
  return { encrypted: false, body: text };
}
async function decryptMessage(room, message) {
  if (!message.encrypted) return message.body || '';
  try {
    const otherKey = room?.otherUser?.publicKeyJwk;
    if (!otherKey || !state.crypto?.privateKeyJwk) return '— старое зашифрованное сообщение —';
    const key = await deriveSharedKey(otherKey);
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(base64ToArrayBuffer(message.iv)) }, key, base64ToArrayBuffer(message.ciphertext));
    return new TextDecoder().decode(plaintext);
  } catch {
    return '— старое зашифрованное сообщение —';
  }
}

async function loadAdminData() {
  if (currentUser()?.roleInternal !== 'owner') return;
  const [stats, users, ads, logs] = await Promise.all([
    api('/api/admin/stats').catch(() => null),
    api('/api/admin/users').catch(() => ({ users: [] })),
    api('/api/admin/ads').catch(() => ({ ads: [] })),
    api('/api/admin/logs').catch(() => ({ logs: [] }))
  ]);
  state.adminStats = stats;
  state.adminUsers = users.users || [];
  state.adminLogs = logs.logs || [];
  if (ads?.ads?.length) state.ads = ads.ads;
}
async function loadAdminUsers(q = '') {
  const data = await api(`/api/admin/users${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  state.adminUsers = data.users || [];
}

function renderDevelopersPage() {
  const section = state.route.section || 'overview';
  const sections = [
    ['overview', 'Overview'],
    ['auth', 'Authentication'],
    ['api', 'REST API'],
    ['bots', 'Bots & tokens'],
    ['webhooks', 'Webhooks & SSE'],
    ['telegram', 'Telegram bridge'],
    ['rules', 'Rules & limits']
  ];
  const panel = devDocsSections[section] ? devDocsSections[section]() : devDocsSections.overview();
  return `
    <section class="section-shell dev-docs-shell">
      <aside class="dev-docs-nav">
        <div class="dev-docs-head"><span class="eyebrow">developers</span><h1>API &amp; docs</h1><p class="muted">Everything you need to build on justbreath.life.</p></div>
        <nav class="dev-docs-list">
          ${sections.map(([id, label]) => `<button class="dev-docs-link ${section === id ? 'active' : ''}" data-action="nav" data-path="/developers/${id}">${label}</button>`).join('')}
        </nav>
      </aside>
      <div class="dev-docs-body">${panel}</div>
    </section>`;
}
const devDocsSections = {
  overview: () => `
    <h2>Overview</h2>
    <p>justbreath.life exposes a small REST API for reading public data (profiles, posts, sites) and, with a bot token, posting into chat rooms you have access to.</p>
    <ul>
      <li><strong>Base URL:</strong> <code>https://justbreath.life</code></li>
      <li><strong>Content type:</strong> <code>application/json</code></li>
      <li><strong>Rate limits:</strong> auth endpoints are strict (5/min), general API is 120/min per IP.</li>
      <li><strong>Real-time:</strong> Server-Sent Events at <code>GET /api/events</code> (session-authenticated).</li>
    </ul>
    <p class="muted">This is an evolving surface — endpoints marked <em>preview</em> may change. We never promise unlimited anything; every tier has concrete limits listed in <a data-action="nav" data-path="/developers/rules">Rules &amp; limits</a>.</p>`,
  auth: () => `
    <h2>Authentication</h2>
    <p>Two methods are supported:</p>
    <h3>Session cookie</h3>
    <p>Browser users authenticate with the <code>jb_sid</code> cookie issued at sign-in. You don't need to do anything special from the client — credentials are cookie-based.</p>
    <h3>Bot token</h3>
    <p>Create a bot token in <a data-action="nav" data-path="/settings">Settings → API Tokens</a>. Tokens are shown once — store them in a secret manager.</p>
    <pre><code>curl -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"body":"Hello from my bot"}' \\
  https://justbreath.life/api/bot/rooms/&lt;room-slug&gt;/messages</code></pre>`,
  api: () => `
    <h2>REST API</h2>
    <h3>Public reads</h3>
    <ul>
      <li><code>GET /api/public/profile/:handle</code> — public profile + posts</li>
      <li><code>GET /api/public/posts</code> — recent public posts</li>
      <li><code>GET /api/public/projects/:slug</code> — project detail</li>
      <li><code>GET /api/public/sites</code> — listed creator sites</li>
    </ul>
    <h3>Authenticated reads</h3>
    <ul>
      <li><code>GET /api/me</code> — the current user's full payload</li>
      <li><code>GET /api/chat/rooms</code> — rooms you can see</li>
      <li><code>GET /api/chat/rooms/:slug/messages</code> — room history</li>
    </ul>
    <h3>Writes</h3>
    <ul>
      <li><code>POST /api/posts</code> — create a post</li>
      <li><code>POST /api/chat/rooms/:slug/messages</code> — send a message (attachments up to 10 images)</li>
      <li><code>POST /api/me/sites/upload</code> — single-file HTML site</li>
      <li><code>POST /api/me/sites/upload-archive</code> — archive site (≤ 5 MB, supports <code>.zip</code>, <code>.tar</code>, <code>.tar.gz</code>, <code>.tgz</code>; must contain <code>index.html</code>)</li>
    </ul>`,
  bots: () => `
    <h2>Bots &amp; tokens</h2>
    <p>A bot is a regular account whose sessions are replaced by long-lived tokens. To create one:</p>
    <ol>
      <li>Sign in as the account you want to automate.</li>
      <li>Open <a data-action="nav" data-path="/settings">Settings → API Tokens</a>.</li>
      <li>Name the token and copy the value when it's shown.</li>
    </ol>
    <h3>Example: send a message</h3>
    <pre><code>POST /api/bot/rooms/general/messages
Authorization: Bearer jb_xxx...
Content-Type: application/json

{ "body": "Hello from my bot" }</code></pre>
    <p class="muted">Bot tokens inherit the owner's room access. Revoking a token invalidates it immediately.</p>`,
  webhooks: () => `
    <h2>Webhooks &amp; real-time</h2>
    <p>We don't outgoing webhooks yet. To receive real-time updates, open an SSE stream:</p>
    <pre><code>const es = new EventSource('/api/events', { withCredentials: true });
es.addEventListener('new_message', (e) => console.log(JSON.parse(e.data)));
es.addEventListener('typing', (e) => console.log(JSON.parse(e.data)));
es.addEventListener('notification', (e) => console.log(JSON.parse(e.data)));</code></pre>
    <p class="muted">Events include <code>new_message</code>, <code>message_updated</code>, <code>message_deleted</code>, <code>typing</code>, <code>reaction</code>, <code>notification</code>, <code>presence</code>.</p>`,
  telegram: () => `
    <h2>Telegram bridge <span class="preview-tag">preview</span></h2>
    <p>The Telegram bridge is in progress. It lets you reach a Telegram user directly from a justbreath chat room.</p>
    <h3>Setup (self-hosted instance)</h3>
    <ol>
      <li>Talk to <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> on Telegram and run <code>/newbot</code>. Save the <code>HTTP API token</code> and bot username.</li>
      <li>In your <code>.env</code>, set <code>TELEGRAM_BOT_TOKEN</code> and <code>TELEGRAM_BOT_USERNAME</code>.</li>
      <li>Restart the server. The <code>/api/integrations/telegram/*</code> endpoints activate.</li>
      <li>Point Telegram's webhook at <code>https://your-host/api/integrations/telegram/webhook</code>. Incoming messages land in a relay room owned by the initiator.</li>
    </ol>
    <p class="muted">Telegram users must message your bot first — you can't cold-DM arbitrary TG accounts. After they do, they get a deep link back to the justbreath room.</p>`,
  rules: () => `
    <h2>Rules &amp; limits</h2>
    <h3>Per-tier quotas</h3>
    <table class="dev-docs-table">
      <thead><tr><th>Resource</th><th>Free</th><th>Plus</th><th>Max</th></tr></thead>
      <tbody>
        <tr><td>Creator sites</td><td>2</td><td>6</td><td>25</td></tr>
        <tr><td>Rooms you own</td><td>10</td><td>40</td><td>150</td></tr>
        <tr><td>File per upload</td><td>8 MB</td><td>8 MB</td><td>8 MB</td></tr>
        <tr><td>ZIP site archive</td><td>5 MB</td><td>5 MB</td><td>5 MB</td></tr>
        <tr><td>Bot tokens</td><td>2</td><td>5</td><td>20</td></tr>
      </tbody>
    </table>
    <p class="muted">These are concrete numbers — no "unlimited" tier. If you need more than the Max tier, contact us.</p>
    <h3>Content rules</h3>
    <ul>
      <li>No malware, phishing, or unauthorized data collection.</li>
      <li>No sexual content involving minors; no doxxing; no coordinated harassment.</li>
      <li>Respect copyright — upload only content you own or have the rights to.</li>
      <li>Keep automation polite: bots that spam get tokens revoked.</li>
    </ul>`
};

// ── Legal: Privacy / Terms / Contact / About ─────────────────────────────────
const privacySections = {
  overview: () => `
    <h2>Privacy Policy</h2>
    <p class="muted">Effective date: 19 April 2026 · Last updated: 19 April 2026</p>
    <p>This Privacy Policy explains what justbreath.life (operated by the justbreath team, hereafter "justbreath", "we", "us") collects when you use the service, why we collect it, who we share it with, and what rights you have. If something here is unclear, write to <a href="mailto:hello@justbreath.life">hello@justbreath.life</a>.</p>
    <p>Key points at a glance:</p>
    <ul>
      <li>We collect only what we need to run the service: account data, content you publish, basic logs, anonymous telemetry.</li>
      <li>We do not sell your personal data.</li>
      <li>We show ads via Google AdSense. AdSense uses cookies and you can opt out of personalised ads at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ad Settings</a>.</li>
      <li>We store data on our own servers. Automatic backups run every 30 minutes and keep the last 48 snapshots (≈24 hours).</li>
      <li>You can export or delete your account at any time in <a data-action="nav" data-path="/settings">Settings</a>.</li>
    </ul>
    <p>The sections on the left cover each topic in detail.</p>`,
  data: () => `
    <h2>Data we collect</h2>
    <p>We group data into four categories.</p>
    <h3>1. Account data</h3>
    <ul>
      <li><strong>Email address</strong> — to sign in, verify identity and recover access.</li>
      <li><strong>Handle and display name</strong> — visible publicly on your profile and your posts.</li>
      <li><strong>Password hash</strong> — stored with bcrypt (cost 12). We never see your plain-text password.</li>
      <li><strong>OAuth subject IDs</strong> — if you sign in with Google or Discord, we store the provider's stable <code>sub</code> to match future logins. We do not store OAuth access tokens after the initial callback.</li>
    </ul>
    <h3>2. Content you publish</h3>
    <ul>
      <li>Posts, comments, reactions, messages, files, creator-site HTML/ZIP uploads, avatars, banners.</li>
      <li>Anything you mark <em>public</em> is visible to anyone on the internet; anything <em>unlisted</em> is reachable only by direct link; <em>private</em> stays accessible only to you and invitees.</li>
    </ul>
    <h3>3. Technical data</h3>
    <ul>
      <li>IP address (stored only for rate-limiting and abuse prevention; not attached to your public profile).</li>
      <li>User-Agent string (to detect broken clients).</li>
      <li>Session cookie <code>jb_sid</code> (30-day lifetime, HttpOnly, SameSite=Lax).</li>
      <li>Server logs (request method, path, status, duration — 30 day rolling retention).</li>
    </ul>
    <h3>4. Telemetry (anonymous)</h3>
    <p>We collect anonymous usage metrics to improve the product: pageviews, client-side JavaScript errors, and <a href="https://web.dev/vitals/" target="_blank" rel="noopener">Core Web Vitals</a> (LCP, CLS, INP, FCP, TTFB). These events carry a short-lived anonymous session ID, the route you visited, and timing metrics — <strong>never the contents of your posts, messages, or form fields</strong>. Telemetry is stored on our own servers, not sent to any third-party analytics provider.</p>`,
  cookies: () => `
    <h2>Cookies &amp; local storage</h2>
    <p>We use the minimum set of cookies required for the service to work.</p>
    <h3>Essential</h3>
    <ul>
      <li><code>jb_sid</code> — session cookie. HttpOnly, SameSite=Lax. 30 days. Required for signed-in users.</li>
      <li><code>jb_google_oauth</code>, <code>jb_discord_oauth</code> — short-lived (10 min) OAuth state cookies used only during sign-in.</li>
    </ul>
    <h3>Local storage (your browser, not sent to us)</h3>
    <ul>
      <li><code>jb_lang</code> — your chosen interface language.</li>
      <li><code>jb_guest_mode</code> — flag for read-only guest browsing.</li>
      <li>Saved-account list for quick account switching on the same device.</li>
    </ul>
    <h3>Third-party</h3>
    <p>Google AdSense and Google-related ad services set their own cookies when ads are shown. You can manage these at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ad Settings</a> and <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">How Google uses cookies</a>.</p>`,
  sharing: () => `
    <h2>Who we share data with</h2>
    <p>We share data with the following categories of third parties, and only to the extent required for them to provide their service.</p>
    <ul>
      <li><strong>Google AdSense / Google AdX</strong> — serves ads on the platform. Receives cookies, IP, page URL, and standard ad-context signals.</li>
      <li><strong>Google OAuth</strong> — when you choose "Sign in with Google". We receive your email, name, profile picture, and provider <code>sub</code>.</li>
      <li><strong>Discord OAuth</strong> — when you choose "Sign in with Discord". Same data shape as Google.</li>
      <li><strong>SMTP relay</strong> — outgoing transactional email (verification codes, password resets, notifications). We use the SMTP server configured in our <code>.env</code>; if none is configured, codes are printed to server logs only (dev mode).</li>
      <li><strong>Cloudflare</strong> — edge cache and DNS; receives request metadata but no application data.</li>
    </ul>
    <p>We do not sell data. We do not share message contents, file contents, or private posts with third parties.</p>`,
  retention: () => `
    <h2>Data retention &amp; backups</h2>
    <ul>
      <li><strong>Live data</strong> — kept as long as your account exists.</li>
      <li><strong>Backups</strong> — a full snapshot of the store is written every 30 minutes; we keep the last 48 (≈24 hours). Backups sit on the same server unless you run the service yourself with <code>BACKUPS_DIR</code> pointed elsewhere.</li>
      <li><strong>Logs</strong> — request logs rotate after 30 days.</li>
      <li><strong>Telemetry</strong> — anonymous telemetry is kept in daily NDJSON files for 180 days.</li>
      <li><strong>Deleted accounts</strong> — immediately soft-deleted from live data; fully purged from the next backup rotation (&le; 24 h).</li>
    </ul>`,
  rights: () => `
    <h2>Your rights (GDPR, CCPA, UK GDPR)</h2>
    <p>If you live in the EU/EEA, the UK, California, or a jurisdiction with similar law, you have the following rights:</p>
    <ul>
      <li><strong>Access</strong> — request a copy of your data. Available as a one-click export in <a data-action="nav" data-path="/settings">Settings → Export</a>.</li>
      <li><strong>Rectification</strong> — edit your profile, posts and settings at any time.</li>
      <li><strong>Erasure</strong> — delete your account in <a data-action="nav" data-path="/settings">Settings → Account</a>. Irreversible after the next backup rotation.</li>
      <li><strong>Restriction &amp; objection</strong> — write to us to pause processing.</li>
      <li><strong>Portability</strong> — the export format is plain JSON.</li>
      <li><strong>Complaint</strong> — you may complain to your local data-protection authority.</li>
    </ul>
    <p>To exercise any right, email <a href="mailto:hello@justbreath.life">hello@justbreath.life</a>. We reply within 30 days.</p>`,
  security: () => `
    <h2>Security</h2>
    <ul>
      <li>Transport encrypted with TLS (HTTPS) end-to-end via Cloudflare.</li>
      <li>Passwords hashed with bcrypt (cost factor 12). We never store plain passwords.</li>
      <li>Sessions bound to HttpOnly cookies with SameSite=Lax.</li>
      <li>Rate limits on authentication endpoints (5/min/IP) and general API (120/min/IP).</li>
      <li>Content Security Policy restricts which third-party scripts can run.</li>
      <li>Uploaded creator-site HTML is sandboxed inside an <code>&lt;iframe sandbox&gt;</code>.</li>
    </ul>
    <p>No system is perfectly secure. If you find a vulnerability, please report responsibly to <a href="mailto:hello@justbreath.life">hello@justbreath.life</a>. We acknowledge reports within 72 hours.</p>`,
  children: () => `
    <h2>Minors</h2>
    <p>The service is not directed at children under 13. If you are a parent or guardian and believe a child has given us personal data, email <a href="mailto:hello@justbreath.life">hello@justbreath.life</a> and we will delete the account.</p>
    <p>Between 13 and the age of digital consent in your jurisdiction (14–16 in most EU countries), you may only use the service with the verifiable consent of a parent or legal guardian.</p>`,
  changes: () => `
    <h2>Changes to this policy</h2>
    <p>If we materially change this policy, we will notify registered users by email and show a banner on the site for at least 14 days before the change takes effect. The "Last updated" date at the top always reflects the current version.</p>
    <p>You can always read the current text on this page, download it as a plain Markdown document via <a href="/PRIVACY.md" target="_blank" rel="noopener">PRIVACY.md</a>, and review the full history on our GitHub if the repository is public.</p>`,
  contact: () => `
    <h2>Contact</h2>
    <p>Data controller: <strong>justbreath</strong></p>
    <p>Email: <a href="mailto:hello@justbreath.life">hello@justbreath.life</a><br/>
       Owner profile: <a data-action="nav" data-path="/@justbreath">@justbreath</a></p>
    <p>For legal / DMCA / GDPR subject-access requests, please mark the subject line accordingly.</p>`
};

function renderPrivacyPage() {
  const section = state.route.section || 'overview';
  const sections = [
    ['overview', 'Overview'],
    ['data', 'Data we collect'],
    ['cookies', 'Cookies'],
    ['sharing', 'Sharing'],
    ['retention', 'Retention & backups'],
    ['rights', 'Your rights'],
    ['security', 'Security'],
    ['children', 'Minors'],
    ['changes', 'Changes'],
    ['contact', 'Contact']
  ];
  const panel = privacySections[section] ? privacySections[section]() : privacySections.overview();
  return `
    <section class="section-shell dev-docs-shell">
      <aside class="dev-docs-nav">
        <div class="dev-docs-head"><span class="eyebrow">legal</span><h1>Privacy Policy</h1><p class="muted">How we handle your data. No dark patterns.</p><a class="soft-button" href="/PRIVACY.md" download style="margin-top:8px">Download .md</a></div>
        <nav class="dev-docs-list">
          ${sections.map(([id, label]) => `<button class="dev-docs-link ${section === id ? 'active' : ''}" data-action="nav" data-path="/privacy/${id}">${label}</button>`).join('')}
        </nav>
      </aside>
      <div class="dev-docs-body">${panel}</div>
    </section>`;
}

const termsSections = {
  overview: () => `
    <h2>Terms of Service</h2>
    <p class="muted">Effective date: 19 April 2026 · Last updated: 19 April 2026</p>
    <p>Welcome to justbreath.life. By creating an account, signing in, or using the service as a guest you agree to these Terms. If you don't agree, please don't use the service.</p>`,
  account: () => `
    <h2>Your account</h2>
    <ul>
      <li>You must be at least 13 years old to register (see Privacy — Minors for older thresholds required by your jurisdiction).</li>
      <li>You are responsible for keeping your credentials secret. All actions under your account are considered yours.</li>
      <li>You may hold multiple accounts on the same device via the account switcher; each is treated as a separate identity.</li>
      <li>Handles are unique and case-insensitive. We may reclaim handles impersonating real people, trademarks, or reserved brand names.</li>
    </ul>`,
  content: () => `
    <h2>Your content</h2>
    <p>You keep ownership of everything you publish. By publishing you grant us a worldwide, royalty-free license to host, serve, and display your content as necessary to operate the service. Public content may be mirrored by third-party search engines; unlisted content is not listed in search but is still accessible by direct link.</p>
    <p>You must not publish content that is illegal, infringes rights, contains malware, facilitates harassment, sexually exploits minors, or otherwise violates our <a data-action="nav" data-path="/terms/prohibited">Prohibited uses</a> policy.</p>`,
  prohibited: () => `
    <h2>Prohibited uses</h2>
    <ul>
      <li>Illegal content or activity under applicable law.</li>
      <li>Sexual content involving minors; non-consensual intimate imagery.</li>
      <li>Targeted harassment, doxxing, threats of violence.</li>
      <li>Malware, phishing, cryptominers, unauthorised data collection, trackers beyond disclosed AdSense.</li>
      <li>Bulk automation that degrades the service or ignores rate limits.</li>
      <li>Impersonation of real people, organisations, or our own brand.</li>
      <li>Copyright infringement.</li>
    </ul>
    <p>Violations can lead to content removal, account suspension, or a permanent ban at our discretion.</p>`,
  payments: () => `
    <h2>Paid tiers</h2>
    <p>Paid subscriptions unlock quotas (extra site spaces, extra storage, priority review). Billing is monthly, quarterly, semi-annual, or annual depending on the plan. Refunds are pro-rated within the first 14 days of a billing period.</p>
    <p>We reserve the right to change prices; existing subscriptions run at their current price until renewal.</p>`,
  termination: () => `
    <h2>Termination</h2>
    <p>You may delete your account at any time in <a data-action="nav" data-path="/settings">Settings</a>. We may suspend or terminate an account that violates these Terms or applicable law.</p>
    <p>After termination we retain your data for up to 24 hours in rotating backups, then it is permanently removed.</p>`,
  liability: () => `
    <h2>Disclaimers &amp; liability</h2>
    <p>The service is provided "as is". To the maximum extent permitted by law, we disclaim all implied warranties and limit our aggregate liability to the amounts you paid for the service in the 12 months preceding the claim, or €50 if no payment was made.</p>
    <p>We are not liable for user-generated content, for losses caused by your own failure to keep credentials secure, or for events beyond our reasonable control.</p>`,
  law: () => `
    <h2>Governing law</h2>
    <p>These Terms are governed by the laws of Germany (Bundesrepublik Deutschland). Disputes will be resolved in Berlin courts, unless mandatory consumer-protection law of your residence gives you a better forum.</p>`,
  contact: () => `
    <h2>Contact</h2>
    <p>Email: <a href="mailto:hello@justbreath.life">hello@justbreath.life</a><br/>
       For legal or DMCA notices, please mark the subject line accordingly.</p>`
};

function renderTermsPage() {
  const section = state.route.section || 'overview';
  const sections = [
    ['overview', 'Overview'],
    ['account', 'Your account'],
    ['content', 'Your content'],
    ['prohibited', 'Prohibited uses'],
    ['payments', 'Paid tiers'],
    ['termination', 'Termination'],
    ['liability', 'Liability'],
    ['law', 'Governing law'],
    ['contact', 'Contact']
  ];
  const panel = termsSections[section] ? termsSections[section]() : termsSections.overview();
  return `
    <section class="section-shell dev-docs-shell">
      <aside class="dev-docs-nav">
        <div class="dev-docs-head"><span class="eyebrow">legal</span><h1>Terms of Service</h1><p class="muted">The rules of the platform, in plain language.</p><a class="soft-button" href="/TERMS.md" download style="margin-top:8px">Download .md</a></div>
        <nav class="dev-docs-list">
          ${sections.map(([id, label]) => `<button class="dev-docs-link ${section === id ? 'active' : ''}" data-action="nav" data-path="/terms/${id}">${label}</button>`).join('')}
        </nav>
      </aside>
      <div class="dev-docs-body">${panel}</div>
    </section>`;
}

function renderContactPage() {
  return `
    <section class="section-shell">
      <div class="page-heading-row"><div><span class="eyebrow">contact</span><h1>Get in touch</h1><p class="muted">For support, press, legal or partnership.</p></div></div>
      <div class="dev-docs-body" style="margin-top:24px">
        <h2>Email</h2>
        <ul>
          <li><strong>General:</strong> <a href="mailto:hello@justbreath.life">hello@justbreath.life</a></li>
          <li><strong>Legal / DMCA / Privacy:</strong> same address, subject line <code>[LEGAL]</code> / <code>[DMCA]</code> / <code>[PRIVACY]</code>.</li>
          <li><strong>Security reports:</strong> subject line <code>[SECURITY]</code>. We acknowledge within 72 h.</li>
          <li><strong>Press:</strong> subject line <code>[PRESS]</code>.</li>
        </ul>
        <h2>On the platform</h2>
        <ul>
          <li>Owner profile — <a data-action="nav" data-path="/@justbreath">@justbreath</a></li>
          <li>Ship feedback — open a post in <a data-action="nav" data-path="/feed">Feed</a> with the <code>#feedback</code> tag.</li>
        </ul>
        <h2>Elsewhere</h2>
        <ul>
          <li>GitHub — <a href="https://github.com/justbreath" target="_blank" rel="noopener">github.com/justbreath</a></li>
        </ul>
      </div>
    </section>`;
}

function renderAboutPage() {
  return `
    <section class="section-shell">
      <div class="page-heading-row"><div><span class="eyebrow">about</span><h1>About justbreath</h1><p class="muted">What this is and why it exists.</p></div></div>
      <div class="dev-docs-body" style="margin-top:24px">
        <h2>What</h2>
        <p>justbreath.life is an open creator platform — profiles, creator sites, workspaces, and real-time chat, built without frameworks on a flat-file store. It runs on one Node process and stays readable.</p>
        <h2>Why</h2>
        <p>Most creator tools lock you in. This one stays out of your way: your data is plain JSON, your site is plain HTML, your API is plain REST. You can export everything in one click.</p>
        <h2>Who</h2>
        <p>Built by <a data-action="nav" data-path="/@tcheler">@tcheler</a> and contributors.</p>
        <h2>Where</h2>
        <p>Hosted on our own infrastructure, behind Cloudflare. The code is intentionally small — one Express app, one vanilla-JS client, one CSS file. See <a data-action="nav" data-path="/developers">Developers</a> for how to build on it.</p>
      </div>
    </section>`;
}

// ── Global site footer ───────────────────────────────────────────────────────
function renderSiteFooter() {
  // Hide footer on chat & modal-heavy routes where it would compete with the UI.
  if (['messages', 'mail', 'verify'].includes(state.route.name)) return '';
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-footer-brand">
        <div class="site-footer-logo"><img src="/logo.png" alt="justbreath logo" width="36" height="36" /></div>
        <div>
          <div class="site-footer-wordmark">justbreath<span>.life</span></div>
          <p class="muted" style="margin:4px 0 0;font-size:13px">Open creator platform — profiles, sites, workspaces, chat.</p>
        </div>
      </div>
      <nav class="site-footer-cols" aria-label="Footer">
        <div class="site-footer-col">
          <h4>Product</h4>
          <a data-action="nav" data-path="/">Home</a>
          <a data-action="nav" data-path="/feed">Feed</a>
          <a data-action="nav" data-path="/discover">Discover</a>
          <a data-action="nav" data-path="/sites">Sites</a>
        </div>
        <div class="site-footer-col">
          <h4>Developers</h4>
          <a data-action="nav" data-path="/developers">API &amp; docs</a>
          <a data-action="nav" data-path="/developers/auth">Authentication</a>
          <a data-action="nav" data-path="/developers/api">REST API</a>
          <a data-action="nav" data-path="/developers/webhooks">SSE &amp; events</a>
          <a data-action="nav" data-path="/developers/rules">Rules &amp; limits</a>
        </div>
        <div class="site-footer-col">
          <h4>Legal</h4>
          <a data-action="nav" data-path="/privacy">Privacy Policy</a>
          <a data-action="nav" data-path="/terms">Terms of Service</a>
          <a href="/PRIVACY.md" download>Privacy (.md)</a>
          <a href="/TERMS.md" download>Terms (.md)</a>
          <a href="/TRADEMARK.md" download>Trademark</a>
        </div>
        <div class="site-footer-col">
          <h4>Company</h4>
          <a data-action="nav" data-path="/about">About</a>
          <a data-action="nav" data-path="/contact">Contact</a>
          <a href="mailto:hello@justbreath.life">hello@justbreath.life</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="https://github.com/justbreath" target="_blank" rel="noopener">GitHub</a>
        </div>
      </nav>
    </div>
    <div class="site-footer-bottom">
      <span>© ${year} justbreath.life · All creator content belongs to its authors.</span>
      <span class="muted">Built without frameworks — just Node, Express, vanilla JS.</span>
    </div>
  </footer>`;
}

function renderMailPage() {
  if (!currentUser() || isGuestSession()) return renderGate('Create an account to access internal mail.');
  const folder = state.mail.folder || 'inbox';
  const items  = folder === 'inbox' ? (state.mail.inbox || []) : (state.mail.sent || []);
  const sel    = state.mail.selected;

  return `<section class="section-shell page-heading-row">
    <div><span class="eyebrow">mail</span><h1>Internal Mail</h1><p style="color:var(--text-muted);font-size:13px">Messages between justbreath members.</p></div>
    <div class="page-tools">
      <button class="primary-button" data-action="compose-mail">${icons.plus}<span>Compose</span></button>
    </div>
  </section>
  <section class="section-shell mail-shell">
    <aside class="mail-sidebar">
      <button class="mail-folder-btn ${folder === 'inbox' ? 'active' : ''}" data-action="mail-folder" data-folder="inbox">
        ${icons.bell} Inbox ${state.mail.unread > 0 ? `<span class="nav-badge">${state.mail.unread}</span>` : ''}
      </button>
      <button class="mail-folder-btn ${folder === 'sent' ? 'active' : ''}" data-action="mail-folder" data-folder="sent">
        ${icons.plane} Sent
      </button>
    </aside>
    <div class="mail-list">
      ${items.length ? items.map(m => `
        <article class="mail-row ${!m.readAt && folder === 'inbox' ? 'unread' : ''} ${sel?.id === m.id ? 'active' : ''}" data-action="open-mail" data-id="${m.id}">
          <div class="mail-row-head">
            ${folder === 'inbox'
              ? (m.from ? avatar(m.from, 'xs') : '')
              : (m.to   ? avatar(m.to,   'xs') : '')}
            <div class="mail-row-meta">
              <strong>${escapeHtml(folder === 'inbox' ? (m.from?.displayName || 'Unknown') : (m.to?.displayName || 'Unknown'))}</strong>
              <span>${formatDate(m.createdAt)}</span>
            </div>
          </div>
          <div class="mail-subject">${escapeHtml(m.subject)}</div>
          <div class="mail-preview">${escapeHtml((m.body || '').slice(0, 80))}</div>
        </article>`).join('')
      : `<div class="empty-card">No messages in ${folder}.</div>`}
    </div>
    ${sel ? `<div class="mail-view">
      <div class="mail-view-head">
        <h2>${escapeHtml(sel.subject)}</h2>
        <div class="inline-stack">
          <span style="font-size:12px;color:var(--text-muted)">
            ${folder === 'inbox' ? 'From' : 'To'}:
            <strong>@${escapeHtml(folder === 'inbox' ? (sel.from?.handle || '') : (sel.to?.handle || ''))}</strong>
            · ${formatDate(sel.createdAt)}
          </span>
          <button class="icon-button compact ghost-button" data-action="delete-mail" data-id="${sel.id}" title="Delete">${icons.trash}</button>
          ${folder === 'inbox' ? `<button class="soft-button compact" data-action="reply-mail" data-handle="${escapeHtml(sel.from?.handle || '')}">Reply</button>` : ''}
        </div>
      </div>
      <div class="mail-view-body">${renderMarkdown(sel.body || '')}</div>
    </div>` : `<div class="mail-view mail-view-empty"><div class="chat-placeholder">${icons.mail}<p>Select a message to read</p></div></div>`}
  </section>
  ${state.mail.composing ? renderMailCompose() : ''}`;
}

function renderMailCompose() {
  return `<div class="modal-layer"><div class="modal-backdrop" data-action="close-compose-mail"></div>
    <div class="modal-card" style="max-width:560px">
      <button class="icon-button compact ghost-button modal-close" data-action="close-compose-mail">${icons.close}</button>
      <div class="modal-head"><span class="eyebrow">compose</span><h2>New message</h2></div>
      <form class="settings-form" data-form="send-mail">
        <label><span>To (handle)</span><input name="to" placeholder="@username" /></label>
        <label><span>Subject</span><input name="subject" placeholder="Subject…" /></label>
        <label><span>Message</span><textarea name="body" rows="8" placeholder="Write your message…"></textarea></label>
        <button class="primary-button" type="submit">${icons.plane}<span>Send</span></button>
      </form>
    </div>
  </div>`;
}

function renderVerifyPage() {
  const user = currentUser();
  if (!user) return renderGate('Sign in to verify your email.');
  if (user.emailVerified) return `<section class="section-shell gate-shell">
    <div class="gate-card">
      <div class="gate-illustration">${iconBadge('verified', 'success')}</div>
      <h1>Email verified</h1>
      <p>Your account is fully verified.</p>
      <button class="primary-button" data-action="nav" data-path="/">Back to home</button>
    </div>
  </section>`;
  return `<section class="section-shell gate-shell">
    <div class="gate-card" style="gap:18px">
      <div class="gate-illustration">${iconBadge('mail', 'brand')}</div>
      <h1>Verify your email</h1>
      <p>We'll send a 6-digit code to <strong>${escapeHtml(user.email || '')}</strong></p>
      <button class="primary-button" data-action="send-verify-email">${icons.mail}<span>Send code</span></button>
      <form data-form="verify-email" class="settings-form" style="width:100%;max-width:320px;margin:0 auto">
        <label><span>Enter the 6-digit code</span>
          <input name="code" placeholder="000000" maxlength="6" autocomplete="one-time-code"
            style="letter-spacing:.3em;font-size:1.4rem;text-align:center;font-family:var(--font-mono)" />
        </label>
        <button class="primary-button" type="submit">Verify</button>
      </form>
      <button class="soft-button" data-action="nav" data-path="/settings">Skip for now</button>
    </div>
  </section>`;
}

function renderAdminPage() {
  if (!currentUser()) return renderGate('Sign in first.');
  if (currentUser().roleInternal !== 'owner') return renderGate('Access restricted to operators.');
  const stats = state.adminStats;
  const tabs = [
    { id: 'stats', label: t('stats') || 'Stats' },
    { id: 'users', label: t('users') || 'Users' },
    { id: 'moderation', label: t('moderation') || 'Moderation' },
    { id: 'verification', label: 'Verification' },
    { id: 'ads', label: t('ads') || 'Ads' },
    { id: 'logs', label: t('logs') || 'Logs' },
  ];
  return `
    <div class="admin-page-head">
      <span class="eyebrow">operator</span>
      <h1>${t('adminPanel') || 'Admin Panel'}</h1>
    </div>
    <section class="settings-shell section-shell">
      <aside class="settings-nav">
        ${tabs.map(({ id, label }) => `<button class="settings-tab ${state.adminTab === id ? 'active' : ''}" data-action="admin-tab" data-tab="${id}">${label}</button>`).join('')}
      </aside>
      <div class="settings-content">
        ${state.adminTab === 'stats' ? renderAdminStats(stats) : ''}
        ${state.adminTab === 'users' ? renderAdminUsers() : ''}
        ${state.adminTab === 'moderation' ? renderAdminModeration() : ''}
        ${state.adminTab === 'ads' ? renderAdminAds() : ''}
        ${state.adminTab === 'verification' ? renderAdminVerification() : ''}
        ${state.adminTab === 'logs' ? renderAdminLogs() : ''}
      </div>
    </section>`;
}
function renderAdminStats(stats) {
  if (!stats) return renderLoading();
  return `<section class="settings-panel"><h2>Platform overview</h2>
    <div class="admin-stats-grid">
      <div class="admin-stat"><strong>${stats.users?.total || 0}</strong><span>Total users</span></div>
      <div class="admin-stat"><strong>${stats.users?.newToday || 0}</strong><span>New today</span></div>
      <div class="admin-stat"><strong>${stats.users?.banned || 0}</strong><span>Banned</span></div>
      <div class="admin-stat"><strong>${stats.messages?.total || 0}</strong><span>Messages</span></div>
      <div class="admin-stat"><strong>${stats.messages?.today || 0}</strong><span>Messages today</span></div>
      <div class="admin-stat"><strong>${stats.rooms?.total || 0}</strong><span>Rooms</span></div>
      <div class="admin-stat"><strong>${stats.sites?.public || 0}</strong><span>Public sites</span></div>
      <div class="admin-stat"><strong>${stats.posts?.total || 0}</strong><span>Posts</span></div>
      <div class="admin-stat"><strong>${stats.workspaces || 0}</strong><span>Workspaces</span></div>
    </div>
    ${state.maintenance ? `<div class="inline-alert inline-alert-warning" style="margin-top:10px">${iconBadge('alert', 'warning')}<div class="inline-alert-copy"><strong>Maintenance mode</strong><span>Public API access is currently restricted.</span></div></div>` : ''}
  </section>`;
}
function renderAdminUsers() {
  return `<section class="settings-panel"><h2>Users (${state.adminUsers.length})</h2>
    <div class="search-control" style="margin-bottom:12px">
      ${icons.search}
      <input type="search" data-input="admin-search" placeholder="Search users…" />
    </div>
    <div class="social-list">${state.adminUsers.map(u => `
      <div class="social-row admin-user-row ${u.bannedAt ? 'banned-row' : ''}">
        ${avatar(u, 'sm')}
        <div><strong>${escapeHtml(u.displayName)}</strong><span>@${escapeHtml(u.handle)} · ${escapeHtml(u.email || '')} · <em>${u.roleLabel || u.roleInternal || 'member'}</em></span><div class="badge-row">${badgePills(u)}</div></div>
        <div class="row-actions">
          ${!u.isSelf ? `
            ${u.bannedAt
              ? `<button class="soft-button compact" data-action="admin-unban" data-handle="${escapeHtml(u.handleCanonical)}">Unban</button>`
              : `<button class="inline-button danger compact" data-action="admin-ban" data-handle="${escapeHtml(u.handleCanonical)}">Ban</button>`}
            <button class="soft-button compact" data-action="admin-verify" data-handle="${escapeHtml(u.handleCanonical)}">${icons.check} Verify</button>
          ` : '<span class="muted">you</span>'}
        </div>
      </div>`).join('') || renderEmpty('No users found.')}
    </div>
  </section>`;
}
function renderAdminAds() {
  return `<section class="settings-panel"><h2>Ad Slots</h2>
    <p class="muted">Manage the "Supported by" sponsor blocks that appear on home and feed pages. No trackers — just honest sponsor cards.</p>
    <div class="stack-list">
      ${(state.ads || []).map((ad, i) => `
        <div class="tile" style="gap:10px">
          <div class="inline-stack between">
            <div class="inline-stack">
              ${renderAdVisual(ad, 'admin')}
              <div><strong>${escapeHtml(ad.title)}</strong><span style="display:block;font-size:12px;color:var(--text-muted)">${escapeHtml(ad.type)}</span></div>
            </div>
            <span class="badge-pill" style="background:${ad.internal ? 'rgba(63,185,80,.12)' : 'rgba(45,140,240,.12)'}">${ad.internal ? 'internal' : 'external'}</span>
          </div>
          <p style="margin:0;font-size:13px;color:var(--text-soft)">${escapeHtml(ad.desc)}</p>
          <a href="${escapeHtml(ad.href)}" style="font-size:12px;color:var(--accent-2)">${escapeHtml(ad.href)}</a>
        </div>`).join('')}
    </div>
    <p class="muted" style="font-size:12px;margin-top:8px">To configure external sponsors, update the <code class="inline-code">state.ads</code> array in app.js or expose a /api/admin/ads endpoint.</p>
  </section>`;
}
function renderAdminVerification() {
  const pending = (state.adminUsers || []).filter(u => u.verificationRequested && !u.badges?.includes('VRF'));
  return `<section class="settings-panel"><h2>Verification Requests</h2>
    ${pending.length ? `
      <div class="social-list">
        ${pending.map(u => `
          <div class="social-row">
            ${avatar(u, 'sm')}
            <div>
              <strong>${escapeHtml(u.displayName)}</strong>
              <span>@${escapeHtml(u.handle)}</span>
            </div>
            <div class="row-actions">
              <button class="soft-button compact" data-action="admin-verify" data-handle="${escapeHtml(u.handleCanonical)}">${icons.check} Verify</button>
            </div>
          </div>`).join('')}
      </div>` : '<p class="muted">No pending requests.</p>'}
    <p style="font-size:12px;color:var(--text-muted);margin-top:12px">
      To approve a user, find them in the <button class="text-link" data-action="admin-tab" data-tab="users">Users tab</button>.
    </p>
  </section>`;
}
function renderAdminModeration() {
  const banned = (state.adminUsers || []).filter(u => u.bannedAt);
  const guests = (state.adminUsers || []).filter(u => u.roleInternal === 'guest');
  return `<section class="settings-panel"><h2>Moderation</h2>
    <div class="settings-block">
      <h3>Banned accounts (${banned.length})</h3>
      <div class="social-list">
        ${banned.length ? banned.map(u => `
          <div class="social-row admin-user-row banned-row">
            ${avatar(u, 'sm')}
            <div>
              <strong>${escapeHtml(u.displayName)}</strong>
              <span>@${escapeHtml(u.handle)} · <em>${escapeHtml(u.banReason || 'no reason given')}</em></span>
              <span style="font-size:11px;color:var(--text-muted)">Banned ${formatDate(u.bannedAt)}</span>
            </div>
            <div class="row-actions">
              <button class="soft-button compact" data-action="admin-unban" data-handle="${escapeHtml(u.handleCanonical)}">Unban</button>
            </div>
          </div>`).join('')
        : '<p class="muted">No banned accounts.</p>'}
      </div>
    </div>
    <div class="settings-block">
      <h3>Guest accounts (${guests.length})</h3>
      <p class="muted" style="margin:0;font-size:13px">Guest accounts are ephemeral and will expire automatically.</p>
    </div>
    <div class="settings-block">
      <h3>Platform settings</h3>
      <div class="detail-actions">
        <button class="soft-button ${state.maintenance ? 'danger' : ''}" data-action="toggle-maintenance">
          ${icons.wrench}<span>${state.maintenance ? 'Disable maintenance' : 'Enable maintenance'}</span>
        </button>
      </div>
      ${state.maintenance ? `<div class="inline-alert inline-alert-warning" style="margin-top:10px">${iconBadge('alert', 'warning')}<div class="inline-alert-copy"><strong>Maintenance is active</strong><span>Non-essential requests are blocked until you disable it.</span></div></div>` : ''}
    </div>
  </section>`;
}
function renderAdminLogs() {
  return `<section class="settings-panel"><h2>Audit Logs</h2>
    <p class="muted">Audit logs record admin actions taken on user accounts.</p>
    <div class="stack-list">
      ${(state.adminLogs || []).length ? (state.adminLogs || []).map(log => `
        <div class="tile" style="gap:6px">
          <div class="inline-stack between">
            <strong style="font-size:.88rem">${escapeHtml(log.action || '')}</strong>
            <span style="font-size:11px;color:var(--text-muted)">${formatDate(log.createdAt)}</span>
          </div>
          <span style="font-size:12px;color:var(--text-muted)">by @${escapeHtml(log.actorHandle || '')} → @${escapeHtml(log.targetHandle || '')}</span>
        </div>`).join('')
      : '<p class="muted" style="margin:0">No audit logs yet.</p>'}
    </div>
    <div class="settings-block" style="margin-top:16px">
      <h3>Backup</h3>
      <div class="detail-actions">
        <button class="soft-button" data-action="create-backup">${icons.archive}<span>Create backup now</span></button>
      </div>
    </div>
  </section>`;
}

async function routeLoad() {
  const routeSnapshot = { ...state.route };
  const loadSeq = ++state.routeLoadSeq;
  state.loading = true;
  try {
    const publicTasks = [loadBootstrap()];
    if (routeSnapshot.name === 'feed') publicTasks.push(loadFeed());
    if (routeSnapshot.name === 'discover') publicTasks.push(loadDiscover());
    if (routeSnapshot.name === 'profile') publicTasks.push(loadProfile(routeSnapshot.handle));
    if (routeSnapshot.name === 'project') publicTasks.push(loadProject(routeSnapshot.slug));
    await Promise.all(publicTasks);
    if (loadSeq !== state.routeLoadSeq) return;

    const postBootstrapTasks = [];
    const canUseAccountAreas = currentUser() && !isGuestSession();
    if (routeSnapshot.name === 'messages' && canUseAccountAreas) postBootstrapTasks.push(loadChatBootstrap());
    if (routeSnapshot.name === 'sites' && canUseAccountAreas) postBootstrapTasks.push(loadSitesMine());
    if (routeSnapshot.name === 'join' && currentUser()) postBootstrapTasks.push(joinInvite(routeSnapshot.code));
    if (routeSnapshot.name === 'mail' && canUseAccountAreas) postBootstrapTasks.push(loadMail());
    if (routeSnapshot.name === 'admin' && canUseAccountAreas) postBootstrapTasks.push(loadAdminData());
    await Promise.all(postBootstrapTasks);
  } catch (error) {
    if (loadSeq === state.routeLoadSeq) toast(error.message, 'error');
  } finally {
    if (loadSeq !== state.routeLoadSeq) return;
    state.loading = false;
    render();
    if (!state.appReady) hideSplash();
  }
}

async function joinInvite(code) {
  try {
    const payload = await api(`/api/chat/invites/${encodeURIComponent(code)}`);
    await api(`/api/chat/invites/${encodeURIComponent(code)}/join`, { method: 'POST', body: '{}' });
    toast(`Joined ${payload.room.title}`, 'success');
    navigate(`/messages/${payload.room.slug}`);
  } catch (error) {
    toast(error.message, 'error');
  }
}

function renderTopbar() {
  const user = currentUser();
  const canCreate = user && !isGuestSession();
  const showAccountNav = user && !isGuestSession();
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand-lockup" href="/" data-action="nav" data-path="/">
          <img class="brand-mark" src="/logo.png" alt="" width="28" height="28" />
          <span class="brand-wordmark" style="font-size:1rem;font-weight:700;letter-spacing:-.04em;"><span class="brand-name">justbreath</span><span class="brand-domain" style="color:var(--text-muted)">.life</span></span>
          ${state.sseStatus === 'live' ? '<span class="sse-dot live" title="Live"></span>' : state.sseStatus === 'error' ? '<span class="sse-dot error" title="Reconnecting…"></span>' : ''}
        </a>
        <nav class="main-nav">
          ${navLink('/', 'home', t('home'))}
          ${navLink('/feed', 'feed', t('feed'))}
          ${showAccountNav ? navLink('/messages', 'messages', t('messages')) : ''}
          ${navLink('/discover', 'discover', t('discover'))}
          ${showAccountNav ? navLink('/sites', 'sites', t('sites')) : ''}
          ${showAccountNav ? navLink('/mail', 'mail', t('mail') || 'Mail', state.mail.unread) : ''}
          ${currentUser()?.roleInternal === 'owner' ? navLink('/admin', 'admin', 'Admin') : ''}
        </nav>
        <div class="top-actions">
          <button class="icon-button ghost-button" data-action="open-search" title="${t('discover')}">${icons.search}</button>
          ${canCreate ? `<button class="primary-button" data-action="open-modal" data-modal="quick-post"><span>${icons.plus}</span><span>${t('quickPost')}</span></button>` : `<button class="primary-button" data-action="open-modal" data-modal="auth">${user ? 'Create account' : t('signIn')}</button>`}
          <button class="account-chip" data-action="toggle-drawer" title="${t('accountCenter')}">
            ${user ? avatar(user, 'sm') : `<span class="avatar avatar-sm"><strong>?</strong></span>`}
            <span class="account-copy">
              <strong>${escapeHtml(user?.displayName || 'justbreath')}</strong>
              <span>${escapeHtml(user?.handle ? `@${user.handle}` : t('accountCenter'))}</span>
            </span>
          </button>
        </div>
      </div>
    </header>`;
}
function navLink(path, name, label, unreadOverride) {
  const active = state.route.name === name;
  const chatUnread = name === 'messages' ? Object.values(state.chat.unread || {}).reduce((a, b) => a + b, 0) : 0;
  const mailUnread = name === 'mail' ? (state.mail?.unread || 0) : 0;
  const unread = unreadOverride !== undefined ? unreadOverride : (chatUnread || mailUnread);
  const badge = unread > 0 ? `<span class="nav-badge">${unread > 99 ? '99+' : unread}</span>` : '';
  return `<a href="${path}" class="nav-link ${active ? 'active' : ''}" data-action="nav" data-path="${path}">${label}${badge}</a>`;
}

function renderHome() {
  const home = state.home || { popularUsers: [], recentProjects: [], featuredSites: [], openRooms: [], stats: {} };
  const isGuest = !currentUser() || currentUser()?.roleInternal === 'guest';
  return `
    <section class="hero-card section-shell">
      <div class="hero-copy">
        <span class="eyebrow">justbreath.life</span>
        <h1>Where developers and creators ship, chat, and build together.</h1>
        <p>${t('homeLead')}</p>
        <div class="hero-actions">
          ${!currentUser() ? `
            <button class="primary-button" data-action="open-modal" data-modal="auth">${icons.user || ''}<span>Create free account</span></button>
            <button class="soft-button" data-action="guest-login">${icons.eye || ''}<span>Try as guest</span></button>
            <button class="ghost-button" data-action="nav" data-path="/discover">${t('discover')}</button>
          ` : `
            <button class="primary-button" data-action="nav" data-path="/discover">${icons.search}<span>${t('discover')}</span></button>
            <button class="soft-button" data-action="nav" data-path="/messages">${icons.message}<span>${t('openMessages')}</span></button>
          `}
        </div>
        ${isGuest && currentUser() ? `<p style="font-size:12px;color:var(--text-muted);margin-top:10px">You're browsing as a guest. <button class="text-link" data-action="open-modal" data-modal="auth">Sign up</button> to keep your data, chat with others, and publish sites.</p>` : ''}
      </div>
      ${currentUser() && !isGuestSession() ? `<div class="hero-metrics">
        ${metricTile(home.stats.users || 0, 'Members')}
        ${metricTile(home.stats.projects || 0, 'Projects')}
        ${metricTile(home.stats.sites || 0, 'Sites')}
        ${metricTile(home.stats.workspaces || 0, 'Workspaces')}
      </div>` : ''}
    </section>

    <section class="section-shell">
      <div class="section-heading"><h2>${t('popularUsers')}</h2><button class="inline-button" data-action="nav" data-path="/discover">${t('viewAll')}</button></div>
      <div class="card-grid card-grid-users">${home.popularUsers.map(renderUserCard).join('') || renderEmpty(t('noProjects'))}</div>
    </section>

    ${renderAdBanner()}

    <section class="section-shell split-grid">
      <div>
        <div class="section-heading"><h2>${t('recentProjects')}</h2></div>
        <div class="stack-list">${home.recentProjects.map(renderProjectCard).join('')}</div>
      </div>
      <div>
        <div class="section-heading"><h2>${t('creatorSites')}</h2></div>
        <div class="stack-list">${home.featuredSites.map(renderSiteCard).join('')}</div>
      </div>
    </section>

    <section class="section-shell split-grid">
      <div>
        <div class="section-heading"><h2>${t('openSpaces')}</h2></div>
        <div class="stack-list">${home.openRooms.map(renderRoomCard).join('')}</div>
      </div>
      <div>
        ${renderAdCard((state.ads || [])[1])}
      </div>
    </section>`;
}
function metricTile(value, label) {
  return `<div class="metric-card">
    ${metricIcon(label)}
    <div style="display:grid;gap:1px">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  </div>`;
}
function renderEmpty(text) {
  return `<div class="empty-card">${text}</div>`;
}

function renderProfileLinks(user) {
  const links = user.links || {};
  const items = [
    links.website && { label: links.website.replace(/^https?:\/\//, '').slice(0, 32), href: links.website, icon: icons.link },
    links.github && { label: links.github, href: `https://github.com/${links.github}`, icon: icons.external },
    links.discord && { label: links.discord, href: null, icon: icons.message },
    links.telegram && { label: links.telegram, href: `https://t.me/${links.telegram}`, icon: icons.plane },
    links.steam && { label: links.steam, href: `https://steamcommunity.com/id/${links.steam}`, icon: icons.steam },
    links.youtube && { label: links.youtube, href: `https://youtube.com/@${links.youtube}`, icon: icons.youtube },
    links.instagram && { label: links.instagram, href: `https://instagram.com/${links.instagram}`, icon: icons.instagram },
  ].filter(Boolean);
  if (!items.length) return '';
  return `<div class="profile-links">${items.map(item =>
    item.href
      ? `<a class="profile-link-chip" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${item.icon}<span>${escapeHtml(item.label)}</span></a>`
      : `<span class="profile-link-chip">${item.icon}<span>${escapeHtml(item.label)}</span></span>`
  ).join('')}</div>`;
}

function renderAdBanner(slot) {
  if (state.meta?.adsenseClientId) {
    return renderAdsenseUnit({ ...(slot || {}), adSlot: slot?.adSlot || '1923575505' });
  }
  if (!slot) slot = (state.ads || []).find(a => a.type === 'banner') || (state.ads || [])[0];
  if (!slot) return '';
  const target = slot.internal ? '' : 'target="_blank" rel="noreferrer noopener"';
  return `<div class="ad-banner">
    <div class="ad-banner-logo">
      ${renderAdVisual(slot, 'banner')}
    </div>
    <div class="ad-banner-copy">
      <strong>${escapeHtml(slot.title)}</strong>
      <span>${escapeHtml(slot.desc)}</span>
    </div>
    <a class="ad-banner-cta" href="${escapeHtml(slot.href)}" ${target}>${escapeHtml(slot.cta)}</a>
    <span class="ad-tag">Sponsored</span>
  </div>`;
}

let _adsenseSeq = 0;
function renderAdsenseUnit(slot = {}) {
  const client = state.meta?.adsenseClientId;
  if (!client) return '';
  const id = `adsense-${++_adsenseSeq}`;
  const adSlot = slot.adSlot || '1923575505';
  return `<div class="ad-slot ad-slot-adsense">
    <div class="ad-slot-label"><span>Sponsored</span></div>
    <ins class="adsbygoogle" id="${id}"
         style="display:block;min-height:90px"
         data-ad-client="${escapeHtml(client)}"
         ${adSlot ? `data-ad-slot="${escapeHtml(adSlot)}"` : ''}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>`;
}
function pushAdsenseUnits() {
  if (!window.adsbygoogle) return;
  document.querySelectorAll('ins.adsbygoogle:not([data-pushed])').forEach((el) => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      el.setAttribute('data-pushed', '1');
    } catch (_e) { /* ignore double-push */ }
  });
}
function renderAdCard(slot) {
  // If AdSense is configured, prefer a real AdSense unit (falls back to internal promo when no client).
  if (state.meta?.adsenseClientId && (!slot || slot.internal !== false)) {
    return renderAdsenseUnit(slot || {});
  }
  if (!slot) slot = (state.ads || []).find(a => a.type === 'card') || (state.ads || [])[0];
  if (!slot) return '';
  const target = slot.internal ? '' : 'target="_blank" rel="noreferrer noopener"';
  return `<div class="ad-slot">
    <div class="ad-slot-label"><span>Sponsored</span></div>
    <div class="ad-card">
      <div class="ad-card-head">
        ${renderAdVisual(slot, 'card')}
        <span class="ad-card-title">${escapeHtml(slot.title)}</span>
      </div>
      <p class="ad-card-desc">${escapeHtml(slot.desc)}</p>
      <a href="${escapeHtml(slot.href)}" ${target}>${escapeHtml(slot.cta)}</a>
    </div>
  </div>`;
}
function renderUserCard(user) {
  return `<article class="tile tile-user" data-hover-user="${user.handleCanonical || user.handle.toLowerCase()}">
    <div class="tile-top">
      ${avatar(user, 'lg')}
      <div class="tile-copy">
        <button class="text-link strong" data-action="open-profile" data-handle="${user.handleCanonical || user.handle.toLowerCase()}">${escapeHtml(user.displayName)}</button>
        <span>@${escapeHtml(user.handle)}</span>
      </div>
      <div class="badge-row">${badgePills(user)}</div>
    </div>
    <p>${escapeHtml(user.bio || 'No public bio yet.')}</p>
    <div class="tile-meta"><span>${user.stats.projects} projects</span><span>${user.stats.sites} sites</span><span>${user.stats.followers} followers</span></div>
  </article>`;
}
function renderProjectCard(project) {
  return `<article class="tile tile-project">
    <div class="tile-top between"><div><span class="kicker">${escapeHtml(project.category || 'project')}</span><button class="text-link strong" data-action="nav" data-path="/project/${project.slug}">${escapeHtml(project.title)}</button></div>${project.owner ? avatar(project.owner, 'sm') : ''}</div>
    <p>${escapeHtml(project.summary || '')}</p>
    <div class="tag-row">${(project.tags || []).slice(0, 4).map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join('')}</div>
  </article>`;
}
function renderSiteCard(site) {
  return `<article class="tile tile-site">
    <div class="tile-top between"><div class="site-title-row">${renderSiteIcon(site)}<div><span class="kicker">${site.mode === 'upload' ? 'custom' : 'template'}</span><a class="text-link strong" href="${site.path}">${escapeHtml(site.title)}</a></div></div>${site.owner ? avatar(site.owner, 'sm') : ''}</div>
    <p>${escapeHtml(site.summary || '')}</p>
    <div class="tile-actions"><a class="inline-button" href="${site.path}">${icons.external}<span>${t('openSite')}</span></a></div>
  </article>`;
}
function findKnownRoom(slug) {
  if (!slug) return null;
  return (state.chat.room?.slug === slug && state.chat.room)
    || state.chat.bootstrap?.rooms?.find((item) => item.slug === slug)
    || state.discover.rooms.find((item) => item.slug === slug)
    || state.home?.openRooms?.find((item) => item.slug === slug)
    || null;
}
function planLabel(planId) {
  const plan = (state.meta?.subscriptions || []).find((item) => item.id === planId);
  return plan?.label || planId || 'Free';
}
function roomSurfaceShort(room) {
  if (room?.kind === 'direct') return 'DM';
  if (room?.surface === 'workspace') return 'CHN';
  if (room?.permissions?.posting === 'admins') return 'CHN';
  if (room?.surface === 'work') return 'WRK';
  if (room?.surface === 'group') return 'GRP';
  return String(room?.surface || 'room').slice(0, 3).toUpperCase();
}
function roomPostingSummary(room) {
  if (room?.kind === 'direct') return '';
  return room?.permissions?.posting === 'admins'
    ? (currentLang() === 'ru' ? 'Пишут только админы' : 'Only admins can post')
    : (currentLang() === 'ru' ? 'Пишут все участники' : 'Members can post');
}
function roomNeedsUpgrade(room) {
  return Boolean(room?.subscription?.enabled && room?.subscription?.locked);
}
function roomPremiumSummary(room) {
  if (!room?.subscription?.enabled) return '';
  const label = room.subscription.requiredPlanLabel || planLabel(room.subscription.requiredPlanId);
  return currentLang() === 'ru' ? `Premium: ${label}` : `Premium: ${label}`;
}
function renderRoomPrimaryAction(room, compact = false) {
  if (!room) return '';
  const buttonClass = compact ? 'icon-button compact' : 'inline-button';
  if (!room.joined && room.kind !== 'direct') {
    if (room.canJoin) {
      return `<button class="${buttonClass}" data-action="join-room" data-slug="${room.slug}">${compact ? icons.plus : `${icons.plus}<span>${currentLang() === 'ru' ? 'Вступить' : 'Join'}</span>`}</button>`;
    }
    if (roomNeedsUpgrade(room)) {
      return `<button class="${buttonClass}" data-action="room-upgrade" data-slug="${room.slug}">${compact ? icons.card : `${icons.card}<span>${currentLang() === 'ru' ? 'Нужен план' : 'Need plan'}</span>`}</button>`;
    }
  }
  return `<button class="${buttonClass}" data-action="open-room" data-slug="${room.slug}">${compact ? icons.chevronRight : `${icons.message}<span>${currentLang() === 'ru' ? 'Открыть' : 'Open'}</span>`}</button>`;
}
function renderRoomCard(room) {
  const meta = [roomSurfaceShort(room)];
  if (room?.subscription?.enabled) meta.push(roomPremiumSummary(room));
  if (room?.joined) meta.push(currentLang() === 'ru' ? 'Участник' : 'Joined');
  return `<article class="tile tile-room" data-hover-room="${room.slug}">
    <div class="tile-top between">
      <div class="inline-stack">${roomAvatar(room, 'sm')}<div><button class="text-link strong" data-action="open-room" data-slug="${room.slug}">${escapeHtml(room.title)}</button><span>${escapeHtml(room.description || '')}</span></div></div>
      <span class="surface-pill surface-${room.surface}">${escapeHtml(roomSurfaceShort(room))}</span>
    </div>
    <div class="tag-row">${(room.tags || []).map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join('')}</div>
    <div class="tile-meta"><span>${room.memberCount} ${t('members')}</span><span>${room.messageCount} msgs</span><span>${escapeHtml(roomPostingSummary(room) || meta.join(' · '))}</span></div>
    <div class="tile-actions">${renderRoomPrimaryAction(room)}</div>
  </article>`;
}
function renderPlanCard(plan) {
  const savingsBadge = plan.savingsEUR > 0 ? `<span class="save-pill">-€${plan.savingsEUR}</span>` : '';
  const perks = (plan.perks || []).map(p => `<li>${escapeHtml(p)}</li>`).join('');
  const extraSitesLabel = plan.extraSites === -1 ? 'Unlimited site spaces' : `${3 + plan.extraSites} site spaces total`;
  return `<article class="plan-card">
    <div class="plan-header">
      <span class="plan-label">${escapeHtml(plan.label || plan.id)}</span>
      <span class="plan-duration">${plan.months} mo</span>
    </div>
    <div class="plan-price-row">
      <strong class="plan-price">€${plan.priceEUR}</strong>
      ${plan.compareAtEUR > plan.priceEUR ? `<span class="plan-compare-at">€${plan.compareAtEUR}</span>` : ''}
      ${savingsBadge}
    </div>
    <ul class="plan-perks">${perks || `<li>${extraSitesLabel}</li><li>${plan.storageMB >= 1024 ? plan.storageMB / 1024 + ' GB' : plan.storageMB + ' MB'} storage</li>`}</ul>
    <button class="soft-button plan-cta" data-action="select-plan" data-plan="${plan.id}">Choose plan</button>
  </article>`;
}

function renderFeed() {
  const canCreate = currentUser() && !isGuestSession();
  return `
    <section class="section-shell page-heading-row">
      <div><span class="eyebrow">feed</span><h1>${state.feed.tab === 'devlog' ? 'Devlogs' : 'Posts'}</h1></div>
      <div class="page-tools">${searchControl('feed')}${canCreate ? `<button class="primary-button" data-action="open-modal" data-modal="${state.feed.tab === 'devlog' ? 'devlog' : 'quick-post'}">${icons.plus}<span>${state.feed.tab === 'devlog' ? t('devlog') : t('quickPost')}</span></button>` : ''}</div>
    </section>
    <section class="section-shell">
      <div class="segment-row">
        ${segmentButton('feed-tab', 'quick', t('quickPost'), state.feed.tab === 'quick')}
        ${segmentButton('feed-tab', 'devlog', t('devlog'), state.feed.tab === 'devlog')}
      </div>
      <div class="stack-list feed-list">${state.feed.items.length
        ? state.feed.items.map((p, i) => renderPostCard(p) + (i === 4 ? renderAdBanner() : '')).join('')
        : renderEmpty(t('noPosts'))}</div>
    </section>`;
}
function segmentButton(action, value, label, active) {
  return `<button class="segment-button ${active ? 'active' : ''}" data-action="${action}" data-value="${value}">${label}</button>`;
}
function patchVisiblePosts(postId, updater) {
  const patchList = (items) => Array.isArray(items) ? items.map((item) => Number(item.id) === Number(postId) ? updater(item) : item) : items;
  state.feed.items = patchList(state.feed.items);
  if (state.profile?.posts) state.profile.posts = patchList(state.profile.posts);
  if (state.project?.posts) state.project.posts = patchList(state.project.posts);
  if (state.me?.posts) state.me.posts = patchList(state.me.posts);
}
function patchVisibleSites(siteId, updater) {
  const id = Number(siteId);
  const patchList = (items, { publicOnly = false, allowInsert = true } = {}) => {
    if (!Array.isArray(items)) return items;
    let found = false;
    const nextItems = items.reduce((acc, item) => {
      if (Number(item.id) !== id) {
        acc.push(item);
        return acc;
      }
      found = true;
      const nextItem = updater(item);
      if (!nextItem) return acc;
      if (publicOnly && nextItem.visibility !== 'public') return acc;
      acc.push(nextItem);
      return acc;
    }, []);
    if (!found && allowInsert) {
      const nextItem = updater(null);
      if (nextItem && (!publicOnly || nextItem.visibility === 'public')) nextItems.unshift(nextItem);
    }
    return nextItems;
  };
  state.sites.mine = patchList(state.sites.mine);
  state.sites.public = patchList(state.sites.public, { publicOnly: true });
  state.discover.sites = patchList(state.discover.sites, { publicOnly: true });
  if (state.home?.featuredSites) state.home.featuredSites = patchList(state.home.featuredSites, { publicOnly: true });
  if (state.me?.sites) state.me.sites = patchList(state.me.sites);
  if (state.profile?.sites) {
    const isOwnProfile = Number(state.profile?.profile?.id || 0) === Number(currentUser()?.id || 0);
    state.profile.sites = patchList(state.profile.sites, isOwnProfile ? {} : { publicOnly: true, allowInsert: false });
  }
}
function findVisiblePost(postId) {
  const id = Number(postId);
  return (state.feed.items || []).find((item) => Number(item.id) === id)
    || (state.profile?.posts || []).find((item) => Number(item.id) === id)
    || (state.project?.posts || []).find((item) => Number(item.id) === id)
    || (state.me?.posts || []).find((item) => Number(item.id) === id)
    || null;
}
function findModalPost(postId) {
  const id = Number(postId);
  if (Number(state.modal?.post?.id) === id) return state.modal.post;
  return findVisiblePost(id);
}
function findOwnedSite(siteId) {
  const id = Number(siteId);
  if (Number(state.modal?.site?.id) === id) return state.modal.site;
  return (state.sites.mine || []).find((item) => Number(item.id) === id)
    || (state.me?.sites || []).find((item) => Number(item.id) === id)
    || (state.profile?.sites || []).find((item) => Number(item.id) === id)
    || null;
}
function serializeSiteLinks(links = []) {
  return (Array.isArray(links) ? links : [])
    .map((item) => {
      const label = String(item?.label || '').trim();
      const href = String(item?.href || '').trim();
      return label && href ? `${label}|${href}` : '';
    })
    .filter(Boolean)
    .join('\n');
}
function serializeSiteGallery(gallery = []) {
  return (Array.isArray(gallery) ? gallery : [])
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .join('\n');
}
function parseSiteLinksInput(value = '') {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split('|');
      return { label: label?.trim(), href: href?.trim() };
    })
    .filter((item) => item.label && item.href);
}
function parseSiteGalleryInput(value = '') {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
function renderSiteIcon(site, className = 'site-card-icon') {
  const iconUrl = String(site?.iconUrl || '').trim();
  if (iconUrl) {
    return `<img class="${className}" src="${escapeHtml(iconUrl)}" alt="${escapeHtml(site?.title || 'Site')}" />`;
  }
  return `<span class="${className} site-card-icon-fallback">${escapeHtml((site?.title || 'S').slice(0, 1).toUpperCase())}</span>`;
}
function siteReadinessChecklist(site, config = {}) {
  return [
    { label: 'Browser tab icon', done: Boolean(config.faviconUrl || config.logoUrl || site?.iconUrl), hint: 'Set Favicon URL or Logo URL so the tab shows your brand.' },
    { label: 'SEO title', done: Boolean(String(config.seoTitle || site?.title || '').trim()), hint: 'Use a concise title with the brand or service name.' },
    { label: 'Meta description', done: Boolean(String(config.seoDescription || site?.summary || config.body || '').trim()), hint: 'Write one summary that explains what the site does.' },
    { label: 'Canonical URL', done: site?.visibility !== 'public' || Boolean(String(config.canonicalUrl || '').trim()), hint: 'Recommended for public sites to avoid duplicate-index confusion.' },
    { label: 'Contact method', done: Boolean(String(config.supportEmail || config.phone || config.contact || '').trim()), hint: 'Give visitors a real way to reach you.' },
    { label: 'Legal links', done: Boolean(String(config.privacyUrl || config.termsUrl || '').trim()), hint: 'Privacy and terms links make the site look legitimate.' },
    { label: 'Open Graph image', done: Boolean(String(config.ogImageUrl || site?.iconUrl || '').trim()), hint: 'Used by search and social previews.' },
    { label: 'Review ready', done: site?.visibility !== 'public' || ['pending', 'approved'].includes(site?.reviewStatus || ''), hint: 'Public sites should be sent for review before listing.' }
  ];
}
function renderSiteReadiness(site, config = {}) {
  return `<div class="site-editor-checklist">${siteReadinessChecklist(site, config).map((item) => `
    <div class="site-editor-check ${item.done ? 'done' : 'missing'}">
      <strong>${item.done ? 'Ready' : 'Needs work'}</strong>
      <span>${escapeHtml(item.label)}</span>
      <small>${escapeHtml(item.hint)}</small>
    </div>`).join('')}</div>`;
}

function renderSiteCreationGuide() {
  const isRu = currentLang() === 'ru';
  return `<div class="site-upload-rules site-mode-guide">
    <strong>${isRu ? 'Какой режим выбрать' : 'Pick the right site mode'}</strong>
    <ul>
      <li>${isRu ? 'Template site: быстрый лонч, портфолио, питч, event-страница или docs без собственного фронтенд-пака.' : 'Template site: for a fast launch page, portfolio, pitch, event page or docs without your own frontend bundle.'}</li>
      <li>${isRu ? 'Single HTML: если весь сайт живёт в одном <code>.html</code> и не зависит от локальных <code>css/js/images</code>.' : 'Single HTML: when everything lives in one <code>.html</code> file with no local css/js/images dependencies.'}</li>
      <li>${isRu ? 'Archive package: если у сайта несколько страниц или есть локальные папки <code>css/</code>, <code>js/</code>, <code>img/</code>.' : 'Archive package: when the site has multiple pages or local <code>css/</code>, <code>js/</code>, <code>img/</code> folders.'}</li>
      <li>${isRu ? '7z требует отдельного extractor на сервере. ZIP/TAR/TGZ работают сразу, если архив содержит <code>index.html</code>.' : '7z needs an extra server-side extractor. ZIP/TAR/TGZ work immediately when the archive contains <code>index.html</code>.'}</li>
    </ul>
  </div>`;
}

function renderSiteUploadDiagnostics(site) {
  const info = site?.uploadDiagnostics;
  if (!info) return '';
  const isRu = currentLang() === 'ru';
  const modeLabel = info.variant === 'archive'
    ? (isRu ? 'Архивный пакет' : 'Archive package')
    : 'Single HTML';
  const shownFiles = (info.files || []).slice(0, 12);
  const remaining = Math.max(Number(info.fileCount || 0) - shownFiles.length, 0);
  return `<div class="site-upload-diagnostics">
    <div class="site-upload-diagnostic-card">
      <strong>${modeLabel}</strong>
      <span>${isRu ? `Точка входа: ${info.entryFile || 'index.html'}` : `Entry file: ${info.entryFile || 'index.html'}`}</span>
      <small>${info.variant === 'archive'
        ? (isRu ? 'Можно обновлять metadata отдельно, а css/js/images и дополнительные страницы менять повторной загрузкой архива.' : 'Metadata can be edited here; update css/js/images and extra pages by re-uploading the archive.')
        : (isRu ? 'Этот режим подходит только для одного HTML-файла без локальных ассетов.' : 'This mode only works for one HTML file without local bundled assets.')}</small>
    </div>
    ${(info.files || []).length ? `<div class="site-upload-diagnostic-card">
      <strong>${isRu ? 'Файлы пакета' : 'Package files'}</strong>
      <div class="site-upload-file-list">${shownFiles.map((file) => `<code>${escapeHtml(file)}</code>`).join('')}</div>
      ${remaining ? `<small>${isRu ? `И ещё ${remaining} файлов` : `${remaining} more files`}</small>` : ''}
    </div>` : ''}
    ${(info.missingRefs || []).length ? `<div class="site-upload-diagnostic-card warning">
      <strong>${isRu ? 'Битые локальные ссылки' : 'Broken local references'}</strong>
      <small>${isRu ? 'Эти пути встречаются в HTML, но сейчас не доступны. Именно они вызывают ошибки MIME и отсутствие стилей/скриптов.' : 'These paths are referenced by the HTML but are not currently available. They cause the MIME errors and missing styles/scripts.'}</small>
      <div class="site-upload-file-list">${info.missingRefs.slice(0, 12).map((file) => `<code>${escapeHtml(file)}</code>`).join('')}</div>
    </div>` : ''}
  </div>`;
}
function renderPostCard(post) {
  const attachment = post.attachment && post.attachment.url ? (post.attachment.type === 'image' ? `<img class="post-media clickable-img" src="${post.attachment.url}" data-action="open-lightbox" data-src="${post.attachment.url}" data-alt="${escapeHtml(post.attachment.name || 'image')}" alt="${escapeHtml(post.attachment.name || 'image')}" />` : `<a class="attachment-chip" href="${post.attachment.url}" target="_blank" rel="noreferrer">${icons.file}<span>${escapeHtml(post.attachment.name)}</span></a>`) : '';
  const sticker = post.sticker ? `<img class="sticker-inline" src="${post.sticker.dataUrl}" alt="${escapeHtml(post.sticker.name)}" />` : '';
  return `<article class="post-card">
    <header class="post-head">
      <div class="inline-stack">
        ${avatar(post.author, 'sm')}
        <div>
          <button class="text-link strong" data-action="open-profile" data-handle="${post.author?.handleCanonical || post.author?.handle?.toLowerCase()}">${escapeHtml(post.author?.displayName || '')}</button>
          <span>@${escapeHtml(post.author?.handle || '')} · ${formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
      </div>
      <div class="inline-stack">${post.kind === 'devlog' ? '<span class="surface-pill surface-work">DEVLOG</span>' : ''}<button class="icon-button compact" data-action="open-modal" data-modal="post-info" data-post-id="${post.id}" title="Post info">${icons.info}</button>${post.ownedBySession ? `<button class="icon-button compact" data-action="edit-post" data-id="${post.id}" title="${t('update')}">${icons.settings}</button>` : ''}</div>
    </header>
    ${post.title ? `<h3>${escapeHtml(post.title)}</h3>` : ''}
    <div class="post-body">${renderMarkdown(post.body)}</div>
    ${attachment}
    ${sticker}
    <footer class="post-actions">
      <button class="inline-button ${post.likedByViewer ? 'active' : ''}" data-action="like-post" data-id="${post.id}" aria-label="Like" aria-pressed="${post.likedByViewer ? 'true' : 'false'}" title="${post.likedByViewer ? 'Unlike' : 'Like'}">${icons.heart}<span>${post.likeCount}</span></button>
      <button class="inline-button" data-action="reply-post" data-id="${post.id}" aria-label="Reply" title="Reply">${icons.comment}<span>${post.commentCount}</span></button>
      <button class="inline-button" data-action="share-post" data-id="${post.id}" aria-label="Share" title="Share">${icons.share}<span>${t('copyLink')}</span></button>
    </footer>
    ${renderComments(post.id)}
  </article>`;
}
function renderComments(postId) {
  const entry = state.feed.comments[postId];
  if (!entry?.open) return '';
  const list = entry.items || [];
  return `<div class="comments-block">
    ${list.length ? list.map((comment) => `<div class="comment-row">${avatar(comment.author, 'xs')}<div class="comment-body"><div class="comment-head"><button class="text-link strong" data-action="open-profile" data-handle="${comment.author?.handleCanonical || comment.author?.handle?.toLowerCase()}">${escapeHtml(comment.author?.displayName || '')}</button><span class="comment-meta">@${escapeHtml(comment.author?.handle || '')} · ${formatDate(comment.createdAt)}</span></div><div class="post-body">${renderMarkdown(comment.body || '')}</div>${comment.sticker ? `<img class="sticker-inline" src="${comment.sticker.dataUrl}" alt="${escapeHtml(comment.sticker.name)}" />` : ''}</div></div>`).join('') : '<p class="comment-empty">Be the first to reply.</p>'}
    ${currentUser() && !isGuestSession() ? `
      <form class="comment-form" data-form="comment" data-post-id="${postId}">
        <input type="text" name="body" placeholder="Write your reply…" data-reply-input="${postId}" maxlength="1800" />
        <button class="icon-button compact primary-send" type="submit" aria-label="Send reply">${icons.plane}</button>
      </form>` : ''}
  </div>`;
}

function renderDiscover() {
  return `
    <section class="section-shell page-heading-row">
      <div><span class="eyebrow">discover</span><h1>${t('discover')}</h1></div>
      <div class="page-tools">${searchControl('discover')}</div>
    </section>
    <section class="section-shell discover-grid">
      <div><div class="section-heading"><h2>${t('popularUsers')}</h2></div><div class="stack-list">${state.discover.users.map(renderUserCard).join('') || renderEmpty('No users.')}</div></div>
      <div><div class="section-heading"><h2>${t('recentProjects')}</h2></div><div class="stack-list">${state.discover.projects.map(renderProjectCard).join('') || renderEmpty('No projects.')}</div></div>
      <div><div class="section-heading"><h2>${t('creatorSites')}</h2></div><div class="stack-list">${state.discover.sites.map(renderSiteCard).join('') || renderEmpty('No sites.')}</div></div>
      <div><div class="section-heading"><h2>${t('openSpaces')}</h2></div><div class="stack-list">${state.discover.rooms.map(renderRoomCard).join('') || renderEmpty('No rooms.')}</div></div>
    </section>
    ${renderAdBanner()}
  `;
}

function renderProfilePage() {
  const payload = state.profile || (state.route.name === 'profile' && currentUser() && (!state.route.handle || state.route.handle === currentUser().handleCanonical) ? { profile: currentUser(), projects: state.me?.projects || [], sites: state.me?.sites || [], posts: state.me?.posts || [], verification: state.me?.verificationRequests?.[0] } : null);
  if (!payload || !payload.profile) return renderLoading();
  const user = payload.profile;
  const projects = Array.isArray(payload.projects) ? payload.projects : [];
  const sites = Array.isArray(payload.sites) ? payload.sites : [];
  const posts = Array.isArray(payload.posts) ? payload.posts : [];
  const stats = user.stats || {};
  const isSelf = currentUser() && user.handleCanonical === currentUser().handleCanonical;
  return `
    <section class="profile-hero section-shell">
      <div class="profile-banner">${user.bannerUrl ? `<img src="${user.bannerUrl}" alt="banner" />` : '<div class="banner-fallback"></div>'}</div>
      <div class="profile-header-card">
        <div class="profile-main">${avatar(user, 'xl')}
          <div class="profile-copy">
            <div class="profile-title-row"><h1>${escapeHtml(user.displayName || user.handle || '')}</h1>${badgePills(user)}</div>
            <span>@${escapeHtml(user.handle || '')}</span>
            ${user.bio ? `<p>${escapeHtml(user.bio)}</p>` : user.isPrivate ? `<p>${t('hiddenByPrivacy')}</p>` : ''}
            <div class="profile-stats">
              <button class="stat-chip" data-action="open-modal" data-modal="profile-list" data-handle="${escapeHtml(user.handleCanonical || '')}" data-list="projects"><strong>${stats.projects ?? projects.length ?? 0}</strong><span>${t('projects')}</span></button>
              <button class="stat-chip" data-action="open-modal" data-modal="profile-list" data-handle="${escapeHtml(user.handleCanonical || '')}" data-list="sites"><strong>${stats.sites ?? sites.length ?? 0}</strong><span>${t('sites')}</span></button>
              <button class="stat-chip" data-action="open-modal" data-modal="profile-list" data-handle="${escapeHtml(user.handleCanonical || '')}" data-list="followers"><strong>${stats.followers ?? 0}</strong><span>${t('followers') || 'followers'}</span></button>
              <button class="stat-chip" data-action="open-modal" data-modal="profile-list" data-handle="${escapeHtml(user.handleCanonical || '')}" data-list="following"><strong>${stats.following ?? 0}</strong><span>${t('following') || 'following'}</span></button>
            </div>
            ${renderProfileLinks(user)}
          </div>
        </div>
        <div class="profile-actions">
          ${isSelf ? `<button class="soft-button" data-action="nav" data-path="/settings">${icons.settings}<span>${t('settings')}</span></button><button class="primary-button" data-action="open-modal" data-modal="project">${icons.plus}<span>${t('createProject')}</span></button>` : `<button class="soft-button" data-action="start-chat" data-handle="${user.handleCanonical}" data-surface="personal">${icons.message}<span>${t('message')}</span></button><button class="soft-button" data-action="friend-request" data-handle="${user.handleCanonical}">${icons.people}<span>${t('addFriend')}</span></button><button class="soft-button" data-action="toggle-follow" data-handle="${user.handleCanonical}">${icons.star}<span>${user.relation?.following ? t('unfollow') : t('follow')}</span></button>`}
        </div>
      </div>
    </section>
    <section class="section-shell split-grid profile-grid">
      <div data-section="projects">
        <div class="section-heading"><h2>${t('projects')}</h2></div>
        <div class="stack-list">${projects.length ? projects.map(renderProjectCard).join('') : renderEmpty(t('noProjects'))}</div>
        <div class="section-heading top-space"><h2>${t('sites')}</h2></div>
        <div class="stack-list">${sites.length ? sites.map((site) => isSelf ? renderOwnedSiteCard(site) : renderSiteCard(site)).join('') : renderEmpty(t('noSites'))}</div>
      </div>
      <div>
        <div class="section-heading"><h2>${t('activity')}</h2></div>
        <div class="stack-list">${posts.length ? posts.map(renderPostCard).join('') : renderEmpty(t('noPosts'))}</div>
      </div>
    </section>`;
}

function getActiveProfilePayload(handle = '') {
  const ownHandle = currentUser()?.handleCanonical || '';
  if (state.profile?.profile && (!handle || state.profile.profile.handleCanonical === handle)) return state.profile;
  if (state.route.name === 'profile' && currentUser() && (!state.route.handle || state.route.handle === ownHandle) && (!handle || handle === ownHandle)) {
    return {
      profile: currentUser(),
      projects: state.me?.projects || [],
      sites: state.me?.sites || [],
      posts: state.me?.posts || [],
      verification: state.me?.verificationRequests?.[0]
    };
  }
  return null;
}

function chatCollections(bootstrap) {
  return {
    groups: bootstrap?.segments?.groups || [],
    personal: bootstrap?.segments?.personal || [],
    work: bootstrap?.segments?.work || [],
    friends: bootstrap?.segments?.friends || []
  };
}

function findExistingDirectRoom(handle, surface = 'personal') {
  const wanted = String(handle || '').trim().toLowerCase();
  if (!wanted) return null;
  return (state.chat.bootstrap?.rooms || []).find((room) => (
    room?.kind === 'direct'
    && room?.surface === surface
    && ((room.otherUser?.handleCanonical || room.otherUser?.handle || '').toLowerCase() === wanted)
  )) || null;
}

function renderProjectPage() {
  const payload = state.project;
  if (!payload) return renderLoading();
  return `
    <section class="project-hero section-shell">
      <span class="eyebrow">${escapeHtml(payload.project.category || 'project')}</span>
      <h1>${escapeHtml(payload.project.title)}</h1>
      <p>${escapeHtml(payload.project.summary || '')}</p>
      <div class="tag-row">${(payload.project.tags || []).map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join('')}</div>
      ${payload.project.site ? `<a class="primary-button" href="${payload.project.site.path}">${icons.external}<span>${t('openSite')}</span></a>` : ''}
    </section>
    <section class="section-shell split-grid">
      <div class="prose-card"><p>${escapeHtml(payload.project.description || '')}</p></div>
      <div class="stack-list">${payload.posts?.map(renderPostCard).join('') || renderEmpty(t('noPosts'))}</div>
    </section>`;
}

function renderMessagesPage() {
  if (!currentUser() || isGuestSession()) return renderGate('Create an account to access chats, groups and workspaces.');
  const bootstrap = state.chat.bootstrap;
  const { groups, personal, work, friends } = chatCollections(bootstrap);
  const messageStyle = resolveMessageStyle();
  const chatTheme = resolveChatTheme(state.chat.room?.slug);
  const activeTab = ['groups', 'personal', 'work', 'friends'].includes(state.chat.tab) ? state.chat.tab : 'personal';
  const rows = activeTab === 'personal' ? personal
             : activeTab === 'work' ? work
             : activeTab === 'groups' ? groups
             : friends;
  const onlineCount = friends.filter(f => f.online).length;
  return `
    <section class="chat-shell view-${state.chat.mobileView} ${state.chat.room ? 'has-room' : 'no-room'}">
      <aside class="chat-list ${state.chat.mobileView === 'room' ? 'mobile-hidden' : ''}">
        <div class="chat-list-head">
          <div class="chat-list-title">
            <h1>${t('messages')}</h1>
            <button class="icon-button primary compact" data-action="open-modal" data-modal="group" title="${t('createGroup')}">${icons.plus}</button>
          </div>
          ${searchControl('chat', t('search') + '…')}
          <div class="chat-sub-tabs four-col">
            <button class="chat-sub-tab ${activeTab === 'personal' ? 'active' : ''}" data-action="chat-tab" data-value="personal">${t('personal')}</button>
            <button class="chat-sub-tab ${activeTab === 'work' ? 'active' : ''}" data-action="chat-tab" data-value="work">${currentLang() === 'ru' ? 'Бизнес' : 'Business'}</button>
            <button class="chat-sub-tab ${activeTab === 'groups' ? 'active' : ''}" data-action="chat-tab" data-value="groups">${t('groups')}</button>
            <button class="chat-sub-tab ${activeTab === 'friends' ? 'active' : ''}" data-action="chat-tab" data-value="friends">${t('friends') || 'Friends'}${friends.length ? ` <em class="tab-count">${friends.length}${onlineCount ? `·${onlineCount}` : ''}</em>` : ''}</button>
          </div>
        </div>
        <div class="chat-items">${renderChatTabItems(rows)}</div>
      </aside>
      <section class="chat-main message-style-${messageStyle} ${!state.chat.room ? 'empty' : ''}" style="${escapeHtml(chatThemeInlineStyle(chatTheme))}">
        ${state.chat.room ? renderChatRoom(state.chat.room) : `<div class="chat-placeholder"><div class="chat-placeholder-art">${icons.message}</div><h3>${t('messages')}</h3><p>${t('noRoom')}</p></div>`}
      </section>
    </section>`;
}
function chatSegmentButton(value, label) {
  return `<button class="segment-button ${state.chat.tab === value ? 'active' : ''}" data-action="chat-tab" data-value="${value}">${label}</button>`;
}
function renderChatTabItems(items) {
  // FIX: apply search filter from chat search input
  if (state.chat.search && items?.length) {
    const q = state.chat.search.toLowerCase();
    items = items.filter(item => {
      if (state.chat.tab === 'friends' || state.chat.tab === 'following') {
        return (item.displayName + ' ' + item.handle).toLowerCase().includes(q);
      }
      return (item.title + ' ' + (item.description || '') + ' ' + (item.lastMessagePreview || '')).toLowerCase().includes(q);
    });
  }
  if (!items?.length) return renderEmpty('Nothing here yet.');
  if (state.chat.tab === 'friends' || state.chat.tab === 'following') {
    return items.map((user) => `<article class="chat-row user-row" data-hover-user="${user.handleCanonical || user.handle.toLowerCase()}">
      ${avatar(user, 'sm')}
      <div class="chat-row-copy"><button class="text-link strong" data-action="open-profile" data-handle="${user.handleCanonical || user.handle.toLowerCase()}">${escapeHtml(user.displayName)}</button><span>@${escapeHtml(user.handle)}</span></div>
      <div class="row-actions"><button class="icon-button compact" data-action="start-chat" data-handle="${user.handleCanonical}" data-surface="personal" title="${t('message')}">${icons.message}</button><button class="icon-button compact" data-action="start-chat" data-handle="${user.handleCanonical}" data-surface="work" title="work">${icons.file}</button></div>
    </article>`).join('');
  }
  return items.map((room) => `<article class="chat-row room-row ${state.chat.selectedSlug === room.slug ? 'active' : ''}" data-hover-room="${room.slug}">
      <button class="row-link" data-action="open-room" data-slug="${room.slug}">
        ${roomAvatar(room, 'sm')}
        <div class="chat-row-copy">
          <div class="row-title-line"><strong>${escapeHtml(room.title)}</strong><span class="surface-pill surface-${room.surface}">${roomSurfaceShort(room)}</span></div>
          <span>${escapeHtml(room.lastMessagePreview || roomPremiumSummary(room) || room.description || '')}</span>
        </div>
      </button>
      <div class="row-actions">
        ${room.joined ? `<button class="icon-button compact" title="${t('pin')}" data-action="room-state" data-slug="${room.slug}" data-state="pinned" data-value="${!room.state?.pinned}">${icons.pin}</button>` : renderRoomPrimaryAction(room, true)}
      </div>
    </article>`).join('');
}
function formatDateDivider(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return t('today') || 'Today';
  const y = new Date(now); y.setDate(y.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return t('yesterday') || 'Yesterday';
  const sameYear = d.getFullYear() === now.getFullYear();
  return d.toLocaleDateString(currentLang(), sameYear
    ? { month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderMessagesWithDividers(room) {
  const msgs = state.chat.messages || [];
  if (!msgs.length) return '';
  let lastKey = '';
  const out = [];
  for (const m of msgs) {
    const d = new Date(m.createdAt);
    const key = Number.isNaN(d.getTime()) ? '' : d.toDateString();
    if (key && key !== lastKey) {
      out.push(`<div class="date-divider"><span>${escapeHtml(formatDateDivider(m.createdAt))}</span></div>`);
      lastKey = key;
    }
    out.push(renderMessageBubble(room, m));
  }
  return out.join('');
}

function renderRoomAccessBanner(room) {
  if (!room || room.kind === 'direct') return '';
  if (roomNeedsUpgrade(room)) {
    const label = room.subscription?.requiredPlanLabel || planLabel(room.subscription?.requiredPlanId);
    return `<div class="chat-empty-msg">
      <strong>${currentLang() === 'ru' ? 'Доступ по подписке' : 'Subscription access'}</strong>
      <p>${currentLang() === 'ru' ? `Эта группа открывается с плана ${label}.` : `This room unlocks with the ${label} plan.`}</p>
      <div class="detail-actions"><button class="primary-button" type="button" data-action="room-upgrade" data-slug="${room.slug}">${icons.card}<span>${currentLang() === 'ru' ? 'Выбрать план' : 'Choose plan'}</span></button></div>
    </div>`;
  }
  if (!room.joined) {
    return `<div class="chat-empty-msg">
      <strong>${currentLang() === 'ru' ? 'Публичный preview' : 'Public preview'}</strong>
      <p>${currentLang() === 'ru' ? 'Можно читать историю до вступления, но писать смогут только участники.' : 'You can read before joining, but only members can post.'}</p>
      <div class="detail-actions"><button class="primary-button" type="button" data-action="join-room" data-slug="${room.slug}">${icons.plus}<span>${currentLang() === 'ru' ? 'Вступить' : 'Join room'}</span></button></div>
    </div>`;
  }
  if (!room.canPost) {
    return `<div class="chat-empty-msg">
      <strong>${currentLang() === 'ru' ? 'Только админы могут писать' : 'Only admins can post'}</strong>
      <p>${currentLang() === 'ru' ? 'Этот чат переведён в режим канала.' : 'This room is currently in channel mode.'}</p>
    </div>`;
  }
  return '';
}

function renderReadOnlyChannelComposer(room) {
  const isRu = currentLang() === 'ru';
  return `<div class="chat-composer chat-composer-disabled">
    <div class="composer-disabled-banner">
      <strong>${isRu ? 'Режим канала' : 'Channel mode'}</strong>
      <span>${isRu
        ? 'Писать могут только владелец, админы и модераторы. Участники и подписчики читают историю как в канале Telegram.'
        : 'Only the owner, admins and moderators can post. Members and subscribers stay in read-only channel mode.'}</span>
    </div>
  </div>`;
}

function renderRoomComposer(room) {
  if (!room) return '';
  if (!room.canPost) {
    if (room.kind !== 'direct' && room.joined && room.permissions?.posting === 'admins' && !roomNeedsUpgrade(room)) {
      return renderReadOnlyChannelComposer(room);
    }
    return '';
  }
  return `<form class="chat-composer" data-form="send-message">
      ${state.chat.attachment ? `<div class="composer-preview">
        ${state.chat.attachment.type === 'audio'
          ? `<audio class="composer-audio" controls src="${state.chat.attachment.dataUrl}"></audio>`
          : `<img src="${state.chat.attachment.dataUrl}" alt="attachment" data-action="open-lightbox" data-src="${state.chat.attachment.dataUrl}" />`}
        <div class="preview-meta">
          <strong>${escapeHtml(state.chat.attachment.name || 'Image')}</strong>
          ${state.chat.attachment.type === 'audio'
            ? `<span>${state.chat.attachment.duration || 0}s</span>`
            : `<span>${state.chat.attachment.width || ''}×${state.chat.attachment.height || ''}</span>`}
          <span class="preview-hint">${state.chat.attachment.type === 'audio' ? (t('pressSendVoice') || 'Press send to share voice message.') : (t('addCaptionHint') || 'Add a caption below and press send.')}</span>
        </div>
        <button type="button" class="icon-button compact" data-action="clear-chat-attachment" title="${t('remove') || 'Remove'}">${icons.close}</button>
      </div>` : ''}
      ${(state.chat.attachments || []).length ? `<div class="composer-gallery-preview">
        ${state.chat.attachments.map((a, i) => `<div class="composer-gallery-item">
          <img src="${a.dataUrl}" alt="${escapeHtml(a.name || ('Image ' + (i+1)))}" />
          <button type="button" class="composer-gallery-remove" data-action="remove-chat-attachment" data-index="${i}" title="${t('remove') || 'Remove'}">${icons.close}</button>
        </div>`).join('')}
        ${state.chat.attachments.length < 10 ? `<button type="button" class="composer-gallery-add" data-action="attach-chat-image" title="${t('addPhotos') || 'Add more'}">+</button>` : ''}
      </div>` : ''}
      <div class="composer-shell">
        <button type="button" class="icon-button compact" data-action="attach-chat-image" title="${t('addPhotos')}">${icons.image}</button>
        <button type="button" class="icon-button compact ${state.chat.mediaPicker ? 'active-tint' : ''}" data-action="toggle-media-picker" title="Emoji & stickers">${icons.sticker}</button>
        <textarea id="chat-textarea" name="body" rows="1" placeholder="${t('writeMessage')}"></textarea>
        <button type="button" class="icon-button compact ${state.chat.recording ? 'recording-active' : ''}" data-action="toggle-voice-record" title="${state.chat.recording ? (t('stopRecording') || 'Stop') : (t('recordVoice') || 'Voice message')}">${state.chat.recording ? icons.record : icons.mic}</button>
        <button class="icon-button primary-send" type="submit" title="${t('send')}">${icons.plane}</button>
      </div>
      <input type="file" id="chat-file-input" accept="image/*" multiple hidden />
    </form>`;
}

function renderChatRoom(room) {
  const unread = state.chat.unreadCount || 0;
  return `
    <header class="chat-room-head">
      <div class="inline-stack">${window.matchMedia('(max-width: 900px)').matches ? `<button class="icon-button compact" data-action="chat-back">${icons.chevronLeft}</button>` : ''}${roomAvatar(room, 'sm')}<div><strong>${escapeHtml(room.title)}</strong><span>${escapeHtml(room.description || '')}</span></div></div>
      <div class="inline-stack">${room.subscription?.enabled ? `<span class="surface-pill surface-group">${escapeHtml(roomPremiumSummary(room))}</span>` : ''}${(room.tags || []).map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join('')}<button class="icon-button compact" data-action="open-chat-settings" data-slug="${room.slug}" title="${t('details')}">${icons.more}</button></div>
    </header>
    ${renderRoomAccessBanner(room)}
    <div class="chat-message-list" id="chat-scroll">${state.chat.previewOnly ? '' : renderMessagesWithDividers(room)}</div>
    <button type="button" class="jump-to-latest" id="jump-to-latest" data-action="jump-to-latest" hidden>${icons.chevronLeft}<span class="jump-count" id="jump-count">${unread > 0 ? unread : ''}</span></button>
    ${renderTypingIndicator(room)}
    ${state.chat.emojiPickerMsgId ? `<div class="composer-overlay-slot">${renderEmojiPicker()}</div>` : ''}
    ${state.chat.replyingToMessage ? renderReplyBar() : ''}
    ${state.chat.mediaPicker ? `<div style="position:relative">${renderMediaPicker()}</div>` : ''}
    ${renderRoomComposer(room)}`;
}

function findStickerFromPacks(stickerId) {
  const packs = Array.isArray(state.me?.stickers) ? state.me.stickers : [];
  for (const pack of packs) {
    const sticker = (pack.stickers || []).find((item) => Number(item.id) === Number(stickerId));
    if (sticker) return sticker;
  }
  return null;
}

function getMessageDeliveryStatus(room, message) {
  if (!room || room.kind !== 'direct' || !message?.ownedBySession) return null;
  if (message.pending) return { key: 'sending', label: t('statusSending'), icon: '' };
  const otherUserId = Number(room.otherUser?.id || 0);
  const readReceipt = Number((state.readReceipts[room.slug] || {})[otherUserId] || 0);
  const isRead = readReceipt >= Number(message.id || 0);
  if (room.surface === 'work') {
    if (message.confirmedAt) return { key: 'confirmed', label: t('statusConfirmed'), icon: icons.statusConfirmed };
    if (isRead) return { key: 'read', label: t('statusReadPendingConfirm'), icon: icons.statusRead };
    return { key: 'sent', label: t('statusSentUnread'), icon: icons.statusSent };
  }
  if (isRead) return { key: 'read', label: t('statusRead'), icon: icons.statusConfirmed };
  return { key: 'sent', label: t('statusSentUnread'), icon: icons.statusSent };
}

function canConfirmMessage(room, message) {
  return Boolean(
    room
    && room.kind === 'direct'
    && room.surface === 'work'
    && !message?.ownedBySession
    && !message?.pending
    && !message?.deleted
    && !message?.confirmedAt
  );
}

function renderMessageStatusControl(room, message) {
  const status = getMessageDeliveryStatus(room, message);
  if (!status || !status.icon) return '';
  return `<button class="message-status-btn ${status.key}" type="button" data-action="message-status-info" data-label="${escapeHtml(status.label)}" title="${escapeHtml(status.label)}" aria-label="${escapeHtml(status.label)}">${status.icon}</button>`;
}

function renderMessageBubble(room, message) {
  const own = message.ownedBySession;
  const gallery = Array.isArray(message.attachments) && message.attachments.length > 1 ? message.attachments : null;
  let attachment = '';
  if (gallery) {
    const count = gallery.length;
    const countCls = count <= 4 ? `count-${count}` : 'count-many';
      const shown = gallery.slice(0, 9);
      const extra = count - shown.length;
      attachment = `<div class="message-gallery ${countCls}">
      ${shown.map((a, i) => {
        const isLast = (i === shown.length - 1) && extra > 0;
        const media = a.type === 'video'
          ? `<video src="${a.url}" muted playsinline preload="metadata" data-action="open-lightbox" data-src="${a.url}" data-media-type="video" data-alt="${escapeHtml(a.name || 'video')}"></video>`
          : `<img src="${a.url}" alt="${escapeHtml(a.name || 'image')}" data-action="open-lightbox" data-src="${a.url}" data-media-type="${escapeHtml(a.type || 'image')}" data-alt="${escapeHtml(a.name || 'image')}" loading="lazy" />`;
        return `<div class="${isLast ? 'message-gallery-more' : ''}" ${isLast ? `data-extra="+${extra}"` : ''}>
          ${media}
        </div>`;
      }).join('')}
    </div>`;
  } else if (message.attachment?.url) {
    attachment = message.attachment.type === 'audio'
      ? `<audio class="message-audio" controls preload="metadata" src="${message.attachment.url}"></audio>`
      : message.attachment.type === 'video'
        ? `<video class="message-image clickable-img" src="${message.attachment.url}" playsinline muted preload="metadata" data-action="open-lightbox" data-src="${message.attachment.url}" data-media-type="video" data-alt="${escapeHtml(message.attachment.name || 'video')}"></video>`
        : `<img class="message-image clickable-img" src="${message.attachment.url}" alt="${escapeHtml(message.attachment.name || 'image')}" data-action="open-lightbox" data-src="${message.attachment.url}" data-media-type="${escapeHtml(message.attachment.type || 'image')}" data-alt="${escapeHtml(message.attachment.name || 'image')}" />`;
  }
  const sticker = message.sticker ? `<img class="message-sticker" src="${message.sticker.dataUrl}" alt="${escapeHtml(message.sticker.name)}" />` : '';
  // Reply preview
  const replyPreview = message.replyTo
    ? `<div class="reply-preview"><span class="reply-author">${escapeHtml(message.replyTo.author?.displayName || '')}</span><span>${escapeHtml((message.replyTo.body || '').slice(0, 80))}</span></div>`
    : '';
  // Reactions grouped
  const reactionsHtml = (message.reactions || []).length
    ? `<div class="reactions-row">${message.reactions.map(r =>
        `<button class="reaction-btn ${r.me ? 'mine' : ''}" data-action="toggle-reaction" data-msg-id="${message.id}" data-room-slug="${room?.slug}" data-emoji="${escapeHtml(r.emoji)}">${escapeHtml(r.emoji)} <span>${r.count}</span></button>`
      ).join('')}</div>`
    : '';
  const editTag = message.edited ? '<span class="edit-tag">(edited)</span>' : '';
  const statusControl = renderMessageStatusControl(room, message);
  const confirmButton = canConfirmMessage(room, message)
    ? `<button class="message-confirm-btn" type="button" data-action="confirm-message" data-msg-id="${message.id}" data-room-slug="${room?.slug}" title="${t('confirmReceipt')}">${icons.statusConfirmed}<span>${t('confirmReceipt')}</span></button>`
    : '';
  const footerHtml = reactionsHtml || confirmButton ? `<div class="message-footer-row">${reactionsHtml}${confirmButton}</div>` : '';
  // Hover actions
  const actions = message.deleted || message.pending ? '' : `<div class="msg-actions">
    <button class="msg-action-btn" data-action="reply-message" data-msg-id="${message.id}" title="Reply">${icons.comment}</button>
    <button class="msg-action-btn" data-action="react-emoji" data-msg-id="${message.id}" title="React">${icons.smile}</button>
    ${own ? `<button class="msg-action-btn" data-action="edit-message" data-msg-id="${message.id}" title="Edit">${icons.edit}</button>` : ''}
    ${own || room?.currentRole === 'owner' || room?.currentRole === 'admin' || room?.currentRole === 'moderator'
      ? `<button class="msg-action-btn danger" data-action="delete-message" data-msg-id="${message.id}" data-room-slug="${room?.slug}" title="Delete">${icons.trash}</button>`
      : ''}
  </div>`;
  const bodyHtml = message.deleted
    ? '<p class="deleted-msg">[deleted]</p>'
    : (state.chat.editingMessageId === message.id
        ? `<div class="edit-form">
            <textarea class="edit-textarea" id="edit-ta-${message.id}">${escapeHtml(message.displayBody || '')}</textarea>
            <div class="edit-actions">
              <button class="soft-button compact" data-action="cancel-edit">Cancel</button>
              <button class="primary-button compact" data-action="confirm-edit" data-msg-id="${message.id}" data-room-slug="${room?.slug}">Save</button>
            </div>
           </div>`
        : (message.displayBody ? `<div class="msg-body">${renderMarkdown(message.displayBody)}</div>` : '')
      );
  return `<article class="message-row ${own ? 'own' : ''} ${message.deleted ? 'deleted' : ''}" id="msg-${message.id}">
    ${!own ? avatar(message.author, 'xs') : ''}
    <div class="message-bubble-wrap">
      ${replyPreview}
      <div class="message-bubble ${state.chat.editingMessageId === message.id ? 'editing' : ''}">
        <div class="message-meta">
          <button class="text-link strong" data-action="open-profile" data-handle="${message.author?.handleCanonical || message.author?.handle?.toLowerCase()}">${escapeHtml(message.author?.displayName || '')}</button>
          <span title="${message.createdAt}">${formatDate(message.createdAt, 'time')}</span>
          ${editTag}
          ${statusControl}
        </div>
        ${bodyHtml}
        ${attachment}${sticker}
      </div>
      ${footerHtml}
      ${actions}
    </div>
  </article>`;
}

function renderMediaPicker() {
  const tab = state.chat.mediaTab || 'emoji';
  const search = (state.chat.mediaSearch || '').toLowerCase();
  const packs = state.me?.stickers || [];
  const activePack = packs.find(p => String(p.id) === String(state.chat.mediaPackId)) || packs[0];

  let body = '';

  if (tab === 'emoji') {
    const cats = Object.entries(EMOJI_DATA);
    let html = '';
    for (const [cat, emojis] of cats) {
      const filtered = search ? emojis.filter(e => e.includes(search)) : emojis;
      if (!filtered.length) continue;
      html += `<div class="emoji-category-label">${cat}</div><div class="emoji-full-grid">`;
      for (const e of filtered) {
        html += `<button type="button" class="emoji-full-btn" data-action="insert-emoji" data-emoji="${e}">${e}</button>`;
      }
      html += `</div>`;
    }
    body = html || '<p style="color:var(--text-muted);text-align:center;padding:20px">No results</p>';
  }

  if (tab === 'sticker') {
    if (!packs.length) {
      body = `<div class="media-picker-empty">
        <div class="media-picker-empty-icon">${iconBadge('sticker', 'neutral')}</div>
        <p style="margin:0 0 12px">No sticker packs yet</p>
        <button class="soft-button" data-action="open-modal" data-modal="stickers">Add packs</button>
      </div>`;
    } else {
      const pack = search ? null : activePack;
      const stickersToShow = pack ? pack.stickers.filter(s => !search || s.name.toLowerCase().includes(search))
        : packs.flatMap(p => p.stickers).filter(s => !search || s.name.toLowerCase().includes(search));
      const label = pack ? escapeHtml(pack.title) : 'All stickers';
      body = `<div class="sticker-pack-label">${label}</div>
        <div class="sticker-full-grid">
          ${stickersToShow.map(s => `<button type="button" class="sticker-full-btn" data-action="pick-sticker" data-id="${s.id}">
            <img src="${s.dataUrl}" alt="${escapeHtml(s.name)}" />
          </button>`).join('')}
        </div>`;
      if (!stickersToShow.length) body = '<p style="color:var(--text-muted);text-align:center;padding:20px">No stickers</p>';
    }
  }

  if (tab === 'gif') {
    const gifs = state.chat.gifResults || [];
    const gifSearch = state.chat.mediaSearch || '';
    body = `<div>
      ${!gifSearch && !gifs.length ? `
        <div class="media-picker-empty">
          <div class="media-picker-empty-icon">${iconBadge('film', 'neutral')}</div>
          <p style="margin:0;font-size:13px">Search for a GIF above</p>
        </div>` : ''}
      ${gifs.length ? `<div class="gif-grid">
        ${gifs.map(g => `<button type="button" class="gif-item" data-action="send-gif" data-url="${escapeHtml(g.url)}" data-preview="${escapeHtml(g.preview)}">
          <img src="${escapeHtml(g.preview)}" alt="${escapeHtml(g.title)}" loading="lazy" />
        </button>`).join('')}
      </div>` : (gifSearch ? `<p style="text-align:center;color:var(--text-muted);padding:20px;margin:0">No results for "${escapeHtml(gifSearch)}"</p>` : '')}
    </div>`;
  }

  // Bottom pack selector tabs (sticker tab only)
  const packTabs = tab === 'sticker' && packs.length > 1 ? `
    <div class="media-picker-tabs-bottom">
      <button type="button" class="pack-tab-icon ${!state.chat.mediaPackId ? 'active' : ''}" data-action="pick-media-pack" data-pack-id="">${icons.grid}</button>
      ${packs.map(p => {
        const first = p.stickers[0];
        return `<button type="button" class="pack-tab-icon ${String(state.chat.mediaPackId) === String(p.id) ? 'active' : ''}" data-action="pick-media-pack" data-pack-id="${p.id}" title="${escapeHtml(p.title)}">${first ? `<img src="${first.dataUrl}" alt="" />` : icons.sticker}</button>`;
      }).join('')}
    </div>` : '';

  return `<div class="media-picker">
    <div class="media-picker-tabs">
      <button type="button" class="media-picker-tab ${tab === 'emoji' ? 'active' : ''}" data-action="media-tab" data-tab="emoji">${icons.smile}<span>Emoji</span></button>
      <button type="button" class="media-picker-tab ${tab === 'sticker' ? 'active' : ''}" data-action="media-tab" data-tab="sticker">${icons.sticker}<span>Stickers</span></button>
      <button type="button" class="media-picker-tab ${tab === 'gif' ? 'active' : ''}" data-action="media-tab" data-tab="gif">${icons.film}<span>GIF</span></button>
      <button type="button" class="media-picker-tab media-picker-tab-close" data-action="close-media-picker">${icons.close}</button>
    </div>
    <div class="media-picker-search">
      <input type="text" placeholder="Search ${tab}s…" data-input="media-search" value="${escapeHtml(state.chat.mediaSearch || '')}" />
    </div>
    <div class="media-picker-body">${body}</div>
    ${packTabs}
  </div>`;
}

function renderRoomSettingsEditor(room) {
  if (!['owner', 'admin', 'moderator'].includes(room?.currentRole)) return '';
  const plans = state.meta?.subscriptions || [];
  const subPlan = room.subscription?.requiredPlanId || '';
  return `<div class="detail-card">
    <h4>${currentLang() === 'ru' ? 'Управление комнатой' : 'Room settings'}</h4>
    <form class="settings-form" data-form="edit-room-settings" data-room="${room.slug}">
      <label><span>${t('title')}</span><input name="title" value="${escapeHtml(room.title || '')}" /></label>
      <label><span>${t('summary')}</span><textarea name="description" rows="3">${escapeHtml(room.description || '')}</textarea></label>
      <div class="settings-grid-two">
        <label><span>${t('visibility')}</span><select name="visibility">
          <option value="open" ${room.visibility === 'open' ? 'selected' : ''}>Open</option>
          <option value="private" ${room.visibility === 'private' ? 'selected' : ''}>${t('private')}</option>
          <option value="secret" ${room.visibility === 'secret' ? 'selected' : ''}>Secret</option>
        </select></label>
        <label><span>${currentLang() === 'ru' ? 'Режим публикации' : 'Posting mode'}</span><select name="posting">
          <option value="everyone" ${room.permissions?.posting !== 'admins' ? 'selected' : ''}>${currentLang() === 'ru' ? 'Пишут все участники' : 'Everyone can post'}</option>
          <option value="admins" ${room.permissions?.posting === 'admins' ? 'selected' : ''}>${currentLang() === 'ru' ? 'Только админы' : 'Only admins'}</option>
        </select></label>
      </div>
      <label><span>${t('tags')}</span><input name="tags" value="${escapeHtml((room.tags || []).join(', '))}" placeholder="design, launch" /></label>
      <div class="settings-grid-two">
        <label><span>${currentLang() === 'ru' ? 'Premium-доступ' : 'Premium access'}</span><select name="subscriptionPlanId">
          <option value="">${currentLang() === 'ru' ? 'Не требуется' : 'No plan required'}</option>
          ${plans.map((plan) => `<option value="${plan.id}" ${subPlan === plan.id ? 'selected' : ''}>${escapeHtml(plan.label)}</option>`).join('')}
        </select></label>
        <label><span>${currentLang() === 'ru' ? 'Ссылка / slug' : 'Slug'}</span><input name="slug" value="${escapeHtml(room.slug || '')}" /></label>
      </div>
      <label><span>${currentLang() === 'ru' ? 'Текст для paywall' : 'Paywall note'}</span><textarea name="subscriptionNote" rows="2">${escapeHtml(room.subscription?.note || '')}</textarea></label>
      <button class="primary-button" type="submit">${t('save')}</button>
    </form>
  </div>`;
}

function renderRoomMembersTab(room) {
  if (!room.joined) {
    return `<div class="detail-card"><p class="muted">${currentLang() === 'ru' ? 'Сначала вступи в группу, чтобы увидеть участников.' : 'Join the room to see members.'}</p></div>`;
  }
  const members = state.memberListRoom === room.slug ? state.memberList : [];
  const canManage = ['owner', 'admin'].includes(room.currentRole);
  const canModerate = ['owner', 'admin', 'moderator'].includes(room.currentRole);
  return `<div class="detail-card">
    <div class="section-heading">
      <h4>${t('members')}</h4>
      <button class="inline-button compact" data-action="load-room-members" data-slug="${room.slug}">${state.memberListLoading && state.memberListRoom === room.slug ? (currentLang() === 'ru' ? 'Загрузка…' : 'Loading…') : (currentLang() === 'ru' ? 'Обновить' : 'Refresh')}</button>
    </div>
    ${canManage ? `<form class="settings-form" data-form="add-room-member" data-room="${room.slug}">
      <div class="settings-grid-two">
        <label><span>@handle</span><input name="handle" placeholder="username" /></label>
        <label><span>${currentLang() === 'ru' ? 'Роль' : 'Role'}</span><select name="role">
          <option value="member">${currentLang() === 'ru' ? 'Участник' : 'Member'}</option>
          <option value="moderator">${currentLang() === 'ru' ? 'Модератор' : 'Moderator'}</option>
          <option value="admin">${currentLang() === 'ru' ? 'Админ' : 'Admin'}</option>
        </select></label>
      </div>
      <button class="soft-button" type="submit">${icons.plus}<span>${currentLang() === 'ru' ? 'Добавить участника' : 'Add member'}</span></button>
    </form>` : ''}
    <div class="member-list">
      ${members.length ? members.map((member) => {
        const canEditRole = canManage && member.role !== 'owner';
        const canRemove = canModerate && Number(member.id) !== Number(currentUser()?.id) && !(member.role === 'owner' && room.currentRole !== 'owner');
        return `<article class="member-row">
          ${avatar(member, 'xs')}
          <span>${escapeHtml(member.displayName || member.handle)}</span>
          <span class="surface-pill surface-group">${escapeHtml(member.role)}</span>
          ${canEditRole ? `<form class="inline-stack" data-form="set-room-member-role" data-room="${room.slug}" data-user-id="${member.id}" style="gap:6px">
            <select name="role">
              <option value="member" ${member.role === 'member' ? 'selected' : ''}>${currentLang() === 'ru' ? 'Участник' : 'Member'}</option>
              <option value="moderator" ${member.role === 'moderator' ? 'selected' : ''}>${currentLang() === 'ru' ? 'Модератор' : 'Moderator'}</option>
              <option value="admin" ${member.role === 'admin' ? 'selected' : ''}>${currentLang() === 'ru' ? 'Админ' : 'Admin'}</option>
            </select>
            <button class="soft-button compact" type="submit">${currentLang() === 'ru' ? 'Применить' : 'Apply'}</button>
          </form>` : ''}
          ${canRemove ? `<button class="icon-button compact danger" data-action="remove-room-member" data-room-slug="${room.slug}" data-user-id="${member.id}" title="${t('remove')}">${icons.trash}</button>` : ''}
        </article>`;
      }).join('') : `<p class="muted">${currentLang() === 'ru' ? 'Список участников ещё не загружен.' : 'Member list not loaded yet.'}</p>`}
    </div>
  </div>`;
}

function renderChatSidebar(room) {
  const workspace = room.workspace;
  const pinned = state.pinnedMessages || [];
  const isDirect = room.kind === 'direct';
  const activeTab = state.chat.roomInfoTab || 'info';
  const tabList = isDirect ? ['info', 'media', 'links', 'voice'] : ['info', 'members', 'media', 'links', 'voice'];
  const tabLabel = (tab) => {
    if (tab === 'members') return currentLang() === 'ru' ? 'Участники' : 'Members';
    if (tab === 'media') return 'Media';
    if (tab === 'links') return 'Links';
    if (tab === 'voice') return 'Voice';
    return 'Info';
  };
  const tabs = `<div class="room-info-tabs">
    ${tabList.map((tab) => `<button class="room-info-tab ${activeTab === tab ? 'active' : ''}" data-action="room-info-tab" data-tab="${tab}" data-room-slug="${room.slug}"><span>${tabLabel(tab)}</span></button>`).join('')}
  </div>`;
  let body = '';
  if (activeTab === 'info') {
    body = `
      <div class="detail-card"><h4>${currentLang() === 'ru' ? 'Статус' : 'Status'}</h4><div class="tag-row"><span class="surface-pill surface-${room.surface}">${escapeHtml(roomSurfaceShort(room))}</span><span class="surface-pill surface-group">${escapeHtml(room.visibility || 'private')}</span>${room.subscription?.enabled ? `<span class="surface-pill surface-group">${escapeHtml(roomPremiumSummary(room))}</span>` : ''}</div><p>${escapeHtml(roomPostingSummary(room) || '')}</p></div>
      <div class="detail-card"><h4>${t('tags')}</h4><div class="tag-row">${(room.tags || []).map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join('') || '<span class="muted">none</span>'}</div></div>
      ${room.subscription?.enabled ? `<div class="detail-card"><h4>${currentLang() === 'ru' ? 'Подписка' : 'Subscription'}</h4><p>${escapeHtml(room.subscription?.note || roomPremiumSummary(room))}</p></div>` : ''}
      ${renderRoomChatThemeControls(room)}
      ${pinned.length > 0 ? `<div class="detail-card"><h4 class="detail-title-icon">${icons.pin}<span>Pinned (${pinned.length})</span></h4><div class="pinned-list">${pinned.slice(0, 5).map(m => `<div class="pinned-msg-item"><span class="pinned-author">${escapeHtml(m.author?.displayName || '')}</span><p>${escapeHtml((m.displayBody || m.body || '').slice(0, 80))}</p></div>`).join('')}</div></div>` : ''}
      ${workspace ? `<div class="detail-card"><div class="section-heading"><h4>Workspace</h4><button class="inline-button compact" data-action="open-workspace-settings" data-id="${workspace.id}">${icons.settings}</button></div><div class="inline-stack">${avatar(workspace.owner, 'xs')}<div><strong>${escapeHtml(workspace.title)}</strong><span>${escapeHtml(workspace.description || '')}</span></div></div></div>` : ''}
      <div class="detail-card"><h4>${t('tasks')}</h4><div class="task-list">${state.chat.tasks.length ? state.chat.tasks.map((task) => `<article class="task-item"><strong>${escapeHtml(task.title)}</strong><span>${task.isUnlimited ? '∞' : formatDate(task.dueAt)}</span><p>${escapeHtml(task.description || '')}</p></article>`).join('') : '<p class="muted">No tasks yet.</p>'}</div></div>
      ${renderRoomSettingsEditor(room)}
      <div class="detail-card"><h4>${t('details')}</h4><div class="detail-actions">
        ${room.joined ? `<button class="inline-button" data-action="room-state" data-slug="${room.slug}" data-state="pinned" data-value="${!room.state?.pinned}">${icons.pin}<span>${t('pin')}</span></button>` : ''}
        ${room.joined ? `<button class="inline-button" data-action="room-state" data-slug="${room.slug}" data-state="muted" data-value="${!room.state?.muted}">${icons.mute}<span>${t('mute')}</span></button>` : ''}
        ${room.joined ? `<button class="inline-button" data-action="room-state" data-slug="${room.slug}" data-state="archived" data-value="${!room.state?.archived}">${icons.archive}<span>${t('archive')}</span></button>` : ''}
        ${room.joined && room.kind !== 'direct' && ['owner', 'admin', 'moderator'].includes(room.currentRole) ? `<button class="inline-button" data-action="open-modal" data-modal="invite" data-room="${room.slug}">${icons.share}<span>${t('invite')}</span></button>` : ''}
        ${!room.joined && room.canJoin ? `<button class="inline-button" data-action="join-room" data-slug="${room.slug}">${icons.plus}<span>${currentLang() === 'ru' ? 'Вступить' : 'Join'}</span></button>` : ''}
        ${roomNeedsUpgrade(room) ? `<button class="inline-button" data-action="room-upgrade" data-slug="${room.slug}">${icons.card}<span>${currentLang() === 'ru' ? 'План нужен' : 'Need plan'}</span></button>` : ''}
        ${room.joined && room.kind !== 'direct' ? `<button class="inline-button danger" data-action="leave-room" data-slug="${room.slug}">${icons.trash}<span>${currentLang() === 'ru' ? 'Покинуть' : 'Leave'}</span></button>` : ''}
        ${room.kind === 'direct' ? `<button class="inline-button danger" data-action="delete-room" data-slug="${room.slug}">${icons.trash}<span>${t('archive')}</span></button>` : ''}
        ${room.surface === 'group' && ['owner', 'admin'].includes(room.currentRole) ? `<button class="inline-button danger" data-action="delete-room" data-slug="${room.slug}">${icons.trash}<span>${currentLang() === 'ru' ? 'Удалить группу' : 'Delete group'}</span></button>` : ''}
      </div></div>`;
  } else if (activeTab === 'members') {
    body = renderRoomMembersTab(room);
  } else {
    body = renderRoomMediaTab(room, activeTab);
  }
  return `<div class="room-details">
    <div class="room-summary">${roomAvatar(room, 'lg')}<h3>${escapeHtml(room.title)}</h3><p>${escapeHtml(room.description || '')}</p></div>
    ${tabs}
    ${body}
  </div>`;
}

function renderRoomMediaTab(room, tab) {
  const messages = (state.chat.messages || []).filter(m => !m.deleted);
  const attachmentsOf = (m) => {
    const list = [];
    if (Array.isArray(m.attachments) && m.attachments.length) list.push(...m.attachments);
    else if (m.attachment?.url) list.push(m.attachment);
    return list;
  };
  if (tab === 'media') {
    const items = [];
    for (const m of messages) {
      for (const a of attachmentsOf(m)) {
        if (a.url && (a.type || 'image') !== 'audio') items.push({ m, a });
      }
    }
    if (!items.length) return `<div class="detail-card"><p class="muted" style="text-align:center;padding:18px 0">No photos yet.</p></div>`;
    return `<div class="detail-card"><div class="room-media-grid">
      ${items.map(({ a }) => `<button type="button" class="room-media-thumb" data-action="open-lightbox" data-src="${escapeHtml(a.url)}" data-media-type="${escapeHtml(a.type || 'image')}" data-alt="${escapeHtml(a.name || '')}">
        ${a.type === 'video'
          ? `<video src="${escapeHtml(a.url)}" muted playsinline preload="metadata"></video>`
          : `<img src="${escapeHtml(a.url)}" alt="${escapeHtml(a.name || 'image')}" loading="lazy" />`}
      </button>`).join('')}
    </div></div>`;
  }
  if (tab === 'links') {
    const re = /\bhttps?:\/\/[^\s<>"')]+/gi;
    const links = [];
    for (const m of messages) {
      const text = m.displayBody || m.body || '';
      const found = text.match(re) || [];
      for (const url of found) links.push({ m, url });
    }
    if (!links.length) return `<div class="detail-card"><p class="muted" style="text-align:center;padding:18px 0">No links yet.</p></div>`;
    return `<div class="detail-card"><div class="room-links-list">
      ${links.map(({ m, url }) => `<a class="room-link-item" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
        <span class="room-link-url">${escapeHtml(url)}</span>
        <span class="room-link-meta">${escapeHtml(m.author?.displayName || '')} · ${formatDate(m.createdAt, 'time')}</span>
      </a>`).join('')}
    </div></div>`;
  }
  if (tab === 'voice') {
    const items = [];
    for (const m of messages) {
      for (const a of attachmentsOf(m)) {
        if (a.url && a.type === 'audio') items.push({ m, a });
      }
    }
    if (!items.length) return `<div class="detail-card"><p class="muted" style="text-align:center;padding:18px 0">No voice messages yet.</p></div>`;
    return `<div class="detail-card"><div class="room-voice-list">
      ${items.map(({ m, a }) => `<div class="room-voice-item">
        <span class="room-voice-meta">${escapeHtml(m.author?.displayName || '')} · ${formatDate(m.createdAt, 'time')}</span>
        <audio controls preload="metadata" src="${escapeHtml(a.url)}"></audio>
      </div>`).join('')}
    </div></div>`;
  }
  return '';
}

function renderChatRoomSettingsModal(modal) {
  const room = (state.chat.room?.slug === modal.roomSlug && state.chat.room)
    || state.chat.bootstrap?.rooms?.find((item) => item.slug === modal.roomSlug)
    || null;
  if (!room) return `<div class="modal-empty"><span>Chat not found.</span></div>`;
  const eyebrow = room.surface === 'work'
    ? (currentLang() === 'ru' ? 'бизнес чат' : 'business chat')
    : (room.kind === 'direct' ? 'direct chat' : 'chat');
  return `<div class="modal-head">
    <span class="eyebrow">${eyebrow}</span>
    <h2>${escapeHtml(room.title)}</h2>
    <p class="muted" style="margin:0">${escapeHtml(room.description || '')}</p>
  </div>
  <div class="modal-inner chat-settings-modal">${renderChatSidebar(room)}</div>`;
}

function renderSitesPage() {
  if (!currentUser() || isGuestSession()) return renderGate('Create an account to manage creator sites.');
  const own = state.sites.mine || [];
  const publicSites = state.sites.public || [];
  return `
    <section class="section-shell page-heading-row">
      <div><span class="eyebrow">sites</span><h1>${t('sites')}</h1><p class="muted">Upload a custom HTML site under 1 MB or build a calmer template-based surface.</p></div>
      <div class="page-tools"><button class="soft-button" data-action="open-modal" data-modal="site-template">${icons.plus}<span>${t('templateSite')}</span></button><button class="primary-button" data-action="open-modal" data-modal="site-upload">${icons.upload}<span>${t('uploadSite')}</span></button></div>
    </section>
    <section class="section-shell split-grid">
      <div><div class="section-heading"><h2>My sites</h2></div><div class="stack-list">${own.length ? own.map(renderOwnedSiteCard).join('') : renderEmpty(t('noSites'))}</div></div>
      <div><div class="section-heading"><h2>${t('creatorSites')}</h2></div><div class="stack-list">${publicSites.map(renderSiteCard).join('')}</div></div>
    </section>`;
}
function renderOwnedSiteCard(site) {
  const canEditSite = Boolean(site?.id);
  const canSubmitReview = site.visibility === 'public' && ['draft', 'rejected'].includes(site.reviewStatus || 'draft');
  const reviewLabel = escapeHtml(String(site.reviewStatus || 'draft'));
  return `<article class="tile tile-site owned-site-card">
    <div class="tile-top between"><div class="site-title-row">${renderSiteIcon(site)}<div><span class="kicker">${site.mode} · ${reviewLabel}</span><a class="text-link strong" href="${site.path}">${escapeHtml(site.title)}</a></div></div><div class="row-actions">${canEditSite ? `<button class="icon-button compact" data-action="open-edit-site" data-id="${site.id}" title="${t('update')}">${icons.edit}</button>` : ''}<button class="icon-button compact" data-action="copy-site-link" data-path="${site.path}">${icons.share}</button><button class="icon-button compact" data-action="delete-site" data-id="${site.id}">${icons.trash}</button></div></div>
    <p>${escapeHtml(site.summary || '')}</p>
    ${site.reviewNote ? `<p class="muted" style="margin:0;font-size:12px">${escapeHtml(site.reviewNote)}</p>` : ''}
    <div class="tile-actions">${canEditSite ? `<button class="inline-button" data-action="open-edit-site" data-id="${site.id}">${icons.edit}<span>${t('update')}</span></button>` : ''}${canSubmitReview ? `<button class="inline-button" data-action="submit-site-review" data-id="${site.id}">${icons.check}<span>Submit review</span></button>` : ''}<a class="inline-button" href="${site.path}">${icons.external}<span>${t('launch')}</span></a></div>
  </article>`;
}

function renderSettingsPage() {
  if (!currentUser() || isGuestSession()) return renderGate('Create an account to manage account settings.');
  const user = state.me?.user || currentUser();
  const privacy = user.privacy || {};
  const settings = user.settings || {};
  const links = user.links || {};
  const active = state.settingsTab || 'profile';
  const mobileView = state.settingsMobileView || (active && active !== 'profile' ? 'panel' : 'list');
  const tabs = [
    ['profile', t('profile'), icons.user],
    ['appearance', t('appearance'), icons.sparkles || icons.eye || icons.theme || icons.pencil],
    ['privacy', t('privacy'), icons.shield || icons.lock || icons.key],
    ['chat', t('chat'), icons.message],
    ['notifications', t('notificationsSettings') || 'Notifications', icons.bell || icons.alert || icons.mail],
    ['social', t('social') || 'Social', icons.users || icons.people || icons.user],
    ['security', t('security') || 'Security', icons.key],
    ['bots', t('bots') || 'API Tokens', icons.bot || icons.key],
    ['billing', t('billing'), icons.card || icons.wallet || icons.currency],
    ['verification', t('badgeRequest'), icons.check || icons.verified || icons.badge],
    ['support', 'Support', icons.help || icons.info || icons.message],
    ['data', t('data') || 'Data', icons.database || icons.file],
  ];
  const panels = {
    profile: renderSettingsProfile(user, links),
    appearance: renderSettingsAppearance(user, settings),
    privacy: renderSettingsPrivacy(privacy),
    chat: renderSettingsChat(settings),
    notifications: renderSettingsNotifications(settings),
    social: renderSettingsSocial(),
    security: renderSettingsSecurity(user),
    bots: renderSettingsBots(),
    billing: renderSettingsBilling(),
    verification: renderSettingsVerification(),
    support: renderSupportPanel(),
    data: renderSettingsData()
  };
  const activeLabel = (tabs.find(([id]) => id === active) || tabs[0])[1];
  return `
    <section class="settings-shell settings-fullscreen view-${mobileView}">
      <aside class="settings-nav ${mobileView === 'panel' ? 'mobile-hidden' : ''}">
        <div class="settings-nav-head">
          <div class="settings-identity">
            ${avatar(user, 'md')}
            <div class="settings-identity-meta">
              <strong>${escapeHtml(user.displayName || user.handle || '')}</strong>
              <span>@${escapeHtml(user.handle || '')}</span>
            </div>
          </div>
        </div>
        <div class="settings-nav-list">
          ${tabs.map(([item, label, icon]) => `
            <button class="settings-tab ${active === item ? 'active' : ''}" data-action="settings-tab" data-tab="${item}">
              <span class="settings-tab-icon">${icon || ''}</span>
              <span class="settings-tab-label">${label}</span>
              <span class="settings-tab-chev">›</span>
            </button>`).join('')}
        </div>
      </aside>
      <div class="settings-content ${mobileView === 'list' ? 'mobile-hidden' : ''}">
        <div class="settings-content-head">
          <button class="icon-button compact settings-back" data-action="settings-mobile-back" aria-label="Back">${icons.chevronLeft || icons.arrowLeft || '‹'}</button>
          <h2>${activeLabel}</h2>
        </div>
        <div class="settings-content-body">${panels[active] || panels.profile}</div>
      </div>
    </section>`;
}
function renderSettingsProfile(user, links) {
  const statusMap = { active: 'Online', away: 'Away', dnd: 'Do not disturb', offline: 'Invisible' };
  const draftAvatar = state.profileDraftMedia?.avatarDataUrl || '';
  const draftBanner = state.profileDraftMedia?.bannerDataUrl || '';
  const emailBanner = !user.emailVerified ? `<div class="email-verify-banner">
    <span>${icons.bell} ${t('emailNotVerified')||'Email not verified'} — <strong>${escapeHtml(user.email||'')}</strong></span>
    <button class="soft-button compact" data-action="nav" data-path="/verify">${t('verifyNow')||'Verify now'}</button>
  </div>` : '';
  return `<section class="settings-panel"><h2>${t('profile')}</h2>
    ${emailBanner}
    <form data-form="profile-settings" class="settings-form">
      <label><span>${t('displayName')}</span><input name="displayName" value="${escapeHtml(user.displayName || '')}" /></label>
      <label><span>${t('bio')}</span><textarea name="bio" rows="4">${escapeHtml(user.bio || '')}</textarea></label>
      <label><span>${t('onlineStatus')||'Online status'}</span>
        <select name="status">
          ${Object.entries(statusMap).map(([val, lbl]) => `<option value="${val}" ${(user.status||'active')===val?'selected':''}>${lbl}</option>`).join('')}
        </select>
      </label>
      <div class="settings-grid-two">
        <label><span>${t('website')}</span><input name="website" value="${escapeHtml(links.website || '')}" placeholder="https://yoursite.com" /></label>
        <label><span>${t('github')}</span><input name="github" value="${escapeHtml(links.github || '')}" placeholder="username" /></label>
        <label><span>${t('discord')}</span><input name="discord" value="${escapeHtml(links.discord || '')}" placeholder="username" /></label>
        <label><span>${t('telegram')}</span><input name="telegram" value="${escapeHtml(links.telegram || '')}" placeholder="@handle" /></label>
        <label><span>Steam</span><input name="steam" value="${escapeHtml(links.steam || '')}" placeholder="steam ID / custom URL" /></label>
        <label><span>YouTube</span><input name="youtube" value="${escapeHtml(links.youtube || '')}" placeholder="@channel" /></label>
        <label><span>Instagram</span><input name="instagram" value="${escapeHtml(links.instagram || '')}" placeholder="@handle" /></label>
      </div>
      <div class="settings-grid-two upload-row">
        <div class="upload-field crop-field">
          <span>${t('avatar')}</span>
          <div class="crop-preview crop-preview-avatar">
            ${draftAvatar ? `<img src="${draftAvatar}" alt="avatar" />` : user.avatarUrl ? `<img src="${escapeHtml(user.avatarUrl)}" alt="avatar" />` : `<span class="crop-preview-empty">${initials(user)}</span>`}
          </div>
          <input type="file" name="avatar" accept="image/*" data-action="open-crop" data-crop-kind="avatar" data-crop-aspect="1" data-crop-target="avatarDataUrl" />
          <input type="hidden" name="avatarDataUrl" value="${draftAvatar}" />
        </div>
        <div class="upload-field crop-field">
          <span>${t('banner')}</span>
          <div class="crop-preview crop-preview-banner">
            ${draftBanner ? `<img src="${draftBanner}" alt="banner" />` : user.bannerUrl ? `<img src="${escapeHtml(user.bannerUrl)}" alt="banner" />` : `<span class="crop-preview-empty">—</span>`}
          </div>
          <input type="file" name="banner" accept="image/*" data-action="open-crop" data-crop-kind="banner" data-crop-aspect="3" data-crop-target="bannerDataUrl" />
          <input type="hidden" name="bannerDataUrl" value="${draftBanner}" />
        </div>
      </div>
      <button class="primary-button" type="submit">${t('save')}</button>
    </form></section>`;
}
function renderSettingsAppearance(user, settings) {
  const accentColors = ['violet','blue','amber','coral'];
  return `<section class="settings-panel"><h2>${t('appearance')}</h2>
    <form data-form="appearance-settings" class="settings-form">
      <fieldset class="settings-fieldset"><legend>${t('theme')}</legend>
        <label><span>${t('theme')}</span>
          <select name="themePreference">
            <option value="dark" ${user.themePreference === 'dark' ? 'selected' : ''}>${t('dark')}</option>
            <option value="light" ${user.themePreference === 'light' ? 'selected' : ''}>${t('light')}</option>
            <option value="system" ${user.themePreference === 'system' ? 'selected' : ''}>${t('system')||'System'}</option>
          </select>
        </label>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>${t('language')}</legend>
        <label><span>${t('language')}</span>
          <select name="languagePreference">
            <option value="en" ${user.languagePreference === 'en' ? 'selected' : ''}>English</option>
            <option value="ru" ${user.languagePreference === 'ru' ? 'selected' : ''}>Русский</option>
            <option value="uk" ${user.languagePreference === 'uk' ? 'selected' : ''}>Українська</option>
            <option value="pt" ${user.languagePreference === 'pt' ? 'selected' : ''}>Português</option>
            <option value="pl" ${user.languagePreference === 'pl' ? 'selected' : ''}>Polski</option>
            <option value="fr" ${user.languagePreference === 'fr' ? 'selected' : ''}>Français</option>
          </select>
        </label>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>${t('accentColor')||'Accent color'}</legend>
        <div class="accent-picker">
          ${accentColors.map(c => `<label class="accent-swatch-label"><input type="radio" name="accent" value="${c}" ${(user.accent||'violet')===c?'checked':''} /><span class="accent-swatch accent-${c}" title="${c}"></span></label>`).join('')}
          <label class="accent-swatch-label accent-swatch-custom">
            <input type="radio" name="accent" value="custom" ${user.accent === 'custom' ? 'checked' : ''} />
            <span class="accent-swatch accent-custom-chip" style="background:${user.accentCustom?.from ? `linear-gradient(135deg, ${escapeHtml(user.accentCustom.from)}, ${escapeHtml(user.accentCustom.to || user.accentCustom.from)})` : 'conic-gradient(from 0deg, #ff4d4d, #ffaa00, #4dd0e1, #7c3aed, #ff4d4d)'}" title="Custom"></span>
          </label>
        </div>
        <div class="custom-accent-builder">
          <div class="custom-accent-row">
            <label><span>Color A</span><input type="color" name="accentFrom" value="${escapeHtml(user.accentCustom?.from || '#7c3aed')}" /></label>
            <label><span>Color B</span><input type="color" name="accentTo" value="${escapeHtml(user.accentCustom?.to || '#38bdf8')}" /></label>
            <label class="toggle-row"><input type="checkbox" name="accentGradient" ${user.accentCustom?.gradient !== false ? 'checked' : ''} /><span>Gradient</span></label>
          </div>
          <div class="custom-accent-preview" id="accent-live-preview" style="background:linear-gradient(135deg, ${escapeHtml(user.accentCustom?.from || '#7c3aed')}, ${escapeHtml(user.accentCustom?.to || '#38bdf8')})">
            <span>Accent preview</span>
          </div>
          <p class="muted" style="font-size:12px;margin:0">Pick two colors to make your own gradient, or uncheck Gradient for a flat fill. Select the custom swatch above to apply.</p>
        </div>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>Accessibility</legend>
        <label class="toggle-row"><input type="checkbox" name="reducedMotion" ${settings.reducedMotion ? 'checked' : ''} /><span>${t('reducedMotion')}</span></label>
        <label class="toggle-row"><input type="checkbox" name="compactMode" ${settings.compactMode ? 'checked' : ''} /><span>${t('compactMode')}</span></label>
        <label class="toggle-row"><input type="checkbox" name="highContrast" ${settings.highContrast ? 'checked' : ''} /><span>${t('highContrast')}</span></label>
      </fieldset>
      <button class="primary-button" type="submit">${t('save')}</button>
    </form></section>`;
}
function renderSettingsNotifications(settings) {
  return `<section class="settings-panel"><h2>${t('notificationsSettings')||'Notifications'}</h2>
    <form data-form="chat-settings" class="settings-form">
      <fieldset class="settings-fieldset"><legend>Push notifications</legend>
        <label class="toggle-row"><input type="checkbox" name="desktopPush" ${settings.desktopPush !== false ? 'checked' : ''} /><span>Desktop push notifications</span></label>
        <label class="toggle-row"><input type="checkbox" name="soundNotifications" ${settings.soundNotifications !== false ? 'checked' : ''} /><span>Sound on new message</span></label>
        <label class="toggle-row"><input type="checkbox" name="showUnreadBadge" ${settings.showUnreadBadge !== false ? 'checked' : ''} /><span>Unread badge on browser tab</span></label>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>Email notifications</legend>
        <label class="toggle-row"><input type="checkbox" name="emailOnDM" ${settings.emailOnDM !== false ? 'checked' : ''} /><span>Email when you receive a DM</span></label>
        <label class="toggle-row"><input type="checkbox" name="emailOnMention" ${settings.emailOnMention !== false ? 'checked' : ''} /><span>Email when mentioned</span></label>
        <label class="toggle-row"><input type="checkbox" name="emailNewsletter" ${settings.emailNewsletter ? 'checked' : ''} /><span>Platform updates and news</span></label>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>In-app</legend>
        <label class="toggle-row"><input type="checkbox" name="notifyOnReaction" ${settings.notifyOnReaction !== false ? 'checked' : ''} /><span>Reactions to your posts</span></label>
        <label class="toggle-row"><input type="checkbox" name="notifyOnFollow" ${settings.notifyOnFollow !== false ? 'checked' : ''} /><span>New followers</span></label>
        <label class="toggle-row"><input type="checkbox" name="notifyOnFriendRequest" ${settings.notifyOnFriendRequest !== false ? 'checked' : ''} /><span>Friend requests</span></label>
      </fieldset>
      <button class="primary-button" type="submit">${t('save')}</button>
    </form></section>`;
}
function renderSettingsPrivacy(privacy) {
  return `<section class="settings-panel"><h2>Privacy &amp; visibility</h2>
    <form data-form="privacy-settings" class="settings-form">
      <fieldset class="settings-fieldset"><legend>Profile visibility</legend>
        <label><span>Who can see your profile</span>
          <select name="profileVisibility">
            <option value="public" ${privacy.profileVisibility === 'public' ? 'selected' : ''}>Public — anyone</option>
            <option value="handle-only" ${privacy.profileVisibility === 'handle-only' ? 'selected' : ''}>Handle only — name/bio hidden</option>
            <option value="private" ${privacy.profileVisibility === 'private' ? 'selected' : ''}>Private — only you</option>
          </select>
        </label>
        <label class="toggle-row"><span>Show email address publicly</span><input type="checkbox" name="showEmail" ${privacy.showEmail ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Show follower/following counts</span><input type="checkbox" name="showFollowers" ${privacy.showFollowers !== false ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Show last seen / online status</span><input type="checkbox" name="showLastSeen" ${privacy.showLastSeen ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Show activity feed publicly</span><input type="checkbox" name="showActivity" ${privacy.showActivity !== false ? 'checked' : ''} /></label>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>Messaging</legend>
        <label><span>Who can message you directly</span>
          <select name="allowDirectMessages">
            <option value="everyone" ${privacy.allowDirectMessages === 'everyone' ? 'selected' : ''}>Everyone</option>
            <option value="followers" ${privacy.allowDirectMessages === 'followers' ? 'selected' : ''}>Followers only</option>
            <option value="nobody" ${privacy.allowDirectMessages === 'nobody' ? 'selected' : ''}>Nobody (disable DMs)</option>
          </select>
        </label>
        <label class="toggle-row"><span>Allow friend requests</span><input type="checkbox" name="allowFriendRequests" ${privacy.allowFriendRequests !== false ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Allow invite links to rooms/workspaces</span><input type="checkbox" name="allowInvites" ${privacy.allowInvites !== false ? 'checked' : ''} /></label>
      </fieldset>
      <button class="primary-button" type="submit">${t('save')}</button>
    </form></section>`;
}

function renderGlobalChatThemeControls(settings) {
  const theme = normalizeChatTheme(settings.chatThemeGlobal || null);
  const selectedChoice = theme.mode === 'preset' ? `preset:${theme.preset || 'platform'}` : theme.mode;
  return `<fieldset class="settings-fieldset"><legend>${currentLang() === 'ru' ? 'Фон чатов' : 'Chat background'}</legend>
    <p class="muted chat-theme-copy">${currentLang() === 'ru' ? 'Выбери общий фон для всех чатов. Для отдельного чата можно задать свой стиль в его меню.' : 'Pick a default look for all chats. Any room can still override it in its own menu.'}</p>
    ${renderChatThemeSwatches('chatThemeChoice', selectedChoice, true)}
    <div class="settings-grid-two chat-theme-colors">
      <label><span>${currentLang() === 'ru' ? 'Цвет A' : 'Color A'}</span><input type="color" name="chatThemeFrom" value="${escapeHtml(theme.from || '#6d28d9')}" /></label>
      <label><span>${currentLang() === 'ru' ? 'Цвет B' : 'Color B'}</span><input type="color" name="chatThemeTo" value="${escapeHtml(theme.to || '#0ea5e9')}" /></label>
    </div>
    <label class="upload-field chat-theme-upload">
      <span>${currentLang() === 'ru' ? 'Свое изображение' : 'Upload wallpaper'}</span>
      <input type="file" name="chatThemeImage" accept="image/*" />
    </label>
  </fieldset>`;
}

function renderRoomChatThemeControls(room) {
  const roomTheme = getChatSettings().chatThemesByRoom?.[room.slug] || null;
  const theme = normalizeChatTheme(roomTheme || resolveChatTheme());
  const selectedChoice = roomTheme ? (theme.mode === 'preset' ? `preset:${theme.preset || 'platform'}` : theme.mode) : 'preset:platform';
  return `<div class="detail-card room-theme-card">
    <h4>${currentLang() === 'ru' ? 'Оформление этого чата' : 'This chat look'}</h4>
    <form class="settings-form room-theme-form" data-form="room-chat-theme" data-room="${room.slug}">
      <p class="muted chat-theme-copy">${currentLang() === 'ru' ? 'Локальный фон только для тебя. Если сбросить, чат снова возьмет общий стиль.' : 'This override is just for you. Clear it to fall back to the global theme.'}</p>
      ${renderChatThemeSwatches('chatThemeChoice', selectedChoice, false)}
      <div class="settings-grid-two chat-theme-colors">
        <label><span>${currentLang() === 'ru' ? 'Цвет A' : 'Color A'}</span><input type="color" name="chatThemeFrom" value="${escapeHtml(theme.from || '#6d28d9')}" /></label>
        <label><span>${currentLang() === 'ru' ? 'Цвет B' : 'Color B'}</span><input type="color" name="chatThemeTo" value="${escapeHtml(theme.to || '#0ea5e9')}" /></label>
      </div>
      <div class="detail-actions">
        <button class="inline-button" type="submit">${currentLang() === 'ru' ? 'Применить' : 'Apply'}</button>
        <button class="soft-button compact" type="button" data-action="clear-room-chat-theme" data-room-slug="${room.slug}">${currentLang() === 'ru' ? 'Как везде' : 'Use global'}</button>
      </div>
    </form>
  </div>`;
}

function renderSettingsChat(settings) {
  return `<section class="settings-panel"><h2>${t('chat')}</h2>
    <form data-form="chat-settings" class="settings-form">
      <fieldset class="settings-fieldset"><legend>Input</legend>
        <label class="toggle-row"><span>Send with Enter <small style="color:var(--text-muted)">Shift+Enter = new line</small></span><input type="checkbox" name="enterToSend" ${settings.enterToSend !== false ? 'checked' : ''} /></label>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>Notifications</legend>
        <label class="toggle-row"><span>Desktop push notifications</span><input type="checkbox" name="desktopPush" ${settings.desktopPush !== false ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Sound on new message</span><input type="checkbox" name="soundNotifications" ${settings.soundNotifications !== false ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Show unread badge on tab icon</span><input type="checkbox" name="showUnreadBadge" ${settings.showUnreadBadge !== false ? 'checked' : ''} /></label>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>Appearance</legend>
        <label><span>Message density</span>
          <select name="chatDensity">
            <option value="comfortable" ${settings.chatDensity === 'comfortable' || !settings.chatDensity ? 'selected' : ''}>Comfortable</option>
            <option value="compact" ${settings.chatDensity === 'compact' ? 'selected' : ''}>Compact</option>
          </select>
        </label>
        <label><span>${currentLang() === 'ru' ? 'Стиль сообщений' : 'Message style'}</span>
          <select name="messageStyle">
            ${MESSAGE_STYLE_OPTIONS.map((item) => `<option value="${item.id}" ${resolveMessageStyle() === item.id ? 'selected' : ''}>${escapeHtml(localeLabel(item.label))}</option>`).join('')}
          </select>
        </label>
        <label class="toggle-row"><span>Show timestamps on all messages</span><input type="checkbox" name="showTimestamps" ${settings.showTimestamps ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Autoplay animated stickers</span><input type="checkbox" name="autoplayMedia" ${settings.autoplayMedia ? 'checked' : ''} /></label>
      </fieldset>
      ${renderGlobalChatThemeControls(settings)}
      <fieldset class="settings-fieldset"><legend>Privacy in chat</legend>
        <label class="toggle-row"><span>Send read receipts in DMs</span><input type="checkbox" name="sendReadReceipts" ${settings.sendReadReceipts !== false ? 'checked' : ''} /></label>
        <label class="toggle-row"><span>Show typing indicator</span><input type="checkbox" name="showTyping" ${settings.showTyping !== false ? 'checked' : ''} /></label>
      </fieldset>
      <button class="primary-button" type="submit">${t('save')}</button>
    </form></section>`;
}
function renderSettingsSocial() {
  const social = state.me?.social || {};
  const friends = social.friends || [];
  const follows = social.follows || [];
  const incoming = (social.friendRequests || []).filter(r => Number(r.toUserId) === Number(currentUser()?.id) && r.status === "pending");
  let html = `<section class="settings-panel"><h2>Social</h2>`;
  if (incoming.length) {
    html += `<div class="settings-block"><h3>Friend requests (${incoming.length})</h3><div class="social-list">`;
    for (const r of incoming) {
      const from = friends.find(u => u.id === r.fromUserId) || { displayName: "User #" + r.fromUserId, handle: "user" + r.fromUserId, handleCanonical: "user" + r.fromUserId };
      html += `<div class="social-request-row">${avatar(from, "sm")}<div><strong>${escapeHtml(from.displayName)}</strong><span>@${escapeHtml(from.handle)}</span></div><div class="row-actions"><button class="soft-button compact" data-action="respond-friend" data-id="${r.id}" data-value="accept">Accept</button><button class="inline-button danger compact" data-action="respond-friend" data-id="${r.id}" data-value="deny">Deny</button></div></div>`;
    }
    html += `</div></div>`;
  }
  html += `<div class="settings-block"><h3>Friends (${friends.length})</h3><div class="social-list">`;
  if (friends.length) {
    for (const u of friends) html += `<div class="social-row">${avatar(u,"sm")}<div><strong>${escapeHtml(u.displayName)}</strong><span>@${escapeHtml(u.handle)}</span></div><button class="icon-button compact ghost-button" data-action="start-chat" data-handle="${escapeHtml(u.handleCanonical||u.handle)}" data-surface="personal">${icons.message}</button></div>`;
  } else html += `<p class="muted">No friends yet.</p>`;
  html += `</div></div><div class="settings-block"><h3>Following (${follows.length})</h3><div class="social-list">`;
  if (follows.length) {
    for (const u of follows) html += `<div class="social-row">${avatar(u,"sm")}<div><strong>${escapeHtml(u.displayName)}</strong><span>@${escapeHtml(u.handle)}</span></div><button class="icon-button compact ghost-button" data-action="toggle-follow" data-handle="${escapeHtml(u.handleCanonical||u.handle)}" title="Unfollow">${icons.close}</button></div>`;
  } else html += `<p class="muted">Not following anyone.</p>`;
  html += `</div></div></section>`;
  return html;
}

function renderSettingsSecurity(user) {
  const hasPK = Boolean(user?.security?.hasPublicKey);
  const oauth = state.meta?.oauthProviders || {};
  const googleLinked = Boolean(user?.googleConnected);
  const discordLinked = Boolean(user?.discordConnected);
  const next = encodeURIComponent(location.pathname + location.search);
  const providerRow = (name, logo, label, linked, enabled, hrefStart) => `
    <div class="linked-account-row">
      <div class="linked-account-info">
        <span class="oauth-logo oauth-${name}">${logo}</span>
        <div><strong>${label}</strong><span style="display:block;font-size:12px;color:var(--text-muted)">${linked ? 'Connected' : (enabled ? 'Not connected' : 'Not configured on server')}</span></div>
      </div>
      ${linked
        ? `<button class="soft-button danger compact" data-action="unlink-oauth" data-provider="${name}">${icons.close}<span>Disconnect</span></button>`
        : (enabled ? `<a class="soft-button compact" href="${hrefStart}">Connect</a>` : '')}
    </div>`;
  return `<section class="settings-panel"><h2>Security</h2>
    <div class="security-block">
      <div class="security-row">
        <div style="display:flex;align-items:center;gap:10px">${icons.key}<div><strong>Secret Chats</strong><span style="display:block;font-size:12px;color:var(--text-muted)">Per-device end-to-end encrypted DMs — coming soon.</span></div></div>
        <span class="badge-pill badge-usr">Soon</span>
      </div>
    </div>
    <div class="security-block"><h3>Credentials</h3>
      <div class="detail-actions">
        <button class="soft-button" data-action="open-change-password">${icons.key}<span>Change password</span></button>
        <button class="soft-button" data-action="open-change-email">${icons.mail}<span>Change email</span></button>
        <button class="soft-button" data-action="open-change-handle">${icons.user}<span>Change handle</span></button>
      </div>
    </div>
    <div class="security-block"><h3>Linked accounts</h3>
      <div class="linked-account-list">
        ${providerRow('google', 'G', 'Google', googleLinked, Boolean(oauth.google), `/api/auth/google?next=${next}`)}
        ${providerRow('discord', 'D', 'Discord', discordLinked, Boolean(oauth.discord), `/api/auth/discord?next=${next}`)}
      </div>
    </div>
    <div class="security-block"><h3>Integrations</h3>
      <div class="linked-account-list">
        <div class="linked-account-row">
          <div class="linked-account-info">
            <span class="oauth-logo oauth-telegram">T</span>
            <div><strong>Telegram</strong><span style="display:block;font-size:12px;color:var(--text-muted)">${state.meta?.integrations?.telegram?.configured ? 'Bridge ready — pairing coming soon' : 'Bot not configured on server'}</span></div>
          </div>
          <button class="soft-button compact" data-action="connect-telegram">${icons.messages}<span>Connect</span></button>
        </div>
      </div>
      <p style="font-size:12px;color:var(--text-muted);margin:8px 0 0">
        The Telegram bridge will let you read and send chats from your Telegram account inside justbreath.
        The server endpoints are already live — the pairing flow is queued next.
      </p>
    </div>
    <div class="security-block"><h3>Sessions</h3>
      <p style="font-size:13px;color:var(--text-muted)">You are signed in on this device.</p>
      <button class="soft-button" data-action="logout">${icons.close}<span>Sign out</span></button>
    </div>
  </section>`;
}


function renderSettingsBots() {
  const bots = state.me?.bots || [];
  return `<section class="settings-panel"><h2>Bots &amp; API Tokens</h2>
    <p style="font-size:13px;color:var(--text-muted);margin:0 0 12px">
      Create bot tokens to automate posts to rooms. Each token can post to rooms where you are a member.
    </p>
    <div class="settings-block">
      <h3>Your tokens (${bots.length})</h3>
      <div class="stack-list">
        ${bots.length ? bots.map(b => `
          <div class="tile" style="gap:8px">
            <div class="inline-stack between">
              <div class="inline-stack">
                <div class="ad-admin-icon">${icons.bot}</div>
                <div>
                  <strong style="font-size:.9rem">${escapeHtml(b.name)}</strong>
                  <span style="display:block;font-size:11px;font-family:var(--font-mono);color:var(--text-muted)">${b.createdAt ? formatDate(b.createdAt) : ''}</span>
                </div>
              </div>
              <button class="inline-button danger compact" data-action="delete-bot" data-id="${b.id}">${icons.trash}</button>
            </div>
          </div>`).join('') : '<p class="muted" style="margin:0">No tokens yet.</p>'}
      </div>
    </div>
    <div class="settings-block">
      <h3>Create new token</h3>
      <form class="settings-form" data-form="create-bot-token">
        <label><span>Token name <small>(e.g. "deploy-notifier")</small></span>
          <input name="name" placeholder="my-bot" />
        </label>
        <button class="primary-button" type="submit">${icons.key}<span>Create token</span></button>
      </form>
    </div>
    <div class="settings-block" style="border:1px solid var(--line);border-radius:var(--radius-lg);padding:12px">
      <h3>Using the API</h3>
      <p style="font-size:12px;color:var(--text-muted);margin:0 0 8px">POST a message to a room:</p>
      <pre class="code-block" style="font-size:11px;margin:0">curl -X POST https://justbreath.life/api/bot/rooms/ROOM_SLUG/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"body":"Hello from bot!"}'</pre>
    </div>
  </section>`;
}

function renderSettingsBilling() {
  const current = state.me?.user?.billing?.planId;
  const maxFree = state.meta?.maxSitesFree ?? 3;
  const currentLabel = current ? current : 'Free';
  return `<section class="settings-panel identity-billing">
    <div class="settings-panel-head"><h2>${t('billing')}</h2></div>
    <div class="billing-simple">
      <div class="billing-simple-row">
        <div>
          <strong>Your plan</strong>
          <p class="muted">${escapeHtml(currentLabel)} · ${maxFree} site space${maxFree === 1 ? '' : 's'} included</p>
        </div>
        <button class="primary-button" data-action="open-modal" data-modal="plans">${current ? 'Change plan' : 'See plans'}</button>
      </div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">Plans unlock more site spaces and priority review. You can cancel anytime.</p>
    </div>
  </section>`;
}

function renderSupportPanel() {
  const discordUrl = state.meta?.discordSupportUrl;
  return `<section class="settings-panel identity-support">
    <div class="settings-panel-head"><h2>Support</h2><span class="settings-badge support-badge">Support</span></div>
    <p>Need a hand? Reach out through one of the channels below.</p>
    <div class="support-links">
      ${discordUrl ? `<a class="support-link discord" href="${escapeHtml(discordUrl)}" target="_blank" rel="noopener">${icons.discord || ''}<span>Join our Discord</span></a>` : '<p class="muted">Discord support link is being set up.</p>'}
      <a class="support-link mail" href="/mail">${icons.mail || ''}<span>Send internal mail to support</span></a>
    </div>
  </section>`;
}
function renderSettingsVerification() {
  const latest = state.me?.verificationRequests?.[0];
  return `<section class="settings-panel"><h2>${t('badgeRequest')}</h2>
    <p>Status: ${latest ? latest.status : 'none'}</p>
    <form data-form="verification-request" class="settings-form">
      <label><span>Badge</span><select name="requestedBadge">${['DEV','VRF','MED','STD'].map((badge) => `<option value="${badge}">${badge}</option>`).join('')}</select></label>
      <label><span>Reason</span><textarea name="reason" rows="4"></textarea></label>
      <label><span>Links</span><textarea name="links" rows="3" placeholder="one per line"></textarea></label>
      <button class="primary-button" type="submit">${t('requestVerification')}</button>
    </form></section>`;
}
function renderSettingsData() {
  return `<section class="settings-panel danger-zone"><h2>${t('dataAndBackups')}</h2>
    <div class="settings-actions-row"><button class="soft-button" data-action="export-data">${icons.file}<span>${t('exportData')}</span></button><button class="soft-button" data-action="create-backup">${icons.archive}<span>${t('createBackup')}</span></button></div>
    <form data-form="delete-account" class="settings-form danger-form">
      <p>${t('accountDeleted')}</p>
      <label><span>${t('confirmDelete')}</span><input name="confirm" placeholder="DELETE" /></label>
      <label><span>Password</span><input type="password" name="password" /></label>
      <button class="soft-button danger" type="submit">${icons.trash}<span>${t('deleteAccount')}</span></button>
    </form></section>`;
}

function renderDrawer() {
  const user = currentUser();
  const guest = isGuestSession();
  const hasSwitchable = Array.isArray(state.savedAccounts) && state.savedAccounts.length > 0;
  return `<aside class="drawer ${state.drawerOpen ? 'open' : ''}">
    <div class="drawer-backdrop" data-action="toggle-drawer"></div>
    <div class="drawer-panel" role="dialog" aria-label="${t('accountCenter')}">
      <button class="drawer-close icon-button compact" data-action="toggle-drawer" aria-label="Close">${icons.close}</button>
      ${user ? `
        <div class="drawer-hero">
          <div class="drawer-hero-banner" style="${user.bannerUrl ? `background-image:url('${escapeHtml(user.bannerUrl)}')` : ''}">
            <button class="drawer-switch-chip" data-action="open-modal" data-modal="switch-account" title="${hasSwitchable ? 'Switch account' : 'Connect another account'}">${icons.refresh || '⇄'}</button>
          </div>
          <button class="drawer-hero-identity" data-action="open-profile" data-handle="${escapeHtml(user.handleCanonical || user.handle)}">
            ${avatar(user, 'lg')}
            <div class="drawer-hero-meta">
              <strong>${escapeHtml(user.displayName)}</strong>
              <span>@${escapeHtml(user.handle)}</span>
              <div class="badge-row">${badgePills(user)}</div>
            </div>
          </button>
        </div>
        <div class="drawer-actions">
          <button class="drawer-link" data-action="open-profile" data-handle="${escapeHtml(user.handleCanonical || user.handle)}">${icons.user}<span>${t('profile')}</span></button>
          ${guest
            ? `<button class="drawer-link" data-action="open-modal" data-modal="auth">${icons.user}<span>Create account</span></button>`
            : `<button class="drawer-link" data-action="nav" data-path="/messages">${icons.message}<span>${t('messages')}</span></button>
               <button class="drawer-link" data-action="nav" data-path="/settings">${icons.settings}<span>${t('settings')}</span></button>
               <button class="drawer-link" data-action="nav" data-path="/sites">${icons.site}<span>${t('sites')}</span></button>`}
        </div>
        <div class="drawer-section">
          <div class="section-heading">
            <h3>${t('notifications')}</h3>
            ${(state.me?.notifications || []).some(n => !n.readAt) ? `<button class="inline-button compact" data-action="read-all-notifications">Mark all read</button>` : ''}
          </div>
          ${(state.me?.notifications || []).slice(0, 5).map((note) => `
            <button class="drawer-note" data-action="read-notification" data-id="${note.id}" ${note.href ? `data-href="${escapeHtml(note.href)}"` : ''}>
              <strong>${escapeHtml(note.title)}</strong><span>${escapeHtml(note.body)}</span>
            </button>`).join('') || '<p class="muted">No notifications</p>'}
        </div>
        <div class="drawer-section compact-settings">
          <div class="drawer-row"><span>${t('theme')}</span>
            <div class="segment-row mini">
              ${['dark','light','system'].map((mode) => `<button class="segment-button ${currentThemePref() === mode ? 'active' : ''}" data-action="quick-theme" data-value="${mode}">${t(mode)||mode}</button>`).join('')}
            </div>
          </div>
          <div class="drawer-row between"><span>${t('language')}</span>
            <select class="lang-select" data-input="quick-lang-select">
              ${[['en','English'],['ru','Русский'],['uk','Українська'],['pt','Português'],['pl','Polski'],['fr','Français']].map(([code,label]) => `<option value="${code}" ${currentLang()===code?'selected':''}>${label}</option>`).join('')}
            </select>
          </div>
          <div class="drawer-row"><span>Status</span>
            <div class="segment-row mini">
              ${['active','away','dnd'].map(s => `<button class="segment-button ${(currentUser()?.status||'active')===s?'active':''}" data-action="set-status" data-value="${s}" style="font-size:11px">${renderStatusPill(s, true)}</button>`).join('')}
            </div>
          </div>
        </div>` : `
        <div class="drawer-empty">
          <h3>${t('accountCenter')}</h3>
          <p>${t('settingsLead')}</p>
          <button class="primary-button" data-action="open-modal" data-modal="auth">${t('signIn')}</button>
        </div>`}
    </div>
  </aside>`;
}

function renderSwitchAccountModal() {
  const accounts = state.savedAccounts || [];
  const current = currentUser();
  const localGuest = state.guest === true;
  return `<div class="modal-head"><span class="eyebrow">accounts</span><h2>Switch account</h2></div>
    <div class="modal-inner">
      ${current ? `<div class="switch-account-current">
        ${avatar(current, 'lg')}
        <div class="switch-account-current-copy">
          <strong>${escapeHtml(current.displayName || current.handle || '')}</strong>
          <span>@${escapeHtml(current.handle || '')}</span>
        </div>
      </div>` : ''}
      ${accounts.length ? `<div class="switch-account-list">
        ${accounts.map((account) => `
          <div class="switch-account-row">
            <button class="switch-account ${Number(account.id) === Number(current?.id || 0) ? 'is-current' : ''}" data-action="switch-account" data-token="${escapeHtml(account.sessionToken || '')}" ${Number(account.id) === Number(current?.id || 0) ? 'disabled' : ''}>
              ${account.avatarUrl ? `<img src="${escapeHtml(account.avatarUrl)}" alt="${escapeHtml(account.displayName || '')}" />` : `<span class="switch-account-initials">${(account.displayName || account.handle || '?').slice(0,2).toUpperCase()}</span>`}
              <div class="switch-account-meta">
                <strong>${escapeHtml(account.displayName || '')}</strong>
                <span>@${escapeHtml(account.handle || '')}</span>
                <em class="switch-account-status">${Number(account.id) === Number(current?.id || 0) ? 'Current account' : 'Tap to switch'}</em>
              </div>
            </button>
            <button class="icon-button compact ghost-button" data-action="remove-saved-account" data-id="${account.id}" title="Remove">${icons.close}</button>
          </div>`).join('')}
      </div>` : '<p class="muted">No other accounts saved on this device.</p>'}
      <div class="switch-account-actions">
        <button class="soft-button full-width" data-action="open-modal" data-modal="auth">${icons.plus || '+'}<span>Add account</span></button>
        <button class="soft-button full-width" data-action="${localGuest ? 'guest-exit' : 'guest-login'}">${icons.eye}<span>${localGuest ? 'Exit guest mode' : 'Browse as guest'}</span></button>
        ${current ? `<button class="soft-button full-width drawer-logout" data-action="logout">${icons.close}<span>${t('signOut')}</span></button>` : ''}
      </div>
    </div>`;
}

function renderModal() {
  if (!state.modal) return '';
  const modal = state.modal;
  // FIX: sort menu rendered inline in searchControl, not as overlay modal
  if (modal.type === 'sort-menu') return '';
  return `<div class="modal-layer modal-layer-${modal.type}"><div class="modal-backdrop" data-action="close-modal"></div><div class="modal-card modal-${modal.type}"><button class="icon-button compact modal-close" data-action="close-modal">${icons.close}</button>${renderModalInner(modal)}</div></div>`;
}
function renderModalInner(modal) {
  switch (modal.type) {
    case 'auth': return renderAuthModal();
    case 'quick-post': return renderPostModal('quick');
    case 'devlog': return renderPostModal('devlog');
    case 'project': return renderProjectModal();
    case 'site-template': return renderSiteTemplateModal();
    case 'site-upload': return renderSiteUploadModal();
    case 'workspace': return renderWorkspaceModal();
    case 'group': return renderGroupModal();
    case 'stickers': return renderStickerPackModal();
    case 'invite': return renderInviteModal(modal.room);
    case 'change-password': return renderChangePasswordModal();
    case 'change-email': return renderChangeEmailModal();
    case 'change-handle': return renderChangeHandleModal();
    case 'edit-post': return renderEditPostModal(modal.postId);
    case 'edit-site': return renderEditSiteModal(modal);
    case 'workspace-settings': return renderWorkspaceSettingsModal(modal.workspaceId);
    case 'plans': return renderPlansModal();
    case 'profile-list': return renderProfileListModal(modal);
    case 'post-info': return renderPostInfoModal(modal.postId);
    case 'chat-room-settings': return renderChatRoomSettingsModal(modal);
    case 'crop-image': return renderCropModal(modal);
    case 'switch-account': return renderSwitchAccountModal();
    default: return '';
  }
}

function renderCropModal(modal) {
  const kind = modal.kind || 'avatar';
  const label = kind === 'banner' ? 'Banner' : 'Avatar';
  return `<div class="modal-head"><span class="eyebrow">crop</span><h2>Crop ${label.toLowerCase()}</h2></div>
    <div class="modal-inner crop-modal">
      <div class="crop-canvas-wrap ${kind === 'banner' ? 'is-banner' : 'is-avatar'}" id="crop-stage">
        <canvas id="crop-canvas" width="480" height="${kind === 'banner' ? 160 : 480}"></canvas>
      </div>
      <div class="crop-controls">
        <label class="crop-slider"><span>Zoom</span><input type="range" id="crop-zoom" min="100" max="400" value="100" step="1" /></label>
        <p class="muted" style="font-size:12px;margin:0">Drag the image to reposition. Use the slider to zoom.</p>
      </div>
      <div class="modal-actions">
        <button class="soft-button" data-action="close-modal">Cancel</button>
        <button class="primary-button" data-action="apply-crop">${icons.check || '✓'}<span>Apply</span></button>
      </div>
    </div>`;
}

function renderProfileListModal(modal) {
  const titles = { followers: 'Followers', following: 'Following', friends: 'Friends', sites: t('sites'), projects: t('projects') };
  const title = titles[modal.list] || 'People';
  const body = modal.loading
    ? `<div class="modal-empty"><div class="spinner-dot"></div><span>Loading…</span></div>`
    : (modal.list === 'sites' || modal.list === 'projects')
      ? (!(modal.items || []).length
        ? `<div class="modal-empty"><span>Nothing here yet.</span></div>`
        : `<div class="stack-list modal-profile-stack">${(modal.items || []).map((item) => modal.list === 'sites' ? renderSiteCard(item) : renderProjectCard(item)).join('')}</div>`)
      : (!modal.users || !modal.users.length)
        ? `<div class="modal-empty"><span>No one here yet.</span></div>`
        : `<div class="social-list people-list">${modal.users.map((u) => `
            <button class="people-row" data-action="open-profile" data-handle="${escapeHtml(u.handleCanonical || u.handle)}">
              ${avatar(u, 'sm')}
              <div class="people-copy"><strong>${escapeHtml(u.displayName || u.handle || '')}</strong><span>@${escapeHtml(u.handle || '')}</span></div>
            </button>`).join('')}</div>`;
  return `<div class="modal-head"><span class="eyebrow">${modal.list === 'sites' || modal.list === 'projects' ? 'profile' : 'people'}</span><h2>${title}</h2></div><div class="modal-inner">${body}</div>`;
}

function renderPostInfoModal(postId) {
  const post = findModalPost(postId);
  if (!post) return `<div class="modal-empty"><span>Post not found.</span></div>`;
  return `<div class="modal-head"><span class="eyebrow">post info</span><h2>${escapeHtml(post.title || 'Post')}</h2></div>
    <div class="modal-inner">
      <div class="stack-list">
        <div class="tile" style="gap:8px">
          <strong>Author</strong>
          <span class="muted">@${escapeHtml(post.author?.handle || '')}</span>
        </div>
        <div class="tile" style="gap:8px">
          <strong>Created</strong>
          <span class="muted">${formatDate(post.createdAt, 'full')}</span>
        </div>
        ${post.publishedAt ? `<div class="tile" style="gap:8px"><strong>Published</strong><span class="muted">${formatDate(post.publishedAt, 'full')}</span></div>` : ''}
        ${post.updatedAt ? `<div class="tile" style="gap:8px"><strong>Updated</strong><span class="muted">${formatDate(post.updatedAt, 'full')}</span></div>` : ''}
        <div class="tile" style="gap:8px">
          <strong>Status</strong>
          <span class="muted">${escapeHtml(post.status || 'published')} · ${escapeHtml(post.kind || 'quick')}</span>
        </div>
      </div>
    </div>`;
}

function renderEditPostModal(postId) {
  const post = findModalPost(postId);
  if (!post) return `<div class="modal-empty"><span>Post not found.</span></div>`;
  const showTitle = post.kind === 'devlog' || Boolean(post.title);
  return `<div class="modal-head"><span class="eyebrow">${escapeHtml(post.kind || 'post')}</span><h2>${t('update')}</h2></div>
    <form class="settings-form" data-form="edit-post" data-post-id="${post.id}">
      ${showTitle ? `<label><span>${t('title')}</span><input name="title" value="${escapeHtml(post.title || '')}" /></label>` : ''}
      <label><span>${t('body')}</span><textarea name="body" rows="7">${escapeHtml(post.body || '')}</textarea></label>
      <label><span>${t('summary')}</span><textarea name="excerpt" rows="3">${escapeHtml(post.excerpt || '')}</textarea></label>
      <div class="modal-actions">
        <button class="soft-button" type="button" data-action="close-modal">${t('close')}</button>
        <button class="primary-button" type="submit">${t('update')}</button>
      </div>
    </form>`;
}

function renderEditSiteModal(modal) {
  const site = findOwnedSite(modal?.siteId);
  if (modal?.loading) {
    return `<div class="modal-head"><span class="eyebrow">site</span><h2>${t('update')}</h2></div>
      <div class="modal-empty"><div class="spinner-dot"></div><span>Loading…</span></div>`;
  }
  if (!site) return `<div class="modal-empty"><span>Site not found.</span></div>`;
  if (modal?.error) {
    return `<div class="modal-head"><span class="eyebrow">site</span><h2>${t('update')}</h2></div>
      <div class="modal-inner"><p class="muted" style="margin:0">${escapeHtml(modal.error)}</p></div>`;
  }
  const isTemplate = site.mode === 'template';
  const config = site.templateConfig || {};
  const htmlContent = site.htmlContent || '';
  const uploadInfo = site.uploadDiagnostics || null;
  const previewSite = { ...site, iconUrl: config.faviconUrl || config.logoUrl || site.iconUrl };
  const canSubmitReview = site.visibility === 'public' && ['draft', 'rejected'].includes(site.reviewStatus || 'draft');
  const reviewLabel = escapeHtml(String(site.reviewStatus || 'draft'));
  const uploadModeLabel = !isTemplate
    ? (site.uploadMode === 'archive'
      ? (currentLang() === 'ru' ? 'upload · archive' : 'upload · archive')
      : 'upload · html')
    : escapeHtml(site.mode);
  return `<div class="modal-head"><span class="eyebrow">${isTemplate ? 'template site' : 'uploaded site'}</span><h2>${t('update')}</h2><p class="muted" style="margin:0">@${escapeHtml(site.owner?.handle || currentUser()?.handle || '')}/${escapeHtml(site.slug || '')}</p></div>
    <div class="site-editor-toolbar">
      <div class="site-editor-preview">
        ${renderSiteIcon(previewSite, 'site-editor-icon')}
        <div class="site-editor-preview-copy">
          <strong>${escapeHtml(config.brandName || site.title || 'Site')}</strong>
          <span>${escapeHtml(site.path || '')}</span>
          <small>Browser tab icon priority: Favicon URL, then Logo URL, then the site fallback icon.</small>
        </div>
      </div>
      <div class="site-editor-actions">
        <a class="inline-button" href="${site.path}">${icons.external}<span>${t('launch')}</span></a>
        <button class="inline-button" type="button" data-action="copy-site-link" data-path="${site.path}">${icons.share}<span>${t('copyLink')}</span></button>
        ${canSubmitReview ? `<button class="inline-button" type="button" data-action="submit-site-review" data-id="${site.id}">${icons.check}<span>Submit review</span></button>` : ''}
      </div>
    </div>
    ${renderSiteReadiness(site, config)}
    <form class="settings-form" data-form="edit-site" data-site-id="${site.id}">
      <fieldset class="settings-fieldset">
        <legend>Publishing</legend>
        <div class="settings-grid-two">
          <label><span>${t('title')}</span><input name="title" value="${escapeHtml(site.title || '')}" /></label>
          <label><span>Site path</span><input value="${escapeHtml(site.path || '')}" disabled /></label>
          <label><span>${t('visibility')}</span><select name="visibility"><option value="public" ${site.visibility === 'public' ? 'selected' : ''}>${t('public')}</option><option value="unlisted" ${site.visibility === 'unlisted' ? 'selected' : ''}>Unlisted</option><option value="private" ${site.visibility === 'private' ? 'selected' : ''}>${t('private')}</option></select></label>
          <label><span>Search indexing</span><select name="indexingMode"><option value="auto" ${(!config.indexingMode || config.indexingMode === 'auto') ? 'selected' : ''}>Automatic</option><option value="index" ${config.indexingMode === 'index' ? 'selected' : ''}>Force index</option><option value="noindex" ${config.indexingMode === 'noindex' ? 'selected' : ''}>Noindex</option></select></label>
          <label><span>Review status</span><input value="${reviewLabel}" disabled /></label>
          <label><span>Mode</span><input value="${uploadModeLabel}" disabled /></label>
        </div>
        <label><span>${t('summary')}</span><textarea name="summary" rows="3">${escapeHtml(site.summary || '')}</textarea></label>
        <p class="site-editor-note">Public sites look more legitimate when they have a favicon, description, contact details and legal links before review.</p>
      </fieldset>

      <fieldset class="settings-fieldset">
        <legend>Brand & browser tab</legend>
        <div class="settings-grid-two">
          <label><span>Brand name</span><input name="brandName" value="${escapeHtml(config.brandName || '')}" placeholder="Brand or company name" /></label>
          <label><span>Tagline</span><input name="tagline" value="${escapeHtml(config.tagline || '')}" placeholder="Short one-line brand statement" /></label>
          <label><span>Logo URL</span><input name="logoUrl" value="${escapeHtml(config.logoUrl || '')}" placeholder="https://..." /></label>
          <label><span>Favicon URL</span><input name="faviconUrl" value="${escapeHtml(config.faviconUrl || '')}" placeholder="https://... or /icon.png" /></label>
        </div>
        <p class="site-editor-note">The favicon is used in the browser tab. If it is empty, the logo URL becomes the tab icon fallback.</p>
      </fieldset>

      <fieldset class="settings-fieldset">
        <legend>Design</legend>
        <div class="settings-grid-two">
          <label><span>Theme preset</span><select name="themePreset"><option value="platform" ${(!config.themePreset || config.themePreset === 'platform') ? 'selected' : ''}>Platform</option><option value="clean" ${config.themePreset === 'clean' ? 'selected' : ''}>Clean</option><option value="editorial" ${config.themePreset === 'editorial' ? 'selected' : ''}>Editorial</option><option value="noir" ${config.themePreset === 'noir' ? 'selected' : ''}>Noir</option></select></label>
          ${isTemplate ? `<label><span>Layout mode</span><input value="Template layout" disabled /></label>` : `<label><span>Polish mode</span><select name="polishMode"><option value="wrap" ${(!config.polishMode || config.polishMode === 'wrap') ? 'selected' : ''}>Wrap uploaded HTML</option><option value="css-only" ${config.polishMode === 'css-only' ? 'selected' : ''}>Inject CSS only</option><option value="none" ${config.polishMode === 'none' ? 'selected' : ''}>Leave HTML untouched</option></select></label>`}
          <label><span>Accent</span><input name="accent" type="color" value="${escapeHtml(config.accent || '#7c3aed')}" /></label>
          <label><span>Background</span><input name="bg" type="color" value="${escapeHtml(config.bg || '#05070d')}" /></label>
          <label><span>Surface</span><input name="surface" type="color" value="${escapeHtml(config.surface || '#101827')}" /></label>
          <label><span>Text</span><input name="text" type="color" value="${escapeHtml(config.text || '#f7f8fb')}" /></label>
          <label><span>Muted text</span><input name="muted" type="color" value="${escapeHtml(config.muted || '#a7afc1')}" /></label>
          <label><span>Font</span><select name="font"><option value="system" ${(!config.font || config.font === 'system') ? 'selected' : ''}>System sans</option><option value="serif" ${config.font === 'serif' ? 'selected' : ''}>Serif</option><option value="mono" ${config.font === 'mono' ? 'selected' : ''}>Mono</option><option value="rounded" ${config.font === 'rounded' ? 'selected' : ''}>Rounded</option></select></label>
          <label><span>Corner style</span><select name="radiusStyle"><option value="soft" ${(!config.radiusStyle || config.radiusStyle === 'soft') ? 'selected' : ''}>Soft</option><option value="round" ${config.radiusStyle === 'round' ? 'selected' : ''}>Round</option><option value="sharp" ${config.radiusStyle === 'sharp' ? 'selected' : ''}>Sharp</option></select></label>
          <label><span>Content width</span><select name="maxWidth"><option value="narrow" ${config.maxWidth === 'narrow' ? 'selected' : ''}>Narrow</option><option value="normal" ${(!config.maxWidth || config.maxWidth === 'normal') ? 'selected' : ''}>Normal</option><option value="wide" ${config.maxWidth === 'wide' ? 'selected' : ''}>Wide</option><option value="full" ${config.maxWidth === 'full' ? 'selected' : ''}>Full</option></select></label>
        </div>
      </fieldset>

      <fieldset class="settings-fieldset">
        <legend>SEO</legend>
        <div class="settings-grid-two">
          <label><span>SEO title</span><input name="seoTitle" value="${escapeHtml(config.seoTitle || '')}" placeholder="Title shown in search results" /></label>
          <label><span>Canonical URL</span><input name="canonicalUrl" value="${escapeHtml(config.canonicalUrl || '')}" placeholder="https://..." /></label>
          <label><span>Open Graph image</span><input name="ogImageUrl" value="${escapeHtml(config.ogImageUrl || '')}" placeholder="https://..." /></label>
          <label><span>Keywords</span><input name="seoKeywords" value="${escapeHtml(config.seoKeywords || '')}" placeholder="brand, service, city" /></label>
        </div>
        <label><span>SEO description</span><textarea name="seoDescription" rows="4">${escapeHtml(config.seoDescription || '')}</textarea></label>
      </fieldset>

      <fieldset class="settings-fieldset">
        <legend>Trust & support</legend>
        <div class="settings-grid-two">
          <label><span>Legal name</span><input name="legalName" value="${escapeHtml(config.legalName || '')}" /></label>
          <label><span>Schema type</span><select name="schemaType"><option value="Organization" ${(!config.schemaType || config.schemaType === 'Organization') ? 'selected' : ''}>Organization</option><option value="Person" ${config.schemaType === 'Person' ? 'selected' : ''}>Person</option><option value="LocalBusiness" ${config.schemaType === 'LocalBusiness' ? 'selected' : ''}>Local business</option></select></label>
          <label><span>Support email</span><input name="supportEmail" value="${escapeHtml(config.supportEmail || '')}" placeholder="hello@brand.com" /></label>
          <label><span>Phone</span><input name="phone" value="${escapeHtml(config.phone || '')}" placeholder="+1..." /></label>
          <label><span>Contact line</span><input name="contact" value="${escapeHtml(config.contact || '')}" placeholder="Support 24/7 or response time" /></label>
          <label><span>Address</span><input name="address" value="${escapeHtml(config.address || '')}" placeholder="City, street, office" /></label>
          <label><span>Privacy URL</span><input name="privacyUrl" value="${escapeHtml(config.privacyUrl || '')}" placeholder="https://..." /></label>
          <label><span>Terms URL</span><input name="termsUrl" value="${escapeHtml(config.termsUrl || '')}" placeholder="https://..." /></label>
        </div>
      </fieldset>

      <fieldset class="settings-fieldset">
        <legend>Actions</legend>
        <div class="settings-grid-two">
          <label><span>CTA label</span><input name="ctaLabel" value="${escapeHtml(config.ctaLabel || '')}" placeholder="Book now / Contact / Buy" /></label>
          <label><span>CTA URL</span><input name="ctaHref" value="${escapeHtml(config.ctaHref || '')}" placeholder="https://... or /path" /></label>
        </div>
      </fieldset>

      ${isTemplate ? `
      <fieldset class="settings-fieldset">
        <legend>Template content</legend>
        <div class="settings-grid-two">
          <label><span>Eyebrow</span><input name="eyebrow" value="${escapeHtml(config.eyebrow || '')}" /></label>
          <label><span>${t('heroCopy')}</span><input name="hero" value="${escapeHtml(config.hero || '')}" /></label>
        </div>
        <label><span>${t('aboutCopy')}</span><textarea name="body" rows="7">${escapeHtml(config.body || '')}</textarea></label>
        <label><span>Links (label|href per line)</span><textarea name="links" rows="5">${escapeHtml(serializeSiteLinks(config.links || []))}</textarea></label>
        <label><span>Gallery URLs (one per line)</span><textarea name="gallery" rows="4">${escapeHtml(serializeSiteGallery(config.gallery || []))}</textarea></label>
      </fieldset>` : `
      ${renderSiteUploadDiagnostics(site)}
      <fieldset class="settings-fieldset">
        <legend>Archive tools</legend>
        <label class="upload-field"><span>${uploadInfo?.variant === 'archive' ? 'Replace archive package (.zip, .tar, .tar.gz, .tgz, .7z)' : 'Attach archive package (.zip, .tar, .tar.gz, .tgz, .7z)'}</span><input type="file" name="archive" accept=".zip,.tar,.tgz,.tar.gz,.7z,application/zip,application/x-tar,application/gzip,application/x-gzip" /></label>
        <p class="site-editor-note">${uploadInfo?.variant === 'archive'
          ? 'Re-upload an archive to update CSS, JS, images and extra HTML pages together. The editor below only changes the entry HTML file.'
          : 'If this site references local css/js/images or extra pages, switch it to an archive package so the platform keeps the whole site together.'}</p>
      </fieldset>
      <fieldset class="settings-fieldset">
        <legend>Uploaded HTML</legend>
        <label><span>HTML</span><textarea name="htmlContent" rows="18" spellcheck="false" style="font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)">${escapeHtml(htmlContent)}</textarea></label>
        <p class="site-editor-note">Static HTML only. Limit: 1 MB. Use the design controls above to give uploaded pages a branded shell, favicon and SEO metadata.</p>
      </fieldset>`}

      <fieldset class="settings-fieldset">
        <legend>Custom CSS</legend>
        <label><span>Extra CSS</span><textarea name="customCss" rows="8" spellcheck="false" style="font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)">${escapeHtml(config.customCss || '')}</textarea></label>
      </fieldset>
      <div class="modal-actions">
        <button class="soft-button" type="button" data-action="close-modal">${t('close')}</button>
        <button class="primary-button" type="submit">${t('update')}</button>
      </div>
    </form>`;
}

function renderPlansModal() {
  const plans = state.meta?.subscriptions || [];
  const current = state.me?.user?.billing?.planId;
  return `<div class="modal-inner modal-plans-inner">
    <h2 style="margin:0 0 6px">Choose a plan</h2>
    <p class="muted" style="margin:0 0 18px">Upgrade whenever you need more site spaces and priority review. Cancel anytime.</p>
    ${current ? `<div class="current-plan-banner">Active plan: <strong>${escapeHtml(current)}</strong></div>` : ''}
    <div class="plan-grid">${plans.map(renderPlanCard).join('')}</div>
    <p class="muted" style="margin:14px 0 0;font-size:12px">Prices shown match the site's current scale and update over time.</p>
  </div>`;
}
function renderAuthModal() {
  const sub = state.modal?.sub || 'login';
  const next = encodeURIComponent(location.pathname + location.search);
  const googleHref = `/api/auth/google?next=${next}`;
  const discordHref = `/api/auth/discord?next=${next}`;
  const oauth = state.meta?.oauthProviders || {};
  const googleBtn = oauth.google ? `
    <a class="soft-button full-width oauth-btn oauth-google" href="${googleHref}" style="justify-content:center">
      <span class="oauth-logo">G</span><span>Continue with Google</span>
    </a>` : '';
  const discordBtn = oauth.discord ? `
    <a class="soft-button full-width oauth-btn oauth-discord" href="${discordHref}" style="justify-content:center">
      <span class="oauth-logo">D</span><span>Continue with Discord</span>
    </a>` : '';
  const oauthRow = (googleBtn || discordBtn) ? `
    <div class="divider-text" style="margin:12px 0">or</div>
    <div class="oauth-stack">${googleBtn}${discordBtn}</div>
    <p style="font-size:11.5px;color:var(--text-muted);text-align:center;margin:8px 0 0;line-height:1.5">
      By continuing you agree to our <a data-action="nav" data-path="/terms">Terms</a> and <a data-action="nav" data-path="/privacy">Privacy Policy</a>.
    </p>` : '';

  const loginView = `
    <form class="settings-form" data-form="auth-login">
      <label><span>Handle or email</span>
        <input name="identity" value="${escapeHtml(modalPrefillIdentity())}" autocomplete="username" />
      </label>
      <label><span>Password</span>
        <input type="password" name="password" autocomplete="current-password" />
      </label>
      <button class="primary-button" type="submit">Sign in</button>
    </form>
    <div style="display:flex;gap:10px;justify-content:center;font-size:13px;margin-top:6px;flex-wrap:wrap">
      <button class="text-link" data-action="auth-sub" data-sub="forgot" style="color:var(--text-muted)">Forgot password?</button>
      <span style="color:var(--text-muted)">·</span>
      <button class="text-link" data-action="auth-sub" data-sub="code" style="color:var(--text-muted)">Email code</button>
      <span style="color:var(--text-muted)">·</span>
      <button class="text-link" data-action="auth-sub" data-sub="register" style="color:var(--text-muted)">Create account</button>
    </div>
    ${oauthRow}
    <div class="divider-text" style="margin:12px 0">or continue without account</div>
    <button class="soft-button full-width" data-action="guest-login" style="justify-content:center">
      ${icons.eye}<span>Browse as guest</span>
    </button>
  `;

  const consentBlock = `
    <div class="consent-block">
      <label class="consent-row">
        <input type="checkbox" name="agreeTos" required />
        <span>I have read and agree to the <a data-action="nav" data-path="/terms">Terms of Service</a> and <a data-action="nav" data-path="/privacy">Privacy Policy</a>. <strong>(required)</strong></span>
      </label>
      <label class="consent-row">
        <input type="checkbox" name="agreeAge" required />
        <span>I confirm I am at least 13 years old, or have verified consent from a parent/guardian where required by local law. <strong>(required)</strong></span>
      </label>
      <label class="consent-row">
        <input type="checkbox" name="agreeMarketing" />
        <span>Send me occasional product updates by email. You can unsubscribe at any time.</span>
      </label>
    </div>`;

  const registerView = `
    <form class="settings-form" data-form="auth-register">
      <label><span>Display name</span><input name="displayName" /></label>
      <label><span>Email</span><input name="email" type="email" autocomplete="email" /></label>
      <label><span>Password <small>(8+ chars)</small></span>
        <input type="password" name="password" autocomplete="new-password" />
      </label>
      <p style="font-size:12px;color:var(--text-muted);margin:0">Handle will be created automatically from your email or name.</p>
      ${consentBlock}
      <button class="primary-button" type="submit">Create profile</button>
    </form>
    ${oauthRow}
    <div style="text-align:center;font-size:13px;margin-top:6px">
      <button class="text-link" data-action="auth-sub" data-sub="login"
        style="color:var(--text-muted)">Already have an account? Sign in</button>
    </div>
  `;

  const codeView = `
    <p style="font-size:13px;color:var(--text-muted);margin:0 0 12px">
      Sign in with a one-time code. If the email is new, the account will be created from your name.
    </p>
    <form class="settings-form" data-form="send-login-code">
      <label><span>Email</span><input name="email" type="email" autocomplete="email" value="${escapeHtml(state.modal?.email || '')}" /></label>
      <label><span>Name <small>(first sign-in only)</small></span><input name="displayName" value="${escapeHtml(state.modal?.displayName || '')}" /></label>
      <button class="primary-button" type="submit">${icons.mail}<span>Send sign-in code</span></button>
    </form>
    <div class="divider-text" style="margin:14px 0">already have a code?</div>
    <form class="settings-form" data-form="login-code">
      <label><span>Email</span><input name="email" type="email" autocomplete="email" value="${escapeHtml(state.modal?.email || '')}" /></label>
      <label><span>Name <small>(only for first sign-in)</small></span><input name="displayName" value="${escapeHtml(state.modal?.displayName || '')}" /></label>
      <label><span>Code</span>
        <input name="code" placeholder="000000" maxlength="6" autocomplete="one-time-code"
          style="letter-spacing:.25em;font-family:var(--font-mono);text-align:center;font-size:1.1rem" />
      </label>
      <button class="soft-button" type="submit">Sign in with code</button>
    </form>
    <div style="text-align:center;font-size:13px;margin-top:8px">
      <button class="text-link" data-action="auth-sub" data-sub="login"
        style="color:var(--text-muted)">← Back to sign in</button>
    </div>
  `;

  const forgotView = `
    <p style="font-size:13px;color:var(--text-muted);margin:0 0 12px">
      Enter your email to receive a reset code.
    </p>
    <form class="settings-form" data-form="forgot-password">
      <label><span>Email address</span>
        <input name="email" type="email" autocomplete="email" />
      </label>
      <button class="primary-button" type="submit">${icons.mail}<span>Send reset code</span></button>
    </form>
    <div class="divider-text" style="margin:14px 0">already have a code?</div>
    <form class="settings-form" data-form="reset-password">
      <label><span>Email</span><input name="email" type="email" /></label>
      <label><span>Code <small>(from email)</small></span>
        <input name="code" placeholder="000000" maxlength="6"
          style="letter-spacing:.25em;font-family:var(--font-mono);text-align:center;font-size:1.1rem" />
      </label>
      <label><span>New password</span>
        <input type="password" name="newPassword" autocomplete="new-password" />
      </label>
      <button class="soft-button" type="submit">Reset password</button>
    </form>
    <div style="text-align:center;font-size:13px;margin-top:8px">
      <button class="text-link" data-action="auth-sub" data-sub="login"
        style="color:var(--text-muted)">← Back to sign in</button>
    </div>
  `;

  const verifyEmailTarget = state.modal?.verifyEmail || currentUser()?.email || '';
  const verifyView = `
    <p style="font-size:13px;color:var(--text-muted);margin:0 0 12px">
      ${t('verifyEmailSent') || 'We sent a 6-digit code to'} <strong>${escapeHtml(verifyEmailTarget)}</strong>.
      ${t('verifyEmailHint') || 'Enter it below — codes expire in 15 minutes.'}
    </p>
    <form class="settings-form" data-form="verify-email">
      <label><span>${t('verifyCodeLabel') || 'Verification code'}</span>
        <input name="code" placeholder="000000" maxlength="6" inputmode="numeric" pattern="[0-9]{6}" autocomplete="one-time-code"
          style="letter-spacing:.25em;font-family:var(--font-mono);text-align:center;font-size:1.3rem" autofocus />
      </label>
      <button class="primary-button" type="submit">${icons.check || icons.star}<span>${t('verifyEmailButton') || 'Verify email'}</span></button>
    </form>
    <div style="text-align:center;font-size:13px;margin-top:10px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="text-link" data-action="resend-verify-email" style="color:var(--text-muted)">${t('resendCode') || 'Resend code'}</button>
      <span style="color:var(--text-muted)">·</span>
      <button class="text-link" data-action="close-modal" style="color:var(--text-muted)">${t('later') || 'Verify later'}</button>
    </div>
  `;

  const titleMap = {
    login: t('signIn'),
    register: 'Create account',
    forgot: 'Reset password',
    code: 'Email code sign-in',
    verify: t('verifyEmailTitle') || 'Verify your email'
  };

  return `<div class="modal-head">
    <span class="eyebrow">access</span>
    <h2>${titleMap[sub] || t('signIn')}</h2>
  </div>
  ${sub === 'login' ? loginView : ''}
  ${sub === 'register' ? registerView : ''}
  ${sub === 'code' ? codeView : ''}
  ${sub === 'forgot' ? forgotView : ''}
  ${sub === 'verify' ? verifyView : ''}`;
}

function modalPrefillIdentity() {
  return state.modal?.identity || state.savedAccounts[0]?.handle || '';
}
function renderPostModal(kind) {
  return `<div class="modal-head"><span class="eyebrow">${kind}</span><h2>${kind === 'devlog' ? t('devlog') : t('quickPost')}</h2></div>
    <form class="settings-form" data-form="create-post" data-kind="${kind}">
      ${kind === 'devlog' ? `<label><span>${t('title')}</span><input name="title" /></label>` : ''}
      <label><span>${t('body')}</span><textarea name="body" rows="7"></textarea></label>
      <div class="settings-grid-two"><label><span>${t('summary')}</span><input name="excerpt" /></label><label><span>${t('scheduleFor')}</span><input name="scheduledFor" type="datetime-local" /></label></div>
      <label class="upload-field"><span>${t('addPhotos')}</span><input type="file" name="image" accept="image/*" /></label>
      <button class="primary-button" type="submit">${kind === 'devlog' ? t('create') : t('publish')}</button>
    </form>`;
}
function renderProjectModal() {
  return `<div class="modal-head"><span class="eyebrow">project</span><h2>${t('createProject')}</h2></div>
    <form class="settings-form" data-form="create-project">
      <label><span>${t('title')}</span><input name="title" /></label>
      <div class="settings-grid-two"><label><span>${t('slug')}</span><input name="slug" /></label><label><span>${t('visibility')}</span><select name="visibility"><option value="public">${t('public')}</option><option value="unlisted">Unlisted</option><option value="private">${t('private')}</option></select></label></div>
      <label><span>${t('summary')}</span><textarea name="summary" rows="4"></textarea></label>
      <label><span>${t('tags')}</span><input name="tags" placeholder="tag1, tag2" /></label>
      <label class="upload-field"><span>Cover</span><input type="file" name="cover" accept="image/*" /></label>
      <button class="primary-button" type="submit">${t('create')}</button>
    </form>`;
}
function renderSiteTemplateModal() {
  return `<div class="modal-head"><span class="eyebrow">template site</span><h2>${t('templateSite')}</h2></div>
    <form class="settings-form" data-form="create-site-template">
      ${renderSiteCreationGuide()}
      <label><span>${t('title')}</span><input name="title" /></label>
      <div class="settings-grid-two"><label><span>${t('slug')}</span><input name="slug" /></label><label><span>${t('visibility')}</span><select name="visibility"><option value="public">${t('public')}</option><option value="unlisted">Unlisted</option><option value="private">${t('private')}</option></select></label></div>
      <label><span>Intent</span><select name="intent"><option value="launch">Launch</option><option value="portfolio">Portfolio</option><option value="pitch">Pitch</option><option value="event">Event</option><option value="docs">Docs</option></select></label>
      <label><span>${t('summary')}</span><textarea name="summary" rows="3"></textarea></label>
      <label><span>${t('heroCopy')}</span><input name="hero" /></label>
      <label><span>${t('aboutCopy')}</span><textarea name="body" rows="5"></textarea></label>
      <label><span>Links (label|href per line)</span><textarea name="links" rows="4"></textarea></label>
      <button class="primary-button" type="submit">${t('create')}</button>
    </form>`;
}
function renderSiteUploadModal() {
  return `<div class="modal-head"><span class="eyebrow">custom site</span><h2>${t('uploadSite')}</h2></div>
    ${renderSiteCreationGuide()}
    <div class="site-upload-rules">
      <strong>Before you upload</strong>
      <ul>
        <li>Either a single <code>.html</code> file (≤ 1 MB) or an archive package (≤ 5 MB) such as <code>.zip</code>, <code>.tar</code>, <code>.tar.gz</code> or <code>.tgz</code> containing an <code>index.html</code>.</li>
        <li>Static HTML / CSS / inline JS only. Server-side code, unsafe downloads, cryptominers and trackers beyond AdSense are not allowed.</li>
        <li>No malware, phishing, doxxing, sexual content involving minors, or content that infringes someone else's copyright.</li>
        <li>Public sites may be reviewed before being listed. Unlisted / private stays out of the directory but is still subject to these rules.</li>
        <li>By uploading you confirm you own the content and agree to our terms. Violations can result in the site being removed and the account suspended.</li>
      </ul>
    </div>
    <form class="settings-form" data-form="create-site-upload">
      <label><span>${t('title')}</span><input name="title" required /></label>
      <div class="settings-grid-two">
        <label><span>${t('slug')}</span><input name="slug" /></label>
        <label><span>${t('visibility')}</span><select name="visibility"><option value="public">${t('public')}</option><option value="unlisted">Unlisted</option><option value="private">${t('private')}</option></select></label>
      </div>
      <label><span>${t('summary')}</span><textarea name="summary" rows="3"></textarea></label>
      <div class="segment-row">
        <button type="button" class="segment-button ${(state.siteUploadMode || 'html') === 'html' ? 'active' : ''}" data-action="site-upload-mode" data-mode="html">Single HTML</button>
        <button type="button" class="segment-button ${state.siteUploadMode === 'archive' ? 'active' : ''}" data-action="site-upload-mode" data-mode="archive">Archive package</button>
      </div>
      ${state.siteUploadMode === 'archive'
        ? `<label class="upload-field site-drop-zone ${_siteFileCache.archive ? 'has-file' : ''}"><span>${_siteFileCache.archive ? `✓ Archive: <strong>${escapeHtml(_siteFileCache.archive.name)}</strong> · ${(_siteFileCache.archive.size/1024/1024).toFixed(2)} MB — click to replace` : 'Archive ≤ 5 MB (.zip, .tar, .tar.gz, .tgz, .7z) — click to choose'}</span><input type="file" name="archive" accept=".zip,.tar,.tgz,.tar.gz,.7z,application/zip,application/x-tar,application/gzip,application/x-gzip" data-action="site-file-pick" data-kind="archive" /></label>`
        : `<label class="upload-field site-drop-zone ${_siteFileCache.html ? 'has-file' : ''}"><span>${_siteFileCache.html ? `✓ HTML: <strong>${escapeHtml(_siteFileCache.html.name)}</strong> · ${(_siteFileCache.html.size/1024).toFixed(1)} KB — click to replace` : 'HTML file ≤ 1 MB — click to choose'}</span><input type="file" name="html" accept=".html,.htm,text/html" data-action="site-file-pick" data-kind="html" /></label>`}
      <label class="inline-check"><input type="checkbox" name="agree" required /> <span>I agree to the site rules above.</span></label>
      <button class="primary-button" type="submit">${t('create')}</button>
    </form>`;
}
function renderWorkspaceModal() {
  return `<div class="modal-head"><span class="eyebrow">workspace</span><h2>${t('createWorkspace')}</h2></div>
    <form class="settings-form" data-form="create-workspace">
      <label><span>${t('title')}</span><input name="title" /></label>
      <label><span>${t('summary')}</span><textarea name="description" rows="4"></textarea></label>
      <label><span>${t('visibility')}</span><select name="visibility"><option value="open">Open</option><option value="private">${t('private')}</option><option value="secret">Secret</option></select></label>
      <label class="upload-field"><span>${t('avatar')}</span><input type="file" name="avatar" accept="image/*" /></label>
      <button class="primary-button" type="submit">${t('create')}</button>
    </form>`;
}
function renderGroupModal() {
  return `<div class="modal-head"><span class="eyebrow">group</span><h2>${t('createGroup')}</h2></div>
    <form class="settings-form" data-form="create-group">
      <label><span>${t('title')}</span><input name="title" /></label>
      <label><span>${t('summary')}</span><textarea name="description" rows="4"></textarea></label>
      <label><span>${t('tags')}</span><input name="tags" placeholder="design, art" /></label>
      <label><span>${t('visibility')}</span><select name="visibility"><option value="private">${t('private')}</option><option value="open">Open</option><option value="secret">Secret</option></select></label>
      <label class="upload-field"><span>Group avatar</span><input type="file" name="avatar" accept="image/*" /></label>
      <button class="primary-button" type="submit">${t('create')}</button>
    </form>`;
}
function renderStickerPackModal() {
  return `<div class="modal-head"><span class="eyebrow">stickers</span><h2>${t('addPack')}</h2></div>
    <div class="mascot-row">${beaverMascot}<p>Upload your own sticker packs. PNG, JPG and SVG are stored per pack and reused inside chat, comments and feed actions.</p></div>
    <form class="settings-form" data-form="create-sticker-pack">
      <label><span>Pack title</span><input name="title" /></label>
      <button class="soft-button" type="submit">${t('create')}</button>
    </form>
    <form class="settings-form" data-form="create-sticker">
      <label><span>Pack</span><select name="packId">${(state.me?.stickers || []).map((pack) => `<option value="${pack.id}">${escapeHtml(pack.title)}</option>`).join('')}</select></label>
      <label><span>Name</span><input name="name" /></label>
      <label class="upload-field"><span>Sticker image</span><input type="file" name="sticker" accept="image/*,.svg" /></label>
      <button class="primary-button" type="submit">${t('addSticker')}</button>
    </form>`;
}
function renderInviteModal(roomSlug) {
  return `<div class="modal-head"><span class="eyebrow">invite</span><h2>${t('invite')}</h2></div>
    <form class="settings-form" data-form="create-invite" data-room="${roomSlug}">
      <label><span>Hours until expiry</span><input name="expiresHours" type="number" min="1" max="168" value="24" /></label>
      <button class="primary-button" type="submit">${t('create')}</button>
    </form>`;
}

function renderToasts() {
  return `<div class="toast-stack">${state.toasts.map((item) => `<div class="toast toast-${item.tone}">${escapeHtml(item.message)}</div>`).join('')}</div>`;
}
function renderHover() {
  // Hover card is now managed directly via DOM (see openHover/clearHover).
  // Returning empty string keeps compatibility with callers that include it in render().
  return '';
}
function renderLightbox() {
  if (!state.lightbox) return '';
  const items = state.lightbox.items || [];
  const index = Math.max(0, Math.min(state.lightbox.index || 0, Math.max(0, items.length - 1)));
  const item = items[index];
  if (!item) return '';
  const multi = items.length > 1;
  const media = item.type === 'video'
    ? `<video src="${escapeHtml(item.src)}" class="lightbox-img lightbox-video" controls autoplay playsinline data-action="lightbox-media"></video>`
    : `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || '')}" class="lightbox-img" data-action="lightbox-media" />`;
  return `<div class="lightbox-overlay" data-action="close-lightbox">
    <button class="lightbox-close" data-action="close-lightbox">${icons.close}</button>
    ${multi ? `<button class="lightbox-nav prev" data-action="lightbox-prev" aria-label="Previous">${icons.chevronLeft}</button>` : ''}
    <div class="lightbox-stage" data-action="lightbox-media">
      ${media}
      <div class="lightbox-meta" data-action="lightbox-media">
        ${multi ? `<span>${index + 1} / ${items.length}</span>` : '<span>Media</span>'}
        ${(item.author || item.createdAt) ? `<strong>${escapeHtml([item.author, item.createdAt ? formatDate(item.createdAt) : ''].filter(Boolean).join(' · '))}</strong>` : ''}
      </div>
    </div>
    ${multi ? `<button class="lightbox-nav next" data-action="lightbox-next" aria-label="Next">${icons.chevronRight}</button>` : ''}
  </div>`;
}
function renderLoading() {
  return `<section class="section-shell loading-shell"><div class="loading-bar"><span></span></div></section>`;
}
function renderGate(copy) {
  return `<section class="section-shell gate-shell"><div class="gate-card">
    <h1>${copy}</h1>
    <div class="inline-stack" style="gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px">
      <button class="primary-button" data-action="open-modal" data-modal="auth">${t('signIn')}</button>
      <button class="ghost-button" data-action="guest-login">${icons.eye}<span>Continue as guest</span></button>
    </div>
    <p style="font-size:12px;color:var(--text-muted);margin-top:14px">Browsing as a guest works for most things — chats, mail, sites and settings need an account.</p>
  </div></section>`;
}

// Track textarea draft across renders
let _chatTextareaDraft = '';

function renderMobileBottomNav() {
  const path = state.route.name;
  const unread = Object.values(state.chat.unread || {}).reduce((a, b) => a + b, 0);
  if (!currentUser()) return '';
  if (isGuestSession()) {
    return `<nav class="mobile-bottom-nav" aria-label="Navigation">
      <button class="mobile-nav-btn ${path === 'home' ? 'active' : ''}" data-action="nav" data-path="/">${icons.home}<span>Home</span></button>
      <button class="mobile-nav-btn ${path === 'feed' ? 'active' : ''}" data-action="nav" data-path="/feed">${icons.feed}<span>Feed</span></button>
      <button class="mobile-nav-btn ${path === 'discover' ? 'active' : ''}" data-action="nav" data-path="/discover">${icons.search}<span>Explore</span></button>
      <button class="mobile-nav-btn" data-action="open-modal" data-modal="auth">${icons.user}<span>Sign up</span></button>
    </nav>`;
  }
  return `<nav class="mobile-bottom-nav" aria-label="Navigation">
    <button class="mobile-nav-btn ${path === 'home' ? 'active' : ''}" data-action="nav" data-path="/">${icons.home}<span>Home</span></button>
    <button class="mobile-nav-btn ${path === 'feed' ? 'active' : ''}" data-action="nav" data-path="/feed">${icons.feed}<span>Feed</span></button>
    <button class="mobile-nav-btn ${path === 'messages' ? 'active' : ''}" data-action="nav" data-path="/messages">${icons.message}${unread > 0 ? `<span class="nav-badge">${unread > 9 ? '9+' : unread}</span>` : ''}<span>Chat</span></button>
    <button class="mobile-nav-btn ${path === 'discover' ? 'active' : ''}" data-action="nav" data-path="/discover">${icons.search}<span>Explore</span></button>
    <button class="mobile-nav-btn ${path === 'mail' ? 'active' : ''}" data-action="nav" data-path="/mail">
      ${icons.mail}${state.mail.unread > 0 ? `<span class="nav-badge">${state.mail.unread > 9 ? '9+' : state.mail.unread}</span>` : ''}<span>Mail</span>
    </button>
    <button class="mobile-nav-btn" data-action="toggle-drawer">${icons.user}<span>Me</span></button>
  </nav>`;
}

function render() {
  setDocMeta();
  document.body.classList.toggle('drawer-open', state.drawerOpen);
  document.body.classList.toggle('modal-open', Boolean(state.modal));
  const root = document.getElementById('app');

  // FIX: save scroll position before innerHTML wipe (prevents chat jump to top)
  const chatScrollEl = document.getElementById('chat-scroll');
  const prevScrollTop = chatScrollEl ? chatScrollEl.scrollTop : -1;
  const prevScrollHeight = chatScrollEl ? chatScrollEl.scrollHeight : 0;
  const wasNearBottom = chatScrollEl
    ? (chatScrollEl.scrollHeight - chatScrollEl.scrollTop - chatScrollEl.clientHeight < 80)
    : false;

  const body = state.loading && !state.bootstrap ? renderLoading() : renderRoute();
  const verifyBanner = currentUser() && !currentUser().emailVerified && currentUser().roleInternal !== 'guest'
    ? `<div class="verify-banner">${iconBadge('mail', 'warning', 'banner-badge')}<span>${t('emailNotVerified') || 'Verify your email'}</span><button class="text-link" data-action="open-verify-email" style="background:none;border:none;color:inherit;text-decoration:underline;cursor:pointer;font-weight:600">${t('verifyNow') || 'Verify now'}</button></div>`
    : '';
  const guestBanner = state.guest || currentUser()?.roleInternal === 'guest'
    ? `<div class="guest-banner">${iconBadge('eye', 'neutral', 'banner-badge')}<span>You're browsing as a guest.</span><button class="text-link" data-action="open-modal" data-modal="auth" style="font-weight:700;text-decoration:underline">Create an account</button><span>to save everything.</span></div>`
    : '';
  root.innerHTML = `<div class="app-shell route-${state.route.name}">${renderTopbar()}${verifyBanner}${guestBanner}<main class="page-wrap">${body}</main>${renderSiteFooter()}${renderMobileBottomNav()}${renderDrawer()}${renderModal()}${renderToasts()}${renderHover()}${renderLightbox()}</div>`;

  // FIX: restore scroll position after render
  const newChatScrollEl = document.getElementById('chat-scroll');
  if (newChatScrollEl) {
    if (state.chat.forceScrollBottom) {
      newChatScrollEl.scrollTop = newChatScrollEl.scrollHeight;
      state.chat.forceScrollBottom = false;
    } else if (wasNearBottom) {
      newChatScrollEl.scrollTop = newChatScrollEl.scrollHeight;
    } else if (prevScrollTop >= 0) {
      // Adjust for any new messages added at top/bottom
      const scrollDelta = newChatScrollEl.scrollHeight - prevScrollHeight;
      newChatScrollEl.scrollTop = prevScrollTop + (scrollDelta > 0 && prevScrollTop < 50 ? 0 : scrollDelta);
    }
  }

  if (state.pendingWindowScroll?.path === location.pathname) {
    const top = Math.max(0, Number(state.pendingWindowScroll.top || 0));
    const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const canFullyRestore = top <= maxScrollTop + 2;
    window.scrollTo(0, canFullyRestore ? top : maxScrollTop);
    if (canFullyRestore || !state.loading) state.pendingWindowScroll = null;
  }

  // Restore textarea draft
  if (_chatTextareaDraft) {
    const ta = document.getElementById('chat-textarea');
    if (ta && ta.value === '') {
      ta.value = _chatTextareaDraft;
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
    }
  }
  if (typeof updateJumpToLatest === 'function') {
    requestAnimationFrame(updateJumpToLatest);
  }
  if (typeof pushAdsenseUnits === 'function') {
    requestAnimationFrame(pushAdsenseUnits);
  }
}
function renderMaintenancePage() {
  return `<div id="maintenance-screen">
    <div class="maintenance-icon">${iconBadge('wrench', 'warning', 'maintenance-badge')}</div>
    <div class="maintenance-title">Under maintenance</div>
    <div class="maintenance-desc">We're making things better. Check back soon.</div>
    <div class="maintenance-eta">Back shortly · justbreath.life</div>
  </div>`;
}

function renderRoute() {
  if (state.maintenance) return renderMaintenancePage();
  switch (state.route.name) {
    case 'feed': return renderFeed();
    case 'messages': return renderMessagesPage();
    case 'settings': return renderSettingsPage();
    case 'sites': return renderSitesPage();
    case 'discover': return renderDiscover();
    case 'profile': return renderProfilePage();
    case 'project': return renderProjectPage();
    case 'join': return renderGate('Join the invite from your account.');
    case 'admin': return renderAdminPage();
    case 'mail': return renderMailPage();
    case 'verify': return renderVerifyPage();
    case 'developers': return renderDevelopersPage();
    case 'privacy': return renderPrivacyPage();
    case 'terms': return renderTermsPage();
    case 'contact': return renderContactPage();
    case 'about': return renderAboutPage();
    default: return renderHome();
  }
}

async function ensureComments(postId, forceOpen = false) {
  if (!state.feed.comments[postId]?.loaded) {
    const payload = await api(`/api/public/feed/${postId}/comments`);
    state.feed.comments[postId] = { open: true, loaded: true, items: payload.items || [] };
  } else if (forceOpen) {
    state.feed.comments[postId].open = true;
  } else {
    state.feed.comments[postId].open = !state.feed.comments[postId].open;
  }
  render();
}

function setModal(modal) {
  state.modal = modal;
  document.body.classList.toggle('modal-open', Boolean(modal));
  render();
}
function closeModal() {
  state.modal = null;
  document.body.classList.remove('modal-open');
  if (_siteFileCache) { _siteFileCache.archive = null; _siteFileCache.html = null; }
  render();
}

async function handleAuth(form, mode) {
  const formData = new FormData(form);
  if (mode === 'register') {
    if (!formData.get('agreeTos')) throw new Error('You must accept the Terms and Privacy Policy to create an account.');
    if (!formData.get('agreeAge')) throw new Error('You must confirm you are at least 13 years old.');
  }
  try {
    const entries = Object.fromEntries(formData.entries());
    if (mode === 'register') {
      entries.consentTosAt = new Date().toISOString();
      entries.consentMarketing = Boolean(formData.get('agreeMarketing'));
    }
    const payload = await api(mode === 'login' ? '/api/auth/login' : '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(entries)
    });
    saveAccountSession(payload.user, payload.sessionToken);
    state.bootstrap = null;
    state.meLoaded = false;
    state.drawerOpen = false;
    document.body.classList.remove('drawer-open');
    if (mode === 'register' && payload.user && !payload.user.emailVerified) {
      try { await api('/api/auth/send-verify', { method: 'POST', body: '{}' }); } catch {}
      setModal({ type: 'auth', sub: 'verify', verifyEmail: payload.user.email });
      await routeLoad();
      toast('Profile created. Check your email for the verification code.', 'success');
      return;
    }
    closeModal();
    await routeLoad();
    toast(mode === 'login' ? 'Signed in.' : 'Profile created.', 'success');
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function switchAccount(sessionToken) {
  try {
    const payload = await api('/api/auth/switch', { method: 'POST', body: JSON.stringify({ sessionToken }) });
    saveAccountSession(payload.user, payload.sessionToken);
    state.drawerOpen = false;
    state.bootstrap = null;
    state.meLoaded = false;
    await routeLoad();
    toast('Account switched.', 'success');
  } catch (error) {
    toast(error.message, 'error');
  }
}

function closeSSE() {
  if (state.sse) {
    try { state.sse.close(); } catch {}
  }
  state.sse = null;
  state.sseStatus = 'off';
  state.sseUserId = 0;
}

function syncRealtimeTransport() {
  const userId = Number(currentUser()?.id || 0);
  if (!userId || isGuestSession() || state.guest) {
    closeSSE();
    return;
  }
  if (state.sse && state.sseUserId === userId && ['connecting', 'live'].includes(state.sseStatus)) return;
  connectSSE();
}

function _getHoverOverlay() {
  let el = document.getElementById('hover-card-overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'hover-card-overlay';
    el.className = 'hover-card';
    el.style.position = 'fixed';
    el.style.display = 'none';
    el.style.zIndex = '9000';
    document.body.appendChild(el);
  }
  return el;
}
function openHover(type, id, element) {
  if (!element) return;
  const hoverId = `${type}:${id}`;
  if (state.hover?._id === hoverId) return;
  const rect = element.getBoundingClientRect();
  let html = '';
  if (type === 'user') {
    const candidates = [
      ...(state.home?.popularUsers || []),
      ...(state.discover.users || []),
      ...(state.profile?.profile ? [state.profile.profile] : []),
      ...(state.chat.bootstrap?.social?.friends || []),
      ...(state.chat.bootstrap?.social?.follows || [])
    ];
    const user = candidates.find((item) => item?.handleCanonical === id || item?.handle?.toLowerCase() === id);
    if (!user) return;
    html = `${avatar(user, 'sm')}<div><strong>${escapeHtml(user.displayName)}</strong><span>@${escapeHtml(user.handle)}</span><p>${escapeHtml(user.bio || '')}</p><div class="badge-row">${badgePills(user)}</div></div>`;
  } else {
    const room = state.chat.bootstrap?.rooms?.find((item) => item.slug === id) || state.discover.rooms.find((item) => item.slug === id) || state.home?.openRooms?.find((item) => item.slug === id);
    if (!room) return;
    html = `${roomAvatar(room, 'sm')}<div><strong>${escapeHtml(room.title)}</strong><span>${escapeHtml(room.description || '')}</span><div class="tag-row">${(room.tags || []).map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join('')}</div></div>`;
  }
  const x = Math.min(rect.left + 8, window.innerWidth - 320);
  const y = Math.min(rect.bottom + 8, window.innerHeight - 160);
  state.hover = { _id: hoverId };
  const el = _getHoverOverlay();
  el.innerHTML = html;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.display = '';
}
function clearHover() {
  if (!state.hover) return;
  state.hover = null;
  const el = document.getElementById('hover-card-overlay');
  if (el) el.style.display = 'none';
}

async function handleProfileSettings(form) {
  const data = new FormData(form);
  const body = {
    displayName: data.get('displayName'),
    bio: data.get('bio'),
    website: data.get('website'),
    github: data.get('github'),
    discord: data.get('discord'),
    telegram: data.get('telegram'),
    steam: data.get('steam') || '',
    youtube: data.get('youtube') || '',
    instagram: data.get('instagram') || ''
  };
  if (data.get('status')) {
    api('/api/me/status', { method: 'PATCH', body: JSON.stringify({ status: data.get('status') }) }).catch(() => {});
    if (state.me?.user) state.me.user.status = data.get('status');
  }
  const avatarCropped = String(data.get('avatarDataUrl') || state.profileDraftMedia?.avatarDataUrl || '');
  const bannerCropped = String(data.get('bannerDataUrl') || state.profileDraftMedia?.bannerDataUrl || '');
  if (avatarCropped) {
    body.avatarDataUrl = avatarCropped;
  } else if (data.get('avatar')?.size) {
    const compressed = await compressImageFile(data.get('avatar'), 512, 0.86);
    body.avatarDataUrl = compressed.dataUrl;
  }
  if (bannerCropped) {
    body.bannerDataUrl = bannerCropped;
  } else if (data.get('banner')?.size) {
    const compressed = await compressImageFile(data.get('banner'), 1600, 0.82);
    body.bannerDataUrl = compressed.dataUrl;
  }
  await api('/api/me/profile', { method: 'PATCH', body: JSON.stringify(body) });
  state.profileDraftMedia = { avatarDataUrl: '', bannerDataUrl: '' };
  await loadBootstrap();
  toast(t('profileUpdated'), 'success');
}
async function handleAppearanceSettings(form) {
  const data = new FormData(form);
  const body = Object.fromEntries(data.entries());
  body.reducedMotion = data.get('reducedMotion') === 'on';
  body.compactMode = data.get('compactMode') === 'on';
  body.highContrast = data.get('highContrast') === 'on';
  body.accentCustom = {
    from: String(data.get('accentFrom') || '').trim(),
    to: String(data.get('accentTo') || '').trim(),
    gradient: data.get('accentGradient') === 'on'
  };
  delete body.accentFrom;
  delete body.accentTo;
  delete body.accentGradient;
  // Apply immediately without waiting for API
  localStorage.setItem('jb_lang', body.languagePreference);
  localStorage.setItem('jb_theme', body.themePreference);
  document.documentElement.dataset.theme = body.themePreference;
  document.documentElement.lang = body.languagePreference;
  if (body.accent) document.documentElement.dataset.accent = body.accent;
  if (state.me?.user) {
    state.me.user.themePreference = body.themePreference;
    state.me.user.languagePreference = body.languagePreference;
    if (body.accent) state.me.user.accent = body.accent;
    state.me.user.accentCustom = body.accentCustom;
  }
  applyCustomAccent(state.me?.user);
  render(); // immediate re-render with new theme/lang
  await api('/api/me/preferences', { method: 'PATCH', body: JSON.stringify(body) });
  await loadBootstrap();
  toast(t('settingsUpdated'), 'success');
}
async function handlePrivacySettings(form) {
  const data = new FormData(form);
  const body = Object.fromEntries(data.entries());
  for (const key of ['showEmail','showFollowers','showLastSeen','allowFriendRequests','allowInvites']) body[key] = data.get(key) === 'on';
  await api('/api/me/privacy', { method: 'PATCH', body: JSON.stringify(body) });
  await loadBootstrap();
  toast(t('settingsUpdated'), 'success');
}
async function buildChatThemePayload(data, fallbackTheme = null, allowImageUpload = false) {
  const choice = String(data.get('chatThemeChoice') || 'preset:platform');
  if (choice === 'gradient') {
    return {
      mode: 'gradient',
      preset: 'platform',
      from: String(data.get('chatThemeFrom') || fallbackTheme?.from || '#6d28d9'),
      to: String(data.get('chatThemeTo') || fallbackTheme?.to || '#0ea5e9'),
      imageUrl: ''
    };
  }
  if (choice === 'image') {
    const file = allowImageUpload ? data.get('chatThemeImage') : null;
    const payload = {
      mode: 'image',
      preset: 'platform',
      from: fallbackTheme?.from || '#6d28d9',
      to: fallbackTheme?.to || '#0ea5e9',
      imageUrl: fallbackTheme?.imageUrl || ''
    };
    if (file?.size) {
      const compressed = await compressImageFile(file, 1800, 0.84);
      payload.imageDataUrl = compressed.dataUrl;
    }
    return payload;
  }
  const preset = choice.startsWith('preset:') ? choice.slice(7) : 'platform';
  return {
    mode: 'preset',
    preset: preset || 'platform',
    from: fallbackTheme?.from || '#6d28d9',
    to: fallbackTheme?.to || '#0ea5e9',
    imageUrl: ''
  };
}
async function handleChatSettings(form) {
  const data = new FormData(form);
  const body = Object.fromEntries(data.entries());
  for (const key of ['enterToSend','desktopPush','soundNotifications','autoplayMedia','showUnreadBadge','sendReadReceipts','showTyping']) {
    body[key] = data.get(key) === 'on';
  }
  const currentSettings = getChatSettings();
  body.chatThemeGlobal = await buildChatThemePayload(data, currentSettings.chatThemeGlobal || null, true);
  if (body.chatThemeGlobal.imageDataUrl) {
    body.chatThemeGlobalImageDataUrl = body.chatThemeGlobal.imageDataUrl;
    delete body.chatThemeGlobal.imageDataUrl;
  }
  delete body.chatThemeChoice;
  delete body.chatThemeFrom;
  delete body.chatThemeTo;
  delete body.chatThemeImage;
  await api('/api/me/preferences', { method: 'PATCH', body: JSON.stringify(body) });
  if (state.me?.user) {
    state.me.user.settings = {
      ...state.me.user.settings,
      reducedMotion: currentSettings.reducedMotion,
      compactMode: currentSettings.compactMode,
      highContrast: currentSettings.highContrast,
      desktopPush: body.desktopPush,
      soundNotifications: body.soundNotifications,
      autoplayMedia: body.autoplayMedia,
      enterToSend: body.enterToSend,
      chatDensity: body.chatDensity || state.me.user.settings.chatDensity,
      messageStyle: body.messageStyle || state.me.user.settings.messageStyle,
      showUnreadBadge: body.showUnreadBadge,
      sendReadReceipts: body.sendReadReceipts,
      showTyping: body.showTyping,
      chatThemeGlobal: body.chatThemeGlobal,
      chatThemesByRoom: state.me.user.settings.chatThemesByRoom || {}
    };
  }
  render();
  await loadMe(true);
  toast(t('settingsUpdated'), 'success');
}
async function handleRoomChatTheme(form) {
  const roomSlug = form.dataset.room;
  if (!roomSlug) return;
  const fallback = getChatSettings().chatThemesByRoom?.[roomSlug] || resolveChatTheme(roomSlug);
  const chatTheme = await buildChatThemePayload(new FormData(form), fallback, false);
  if (state.me?.user) {
    if (!state.me.user.settings) state.me.user.settings = {};
    if (!state.me.user.settings.chatThemesByRoom) state.me.user.settings.chatThemesByRoom = {};
    state.me.user.settings.chatThemesByRoom[roomSlug] = chatTheme;
  }
  render();
  await api(`/api/chat/rooms/${encodeURIComponent(roomSlug)}/preferences`, { method: 'PATCH', body: JSON.stringify({ chatTheme }) });
  await loadMe(true);
  toast(t('settingsUpdated'), 'success');
}
async function handleProjectCreate(form) {
  const data = new FormData(form);
  const body = { title: data.get('title'), slug: data.get('slug'), summary: data.get('summary'), visibility: 'public', tags: String(data.get('tags') || '').split(',').map((v) => v.trim()).filter(Boolean) };
  if (data.get('cover')?.size) {
    const compressed = await compressImageFile(data.get('cover'), 1200, 0.82);
    body.coverDataUrl = compressed.dataUrl;
  }
  await api('/api/me/projects', { method: 'POST', body: JSON.stringify(body) });
  closeModal();
  await loadBootstrap();
  toast(t('projectCreated'), 'success');
}

async function readFileAsBase64(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(reader.error || new Error('read failed'));
    reader.readAsDataURL(file);
  });
}

async function handleSiteTemplate(form) {
  const data = new FormData(form);
  const lines = String(data.get('links') || '').split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
    const [label, href] = line.split('|');
    return { label: label?.trim(), href: href?.trim() };
  }).filter((item) => item.label && item.href);
  await api('/api/me/sites/template', { method: 'POST', body: JSON.stringify({ title: data.get('title'), slug: data.get('slug'), summary: data.get('summary'), visibility: data.get('visibility'), intent: data.get('intent'), hero: data.get('hero'), body: data.get('body'), links: lines }) });
  closeModal();
  await loadSitesMine();
  toast(t('siteCreated'), 'success');
}
const _siteFileCache = { archive: null, html: null };
async function handleSiteUpload(form) {
  const data = new FormData(form);
  if (!data.get('agree')) throw new Error('Please agree to the site rules first.');
  const mode = state.siteUploadMode || 'html';
  const common = { title: data.get('title'), slug: data.get('slug'), summary: data.get('summary'), visibility: data.get('visibility') };
  if (mode === 'archive') {
    const formFile = data.get('archive');
    const file = (formFile && formFile.size) ? formFile : _siteFileCache.archive;
    if (!file || !file.size) throw new Error('Choose an archive file.');
    if (file.size > 5 * 1024 * 1024) throw new Error('Archive must stay under 5 MB.');
    const archiveBase64 = await readFileAsBase64(file);
    await api('/api/me/sites/upload-archive', { method: 'POST', body: JSON.stringify({ ...common, archiveBase64, archiveName: file.name }) });
  } else {
    const formFile = data.get('html');
    const file = (formFile && formFile.size) ? formFile : _siteFileCache.html;
    if (!file || !file.size) throw new Error('Choose an HTML file.');
    if (file.size > 1024 * 1024) throw new Error('The site file must stay under 1 MB.');
    const htmlContent = await file.text();
    await api('/api/me/sites/upload', { method: 'POST', body: JSON.stringify({ ...common, htmlContent }) });
  }
  _siteFileCache.archive = null;
  _siteFileCache.html = null;
  closeModal();
  await loadSitesMine();
  toast(t('siteCreated'), 'success');
}
async function handleWorkspaceCreate(form) {
  const data = new FormData(form);
  const body = { title: data.get('title'), description: data.get('description'), visibility: data.get('visibility') };
  if (data.get('avatar')?.size) {
    const compressed = await compressImageFile(data.get('avatar'), 512, 0.86);
    body.avatarDataUrl = compressed.dataUrl;
  }
  await api('/api/me/workspaces', { method: 'POST', body: JSON.stringify(body) });
  closeModal();
  await loadChatBootstrap();
  toast(t('workspaceCreated'), 'success');
}
async function handleGroupCreate(form) {
  const data = new FormData(form);
  const body = { title: data.get('title'), description: data.get('description'), visibility: data.get('visibility'), tags: String(data.get('tags') || '').split(',').map((v) => v.trim()).filter(Boolean) };
  if (data.get('avatar')?.size) {
    const compressed = await compressImageFile(data.get('avatar'), 512, 0.86);
    body.avatarDataUrl = compressed.dataUrl;
  }
  const payload = await api('/api/chat/rooms', { method: 'POST', body: JSON.stringify(body) });
  closeModal();
  await loadChatBootstrap();
  state.chat.selectedSlug = payload.room.slug;
  await loadChatRoom(payload.room.slug);
  toast(t('groupCreated'), 'success');
}
async function handleCreatePost(form, kind) {
  const data = new FormData(form);
  const body = { kind, title: data.get('title'), body: data.get('body'), excerpt: data.get('excerpt'), scheduledFor: data.get('scheduledFor') || null };
  if (data.get('image')?.size) {
    const compressed = await compressImageFile(data.get('image'), 1440, 0.82);
    body.attachmentDataUrl = compressed.dataUrl;
    body.attachmentName = compressed.name;
    body.attachmentWidth = compressed.width;
    body.attachmentHeight = compressed.height;
  }
  await api('/api/me/posts', { method: 'POST', body: JSON.stringify(body) });
  closeModal();
  await loadFeed();
  toast(t('postPublished'), 'success');
}
async function handleVerificationRequest(form) {
  const data = new FormData(form);
  await api('/api/me/verification-requests', { method: 'POST', body: JSON.stringify({ requestedBadge: data.get('requestedBadge'), reason: data.get('reason'), links: String(data.get('links') || '').split('\n').map((value) => value.trim()).filter(Boolean) }) });
  await loadBootstrap();
  toast('Verification request sent.', 'success');
}
async function handleDeleteAccount(form) {
  const data = new FormData(form);
  await api('/api/me/account', { method: 'DELETE', body: JSON.stringify({ confirm: data.get('confirm'), password: data.get('password') }) });
  closeModal();
  state.bootstrap = null; state.me = null; state.meLoaded = false;
  toast(t('accountRemoved'), 'success');
  navigate('/');
  await loadBootstrap();
}
async function handleCommentSubmit(form) {
  const postId = form.dataset.postId;
  const data = new FormData(form);
  const body = data.get('body');
  const payload = await api(`/api/public/feed/${postId}/comments`, { method: 'POST', body: JSON.stringify({ body }) });
  state.feed.comments[postId] = state.feed.comments[postId] || { open: true, loaded: true, items: [] };
  state.feed.comments[postId].items.push(payload.item);
  form.reset();
  render();
}
async function toggleFollow(handle) {
  await api(`/api/users/${encodeURIComponent(handle)}/follow`, { method: 'POST', body: '{}' });
  if (state.route.name === 'profile') await loadProfile(handle);
  await loadBootstrap();
  toast('Updated.', 'success');
}
async function sendFriendRequest(handle) {
  await api(`/api/users/${encodeURIComponent(handle)}/friend-request`, { method: 'POST', body: '{}' });
  if (state.route.name === 'profile') await loadProfile(handle);
  await loadBootstrap();
  toast('Request sent.', 'success');
}
async function respondFriendRequest(id, action) {
  await api(`/api/me/friend-requests/${id}/respond`, { method: 'POST', body: JSON.stringify({ action }) });
  await loadBootstrap();
  if (state.route.name === 'messages') await loadChatBootstrap();
  toast('Updated.', 'success');
}
async function handleCreateInvite(roomSlug, form) {
  const data = new FormData(form);
  const payload = await api(`/api/chat/rooms/${encodeURIComponent(roomSlug)}/invites`, { method: 'POST', body: JSON.stringify({ expiresHours: Number(data.get('expiresHours') || 24) }) });
  await navigator.clipboard.writeText(`${location.origin}${payload.invite.url}`);
  closeModal();
  toast('Invite link copied.', 'success');
}
async function handleCreateStickerPack(form) {
  const data = new FormData(form);
  await api('/api/me/sticker-packs', { method: 'POST', body: JSON.stringify({ title: data.get('title') }) });
  await loadMe(true);
  toast('Pack created.', 'success');
}
async function handleCreateSticker(form) {
  const data = new FormData(form);
  const file = data.get('sticker');
  if (!file?.size) throw new Error('Choose an image.');
  let dataUrl;
  if (file.type.includes('svg')) {
    dataUrl = await new Promise((resolve) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(file); });
  } else {
    const compressed = await compressImageFile(file, 512, 0.92);
    dataUrl = compressed.dataUrl;
  }
  await api(`/api/me/sticker-packs/${encodeURIComponent(data.get('packId'))}/stickers`, { method: 'POST', body: JSON.stringify({ name: data.get('name'), dataUrl }) });
  await loadMe(true);
  render();
  toast('Sticker added.', 'success');
}
let _voiceRecorder = null;
let _voiceChunks = [];
let _voiceStartedAt = 0;
let _voiceStream = null;

async function toggleVoiceRecord() {
  if (!state.chat.room) return;
  if (state.chat.recording) {
    try { if (_voiceRecorder?.state === 'recording' && typeof _voiceRecorder.requestData === 'function') _voiceRecorder.requestData(); } catch {}
    try { _voiceRecorder?.stop(); } catch {}
    return;
  }
  if (!window.MediaRecorder || !navigator.mediaDevices?.getUserMedia) {
    toast('Voice recording not supported in this browser.', 'error');
    return;
  }
  try {
    _voiceStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'audio/ogg;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/ogg') ? 'audio/ogg'
      : MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4'
      : '';
    _voiceRecorder = mime ? new MediaRecorder(_voiceStream, { mimeType: mime }) : new MediaRecorder(_voiceStream);
    _voiceChunks = [];
    _voiceStartedAt = Date.now();
    _voiceRecorder.ondataavailable = (e) => { if (e.data && e.data.size) _voiceChunks.push(e.data); };
    _voiceRecorder.onstop = async () => {
      const duration = Math.round((Date.now() - _voiceStartedAt) / 1000);
      try { _voiceStream?.getTracks().forEach((t) => t.stop()); } catch {}
      _voiceStream = null;
      state.chat.recording = false;
      if (!_voiceChunks.length) { toast('Запись пустая — попробуйте ещё раз.', 'error'); render(); return; }
      if (duration < 1) { toast('Запись слишком короткая (<1с).', 'info'); render(); return; }
      const mimeType = _voiceChunks[0]?.type || _voiceRecorder?.mimeType || 'audio/webm';
      const blob = new Blob(_voiceChunks, { type: mimeType });
      try {
        const dataUrl = await new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = () => reject(r.error || new Error('read failed')); r.readAsDataURL(blob); });
        if (!String(dataUrl).startsWith('data:audio/')) { toast('Неподдерживаемый формат записи.', 'error'); render(); return; }
        state.chat.attachment = { dataUrl, name: `Voice ${duration}s`, width: 0, height: 0, duration, type: 'audio' };
        render();
      } catch (err) {
        toast(err.message || 'Не удалось сохранить запись.', 'error');
        render();
      }
    };
    _voiceRecorder.start(250);
    state.chat.recording = true;
    render();
  } catch (err) {
    toast(err.message || 'Microphone permission denied.', 'error');
    state.chat.recording = false;
    render();
  }
}

async function sendChatMessage(form) {
  if (!state.chat.room || state.chat.sending) return;
  const textarea = form.querySelector('textarea[name="body"]');
  const bodyText = textarea.value.trim();
  // Validate early before any async work
  const hasAttachment = Boolean(state.chat.attachment);
  const hasGallery = Array.isArray(state.chat.attachments) && state.chat.attachments.length > 0;
  const hasSticker = Boolean(state.chat.pendingStickerId);
  if (!bodyText && !hasAttachment && !hasGallery && !hasSticker) return;
  const room = state.chat.room;
  const clientNonce = `msg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  state.chat.sending = true;
  render(); // show disabled send button
  const payload = { body: bodyText, clientNonce };
  if (hasGallery) {
    payload.attachments = state.chat.attachments.map(a => ({
      dataUrl: a.dataUrl,
      name: a.name,
      type: a.type || 'image',
      width: a.width || 0,
      height: a.height || 0,
      duration: a.duration || 0
    }));
  } else if (state.chat.attachment) {
    payload.attachmentDataUrl = state.chat.attachment.dataUrl;
    payload.attachmentName = state.chat.attachment.name;
    payload.attachmentWidth = state.chat.attachment.width;
    payload.attachmentHeight = state.chat.attachment.height;
    if (state.chat.attachment.type) payload.attachmentType = state.chat.attachment.type;
    if (state.chat.attachment.duration) payload.attachmentDuration = state.chat.attachment.duration;
  }
  if (state.chat.pendingStickerId) {
    payload.stickerId = state.chat.pendingStickerId;
  }
  if (state.chat.replyingToMessage?.id) {
    payload.replyToId = state.chat.replyingToMessage.id;
  }
  if (bodyText && ['personal','work'].includes(state.chat.room.surface)) {
    const encrypted = await encryptTextForRoom(state.chat.room, bodyText);
    Object.assign(payload, encrypted);
  }
  const replyTo = state.chat.replyingToMessage ? {
    id: state.chat.replyingToMessage.id,
    body: state.chat.replyingToMessage.displayBody || state.chat.replyingToMessage.body || '',
    author: state.chat.replyingToMessage.author
  } : null;
  const optimisticAttachment = hasGallery
    ? (state.chat.attachments.length === 1 ? {
        ...state.chat.attachments[0],
        url: state.chat.attachments[0].dataUrl
      } : null)
    : (state.chat.attachment ? { ...state.chat.attachment, url: state.chat.attachment.dataUrl } : null);
  const optimisticAttachments = hasGallery && state.chat.attachments.length > 1
    ? state.chat.attachments.map(item => ({ ...item, url: item.dataUrl }))
    : [];
  const optimisticSticker = state.chat.pendingStickerId ? findStickerFromPacks(state.chat.pendingStickerId) : null;
  const optimisticMessage = {
    id: clientNonce,
    clientNonce,
    roomId: room.id,
    body: payload.encrypted ? '' : bodyText,
    displayBody: bodyText,
    deleted: false,
    edited: false,
    encrypted: Boolean(payload.encrypted),
    ciphertext: payload.ciphertext || '',
    iv: payload.iv || '',
    attachment: optimisticAttachment,
    attachments: optimisticAttachments,
    sticker: optimisticSticker,
    replyToId: replyTo?.id || null,
    replyTo,
    reactions: [],
    confirmedAt: null,
    confirmedByUserId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: currentUser(),
    ownedBySession: true,
    pending: true
  };
  try {
    // Clear draft immediately for snappy UX
    textarea.value = '';
    _chatTextareaDraft = '';
    state.chat.messages.push(optimisticMessage);
    state.chat.forceScrollBottom = true;
    render();
    scrollChatToBottom(true);
    const response = await api(`/api/chat/rooms/${encodeURIComponent(state.chat.room.slug)}/messages`, { method: 'POST', body: JSON.stringify(payload) });
    const resolvedMessage = {
      ...normalizeMessageForViewer(response.item),
      pending: false,
      displayBody: response.item.encrypted ? await decryptMessage(state.chat.room, response.item) : response.item.body
    };
    const pendingIndex = state.chat.messages.findIndex(m => m.clientNonce === clientNonce || m.id === clientNonce);
    if (pendingIndex >= 0) state.chat.messages[pendingIndex] = resolvedMessage;
    else if (!state.chat.messages.find(m => Number(m.id) === Number(response.item.id))) state.chat.messages.push(resolvedMessage);
    state.chat.attachment = null;
    state.chat.attachments = [];
    state.chat.pendingStickerId = null;
    state.chat.stickerPicker = false;
    state.chat.replyingToMessage = null;
    state.chat.emojiPickerMsgId = null;
    state.chat.forceScrollBottom = true;
    render();
    scrollChatToBottom(true);
  } catch (err) {
    // Restore draft on error
    textarea.value = bodyText;
    _chatTextareaDraft = bodyText;
    state.chat.messages = state.chat.messages.filter(m => m.clientNonce !== clientNonce && m.id !== clientNonce);
    throw err;
  } finally {
    state.chat.sending = false;
    render();
  }
}
function renderEmojiPicker() {
  return `<div class="emoji-picker-bar">
    ${QUICK_EMOJIS.map(e => `<button type="button" class="emoji-btn" data-action="send-reaction" data-msg-id="${state.chat.emojiPickerMsgId}" data-room-slug="${state.chat.room?.slug}" data-emoji="${e}">${e}</button>`).join('')}
    <button type="button" class="emoji-btn close-btn" data-action="close-emoji-picker">${icons.close}</button>
  </div>`;
}

function renderReplyBar() {
  const msg = state.chat.replyingToMessage;
  return `<div class="reply-bar">
    <div class="reply-bar-content">
      <span>Replying to <strong>${escapeHtml(msg.author?.displayName || '')}</strong></span>
      <span class="reply-preview-text">${escapeHtml((msg.displayBody || msg.body || '').slice(0, 80))}</span>
    </div>
    <button type="button" class="icon-button compact ghost-button" data-action="cancel-reply">${icons.close}</button>
  </div>`;
}

function renderTypingIndicator(room) {
  if (!room?.slug) return '';
  const typingUsers = Object.values(state.typing[room.slug] || {});
  if (!typingUsers.length) return '';
  const names = typingUsers.map(u => escapeHtml(u.displayName || u.handle)).slice(0, 3);
  const label = names.length === 1 ? `${names[0]} is typing…` : `${names.join(', ')} are typing…`;
  return `<div class="typing-indicator"><span class="typing-dots"><span></span><span></span><span></span></span><span>${label}</span></div>`;
}

function scrollChatToBottom(force = false) {
  requestAnimationFrame(() => {
    const node = document.getElementById('chat-scroll');
    if (!node) return;
    if (force) {
      node.scrollTop = node.scrollHeight;
    } else {
      // Only auto-scroll if user was near bottom already
      const nearBottom = node.scrollHeight - node.scrollTop - node.clientHeight < 120;
      if (nearBottom) node.scrollTop = node.scrollHeight;
    }
  });
}

document.addEventListener('click', async (event) => {
  const et = event.target;
  if (!et || typeof et.closest !== 'function') return;
  // Close media picker on outside click
  if (state.chat.mediaPicker) {
    const inPicker = et.closest('.media-picker, [data-action="toggle-media-picker"]');
    if (!inPicker) { state.chat.mediaPicker = false; render(); }
  }
  // FIX: close sort dropdown when clicking outside it
  if (state.modal?.type === 'sort-menu') {
    const inSort = et.closest('.sort-menu-popover, [data-action="toggle-sort-menu"]');
    if (!inSort) { state.modal = null; document.body.classList.remove('modal-open'); render(); }
  }
  // Mobile: tap message bubble to toggle actions visibility. Skip when clicking an
  // actual control (button/link/data-action); those handle themselves.
  if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) {
    const bubble = et.closest('.message-bubble-wrap');
    const hitControl = et.closest('button, a, [data-action], .msg-actions, .reaction-btn, .reply-preview');
    if (bubble && !hitControl) {
      const wasActive = bubble.classList.contains('is-active');
      document.querySelectorAll('.message-bubble-wrap.is-active').forEach((el) => el.classList.remove('is-active'));
      if (!wasActive) bubble.classList.add('is-active');
      return;
    }
    if (!bubble) {
      document.querySelectorAll('.message-bubble-wrap.is-active').forEach((el) => el.classList.remove('is-active'));
    }
  }
  const target = et.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  try {
    switch (action) {
      case 'nav': {
        event.preventDefault();
        if (state.drawerOpen) {
          state.drawerOpen = false;
          document.body.classList.remove('drawer-open');
        }
        navigate(target.dataset.path);
        break;
      }
      case 'toggle-drawer': state.drawerOpen = !state.drawerOpen; document.body.classList.toggle('drawer-open', state.drawerOpen); render(); break;
      case 'toggle-friends-panel': state.chat.friendsExpanded = !state.chat.friendsExpanded; render(); break;
      case 'room-info-tab': state.chat.roomInfoTab = target.dataset.tab || 'info'; render(); break;
      case 'site-upload-mode': state.siteUploadMode = target.dataset.mode === 'archive' ? 'archive' : 'html'; render(); break;
      case 'open-modal': {
        const type = target.dataset.modal;
        if (type === 'profile-list') {
          const handle = target.dataset.handle;
          const list = target.dataset.list || 'followers';
          setModal({ type, handle, list, users: null, loading: true });
          try {
            if (list === 'projects' || list === 'sites') {
              let payload = getActiveProfilePayload(handle);
              if (!payload && handle) {
                payload = await api(`/api/public/profile/${encodeURIComponent(handle)}`);
              }
              state.modal = { type, handle, list, items: payload?.[list] || [], loading: false };
              render();
              break;
            }
            const r = await api(`/api/public/profile/${encodeURIComponent(handle)}/relations?kind=${encodeURIComponent(list)}`);
            state.modal = { type, handle, list, users: r.users || [], loading: false };
            render();
          } catch (err) {
            state.modal = { type, handle, list, users: [], loading: false, error: err.message };
            render();
          }
          break;
        }
        setModal({
          type,
          room: target.dataset.room || null,
          postId: target.dataset.postId || null,
          workspaceId: target.dataset.workspaceId || null,
          post: target.dataset.postId ? findVisiblePost(target.dataset.postId) : null
        }); break;
      }
      case 'close-modal': closeModal(); break;
      case 'open-profile': navigate(`/@${target.dataset.handle}`); break;
      case 'open-room':
        // Clear unread for this room when user opens it
        if (state.chat.unread[target.dataset.slug]) {
          delete state.chat.unread[target.dataset.slug];
        }
        if (state.route.name !== 'messages') navigate(`/messages/${target.dataset.slug}`);
        else await loadChatRoom(target.dataset.slug, true);
        break;
      case 'toggle-comments': await ensureComments(target.dataset.id); break;
      case 'reply-post': {
        const postId = target.dataset.id;
        await ensureComments(postId, true);
        setTimeout(() => {
          const input = document.querySelector(`[data-reply-input="${postId}"]`);
          if (input) { input.focus(); input.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        }, 80);
        break;
      }
      case 'select-plan': {
        const planId = target.dataset.plan;
        toast(`Plan "${planId}" selected. Payment setup is coming soon — contact support to activate.`, 'info');
        break;
      }
      case 'open-lightbox': {
        const src = target.dataset.src || target.getAttribute('src');
        if (src) {
          openLightboxState(src, target.dataset.alt || target.getAttribute('alt') || '', target.dataset.mediaType || 'image');
          render();
        }
        break;
      }
      case 'lightbox-media':
        break;
      case 'lightbox-prev':
        shiftLightbox(-1);
        break;
      case 'lightbox-next':
        shiftLightbox(1);
        break;
      case 'close-lightbox': state.lightbox = null; render(); break;
      case 'like-post': await api(`/api/public/feed/${target.dataset.id}/likes`, { method: 'POST', body: '{}' }); await loadFeed(); render(); break;
      case 'edit-post': setModal({ type: 'edit-post', postId: target.dataset.id, post: findVisiblePost(target.dataset.id) }); break;
      case 'share-post': {
        const shareUrl = `${location.origin}/feed#post-${target.dataset.id}`;
        if (navigator.share) {
          navigator.share({ url: shareUrl }).catch(() => navigator.clipboard.writeText(shareUrl));
        } else {
          await navigator.clipboard.writeText(shareUrl);
        }
        toast('Link copied.', 'success'); break;
      }
      case 'feed-tab': state.feed.tab = target.dataset.value; await loadFeed(); render(); break;
      case 'chat-tab': state.chat.tab = target.dataset.value; render(); break;
      case 'open-search': navigate('/discover'); break;
      case 'toggle-sort-menu': {
        // FIX: use inline sort dropdown, not modal overlay
        const newModal = (state.modal?.type === 'sort-menu' && state.modal?.scope === target.dataset.scope)
          ? null
          : { type: 'sort-menu', scope: target.dataset.scope };
        state.modal = newModal;
        document.body.classList.toggle('modal-open', Boolean(newModal));
        render();
        break;
      }
      case 'settings-tab': {
        const tab = target.dataset.tab || 'profile';
        state.settingsTab = tab;
        state.settingsMobileView = 'panel';
        if (state.route.name === 'settings') history.replaceState({}, '', `/settings?tab=${tab}`);
        render(); break;
      }
      case 'settings-mobile-back': {
        state.settingsMobileView = 'list';
        render(); break;
      }
      case 'set-sort': {
        const scope = target.dataset.scope; const value = target.dataset.value;
        if (scope === 'feed') { state.feed.sort = value; closeModal(); await loadFeed(); }
        else { state.discover.sort = value; closeModal(); await loadDiscover(); }
        render(); break;
      }
      case 'open-edit-site': {
        const site = findOwnedSite(target.dataset.id);
        if (!site) { toast('Site not found.', 'error'); break; }
        setModal({ type: 'edit-site', siteId: site.id, site, loading: true, error: '' });
        try {
          const response = await api(`/api/me/sites/${site.id}`);
          if (state.modal?.type === 'edit-site' && Number(state.modal.siteId) === Number(site.id)) {
            state.modal = { ...state.modal, site: response.site, loading: false, error: '' };
            render();
          }
        } catch (error) {
          if (state.modal?.type === 'edit-site' && Number(state.modal.siteId) === Number(site.id)) {
            state.modal = { ...state.modal, loading: false, error: error.message };
            render();
          }
        }
        break;
      }
      case 'read-notification': await api(`/api/me/notifications/${target.dataset.id}/read`, { method: 'POST', body: '{}' }); if (target.dataset.href) navigate(target.dataset.href); await loadBootstrap(); break;
      case 'switch-account': await switchAccount(target.dataset.token); break;
      case 'remove-saved-account': {
        const removeId = Number(target.dataset.id);
        state.savedAccounts = state.savedAccounts.filter(a => a.id !== removeId);
        persistSavedAccounts();
        render(); break;
      }
      case 'logout': await api('/api/auth/logout', { method: 'POST', body: '{}' }); closeSSE(); state.bootstrap = null; state.me = null; state.meLoaded = false; state.drawerOpen = false; navigate('/'); await loadBootstrap(); break;
      case 'quick-theme':
        localStorage.setItem('jb_theme', target.dataset.value);
        if (state.me?.user) state.me.user.themePreference = target.dataset.value;
        document.documentElement.dataset.theme = target.dataset.value;
        api('/api/me/preferences', { method: 'PATCH', body: JSON.stringify({ themePreference: target.dataset.value, languagePreference: currentLang() }) }).catch(() => {});
        render(); break;
      case 'quick-lang':
        localStorage.setItem('jb_lang', target.dataset.value);
        if (state.me?.user) state.me.user.languagePreference = target.dataset.value;
        document.documentElement.lang = target.dataset.value;
        api('/api/me/preferences', { method: 'PATCH', body: JSON.stringify({ languagePreference: target.dataset.value, themePreference: currentTheme() }) }).catch(() => {});
        render(); break;

      case 'start-chat': {
        const surface = target.dataset.surface || 'personal';
        const existing = findExistingDirectRoom(target.dataset.handle, surface);
        if (existing) {
          if (state.route.name === 'messages') await loadChatRoom(existing.slug, true);
          else navigate(`/messages/${existing.slug}`);
          break;
        }
        const payload = await api(`/api/chat/direct/${encodeURIComponent(target.dataset.handle)}`, { method: 'POST', body: JSON.stringify({ surface }) });
        navigate(`/messages/${payload.room.slug}`); await loadChatBootstrap(); break;
      }
      case 'toggle-follow': await toggleFollow(target.dataset.handle); break;
      case 'friend-request': await sendFriendRequest(target.dataset.handle); break;
      case 'select-sticker-pack': state.chat.stickerPackId = target.dataset.packId; render(); break;
      case 'toggle-chat-stickers': // legacy
      case 'toggle-media-picker':
        state.chat.mediaPicker = !state.chat.mediaPicker;
        state.chat.stickerPicker = false;
        state.chat.emojiPickerMsgId = null;
        if (state.chat.mediaPicker) state.chat.mediaTab = 'emoji';
        render(); break;

      case 'close-media-picker':
        state.chat.mediaPicker = false;
        state.chat.emojiPickerMsgId = null;
        render(); break;

      case 'media-tab':
        state.chat.mediaTab = target.dataset.tab;
        state.chat.mediaSearch = '';
        render(); break;

      case 'pick-media-pack':
        state.chat.mediaPackId = target.dataset.packId || null;
        render(); break;

      case 'insert-emoji': {
        const ta2 = document.getElementById('chat-textarea');
        const em = target.dataset.emoji;
        if (ta2) {
          const s = ta2.selectionStart, e2 = ta2.selectionEnd;
          ta2.value = ta2.value.slice(0, s) + em + ta2.value.slice(e2);
          ta2.selectionStart = ta2.selectionEnd = s + em.length;
          _chatTextareaDraft = ta2.value;
          ta2.focus();
        }
        render(); break;
      }

      case 'pick-sticker': {
        state.chat.pendingStickerId = Number(target.dataset.id);
        state.chat.mediaPicker = false;
        render();
        const frm = document.querySelector('[data-form="send-message"]');
        if (frm) frm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        break;
      }

      // ── Message edit / delete ─────────────────────────────────────────────
      case 'edit-message': {
        state.chat.editingMessageId = Number(target.dataset.msgId);
        state.chat.mediaPicker = false;
        render();
        setTimeout(() => document.getElementById(`edit-ta-${state.chat.editingMessageId}`)?.focus(), 40);
        break;
      }
      case 'cancel-edit':
        state.chat.editingMessageId = null; render(); break;

      case 'jump-to-latest': {
        const scroll = document.getElementById('chat-scroll');
        if (scroll) {
          scroll.scrollTo({ top: scroll.scrollHeight, behavior: 'smooth' });
          state.chat.unreadCount = 0;
          setTimeout(updateJumpToLatest, 240);
        }
        break;
      }

      // ── Reply / React ─────────────────────────────────────────────────────
      case 'reply-message': {
        const msg = state.chat.messages.find(m => m.id === Number(target.dataset.msgId));
        if (msg) {
          state.chat.replyingToMessage = msg;
          state.chat.mediaPicker = false;
          state.chat.emojiPickerMsgId = null;
          render();
          document.getElementById('chat-textarea')?.focus();
        }
        break;
      }
      case 'cancel-reply': state.chat.replyingToMessage = null; render(); break;

      case 'message-status-info':
        if (target.dataset.label) toast(target.dataset.label, 'info');
        break;

      case 'react-emoji': {
        const msgId = Number(target.dataset.msgId);
        state.chat.mediaPicker = false;
        state.chat.emojiPickerMsgId = state.chat.emojiPickerMsgId === msgId ? null : msgId;
        render();
        break;
      }
      case 'confirm-message': {
        const msgId = Number(target.dataset.msgId);
        const slug = target.dataset.roomSlug || state.chat.room?.slug;
        if (!msgId || !slug) break;
        const response = await api(`/api/chat/rooms/${encodeURIComponent(slug)}/messages/${msgId}/confirm`, { method: 'POST', body: '{}' });
        const idx = state.chat.messages.findIndex(m => Number(m.id) === msgId);
        if (idx >= 0) state.chat.messages[idx] = { ...state.chat.messages[idx], ...response.item, displayBody: state.chat.messages[idx].displayBody };
        render();
        break;
      }
      case 'close-emoji-picker':
        state.chat.emojiPickerMsgId = null;
        render();
        break;

      case 'toggle-reaction':
      case 'send-reaction': {
        const emoji = target.dataset.emoji;
        const msgId = target.dataset.msgId;
        const slug  = target.dataset.roomSlug || state.chat.room?.slug;
        if (!emoji || !msgId || !slug) break;
        await api(`/api/chat/rooms/${encodeURIComponent(slug)}/messages/${msgId}/reactions`,
          { method: 'POST', body: JSON.stringify({ emoji }) });
        state.chat.emojiPickerMsgId = null;
        // Optimistic update
        const m = state.chat.messages.find(m => m.id === Number(msgId));
        if (m) {
          if (!m.reactions) m.reactions = [];
          const ex = m.reactions.find(r => r.emoji === emoji);
          if (ex) { ex.count += ex.me ? -1 : 1; ex.me = !ex.me; if (ex.count <= 0) m.reactions = m.reactions.filter(r => r.emoji !== emoji); }
          else m.reactions.push({ emoji, count: 1, me: true });
        }
        render(); break;
      }
      case 'open-chat-settings':
        setModal({ type: 'chat-room-settings', roomSlug: target.dataset.slug || state.chat.room?.slug });
        break;
      case 'clear-room-chat-theme': {
        const roomSlug = target.dataset.roomSlug;
        if (!roomSlug) break;
        if (state.me?.user?.settings?.chatThemesByRoom) delete state.me.user.settings.chatThemesByRoom[roomSlug];
        render();
        await api(`/api/chat/rooms/${encodeURIComponent(roomSlug)}/preferences`, { method: 'PATCH', body: JSON.stringify({ clearTheme: true }) });
        await loadMe(true);
        toast(t('settingsUpdated'), 'success');
        break;
      }

      // ── Delete project ────────────────────────────────────────────────────
      case 'delete-project':
        if (!confirm('Delete this project? This cannot be undone.')) break;
        await api(`/api/me/projects/${target.dataset.id}`, { method: 'DELETE', body: '{}' });
        await loadBootstrap();
        toast('Project deleted.', 'success');
        render(); break;
      case 'confirm-edit': {
        const ta = document.getElementById(`edit-ta-${target.dataset.msgId}`);
        const newBody = ta?.value?.trim();
        if (!newBody) { toast('Cannot be empty.', 'error'); break; }
        await api(`/api/chat/rooms/${encodeURIComponent(target.dataset.roomSlug)}/messages/${target.dataset.msgId}`, { method: 'PATCH', body: JSON.stringify({ body: newBody }) });
        state.chat.editingMessageId = null;
        const idx = state.chat.messages.findIndex(m => m.id === Number(target.dataset.msgId));
        if (idx >= 0) { state.chat.messages[idx] = { ...state.chat.messages[idx], displayBody: newBody, edited: true }; }
        render(); break;
      }
      case 'delete-message': {
        if (!confirm('Delete this message?')) break;
        await api(`/api/chat/rooms/${encodeURIComponent(target.dataset.roomSlug)}/messages/${target.dataset.msgId}`, { method: 'DELETE', body: '{}' });
        const di = state.chat.messages.findIndex(m => m.id === Number(target.dataset.msgId));
        if (di >= 0) { state.chat.messages[di] = { ...state.chat.messages[di], deleted: true, displayBody: '[deleted]' }; }
        render(); break;
      }
      case 'send-sticker': state.chat.pendingStickerId = Number(target.dataset.id); state.chat.stickerPicker = false; render(); break;
      case 'attach-chat-image': document.getElementById('chat-file-input')?.click(); break;
      case 'clear-chat-attachment': state.chat.attachment = null; render(); break;
      case 'remove-chat-attachment': {
        const idx = Number(target.dataset.index || -1);
        if (idx >= 0 && Array.isArray(state.chat.attachments)) {
          state.chat.attachments.splice(idx, 1);
          render();
        }
        break;
      }
      case 'toggle-voice-record': await toggleVoiceRecord(); break;
      case 'chat-back': state.chat.mobileView = 'list'; render(); break;
      case 'toggle-room-side':
        setModal({ type: 'chat-room-settings', roomSlug: target.dataset.slug || state.chat.room?.slug });
        break;
      case 'room-state': {
        await api(`/api/chat/rooms/${encodeURIComponent(target.dataset.slug)}`, { method: 'PATCH', body: JSON.stringify({ state: { [target.dataset.state]: target.dataset.value === 'true' } }) });
        await loadChatBootstrap();
        if (state.chat.room?.slug === target.dataset.slug) await loadChatRoom(target.dataset.slug);
        break;
      }
      case 'delete-room': await api(`/api/chat/rooms/${encodeURIComponent(target.dataset.slug)}`, { method: 'DELETE', body: '{}' }); await loadChatBootstrap(); state.chat.room = null; toast('Updated.', 'success'); break;
      case 'copy-site-link': await navigator.clipboard.writeText(`${location.origin}${target.dataset.path}`); toast('Link copied.', 'success'); break;
      case 'submit-site-review': {
        const response = await api(`/api/me/sites/${target.dataset.id}/submit-review`, { method: 'POST', body: '{}' });
        if (response?.site) {
          patchVisibleSites(target.dataset.id, () => response.site);
          if (state.modal?.type === 'edit-site' && Number(state.modal.siteId) === Number(target.dataset.id)) {
            state.modal = { ...state.modal, site: { ...(state.modal.site || {}), ...response.site } };
          }
        }
        render();
        toast('Site submitted for review.', 'success');
        break;
      }
      case 'delete-site': await api(`/api/me/sites/${target.dataset.id}`, { method: 'DELETE', body: '{}' }); await loadSitesMine(); toast('Site removed.', 'success'); break;
      case 'export-data': { const payload = await api('/api/me/export'); const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `justbreath-${currentUser().handle}-export.json`; a.click(); URL.revokeObjectURL(url); break; }
      case 'create-backup': { const payload = await api('/api/me/backups', { method: 'POST', body: '{}' }); toast(payload.href || 'Backup created.', 'success'); break; }
      case 'delete-workspace': {
        if (!confirm('Delete this workspace? All channels and messages will be permanently removed.')) break;
        await api(`/api/me/workspaces/${target.dataset.id}`, { method: 'DELETE', body: '{}' });
        closeModal();
        await loadChatBootstrap();
        state.chat.room = null;
        toast('Workspace deleted.', 'success');
        render(); break;
      }

      case 'load-room-members': {
        const slugRM = target.dataset.slug;
        const dataRM = await api(`/api/chat/rooms/${encodeURIComponent(slugRM)}/members`);
        state.memberList = dataRM.members || [];
        state.memberListRoom = state.memberListRoom === slugRM ? null : slugRM;
        render(); break;
      }
      case 'delete-post':
        if (!confirm('Delete this post?')) break;
        await api(`/api/me/posts/${target.dataset.id}`, { method: 'DELETE', body: '{}' });
        await loadFeed(); render(); toast('Post deleted.', 'success'); break;
      case 'delete-bot':
        if (!confirm('Delete this bot token? Any scripts using it will stop working.')) break;
        await api(`/api/me/bots/${target.dataset.id}`, { method: 'DELETE', body: '{}' });
        await loadBootstrap();
        toast('Token deleted.', 'success');
        render(); break;

      case 'delete-notification':
        await api(`/api/me/notifications/${target.dataset.id}`, { method: 'DELETE', body: '{}' });
        await loadBootstrap(); render(); break;
      case 'respond-friend':
        await respondFriendRequest(target.dataset.id, target.dataset.value === 'accept' ? 'accept' : 'deny');
        break;
      case 'set-status': {
        const s = target.dataset.value;
        api('/api/me/status', { method: 'PATCH', body: JSON.stringify({ status: s }) }).catch(() => {});
        if (state.me?.user) state.me.user.status = s;
        render(); break;
      }
      case 'regen-e2ee-key': {
        const keyName = `jb_e2ee_keypair_${currentUser()?.id}`;
        localStorage.removeItem(keyName);
        state.crypto = null;
        await ensureE2EEKeys();
        toast('Encryption key regenerated.', 'success');
        render(); break;
      }
      case 'unlink-oauth': {
        const provider = target.dataset.provider;
        if (!provider) break;
        if (!confirm(`Disconnect ${provider}?`)) break;
        try {
          await api('/api/auth/unlink', { method: 'POST', body: JSON.stringify({ provider }) });
          await loadMe();
          toast(`${provider} disconnected.`, 'success');
        } catch (err) {
          toast(err.message || 'Could not disconnect.', 'error');
        }
        render(); break;
      }
      case 'connect-telegram': {
        toast('Telegram integration is on the way.', 'info');
        break;
      }
      case 'apply-crop': {
        const bind = _cropBinding;
        if (!bind || !state.modal || state.modal.type !== 'crop-image') { closeModal(); break; }
        const dataUrl = bind.canvas.toDataURL('image/jpeg', 0.88);
        const targetName = state.modal.targetInputName;
        if (targetName === 'avatarDataUrl' || targetName === 'bannerDataUrl') {
          state.profileDraftMedia = { ...state.profileDraftMedia, [targetName]: dataUrl };
        }
        _cropBinding = null;
        closeModal();
        toast('Crop ready — save to apply.', 'success');
        break;
      }
      case 'send-gif': {
        const gifUrl = target.dataset.url;
        const gifPreview = target.dataset.preview;
        state.chat.mediaPicker = false;
        // Build message with image attachment
        if (state.chat.room) {
          state.chat.sending = true;
          render();
          try {
            await api(`/api/chat/rooms/${encodeURIComponent(state.chat.room.slug)}/messages`, {
              method: 'POST',
              body: JSON.stringify({ body: '', attachmentUrl: gifUrl, attachmentName: 'GIF', attachmentType: 'image', attachmentWidth: 320, attachmentHeight: 240 })
            });
          } finally { state.chat.sending = false; render(); }
        }
        break;
      }

      case 'pin-message': {
        await api(`/api/chat/rooms/${encodeURIComponent(target.dataset.roomSlug)}/messages/${target.dataset.msgId}/pin`, { method: 'POST', body: '{}' });
        const pinData = await api(`/api/chat/rooms/${encodeURIComponent(target.dataset.roomSlug)}/pinned`);
        state.pinnedMessages = pinData.items || [];
        render(); break;
      }
      case 'admin-tab': state.adminTab = target.dataset.tab; render(); break;
      case 'admin-ban': {
        const reason = prompt(`Ban reason for @${target.dataset.handle}:`);
        if (reason === null) break;
        await api(`/api/admin/users/${encodeURIComponent(target.dataset.handle)}`, { method: 'PATCH', body: JSON.stringify({ ban: true, reason }) });
        await loadAdminData(); render(); toast('User banned.', 'success'); break;
      }
      case 'admin-unban':
        await api(`/api/admin/users/${encodeURIComponent(target.dataset.handle)}`, { method: 'PATCH', body: JSON.stringify({ ban: false }) });
        await loadAdminData(); render(); toast('Unbanned.', 'success'); break;
      // ── Mail actions ─────────────────────────────────────────────────
      case 'compose-mail':
        state.mail.composing = true; render(); break;
      case 'close-compose-mail':
        state.mail.composing = false; render(); break;
      case 'mail-folder': {
        state.mail.folder = target.dataset.folder;
        state.mail.selected = null;
        navigate(`/mail/${target.dataset.folder}`);
        await loadMail(target.dataset.folder);
        render(); break;
      }
      case 'open-mail': {
        const mailId = Number(target.dataset.id);
        const folder = state.mail.folder;
        const arr = folder === 'inbox' ? state.mail.inbox : state.mail.sent;
        state.mail.selected = arr.find(m => m.id === mailId) || null;
        if (state.mail.selected && !state.mail.selected.readAt && folder === 'inbox') {
          api(`/api/mail/${mailId}/read`, { method: 'POST', body: '{}' }).catch(() => {});
          state.mail.selected.readAt = new Date().toISOString();
          state.mail.unread = Math.max(0, state.mail.unread - 1);
        }
        render(); break;
      }
      case 'delete-mail':
        await api(`/api/mail/${target.dataset.id}`, { method: 'DELETE', body: '{}' });
        state.mail.selected = null;
        await loadMail();
        render(); toast('Deleted.', 'success'); break;
      case 'reply-mail': {
        state.mail.composing = true;
        render();
        // Pre-fill the "To" field after render
        setTimeout(() => {
          const inp = document.querySelector('[data-form="send-mail"] [name="to"]');
          if (inp) inp.value = target.dataset.handle;
        }, 50);
        break;
      }

      // ── Email verification ───────────────────────────────────────────────
      case 'send-verify-email':
        try {
          const r = await api('/api/auth/send-verify', { method: 'POST', body: '{}' });
          toast(r.hint || 'Code sent.', 'success');
        } catch(e) { toast(e.message, 'error'); }
        break;

      // ── Guest login ───────────────────────────────────────────────────────
      case 'guest-login': {
        // Local-only guest mode: NO server profile is created. Purely cached on this device.
        localStorage.setItem('jb_guest_mode', '1');
        state.guest = true;
        syncRealtimeTransport();
        state.me = null;
        state.meLoaded = false;
        state.drawerOpen = false;
        document.body.classList.remove('drawer-open');
        closeModal();
        await loadBootstrap();
        render();
        toast('Browsing as guest locally. Chats, sites and settings still require an account.', 'info');
        break;
      }
      case 'guest-exit': {
        localStorage.removeItem('jb_guest_mode');
        state.guest = false;
        syncRealtimeTransport();
        state.drawerOpen = false;
        document.body.classList.remove('drawer-open');
        await loadBootstrap();
        render();
        break;
      }

      // ── Auth sub-view switch ──────────────────────────────────────────────
      case 'auth-sub':
        state.modal = { type: 'auth', sub: target.dataset.sub };
        render(); break;

      case 'resend-verify-email':
        try {
          const r = await api('/api/auth/send-verify', { method: 'POST', body: '{}' });
          toast(r.hint || 'Code re-sent.', 'success');
        } catch (err) { toast(err.message, 'error'); }
        break;

      case 'open-verify-email':
        try { await api('/api/auth/send-verify', { method: 'POST', body: '{}' }); } catch {}
        setModal({ type: 'auth', sub: 'verify', verifyEmail: currentUser()?.email || '' });
        break;

      case 'toggle-maintenance': {
        const token = prompt('Admin token (from .env ADMIN_TOKEN):');
        if (!token) break;
        const enabled = !state.maintenance;
        await api('/api/admin/maintenance', { method: 'POST', body: JSON.stringify({ token, enabled }) });
        state.maintenance = enabled;
        toast(enabled ? 'Maintenance mode enabled.' : 'Maintenance mode disabled.', enabled ? 'error' : 'success');
        render(); break;
      }
      case 'admin-verify':
        await api(`/api/admin/users/${encodeURIComponent(target.dataset.handle)}`, { method: 'PATCH', body: JSON.stringify({ verify: true }) });
        await loadAdminData(); render(); toast('Verified.', 'success'); break;
      case 'open-change-password': setModal({ type: 'change-password' }); break;
      case 'open-change-email': setModal({ type: 'change-email' }); break;
      case 'open-change-handle': setModal({ type: 'change-handle' }); break;
    }
  } catch (error) {
    toast(error.message, 'error');
  }
});

document.addEventListener('change', async (event) => {
  const input = event.target;
  if (!input || typeof input.matches !== 'function') return;
  if (input.matches('#chat-file-input')) {
    const files = Array.from(input.files || []);
    if (!files.length) return;
    const existing = state.chat.attachments || [];
    const capacity = Math.max(0, 10 - existing.length);
    if (!capacity) { toast('Max 10 photos per message.', 'info'); input.value = ''; return; }
    const take = files.slice(0, capacity);
    const compressed = [];
    for (const f of take) {
      try { compressed.push(await compressImageFile(f, 1440, 0.82)); }
      catch { /* skip bad file */ }
    }
    if (!compressed.length) { input.value = ''; return; }
    if (compressed.length === 1 && !existing.length) {
      state.chat.attachments = [compressed[0]];
    } else {
      state.chat.attachments = existing.concat(compressed);
    }
    if (files.length > capacity) toast(`Only ${capacity} photo(s) added (max 10 per message).`, 'info');
    input.value = '';
    render();
  }
  if (input.matches('input[type="file"][data-action="site-file-pick"]')) {
    const kind = input.dataset.kind === 'archive' ? 'archive' : 'html';
    const file = input.files?.[0];
    if (file) {
      _siteFileCache[kind] = file;
      render();
    }
    return;
  }
  if (input.matches('input[type="file"][data-action="open-crop"]')) {
    const file = input.files?.[0];
    if (!file) return;
    const kind = input.dataset.cropKind || 'avatar';
    const aspect = Number(input.dataset.cropAspect || (kind === 'banner' ? 3 : 1));
    const target = input.dataset.cropTarget || '';
    try {
      const dataUrl = await readFileAsDataURL(file);
      state.modal = { type: 'crop-image', kind, aspect, sourceDataUrl: dataUrl, targetInputName: target };
      render();
      // Defer canvas binding until DOM settles
      requestAnimationFrame(() => bindCropStage());
    } catch (err) {
      toast('Could not read image.', 'error');
    }
    // Reset file input so the same file can trigger again
    input.value = '';
  }
});

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

let _cropBinding = null;
function bindCropStage() {
  const canvas = document.getElementById('crop-canvas');
  const zoom = document.getElementById('crop-zoom');
  if (!canvas || !zoom || !state.modal || state.modal.type !== 'crop-image') return;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  const stage = {
    img, scale: 1, tx: 0, ty: 0, dragging: false, lastX: 0, lastY: 0,
    minScale: 1
  };
  img.onload = () => {
    const cw = canvas.width, ch = canvas.height;
    stage.minScale = Math.max(cw / img.width, ch / img.height);
    stage.scale = stage.minScale;
    stage.tx = (cw - img.width * stage.scale) / 2;
    stage.ty = (ch - img.height * stage.scale) / 2;
    drawCrop(ctx, canvas, stage);
  };
  img.src = state.modal.sourceDataUrl;

  zoom.addEventListener('input', () => {
    const mult = Number(zoom.value) / 100;
    stage.scale = stage.minScale * mult;
    clampCrop(canvas, stage);
    drawCrop(ctx, canvas, stage);
  });

  const start = (x, y) => { stage.dragging = true; stage.lastX = x; stage.lastY = y; };
  const move = (x, y) => {
    if (!stage.dragging) return;
    stage.tx += x - stage.lastX;
    stage.ty += y - stage.lastY;
    stage.lastX = x; stage.lastY = y;
    clampCrop(canvas, stage);
    drawCrop(ctx, canvas, stage);
  };
  const end = () => { stage.dragging = false; };

  canvas.addEventListener('mousedown', (e) => start(e.offsetX, e.offsetY));
  canvas.addEventListener('mousemove', (e) => move(e.offsetX, e.offsetY));
  canvas.addEventListener('mouseup', end);
  canvas.addEventListener('mouseleave', end);
  canvas.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    start(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    move(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend', end);

  _cropBinding = { canvas, ctx, stage };
}

function clampCrop(canvas, stage) {
  const iw = stage.img.width * stage.scale;
  const ih = stage.img.height * stage.scale;
  stage.tx = Math.min(0, Math.max(canvas.width - iw, stage.tx));
  stage.ty = Math.min(0, Math.max(canvas.height - ih, stage.ty));
}

function drawCrop(ctx, canvas, stage) {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(stage.img, stage.tx, stage.ty, stage.img.width * stage.scale, stage.img.height * stage.scale);
}

document.addEventListener('input', async (event) => {
  const input = event.target;
  if (!input || typeof input.matches !== 'function') return;
  if (input.matches('[data-input="feed-search"]')) {
    state.feed.search = input.value;
    await loadFeed();
    render();
  }
  if (input.matches('[data-input="discover-search"]')) {
    state.discover.search = input.value;
    await loadDiscover();
    render();
  }
  if (input.matches('[data-input="chat-search"]')) {
    state.chat.search = input.value;
    render();
  }
  if (input.matches('[data-input="media-search"]')) {
    state.chat.mediaSearch = input.value;
    if (state.chat.mediaTab === 'gif' && input.value.length > 1) {
      // Debounced GIF search
      clearTimeout(window._gifTimer);
      window._gifTimer = setTimeout(async () => {
        try {
          const r = await api(`/api/gif/search?q=${encodeURIComponent(input.value)}&limit=12`);
          state.chat.gifResults = r.results || [];
        } catch { state.chat.gifResults = []; }
        render();
      }, 400);
    } else if (state.chat.mediaTab === 'gif') {
      state.chat.gifResults = [];
    }
    render();
  }
  if (input.matches('[data-input="admin-search"]')) {
    await loadAdminUsers(input.value);
    render();
  }
  if (input.matches('[data-input="quick-lang-select"]')) {
    localStorage.setItem('jb_lang', input.value);
    if (state.me?.user) state.me.user.languagePreference = input.value;
    document.documentElement.lang = input.value;
    api('/api/me/preferences', { method: 'PATCH', body: JSON.stringify({ languagePreference: input.value, themePreference: currentTheme() }) }).catch(() => {});
    render();
  }
  // FIX: save textarea draft + auto-grow + emit typing
  if (input.matches('textarea[name="body"]') && input.closest('[data-form="send-message"]')) {
    _chatTextareaDraft = input.value;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 180) + 'px';
    emitTyping(); // real-time typing indicator
  }
});

document.addEventListener('submit', async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  try {
    switch (form.dataset.form) {
      case 'auth-login': await handleAuth(form, 'login'); break;
      case 'auth-register': await handleAuth(form, 'register'); break;
      case 'send-login-code': {
        const d = new FormData(form);
        const email = String(d.get('email') || '').trim();
        const displayName = String(d.get('displayName') || '').trim();
        const r = await api('/api/auth/send-login-code', { method: 'POST', body: JSON.stringify({ email, displayName }) });
        state.modal = { type: 'auth', sub: 'code', email, displayName };
        render();
        toast(r.hint || 'Sign-in code sent.', 'success');
        break;
      }
      case 'login-code': {
        const d = new FormData(form);
        const email = String(d.get('email') || '').trim();
        const displayName = String(d.get('displayName') || '').trim();
        const payload = await api('/api/auth/login-code', { method: 'POST', body: JSON.stringify({ email, displayName, code: d.get('code') }) });
        saveAccountSession(payload.user, payload.sessionToken);
        state.bootstrap = null;
        state.meLoaded = false;
        state.drawerOpen = false;
        document.body.classList.remove('drawer-open');
        closeModal();
        await routeLoad();
        toast('Signed in.', 'success');
        break;
      }
      case 'profile-settings': await handleProfileSettings(form); break;
      case 'appearance-settings': await handleAppearanceSettings(form); break;
      case 'privacy-settings': await handlePrivacySettings(form); break;
      case 'chat-settings': await handleChatSettings(form); break;
      case 'room-chat-theme': await handleRoomChatTheme(form); break;
      case 'create-project': await handleProjectCreate(form); break;
      case 'create-site-template': await handleSiteTemplate(form); break;
      case 'create-site-upload': await handleSiteUpload(form); break;
      case 'create-workspace': await handleWorkspaceCreate(form); break;
      case 'create-group': await handleGroupCreate(form); break;
      case 'create-post': await handleCreatePost(form, form.dataset.kind); break;
      case 'verification-request': await handleVerificationRequest(form); break;
      case 'delete-account': await handleDeleteAccount(form); break;
      case 'comment': await handleCommentSubmit(form); break;
      case 'send-message': await sendChatMessage(form); break;
      case 'create-invite': await handleCreateInvite(form.dataset.room, form); break;
      case 'create-sticker-pack': await handleCreateStickerPack(form); break;
      case 'create-sticker': await handleCreateSticker(form); break;
      case 'send-mail': {
        const d = new FormData(form);
        await api('/api/mail', { method: 'POST', body: JSON.stringify({ to: d.get('to'), subject: d.get('subject'), body: d.get('body') }) });
        state.mail.composing = false;
        await loadMail('sent');
        toast('Sent.', 'success'); break;
      }
      case 'verify-email': {
        const d = new FormData(form);
        await api('/api/auth/verify-email', { method: 'POST', body: JSON.stringify({ code: d.get('code') }) });
        const wasAuthModal = state.modal?.type === 'auth' && state.modal?.sub === 'verify';
        state.bootstrap = null; state.meLoaded = false;
        await loadBootstrap();
        toast('Email verified.', 'success');
        if (wasAuthModal) { closeModal(); await routeLoad(); }
        else navigate('/settings');
        break;
      }
      case 'forgot-password': {
        const d = new FormData(form);
        const r = await api('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email: d.get('email') }) });
        toast(r.hint || 'Code sent to your email.', 'success');
        break;
      }
      case 'reset-password': {
        const d = new FormData(form);
        await api('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ email: d.get('email'), code: d.get('code'), newPassword: d.get('newPassword') }) });
        closeModal();
        toast('Password reset! Sign in with your new password.', 'success');
        break;
      }
      case 'edit-post': {
        const d = new FormData(form);
        const payload = await api(`/api/me/posts/${form.dataset.postId}`, { method: 'PATCH', body: JSON.stringify({ title: d.get('title'), body: d.get('body'), excerpt: d.get('excerpt') }) });
        if (payload?.post) patchVisiblePosts(form.dataset.postId, () => payload.post);
        closeModal();
        render();
        toast('Post updated.', 'success');
        break;
      }
      case 'edit-site': {
        const site = findOwnedSite(form.dataset.siteId);
        if (!site) throw new Error('Site not found.');
        const d = new FormData(form);
        const payload = {
          title: d.get('title'),
          summary: d.get('summary'),
          visibility: d.get('visibility')
        };
        const templateConfig = {
          indexingMode: d.get('indexingMode'),
          brandName: d.get('brandName'),
          tagline: d.get('tagline'),
          logoUrl: d.get('logoUrl'),
          faviconUrl: d.get('faviconUrl'),
          themePreset: d.get('themePreset'),
          polishMode: d.get('polishMode'),
          accent: d.get('accent'),
          bg: d.get('bg'),
          surface: d.get('surface'),
          text: d.get('text'),
          muted: d.get('muted'),
          font: d.get('font'),
          radiusStyle: d.get('radiusStyle'),
          maxWidth: d.get('maxWidth'),
          seoTitle: d.get('seoTitle'),
          seoDescription: d.get('seoDescription'),
          seoKeywords: d.get('seoKeywords'),
          canonicalUrl: d.get('canonicalUrl'),
          ogImageUrl: d.get('ogImageUrl'),
          legalName: d.get('legalName'),
          schemaType: d.get('schemaType'),
          supportEmail: d.get('supportEmail'),
          phone: d.get('phone'),
          contact: d.get('contact'),
          address: d.get('address'),
          privacyUrl: d.get('privacyUrl'),
          termsUrl: d.get('termsUrl'),
          ctaLabel: d.get('ctaLabel'),
          ctaHref: d.get('ctaHref'),
          customCss: d.get('customCss')
        };
        if (site.mode === 'template') {
          Object.assign(templateConfig, {
            eyebrow: d.get('eyebrow'),
            hero: d.get('hero'),
            body: d.get('body'),
            links: parseSiteLinksInput(d.get('links')),
            gallery: parseSiteGalleryInput(d.get('gallery'))
          });
        }
        payload.templateConfig = templateConfig;
        if (site.mode === 'upload') {
          const archiveFile = d.get('archive');
          if (archiveFile?.size) {
            if (archiveFile.size > 5 * 1024 * 1024) throw new Error('Archive must stay under 5 MB.');
            payload.archiveBase64 = await readFileAsBase64(archiveFile);
            payload.archiveName = archiveFile.name;
          } else {
            payload.htmlContent = d.get('htmlContent');
          }
        }
        const response = await api(`/api/me/sites/${form.dataset.siteId}`, { method: 'PATCH', body: JSON.stringify(payload) });
        if (response?.site) patchVisibleSites(form.dataset.siteId, () => response.site);
        closeModal();
        render();
        toast(t('settingsUpdated'), 'success');
        break;
      }
      case 'edit-workspace': {
        const d = new FormData(form);
        await api(`/api/me/workspaces/${form.dataset.wsId}`, { method: 'PATCH', body: JSON.stringify({ title: d.get('title'), description: d.get('description'), visibility: d.get('visibility') }) });
        closeModal(); await loadBootstrap(); toast(t('settingsUpdated'), 'success'); break;
      }
      case 'create-workspace-room': {
        const d = new FormData(form);
        await api(`/api/me/workspaces/${form.dataset.wsId}/rooms`, { method: 'POST', body: JSON.stringify({ title: d.get('title'), visibility: d.get('visibility') }) });
        closeModal(); await loadChatBootstrap(); toast('Channel created.', 'success'); break;
      }
      case 'change-password': {
        const d = new FormData(form);
        await api('/api/me/password', { method: 'PATCH', body: JSON.stringify({ currentPassword: d.get('currentPassword'), newPassword: d.get('newPassword') }) });
        closeModal(); toast('Password updated.', 'success'); break;
      }
      case 'change-email': {
        const d = new FormData(form);
        await api('/api/me/email', { method: 'PATCH', body: JSON.stringify({ email: d.get('email'), password: d.get('password') }) });
        closeModal(); toast('Email updated. Re-verification may be needed.', 'success'); break;
      }
      case 'create-bot-token': {
        const d = new FormData(form);
        const name = d.get('name')?.trim();
        if (!name) { toast('Token name required.', 'error'); break; }
        const result = await api('/api/me/bots', { method: 'POST', body: JSON.stringify({ name }) });
        form.reset();
        await loadBootstrap();
        // Show token once
        if (result.token) {
          toast(`Token created — copy it now, it won't be shown again!`, 'info');
          setTimeout(() => {
            const msg = `Your new bot token (copy it — shown only once):\n\n${result.token}`;
            prompt(msg, result.token);
          }, 200);
        }
        render(); break;
      }
      case 'change-handle': {
        const d = new FormData(form);
        await api('/api/me/handle', { method: 'PATCH', body: JSON.stringify({ handle: d.get('handle') }) });
        closeModal(); await loadBootstrap(); toast('Handle updated.', 'success'); break;
      }
    }
  } catch (error) {
    toast(error.message, 'error');
  }
});

// ── Infinite scroll: load older messages ─────────────────────────────────────
let _loadingMore = false;
function updateJumpToLatest() {
  const scroll = document.getElementById('chat-scroll');
  const btn = document.getElementById('jump-to-latest');
  const countEl = document.getElementById('jump-count');
  if (!scroll || !btn) return;
  const distanceFromBottom = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight;
  const show = distanceFromBottom > 200;
  btn.hidden = !show;
  if (!show) {
    state.chat.unreadCount = 0;
    if (countEl) countEl.textContent = '';
  } else if (countEl) {
    countEl.textContent = state.chat.unreadCount > 0 ? String(state.chat.unreadCount) : '';
  }
}
document.addEventListener('scroll', (e) => {
  const chatScroll = document.getElementById('chat-scroll');
  if (!chatScroll || chatScroll !== e.target) return;
  updateJumpToLatest();
  if (_loadingMore || !state.chat.room) return;
  if (chatScroll.scrollTop < 80) {
    _loadingMore = true;
    const oldest = state.chat.messages[0];
    if (!oldest) { _loadingMore = false; return; }
    const prevHeight = chatScroll.scrollHeight;
    api(`/api/chat/rooms/${encodeURIComponent(state.chat.room.slug)}/messages?before=${oldest.id}&limit=40`)
      .then(async payload => {
        const older = await Promise.all((payload.messages || []).map(async m => ({
          ...normalizeMessageForViewer(m), displayBody: await decryptMessage(state.chat.room, normalizeMessageForViewer(m))
        })));
        if (older.length > 0) {
          state.chat.messages = [...older, ...state.chat.messages];
          render();
          // Preserve scroll position after prepend
          requestAnimationFrame(() => {
            const newScroll = document.getElementById('chat-scroll');
            if (newScroll) newScroll.scrollTop = newScroll.scrollHeight - prevHeight;
          });
        }
      })
      .catch(() => {})
      .finally(() => { _loadingMore = false; });
  }
}, true); // capture phase to get scroll events on child elements

document.addEventListener('mouseover', (event) => {
  const t = event.target;
  if (!t || typeof t.closest !== 'function') return;
  const userNode = t.closest('[data-hover-user]');
  if (userNode) return openHover('user', userNode.dataset.hoverUser, userNode);
  const roomNode = t.closest('[data-hover-room]');
  if (roomNode) return openHover('room', roomNode.dataset.hoverRoom, roomNode);
  // clear if moving outside any hover target
  if (!t.closest('[data-hover-user],[data-hover-room],.hover-card')) clearHover();
});

document.addEventListener('keydown', (event) => {
  if (state.lightbox) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      shiftLightbox(-1);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      shiftLightbox(1);
      return;
    }
  }
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    if (state.route.name !== 'discover') navigate('/discover');
    setTimeout(() => document.querySelector('[data-input="discover-search"]')?.focus(), 80);
    return;
  }
  // FIX: Enter to send in chat (Shift+Enter = newline)
  if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
    const ta = event.target;
    if (ta && typeof ta.matches === 'function' && ta.matches('textarea[name="body"]') && ta.closest('[data-form="send-message"]')) {
      const enterToSend = state.me?.user?.settings?.enterToSend !== false;
      if (enterToSend) {
        event.preventDefault();
        const form = ta.closest('[data-form="send-message"]');
        if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        return;
      }
    }
  }
  if (event.key === 'Escape') {
    if (state.lightbox) { state.lightbox = null; render(); }
    else if (state.chat.mediaPicker) { state.chat.mediaPicker = false; render(); }
    else if (state.modal) closeModal();
    else if (state.drawerOpen) { state.drawerOpen = false; render(); }
  }
});

function startRefreshLoop() {
  clearInterval(state.refreshTimer);
  // SSE handles real-time — this loop just keeps bootstrap fresh (notifications, etc.)
  state.refreshTimer = setInterval(async () => {
    if (document.hidden || !currentUser()) return;
    try {
      await loadBootstrap();
      render();
    } catch {}
  }, 60000); // every 60s is enough with SSE active
}

// ── SSE connection ────────────────────────────────────────────────────────────
function connectSSE() {
  const userId = Number(currentUser()?.id || 0);
  if (!userId || isGuestSession() || state.guest) {
    closeSSE();
    return;
  }
  if (state.sse && state.sseUserId === userId && ['connecting', 'live'].includes(state.sseStatus)) return;
  if (state.sse) { try { state.sse.close(); } catch {} state.sse = null; }
  state.sseStatus = 'connecting';
  state.sseUserId = userId;
  const es = new EventSource('/api/events', { withCredentials: true });
  state.sse = es;

  es.addEventListener('connected', () => {
    state.sseStatus = 'live';
    render();
  });

  es.addEventListener('new_message', (e) => {
    const msg = JSON.parse(e.data);
    if (state.chat.room && msg.roomId === state.chat.room.id) {
      const normalized = normalizeMessageForViewer(msg);
      decryptMessage(state.chat.room, normalized).then(displayBody => {
        const scroll = document.getElementById('chat-scroll');
        const wasNearBottom = scroll
          ? (scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 120)
          : true;
        const nextMessage = { ...normalized, pending: false, displayBody };
        const existingIndex = state.chat.messages.findIndex(m => Number(m.id) === Number(normalized.id) || (normalized.clientNonce && m.clientNonce === normalized.clientNonce));
        if (existingIndex >= 0) state.chat.messages[existingIndex] = { ...state.chat.messages[existingIndex], ...nextMessage };
        else state.chat.messages.push(nextMessage);
        if (!wasNearBottom && !nextMessage.ownedBySession) {
          state.chat.unreadCount = (state.chat.unreadCount || 0) + 1;
        }
        if (state.typing[state.chat.room.slug]) {
          delete state.typing[state.chat.room.slug][normalized.author?.id];
        }
        render();
        scrollChatToBottom(false);
      });
    } else {
      // Message in background room — increment unread
      const room = state.chat.bootstrap?.rooms?.find(r => r.id === msg.roomId);
      if (room) {
        state.chat.unread[room.slug] = (state.chat.unread[room.slug] || 0) + 1;
        render();
      }
    }
  });

  es.addEventListener('message_updated', (e) => {
    const updated = normalizeMessageForViewer(JSON.parse(e.data));
    if (state.chat.room && updated.roomId === state.chat.room.id) {
      const idx = state.chat.messages.findIndex(m => Number(m.id) === Number(updated.id) || (updated.clientNonce && m.clientNonce === updated.clientNonce));
      if (idx >= 0) {
        const displayBody = updated.deleted ? '[deleted]' : (updated.body || state.chat.messages[idx].displayBody);
        state.chat.messages[idx] = { ...updated, displayBody };
        render();
      }
    }
  });

  es.addEventListener('message_deleted', (e) => {
    const { id, roomSlug } = JSON.parse(e.data);
    if (state.chat.room?.slug === roomSlug) {
      const idx = state.chat.messages.findIndex(m => m.id === id);
      if (idx >= 0) {
        state.chat.messages[idx] = { ...state.chat.messages[idx], deleted: true, body: '', displayBody: '[deleted]' };
        render();
      }
    }
  });

  es.addEventListener('message_pinned', (e) => {
    const data = JSON.parse(e.data);
    if (state.chat.room?.slug === data.roomSlug) {
      toast(`${data.pinnedBy} pinned a message`, 'info');
    }
  });

  es.addEventListener('message_unpinned', () => { /* refresh pinned if open */ });

  es.addEventListener('typing', (e) => {
    const { roomSlug, userId, handle, displayName } = JSON.parse(e.data);
    if (state.chat.room?.slug === roomSlug && userId !== currentUser()?.id) {
      if (!state.typing[roomSlug]) state.typing[roomSlug] = {};
      state.typing[roomSlug][userId] = { handle, displayName, at: Date.now() };
      render();
      // Auto-clear after 4 seconds
      setTimeout(() => {
        if (state.typing[roomSlug]) {
          delete state.typing[roomSlug][userId];
          render();
        }
      }, 4000);
    }
  });

  es.addEventListener('read_receipt', (e) => {
    const { userId, roomSlug, lastReadMessageId } = JSON.parse(e.data);
    if (!state.readReceipts[roomSlug]) state.readReceipts[roomSlug] = {};
    state.readReceipts[roomSlug][userId] = lastReadMessageId;
    render();
  });

  es.addEventListener('message_confirmed', (e) => {
    const { roomSlug, messageId, confirmedAt, confirmedByUserId } = JSON.parse(e.data);
    if (state.chat.room?.slug !== roomSlug) return;
    const idx = state.chat.messages.findIndex(m => Number(m.id) === Number(messageId));
    if (idx >= 0) {
      state.chat.messages[idx] = { ...state.chat.messages[idx], confirmedAt, confirmedByUserId };
      render();
    }
  });

  es.addEventListener('room_added', (e) => {
    const { room } = JSON.parse(e.data);
    toast(`Added to ${room.title}`, 'success');
    loadChatBootstrap().then(() => render());
  });

  es.addEventListener('room_removed', () => {
    if (state.chat.room) { state.chat.room = null; state.chat.selectedSlug = null; }
    loadChatBootstrap().then(() => render());
  });

  es.onerror = () => {
    state.sseStatus = 'error';
    // Auto-reconnect after 5s
    setTimeout(() => { if (currentUser()) connectSSE(); }, 5000);
  };
}

// ── Typing emitter ─────────────────────────────────────────────────────────────
let _typingTimer = null;
function emitTyping() {
  if (!state.chat.room?.slug) return;
  clearTimeout(_typingTimer);
  _typingTimer = setTimeout(() => {
    api(`/api/chat/rooms/${encodeURIComponent(state.chat.room.slug)}/typing`, { method: 'POST', body: '{}' }).catch(() => {});
  }, 400); // debounce
}

// ── Read receipt emitter ───────────────────────────────────────────────────────
function emitReadReceipt(roomSlug, lastMsgId) {
  if (!currentUser() || !lastMsgId) return;
  api(`/api/chat/rooms/${encodeURIComponent(roomSlug)}/read`, { method: 'POST', body: JSON.stringify({ lastMessageId: lastMsgId }) }).catch(() => {});
}

function setSplashStatus(msg) {
  const el = document.getElementById('splash-status');
  if (el) el.textContent = msg;
}
function hideSplash() {
  const s = document.getElementById('splash-screen');
  if (s) { s.classList.add('hidden'); setTimeout(() => s.remove(), 450); }
  state.appReady = true;
}
async function boot() {
  try {
    // Restore local-only guest flag (no server profile, purely cached)
    if (localStorage.getItem('jb_guest_mode') === '1') state.guest = true;
    await routeLoad();
    render();
    startRefreshLoop();
    connectSSE();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && currentUser() && !isGuestSession()) {
        if (state.sseStatus !== 'live') connectSSE();
        loadBootstrap().then(() => render()).catch(() => {});
      }
    });
  } catch (error) {
    toast(error.message, 'error');
  }
}
boot();
