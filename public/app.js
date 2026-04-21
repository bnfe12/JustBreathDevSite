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
  githubBrand: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.3-.2-4.8-1.2-4.8-5.2 0-1.1.4-2 1-2.8-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.8 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.7 1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"/></svg>',
  spotify: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="12" r="9"/><path d="M8 10.1c2.8-.8 5.8-.7 8.6.5" fill="none" stroke="#05070d" stroke-width="1.8" stroke-linecap="round"/><path d="M8.7 12.9c2.2-.5 4.5-.4 6.6.5" fill="none" stroke="#05070d" stroke-width="1.6" stroke-linecap="round"/><path d="M9.3 15.4c1.6-.3 3.3-.2 4.8.4" fill="none" stroke="#05070d" stroke-width="1.5" stroke-linecap="round"/></svg>',
  epicGames: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8l1 3v8l-5 5-5-5V7l1-3Z" stroke-linejoin="round"/><path d="M10 8h4M10 12h4M10 16h4" stroke-linecap="round"/></svg>',
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
  play: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 6.5v11l9-5.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 6h4v12H7zM13 6h4v12h-4z"/></svg>',
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
const REPORT_REASON_OPTIONS = [
  { id: 'spam', label: { en: 'Spam', ru: 'Спам' } },
  { id: 'harassment', label: { en: 'Harassment', ru: 'Оскорбления' } },
  { id: 'impersonation', label: { en: 'Impersonation', ru: 'Выдача за другого' } },
  { id: 'scam', label: { en: 'Scam / fraud', ru: 'Скам / мошенничество' } },
  { id: 'adult', label: { en: 'Adult / NSFW', ru: '18+ / NSFW' } },
  { id: 'copyright', label: { en: 'Copyright', ru: 'Авторские права' } },
  { id: 'other', label: { en: 'Other', ru: 'Другое' } }
];
const SITE_CHANGELOG_ENTRIES = [
  {
    date: '2026-04-20',
    title: { en: 'Profile, security and moderation refresh', ru: 'Обновление профиля, безопасности и модерации' },
    body: {
      en: 'Fixed profile saving flows, clarified local-password rules for Discord/Google accounts, added content reports, and gave operators faster post/account cleanup tools.',
      ru: 'Починили сохранение профиля, прояснили правила локального пароля для Discord/Google-аккаунтов, добавили жалобы на контент и ускорили удаление постов и аккаунтов для операторов.'
    }
  },
  {
    date: '2026-04-19',
    title: { en: 'Admin subscriptions and unlimited internal uploads', ru: 'Админские подписки и безлимитные внутренние загрузки' },
    body: {
      en: 'Operators can manage user plans, and internal admin/owner accounts are no longer limited by standard site upload caps.',
      ru: 'Операторы теперь могут управлять тарифами пользователей, а внутренние admin/owner-аккаунты больше не ограничены стандартными лимитами загрузки сайтов.'
    }
  }
];
const CONTACT_EMAIL = 'justbreath.business.mail@gmail.com';
const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
const GITHUB_PROFILE_URL = 'https://github.com/bnfe12';
const SITE_CREATION_REPO_URL = 'https://github.com/bnfe12/JustBreathDevSite';
const SITE_CREATION_GUIDE_URL = `${SITE_CREATION_REPO_URL}/blob/main/SITE_CREATION_GUIDE.md`;
const SITE_CREATION_EXAMPLES_URL = `${SITE_CREATION_REPO_URL}/blob/main/SITE_CREATION_EXAMPLES_RU.md`;

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
    play: 'Play', pause: 'Pause', voiceMessage: 'Voice message', audioFile: 'Audio file', voicePreview: 'Voice preview', voiceDraft: 'Voice draft',
    pressSendVoice: 'Press send to share voice message.', recordVoice: 'Record voice', stopRecording: 'Stop recording',
    recordingNow: 'Recording now', recordingHint: 'Microphone is live. Tap again to finish.', audioContinueHint: 'Keeps playing while you switch chats or screens.',
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
    homeHeadline: 'Create your public creator page, collaborate with your team, and chat with your audience in one place.',
    homeLead: 'Build a public page, ship creator sites, open private spaces, and keep direct audience chat in one product.',
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
    displayName: 'Display name', bio: 'Bio', avatar: 'Avatar', banner: 'Banner', website: 'Website', github: 'GitHub', discord: 'Discord', telegram: 'Telegram', steam: 'Steam', spotify: 'Spotify', epicGames: 'Epic Games',
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
    play: 'Слушать', pause: 'Пауза', voiceMessage: 'Голосовое сообщение', audioFile: 'Аудиофайл', voicePreview: 'Предпросмотр голосового', voiceDraft: 'Черновик голосового',
    pressSendVoice: 'Нажми отправить, чтобы поделиться голосовым сообщением.', recordVoice: 'Записать голосовое', stopRecording: 'Остановить запись',
    recordingNow: 'Идёт запись', recordingHint: 'Микрофон активен. Нажми ещё раз, чтобы завершить.', audioContinueHint: 'Продолжает играть, пока ты переключаешь чаты и экраны.',
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
    homeHeadline: 'Создайте публичную страницу автора, работайте с командой и общайтесь с аудиторией в одном месте.',
    homeLead: 'Публичная страница, creator sites, приватные пространства и прямой диалог с аудиторией — в одном продукте.',
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
    displayName: 'Имя', bio: 'Описание', avatar: 'Аватар', banner: 'Баннер', website: 'Сайт', github: 'GitHub', discord: 'Discord', telegram: 'Telegram', steam: 'Steam', spotify: 'Spotify', epicGames: 'Epic Games',
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
    play: 'Reproduzir', pause: 'Pausar', voiceMessage: 'Mensagem de voz', audioFile: 'Arquivo de áudio', voicePreview: 'Prévia de voz', voiceDraft: 'Rascunho de voz',
    pressSendVoice: 'Toque em enviar para compartilhar a mensagem de voz.', recordVoice: 'Gravar voz', stopRecording: 'Parar gravação',
    recordingNow: 'Gravando agora', recordingHint: 'O microfone está ativo. Toque de novo para finalizar.', audioContinueHint: 'Continua tocando enquanto você troca de chats ou telas.',
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
    homeHeadline: 'Crie sua página pública de creator, colabore com sua equipe e converse com sua audiência em um só lugar.',
    homeLead: 'Página pública, sites, espaços privados e conversa direta com a audiência em um só produto.',
    noRoom: 'Escolha uma conversa.', noPosts: 'Nada publicado ainda.', noSites: 'Sem sites ainda.', noProjects: 'Sem projetos ainda.',
    dark: 'Escuro', light: 'Claro', system: 'Sistema', save: 'Salvar alterações',
    status: 'Status', adminPanel: 'Painel Admin', emailVerified: 'Email verificado', verifyNow: 'Verificar',
  },
  pl: {
    play: 'Odtwórz', pause: 'Pauza', voiceMessage: 'Wiadomość głosowa', audioFile: 'Plik audio', voicePreview: 'Podgląd głosu', voiceDraft: 'Szkic głosowy',
    pressSendVoice: 'Naciśnij wyślij, aby udostępnić wiadomość głosową.', recordVoice: 'Nagraj głos', stopRecording: 'Zatrzymaj nagrywanie',
    recordingNow: 'Nagrywanie trwa', recordingHint: 'Mikrofon jest aktywny. Dotknij ponownie, aby zakończyć.', audioContinueHint: 'Odtwarzanie trwa dalej podczas przełączania czatów i ekranów.',
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
    homeHeadline: 'Stwórz publiczną stronę twórcy, współpracuj z zespołem i rozmawiaj ze swoją społecznością w jednym miejscu.',
    homeLead: 'Publiczna strona, strony twórcy, prywatne przestrzenie i bezpośredni kontakt z odbiorcami w jednym produkcie.',
    noRoom: 'Wybierz rozmowę.', noPosts: 'Brak publikacji.', noSites: 'Brak stron.', noProjects: 'Brak projektów.',
    dark: 'Ciemny', light: 'Jasny', system: 'Systemowy',
    status: 'Status', adminPanel: 'Panel admina', emailVerified: 'Email zweryfikowany', verifyNow: 'Zweryfikuj',
  },
  fr: {
    play: 'Lire', pause: 'Pause', voiceMessage: 'Message vocal', audioFile: 'Fichier audio', voicePreview: 'Aperçu vocal', voiceDraft: 'Brouillon vocal',
    pressSendVoice: 'Appuyez sur envoyer pour partager le message vocal.', recordVoice: 'Enregistrer la voix', stopRecording: 'Arrêter l’enregistrement',
    recordingNow: 'Enregistrement en cours', recordingHint: 'Le micro est actif. Touchez encore une fois pour terminer.', audioContinueHint: 'Continue de jouer pendant que vous changez de chat ou d’écran.',
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
    homeHeadline: 'Créez votre page publique de créateur, collaborez avec votre équipe et échangez avec votre audience au même endroit.',
    homeLead: 'Page publique, sites, espaces privés et échange direct avec votre audience dans un seul produit.',
    noRoom: 'Choisissez une conversation.', noPosts: 'Rien de publié.', noSites: 'Aucun site.', noProjects: 'Aucun projet.',
    dark: 'Sombre', light: 'Clair', system: 'Système',
    status: 'Statut', adminPanel: 'Panneau admin', emailVerified: 'Email vérifié', verifyNow: 'Vérifier',
  },
  uk: {
    play: 'Відтворити', pause: 'Пауза', voiceMessage: 'Голосове повідомлення', audioFile: 'Аудіофайл', voicePreview: 'Перегляд голосового', voiceDraft: 'Чернетка голосового',
    pressSendVoice: 'Натисни відправити, щоб поділитися голосовим повідомленням.', recordVoice: 'Записати голосове', stopRecording: 'Зупинити запис',
    recordingNow: 'Триває запис', recordingHint: 'Мікрофон активний. Натисни ще раз, щоб завершити.', audioContinueHint: 'Продовжує відтворення, поки ти перемикаєш чати та екрани.',
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
    homeHeadline: 'Створіть публічну сторінку автора, працюйте з командою та спілкуйтеся з аудиторією в одному місці.',
    homeLead: 'Публічна сторінка, creator sites, приватні простори та прямий звʼязок з аудиторією в одному продукті.',
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
    forceScrollBottom: false,
    pendingScrollRestore: null,
    activityCount: 0,
    activityKind: '',
    voiceSpeed: 1
  },
  sites: { mine: [], public: [], filter: 'mine', studio: { siteId: null, site: null, files: [], activePath: '', activeFile: null, content: '', loading: false, fileLoading: false, saving: false, dirty: false, error: '', studioEnabled: false, staticRules: null } },
  mail: { inbox: [], sent: [], unread: 0, folder: 'inbox', selected: null, composing: false },
  guest: false,
  settingsTab: loadRememberedSettingsTab(),
  settingsSearch: loadRememberedSettingsSearch(),
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
  backgroundRenderTimer: null, backgroundRenderQueued: false, backgroundRenderFrame: null,
  renderHoldUntil: 0, filePickerActive: false,
  routeLoadSeq: 0,
  initialUiAnimated: false,
  // SSE
  sse: null, sseStatus: 'off',
  sseUserId: 0,
  // Chat extras
  typing: {}, readReceipts: {}, pinnedMessages: [], memberList: [], memberListRoom: null, memberListLoading: false,
  // Admin
  adminStats: null, adminUsers: [], adminReports: [], adminDeletionJobs: [], adminPosts: [], adminLogs: [], adminAds: [], adminTelemetry: null, adminSiteReviewQueue: [], adminTab: 'stats', adminModerationView: 'overview',
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
  voicePlayback: { key: '', url: '', playing: false, currentTime: 0, duration: 0, speed: 1, title: '', label: '', kind: 'voice' },
};

function parseRoute(pathname) {
  if (pathname === '/feed') return { name: 'feed' };
  if (pathname === '/messages') return { name: 'messages' };
  if (pathname.startsWith('/messages/')) return { name: 'messages', slug: pathname.split('/').at(-1) };
  if (pathname === '/settings') return { name: 'settings' };
  if (pathname.startsWith('/sites/studio/')) return { name: 'site-studio', siteId: pathname.split('/').at(-1) };
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
  const locales = [navigator.language, ...(navigator.languages || [])]
    .filter(Boolean)
    .map((item) => String(item).toLowerCase());
  const matched = locales.find((locale) => {
    const base = locale.split('-')[0];
    return Boolean(translations[base]);
  });
  return matched ? matched.split('-')[0] : 'en';
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
  const lang = currentLang();
  return source[lang] || source.en || source.ru || '';
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
function isMessagesRouteActive() {
  return state.route.name === 'messages';
}
function isVisibleChatRoomById(roomId) {
  return isMessagesRouteActive() && Number(state.chat.room?.id || 0) === Number(roomId || 0);
}
function isVisibleChatRoomBySlug(roomSlug) {
  return isMessagesRouteActive() && Boolean(roomSlug) && state.chat.room?.slug === roomSlug;
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
function renderChatThemeLivePreview(theme) {
  const previewStyle = chatThemeInlineStyle(theme);
  return `<div class="chat-theme-live-preview" data-chat-theme-preview style="${escapeHtml(previewStyle)}">
    <div class="chat-theme-live-canvas">
      <div class="chat-theme-live-bubble incoming">Hello there</div>
      <div class="chat-theme-live-bubble outgoing">Preview applied</div>
    </div>
  </div>`;
}
function currentChatThemePreviewFallback(form) {
  if (!form) return resolveChatTheme();
  if (form.dataset.room) {
    return getChatSettings().chatThemesByRoom?.[form.dataset.room] || resolveChatTheme(form.dataset.room);
  }
  return getChatSettings().chatThemeGlobal || resolveChatTheme();
}
async function buildChatThemePreviewPayload(form) {
  if (!form) return resolveChatTheme();
  const fallback = currentChatThemePreviewFallback(form);
  const data = new FormData(form);
  const choice = String(data.get('chatThemeChoice') || 'preset:platform');
  if (choice === 'gradient') {
    return {
      mode: 'gradient',
      preset: 'platform',
      from: String(data.get('chatThemeFrom') || fallback?.from || '#6d28d9'),
      to: String(data.get('chatThemeTo') || fallback?.to || '#0ea5e9'),
      imageUrl: ''
    };
  }
  if (choice === 'image') {
    const file = data.get('chatThemeImage');
    let imageUrl = fallback?.imageUrl || '';
    if (file?.size) imageUrl = await readFileAsDataURL(file);
    return {
      mode: 'image',
      preset: 'platform',
      from: fallback?.from || '#6d28d9',
      to: fallback?.to || '#0ea5e9',
      imageUrl
    };
  }
  return {
    mode: 'preset',
    preset: choice.startsWith('preset:') ? choice.slice(7) : 'platform',
    from: fallback?.from || '#6d28d9',
    to: fallback?.to || '#0ea5e9',
    imageUrl: ''
  };
}
async function updateChatThemePreview(form) {
  const preview = form?.querySelector?.('[data-chat-theme-preview]');
  if (!preview) return;
  const theme = await buildChatThemePreviewPayload(form);
  preview.setAttribute('style', chatThemeInlineStyle(theme));
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
function isOwnerSession() {
  return ['owner', 'admin'].includes(currentUser()?.roleInternal || '');
}
function isOperatorSession() {
  return ['owner', 'admin'].includes(currentUser()?.roleInternal || '');
}
function currentSiteUploadCaps() {
  const operator = isOperatorSession();
  const isRu = currentLang() === 'ru';
  const archiveBytes = operator ? 512 * 1024 * 1024 : 5 * 1024 * 1024;
  const archiveLabel = operator
    ? (isRu ? '≤ 512 MB для операторов' : '≤ 512 MB for operators')
    : '≤ 5 MB';
  return {
    operator,
    htmlBytes: operator ? Infinity : 1024 * 1024,
    archiveBytes,
    htmlLabel: operator ? (isRu ? 'без лимита для операторов' : 'no limit for operators') : '≤ 1 MB',
    archiveLabel
  };
}
function formatByteSize(bytes = 0) {
  const value = Number(bytes || 0);
  if (!Number.isFinite(value) || value <= 0) return '0 B';
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${Math.round(value)} B`;
}
function siteImportSummary(site) {
  const info = site?.uploadDiagnostics || null;
  const importReport = site?.importReport || info?.importReport || null;
  const warnings = info?.compatibilityWarnings || [];
  const optimizedCount = Number(importReport?.optimizedAssets?.length || 0);
  const optimizedBytes = Number(importReport?.optimizedBytesSaved || 0);
  if (!optimizedCount && !warnings.length) return '';
  if (currentLang() === 'ru') {
    const parts = [];
    if (optimizedCount) parts.push(`оптимизировано изображений: ${optimizedCount}, сохранено ${formatByteSize(optimizedBytes)}`);
    if (warnings.length) parts.push(`обнаружено предупреждений совместимости: ${warnings.length}`);
    return parts.join(' · ');
  }
  const parts = [];
  if (optimizedCount) parts.push(`optimized ${optimizedCount} image files, saved ${formatByteSize(optimizedBytes)}`);
  if (warnings.length) parts.push(`${warnings.length} compatibility warnings detected`);
  return parts.join(' · ');
}
function renderSiteImportDigest(site, detailed = false) {
  const info = site?.uploadDiagnostics || null;
  const importReport = site?.importReport || info?.importReport || null;
  const warnings = info?.compatibilityWarnings || [];
  const optimizedAssets = importReport?.optimizedAssets || [];
  const fileCount = Number(info?.fileCount || 0);
  if (!info && !warnings.length && !optimizedAssets.length) return '';
  const chips = [];
  if (fileCount) chips.push(`${fileCount} files`);
  if (optimizedAssets.length) chips.push(`${optimizedAssets.length} optimized`);
  if (warnings.length) chips.push(`${warnings.length} warnings`);
  if (!chips.length) return '';
  return `<div class="site-import-digest ${detailed ? 'detailed' : ''}">
    <strong>${currentLang() === 'ru' ? 'Импорт' : 'Import'}</strong>
    <div class="site-import-digest-row">${chips.map((chip) => `<span class="site-import-chip">${escapeHtml(chip)}</span>`).join('')}</div>
    ${detailed && warnings.length ? `<p class="muted">${escapeHtml(warnings[0]?.title || 'Compatibility warning detected.')}</p>` : ''}
  </div>`;
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

const SETTINGS_TAB_STORAGE_KEY = 'jb_settings_tab';
const SETTINGS_SEARCH_STORAGE_KEY = 'jb_settings_search';
const SETTINGS_TAB_IDS = new Set(['profile', 'appearance', 'privacy', 'chat', 'notifications', 'social', 'security', 'bots', 'billing', 'verification', 'support', 'data']);

function normalizeSettingsTab(tab = '') {
  const value = String(tab || '').trim();
  return SETTINGS_TAB_IDS.has(value) ? value : 'profile';
}

function loadRememberedSettingsTab() {
  try {
    return normalizeSettingsTab(localStorage.getItem(SETTINGS_TAB_STORAGE_KEY) || 'profile');
  } catch {
    return 'profile';
  }
}

function persistRememberedSettingsTab(tab = 'profile') {
  try {
    localStorage.setItem(SETTINGS_TAB_STORAGE_KEY, normalizeSettingsTab(tab));
  } catch {}
}

function loadRememberedSettingsSearch() {
  try {
    return String(localStorage.getItem(SETTINGS_SEARCH_STORAGE_KEY) || '').slice(0, 80);
  } catch {
    return '';
  }
}

function persistRememberedSettingsSearch(value = '') {
  try {
    localStorage.setItem(SETTINGS_SEARCH_STORAGE_KEY, String(value || '').slice(0, 80));
  } catch {}
}

function chatScrollStorageKey(slug = '') {
  return slug ? `jb_chat_scroll:${slug}` : '';
}

function loadRememberedChatScroll(slug = '') {
  const key = chatScrollStorageKey(slug);
  if (!key) return null;
  try {
    const raw = localStorage.getItem(key);
    const value = raw === null ? null : Number(raw);
    return Number.isFinite(value) && value >= 0 ? value : null;
  } catch {
    return null;
  }
}

function persistRememberedChatScroll(slug = '', scrollTop = 0) {
  const key = chatScrollStorageKey(slug);
  if (!key) return;
  try {
    localStorage.setItem(key, String(Math.max(0, Math.round(Number(scrollTop || 0)))));
  } catch {}
}

function clearChatActivityIndicators() {
  state.chat.unreadCount = 0;
  state.chat.activityCount = 0;
  state.chat.activityKind = '';
}

function noteChatActivity(kind = 'message') {
  if (kind === 'message') {
    state.chat.unreadCount = (state.chat.unreadCount || 0) + 1;
    state.chat.activityKind = 'message';
    return;
  }
  state.chat.activityCount = (state.chat.activityCount || 0) + 1;
  if (state.chat.activityKind !== 'message') state.chat.activityKind = kind;
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
    email: user.email || '',
    sessionToken
  };
  state.savedAccounts = [next, ...state.savedAccounts.filter((item) => item.sessionToken !== next.sessionToken && item.id !== next.id)].slice(0, 8);
  persistSavedAccounts();
}
function syncSavedAccountProfile(user) {
  if (!user?.id || !Array.isArray(state.savedAccounts) || !state.savedAccounts.length) return;
  let changed = false;
  state.savedAccounts = state.savedAccounts.map((item) => {
    if (Number(item.id) !== Number(user.id)) return item;
    const next = {
      ...item,
      handle: user.handle || item.handle,
      displayName: user.displayName || user.handle || item.displayName,
      avatarUrl: user.avatarUrl || '',
      avatarText: user.avatarText || item.avatarText || initials(user),
      email: user.email || item.email || ''
    };
    if (
      next.handle !== item.handle
      || next.displayName !== item.displayName
      || next.avatarUrl !== item.avatarUrl
      || next.avatarText !== item.avatarText
      || next.email !== item.email
    ) changed = true;
    return next;
  });
  if (changed) persistSavedAccounts();
}
function canReportOwner(owner) {
  const viewer = currentUser();
  if (!viewer || isGuestSession()) return false;
  const ownerHandle = canonicalProfileHandle(owner);
  return !ownerHandle || ownerHandle !== viewer.handleCanonical;
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const rawText = await response.text();
  let data = {};
  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { rawText };
    }
  }
  if (!response.ok) {
    const message = data?.error || (response.status === 413
      ? 'Upload request is too large for the server. If the archive is valid, check the reverse proxy body limit (for example nginx client_max_body_size) and restart the server after upload-limit changes.'
      : 'Request failed.');
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

function shouldHandleClientNav(event, target) {
  if (!target || target.tagName !== 'A') return true;
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (target.getAttribute('target') === '_blank') return false;
  if (target.hasAttribute('download')) return false;
  return true;
}

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

function avatar(user, size = 'md', extra = '', options = {}) {
  if (!user) return `<span class="avatar avatar-${size} ${extra}">?</span>`;
  const online = isUserOnline(user);
  const link = options?.link !== false && Boolean(canonicalProfileHandle(user));
  const avatarClass = ['avatar', `avatar-${size}`, extra].filter(Boolean).join(' ');
  const wrapClass = ['avatar-wrap', link ? 'avatar-link' : '', online ? 'online' : ''].filter(Boolean).join(' ');
  const body = user.avatarUrl
    ? `<img src="${escapeHtml(user.avatarUrl)}" alt="${escapeHtml(user.displayName || user.handle || 'avatar')}" />`
    : `<strong>${initials(user)}</strong>`;
  const avatarNode = `<span class="${avatarClass}">${body}</span>`;
  if (!link) {
    return `<span class="${wrapClass}">${avatarNode}${online ? '<span class="online-dot"></span>' : ''}</span>`;
  }
  return `<a class="${wrapClass}" ${profileAttrs(user)}>${avatarNode}${online ? '<span class="online-dot"></span>' : ''}</a>`;
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
function formatCountdown(ms) {
  const total = Math.max(0, Math.ceil(Number(ms || 0) / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const isRu = currentLang() === 'ru';
  if (days > 0) return isRu ? `${days}д ${hours}ч ${minutes}м` : `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return isRu ? `${hours}ч ${minutes}м` : `${hours}h ${minutes}m`;
  if (minutes > 0) return isRu ? `${minutes}м ${seconds}с` : `${minutes}m ${seconds}s`;
  return isRu ? `${seconds}с` : `${seconds}s`;
}
function formatDeletionCountdown(deleteAfter) {
  const target = new Date(deleteAfter).getTime();
  if (Number.isNaN(target)) return '';
  const diff = target - Date.now();
  if (diff <= 0) return currentLang() === 'ru' ? 'Удаляется сейчас' : 'Deleting now';
  return formatCountdown(diff);
}
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function trimDisplayUrl(value = '', max = 40) {
  return String(value || '')
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '')
    .slice(0, max);
}

function normalizeProfileHandle(value = '') {
  return String(value || '').trim().replace(/^@+/, '');
}

function buildSocialLink(value, kind) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) {
    return { label: trimDisplayUrl(raw), href: raw };
  }
  const handle = normalizeProfileHandle(raw);
  if (!handle) return null;
  switch (kind) {
    case 'github':
      return { label: `@${handle}`, href: `https://github.com/${encodeURIComponent(handle)}` };
    case 'telegram':
      return { label: `@${handle}`, href: `https://t.me/${encodeURIComponent(handle)}` };
    case 'steam':
      if (/^\d+$/.test(handle)) return { label: handle, href: `https://steamcommunity.com/profiles/${handle}` };
      if (/^(id|profiles)\//i.test(handle)) return { label: handle.replace(/^(id|profiles)\//i, ''), href: `https://steamcommunity.com/${handle}` };
      return { label: handle, href: `https://steamcommunity.com/id/${encodeURIComponent(handle)}` };
    case 'spotify':
      return { label: handle, href: `https://open.spotify.com/user/${encodeURIComponent(handle)}` };
    case 'youtube':
      return { label: `@${handle}`, href: `https://youtube.com/@${encodeURIComponent(handle)}` };
    case 'instagram':
      return { label: `@${handle}`, href: `https://instagram.com/${encodeURIComponent(handle)}` };
    case 'epicGames':
      return { label: handle, href: null };
    default:
      return { label: handle, href: null };
  }
}

function navAttrs(path = '/') {
  const href = String(path || '/');
  const safeHref = escapeHtml(href);
  return `href="${safeHref}" data-action="nav" data-path="${safeHref}"`;
}

function canonicalProfileHandle(userOrHandle) {
  const raw = typeof userOrHandle === 'string'
    ? userOrHandle
    : (userOrHandle?.handleCanonical || userOrHandle?.handle || '');
  return String(raw || '').replace(/^@+/, '').trim().toLowerCase();
}

function profileAttrs(userOrHandle) {
  const handle = canonicalProfileHandle(userOrHandle);
  if (!handle) return '';
  const safeHandle = escapeHtml(handle);
  return `href="/@${safeHandle}" data-action="open-profile" data-handle="${safeHandle}"`;
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
    active: {
      label: localeLabel({ en: 'Online', ru: 'Онлайн', uk: 'Онлайн', pt: 'Online', pl: 'Online', fr: 'En ligne' }),
      short: localeLabel({ en: 'Online', ru: 'Онлайн', uk: 'Онлайн', pt: 'Online', pl: 'Online', fr: 'En ligne' }),
      tone: 'active'
    },
    away: {
      label: localeLabel({ en: 'Away', ru: 'Отошёл', uk: 'Відійшов', pt: 'Ausente', pl: 'Zaraz wracam', fr: 'Absent' }),
      short: localeLabel({ en: 'Away', ru: 'Отошёл', uk: 'Відійшов', pt: 'Ausente', pl: 'Z dala', fr: 'Absent' }),
      tone: 'away'
    },
    dnd: {
      label: localeLabel({ en: 'Do not disturb', ru: 'Не беспокоить', uk: 'Не турбувати', pt: 'Não incomodar', pl: 'Nie przeszkadzać', fr: 'Ne pas déranger' }),
      short: localeLabel({ en: 'Busy', ru: 'Занят', uk: 'Зайнятий', pt: 'Ocupado', pl: 'Zajęty', fr: 'Occupé' }),
      tone: 'dnd'
    },
    offline: {
      label: localeLabel({ en: 'Invisible', ru: 'Невидимый', uk: 'Невидимий', pt: 'Invisível', pl: 'Niewidoczny', fr: 'Invisible' }),
      short: localeLabel({ en: 'Hidden', ru: 'Скрыт', uk: 'Прихований', pt: 'Oculto', pl: 'Ukryty', fr: 'Masqué' }),
      tone: 'offline'
    }
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
    if (state.guest || localStorage.getItem('jb_guest_mode') === '1') {
      localStorage.removeItem('jb_guest_mode');
      state.guest = false;
    }
    if (payload.sessionToken) saveAccountSession(state.me.user, payload.sessionToken);
    syncSavedAccountProfile(state.me.user);
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
  const rooms = Array.isArray(payload.rooms) ? payload.rooms : [];
  const availableSlugs = new Set(rooms.map((room) => room.slug));
  const routeSlug = state.route.slug && availableSlugs.has(state.route.slug) ? state.route.slug : null;
  const rememberedSlug = state.chat.selectedSlug && availableSlugs.has(state.chat.selectedSlug) ? state.chat.selectedSlug : null;
  const fallbackSlug = payload.selectedRoom?.slug || payload.segments.personal?.[0]?.slug || payload.segments.work?.[0]?.slug || payload.segments.groups?.[0]?.slug || rooms[0]?.slug || null;
  state.chat.selectedSlug = routeSlug || rememberedSlug || fallbackSlug || null;
  if (state.route.name === 'messages' && state.route.slug && !routeSlug) {
    const nextPath = state.chat.selectedSlug ? `/messages/${state.chat.selectedSlug}` : '/messages';
    history.replaceState({}, '', nextPath);
    state.currentPath = location.pathname;
    state.route = parseRoute(location.pathname);
  }
  if (state.chat.selectedSlug) {
    await loadChatRoom(state.chat.selectedSlug);
  } else {
    state.chat.room = null;
    state.chat.messages = [];
    state.chat.tasks = [];
    state.chat.previewOnly = false;
    render();
  }
}

async function loadSitesMine() {
  if (!currentUser() || isGuestSession()) return;
  const own = await api('/api/me/sites');
  state.sites.mine = own.items || [];
  const pub = await api('/api/public/sites?sort=popularity');
  state.sites.public = pub.items || [];
}

function createEmptySiteStudioState(siteId = null) {
  return {
    siteId: siteId ? Number(siteId) : null,
    site: null,
    files: [],
    activePath: '',
    activeFile: null,
    content: '',
    loading: false,
    fileLoading: false,
    saving: false,
    dirty: false,
    error: '',
    studioEnabled: false,
    staticRules: null
  };
}

async function loadSiteStudio(siteId, preferredPath = '') {
  if (!currentUser() || isGuestSession()) return;
  const numericId = Number(siteId || 0);
  if (!numericId) return;
  const previous = state.sites.studio || createEmptySiteStudioState(numericId);
  state.sites.studio = { ...previous, siteId: numericId, loading: true, error: '' };
  render();
  const payload = await api(`/api/me/sites/${numericId}/studio`);
  const files = payload.files || [];
  const rememberedPath = previous.activePath && files.some((item) => item.path === previous.activePath) ? previous.activePath : '';
  const activePath = preferredPath || rememberedPath || payload.defaultFile || files[0]?.path || '';
  state.sites.studio = {
    ...createEmptySiteStudioState(numericId),
    siteId: numericId,
    site: payload.site || null,
    files,
    loading: false,
    studioEnabled: Boolean(payload.studioEnabled),
    staticRules: payload.staticRules || null,
    activePath
  };
  patchVisibleSites(numericId, () => payload.site);
  if (activePath && payload.studioEnabled) {
    await loadSiteStudioFile(numericId, activePath);
    return;
  }
  render();
}

async function loadSiteStudioFile(siteId, filePath) {
  const numericId = Number(siteId || state.sites.studio?.siteId || 0);
  const relativePath = String(filePath || '').trim();
  if (!numericId || !relativePath) return;
  state.sites.studio = { ...(state.sites.studio || createEmptySiteStudioState(numericId)), siteId: numericId, activePath: relativePath, fileLoading: true, error: '' };
  render();
  const payload = await api(`/api/me/sites/${numericId}/studio/file?path=${encodeURIComponent(relativePath)}`);
  state.sites.studio = {
    ...(state.sites.studio || createEmptySiteStudioState(numericId)),
    siteId: numericId,
    site: payload.site || state.sites.studio.site,
    files: payload.files || state.sites.studio.files || [],
    activePath: payload.file?.path || relativePath,
    activeFile: payload.file || null,
    content: payload.file?.content || '',
    loading: false,
    fileLoading: false,
    saving: false,
    dirty: false,
    error: '',
    studioEnabled: true
  };
  patchVisibleSites(numericId, () => payload.site);
  render();
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

function formatMediaDuration(totalSeconds = 0) {
  const seconds = Math.max(0, Math.round(Number(totalSeconds || 0)));
  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;
  return `${minutes}:${String(remain).padStart(2, '0')}`;
}

function getVoicePlaybackProgress(playback = state.voicePlayback || {}) {
  const duration = Number(playback.duration || 0);
  if (!duration) return 0;
  return Math.max(0, Math.min(1, Number(playback.currentTime || 0) / duration));
}

function voicePlaybackLabel(kind = 'voice') {
  return kind === 'audio'
    ? (t('audioFile') || 'Audio file')
    : (t('voiceMessage') || 'Voice message');
}

function stopVoicePlayback(reset = true) {
  if (_voicePlaybackAudio) {
    try { _voicePlaybackAudio.pause(); } catch {}
    if (reset) {
      try { _voicePlaybackAudio.currentTime = 0; } catch {}
    }
  }
  if (_voicePlaybackTick) cancelAnimationFrame(_voicePlaybackTick);
  _voicePlaybackTick = null;
  state.voicePlayback = {
    ...(state.voicePlayback || {}),
    playing: false,
    currentTime: reset ? 0 : Number(state.voicePlayback?.currentTime || 0)
  };
  syncVoicePlaybackUi();
}

function syncVoicePlaybackState() {
  if (!_voicePlaybackAudio) return;
  state.voicePlayback = {
    ...(state.voicePlayback || {}),
    currentTime: Number(_voicePlaybackAudio.currentTime || 0),
    duration: Number(_voicePlaybackAudio.duration || state.voicePlayback?.duration || 0),
    playing: !_voicePlaybackAudio.paused,
    speed: Number(_voicePlaybackAudio.playbackRate || state.voicePlayback?.speed || 1)
  };
}

function ensureVoicePlaybackTicker() {
  if (_voicePlaybackTick) return;
  _voicePlaybackTick = requestAnimationFrame(() => {
    _voicePlaybackTick = null;
    if (!_voicePlaybackAudio) return;
    syncVoicePlaybackState();
    syncVoicePlaybackUi();
    if (!_voicePlaybackAudio.paused) ensureVoicePlaybackTicker();
  });
}

function syncVoicePlaybackUi() {
  const playback = state.voicePlayback || {};
  const activeKey = String(playback.key || '');
  const activeUrl = String(playback.url || '');
  const progress = getVoicePlaybackProgress(playback);

  const globalPlayer = document.querySelector('[data-global-audio-player]');
  if (globalPlayer) {
    const visible = Boolean(activeUrl);
    globalPlayer.hidden = !visible;
    globalPlayer.classList.toggle('is-playing', visible && playback.playing);
    if (visible) {
      globalPlayer.querySelector('[data-role="audio-hub-title"]')?.replaceChildren(document.createTextNode(playback.title || voicePlaybackLabel(playback.kind)));
      globalPlayer.querySelector('[data-role="audio-hub-label"]')?.replaceChildren(document.createTextNode(playback.label || voicePlaybackLabel(playback.kind)));
      globalPlayer.querySelector('[data-role="audio-hub-current"]')?.replaceChildren(document.createTextNode(formatMediaDuration(playback.currentTime || 0)));
      globalPlayer.querySelector('[data-role="audio-hub-total"]')?.replaceChildren(document.createTextNode(formatMediaDuration(playback.duration || 0)));
      globalPlayer.querySelector('[data-role="audio-hub-speed"]')?.replaceChildren(document.createTextNode(`${Number(playback.speed || 1)}x`));
      const playBtn = globalPlayer.querySelector('[data-role="audio-hub-play"]');
      if (playBtn) {
        playBtn.innerHTML = playback.playing ? icons.pause : icons.play;
        playBtn.setAttribute('aria-label', playback.playing ? (t('pause') || 'Pause') : (t('play') || 'Play'));
      }
      const slider = globalPlayer.querySelector('[data-input="global-audio-progress"]');
      if (slider) slider.value = String(Math.round(progress * 1000));
    }
  }

  document.querySelectorAll('[data-voice-player]').forEach((player) => {
    const key = String(player.dataset.voiceKey || '');
    const url = String(player.dataset.voiceUrl || '');
    const baseDuration = Number(player.dataset.voiceDuration || 0);
    const active = key === activeKey && url === activeUrl;
    const currentTime = active ? Number(playback.currentTime || 0) : 0;
    const total = active ? Number(playback.duration || baseDuration || 0) : baseDuration;
    const itemProgress = total > 0 ? Math.max(0, Math.min(1, currentTime / total)) : 0;
    player.classList.toggle('is-active', active);
    player.classList.toggle('is-playing', active && playback.playing);
    const playBtn = player.querySelector('[data-role="voice-play"]');
    if (playBtn) {
      playBtn.innerHTML = active && playback.playing ? icons.pause : icons.play;
      playBtn.setAttribute('aria-label', active && playback.playing ? (t('pause') || 'Pause') : (t('play') || 'Play'));
    }
    player.querySelector('[data-role="voice-current"]')?.replaceChildren(document.createTextNode(formatMediaDuration(currentTime)));
    player.querySelector('[data-role="voice-total"]')?.replaceChildren(document.createTextNode(formatMediaDuration(total)));
    player.querySelectorAll('[data-voice-bar]').forEach((bar) => {
      const index = Number(bar.dataset.voiceBar || 0);
      bar.classList.toggle('active', itemProgress > 0 && (index + 1) / 20 <= itemProgress + 0.001);
    });
  });
}

function syncVoiceRecordingUi() {
  const panels = document.querySelectorAll('[data-voice-recording-panel]');
  if (!panels.length) return;
  const elapsed = state.chat.recording ? Math.max(0, Math.floor((Date.now() - Number(_voiceStartedAt || Date.now())) / 1000)) : 0;
  panels.forEach((panel) => {
    panel.hidden = !state.chat.recording;
    panel.classList.toggle('is-live', state.chat.recording);
    panel.querySelector('[data-role="recording-time"]')?.replaceChildren(document.createTextNode(formatMediaDuration(elapsed)));
  });
}

function ensureVoiceRecordingTicker() {
  if (_voiceRecordTick) return;
  _voiceRecordTick = setInterval(() => {
    if (!state.chat.recording) {
      clearInterval(_voiceRecordTick);
      _voiceRecordTick = null;
      syncVoiceRecordingUi();
      return;
    }
    syncVoiceRecordingUi();
  }, 250);
}

function voiceBars(seed = '', count = 20) {
  return Array.from({ length: count }, (_item, index) => {
    const code = seed.charCodeAt(index % Math.max(1, seed.length)) || 77;
    return 20 + ((code + index * 17) % 70);
  });
}

async function toggleVoicePlayback(key, url, duration = 0, options = {}) {
  if (!url) return;
  if (!_voicePlaybackAudio) {
    _voicePlaybackAudio = new Audio();
    _voicePlaybackAudio.preload = 'metadata';
    _voicePlaybackAudio.addEventListener('ended', () => {
      stopVoicePlayback(true);
    });
    _voicePlaybackAudio.addEventListener('pause', () => {
      syncVoicePlaybackState();
      syncVoicePlaybackUi();
    });
    _voicePlaybackAudio.addEventListener('play', () => {
      syncVoicePlaybackState();
      syncVoicePlaybackUi();
      ensureVoicePlaybackTicker();
    });
    _voicePlaybackAudio.addEventListener('loadedmetadata', () => {
      syncVoicePlaybackState();
      syncVoicePlaybackUi();
    });
    _voicePlaybackAudio.addEventListener('ratechange', () => {
      syncVoicePlaybackState();
      syncVoicePlaybackUi();
    });
  }
  const sameTrack = state.voicePlayback?.key === key && state.voicePlayback?.url === url;
  if (sameTrack && !_voicePlaybackAudio.paused) {
    stopVoicePlayback(false);
    return;
  }
  if (!sameTrack) {
    stopVoicePlayback(true);
    _voicePlaybackAudio.src = url;
    state.voicePlayback = {
      key,
      url,
      playing: false,
      currentTime: 0,
      duration: Number(duration || 0),
      speed: Number(state.chat.voiceSpeed || 1),
      title: options.title || voicePlaybackLabel(options.kind || 'voice'),
      label: options.label || voicePlaybackLabel(options.kind || 'voice'),
      kind: options.kind === 'audio' ? 'audio' : 'voice'
    };
  }
  _voicePlaybackAudio.playbackRate = Number(state.chat.voiceSpeed || state.voicePlayback?.speed || 1);
  try {
    await _voicePlaybackAudio.play();
    syncVoicePlaybackState();
    syncVoicePlaybackUi();
  } catch (error) {
    toast(error.message || 'Audio playback failed.', 'error');
  }
}

function seekVoicePlayback(progress) {
  if (!_voicePlaybackAudio || !state.voicePlayback?.duration) return;
  const next = Math.max(0, Math.min(1, Number(progress || 0)));
  _voicePlaybackAudio.currentTime = next * state.voicePlayback.duration;
  syncVoicePlaybackState();
  syncVoicePlaybackUi();
}

function setVoicePlaybackSpeed(value) {
  const next = [1, 1.5, 2].includes(Number(value)) ? Number(value) : 1;
  state.chat.voiceSpeed = next;
  if (_voicePlaybackAudio) {
    _voicePlaybackAudio.playbackRate = next;
    syncVoicePlaybackState();
  } else {
    state.voicePlayback = { ...(state.voicePlayback || {}), speed: next };
  }
  syncVoicePlaybackUi();
  render();
}

function readVideoDuration(file) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    const objectUrl = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      const durationMs = Math.max(0, Math.round((video.duration || 0) * 1000));
      URL.revokeObjectURL(objectUrl);
      resolve(durationMs);
    };
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(0);
    };
    video.src = objectUrl;
  });
}

async function prepareStickerUpload(file) {
  const lowerName = String(file?.name || '').toLowerCase();
  if (!file?.size) throw new Error('Choose a sticker file.');
  if (file.type.includes('svg') || lowerName.endsWith('.svg')) {
    return {
      dataUrl: await readFileAsDataURL(file),
      sourceType: 'svg',
      durationMs: 0,
      width: 0,
      height: 0
    };
  }
  if (file.type === 'image/gif' || lowerName.endsWith('.gif')) {
    return {
      dataUrl: await readFileAsDataURL(file),
      sourceType: 'gif',
      durationMs: 1000,
      width: 0,
      height: 0
    };
  }
  if (file.type.includes('webm') || lowerName.endsWith('.webm')) {
    const durationMs = await readVideoDuration(file);
    if (durationMs > 1000) throw new Error('Animated stickers must stay within 1 second.');
    return {
      dataUrl: await readFileAsDataURL(file),
      sourceType: 'webm',
      durationMs,
      width: 0,
      height: 0
    };
  }
  const compressed = await compressImageFile(file, 512, 0.92);
  return {
    dataUrl: compressed.dataUrl,
    sourceType: file.type.includes('png') ? 'png' : 'jpg',
    durationMs: 0,
    width: compressed.width || 0,
    height: compressed.height || 0
  };
}

async function handleChatImageFiles(files = []) {
  const list = Array.from(files || []).filter((file) => file?.type?.startsWith('image/'));
  if (!list.length) return 0;
  const existing = state.chat.attachments || [];
  const capacity = Math.max(0, 10 - existing.length);
  if (!capacity) {
    toast('Max 10 photos per message.', 'info');
    return 0;
  }
  const take = list.slice(0, capacity);
  const prepared = [];
  for (const file of take) {
    try {
      prepared.push(await compressImageFile(file, 1440, 0.82));
    } catch {}
  }
  if (!prepared.length) return 0;
  state.chat.attachments = existing.concat(prepared);
  if (list.length > capacity) toast(`Only ${capacity} photo(s) added (max 10 per message).`, 'info');
  render();
  return prepared.length;
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
  if (!isOperatorSession()) return;
  const ownerMode = isOwnerSession();
  const [stats, users, ads, logs, reports, posts, deletions, telemetry, reviewQueue] = await Promise.all([
    api('/api/admin/stats').catch(() => null),
    api('/api/admin/users').catch(() => ({ users: [] })),
    api('/api/admin/ads').catch(() => ({ ads: [] })),
    api('/api/admin/logs').catch(() => ({ logs: [] })),
    api('/api/admin/reports').catch(() => ({ reports: [] })),
    api('/api/admin/posts').catch(() => ({ posts: [] })),
    api('/api/admin/deletions').catch(() => ({ jobs: [] })),
    ownerMode ? api('/api/admin/telemetry').catch(() => null) : Promise.resolve(null),
    ownerMode ? api('/api/admin/sites/review-queue').catch(() => ({ items: [] })) : Promise.resolve({ items: [] })
  ]);
  state.adminStats = stats;
  state.adminUsers = users.users || [];
  state.adminReports = reports.reports || [];
  state.adminDeletionJobs = deletions.jobs || [];
  state.adminPosts = posts.posts || [];
  state.adminLogs = logs.logs || [];
  state.adminAds = ads?.ads || [];
  state.ads = (ads?.ads || []).filter((item) => item.active !== false);
  state.adminTelemetry = telemetry;
  state.adminSiteReviewQueue = reviewQueue?.items || [];
}
async function loadAdminUsers(q = '') {
  if (!isOperatorSession()) return;
  const data = await api(`/api/admin/users${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  state.adminUsers = data.users || [];
}
async function loadAdminPosts(q = '') {
  if (!isOperatorSession()) return;
  const data = await api(`/api/admin/posts${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  state.adminPosts = data.posts || [];
}

function renderDevelopersPage() {
  const section = state.route.section || 'overview';
  const sections = [
    ['overview', 'Overview'],
    ['sites', 'Sites & Studio'],
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
          ${sections.map(([id, label], index) => `<a class="dev-docs-link ${section === id ? 'active' : ''}" ${navAttrs(index === 0 ? '/developers' : `/developers/${id}`)}>${label}</a>`).join('')}
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
    <p class="muted">This is an evolving surface — endpoints marked <em>preview</em> may change. We never promise unlimited anything; every tier has concrete limits listed in <a ${navAttrs('/developers/rules')}>Rules &amp; limits</a>.</p>`,
  sites: () => `
    <h2>Sites &amp; Studio</h2>
    <p>Creator sites on justbreath are static. Pick the smallest mode that matches your build, then keep auth, comments, and discussion on the main justbreath profile or project page.</p>
    <div class="stack-list">
      <article class="tile">
        <strong>Choose the right mode</strong>
        <ul>
          <li><code>Template site</code> — launch page, docs, portfolio, or pitch page without a custom frontend bundle.</li>
          <li><code>Single HTML</code> — only when the whole site is one final <code>index.html</code> file.</li>
          <li><code>Archive package</code> — use for full static imports with <code>css/</code>, <code>js/</code>, <code>img/</code>, <code>fonts/</code>, extra pages, downloadable files, or exported folders.</li>
          <li>Supported archive formats: <code>.zip</code>, <code>.tar</code>, <code>.tar.gz</code>, <code>.tgz</code>, <code>.7z</code>. Regular-user archive limit: <code>5 MB</code>.</li>
        </ul>
      </article>
      <article class="tile">
        <strong>Static-only rules</strong>
        <ul>
          <li>No site-local auth, signup, dashboards, or executable custom server code inside the hosted copy.</li>
          <li>Archive uploads must include <code>index.html</code>.</li>
          <li>When a site has local assets or more than one page, upload the whole exported build as an archive. The platform serves uploaded archives as raw static bundles without wrapping the design.</li>
          <li>If multiple <code>index.html</code> files exist, the root <code>index.html</code> is used as the entry point.</li>
          <li>If backend/API code is detected, the import still succeeds, but those backend-dependent features are disabled and reported as compatibility warnings.</li>
        </ul>
      </article>
      <article class="tile">
        <strong>Editing after upload</strong>
        <ul>
          <li><code>Edit</code> changes title, summary, visibility, replacement upload, and import diagnostics.</li>
          <li><code>Site Studio</code> edits internal text files such as <code>html</code>, <code>css</code>, <code>js</code>, <code>svg</code>, <code>json</code>, <code>md</code>, and <code>xml</code>.</li>
          <li>If the site started as one HTML file, creating the first extra file upgrades it to bundle mode automatically.</li>
          <li>Imported images may be compressed automatically for storage when the server can save space without changing the stored path.</li>
        </ul>
      </article>
      <article class="tile">
        <strong>Move a build from another repository</strong>
        <ol>
          <li>Export the final static build.</li>
          <li>Verify that the output contains <code>index.html</code>.</li>
          <li>Package the whole output folder if local assets or extra pages exist.</li>
          <li>Upload the archive, then use <code>Site Studio</code> for fast text/CSS/JS polish.</li>
        </ol>
      </article>
    </div>
    <p class="muted">Full repository context: <a href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">JustBreathDevSite</a>, <a href="${SITE_CREATION_GUIDE_URL}" target="_blank" rel="noopener">SITE_CREATION_GUIDE.md</a>, <a href="${SITE_CREATION_EXAMPLES_URL}" target="_blank" rel="noopener">SITE_CREATION_EXAMPLES_RU.md</a>.</p>`,
  auth: () => `
    <h2>Authentication</h2>
    <p>Two methods are supported:</p>
    <h3>Session cookie</h3>
    <p>Browser users authenticate with the <code>jb_sid</code> cookie issued at sign-in. You don't need to do anything special from the client — credentials are cookie-based.</p>
    <h3>Bot token</h3>
    <p>Create a bot token in <a ${navAttrs('/settings')}>Settings → API Tokens</a>. Tokens are shown once — store them in a secret manager.</p>
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
      <li><code>POST /api/me/sites/upload-archive</code> — legacy JSON archive upload (best for smaller archives).</li>
      <li><code>POST /api/me/sites/upload-archive-binary</code> — direct binary archive upload with <code>index.html</code>; streams to a temp file and avoids base64 overhead.</li>
      <li><code>PUT /api/me/sites/:id/archive-binary</code> — replace an uploaded archive without converting it to base64 first.</li>
    </ul>`,
  bots: () => `
    <h2>Bots &amp; tokens</h2>
    <p>A bot is a regular account whose sessions are replaced by long-lived tokens. To create one:</p>
    <ol>
      <li>Sign in as the account you want to automate.</li>
      <li>Open <a ${navAttrs('/settings')}>Settings → API Tokens</a>.</li>
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
        <tr><td>Archive site upload</td><td>5 MB</td><td>5 MB</td><td>5 MB</td></tr>
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
    <p>This Privacy Policy explains what justbreath.life (operated by the justbreath team, hereafter "justbreath", "we", "us") collects when you use the service, why we collect it, who we share it with, and what rights you have. If something here is unclear, write to <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a>.</p>
    <p>Key points at a glance:</p>
    <ul>
      <li>We collect only what we need to run the service: account data, content you publish, basic logs, anonymous telemetry.</li>
      <li>We do not sell your personal data.</li>
      <li>We show ads via Google AdSense. AdSense uses cookies and you can opt out of personalised ads at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ad Settings</a>.</li>
      <li>We store data on our own servers. Automatic backups run every 30 minutes and keep the last 48 snapshots (≈24 hours).</li>
      <li>You can export or delete your account at any time in <a ${navAttrs('/settings')}>Settings</a>.</li>
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
      <li><strong>Access</strong> — request a copy of your data. Available as a one-click export in <a ${navAttrs('/settings')}>Settings → Export</a>.</li>
      <li><strong>Rectification</strong> — edit your profile, posts and settings at any time.</li>
      <li><strong>Erasure</strong> — delete your account in <a ${navAttrs('/settings')}>Settings → Account</a>. Irreversible after the next backup rotation.</li>
      <li><strong>Restriction &amp; objection</strong> — write to us to pause processing.</li>
      <li><strong>Portability</strong> — the export format is plain JSON.</li>
      <li><strong>Complaint</strong> — you may complain to your local data-protection authority.</li>
    </ul>
    <p>To exercise any right, email <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a>. We reply within 30 days.</p>`,
  security: () => `
    <h2>Security</h2>
    <ul>
      <li>Transport encrypted with TLS (HTTPS) end-to-end via Cloudflare.</li>
      <li>Passwords hashed with bcrypt (cost factor 12). We never store plain passwords.</li>
      <li>Sessions bound to HttpOnly cookies with SameSite=Lax.</li>
      <li>Rate limits on authentication endpoints (5/min/IP) and general API (120/min/IP).</li>
      <li>Content Security Policy restricts which third-party scripts can run.</li>
      <li>Uploaded creator-site imports are served as static files only. Backend handlers inside an import do not execute on the hosted copy.</li>
    </ul>
    <p>No system is perfectly secure. If you find a vulnerability, please report responsibly to <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a>. We acknowledge reports within 72 hours.</p>`,
  children: () => `
    <h2>Minors</h2>
    <p>The service is not directed at children under 13. If you are a parent or guardian and believe a child has given us personal data, email <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a> and we will delete the account.</p>
    <p>Between 13 and the age of digital consent in your jurisdiction (14–16 in most EU countries), you may only use the service with the verifiable consent of a parent or legal guardian.</p>`,
  changes: () => `
    <h2>Changes to this policy</h2>
    <p>If we materially change this policy, we will notify registered users by email and show a banner on the site for at least 14 days before the change takes effect. The "Last updated" date at the top always reflects the current version.</p>
    <p>You can always read the current text on this page, download it as a plain Markdown document via <a href="/PRIVACY.md" target="_blank" rel="noopener">PRIVACY.md</a>, and review the full history on our GitHub if the repository is public.</p>`,
  contact: () => `
    <h2>Contact</h2>
    <p>Data controller: <strong>justbreath</strong></p>
    <p>Email: <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a><br/>
       Owner profile: <a ${navAttrs('/@justbreath')}>@justbreath</a></p>
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
          ${sections.map(([id, label], index) => `<a class="dev-docs-link ${section === id ? 'active' : ''}" ${navAttrs(index === 0 ? '/privacy' : `/privacy/${id}`)}>${label}</a>`).join('')}
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
    <p>You must not publish content that is illegal, infringes rights, contains malware, facilitates harassment, sexually exploits minors, or otherwise violates our <a ${navAttrs('/terms/prohibited')}>Prohibited uses</a> policy.</p>`,
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
    <p>You may delete your account at any time in <a ${navAttrs('/settings')}>Settings</a>. We may suspend or terminate an account that violates these Terms or applicable law.</p>
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
    <p>Email: <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a><br/>
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
          ${sections.map(([id, label], index) => `<a class="dev-docs-link ${section === id ? 'active' : ''}" ${navAttrs(index === 0 ? '/terms' : `/terms/${id}`)}>${label}</a>`).join('')}
        </nav>
      </aside>
      <div class="dev-docs-body">${panel}</div>
    </section>`;
}

function renderContactPage() {
  return `
    <section class="section-shell">
      <div class="page-heading-row"><div><span class="eyebrow">contact</span><h1>Get in touch</h1><p class="muted">For support, legal, documentation, or GitHub-related questions.</p></div></div>
      <div class="dev-docs-body" style="margin-top:24px">
        <h2>Email</h2>
        <ul>
          <li><strong>General:</strong> <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a></li>
          <li><strong>Legal / DMCA / Privacy:</strong> same address, subject line <code>[LEGAL]</code> / <code>[DMCA]</code> / <code>[PRIVACY]</code>.</li>
          <li><strong>Security reports:</strong> subject line <code>[SECURITY]</code>. We acknowledge within 72 h.</li>
          <li><strong>Press:</strong> subject line <code>[PRESS]</code>.</li>
        </ul>
        <h2>On the platform</h2>
        <ul>
          <li>Owner profile — <a ${navAttrs('/@justbreath')}>@justbreath</a></li>
          <li>Ship feedback — open a post in <a ${navAttrs('/feed')}>Feed</a> with the <code>#feedback</code> tag.</li>
        </ul>
        <h2>Elsewhere</h2>
        <ul>
          <li>GitHub profile — <a href="${GITHUB_PROFILE_URL}" target="_blank" rel="noopener">${GITHUB_PROFILE_URL.replace('https://', '')}</a></li>
          <li>Project repository — <a href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">bnfe12/JustBreathDevSite</a></li>
          <li>Site creation guide — <a href="${SITE_CREATION_GUIDE_URL}" target="_blank" rel="noopener">SITE_CREATION_GUIDE.md</a></li>
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
        <p>Built by <a ${navAttrs('/@tcheler')}>@tcheler</a> and contributors.</p>
        <h2>Where</h2>
        <p>Hosted on our own infrastructure, behind Cloudflare. The code is intentionally small — one Express app, one vanilla-JS client, one CSS file. See <a ${navAttrs('/developers')}>Developers</a> for how to build on it.</p>
        <h2>Docs &amp; repository</h2>
        <p>Main GitHub profile: <a href="${GITHUB_PROFILE_URL}" target="_blank" rel="noopener">${GITHUB_PROFILE_URL.replace('https://', '')}</a>. Creator-site source and full setup docs: <a href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">bnfe12/JustBreathDevSite</a>, including <a href="${SITE_CREATION_GUIDE_URL}" target="_blank" rel="noopener">the site creation guide</a>.</p>
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
          <a ${navAttrs('/')}>Home</a>
          <a ${navAttrs('/feed')}>Feed</a>
          <a ${navAttrs('/discover')}>Discover</a>
          <a ${navAttrs('/sites')}>Sites</a>
        </div>
        <div class="site-footer-col">
          <h4>Developers</h4>
          <a ${navAttrs('/developers')}>API &amp; docs</a>
          <a ${navAttrs('/developers/auth')}>Authentication</a>
          <a ${navAttrs('/developers/api')}>REST API</a>
          <a ${navAttrs('/developers/webhooks')}>SSE &amp; events</a>
          <a ${navAttrs('/developers/rules')}>Rules &amp; limits</a>
        </div>
        <div class="site-footer-col">
          <h4>Legal</h4>
          <a ${navAttrs('/privacy')}>Privacy Policy</a>
          <a ${navAttrs('/terms')}>Terms of Service</a>
          <a href="/PRIVACY.md" download>Privacy (.md)</a>
          <a href="/TERMS.md" download>Terms (.md)</a>
          <a href="/TRADEMARK.md" download>Trademark</a>
        </div>
        <div class="site-footer-col">
          <h4>Company</h4>
          <a ${navAttrs('/about')}>About</a>
          <a ${navAttrs('/contact')}>Contact</a>
          <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="${GITHUB_PROFILE_URL}" target="_blank" rel="noopener">GitHub</a>
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
      <a class="primary-button" ${navAttrs('/')}>Back to home</a>
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
      <a class="soft-button" ${navAttrs('/settings')}>Skip for now</a>
    </div>
  </section>`;
}

function renderAdminPage() {
  if (!currentUser()) return renderGate('Sign in first.');
  if (!isOperatorSession()) return renderGate('Access restricted to operators.');
  const stats = state.adminStats;
  const ownerMode = isOwnerSession();
  const isRu = currentLang() === 'ru';
  const tabs = ownerMode
    ? [
        { id: 'stats', label: t('stats') || 'Stats' },
        { id: 'users', label: t('users') || 'Users' },
        { id: 'moderation', label: t('moderation') || 'Moderation' },
        { id: 'review', label: isRu ? 'Ревью сайтов' : 'Site review' },
        { id: 'verification', label: isRu ? 'Верификация' : 'Verification' },
        { id: 'ads', label: t('ads') || 'Ads' },
        { id: 'telemetry', label: 'Telemetry' },
        { id: 'platform', label: isRu ? 'Платформа' : 'Platform' },
        { id: 'logs', label: t('logs') || 'Logs' },
      ]
    : [
        { id: 'users', label: currentLang() === 'ru' ? 'Пользователи и подписки' : 'Users & subscriptions' },
        { id: 'moderation', label: currentLang() === 'ru' ? 'Модерация' : 'Moderation' }
      ];
  const activeTab = tabs.some(({ id }) => id === state.adminTab) ? state.adminTab : tabs[0].id;
  return `
    <div class="admin-page-head">
      <span class="eyebrow">${ownerMode ? (isRu ? 'владелец' : 'owner') : 'admin'}</span>
      <h1>${t('adminPanel') || 'Admin Panel'}</h1>
    </div>
    <section class="settings-shell section-shell">
      <aside class="settings-nav">
        ${tabs.map(({ id, label }) => `<button class="settings-tab ${activeTab === id ? 'active' : ''}" data-action="admin-tab" data-tab="${id}">${label}</button>`).join('')}
      </aside>
      <div class="settings-content">
        ${activeTab === 'stats' ? renderAdminStats(stats) : ''}
        ${activeTab === 'users' ? renderAdminUsers() : ''}
        ${activeTab === 'moderation' ? renderAdminModeration() : ''}
        ${activeTab === 'review' ? renderAdminReviewQueue() : ''}
        ${activeTab === 'ads' ? renderAdminAds() : ''}
        ${activeTab === 'telemetry' ? renderAdminTelemetry() : ''}
        ${activeTab === 'platform' ? renderAdminPlatform() : ''}
        ${activeTab === 'verification' ? renderAdminVerification() : ''}
        ${activeTab === 'logs' ? renderAdminLogs() : ''}
      </div>
    </section>`;
}
function renderAdminStats(stats) {
  const isRu = currentLang() === 'ru';
  if (!stats) return renderLoading();
  const queueCount = (state.adminSiteReviewQueue || []).length;
  const telemetry = state.adminTelemetry;
  return `<section class="settings-panel"><h2>${isRu ? 'Обзор платформы' : 'Platform overview'}</h2>
    <div class="admin-stats-grid">
      <div class="admin-stat"><strong>${stats.users?.total || 0}</strong><span>${isRu ? 'Всего пользователей' : 'Total users'}</span></div>
      <div class="admin-stat"><strong>${stats.users?.newToday || 0}</strong><span>${isRu ? 'Новых сегодня' : 'New today'}</span></div>
      <div class="admin-stat"><strong>${stats.users?.banned || 0}</strong><span>${isRu ? 'Заблокировано' : 'Banned'}</span></div>
      <div class="admin-stat"><strong>${stats.messages?.total || 0}</strong><span>${isRu ? 'Сообщений' : 'Messages'}</span></div>
      <div class="admin-stat"><strong>${stats.messages?.today || 0}</strong><span>${isRu ? 'Сообщений сегодня' : 'Messages today'}</span></div>
      <div class="admin-stat"><strong>${stats.rooms?.total || 0}</strong><span>${isRu ? 'Комнат' : 'Rooms'}</span></div>
      <div class="admin-stat"><strong>${stats.sites?.public || 0}</strong><span>${isRu ? 'Публичных сайтов' : 'Public sites'}</span></div>
      <div class="admin-stat"><strong>${stats.posts?.total || 0}</strong><span>${isRu ? 'Постов' : 'Posts'}</span></div>
      <div class="admin-stat"><strong>${stats.reports?.open || 0}</strong><span>${isRu ? 'Открытых жалоб' : 'Open reports'}</span></div>
      <div class="admin-stat"><strong>${stats.deletions?.scheduled || 0}</strong><span>${isRu ? 'Очередь удаления 24ч' : '24h deletion queue'}</span></div>
      <div class="admin-stat"><strong>${stats.workspaces || 0}</strong><span>${isRu ? 'Воркспейсов' : 'Workspaces'}</span></div>
      <div class="admin-stat"><strong>${queueCount}</strong><span>${isRu ? 'Сайтов ждут ревью' : 'Sites waiting review'}</span></div>
      <div class="admin-stat"><strong>${telemetry?.summary?.pageviews || 0}</strong><span>${isRu ? 'Pageviews за окно' : 'Window pageviews'}</span></div>
    </div>
    ${state.maintenance ? `<div class="inline-alert inline-alert-warning" style="margin-top:10px">${iconBadge('alert', 'warning')}<div class="inline-alert-copy"><strong>Maintenance mode</strong><span>Public API access is currently restricted.</span></div></div>` : ''}
  </section>`;
}
function renderAdminUsers() {
  const ownerMode = isOwnerSession();
  const plans = state.meta?.subscriptions || [];
  const isRu = currentLang() === 'ru';
  const roleOptions = [
    ['member', isRu ? 'Участник' : 'Member'],
    ['moderator', isRu ? 'Модератор' : 'Moderator'],
    ['admin', 'Admin'],
    ['owner', isRu ? 'Владелец' : 'Owner']
  ];
  return `<section class="settings-panel"><h2>${isRu ? 'Пользователи' : 'Users'} (${state.adminUsers.length})</h2>
    <div class="search-control" style="margin-bottom:12px">
      ${icons.search}
      <input type="search" data-input="admin-search" placeholder="${isRu ? 'Поиск пользователей…' : 'Search users…'}" />
    </div>
    <div class="social-list">${state.adminUsers.map(u => `
      <div class="social-row admin-user-row ${u.bannedAt ? 'banned-row' : ''}">
        ${avatar(u, 'sm')}
        <div>
          <strong>${escapeHtml(u.displayName)}</strong>
          <span>@${escapeHtml(u.handle)} · ${escapeHtml(u.email || '')} · <em>${escapeHtml(u.roleInternal || u.roleLabel || 'member')}</em></span>
          <div class="badge-row">${badgePills(u)}</div>
          <span class="muted" style="display:block;font-size:12px;margin-top:4px">
            ${isRu ? 'Тариф' : 'Plan'}: ${escapeHtml((['owner', 'admin'].includes(u.roleInternal || '') ? (isRu ? 'доступ оператора' : 'Operator access') : (u.billing?.planLabel || 'Free')))}
            · ${isRu ? 'Сайты' : 'Sites'}: ${u.siteCount || 0}/${u.siteUnlimited ? '∞' : escapeHtml(u.siteLimitLabel || '0')}
          </span>
          ${ownerMode ? `
            <div class="admin-control-grid" style="margin-top:10px">
              <label class="admin-field">
                <span>${isRu ? 'Роль' : 'Role'}</span>
                <select data-admin-role-select="${escapeHtml(u.handleCanonical)}" ${u.isSelf ? 'disabled' : ''}>
                  ${roleOptions.map(([value, label]) => `<option value="${value}" ${(u.roleInternal || 'member') === value ? 'selected' : ''}>${label}</option>`).join('')}
                </select>
              </label>
              <label class="admin-field">
                <span>${isRu ? 'Бейджи' : 'Badges'}</span>
                <input type="text" data-admin-badges-input="${escapeHtml(u.handleCanonical)}" value="${escapeHtml((u.badges || []).join(', '))}" placeholder="USR, VRF, DEV" ${u.isSelf ? 'disabled' : ''} />
              </label>
            </div>` : ''}
        </div>
        <div class="row-actions">
          <select data-admin-plan-select="${escapeHtml(u.handleCanonical)}" ${!ownerMode && u.roleInternal === 'owner' ? 'disabled' : ''}>
            <option value="">Free</option>
            ${plans.map((plan) => `<option value="${escapeHtml(plan.id)}" ${(u.billing?.planId || '') === plan.id ? 'selected' : ''}>${escapeHtml(plan.label)}</option>`).join('')}
          </select>
          <button class="soft-button compact" data-action="admin-save-plan" data-handle="${escapeHtml(u.handleCanonical)}" ${!ownerMode && u.roleInternal === 'owner' ? 'disabled' : ''}>
            ${isRu ? 'Сохранить тариф' : 'Save plan'}
          </button>
          ${ownerMode && !u.isSelf ? `
            ${u.bannedAt
              ? `<button class="soft-button compact" data-action="admin-unban" data-handle="${escapeHtml(u.handleCanonical)}">${isRu ? 'Разбанить' : 'Unban'}</button>`
              : `<button class="inline-button danger compact" data-action="admin-ban" data-handle="${escapeHtml(u.handleCanonical)}">${isRu ? 'Забанить' : 'Ban'}</button>`}
            <button class="soft-button compact" data-action="admin-verify" data-handle="${escapeHtml(u.handleCanonical)}">${icons.check} ${isRu ? 'Верифицировать' : 'Verify'}</button>
            <button class="soft-button compact" data-action="admin-save-user-access" data-handle="${escapeHtml(u.handleCanonical)}">${isRu ? 'Сохранить доступ' : 'Save access'}</button>
          ` : ''}
          ${!u.isSelf ? `<button class="inline-button danger compact" data-action="admin-delete-account" data-handle="${escapeHtml(u.handleCanonical)}" ${!ownerMode && u.roleInternal === 'owner' ? 'disabled' : ''}>${currentLang() === 'ru' ? 'Удалить аккаунт' : 'Delete account'}</button>` : ''}
          ${!ownerMode && u.isSelf ? '<span class="muted">you</span>' : ''}
        </div>
      </div>`).join('') || renderEmpty(isRu ? 'Пользователи не найдены.' : 'No users found.')}
    </div>
  </section>`;
}
function renderAdminAds() {
  const isRu = currentLang() === 'ru';
  return `<section class="settings-panel"><h2>${isRu ? 'Рекламные слоты' : 'Ad slots'}</h2>
    <p class="muted">${isRu ? 'Управление sponsor-блоками на главной и в ленте. Здесь отдельное admin-состояние, без смешивания с публичным рендером.' : 'Manage the sponsor blocks that appear on home and feed pages. This now uses dedicated admin state instead of the public ad render cache.'}</p>
    <div class="tile admin-ad-create">
      <div class="admin-control-grid">
        <label class="admin-field"><span>${isRu ? 'Заголовок' : 'Title'}</span><input type="text" data-admin-new-ad="title" placeholder="${isRu ? 'Новый спонсор' : 'New sponsor'}" /></label>
        <label class="admin-field"><span>CTA</span><input type="text" data-admin-new-ad="cta" placeholder="${isRu ? 'Открыть' : 'Learn more'}" /></label>
        <label class="admin-field"><span>Href</span><input type="text" data-admin-new-ad="href" placeholder="/discover" /></label>
        <label class="admin-field"><span>${isRu ? 'Иконка / emoji' : 'Icon / emoji'}</span><input type="text" data-admin-new-ad="icon" placeholder="📢" /></label>
        <label class="admin-field"><span>${isRu ? 'Тип' : 'Type'}</span><select data-admin-new-ad="type"><option value="banner">banner</option><option value="card">card</option></select></label>
        <label class="admin-field admin-field-check"><input type="checkbox" data-admin-new-ad="internal" checked /><span>${isRu ? 'Внутренняя ссылка' : 'Internal link'}</span></label>
      </div>
      <label class="admin-field"><span>${isRu ? 'Описание' : 'Description'}</span><textarea rows="3" data-admin-new-ad="desc" placeholder="${isRu ? 'Короткое описание слота' : 'Short sponsor copy'}"></textarea></label>
      <div class="detail-actions"><button class="primary-button compact" data-action="admin-create-ad">${icons.plus}<span>${isRu ? 'Добавить слот' : 'Add slot'}</span></button></div>
    </div>
    <div class="stack-list">
      ${(state.adminAds || []).map((ad) => `
        <div class="tile" style="gap:10px">
          <div class="inline-stack between">
            <div class="inline-stack">
              ${renderAdVisual(ad, 'admin')}
              <div><strong>${escapeHtml(ad.title)}</strong><span style="display:block;font-size:12px;color:var(--text-muted)">${escapeHtml(ad.type)}</span></div>
            </div>
            <span class="badge-pill" style="background:${ad.internal ? 'rgba(63,185,80,.12)' : 'rgba(45,140,240,.12)'}">${ad.internal ? (isRu ? 'внутренняя' : 'internal') : (isRu ? 'внешняя' : 'external')}</span>
          </div>
          <div class="admin-control-grid">
            <label class="admin-field"><span>${isRu ? 'Заголовок' : 'Title'}</span><input type="text" data-admin-ad-input="${escapeHtml(ad.id)}:title" value="${escapeHtml(ad.title || '')}" /></label>
            <label class="admin-field"><span>CTA</span><input type="text" data-admin-ad-input="${escapeHtml(ad.id)}:cta" value="${escapeHtml(ad.cta || '')}" /></label>
            <label class="admin-field"><span>Href</span><input type="text" data-admin-ad-input="${escapeHtml(ad.id)}:href" value="${escapeHtml(ad.href || '')}" /></label>
            <label class="admin-field"><span>${isRu ? 'Иконка' : 'Icon'}</span><input type="text" data-admin-ad-input="${escapeHtml(ad.id)}:icon" value="${escapeHtml(ad.icon || '')}" /></label>
            <label class="admin-field"><span>${isRu ? 'Лого URL' : 'Logo URL'}</span><input type="text" data-admin-ad-input="${escapeHtml(ad.id)}:logo" value="${escapeHtml(ad.logo || '')}" /></label>
            <label class="admin-field"><span>${isRu ? 'Тип' : 'Type'}</span><select data-admin-ad-input="${escapeHtml(ad.id)}:type"><option value="banner" ${ad.type === 'banner' ? 'selected' : ''}>banner</option><option value="card" ${ad.type === 'card' ? 'selected' : ''}>card</option></select></label>
          </div>
          <label class="admin-field"><span>${isRu ? 'Описание' : 'Description'}</span><textarea rows="3" data-admin-ad-input="${escapeHtml(ad.id)}:desc">${escapeHtml(ad.desc || '')}</textarea></label>
          <a href="${escapeHtml(ad.href)}" style="font-size:12px;color:var(--accent-2)">${escapeHtml(ad.href)}</a>
          <div class="detail-actions">
            <button class="soft-button compact" data-action="admin-save-ad" data-id="${escapeHtml(ad.id)}">${isRu ? 'Сохранить' : 'Save'}</button>
            <button class="soft-button compact" data-action="admin-toggle-ad" data-id="${escapeHtml(ad.id)}" data-active="${ad.active === false ? 'false' : 'true'}">${ad.active === false ? (isRu ? 'Включить' : 'Enable') : (isRu ? 'Выключить' : 'Disable')}</button>
            <button class="inline-button danger compact" data-action="admin-delete-ad" data-id="${escapeHtml(ad.id)}">${isRu ? 'Удалить' : 'Delete'}</button>
          </div>
        </div>`).join('')}
    </div>
  </section>`;
}
function renderAdminVerification() {
  const pending = (state.adminUsers || []).filter(u => u.verificationRequested && !u.badges?.includes('VRF'));
  const isRu = currentLang() === 'ru';
  return `<section class="settings-panel"><h2>${isRu ? 'Запросы на верификацию' : 'Verification requests'}</h2>
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
              <button class="soft-button compact" data-action="admin-verify" data-handle="${escapeHtml(u.handleCanonical)}">${icons.check} ${isRu ? 'Верифицировать' : 'Verify'}</button>
            </div>
          </div>`).join('')}
      </div>` : `<p class="muted">${isRu ? 'Заявок пока нет.' : 'No pending requests.'}</p>`}
    <p style="font-size:12px;color:var(--text-muted);margin-top:12px">
      ${isRu ? 'Чтобы одобрить пользователя, откройте вкладку ' : 'To approve a user, open the '}
      <button class="text-link" data-action="admin-tab" data-tab="users">${isRu ? 'Пользователи' : 'Users tab'}</button>.
    </p>
  </section>`;
}
function renderAdminReviewQueue() {
  const isRu = currentLang() === 'ru';
  const items = state.adminSiteReviewQueue || [];
  return `<section class="settings-panel"><h2>${isRu ? 'Очередь ревью сайтов' : 'Site review queue'}</h2>
    <p class="muted">${isRu ? 'Проверка сайтов, которые были отправлены на ручное ревью перед публикацией.' : 'Review sites that were submitted for manual approval before wider visibility.'}</p>
    <div class="stack-list">
      ${items.length ? items.map((site) => `
        <article class="tile moderation-card" style="gap:10px">
          <div class="inline-stack between">
            <div style="min-width:0">
              <strong>${escapeHtml(site.title || site.slug)}</strong>
              <span style="display:block;font-size:12px;color:var(--text-muted)">/@${escapeHtml(site.owner?.handle || '')}/${escapeHtml(site.slug || '')} · ${formatDate(site.updatedAt || site.createdAt)}</span>
            </div>
            <span class="surface-pill surface-group">${isRu ? 'Ожидает' : 'Pending'}</span>
          </div>
          ${site.summary ? `<p style="margin:0;font-size:13px;color:var(--text-soft)">${escapeHtml(site.summary)}</p>` : ''}
          <div class="tile-actions">
            <a class="soft-button compact" href="${escapeHtml(site.url || `/@${site.owner?.handle}/${site.slug}`)}" target="_blank" rel="noopener">${icons.external}<span>${isRu ? 'Открыть сайт' : 'Open site'}</span></a>
            <button class="primary-button compact" data-action="admin-site-review" data-id="${site.id}" data-decision="approved">${icons.check}<span>${isRu ? 'Одобрить' : 'Approve'}</span></button>
            <button class="inline-button danger compact" data-action="admin-site-review" data-id="${site.id}" data-decision="rejected">${isRu ? 'Отклонить' : 'Reject'}</button>
          </div>
        </article>`).join('') : `<p class="muted">${isRu ? 'Очередь пустая.' : 'The queue is empty.'}</p>`}
    </div>
  </section>`;
}
function adminReportTypeLabel(type) {
  const isRu = currentLang() === 'ru';
  const labels = {
    site: isRu ? 'Сайт' : 'Site',
    message: isRu ? 'Сообщение' : 'Message',
    post: isRu ? 'Пост' : 'Post',
    project: isRu ? 'Проект' : 'Project',
    user: isRu ? 'Аккаунт' : 'Account',
    other: isRu ? 'Другое' : 'Other'
  };
  return labels[type] || labels.other;
}
function renderAdminReportDeleteAction(report) {
  const isRu = currentLang() === 'ru';
  if (!report?.target) return '';
  if (report.pendingDeletion) {
    return `<span class="surface-pill surface-work">${isRu ? 'В очереди 24ч' : 'Queued for 24h'}</span>`;
  }
  if (report.target.type === 'post') {
    return `<button class="inline-button danger compact" data-action="admin-delete-post" data-id="${report.target.id}">${isRu ? 'Удалить пост' : 'Delete post'}</button>`;
  }
  if (report.target.type === 'site') {
    return `<button class="inline-button danger compact" data-action="admin-delete-site" data-id="${report.target.id}">${isRu ? 'Удалить сайт' : 'Delete site'}</button>`;
  }
  if (report.target.type === 'project') {
    return `<button class="inline-button danger compact" data-action="admin-delete-project" data-id="${report.target.id}">${isRu ? 'Удалить проект' : 'Delete project'}</button>`;
  }
  if (report.target.type === 'message') {
    return `<button class="inline-button danger compact" data-action="admin-delete-message" data-id="${report.target.id}">${isRu ? 'Удалить сообщение' : 'Delete message'}</button>`;
  }
  if (report.target.type === 'user' && report.target.handleCanonical) {
    return `<button class="inline-button danger compact" data-action="admin-delete-account" data-handle="${escapeHtml(report.target.handleCanonical)}">${isRu ? 'Удалить аккаунт' : 'Delete account'}</button>`;
  }
  return '';
}
function renderAdminReportCard(report) {
  const isRu = currentLang() === 'ru';
  return `<article class="tile moderation-card" style="gap:10px">
    <div class="inline-stack between">
      <div style="min-width:0">
        <div class="inline-stack" style="gap:8px;flex-wrap:wrap">
          <strong>${escapeHtml(report.target?.label || report.reason)}</strong>
          <span class="surface-pill surface-${report.status === 'open' ? 'group' : 'work'}">${escapeHtml(report.status)}</span>
          <span class="surface-pill">${adminReportTypeLabel(report.target?.type || 'other')}</span>
        </div>
        <span style="display:block;font-size:12px;color:var(--text-muted)">${escapeHtml(report.reason)} · ${formatDate(report.createdAt)}</span>
      </div>
    </div>
    ${report.reporter ? `<p style="margin:0;font-size:13px;color:var(--text-soft)">${isRu ? 'От:' : 'From:'} @${escapeHtml(report.reporter.handle || '')}</p>` : ''}
    ${report.details ? `<p style="margin:0;font-size:13px;color:var(--text-soft)">${escapeHtml(report.details)}</p>` : ''}
    ${report.pendingDeletion ? `<div class="inline-alert inline-alert-warning"><div class="inline-alert-copy"><strong>${isRu ? 'Удаление уже запланировано' : 'Deletion already scheduled'}</strong><span>${isRu ? `До окончательного удаления осталось ${formatDeletionCountdown(report.pendingDeletion.deleteAfter)}.` : `${formatDeletionCountdown(report.pendingDeletion.deleteAfter)} left before permanent removal.`}</span></div></div>` : ''}
    <div class="tile-actions">
      ${report.target?.url ? (
        report.target.url.startsWith('http')
          ? `<a class="soft-button compact" href="${escapeHtml(report.target.url)}" target="_blank" rel="noopener">${icons.external}<span>${isRu ? 'Открыть' : 'Open'}</span></a>`
          : `<a class="soft-button compact" ${navAttrs(report.target.url)}>${icons.external}<span>${isRu ? 'Открыть' : 'Open'}</span></a>`
      ) : ''}
      ${renderAdminReportDeleteAction(report)}
      ${report.status !== 'dismissed' ? `<button class="soft-button compact" data-action="admin-dismiss-report" data-id="${report.id}">${isRu ? 'Скрыть' : 'Dismiss'}</button>` : ''}
      ${report.status !== 'resolved' ? `<button class="primary-button compact" data-action="admin-confirm-report" data-id="${report.id}">${icons.check}<span>${isRu ? 'Подтвердить' : 'Confirm'}</span></button>` : ''}
    </div>
  </article>`;
}
function renderAdminDeletionJobCard(job) {
  const isRu = currentLang() === 'ru';
  return `<article class="tile moderation-card" style="gap:10px">
    <div class="inline-stack between">
      <div style="min-width:0">
        <div class="inline-stack" style="gap:8px;flex-wrap:wrap">
          <strong>${escapeHtml(job.target?.label || (isRu ? 'Элемент' : 'Item'))}</strong>
          <span class="surface-pill surface-work">${adminReportTypeLabel(job.target?.type || job.targetType || 'other')}</span>
        </div>
        <span style="display:block;font-size:12px;color:var(--text-muted)">${isRu ? 'Окончательное удаление через' : 'Permanent deletion in'} ${formatDeletionCountdown(job.deleteAfter)}</span>
      </div>
      <button class="soft-button compact" data-action="admin-restore-deletion" data-id="${job.id}">${isRu ? 'Вернуть' : 'Restore'}</button>
    </div>
    ${job.note ? `<p style="margin:0;font-size:13px;color:var(--text-soft)">${escapeHtml(job.note)}</p>` : ''}
    <p style="margin:0;font-size:12px;color:var(--text-muted)">${isRu ? 'Запланировал:' : 'Scheduled by:'} ${job.scheduledBy ? `@${escapeHtml(job.scheduledBy.handle || '')}` : (isRu ? 'оператор' : 'operator')} · ${formatDate(job.createdAt, 'full')}</p>
  </article>`;
}
function renderAdminModeration() {
  const banned = (state.adminUsers || []).filter(u => u.bannedAt);
  const guests = (state.adminUsers || []).filter(u => u.roleInternal === 'guest');
  const reports = state.adminReports || [];
  const deletionJobs = state.adminDeletionJobs || [];
  const openReports = reports.filter((item) => item.status === 'open');
  const siteReports = reports.filter((item) => item.target?.type === 'site');
  const messageReports = reports.filter((item) => item.target?.type === 'message');
  const posts = state.adminPosts || [];
  const isRu = currentLang() === 'ru';
  const viewOptions = [
    { id: 'overview', label: isRu ? 'Все жалобы' : 'All reports', count: reports.length },
    { id: 'sites', label: isRu ? 'По сайтам' : 'Site reports', count: siteReports.length },
    { id: 'messages', label: isRu ? 'По сообщениям' : 'Message reports', count: messageReports.length }
  ];
  const activeView = viewOptions.some((item) => item.id === state.adminModerationView) ? state.adminModerationView : 'overview';
  const filteredReports = activeView === 'sites'
    ? siteReports
    : activeView === 'messages'
      ? messageReports
      : reports;
  return `<section class="settings-panel"><h2>Moderation</h2>
    <div class="settings-block">
      <div class="section-heading">
        <h3>${isRu ? 'Жалобы' : 'Reports'} (${reports.length})</h3>
        <span class="muted">${isRu ? `${openReports.length} открытых` : `${openReports.length} open`}</span>
      </div>
      <div class="segment-row" style="margin-bottom:12px">
        ${viewOptions.map((item) => `<button class="segment-button ${activeView === item.id ? 'active' : ''}" data-action="admin-moderation-view" data-view="${item.id}">${item.label} <strong>${item.count}</strong></button>`).join('')}
      </div>
      ${activeView === 'overview' ? `<div class="admin-stats-grid" style="margin-bottom:14px">
        <div class="admin-stat"><strong>${siteReports.filter((item) => item.status === 'open').length}</strong><span>${isRu ? 'Открытых по сайтам' : 'Open site reports'}</span></div>
        <div class="admin-stat"><strong>${messageReports.filter((item) => item.status === 'open').length}</strong><span>${isRu ? 'Открытых по сообщениям' : 'Open message reports'}</span></div>
        <div class="admin-stat"><strong>${deletionJobs.length}</strong><span>${isRu ? 'В очереди на 24ч' : 'In 24h queue'}</span></div>
      </div>` : ''}
      <div class="stack-list">
        ${filteredReports.length ? filteredReports.map((report) => renderAdminReportCard(report)).join('') : `<p class="muted">${isRu ? 'Для этой вкладки пока нет жалоб.' : 'No reports in this view yet.'}</p>`}
      </div>
    </div>
    <div class="settings-block">
      <div class="section-heading">
        <h3>${isRu ? 'Очередь удаления' : 'Deletion queue'} (${deletionJobs.length})</h3>
        <span class="muted">${isRu ? 'Полное удаление через 24 часа' : 'Permanent removal after 24 hours'}</span>
      </div>
      <div class="stack-list">
        ${deletionJobs.length ? deletionJobs.map((job) => renderAdminDeletionJobCard(job)).join('') : `<p class="muted">${isRu ? 'Очередь пуста.' : 'Queue is empty.'}</p>`}
      </div>
    </div>
    <div class="settings-block">
      <h3>${isRu ? 'Быстрое удаление постов' : 'Quick post removal'} (${posts.length})</h3>
      <div class="search-control" style="margin:10px 0 12px">
        ${icons.search}
        <input type="search" data-input="admin-post-search" placeholder="${isRu ? 'Поиск по постам…' : 'Search posts…'}" />
      </div>
      <div class="stack-list">
        ${posts.length ? posts.map((post) => `
          <article class="tile" style="gap:8px">
            <div class="inline-stack between">
              <div style="min-width:0">
                <strong>${escapeHtml(post.title || (isRu ? 'Пост без заголовка' : 'Untitled post'))}</strong>
                <span style="display:block;font-size:12px;color:var(--text-muted)">@${escapeHtml(post.author?.handle || '')} · ${formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              <button class="inline-button danger compact" data-action="admin-delete-post" data-id="${post.id}">${isRu ? 'Удалить' : 'Delete'}</button>
            </div>
            <p style="margin:0;font-size:13px;color:var(--text-soft)">${escapeHtml((post.excerpt || post.body || '').slice(0, 220))}</p>
          </article>`).join('') : `<p class="muted">${isRu ? 'Посты не найдены.' : 'No posts found.'}</p>`}
      </div>
    </div>
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
function renderAdminTelemetry() {
  const isRu = currentLang() === 'ru';
  const telemetry = state.adminTelemetry;
  if (!telemetry) return renderLoading();
  const summary = telemetry.summary || {};
  const topRoutes = telemetry.topRoutes || [];
  const topErrors = telemetry.topErrors || [];
  const vitals = telemetry.vitals || {};
  return `<section class="settings-panel"><h2>${isRu ? 'Телеметрия' : 'Telemetry'}</h2>
    <p class="muted">${isRu ? 'Анонимная self-hosted телеметрия по pageview, ошибкам и web vitals.' : 'Anonymous self-hosted telemetry for pageviews, client errors, and web vitals.'}</p>
    <div class="admin-stats-grid">
      <div class="admin-stat"><strong>${summary.totalEvents || 0}</strong><span>${isRu ? 'Событий' : 'Events'}</span></div>
      <div class="admin-stat"><strong>${summary.pageviews || 0}</strong><span>${isRu ? 'Pageviews' : 'Pageviews'}</span></div>
      <div class="admin-stat"><strong>${summary.errors || 0}</strong><span>${isRu ? 'JS ошибок' : 'JS errors'}</span></div>
      <div class="admin-stat"><strong>${summary.sessions || 0}</strong><span>${isRu ? 'Сессий' : 'Sessions'}</span></div>
    </div>
    <div class="settings-block">
      <h3>${isRu ? 'Web Vitals' : 'Web Vitals'}</h3>
      <div class="admin-stats-grid">
        ${Object.entries(vitals).map(([name, item]) => `
          <div class="admin-stat">
            <strong>${escapeHtml(name)}</strong>
            <span>p75 ${item?.p75 || 0} · p95 ${item?.p95 || 0}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="admin-two-col">
      <div class="settings-block">
        <h3>${isRu ? 'Топ маршрутов' : 'Top routes'}</h3>
        <div class="stack-list">
          ${topRoutes.length ? topRoutes.map(([route, count]) => `<div class="tile admin-inline-list"><strong>${escapeHtml(route || '/')}</strong><span>${count}</span></div>`).join('') : `<p class="muted">${isRu ? 'Нет данных.' : 'No data yet.'}</p>`}
        </div>
      </div>
      <div class="settings-block">
        <h3>${isRu ? 'Топ ошибок' : 'Top errors'}</h3>
        <div class="stack-list">
          ${topErrors.length ? topErrors.map(([message, count]) => `<div class="tile admin-inline-list"><strong>${escapeHtml(message)}</strong><span>${count}</span></div>`).join('') : `<p class="muted">${isRu ? 'Нет данных.' : 'No data yet.'}</p>`}
        </div>
      </div>
    </div>
  </section>`;
}
function renderAdminPlatform() {
  const isRu = currentLang() === 'ru';
  const reviewCount = (state.adminSiteReviewQueue || []).length;
  const deletionCount = (state.adminDeletionJobs || []).length;
  const reportCount = (state.adminReports || []).filter((item) => item.status === 'open').length;
  return `<section class="settings-panel"><h2>${isRu ? 'Контроль платформы' : 'Platform control'}</h2>
    <div class="admin-stats-grid">
      <div class="admin-stat"><strong>${reviewCount}</strong><span>${isRu ? 'Сайтов на ревью' : 'Sites in review'}</span></div>
      <div class="admin-stat"><strong>${deletionCount}</strong><span>${isRu ? 'Удалений в очереди' : 'Queued deletions'}</span></div>
      <div class="admin-stat"><strong>${reportCount}</strong><span>${isRu ? 'Открытых жалоб' : 'Open reports'}</span></div>
      <div class="admin-stat"><strong>${(state.adminAds || []).filter((item) => item.active !== false).length}</strong><span>${isRu ? 'Активных ads' : 'Active ads'}</span></div>
    </div>
    <div class="settings-block">
      <h3>${isRu ? 'Maintenance mode' : 'Maintenance mode'}</h3>
      <p class="muted">${isRu ? 'Теперь переключается прямо owner-сессией без ручного ввода токена в UI.' : 'This now toggles from the owner session directly instead of asking for an env token in the UI.'}</p>
      <div class="detail-actions">
        <button class="soft-button ${state.maintenance ? 'danger' : ''}" data-action="toggle-maintenance">
          ${icons.wrench}<span>${state.maintenance ? (isRu ? 'Выключить maintenance' : 'Disable maintenance') : (isRu ? 'Включить maintenance' : 'Enable maintenance')}</span>
        </button>
        <button class="soft-button" data-action="admin-refresh">${icons.refresh}<span>${isRu ? 'Обновить данные' : 'Refresh data'}</span></button>
      </div>
      ${state.maintenance ? `<div class="inline-alert inline-alert-warning" style="margin-top:10px">${iconBadge('alert', 'warning')}<div class="inline-alert-copy"><strong>${isRu ? 'Maintenance активно' : 'Maintenance is active'}</strong><span>${isRu ? 'Большая часть API сейчас закрыта до отключения режима.' : 'Most API requests are restricted until you disable this mode.'}</span></div></div>` : ''}
    </div>
  </section>`;
}
function renderAdminLogs() {
  const isRu = currentLang() === 'ru';
  return `<section class="settings-panel"><h2>${isRu ? 'Аудит-логи' : 'Audit logs'}</h2>
    <p class="muted">${isRu ? 'Логи действий админов и владельца над аккаунтами и объектами платформы.' : 'Audit logs record admin and owner actions taken on accounts and platform objects.'}</p>
    <div class="stack-list">
      ${(state.adminLogs || []).length ? (state.adminLogs || []).map(log => `
        <div class="tile" style="gap:6px">
          <div class="inline-stack between">
            <strong style="font-size:.88rem">${escapeHtml(log.action || '')}</strong>
            <span style="font-size:11px;color:var(--text-muted)">${formatDate(log.createdAt)}</span>
          </div>
          <span style="font-size:12px;color:var(--text-muted)">by @${escapeHtml(log.actorHandle || '')} → @${escapeHtml(log.targetHandle || '')}</span>
        </div>`).join('')
      : `<p class="muted" style="margin:0">${isRu ? 'Логов пока нет.' : 'No audit logs yet.'}</p>`}
    </div>
    <div class="settings-block" style="margin-top:16px">
      <h3>${isRu ? 'Действия' : 'Actions'}</h3>
      <div class="detail-actions">
        <button class="soft-button" data-action="admin-refresh">${icons.refresh}<span>${isRu ? 'Обновить админ-данные' : 'Refresh admin data'}</span></button>
        <button class="soft-button" data-action="export-data">${icons.archive}<span>${isRu ? 'Экспорт моих данных' : 'Export my account data'}</span></button>
      </div>
    </div>
  </section>`;
}

async function routeLoad() {
  const routeSnapshot = { ...state.route };
  const loadSeq = ++state.routeLoadSeq;
  state.loading = true;
  if (routeSnapshot.name === 'settings') {
    const params = new URLSearchParams(location.search || '');
    state.settingsTab = normalizeSettingsTab(params.get('tab') || state.settingsTab || loadRememberedSettingsTab());
    persistRememberedSettingsTab(state.settingsTab);
  }
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
    if (routeSnapshot.name === 'site-studio' && canUseAccountAreas) postBootstrapTasks.push(loadSitesMine(), loadSiteStudio(routeSnapshot.siteId));
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
    hidePublicShell();
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
          ${navLink('/', 'home', t('home'), undefined, icons.home)}
          ${navLink('/feed', 'feed', t('feed'), undefined, icons.feed)}
          ${showAccountNav ? navLink('/messages', 'messages', t('messages'), undefined, icons.message) : ''}
          ${navLink('/discover', 'discover', t('discover'), undefined, icons.search)}
          ${showAccountNav ? navLink('/sites', 'sites', t('sites'), undefined, icons.site) : ''}
          ${showAccountNav ? navLink('/mail', 'mail', t('mail') || 'Mail', state.mail.unread, icons.mail) : ''}
          ${isOperatorSession() ? navLink('/admin', 'admin', 'Admin', undefined, icons.shield) : ''}
        </nav>
        <div class="top-actions">
          <button class="icon-button ghost-button" data-action="open-search" title="${t('discover')}">${icons.search}</button>
          ${canCreate ? `<button class="primary-button" data-action="open-modal" data-modal="quick-post"><span>${icons.plus}</span><span>${t('quickPost')}</span></button>` : `<button class="primary-button" data-action="open-modal" data-modal="auth">${user ? 'Create account' : t('signIn')}</button>`}
          <button class="account-chip" data-action="toggle-drawer" title="${t('accountCenter')}">
            ${user ? avatar(user, 'sm', '', { link: false }) : `<span class="avatar avatar-sm"><strong>?</strong></span>`}
            <span class="account-copy">
              <strong>${escapeHtml(user?.displayName || 'justbreath')}</strong>
              <span>${escapeHtml(user?.handle ? `@${user.handle}` : t('accountCenter'))}</span>
            </span>
          </button>
        </div>
      </div>
    </header>`;
}
function navLink(path, name, label, unreadOverride, icon = '') {
  const active = state.route.name === name;
  const chatUnread = name === 'messages' ? Object.values(state.chat.unread || {}).reduce((a, b) => a + b, 0) : 0;
  const mailUnread = name === 'mail' ? (state.mail?.unread || 0) : 0;
  const unread = unreadOverride !== undefined ? unreadOverride : (chatUnread || mailUnread);
  const badge = unread > 0 ? `<span class="nav-badge">${unread > 99 ? '99+' : unread}</span>` : '';
  return `<a href="${path}" class="nav-link ${active ? 'active' : ''}" data-action="nav" data-path="${path}">${icon ? `<span class="nav-link-icon" aria-hidden="true">${icon}</span>` : ''}<span>${label}</span>${badge}</a>`;
}

function renderHome() {
  const home = state.home || { recentProjects: [], featuredSites: [], openRooms: [], stats: {} };
  const isGuest = !currentUser() || currentUser()?.roleInternal === 'guest';
  return `
    <section class="hero-card section-shell">
      <div class="hero-copy">
        <span class="eyebrow">justbreath.life</span>
        <h1>${t('homeHeadline') || 'Create your public creator page, collaborate with your team, and chat with your audience in one place.'}</h1>
        <p>${t('homeLead')}</p>
        <div class="hero-actions">
          ${!currentUser() ? `
            <button class="primary-button" data-action="open-modal" data-modal="auth">${icons.user || ''}<span>Create free account</span></button>
            <button class="soft-button" data-action="guest-login">${icons.eye || ''}<span>Try as guest</span></button>
            <a class="ghost-button" ${navAttrs('/discover')}>${t('discover')}</a>
          ` : `
            <a class="primary-button" ${navAttrs('/discover')}>${icons.search}<span>${t('discover')}</span></a>
            <a class="soft-button" ${navAttrs('/messages')}>${icons.message}<span>${t('openMessages')}</span></a>
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
    links.github && { ...buildSocialLink(links.github, 'github'), icon: icons.githubBrand },
    links.discord && { label: links.discord, href: null, icon: icons.message },
    links.telegram && { ...buildSocialLink(links.telegram, 'telegram'), icon: icons.plane },
    links.steam && { ...buildSocialLink(links.steam, 'steam'), icon: icons.steam },
    links.spotify && { ...buildSocialLink(links.spotify, 'spotify'), icon: icons.spotify },
    links.epicGames && { ...buildSocialLink(links.epicGames, 'epicGames'), icon: icons.epicGames },
    links.youtube && { ...buildSocialLink(links.youtube, 'youtube'), icon: icons.youtube },
    links.instagram && { ...buildSocialLink(links.instagram, 'instagram'), icon: icons.instagram },
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
function renderProjectCard(project) {
  const reportButton = canReportOwner(project.owner)
    ? `<button class="icon-button compact" data-action="report-target" data-target-type="project" data-target-id="${project.id}" data-target-label="${escapeHtml(`Project: ${project.title}`)}" data-target-url="/project/${escapeHtml(project.slug)}" title="${currentLang() === 'ru' ? 'Пожаловаться' : 'Report'}">${icons.alert}</button>`
    : '';
  return `<article class="tile tile-project">
    <div class="tile-top between"><div><span class="kicker">${escapeHtml(project.category || 'project')}</span><a class="text-link strong" ${navAttrs(`/project/${project.slug}`)}>${escapeHtml(project.title)}</a></div><div class="inline-stack">${reportButton}${project.owner ? avatar(project.owner, 'sm') : ''}</div></div>
    <p>${escapeHtml(project.summary || '')}</p>
    <div class="tag-row">${(project.tags || []).slice(0, 4).map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join('')}</div>
  </article>`;
}
function renderSiteCard(site) {
  const reportButton = canReportOwner(site.owner)
    ? `<button class="soft-button compact" data-action="report-target" data-target-type="site" data-target-id="${site.id}" data-target-label="${escapeHtml(`Site: ${site.title}`)}" data-target-url="${escapeHtml(site.path)}">${icons.alert}<span>${currentLang() === 'ru' ? 'Пожаловаться' : 'Report'}</span></button>`
    : '';
  return `<article class="tile tile-site">
    <div class="tile-top between"><div class="site-title-row">${renderSiteIcon(site)}<div><span class="kicker">${site.mode === 'upload' ? 'custom' : 'template'}</span><a class="text-link strong" href="${site.path}">${escapeHtml(site.title)}</a></div></div>${site.owner ? avatar(site.owner, 'sm') : ''}</div>
    <p>${escapeHtml(site.summary || '')}</p>
    ${site.mode === 'upload' ? renderSiteImportDigest(site) : ''}
    <div class="tile-actions"><a class="inline-button" href="${site.path}">${icons.external}<span>${t('openSite')}</span></a>${reportButton}</div>
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
  if (Number(state.sites?.studio?.site?.id || 0) === id) {
    const nextStudioSite = updater(state.sites.studio.site);
    if (nextStudioSite) state.sites.studio.site = nextStudioSite;
  }
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
  if (Number(state.sites?.studio?.site?.id || 0) === id) return state.sites.studio.site;
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
      <li>${isRu ? 'Archive package: полноценный импорт статического сайта с несколькими страницами, локальными папками <code>css/</code>, <code>js/</code>, <code>img/</code>, <code>fonts/</code> и файлами для скачивания.' : 'Archive package: full static-site import with multiple pages, local <code>css/</code>, <code>js/</code>, <code>img/</code>, <code>fonts/</code> folders and downloadable files.'}</li>
      <li>${isRu ? 'Архив может быть <code>.zip</code>, <code>.tar</code>, <code>.tar.gz</code>, <code>.tgz</code> или <code>.7z</code>. Для обычных пользователей лимит архива сейчас <code>5 MB</code>; если внутри несколько <code>index.html</code>, приоритет у корневого файла.' : 'Archive packages can be <code>.zip</code>, <code>.tar</code>, <code>.tar.gz</code>, <code>.tgz</code> or <code>.7z</code>. Regular-user archive limit is now <code>5 MB</code>; if multiple <code>index.html</code> files exist, the root one wins.'}</li>
      <li>${isRu ? 'Если внутри есть backend/API-код, сайт всё равно импортируется как статика: интерфейс и дизайн сохраняются, а конфликтующие server-side функции только предупреждаются и не исполняются.' : 'If the archive contains backend/API code, the site is still imported as static: the UI and design are preserved, while conflicting server-side features are only warned about and never executed.'}</li>
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
  const importReport = info.importReport || site?.importReport || {};
  const optimizedAssets = importReport.optimizedAssets || [];
  const compatibilityWarnings = info.compatibilityWarnings || [];
  return `<div class="site-upload-diagnostics">
    <div class="site-upload-diagnostic-card">
      <strong>${modeLabel}</strong>
      <span>${isRu ? `Точка входа: ${info.entryFile || 'index.html'}` : `Entry file: ${info.entryFile || 'index.html'}`}</span>
      <small>${info.variant === 'archive'
        ? (isRu ? 'Архив хранится как полноценный static bundle. Дизайн и структура сайта отдаются как есть, а server-side части только предупреждаются и не исполняются.' : 'Archive uploads are stored as a full static bundle. The site design and structure are served as-is, while server-side parts are only flagged and never executed.')
        : (isRu ? 'Этот режим подходит только для одного HTML-файла без локальных ассетов.' : 'This mode only works for one HTML file without local bundled assets.')}</small>
    </div>
    ${(info.files || []).length ? `<div class="site-upload-diagnostic-card">
      <strong>${isRu ? 'Файлы пакета' : 'Package files'}</strong>
      <div class="site-upload-file-list">${shownFiles.map((file) => `<code>${escapeHtml(file)}</code>`).join('')}</div>
      ${remaining ? `<small>${isRu ? `И ещё ${remaining} файлов` : `${remaining} more files`}</small>` : ''}
    </div>` : ''}
    ${Number(importReport.scannedImageCount || 0) ? `<div class="site-upload-diagnostic-card warning">
      <strong>${isRu ? 'Оптимизация изображений' : 'Image optimization'}</strong>
      <small>${optimizedAssets.length
        ? (isRu
            ? `Во время импорта сервер автоматически сжал ${optimizedAssets.length} изображений для хранения и сэкономил ${formatByteSize(importReport.optimizedBytesSaved || 0)}.`
            : `During import the server compressed ${optimizedAssets.length} image files for storage and saved ${formatByteSize(importReport.optimizedBytesSaved || 0)}.`)
        : (isRu
            ? 'Изображения были проверены на оптимизацию. Сжатие применяется только когда новый файл реально меньше исходного.'
            : 'Images were scanned for optimization. Compression is applied only when the new file is actually smaller than the original.')}</small>
      ${optimizedAssets.length ? `<div class="site-upload-file-list">${optimizedAssets.slice(0, 10).map((item) => `<code>${escapeHtml(item.path)} · ${formatByteSize(item.beforeBytes)} → ${formatByteSize(item.afterBytes)}</code>`).join('')}</div>` : ''}
    </div>` : ''}
    ${(info.missingRefs || []).length ? `<div class="site-upload-diagnostic-card warning">
      <strong>${isRu ? 'Битые локальные ссылки' : 'Broken local references'}</strong>
      <small>${isRu ? 'Эти пути встречаются в HTML, но сейчас не доступны. Именно они вызывают ошибки MIME и отсутствие стилей/скриптов.' : 'These paths are referenced by the HTML but are not currently available. They cause the MIME errors and missing styles/scripts.'}</small>
      <div class="site-upload-file-list">${info.missingRefs.slice(0, 12).map((file) => `<code>${escapeHtml(file)}</code>`).join('')}</div>
    </div>` : ''}
    ${compatibilityWarnings.map((warning) => `<div class="site-upload-diagnostic-card warning">
      <strong>${escapeHtml(warning.title || (isRu ? 'Предупреждение совместимости' : 'Compatibility warning'))}</strong>
      <small>${escapeHtml(warning.message || '')}</small>
      ${(warning.paths || []).length ? `<div class="site-upload-file-list">${warning.paths.slice(0, 12).map((file) => `<code>${escapeHtml(file)}</code>`).join('')}</div>` : ''}
    </div>`).join('')}
  </div>`;
}
function renderPostCard(post) {
  const attachment = post.attachment && post.attachment.url ? (post.attachment.type === 'image' ? `<img class="post-media clickable-img" src="${post.attachment.url}" data-action="open-lightbox" data-src="${post.attachment.url}" data-alt="${escapeHtml(post.attachment.name || 'image')}" alt="${escapeHtml(post.attachment.name || 'image')}" />` : `<a class="attachment-chip" href="${post.attachment.url}" target="_blank" rel="noreferrer">${icons.file}<span>${escapeHtml(post.attachment.name)}</span></a>`) : '';
  const sticker = post.sticker ? `<img class="sticker-inline" src="${post.sticker.previewUrl || post.sticker.dataUrl}" alt="${escapeHtml(post.sticker.name)}" />` : '';
  const reportButton = canReportOwner(post.author)
    ? `<button class="icon-button compact" data-action="report-target" data-target-type="post" data-target-id="${post.id}" data-target-label="${escapeHtml(post.title ? `Post: ${post.title}` : `Post by @${post.author?.handle || ''}`)}" data-target-url="${escapeHtml(`/@${post.author?.handleCanonical || post.author?.handle || ''}`)}" title="${currentLang() === 'ru' ? 'Пожаловаться' : 'Report'}">${icons.alert}</button>`
    : '';
  return `<article class="post-card">
    <header class="post-head">
      <div class="inline-stack">
        ${avatar(post.author, 'sm')}
        <div>
          <a class="text-link strong" ${profileAttrs(post.author)}>${escapeHtml(post.author?.displayName || '')}</a>
          <span>@${escapeHtml(post.author?.handle || '')} · ${formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
      </div>
      <div class="inline-stack">${post.kind === 'devlog' ? '<span class="surface-pill surface-work">DEVLOG</span>' : ''}${reportButton}<button class="icon-button compact" data-action="open-modal" data-modal="post-info" data-post-id="${post.id}" title="Post info">${icons.info}</button>${post.ownedBySession ? `<button class="icon-button compact" data-action="edit-post" data-id="${post.id}" title="${t('update')}">${icons.settings}</button>` : ''}</div>
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
    ${list.length ? list.map((comment) => `<div class="comment-row">${avatar(comment.author, 'xs')}<div class="comment-body"><div class="comment-head"><a class="text-link strong" ${profileAttrs(comment.author)}>${escapeHtml(comment.author?.displayName || '')}</a><span class="comment-meta">@${escapeHtml(comment.author?.handle || '')} · ${formatDate(comment.createdAt)}</span></div><div class="post-body">${renderMarkdown(comment.body || '')}</div>${comment.sticker ? `<img class="sticker-inline" src="${comment.sticker.previewUrl || comment.sticker.dataUrl}" alt="${escapeHtml(comment.sticker.name)}" />` : ''}</div></div>`).join('') : '<p class="comment-empty">Be the first to reply.</p>'}
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
  const reportProfileButton = !isSelf && canReportOwner(user)
    ? `<button class="soft-button" data-action="report-target" data-target-type="user" data-target-id="${user.id}" data-target-label="${escapeHtml(`Profile @${user.handleCanonical || user.handle || ''}`)}" data-target-url="${escapeHtml(`/@${user.handleCanonical || user.handle || ''}`)}">${icons.alert}<span>${currentLang() === 'ru' ? 'Пожаловаться' : 'Report'}</span></button>`
    : '';
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
          ${isSelf ? `<a class="soft-button" ${navAttrs('/settings')}>${icons.settings}<span>${t('settings')}</span></a><button class="primary-button" data-action="open-modal" data-modal="project">${icons.plus}<span>${t('createProject')}</span></button>` : `<button class="soft-button" data-action="start-chat" data-handle="${user.handleCanonical}" data-surface="personal">${icons.message}<span>${t('message')}</span></button><button class="soft-button" data-action="friend-request" data-handle="${user.handleCanonical}">${icons.people}<span>${t('addFriend')}</span></button><button class="soft-button" data-action="toggle-follow" data-handle="${user.handleCanonical}">${icons.star}<span>${user.relation?.following ? t('unfollow') : t('follow')}</span></button>${reportProfileButton}`}
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
      <div class="chat-row-copy"><a class="text-link strong" ${profileAttrs(user)}>${escapeHtml(user.displayName)}</a><span>@${escapeHtml(user.handle)}</span></div>
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
  const canPost = roomAllowsPosting(room);
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
  if (!canPost) {
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

function roomAllowsPosting(room) {
  if (!room) return false;
  if (typeof room.canPost === 'boolean') return room.canPost;
  return room.kind === 'direct' || Boolean(room.joined);
}

function renderRoomComposer(room) {
  if (!room) return '';
  const canPost = roomAllowsPosting(room);
  if (!canPost) {
    if (room.kind !== 'direct' && room.joined && room.permissions?.posting === 'admins' && !roomNeedsUpgrade(room)) {
      return renderReadOnlyChannelComposer(room);
    }
    return '';
  }
  return `<form class="chat-composer" data-form="send-message">
      <div class="voice-recording-panel" data-voice-recording-panel ${state.chat.recording ? '' : 'hidden'}>
        <div class="voice-recording-led" aria-hidden="true"></div>
        <div class="voice-recording-copy">
          <strong>${t('recordingNow') || 'Recording now'}</strong>
          <span>${t('recordingHint') || 'Microphone is live. Tap again to finish.'}</span>
        </div>
        <div class="voice-recording-time" data-role="recording-time">${formatMediaDuration(0)}</div>
      </div>
      ${state.chat.attachment ? `<div class="composer-preview">
        ${state.chat.attachment.type === 'audio'
          ? renderVoicePlayer(state.chat.attachment, { key: 'composer-preview', compact: true, title: t('voicePreview') || 'Voice preview', label: state.chat.attachment.name || (t('voiceDraft') || 'Voice draft'), kind: state.chat.attachment.voice ? 'voice' : 'audio' })
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
  const directProfileLink = room?.kind === 'direct' && room?.otherUser ? profileAttrs(room.otherUser) : '';
  const roomHeaderIdentity = room?.kind === 'direct' && directProfileLink
    ? `<a class="chat-room-identity" ${directProfileLink}>${roomAvatar(room, 'sm')}<div><strong>${escapeHtml(room.title)}</strong><span>${escapeHtml(room.description || '')}</span></div></a>`
    : `${roomAvatar(room, 'sm')}<div><strong>${escapeHtml(room.title)}</strong><span>${escapeHtml(room.description || '')}</span></div>`;
  return `
    <header class="chat-room-head">
      <div class="inline-stack">${window.matchMedia('(max-width: 900px)').matches ? `<button class="icon-button compact" data-action="chat-back">${icons.chevronLeft}</button>` : ''}${roomHeaderIdentity}</div>
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

function renderVoicePlayer(attachment, options = {}) {
  if (!attachment?.url) return '';
  const key = options.key || attachment.url;
  const duration = Number(attachment.duration || 0);
  const playback = state.voicePlayback || {};
  const active = playback.key === key && playback.url === attachment.url;
  const playing = active && playback.playing;
  const currentTime = active ? Number(playback.currentTime || 0) : 0;
  const total = active ? Number(playback.duration || duration || 0) : duration;
  const progress = total > 0 ? Math.max(0, Math.min(1, currentTime / total)) : 0;
  const bars = voiceBars(String(key || attachment.name || 'voice'));
  const speeds = [1, 1.5, 2];
  const kind = options.kind || (attachment.voice ? 'voice' : 'audio');
  const title = options.title || voicePlaybackLabel(kind);
  const label = options.label || attachment.name || voicePlaybackLabel(kind);
  return `<div class="voice-player ${options.compact ? 'compact' : ''} ${playing ? 'is-playing' : ''}" data-voice-player data-voice-key="${escapeHtml(String(key))}" data-voice-url="${escapeHtml(attachment.url)}" data-voice-duration="${total}">
    <div class="voice-player-top">
      <span class="voice-player-kind">${title}</span>
      <div class="voice-player-speeds">
        ${speeds.map((speed) => `<button type="button" class="voice-speed-btn ${Number(state.chat.voiceSpeed || 1) === speed ? 'active' : ''}" data-action="set-voice-speed" data-speed="${speed}">${speed}x</button>`).join('')}
      </div>
    </div>
    <div class="voice-player-main">
      <button type="button" class="voice-play-btn" data-role="voice-play" data-action="toggle-voice-play" data-voice-key="${escapeHtml(String(key))}" data-voice-url="${escapeHtml(attachment.url)}" data-voice-duration="${total}" data-voice-title="${escapeHtml(title)}" data-voice-label="${escapeHtml(label)}" data-voice-kind="${escapeHtml(kind)}">
        ${playing ? icons.pause : icons.play}
      </button>
      <button type="button" class="voice-wave" data-action="seek-voice" data-voice-key="${escapeHtml(String(key))}">
        ${bars.map((height, index) => `<span class="voice-wave-bar ${index / bars.length <= progress ? 'active' : ''}" data-voice-bar="${index}" style="height:${height}%"></span>`).join('')}
      </button>
      <div class="voice-meta">
        <strong>${escapeHtml(label)}</strong>
        <span><span data-role="voice-current">${formatMediaDuration(currentTime || 0)}</span> / <span data-role="voice-total">${formatMediaDuration(total || 0)}</span></span>
      </div>
    </div>
  </div>`;
}

function renderGlobalAudioPlayer() {
  const playback = state.voicePlayback || {};
  if (!playback.url) return '<section class="audio-hub" data-global-audio-player hidden></section>';
  const progress = Math.round(getVoicePlaybackProgress(playback) * 1000);
  return `<section class="audio-hub ${playback.playing ? 'is-playing' : ''}" data-global-audio-player>
    <div class="audio-hub-copy">
      <span class="audio-hub-kicker" data-role="audio-hub-title">${escapeHtml(playback.title || voicePlaybackLabel(playback.kind))}</span>
      <strong data-role="audio-hub-label">${escapeHtml(playback.label || voicePlaybackLabel(playback.kind))}</strong>
      <span class="audio-hub-hint">${t('audioContinueHint') || 'Keeps playing while you switch chats or screens.'}</span>
    </div>
    <div class="audio-hub-controls">
      <button type="button" class="audio-hub-play" data-role="audio-hub-play" data-action="toggle-voice-play" data-voice-key="${escapeHtml(String(playback.key || playback.url))}" data-voice-url="${escapeHtml(playback.url)}" data-voice-duration="${Number(playback.duration || 0)}" data-voice-title="${escapeHtml(playback.title || voicePlaybackLabel(playback.kind))}" data-voice-label="${escapeHtml(playback.label || voicePlaybackLabel(playback.kind))}" data-voice-kind="${escapeHtml(playback.kind || 'voice')}">
        ${playback.playing ? icons.pause : icons.play}
      </button>
      <div class="audio-hub-timeline">
        <input type="range" min="0" max="1000" value="${progress}" data-input="global-audio-progress" />
        <div class="audio-hub-meta"><span data-role="audio-hub-current">${formatMediaDuration(playback.currentTime || 0)}</span><span data-role="audio-hub-total">${formatMediaDuration(playback.duration || 0)}</span><span data-role="audio-hub-speed">${Number(playback.speed || 1)}x</span></div>
      </div>
    </div>
  </section>`;
}

function getMessageDeliveryStatus(room, message) {
  if (!room || room.kind !== 'direct' || !message) return null;
  if (!message.ownedBySession) {
    if (room.surface === 'work') {
      if (message.confirmedAt) return { key: 'confirmed', label: t('statusConfirmed'), icon: icons.statusConfirmed, passive: true };
      return { key: 'read', label: t('statusReadPendingConfirm'), icon: icons.statusRead, passive: true };
    }
    return { key: 'read', label: t('statusRead'), icon: icons.eye, passive: true };
  }
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
  if (status.passive) {
    return `<span class="message-status-btn ${status.key} passive" title="${escapeHtml(status.label)}" aria-label="${escapeHtml(status.label)}">${status.icon}</span>`;
  }
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
      ? renderVoicePlayer(message.attachment, {
          key: `message-${message.id}`,
          compact: true,
          title: 'Voice',
          label: message.author?.displayName || message.attachment.name || 'Voice message'
        })
      : message.attachment.type === 'video'
        ? `<video class="message-image clickable-img" src="${message.attachment.url}" playsinline muted preload="metadata" data-action="open-lightbox" data-src="${message.attachment.url}" data-media-type="video" data-alt="${escapeHtml(message.attachment.name || 'video')}"></video>`
        : `<img class="message-image clickable-img" src="${message.attachment.url}" alt="${escapeHtml(message.attachment.name || 'image')}" data-action="open-lightbox" data-src="${message.attachment.url}" data-media-type="${escapeHtml(message.attachment.type || 'image')}" data-alt="${escapeHtml(message.attachment.name || 'image')}" />`;
  }
  const sticker = message.sticker ? `<img class="message-sticker" src="${message.sticker.previewUrl || message.sticker.dataUrl}" alt="${escapeHtml(message.sticker.name)}" />` : '';
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
    ${!own && canReportOwner(message.author) ? `<button class="msg-action-btn" data-action="report-target" data-target-type="message" data-target-id="${message.id}" data-target-label="${escapeHtml(`Message in ${room?.title || 'chat'}`)}" data-target-url="${escapeHtml(room?.slug ? `/messages/${room.slug}` : '/messages')}" title="${currentLang() === 'ru' ? 'Пожаловаться' : 'Report'}">${icons.alert}</button>` : ''}
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
          <div class="message-meta-main">
            <a class="text-link strong" ${profileAttrs(message.author)}>${escapeHtml(message.author?.displayName || '')}</a>
            <span title="${message.createdAt}">${formatDate(message.createdAt, 'time')}</span>
            ${editTag}
          </div>
          ${statusControl ? `<div class="message-meta-status">${statusControl}</div>` : ''}
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
            <img src="${s.previewUrl || s.dataUrl}" alt="${escapeHtml(s.name)}" />
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
        return `<button type="button" class="pack-tab-icon ${String(state.chat.mediaPackId) === String(p.id) ? 'active' : ''}" data-action="pick-media-pack" data-pack-id="${p.id}" title="${escapeHtml(p.title)}">${first ? `<img src="${first.previewUrl || first.dataUrl}" alt="" />` : icons.sticker}</button>`;
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
        ${renderVoicePlayer(a, {
          key: `room-${m.id}`,
          compact: true,
          title: 'Voice',
          label: m.author?.displayName || a.name || 'Voice message'
        })}
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
      <div><span class="eyebrow">sites</span><h1>${t('sites')}</h1><p class="muted">Upload a static HTML site, import a full archive as raw static hosting, or open Studio to edit internal files. Backend-dependent code is flagged during import and stays disabled.</p></div>
      <div class="page-tools"><button class="soft-button" data-action="open-modal" data-modal="site-template">${icons.plus}<span>${t('templateSite')}</span></button><button class="primary-button" data-action="open-modal" data-modal="site-upload">${icons.upload}<span>${t('uploadSite')}</span></button></div>
    </section>
    <section class="section-shell">
      <div class="tile" style="gap:10px">
        <div class="inline-stack between">
          <div>
            <strong>${currentLang() === 'ru' ? 'Как правильно загружать сайт' : 'How to upload a site correctly'}</strong>
            <span style="display:block;font-size:13px;color:var(--text-muted)">${currentLang() === 'ru' ? 'Короткий путь: template для простых страниц, single HTML для одного файла, archive для полноценной статики с assets/' : 'Short version: use template for simple pages, single HTML for one-file sites, and archive for full static builds with assets/.'}</span>
          </div>
          <div class="tile-actions">
            <a class="soft-button compact" ${navAttrs('/developers/sites')}>${icons.help}<span>${currentLang() === 'ru' ? 'Гайд внутри сайта' : 'Guide in app'}</span></a>
            <a class="inline-button compact" href="${SITE_CREATION_GUIDE_URL}" target="_blank" rel="noopener">${icons.external}<span>${currentLang() === 'ru' ? 'Полная документация' : 'Full docs'}</span></a>
            <a class="soft-button compact" href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">${icons.archive}<span>${currentLang() === 'ru' ? 'Репозиторий' : 'Repository'}</span></a>
          </div>
        </div>
      </div>
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
    <div class="tile-top between"><div class="site-title-row">${renderSiteIcon(site)}<div><span class="kicker">${site.mode} · ${reviewLabel}</span><a class="text-link strong" href="${site.path}">${escapeHtml(site.title)}</a></div></div><div class="row-actions">${canEditSite ? `<button class="icon-button compact" data-action="open-site-studio" data-id="${site.id}" title="Open Studio">${icons.wrench}</button><button class="icon-button compact" data-action="open-edit-site" data-id="${site.id}" title="${t('update')}">${icons.edit}</button>` : ''}<button class="icon-button compact" data-action="copy-site-link" data-path="${site.path}">${icons.share}</button><button class="icon-button compact" data-action="delete-site" data-id="${site.id}">${icons.trash}</button></div></div>
    <p>${escapeHtml(site.summary || '')}</p>
    ${site.mode === 'upload' ? renderSiteImportDigest(site, true) : ''}
    ${site.reviewNote ? `<p class="muted" style="margin:0;font-size:12px">${escapeHtml(site.reviewNote)}</p>` : ''}
    <div class="tile-actions">${canEditSite ? `<button class="inline-button" data-action="open-site-studio" data-id="${site.id}">${icons.wrench}<span>Studio</span></button><button class="inline-button" data-action="open-edit-site" data-id="${site.id}">${icons.edit}<span>${t('update')}</span></button>` : ''}${canSubmitReview ? `<button class="inline-button" data-action="submit-site-review" data-id="${site.id}">${icons.check}<span>Submit review</span></button>` : ''}<a class="inline-button" href="${site.path}">${icons.external}<span>${t('launch')}</span></a></div>
  </article>`;
}

function renderSiteStudioDesignForm(site, studio) {
  const config = site?.templateConfig || {};
  const discussionPath = studio?.staticRules?.discussionPath || site?.discussionPath || '';
  const discussionLabel = studio?.staticRules?.discussionLabel || (currentLang() === 'ru' ? 'Обсуждение на justbreath' : 'Discussion on justbreath');
  if (site?.mode === 'upload') {
    return `<form class="settings-form site-studio-design-form" data-form="site-studio-design" data-site-id="${site.id}">
      <div class="site-studio-rule-card">
        <strong>${currentLang() === 'ru' ? 'Raw static import' : 'Raw static import'}</strong>
        <span>${currentLang() === 'ru'
          ? 'Сайт отдаётся как есть: HTML, CSS, JS и assets живут в архиве и не оборачиваются платформой. Если в коде есть backend/API-логика, она сохраняется только как статический код и не исполняется.'
          : 'The site is served as-is: HTML, CSS, JS and assets live in the archive and are not wrapped by the platform. If the code contains backend/API logic, it is preserved only as static code and never executed.'}</span>
        ${discussionPath ? `<a class="inline-button" href="${discussionPath}">${icons.comment}<span>${escapeHtml(discussionLabel)}</span></a>` : ''}
      </div>
      <div class="settings-grid-two">
        <label><span>${t('title')}</span><input name="title" value="${escapeHtml(site.title || '')}" /></label>
        <label><span>${t('summary')}</span><input name="summary" value="${escapeHtml(site.summary || '')}" /></label>
        <label><span>Visibility</span><select name="visibility"><option value="public" ${site.visibility === 'public' ? 'selected' : ''}>${t('public')}</option><option value="unlisted" ${site.visibility === 'unlisted' ? 'selected' : ''}>Unlisted</option><option value="private" ${site.visibility === 'private' ? 'selected' : ''}>${t('private')}</option></select></label>
      </div>
      <p class="site-editor-note">${currentLang() === 'ru'
        ? 'Для визуальных и функциональных изменений правь реальные файлы сайта справа или перезагружай архив. Локальные изображения могут быть автоматически сжаты для хранения, если это уменьшает размер файла.'
        : 'For visual and functional changes, edit the real site files on the right or re-upload the archive. Local images may be compressed automatically for storage when that produces a smaller file.'}</p>
      <button class="primary-button" type="submit" ${studio?.saving ? 'disabled' : ''}>${icons.wrench}<span>${studio?.saving ? (currentLang() === 'ru' ? 'Сохраняю…' : 'Saving…') : (currentLang() === 'ru' ? 'Сохранить настройки' : 'Save settings')}</span></button>
    </form>`;
  }
  return `<form class="settings-form site-studio-design-form" data-form="site-studio-design" data-site-id="${site.id}">
    <div class="site-studio-rule-card">
      <strong>${currentLang() === 'ru' ? 'Статический режим' : 'Static-only rule'}</strong>
      <span>${currentLang() === 'ru'
        ? 'Не добавляй внутрь сайта логин, регистрацию, paywall-комментарии и отдельную базу пользователей. Всё это живёт на основном justbreath.'
        : 'Do not add login, signup, comment auth or a separate user system inside the site. That lives on main justbreath only.'}</span>
      ${discussionPath ? `<a class="inline-button" href="${discussionPath}">${icons.comment}<span>${escapeHtml(discussionLabel)}</span></a>` : ''}
    </div>
    <div class="settings-grid-two">
      <label><span>${t('title')}</span><input name="title" value="${escapeHtml(site.title || '')}" /></label>
      <label><span>${t('summary')}</span><input name="summary" value="${escapeHtml(site.summary || '')}" /></label>
      <label><span>Brand name</span><input name="brandName" value="${escapeHtml(config.brandName || '')}" /></label>
      <label><span>Tagline</span><input name="tagline" value="${escapeHtml(config.tagline || '')}" /></label>
      <label><span>Logo URL</span><input name="logoUrl" value="${escapeHtml(config.logoUrl || '')}" placeholder="/assets/logo.svg" /></label>
      <label><span>Favicon URL</span><input name="faviconUrl" value="${escapeHtml(config.faviconUrl || '')}" placeholder="/assets/favicon.svg" /></label>
      <label><span>Accent</span><input name="accent" type="color" value="${escapeHtml(config.accent || '#7c3aed')}" /></label>
      <label><span>Background</span><input name="bg" type="color" value="${escapeHtml(config.bg || '#05070d')}" /></label>
      <label><span>Surface</span><input name="surface" type="color" value="${escapeHtml(config.surface || '#101827')}" /></label>
      <label><span>Text</span><input name="text" type="color" value="${escapeHtml(config.text || '#f7f8fb')}" /></label>
      <label><span>Muted text</span><input name="muted" type="color" value="${escapeHtml(config.muted || '#a7afc1')}" /></label>
      <label><span>Font</span><select name="font"><option value="system" ${(!config.font || config.font === 'system') ? 'selected' : ''}>System sans</option><option value="serif" ${config.font === 'serif' ? 'selected' : ''}>Serif</option><option value="mono" ${config.font === 'mono' ? 'selected' : ''}>Mono</option><option value="rounded" ${config.font === 'rounded' ? 'selected' : ''}>Rounded</option></select></label>
      <label><span>Corner style</span><select name="radiusStyle"><option value="soft" ${(!config.radiusStyle || config.radiusStyle === 'soft') ? 'selected' : ''}>Soft</option><option value="round" ${config.radiusStyle === 'round' ? 'selected' : ''}>Round</option><option value="sharp" ${config.radiusStyle === 'sharp' ? 'selected' : ''}>Sharp</option></select></label>
      <label><span>Content width</span><select name="maxWidth"><option value="narrow" ${config.maxWidth === 'narrow' ? 'selected' : ''}>Narrow</option><option value="normal" ${(!config.maxWidth || config.maxWidth === 'normal') ? 'selected' : ''}>Normal</option><option value="wide" ${config.maxWidth === 'wide' ? 'selected' : ''}>Wide</option><option value="full" ${config.maxWidth === 'full' ? 'selected' : ''}>Full</option></select></label>
      <label><span>CTA label</span><input name="ctaLabel" value="${escapeHtml(config.ctaLabel || '')}" placeholder="Open profile / Buy / Book" /></label>
      <label><span>CTA URL</span><input name="ctaHref" value="${escapeHtml(config.ctaHref || '')}" placeholder="${discussionPath || '/@handle'}" /></label>
      <label><span>Support email</span><input name="supportEmail" value="${escapeHtml(config.supportEmail || '')}" placeholder="hello@brand.com" /></label>
      <label><span>Visibility</span><select name="visibility"><option value="public" ${site.visibility === 'public' ? 'selected' : ''}>${t('public')}</option><option value="unlisted" ${site.visibility === 'unlisted' ? 'selected' : ''}>Unlisted</option><option value="private" ${site.visibility === 'private' ? 'selected' : ''}>${t('private')}</option></select></label>
    </div>
    <label><span>Custom CSS</span><textarea name="customCss" rows="8" spellcheck="false" class="site-studio-code-block">${escapeHtml(config.customCss || '')}</textarea></label>
    <button class="primary-button" type="submit" ${studio?.saving ? 'disabled' : ''}>${icons.sparkles || icons.settings}<span>${studio?.saving ? (currentLang() === 'ru' ? 'Сохраняю…' : 'Saving…') : (currentLang() === 'ru' ? 'Сохранить дизайн' : 'Save design')}</span></button>
  </form>`;
}

function renderSiteStudioPage() {
  if (!currentUser() || isGuestSession()) return renderGate('Create an account to open site studio.');
  const studio = state.sites.studio || createEmptySiteStudioState(state.route.siteId);
  const site = studio.site || (state.sites.mine || []).find((item) => Number(item.id) === Number(state.route.siteId)) || null;
  if (studio.loading && !site) {
    return `<section class="section-shell"><div class="modal-empty"><div class="spinner-dot"></div><span>Loading site studio…</span></div></section>`;
  }
  if (!site) {
    return `<section class="section-shell">${renderEmpty(studio.error || 'Site studio is not available for this item yet.')}</section>`;
  }
  const discussionPath = studio.staticRules?.discussionPath || site.discussionPath || '';
  const discussionLabel = studio.staticRules?.discussionLabel || (site.project ? 'Project discussion on justbreath' : 'Profile discussion on justbreath');
  const fileCount = Array.isArray(studio.files) ? studio.files.length : 0;
  return `
    <section class="section-shell site-studio-hero">
      <div>
        <span class="eyebrow">site studio</span>
        <h1>${escapeHtml(site.title)}</h1>
        <p class="muted">${currentLang() === 'ru'
          ? (site.mode === 'upload'
              ? 'Редактируй реальные файлы импортированного статического сайта и смотри предупреждения совместимости в одном рабочем экране.'
              : 'Редактируй внутренние файлы статического сайта, иконки, цвета, фон и CSS в одном рабочем экране.')
          : (site.mode === 'upload'
              ? 'Edit the real files of your imported static site and review compatibility warnings in one workspace.'
              : 'Edit internal files, icons, color system, background and CSS for your static site in one workspace.')}</p>
      </div>
      <div class="site-studio-hero-actions">
        <a class="soft-button" ${navAttrs('/sites')}>${icons.arrowLeft}<span>${currentLang() === 'ru' ? 'К списку сайтов' : 'Back to sites'}</span></a>
        <button class="soft-button" data-action="open-edit-site" data-id="${site.id}">${icons.edit}<span>${t('update')}</span></button>
        <button class="soft-button" data-action="copy-site-link" data-path="${site.path}">${icons.share}<span>${t('copyLink')}</span></button>
        <a class="primary-button" href="${site.path}">${icons.external}<span>${t('launch')}</span></a>
      </div>
    </section>
    <section class="section-shell">
      <div class="site-studio-banner">
        <div class="site-studio-banner-copy">
          <strong>${currentLang() === 'ru' ? 'Без встроенной аутентификации' : 'No auth inside the site'}</strong>
          <span>${currentLang() === 'ru'
            ? 'Сайт остаётся статическим. Логин, регистрация и комментарии живут на основном justbreath под профилем и проектом автора.'
            : 'This site stays static. Login, signup and comments live on main justbreath under the creator profile or project.'}</span>
        </div>
        ${discussionPath ? `<a class="inline-button" href="${discussionPath}">${icons.comment}<span>${escapeHtml(discussionLabel)}</span></a>` : ''}
      </div>
    </section>
    <section class="section-shell site-studio-grid">
      <aside class="site-studio-pane site-studio-files">
        <div class="section-heading"><h2>${currentLang() === 'ru' ? 'Файлы' : 'Files'}</h2><span class="muted">${fileCount ? `${fileCount} ${currentLang() === 'ru' ? 'шт.' : 'files'}` : (currentLang() === 'ru' ? 'Пока пусто' : 'No files yet')}</span></div>
        ${studio.studioEnabled ? `<div class="site-studio-file-list">
          ${studio.files.map((file) => `<button class="site-studio-file ${studio.activePath === file.path ? 'active' : ''} ${!file.editable ? 'disabled' : ''}" type="button" data-action="${file.editable ? 'open-site-file' : 'noop'}" data-path="${file.path}">
            <strong>${escapeHtml(file.path)}</strong>
            <span>${escapeHtml(file.kind)}${!file.editable ? ` · ${currentLang() === 'ru' ? 'только preview' : 'preview only'}` : ''}</span>
          </button>`).join('')}
        </div>
        <form class="settings-form site-studio-create-form" data-form="site-studio-new-file" data-site-id="${site.id}">
          <label><span>${currentLang() === 'ru' ? 'Новый файл' : 'New file path'}</span><input name="path" placeholder="assets/site.css" /></label>
          <label><span>${currentLang() === 'ru' ? 'Стартовый код' : 'Starter content'}</span><textarea name="content" rows="6" spellcheck="false" class="site-studio-code-block" placeholder="body {\\n  background: #05070d;\\n}"></textarea></label>
          <button class="soft-button" type="submit">${icons.plus}<span>${currentLang() === 'ru' ? 'Создать файл' : 'Create file'}</span></button>
          <p class="site-editor-note">${currentLang() === 'ru'
            ? 'Если сайт был загружен одним HTML, первый новый файл автоматически переведёт его в archive/bundle режим.'
            : 'If this site started as a single HTML file, the first extra file will automatically move it into archive/bundle mode.'}</p>
        </form>` : `<div class="site-studio-empty">
          <strong>${currentLang() === 'ru' ? 'Template mode' : 'Template mode'}</strong>
          <span>${currentLang() === 'ru'
            ? 'Для внутреннего файлового дерева нужен uploaded static site или archive bundle. Пока здесь доступны только визуальные настройки справа.'
            : 'Internal file editing needs an uploaded static site or archive bundle. For now, use the visual controls on the right.'}</span>
        </div>`}
      </aside>
      <section class="site-studio-pane site-studio-editor">
        <div class="site-studio-editor-head">
          <div><strong>${escapeHtml(studio.activePath || 'index.html')}</strong><span>${studio.dirty ? (currentLang() === 'ru' ? 'Есть несохранённые правки' : 'Unsaved changes') : (currentLang() === 'ru' ? 'Текстовый редактор статического сайта' : 'Static site text editor')}</span></div>
          ${studio.studioEnabled && studio.activePath ? `<button class="inline-button" type="button" data-action="reload-site-file" data-id="${site.id}" data-path="${studio.activePath}">${icons.refresh || icons.chevronRight}<span>${currentLang() === 'ru' ? 'Перезагрузить файл' : 'Reload file'}</span></button>` : ''}
        </div>
        ${studio.error ? `<div class="site-studio-inline-error">${escapeHtml(studio.error)}</div>` : ''}
        ${!studio.studioEnabled ? `<div class="site-studio-empty">
          <strong>${currentLang() === 'ru' ? 'Кодинг включается для static upload' : 'Coding is for static uploads'}</strong>
          <span>${currentLang() === 'ru'
            ? 'Загрузи HTML/архив как статический сайт, если хочешь править файлы внутри Studio.'
            : 'Upload HTML/archive as a static site if you want internal file editing in Studio.'}</span>
        </div>` : studio.fileLoading ? `<div class="modal-empty"><div class="spinner-dot"></div><span>${currentLang() === 'ru' ? 'Открываю файл…' : 'Opening file…'}</span></div>` : studio.activePath ? `<form class="site-studio-editor-form" data-form="site-studio-file" data-site-id="${site.id}" data-path="${studio.activePath}">
          <textarea name="content" class="site-studio-editor-textarea" data-site-studio-editor="true" spellcheck="false">${escapeHtml(studio.content || '')}</textarea>
          <div class="site-studio-editor-actions">
            <span class="muted">${currentLang() === 'ru'
              ? 'Поддерживаются HTML, CSS, JS, JSON, SVG, markdown, XML и обычный текст.'
              : 'HTML, CSS, JS, JSON, SVG, markdown, XML and plain text are supported here.'}</span>
            <button class="primary-button" type="submit" ${studio.saving ? 'disabled' : ''}>${icons.wrench}<span>${studio.saving ? (currentLang() === 'ru' ? 'Сохраняю…' : 'Saving…') : (currentLang() === 'ru' ? 'Сохранить файл' : 'Save file')}</span></button>
          </div>
        </form>` : `<div class="site-studio-empty"><strong>${currentLang() === 'ru' ? 'Выбери файл слева' : 'Choose a file on the left'}</strong><span>${currentLang() === 'ru' ? 'Начни с index.html или создай assets/site.css.' : 'Start with index.html or create assets/site.css.'}</span></div>`}
      </section>
      <aside class="site-studio-pane site-studio-inspector">
        <div class="section-heading"><h2>${currentLang() === 'ru' ? 'Правила и настройки' : 'Rules & settings'}</h2><span class="muted">${site.mode === 'upload'
          ? (currentLang() === 'ru' ? 'Raw import, предупреждения совместимости и базовые настройки' : 'Raw import, compatibility warnings and basic settings')
          : (currentLang() === 'ru' ? 'Быстрый polish поверх статики' : 'Quick polish on top of static files')}</span></div>
        ${site.mode === 'upload' ? renderSiteImportDigest(site, true) : ''}
        ${renderSiteStudioDesignForm(site, studio)}
      </aside>
    </section>`;
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
    <a class="soft-button compact" ${navAttrs('/verify')}>${t('verifyNow')||'Verify now'}</a>
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
    ${renderChatThemeLivePreview(theme)}
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
      ${renderChatThemeLivePreview(theme)}
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
  const hasPassword = Boolean(user?.security?.hasPassword);
  const oauth = state.meta?.oauthProviders || {};
  const googleLinked = Boolean(user?.googleConnected);
  const discordLinked = Boolean(user?.discordConnected);
  const isRu = currentLang() === 'ru';
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
    <div class="security-block">
      <h3>${isRu ? 'Локальный пароль justbreath' : 'Local justbreath password'}</h3>
      <p style="font-size:13px;color:var(--text-muted);margin:0">
        ${hasPassword
          ? (isRu ? 'Пароль уже установлен. Он используется для смены email и удаления аккаунта.' : 'A local password is already set. It is used for email changes and account deletion.')
          : (isRu ? 'Пароль ещё не задан. Если ты входишь через Discord, Google или email-код, сначала создай локальный пароль justbreath. Здесь не используется пароль провайдера.' : 'No local password is set yet. If you sign in with Discord, Google, or email code, create a local justbreath password first. Provider passwords are not used here.')}
      </p>
    </div>
    <div class="security-block"><h3>Credentials</h3>
      <div class="detail-actions">
        <button class="soft-button" data-action="open-change-password">${icons.key}<span>${hasPassword ? (isRu ? 'Сменить пароль' : 'Change password') : (isRu ? 'Задать пароль' : 'Set password')}</span></button>
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
  const operator = isOperatorSession();
  const isRu = currentLang() === 'ru';
  const maxFree = state.meta?.maxSitesFree ?? 3;
  const currentLabel = operator
    ? (isRu ? 'Доступ оператора' : 'Operator access')
    : (current ? planLabel(current) : 'Free');
  const summary = operator
    ? (isRu ? 'Для внутренних админов нет лимита по количеству сайтов, а архивы можно грузить до 512 MB.' : 'Internal operators have no site-count cap, and archive uploads go up to 512 MB.')
    : (isRu ? `Включено ${maxFree} сайт${maxFree === 1 ? '' : maxFree < 5 ? 'а' : 'ов'}` : `${maxFree} site space${maxFree === 1 ? '' : 's'} included`);
  return `<section class="settings-panel identity-billing">
    <div class="settings-panel-head"><h2>${t('billing')}</h2></div>
    <div class="billing-simple">
      <div class="billing-simple-row">
        <div>
          <strong>${isRu ? 'Ваш план' : 'Your plan'}</strong>
          <p class="muted">${escapeHtml(currentLabel)} · ${escapeHtml(summary)}</p>
        </div>
        <button class="primary-button" data-action="open-modal" data-modal="plans">${current ? (isRu ? 'Сменить план' : 'Change plan') : (isRu ? 'Посмотреть планы' : 'See plans')}</button>
      </div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">${operator
        ? (isRu ? 'Тариф всё ещё можно назначать пользователям из админки.' : 'You can still assign plans to users from the admin panel.')
        : (isRu ? 'Планы открывают больше сайтов и приоритетную модерацию. Отменить можно в любой момент.' : 'Plans unlock more site spaces and priority review. You can cancel anytime.')}</p>
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
    ${renderChangelogPanel()}
  </section>`;
}
function renderChangelogPanel() {
  const isRu = currentLang() === 'ru';
  return `<div class="settings-block changelog-block">
    <div class="section-heading"><h3>${isRu ? 'Changelog' : 'Changelog'}</h3><span class="muted">${isRu ? 'Крупные изменения платформы' : 'Major platform updates'}</span></div>
    <div class="stack-list">
      ${SITE_CHANGELOG_ENTRIES.map((entry) => `
        <article class="tile" style="gap:8px">
          <div class="inline-stack between">
            <strong>${escapeHtml(localeLabel(entry.title))}</strong>
            <span class="muted" style="font-size:12px">${escapeHtml(entry.date)}</span>
          </div>
          <p style="margin:0;font-size:13px;color:var(--text-soft)">${escapeHtml(localeLabel(entry.body))}</p>
        </article>`).join('')}
    </div>
  </div>`;
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
  const hasPassword = Boolean(state.me?.user?.security?.hasPassword);
  const isRu = currentLang() === 'ru';
  const deleteBlock = hasPassword
    ? `<form data-form="delete-account" class="settings-form danger-form">
        <p>${t('accountDeleted')}</p>
        <p class="muted" style="font-size:12px;margin:-6px 0 0">${isRu ? 'Для удаления нужен локальный пароль justbreath, а не пароль Discord/Google.' : 'Account deletion uses your local justbreath password, not your Discord/Google password.'}</p>
        <label><span>${t('confirmDelete')}</span><input name="confirm" placeholder="DELETE" /></label>
        <label><span>Password</span><input type="password" name="password" /></label>
        <button class="soft-button danger" type="submit">${icons.trash}<span>${t('deleteAccount')}</span></button>
      </form>`
    : `<div class="settings-block danger-form">
        <p>${t('accountDeleted')}</p>
        <p class="muted" style="font-size:13px;margin:0">${isRu ? 'Сначала задай локальный пароль justbreath в разделе Security. Удаление аккаунта не использует пароль Discord/Google.' : 'Set a local justbreath password in Security first. Account deletion does not use your Discord/Google password.'}</p>
        <div class="detail-actions" style="margin-top:12px">
          <button class="soft-button" data-action="open-change-password">${icons.key}<span>${isRu ? 'Задать пароль' : 'Set password'}</span></button>
        </div>
      </div>`;
  return `<section class="settings-panel danger-zone"><h2>${t('dataAndBackups')}</h2>
    <div class="settings-actions-row"><button class="soft-button" data-action="export-data">${icons.file}<span>${t('exportData')}</span></button><button class="soft-button" data-action="create-backup">${icons.archive}<span>${t('createBackup')}</span></button></div>
    ${deleteBlock}</section>`;
}

function renderDrawer() {
  const user = currentUser();
  const guest = isGuestSession();
  const hasSwitchable = Array.isArray(state.savedAccounts) && state.savedAccounts.length > 0;
  const isRu = currentLang() === 'ru';
  const switchLabel = localeLabel({
    en: hasSwitchable ? 'Switch account' : 'Connect account',
    ru: hasSwitchable ? 'Сменить аккаунт' : 'Подключить аккаунт',
    uk: hasSwitchable ? 'Змінити акаунт' : 'Підключити акаунт',
    pt: hasSwitchable ? 'Trocar conta' : 'Conectar conta',
    pl: hasSwitchable ? 'Przełącz konto' : 'Połącz konto',
    fr: hasSwitchable ? 'Changer de compte' : 'Connecter un compte'
  });
  const switchHint = localeLabel({
    en: hasSwitchable ? 'Move between saved sessions' : 'Add another saved session',
    ru: hasSwitchable ? 'Быстрое переключение между сохранёнными сессиями' : 'Добавь ещё одну сохранённую сессию',
    uk: hasSwitchable ? 'Швидке перемикання між збереженими сесіями' : 'Додай ще одну збережену сесію',
    pt: hasSwitchable ? 'Troque entre sessões salvas' : 'Adicione outra sessão salva',
    pl: hasSwitchable ? 'Przełączaj zapisane sesje' : 'Dodaj kolejną zapisaną sesję',
    fr: hasSwitchable ? 'Passe entre les sessions enregistrées' : 'Ajoutez une autre session enregistrée'
  });
  const linksLabel = localeLabel({ en: 'Links', ru: 'Ссылки', uk: 'Посилання', pt: 'Links', pl: 'Linki', fr: 'Liens' });
  const notificationsEmpty = localeLabel({ en: 'No notifications', ru: 'Нет уведомлений', uk: 'Немає сповіщень', pt: 'Sem notificações', pl: 'Brak powiadomień', fr: 'Aucune notification' });
  return `<aside class="drawer ${state.drawerOpen ? 'open' : ''}">
    <div class="drawer-backdrop" data-action="toggle-drawer"></div>
    <div class="drawer-panel" role="dialog" aria-label="${t('accountCenter')}">
      <button class="drawer-close icon-button compact" data-action="toggle-drawer" aria-label="Close">${icons.close}</button>
      ${user ? `
        <div class="drawer-hero">
          <div class="drawer-hero-banner" style="${user.bannerUrl ? `background-image:url('${escapeHtml(user.bannerUrl)}')` : ''}">
            <button class="drawer-switch-chip" data-action="open-modal" data-modal="switch-account" title="${switchLabel}">
              <span class="drawer-switch-chip-icon">${icons.user}</span>
              <span class="drawer-switch-chip-copy">
                <strong>${switchLabel}</strong>
                <em>${switchHint}</em>
              </span>
              <span class="drawer-switch-chip-arrow">${icons.chevronRight}</span>
            </button>
          </div>
          <a class="drawer-hero-identity" ${profileAttrs(user)}>
            ${avatar(user, 'lg', '', { link: false })}
            <div class="drawer-hero-meta">
              <strong>${escapeHtml(user.displayName)}</strong>
              <span>@${escapeHtml(user.handle)}</span>
              <div class="badge-row">${badgePills(user)}</div>
            </div>
          </a>
        </div>
        <div class="drawer-actions">
          <a class="drawer-link" ${profileAttrs(user)}>${icons.user}<span>${t('profile')}</span></a>
          ${guest
            ? `<button class="drawer-link" data-action="open-modal" data-modal="auth">${icons.user}<span>Create account</span></button>`
            : `<a class="drawer-link" ${navAttrs('/messages')}>${icons.message}<span>${t('messages')}</span></a>
               <a class="drawer-link" ${navAttrs('/mail')}>${icons.mail}<span>${t('mail') || 'Mail'}</span></a>
               <a class="drawer-link" ${navAttrs('/settings')}>${icons.settings}<span>${t('settings')}</span></a>
               <a class="drawer-link" ${navAttrs('/sites')}>${icons.site}<span>${t('sites')}</span></a>
               ${isOperatorSession() ? `<a class="drawer-link" ${navAttrs('/admin')}>${icons.shield}<span>Admin</span></a>` : ''}`}
        </div>
        <div class="drawer-section">
          <div class="section-heading">
            <h3>${t('notifications')}</h3>
            ${(state.me?.notifications || []).some(n => !n.readAt) ? `<button class="inline-button compact" data-action="read-all-notifications">Mark all read</button>` : ''}
          </div>
          ${(state.me?.notifications || []).slice(0, 5).map((note) => `
            <button class="drawer-note" data-action="read-notification" data-id="${note.id}" ${note.href ? `data-href="${escapeHtml(note.href)}"` : ''}>
              <strong>${escapeHtml(note.title)}</strong><span>${escapeHtml(note.body)}</span>
            </button>`).join('') || `<p class="muted">${notificationsEmpty}</p>`}
        </div>
        <div class="drawer-section compact-settings">
          <div class="drawer-settings-card">
            <span class="drawer-settings-label">${t('theme')}</span>
            <div class="segment-row mini drawer-settings-segments">
              ${['dark','light','system'].map((mode) => `<button class="segment-button ${currentThemePref() === mode ? 'active' : ''}" data-action="quick-theme" data-value="${mode}">${t(mode)||mode}</button>`).join('')}
            </div>
          </div>
          <div class="drawer-settings-card">
            <span class="drawer-settings-label">${t('status')}</span>
            <div class="segment-row mini drawer-settings-segments">
              ${['active','away','dnd'].map(s => `<button class="segment-button ${(currentUser()?.status||'active')===s?'active':''}" data-action="set-status" data-value="${s}" style="font-size:11px">${renderStatusPill(s, true)}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="drawer-section">
          <div class="section-heading">
            <h3>${linksLabel}</h3>
          </div>
          <a class="drawer-link" href="${GITHUB_PROFILE_URL}" target="_blank" rel="noopener">${icons.link}<span>GitHub</span></a>
          <a class="drawer-link" href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">${icons.archive}<span>${isRu ? 'Репозиторий сайта' : 'Site repository'}</span></a>
          <a class="drawer-link" href="${SITE_CREATION_GUIDE_URL}" target="_blank" rel="noopener">${icons.external}<span>${isRu ? 'Гайд по сайту' : 'Site guide'}</span></a>
          <a class="drawer-link" href="${CONTACT_EMAIL_HREF}">${icons.mail}<span>${CONTACT_EMAIL}</span></a>
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
function renderChangePasswordModal() {
  const user = state.me?.user || currentUser();
  const hasPassword = Boolean(user?.security?.hasPassword);
  const isRu = currentLang() === 'ru';
  return `<div class="modal-head"><span class="eyebrow">security</span><h2>${hasPassword ? (isRu ? 'Сменить пароль' : 'Change password') : (isRu ? 'Задать пароль' : 'Set password')}</h2></div>
    <form class="settings-form" data-form="change-password">
      <p class="muted" style="margin:0 0 10px;font-size:13px">
        ${hasPassword
          ? (isRu ? 'Используется локальный пароль justbreath.' : 'This uses your local justbreath password.')
          : (isRu ? 'Создай локальный пароль justbreath. Пароль Discord/Google здесь не используется.' : 'Create a local justbreath password. Your Discord/Google password is not used here.')}
      </p>
      ${hasPassword ? `<label><span>${isRu ? 'Текущий пароль' : 'Current password'}</span><input type="password" name="currentPassword" autocomplete="current-password" /></label>` : ''}
      <label><span>${isRu ? 'Новый пароль' : 'New password'}</span><input type="password" name="newPassword" autocomplete="new-password" minlength="8" /></label>
      <label><span>${isRu ? 'Повтори пароль' : 'Repeat password'}</span><input type="password" name="confirmPassword" autocomplete="new-password" minlength="8" /></label>
      <div class="modal-actions">
        <button class="soft-button" type="button" data-action="close-modal">${isRu ? 'Отмена' : 'Cancel'}</button>
        <button class="primary-button" type="submit">${icons.key}<span>${hasPassword ? (isRu ? 'Сохранить пароль' : 'Save password') : (isRu ? 'Создать пароль' : 'Create password')}</span></button>
      </div>
    </form>`;
}
function renderChangeEmailModal() {
  const user = state.me?.user || currentUser();
  const hasPassword = Boolean(user?.security?.hasPassword);
  const isRu = currentLang() === 'ru';
  if (!hasPassword) {
    return `<div class="modal-head"><span class="eyebrow">security</span><h2>${isRu ? 'Сменить email' : 'Change email'}</h2></div>
      <div class="modal-inner">
        <p class="muted" style="margin:0;font-size:13px">${isRu ? 'Сначала задай локальный пароль justbreath. Для смены email не подходит пароль Discord/Google.' : 'Set a local justbreath password first. Discord/Google passwords cannot be used for email changes.'}</p>
        <div class="modal-actions">
          <button class="soft-button" data-action="open-change-password">${icons.key}<span>${isRu ? 'Задать пароль' : 'Set password'}</span></button>
          <button class="primary-button" data-action="close-modal">${isRu ? 'Закрыть' : 'Close'}</button>
        </div>
      </div>`;
  }
  return `<div class="modal-head"><span class="eyebrow">security</span><h2>${isRu ? 'Сменить email' : 'Change email'}</h2></div>
    <form class="settings-form" data-form="change-email">
      <label><span>${isRu ? 'Новый email' : 'New email'}</span><input name="email" type="email" autocomplete="email" value="${escapeHtml(user?.email || '')}" /></label>
      <label><span>${isRu ? 'Пароль justbreath' : 'justbreath password'}</span><input type="password" name="password" autocomplete="current-password" /></label>
      <p class="muted" style="margin:0;font-size:12px">${isRu ? 'После смены email потребуется повторная верификация.' : 'Changing your email will require re-verification.'}</p>
      <div class="modal-actions">
        <button class="soft-button" type="button" data-action="close-modal">${isRu ? 'Отмена' : 'Cancel'}</button>
        <button class="primary-button" type="submit">${icons.mail}<span>${isRu ? 'Сохранить email' : 'Save email'}</span></button>
      </div>
    </form>`;
}
function renderChangeHandleModal() {
  const user = state.me?.user || currentUser();
  const isRu = currentLang() === 'ru';
  return `<div class="modal-head"><span class="eyebrow">profile</span><h2>${isRu ? 'Сменить handle' : 'Change handle'}</h2></div>
    <form class="settings-form" data-form="change-handle">
      <label><span>${isRu ? 'Новый handle' : 'New handle'}</span><input name="handle" value="${escapeHtml(user?.handle || '')}" autocomplete="nickname" /></label>
      <p class="muted" style="margin:0;font-size:12px">${isRu ? 'Используй буквы, цифры, дефис или подчёркивание. Публичные ссылки обновятся после сохранения.' : 'Use letters, numbers, dashes, or underscores. Public profile links update after save.'}</p>
      <div class="modal-actions">
        <button class="soft-button" type="button" data-action="close-modal">${isRu ? 'Отмена' : 'Cancel'}</button>
        <button class="primary-button" type="submit">${icons.user}<span>${isRu ? 'Сохранить handle' : 'Save handle'}</span></button>
      </div>
    </form>`;
}
function renderReportContentModal(modal) {
  const isRu = currentLang() === 'ru';
  return `<div class="modal-head"><span class="eyebrow">moderation</span><h2>${isRu ? 'Пожаловаться' : 'Report content'}</h2></div>
    <form class="settings-form" data-form="report-content">
      <p class="muted" style="margin:0 0 8px;font-size:13px">${isRu ? 'Жалоба попадёт в админ-панель модерации.' : 'This report will be sent to the admin moderation queue.'}</p>
      <div class="settings-block" style="padding:12px">
        <strong>${escapeHtml(modal.targetLabel || (isRu ? 'Контент' : 'Content'))}</strong>
        ${modal.targetUrl ? `<span class="muted" style="display:block;font-size:12px;margin-top:4px">${escapeHtml(modal.targetUrl)}</span>` : ''}
      </div>
      <label><span>${isRu ? 'Причина' : 'Reason'}</span>
        <select name="reason">
          ${REPORT_REASON_OPTIONS.map((item) => `<option value="${item.id}" ${item.id === 'spam' ? 'selected' : ''}>${escapeHtml(localeLabel(item.label))}</option>`).join('')}
        </select>
      </label>
      <label><span>${isRu ? 'Детали' : 'Details'}</span><textarea name="details" rows="5" placeholder="${isRu ? 'Коротко опиши, что не так' : 'Briefly explain the issue'}"></textarea></label>
      <input type="hidden" name="targetType" value="${escapeHtml(modal.targetType || 'other')}" />
      <input type="hidden" name="targetId" value="${escapeHtml(String(modal.targetId ?? ''))}" />
      <div class="modal-actions">
        <button class="soft-button" type="button" data-action="close-modal">${isRu ? 'Отмена' : 'Cancel'}</button>
        <button class="primary-button" type="submit">${icons.alert}<span>${isRu ? 'Отправить жалобу' : 'Send report'}</span></button>
      </div>
    </form>`;
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
    case 'report-content': return renderReportContentModal(modal);
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
            <a class="people-row" ${profileAttrs(u)}>
              ${avatar(u, 'sm', '', { link: false })}
              <div class="people-copy"><strong>${escapeHtml(u.displayName || u.handle || '')}</strong><span>@${escapeHtml(u.handle || '')}</span></div>
            </a>`).join('')}</div>`;
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
  const uploadCaps = currentSiteUploadCaps();
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
        <button class="inline-button" type="button" data-action="open-site-studio" data-id="${site.id}">${icons.wrench}<span>Studio</span></button>
        <a class="inline-button" href="${site.path}">${icons.external}<span>${t('launch')}</span></a>
        <button class="inline-button" type="button" data-action="copy-site-link" data-path="${site.path}">${icons.share}<span>${t('copyLink')}</span></button>
        ${canSubmitReview ? `<button class="inline-button" type="button" data-action="submit-site-review" data-id="${site.id}">${icons.check}<span>Submit review</span></button>` : ''}
      </div>
    </div>
    ${isTemplate ? renderSiteReadiness(site, config) : ''}
    <form class="settings-form" data-form="edit-site" data-site-id="${site.id}">
      <fieldset class="settings-fieldset">
        <legend>Publishing</legend>
        <div class="settings-grid-two">
          <label><span>${t('title')}</span><input name="title" value="${escapeHtml(site.title || '')}" /></label>
          <label><span>Site path</span><input value="${escapeHtml(site.path || '')}" disabled /></label>
          <label><span>${t('visibility')}</span><select name="visibility"><option value="public" ${site.visibility === 'public' ? 'selected' : ''}>${t('public')}</option><option value="unlisted" ${site.visibility === 'unlisted' ? 'selected' : ''}>Unlisted</option><option value="private" ${site.visibility === 'private' ? 'selected' : ''}>${t('private')}</option></select></label>
          ${isTemplate ? `<label><span>Search indexing</span><select name="indexingMode"><option value="auto" ${(!config.indexingMode || config.indexingMode === 'auto') ? 'selected' : ''}>Automatic</option><option value="index" ${config.indexingMode === 'index' ? 'selected' : ''}>Force index</option><option value="noindex" ${config.indexingMode === 'noindex' ? 'selected' : ''}>Noindex</option></select></label>` : `<label><span>Import mode</span><input value="${currentLang() === 'ru' ? 'Raw static import' : 'Raw static import'}" disabled /></label>`}
          <label><span>Review status</span><input value="${reviewLabel}" disabled /></label>
          <label><span>Mode</span><input value="${uploadModeLabel}" disabled /></label>
        </div>
        <label><span>${t('summary')}</span><textarea name="summary" rows="3">${escapeHtml(site.summary || '')}</textarea></label>
        <p class="site-editor-note">${isTemplate
          ? 'Public sites look more legitimate when they have a favicon, description, contact details and legal links before review.'
          : (currentLang() === 'ru'
              ? 'Для uploaded imports важнее целостный архив, рабочие статические ссылки и понятные предупреждения совместимости, чем platform-level SEO поля.'
              : 'For uploaded imports, a complete archive, working static links and clear compatibility warnings matter more than platform-level SEO fields.')}</p>
      </fieldset>

      ${isTemplate ? `
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
          <label><span>Layout mode</span><input value="Template layout" disabled /></label>
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
      </fieldset>` : `
      <fieldset class="settings-fieldset">
        <legend>${currentLang() === 'ru' ? 'Raw import mode' : 'Raw import mode'}</legend>
        <p class="site-editor-note">${currentLang() === 'ru'
          ? 'Uploaded site теперь отдаётся как полноценная статика без platform-shell поверх дизайна. Меняй HTML/CSS/JS внутри архива или через Site Studio; server-side части только предупреждаются и не исполняются.'
          : 'Uploaded sites are now served as a full static import with no platform shell layered over the design. Edit the real HTML/CSS/JS in the archive or in Site Studio; server-side parts are only flagged and never executed.'}</p>
        <p class="site-editor-note">${currentLang() === 'ru'
          ? 'Локальные изображения могут быть автоматически сжаты для хранения, если сервер получает меньший файл без смены пути.'
          : 'Local images may be compressed automatically for storage when the server can store a smaller file without changing its path.'}</p>
      </fieldset>`}

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
        <label class="upload-field"><span>${uploadInfo?.variant === 'archive' ? `Replace archive package (${uploadCaps.archiveLabel}) (.zip, .tar, .tar.gz, .tgz, .7z)` : `Attach archive package (${uploadCaps.archiveLabel}) (.zip, .tar, .tar.gz, .tgz, .7z)`}</span><input type="file" name="archive" accept=".zip,.tar,.tgz,.tar.gz,.7z,application/zip,application/x-tar,application/gzip,application/x-gzip,application/x-7z-compressed" /></label>
        <p class="site-editor-note">${uploadInfo?.variant === 'archive'
          ? 'Re-upload an archive to update CSS, JS, images and extra HTML pages together. The editor below only changes the entry HTML file.'
          : 'If this site references local css/js/images or extra pages, switch it to an archive package so the platform keeps the whole site together.'}</p>
      </fieldset>
      <fieldset class="settings-fieldset">
        <legend>Uploaded HTML</legend>
        <label><span>HTML</span><textarea name="htmlContent" rows="18" spellcheck="false" style="font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)">${escapeHtml(htmlContent)}</textarea></label>
        <p class="site-editor-note">${currentLang() === 'ru'
          ? `Static HTML only. Limit: ${escapeHtml(uploadCaps.htmlLabel)}. Для archive-импорта дизайн больше не оборачивается платформой: правь исходный HTML здесь или в Studio.`
          : `Static HTML only. Limit: ${escapeHtml(uploadCaps.htmlLabel)}. Archive imports are no longer wrapped by the platform: edit the source HTML here or in Studio.`}</p>
      </fieldset>`}
      ${isTemplate ? `<fieldset class="settings-fieldset">
        <legend>Custom CSS</legend>
        <label><span>Extra CSS</span><textarea name="customCss" rows="8" spellcheck="false" style="font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)">${escapeHtml(config.customCss || '')}</textarea></label>
      </fieldset>` : ''}
      <div class="modal-actions">
        <button class="soft-button" type="button" data-action="close-modal">${t('close')}</button>
        <button class="primary-button" type="submit">${t('update')}</button>
      </div>
    </form>`;
}

function renderPlansModal() {
  const plans = state.meta?.subscriptions || [];
  const current = state.me?.user?.billing?.planId;
  const upgradeRoom = state.modal?.roomSlug
    ? (state.chat.bootstrap?.rooms || []).find((room) => room.slug === state.modal.roomSlug)
    : null;
  const upgradeLabel = upgradeRoom?.subscription?.requiredPlanLabel || planLabel(upgradeRoom?.subscription?.requiredPlanId);
  return `<div class="modal-inner modal-plans-inner">
    <h2 style="margin:0 0 6px">Choose a plan</h2>
    <p class="muted" style="margin:0 0 18px">Upgrade whenever you need more site spaces and priority review. Cancel anytime.</p>
    ${upgradeRoom ? `<div class="current-plan-banner">Unlock <strong>${escapeHtml(upgradeRoom.title)}</strong> with <strong>${escapeHtml(upgradeLabel)}</strong> or higher.</div>` : ''}
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
      By continuing you agree to our <a ${navAttrs('/terms')}>Terms</a> and <a ${navAttrs('/privacy')}>Privacy Policy</a>.
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
        <span>I have read and agree to the <a ${navAttrs('/terms')}>Terms of Service</a> and <a ${navAttrs('/privacy')}>Privacy Policy</a>. <strong>(required)</strong></span>
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
  const caps = currentSiteUploadCaps();
  const uploadState = state.modal?.siteUpload || null;
  const customSiteLabel = localeLabel({ en: 'custom site', ru: 'кастомный сайт', uk: 'кастомний сайт', pt: 'site customizado', pl: 'własna strona', fr: 'site personnalisé' });
  const beforeUploadLabel = localeLabel({ en: 'Before you upload', ru: 'Перед загрузкой', uk: 'Перед завантаженням', pt: 'Antes de enviar', pl: 'Przed wysłaniem', fr: 'Avant l’envoi' });
  const singleHtmlLabel = localeLabel({ en: 'Single HTML', ru: 'Один HTML', uk: 'Один HTML', pt: 'HTML único', pl: 'Pojedynczy HTML', fr: 'HTML unique' });
  const archivePackageLabel = localeLabel({ en: 'Archive package', ru: 'Архивный пакет', uk: 'Архівний пакет', pt: 'Pacote em arquivo', pl: 'Paczka archiwum', fr: 'Archive complète' });
  const agreeRulesLabel = localeLabel({
    en: 'I agree to the site rules above.',
    ru: 'Я согласен с правилами загрузки сайта выше.',
    uk: 'Я погоджуюсь із правилами завантаження сайту вище.',
    pt: 'Concordo com as regras de upload do site acima.',
    pl: 'Akceptuję powyższe zasady przesyłania strony.',
    fr: 'J’accepte les règles d’envoi du site ci-dessus.'
  });
  const rulesLead = caps.operator
    ? localeLabel({
        en: 'As an internal operator you can upload archives up to 512 MB through direct binary upload, and the server streams them into a temp file, but the security and content rules still apply.',
        ru: 'Как внутренний оператор ты можешь загружать архивы до 512 MB через прямую binary-загрузку, а сервер примет их потоково во временный файл, но правила по безопасности и контенту всё равно действуют.',
        uk: 'Як внутрішній оператор ти можеш завантажувати архіви до 512 MB через пряму binary-загрузку, а сервер приймає їх потоково у тимчасовий файл, але правила безпеки та контенту все одно діють.',
        pt: 'Como operador interno, você pode enviar arquivos de até 512 MB por upload binário direto; o servidor grava tudo em arquivo temporário, mas as regras de segurança e conteúdo continuam valendo.',
        pl: 'Jako operator wewnętrzny możesz wysyłać archiwa do 512 MB przez bezpośredni upload binarny; serwer zapisuje je strumieniowo do pliku tymczasowego, ale zasady bezpieczeństwa i treści nadal obowiązują.',
        fr: 'En tant qu’opérateur interne, vous pouvez envoyer des archives jusqu’à 512 MB via un upload binaire direct ; le serveur les écrit en flux dans un fichier temporaire, mais les règles de sécurité et de contenu restent valables.'
      })
    : '';
  return `<div class="modal-head"><span class="eyebrow">${customSiteLabel}</span><h2>${t('uploadSite')}</h2></div>
    ${renderSiteCreationGuide()}
    <div class="site-upload-rules">
      <strong>${beforeUploadLabel}</strong>
      <ul>
        <li>${localeLabel({ en: 'Either a single', ru: 'Либо один', uk: 'Або один', pt: 'Envie um', pl: 'Wyślij pojedynczy', fr: 'Envoyez soit un' })} <code>.html</code> ${localeLabel({ en: 'file', ru: 'файл', uk: 'файл', pt: 'arquivo', pl: 'plik', fr: 'fichier' })} (${escapeHtml(caps.htmlLabel)}) ${localeLabel({ en: 'or an archive package', ru: 'или архивный пакет', uk: 'або архівний пакет', pt: 'ou um pacote em arquivo', pl: 'albo pakiet archiwum', fr: 'ou une archive complète' })} (${escapeHtml(caps.archiveLabel)}) ${localeLabel({ en: 'such as', ru: 'вроде', uk: 'на кшталт', pt: 'como', pl: 'np.', fr: 'comme' })} <code>.zip</code>, <code>.tar</code>, <code>.tar.gz</code>, <code>.tgz</code> ${localeLabel({ en: 'or', ru: 'или', uk: 'або', pt: 'ou', pl: 'lub', fr: 'ou' })} <code>.7z</code> ${localeLabel({ en: 'with an', ru: 'с', uk: 'з', pt: 'com', pl: 'z', fr: 'avec' })} <code>index.html</code>.</li>
        <li>${localeLabel({ en: 'Archive packages are uploaded as raw binary and streamed to a temp file first, so large files do not expand into base64 before reaching the server.', ru: 'Архивные пакеты уходят как raw binary и сначала потоково пишутся во временный файл, поэтому большие файлы не раздуваются в base64 до попадания на сервер.', uk: 'Архівні пакети надсилаються як raw binary і спочатку потоково пишуться у тимчасовий файл, тому великі файли не роздуваються в base64 до потрапляння на сервер.', pt: 'Os pacotes em arquivo são enviados como binário bruto e primeiro gravados em arquivo temporário, então arquivos grandes não viram base64 antes de chegar ao servidor.', pl: 'Pakiety archiwów są wysyłane jako surowy binarny strumień i najpierw trafiają do pliku tymczasowego, więc duże pliki nie są zamieniane na base64 przed dotarciem do serwera.', fr: 'Les archives sont envoyées en binaire brut et écrites d’abord dans un fichier temporaire ; les gros fichiers ne passent donc pas en base64 avant d’atteindre le serveur.' })}</li>
        <li>${localeLabel({ en: 'Archive imports are served as full static bundles with their own HTML/CSS/JS/assets and downloadable files intact. The platform no longer wraps the imported design.', ru: 'Архивные импорты отдаются как полноценные статические бандлы со своим HTML/CSS/JS/assets и файлами для скачивания. Платформа больше не оборачивает импортированный дизайн.', uk: 'Архівні імпорти віддаються як повноцінні статичні бандли зі своїм HTML/CSS/JS/assets і файлами для завантаження. Платформа більше не обгортає імпортований дизайн.', pt: 'As importações de arquivo são servidas como bundles estáticos completos com HTML/CSS/JS/assets e downloads intactos. A plataforma não envolve mais o design importado.', pl: 'Importowane archiwa są serwowane jako pełne statyczne bundlery z własnym HTML/CSS/JS/assets i plikami do pobrania. Platforma nie owija już importowanego projektu.', fr: 'Les imports d’archives sont servis comme des bundles statiques complets avec leur HTML/CSS/JS/assets et fichiers téléchargeables. La plateforme n’enveloppe plus le design importé.' })}</li>
        <li>${localeLabel({ en: 'If server-side code, API handlers or dynamic forms are detected, the import still succeeds, but those backend-dependent features stay disabled and are reported back to you as compatibility warnings.', ru: 'Если обнаружатся server-side code, API-обработчики или динамические формы, импорт всё равно завершится, но такие backend-зависимые части останутся отключёнными и вернутся как предупреждения совместимости.', uk: 'Якщо виявляться server-side code, API-обробники або динамічні форми, імпорт все одно завершиться, але такі backend-залежні частини залишаться вимкненими і повернуться як попередження сумісності.', pt: 'Se forem detectados código server-side, handlers de API ou formulários dinâmicos, a importação ainda termina, mas esses recursos dependentes de backend ficam desativados e voltam como avisos de compatibilidade.', pl: 'Jeśli zostanie wykryty kod server-side, handlery API lub dynamiczne formularze, import nadal się powiedzie, ale takie funkcje zależne od backendu pozostaną wyłączone i wrócą jako ostrzeżenia zgodności.', fr: 'Si du code server-side, des handlers API ou des formulaires dynamiques sont détectés, l’import se termine quand même, mais ces fonctions dépendantes du backend restent désactivées et reviennent sous forme d’avertissements de compatibilité.' })}</li>
        <li>${localeLabel({ en: 'Local images may be compressed automatically for storage when the server can keep the same file path with a smaller output.', ru: 'Локальные изображения могут автоматически сжиматься для хранения, если сервер может сохранить тот же путь файла с меньшим размером.', uk: 'Локальні зображення можуть автоматично стискатися для зберігання, якщо сервер може зберегти той самий шлях файлу з меншим розміром.', pt: 'Imagens locais podem ser comprimidas automaticamente para armazenamento quando o servidor consegue manter o mesmo caminho com um arquivo menor.', pl: 'Lokalne obrazy mogą być automatycznie kompresowane przy zapisie, jeśli serwer może zachować tę samą ścieżkę pliku z mniejszym rozmiarem.', fr: 'Les images locales peuvent être compressées automatiquement si le serveur peut conserver le même chemin avec un fichier plus léger.' })}</li>
        <li>${localeLabel({ en: 'No malware, phishing, doxxing, sexual content involving minors, or content that infringes someone else\'s copyright.', ru: 'Нельзя malware, phishing, doxxing, sexual content с участием minors и контент, нарушающий чужие авторские права.', uk: 'Заборонені malware, phishing, doxxing, sexual content за участю minors і контент, що порушує чужі авторські права.', pt: 'Sem malware, phishing, doxxing, conteúdo sexual envolvendo menores ou conteúdo que infrinja direitos autorais de terceiros.', pl: 'Bez malware, phishingu, doxxingu, treści seksualnych z udziałem nieletnich oraz treści naruszających cudze prawa autorskie.', fr: 'Pas de malware, phishing, doxxing, contenu sexuel impliquant des mineurs ni contenu violant le droit d’auteur d’autrui.' })}</li>
        <li>${localeLabel({ en: 'Public sites may be reviewed before being listed. Unlisted / private stays out of the directory but is still subject to these rules.', ru: 'Публичные сайты могут проходить проверку перед публикацией в каталоге. Unlisted / private не попадают в каталог, но правила для них те же.', uk: 'Публічні сайти можуть проходити перевірку перед публікацією в каталозі. Unlisted / private не потрапляють у каталог, але правила для них ті самі.', pt: 'Sites públicos podem passar por revisão antes de entrarem no diretório. Unlisted / private ficam fora da vitrine, mas continuam sujeitos às mesmas regras.', pl: 'Publiczne strony mogą być sprawdzane przed pojawieniem się w katalogu. Unlisted / private nie trafiają do katalogu, ale nadal obowiązują je te same zasady.', fr: 'Les sites publics peuvent être revus avant d’être listés. Les sites unlisted / private restent hors du répertoire, mais les mêmes règles s’appliquent.' })}</li>
        <li>${localeLabel({ en: 'By uploading you confirm you own the content and agree to our terms. Violations can result in the site being removed and the account suspended.', ru: 'Загружая сайт, ты подтверждаешь, что владеешь контентом и согласен с нашими условиями. Нарушения могут привести к удалению сайта и блокировке аккаунта.', uk: 'Завантажуючи сайт, ти підтверджуєш, що володієш контентом і погоджуєшся з нашими умовами. Порушення можуть призвести до видалення сайту та блокування акаунта.', pt: 'Ao enviar, você confirma que possui o conteúdo e concorda com nossos termos. Violações podem levar à remoção do site e à suspensão da conta.', pl: 'Wysyłając stronę potwierdzasz, że posiadasz prawa do treści i akceptujesz nasze warunki. Naruszenia mogą skończyć się usunięciem strony i zawieszeniem konta.', fr: 'En envoyant ce site, vous confirmez posséder le contenu et accepter nos conditions. En cas de violation, le site peut être supprimé et le compte suspendu.' })}</li>
      </ul>
      ${rulesLead ? `<p class="site-editor-note" style="margin:10px 0 0">${escapeHtml(rulesLead)}</p>` : ''}
    </div>
    <form class="settings-form" data-form="create-site-upload">
      <label><span>${t('title')}</span><input name="title" required /></label>
      <div class="settings-grid-two">
        <label><span>${t('slug')}</span><input name="slug" /></label>
        <label><span>${t('visibility')}</span><select name="visibility"><option value="public">${t('public')}</option><option value="unlisted">Unlisted</option><option value="private">${t('private')}</option></select></label>
      </div>
      <label><span>${t('summary')}</span><textarea name="summary" rows="3"></textarea></label>
      <div class="segment-row">
        <button type="button" class="segment-button ${(state.siteUploadMode || 'html') === 'html' ? 'active' : ''}" data-action="site-upload-mode" data-mode="html">${singleHtmlLabel}</button>
        <button type="button" class="segment-button ${state.siteUploadMode === 'archive' ? 'active' : ''}" data-action="site-upload-mode" data-mode="archive">${archivePackageLabel}</button>
      </div>
      ${state.siteUploadMode === 'archive'
        ? `<label class="upload-field site-drop-zone ${_siteFileCache.archive ? 'has-file' : ''}"><span>${_siteFileCache.archive ? `✓ ${archivePackageLabel}: <strong>${escapeHtml(_siteFileCache.archive.name)}</strong> · ${(_siteFileCache.archive.size/1024/1024).toFixed(2)} MB — ${localeLabel({ en: 'click to replace', ru: 'нажми, чтобы заменить', uk: 'натисни, щоб замінити', pt: 'clique para trocar', pl: 'kliknij, aby podmienić', fr: 'cliquez pour remplacer' })}` : `${archivePackageLabel} ${escapeHtml(caps.archiveLabel)} (.zip, .tar, .tar.gz, .tgz, .7z) — ${localeLabel({ en: 'click to choose', ru: 'нажми, чтобы выбрать', uk: 'натисни, щоб вибрати', pt: 'clique para escolher', pl: 'kliknij, aby wybrać', fr: 'cliquez pour choisir' })}`}</span><input type="file" name="archive" accept=".zip,.tar,.tgz,.tar.gz,.7z,application/zip,application/x-tar,application/gzip,application/x-gzip,application/x-7z-compressed" data-action="site-file-pick" data-kind="archive" /></label>`
        : `<label class="upload-field site-drop-zone ${_siteFileCache.html ? 'has-file' : ''}"><span>${_siteFileCache.html ? `✓ ${singleHtmlLabel}: <strong>${escapeHtml(_siteFileCache.html.name)}</strong> · ${(_siteFileCache.html.size/1024).toFixed(1)} KB — ${localeLabel({ en: 'click to replace', ru: 'нажми, чтобы заменить', uk: 'натисни, щоб замінити', pt: 'clique para trocar', pl: 'kliknij, aby podmienić', fr: 'cliquez pour remplacer' })}` : `${singleHtmlLabel} ${escapeHtml(caps.htmlLabel)} — ${localeLabel({ en: 'click to choose', ru: 'нажми, чтобы выбрать', uk: 'натисни, щоб вибрати', pt: 'clique para escolher', pl: 'kliknij, aby wybrać', fr: 'cliquez pour choisir' })}`}</span><input type="file" name="html" accept=".html,.htm,text/html" data-action="site-file-pick" data-kind="html" /></label>`}
      ${uploadState?.active ? `<div class="site-upload-progress ${uploadState.phase === 'processing' ? 'is-processing' : ''}" data-site-upload-progress aria-live="polite">
        <div class="site-upload-progress-head">
          <strong data-site-upload-label>${escapeHtml(uploadState.label || (currentLang() === 'ru' ? 'Загрузка архива' : 'Uploading archive'))}</strong>
          <span data-site-upload-percent>${Math.max(0, Math.min(100, Math.round(Number(uploadState.percent || 0))))}%</span>
        </div>
        <div class="site-upload-progress-bar"><span data-site-upload-bar style="width:${Math.max(0, Math.min(100, Number(uploadState.percent || 0)))}%"></span></div>
        <div class="site-upload-progress-meta">
          <span data-site-upload-detail>${escapeHtml(uploadState.detail || '')}</span>
          <span class="${uploadState.phase === 'processing' ? 'spinner-dot' : ''}" data-site-upload-spinner aria-hidden="true"></span>
        </div>
      </div>` : ''}
      <label class="inline-check"><input type="checkbox" name="agree" required /> <span>${agreeRulesLabel}</span></label>
      <button class="primary-button" data-site-upload-submit type="submit" ${uploadState?.active ? 'disabled' : ''}>${uploadState?.active ? (currentLang() === 'ru' ? 'Загружаю…' : 'Uploading…') : t('create')}</button>
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
  const packs = (state.me?.stickers || []).filter((pack) => Number(pack.userId) === Number(currentUser()?.id || 0));
  return `<div class="modal-head"><span class="eyebrow">stickers</span><h2>Sticker Studio</h2></div>
    <div class="mascot-row">${beaverMascot}<p>Create custom sticker packs with titles, descriptions and your own static, vector or short animated stickers. Supported: PNG, JPG, SVG, GIF and WebM up to 1 second.</p></div>
    <form class="settings-form" data-form="create-sticker-pack">
      <label><span>Pack title</span><input name="title" /></label>
      <label><span>Description</span><textarea name="description" rows="2" placeholder="Mood, theme, use case"></textarea></label>
      <button class="soft-button" type="submit">${t('create')}</button>
    </form>
    <form class="settings-form" data-form="create-sticker">
      <label><span>Pack</span><select name="packId">${packs.map((pack) => `<option value="${pack.id}">${escapeHtml(pack.title)}</option>`).join('')}</select></label>
      <label><span>Name</span><input name="name" /></label>
      <label class="upload-field"><span>Sticker file</span><input type="file" name="sticker" accept="image/*,.svg,.gif,video/webm,.webm" /></label>
      <button class="primary-button" type="submit">${t('addSticker')}</button>
    </form>
    <div class="sticker-studio-list">
      ${packs.map((pack) => `<section class="sticker-studio-pack">
        <form class="settings-form compact" data-form="update-sticker-pack" data-pack-id="${pack.id}">
          <div class="sticker-studio-pack-head">
            <div>
              <strong>${escapeHtml(pack.title)}</strong>
              <span>${escapeHtml(pack.description || 'No description yet.')}</span>
            </div>
            <button class="icon-button compact danger" type="button" data-action="delete-sticker-pack" data-pack-id="${pack.id}" title="Delete pack">${icons.trash}</button>
          </div>
          <label><span>Title</span><input name="title" value="${escapeHtml(pack.title || '')}" /></label>
          <label><span>Description</span><textarea name="description" rows="2">${escapeHtml(pack.description || '')}</textarea></label>
          <button class="soft-button compact" type="submit">${t('save')}</button>
        </form>
        <div class="sticker-full-grid">
          ${(pack.stickers || []).map((sticker) => `<div class="sticker-studio-item">
            <button type="button" class="sticker-full-btn ${Number(pack.coverStickerId) === Number(sticker.id) ? 'active' : ''}" data-action="set-pack-cover" data-pack-id="${pack.id}" data-sticker-id="${sticker.id}" title="Set as cover">
              <img src="${sticker.previewUrl || sticker.dataUrl}" alt="${escapeHtml(sticker.name)}" />
            </button>
            <span>${escapeHtml(sticker.name)}</span>
            <small>${escapeHtml(sticker.kind === 'animated' ? `animated · ${Math.round((sticker.durationMs || 0) / 100) / 10}s` : sticker.sourceType || 'static')}</small>
            <button type="button" class="inline-button compact danger" data-action="delete-sticker" data-sticker-id="${sticker.id}">Delete</button>
          </div>`).join('') || '<p class="muted">No stickers yet.</p>'}
        </div>
      </section>`).join('') || '<p class="muted">Create your first pack to start uploading stickers.</p>'}
    </div>`;
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
const BACKGROUND_RENDER_EDITABLE_SELECTOR = 'textarea, input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="file"]), [contenteditable="true"]';

function escapeSelectorValue(value = '') {
  const raw = String(value || '');
  if (window.CSS?.escape) return window.CSS.escape(raw);
  return raw.replace(/["\\]/g, '\\$&');
}

function isEditableInteractionTarget(target) {
  return Boolean(target && typeof target.matches === 'function' && target.matches(BACKGROUND_RENDER_EDITABLE_SELECTOR));
}

function beginBackgroundRenderHold(ms = 1200) {
  const holdMs = Math.max(0, Number(ms) || 0);
  if (!holdMs) return;
  state.renderHoldUntil = Math.max(Number(state.renderHoldUntil || 0), Date.now() + holdMs);
}

function isBackgroundRenderBlocked() {
  if (state.filePickerActive) return true;
  return Number(state.renderHoldUntil || 0) > Date.now();
}

function scheduleDeferredBackgroundRender() {
  if (!state.backgroundRenderQueued) return;
  if (state.backgroundRenderTimer) clearTimeout(state.backgroundRenderTimer);
  const delayMs = state.filePickerActive
    ? 400
    : Math.max(80, Number(state.renderHoldUntil || 0) - Date.now() + 40);
  state.backgroundRenderTimer = setTimeout(() => {
    state.backgroundRenderTimer = null;
    if (state.backgroundRenderQueued) render({ background: true });
  }, delayMs);
}

function queueBackgroundRender() {
  if (state.backgroundRenderFrame) return;
  state.backgroundRenderFrame = requestAnimationFrame(() => {
    state.backgroundRenderFrame = null;
    render({ background: true });
  });
}

function activateFilePickerHold() {
  state.filePickerActive = true;
}

function releaseFilePickerHold(delayMs = 180) {
  if (!state.filePickerActive) return;
  state.filePickerActive = false;
  beginBackgroundRenderHold(delayMs);
  if (state.backgroundRenderQueued) scheduleDeferredBackgroundRender();
}

function captureInputFocusState() {
  const active = document.activeElement;
  if (!active || typeof active.matches !== 'function') return null;
  if (!active.matches('input:not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="hidden"]), textarea')) return null;
  let selector = '';
  if (active.dataset?.input) selector = `[data-input="${escapeSelectorValue(active.dataset.input)}"]`;
  else if (active.id) selector = `#${escapeSelectorValue(active.id)}`;
  else if (active.name) {
    const formName = active.form?.dataset?.form;
    selector = formName
      ? `[data-form="${escapeSelectorValue(formName)}"] [name="${escapeSelectorValue(active.name)}"]`
      : `[name="${escapeSelectorValue(active.name)}"]`;
  }
  if (!selector) return null;
  return {
    selector,
    start: typeof active.selectionStart === 'number' ? active.selectionStart : null,
    end: typeof active.selectionEnd === 'number' ? active.selectionEnd : null
  };
}

function restoreInputFocusState(snapshot) {
  if (!snapshot?.selector) return;
  const next = document.querySelector(snapshot.selector);
  if (!next || typeof next.focus !== 'function') return;
  next.focus({ preventScroll: true });
  if (typeof snapshot.start === 'number' && typeof snapshot.end === 'number' && typeof next.setSelectionRange === 'function') {
    next.setSelectionRange(snapshot.start, snapshot.end);
  }
}

function renderMobileBottomNav() {
  const path = state.route.name;
  const unread = Object.values(state.chat.unread || {}).reduce((a, b) => a + b, 0);
  if (!currentUser()) return '';
  if (isGuestSession()) {
    return `<nav class="mobile-bottom-nav" aria-label="Navigation">
      <a class="mobile-nav-btn ${path === 'home' ? 'active' : ''}" ${navAttrs('/')}>${icons.home}<span>Home</span></a>
      <a class="mobile-nav-btn ${path === 'feed' ? 'active' : ''}" ${navAttrs('/feed')}>${icons.feed}<span>Feed</span></a>
      <a class="mobile-nav-btn ${path === 'discover' ? 'active' : ''}" ${navAttrs('/discover')}>${icons.search}<span>Explore</span></a>
      <button class="mobile-nav-btn" data-action="open-modal" data-modal="auth">${icons.user}<span>Sign up</span></button>
    </nav>`;
  }
  return `<nav class="mobile-bottom-nav" aria-label="Navigation">
    <a class="mobile-nav-btn ${path === 'home' ? 'active' : ''}" ${navAttrs('/')}>${icons.home}<span>Home</span></a>
    <a class="mobile-nav-btn ${path === 'feed' ? 'active' : ''}" ${navAttrs('/feed')}>${icons.feed}<span>Feed</span></a>
    <a class="mobile-nav-btn ${path === 'messages' ? 'active' : ''}" ${navAttrs('/messages')}>${icons.message}${unread > 0 ? `<span class="nav-badge">${unread > 9 ? '9+' : unread}</span>` : ''}<span>Chat</span></a>
    <a class="mobile-nav-btn ${path === 'discover' ? 'active' : ''}" ${navAttrs('/discover')}>${icons.search}<span>Explore</span></a>
    <button class="mobile-nav-btn ${['mail', 'sites', 'settings', 'admin', 'profile'].includes(path) ? 'active' : ''}" data-action="toggle-drawer">
      ${icons.menu}
      ${(state.mail.unread || 0) > 0 ? `<span class="nav-badge">${state.mail.unread > 9 ? '9+' : state.mail.unread}</span>` : ''}
      <span>Menu</span>
    </button>
  </nav>`;
}

function render(options = {}) {
  if (options?.background === true && isBackgroundRenderBlocked()) {
    state.backgroundRenderQueued = true;
    scheduleDeferredBackgroundRender();
    return;
  }
  state.backgroundRenderQueued = false;
  if (state.backgroundRenderTimer) {
    clearTimeout(state.backgroundRenderTimer);
    state.backgroundRenderTimer = null;
  }
  if (state.backgroundRenderFrame) {
    cancelAnimationFrame(state.backgroundRenderFrame);
    state.backgroundRenderFrame = null;
  }
  setDocMeta();
  document.body.classList.toggle('drawer-open', state.drawerOpen);
  document.body.classList.toggle('modal-open', Boolean(state.modal));
  const root = document.getElementById('app');
  const focusSnapshot = captureInputFocusState();
  const prevWindowScrollTop = getWindowScrollTop();

  // FIX: save scroll position before innerHTML wipe (prevents chat jump to top)
  const chatScrollEl = document.getElementById('chat-scroll');
  const prevScrollTop = chatScrollEl ? chatScrollEl.scrollTop : -1;
  const prevScrollHeight = chatScrollEl ? chatScrollEl.scrollHeight : 0;
  const wasNearBottom = chatScrollEl
    ? (chatScrollEl.scrollHeight - chatScrollEl.scrollTop - chatScrollEl.clientHeight < 80)
    : false;
  const modalScrollEl = document.querySelector('.modal-card');
  const prevModalScrollTop = modalScrollEl ? modalScrollEl.scrollTop : -1;
  const drawerScrollEl = document.querySelector('.drawer-panel');
  const prevDrawerScrollTop = drawerScrollEl ? drawerScrollEl.scrollTop : -1;

  const body = state.loading && !state.bootstrap ? renderLoading() : renderRoute();
  const verifyBanner = currentUser() && !currentUser().emailVerified && currentUser().roleInternal !== 'guest'
    ? `<div class="verify-banner">${iconBadge('mail', 'warning', 'banner-badge')}<span>${t('emailNotVerified') || 'Verify your email'}</span><button class="text-link" data-action="open-verify-email" style="background:none;border:none;color:inherit;text-decoration:underline;cursor:pointer;font-weight:600">${t('verifyNow') || 'Verify now'}</button></div>`
    : '';
  const guestBanner = state.guest || currentUser()?.roleInternal === 'guest'
    ? `<div class="guest-banner">${iconBadge('eye', 'neutral', 'banner-badge')}<span>You're browsing as a guest.</span><button class="text-link" data-action="open-modal" data-modal="auth" style="font-weight:700;text-decoration:underline">Create an account</button><span>to save everything.</span></div>`
    : '';
  root.innerHTML = `<div class="app-shell route-${state.route.name}">${renderTopbar()}${renderGlobalAudioPlayer()}${verifyBanner}${guestBanner}<main class="page-wrap">${body}</main>${renderSiteFooter()}${renderMobileBottomNav()}${renderDrawer()}${renderModal()}${renderToasts()}${renderHover()}${renderLightbox()}</div>`;
  root.firstElementChild?.classList.toggle('ui-animated', state.initialUiAnimated);

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
  const nextModalScrollEl = document.querySelector('.modal-card');
  if (nextModalScrollEl && prevModalScrollTop >= 0) nextModalScrollEl.scrollTop = prevModalScrollTop;
  const nextDrawerScrollEl = document.querySelector('.drawer-panel');
  if (nextDrawerScrollEl && prevDrawerScrollTop >= 0) nextDrawerScrollEl.scrollTop = prevDrawerScrollTop;

  if (state.pendingWindowScroll?.path === location.pathname) {
    const top = Math.max(0, Number(state.pendingWindowScroll.top || 0));
    const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const canFullyRestore = top <= maxScrollTop + 2;
    window.scrollTo(0, canFullyRestore ? top : maxScrollTop);
    if (canFullyRestore || !state.loading) state.pendingWindowScroll = null;
  } else {
    const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo(0, Math.min(prevWindowScrollTop, maxScrollTop));
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
  restoreInputFocusState(focusSnapshot);
  syncFastRefreshLoop();
  if (typeof updateJumpToLatest === 'function') {
    requestAnimationFrame(updateJumpToLatest);
  }
  if (typeof pushAdsenseUnits === 'function') {
    requestAnimationFrame(pushAdsenseUnits);
  }
  syncVoicePlaybackUi();
  syncVoiceRecordingUi();
}
function syncFastRefreshLoop() {
  const needsCountdown = state.route.name === 'admin'
    && state.adminTab === 'moderation'
    && Array.isArray(state.adminDeletionJobs)
    && state.adminDeletionJobs.length > 0;
  if (!needsCountdown) {
    clearInterval(state.fastRefreshTimer);
    state.fastRefreshTimer = null;
    return;
  }
  if (state.fastRefreshTimer) return;
  state.fastRefreshTimer = setInterval(() => {
    if (document.hidden) return;
    queueBackgroundRender();
  }, 1000);
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
    case 'site-studio': return renderSiteStudioPage();
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
  clearSiteUploadProgressQueue();
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
      ...(state.discover.users || []),
      ...(state.profile?.profile ? [state.profile.profile] : []),
      ...(state.chat.bootstrap?.social?.friends || []),
      ...(state.chat.bootstrap?.social?.follows || [])
    ];
    const user = candidates.find((item) => item?.handleCanonical === id || item?.handle?.toLowerCase() === id);
    if (!user) return;
    html = `${avatar(user, 'sm', '', { link: false })}<div><strong>${escapeHtml(user.displayName)}</strong><span>@${escapeHtml(user.handle)}</span><p>${escapeHtml(user.bio || '')}</p><div class="badge-row">${badgePills(user)}</div></div>`;
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
      payload.imageUrl = compressed.dataUrl;
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

function encodeSiteMetaHeader(meta = {}) {
  return encodeURIComponent(JSON.stringify(meta));
}

function formatUploadProgressLabel(loadedBytes = 0, totalBytes = 0) {
  const loaded = formatByteSize(loadedBytes);
  const total = totalBytes ? formatByteSize(totalBytes) : '...';
  return `${loaded} / ${total}`;
}

let _siteUploadProgressTimer = null;
let _siteUploadProgressPending = null;

function clearSiteUploadProgressQueue() {
  if (_siteUploadProgressTimer) clearTimeout(_siteUploadProgressTimer);
  _siteUploadProgressTimer = null;
  _siteUploadProgressPending = null;
}

function syncSiteUploadProgressUi(uploadState = {}) {
  const root = document.querySelector('[data-site-upload-progress]');
  if (!root) return false;
  const percent = Math.max(0, Math.min(100, Number(uploadState.percent || 0)));
  const labelNode = root.querySelector('[data-site-upload-label]');
  const percentNode = root.querySelector('[data-site-upload-percent]');
  const barNode = root.querySelector('[data-site-upload-bar]');
  const detailNode = root.querySelector('[data-site-upload-detail]');
  const spinnerNode = root.querySelector('[data-site-upload-spinner]');
  const submitNode = document.querySelector('[data-site-upload-submit]');
  root.classList.toggle('is-processing', uploadState.phase === 'processing');
  if (labelNode) labelNode.textContent = uploadState.label || (currentLang() === 'ru' ? 'Загрузка архива' : 'Uploading archive');
  if (percentNode) percentNode.textContent = `${Math.round(percent)}%`;
  if (barNode) barNode.style.width = `${percent}%`;
  if (detailNode) detailNode.textContent = uploadState.detail || '';
  if (spinnerNode) spinnerNode.className = uploadState.phase === 'processing' ? 'spinner-dot' : '';
  if (submitNode) {
    submitNode.disabled = true;
    submitNode.textContent = currentLang() === 'ru' ? 'Загружаю…' : 'Uploading…';
  }
  return true;
}

function applySiteUploadProgress(progress = {}) {
  if (state.modal?.type !== 'site-upload') return;
  const nextState = {
    ...(state.modal.siteUpload || {}),
    active: true,
    ...progress
  };
  state.modal = {
    ...state.modal,
    siteUpload: nextState
  };
  if (!syncSiteUploadProgressUi(nextState)) render();
}

function scheduleSiteUploadProgress(progress = {}, force = false) {
  if (state.modal?.type !== 'site-upload') return;
  _siteUploadProgressPending = {
    ...(state.modal.siteUpload || {}),
    ...(_siteUploadProgressPending || {}),
    active: true,
    ...progress
  };
  if (force) {
    clearSiteUploadProgressQueue();
    applySiteUploadProgress(_siteUploadProgressPending || progress);
    return;
  }
  if (_siteUploadProgressTimer) return;
  _siteUploadProgressTimer = setTimeout(() => {
    const next = _siteUploadProgressPending;
    _siteUploadProgressTimer = null;
    _siteUploadProgressPending = null;
    if (next) applySiteUploadProgress(next);
  }, 120);
}

async function uploadSiteArchiveBinary(url, meta, file, method = 'POST', options = {}) {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'text';
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('X-JB-Archive-Bytes', String(Number(file?.size || 0)));
    xhr.setRequestHeader('X-JB-Site-Meta', encodeSiteMetaHeader({ ...meta, archiveName: file?.name || meta?.archiveName || '' }));
    xhr.upload.onprogress = (event) => {
      if (typeof options.onProgress === 'function') {
        const total = Number(event.total || file?.size || 0);
        const loaded = Number(event.loaded || 0);
        const percent = total > 0 ? (loaded / total) * 100 : 0;
        options.onProgress({ phase: 'uploading', loaded, total, percent });
      }
    };
    xhr.upload.onload = () => {
      if (typeof options.onProgress === 'function') {
        const total = Number(file?.size || 0);
        options.onProgress({ phase: 'processing', loaded: total, total, percent: 96 });
      }
    };
    xhr.onerror = () => reject(new Error('Network request failed.'));
    xhr.onload = () => {
      let data = {};
      if (xhr.responseText) {
        try {
          data = JSON.parse(xhr.responseText);
        } catch {
          data = { rawText: xhr.responseText };
        }
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
        return;
      }
      const message = data?.error || (xhr.status === 413
        ? 'Upload request is too large for the server. If the archive is valid, check the reverse proxy body limit (for example nginx client_max_body_size) and restart the server after upload-limit changes.'
        : 'Request failed.');
      const error = new Error(message);
      error.status = xhr.status;
      Object.assign(error, data || {});
      reject(error);
    };
    xhr.send(file);
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
  const caps = currentSiteUploadCaps();
  if (!data.get('agree')) throw new Error('Please agree to the site rules first.');
  const mode = state.siteUploadMode || 'html';
  const common = { title: data.get('title'), slug: data.get('slug'), summary: data.get('summary'), visibility: data.get('visibility') };
  let response = null;
  if (mode === 'archive') {
    const formFile = data.get('archive');
    const file = (formFile && formFile.size) ? formFile : _siteFileCache.archive;
    if (!file || !file.size) throw new Error('Choose an archive file.');
    if (Number.isFinite(caps.archiveBytes) && file.size > caps.archiveBytes) throw new Error(`Archive must stay under ${caps.archiveLabel.replace('≤ ', '')}.`);
    if (state.modal?.type === 'site-upload') {
      scheduleSiteUploadProgress({
        phase: 'uploading',
        percent: 0,
        label: currentLang() === 'ru' ? 'Подготовка загрузки' : 'Preparing upload',
        detail: currentLang() === 'ru'
          ? `Файл: ${file.name || 'archive'} · ${formatByteSize(Number(file.size || 0))}`
          : `File: ${file.name || 'archive'} · ${formatByteSize(Number(file.size || 0))}`
      }, true);
    }
    response = await uploadSiteArchiveBinary('/api/me/sites/upload-archive-binary', common, file, 'POST', {
      onProgress: ({ phase, loaded, total, percent }) => {
        if (state.modal?.type !== 'site-upload') return;
        scheduleSiteUploadProgress({
          phase,
          percent: phase === 'processing' ? 96 : Math.max(0, Math.min(95, Number(percent || 0))),
          label: phase === 'processing'
            ? (currentLang() === 'ru' ? 'Архив загружен, идёт обработка' : 'Archive uploaded, processing')
            : (currentLang() === 'ru' ? 'Загрузка архива' : 'Uploading archive'),
          detail: phase === 'processing'
            ? (currentLang() === 'ru' ? 'Сервер распаковывает файлы, проверяет структуру и подготавливает сайт…' : 'Server is unpacking files, validating structure, and preparing the site…')
            : formatUploadProgressLabel(loaded, total)
        }, phase === 'processing');
      }
    });
  } else {
    const formFile = data.get('html');
    const file = (formFile && formFile.size) ? formFile : _siteFileCache.html;
    if (!file || !file.size) throw new Error('Choose an HTML file.');
    if (Number.isFinite(caps.htmlBytes) && file.size > caps.htmlBytes) throw new Error('The site file must stay under 1 MB.');
    const htmlContent = await file.text();
    response = await api('/api/me/sites/upload', { method: 'POST', body: JSON.stringify({ ...common, htmlContent }) });
  }
  clearSiteUploadProgressQueue();
  _siteFileCache.archive = null;
  _siteFileCache.html = null;
  closeModal();
  await loadSitesMine();
  const importSummary = siteImportSummary(response?.site);
  toast(importSummary ? `${t('siteCreated')} ${importSummary}` : t('siteCreated'), importSummary ? 'info' : 'success');
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
  const currentId = Number(currentUser()?.id || 0);
  await api('/api/me/account', { method: 'DELETE', body: JSON.stringify({ confirm: data.get('confirm'), password: data.get('password') }) });
  closeModal();
  if (currentId) {
    state.savedAccounts = state.savedAccounts.filter((item) => Number(item.id) !== currentId);
    persistSavedAccounts();
  }
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
  await api('/api/me/sticker-packs', { method: 'POST', body: JSON.stringify({ title: data.get('title'), description: data.get('description') }) });
  await loadMe(true);
  toast('Pack created.', 'success');
}
async function handleCreateSticker(form) {
  const data = new FormData(form);
  const file = data.get('sticker');
  if (!file?.size) throw new Error('Choose an image.');
  const prepared = await prepareStickerUpload(file);
  await api(`/api/me/sticker-packs/${encodeURIComponent(data.get('packId'))}/stickers`, {
    method: 'POST',
    body: JSON.stringify({
      name: data.get('name'),
      dataUrl: prepared.dataUrl,
      sourceType: prepared.sourceType,
      durationMs: prepared.durationMs,
      width: prepared.width,
      height: prepared.height
    })
  });
  await loadMe(true);
  render();
  toast('Sticker added.', 'success');
}

async function handleUpdateStickerPack(form) {
  const data = new FormData(form);
  const packId = form.dataset.packId;
  await api(`/api/me/sticker-packs/${encodeURIComponent(packId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: data.get('title'), description: data.get('description') })
  });
  await loadMe(true);
  render();
  toast('Pack updated.', 'success');
}
let _voiceRecorder = null;
let _voiceChunks = [];
let _voiceStartedAt = 0;
let _voiceStream = null;
let _voicePlaybackAudio = null;
let _voicePlaybackTick = null;
let _voiceRecordTick = null;

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
      if (_voiceRecordTick) {
        clearInterval(_voiceRecordTick);
        _voiceRecordTick = null;
      }
      if (!_voiceChunks.length) { toast('Запись пустая — попробуйте ещё раз.', 'error'); render(); return; }
      if (duration < 1) { toast('Запись слишком короткая (<1с).', 'info'); render(); return; }
      const mimeType = _voiceChunks[0]?.type || _voiceRecorder?.mimeType || 'audio/webm';
      const blob = new Blob(_voiceChunks, { type: mimeType });
      try {
        const dataUrl = await new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = () => reject(r.error || new Error('read failed')); r.readAsDataURL(blob); });
        if (!String(dataUrl).startsWith('data:audio/')) { toast('Неподдерживаемый формат записи.', 'error'); render(); return; }
        state.chat.attachment = { dataUrl, name: `Voice ${duration}s`, width: 0, height: 0, duration, type: 'audio', voice: true, url: dataUrl };
        render();
      } catch (err) {
        toast(err.message || 'Не удалось сохранить запись.', 'error');
        render();
      }
    };
    _voiceRecorder.start(250);
    state.chat.recording = true;
    ensureVoiceRecordingTicker();
    render();
  } catch (err) {
    toast(err.message || 'Microphone permission denied.', 'error');
    state.chat.recording = false;
    if (_voiceRecordTick) {
      clearInterval(_voiceRecordTick);
      _voiceRecordTick = null;
    }
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
      duration: a.duration || 0,
      voice: Boolean(a.voice)
    }));
  } else if (state.chat.attachment) {
    payload.attachmentDataUrl = state.chat.attachment.dataUrl;
    payload.attachmentName = state.chat.attachment.name;
    payload.attachmentWidth = state.chat.attachment.width;
    payload.attachmentHeight = state.chat.attachment.height;
    if (state.chat.attachment.type) payload.attachmentType = state.chat.attachment.type;
    if (state.chat.attachment.duration) payload.attachmentDuration = state.chat.attachment.duration;
    if (state.chat.attachment.voice) payload.attachmentVoice = true;
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

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const directFileInput = target.closest('input[type="file"]');
  const nestedFileInput = !directFileInput ? target.closest('label')?.querySelector('input[type="file"]') : null;
  if (directFileInput || nestedFileInput) activateFilePickerHold();
}, true);

document.addEventListener('focusin', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.matches('input[type="file"]')) {
    activateFilePickerHold();
    return;
  }
  if (isEditableInteractionTarget(target)) beginBackgroundRenderHold(1200);
});

document.addEventListener('focusout', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!isEditableInteractionTarget(target)) return;
  if (state.backgroundRenderQueued) scheduleDeferredBackgroundRender();
});

document.addEventListener('cancel', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== 'file') return;
  releaseFilePickerHold();
});

document.addEventListener('paste', async (event) => {
  if (!isMessagesRouteActive() || !state.chat.room) return;
  const items = Array.from(event.clipboardData?.items || []);
  const files = items
    .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
    .map((item) => item.getAsFile())
    .filter(Boolean);
  if (!files.length) return;
  const active = document.activeElement;
  if (active && !(active.id === 'chat-textarea' || active.closest?.('.chat-composer'))) return;
  event.preventDefault();
  const added = await handleChatImageFiles(files);
  if (added) toast(`${added} image${added > 1 ? 's' : ''} pasted.`, 'success');
});

window.addEventListener('focus', () => {
  if (!state.filePickerActive) return;
  setTimeout(() => {
    if (state.filePickerActive) releaseFilePickerHold();
  }, 160);
});

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
        if (!shouldHandleClientNav(event, target)) break;
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
      case 'open-profile': {
        if (!shouldHandleClientNav(event, target)) break;
        event.preventDefault();
        if (state.drawerOpen) {
          state.drawerOpen = false;
          document.body.classList.remove('drawer-open');
        }
        navigate(`/@${target.dataset.handle}`);
        break;
      }
      case 'open-site-studio': {
        const siteId = Number(target.dataset.id || 0);
        if (!siteId) break;
        if (state.sites.studio?.dirty && Number(state.sites.studio.siteId || 0) !== siteId) {
          const confirmLeave = confirm(currentLang() === 'ru' ? 'Есть несохранённые правки файла. Открыть другой studio и потерять их?' : 'You have unsaved file changes. Open another studio and lose them?');
          if (!confirmLeave) break;
        }
        if (state.modal) closeModal();
        navigate(`/sites/studio/${siteId}`);
        break;
      }
      case 'open-room':
        // Clear unread for this room when user opens it
        if (state.chat.unread[target.dataset.slug]) {
          delete state.chat.unread[target.dataset.slug];
        }
        if (state.route.name !== 'messages') navigate(`/messages/${target.dataset.slug}`);
        else await loadChatRoom(target.dataset.slug, true);
        break;
      case 'join-room': {
        const slug = target.dataset.slug;
        if (!slug) break;
        await api(`/api/chat/rooms/${encodeURIComponent(slug)}/join`, { method: 'POST', body: '{}' });
        if (state.modal?.type === 'chat-room-settings' && state.modal?.roomSlug === slug) closeModal();
        if (state.route.name === 'messages') {
          await loadChatBootstrap();
          await loadChatRoom(slug, true);
        } else {
          navigate(`/messages/${slug}`);
        }
        toast(currentLang() === 'ru' ? 'Комната добавлена в ваши чаты.' : 'Room added to your chats.', 'success');
        break;
      }
      case 'leave-room': {
        const slug = target.dataset.slug;
        if (!slug) break;
        if (!confirm(currentLang() === 'ru' ? 'Покинуть эту комнату?' : 'Leave this room?')) break;
        const fallbackRoomSlug = (state.chat.bootstrap?.rooms || []).find((room) => room.slug !== slug && room.joined)?.slug || null;
        await api(`/api/chat/rooms/${encodeURIComponent(slug)}/leave`, { method: 'POST', body: '{}' });
        if (state.modal?.type === 'chat-room-settings' && state.modal?.roomSlug === slug) closeModal();
        if (state.route.name === 'messages' && (state.route.slug || state.chat.room?.slug) === slug) {
          navigate(fallbackRoomSlug ? `/messages/${fallbackRoomSlug}` : '/messages');
        } else if (state.route.name === 'messages') {
          await loadChatBootstrap();
        }
        toast(currentLang() === 'ru' ? 'Вы покинули комнату.' : 'You left the room.', 'success');
        break;
      }
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
        const roomSlug = state.modal?.roomSlug || null;
        await api('/api/me/billing/plan', { method: 'POST', body: JSON.stringify({ planId }) });
        closeModal();
        await loadBootstrap();
        if (roomSlug) {
          await api(`/api/chat/rooms/${encodeURIComponent(roomSlug)}/join`, { method: 'POST', body: '{}' });
          if (state.route.name === 'messages') {
            await loadChatBootstrap();
            await loadChatRoom(roomSlug, true);
          } else {
            navigate(`/messages/${roomSlug}`);
          }
        }
        toast(`${currentLang() === 'ru' ? 'План активирован' : 'Plan activated'}: ${planLabel(planId)}`, 'success');
        break;
      }
      case 'room-upgrade': {
        setModal({ type: 'plans', roomSlug: target.dataset.slug || state.chat.room?.slug || null });
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
      case 'read-all-notifications':
        await api('/api/me/notifications/read-all', { method: 'POST', body: '{}' });
        await loadBootstrap();
        render();
        toast(currentLang() === 'ru' ? 'Все уведомления помечены как прочитанные.' : 'All notifications marked as read.', 'success');
        break;
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
      case 'open-site-file': {
        const siteId = Number(state.route.siteId || state.sites.studio?.siteId || target.dataset.id || 0);
        const filePath = target.dataset.path;
        if (!siteId || !filePath) break;
        if (state.sites.studio?.dirty && state.sites.studio.activePath !== filePath) {
          const confirmLeave = confirm(currentLang() === 'ru' ? 'Есть несохранённые правки файла. Открыть другой файл?' : 'You have unsaved changes. Open another file?');
          if (!confirmLeave) break;
        }
        await loadSiteStudioFile(siteId, filePath);
        break;
      }
      case 'reload-site-file': {
        const siteId = Number(target.dataset.id || state.sites.studio?.siteId || 0);
        const filePath = target.dataset.path || state.sites.studio?.activePath;
        if (!siteId || !filePath) break;
        if (state.sites.studio?.dirty) {
          const confirmReload = confirm(currentLang() === 'ru' ? 'Сбросить локальные правки и заново открыть файл?' : 'Discard local changes and reload this file?');
          if (!confirmReload) break;
        }
        await loadSiteStudioFile(siteId, filePath);
        break;
      }
      case 'noop':
        break;
      case 'open-workspace-settings':
        setModal({ type: 'workspace-settings', workspaceId: target.dataset.id || state.chat.room?.workspace?.id || null });
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
      case 'attach-chat-image': activateFilePickerHold(); document.getElementById('chat-file-input')?.click(); break;
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
      case 'toggle-voice-play':
        await toggleVoicePlayback(
          target.dataset.voiceKey || target.dataset.voiceUrl,
          target.dataset.voiceUrl,
          Number(target.dataset.voiceDuration || 0),
          {
            title: target.dataset.voiceTitle || '',
            label: target.dataset.voiceLabel || '',
            kind: target.dataset.voiceKind || 'voice'
          }
        );
        break;
      case 'set-voice-speed':
        setVoicePlaybackSpeed(Number(target.dataset.speed || 1));
        break;
      case 'seek-voice': {
        const rect = target.getBoundingClientRect();
        const progress = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0;
        seekVoicePlayback(progress);
        break;
      }
      case 'delete-sticker-pack':
        if (!confirm('Delete this sticker pack?')) break;
        await api(`/api/me/sticker-packs/${encodeURIComponent(target.dataset.packId)}`, { method: 'DELETE', body: '{}' });
        await loadMe(true);
        render();
        toast('Pack deleted.', 'success');
        break;
      case 'delete-sticker':
        if (!confirm('Delete this sticker?')) break;
        await api(`/api/me/stickers/${encodeURIComponent(target.dataset.stickerId)}`, { method: 'DELETE', body: '{}' });
        await loadMe(true);
        render();
        toast('Sticker deleted.', 'success');
        break;
      case 'set-pack-cover':
        await api(`/api/me/sticker-packs/${encodeURIComponent(target.dataset.packId)}`, { method: 'PATCH', body: JSON.stringify({ coverStickerId: Number(target.dataset.stickerId) }) });
        await loadMe(true);
        render();
        toast('Pack cover updated.', 'success');
        break;
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
      case 'remove-room-member': {
        const slugRM = target.dataset.roomSlug;
        const userId = target.dataset.userId;
        if (!slugRM || !userId) break;
        if (!confirm(currentLang() === 'ru' ? 'Удалить участника из комнаты?' : 'Remove this member from the room?')) break;
        await api(`/api/chat/rooms/${encodeURIComponent(slugRM)}/members/${encodeURIComponent(userId)}`, { method: 'DELETE', body: '{}' });
        if (state.memberListRoom === slugRM) {
          const dataRM = await api(`/api/chat/rooms/${encodeURIComponent(slugRM)}/members`);
          state.memberList = dataRM.members || [];
        }
        await loadChatBootstrap();
        if (state.chat.room?.slug === slugRM) await loadChatRoom(slugRM, false);
        toast(currentLang() === 'ru' ? 'Участник удалён.' : 'Member removed.', 'success');
        break;
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
      case 'report-target': {
        if (!currentUser() || isGuestSession()) {
          setModal({ type: 'auth', sub: 'login' });
          break;
        }
        setModal({
          type: 'report-content',
          targetType: target.dataset.targetType || 'other',
          targetId: target.dataset.targetId || '',
          targetLabel: target.dataset.targetLabel || '',
          targetUrl: target.dataset.targetUrl || ''
        });
        break;
      }
      case 'admin-tab': state.adminTab = target.dataset.tab; render(); break;
      case 'admin-refresh':
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Админ-данные обновлены.' : 'Admin data refreshed.', 'success');
        break;
      case 'admin-moderation-view': state.adminModerationView = target.dataset.view || 'overview'; render(); break;
      case 'admin-save-plan': {
        const handle = target.dataset.handle;
        const select = document.querySelector(`[data-admin-plan-select="${handle}"]`);
        if (!select) break;
        await api(`/api/admin/users/${encodeURIComponent(handle)}/billing`, { method: 'PATCH', body: JSON.stringify({ planId: select.value || '' }) });
        await loadAdminUsers();
        if (handle === currentUser()?.handleCanonical) await loadBootstrap();
        render();
        toast(currentLang() === 'ru' ? 'Подписка обновлена.' : 'Subscription updated.', 'success');
        break;
      }
      case 'admin-save-user-access': {
        const handle = target.dataset.handle;
        if (!handle) break;
        const roleSelect = document.querySelector(`[data-admin-role-select="${handle}"]`);
        const badgesInput = document.querySelector(`[data-admin-badges-input="${handle}"]`);
        const payload = {
          roleInternal: roleSelect?.value || 'member',
          badges: (badgesInput?.value || '')
            .split(',')
            .map((item) => item.trim().toUpperCase())
            .filter(Boolean)
        };
        await api(`/api/admin/users/${encodeURIComponent(handle)}`, { method: 'PATCH', body: JSON.stringify(payload) });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Доступ пользователя обновлён.' : 'User access updated.', 'success');
        break;
      }
      case 'admin-ban': {
        const reason = prompt(`Ban reason for @${target.dataset.handle}:`);
        if (reason === null) break;
        await api(`/api/admin/users/${encodeURIComponent(target.dataset.handle)}`, { method: 'PATCH', body: JSON.stringify({ ban: true, reason }) });
        await loadAdminData(); render(); toast('User banned.', 'success'); break;
      }
      case 'admin-unban':
        await api(`/api/admin/users/${encodeURIComponent(target.dataset.handle)}`, { method: 'PATCH', body: JSON.stringify({ ban: false }) });
        await loadAdminData(); render(); toast('Unbanned.', 'success'); break;
      case 'admin-delete-account': {
        const handle = target.dataset.handle;
        if (!handle) break;
        const message = currentLang() === 'ru'
          ? `Поставить аккаунт @${handle} в очередь удаления на 24 часа? За это время удаление можно отменить.`
          : `Queue @${handle} for deletion in 24 hours? You can restore it before the timer ends.`;
        if (!confirm(message)) break;
        await api(`/api/admin/users/${encodeURIComponent(handle)}`, { method: 'DELETE', body: '{}' });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Аккаунт поставлен в 24-часовую очередь удаления.' : 'Account queued for 24-hour deletion.', 'success');
        break;
      }
      case 'admin-delete-post': {
        const postId = Number(target.dataset.id || 0);
        if (!postId) break;
        if (!confirm(currentLang() === 'ru' ? 'Поставить этот пост в очередь удаления на 24 часа?' : 'Queue this post for deletion in 24 hours?')) break;
        await api(`/api/admin/posts/${postId}`, { method: 'DELETE', body: '{}' });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Пост поставлен в 24-часовую очередь удаления.' : 'Post queued for 24-hour deletion.', 'success');
        break;
      }
      case 'admin-delete-site': {
        const siteId = Number(target.dataset.id || 0);
        if (!siteId) break;
        if (!confirm(currentLang() === 'ru' ? 'Поставить этот сайт в очередь удаления на 24 часа?' : 'Queue this site for deletion in 24 hours?')) break;
        await api(`/api/admin/sites/${siteId}`, { method: 'DELETE', body: '{}' });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Сайт поставлен в 24-часовую очередь удаления.' : 'Site queued for 24-hour deletion.', 'success');
        break;
      }
      case 'admin-delete-project': {
        const projectId = Number(target.dataset.id || 0);
        if (!projectId) break;
        if (!confirm(currentLang() === 'ru' ? 'Поставить этот проект в очередь удаления на 24 часа?' : 'Queue this project for deletion in 24 hours?')) break;
        await api(`/api/admin/projects/${projectId}`, { method: 'DELETE', body: '{}' });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Проект поставлен в 24-часовую очередь удаления.' : 'Project queued for 24-hour deletion.', 'success');
        break;
      }
      case 'admin-delete-message': {
        const messageId = Number(target.dataset.id || 0);
        if (!messageId) break;
        if (!confirm(currentLang() === 'ru' ? 'Поставить это сообщение в очередь удаления на 24 часа?' : 'Queue this message for deletion in 24 hours?')) break;
        await api(`/api/admin/messages/${messageId}`, { method: 'DELETE', body: '{}' });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Сообщение поставлено в 24-часовую очередь удаления.' : 'Message queued for 24-hour deletion.', 'success');
        break;
      }
      case 'admin-confirm-report':
      case 'admin-resolve-report':
        await api(`/api/admin/reports/${encodeURIComponent(target.dataset.id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'resolved' }) });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Жалоба подтверждена.' : 'Report confirmed.', 'success');
        break;
      case 'admin-dismiss-report':
        await api(`/api/admin/reports/${encodeURIComponent(target.dataset.id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'dismissed' }) });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Жалоба скрыта.' : 'Report dismissed.', 'success');
        break;
      case 'admin-restore-deletion':
        await api(`/api/admin/deletions/${encodeURIComponent(target.dataset.id)}/restore`, { method: 'POST', body: '{}' });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Удаление отменено.' : 'Deletion restored.', 'success');
        break;
      case 'admin-site-review': {
        const siteId = Number(target.dataset.id || 0);
        const decision = target.dataset.decision === 'rejected' ? 'rejected' : 'approved';
        if (!siteId) break;
        const note = prompt(currentLang() === 'ru'
          ? (decision === 'approved' ? 'Комментарий для владельца сайта (необязательно):' : 'Причина отклонения сайта:')
          : (decision === 'approved' ? 'Optional note for the site owner:' : 'Reason for rejecting this site:')) || '';
        await api(`/api/admin/sites/${siteId}/review`, { method: 'PATCH', body: JSON.stringify({ decision, note }) });
        await loadAdminData();
        render();
        toast(decision === 'approved'
          ? (currentLang() === 'ru' ? 'Сайт одобрен.' : 'Site approved.')
          : (currentLang() === 'ru' ? 'Сайт отклонён.' : 'Site rejected.'), decision === 'approved' ? 'success' : 'info');
        break;
      }
      case 'admin-create-ad': {
        const fields = ['title', 'cta', 'href', 'icon', 'type', 'desc', 'internal'];
        const payload = Object.fromEntries(fields.map((key) => {
          const node = document.querySelector(`[data-admin-new-ad="${key}"]`);
          return [key, node?.type === 'checkbox' ? Boolean(node.checked) : (node?.value || '')];
        }));
        await api('/api/admin/ads', { method: 'POST', body: JSON.stringify(payload) });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Рекламный слот добавлен.' : 'Ad slot added.', 'success');
        break;
      }
      case 'admin-save-ad': {
        const adId = target.dataset.id;
        if (!adId) break;
        const readAdField = (field) => document.querySelector(`[data-admin-ad-input="${adId}:${field}"]`);
        const payload = {
          title: readAdField('title')?.value || '',
          cta: readAdField('cta')?.value || '',
          href: readAdField('href')?.value || '',
          icon: readAdField('icon')?.value || '',
          logo: readAdField('logo')?.value || '',
          type: readAdField('type')?.value || 'banner',
          desc: readAdField('desc')?.value || ''
        };
        await api(`/api/admin/ads/${encodeURIComponent(adId)}`, { method: 'PATCH', body: JSON.stringify(payload) });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Слот обновлён.' : 'Ad slot updated.', 'success');
        break;
      }
      case 'admin-toggle-ad': {
        const adId = target.dataset.id;
        if (!adId) break;
        const enabled = target.dataset.active !== 'true';
        await api(`/api/admin/ads/${encodeURIComponent(adId)}`, { method: 'PATCH', body: JSON.stringify({ active: enabled }) });
        await loadAdminData();
        render();
        toast(enabled
          ? (currentLang() === 'ru' ? 'Слот включён.' : 'Ad slot enabled.')
          : (currentLang() === 'ru' ? 'Слот выключен.' : 'Ad slot disabled.'), 'success');
        break;
      }
      case 'admin-delete-ad': {
        const adId = target.dataset.id;
        if (!adId) break;
        if (!confirm(currentLang() === 'ru' ? 'Удалить этот рекламный слот?' : 'Delete this ad slot?')) break;
        await api(`/api/admin/ads/${encodeURIComponent(adId)}`, { method: 'DELETE', body: '{}' });
        await loadAdminData();
        render();
        toast(currentLang() === 'ru' ? 'Слот удалён.' : 'Ad slot deleted.', 'success');
        break;
      }
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
        const enabled = !state.maintenance;
        await api('/api/admin/maintenance', { method: 'POST', body: JSON.stringify({ enabled }) });
        state.maintenance = enabled;
        toast(enabled
          ? (currentLang() === 'ru' ? 'Maintenance mode включён.' : 'Maintenance mode enabled.')
          : (currentLang() === 'ru' ? 'Maintenance mode выключен.' : 'Maintenance mode disabled.'), enabled ? 'error' : 'success');
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
  const isFileInput = input.matches('input[type="file"]');
  try {
    if (input.matches('input[name="chatThemeChoice"]')) {
      const grid = input.closest('.chat-theme-swatch-grid');
      if (grid) {
        grid.querySelectorAll('.chat-theme-swatch').forEach((item) => item.classList.remove('active'));
        input.closest('.chat-theme-swatch')?.classList.add('active');
      }
      const form = input.closest('form');
      if (form) await updateChatThemePreview(form);
    }
    if (input.matches('input[name="chatThemeFrom"], input[name="chatThemeTo"], input[name="chatThemeImage"]')) {
      const form = input.closest('form');
      if (form) await updateChatThemePreview(form);
    }
    if (input.matches('#chat-file-input')) {
      const files = Array.from(input.files || []);
      if (!files.length) return;
      await handleChatImageFiles(files);
      input.value = '';
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
  } finally {
    if (isFileInput) releaseFilePickerHold();
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
  if (isEditableInteractionTarget(input)) beginBackgroundRenderHold(1400);
  if (input.matches('[data-input="global-audio-progress"]')) {
    seekVoicePlayback(Number(input.value || 0) / 1000);
    return;
  }
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
    const query = input.value.trim();
    state.chat.mediaSearch = input.value;
    clearTimeout(window._gifTimer);
    if (state.chat.mediaTab === 'gif' && query.length >= 1) {
      // Debounced GIF search
      window._gifTimer = setTimeout(async () => {
        try {
          const r = await api(`/api/gif/search?q=${encodeURIComponent(query)}&limit=12`);
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
  if (input.matches('[data-input="admin-post-search"]')) {
    await loadAdminPosts(input.value);
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
  if (input.matches('[data-site-studio-editor="true"]')) {
    state.sites.studio = {
      ...(state.sites.studio || createEmptySiteStudioState(state.route.siteId)),
      content: input.value,
      dirty: true,
      error: ''
    };
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
      case 'update-sticker-pack': await handleUpdateStickerPack(form); break;
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
        let templateConfig = null;
        if (site.mode === 'template') {
          templateConfig = {
            indexingMode: d.get('indexingMode'),
            brandName: d.get('brandName'),
            tagline: d.get('tagline'),
            logoUrl: d.get('logoUrl'),
            faviconUrl: d.get('faviconUrl'),
            themePreset: d.get('themePreset'),
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
          Object.assign(templateConfig, {
            eyebrow: d.get('eyebrow'),
            hero: d.get('hero'),
            body: d.get('body'),
            links: parseSiteLinksInput(d.get('links')),
            gallery: parseSiteGalleryInput(d.get('gallery'))
          });
        }
        if (templateConfig) payload.templateConfig = templateConfig;
        if (site.mode === 'upload') {
          const uploadCaps = currentSiteUploadCaps();
          const archiveFile = d.get('archive');
          if (archiveFile?.size) {
            if (Number.isFinite(uploadCaps.archiveBytes) && archiveFile.size > uploadCaps.archiveBytes) throw new Error(`Archive must stay under ${uploadCaps.archiveLabel.replace('≤ ', '')}.`);
            await uploadSiteArchiveBinary(`/api/me/sites/${form.dataset.siteId}/archive-binary`, { archiveName: archiveFile.name }, archiveFile, 'PUT');
            const response = await api(`/api/me/sites/${form.dataset.siteId}`, { method: 'PATCH', body: JSON.stringify(payload) });
            if (response?.site) patchVisibleSites(form.dataset.siteId, () => response.site);
            closeModal();
            render();
            const importSummary = siteImportSummary(response?.site);
            toast(importSummary ? `${t('settingsUpdated')} ${importSummary}` : t('settingsUpdated'), importSummary ? 'info' : 'success');
            break;
          } else {
            payload.htmlContent = d.get('htmlContent');
          }
        }
        const response = await api(`/api/me/sites/${form.dataset.siteId}`, { method: 'PATCH', body: JSON.stringify(payload) });
        if (response?.site) patchVisibleSites(form.dataset.siteId, () => response.site);
        closeModal();
        render();
        const importSummary = siteImportSummary(response?.site);
        toast(importSummary ? `${t('settingsUpdated')} ${importSummary}` : t('settingsUpdated'), importSummary ? 'info' : 'success');
        break;
      }
      case 'site-studio-file': {
        const siteId = Number(form.dataset.siteId || state.sites.studio?.siteId || 0);
        const filePath = form.dataset.path || state.sites.studio?.activePath || '';
        if (!siteId || !filePath) throw new Error('Studio file is not selected.');
        const d = new FormData(form);
        state.sites.studio = { ...(state.sites.studio || createEmptySiteStudioState(siteId)), saving: true, error: '' };
        render();
        const response = await api(`/api/me/sites/${siteId}/studio/file`, { method: 'PATCH', body: JSON.stringify({ path: filePath, content: d.get('content') }) });
        if (response?.site) patchVisibleSites(siteId, () => response.site);
        state.sites.studio = {
          ...(state.sites.studio || createEmptySiteStudioState(siteId)),
          siteId,
          site: response.site || state.sites.studio.site,
          files: response.files || state.sites.studio.files || [],
          activePath: response.file?.path || filePath,
          activeFile: response.file || state.sites.studio.activeFile,
          content: response.file?.content || String(d.get('content') || ''),
          saving: false,
          dirty: false,
          error: '',
          studioEnabled: true
        };
        render();
        toast(currentLang() === 'ru' ? 'Файл сохранён.' : 'File saved.', 'success');
        break;
      }
      case 'site-studio-new-file': {
        const siteId = Number(form.dataset.siteId || state.sites.studio?.siteId || 0);
        if (!siteId) throw new Error('Site studio is not open.');
        const d = new FormData(form);
        const filePath = String(d.get('path') || '').trim();
        if (!filePath) throw new Error(currentLang() === 'ru' ? 'Укажи путь файла.' : 'Choose a file path.');
        state.sites.studio = { ...(state.sites.studio || createEmptySiteStudioState(siteId)), saving: true, error: '' };
        render();
        const response = await api(`/api/me/sites/${siteId}/studio/file`, { method: 'POST', body: JSON.stringify({ path: filePath, content: d.get('content') }) });
        if (response?.site) patchVisibleSites(siteId, () => response.site);
        state.sites.studio = {
          ...(state.sites.studio || createEmptySiteStudioState(siteId)),
          siteId,
          site: response.site || state.sites.studio.site,
          files: response.files || state.sites.studio.files || [],
          activePath: response.file?.path || filePath,
          activeFile: response.file || null,
          content: response.file?.content || String(d.get('content') || ''),
          saving: false,
          dirty: false,
          error: '',
          studioEnabled: true
        };
        form.reset();
        render();
        toast(currentLang() === 'ru' ? 'Файл создан.' : 'File created.', 'success');
        break;
      }
      case 'site-studio-design': {
        const site = findOwnedSite(form.dataset.siteId);
        if (!site) throw new Error('Site not found.');
        const d = new FormData(form);
        const payload = {
          title: d.get('title'),
          summary: d.get('summary'),
          visibility: d.get('visibility')
        };
        if (site.mode !== 'upload') {
          payload.templateConfig = {
            brandName: d.get('brandName'),
            tagline: d.get('tagline'),
            logoUrl: d.get('logoUrl'),
            faviconUrl: d.get('faviconUrl'),
            accent: d.get('accent'),
            bg: d.get('bg'),
            surface: d.get('surface'),
            text: d.get('text'),
            muted: d.get('muted'),
            font: d.get('font'),
            radiusStyle: d.get('radiusStyle'),
            maxWidth: d.get('maxWidth'),
            ctaLabel: d.get('ctaLabel'),
            ctaHref: d.get('ctaHref'),
            supportEmail: d.get('supportEmail'),
            customCss: d.get('customCss')
          };
        }
        state.sites.studio = { ...(state.sites.studio || createEmptySiteStudioState(site.id)), saving: true, error: '' };
        render();
        const response = await api(`/api/me/sites/${form.dataset.siteId}`, { method: 'PATCH', body: JSON.stringify(payload) });
        if (response?.site) patchVisibleSites(form.dataset.siteId, () => response.site);
        state.sites.studio = { ...(state.sites.studio || createEmptySiteStudioState(site.id)), site: response.site || state.sites.studio.site, saving: false, error: '' };
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
        const newPassword = String(d.get('newPassword') || '');
        const confirmPassword = String(d.get('confirmPassword') || '');
        if (newPassword !== confirmPassword) throw new Error(currentLang() === 'ru' ? 'Пароли не совпадают.' : 'Passwords do not match.');
        await api('/api/me/password', { method: 'PATCH', body: JSON.stringify({ currentPassword: d.get('currentPassword'), newPassword: d.get('newPassword') }) });
        closeModal(); await loadBootstrap(); toast(currentLang() === 'ru' ? 'Пароль обновлён.' : 'Password updated.', 'success'); break;
      }
      case 'change-email': {
        const d = new FormData(form);
        await api('/api/me/email', { method: 'PATCH', body: JSON.stringify({ email: d.get('email'), password: d.get('password') }) });
        closeModal(); await loadBootstrap(); toast(currentLang() === 'ru' ? 'Email обновлён. Может понадобиться повторная верификация.' : 'Email updated. Re-verification may be needed.', 'success'); break;
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
      case 'report-content': {
        const d = new FormData(form);
        await api('/api/reports', {
          method: 'POST',
          body: JSON.stringify({
            targetType: d.get('targetType'),
            targetId: d.get('targetId') || null,
            reason: d.get('reason'),
            details: d.get('details'),
            targetLabel: state.modal?.targetLabel || '',
            targetUrl: state.modal?.targetUrl || ''
          })
        });
        closeModal();
        toast(currentLang() === 'ru' ? 'Жалоба отправлена.' : 'Report sent.', 'success');
        break;
      }
    }
  } catch (error) {
    if (state.modal?.siteUpload?.active) {
      clearSiteUploadProgressQueue();
      state.modal = {
        ...state.modal,
        siteUpload: {
          ...state.modal.siteUpload,
          active: false
        }
      };
      render();
    }
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
  if (isEditableInteractionTarget(event.target)) beginBackgroundRenderHold(1200);
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
      queueBackgroundRender();
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
    queueBackgroundRender();
  });

  es.addEventListener('new_message', (e) => {
    const msg = JSON.parse(e.data);
    if (isVisibleChatRoomById(msg.roomId)) {
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
        queueBackgroundRender();
        scrollChatToBottom(false);
      });
    } else {
      // Message in background room — increment unread
      const room = state.chat.bootstrap?.rooms?.find(r => r.id === msg.roomId);
      if (room) {
        state.chat.unread[room.slug] = (state.chat.unread[room.slug] || 0) + 1;
        queueBackgroundRender();
      }
    }
  });

  es.addEventListener('message_updated', (e) => {
    const updated = normalizeMessageForViewer(JSON.parse(e.data));
    if (isVisibleChatRoomById(updated.roomId)) {
      const idx = state.chat.messages.findIndex(m => Number(m.id) === Number(updated.id) || (updated.clientNonce && m.clientNonce === updated.clientNonce));
      if (idx >= 0) {
        const displayBody = updated.deleted ? '[deleted]' : (updated.body || state.chat.messages[idx].displayBody);
        state.chat.messages[idx] = { ...updated, displayBody };
        queueBackgroundRender();
      }
    }
  });

  es.addEventListener('message_deleted', (e) => {
    const { id, roomSlug } = JSON.parse(e.data);
    if (isVisibleChatRoomBySlug(roomSlug)) {
      const idx = state.chat.messages.findIndex(m => m.id === id);
      if (idx >= 0) {
        state.chat.messages[idx] = { ...state.chat.messages[idx], deleted: true, body: '', displayBody: '[deleted]' };
        queueBackgroundRender();
      }
    }
  });

  es.addEventListener('message_pinned', (e) => {
    const data = JSON.parse(e.data);
    if (isVisibleChatRoomBySlug(data.roomSlug)) {
      toast(`${data.pinnedBy} pinned a message`, 'info');
    }
  });

  es.addEventListener('message_unpinned', () => { /* refresh pinned if open */ });

  es.addEventListener('typing', (e) => {
    const { roomSlug, userId, handle, displayName } = JSON.parse(e.data);
    if (isVisibleChatRoomBySlug(roomSlug) && userId !== currentUser()?.id) {
      if (!state.typing[roomSlug]) state.typing[roomSlug] = {};
      state.typing[roomSlug][userId] = { handle, displayName, at: Date.now() };
      queueBackgroundRender();
      // Auto-clear after 4 seconds
      setTimeout(() => {
        if (state.typing[roomSlug]) {
          delete state.typing[roomSlug][userId];
          queueBackgroundRender();
        }
      }, 4000);
    }
  });

  es.addEventListener('read_receipt', (e) => {
    const { userId, roomSlug, lastReadMessageId } = JSON.parse(e.data);
    if (!state.readReceipts[roomSlug]) state.readReceipts[roomSlug] = {};
    state.readReceipts[roomSlug][userId] = lastReadMessageId;
    if (isVisibleChatRoomBySlug(roomSlug)) queueBackgroundRender();
  });

  es.addEventListener('message_confirmed', (e) => {
    const { roomSlug, messageId, confirmedAt, confirmedByUserId } = JSON.parse(e.data);
    if (!isVisibleChatRoomBySlug(roomSlug)) return;
    const idx = state.chat.messages.findIndex(m => Number(m.id) === Number(messageId));
    if (idx >= 0) {
      state.chat.messages[idx] = { ...state.chat.messages[idx], confirmedAt, confirmedByUserId };
      queueBackgroundRender();
    }
  });

  es.addEventListener('room_added', (e) => {
    const { room } = JSON.parse(e.data);
    toast(`Added to ${room.title}`, 'success');
    loadChatBootstrap().then(() => queueBackgroundRender());
  });

  es.addEventListener('room_removed', () => {
    if (state.chat.room) { state.chat.room = null; state.chat.selectedSlug = null; }
    loadChatBootstrap().then(() => queueBackgroundRender());
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
function hidePublicShell() {
  const el = document.getElementById('public-shell-root');
  if (el) el.remove();
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
    if (!localStorage.getItem('jb_lang')) {
      localStorage.setItem('jb_lang', currentLang());
    }
    await routeLoad();
    render();
    requestAnimationFrame(() => {
      state.initialUiAnimated = true;
      document.querySelector('.app-shell')?.classList.add('ui-animated');
    });
    startRefreshLoop();
    connectSSE();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && currentUser() && !isGuestSession()) {
        if (state.sseStatus !== 'live') connectSSE();
        loadBootstrap().then(() => queueBackgroundRender()).catch(() => {});
      }
    });
  } catch (error) {
    setSplashStatus('Unable to load app');
    hideSplash();
    toast(error.message, 'error');
  }
}
boot();
