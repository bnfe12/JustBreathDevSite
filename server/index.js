import compression from 'compression';
import cookie from 'cookie';
import bcrypt from 'bcryptjs';
import AdmZip from 'adm-zip';
import express from 'express';
import { spawnSync } from 'node:child_process';
import net from 'node:net';
import tls from 'node:tls';
import { createHash, randomBytes } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import {
  appendFileSync,
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
  unlinkSync
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const envPath = path.join(rootDir, '.env');
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(rootDir, 'data');
const sitesDir = path.join(dataDir, 'sites');
const uploadsDir = path.join(dataDir, 'uploads');
const telemetryDir = path.join(dataDir, 'telemetry');
const backupsDir = process.env.BACKUPS_DIR ? path.resolve(process.env.BACKUPS_DIR) : path.join(rootDir, 'backups');
const storePath = path.join(dataDir, 'store.json');

const PORT = Number(process.env.PORT || 8080);
const SITE_NAME = process.env.SITE_NAME || 'justbreath.life';
const BRAND_WORDMARK = process.env.BRAND_WORDMARK || 'justbreath';
const APP_URL = process.env.APP_URL || '';
const ADSENSE_CLIENT_ID = String(process.env.ADSENSE_CLIENT_ID || 'ca-pub-3877248886432419');
const GOOGLE_CLIENT_ID = String(process.env.GOOGLE_CLIENT_ID || '');
const GOOGLE_CLIENT_SECRET = String(process.env.GOOGLE_CLIENT_SECRET || '');
const GOOGLE_REDIRECT_URI = String(process.env.GOOGLE_REDIRECT_URI || '');
const DISCORD_CLIENT_ID = String(process.env.DISCORD_CLIENT_ID || '');
const DISCORD_CLIENT_SECRET = String(process.env.DISCORD_CLIENT_SECRET || '');
const DISCORD_REDIRECT_URI = String(process.env.DISCORD_REDIRECT_URI || '');
const SESSION_COOKIE = 'jb_sid';
const GOOGLE_OAUTH_COOKIE = 'jb_google_oauth';
const DISCORD_OAUTH_COOKIE = 'jb_discord_oauth';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const GOOGLE_OAUTH_TTL_MS = 1000 * 60 * 10;
const DISCORD_OAUTH_TTL_MS = 1000 * 60 * 10;
const SITE_UPLOAD_LIMIT_BYTES = 1 * 1024 * 1024;
const SITE_ZIP_LIMIT_BYTES = 5 * 1024 * 1024;
const IMAGE_UPLOAD_LIMIT_BYTES = 900 * 1024;
const DISCORD_SUPPORT_URL = String(process.env.DISCORD_SUPPORT_URL || '');
const TELEGRAM_BOT_TOKEN = String(process.env.TELEGRAM_BOT_TOKEN || '');
const TELEGRAM_BOT_USERNAME = String(process.env.TELEGRAM_BOT_USERNAME || '');

const OWNER_HANDLE = String(process.env.OWNER_HANDLE || 'Tcheler');
const OWNER_DISPLAY_NAME = String(process.env.OWNER_DISPLAY_NAME || 'Tcheler');
const OWNER_EMAIL = String(process.env.OWNER_EMAIL || 'andrexarlay@gmail.com');
const OWNER_PASSWORD = String(process.env.OWNER_PASSWORD || '12345678');
const BRAND_HANDLE = String(process.env.BRAND_HANDLE || 'justbreath');
const BRAND_DISPLAY_NAME = String(process.env.BRAND_DISPLAY_NAME || 'justbreath');
const BRAND_EMAIL = String(process.env.BRAND_EMAIL || 'hello@justbreath.life');
const BRAND_PASSWORD = String(process.env.BRAND_PASSWORD || '12345678');
const DEMO_SEED_MODE = String(process.env.DEMO_SEED_MODE || 'off').toLowerCase();

mkdirSync(dataDir, { recursive: true });
mkdirSync(sitesDir, { recursive: true });
mkdirSync(uploadsDir, { recursive: true });
mkdirSync(telemetryDir, { recursive: true });
mkdirSync(backupsDir, { recursive: true });

const subscriptions = [
  { id: 'starter', label: 'Starter', months: 1,  priceEUR: 2,  compareAtEUR: 3,  savingsEUR: 1, storageMB: 200,  extraSites: 2, perks: ['2 extra site spaces', '200 MB storage'] },
  { id: 'creator', label: 'Creator', months: 3,  priceEUR: 5,  compareAtEUR: 8,  savingsEUR: 3, storageMB: 500,  extraSites: 5, perks: ['5 extra site spaces', '500 MB storage', 'Creator badge'] },
  { id: 'studio',  label: 'Studio',  months: 6,  priceEUR: 9,  compareAtEUR: 14, savingsEUR: 5, storageMB: 1024, extraSites: 10, perks: ['10 extra site spaces', '1 GB storage', 'Studio badge', 'Priority review'] },
  { id: 'pro',     label: 'Pro',     months: 12, priceEUR: 15, compareAtEUR: 24, savingsEUR: 9, storageMB: 2048, extraSites: -1, perks: ['Unlimited site spaces', '2 GB storage', 'Pro badge', 'Priority review', 'Early access'] }
];
const MAX_SITES_FREE = 3;
const ROOM_ROLE_WEIGHTS = { member: 1, moderator: 2, admin: 3, owner: 4 };

function subscriptionPlan(planId = '') {
  return subscriptions.find((plan) => plan.id === String(planId || '').trim()) || null;
}
function subscriptionRank(planId = '') {
  const index = subscriptions.findIndex((plan) => plan.id === String(planId || '').trim());
  return index >= 0 ? index + 1 : 0;
}
function hasPlanAccess(user, requiredPlanId = '') {
  if (!requiredPlanId) return true;
  return subscriptionRank(user?.billing?.planId || '') >= subscriptionRank(requiredPlanId);
}
function sanitizeRoomPermissions(raw) {
  const source = ensureObject(raw);
  return {
    posting: source.posting === 'admins' ? 'admins' : 'everyone'
  };
}
function sanitizeRoomSubscription(raw) {
  const source = ensureObject(raw);
  const requiredPlanId = subscriptionPlan(source.requiredPlanId)?.id || '';
  return {
    enabled: Boolean(source.enabled && requiredPlanId),
    requiredPlanId,
    note: sanitizeText(source.note || '', 180)
  };
}
function roomRoleWeight(role = 'member') {
  return ROOM_ROLE_WEIGHTS[String(role || 'member')] || ROOM_ROLE_WEIGHTS.member;
}
function roomUserRole(room, userId) {
  if (!room || !userId) return null;
  if (room.memberIds.includes(Number(userId))) return room.memberRoles?.[String(userId)] || 'member';
  return null;
}
function roomIsPremium(room) {
  return Boolean(room?.subscription?.enabled && room?.subscription?.requiredPlanId);
}
function roomSubscriptionLocked(store, room, authUserId = null) {
  if (!roomIsPremium(room)) return false;
  if (!authUserId) return true;
  if (Number(room.ownerUserId) === Number(authUserId)) return false;
  const user = store.users.find((item) => Number(item.id) === Number(authUserId));
  return !hasPlanAccess(user, room.subscription.requiredPlanId);
}
function roomCanJoin(store, room, authUserId = null) {
  if (!room || !authUserId || room.kind === 'direct') return false;
  if (room.memberIds.includes(Number(authUserId))) return false;
  if (room.visibility !== 'open') return false;
  return !roomSubscriptionLocked(store, room, authUserId);
}
function roomCanPost(store, room, authUserId = null) {
  if (!room || !authUserId) return false;
  const role = roomUserRole(room, authUserId);
  if (!role) return false;
  if (room.kind !== 'direct' && roomSubscriptionLocked(store, room, authUserId)) return false;
  if (room.kind !== 'direct' && room.permissions?.posting === 'admins' && roomRoleWeight(role) < roomRoleWeight('moderator')) return false;
  return true;
}
function roomAppearsInChatList(room, authUserId = null) {
  if (!room || !authUserId) return false;
  if (room.kind === 'direct') return room.memberIds.includes(Number(authUserId));
  return room.memberIds.includes(Number(authUserId));
}
function applyBillingPlan(user, planId = '') {
  const plan = subscriptionPlan(planId);
  if (!plan) {
    user.billing = {
      planId: '',
      startedAt: null,
      renewsAt: null,
      storageLimitMB: 0
    };
    return user.billing;
  }
  user.billing = {
    planId: plan.id,
    startedAt: nowIso(),
    renewsAt: futureIso(plan.months * 30 * 24 * 60 * 60 * 1000),
    storageLimitMB: Number(plan.storageMB || 0)
  };
  return user.billing;
}

function nowIso() { return new Date().toISOString(); }
function futureIso(ms) { return new Date(Date.now() + ms).toISOString(); }
function cleanHandle(raw) { return String(raw || '').trim().replace(/\s+/g, '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32); }
function canonicalHandle(raw) { return cleanHandle(raw).toLowerCase(); }
function safeNextPath(raw) {
  const value = String(raw || '').trim();
  return value.startsWith('/') && !value.startsWith('//') ? value : '/';
}
function slugify(raw) { return String(raw || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80); }
function sanitizeText(raw, max = 3000) { return String(raw || '').replace(/\0/g, '').trim().slice(0, max); }
function ensureArray(v) { return Array.isArray(v) ? v : []; }
function ensureObject(v) { return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; }
function sortDateDesc(a, b, key = 'createdAt') { return new Date(b?.[key] || 0) - new Date(a?.[key] || 0); }
function hashToken(token) { return createHash('sha256').update(token).digest('hex'); }
function createToken() { return randomBytes(24).toString('hex'); }
function createInviteCode() { return randomBytes(6).toString('base64url'); }
function avatarText(value) { return String(value || '?').trim().slice(0, 2).toUpperCase(); }
function isGuestUser(user) { return String(user?.roleInternal || '') === 'guest'; }
function uniqueHandle(store, base) {
  const fallback = cleanHandle(base) || `user${Number(store.seq.users || 0) + 1}`;
  const normalized = fallback.slice(0, 32) || `user${Number(store.seq.users || 0) + 1}`;
  let candidate = normalized;
  let index = 1;
  while (store.users.some((user) => user.handleCanonical === canonicalHandle(candidate))) {
    const suffix = String(index++);
    candidate = `${normalized.slice(0, Math.max(1, 32 - suffix.length))}${suffix}`;
  }
  return candidate;
}
function safeDataUrl(raw, maxLength = IMAGE_UPLOAD_LIMIT_BYTES * 2, allowedKinds = ['image']) {
  const value = String(raw || '');
  const kinds = Array.isArray(allowedKinds) ? allowedKinds : [allowedKinds];
  if (value.length > maxLength || !kinds.some((kind) => value.startsWith(`data:${kind}/`))) return '';
  return value;
}
function ensureRoleMap(raw = {}, memberIds = []) {
  const source = ensureObject(raw);
  const out = {};
  for (const id of memberIds) {
    const key = String(id);
    out[key] = ['owner', 'admin', 'moderator', 'member'].includes(source[key]) ? source[key] : (memberIds[0] === id ? 'owner' : 'member');
  }
  return out;
}
function cleanBadges(raw) {
  const allowed = new Set(['USR', 'DEV', 'VRF', 'MED', 'MOD', 'STD']);
  const list = ensureArray(raw).map((item) => sanitizeText(item, 3).toUpperCase()).filter((item) => allowed.has(item));
  return list.length ? Array.from(new Set(list)) : ['USR'];
}
function sanitizeHexColor(value, fallback = '#7c3aed') {
  const raw = String(value || '').trim();
  return /^#[0-9a-fA-F]{3,8}$/.test(raw) ? raw : fallback;
}
function sanitizeChatTheme(raw, fallback = null) {
  if (!raw || typeof raw !== 'object') return fallback;
  const mode = ['preset', 'gradient', 'image'].includes(raw.mode) ? raw.mode : 'preset';
  const preset = ['platform', 'aurora', 'night-grid', 'sunset-room', 'paper-latte', 'ocean-depth', 'mono-noise'].includes(raw.preset)
    ? raw.preset
    : 'platform';
  const from = sanitizeHexColor(raw.from || fallback?.from || '#6d28d9', '#6d28d9');
  const to = sanitizeHexColor(raw.to || fallback?.to || '#0ea5e9', '#0ea5e9');
  const imageUrl = sanitizeText(raw.imageUrl || fallback?.imageUrl || '', 600);
  if (mode === 'image' && !imageUrl) return fallback;
  return {
    mode,
    preset,
    from,
    to,
    imageUrl: mode === 'image' ? imageUrl : ''
  };
}
function sanitizeChatThemeMap(raw) {
  const out = {};
  const source = ensureObject(raw);
  for (const [key, value] of Object.entries(source)) {
    const slug = slugify(key);
    if (!slug) continue;
    const theme = sanitizeChatTheme(value, null);
    if (theme) out[slug] = theme;
  }
  return out;
}

const SITE_THEME_PRESETS = {
  platform: { accent: '#7c3aed', bg: '#05070d', surface: '#101827', text: '#f7f8fb', muted: '#a7afc1' },
  clean: { accent: '#0f766e', bg: '#f4f7f5', surface: '#ffffff', text: '#0f172a', muted: '#475569' },
  editorial: { accent: '#c2410c', bg: '#fbf7ef', surface: '#fffdf8', text: '#201a15', muted: '#6b5d4d' },
  noir: { accent: '#f59e0b', bg: '#060606', surface: '#111111', text: '#faf7f2', muted: '#9a9488' }
};
const SITE_INTENTS = ['launch', 'portfolio', 'pitch', 'event', 'docs'];

function siteIntent(value = '', fallback = 'launch') {
  const normalized = String(value || '').trim().toLowerCase();
  return SITE_INTENTS.includes(normalized) ? normalized : fallback;
}

function siteIntentDefaults(intent = 'launch', title = 'Your site') {
  const normalized = siteIntent(intent);
  if (normalized === 'portfolio') {
    return {
      eyebrow: 'Selected work',
      hero: `${title} portfolio`,
      body: 'Use this space to introduce your work, explain your point of view, and link to the projects that matter right now.',
      ctaLabel: 'View work'
    };
  }
  if (normalized === 'pitch') {
    return {
      eyebrow: 'Pitch page',
      hero: `${title} at a glance`,
      body: 'State the problem, the hook, the current build, and the ask. Keep it clear enough for partners, festivals, or investors to understand in one pass.',
      ctaLabel: 'Open deck'
    };
  }
  if (normalized === 'event') {
    return {
      eyebrow: 'Live moment',
      hero: `${title} update`,
      body: 'Use this version for a launch, release window, campaign, or timed event. Lead with the date, the main action, and the single next step.',
      ctaLabel: 'Get updates'
    };
  }
  if (normalized === 'docs') {
    return {
      eyebrow: 'Documentation',
      hero: `${title} docs`,
      body: 'Use this layout for onboarding, setup instructions, release notes, or support answers. Keep sections explicit and link directly to the next action.',
      ctaLabel: 'Read docs'
    };
  }
  return {
    eyebrow: 'Launch page',
    hero: `${title} is live`,
    body: 'Use this layout for a focused landing page: one hook, one value proposition, and one action that moves the visitor forward.',
    ctaLabel: 'Open site'
  };
}

function escapeHtmlValue(raw = '') {
  return String(raw)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeSiteUrl(raw, max = 600) {
  const value = sanitizeText(raw, max);
  if (!value) return '';
  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(value) ? value : '';
}

function sanitizeSiteAssetUrl(raw, max = 1600) {
  const value = sanitizeText(raw, max);
  if (!value) return '';
  return /^(https?:\/\/|\/|data:image\/)/i.test(value) ? value : '';
}

function sanitizeSiteConfig(raw = {}, fallback = {}) {
  const source = ensureObject(raw);
  const prev = ensureObject(fallback);
  const themePreset = ['platform', 'clean', 'editorial', 'noir'].includes(source.themePreset)
    ? source.themePreset
    : (['platform', 'clean', 'editorial', 'noir'].includes(prev.themePreset) ? prev.themePreset : 'platform');
  const preset = SITE_THEME_PRESETS[themePreset] || SITE_THEME_PRESETS.platform;
  const accent = sanitizeHexColor(source.accent || prev.accent || preset.accent, preset.accent);
  const bg = sanitizeHexColor(source.bg || source.background || prev.bg || prev.background || preset.bg, preset.bg);
  const surface = sanitizeHexColor(source.surface || source.windowColor || prev.surface || prev.windowColor || preset.surface, preset.surface);
  const text = sanitizeHexColor(source.text || prev.text || preset.text, preset.text);
  const muted = sanitizeHexColor(source.muted || prev.muted || preset.muted, preset.muted);
  return {
    intent: siteIntent(source.intent, siteIntent(prev.intent || 'launch')),
    themePreset,
    accent,
    bg,
    surface,
    windowColor: surface,
    text,
    muted,
    font: ['system', 'serif', 'mono', 'rounded'].includes(source.font) ? source.font : (['system', 'serif', 'mono', 'rounded'].includes(prev.font) ? prev.font : 'system'),
    radiusStyle: ['soft', 'round', 'sharp'].includes(source.radiusStyle) ? source.radiusStyle : (['soft', 'round', 'sharp'].includes(prev.radiusStyle) ? prev.radiusStyle : 'soft'),
    maxWidth: ['narrow', 'normal', 'wide', 'full'].includes(source.maxWidth) ? source.maxWidth : (['narrow', 'normal', 'wide', 'full'].includes(prev.maxWidth) ? prev.maxWidth : 'normal'),
    polishMode: ['wrap', 'css-only', 'none'].includes(source.polishMode) ? source.polishMode : (['wrap', 'css-only', 'none'].includes(prev.polishMode) ? prev.polishMode : 'wrap'),
    brandName: sanitizeText(source.brandName ?? prev.brandName ?? BRAND_WORDMARK, 80) || BRAND_WORDMARK,
    tagline: sanitizeText(source.tagline ?? prev.tagline ?? '', 140),
    logoUrl: sanitizeSiteAssetUrl(source.logoUrl ?? prev.logoUrl ?? '', 1600),
    faviconUrl: sanitizeSiteAssetUrl(source.faviconUrl ?? prev.faviconUrl ?? '', 1600),
    hero: sanitizeText(source.hero ?? prev.hero ?? '', 180),
    eyebrow: sanitizeText(source.eyebrow ?? prev.eyebrow ?? '', 40),
    body: sanitizeText(source.body ?? source.about ?? prev.body ?? prev.about ?? '', 6000),
    ctaLabel: sanitizeText(source.ctaLabel ?? prev.ctaLabel ?? 'Open site', 40) || 'Open site',
    ctaHref: sanitizeSiteUrl(source.ctaHref ?? prev.ctaHref ?? '', 300),
    contact: sanitizeText(source.contact ?? prev.contact ?? '', 220),
    supportEmail: sanitizeText(source.supportEmail ?? prev.supportEmail ?? '', 120).toLowerCase(),
    phone: sanitizeText(source.phone ?? prev.phone ?? '', 60),
    address: sanitizeText(source.address ?? prev.address ?? '', 180),
    legalName: sanitizeText(source.legalName ?? prev.legalName ?? '', 120),
    privacyUrl: sanitizeSiteUrl(source.privacyUrl ?? prev.privacyUrl ?? '', 300),
    termsUrl: sanitizeSiteUrl(source.termsUrl ?? prev.termsUrl ?? '', 300),
    schemaType: ['Person', 'Organization', 'LocalBusiness'].includes(source.schemaType) ? source.schemaType : (['Person', 'Organization', 'LocalBusiness'].includes(prev.schemaType) ? prev.schemaType : 'Organization'),
    seoTitle: sanitizeText(source.seoTitle ?? prev.seoTitle ?? '', 140),
    seoDescription: sanitizeText(source.seoDescription ?? prev.seoDescription ?? '', 320),
    seoKeywords: sanitizeText(source.seoKeywords ?? prev.seoKeywords ?? '', 240),
    canonicalUrl: sanitizeSiteUrl(source.canonicalUrl ?? prev.canonicalUrl ?? '', 400),
    ogImageUrl: sanitizeSiteAssetUrl(source.ogImageUrl ?? prev.ogImageUrl ?? '', 1600),
    indexingMode: ['auto', 'index', 'noindex'].includes(source.indexingMode) ? source.indexingMode : (['auto', 'index', 'noindex'].includes(prev.indexingMode) ? prev.indexingMode : 'auto'),
    links: ensureArray(source.links ?? prev.links).map((item) => ({
      label: sanitizeText(item?.label, 40),
      href: sanitizeSiteUrl(item?.href, 300)
    })).filter((item) => item.label && item.href),
    gallery: ensureArray(source.gallery ?? prev.gallery).map((value) => sanitizeSiteAssetUrl(value, 1600)).filter(Boolean).slice(0, 8),
    customCss: sanitizeText(source.customCss ?? prev.customCss ?? '', 8000)
  };
}

function siteFontStack(font = 'system') {
  return {
    system: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    serif: 'Iowan Old Style, Georgia, "Times New Roman", serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    rounded: '"Trebuchet MS", "Avenir Next", "Segoe UI", sans-serif'
  }[font] || 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
}

function siteRadiusValue(style = 'soft') {
  return { sharp: 12, soft: 24, round: 36 }[style] || 24;
}

function siteMaxWidthValue(size = 'normal') {
  return { narrow: '860px', normal: '1040px', wide: '1220px', full: '1440px' }[size] || '1040px';
}

function siteColorScheme(config) {
  const value = String(config?.bg || '#05070d').replace('#', '');
  const hex = value.length === 3 ? value.split('').map((char) => char + char).join('') : value;
  const num = Number.parseInt(hex.slice(0, 6), 16);
  if (Number.isNaN(num)) return 'dark';
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? 'light' : 'dark';
}

function emptyStore() {
  return {
    version: 3,
    seq: {
      users: 0, sessions: 0, projects: 0, posts: 0, comments: 0, likes: 0,
      workspaces: 0, rooms: 0, invites: 0, messages: 0, tasks: 0, sites: 0,
      stickerPacks: 0, stickers: 0, notifications: 0, follows: 0,
      friendRequests: 0, verificationRequests: 0,
      reactions: 0, pinnedMessages: 0, auditLogs: 0, botTokens: 0,
      readReceipts: 0, typingEvents: 0
    },
    users: [], sessions: [], projects: [], posts: [], comments: [], likes: [],
    workspaces: [], rooms: [], invites: [], messages: [], tasks: [], sites: [],
    stickerPacks: [], stickers: [], notifications: [], follows: [],
    friendRequests: [], verificationRequests: [],
    reactions: [],       // { id, messageId, userId, emoji, createdAt }
    pinnedMessages: [],  // { id, roomId, messageId, pinnedByUserId, createdAt }
    auditLogs: [],       // { id, workspaceId, userId, action, target, meta, createdAt }
    botTokens: [],       // { id, userId, name, tokenHash, permissions[], createdAt }
    readReceipts: [],    // { userId, roomId, lastReadMessageId, updatedAt }
    rateLimits: {}       // { key: { count, resetAt } } — in-memory, not persisted
  };
}

function nextId(store, key) {
  store.seq[key] = Number(store.seq[key] || 0) + 1;
  return store.seq[key];
}

function userDefaults(user) {
  const displayName = sanitizeText(user.displayName || user.handle, 60) || 'Member';
  const handle = cleanHandle(user.handle || displayName);
  const privacy = ensureObject(user.privacy);
  const settings = ensureObject(user.settings || user.prefs);
  const links = ensureObject(user.links);
  const security = ensureObject(user.security);
  const billing = ensureObject(user.billing);
  return {
    id: Number(user.id || 0),
    displayName,
    handle,
    handleCanonical: canonicalHandle(handle),
    email: sanitizeText(user.email || '', 120).toLowerCase(),
    googleSub: sanitizeText(user.googleSub || '', 120),
    discordSub: sanitizeText(user.discordSub || '', 120),
    passwordHash: String(user.passwordHash || ''),
    roleInternal: String(user.roleInternal || user.role || 'member'),
    bio: sanitizeText(user.bio || '', 420),
    avatarUrl: sanitizeText(user.avatarUrl || '', 300),
    bannerUrl: sanitizeText(user.bannerUrl || '', 300),
    accent: sanitizeText(user.accent || 'violet', 24),
    accentCustom: user.accentCustom && typeof user.accentCustom === 'object' ? {
      from: sanitizeText(user.accentCustom.from || '', 16),
      to: sanitizeText(user.accentCustom.to || '', 16),
      gradient: user.accentCustom.gradient !== false
    } : null,
    badges: cleanBadges(user.badges || user.badgeCodes || (String(user.roleInternal || user.role || '').includes('owner') ? ['DEV'] : ['USR'])),
    links: {
      website: sanitizeText(links.website || '', 180),
      github: sanitizeText(links.github || '', 120),
      discord: sanitizeText(links.discord || '', 120),
      telegram: sanitizeText(links.telegram || '', 120),
      steam: sanitizeText(links.steam || '', 120),
      instagram: sanitizeText(links.instagram || '', 120),
      youtube: sanitizeText(links.youtube || '', 120)
    },
    settings: {
      reducedMotion: Boolean(settings.reducedMotion),
      compactMode: Boolean(settings.compactMode),
      highContrast: Boolean(settings.highContrast),
      desktopPush: settings.desktopPush !== false,
      soundNotifications: settings.soundNotifications !== false,
      autoplayMedia: Boolean(settings.autoplayMedia),
      enterToSend: settings.enterToSend !== false,
      chatDensity: ['comfortable', 'compact'].includes(settings.chatDensity) ? settings.chatDensity : 'comfortable',
      showUnreadBadge: settings.showUnreadBadge !== false,
      sendReadReceipts: settings.sendReadReceipts !== false,
      showTyping: settings.showTyping !== false,
      messageStyle: ['soft', 'glass', 'minimal'].includes(settings.messageStyle) ? settings.messageStyle : 'soft',
      chatThemeGlobal: sanitizeChatTheme(settings.chatThemeGlobal, null),
      chatThemesByRoom: sanitizeChatThemeMap(settings.chatThemesByRoom)
    },
    security: {
      publicKeyJwk: security.publicKeyJwk || null,
      publicKeyAlgo: sanitizeText(security.publicKeyAlgo || 'ECDH-P256', 40)
    },
    status: String(user.status || 'offline'),
    themePreference: String(user.themePreference || settings.theme || 'dark'),
    languagePreference: String(user.languagePreference || settings.language || 'en'),
    privacy: {
      showEmail: Boolean(privacy.showEmail),
      showRole: Boolean(privacy.showRole),
      showActivity: privacy.showActivity !== false,
      showFollowers: privacy.showFollowers !== false,
      showLastSeen: Boolean(privacy.showLastSeen),
      profileVisibility: ['public', 'handle-only', 'private'].includes(privacy.profileVisibility) ? privacy.profileVisibility : (user.isHidden ? 'handle-only' : 'public'),
      allowInvites: privacy.allowInvites !== false,
      allowDirectMessages: ['everyone', 'followers', 'nobody'].includes(privacy.allowDirectMessages) ? privacy.allowDirectMessages : 'everyone',
      allowFriendRequests: privacy.allowFriendRequests !== false
    },
    billing: {
      planId: sanitizeText(billing.planId || '', 24),
      startedAt: billing.startedAt || null,
      renewsAt: billing.renewsAt || null,
      storageLimitMB: Number(billing.storageLimitMB || 0)
    },
    createdAt: user.createdAt || nowIso(),
    updatedAt: user.updatedAt || user.createdAt || nowIso(),
    emailVerified: user.emailVerified !== false,
    lastSeenAt: user.lastSeenAt || user.updatedAt || user.createdAt || nowIso(),
    bannedAt: user.bannedAt || null,
    banReason: sanitizeText(user.banReason || '', 300),
    typingIn: user.typingIn || null,
    typingAt: user.typingAt || null
  };
}

function projectDefaults(project) {
  return {
    id: Number(project.id || 0),
    userId: Number(project.userId || project.ownerUserId || 0),
    slug: slugify(project.slug || project.title),
    title: sanitizeText(project.title || 'Untitled project', 90),
    summary: sanitizeText(project.summary || '', 220),
    description: sanitizeText(project.description || project.body || '', 7000),
    visibility: String(project.visibility || 'public'),
    featured: Boolean(project.featured),
    siteId: project.siteId ? Number(project.siteId) : null,
    coverUrl: sanitizeText(project.coverUrl || '', 300),
    category: sanitizeText(project.category || 'project', 30),
    tags: ensureArray(project.tags).map((tag) => sanitizeText(tag, 20)).filter(Boolean),
    createdAt: project.createdAt || nowIso(),
    updatedAt: project.updatedAt || project.createdAt || nowIso()
  };
}

function postDefaults(post) {
  return {
    id: Number(post.id || 0),
    userId: Number(post.userId || 0),
    projectId: post.projectId ? Number(post.projectId) : null,
    kind: String(post.kind || 'quick'),
    title: sanitizeText(post.title || '', 120),
    body: sanitizeText(post.body || '', 6000),
    excerpt: sanitizeText(post.excerpt || '', 220),
    attachment: post.attachment || {
      name: sanitizeText(post.attachmentName || '', 90),
      url: sanitizeText(post.attachmentUrl || '', 600),
      type: sanitizeText(post.attachmentType || '', 30),
      width: Number(post.attachmentWidth || 0),
      height: Number(post.attachmentHeight || 0)
    },
    stickerId: post.stickerId ? Number(post.stickerId) : null,
    status: String(post.status || 'published'),
    scheduledFor: post.scheduledFor || null,
    publishedAt: post.publishedAt || post.createdAt || nowIso(),
    createdAt: post.createdAt || nowIso(),
    updatedAt: post.updatedAt || post.createdAt || nowIso()
  };
}

function commentDefaults(comment) {
  return {
    id: Number(comment.id || 0),
    postId: Number(comment.postId || 0),
    userId: Number(comment.userId || 0),
    body: sanitizeText(comment.body || '', 1800),
    stickerId: comment.stickerId ? Number(comment.stickerId) : null,
    createdAt: comment.createdAt || nowIso(),
    updatedAt: comment.updatedAt || comment.createdAt || nowIso()
  };
}

function workspaceDefaults(workspace) {
  const memberIds = ensureArray(workspace.memberIds).map(Number).filter(Boolean);
  return {
    id: Number(workspace.id || 0),
    slug: slugify(workspace.slug || workspace.title),
    title: sanitizeText(workspace.title || 'Workspace', 80),
    description: sanitizeText(workspace.description || '', 300),
    visibility: String(workspace.visibility || 'open'),
    ownerUserId: Number(workspace.ownerUserId || workspace.createdByUserId || 0),
    memberIds,
    memberRoles: ensureRoleMap(workspace.memberRoles, memberIds),
    accent: sanitizeText(workspace.accent || 'violet', 24),
    icon: sanitizeText(workspace.icon || '', 32),
    avatarUrl: sanitizeText(workspace.avatarUrl || '', 300),
    createdAt: workspace.createdAt || nowIso(),
    updatedAt: workspace.updatedAt || workspace.createdAt || nowIso()
  };
}

function roomDefaults(room) {
  const memberIds = ensureArray(room.memberIds).map(Number).filter(Boolean);
  const legacySurface = room.kind === 'direct' ? 'personal' : (room.workspaceId ? 'workspace' : 'group');
  const surface = ['personal', 'work', 'group', 'workspace'].includes(room.surface) ? room.surface : legacySurface;
  return {
    id: Number(room.id || 0),
    workspaceId: room.workspaceId ? Number(room.workspaceId) : null,
    slug: slugify(room.slug || room.title),
    title: sanitizeText(room.title || 'Channel', 90),
    description: sanitizeText(room.description || '', 220),
    kind: String(room.kind || (surface in {personal:1, work:1} ? 'direct' : 'channel')),
    surface,
    visibility: String(room.visibility || (surface === 'group' ? 'private' : 'open')),
    createdByUserId: Number(room.createdByUserId || room.ownerUserId || 0),
    ownerUserId: Number(room.ownerUserId || room.createdByUserId || 0),
    memberIds,
    memberRoles: ensureRoleMap(room.memberRoles, memberIds),
    avatarUrl: sanitizeText(room.avatarUrl || '', 300),
    tags: ensureArray(room.tags).map((tag) => sanitizeText(tag, 20)).filter(Boolean),
    permissions: sanitizeRoomPermissions(room.permissions),
    subscription: sanitizeRoomSubscription(room.subscription),
    relevanceScore: Number(room.relevanceScore || 0),
    archivedByUserIds: ensureArray(room.archivedByUserIds).map(Number).filter(Boolean),
    pinnedByUserIds: ensureArray(room.pinnedByUserIds).map(Number).filter(Boolean),
    mutedByUserIds: ensureArray(room.mutedByUserIds).map(Number).filter(Boolean),
    createdAt: room.createdAt || nowIso(),
    updatedAt: room.updatedAt || room.createdAt || nowIso(),
    lastActivityAt: room.lastActivityAt || room.updatedAt || room.createdAt || nowIso()
  };
}

function messageDefaults(message) {
  const attachment = message.attachment || (message.attachmentUrl || message.attachmentName ? {
    name: sanitizeText(message.attachmentName || '', 90),
    url: sanitizeText(message.attachmentUrl || '', 600),
    type: sanitizeText(message.attachmentType || '', 30),
    width: Number(message.attachmentWidth || 0),
    height: Number(message.attachmentHeight || 0)
  } : null);
  return {
    id: Number(message.id || 0),
    roomId: Number(message.roomId || 0),
    userId: Number(message.userId || 0),
    body: sanitizeText(message.body || '', 4000),
    attachment,
    attachments: Array.isArray(message.attachments) ? message.attachments : [],
    stickerId: message.stickerId ? Number(message.stickerId) : null,
    replyToId: message.replyToId ? Number(message.replyToId) : null,
    clientNonce: sanitizeText(message.clientNonce || '', 80),
    encrypted: Boolean(message.encrypted),
    ciphertext: sanitizeText(message.ciphertext || '', 50000),
    iv: sanitizeText(message.iv || '', 400),
    confirmedAt: message.confirmedAt || null,
    confirmedByUserId: message.confirmedByUserId ? Number(message.confirmedByUserId) : null,
    editedAt: message.editedAt || null,
    deletedAt: message.deletedAt || null,
    createdAt: message.createdAt || nowIso(),
    updatedAt: message.updatedAt || message.createdAt || nowIso()
  };
}

function taskDefaults(task) {
  return {
    id: Number(task.id || 0),
    workspaceId: Number(task.workspaceId || 0),
    roomId: task.roomId ? Number(task.roomId) : null,
    title: sanitizeText(task.title || 'Untitled task', 120),
    description: sanitizeText(task.description || '', 1200),
    dueAt: task.dueAt || null,
    isUnlimited: Boolean(task.isUnlimited),
    status: String(task.status || 'open'),
    createdByUserId: Number(task.createdByUserId || 0),
    assigneeUserIds: ensureArray(task.assigneeUserIds || (task.assigneeUserId ? [task.assigneeUserId] : [])).map(Number).filter(Boolean),
    createdAt: task.createdAt || nowIso(),
    updatedAt: task.updatedAt || task.createdAt || nowIso()
  };
}

function siteDefaults(site) {
  return {
    id: Number(site.id || 0),
    userId: Number(site.userId || 0),
    projectId: site.projectId ? Number(site.projectId) : null,
    slug: slugify(site.slug || site.title),
    title: sanitizeText(site.title || 'Untitled site', 100),
    summary: sanitizeText(site.summary || '', 240),
    visibility: String(site.visibility || 'public'),
    mode: String(site.mode || 'template'),
    uploadMode: site.mode === 'upload' ? (site.uploadMode === 'archive' ? 'archive' : 'html') : '',
    htmlPath: sanitizeText(site.htmlPath || '', 200),
    bundleRoot: sanitizeText(site.bundleRoot || '', 200),
    templateConfig: ensureObject(site.templateConfig),
    reviewStatus: ['draft', 'pending', 'approved', 'rejected'].includes(site.reviewStatus) ? site.reviewStatus : 'draft',
    reviewNote: sanitizeText(site.reviewNote || '', 500),
    createdAt: site.createdAt || nowIso(),
    updatedAt: site.updatedAt || site.createdAt || nowIso()
  };
}

function stickerPackDefaults(pack) {
  return {
    id: Number(pack.id || 0),
    userId: Number(pack.userId || 0),
    title: sanitizeText(pack.title || 'Pack', 80),
    slug: slugify(pack.slug || pack.title),
    createdAt: pack.createdAt || nowIso(),
    updatedAt: pack.updatedAt || pack.createdAt || nowIso()
  };
}

function stickerDefaults(sticker) {
  return {
    id: Number(sticker.id || 0),
    packId: Number(sticker.packId || 0),
    userId: Number(sticker.userId || 0),
    name: sanitizeText(sticker.name || 'Sticker', 60),
    mimeType: sanitizeText(sticker.mimeType || 'image/svg+xml', 80),
    dataUrl: sanitizeText(sticker.dataUrl || '', IMAGE_UPLOAD_LIMIT_BYTES * 2),
    createdAt: sticker.createdAt || nowIso(),
    updatedAt: sticker.updatedAt || sticker.createdAt || nowIso()
  };
}

function notificationDefaults(item) {
  return {
    id: Number(item.id || 0),
    userId: Number(item.userId || 0),
    title: sanitizeText(item.title || 'Notification', 120),
    body: sanitizeText(item.body || '', 320),
    href: sanitizeText(item.href || '', 200),
    kind: sanitizeText(item.kind || 'info', 24),
    createdAt: item.createdAt || nowIso(),
    readAt: item.readAt || null
  };
}

function migrateStore(raw = {}) {
  const store = emptyStore();
  const merged = { ...store, ...raw };
  merged.users = ensureArray(raw.users).map(userDefaults);
  merged.sessions = ensureArray(raw.sessions).map((session) => ({
    tokenHash: String(session.tokenHash || ''),
    userId: Number(session.userId || 0),
    createdAt: session.createdAt || nowIso(),
    expiresAt: session.expiresAt || futureIso(SESSION_TTL_MS)
  })).filter((session) => session.tokenHash && session.userId);
  merged.projects = ensureArray(raw.projects).map(projectDefaults);
  merged.posts = ensureArray(raw.posts).map(postDefaults);
  merged.comments = ensureArray(raw.comments).map(commentDefaults);
  merged.likes = ensureArray(raw.likes).map((like, index) => ({ id: Number(like.id || index + 1), postId: Number(like.postId || 0), userId: Number(like.userId || 0), createdAt: like.createdAt || nowIso() })).filter((like) => like.postId && like.userId);
  merged.workspaces = ensureArray(raw.workspaces).map(workspaceDefaults);
  merged.rooms = ensureArray(raw.rooms).map(roomDefaults);
  const rawMessages = ensureArray(raw.messages).length ? raw.messages : ensureArray(raw.roomMessages);
  merged.messages = rawMessages.map(messageDefaults);
  merged.invites = ensureArray(raw.invites).map((invite) => ({
    id: Number(invite.id || 0),
    workspaceId: invite.workspaceId ? Number(invite.workspaceId) : null,
    roomId: invite.roomId ? Number(invite.roomId) : null,
    code: sanitizeText(invite.code || '', 32),
    createdByUserId: Number(invite.createdByUserId || 0),
    createdAt: invite.createdAt || nowIso(),
    expiresAt: invite.expiresAt || futureIso(1000 * 60 * 60 * 24 * 7)
  })).filter((invite) => invite.code);
  merged.tasks = ensureArray(raw.tasks).map(taskDefaults);
  merged.sites = ensureArray(raw.sites || raw.userPages).map(siteDefaults);
  merged.stickerPacks = ensureArray(raw.stickerPacks).map(stickerPackDefaults);
  merged.stickers = ensureArray(raw.stickers).map(stickerDefaults);
  merged.notifications = ensureArray(raw.notifications).map(notificationDefaults);
  merged.follows = ensureArray(raw.follows).map((item) => ({
    id: Number(item.id || 0),
    followerUserId: Number(item.followerUserId || item.userId || 0),
    targetUserId: Number(item.targetUserId || item.followingUserId || 0),
    createdAt: item.createdAt || nowIso()
  })).filter((item) => item.followerUserId && item.targetUserId && item.followerUserId !== item.targetUserId);
  merged.friendRequests = ensureArray(raw.friendRequests || raw.friends).map((item) => ({
    id: Number(item.id || 0),
    fromUserId: Number(item.fromUserId || item.userId || 0),
    toUserId: Number(item.toUserId || item.targetUserId || 0),
    status: ['pending', 'accepted', 'denied'].includes(item.status) ? item.status : 'accepted',
    createdAt: item.createdAt || nowIso(),
    respondedAt: item.respondedAt || (item.status === 'accepted' ? item.createdAt || nowIso() : null)
  })).filter((item) => item.fromUserId && item.toUserId && item.fromUserId !== item.toUserId);
  merged.verificationRequests = ensureArray(raw.verificationRequests).map((item) => ({
    id: Number(item.id || 0),
    userId: Number(item.userId || 0),
    requestedBadge: cleanBadges([item.requestedBadge || 'VRF'])[0] || 'VRF',
    reason: sanitizeText(item.reason || '', 1200),
    links: ensureArray(item.links).map((link) => sanitizeText(link, 160)).filter(Boolean),
    status: ['pending', 'approved', 'denied'].includes(item.status) ? item.status : 'pending',
    createdAt: item.createdAt || nowIso(),
    decidedAt: item.decidedAt || null,
    decidedByUserId: item.decidedByUserId ? Number(item.decidedByUserId) : null
  })).filter((item) => item.userId);
  merged.seq = { ...store.seq, ...(raw.seq || {}) };

  const maxMap = {
    users: merged.users,
    projects: merged.projects,
    posts: merged.posts,
    comments: merged.comments,
    likes: merged.likes,
    workspaces: merged.workspaces,
    rooms: merged.rooms,
    invites: merged.invites,
    messages: merged.messages,
    tasks: merged.tasks,
    sites: merged.sites,
    stickerPacks: merged.stickerPacks,
    stickers: merged.stickers,
    notifications: merged.notifications,
    follows: merged.follows,
    friendRequests: merged.friendRequests,
    verificationRequests: merged.verificationRequests
  };
  for (const [key, list] of Object.entries(maxMap)) {
    merged.seq[key] = Math.max(Number(merged.seq[key] || 0), ...list.map((item) => Number(item.id || 0)), 0);
  }

  // migrate legacy default sticker pack away from eye-like signals
  for (const pack of merged.stickerPacks) {
    if (pack.slug === 'signals') {
      pack.title = 'Markers';
      pack.slug = 'markers';
    }
  }
  for (const sticker of merged.stickers) {
    if (!sticker.dataUrl || sticker.dataUrl.includes('M35 72c10-19')) {
      const palette = ['violet', 'blue', 'amber', 'coral'][Number(sticker.id || 0) % 4];
      sticker.name = ['Pulse', 'Fold', 'Beam', 'Trace'][Number(sticker.id || 0) % 4];
      sticker.dataUrl = createDefaultStickerSvg(palette, sticker.name);
      sticker.mimeType = 'image/svg+xml';
    }
  }
  return merged;
}

function loadStore() {
  if (!existsSync(storePath)) return emptyStore();
  try {
    return migrateStore(JSON.parse(readFileSync(storePath, 'utf8')));
  } catch {
    return emptyStore();
  }
}

function saveStore(store) {
  const tmp = `${storePath}.tmp`;
  writeFileSync(tmp, JSON.stringify(store, null, 2), 'utf8');
  renameSync(tmp, storePath);
}

function ensureDoctype(html) {
  const trimmed = String(html || '').replace(/^\uFEFF/, '').trimStart();
  if (/^<!doctype\s+html/i.test(trimmed)) return trimmed;
  return `<!DOCTYPE html>\n${trimmed}`;
}

function safeSiteBundlePath(raw = '') {
  const value = String(raw || '').replace(/\\/g, '/').trim();
  if (!value) return '';
  const stripped = value.replace(/^\/+/, '').split('?')[0].split('#')[0];
  if (!stripped) return '';
  const normalized = path.posix.normalize(stripped);
  if (!normalized || normalized === '.' || normalized.startsWith('../') || path.posix.isAbsolute(normalized)) return '';
  return normalized;
}

function siteBundleDirName(siteId) {
  return `site-${Number(siteId)}`;
}

function siteUsesBundle(site) {
  return Boolean(site?.mode === 'upload' && String(site?.bundleRoot || '').trim());
}

function siteBundleAbsPath(site, assetPath = '') {
  const root = resolveDataPath(site?.bundleRoot || '');
  if (!root) return null;
  const relativeAsset = safeSiteBundlePath(assetPath || '');
  if (!relativeAsset) return root;
  const absPath = path.resolve(root, relativeAsset);
  if (absPath === root || !absPath.startsWith(`${root}${path.sep}`)) return null;
  return absPath;
}

function ensureSiteFile(siteId, html) {
  const fileName = `site-${siteId}.html`;
  const absPath = path.join(sitesDir, fileName);
  writeFileSync(absPath, ensureDoctype(html), 'utf8');
  return `sites/${fileName}`;
}

function ensureSiteBundle(siteId, files = []) {
  const dirName = siteBundleDirName(siteId);
  const bundleAbsPath = path.join(sitesDir, dirName);
  rmSync(bundleAbsPath, { recursive: true, force: true });
  mkdirSync(bundleAbsPath, { recursive: true });
  let totalBytes = 0;
  const written = [];
  for (const file of files) {
    const relativePath = safeSiteBundlePath(file?.path || '');
    if (!relativePath) continue;
    const rawContent = file?.content;
    const buffer = Buffer.isBuffer(rawContent) ? rawContent : Buffer.from(String(rawContent || ''), 'utf8');
    totalBytes += buffer.length;
    if (totalBytes > SITE_ZIP_LIMIT_BYTES * 6) throw new Error('Archive expands to an unsupported size.');
    const absPath = path.join(bundleAbsPath, relativePath);
    mkdirSync(path.dirname(absPath), { recursive: true });
    if (relativePath.toLowerCase().endsWith('.html')) writeFileSync(absPath, ensureDoctype(buffer.toString('utf8')), 'utf8');
    else writeFileSync(absPath, buffer);
    written.push(relativePath);
  }
  if (!written.includes('index.html')) throw new Error('Archive must contain index.html at its root.');
  return {
    htmlPath: `sites/${dirName}/index.html`,
    bundleRoot: `sites/${dirName}`,
    files: written
  };
}

function extractZipSiteBundle(siteId, zipBuffer) {
  if (!zipBuffer?.length) throw new Error('ZIP file data required.');
  if (zipBuffer.length > SITE_ZIP_LIMIT_BYTES) throw new Error('ZIP file must be under 5 MB.');
  const zip = new AdmZip(zipBuffer);
  const entries = zip.getEntries().filter((entry) => !entry.isDirectory);
  const indexEntry = entries.find((entry) => {
    const normalized = safeSiteBundlePath(entry.entryName);
    return normalized && path.posix.basename(normalized).toLowerCase() === 'index.html';
  });
  if (!indexEntry) throw new Error('ZIP must contain an index.html file.');
  const indexPath = safeSiteBundlePath(indexEntry.entryName);
  const rootPrefix = indexPath ? indexPath.slice(0, -'index.html'.length) : '';
  const files = [];
  for (const entry of entries) {
    const normalizedEntry = safeSiteBundlePath(entry.entryName);
    if (!normalizedEntry) continue;
    if (rootPrefix && !normalizedEntry.startsWith(rootPrefix)) continue;
    const relativePath = safeSiteBundlePath(rootPrefix ? normalizedEntry.slice(rootPrefix.length) : normalizedEntry);
    if (!relativePath) continue;
    files.push({ path: relativePath, content: entry.getData() });
  }
  return ensureSiteBundle(siteId, files);
}

function parseTarOctal(raw = '') {
  const cleaned = String(raw || '').replace(/\0/g, '').trim();
  if (!cleaned) return 0;
  return Number.parseInt(cleaned, 8) || 0;
}

function extractTarEntries(buffer) {
  const files = [];
  let offset = 0;
  while (offset + 512 <= buffer.length) {
    const header = buffer.subarray(offset, offset + 512);
    if (!header.some((byte) => byte !== 0)) break;
    const name = String(header.subarray(0, 100)).replace(/\0.*$/, '');
    const prefix = String(header.subarray(345, 500)).replace(/\0.*$/, '');
    const size = parseTarOctal(String(header.subarray(124, 136)));
    const type = String.fromCharCode(header[156] || 48);
    const entryName = [prefix, name].filter(Boolean).join('/');
    const dataStart = offset + 512;
    const dataEnd = dataStart + size;
    if (dataEnd > buffer.length) throw new Error('Archive is truncated.');
    if (!['0', '\0'].includes(type)) {
      offset = dataStart + Math.ceil(size / 512) * 512;
      continue;
    }
    files.push({ path: entryName, content: Buffer.from(buffer.subarray(dataStart, dataEnd)) });
    offset = dataStart + Math.ceil(size / 512) * 512;
  }
  return files;
}

function extractTarSiteBundle(siteId, archiveBuffer) {
  if (!archiveBuffer?.length) throw new Error('Archive file data required.');
  const files = extractTarEntries(archiveBuffer);
  const normalizedEntries = files
    .map((file) => safeSiteBundlePath(file.path))
    .filter(Boolean);
  const indexPath = normalizedEntries.find((entry) => path.posix.basename(entry).toLowerCase() === 'index.html');
  if (!indexPath) throw new Error('Archive must contain an index.html file.');
  const rootPrefix = indexPath.slice(0, -'index.html'.length);
  return ensureSiteBundle(siteId, files
    .map((file) => {
      const normalized = safeSiteBundlePath(file.path);
      if (!normalized) return null;
      if (rootPrefix && !normalized.startsWith(rootPrefix)) return null;
      const relativePath = safeSiteBundlePath(rootPrefix ? normalized.slice(rootPrefix.length) : normalized);
      if (!relativePath) return null;
      return { path: relativePath, content: file.content };
    })
    .filter(Boolean));
}

function readArchiveDirFiles(absRoot, dir = absRoot) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readArchiveDirFiles(absRoot, absPath));
      continue;
    }
    files.push({
      path: path.relative(absRoot, absPath).replace(/\\/g, '/'),
      content: readFileSync(absPath)
    });
  }
  return files;
}

function preferred7zipBinary() {
  const envBinary = sanitizeText(process.env.SEVENZIP_BINARY || '', 500);
  if (envBinary && existsSync(envBinary)) return envBinary;
  try {
    const pkg = require('7zip-bin');
    const binary = pkg?.path7za || pkg?.path7zr || '';
    return binary && existsSync(binary) ? binary : '';
  } catch {
    return '';
  }
}

function extract7zSiteBundle(siteId, archiveBuffer) {
  const binary = preferred7zipBinary();
  if (!binary) {
    throw new Error('7z archives need a server-side extractor. Install 7zip-bin or set SEVENZIP_BINARY.');
  }
  try { chmodSync(binary, 0o755); } catch {}
  const tempRoot = mkdtempSync(path.join(tmpdir(), 'jb-site-7z-'));
  try {
    const archivePath = path.join(tempRoot, 'site.7z');
    const outDir = path.join(tempRoot, 'out');
    mkdirSync(outDir, { recursive: true });
    writeFileSync(archivePath, archiveBuffer);
    const result = spawnSync(binary, ['x', archivePath, `-o${outDir}`, '-y'], { encoding: 'utf8' });
    if (result.status !== 0) {
      throw new Error((result.stderr || result.stdout || '').trim() || 'Could not extract 7z archive.');
    }
    const files = readArchiveDirFiles(outDir);
    const normalizedEntries = files
      .map((file) => safeSiteBundlePath(file.path))
      .filter(Boolean);
    const indexPath = normalizedEntries.find((entry) => path.posix.basename(entry).toLowerCase() === 'index.html');
    if (!indexPath) throw new Error('Archive must contain an index.html file.');
    const rootPrefix = indexPath.slice(0, -'index.html'.length);
    return ensureSiteBundle(siteId, files
      .map((file) => {
        const normalized = safeSiteBundlePath(file.path);
        if (!normalized) return null;
        if (rootPrefix && !normalized.startsWith(rootPrefix)) return null;
        const relativePath = safeSiteBundlePath(rootPrefix ? normalized.slice(rootPrefix.length) : normalized);
        if (!relativePath) return null;
        return { path: relativePath, content: file.content };
      })
      .filter(Boolean));
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

function extractArchiveSiteBundle(siteId, archiveBuffer, archiveName = '') {
  const fileName = String(archiveName || '').trim().toLowerCase();
  const looksLikeZip = archiveBuffer[0] === 0x50 && archiveBuffer[1] === 0x4b;
  const looksLikeGzip = archiveBuffer[0] === 0x1f && archiveBuffer[1] === 0x8b;
  if (looksLikeZip || fileName.endsWith('.zip')) return extractZipSiteBundle(siteId, archiveBuffer);
  if (fileName.endsWith('.7z')) return extract7zSiteBundle(siteId, archiveBuffer);
  const maybeTar = looksLikeGzip || fileName.endsWith('.tgz') || fileName.endsWith('.tar.gz') || fileName.endsWith('.tar');
  if (maybeTar) {
    const tarBuffer = looksLikeGzip || fileName.endsWith('.tgz') || fileName.endsWith('.tar.gz')
      ? gunzipSync(archiveBuffer)
      : archiveBuffer;
    return extractTarSiteBundle(siteId, tarBuffer);
  }
  throw new Error('Unsupported archive format. Use ZIP, TAR, TAR.GZ or TGZ.');
}

function resolveDataPath(relativePath) {
  const normalized = String(relativePath || '').replace(/^[/\\]+/, '');
  if (!normalized) return null;
  const absoluteDataDir = path.resolve(dataDir);
  const absPath = path.resolve(absoluteDataDir, normalized);
  if (absPath === absoluteDataDir || !absPath.startsWith(`${absoluteDataDir}${path.sep}`)) return null;
  return absPath;
}

function readSiteFile(relativePath) {
  const absPath = resolveDataPath(relativePath);
  if (!absPath) return null;
  if (!existsSync(absPath)) return null;
  return readFileSync(absPath, 'utf8');
}

function removeSiteFile(relativePath) {
  const absPath = resolveDataPath(relativePath);
  if (!absPath) return;
  if (!existsSync(absPath)) return;
  const stats = statSync(absPath);
  if (stats.isDirectory()) rmSync(absPath, { recursive: true, force: true });
  else unlinkSync(absPath);
}

function removeSiteStoredContent(site) {
  if (!site) return;
  if (site.htmlPath) removeSiteFile(site.htmlPath);
  if (site.bundleRoot) removeSiteFile(site.bundleRoot);
}

const SITE_STUDIO_EDITABLE_EXTENSIONS = new Set([
  '.html', '.htm', '.css', '.js', '.mjs', '.cjs', '.json', '.svg', '.txt', '.md', '.xml', '.webmanifest'
]);

function siteStudioFileKind(relativePath = '') {
  const ext = path.posix.extname(String(relativePath || '').toLowerCase());
  if (['.html', '.htm'].includes(ext)) return 'html';
  if (ext === '.css') return 'css';
  if (['.js', '.mjs', '.cjs'].includes(ext)) return 'js';
  if (ext === '.svg') return 'svg';
  if (ext === '.json' || ext === '.webmanifest') return 'json';
  if (ext === '.md') return 'markdown';
  return 'text';
}

function siteStudioEditablePath(raw = '') {
  const relativePath = safeSiteBundlePath(raw);
  if (!relativePath) return '';
  if (path.posix.basename(relativePath).toUpperCase() === 'CNAME') return relativePath;
  const ext = path.posix.extname(relativePath).toLowerCase();
  return SITE_STUDIO_EDITABLE_EXTENSIONS.has(ext) ? relativePath : '';
}

function siteStudioFiles(site) {
  const files = siteUsesBundle(site)
    ? listBundleFiles(site.bundleRoot, 400)
    : (site.htmlPath ? ['index.html'] : []);
  return files.map((relativePath) => ({
    path: relativePath,
    kind: siteStudioFileKind(relativePath),
    editable: Boolean(siteStudioEditablePath(relativePath))
  }));
}

function ensureUploadSiteStudio(site) {
  if (!site || site.mode !== 'upload') {
    throw new Error('Code studio works only with uploaded static sites. Template sites stay visual-only.');
  }
}

function ensureBundleBackedUploadSite(site) {
  ensureUploadSiteStudio(site);
  if (siteUsesBundle(site)) return site;
  const currentHtml = readSiteFile(site.htmlPath) || '<!DOCTYPE html>\n<html><head><meta charset="UTF-8" /><title>Site</title></head><body></body></html>';
  const extracted = ensureSiteBundle(site.id, [{ path: 'index.html', content: currentHtml }]);
  if (site.htmlPath && site.htmlPath !== extracted.htmlPath) removeSiteFile(site.htmlPath);
  site.htmlPath = extracted.htmlPath;
  site.bundleRoot = extracted.bundleRoot;
  site.uploadMode = 'archive';
  return site;
}

function readSiteStudioText(site, rawPath = 'index.html') {
  ensureUploadSiteStudio(site);
  const relativePath = siteStudioEditablePath(rawPath);
  if (!relativePath) throw new Error('Only text-based files can be edited in studio.');
  if (siteUsesBundle(site)) {
    const absPath = siteBundleAbsPath(site, relativePath);
    if (!absPath || !existsSync(absPath)) throw new Error('File not found.');
    return readFileSync(absPath, 'utf8');
  }
  if (relativePath !== 'index.html') {
    throw new Error('Add a CSS/JS/SVG file once and this site will switch to bundle mode automatically.');
  }
  return readSiteFile(site.htmlPath) || '';
}

function writeSiteStudioText(site, rawPath = 'index.html', rawContent = '', { create = false } = {}) {
  ensureUploadSiteStudio(site);
  const relativePath = siteStudioEditablePath(rawPath);
  if (!relativePath) throw new Error('Only HTML, CSS, JS, JSON, SVG, markdown, XML and text files are supported.');
  const content = rawContent === undefined || rawContent === null ? '' : String(rawContent);
  if (relativePath === 'index.html' && !content.trim()) throw new Error('index.html cannot be empty.');
  if (Buffer.byteLength(content, 'utf8') > SITE_UPLOAD_LIMIT_BYTES) throw new Error('Studio text files must stay under 1 MB.');
  if (relativePath !== 'index.html') ensureBundleBackedUploadSite(site);
  if (siteUsesBundle(site)) {
    const absPath = siteBundleAbsPath(site, relativePath);
    if (!absPath) throw new Error('File path is invalid.');
    if (create && existsSync(absPath)) throw new Error('File already exists.');
    mkdirSync(path.dirname(absPath), { recursive: true });
    const nextContent = ['.html', '.htm'].includes(path.posix.extname(relativePath).toLowerCase()) ? ensureDoctype(content) : content;
    writeFileSync(absPath, nextContent, 'utf8');
    if (relativePath === 'index.html') site.htmlPath = `${site.bundleRoot}/index.html`;
    site.uploadMode = 'archive';
    return;
  }
  site.htmlPath = ensureSiteFile(site.id, content);
  site.bundleRoot = '';
  site.uploadMode = 'html';
}

function listBundleFiles(relativeRoot, limit = 32) {
  const absRoot = resolveDataPath(relativeRoot);
  if (!absRoot || !existsSync(absRoot)) return [];
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
        if (files.length >= limit) return;
        continue;
      }
      files.push(path.relative(absRoot, abs).replace(/\\/g, '/'));
      if (files.length >= limit) return;
    }
  };
  walk(absRoot);
  return files.sort((a, b) => a.localeCompare(b));
}

function collectSiteRelativeRefs(html = '') {
  const refs = new Set();
  const source = String(html || '');
  const patterns = [
    /<(?:script|img|iframe|audio|video|source)[^>]+\s(?:src|poster)=["']([^"']+)["']/gi,
    /<link[^>]+\shref=["']([^"']+)["']/gi,
    /<a[^>]+\shref=["']([^"']+)["']/gi
  ];
  for (const pattern of patterns) {
    let match = pattern.exec(source);
    while (match) {
      const raw = String(match[1] || '').trim();
      if (raw && !/^(?:[a-z]+:|\/\/|#|\/)/i.test(raw)) {
        const normalized = safeSiteBundlePath(raw);
        if (normalized) refs.add(normalized);
      }
      match = pattern.exec(source);
    }
  }
  return Array.from(refs).sort((a, b) => a.localeCompare(b));
}

function uploadedSiteDiagnostics(site, html = '') {
  if (!site || site.mode !== 'upload') return null;
  const variant = siteUsesBundle(site) || site.uploadMode === 'archive' ? 'archive' : 'html';
  const entryFile = siteUsesBundle(site) ? 'index.html' : path.posix.basename(String(site.htmlPath || 'index.html'));
  const relativeRefs = collectSiteRelativeRefs(html);
  const files = siteUsesBundle(site) ? listBundleFiles(site.bundleRoot) : (entryFile ? [entryFile] : []);
  const fileSet = new Set(files);
  const missingRefs = relativeRefs.filter((ref) => !fileSet.has(ref));
  return {
    variant,
    entryFile,
    fileCount: files.length,
    files,
    relativeRefs,
    missingRefs
  };
}

function saveDataImage(dataUrl, prefix = 'asset') {
  const value = safeDataUrl(dataUrl, IMAGE_UPLOAD_LIMIT_BYTES * 2, 'image');
  if (!value) return '';
  const match = value.match(/^data:(image\/[a-zA-Z0-9.+-]+)(?:;[a-zA-Z0-9=.+-]+)*;base64,(.+)$/);
  if (!match) return '';
  const mime = match[1];
  const ext = mime.includes('svg') ? 'svg' : mime.split('/')[1].replace('jpeg', 'jpg');
  const fileName = `${prefix}-${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`;
  const absPath = path.join(uploadsDir, fileName);
  writeFileSync(absPath, Buffer.from(match[2], 'base64'));
  return `/media/${fileName}`;
}

function saveDataAudio(dataUrl, prefix = 'voice') {
  const value = safeDataUrl(dataUrl, IMAGE_UPLOAD_LIMIT_BYTES * 4, 'audio');
  if (!value) return '';
  const match = value.match(/^data:(audio\/[a-zA-Z0-9.+-]+)(?:;[a-zA-Z0-9=.+-]+)*;base64,(.+)$/);
  if (!match) return '';
  const mime = match[1];
  const ext = mime.split('/')[1].split(';')[0].replace('mpeg', 'mp3').replace('x-m4a', 'm4a');
  const fileName = `${prefix}-${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`;
  const absPath = path.join(uploadsDir, fileName);
  writeFileSync(absPath, Buffer.from(match[2], 'base64'));
  return `/media/${fileName}`;
}

function svgDataUrl(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createDefaultStickerSvg(seed, label) {
  const colors = {
    violet: ['#8b5cf6', '#c4b5fd'],
    blue: ['#38bdf8', '#bfdbfe'],
    amber: ['#f59e0b', '#fde68a'],
    coral: ['#fb7185', '#fecdd3']
  }[seed] || ['#8b5cf6', '#c4b5fd'];
  const art = {
    violet: '<path d="M30 84c18-28 34-42 48-42 14 0 30 14 48 42" fill="none" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/>',
    blue: '<path d="M34 86 56 58l18 18 36-44" fill="none" stroke="#f8fafc" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
    amber: '<path d="M72 36v72M36 72h72" fill="none" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/>',
    coral: '<path d="M40 92c10-30 21-46 32-46 11 0 22 16 32 46" fill="none" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/>'
  }[seed] || '<path d="M36 72h72" fill="none" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/>';
  return svgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors[0]}" />
        <stop offset="100%" stop-color="${colors[1]}" />
      </linearGradient>
    </defs>
    <rect width="144" height="144" rx="34" fill="#0a0f18" />
    <rect x="18" y="18" width="108" height="108" rx="28" fill="url(#g)" opacity="0.92" />
    ${art}
    <text x="72" y="126" text-anchor="middle" font-family="Inter,Arial" font-size="12" fill="#f8fafc" opacity="0.82">${label}</text>
  </svg>`);
}

function buildIsolatedSiteHtml({ title, eyebrow, summary, body, accent = '#8b5cf6', ctaLabel = 'Read more', ctaHref = '/' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  ${adsenseHeadSnippet()}
  <style>
    :root {
      --bg: #05070d;
      --bg-soft: #111520;
      --line: rgba(255,255,255,0.1);
      --text: #f7f8fb;
      --muted: #a7afc1;
      --accent: ${accent};
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, system-ui, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 18%, transparent), transparent 40%),
        radial-gradient(circle at right center, rgba(255,255,255,0.06), transparent 28%),
        linear-gradient(180deg, #05070d, #0b1020 55%, #070910);
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }
    .site-shell {
      width: min(1120px, 100%);
      border: 1px solid var(--line);
      background: rgba(6, 10, 18, 0.78);
      backdrop-filter: blur(24px);
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,0.36);
    }
    .site-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 24px;
      border-bottom: 1px solid var(--line);
    }
    .site-brand { font-weight: 800; letter-spacing: -0.04em; font-size: 20px; }
    .site-back {
      color: var(--muted);
      text-decoration: none;
      font-size: 14px;
    }
    .hero {
      padding: clamp(28px, 5vw, 60px);
      display: grid;
      gap: 18px;
    }
    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--muted);
      font-size: 12px;
    }
    h1 {
      margin: 0;
      font-size: clamp(40px, 8vw, 82px);
      line-height: 0.94;
      letter-spacing: -0.065em;
      max-width: 12ch;
    }
    .summary { max-width: 60ch; color: var(--muted); font-size: 18px; line-height: 1.7; }
    .cta {
      display: inline-flex; align-items: center; gap: 10px;
      border-radius: 999px; padding: 13px 18px;
      background: color-mix(in srgb, var(--accent) 72%, black 8%);
      color: white; text-decoration: none; font-weight: 700; width: fit-content;
      box-shadow: 0 12px 32px color-mix(in srgb, var(--accent) 22%, transparent);
    }
    .body {
      padding: 0 clamp(28px, 5vw, 60px) clamp(32px, 5vw, 60px);
      display: grid;
      gap: 16px;
      color: #d7dce8;
      line-height: 1.75;
      max-width: 72ch;
    }
  </style>
</head>
<body>
  <main class="site-shell">
    <header class="site-head">
      <div class="site-brand">${BRAND_WORDMARK}</div>
      <a class="site-back" href="/">Back to platform</a>
    </header>
    <section class="hero">
      <div class="eyebrow">${eyebrow}</div>
      <h1>${title}</h1>
      <p class="summary">${summary}</p>
      <a class="cta" href="${ctaHref}">${ctaLabel}</a>
    </section>
    <section class="body">${body.split('\n').map((p) => `<p>${p}</p>`).join('')}</section>
  </main>
</body>
</html>`;
}

function siteWatermarkHtml(store, owner, site, innerHtml) {
  const renderedInner = ensureDoctype(innerHtml);
  const meta = siteMetaPayload(store, site, owner, renderedInner);
  const { config } = meta;
  const profilePath = `/@${owner?.handleCanonical || canonicalHandle(owner?.handle)}`;
  const encoded = Buffer.from(renderedInner, 'utf8').toString('base64');
  const launchIcon = meta.iconUrl
    ? `<span class="launch-site-icon"><img src="${meta.iconUrl}" alt="${escapeHtmlValue(site.title || 'Site')}" /></span>`
    : `<span class="launch-site-icon fallback">${escapeHtmlValue(avatarText(site.title || 'S'))}</span>`;
  const watermarkMark = meta.iconUrl
    ? `<span class="mark image"><img src="${meta.iconUrl}" alt="${escapeHtmlValue(site.title || 'Site')}" /></span>`
    : '<span class="mark"></span>';
  const iconLinks = siteIconLinks(meta);
  return `<!DOCTYPE html>
<html lang="${owner?.languagePreference || 'en'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title} — @${meta.ownerHandle} on ${escapeHtmlValue(config.brandName || BRAND_WORDMARK)}</title>
  <meta name="description" content="${meta.description}" />
  <meta name="robots" content="${meta.robots}" />
  ${meta.keywords ? `<meta name="keywords" content="${meta.keywords}" />` : ''}
  <meta name="theme-color" content="${config.accent}" />
  <link rel="canonical" href="${meta.canonical}" />
  <meta property="og:site_name" content="justbreath" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:url" content="${meta.canonical}" />
  <meta property="og:image" content="${meta.ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${meta.ogImage}" />
  ${iconLinks}
  <script type="application/ld+json">${meta.jsonLd}</script>
  ${adsenseHeadSnippet()}
  <style>
    :root {
      color-scheme: ${siteColorScheme(config)};
      --bg:#04070c;
      --panel:rgba(10,14,22,.82);
      --line:rgba(255,255,255,.1);
      --text:#f6f8fb;
      --muted:#a9b1c3;
      --accent:${config.accent};
    }
    *{box-sizing:border-box}
    html,body{margin:0;min-height:100%;background:var(--bg);color:var(--text);font-family:${siteFontStack(config.font)}}
    body{overflow:hidden}
    .frame{position:fixed;inset:0;border:0;width:100%;height:100%;background:#05070d;opacity:0;transition:opacity 260ms ease}
    .frame.live{opacity:1}
    .launch{position:fixed;inset:0;display:grid;place-items:center;background:radial-gradient(circle at 15% 15%, rgba(139,92,246,.15), transparent 30%),radial-gradient(circle at 82% 20%, rgba(56,189,248,.12), transparent 24%),rgba(4,7,12,.72);backdrop-filter:blur(16px);z-index:20;transition:opacity .28s ease, visibility .28s ease}
    .launch.hidden{opacity:0;visibility:hidden;pointer-events:none}
    .launch-card{width:min(560px, calc(100vw - 32px));padding:28px;border:1px solid var(--line);border-radius:28px;background:var(--panel);box-shadow:0 24px 80px rgba(0,0,0,.42);display:grid;gap:18px}
    .launch-brand{display:flex;align-items:center;gap:14px}
    .launch-site-icon{width:116px;height:116px;border-radius:32px;overflow:hidden;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);display:grid;place-items:center;flex:0 0 auto}
    .launch-site-icon img{width:100%;height:100%;object-fit:cover;display:block}
    .launch-site-icon.fallback{font-size:42px;font-weight:800}
    .launch-kicker{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
    .launch h1{margin:0;font-size:clamp(30px,6vw,54px);line-height:.95;letter-spacing:-.06em}
    .launch p{margin:0;color:var(--muted);line-height:1.7}
    .launch-actions{display:flex;flex-wrap:wrap;gap:12px}
    .button{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);text-decoration:none;font-weight:600}
    .button.primary{background:linear-gradient(135deg,var(--accent), color-mix(in srgb,var(--accent) 62%, #38bdf8));border:none}
    .watermark{position:fixed;right:18px;bottom:18px;z-index:30;display:inline-flex;align-items:center;gap:10px;padding:10px 14px;border-radius:999px;background:rgba(7,10,16,.78);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.14);color:#f6f8fb;text-decoration:none;font-size:13px;box-shadow:0 12px 34px rgba(0,0,0,.28);transition:opacity .24s ease, transform .24s ease, visibility .24s ease}
    .watermark.hidden{opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px)}
    .watermark .mark{width:22px;height:22px;border-radius:8px;background:linear-gradient(135deg,#8b5cf6,#38bdf8);display:block}
    .watermark .mark.image{overflow:hidden;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12)}
    .watermark .mark.image img{width:100%;height:100%;object-fit:cover;display:block}
    @media (max-width: 720px){.watermark{right:12px;bottom:12px;padding:9px 12px}.launch-card{padding:22px;border-radius:24px}}
  </style>
</head>
<body>
  <iframe id="site-frame" class="frame" sandbox="allow-scripts allow-forms allow-popups" referrerpolicy="strict-origin" loading="eager"></iframe>
  <div id="launch" class="launch">
    <div class="launch-card">
      <div class="launch-brand">${launchIcon}<div><div class="launch-kicker">${escapeHtmlValue(config.brandName || BRAND_WORDMARK)}</div><h1>${escapeHtmlValue(site.title || 'Creator site')}</h1></div></div>
      <p>${escapeHtmlValue(site.summary || config.tagline || 'This is an isolated creator site. It keeps its own layout and logic while staying connected to the justbreath ecosystem.')}</p>
      <div class="launch-actions">
        <button class="button primary" id="launch-button">Launch site</button>
        <a class="button" href="${profilePath}">Open creator profile</a>
      </div>
    </div>
  </div>
  <a class="watermark" href="/" title="Created with ${BRAND_WORDMARK}">${watermarkMark}<span>${BRAND_WORDMARK}</span></a>
  <script>
    const iframe = document.getElementById('site-frame');
    const launch = document.getElementById('launch');
    const watermark = document.querySelector('.watermark');
    const html = atob('${encoded}');
    iframe.srcdoc = html;
    document.getElementById('launch-button').addEventListener('click', () => {
      launch.classList.add('hidden');
      if (watermark) watermark.classList.add('hidden');
      iframe.classList.add('live');
    });
  </script>
</body>
</html>`;
}

function createBackupFile() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `store-${stamp}.json`;
  const dest = path.join(backupsDir, fileName);
  copyFileSync(storePath, dest);
  return `/backups/${fileName}`;
}

function ensureSeedData() {
  const store = loadStore();

  const ownerCanonical = canonicalHandle(OWNER_HANDLE);
  let owner = store.users.find((item) => item.handleCanonical === ownerCanonical);
  if (!owner) {
    owner = userDefaults({
      id: nextId(store, 'users'),
      displayName: OWNER_DISPLAY_NAME,
      handle: OWNER_HANDLE,
      email: OWNER_EMAIL,
      passwordHash: bcrypt.hashSync(OWNER_PASSWORD, 12),
      roleInternal: 'owner',
      bio: 'Creator profile for projects, devlogs, private chats and isolated presentation sites.',
      accent: 'violet',
      badges: ['DEV', 'VRF'],
      themePreference: 'dark',
      languagePreference: 'ru',
      emailVerified: true,
      status: 'active',
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
    store.users.push(owner);
  }

  const brandCanonical = canonicalHandle(BRAND_HANDLE);
  let brand = store.users.find((item) => item.handleCanonical === brandCanonical);
  if (!brand) {
    brand = userDefaults({
      id: nextId(store, 'users'),
      displayName: BRAND_DISPLAY_NAME,
      handle: BRAND_HANDLE,
      email: BRAND_EMAIL,
      passwordHash: bcrypt.hashSync(BRAND_PASSWORD, 12),
      roleInternal: 'owner',
      bio: 'Official justbreath profile for legal information, subscriptions and platform direction.',
      accent: 'blue',
      badges: ['VRF', 'STD'],
      themePreference: 'dark',
      languagePreference: 'en',
      emailVerified: true,
      status: 'active',
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
    store.users.push(brand);
  }

  // normalize legacy direct rooms
  for (const room of store.rooms) {
    if (room.kind === 'direct' && !['personal', 'work'].includes(room.surface)) {
      room.surface = 'personal';
      room.visibility = 'private';
      room.updatedAt = nowIso();
    }
  }

  const workspaceSeeds = [
    { slug: 'community', title: 'Community', description: 'Open discussion, discovery and public collaboration.', visibility: 'open', ownerUserId: brand.id, accent: 'violet', memberIds: [owner.id, brand.id] },
    { slug: 'studio', title: 'Studio', description: 'Project-facing collaboration, art direction and production notes.', visibility: 'private', ownerUserId: owner.id, accent: 'blue', memberIds: [owner.id, brand.id] },
    { slug: 'archive', title: 'Archive', description: 'Quiet internal rooms, notes and admin history.', visibility: 'secret', ownerUserId: owner.id, accent: 'amber', memberIds: [owner.id] }
  ];
  for (const seed of workspaceSeeds) {
    if (!store.workspaces.some((item) => item.slug === seed.slug)) {
      store.workspaces.push(workspaceDefaults({ id: nextId(store, 'workspaces'), memberRoles: { [seed.ownerUserId]: 'owner' }, createdAt: nowIso(), updatedAt: nowIso(), ...seed }));
    }
  }

  const community = store.workspaces.find((item) => item.slug === 'community');
  const studio = store.workspaces.find((item) => item.slug === 'studio');
  const archive = store.workspaces.find((item) => item.slug === 'archive');

  const roomSeeds = [
    { workspaceId: community?.id, slug: 'announcements', title: 'Announcements', description: 'Public release notes and important platform updates.', visibility: 'open', kind: 'channel', surface: 'workspace', createdByUserId: brand.id, ownerUserId: brand.id, memberIds: [owner.id, brand.id], tags: ['news', 'release'], relevanceScore: 95 },
    { workspaceId: community?.id, slug: 'lounge', title: 'Lounge', description: 'Open conversation for developers and creators.', visibility: 'open', kind: 'channel', surface: 'workspace', createdByUserId: brand.id, ownerUserId: brand.id, memberIds: [owner.id, brand.id], tags: ['chat', 'community'], relevanceScore: 88 },
    { workspaceId: studio?.id, slug: 'art-direction', title: 'Art Direction', description: 'Moodboards, UI critique and visual systems.', visibility: 'private', kind: 'channel', surface: 'workspace', createdByUserId: owner.id, ownerUserId: owner.id, memberIds: [owner.id, brand.id], tags: ['art', 'design'], relevanceScore: 76 },
    { workspaceId: studio?.id, slug: 'build-notes', title: 'Build Notes', description: 'Planning, tasks and implementation notes.', visibility: 'private', kind: 'channel', surface: 'workspace', createdByUserId: owner.id, ownerUserId: owner.id, memberIds: [owner.id, brand.id], tags: ['tasks', 'production'], relevanceScore: 72 },
    { workspaceId: null, slug: 'creator-circle', title: 'Creator Circle', description: 'Independent group for creators and close collaborators.', visibility: 'private', kind: 'group', surface: 'group', createdByUserId: owner.id, ownerUserId: owner.id, memberIds: [owner.id, brand.id], tags: ['group', 'friends'], relevanceScore: 61 }
  ];
  for (const seed of roomSeeds) {
    if (!store.rooms.some((room) => room.slug === seed.slug)) {
      store.rooms.push(roomDefaults({ id: nextId(store, 'rooms'), memberRoles: { [seed.ownerUserId]: 'owner', [brand.id]: 'member' }, avatarUrl: '', createdAt: nowIso(), updatedAt: nowIso(), lastActivityAt: nowIso(), ...seed }));
    }
  }

  const directSeeds = [
    { surface: 'personal', slug: `dm-personal-${[owner.handleCanonical, brand.handleCanonical].sort().join('--')}`, title: brand.displayName, description: 'Personal direct messages', createdByUserId: owner.id, ownerUserId: owner.id, memberIds: [owner.id, brand.id] },
    { surface: 'work', slug: `dm-work-${[owner.handleCanonical, brand.handleCanonical].sort().join('--')}`, title: brand.displayName, description: 'Work direct messages', createdByUserId: owner.id, ownerUserId: owner.id, memberIds: [owner.id, brand.id] }
  ];
  for (const seed of directSeeds) {
    if (!store.rooms.some((room) => room.slug === seed.slug)) {
      store.rooms.push(roomDefaults({ id: nextId(store, 'rooms'), workspaceId: null, kind: 'direct', visibility: 'private', memberRoles: { [owner.id]: 'owner', [brand.id]: 'member' }, createdAt: nowIso(), updatedAt: nowIso(), lastActivityAt: nowIso(), tags: seed.surface === 'work' ? ['work'] : ['dm'], relevanceScore: seed.surface === 'work' ? 74 : 82, ...seed }));
    }
  }

  if (!store.follows.some((item) => Number(item.followerUserId) === Number(owner.id) && Number(item.targetUserId) === Number(brand.id))) {
    store.follows.push({ id: nextId(store, 'follows'), followerUserId: owner.id, targetUserId: brand.id, createdAt: nowIso() });
  }
  if (!store.follows.some((item) => Number(item.followerUserId) === Number(brand.id) && Number(item.targetUserId) === Number(owner.id))) {
    store.follows.push({ id: nextId(store, 'follows'), followerUserId: brand.id, targetUserId: owner.id, createdAt: nowIso() });
  }
  if (!store.friendRequests.some((item) => [item.fromUserId, item.toUserId].sort().join(':') === [owner.id, brand.id].sort().join(':'))) {
    store.friendRequests.push({ id: nextId(store, 'friendRequests'), fromUserId: owner.id, toUserId: brand.id, status: 'accepted', createdAt: nowIso(), respondedAt: nowIso() });
  }

  if (!store.projects.some((item) => item.slug === 'breath-casino')) {
    store.projects.push(projectDefaults({
      id: nextId(store, 'projects'),
      userId: owner.id,
      slug: 'breath-casino',
      title: 'Breath Casino',
      summary: 'Narrative atmospheric project. The casino exists as world architecture, not as gambling product.',
      description: 'Breath Casino is presented on justbreath.life as an isolated project site. It is not a betting platform and not a gambling application. The work explores pressure, breath, memory, ritual space and consequence.',
      visibility: 'public',
      featured: true,
      category: 'game',
      tags: ['game', 'narrative', 'atmosphere'],
      createdAt: nowIso(),
      updatedAt: nowIso()
    }));
  }
  if (!store.projects.some((item) => item.slug === 'justbreath-life')) {
    store.projects.push(projectDefaults({
      id: nextId(store, 'projects'),
      userId: brand.id,
      slug: 'justbreath-life',
      title: 'justbreath.life',
      summary: 'Developer hub, hosted sites, messaging and project surfaces.',
      description: 'justbreath.life is the main platform shell: profiles, workspaces, private and public chats, hosted pages, feed and settings.',
      visibility: 'public',
      featured: true,
      category: 'platform',
      tags: ['platform', 'creator', 'hub'],
      createdAt: nowIso(),
      updatedAt: nowIso()
    }));
  }

  const breathProject = store.projects.find((item) => item.slug === 'breath-casino');
  const brandProject = store.projects.find((item) => item.slug === 'justbreath-life');

  if (!store.sites.some((site) => site.slug === 'breath-casino' && site.userId === owner.id)) {
    const siteId = nextId(store, 'sites');
    const htmlPath = ensureSiteFile(siteId, buildIsolatedSiteHtml({
      title: 'Breath Casino',
      eyebrow: 'Narrative project surface',
      summary: 'A standalone site inside justbreath.life for the game world, development tone and project presentation.',
      body: 'This surface is intentionally isolated from the main platform interface. It can carry its own atmosphere, layout and logic without forcing the rest of justbreath.life to imitate it.\n\nThe work is not a gambling product. The casino exists inside the fiction as architecture, tension and symbolic stage design.',
      accent: '#7c3aed',
      ctaLabel: 'Open creator profile',
      ctaHref: `/@${owner.handleCanonical}`
    }));
    store.sites.push(siteDefaults({
      id: siteId,
      userId: owner.id,
      projectId: breathProject?.id,
      slug: 'breath-casino',
      title: 'Breath Casino',
      summary: 'Isolated project site for the game presentation.',
      visibility: 'public',
      mode: 'upload',
      htmlPath,
      createdAt: nowIso(),
      updatedAt: nowIso()
    }));
  }
  if (!store.sites.some((site) => site.slug === 'about-justbreath' && site.userId === brand.id)) {
    store.sites.push(siteDefaults({
      id: nextId(store, 'sites'),
      userId: brand.id,
      projectId: brandProject?.id || null,
      slug: 'about-justbreath',
      title: 'About justbreath',
      summary: 'Template-based brand and legal surface.',
      visibility: 'public',
      mode: 'template',
      templateConfig: {
        eyebrow: 'Brand profile',
        accent: '#38bdf8',
        hero: 'A platform for profiles, isolated creator sites and collaboration.',
        body: 'justbreath.life is built as a formal shell with room for independent sites inside user profiles. Templates are available, but creators can also upload their own site logic within the allowed size limit.'
      },
      createdAt: nowIso(),
      updatedAt: nowIso()
    }));
  }

  if (!store.stickerPacks.length) {
    const packId = nextId(store, 'stickerPacks');
    store.stickerPacks.push(stickerPackDefaults({ id: packId, userId: brand.id, title: 'Markers', slug: 'markers', createdAt: nowIso(), updatedAt: nowIso() }));
    const stickerSeeds = [
      { name: 'Pulse', seed: 'violet' },
      { name: 'Fold', seed: 'blue' },
      { name: 'Beam', seed: 'amber' },
      { name: 'Trace', seed: 'coral' }
    ];
    for (const seed of stickerSeeds) {
      store.stickers.push(stickerDefaults({
        id: nextId(store, 'stickers'),
        packId,
        userId: brand.id,
        name: seed.name,
        mimeType: 'image/svg+xml',
        dataUrl: createDefaultStickerSvg(seed.seed, seed.name),
        createdAt: nowIso(),
        updatedAt: nowIso()
      }));
    }
  }

  if (!store.posts.length) {
    const quick = [
      { userId: brand.id, kind: 'quick', body: 'justbreath.life is being rebuilt around calmer structure, clearer privacy and better separated surfaces.', excerpt: 'Platform direction update.', createdAt: nowIso() },
      { userId: owner.id, kind: 'quick', body: 'Breath Casino remains a project inside the platform, not the visual language of the whole platform itself.', excerpt: 'Project clarification.', createdAt: nowIso() },
      { userId: owner.id, kind: 'devlog', title: 'Why the project site stays isolated', body: 'The game presentation surface can carry its own atmosphere while the main platform stays formal and usable for everyone else.\n\nThat separation is one of the main ideas behind justbreath.life.', excerpt: 'Long-form note on project surfaces.', projectId: breathProject?.id, createdAt: nowIso() }
    ];
    for (const post of quick) {
      store.posts.push(postDefaults({ id: nextId(store, 'posts'), status: 'published', publishedAt: post.createdAt, updatedAt: post.createdAt, ...post }));
    }
  }


  if (!store.tasks.length) {
    const buildNotes = store.rooms.find((room) => room.slug === 'build-notes');
    store.tasks.push(taskDefaults({
      id: nextId(store, 'tasks'),
      workspaceId: studio?.id,
      roomId: buildNotes?.id || null,
      title: 'Refine profile privacy defaults',
      description: 'Hide email, internal roles and operator metadata in public surfaces by default.',
      dueAt: futureIso(1000 * 60 * 60 * 24 * 5),
      isUnlimited: false,
      status: 'open',
      createdByUserId: owner.id,
      assigneeUserIds: [owner.id],
      createdAt: nowIso(),
      updatedAt: nowIso()
    }));
  }

  saveStore(store);
}

function stickerById(store, id) {
  return store.stickers.find((item) => Number(item.id) === Number(id)) || null;
}

function getOtherUserId(room, authUserId) {
  return ensureArray(room?.memberIds).find((id) => Number(id) !== Number(authUserId)) || null;
}

function followsUser(store, followerUserId, targetUserId) {
  return store.follows.some((item) => Number(item.followerUserId) === Number(followerUserId) && Number(item.targetUserId) === Number(targetUserId));
}

function friendshipState(store, aId, bId) {
  const pair = store.friendRequests.find((item) => (
    (Number(item.fromUserId) === Number(aId) && Number(item.toUserId) === Number(bId)) ||
    (Number(item.fromUserId) === Number(bId) && Number(item.toUserId) === Number(aId))
  ));
  if (!pair) return 'none';
  if (pair.status === 'accepted') return 'accepted';
  return Number(pair.fromUserId) === Number(aId) ? 'pending-outgoing' : 'pending-incoming';
}

function userScore(store, userId) {
  const posts = store.posts.filter((item) => Number(item.userId) === Number(userId) && item.status === 'published');
  const projects = store.projects.filter((item) => Number(item.userId) === Number(userId) && item.visibility === 'public');
  const sites = store.sites.filter((item) => Number(item.userId) === Number(userId) && item.visibility === 'public');
  const messages = store.messages.filter((item) => Number(item.userId) === Number(userId)).length;
  const comments = store.comments.filter((item) => Number(item.userId) === Number(userId)).length;
  const likes = store.likes.filter((like) => posts.some((post) => post.id === like.postId)).length;
  const followers = store.follows.filter((item) => Number(item.targetUserId) === Number(userId)).length;
  return posts.length * 4 + projects.length * 6 + sites.length * 6 + messages + comments + likes * 2 + followers * 3;
}

function publicUser(store, user, viewerUserId = null) {
  if (!user) return null;
  const profileVisibility = user.privacy?.profileVisibility || 'public';
  const isSelf = Number(viewerUserId) === Number(user.id);
  const isHandleOnly = profileVisibility === 'handle-only' && !isSelf;
  const isPrivate = profileVisibility === 'private' && !isSelf;
  const score = userScore(store, user.id);
  const followerCount = store.follows.filter((item) => Number(item.targetUserId) === Number(user.id)).length;
  const followingCount = store.follows.filter((item) => Number(item.followerUserId) === Number(user.id)).length;
  const friendCount = store.friendRequests.filter((item) => item.status === 'accepted' && (Number(item.fromUserId) === Number(user.id) || Number(item.toUserId) === Number(user.id))).length;
  return {
    id: user.id,
    handle: user.handle,
    handleCanonical: user.handleCanonical,
    displayName: (isHandleOnly || isPrivate) ? user.handle : user.displayName,
    bio: (isHandleOnly || isPrivate) ? '' : user.bio,
    avatarUrl: isPrivate ? '' : user.avatarUrl,
    bannerUrl: isPrivate ? '' : user.bannerUrl,
    accent: user.accent || 'violet',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    avatarText: avatarText(user.displayName || user.handle),
    badges: cleanBadges(user.badges),
    score,
    stats: {
      projects: store.projects.filter((item) => Number(item.userId) === Number(user.id) && item.visibility === 'public').length,
      sites: store.sites.filter((item) => Number(item.userId) === Number(user.id) && item.visibility === 'public').length,
      posts: store.posts.filter((item) => Number(item.userId) === Number(user.id) && item.status === 'published').length,
      followers: followerCount,
      following: followingCount,
      friends: friendCount
    },
    visibility: profileVisibility,
    isSelf,
    isPrivate,
    links: isPrivate ? {} : user.links,
    email: user.privacy?.showEmail || isSelf ? user.email : '',
    roleLabel: user.privacy?.showRole || isSelf ? user.roleInternal : '',
    lastSeenAt: (user.privacy?.showLastSeen || isSelf) ? user.lastSeenAt : '',
    publicKeyJwk: user.security?.publicKeyJwk || null,
    relation: viewerUserId ? {
      following: followsUser(store, viewerUserId, user.id),
      followedBy: followsUser(store, user.id, viewerUserId),
      friendship: friendshipState(store, viewerUserId, user.id)
    } : null
  };
}

function postPopularity(store, postId) {
  const likes = store.likes.filter((item) => Number(item.postId) === Number(postId)).length;
  const comments = store.comments.filter((item) => Number(item.postId) === Number(postId)).length;
  return likes * 2 + comments;
}

function publicPost(store, post, viewerUserId = null) {
  const author = store.users.find((item) => Number(item.id) === Number(post.userId));
  return {
    id: post.id,
    kind: post.kind,
    title: post.title,
    body: post.body,
    excerpt: post.excerpt || post.body.slice(0, 220),
    attachment: post.attachment || null,
    sticker: post.stickerId ? stickerById(store, post.stickerId) : null,
    status: post.status,
    scheduledFor: post.scheduledFor,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    projectId: post.projectId,
    likeCount: store.likes.filter((item) => Number(item.postId) === Number(post.id)).length,
    likedByViewer: viewerUserId ? store.likes.some((item) => Number(item.postId) === Number(post.id) && Number(item.userId) === Number(viewerUserId)) : false,
    commentCount: store.comments.filter((item) => Number(item.postId) === Number(post.id)).length,
    popularity: postPopularity(store, post.id),
    author: publicUser(store, author, viewerUserId),
    ownedBySession: Number(viewerUserId) === Number(post.userId)
  };
}

function publicComment(store, comment, viewerUserId = null) {
  const author = store.users.find((item) => Number(item.id) === Number(comment.userId));
  return {
    id: comment.id,
    body: comment.body,
    sticker: comment.stickerId ? stickerById(store, comment.stickerId) : null,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: publicUser(store, author, viewerUserId)
  };
}

function publicProject(store, project, viewerUserId = null) {
  const owner = store.users.find((item) => Number(item.id) === Number(project.userId));
  const site = project.siteId ? store.sites.find((item) => Number(item.id) === Number(project.siteId)) : store.sites.find((item) => Number(item.projectId) === Number(project.id) && item.visibility === 'public');
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    description: project.description,
    tags: project.tags,
    featured: project.featured,
    category: project.category,
    coverUrl: project.coverUrl,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    owner: publicUser(store, owner, viewerUserId),
    site: site ? { slug: site.slug, title: site.title, path: `/@${owner?.handleCanonical || canonicalHandle(owner?.handle)}/${site.slug}` } : null
  };
}

function publicSite(store, site, viewerUserId = null) {
  const owner = store.users.find((item) => Number(item.id) === Number(site.userId));
  const project = site.projectId ? store.projects.find((item) => Number(item.id) === Number(site.projectId)) : null;
  const isOwner = viewerUserId && Number(viewerUserId) === Number(site.userId);
  const normalizedConfig = sanitizeSiteConfig(site.templateConfig || {});
  const ownerHandle = owner?.handleCanonical || canonicalHandle(owner?.handle);
  return {
    id: site.id,
    slug: site.slug,
    title: site.title,
    summary: site.summary,
    visibility: site.visibility,
    mode: site.mode,
    uploadMode: site.mode === 'upload' ? (site.uploadMode || (siteUsesBundle(site) ? 'archive' : 'html')) : '',
    templateConfig: isOwner || site.mode === 'template' ? normalizedConfig : null,
    reviewStatus: isOwner ? (site.reviewStatus || 'draft') : undefined,
    reviewNote: isOwner ? (site.reviewNote || '') : undefined,
    createdAt: site.createdAt,
    updatedAt: site.updatedAt,
    owner: publicUser(store, owner, viewerUserId),
    iconUrl: siteIconUrl(store, site, owner),
    path: `/@${ownerHandle}/${site.slug}`,
    projectId: site.projectId,
    project: project ? { id: project.id, slug: project.slug, title: project.title, path: `/project/${project.slug}` } : null,
    discussionPath: project ? `/project/${project.slug}` : `/@${ownerHandle}`
  };
}

function ownerSiteDetails(store, site, viewerUserId = null) {
  const details = publicSite(store, site, viewerUserId);
  details.templateConfig = sanitizeSiteConfig(site.templateConfig || {});
  if (site.mode === 'upload') {
    details.htmlContent = readSiteFile(site.htmlPath) || '';
    details.uploadDiagnostics = uploadedSiteDiagnostics(site, details.htmlContent);
  }
  return details;
}

function userSiteLimit(user) {
  const plan = subscriptions.find(p => p.id === (user.billing?.planId || ''));
  if (!plan) return MAX_SITES_FREE;
  if (plan.extraSites === -1) return Infinity;
  return MAX_SITES_FREE + plan.extraSites;
}

function autoCreateDefaultSite(store, user) {
  if (store.sites.some(s => Number(s.userId) === Number(user.id))) return;
  const siteId = nextId(store, 'sites');
  store.sites.push(siteDefaults({
    id: siteId,
    userId: user.id,
    slug: `${user.handleCanonical || canonicalHandle(user.handle)}-home`,
    title: `${user.displayName}'s Space`,
    summary: '',
    visibility: 'public',
    mode: 'template',
    templateConfig: {
      eyebrow: 'Welcome',
      accent: '#7c3aed',
      bg: '#0f0f13',
      windowColor: '#1a1a24',
      font: 'system',
      hero: `Hey, I'm ${user.displayName}`,
      body: 'This is my personal space on justbreath.life.\n\nEdit this page from your Sites settings.',
      links: []
    },
    reviewStatus: 'draft',
    createdAt: nowIso(),
    updatedAt: nowIso()
  }));
}

function roomAccessible(room, authUserId) {
  if (!room) return false;
  if (room.visibility === 'open') return true;
  return room.memberIds.includes(Number(authUserId));
}

function publicWorkspace(store, workspace, authUserId = null) {
  const owner = store.users.find((item) => Number(item.id) === Number(workspace.ownerUserId));
  const roomCount = store.rooms.filter((item) => Number(item.workspaceId) === Number(workspace.id)).length;
  return {
    id: workspace.id,
    slug: workspace.slug,
    title: workspace.title,
    description: workspace.description,
    visibility: workspace.visibility,
    accent: workspace.accent,
    icon: workspace.icon,
    avatarUrl: workspace.avatarUrl,
    createdAt: workspace.createdAt,
    updatedAt: workspace.updatedAt,
    owner: publicUser(store, owner, authUserId),
    roomCount,
    role: workspace.memberRoles?.[String(authUserId)] || null,
    joined: workspace.memberIds.includes(Number(authUserId))
  };
}

function publicRoom(store, room, authUserId = null) {
  const author = store.users.find((item) => Number(item.id) === Number(room.createdByUserId));
  const workspace = room.workspaceId ? store.workspaces.find((item) => Number(item.id) === Number(room.workspaceId)) : null;
  const messageCount = store.messages.filter((item) => Number(item.roomId) === Number(room.id)).length;
  const lastMessage = store.messages.filter((item) => Number(item.roomId) === Number(room.id)).sort((a, b) => sortDateDesc(a, b))[0] || null;
  const otherUser = room.kind === 'direct' && authUserId ? store.users.find((item) => Number(item.id) === Number(getOtherUserId(room, authUserId))) : null;
  const title = room.kind === 'direct' && otherUser ? otherUser.displayName : room.title;
  const description = room.kind === 'direct' && otherUser ? (room.surface === 'work' ? 'Work direct chat' : 'Personal direct chat') : room.description;
  const joined = room.memberIds.includes(Number(authUserId));
  const currentRole = room.memberRoles?.[String(authUserId)] || (joined ? 'member' : null);
  const premiumLocked = roomSubscriptionLocked(store, room, authUserId);
  const requiredPlan = subscriptionPlan(room.subscription?.requiredPlanId || '');
  return {
    id: room.id,
    slug: room.slug,
    title,
    description,
    kind: room.kind,
    surface: room.surface,
    visibility: room.visibility,
    tags: room.tags,
    relevanceScore: room.relevanceScore,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    lastActivityAt: room.lastActivityAt,
    memberCount: room.memberIds.length,
    messageCount,
    author: publicUser(store, author, authUserId),
    ownerUserId: room.ownerUserId,
    currentRole,
    avatarUrl: room.kind === 'direct' ? (otherUser?.avatarUrl || '') : room.avatarUrl,
    avatarText: room.kind === 'direct' ? avatarText(otherUser?.displayName || otherUser?.handle) : avatarText(room.title),
    workspace: workspace ? publicWorkspace(store, workspace, authUserId) : null,
    joined,
    canJoin: roomCanJoin(store, room, authUserId),
    canPost: roomCanPost(store, room, authUserId),
    permissions: room.permissions,
    subscription: {
      enabled: Boolean(room.subscription?.enabled),
      requiredPlanId: room.subscription?.requiredPlanId || '',
      requiredPlanLabel: requiredPlan?.label || '',
      note: room.subscription?.note || '',
      eligible: !premiumLocked,
      locked: premiumLocked
    },
    state: {
      archived: room.archivedByUserIds.includes(Number(authUserId)),
      pinned: room.pinnedByUserIds.includes(Number(authUserId)),
      muted: room.mutedByUserIds.includes(Number(authUserId))
    },
    otherUser: otherUser ? publicUser(store, otherUser, authUserId) : null,
    lastMessagePreview: (lastMessage && !premiumLocked) ? (lastMessage.encrypted ? 'Encrypted message' : (lastMessage.body || (lastMessage.attachment?.name ? `[${lastMessage.attachment.name}]` : ''))) : ''
  };
}

function publicMessage(store, message, authUserId = null) {
  const author = store.users.find((item) => Number(item.id) === Number(message.userId));
  // Reactions grouped by emoji
  const reactions = ensureArray(store.reactions).filter(r => Number(r.messageId) === Number(message.id));
  const reactionMap = {};
  for (const r of reactions) {
    if (!reactionMap[r.emoji]) reactionMap[r.emoji] = { emoji: r.emoji, count: 0, me: false };
    reactionMap[r.emoji].count++;
    if (Number(r.userId) === Number(authUserId)) reactionMap[r.emoji].me = true;
  }
  // Reply-to preview
  let replyTo = null;
  if (message.replyToId) {
    const parent = store.messages.find(m => Number(m.id) === Number(message.replyToId));
    if (parent) {
      const parentAuthor = store.users.find(u => Number(u.id) === Number(parent.userId));
      replyTo = {
        id: parent.id,
        body: parent.deletedAt ? '[deleted]' : (parent.encrypted ? '[encrypted]' : (parent.body || '').slice(0, 120)),
        author: parentAuthor ? { displayName: parentAuthor.displayName, handle: parentAuthor.handle } : null
      };
    }
  }
  return {
    id: message.id,
    roomId: message.roomId,
    body: message.deletedAt ? '[deleted]' : (message.encrypted ? '' : message.body),
    deleted: Boolean(message.deletedAt),
    edited: Boolean(message.editedAt),
    editedAt: message.editedAt || null,
    encrypted: message.encrypted,
    ciphertext: message.deletedAt ? '' : message.ciphertext,
    iv: message.deletedAt ? '' : message.iv,
    attachment: message.deletedAt ? null : (message.attachment || null),
    attachments: message.deletedAt ? [] : (Array.isArray(message.attachments) ? message.attachments : []),
    sticker: (!message.deletedAt && message.stickerId) ? stickerById(store, message.stickerId) : null,
    replyToId: message.replyToId || null,
    replyTo,
    clientNonce: message.clientNonce || '',
    confirmedAt: message.deletedAt ? null : (message.confirmedAt || null),
    confirmedByUserId: message.deletedAt ? null : (message.confirmedByUserId || null),
    reactions: Object.values(reactionMap),
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    author: publicUser(store, author, authUserId),
    ownedBySession: Number(authUserId) === Number(message.userId)
  };
}

function publicTask(store, task) {
  const creator = store.users.find((item) => Number(item.id) === Number(task.createdByUserId));
  return {
    id: task.id,
    workspaceId: task.workspaceId,
    roomId: task.roomId,
    title: task.title,
    description: task.description,
    dueAt: task.dueAt,
    isUnlimited: task.isUnlimited,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    assignees: task.assigneeUserIds.map((id) => publicUser(store, store.users.find((u) => Number(u.id) === Number(id)))).filter(Boolean),
    creator: publicUser(store, creator)
  };
}

function extractSiteAssetUrl(innerHtml = '', kind = 'icon') {
  const source = String(innerHtml || '');
  if (!source) return '';
  if (kind === 'icon') {
    const iconMatch = source.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["']/i)
      || source.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*icon[^"']*["']/i);
    return sanitizeSiteAssetUrl(iconMatch?.[1] || '', 1600);
  }
  const imageMatch = source.match(/<img[^>]+src=["']([^"']+)["']/i);
  return sanitizeSiteAssetUrl(imageMatch?.[1] || '', 1600);
}

function resolveSiteAssetUrl(raw, origin = APP_URL || 'https://justbreath.life') {
  const value = String(raw || '').trim();
  if (!value) return '';
  if (/^(https?:\/\/|data:image\/)/i.test(value)) return value;
  if (value.startsWith('/')) return `${origin.replace(/\/+$/, '')}${value}`;
  return '';
}

function siteBundledAssetUrl(owner, site, raw = '') {
  const relativePath = safeSiteBundlePath(raw);
  if (!relativePath || !siteUsesBundle(site)) return '';
  const ownerHandle = owner?.handleCanonical || canonicalHandle(owner?.handle || '');
  if (!ownerHandle || !site?.slug) return '';
  return `/@${ownerHandle}/${site.slug}/${relativePath}`;
}

function siteIconLinks(meta) {
  if (!meta?.resolvedIcon) return '';
  return `
  <link rel="icon" href="${meta.resolvedIcon}" />
  <link rel="shortcut icon" href="${meta.resolvedIcon}" />
  <link rel="icon" sizes="192x192" href="${meta.resolvedIcon}" />
  <link rel="apple-touch-icon" href="${meta.resolvedIcon}" />
  <meta name="application-name" content="${meta.title}" />
  <meta name="apple-mobile-web-app-title" content="${meta.title}" />`;
}

function siteIconUrl(store, site, owner, innerHtml = '') {
  const config = sanitizeSiteConfig(site?.templateConfig || {});
  if (config.faviconUrl) return config.faviconUrl;
  if (config.logoUrl) return config.logoUrl;
  const iconFromHtml = extractSiteAssetUrl(innerHtml, 'icon');
  if (iconFromHtml) return siteBundledAssetUrl(owner, site, iconFromHtml) || sanitizeSiteAssetUrl(iconFromHtml, 1600);
  const imageFromHtml = extractSiteAssetUrl(innerHtml, 'image');
  if (imageFromHtml) return siteBundledAssetUrl(owner, site, imageFromHtml) || sanitizeSiteAssetUrl(imageFromHtml, 1600);
  const project = site?.projectId ? store.projects.find((item) => Number(item.id) === Number(site.projectId)) : null;
  const galleryImage = ensureArray(config.gallery).find(Boolean) || '';
  return sanitizeSiteAssetUrl(project?.coverUrl || galleryImage || owner?.avatarUrl || owner?.bannerUrl || '', 1600);
}

function siteMetaPayload(store, site, owner, innerHtml = '') {
  const config = sanitizeSiteConfig(site?.templateConfig || {});
  const origin = (APP_URL || 'https://justbreath.life').replace(/\/+$/, '');
  const ownerHandle = owner?.handleCanonical || canonicalHandle(owner?.handle || '');
  const canonicalRaw = config.canonicalUrl || `/@${ownerHandle}/${site.slug}`;
  const canonical = resolveSiteAssetUrl(canonicalRaw, origin) || `${origin}/@${ownerHandle}/${site.slug}`;
  const titlePlain = config.seoTitle || site.title || 'Creator site';
  const descriptionPlain = config.seoDescription || site.summary || config.body || `A creator site by @${ownerHandle} on ${BRAND_WORDMARK}.`;
  const indexingMode = config.indexingMode === 'index'
    ? 'index, follow, max-image-preview:large'
    : config.indexingMode === 'noindex'
      ? 'noindex, follow'
      : (site.visibility === 'public' ? 'index, follow, max-image-preview:large' : 'noindex, follow');
  const iconUrl = siteIconUrl(store, site, owner, innerHtml);
  const resolvedIcon = resolveSiteAssetUrl(iconUrl, origin) || `${origin}/logo.png`;
  const ogImageUrl = config.ogImageUrl || iconUrl || `${origin}/logo.png`;
  const resolvedOgImage = resolveSiteAssetUrl(ogImageUrl, origin) || `${origin}/logo.png`;
  const legalName = config.legalName || owner?.displayName || ownerHandle || BRAND_WORDMARK;
  const publisher = {
    '@type': config.schemaType,
    name: legalName,
    url: `${origin}/@${ownerHandle}`
  };
  if (config.logoUrl) {
    const publisherLogo = resolveSiteAssetUrl(config.logoUrl, origin);
    if (publisherLogo) publisher.logo = { '@type': 'ImageObject', url: publisherLogo };
  }
  if (config.supportEmail || config.phone) {
    publisher.contactPoint = [{
      '@type': 'ContactPoint',
      email: config.supportEmail || undefined,
      telephone: config.phone || undefined,
      contactType: 'customer support'
    }];
  }
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: titlePlain,
    url: canonical,
    description: descriptionPlain,
    inLanguage: owner?.languagePreference || 'en',
    publisher,
    about: publisher,
    keywords: config.seoKeywords || undefined
  }).replace(/</g, '\\u003c');
  return {
    config,
    origin,
    ownerHandle,
    canonical,
    iconUrl,
    resolvedIcon,
    ogImage: resolvedOgImage,
    title: escapeHtmlValue(titlePlain),
    description: escapeHtmlValue(String(descriptionPlain).replace(/\s+/g, ' ').slice(0, 320)),
    robots: indexingMode,
    keywords: escapeHtmlValue(config.seoKeywords || ''),
    jsonLd
  };
}

function injectIntoHeadHtml(html, injection) {
  const source = ensureDoctype(html);
  if (/<\/head>/i.test(source)) return source.replace(/<\/head>/i, `${injection}\n</head>`);
  if (/<html[^>]*>/i.test(source)) return source.replace(/<html([^>]*)>/i, `<html$1><head>${injection}</head>`);
  return `<!DOCTYPE html><html><head>${injection}</head><body>${source}</body></html>`;
}

function replaceBodyHtml(html, renderBody) {
  const source = ensureDoctype(html);
  const match = source.match(/<body([^>]*)>([\s\S]*)<\/body>/i);
  if (match) return source.replace(/<body([^>]*)>[\s\S]*<\/body>/i, renderBody(match[1] || '', match[2] || ''));
  if (/<\/head>/i.test(source)) return source.replace(/<\/head>/i, `</head>${renderBody('', source)}`);
  return `<!DOCTYPE html><html><head></head>${renderBody('', source)}</html>`;
}

function decorateUploadedSiteHtml(store, site, owner, innerHtml = '', options = {}) {
  const meta = siteMetaPayload(store, site, owner, innerHtml);
  const { config } = meta;
  const baseHref = sanitizeSiteUrl(options.baseHref || '', 500);
  const fontStack = siteFontStack(config.font);
  const radius = siteRadiusValue(config.radiusStyle);
  const maxWidth = siteMaxWidthValue(config.maxWidth);
  const colorScheme = siteColorScheme(config);
  const iconMarkup = meta.iconUrl
    ? `<span class="jb-site-mark"><img src="${meta.iconUrl}" alt="${escapeHtmlValue(site.title || 'Site')}" /></span>`
    : `<span class="jb-site-mark fallback">${escapeHtmlValue(avatarText(site.title || 'S'))}</span>`;
  const legalLinks = [
    config.privacyUrl ? `<a href="${config.privacyUrl}">Privacy</a>` : '',
    config.termsUrl ? `<a href="${config.termsUrl}">Terms</a>` : ''
  ].filter(Boolean).join('<span>·</span>');
  const supportBits = [
    config.supportEmail ? `<a href="mailto:${config.supportEmail}">${escapeHtmlValue(config.supportEmail)}</a>` : '',
    config.phone ? `<a href="tel:${escapeHtmlValue(config.phone)}">${escapeHtmlValue(config.phone)}</a>` : '',
    config.address ? `<span>${escapeHtmlValue(config.address)}</span>` : ''
  ].filter(Boolean).join('<span>·</span>');
  const safeCustomCss = String(config.customCss || '').replace(/<\/style/gi, '<\\/style');
  const iconLinks = siteIconLinks(meta);
  const headInjection = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${baseHref ? `<base href="${baseHref}" />` : ''}
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <meta name="robots" content="${meta.robots}" />
  ${meta.keywords ? `<meta name="keywords" content="${meta.keywords}" />` : ''}
  <meta property="og:site_name" content="${escapeHtmlValue(config.brandName || BRAND_WORDMARK)}" />
  <meta name="theme-color" content="${config.accent}" />
  <link rel="canonical" href="${meta.canonical}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${meta.canonical}" />
  <meta property="og:image" content="${meta.ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${meta.ogImage}" />
  ${iconLinks}
  <script type="application/ld+json">${meta.jsonLd}</script>
  <style id="jb-site-polish">
    :root{
      color-scheme:${colorScheme};
      --jb-accent:${config.accent};
      --jb-bg:${config.bg};
      --jb-surface:${config.surface};
      --jb-text:${config.text};
      --jb-muted:${config.muted};
      --jb-radius:${radius}px;
      --jb-max:${maxWidth};
      --jb-shadow:0 26px 70px rgba(0,0,0,.18);
    }
    *{box-sizing:border-box}
    html{background:var(--jb-bg)}
    body.jb-site-polished{margin:0;min-height:100vh;padding:clamp(20px,4vw,40px);font-family:${fontStack};color:var(--jb-text);background:
      radial-gradient(circle at top left, color-mix(in srgb, var(--jb-accent) 18%, transparent), transparent 36%),
      linear-gradient(180deg, var(--jb-bg), color-mix(in srgb, var(--jb-bg) 88%, #000));
      line-height:1.7}
    .jb-site-shell{width:min(var(--jb-max),100%);margin:0 auto;border-radius:calc(var(--jb-radius) + 10px);overflow:hidden;background:color-mix(in srgb, var(--jb-surface) 92%, transparent);border:1px solid color-mix(in srgb, var(--jb-text) 10%, transparent);box-shadow:var(--jb-shadow)}
    .jb-site-header,.jb-site-footer{display:flex;gap:16px;justify-content:space-between;align-items:center;padding:18px 24px;background:color-mix(in srgb, var(--jb-surface) 92%, transparent);border-bottom:1px solid color-mix(in srgb, var(--jb-text) 8%, transparent)}
    .jb-site-footer{border-top:1px solid color-mix(in srgb, var(--jb-text) 8%, transparent);border-bottom:none;flex-wrap:wrap}
    .jb-site-brand{display:flex;align-items:center;gap:16px;font-size:clamp(20px,2vw,26px);font-weight:800;letter-spacing:-.04em}
    .jb-site-tagline{display:block;color:var(--jb-muted);font-size:13px;font-weight:500;letter-spacing:0}
    .jb-site-mark{width:84px;height:84px;border-radius:26px;overflow:hidden;display:grid;place-items:center;flex:0 0 auto;background:color-mix(in srgb, var(--jb-accent) 18%, var(--jb-surface));border:1px solid color-mix(in srgb, var(--jb-text) 12%, transparent)}
    .jb-site-mark img{width:100%;height:100%;object-fit:cover;display:block}
    .jb-site-mark.fallback{font-size:34px;font-weight:900}
    .jb-site-actions{display:flex;gap:12px;flex-wrap:wrap}
    .jb-site-main{padding:clamp(24px,4vw,42px)}
    .jb-site-main > *:first-child{margin-top:0}
    .jb-site-main > *:last-child{margin-bottom:0}
    h1,h2,h3,h4,h5,h6{color:var(--jb-text);line-height:1.08;letter-spacing:-.04em}
    h1{font-size:clamp(40px,7vw,78px)}
    p,li,dd,dt,label,small,span{max-width:80ch}
    a{color:var(--jb-accent)}
    button,.button,input[type="submit"],input[type="button"]{appearance:none;display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:999px;border:1px solid color-mix(in srgb, var(--jb-accent) 35%, transparent);background:linear-gradient(135deg, color-mix(in srgb, var(--jb-accent) 20%, var(--jb-surface)), color-mix(in srgb, var(--jb-accent) 10%, var(--jb-surface)));color:var(--jb-text);font:inherit;font-weight:700;text-decoration:none;cursor:pointer}
    input,textarea,select{width:100%;padding:14px 16px;border-radius:calc(var(--jb-radius) - 6px);border:1px solid color-mix(in srgb, var(--jb-text) 12%, transparent);background:color-mix(in srgb, var(--jb-surface) 94%, transparent);color:var(--jb-text);font:inherit}
    img,video,iframe,canvas,svg{max-width:100%;height:auto;border-radius:calc(var(--jb-radius) - 6px)}
    pre,code,blockquote,table,article,section,form{border-radius:calc(var(--jb-radius) - 4px)}
    pre,blockquote,table{background:color-mix(in srgb, var(--jb-surface) 94%, transparent);border:1px solid color-mix(in srgb, var(--jb-text) 8%, transparent);padding:18px}
    table{width:100%;border-collapse:collapse}
    td,th{padding:12px;border-bottom:1px solid color-mix(in srgb, var(--jb-text) 8%, transparent)}
    .jb-site-meta{display:flex;gap:10px;flex-wrap:wrap;color:var(--jb-muted);font-size:13px}
    .jb-site-meta a{color:inherit}
    @media (max-width: 760px){
      .jb-site-header,.jb-site-footer{padding:18px;align-items:flex-start;flex-direction:column}
      .jb-site-main{padding:22px}
      .jb-site-mark{width:68px;height:68px;border-radius:22px}
    }
    ${safeCustomCss}
  </style>`;
  const withHead = injectIntoHeadHtml(innerHtml, headInjection);
  return replaceBodyHtml(withHead, (attrs, bodyContent) => {
    const existingAttrs = attrs || '';
    const classMatch = existingAttrs.match(/\sclass=(["'])(.*?)\1/i);
    const mergedClass = ['jb-site-polished', classMatch?.[2] || ''].filter(Boolean).join(' ');
    const attrsSansClass = existingAttrs.replace(/\sclass=(["'])(.*?)\1/i, '');
    const bodyTag = `<body${attrsSansClass} class="${escapeHtmlValue(mergedClass)}">`;
    if (config.polishMode === 'none') return `${bodyTag}${bodyContent}</body>`;
    if (config.polishMode === 'css-only') return `${bodyTag}${bodyContent}</body>`;
    return `${bodyTag}
      <div class="jb-site-shell">
        <header class="jb-site-header">
          <div class="jb-site-brand">${iconMarkup}<div><span>${escapeHtmlValue(config.brandName || site.title || BRAND_WORDMARK)}</span>${config.tagline ? `<span class="jb-site-tagline">${escapeHtmlValue(config.tagline)}</span>` : ''}</div></div>
          <div class="jb-site-actions">${config.ctaHref ? `<a class="button" href="${config.ctaHref}">${escapeHtmlValue(config.ctaLabel)}</a>` : ''}</div>
        </header>
        <main class="jb-site-main">${bodyContent}</main>
        ${(supportBits || legalLinks) ? `<footer class="jb-site-footer"><div class="jb-site-meta">${supportBits}</div><div class="jb-site-meta">${legalLinks}</div></footer>` : ''}
      </div>
    </body>`;
  });
}

function buildTemplateSiteHtml(store, site, owner) {
  const meta = siteMetaPayload(store, site, owner);
  const { config } = meta;
  const accent = config.accent;
  const bg = config.bg;
  const surface = config.surface;
  const text = config.text;
  const muted = config.muted;
  const fontStack = siteFontStack(config.font);
  const radius = siteRadiusValue(config.radiusStyle);
  const maxWidth = siteMaxWidthValue(config.maxWidth);
  const hero = escapeHtmlValue(config.hero || site.title || 'Creator site');
  const eyebrow = escapeHtmlValue(config.eyebrow || owner?.handle || 'Creator site');
  const about = escapeHtmlValue(config.body || site.summary || '');
  const summarySource = site.summary || config.body || `A creator site by @${meta.ownerHandle}.`;
  const summary = escapeHtmlValue(String(summarySource).replace(/\s+/g, ' ').slice(0, 320));
  const aboutHtml = about
    ? about.split(/\n{2,}/).map((chunk) => `<p>${chunk.replace(/\n/g, '<br />')}</p>`).join('')
    : '';
  const links = ensureArray(config.links);
  const gallery = ensureArray(config.gallery);
  const iconMarkup = meta.iconUrl
    ? `<span class="site-brand-mark"><img src="${meta.iconUrl}" alt="${escapeHtmlValue(site.title || 'Site')}" /></span>`
    : `<span class="site-brand-mark fallback">${escapeHtmlValue(avatarText(site.title || 'S'))}</span>`;
  const contactRows = [
    config.contact ? `<span>${escapeHtmlValue(config.contact)}</span>` : '',
    config.supportEmail ? `<a href="mailto:${config.supportEmail}">${escapeHtmlValue(config.supportEmail)}</a>` : '',
    config.phone ? `<a href="tel:${escapeHtmlValue(config.phone)}">${escapeHtmlValue(config.phone)}</a>` : '',
    config.address ? `<span>${escapeHtmlValue(config.address)}</span>` : ''
  ].filter(Boolean);
  const legalRows = [
    config.privacyUrl ? `<a href="${config.privacyUrl}">Privacy</a>` : '',
    config.termsUrl ? `<a href="${config.termsUrl}">Terms</a>` : ''
  ].filter(Boolean);
  const safeCustomCss = String(config.customCss || '').replace(/<\/style/gi, '<\\/style');
  const iconLinks = siteIconLinks(meta);
  return `<!DOCTYPE html>
<html lang="${owner?.languagePreference || 'en'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <meta name="robots" content="${meta.robots}" />
  ${meta.keywords ? `<meta name="keywords" content="${meta.keywords}" />` : ''}
  <meta property="og:site_name" content="${escapeHtmlValue(config.brandName || BRAND_WORDMARK)}" />
  <meta name="theme-color" content="${accent}" />
  <link rel="canonical" href="${meta.canonical}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:url" content="${meta.canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${meta.ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${meta.ogImage}" />
  ${iconLinks}
  <script type="application/ld+json">${meta.jsonLd}</script>
  ${adsenseHeadSnippet()}
  <style>
    :root{
      color-scheme:${siteColorScheme(config)};
      --bg:${bg};
      --surface:${surface};
      --text:${text};
      --muted:${muted};
      --accent:${accent};
      --radius:${radius}px;
      --max:${maxWidth};
    }
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;font-family:${fontStack};color:var(--text);background:
      radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 18%, transparent), transparent 38%),
      radial-gradient(circle at 82% 12%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 28%),
      linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 84%, #000));padding:24px}
    a{color:var(--accent)}
    .site-shell{width:min(var(--max),100%);margin:0 auto;border:1px solid color-mix(in srgb, var(--text) 10%, transparent);background:color-mix(in srgb, var(--surface) 92%, transparent);backdrop-filter:blur(24px);border-radius:calc(var(--radius) + 10px);overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.28)}
    .site-head,.site-foot{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:20px 26px;border-bottom:1px solid color-mix(in srgb, var(--text) 8%, transparent)}
    .site-foot{border-top:1px solid color-mix(in srgb, var(--text) 8%, transparent);border-bottom:none;flex-wrap:wrap}
    .site-brand{display:flex;align-items:center;gap:16px;font-weight:800;letter-spacing:-.04em;font-size:clamp(22px,2vw,28px)}
    .site-brand-copy{display:grid;gap:4px}
    .site-brand-copy small{color:var(--muted);font-weight:500;letter-spacing:0;font-size:13px}
    .site-back{color:var(--muted);text-decoration:none;font-size:14px}
    .site-brand-mark{width:76px;height:76px;border-radius:24px;overflow:hidden;border:1px solid color-mix(in srgb, var(--text) 12%, transparent);background:color-mix(in srgb, var(--accent) 18%, var(--surface));display:grid;place-items:center;flex:0 0 auto}
    .site-brand-mark img{width:100%;height:100%;object-fit:cover;display:block}
    .site-brand-mark.fallback{font-size:28px}
    .hero{padding:clamp(28px,5vw,64px);display:grid;gap:18px}
    .eyebrow{text-transform:uppercase;letter-spacing:.2em;color:var(--muted);font-size:12px}
    h1{margin:0;font-size:clamp(44px,8vw,92px);line-height:.92;letter-spacing:-.07em;max-width:11ch}
    .summary{max-width:64ch;color:var(--muted);font-size:18px;line-height:1.8}
    .hero-actions,.body-actions{display:flex;flex-wrap:wrap;gap:12px}
    .button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:999px;border:1px solid color-mix(in srgb, var(--text) 12%, transparent);background:color-mix(in srgb, var(--surface) 92%, transparent);color:var(--text);text-decoration:none;font-weight:700}
    .button.primary{background:linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 58%, #38bdf8));border:none;color:#fff}
    .section{padding:0 clamp(28px,5vw,64px) clamp(26px,5vw,52px)}
    .body-copy{display:grid;gap:16px;max-width:76ch;color:color-mix(in srgb, var(--text) 88%, transparent);line-height:1.82}
    .gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
    .gallery img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:calc(var(--radius) - 6px);border:1px solid color-mix(in srgb, var(--text) 10%, transparent)}
    .link-grid{display:flex;flex-wrap:wrap;gap:12px}
    .meta-row{display:flex;gap:10px;flex-wrap:wrap;color:var(--muted);font-size:13px}
    .meta-row a{color:inherit}
    @media (max-width: 760px){
      body{padding:14px}
      .site-head,.site-foot{padding:18px;align-items:flex-start;flex-direction:column}
      .site-brand-mark{width:68px;height:68px;border-radius:22px}
    }
    ${safeCustomCss}
  </style>
</head>
<body>
  <main class="site-shell">
    <header class="site-head">
      <div class="site-brand">${iconMarkup}<div class="site-brand-copy"><span>${escapeHtmlValue(config.brandName || site.title || BRAND_WORDMARK)}</span>${config.tagline ? `<small>${escapeHtmlValue(config.tagline)}</small>` : ''}</div></div>
      <a class="site-back" href="/">Back to platform</a>
    </header>
    <section class="hero">
      <div class="eyebrow">${eyebrow}</div>
      <h1>${hero}</h1>
      <p class="summary">${summary}</p>
      <div class="hero-actions">
        ${config.ctaHref ? `<a class="button primary" href="${config.ctaHref}">${escapeHtmlValue(config.ctaLabel)}</a>` : ''}
        <a class="button" href="/@${meta.ownerHandle}">Open creator profile</a>
      </div>
    </section>
    ${aboutHtml ? `<section class="section"><div class="body-copy">${aboutHtml}</div></section>` : ''}
    ${gallery.length ? `<section class="section"><div class="gallery">${gallery.map((src) => `<img src="${src}" alt="${escapeHtmlValue(site.title || 'Gallery image')}" />`).join('')}</div></section>` : ''}
    ${links.length ? `<section class="section"><div class="body-actions link-grid">${links.map((item) => `<a class="button" href="${item.href}">${escapeHtmlValue(item.label)}</a>`).join('')}</div></section>` : ''}
    ${(contactRows.length || legalRows.length) ? `<footer class="site-foot"><div class="meta-row">${contactRows.join('<span>·</span>')}</div><div class="meta-row">${legalRows.join('<span>·</span>')}</div></footer>` : ''}
  </main>
</body>
</html>`;
}

function mePayload(store, user) {
  const projects = store.projects.filter((item) => Number(item.userId) === Number(user.id)).sort((a, b) => sortDateDesc(a, b)).map((item) => publicProject(store, item, user.id));
  const sites = store.sites.filter((item) => Number(item.userId) === Number(user.id)).sort((a, b) => sortDateDesc(a, b)).map((item) => publicSite(store, item, user.id));
  const ownPosts = store.posts.filter((item) => Number(item.userId) === Number(user.id)).sort((a, b) => sortDateDesc(a, b)).map((item) => publicPost(store, item, user.id));
  const accessibleRooms = store.rooms.filter((room) => roomAppearsInChatList(room, user.id)).map((room) => publicRoom(store, room, user.id)).sort((a, b) => sortDateDesc(a, b, 'lastActivityAt'));
  const notifications = store.notifications.filter((item) => Number(item.userId) === Number(user.id)).sort((a, b) => sortDateDesc(a, b)).slice(0, 24);
  const follows = store.follows.filter((item) => Number(item.followerUserId) === Number(user.id)).map((item) => publicUser(store, store.users.find((candidate) => Number(candidate.id) === Number(item.targetUserId)), user.id)).filter(Boolean);
  const followers = store.follows.filter((item) => Number(item.targetUserId) === Number(user.id)).map((item) => publicUser(store, store.users.find((candidate) => Number(candidate.id) === Number(item.followerUserId)), user.id)).filter(Boolean);
  const friends = store.friendRequests.filter((item) => item.status === 'accepted' && (Number(item.fromUserId) === Number(user.id) || Number(item.toUserId) === Number(user.id))).map((item) => {
    const otherId = Number(item.fromUserId) === Number(user.id) ? item.toUserId : item.fromUserId;
    return publicUser(store, store.users.find((candidate) => Number(candidate.id) === Number(otherId)), user.id);
  }).filter(Boolean);
  const friendRequests = store.friendRequests.filter((item) => item.status === 'pending' && (Number(item.toUserId) === Number(user.id) || Number(item.fromUserId) === Number(user.id)));
  return {
    user: {
      id: user.id,
      handle: user.handle,
      displayName: user.displayName,
      roleInternal: user.roleInternal,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      bannerUrl: user.bannerUrl,
      accent: user.accent,
      accentCustom: user.accentCustom || null,
      badges: cleanBadges(user.badges),
      links: user.links,
      themePreference: user.themePreference,
      languagePreference: user.languagePreference,
      settings: user.settings,
      privacy: user.privacy,
      billing: user.billing,
      emailVerified: user.emailVerified,
      googleConnected: Boolean(user.googleSub),
      discordConnected: Boolean(user.discordSub),
      status: user.status || 'active',
      handleCanonical: user.handleCanonical,
      avatarText: avatarText(user.displayName || user.handle),
      security: { hasPublicKey: Boolean(user.security?.publicKeyJwk) }
    },
    projects,
    sites,
    posts: ownPosts,
    workspaces: store.workspaces.filter((workspace) => workspace.memberIds.includes(Number(user.id))).map((workspace) => publicWorkspace(store, workspace, user.id)),
    rooms: accessibleRooms,
    stickers: (() => {
      const brandUser = store.users.find((u) => u.handleCanonical === canonicalHandle(BRAND_HANDLE));
      return store.stickerPacks
        .filter((pack) => Number(pack.userId) === Number(user.id) || Number(pack.userId) === Number(brandUser?.id))
        .map((pack) => ({
          ...pack,
          stickers: store.stickers.filter((item) => Number(item.packId) === Number(pack.id))
        }));
    })(),
    notifications,
    social: { follows, followers, friends, friendRequests },
    verificationRequests: store.verificationRequests.filter((item) => Number(item.userId) === Number(user.id)).sort((a, b) => sortDateDesc(a, b)),
    billingPlans: subscriptions
  };
}

function readSessionToken(req) {
  return cookie.parse(req.headers.cookie || '')[SESSION_COOKIE] || null;
}

function readGoogleOAuthCookie(req) {
  const raw = cookie.parse(req.headers.cookie || '')[GOOGLE_OAUTH_COOKIE] || '';
  if (!raw) return null;
  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
    return {
      state: sanitizeText(parsed?.state || '', 200),
      next: safeNextPath(parsed?.next || '/')
    };
  } catch {
    return null;
  }
}

function sessionCookieOptions(req, maxAgeMs) {
  const secure = req.secure || req.get('x-forwarded-proto') === 'https';
  return { httpOnly: true, sameSite: 'lax', secure, path: '/', maxAge: Math.floor(maxAgeMs / 1000) };
}

function appendSetCookie(res, value) {
  const existing = res.getHeader('Set-Cookie');
  if (!existing) {
    res.setHeader('Set-Cookie', value);
    return;
  }
  const next = Array.isArray(existing) ? [...existing, value] : [existing, value];
  res.setHeader('Set-Cookie', next);
}

function setSessionCookie(req, res, token) {
  appendSetCookie(res, cookie.serialize(SESSION_COOKIE, token, sessionCookieOptions(req, SESSION_TTL_MS)));
}

function clearSessionCookie(req, res) {
  const secure = req.secure || req.get('x-forwarded-proto') === 'https';
  appendSetCookie(res, cookie.serialize(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure, path: '/', maxAge: 0 }));
}

function setGoogleOAuthCookie(req, res, payload) {
  const value = Buffer.from(JSON.stringify(payload)).toString('base64url');
  appendSetCookie(res, cookie.serialize(GOOGLE_OAUTH_COOKIE, value, sessionCookieOptions(req, GOOGLE_OAUTH_TTL_MS)));
}

function clearGoogleOAuthCookie(req, res) {
  const secure = req.secure || req.get('x-forwarded-proto') === 'https';
  appendSetCookie(res, cookie.serialize(GOOGLE_OAUTH_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure, path: '/', maxAge: 0 }));
}

function readDiscordOAuthCookie(req) {
  const raw = cookie.parse(req.headers.cookie || '')[DISCORD_OAUTH_COOKIE] || '';
  if (!raw) return null;
  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
    return {
      state: sanitizeText(parsed?.state || '', 200),
      next: safeNextPath(parsed?.next || '/')
    };
  } catch {
    return null;
  }
}

function setDiscordOAuthCookie(req, res, payload) {
  const value = Buffer.from(JSON.stringify(payload)).toString('base64url');
  appendSetCookie(res, cookie.serialize(DISCORD_OAUTH_COOKIE, value, sessionCookieOptions(req, DISCORD_OAUTH_TTL_MS)));
}

function clearDiscordOAuthCookie(req, res) {
  const secure = req.secure || req.get('x-forwarded-proto') === 'https';
  appendSetCookie(res, cookie.serialize(DISCORD_OAUTH_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure, path: '/', maxAge: 0 }));
}

function discordCallbackUrl(req) {
  return DISCORD_REDIRECT_URI || `${requestBaseUrl(req)}/api/auth/discord/callback`;
}

function createSessionForUser(req, res, store, userId) {
  const token = createToken();
  store.sessions = store.sessions.filter((session) => new Date(session.expiresAt) > new Date());
  store.sessions.push({ tokenHash: hashToken(token), userId, createdAt: nowIso(), expiresAt: futureIso(SESSION_TTL_MS) });
  setSessionCookie(req, res, token);
  return token;
}

function publishDuePosts(store) {
  let changed = false;
  const now = new Date();
  for (const post of store.posts) {
    if (post.status === 'scheduled' && post.scheduledFor && new Date(post.scheduledFor) <= now) {
      post.status = 'published';
      post.publishedAt = nowIso();
      post.updatedAt = nowIso();
      changed = true;
    }
  }
  if (changed) saveStore(store);
}

function makeNotification(store, userId, title, body, href = '') {
  store.notifications.push(notificationDefaults({ id: nextId(store, 'notifications'), userId, title, body, href, createdAt: nowIso(), readAt: null }));
}

function authFromRequest(req, store) {
  const token = readSessionToken(req);
  if (!token) return null;
  store.sessions = store.sessions.filter((session) => new Date(session.expiresAt) > new Date());
  const session = store.sessions.find((item) => item.tokenHash === hashToken(token));
  if (!session) return null;
  return store.users.find((item) => Number(item.id) === Number(session.userId)) || null;
}

let googleDiscoveryCache = null;
let googleDiscoveryFetchedAt = 0;

async function getGoogleDiscovery() {
  if (googleDiscoveryCache && Date.now() - googleDiscoveryFetchedAt < 1000 * 60 * 60) return googleDiscoveryCache;
  const response = await fetch('https://accounts.google.com/.well-known/openid-configuration');
  if (!response.ok) throw new Error(`Google discovery failed: ${response.status}`);
  googleDiscoveryCache = await response.json();
  googleDiscoveryFetchedAt = Date.now();
  return googleDiscoveryCache;
}

function requestBaseUrl(req) {
  const proto = req.get('x-forwarded-proto') || (req.secure ? 'https' : 'http');
  const host = req.get('x-forwarded-host') || req.get('host') || `localhost:${PORT}`;
  const requestUrl = `${proto}://${host}`;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)) return requestUrl;
  if (APP_URL) return APP_URL.replace(/\/+$/, '');
  return requestUrl;
}

function googleCallbackUrl(req) {
  return GOOGLE_REDIRECT_URI || `${requestBaseUrl(req)}/api/auth/google/callback`;
}

function adsenseHeadSnippet() {
  if (!ADSENSE_CLIENT_ID) return '';
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}" crossorigin="anonymous"></script>`;
}

const app = express();
app.set('trust proxy', 1);
app.use(compression({
  filter: (req, res) => {
    if (req.path === '/api/events') return false;
    return compression.filter(req, res);
  }
}));

// ── SSE real-time push ──────────────────────────────────────────────────────
// Map: userId → Set of SSE response objects
const sseClients = new Map();

function sseAdd(userId, res) {
  if (!sseClients.has(userId)) sseClients.set(userId, new Set());
  sseClients.get(userId).add(res);
}
function sseRemove(userId, res) {
  sseClients.get(userId)?.delete(res);
}
function sseSend(userId, event, data) {
  const clients = sseClients.get(userId);
  if (!clients || clients.size === 0) return;
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    try { res.write(payload); } catch { clients.delete(res); }
  }
}
// Broadcast to all members of a room
function sseBroadcastRoom(store, roomId, event, data, exceptUserId = null) {
  const room = store.rooms.find(r => Number(r.id) === Number(roomId));
  if (!room) return;
  for (const memberId of room.memberIds) {
    if (exceptUserId && Number(memberId) === Number(exceptUserId)) continue;
    sseSend(memberId, event, data);
  }
}

// ── Rate limiting ──────────────────────────────────────────────────────────
const _rateLimits = {};
function rateLimit(key, maxPerMinute) {
  const now = Date.now();
  const entry = _rateLimits[key];
  if (!entry || now > entry.resetAt) {
    _rateLimits[key] = { count: 1, resetAt: now + 60000 };
    return false; // not limited
  }
  entry.count++;
  if (entry.count > maxPerMinute) return true; // limited
  return false;
}
app.use(express.json({ limit: '8mb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagservices.com https://www.googletagmanager.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' data: blob: https:",
    "connect-src 'self' https://api.giphy.com https://discord.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://csi.gstatic.com https://www.google.com https://fundingchoicesmessages.google.com",
    "frame-src 'self' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.google.com https://fundingchoicesmessages.google.com",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; '));
  next();
});

app.use((req, _res, next) => {
  const store = loadStore();
  publishDuePosts(store);
  const user = authFromRequest(req, store);
  if (user) {
    const lastSeen = new Date(user.lastSeenAt || 0).getTime();
    if (!lastSeen || Date.now() - lastSeen > 60_000) {
      user.status = 'active';
      user.lastSeenAt = nowIso();
      user.updatedAt = nowIso();
      saveStore(store);
    }
  }
  req.authUser = user;
  next();
});

function requireAuth(req, res, next) {
  if (!req.authUser) return res.status(401).json({ error: 'Sign in first.' });
  if (req.authUser.bannedAt) return res.status(403).json({ error: 'Your account has been restricted.' });
  next();
}

function requireMember(req, res, next) {
  if (!req.authUser) return res.status(401).json({ error: 'Sign in first.' });
  if (req.authUser.bannedAt) return res.status(403).json({ error: 'Your account has been restricted.' });
  if (isGuestUser(req.authUser)) return res.status(403).json({ error: 'Guest mode is read-only. Create an account to continue.', guest: true });
  next();
}


// ── Maintenance mode ──────────────────────────────────────────────────────────
let _maintenanceMode = false;

app.post('/api/admin/maintenance', (req, res) => {
  const token = String(req.body?.token || '');
  const adminToken = process.env.ADMIN_TOKEN || '';
  if (!adminToken || token !== adminToken) return res.status(403).json({ error: 'Invalid token.' });
  _maintenanceMode = Boolean(req.body?.enabled);
  console.log(`[maintenance] mode: ${_maintenanceMode}`);
  res.json({ ok: true, maintenance: _maintenanceMode });
});

app.get('/api/maintenance', (_req, res) => {
  res.json({ maintenance: _maintenanceMode });
});

// Middleware: return 503 for API calls during maintenance (except health + maintenance endpoints)
app.use((req, res, next) => {
  if (_maintenanceMode && req.path.startsWith('/api/') &&
      !req.path.startsWith('/api/health') &&
      !req.path.startsWith('/api/maintenance') &&
      !req.path.startsWith('/api/admin/maintenance')) {
    return res.status(503).json({ error: 'Under maintenance. Check back soon.', maintenance: true });
  }
  next();
});

app.use((req, res, next) => {
  if (!req.path.startsWith('/api/') || !req.authUser || !isGuestUser(req.authUser)) return next();
  if (req.method === 'GET') {
    const readOnlyPrefixes = ['/api/auth/session', '/api/bootstrap', '/api/meta', '/api/ads', '/api/public/', '/api/search/all', '/api/health', '/api/maintenance'];
    if (readOnlyPrefixes.some((prefix) => req.path.startsWith(prefix))) return next();
  }
  if (req.method === 'POST' && req.path === '/api/auth/logout') return next();
  return res.status(403).json({ error: 'Guest mode is read-only. Create an account to continue.', guest: true });
});

app.get('/api/meta', (_req, res) => {
  res.json({
    siteName: SITE_NAME,
    wordmark: BRAND_WORDMARK,
    subscriptions,
    maxSitesFree: MAX_SITES_FREE,
    discordSupportUrl: DISCORD_SUPPORT_URL || null,
    adsenseClientId: ADSENSE_CLIENT_ID || null,
    oauthProviders: {
      google: Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET),
      discord: Boolean(DISCORD_CLIENT_ID && DISCORD_CLIENT_SECRET)
    },
    integrations: {
      telegram: {
        configured: Boolean(TELEGRAM_BOT_TOKEN),
        botUsername: TELEGRAM_BOT_USERNAME || null,
        status: 'preview'
      }
    }
  });
});

app.get('/api/health', (_req, res) => res.json({ ok: true, site: SITE_NAME }));
app.get('/api/auth/session', (req, res) => {
  const store = loadStore();
  const user = req.authUser ? mePayload(store, store.users.find((u) => Number(u.id) === Number(req.authUser.id)) || req.authUser).user : null;
  res.json({ user });
});

app.get('/api/auth/google', async (req, res) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) return res.status(503).send('Google sign-in is not configured on the server.');
  try {
    const discovery = await getGoogleDiscovery();
    const state = createToken();
    const next = safeNextPath(req.query.next || '/');
    setGoogleOAuthCookie(req, res, { state, next });
    const redirectUri = googleCallbackUrl(req);
    const authUrl = new URL(discovery.authorization_endpoint);
    authUrl.search = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      include_granted_scopes: 'true',
      prompt: 'select_account'
    }).toString();
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error('[auth/google] start failed', error);
    res.status(500).send('Google sign-in is temporarily unavailable.');
  }
});

app.get('/api/auth/google/callback', async (req, res) => {
  const oauthState = readGoogleOAuthCookie(req);
  const next = oauthState?.next || '/';
  clearGoogleOAuthCookie(req, res);
  if (req.query.error) return res.status(400).send(`Google sign-in failed: ${sanitizeText(req.query.error, 120)}`);
  const code = sanitizeText(req.query.code || '', 400);
  const state = sanitizeText(req.query.state || '', 200);
  if (!code || !state || !oauthState || state !== oauthState.state) return res.status(400).send('Invalid Google sign-in state.');
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) return res.status(503).send('Google sign-in is not configured on the server.');
  try {
    const discovery = await getGoogleDiscovery();
    const redirectUri = googleCallbackUrl(req);
    const tokenResponse = await fetch(discovery.token_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });
    if (!tokenResponse.ok) {
      const details = await tokenResponse.text();
      console.error('[auth/google] token exchange failed', details);
      return res.status(502).send('Google token exchange failed.');
    }
    const tokenPayload = await tokenResponse.json();
    const accessToken = String(tokenPayload.access_token || '');
    if (!accessToken) return res.status(502).send('Google access token missing.');

    const profileResponse = await fetch(discovery.userinfo_endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!profileResponse.ok) {
      const details = await profileResponse.text();
      console.error('[auth/google] userinfo failed', details);
      return res.status(502).send('Google profile lookup failed.');
    }
    const profile = await profileResponse.json();
    const email = sanitizeText(profile.email || '', 120).toLowerCase();
    const googleSub = sanitizeText(profile.sub || '', 120);
    const displayName = sanitizeText(profile.name || profile.given_name || email.split('@')[0], 60) || 'Member';
    if (!email || !googleSub || !profile.email_verified) return res.status(403).send('Google account email must be verified.');

    const store = loadStore();
    let user = store.users.find((item) => item.googleSub === googleSub) || null;
    if (!user) {
      const existingByEmail = store.users.find((item) => String(item.email || '').toLowerCase() === email) || null;
      if (existingByEmail && existingByEmail.googleSub && existingByEmail.googleSub !== googleSub) {
        return res.status(409).send('This email is already linked to another Google account.');
      }
      user = existingByEmail;
    }

    if (!user) {
      user = userDefaults({
        id: nextId(store, 'users'),
        displayName,
        handle: uniqueHandle(store, email.split('@')[0] || displayName),
        email,
        googleSub,
        passwordHash: '',
        roleInternal: 'member',
        bio: '',
        avatarUrl: sanitizeText(profile.picture || '', 300),
        accent: 'violet',
        themePreference: 'dark',
        languagePreference: 'en',
        privacy: { showEmail: false, showRole: false, showActivity: false, profileVisibility: 'public', allowInvites: true, allowDirectMessages: 'everyone' },
        emailVerified: true,
        status: 'active',
        createdAt: nowIso(),
        updatedAt: nowIso()
      });
      store.users.push(user);
    } else {
      user.googleSub = user.googleSub || googleSub;
      user.email = user.email || email;
      user.displayName = user.displayName || displayName;
      user.avatarUrl = user.avatarUrl || sanitizeText(profile.picture || '', 300);
      user.emailVerified = user.emailVerified !== false || Boolean(profile.email_verified);
      user.updatedAt = nowIso();
    }

    autoCreateDefaultSite(store, user);
    createSessionForUser(req, res, store, user.id);
    saveStore(store);
    res.redirect(next);
  } catch (error) {
    console.error('[auth/google] callback failed', error);
    res.status(500).send('Google sign-in failed.');
  }
});

// ── Discord OAuth ─────────────────────────────────────────────────────────────
app.get('/api/auth/discord', async (req, res) => {
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) return res.status(503).send('Discord sign-in is not configured on the server.');
  try {
    const state = createToken();
    const next = safeNextPath(req.query.next || '/');
    setDiscordOAuthCookie(req, res, { state, next });
    const authUrl = new URL('https://discord.com/api/oauth2/authorize');
    authUrl.search = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      redirect_uri: discordCallbackUrl(req),
      response_type: 'code',
      scope: 'identify email',
      state,
      prompt: 'consent'
    }).toString();
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error('[auth/discord] start failed', error);
    res.status(500).send('Discord sign-in is temporarily unavailable.');
  }
});

app.get('/api/auth/discord/callback', async (req, res) => {
  const oauthState = readDiscordOAuthCookie(req);
  const next = oauthState?.next || '/';
  clearDiscordOAuthCookie(req, res);
  if (req.query.error) return res.status(400).send(`Discord sign-in failed: ${sanitizeText(req.query.error, 120)}`);
  const code = sanitizeText(req.query.code || '', 400);
  const state = sanitizeText(req.query.state || '', 200);
  if (!code || !state || !oauthState || state !== oauthState.state) return res.status(400).send('Invalid Discord sign-in state.');
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) return res.status(503).send('Discord sign-in is not configured on the server.');
  try {
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        redirect_uri: discordCallbackUrl(req),
        grant_type: 'authorization_code'
      })
    });
    if (!tokenResponse.ok) {
      const details = await tokenResponse.text();
      console.error('[auth/discord] token exchange failed', details);
      return res.status(502).send('Discord token exchange failed.');
    }
    const tokenPayload = await tokenResponse.json();
    const accessToken = String(tokenPayload.access_token || '');
    if (!accessToken) return res.status(502).send('Discord access token missing.');

    const profileResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!profileResponse.ok) {
      const details = await profileResponse.text();
      console.error('[auth/discord] userinfo failed', details);
      return res.status(502).send('Discord profile lookup failed.');
    }
    const profile = await profileResponse.json();
    const discordSub = sanitizeText(String(profile.id || ''), 120);
    const email = sanitizeText(String(profile.email || ''), 120).toLowerCase();
    const displayName = sanitizeText(profile.global_name || profile.username || email.split('@')[0], 60) || 'Member';
    const avatarUrl = profile.avatar
      ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
      : '';
    if (!discordSub) return res.status(403).send('Discord account ID missing.');

    const store = loadStore();
    let user = store.users.find((item) => item.discordSub === discordSub) || null;
    if (!user && email) {
      const existingByEmail = store.users.find((item) => String(item.email || '').toLowerCase() === email) || null;
      if (existingByEmail && existingByEmail.discordSub && existingByEmail.discordSub !== discordSub) {
        return res.status(409).send('This email is already linked to another Discord account.');
      }
      user = existingByEmail;
    }

    if (!user) {
      user = userDefaults({
        id: nextId(store, 'users'),
        displayName,
        handle: uniqueHandle(store, (email ? email.split('@')[0] : null) || displayName),
        email,
        discordSub,
        passwordHash: '',
        roleInternal: 'member',
        bio: '',
        avatarUrl,
        accent: 'violet',
        themePreference: 'dark',
        languagePreference: 'en',
        privacy: { showEmail: false, showRole: false, showActivity: false, profileVisibility: 'public', allowInvites: true, allowDirectMessages: 'everyone' },
        emailVerified: Boolean(profile.verified),
        status: 'active',
        createdAt: nowIso(),
        updatedAt: nowIso()
      });
      store.users.push(user);
    } else {
      user.discordSub = user.discordSub || discordSub;
      user.email = user.email || email;
      user.displayName = user.displayName || displayName;
      user.avatarUrl = user.avatarUrl || avatarUrl;
      user.emailVerified = user.emailVerified !== false || Boolean(profile.verified);
      user.updatedAt = nowIso();
    }

    autoCreateDefaultSite(store, user);
    createSessionForUser(req, res, store, user.id);
    saveStore(store);
    res.redirect(next);
  } catch (error) {
    console.error('[auth/discord] callback failed', error);
    res.status(500).send('Discord sign-in failed.');
  }
});

app.post('/api/auth/unlink', requireAuth, (req, res) => {
  const provider = String(req.body?.provider || '').toLowerCase();
  if (!['google', 'discord'].includes(provider)) return res.status(400).json({ error: 'Invalid provider.' });
  const store = loadStore();
  const user = store.users.find((u) => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const key = provider === 'google' ? 'googleSub' : 'discordSub';
  if (!user[key]) return res.status(400).json({ error: `${provider} not linked.` });
  const otherKey = provider === 'google' ? 'discordSub' : 'googleSub';
  if (!user.passwordHash && !user[otherKey]) {
    return res.status(400).json({ error: 'Set a password before unlinking — this is your only sign-in method.' });
  }
  user[key] = '';
  saveStore(store);
  res.json({ ok: true });
});

app.get('/api/integrations/telegram/status', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((u) => Number(u.id) === Number(req.authUser.id));
  const tg = user?.integrations?.telegram || null;
  res.json({
    configured: Boolean(TELEGRAM_BOT_TOKEN),
    botUsername: TELEGRAM_BOT_USERNAME || null,
    status: 'preview',
    linked: Boolean(tg?.userId),
    userId: tg?.userId || null,
    username: tg?.username || null
  });
});

app.post('/api/integrations/telegram/link', requireAuth, (_req, res) => {
  res.status(202).json({
    ok: false,
    status: 'preview',
    message: 'Telegram bridge is coming soon. The server is prepared — Bot API/MTProto pairing will go live as soon as the relay is ready.'
  });
});

app.post('/api/integrations/telegram/unlink', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((u) => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (user.integrations?.telegram) {
    user.integrations.telegram = null;
    saveStore(store);
  }
  res.json({ ok: true });
});

app.post('/api/integrations/telegram/webhook', (req, res) => {
  // Reserved for Telegram Bot API webhook — signature verification handled here
  // once TELEGRAM_BOT_TOKEN is provisioned. Returning 204 keeps the endpoint idempotent.
  res.status(204).end();
});

app.post('/api/auth/register', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').toString().split(',')[0].trim();
  if (rateLimit(`reg:${ip}`, 3)) return res.status(429).json({ error: 'Too many registrations from this IP. Try again later.' });
  const store = loadStore();
  const displayName = sanitizeText(req.body?.displayName, 60);
  const email = sanitizeText(req.body?.email, 120).toLowerCase();
  const password = String(req.body?.password || '');
  const requestedHandle = cleanHandle(req.body?.handle);
  const handle = requestedHandle || uniqueHandle(store, email.split('@')[0] || displayName);
  if (!displayName || !email || !password) return res.status(400).json({ error: 'Fill in every required field.' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (requestedHandle && store.users.some((user) => user.handleCanonical === canonicalHandle(handle))) return res.status(409).json({ error: 'That handle already exists.' });
  if (store.users.some((user) => String(user.email || '').toLowerCase() === email)) return res.status(409).json({ error: 'That email already exists.' });
  // Legal consent (GDPR / ToS acceptance). Required.
  const consentTos = req.body?.consentTosAt || req.body?.agreeTos;
  if (!consentTos) return res.status(400).json({ error: 'You must accept the Terms of Service and Privacy Policy to create an account.' });
  const consentTosAt = typeof consentTos === 'string' && /^\d{4}-/.test(consentTos) ? consentTos : nowIso();
  const consentMarketing = Boolean(req.body?.consentMarketing);
  const user = userDefaults({
    id: nextId(store, 'users'),
    displayName,
    handle,
    email,
    passwordHash: bcrypt.hashSync(password, 12),
    roleInternal: 'member',
    bio: '',
    accent: 'violet',
    themePreference: 'dark',
    languagePreference: 'en',
    privacy: { showEmail: false, showRole: false, showActivity: false, profileVisibility: 'public', allowInvites: true, allowDirectMessages: 'everyone' },
    consent: {
      tosAcceptedAt: consentTosAt,
      tosVersion: '2026-04-19',
      marketingEmails: consentMarketing,
      ipAtConsent: ip,
      userAgentAtConsent: sanitizeText(req.headers['user-agent'] || '', 200)
    },
    emailVerified: false,
    status: 'active',
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.users.push(user);
  autoCreateDefaultSite(store, user);
  const sessionToken = createSessionForUser(req, res, store, user.id);
  saveStore(store);
  res.status(201).json({ user: mePayload(store, user).user, sessionToken });
});

app.post('/api/auth/login', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').toString().split(',')[0].trim();
  if (rateLimit(`login:${ip}`, 10)) return res.status(429).json({ error: 'Too many login attempts. Try again in a minute.' });
  const store = loadStore();
  const identity = sanitizeText(req.body?.identity || '', 120).toLowerCase();
  const password = String(req.body?.password || '');
  if (!identity || !password) return res.status(400).json({ error: 'Fill in every required field.' });
  const user = store.users.find((item) => item.handleCanonical === canonicalHandle(identity) || String(item.email || '').toLowerCase() === identity);
  if (!user || !user.passwordHash || !bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid credentials.' });
  if (user.bannedAt) return res.status(403).json({ error: 'This account has been suspended.' });
  const sessionToken = createSessionForUser(req, res, store, user.id);
  saveStore(store);
  res.json({ user: mePayload(store, user).user, sessionToken });
});


app.post('/api/auth/switch', (req, res) => {
  const store = loadStore();
  const token = sanitizeText(req.body?.sessionToken, 128);
  if (!token) return res.status(400).json({ error: 'Session token is required.' });
  store.sessions = store.sessions.filter((session) => new Date(session.expiresAt) > new Date());
  const session = store.sessions.find((entry) => entry.tokenHash === hashToken(token));
  if (!session) return res.status(401).json({ error: 'Session not found.' });
  const user = store.users.find((item) => Number(item.id) === Number(session.userId));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  setSessionCookie(req, res, token);
  saveStore(store);
  res.json({ user: mePayload(store, user).user, sessionToken: token });
});

app.post('/api/auth/logout', (req, res) => {
  const store = loadStore();
  const token = readSessionToken(req);
  if (token) {
    const tokenHash = hashToken(token);
    store.sessions = store.sessions.filter((session) => session.tokenHash !== tokenHash);
    saveStore(store);
  }
  clearSessionCookie(req, res);
  res.json({ ok: true });
});

app.get('/api/bootstrap', (req, res) => {
  const store = loadStore();
  const viewerId = req.authUser?.id || null;
  const publicUsers = store.users.map((user) => publicUser(store, user, viewerId)).sort((a, b) => b.score - a.score);
  const publicProjects = store.projects.filter((item) => item.visibility === 'public').map((item) => publicProject(store, item, viewerId)).sort((a, b) => sortDateDesc(a, b, 'updatedAt'));
  const publicSites = store.sites.filter((item) => item.visibility === 'public').map((item) => publicSite(store, item, viewerId)).sort((a, b) => sortDateDesc(a, b, 'updatedAt'));
  const feed = store.posts.filter((item) => item.status === 'published' && item.kind === 'quick').map((item) => publicPost(store, item, viewerId)).sort((a, b) => sortDateDesc(a, b, 'publishedAt'));
  const devlogs = store.posts.filter((item) => item.status === 'published' && item.kind === 'devlog').map((item) => publicPost(store, item, viewerId)).sort((a, b) => sortDateDesc(a, b, 'publishedAt'));
  const openRooms = store.rooms.filter((room) => room.visibility === 'open').map((room) => publicRoom(store, room, viewerId)).sort((a, b) => sortDateDesc(a, b, 'lastActivityAt'));
  const me = req.authUser ? mePayload(store, store.users.find((u) => Number(u.id) === Number(req.authUser.id))) : null;
  res.json({
    meta: {
      siteName: SITE_NAME,
      wordmark: BRAND_WORDMARK,
      subscriptions,
      maxSitesFree: MAX_SITES_FREE,
      discordSupportUrl: DISCORD_SUPPORT_URL || null,
      adsenseClientId: ADSENSE_CLIENT_ID || null,
      oauthProviders: {
        google: Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET),
        discord: Boolean(DISCORD_CLIENT_ID && DISCORD_CLIENT_SECRET)
      },
      integrations: {
        telegram: {
          configured: Boolean(TELEGRAM_BOT_TOKEN),
          botUsername: TELEGRAM_BOT_USERNAME || null,
          status: 'preview'
        }
      },
      badges: [
        { code: 'USR', label: 'User' },
        { code: 'DEV', label: 'Developer' },
        { code: 'VRF', label: 'Verified' },
        { code: 'MED', label: 'Media' },
        { code: 'MOD', label: 'Moderator' },
        { code: 'STD', label: 'Studio' }
      ]
    },
    session: me?.user || null,
    me,
    home: {
      recentProjects: publicProjects.slice(0, 8),
      featuredSites: publicSites.slice(0, 8),
      feedPreview: feed.slice(0, 6),
      devlogPreview: devlogs.slice(0, 4),
      openRooms: openRooms.slice(0, 8),
      stats: {
        users: publicUsers.length,
        projects: publicProjects.length,
        sites: publicSites.length,
        workspaces: store.workspaces.length,
        groups: store.rooms.filter((room) => room.surface === 'group').length
      }
    }
  });
});

app.get('/api/search/all', (req, res) => {
  const store = loadStore();
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  const sort = String(req.query.sort || 'relevance');
  const viewerId = req.authUser?.id || null;
  const roomList = store.rooms.filter((room) => room.visibility === 'open' || room.memberIds.includes(Number(viewerId))).map((room) => publicRoom(store, room, viewerId));
  const userList = store.users.map((user) => publicUser(store, user, viewerId));
  const projectList = store.projects.filter((item) => item.visibility === 'public').map((item) => publicProject(store, item, viewerId));
  const siteList = store.sites.filter((item) => item.visibility === 'public').map((item) => publicSite(store, item, viewerId));
  const scoreText = (haystack) => q ? String(haystack || '').toLowerCase().includes(q) : true;
  const payload = {
    users: userList.filter((item) => !q || [item.displayName, item.handle, item.bio, ...(item.badges || [])].join(' ').toLowerCase().includes(q)),
    projects: projectList.filter((item) => !q || [item.title, item.summary, item.description, ...(item.tags || [])].join(' ').toLowerCase().includes(q)),
    sites: siteList.filter((item) => !q || [item.title, item.summary, item.owner?.displayName, item.owner?.handle].join(' ').toLowerCase().includes(q)),
    rooms: roomList.filter((item) => !q || [item.title, item.description, ...(item.tags || []), item.otherUser?.displayName, item.otherUser?.handle].join(' ').toLowerCase().includes(q))
  };
  const byDate = (list, key='updatedAt') => list.sort((a,b) => sortDateDesc(a,b,key));
  if (sort === 'date') {
    byDate(payload.projects, 'updatedAt');
    byDate(payload.sites, 'updatedAt');
    byDate(payload.rooms, 'lastActivityAt');
    byDate(payload.users, 'updatedAt');
  } else if (sort === 'popularity') {
    payload.users.sort((a, b) => b.score - a.score);
    payload.projects.sort((a, b) => ((b.owner?.score || 0) + (b.featured ? 30 : 0)) - ((a.owner?.score || 0) + (a.featured ? 30 : 0)));
    payload.sites.sort((a, b) => (b.owner?.score || 0) - (a.owner?.score || 0));
    payload.rooms.sort((a, b) => (b.messageCount + b.memberCount * 2) - (a.messageCount + a.memberCount * 2));
  } else if (q) {
    const scoreItem = (text) => text.split(q).length - 1;
    payload.users.sort((a,b) => scoreItem([b.displayName,b.handle,b.bio].join(' ').toLowerCase()) - scoreItem([a.displayName,a.handle,a.bio].join(' ').toLowerCase()));
    payload.projects.sort((a,b) => scoreItem([b.title,b.summary,b.description].join(' ').toLowerCase()) - scoreItem([a.title,a.summary,a.description].join(' ').toLowerCase()));
    payload.sites.sort((a,b) => scoreItem([b.title,b.summary,b.owner?.displayName].join(' ').toLowerCase()) - scoreItem([a.title,a.summary,a.owner?.displayName].join(' ').toLowerCase()));
    payload.rooms.sort((a,b) => scoreItem([b.title,b.description,...(b.tags||[])].join(' ').toLowerCase()) - scoreItem([a.title,a.description,...(a.tags||[])].join(' ').toLowerCase()));
  }
  res.json(payload);
});

// (feed endpoint replaced by paginated version)

app.get('/api/public/feed/:id/comments', (req, res) => {
  const store = loadStore();
  const postId = Number(req.params.id);
  const comments = store.comments.filter((item) => Number(item.postId) === postId).sort((a, b) => sortDateDesc(a, b)).map((item) => publicComment(store, item, req.authUser?.id));
  res.json({ items: comments });
});

app.post('/api/public/feed/:id/likes', requireAuth, (req, res) => {
  const store = loadStore();
  const postId = Number(req.params.id);
  const userId = req.authUser.id;
  const post = store.posts.find((item) => Number(item.id) === postId && item.status === 'published');
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  const existing = store.likes.find((item) => Number(item.postId) === postId && Number(item.userId) === Number(userId));
  if (existing) {
    store.likes = store.likes.filter((item) => !(Number(item.postId) === postId && Number(item.userId) === Number(userId)));
  } else {
    store.likes.push({ id: nextId(store, 'likes'), postId, userId, createdAt: nowIso() });
    if (post && Number(post.userId) !== Number(userId)) {
      const note = notificationDefaults({ id: nextId(store, 'notifications'), userId: post.userId, title: 'New like', body: `@${req.authUser.handle} liked your post.`, href: '/feed', createdAt: nowIso(), readAt: null });
      store.notifications.push(note);
      sseSend(post.userId, 'notification', note);
    }
  }
  saveStore(store);
  const liked = store.likes.some((item) => Number(item.postId) === postId && Number(item.userId) === Number(userId));
  res.json({ ok: true, count: store.likes.filter((item) => Number(item.postId) === postId).length, liked });
});

app.post('/api/public/feed/:id/comments', requireAuth, (req, res) => {
  const store = loadStore();
  const postId = Number(req.params.id);
  const body = sanitizeText(req.body?.body, 1800);
  const stickerId = req.body?.stickerId ? Number(req.body.stickerId) : null;
  if (!body && !stickerId) return res.status(400).json({ error: 'Write a comment or attach a sticker.' });
  const comment = commentDefaults({ id: nextId(store, 'comments'), postId, userId: req.authUser.id, body, stickerId, createdAt: nowIso(), updatedAt: nowIso() });
  store.comments.push(comment);
  const post = store.posts.find((item) => Number(item.id) === postId);
  if (post && Number(post.userId) !== Number(req.authUser.id)) {
    const note = notificationDefaults({ id: nextId(store, 'notifications'), userId: post.userId, title: 'New comment', body: `@${req.authUser.handle} commented on your post.`, href: '/feed', createdAt: nowIso(), readAt: null });
    store.notifications.push(note);
    sseSend(post.userId, 'notification', note);
  }
  saveStore(store);
  res.status(201).json({ item: publicComment(store, comment, req.authUser.id) });
});

app.get('/api/public/profile/:handle', (req, res) => {
  const store = loadStore();
  const handle = canonicalHandle(req.params.handle);
  const user = store.users.find((item) => item.handleCanonical === handle);
  if (!user) return res.status(404).json({ error: 'Profile not found.' });
  const profile = publicUser(store, user, req.authUser?.id);
  const projects = store.projects.filter((item) => Number(item.userId) === Number(user.id) && item.visibility === 'public').map((item) => publicProject(store, item, req.authUser?.id));
  const sites = store.sites.filter((item) => Number(item.userId) === Number(user.id) && item.visibility === 'public').map((item) => publicSite(store, item, req.authUser?.id));
  const posts = store.posts.filter((item) => Number(item.userId) === Number(user.id) && item.status === 'published').map((item) => publicPost(store, item, req.authUser?.id)).sort((a, b) => sortDateDesc(a, b, 'publishedAt'));
  const verification = store.verificationRequests.filter((item) => Number(item.userId) === Number(user.id)).sort((a, b) => sortDateDesc(a, b))[0] || null;
  res.json({ profile, projects, sites, posts, verification, canMessage: req.authUser ? profile.relation?.following || user.privacy.allowDirectMessages !== 'followers' : false });
});

app.get('/api/public/profile/:handle/relations', (req, res) => {
  const store = loadStore();
  const handle = canonicalHandle(req.params.handle);
  const user = store.users.find((item) => item.handleCanonical === handle);
  if (!user) return res.status(404).json({ error: 'Profile not found.' });
  const kind = String(req.query.kind || 'followers');
  const viewerId = req.authUser?.id || null;
  let list = [];
  if (kind === 'followers') {
    list = store.follows.filter((f) => Number(f.targetUserId) === Number(user.id))
      .map((f) => publicUser(store, store.users.find((u) => Number(u.id) === Number(f.followerUserId)), viewerId))
      .filter(Boolean);
  } else if (kind === 'following') {
    list = store.follows.filter((f) => Number(f.followerUserId) === Number(user.id))
      .map((f) => publicUser(store, store.users.find((u) => Number(u.id) === Number(f.targetUserId)), viewerId))
      .filter(Boolean);
  } else if (kind === 'friends') {
    const friendIds = store.friendRequests
      .filter((r) => r.status === 'accepted' && (Number(r.fromUserId) === Number(user.id) || Number(r.toUserId) === Number(user.id)))
      .map((r) => Number(r.fromUserId) === Number(user.id) ? Number(r.toUserId) : Number(r.fromUserId));
    list = friendIds.map((id) => publicUser(store, store.users.find((u) => Number(u.id) === id), viewerId)).filter(Boolean);
  }
  res.json({ kind, users: list });
});

app.get('/api/public/projects/:slug', (req, res) => {
  const store = loadStore();
  const project = store.projects.find((item) => item.slug === slugify(req.params.slug) && item.visibility === 'public');
  if (!project) return res.status(404).json({ error: 'Project not found.' });
  const payload = publicProject(store, project, req.authUser?.id);
  const relatedPosts = store.posts.filter((item) => Number(item.projectId) === Number(project.id) && item.status === 'published').map((item) => publicPost(store, item, req.authUser?.id));
  res.json({ project: payload, posts: relatedPosts });
});

app.get('/api/public/sites', (req, res) => {
  const store = loadStore();
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  const sort = String(req.query.sort || 'date');
  let items = store.sites.filter((item) => item.visibility === 'public').map((item) => publicSite(store, item, req.authUser?.id));
  if (q) items = items.filter((item) => [item.title, item.summary, item.owner?.displayName, item.owner?.handle].join(' ').toLowerCase().includes(q));
  if (sort === 'popularity') items.sort((a, b) => (b.owner?.score || 0) - (a.owner?.score || 0));
  else items.sort((a, b) => sortDateDesc(a, b, 'updatedAt'));
  res.json({ items });
});

app.get('/api/chat/bootstrap', requireAuth, (req, res) => {
  const store = loadStore();
  const userId = req.authUser.id;
  const workspaces = store.workspaces.filter((workspace) => workspace.memberIds.includes(Number(userId)) || workspace.visibility === 'open').map((workspace) => publicWorkspace(store, workspace, userId));
  const rooms = store.rooms.filter((room) => roomAppearsInChatList(room, userId)).map((room) => publicRoom(store, room, userId)).sort((a, b) => sortDateDesc(a, b, 'lastActivityAt'));
  const selectedRoom = rooms.find((room) => !room.state.archived) || rooms[0] || null;
  const tasks = selectedRoom ? store.tasks.filter((task) => (selectedRoom.workspace?.id && Number(task.workspaceId) === Number(selectedRoom.workspace.id)) || (task.roomId && Number(task.roomId) === Number(selectedRoom.id))).map((task) => publicTask(store, task)) : [];
  const me = mePayload(store, req.authUser);
  const segments = {
    personal: rooms.filter((room) => room.surface === 'personal'),
    work: rooms.filter((room) => room.surface === 'work' || room.surface === 'workspace'),
    groups: rooms.filter((room) => room.surface === 'group'),
    friends: me.social.friends,
    following: me.social.follows,
    friendRequests: me.social.friendRequests
  };
  res.json({ workspaces, rooms, segments, selectedRoom, tasks, social: me.social });
});

// (messages endpoint replaced by paginated version below)

app.post('/api/chat/rooms/:slug/messages', requireAuth, (req, res) => {
  // Rate limit: 30 messages per minute per user
  if (rateLimit(`msg:${req.authUser.id}`, 30)) return res.status(429).json({ error: 'Slow down — too many messages.' });
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct') {
    if (roomSubscriptionLocked(store, room, req.authUser.id)) {
      return res.status(403).json({
        error: `Upgrade to ${subscriptionPlan(room.subscription.requiredPlanId)?.label || room.subscription.requiredPlanId} to join this room.`,
        upgradeRequired: true,
        requiredPlanId: room.subscription.requiredPlanId
      });
    }
    if (!room.memberIds.includes(Number(req.authUser.id))) {
      return res.status(403).json({ error: 'Join this room first.', joinRequired: true });
    }
    if (!roomCanPost(store, room, req.authUser.id)) {
      return res.status(403).json({ error: 'Only admins can post in this room.' });
    }
  }
  const body = sanitizeText(req.body?.body, 4000);
  const stickerId = req.body?.stickerId ? Number(req.body.stickerId) : null;
  const attachmentName = sanitizeText(req.body?.attachmentName, 90);
  const attachmentDataUrl = safeDataUrl(req.body?.attachmentDataUrl, IMAGE_UPLOAD_LIMIT_BYTES * 4, ['image', 'audio']);
  const attachmentType = sanitizeText(req.body?.attachmentType || '', 30);
  const encrypted = Boolean(req.body?.encrypted && ['personal', 'work'].includes(room.surface));
  const clientNonce = sanitizeText(req.body?.clientNonce || '', 80);
  const MAX_ATTACHMENTS = 10;
  const rawAttachments = Array.isArray(req.body?.attachments) ? req.body.attachments.slice(0, MAX_ATTACHMENTS) : [];
  const attachments = [];
  for (const raw of rawAttachments) {
    if (!raw || typeof raw !== 'object') continue;
    const rawName = sanitizeText(raw.name || '', 90);
    if (raw.dataUrl) {
      const dataUrl = safeDataUrl(raw.dataUrl, IMAGE_UPLOAD_LIMIT_BYTES * 4, ['image', 'audio']);
      if (!dataUrl) continue;
      const isAudio = raw.type === 'audio' || /^data:audio\//.test(dataUrl);
      const stored = isAudio
        ? saveDataAudio(dataUrl, `voice-${room.id}`)
        : saveDataImage(dataUrl, `chat-${room.id}`);
      if (!stored) continue;
      attachments.push({
        name: rawName || (isAudio ? 'Voice message' : 'Image'),
        url: stored,
        type: isAudio ? 'audio' : 'image',
        width: Number(raw.width || 0),
        height: Number(raw.height || 0),
        duration: Number(raw.duration || 0)
      });
    } else if (raw.url) {
      attachments.push({
        name: rawName || 'Attachment',
        url: sanitizeText(raw.url, 600),
        type: sanitizeText(raw.type || 'link', 30),
        width: Number(raw.width || 0),
        height: Number(raw.height || 0)
      });
    }
  }
  let attachment = null;
  if (!attachments.length) {
    if (attachmentDataUrl) {
      const isAudio = attachmentType === 'audio' || /^data:audio\//.test(attachmentDataUrl);
      const stored = isAudio
        ? saveDataAudio(attachmentDataUrl, `voice-${room.id}`)
        : saveDataImage(attachmentDataUrl, `chat-${room.id}`);
      if (stored) {
        attachment = {
          name: attachmentName || (isAudio ? 'Voice message' : 'Image'),
          url: stored,
          type: isAudio ? 'audio' : 'image',
          width: Number(req.body?.attachmentWidth || 0),
          height: Number(req.body?.attachmentHeight || 0),
          duration: Number(req.body?.attachmentDuration || 0)
        };
      }
    } else if (req.body?.attachmentUrl) {
      attachment = {
        name: attachmentName || 'Attachment',
        url: sanitizeText(req.body?.attachmentUrl, 600),
        type: sanitizeText(req.body?.attachmentType || 'link', 30),
        width: Number(req.body?.attachmentWidth || 0),
        height: Number(req.body?.attachmentHeight || 0)
      };
    }
  } else if (attachments.length === 1) {
    attachment = attachments[0];
  }
  if (!body && !stickerId && !attachment && !attachments.length && !encrypted) return res.status(400).json({ error: 'Write a message or attach something.' });
  const message = messageDefaults({
    id: nextId(store, 'messages'),
    roomId: room.id,
    userId: req.authUser.id,
    body: encrypted ? '' : body,
    encrypted,
    ciphertext: encrypted ? sanitizeText(req.body?.ciphertext, 50000) : '',
    iv: encrypted ? sanitizeText(req.body?.iv, 400) : '',
    attachment,
    attachments: attachments.length > 1 ? attachments : [],
    stickerId,
    clientNonce,
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  room.updatedAt = nowIso();
  room.lastActivityAt = nowIso();
  store.messages.push(message);
  saveStore(store);
  const pubMsg = publicMessage(store, message, req.authUser.id);
  // Real-time push to all room members via SSE
  sseBroadcastRoom(store, room.id, 'new_message', pubMsg);
  // Notification only for offline members (SSE will handle online ones)
  for (const memberId of room.memberIds) {
    if (Number(memberId) !== Number(req.authUser.id)) {
      const isOnline = sseClients.has(Number(memberId)) && sseClients.get(Number(memberId)).size > 0;
      if (!isOnline) makeNotification(store, memberId, `New message in ${room.title || room.description}`, encrypted ? 'Encrypted message' : `@${req.authUser.handle}: ${body || attachmentName || 'Sticker'}`, `/messages/${room.slug}`);
    }
  }
  saveStore(store);
  res.status(201).json({ item: pubMsg });
});

app.post('/api/chat/direct/:handle', requireAuth, (req, res) => {
  if (rateLimit(`dm:${req.authUser.id}`, 20)) return res.status(429).json({ error: 'Sending too fast. Slow down.' });
  const store = loadStore();
  const target = store.users.find((item) => item.handleCanonical === canonicalHandle(req.params.handle));
  if (!target) return res.status(404).json({ error: 'User not found.' });
  const surface = req.body?.surface === 'work' ? 'work' : 'personal';
  const allowDM = String(target.privacy?.allowDirectMessages || 'everyone');
  if (allowDM === 'nobody') return res.status(403).json({ error: 'This user is not accepting direct messages.' });
  if (allowDM === 'followers' && !followsUser(store, req.authUser.id, target.id) && Number(req.authUser.id) !== Number(target.id)) return res.status(403).json({ error: 'Follow this user before starting a direct message.' });
  const members = [Number(req.authUser.id), Number(target.id)].sort((a, b) => a - b);
  const memberSet = new Set(members);
  const slug = `dm-${surface}-${[canonicalHandle(req.authUser.handle), target.handleCanonical].sort().join('--')}`;
  let room = store.rooms.find((item) => {
    if (item.kind !== 'direct' || item.surface !== surface) return false;
    if (!Array.isArray(item.memberIds)) return false;
    const ids = item.memberIds.map(Number);
    return ids.length === members.length && ids.every((id) => memberSet.has(id));
  });
  let shouldSave = false;
  if (!room) room = store.rooms.find((item) => item.kind === 'direct' && item.surface === surface && item.slug === slug);
  if (!room) {
    room = roomDefaults({
      id: nextId(store, 'rooms'),
      workspaceId: null,
      slug,
      title: target.displayName,
      description: surface === 'work' ? 'Work direct chat' : 'Personal direct chat',
      kind: 'direct',
      surface,
      visibility: 'private',
      createdByUserId: req.authUser.id,
      ownerUserId: req.authUser.id,
      memberIds: members,
      memberRoles: { [req.authUser.id]: 'owner', [target.id]: 'member' },
      tags: surface === 'work' ? ['work'] : ['dm'],
      createdAt: nowIso(),
      updatedAt: nowIso(),
      lastActivityAt: nowIso()
    });
    store.rooms.push(room);
    shouldSave = true;
  } else {
    if (!room.memberIds.includes(Number(req.authUser.id))) {
      room.memberIds.push(Number(req.authUser.id));
      shouldSave = true;
    }
    if (!room.memberIds.includes(Number(target.id))) {
      room.memberIds.push(Number(target.id));
      shouldSave = true;
    }
    if (room.surface !== surface) {
      room.surface = surface;
      shouldSave = true;
    }
    if (!room.description) {
      room.description = surface === 'work' ? 'Work direct chat' : 'Personal direct chat';
      shouldSave = true;
    }
  }
  if (shouldSave) {
    room.updatedAt = nowIso();
    saveStore(store);
  }
  res.status(201).json({ room: publicRoom(store, room, req.authUser.id) });
});

app.patch('/api/chat/rooms/:slug', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const role = room.memberRoles?.[String(req.authUser.id)] || 'member';
  if (req.body?.state) {
    const keyMap = { archived: 'archivedByUserIds', pinned: 'pinnedByUserIds', muted: 'mutedByUserIds' };
    for (const [stateKey, field] of Object.entries(keyMap)) {
      if (typeof req.body.state[stateKey] === 'boolean') {
        const list = room[field];
        const id = Number(req.authUser.id);
        const has = list.includes(id);
        if (req.body.state[stateKey] && !has) list.push(id);
        if (!req.body.state[stateKey] && has) room[field] = list.filter((item) => Number(item) !== id);
      }
    }
  }
  if (['owner', 'admin', 'moderator'].includes(role)) {
    if (req.body?.title) room.title = sanitizeText(req.body.title, 90) || room.title;
    if (req.body?.slug) room.slug = slugify(req.body.slug || room.slug);
    if (req.body?.description !== undefined) room.description = sanitizeText(req.body.description, 220);
    if (req.body?.visibility && ['open', 'private', 'secret'].includes(req.body.visibility) && room.kind !== 'direct') room.visibility = req.body.visibility;
    if (req.body?.avatarDataUrl) room.avatarUrl = saveDataImage(req.body.avatarDataUrl, `room-${room.id}`) || room.avatarUrl;
    if (req.body?.tags) room.tags = ensureArray(req.body.tags).map((tag) => sanitizeText(tag, 20)).filter(Boolean);
    if (req.body?.permissions && room.kind !== 'direct') room.permissions = sanitizeRoomPermissions({ ...room.permissions, ...req.body.permissions });
    if (req.body?.subscription && room.kind !== 'direct') room.subscription = sanitizeRoomSubscription(req.body.subscription);
    if (req.body?.memberRoles) {
      for (const [userId, nextRole] of Object.entries(req.body.memberRoles)) {
        if (room.memberIds.includes(Number(userId)) && ['owner', 'admin', 'moderator', 'member'].includes(nextRole)) room.memberRoles[String(userId)] = nextRole;
      }
    }
  }
  room.updatedAt = nowIso();
  saveStore(store);
  res.json({ room: publicRoom(store, room, req.authUser.id) });
});

app.patch('/api/chat/rooms/:slug/preferences', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (!user.settings || typeof user.settings !== 'object') user.settings = {};
  user.settings.chatThemesByRoom = sanitizeChatThemeMap(user.settings.chatThemesByRoom);
  if (req.body?.clearTheme) {
    delete user.settings.chatThemesByRoom[room.slug];
  } else {
    const nextTheme = sanitizeChatTheme(req.body?.chatTheme, user.settings.chatThemesByRoom[room.slug] || null);
    if (!nextTheme) return res.status(400).json({ error: 'Chat theme is invalid.' });
    user.settings.chatThemesByRoom[room.slug] = nextTheme;
  }
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({
    theme: user.settings.chatThemesByRoom[room.slug] || null,
    user: mePayload(store, user).user
  });
});

app.delete('/api/chat/rooms/:slug', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const role = room.memberRoles?.[String(req.authUser.id)] || 'member';
  if (room.kind === 'direct') {
    if (!room.archivedByUserIds.includes(Number(req.authUser.id))) room.archivedByUserIds.push(Number(req.authUser.id));
    room.updatedAt = nowIso();
    saveStore(store);
    return res.json({ ok: true, archived: true });
  }
  if (room.surface === 'group' && ['owner', 'admin'].includes(role)) {
    store.rooms = store.rooms.filter((item) => Number(item.id) !== Number(room.id));
    store.messages = store.messages.filter((item) => Number(item.roomId) !== Number(room.id));
    store.tasks = store.tasks.filter((item) => Number(item.roomId) !== Number(room.id));
    store.invites = store.invites.filter((item) => Number(item.roomId) !== Number(room.id));
    saveStore(store);
    return res.json({ ok: true, deleted: true });
  }
  room.memberIds = room.memberIds.filter((item) => Number(item) !== Number(req.authUser.id));
  delete room.memberRoles[String(req.authUser.id)];
  room.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true, left: true });
});

app.post('/api/chat/rooms', requireAuth, (req, res) => {
  const store = loadStore();
  const title = sanitizeText(req.body?.title, 80);
  if (!title) return res.status(400).json({ error: 'Room title is required.' });
  const room = roomDefaults({
    id: nextId(store, 'rooms'),
    workspaceId: null,
    slug: slugify(req.body?.slug || title),
    title,
    description: sanitizeText(req.body?.description, 220),
    kind: 'group',
    surface: 'group',
    visibility: ['open', 'private', 'secret'].includes(req.body?.visibility) ? req.body.visibility : 'private',
    createdByUserId: req.authUser.id,
    ownerUserId: req.authUser.id,
    memberIds: [req.authUser.id, ...ensureArray(req.body?.memberIds).map(Number).filter(Boolean)],
    memberRoles: { [req.authUser.id]: 'owner' },
    avatarUrl: req.body?.avatarDataUrl ? saveDataImage(req.body.avatarDataUrl, 'group') : '',
    tags: ensureArray(req.body?.tags).map((tag) => sanitizeText(tag, 20)).filter(Boolean),
    permissions: sanitizeRoomPermissions({ posting: req.body?.posting }),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    lastActivityAt: nowIso()
  });
  store.rooms.push(room);
  saveStore(store);
  res.status(201).json({ room: publicRoom(store, room, req.authUser.id) });
});

app.post('/api/chat/rooms/:slug/join', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind === 'direct') return res.status(400).json({ error: 'Direct chats cannot be joined.' });
  if (room.memberIds.includes(Number(req.authUser.id))) return res.json({ room: publicRoom(store, room, req.authUser.id), joined: true });
  if (room.visibility !== 'open') return res.status(403).json({ error: 'This room requires an invite link.' });
  if (roomSubscriptionLocked(store, room, req.authUser.id)) {
    return res.status(403).json({
      error: `Upgrade to ${subscriptionPlan(room.subscription.requiredPlanId)?.label || room.subscription.requiredPlanId} to join this room.`,
      upgradeRequired: true,
      requiredPlanId: room.subscription.requiredPlanId
    });
  }
  room.memberIds.push(Number(req.authUser.id));
  room.memberRoles[String(req.authUser.id)] = 'member';
  room.updatedAt = nowIso();
  saveStore(store);
  res.json({ room: publicRoom(store, room, req.authUser.id), joined: true });
});

app.post('/api/chat/rooms/:slug/leave', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room || room.kind === 'direct') return res.status(404).json({ error: 'Room not found.' });
  if (!room.memberIds.includes(Number(req.authUser.id))) return res.status(404).json({ error: 'You are not a member.' });
  const role = room.memberRoles?.[String(req.authUser.id)] || 'member';
  if (role === 'owner' && room.memberIds.length > 1) {
    return res.status(400).json({ error: 'Transfer ownership or remove the room before leaving.' });
  }
  room.memberIds = room.memberIds.filter((item) => Number(item) !== Number(req.authUser.id));
  delete room.memberRoles[String(req.authUser.id)];
  room.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

app.post('/api/chat/rooms/:slug/invites', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind === 'direct') return res.status(400).json({ error: 'Direct chats do not support invite links.' });
  if (!room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const role = room.memberRoles?.[String(req.authUser.id)] || 'member';
  if (roomRoleWeight(role) < roomRoleWeight('moderator')) return res.status(403).json({ error: 'Need moderator role.' });
  const expiresHours = Math.max(1, Math.min(168, Number(req.body?.expiresHours || 24)));
  const invite = {
    id: nextId(store, 'invites'),
    workspaceId: room.workspaceId,
    roomId: room.id,
    code: createInviteCode(),
    createdByUserId: req.authUser.id,
    createdAt: nowIso(),
    expiresAt: futureIso(expiresHours * 60 * 60 * 1000)
  };
  store.invites.push(invite);
  saveStore(store);
  res.status(201).json({ invite: { ...invite, url: `/join/${invite.code}` } });
});

app.get('/api/chat/invites/:code', requireAuth, (req, res) => {
  const store = loadStore();
  const invite = store.invites.find((item) => item.code === sanitizeText(req.params.code, 32));
  if (!invite || new Date(invite.expiresAt) < new Date()) return res.status(404).json({ error: 'Invite not found.' });
  const room = store.rooms.find((item) => Number(item.id) === Number(invite.roomId));
  if (!room) return res.status(404).json({ error: 'Room not found.' });
  res.json({ invite, room: publicRoom(store, room, req.authUser.id) });
});

app.post('/api/chat/invites/:code/join', requireAuth, (req, res) => {
  const store = loadStore();
  const invite = store.invites.find((item) => item.code === sanitizeText(req.params.code, 32));
  if (!invite || new Date(invite.expiresAt) < new Date()) return res.status(404).json({ error: 'Invite not found.' });
  const room = store.rooms.find((item) => Number(item.id) === Number(invite.roomId));
  if (!room) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && roomSubscriptionLocked(store, room, req.authUser.id)) {
    return res.status(403).json({
      error: `Upgrade to ${subscriptionPlan(room.subscription.requiredPlanId)?.label || room.subscription.requiredPlanId} to join this room.`,
      upgradeRequired: true,
      requiredPlanId: room.subscription.requiredPlanId
    });
  }
  if (!room.memberIds.includes(Number(req.authUser.id))) room.memberIds.push(Number(req.authUser.id));
  room.memberRoles[String(req.authUser.id)] = 'member';
  const workspace = room.workspaceId ? store.workspaces.find((item) => Number(item.id) === Number(room.workspaceId)) : null;
  if (workspace && !workspace.memberIds.includes(Number(req.authUser.id))) {
    workspace.memberIds.push(Number(req.authUser.id));
    workspace.memberRoles[String(req.authUser.id)] = 'member';
  }
  saveStore(store);
  res.json({ room: publicRoom(store, room, req.authUser.id) });
});

app.post('/api/me/workspaces', requireAuth, (req, res) => {
  const store = loadStore();
  const title = sanitizeText(req.body?.title, 80);
  const description = sanitizeText(req.body?.description, 240);
  const visibility = ['open', 'private', 'secret'].includes(req.body?.visibility) ? req.body.visibility : 'private';
  if (!title) return res.status(400).json({ error: 'Workspace title is required.' });
  const workspace = workspaceDefaults({
    id: nextId(store, 'workspaces'),
    slug: slugify(req.body?.slug || title),
    title,
    description,
    visibility,
    ownerUserId: req.authUser.id,
    accent: sanitizeText(req.body?.accent, 24) || 'violet',
    memberIds: [req.authUser.id],
    memberRoles: { [req.authUser.id]: 'owner' },
    avatarUrl: req.body?.avatarDataUrl ? saveDataImage(req.body.avatarDataUrl, 'workspace') : '',
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.workspaces.push(workspace);
  saveStore(store);
  res.status(201).json({ workspace: publicWorkspace(store, workspace, req.authUser.id) });
});

app.post('/api/me/workspaces/:id/rooms', requireAuth, (req, res) => {
  const store = loadStore();
  const workspace = store.workspaces.find((item) => Number(item.id) === Number(req.params.id));
  if (!workspace || !workspace.memberIds.includes(Number(req.authUser.id))) return res.status(404).json({ error: 'Workspace not found.' });
  const title = sanitizeText(req.body?.title, 80);
  if (!title) return res.status(400).json({ error: 'Room title is required.' });
  const visibility = ['open', 'private', 'secret'].includes(req.body?.visibility) ? req.body.visibility : 'private';
  const room = roomDefaults({
    id: nextId(store, 'rooms'),
    workspaceId: workspace.id,
    slug: slugify(req.body?.slug || title),
    title,
    description: sanitizeText(req.body?.description, 220),
    kind: 'channel',
    surface: 'workspace',
    visibility,
    createdByUserId: req.authUser.id,
    ownerUserId: req.authUser.id,
    memberIds: [req.authUser.id],
    memberRoles: { [req.authUser.id]: 'owner' },
    avatarUrl: req.body?.avatarDataUrl ? saveDataImage(req.body.avatarDataUrl, 'room') : '',
    tags: ensureArray(req.body?.tags).map((tag) => sanitizeText(tag, 20)).filter(Boolean),
    permissions: sanitizeRoomPermissions({ posting: req.body?.posting }),
    relevanceScore: 50,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    lastActivityAt: nowIso()
  });
  store.rooms.push(room);
  saveStore(store);
  res.status(201).json({ room: publicRoom(store, room, req.authUser.id) });
});

app.post('/api/me/workspaces/:id/tasks', requireAuth, (req, res) => {
  const store = loadStore();
  const workspace = store.workspaces.find((item) => Number(item.id) === Number(req.params.id));
  if (!workspace || !workspace.memberIds.includes(Number(req.authUser.id))) return res.status(404).json({ error: 'Workspace not found.' });
  const title = sanitizeText(req.body?.title, 120);
  if (!title) return res.status(400).json({ error: 'Task title is required.' });
  const task = taskDefaults({
    id: nextId(store, 'tasks'),
    workspaceId: workspace.id,
    roomId: req.body?.roomId ? Number(req.body.roomId) : null,
    title,
    description: sanitizeText(req.body?.description, 1200),
    dueAt: req.body?.isUnlimited ? null : (req.body?.dueAt || null),
    isUnlimited: Boolean(req.body?.isUnlimited),
    status: 'open',
    createdByUserId: req.authUser.id,
    assigneeUserIds: ensureArray(req.body?.assigneeUserIds).map(Number).filter(Boolean),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.tasks.push(task);
  saveStore(store);
  res.status(201).json({ task: publicTask(store, task) });
});

app.get('/api/me', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  res.json(mePayload(store, user));
});

app.patch('/api/me/profile', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  user.displayName = sanitizeText(req.body?.displayName || user.displayName, 60) || user.displayName;
  user.bio = sanitizeText(req.body?.bio || user.bio, 420);
  if (req.body?.avatarDataUrl) user.avatarUrl = saveDataImage(req.body.avatarDataUrl, `avatar-${user.id}`) || user.avatarUrl;
  if (req.body?.bannerDataUrl) user.bannerUrl = saveDataImage(req.body.bannerDataUrl, `banner-${user.id}`) || user.bannerUrl;
  user.accent = sanitizeText(req.body?.accent || user.accent, 24) || user.accent;
  user.links = {
    ...user.links,
    website: sanitizeText(req.body?.website ?? user.links?.website, 180),
    github: sanitizeText(req.body?.github ?? user.links?.github, 120),
    discord: sanitizeText(req.body?.discord ?? user.links?.discord, 120),
    telegram: sanitizeText(req.body?.telegram ?? user.links?.telegram, 120),
    steam: sanitizeText(req.body?.steam ?? user.links?.steam, 120),
    instagram: sanitizeText(req.body?.instagram ?? user.links?.instagram, 120),
    youtube: sanitizeText(req.body?.youtube ?? user.links?.youtube, 120)
  };
  user.updatedAt = nowIso();
  saveStore(store);
  makeNotification(store, user.id, 'Profile updated', 'Your profile details were saved.', `/@${user.handleCanonical}`);
  saveStore(store);
  res.json({ user: mePayload(store, user).user });
});

app.patch('/api/me/privacy', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  user.privacy = {
    showEmail: Boolean(req.body?.showEmail),
    showRole: Boolean(req.body?.showRole),
    showActivity: req.body?.showActivity !== false,
    showFollowers: req.body?.showFollowers !== false,
    showLastSeen: Boolean(req.body?.showLastSeen),
    profileVisibility: ['public', 'handle-only', 'private'].includes(req.body?.profileVisibility) ? req.body.profileVisibility : user.privacy.profileVisibility,
    allowInvites: req.body?.allowInvites !== false,
    allowDirectMessages: ['everyone', 'followers', 'nobody'].includes(req.body?.allowDirectMessages) ? req.body.allowDirectMessages : user.privacy.allowDirectMessages,
    allowFriendRequests: req.body?.allowFriendRequests !== false
  };
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ privacy: user.privacy });
});

app.patch('/api/me/preferences', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  user.themePreference = ['dark', 'light', 'system'].includes(req.body?.themePreference) ? req.body.themePreference : user.themePreference;
  if (['violet', 'blue', 'amber', 'coral', 'custom'].includes(req.body?.accent)) user.accent = req.body.accent;
  if (req.body?.accentCustom && typeof req.body.accentCustom === 'object') {
    const hexRe = /^#[0-9a-fA-F]{3,8}$/;
    const from = String(req.body.accentCustom.from || '').trim();
    const to = String(req.body.accentCustom.to || '').trim();
    user.accentCustom = {
      from: hexRe.test(from) ? from : (user.accentCustom?.from || '#7c3aed'),
      to: hexRe.test(to) ? to : (user.accentCustom?.to || '#38bdf8'),
      gradient: req.body.accentCustom.gradient !== false
    };
  }
  user.languagePreference = ['en', 'ru', 'uk', 'pt', 'pl', 'fr'].includes(req.body?.languagePreference) ? req.body.languagePreference : user.languagePreference;
  user.settings = {
    ...user.settings,
    reducedMotion: Boolean(req.body?.reducedMotion),
    compactMode: Boolean(req.body?.compactMode),
    highContrast: Boolean(req.body?.highContrast),
    desktopPush: req.body?.desktopPush !== false,
    soundNotifications: req.body?.soundNotifications !== false,
    autoplayMedia: Boolean(req.body?.autoplayMedia),
    enterToSend: req.body?.enterToSend !== false,
    chatDensity: ['comfortable', 'compact'].includes(req.body?.chatDensity) ? req.body.chatDensity : user.settings.chatDensity,
    showUnreadBadge: req.body?.showUnreadBadge !== false,
    sendReadReceipts: req.body?.sendReadReceipts !== false,
    showTyping: req.body?.showTyping !== false,
    messageStyle: ['soft', 'glass', 'minimal'].includes(req.body?.messageStyle) ? req.body.messageStyle : (user.settings.messageStyle || 'soft'),
    chatThemeGlobal: (() => {
      const nextTheme = sanitizeChatTheme({
        ...(typeof req.body?.chatThemeGlobal === 'object' ? req.body.chatThemeGlobal : {}),
        imageUrl: req.body?.chatThemeGlobalImageDataUrl
          ? (saveDataImage(req.body.chatThemeGlobalImageDataUrl, `chat-theme-${user.id}`) || user.settings.chatThemeGlobal?.imageUrl || '')
          : (req.body?.chatThemeGlobal?.imageUrl || user.settings.chatThemeGlobal?.imageUrl || '')
      }, user.settings.chatThemeGlobal || null);
      return nextTheme || user.settings.chatThemeGlobal || null;
    })(),
    chatThemesByRoom: sanitizeChatThemeMap(user.settings.chatThemesByRoom)
  };
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ user: mePayload(store, user).user });
});

app.patch('/api/me/security/public-key', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  user.security.publicKeyJwk = ensureObject(req.body?.publicKeyJwk);
  user.security.publicKeyAlgo = 'ECDH-P256';
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true, hasPublicKey: Boolean(user.security.publicKeyJwk) });
});

app.get('/api/me/billing', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  res.json({ billing: user?.billing || {}, plans: subscriptions });
});

app.post('/api/me/billing/plan', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const planId = sanitizeText(req.body?.planId || '', 24);
  if (planId && !subscriptionPlan(planId)) return res.status(400).json({ error: 'Plan not found.' });
  applyBillingPlan(user, planId);
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ billing: user.billing, user: mePayload(store, user).user });
});


app.post('/api/users/:handle/follow', requireAuth, (req, res) => {
  const store = loadStore();
  const target = store.users.find((item) => item.handleCanonical === canonicalHandle(req.params.handle));
  if (!target) return res.status(404).json({ error: 'User not found.' });
  if (Number(target.id) === Number(req.authUser.id)) return res.status(400).json({ error: 'You cannot follow yourself.' });
  const existing = store.follows.find((item) => Number(item.followerUserId) === Number(req.authUser.id) && Number(item.targetUserId) === Number(target.id));
  if (existing) {
    store.follows = store.follows.filter((item) => Number(item.id) !== Number(existing.id));
  } else {
    store.follows.push({ id: nextId(store, 'follows'), followerUserId: req.authUser.id, targetUserId: target.id, createdAt: nowIso() });
    const note = notificationDefaults({ id: nextId(store, 'notifications'), userId: target.id, title: 'New follower', body: `@${req.authUser.handle} followed you.`, href: `/@${req.authUser.handleCanonical}`, createdAt: nowIso(), readAt: null });
    store.notifications.push(note);
    sseSend(target.id, 'notification', note);
  }
  saveStore(store);
  res.json({ following: followsUser(store, req.authUser.id, target.id) });
});

app.post('/api/users/:handle/friend-request', requireAuth, (req, res) => {
  const store = loadStore();
  const target = store.users.find((item) => item.handleCanonical === canonicalHandle(req.params.handle));
  if (!target) return res.status(404).json({ error: 'User not found.' });
  if (!target.privacy.allowFriendRequests) return res.status(403).json({ error: 'This user is not accepting friend requests.' });
  if (Number(target.id) === Number(req.authUser.id)) return res.status(400).json({ error: 'You cannot add yourself.' });
  const existingState = friendshipState(store, req.authUser.id, target.id);
  if (existingState !== 'none') return res.status(409).json({ error: 'Friend request already exists.' });
  const requestItem = { id: nextId(store, 'friendRequests'), fromUserId: req.authUser.id, toUserId: target.id, status: 'pending', createdAt: nowIso(), respondedAt: null };
  store.friendRequests.push(requestItem);
  const note = notificationDefaults({ id: nextId(store, 'notifications'), userId: target.id, title: 'Friend request', body: `@${req.authUser.handle} sent you a friend request.`, href: '/settings?tab=social', createdAt: nowIso(), readAt: null });
  store.notifications.push(note);
  sseSend(target.id, 'notification', note);
  saveStore(store);
  res.status(201).json({ request: requestItem });
});

app.post('/api/me/friend-requests/:id/respond', requireAuth, (req, res) => {
  const store = loadStore();
  const requestItem = store.friendRequests.find((item) => Number(item.id) === Number(req.params.id));
  if (!requestItem || Number(requestItem.toUserId) !== Number(req.authUser.id)) return res.status(404).json({ error: 'Request not found.' });
  const action = req.body?.action === 'deny' ? 'denied' : 'accepted';
  requestItem.status = action;
  requestItem.respondedAt = nowIso();
  if (action === 'accepted') {
    const note = notificationDefaults({ id: nextId(store, 'notifications'), userId: requestItem.fromUserId, title: 'Friend request accepted', body: `@${req.authUser.handle} accepted your friend request.`, href: `/@${req.authUser.handleCanonical}`, createdAt: nowIso(), readAt: null });
    store.notifications.push(note);
    sseSend(requestItem.fromUserId, 'notification', note);
  }
  saveStore(store);
  res.json({ request: requestItem });
});

app.post('/api/me/verification-requests', requireAuth, (req, res) => {
  const store = loadStore();
  const badge = cleanBadges([req.body?.requestedBadge || 'VRF'])[0] || 'VRF';
  const reason = sanitizeText(req.body?.reason, 1200);
  const links = ensureArray(req.body?.links).map((link) => sanitizeText(link, 160)).filter(Boolean);
  if (!reason) return res.status(400).json({ error: 'Add a short reason.' });
  const pending = store.verificationRequests.find((item) => Number(item.userId) === Number(req.authUser.id) && item.status === 'pending');
  if (pending) return res.status(409).json({ error: 'A verification request is already pending.' });
  const item = { id: nextId(store, 'verificationRequests'), userId: req.authUser.id, requestedBadge: badge, reason, links, status: 'pending', createdAt: nowIso(), decidedAt: null, decidedByUserId: null };
  store.verificationRequests.push(item);
  saveStore(store);
  res.status(201).json({ request: item });
});

app.get('/api/me/export', requireAuth, (req, res) => {
  const store = loadStore();
  const userId = Number(req.authUser.id);
  res.json({
    user: mePayload(store, req.authUser),
    rooms: store.rooms.filter((room) => room.memberIds.includes(userId)),
    messages: store.messages.filter((item) => {
      const room = store.rooms.find((room) => Number(room.id) === Number(item.roomId));
      return room && room.memberIds.includes(userId);
    }),
    projects: store.projects.filter((item) => Number(item.userId) === userId),
    sites: store.sites.filter((item) => Number(item.userId) === userId)
  });
});

app.post('/api/me/backups', requireAuth, (req, res) => {
  if (req.authUser.roleInternal !== 'owner') return res.status(403).json({ error: 'Not allowed.' });
  if (!existsSync(storePath)) return res.status(404).json({ error: 'Store not found.' });
  const href = createBackupFile();
  res.status(201).json({ href });
});

app.delete('/api/me/account', requireAuth, (req, res) => {
  const store = loadStore();
  const confirm = sanitizeText(req.body?.confirm, 12);
  const password = String(req.body?.password || '');
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (confirm !== 'DELETE') return res.status(400).json({ error: 'Type DELETE to confirm.' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(400).json({ error: 'Incorrect password.' });
  const userId = Number(user.id);
  store.sessions = store.sessions.filter((item) => Number(item.userId) !== userId);
  store.likes = store.likes.filter((item) => Number(item.userId) !== userId);
  store.comments = store.comments.filter((item) => Number(item.userId) !== userId);
  store.posts = store.posts.filter((item) => Number(item.userId) !== userId);
  store.messages = store.messages.filter((item) => Number(item.userId) !== userId);
  store.projects = store.projects.filter((item) => Number(item.userId) !== userId);
  for (const site of store.sites.filter((item) => Number(item.userId) === userId && item.htmlPath)) removeSiteStoredContent(site);
  store.sites = store.sites.filter((item) => Number(item.userId) !== userId);
  store.stickerPacks = store.stickerPacks.filter((item) => Number(item.userId) !== userId);
  store.stickers = store.stickers.filter((item) => Number(item.userId) !== userId);
  store.notifications = store.notifications.filter((item) => Number(item.userId) !== userId);
  store.follows = store.follows.filter((item) => Number(item.followerUserId) !== userId && Number(item.targetUserId) !== userId);
  store.friendRequests = store.friendRequests.filter((item) => Number(item.fromUserId) !== userId && Number(item.toUserId) !== userId);
  store.verificationRequests = store.verificationRequests.filter((item) => Number(item.userId) !== userId);
  store.workspaces = store.workspaces.filter((item) => Number(item.ownerUserId) !== userId);
  for (const workspace of store.workspaces) {
    workspace.memberIds = workspace.memberIds.filter((id) => Number(id) !== userId);
    delete workspace.memberRoles[String(userId)];
  }
  for (const room of store.rooms) {
    room.memberIds = room.memberIds.filter((id) => Number(id) !== userId);
    delete room.memberRoles[String(userId)];
    room.archivedByUserIds = room.archivedByUserIds.filter((id) => Number(id) !== userId);
    room.pinnedByUserIds = room.pinnedByUserIds.filter((id) => Number(id) !== userId);
    room.mutedByUserIds = room.mutedByUserIds.filter((id) => Number(id) !== userId);
  }
  store.rooms = store.rooms.filter((room) => room.memberIds.length > 0);
  store.users = store.users.filter((item) => Number(item.id) !== userId);
  saveStore(store);
  clearSessionCookie(req, res);
  res.json({ ok: true });
});

app.post('/api/me/projects', requireAuth, (req, res) => {
  const store = loadStore();
  const title = sanitizeText(req.body?.title, 90);
  if (!title) return res.status(400).json({ error: 'Project title is required.' });
  const slug = slugify(req.body?.slug || title);
  if (store.projects.some((item) => item.slug === slug)) return res.status(409).json({ error: 'That project slug already exists.' });
  const project = projectDefaults({
    id: nextId(store, 'projects'),
    userId: req.authUser.id,
    slug,
    title,
    summary: sanitizeText(req.body?.summary, 220),
    description: sanitizeText(req.body?.description, 5000),
    visibility: ['public', 'unlisted', 'private'].includes(req.body?.visibility) ? req.body.visibility : 'public',
    featured: false,
    category: sanitizeText(req.body?.category, 30) || 'project',
    coverUrl: req.body?.coverDataUrl ? saveDataImage(req.body.coverDataUrl, 'project') : '',
    tags: ensureArray(req.body?.tags).map((tag) => sanitizeText(tag, 20)).filter(Boolean),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.projects.push(project);
  saveStore(store);
  res.status(201).json({ project: publicProject(store, project, req.authUser.id) });
});

app.get('/api/me/sites', requireAuth, (req, res) => {
  const store = loadStore();
  const items = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id)).map((site) => publicSite(store, site, req.authUser.id));
  res.json({ items });
});

app.get('/api/me/sites/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  res.json({ site: ownerSiteDetails(store, site, req.authUser.id) });
});

app.get('/api/me/sites/:id/studio', requireAuth, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  const files = site.mode === 'upload' ? siteStudioFiles(site) : [];
  res.json({
    site: ownerSiteDetails(store, site, req.authUser.id),
    studioEnabled: site.mode === 'upload',
    files,
    defaultFile: files.find((item) => item.path === 'index.html')?.path || files[0]?.path || '',
    staticRules: {
      authInsideSite: false,
      commentsInsideSite: false,
      discussionPath: publicSite(store, site, req.authUser.id).discussionPath,
      discussionLabel: site.projectId ? 'Project discussion on justbreath' : 'Profile discussion on justbreath'
    }
  });
});

app.get('/api/me/sites/:id/studio/file', requireAuth, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  try {
    const relativePath = siteStudioEditablePath(req.query.path || 'index.html');
    if (!relativePath) return res.status(400).json({ error: 'Only text-based files can be opened in studio.' });
    const content = readSiteStudioText(site, relativePath);
    res.json({
      file: {
        path: relativePath,
        kind: siteStudioFileKind(relativePath),
        editable: true,
        content
      },
      files: siteStudioFiles(site),
      site: ownerSiteDetails(store, site, req.authUser.id)
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Could not open file.' });
  }
});

app.post('/api/me/sites/:id/studio/file', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  try {
    const relativePath = siteStudioEditablePath(req.body?.path || '');
    if (!relativePath) return res.status(400).json({ error: 'Choose a valid text file path like assets/site.css or scripts/app.js.' });
    writeSiteStudioText(site, relativePath, req.body?.content || '', { create: true });
    if (site.reviewStatus === 'approved') site.reviewStatus = 'draft';
    site.updatedAt = nowIso();
    saveStore(store);
    res.status(201).json({
      file: {
        path: relativePath,
        kind: siteStudioFileKind(relativePath),
        editable: true,
        content: readSiteStudioText(site, relativePath)
      },
      files: siteStudioFiles(site),
      site: ownerSiteDetails(store, site, req.authUser.id)
    });
  } catch (error) {
    res.status(error.message === 'File already exists.' ? 409 : 400).json({ error: error.message || 'Could not create file.' });
  }
});

app.patch('/api/me/sites/:id/studio/file', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  try {
    const relativePath = siteStudioEditablePath(req.body?.path || 'index.html');
    if (!relativePath) return res.status(400).json({ error: 'Only text-based files can be saved in studio.' });
    writeSiteStudioText(site, relativePath, req.body?.content || '', { create: false });
    if (site.reviewStatus === 'approved') site.reviewStatus = 'draft';
    site.updatedAt = nowIso();
    saveStore(store);
    res.json({
      file: {
        path: relativePath,
        kind: siteStudioFileKind(relativePath),
        editable: true,
        content: readSiteStudioText(site, relativePath)
      },
      files: siteStudioFiles(site),
      site: ownerSiteDetails(store, site, req.authUser.id)
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Could not save file.' });
  }
});

app.post('/api/me/sites/template', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const userSites = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id));
  const limit = userSiteLimit(req.authUser);
  if (userSites.length >= limit) return res.status(403).json({ error: `You've reached your site limit (\${limit}). Upgrade your plan to create more.`, upgradeRequired: true });
  const title = sanitizeText(req.body?.title, 100);
  if (!title) return res.status(400).json({ error: 'Site title is required.' });
  const slug = slugify(req.body?.slug || title);
  if (store.sites.some((site) => Number(site.userId) === Number(req.authUser.id) && site.slug === slug)) return res.status(409).json({ error: 'That site slug already exists.' });
  const intent = siteIntent(req.body?.intent, 'launch');
  const defaults = siteIntentDefaults(intent, title);
  const site = siteDefaults({
    id: nextId(store, 'sites'),
    userId: req.authUser.id,
    projectId: req.body?.projectId ? Number(req.body.projectId) : null,
    slug,
    title,
    summary: sanitizeText(req.body?.summary, 240),
    visibility: ['public', 'unlisted', 'private'].includes(req.body?.visibility) ? req.body.visibility : 'public',
    mode: 'template',
    templateConfig: sanitizeSiteConfig({
      intent,
      ...ensureObject(req.body?.templateConfig),
      eyebrow: sanitizeText(req.body?.eyebrow, 40) || defaults.eyebrow,
      accent: sanitizeText(req.body?.accent, 32) || '#7c3aed',
      hero: sanitizeText(req.body?.hero, 180) || defaults.hero,
      body: sanitizeText(req.body?.body, 6000) || defaults.body,
      ctaLabel: sanitizeText(req.body?.ctaLabel, 40) || defaults.ctaLabel,
      links: ensureArray(req.body?.links).map((item) => ({ label: sanitizeText(item?.label, 40), href: sanitizeText(item?.href, 180) })).filter((item) => item.label && item.href)
    }),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.sites.push(site);
  saveStore(store);
  res.status(201).json({ site: publicSite(store, site, req.authUser.id) });
});

function createArchiveSiteFromRequest(store, req) {
  const title = sanitizeText(req.body?.title, 100);
  const slug = slugify(req.body?.slug || title);
  if (!title || !slug) throw new Error('Title is required.');
  if (store.sites.some((site) => Number(site.userId) === Number(req.authUser.id) && site.slug === slug)) {
    const err = new Error('That site slug already exists.');
    err.statusCode = 409;
    throw err;
  }
  const archiveBase64 = String(req.body?.archiveBase64 || req.body?.zipBase64 || '');
  if (!archiveBase64) {
    const err = new Error('Archive file data required (base64).');
    err.statusCode = 400;
    throw err;
  }
  const archiveBuffer = Buffer.from(archiveBase64, 'base64');
  const siteId = nextId(store, 'sites');
  const extracted = extractArchiveSiteBundle(siteId, archiveBuffer, req.body?.archiveName || req.body?.zipName || '');
  return siteDefaults({
    id: siteId,
    userId: req.authUser.id,
    projectId: req.body?.projectId ? Number(req.body.projectId) : null,
    slug,
    title,
    summary: sanitizeText(req.body?.summary, 240),
    visibility: ['public', 'unlisted', 'private'].includes(req.body?.visibility) ? req.body.visibility : 'public',
    mode: 'upload',
    uploadMode: 'archive',
    htmlPath: extracted.htmlPath,
    bundleRoot: extracted.bundleRoot,
    reviewStatus: 'draft',
    templateConfig: sanitizeSiteConfig(ensureObject(req.body?.templateConfig)),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
}

app.post('/api/me/sites/upload', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const userSites = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id));
  const limit = userSiteLimit(req.authUser);
  if (userSites.length >= limit) return res.status(403).json({ error: `You've reached your site limit (\${limit}). Upgrade your plan to create more.`, upgradeRequired: true });
  const title = sanitizeText(req.body?.title, 100);
  const slug = slugify(req.body?.slug || title);
  const htmlContent = String(req.body?.htmlContent || '');
  if (!title || !slug || !htmlContent) return res.status(400).json({ error: 'Title, slug and HTML content are required.' });
  if (Buffer.byteLength(htmlContent, 'utf8') > SITE_UPLOAD_LIMIT_BYTES) return res.status(400).json({ error: 'The uploaded site must stay under 1 MB.' });
  if (store.sites.some((site) => Number(site.userId) === Number(req.authUser.id) && site.slug === slug)) return res.status(409).json({ error: 'That site slug already exists.' });
  const siteId = nextId(store, 'sites');
  const htmlPath = ensureSiteFile(siteId, htmlContent);
  const site = siteDefaults({
    id: siteId,
    userId: req.authUser.id,
    projectId: req.body?.projectId ? Number(req.body.projectId) : null,
    slug,
    title,
    summary: sanitizeText(req.body?.summary, 240),
    visibility: ['public', 'unlisted', 'private'].includes(req.body?.visibility) ? req.body.visibility : 'public',
    mode: 'upload',
    uploadMode: 'html',
    templateConfig: sanitizeSiteConfig(ensureObject(req.body?.templateConfig)),
    htmlPath,
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.sites.push(site);
  saveStore(store);
  res.status(201).json({ site: publicSite(store, site, req.authUser.id) });
});

app.delete('/api/me/sites/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  removeSiteStoredContent(site);
  store.sites = store.sites.filter((item) => Number(item.id) !== Number(site.id));
  saveStore(store);
  res.json({ ok: true });
});

// ── Update site template config ───────────────────────────────────────────────
app.patch('/api/me/sites/:id', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  let touchedContent = false;
  if (req.body?.title !== undefined) site.title = sanitizeText(req.body.title, 100) || site.title;
  if (req.body?.summary !== undefined) site.summary = sanitizeText(req.body.summary, 240);
  if (req.body?.visibility !== undefined && ['public', 'unlisted', 'private'].includes(req.body.visibility)) site.visibility = req.body.visibility;
  if (req.body?.templateConfig && typeof req.body.templateConfig === 'object') {
    touchedContent = true;
    site.templateConfig = sanitizeSiteConfig(req.body.templateConfig, site.templateConfig || {});
  }
  if (site.mode === 'upload' && req.body?.archiveBase64) {
    try {
      const extracted = extractArchiveSiteBundle(site.id, Buffer.from(String(req.body.archiveBase64 || ''), 'base64'), req.body?.archiveName || '');
      if (site.htmlPath && site.htmlPath !== extracted.htmlPath) removeSiteFile(site.htmlPath);
      site.htmlPath = extracted.htmlPath;
      site.bundleRoot = extracted.bundleRoot;
      site.uploadMode = 'archive';
      touchedContent = true;
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Could not read archive.' });
    }
  }
  if (site.mode === 'upload' && req.body?.htmlContent !== undefined) {
    const htmlContent = String(req.body.htmlContent || '');
    if (!htmlContent) return res.status(400).json({ error: 'HTML content is required.' });
    if (Buffer.byteLength(htmlContent, 'utf8') > SITE_UPLOAD_LIMIT_BYTES) return res.status(400).json({ error: 'The uploaded site must stay under 1 MB.' });
    touchedContent = true;
    if (siteUsesBundle(site)) {
      const htmlAbsPath = resolveDataPath(site.htmlPath);
      if (!htmlAbsPath) return res.status(400).json({ error: 'Archive entry is missing.' });
      writeFileSync(htmlAbsPath, ensureDoctype(htmlContent), 'utf8');
    } else {
      site.htmlPath = ensureSiteFile(site.id, htmlContent);
      site.bundleRoot = '';
      site.uploadMode = 'html';
    }
  }
  if (site.reviewStatus === 'approved' && touchedContent) site.reviewStatus = 'draft';
  site.updatedAt = nowIso();
  saveStore(store);
  res.json({ site: publicSite(store, site, req.authUser.id) });
});

// ── Submit site for review ────────────────────────────────────────────────────
app.post('/api/me/sites/:id/submit-review', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  if (site.reviewStatus === 'pending') return res.status(400).json({ error: 'Already submitted for review.' });
  if (site.reviewStatus === 'approved') return res.status(400).json({ error: 'Site is already approved.' });
  site.reviewStatus = 'pending';
  site.updatedAt = nowIso();
  saveStore(store);
  res.json({ site: publicSite(store, site, req.authUser.id) });
});

function handleSiteArchiveUpload(req, res) {
  const store = loadStore();
  const userSites = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id));
  const limit = userSiteLimit(req.authUser);
  if (userSites.length >= limit) return res.status(403).json({ error: `Site limit reached (\${limit}). Upgrade to create more.`, upgradeRequired: true });
  try {
    const site = createArchiveSiteFromRequest(store, req);
    store.sites.push(site);
    saveStore(store);
    res.status(201).json({ site: publicSite(store, site, req.authUser.id) });
  } catch (err) {
    console.error('[sites/upload-archive]', err.message);
    res.status(err.statusCode || 400).json({ error: err.message || 'Could not read archive.' });
  }
}

app.post('/api/me/sites/upload-archive', requireAuth, requireMember, handleSiteArchiveUpload);
app.post('/api/me/sites/upload-zip', requireAuth, requireMember, handleSiteArchiveUpload);

// ── Admin site review queue ───────────────────────────────────────────────────
app.get('/api/admin/sites/review-queue', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  const queue = store.sites
    .filter(s => s.reviewStatus === 'pending')
    .map(s => publicSite(store, s, null));
  res.json({ items: queue });
});

app.patch('/api/admin/sites/:id/review', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  const site = store.sites.find(s => Number(s.id) === Number(req.params.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  const decision = req.body?.decision;
  if (!['approved', 'rejected'].includes(decision)) return res.status(400).json({ error: 'Decision must be "approved" or "rejected".' });
  site.reviewStatus = decision;
  site.reviewNote = sanitizeText(req.body?.note || '', 500);
  site.updatedAt = nowIso();
  saveStore(store);
  const owner = store.users.find(u => Number(u.id) === Number(site.userId));
  if (owner) makeNotification(store, owner.id, `Your site "${site.title}" was ${decision}`, site.reviewNote || '', `/@${owner.handleCanonical}/${site.slug}`);
  saveStore(store);
  res.json({ site: publicSite(store, site, site.userId) });
});

app.post('/api/me/posts', requireAuth, (req, res) => {
  const store = loadStore();
  const kind = ['quick', 'devlog'].includes(req.body?.kind) ? req.body.kind : 'quick';
  const body = sanitizeText(req.body?.body, 5000);
  const title = kind === 'devlog' ? sanitizeText(req.body?.title, 120) : '';
  let attachment = null;
  if (req.body?.attachmentDataUrl) {
    const stored = saveDataImage(req.body.attachmentDataUrl, `post-${req.authUser.id}`);
    if (stored) attachment = { name: sanitizeText(req.body?.attachmentName || 'Image', 90), url: stored, type: 'image', width: Number(req.body?.attachmentWidth || 0), height: Number(req.body?.attachmentHeight || 0) };
  } else if (req.body?.attachmentUrl) {
    attachment = { name: sanitizeText(req.body?.attachmentName || 'Attachment', 90), url: sanitizeText(req.body?.attachmentUrl, 600), type: sanitizeText(req.body?.attachmentType || 'link', 30) };
  }
  if (!body && !req.body?.stickerId && !attachment) return res.status(400).json({ error: 'Write something first.' });
  const status = req.body?.scheduledFor ? 'scheduled' : 'published';
  const post = postDefaults({
    id: nextId(store, 'posts'),
    userId: req.authUser.id,
    projectId: req.body?.projectId ? Number(req.body.projectId) : null,
    kind,
    title,
    body,
    excerpt: sanitizeText(req.body?.excerpt, 220),
    attachment,
    stickerId: req.body?.stickerId ? Number(req.body.stickerId) : null,
    status,
    scheduledFor: req.body?.scheduledFor || null,
    publishedAt: status === 'published' ? nowIso() : null,
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.posts.push(post);
  saveStore(store);
  res.status(201).json({ post: publicPost(store, post, req.authUser.id) });
});

app.patch('/api/me/posts/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const post = store.posts.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  post.title = sanitizeText(req.body?.title || post.title, 120);
  post.body = sanitizeText(req.body?.body || post.body, 5000);
  post.excerpt = sanitizeText(req.body?.excerpt || post.excerpt, 220);
  if (req.body?.attachmentDataUrl) {
    const stored = saveDataImage(req.body.attachmentDataUrl, `post-${post.id}`);
    if (stored) post.attachment = { name: sanitizeText(req.body?.attachmentName || 'Image', 90), url: stored, type: 'image', width: Number(req.body?.attachmentWidth || 0), height: Number(req.body?.attachmentHeight || 0) };
  } else if (req.body?.attachmentUrl) {
    post.attachment = { name: sanitizeText(req.body?.attachmentName || 'Attachment', 90), url: sanitizeText(req.body?.attachmentUrl, 600), type: sanitizeText(req.body?.attachmentType || 'link', 30) };
  }
  post.stickerId = req.body?.stickerId ? Number(req.body.stickerId) : post.stickerId;
  post.updatedAt = nowIso();
  saveStore(store);
  res.json({ post: publicPost(store, post, req.authUser.id) });
});

app.get('/api/me/stickers', requireAuth, (req, res) => {
  const store = loadStore();
  const brand = store.users.find((item) => item.handleCanonical === canonicalHandle(BRAND_HANDLE));
  const packs = store.stickerPacks.filter((pack) => Number(pack.userId) === Number(req.authUser.id) || Number(pack.userId) === Number(brand?.id)).map((pack) => ({ ...pack, stickers: store.stickers.filter((item) => Number(item.packId) === Number(pack.id)) }));
  res.json({ packs });
});

app.post('/api/me/sticker-packs', requireAuth, (req, res) => {
  const store = loadStore();
  const title = sanitizeText(req.body?.title, 80);
  if (!title) return res.status(400).json({ error: 'Pack title is required.' });
  const pack = stickerPackDefaults({ id: nextId(store, 'stickerPacks'), userId: req.authUser.id, title, slug: slugify(req.body?.slug || title), createdAt: nowIso(), updatedAt: nowIso() });
  store.stickerPacks.push(pack);
  saveStore(store);
  res.status(201).json({ pack });
});

app.post('/api/me/sticker-packs/:id/stickers', requireAuth, (req, res) => {
  const store = loadStore();
  const pack = store.stickerPacks.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!pack) return res.status(404).json({ error: 'Pack not found.' });
  const dataUrl = req.body?.dataUrl && req.body.dataUrl.startsWith('data:image/') ? req.body.dataUrl.slice(0, IMAGE_UPLOAD_LIMIT_BYTES * 2) : '';
  const name = sanitizeText(req.body?.name, 60);
  if (!dataUrl || !name) return res.status(400).json({ error: 'Provide a sticker image and a name.' });
  const mimeType = dataUrl.startsWith('data:image/svg') ? 'image/svg+xml' : (dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);/)?.[1] || 'image/png');
  const sticker = stickerDefaults({ id: nextId(store, 'stickers'), packId: pack.id, userId: req.authUser.id, name, mimeType, dataUrl, createdAt: nowIso(), updatedAt: nowIso() });
  store.stickers.push(sticker);
  saveStore(store);
  res.status(201).json({ sticker });
});

app.get('/api/me/notifications', requireAuth, (req, res) => {
  const store = loadStore();
  const items = store.notifications.filter((item) => Number(item.userId) === Number(req.authUser.id)).sort((a, b) => sortDateDesc(a, b));
  res.json({ items });
});

app.post('/api/me/notifications/:id/read', requireAuth, (req, res) => {
  const store = loadStore();
  const item = store.notifications.find((entry) => Number(entry.id) === Number(req.params.id) && Number(entry.userId) === Number(req.authUser.id));
  if (!item) return res.status(404).json({ error: 'Notification not found.' });
  item.readAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

app.use('/media', express.static(uploadsDir, { index: false }));
app.use(express.static(publicDir, { index: false }));

function findSiteByHandleAndSlug(store, handleValue, slugValue) {
  const handleCanonicalValue = String(handleValue || '').toLowerCase();
  const siteSlug = slugify(String(slugValue || ''));
  const owner = store.users.find((item) => item.handleCanonical === handleCanonicalValue);
  if (!owner) return { owner: null, site: null };
  const site = store.sites.find((item) => Number(item.userId) === Number(owner.id) && item.slug === siteSlug);
  return { owner, site: site || null };
}

function canViewSite(site, owner, authUserId = null) {
  return Boolean(site && owner && (
    site.visibility === 'public'
    || site.visibility === 'unlisted'
    || Number(authUserId || 0) === Number(owner.id || 0)
  ));
}

app.get(/^\/@([^/]+)\/([^/]+)\/(.*)$/, (req, res, next) => {
  const store = loadStore();
  const { owner, site } = findSiteByHandleAndSlug(store, req.params[0], req.params[1]);
  if (!owner || !site || !canViewSite(site, owner, req.authUser?.id)) return next();
  if (site.mode !== 'upload') return next();
  const rawAssetPath = String(req.params[2] || '');
  const assetPath = rawAssetPath ? safeSiteBundlePath(rawAssetPath) : 'index.html';
  if (!assetPath) return next();
  if (!siteUsesBundle(site) && assetPath !== 'index.html') return next();
  const assetAbsPath = siteUsesBundle(site) ? siteBundleAbsPath(site, assetPath) : resolveDataPath(site.htmlPath);
  if (!assetAbsPath || !existsSync(assetAbsPath)) return next();
  if (assetPath.toLowerCase().endsWith('.html')) {
    const inner = readFileSync(assetAbsPath, 'utf8');
    return res.type('html').send(decorateUploadedSiteHtml(store, site, owner, inner));
  }
  return res.sendFile(assetAbsPath);
});

app.get(/^\/@([^/]+)\/([^/]+)$/, (req, res, next) => {
  const store = loadStore();
  const { owner, site } = findSiteByHandleAndSlug(store, req.params[0], req.params[1]);
  if (!owner || !site || !canViewSite(site, owner, req.authUser?.id)) return next();
  const rawUploadedHtml = site.mode === 'upload' ? readSiteFile(site.htmlPath) : null;
  const inner = site.mode === 'upload'
    ? (rawUploadedHtml ? decorateUploadedSiteHtml(store, site, owner, rawUploadedHtml, { baseHref: `/@${owner.handleCanonical}/${site.slug}/` }) : '')
    : buildTemplateSiteHtml(store, site, owner);
  if (!inner) return next();
  res.type('html').send(siteWatermarkHtml(store, owner, site, inner));
});

// ── SSE: real-time event stream ──────────────────────────────────────────────
app.get('/api/events', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // nginx: disable buffering
  res.flushHeaders();
  // Send initial ping so client knows connection is live
  res.write(`event: connected\ndata: {"userId":${req.authUser.id}}\n\n`);
  const keepalive = setInterval(() => {
    try { res.write(': ping\n\n'); } catch { clearInterval(keepalive); }
  }, 20000);
  sseAdd(req.authUser.id, res);
  req.on('close', () => {
    clearInterval(keepalive);
    sseRemove(req.authUser.id, res);
  });
});

// ── Typing indicators ─────────────────────────────────────────────────────────
app.post('/api/chat/rooms/:slug/typing', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !roomCanPost(store, room, req.authUser.id)) return res.status(403).json({ error: 'Join this room before typing.' });
  // Broadcast typing to room members (not back to sender)
  sseBroadcastRoom(store, room.id, 'typing', {
    roomId: room.id,
    roomSlug: room.slug,
    userId: req.authUser.id,
    handle: req.authUser.handle,
    displayName: req.authUser.displayName
  }, req.authUser.id);
  res.json({ ok: true });
});

// ── Message edit ──────────────────────────────────────────────────────────────
app.patch('/api/chat/rooms/:slug/messages/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const message = store.messages.find(m => Number(m.id) === Number(req.params.id));
  if (!message || Number(message.roomId) !== Number(room.id)) return res.status(404).json({ error: 'Message not found.' });
  if (Number(message.userId) !== Number(req.authUser.id)) return res.status(403).json({ error: 'Not your message.' });
  if (message.deletedAt) return res.status(410).json({ error: 'Message was deleted.' });
  const newBody = sanitizeText(req.body?.body || '', 4000);
  if (!newBody) return res.status(400).json({ error: 'Body cannot be empty.' });
  message.body = newBody;
  message.editedAt = nowIso();
  message.updatedAt = nowIso();
  saveStore(store);
  const pub = publicMessage(store, message, req.authUser.id);
  sseBroadcastRoom(store, room.id, 'message_updated', pub);
  res.json({ item: pub });
});

// ── Message delete ────────────────────────────────────────────────────────────
app.delete('/api/chat/rooms/:slug/messages/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const message = store.messages.find(m => Number(m.id) === Number(req.params.id));
  if (!message || Number(message.roomId) !== Number(room.id)) return res.status(404).json({ error: 'Message not found.' });
  const role = room.memberRoles?.[String(req.authUser.id)] || 'member';
  const canDelete = Number(message.userId) === Number(req.authUser.id) || ['owner','admin','moderator'].includes(role);
  if (!canDelete) return res.status(403).json({ error: 'Not allowed.' });
  // Soft delete — keep record, blank content
  message.deletedAt = nowIso();
  message.body = '';
  message.attachment = null;
  message.ciphertext = '';
  message.iv = '';
  message.stickerId = null;
  message.updatedAt = nowIso();
  saveStore(store);
  sseBroadcastRoom(store, room.id, 'message_deleted', { id: message.id, roomId: room.id, roomSlug: room.slug });
  res.json({ ok: true });
});

// ── Message reactions ─────────────────────────────────────────────────────────
app.post('/api/chat/rooms/:slug/messages/:id/reactions', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.reactions) store.reactions = [];
  if (!store.seq.reactions) store.seq.reactions = 0;
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const message = store.messages.find(m => Number(m.id) === Number(req.params.id) && Number(m.roomId) === Number(room.id));
  if (!message) return res.status(404).json({ error: 'Message not found.' });
  const emoji = sanitizeText(req.body?.emoji || '', 8);
  if (!emoji) return res.status(400).json({ error: 'Emoji required.' });
  const existing = store.reactions.find(r => Number(r.messageId) === Number(message.id) && Number(r.userId) === Number(req.authUser.id) && r.emoji === emoji);
  if (existing) {
    store.reactions = store.reactions.filter(r => r.id !== existing.id);
  } else {
    store.reactions.push({ id: ++store.seq.reactions, messageId: message.id, userId: req.authUser.id, emoji, createdAt: nowIso() });
  }
  saveStore(store);
  const pub = publicMessage(store, message, req.authUser.id);
  sseBroadcastRoom(store, room.id, 'message_updated', pub);
  res.json({ reactions: pub.reactions });
});

// ── Business message confirmation ────────────────────────────────────────────
app.post('/api/chat/rooms/:slug/messages/:id/confirm', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.readReceipts) store.readReceipts = [];
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (!(room.kind === 'direct' && room.surface === 'work')) {
    return res.status(400).json({ error: 'Confirmation is available only in work direct chats.' });
  }
  const message = store.messages.find(m => Number(m.id) === Number(req.params.id) && Number(m.roomId) === Number(room.id));
  if (!message) return res.status(404).json({ error: 'Message not found.' });
  if (Number(message.userId) === Number(req.authUser.id)) {
    return res.status(400).json({ error: 'You cannot confirm your own message.' });
  }
  if (message.deletedAt) return res.status(410).json({ error: 'Message was deleted.' });

  const now = nowIso();
  let receiptChanged = false;
  const existingReceipt = store.readReceipts.find(r => Number(r.userId) === Number(req.authUser.id) && Number(r.roomId) === Number(room.id));
  if (existingReceipt) {
    if (Number(existingReceipt.lastReadMessageId || 0) < Number(message.id)) {
      existingReceipt.lastReadMessageId = Number(message.id);
      existingReceipt.updatedAt = now;
      receiptChanged = true;
    }
  } else {
    store.readReceipts.push({ userId: req.authUser.id, roomId: room.id, lastReadMessageId: Number(message.id), updatedAt: now });
    receiptChanged = true;
  }

  let confirmationChanged = false;
  if (!message.confirmedAt) {
    message.confirmedAt = now;
    message.confirmedByUserId = Number(req.authUser.id);
    message.updatedAt = now;
    confirmationChanged = true;
  }

  if (receiptChanged || confirmationChanged) saveStore(store);
  if (receiptChanged) {
    sseBroadcastRoom(store, room.id, 'read_receipt', {
      userId: req.authUser.id,
      roomSlug: room.slug,
      lastReadMessageId: Number(message.id)
    }, req.authUser.id);
  }
  if (confirmationChanged) {
    sseBroadcastRoom(store, room.id, 'message_confirmed', {
      roomId: room.id,
      roomSlug: room.slug,
      messageId: message.id,
      confirmedAt: message.confirmedAt,
      confirmedByUserId: Number(req.authUser.id)
    }, req.authUser.id);
  }
  res.json({ item: publicMessage(store, message, req.authUser.id) });
});

// ── Pin message ───────────────────────────────────────────────────────────────
app.post('/api/chat/rooms/:slug/messages/:id/pin', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.pinnedMessages) store.pinnedMessages = [];
  if (!store.seq.pinnedMessages) store.seq.pinnedMessages = 0;
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const role = room.memberRoles?.[String(req.authUser.id)] || 'member';
  if (!['owner','admin','moderator'].includes(role)) return res.status(403).json({ error: 'Need moderator role.' });
  const message = store.messages.find(m => Number(m.id) === Number(req.params.id) && Number(m.roomId) === Number(room.id));
  if (!message) return res.status(404).json({ error: 'Message not found.' });
  const alreadyPinned = store.pinnedMessages.find(p => Number(p.messageId) === Number(message.id));
  if (alreadyPinned) {
    store.pinnedMessages = store.pinnedMessages.filter(p => p.id !== alreadyPinned.id);
    saveStore(store);
    sseBroadcastRoom(store, room.id, 'message_unpinned', { messageId: message.id, roomSlug: room.slug });
    return res.json({ ok: true, pinned: false });
  }
  store.pinnedMessages.push({ id: ++store.seq.pinnedMessages, roomId: room.id, messageId: message.id, pinnedByUserId: req.authUser.id, createdAt: nowIso() });
  saveStore(store);
  sseBroadcastRoom(store, room.id, 'message_pinned', { messageId: message.id, roomSlug: room.slug, pinnedBy: req.authUser.handle });
  res.json({ ok: true, pinned: true });
});

// ── Get pinned messages for room ──────────────────────────────────────────────
app.get('/api/chat/rooms/:slug/pinned', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.pinnedMessages) store.pinnedMessages = [];
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const pins = store.pinnedMessages.filter(p => Number(p.roomId) === Number(room.id));
  const messages = pins.map(p => {
    const msg = store.messages.find(m => Number(m.id) === Number(p.messageId));
    return msg ? { ...publicMessage(store, msg, req.authUser.id), pinnedAt: p.createdAt } : null;
  }).filter(Boolean);
  res.json({ items: messages });
});

// ── Room member list + add/remove ─────────────────────────────────────────────
app.get('/api/chat/rooms/:slug/members', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const members = room.memberIds.map(id => {
    const u = store.users.find(u => Number(u.id) === Number(id));
    if (!u) return null;
    return { ...publicUser(store, u, req.authUser.id), role: room.memberRoles?.[String(id)] || 'member' };
  }).filter(Boolean);
  res.json({ members });
});

app.post('/api/chat/rooms/:slug/members', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const role = room.memberRoles?.[String(req.authUser.id)] || 'member';
  if (!['owner','admin'].includes(role)) return res.status(403).json({ error: 'Need admin role.' });
  const target = store.users.find(u => u.handleCanonical === canonicalHandle(req.body?.handle || ''));
  if (!target) return res.status(404).json({ error: 'User not found.' });
  if (room.kind !== 'direct' && roomSubscriptionLocked(store, room, target.id)) {
    return res.status(403).json({
      error: `@${target.handle} needs ${subscriptionPlan(room.subscription.requiredPlanId)?.label || room.subscription.requiredPlanId} to join this room.`,
      upgradeRequired: true,
      requiredPlanId: room.subscription.requiredPlanId
    });
  }
  if (!room.memberIds.includes(Number(target.id))) {
    room.memberIds.push(Number(target.id));
    room.memberRoles[String(target.id)] = 'member';
    room.updatedAt = nowIso();
    saveStore(store);
    sseSend(target.id, 'room_added', { room: publicRoom(store, room, target.id) });
  }
  res.json({ ok: true });
});

app.patch('/api/chat/rooms/:slug/members/:userId', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const myRole = room.memberRoles?.[String(req.authUser.id)] || 'member';
  if (!['owner', 'admin'].includes(myRole)) return res.status(403).json({ error: 'Need admin role.' });
  const targetId = Number(req.params.userId);
  if (!room.memberIds.includes(targetId)) return res.status(404).json({ error: 'Not a member.' });
  const targetRole = room.memberRoles?.[String(targetId)] || 'member';
  if (targetRole === 'owner' && myRole !== 'owner') return res.status(403).json({ error: 'Only the owner can change another owner.' });
  const nextRole = req.body?.role;
  if (!['admin', 'moderator', 'member'].includes(nextRole)) return res.status(400).json({ error: 'Invalid role.' });
  room.memberRoles[String(targetId)] = nextRole;
  room.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

app.delete('/api/chat/rooms/:slug/members/:userId', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const myRole = room.memberRoles?.[String(req.authUser.id)] || 'member';
  const targetId = Number(req.params.userId);
  const isSelf = targetId === Number(req.authUser.id);
  const targetRole = room.memberRoles?.[String(targetId)] || 'member';
  if (targetRole === 'owner' && myRole !== 'owner') return res.status(403).json({ error: 'Only the owner can remove another owner.' });
  if (!isSelf && !['owner','admin','moderator'].includes(myRole)) return res.status(403).json({ error: 'Need moderator role.' });
  room.memberIds = room.memberIds.filter(id => Number(id) !== targetId);
  delete room.memberRoles[String(targetId)];
  room.updatedAt = nowIso();
  saveStore(store);
  sseSend(targetId, 'room_removed', { roomId: room.id, roomSlug: room.slug });
  res.json({ ok: true });
});

// ── Search messages in room ───────────────────────────────────────────────────
app.get('/api/chat/rooms/:slug/search', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  if (!q) return res.json({ items: [] });
  const results = store.messages
    .filter(m => Number(m.roomId) === Number(room.id) && !m.deletedAt && !m.encrypted && m.body.toLowerCase().includes(q))
    .sort((a, b) => sortDateDesc(a, b))
    .slice(0, 50)
    .map(m => publicMessage(store, m, req.authUser.id));
  res.json({ items: results });
});

// ── Global search messages ────────────────────────────────────────────────────
app.get('/api/search/messages', requireAuth, (req, res) => {
  const store = loadStore();
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  if (!q) return res.json({ items: [] });
  const accessibleRoomIds = new Set(
    store.rooms.filter(r => roomAccessible(r, req.authUser.id)).map(r => r.id)
  );
  const results = store.messages
    .filter(m => accessibleRoomIds.has(m.roomId) && !m.deletedAt && !m.encrypted && m.body.toLowerCase().includes(q))
    .sort((a, b) => sortDateDesc(a, b))
    .slice(0, 30)
    .map(m => publicMessage(store, m, req.authUser.id));
  res.json({ items: results });
});

// ── Workspace edit ────────────────────────────────────────────────────────────
app.patch('/api/me/workspaces/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws) return res.status(404).json({ error: 'Workspace not found.' });
  const role = ws.memberRoles?.[String(req.authUser.id)];
  if (!['owner','admin'].includes(role)) return res.status(403).json({ error: 'Not allowed.' });
  if (req.body?.title) ws.title = sanitizeText(req.body.title, 80) || ws.title;
  if (req.body?.description !== undefined) ws.description = sanitizeText(req.body.description, 300);
  if (req.body?.visibility && ['open','private','secret'].includes(req.body.visibility)) ws.visibility = req.body.visibility;
  if (req.body?.accent) ws.accent = sanitizeText(req.body.accent, 24);
  if (req.body?.avatarDataUrl) ws.avatarUrl = saveDataImage(req.body.avatarDataUrl, `ws-${ws.id}`) || ws.avatarUrl;
  ws.updatedAt = nowIso();
  saveStore(store);
  res.json({ workspace: publicWorkspace(store, ws, req.authUser.id) });
});

// ── Workspace member management ───────────────────────────────────────────────
app.get('/api/me/workspaces/:id/members', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id) && w.memberIds.includes(Number(req.authUser.id)));
  if (!ws) return res.status(404).json({ error: 'Workspace not found.' });
  const members = ws.memberIds.map(id => {
    const u = store.users.find(u => Number(u.id) === Number(id));
    return u ? { ...publicUser(store, u, req.authUser.id), role: ws.memberRoles?.[String(id)] || 'member' } : null;
  }).filter(Boolean);
  res.json({ members });
});

app.patch('/api/me/workspaces/:id/members/:userId', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws) return res.status(404).json({ error: 'Workspace not found.' });
  const myRole = ws.memberRoles?.[String(req.authUser.id)];
  if (!['owner','admin'].includes(myRole)) return res.status(403).json({ error: 'Not allowed.' });
  const newRole = req.body?.role;
  if (!['admin','moderator','member'].includes(newRole)) return res.status(400).json({ error: 'Invalid role.' });
  const targetId = Number(req.params.userId);
  if (!ws.memberIds.includes(targetId)) return res.status(404).json({ error: 'Not a member.' });
  ws.memberRoles[String(targetId)] = newRole;
  ws.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

// ── Task complete / delete ────────────────────────────────────────────────────
app.patch('/api/me/workspaces/:id/tasks/:taskId', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws || !ws.memberIds.includes(Number(req.authUser.id))) return res.status(404).json({ error: 'Not found.' });
  const task = store.tasks.find(t => Number(t.id) === Number(req.params.taskId) && Number(t.workspaceId) === Number(ws.id));
  if (!task) return res.status(404).json({ error: 'Task not found.' });
  if (req.body?.status && ['open','in-progress','done'].includes(req.body.status)) task.status = req.body.status;
  if (req.body?.title) task.title = sanitizeText(req.body.title, 120) || task.title;
  if (req.body?.description !== undefined) task.description = sanitizeText(req.body.description, 1200);
  if (req.body?.dueAt !== undefined) task.dueAt = req.body.dueAt || null;
  if (req.body?.assigneeUserIds) task.assigneeUserIds = ensureArray(req.body.assigneeUserIds).map(Number).filter(Boolean);
  task.updatedAt = nowIso();
  saveStore(store);
  res.json({ task: publicTask(store, task) });
});

app.delete('/api/me/workspaces/:id/tasks/:taskId', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws) return res.status(404).json({ error: 'Not found.' });
  const myRole = ws.memberRoles?.[String(req.authUser.id)];
  if (!['owner','admin','moderator'].includes(myRole)) return res.status(403).json({ error: 'Not allowed.' });
  store.tasks = store.tasks.filter(t => !(Number(t.id) === Number(req.params.taskId) && Number(t.workspaceId) === Number(ws.id)));
  saveStore(store);
  res.json({ ok: true });
});

// ── Project edit + delete ─────────────────────────────────────────────────────
app.patch('/api/me/projects/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const project = store.projects.find(p => Number(p.id) === Number(req.params.id) && Number(p.userId) === Number(req.authUser.id));
  if (!project) return res.status(404).json({ error: 'Project not found.' });
  if (req.body?.title) project.title = sanitizeText(req.body.title, 90) || project.title;
  if (req.body?.summary !== undefined) project.summary = sanitizeText(req.body.summary, 220);
  if (req.body?.description !== undefined) project.description = sanitizeText(req.body.description, 7000);
  if (req.body?.visibility && ['public','unlisted','private'].includes(req.body.visibility)) project.visibility = req.body.visibility;
  if (req.body?.tags) project.tags = ensureArray(req.body.tags).map(t => sanitizeText(t, 20)).filter(Boolean);
  if (req.body?.coverDataUrl) project.coverUrl = saveDataImage(req.body.coverDataUrl, 'project') || project.coverUrl;
  project.updatedAt = nowIso();
  saveStore(store);
  res.json({ project: publicProject(store, project, req.authUser.id) });
});

app.delete('/api/me/projects/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const project = store.projects.find(p => Number(p.id) === Number(req.params.id) && Number(p.userId) === Number(req.authUser.id));
  if (!project) return res.status(404).json({ error: 'Project not found.' });
  store.projects = store.projects.filter(p => Number(p.id) !== Number(project.id));
  saveStore(store);
  res.json({ ok: true });
});

// ── Post delete ───────────────────────────────────────────────────────────────
app.delete('/api/me/posts/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const post = store.posts.find(p => Number(p.id) === Number(req.params.id) && Number(p.userId) === Number(req.authUser.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  store.posts = store.posts.filter(p => Number(p.id) !== Number(post.id));
  store.comments = store.comments.filter(c => Number(c.postId) !== Number(post.id));
  store.likes = store.likes.filter(l => Number(l.postId) !== Number(post.id));
  saveStore(store);
  res.json({ ok: true });
});

// ── Comment delete/edit ───────────────────────────────────────────────────────
app.patch('/api/public/feed/:postId/comments/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const comment = store.comments.find(c => Number(c.id) === Number(req.params.id) && Number(c.postId) === Number(req.params.postId));
  if (!comment || Number(comment.userId) !== Number(req.authUser.id)) return res.status(404).json({ error: 'Comment not found.' });
  comment.body = sanitizeText(req.body?.body || comment.body, 1800);
  comment.updatedAt = nowIso();
  saveStore(store);
  res.json({ item: publicComment(store, comment, req.authUser.id) });
});

app.delete('/api/public/feed/:postId/comments/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const comment = store.comments.find(c => Number(c.id) === Number(req.params.id) && Number(c.postId) === Number(req.params.postId));
  if (!comment) return res.status(404).json({ error: 'Comment not found.' });
  const post = store.posts.find(p => Number(p.id) === Number(req.params.postId));
  const canDelete = Number(comment.userId) === Number(req.authUser.id) || (post && Number(post.userId) === Number(req.authUser.id));
  if (!canDelete) return res.status(403).json({ error: 'Not allowed.' });
  store.comments = store.comments.filter(c => Number(c.id) !== Number(comment.id));
  saveStore(store);
  res.json({ ok: true });
});

// ── Notification mark all read + delete ──────────────────────────────────────
app.post('/api/me/notifications/read-all', requireAuth, (req, res) => {
  const store = loadStore();
  const now = nowIso();
  store.notifications.filter(n => Number(n.userId) === Number(req.authUser.id) && !n.readAt).forEach(n => { n.readAt = now; });
  saveStore(store);
  res.json({ ok: true });
});

app.delete('/api/me/notifications/:id', requireAuth, (req, res) => {
  const store = loadStore();
  store.notifications = store.notifications.filter(n => !(Number(n.id) === Number(req.params.id) && Number(n.userId) === Number(req.authUser.id)));
  saveStore(store);
  res.json({ ok: true });
});

// ── Password + email change ───────────────────────────────────────────────────
app.patch('/api/me/password', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'Not found.' });
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords required.' });
  if (!bcrypt.compareSync(currentPassword, user.passwordHash)) return res.status(401).json({ error: 'Current password is wrong.' });
  if (String(newPassword).length < 8) return res.status(400).json({ error: 'New password must be 8+ characters.' });
  user.passwordHash = bcrypt.hashSync(newPassword, 12);
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

app.patch('/api/me/email', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'Not found.' });
  const { password, email } = req.body || {};
  if (!password || !email) return res.status(400).json({ error: 'Password and email required.' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: 'Wrong password.' });
  const newEmail = sanitizeText(email, 120).toLowerCase();
  if (store.users.some(u => u.email === newEmail && u.id !== user.id)) return res.status(409).json({ error: 'Email already taken.' });
  user.email = newEmail;
  user.emailVerified = false;
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

// ── Handle change ─────────────────────────────────────────────────────────────
app.patch('/api/me/handle', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'Not found.' });
  const newHandle = cleanHandle(req.body?.handle || '');
  if (!newHandle || newHandle.length < 2) return res.status(400).json({ error: 'Handle must be 2+ characters.' });
  if (store.users.some(u => u.handleCanonical === canonicalHandle(newHandle) && u.id !== user.id)) return res.status(409).json({ error: 'Handle taken.' });
  user.handle = newHandle;
  user.handleCanonical = canonicalHandle(newHandle);
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true, handle: user.handle });
});

// ── Read receipts ─────────────────────────────────────────────────────────────
app.post('/api/chat/rooms/:slug/read', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.readReceipts) store.readReceipts = [];
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const lastMsgId = Number(req.body?.lastMessageId || 0);
  const existing = store.readReceipts.find(r => Number(r.userId) === Number(req.authUser.id) && Number(r.roomId) === Number(room.id));
  if (existing) {
    existing.lastReadMessageId = lastMsgId;
    existing.updatedAt = nowIso();
  } else {
    store.readReceipts.push({ userId: req.authUser.id, roomId: room.id, lastReadMessageId: lastMsgId, updatedAt: nowIso() });
  }
  saveStore(store);
  // Broadcast to DM partner that you read
  if (room.kind === 'direct') {
    sseBroadcastRoom(store, room.id, 'read_receipt', { userId: req.authUser.id, roomSlug: room.slug, lastReadMessageId: lastMsgId }, req.authUser.id);
  }
  res.json({ ok: true });
});

// ── Bot token API ─────────────────────────────────────────────────────────────
app.get('/api/me/bots', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.botTokens) store.botTokens = [];
  const bots = store.botTokens.filter(b => Number(b.userId) === Number(req.authUser.id));
  res.json({ bots: bots.map(b => ({ id: b.id, name: b.name, permissions: b.permissions, createdAt: b.createdAt })) });
});

app.post('/api/me/bots', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.botTokens) store.botTokens = [];
  if (!store.seq.botTokens) store.seq.botTokens = 0;
  const name = sanitizeText(req.body?.name || '', 60);
  if (!name) return res.status(400).json({ error: 'Bot name required.' });
  const token = createToken();
  const bot = { id: ++store.seq.botTokens, userId: req.authUser.id, name, tokenHash: hashToken(token), permissions: ensureArray(req.body?.permissions).map(p => sanitizeText(p, 30)), createdAt: nowIso() };
  store.botTokens.push(bot);
  saveStore(store);
  res.status(201).json({ id: bot.id, name: bot.name, token }); // token shown once
});

app.delete('/api/me/bots/:id', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.botTokens) store.botTokens = [];
  store.botTokens = store.botTokens.filter(b => !(Number(b.id) === Number(req.params.id) && Number(b.userId) === Number(req.authUser.id)));
  saveStore(store);
  res.json({ ok: true });
});

// Bot: post message to room using token
app.post('/api/bot/rooms/:slug/messages', (req, res) => {
  const store = loadStore();
  if (!store.botTokens) store.botTokens = [];
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'Token required.' });
  const bot = store.botTokens.find(b => b.tokenHash === hashToken(token));
  if (!bot) return res.status(401).json({ error: 'Invalid token.' });
  const room = store.rooms.find(r => r.slug === slugify(req.params.slug));
  if (!room) return res.status(404).json({ error: 'Room not found.' });
  const body = sanitizeText(req.body?.body || '', 4000);
  if (!body) return res.status(400).json({ error: 'Body required.' });
  const botUser = store.users.find(u => Number(u.id) === Number(bot.userId));
  const message = messageDefaults({ id: nextId(store, 'messages'), roomId: room.id, userId: bot.userId, body, createdAt: nowIso(), updatedAt: nowIso() });
  store.messages.push(message);
  room.lastActivityAt = nowIso();
  saveStore(store);
  const pub = publicMessage(store, message, null);
  sseBroadcastRoom(store, room.id, 'new_message', pub);
  res.status(201).json({ item: pub });
});

// ── Audit log ─────────────────────────────────────────────────────────────────
app.get('/api/me/workspaces/:id/audit', requireAuth, (req, res) => {
  const store = loadStore();
  if (!store.auditLogs) store.auditLogs = [];
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws || !ws.memberIds.includes(Number(req.authUser.id))) return res.status(404).json({ error: 'Not found.' });
  const role = ws.memberRoles?.[String(req.authUser.id)];
  if (!['owner','admin'].includes(role)) return res.status(403).json({ error: 'Need admin role.' });
  const logs = store.auditLogs.filter(l => Number(l.workspaceId) === Number(ws.id)).sort((a, b) => sortDateDesc(a, b)).slice(0, 100);
  res.json({ items: logs });
});

// ── Admin API (owner only) ────────────────────────────────────────────────────
function requireOwner(req, res, next) {
  if (!req.authUser || req.authUser.roleInternal !== 'owner') return res.status(403).json({ error: 'Owner only.' });
  next();
}

app.get('/api/admin/stats', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  const now = Date.now();
  const day = 86400000;
  res.json({
    users: { total: store.users.length, banned: store.users.filter(u => u.bannedAt).length, newToday: store.users.filter(u => now - new Date(u.createdAt).getTime() < day).length },
    messages: { total: store.messages.length, today: store.messages.filter(m => now - new Date(m.createdAt).getTime() < day).length },
    posts: { total: store.posts.length },
    rooms: { total: store.rooms.length, direct: store.rooms.filter(r => r.kind === 'direct').length, channels: store.rooms.filter(r => r.kind === 'channel').length },
    sites: { total: store.sites.length, public: store.sites.filter(s => s.visibility === 'public').length },
    workspaces: store.workspaces.length,
    storage: { uploadsMB: 'N/A' }
  });
});

app.get('/api/admin/logs', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  const logs = (store.auditLogs || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 100).map(log => {
    const actor = store.users.find(u => Number(u.id) === Number(log.userId));
    const target = log.targetId ? store.users.find(u => Number(u.id) === Number(log.targetId)) : null;
    return { ...log, actorHandle: actor?.handle || 'unknown', targetHandle: target?.handle || '' };
  });
  res.json({ logs });
});

app.get('/api/admin/users', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  let users = store.users;
  if (q) users = users.filter(u => (u.handleCanonical + u.email + u.displayName).toLowerCase().includes(q));
  res.json({ users: users.map(u => publicUser(store, u, req.authUser.id)).sort((a, b) => b.score - a.score) });
});

app.patch('/api/admin/users/:handle', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => u.handleCanonical === canonicalHandle(req.params.handle));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (req.body?.ban === true && !user.bannedAt) {
    user.bannedAt = nowIso();
    user.banReason = sanitizeText(req.body.reason || '', 300);
    // Invalidate sessions
    store.sessions = store.sessions.filter(s => Number(s.userId) !== Number(user.id));
    makeNotification(store, user.id, 'Account restricted', 'Your account has been restricted by a moderator.', '/');
  }
  if (req.body?.ban === false) { user.bannedAt = null; user.banReason = ''; }
  if (req.body?.badges) user.badges = cleanBadges(req.body.badges);
  if (req.body?.roleInternal && ['member','moderator','admin','owner'].includes(req.body.roleInternal)) user.roleInternal = req.body.roleInternal;
  if (req.body?.verify === true) {
    if (!user.badges.includes('VRF')) user.badges = [...user.badges.filter(b => b !== 'USR'), 'VRF'];
    const pending = store.verificationRequests.find(r => Number(r.userId) === Number(user.id) && r.status === 'pending');
    if (pending) { pending.status = 'approved'; pending.decidedAt = nowIso(); pending.decidedByUserId = req.authUser.id; }
  }
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ user: publicUser(store, user, req.authUser.id) });
});

// Paginated messages endpoint
app.get('/api/chat/rooms/:slug/messages', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(item => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const joined = room.memberIds.includes(Number(req.authUser.id));
  const premiumLocked = room.kind !== 'direct' && roomSubscriptionLocked(store, room, req.authUser.id);
  if (premiumLocked) {
    return res.json({
      room: publicRoom(store, room, req.authUser.id),
      messages: [],
      tasks: [],
      hasMore: false,
      previewOnly: true,
      lastReadMessageId: 0,
      readReceipts: {}
    });
  }
  const limit = Math.min(100, Math.max(10, Number(req.query.limit || 50)));
  const before = Number(req.query.before || 0); // message id cursor
  let messages = store.messages.filter(item => Number(item.roomId) === Number(room.id));
  if (before > 0) messages = messages.filter(m => m.id < before);
  messages = messages.sort((a, b) => b.id - a.id).slice(0, limit).reverse();
  const tasks = joined
    ? store.tasks.filter(task => (room.workspaceId && Number(task.workspaceId) === Number(room.workspaceId)) || (task.roomId && Number(task.roomId) === Number(room.id))).map(task => publicTask(store, task))
    : [];
  const readReceipt = joined
    ? (store.readReceipts || []).find(r => Number(r.userId) === Number(req.authUser.id) && Number(r.roomId) === Number(room.id))
    : null;
  const roomReadReceipts = joined
    ? Object.fromEntries(
        (store.readReceipts || [])
          .filter(r => Number(r.roomId) === Number(room.id))
          .map(r => [String(r.userId), Number(r.lastReadMessageId || 0)])
      )
    : {};
  res.json({
    room: publicRoom(store, room, req.authUser.id),
    messages: messages.map(item => publicMessage(store, item, req.authUser.id)),
    tasks,
    hasMore: store.messages.filter(m => Number(m.roomId) === Number(room.id) && (before > 0 ? m.id < before : true)).length > limit,
    lastReadMessageId: readReceipt?.lastReadMessageId || 0,
    readReceipts: roomReadReceipts
  });
});


// ── Ad slots API (owner manages, public reads) ────────────────────────────────
// Store ads in store.json under store.ads = []
app.get('/api/ads', (req, res) => {
  const store = loadStore();
  const ads = ensureArray(store.ads || []);
  // Public: return only active slots (not draft)
  res.json({ ads: ads.filter(a => a.active !== false) });
});

app.get('/api/admin/ads', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  res.json({ ads: ensureArray(store.ads || []) });
});

app.post('/api/admin/ads', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  if (!store.ads) store.ads = [];
  const ad = {
    id: `ad-${Date.now()}`,
    type: ['banner','card'].includes(req.body?.type) ? req.body.type : 'banner',
    icon: sanitizeText(req.body?.icon || '📢', 8),
    logo: sanitizeText(req.body?.logo || '', 300),
    title: sanitizeText(req.body?.title || 'Sponsor', 80),
    desc: sanitizeText(req.body?.desc || '', 220),
    cta: sanitizeText(req.body?.cta || 'Learn more', 40),
    href: sanitizeText(req.body?.href || '/', 240),
    internal: Boolean(req.body?.internal),
    active: true,
    createdAt: nowIso()
  };
  store.ads.push(ad);
  saveStore(store);
  res.status(201).json({ ad });
});

app.patch('/api/admin/ads/:id', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  if (!store.ads) store.ads = [];
  const ad = store.ads.find(a => a.id === req.params.id);
  if (!ad) return res.status(404).json({ error: 'Ad not found.' });
  if (req.body?.title !== undefined) ad.title = sanitizeText(req.body.title, 80);
  if (req.body?.desc !== undefined) ad.desc = sanitizeText(req.body.desc, 220);
  if (req.body?.cta !== undefined) ad.cta = sanitizeText(req.body.cta, 40);
  if (req.body?.href !== undefined) ad.href = sanitizeText(req.body.href, 240);
  if (req.body?.icon !== undefined) ad.icon = sanitizeText(req.body.icon, 8);
  if (req.body?.logo !== undefined) ad.logo = sanitizeText(req.body.logo, 300);
  if (req.body?.active !== undefined) ad.active = Boolean(req.body.active);
  if (req.body?.type && ['banner','card'].includes(req.body.type)) ad.type = req.body.type;
  saveStore(store);
  res.json({ ad });
});

app.delete('/api/admin/ads/:id', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  if (!store.ads) store.ads = [];
  store.ads = store.ads.filter(a => a.id !== req.params.id);
  saveStore(store);
  res.json({ ok: true });
});

// ── Telemetry (anonymous, self-hosted) ───────────────────────────────────────
// Stores one NDJSON file per day under data/telemetry/tel-YYYY-MM-DD.ndjson.
// We capture: pageviews, Core Web Vitals (LCP/CLS/INP/FCP/TTFB), client JS errors,
// and session start/end events. No IP addresses, no post/message content — just
// route + timing. Retention: 180 days (privacy policy §4).

const TELEMETRY_ALLOWED_TYPES = new Set(['pageview', 'web-vital', 'error', 'session', 'timing']);
const TELEMETRY_ALLOWED_VITALS = new Set(['LCP', 'CLS', 'INP', 'FCP', 'TTFB']);
const TELEMETRY_RETENTION_DAYS = 180;

function telemetryFileForDay(isoDate) {
  return path.join(telemetryDir, `tel-${isoDate}.ndjson`);
}
function sanitizeTelemetryString(value, max = 240) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max);
}
function sanitizeTelemetryPath(value) {
  const raw = sanitizeTelemetryString(value, 240);
  if (!raw.startsWith('/')) return '/';
  return raw.split('?')[0].split('#')[0] || '/';
}
function sanitizeTelemetryNumber(value, max = 1e8) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  if (n < 0) return 0;
  if (n > max) return max;
  return Math.round(n * 1000) / 1000;
}

function writeTelemetryEvent(event) {
  try {
    const day = new Date().toISOString().slice(0, 10);
    const line = JSON.stringify(event) + '\n';
    appendFileSync(telemetryFileForDay(day), line);
  } catch (err) {
    console.error('[telemetry] write failed:', err.message);
  }
}

function rotateTelemetry() {
  try {
    const cutoff = Date.now() - TELEMETRY_RETENTION_DAYS * 86400000;
    const files = readdirSync(telemetryDir).filter(f => f.startsWith('tel-') && f.endsWith('.ndjson'));
    for (const f of files) {
      const full = path.join(telemetryDir, f);
      try {
        if (statSync(full).mtimeMs < cutoff) unlinkSync(full);
      } catch {}
    }
  } catch (err) {
    console.error('[telemetry] rotate failed:', err.message);
  }
}

app.post('/api/telemetry/event', (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (rateLimit(`tel:${ip}`, 120)) return res.status(204).end();
  const body = req.body || {};
  const events = Array.isArray(body.events) ? body.events : [body];
  const now = nowIso();
  for (const raw of events.slice(0, 20)) {
    if (!raw || typeof raw !== 'object') continue;
    const type = sanitizeTelemetryString(raw.type, 24);
    if (!TELEMETRY_ALLOWED_TYPES.has(type)) continue;
    const entry = {
      t: now,
      type,
      path: sanitizeTelemetryPath(raw.path || '/'),
      sid: sanitizeTelemetryString(raw.sid || '', 32),
      lang: sanitizeTelemetryString(raw.lang || '', 8),
      ua: sanitizeTelemetryString(req.headers['user-agent'] || '', 240),
    };
    if (type === 'web-vital') {
      const name = sanitizeTelemetryString(raw.name, 8);
      if (!TELEMETRY_ALLOWED_VITALS.has(name)) continue;
      entry.name = name;
      entry.value = sanitizeTelemetryNumber(raw.value, 120000);
      entry.rating = sanitizeTelemetryString(raw.rating, 16);
    } else if (type === 'error') {
      entry.message = sanitizeTelemetryString(raw.message, 400);
      entry.source = sanitizeTelemetryString(raw.source, 240);
      entry.line = sanitizeTelemetryNumber(raw.line, 1e6);
      entry.col = sanitizeTelemetryNumber(raw.col, 1e6);
      entry.stack = sanitizeTelemetryString(raw.stack, 1200);
    } else if (type === 'timing') {
      entry.name = sanitizeTelemetryString(raw.name, 40);
      entry.value = sanitizeTelemetryNumber(raw.value, 3600000);
    } else if (type === 'session') {
      entry.event = sanitizeTelemetryString(raw.event, 16);
      entry.duration = sanitizeTelemetryNumber(raw.duration, 86400000);
    } else if (type === 'pageview') {
      entry.referrer = sanitizeTelemetryString(raw.referrer, 240);
      entry.viewport = sanitizeTelemetryString(raw.viewport, 20);
    }
    writeTelemetryEvent(entry);
  }
  res.status(204).end();
});

app.get('/api/admin/telemetry', requireAuth, requireOwner, (req, res) => {
  const days = Math.min(30, Math.max(1, Number(req.query.days) || 7));
  const now = Date.now();
  const buckets = {};
  const summary = {
    totalEvents: 0,
    pageviews: 0,
    errors: 0,
    sessions: 0,
    topRoutes: {},
    topErrors: {},
    vitals: { LCP: [], CLS: [], INP: [], FCP: [], TTFB: [] },
  };
  for (let i = 0; i < days; i++) {
    const d = new Date(now - i * 86400000).toISOString().slice(0, 10);
    const f = telemetryFileForDay(d);
    if (!existsSync(f)) { buckets[d] = { pageviews: 0, errors: 0 }; continue; }
    const lines = readFileSync(f, 'utf8').split('\n');
    let pv = 0, er = 0;
    for (const line of lines) {
      if (!line) continue;
      let ev; try { ev = JSON.parse(line); } catch { continue; }
      summary.totalEvents++;
      if (ev.type === 'pageview') {
        pv++;
        summary.pageviews++;
        summary.topRoutes[ev.path] = (summary.topRoutes[ev.path] || 0) + 1;
      } else if (ev.type === 'error') {
        er++;
        summary.errors++;
        const key = (ev.message || 'unknown').slice(0, 80);
        summary.topErrors[key] = (summary.topErrors[key] || 0) + 1;
      } else if (ev.type === 'session' && ev.event === 'start') {
        summary.sessions++;
      } else if (ev.type === 'web-vital' && TELEMETRY_ALLOWED_VITALS.has(ev.name)) {
        summary.vitals[ev.name].push(Number(ev.value) || 0);
      }
    }
    buckets[d] = { pageviews: pv, errors: er };
  }
  function percentile(arr, p) {
    if (!arr.length) return 0;
    const sorted = arr.slice().sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * p));
    return Math.round(sorted[idx] * 100) / 100;
  }
  const vitalsSummary = {};
  for (const key of Object.keys(summary.vitals)) {
    const arr = summary.vitals[key];
    vitalsSummary[key] = {
      count: arr.length,
      p50: percentile(arr, 0.5),
      p75: percentile(arr, 0.75),
      p95: percentile(arr, 0.95),
    };
  }
  const topRoutes = Object.entries(summary.topRoutes).sort((a, b) => b[1] - a[1]).slice(0, 15);
  const topErrors = Object.entries(summary.topErrors).sort((a, b) => b[1] - a[1]).slice(0, 15);
  res.json({
    days,
    totalEvents: summary.totalEvents,
    pageviews: summary.pageviews,
    errors: summary.errors,
    sessions: summary.sessions,
    byDay: buckets,
    topRoutes: topRoutes.map(([path, count]) => ({ path, count })),
    topErrors: topErrors.map(([message, count]) => ({ message, count })),
    vitals: vitalsSummary,
    retentionDays: TELEMETRY_RETENTION_DAYS,
  });
});

// Platform stats (public, lightweight) ───────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const store = loadStore();
  res.json({
    users: store.users.filter(u => !u.bannedAt).length,
    projects: store.projects.filter(p => p.visibility === 'public').length,
    sites: store.sites.filter(s => s.visibility === 'public').length,
    rooms: store.rooms.filter(r => r.visibility === 'open').length,
  });
});

// ── Invite by handle (create DM automatically) ───────────────────────────────
// Already exists as /api/chat/direct/:handle

// ── Me update status (manual online/away/dnd) ────────────────────────────────
app.patch('/api/me/status', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'Not found.' });
  const status = ['active','away','dnd','invisible'].includes(req.body?.status) ? req.body.status : 'active';
  user.status = status;
  user.updatedAt = nowIso();
  saveStore(store);
  // Broadcast status to followers via SSE
  const followers = store.follows.filter(f => Number(f.targetUserId) === Number(user.id));
  for (const f of followers) {
    sseSend(f.followerUserId, 'status_update', { userId: user.id, status });
  }
  res.json({ status });
});

// ── Posts with pagination ────────────────────────────────────────────────────
app.get('/api/public/feed', (req, res) => {
  const store = loadStore();
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  const kind = String(req.query.kind || 'all');
  const sort = String(req.query.sort || 'date');
  const limit = Math.min(30, Math.max(5, Number(req.query.limit || 20)));
  const before = Number(req.query.before || 0);
  const viewerId = req.authUser?.id || null;
  let items = store.posts.filter(p => p.status === 'published');
  if (kind !== 'all') items = items.filter(p => p.kind === kind);
  if (before > 0) items = items.filter(p => p.id < before);
  let rendered = items.map(p => publicPost(store, p, viewerId))
    .filter(p => !q || [p.title, p.body, p.author?.displayName, p.author?.handle].join(' ').toLowerCase().includes(q));
  if (sort === 'popularity') rendered.sort((a, b) => b.popularity - a.popularity);
  else rendered.sort((a, b) => sortDateDesc(a, b, 'publishedAt'));
  const page = rendered.slice(0, limit);
  res.json({ items: page, hasMore: rendered.length > limit });
});

// ── Workspace join by invite code (already exists as /api/chat/invites/:code/join)

// ── Delete workspace ──────────────────────────────────────────────────────────
app.delete('/api/me/workspaces/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws) return res.status(404).json({ error: 'Not found.' });
  if (Number(ws.ownerUserId) !== Number(req.authUser.id)) return res.status(403).json({ error: 'Only owner can delete workspace.' });
  // Remove all rooms and their messages
  const roomIds = store.rooms.filter(r => Number(r.workspaceId) === Number(ws.id)).map(r => r.id);
  store.messages = store.messages.filter(m => !roomIds.includes(m.roomId));
  store.rooms = store.rooms.filter(r => !roomIds.includes(r.id));
  store.tasks = store.tasks.filter(t => Number(t.workspaceId) !== Number(ws.id));
  store.workspaces = store.workspaces.filter(w => Number(w.id) !== Number(ws.id));
  saveStore(store);
  res.json({ ok: true });
});

// ── Kick from workspace ───────────────────────────────────────────────────────
app.delete('/api/me/workspaces/:id/members/:userId', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws || !['owner','admin'].includes(ws.memberRoles?.[String(req.authUser.id)])) return res.status(403).json({ error: 'Not allowed.' });
  const targetId = Number(req.params.userId);
  ws.memberIds = ws.memberIds.filter(id => Number(id) !== targetId);
  delete ws.memberRoles[String(targetId)];
  ws.updatedAt = nowIso();
  saveStore(store);
  sseSend(targetId, 'workspace_removed', { workspaceId: ws.id });
  res.json({ ok: true });
});

// ── Workspace channels list ───────────────────────────────────────────────────
app.get('/api/me/workspaces/:id/rooms', requireAuth, (req, res) => {
  const store = loadStore();
  const ws = store.workspaces.find(w => Number(w.id) === Number(req.params.id));
  if (!ws || !ws.memberIds.includes(Number(req.authUser.id))) return res.status(404).json({ error: 'Not found.' });
  const rooms = store.rooms
    .filter(r => Number(r.workspaceId) === Number(ws.id) && roomAccessible(r, req.authUser.id))
    .map(r => publicRoom(store, r, req.authUser.id));
  res.json({ rooms });
});


// ── Email verification system ─────────────────────────────────────────────────
// In-memory pending codes { email: { code, expiresAt, userId } }
const _pendingCodes = {};

function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Real SMTP send (TLS) with graceful fallback to console.log when SMTP_HOST not set.
// Uses raw net/tls to avoid adding nodemailer dependency.
function sendEmail(to, subject, body) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || process.env.BRAND_EMAIL || 'noreply@justbreath.life';

  if (!host || !user || !pass) {
    console.log(`\n📧 EMAIL TO: ${to}\n   Subject: ${subject}\n   Body: ${body}\n   (SMTP_HOST not set — printed to console; set SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS in .env to actually send)\n`);
    return;
  }

  // Lightweight SMTP submission. Uses STARTTLS on 587, implicit TLS on 465.
  const useTls = port === 465;
  const socket = useTls
    ? tls.connect({ host, port, servername: host })
    : net.connect({ host, port });
  let buffer = '';
  let stage = 0; // 0=greeting,1=ehlo,2=starttls,3=ehlo2,4=auth,5=user,6=pass,7=mailfrom,8=rcptto,9=data,10=body,11=quit
  const send = (line) => socket.write(line + '\r\n');
  const upgrade = () => {
    const sec = tls.connect({ socket, servername: host }, () => {
      socket.removeAllListeners('data');
      sec.on('data', onData);
      sec.on('error', onError);
      send2 = (line) => sec.write(line + '\r\n');
      stage = 3;
      send2('EHLO justbreath.life');
    });
  };
  let send2 = send;
  const onError = (err) => { console.error('[smtp]', err.message); try { socket.destroy(); } catch {} };
  const onData = (chunk) => {
    buffer += chunk.toString();
    if (!buffer.endsWith('\n')) return;
    const lines = buffer.trim().split(/\r?\n/);
    const last = lines[lines.length - 1];
    const code = parseInt(last.slice(0, 3), 10);
    buffer = '';
    if (code >= 400) { onError(new Error(`SMTP ${last}`)); return; }
    if (stage === 0) { stage = 1; send2(`EHLO justbreath.life`); return; }
    if (stage === 1) {
      if (useTls) { stage = 4; send2('AUTH LOGIN'); return; }
      stage = 2; send2('STARTTLS'); return;
    }
    if (stage === 2) { upgrade(); return; }
    if (stage === 3) { stage = 4; send2('AUTH LOGIN'); return; }
    if (stage === 4) { stage = 5; send2(Buffer.from(user).toString('base64')); return; }
    if (stage === 5) { stage = 6; send2(Buffer.from(pass).toString('base64')); return; }
    if (stage === 6) { stage = 7; send2(`MAIL FROM:<${from}>`); return; }
    if (stage === 7) { stage = 8; send2(`RCPT TO:<${to}>`); return; }
    if (stage === 8) { stage = 9; send2('DATA'); return; }
    if (stage === 9) {
      stage = 10;
      const headers = [
        `From: justbreath.life <${from}>`,
        `To: <${to}>`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/plain; charset=UTF-8`,
        `Date: ${new Date().toUTCString()}`,
        ``,
        body,
        `.`,
      ].join('\r\n');
      send2(headers);
      return;
    }
    if (stage === 10) { stage = 11; send2('QUIT'); return; }
    if (stage === 11) { try { socket.end(); } catch {} return; }
  };
  socket.on('data', onData);
  socket.on('error', onError);
  socket.setTimeout(15000, () => { onError(new Error('SMTP timeout')); });
}

app.post('/api/auth/send-verify', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (user.emailVerified) return res.status(400).json({ error: 'Email already verified.' });
  const code = genCode();
  _pendingCodes[user.email] = { code, expiresAt: Date.now() + 15 * 60000, userId: user.id };
  sendEmail(user.email, 'Verify your justbreath.life account',
    `Your verification code: ${code}\n\nExpires in 15 minutes.\n\nIf you didn't request this, ignore this email.`);
  res.json({ ok: true, hint: `Code sent to ${user.email.replace(/(.{2}).*@/, '$1***@')}` });
});

app.post('/api/auth/verify-email', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const code = sanitizeText(req.body?.code || '', 8);
  const pending = _pendingCodes[user.email];
  if (!pending || pending.userId !== user.id) return res.status(400).json({ error: 'No pending code. Request a new one.' });
  if (Date.now() > pending.expiresAt) { delete _pendingCodes[user.email]; return res.status(400).json({ error: 'Code expired. Request a new one.' }); }
  if (pending.code !== code) return res.status(400).json({ error: 'Wrong code.' });
  delete _pendingCodes[user.email];
  user.emailVerified = true;
  user.updatedAt = nowIso();
  saveStore(store);
  makeNotification(store, user.id, 'Email verified ✓', 'Your email address has been confirmed.', '/settings');
  saveStore(store);
  res.json({ ok: true });
});

app.post('/api/auth/send-login-code', (req, res) => {
  const store = loadStore();
  const email = sanitizeText(req.body?.email || '', 120).toLowerCase();
  const displayName = sanitizeText(req.body?.displayName || '', 60);
  if (!email) return res.status(400).json({ error: 'Email required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  const user = store.users.find((item) => item.email === email) || null;
  if (!user && !displayName) return res.status(400).json({ error: 'Name is required for first-time sign-in.' });
  const code = genCode();
  _pendingCodes[`login:${email}`] = {
    code,
    expiresAt: Date.now() + 15 * 60000,
    userId: user?.id || null,
    displayName: displayName || user?.displayName || '',
    email
  };
  sendEmail(email, 'Your justbreath.life sign-in code',
    `Your sign-in code: ${code}\n\nExpires in 15 minutes.\n\nIf you didn't request this, ignore this email.`);
  res.json({ ok: true, hint: `Code sent to ${email.replace(/(.{2}).*@/, '$1***@')}` });
});

app.post('/api/auth/login-code', (req, res) => {
  const store = loadStore();
  const email = sanitizeText(req.body?.email || '', 120).toLowerCase();
  const code = sanitizeText(req.body?.code || '', 8);
  const displayName = sanitizeText(req.body?.displayName || '', 60);
  if (!email || !code) return res.status(400).json({ error: 'Email and code are required.' });
  const pending = _pendingCodes[`login:${email}`];
  if (!pending) return res.status(400).json({ error: 'No pending sign-in code. Request a new one.' });
  if (Date.now() > pending.expiresAt) { delete _pendingCodes[`login:${email}`]; return res.status(400).json({ error: 'Code expired. Request a new one.' }); }
  if (pending.code !== code) return res.status(400).json({ error: 'Wrong code.' });
  let user = pending.userId ? store.users.find((item) => Number(item.id) === Number(pending.userId)) : null;
  if (!user) user = store.users.find((item) => item.email === email) || null;
  if (user?.bannedAt) return res.status(403).json({ error: 'This account has been suspended.' });
  if (!user) {
    const finalDisplayName = displayName || pending.displayName;
    if (!finalDisplayName) return res.status(400).json({ error: 'Name is required for first-time sign-in.' });
    user = userDefaults({
      id: nextId(store, 'users'),
      displayName: finalDisplayName,
      handle: uniqueHandle(store, email.split('@')[0] || finalDisplayName),
      email,
      passwordHash: '',
      roleInternal: 'member',
      bio: '',
      accent: 'violet',
      themePreference: 'dark',
      languagePreference: 'en',
      privacy: { showEmail: false, showRole: false, showActivity: false, profileVisibility: 'public', allowInvites: true, allowDirectMessages: 'everyone' },
      emailVerified: true,
      status: 'active',
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
    store.users.push(user);
  } else {
    user.emailVerified = true;
    user.updatedAt = nowIso();
  }
  delete _pendingCodes[`login:${email}`];
  const sessionToken = createSessionForUser(req, res, store, user.id);
  saveStore(store);
  res.json({ user: mePayload(store, user).user, sessionToken });
});

// Password reset via email
app.post('/api/auth/forgot-password', (req, res) => {
  const store = loadStore();
  const email = sanitizeText(req.body?.email || '', 120).toLowerCase();
  if (!email) return res.status(400).json({ error: 'Email required.' });
  const user = store.users.find(u => u.email === email);
  if (!user) return res.json({ ok: true }); // don't reveal if email exists
  const code = genCode();
  _pendingCodes[`reset:${email}`] = { code, expiresAt: Date.now() + 30 * 60000, userId: user.id };
  sendEmail(email, 'Reset your justbreath.life password',
    `Your password reset code: ${code}\n\nExpires in 30 minutes.\n\nIf you didn't request this, ignore this email.`);
  res.json({ ok: true, hint: `Code sent to ${email.replace(/(.{2}).*@/, '$1***@')}` });
});

app.post('/api/auth/reset-password', (req, res) => {
  const store = loadStore();
  const email = sanitizeText(req.body?.email || '', 120).toLowerCase();
  const code = sanitizeText(req.body?.code || '', 8);
  const newPassword = String(req.body?.newPassword || '');
  if (!email || !code || !newPassword) return res.status(400).json({ error: 'All fields required.' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'Password must be 8+ characters.' });
  const pending = _pendingCodes[`reset:${email}`];
  if (!pending) return res.status(400).json({ error: 'No pending reset. Request a new code.' });
  if (Date.now() > pending.expiresAt) { delete _pendingCodes[`reset:${email}`]; return res.status(400).json({ error: 'Code expired.' }); }
  if (pending.code !== code) return res.status(400).json({ error: 'Wrong code.' });
  const user = store.users.find(u => Number(u.id) === Number(pending.userId));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  delete _pendingCodes[`reset:${email}`];
  user.passwordHash = bcrypt.hashSync(newPassword, 12);
  store.sessions = store.sessions.filter(s => Number(s.userId) !== Number(user.id));
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

// ── Guest login ───────────────────────────────────────────────────────────────
app.post('/api/auth/guest', (req, res) => {
  const store = loadStore();
  const guestNum = store.seq.users + 1;
  const handle = `guest${String(Date.now()).slice(-6)}`;
  const displayName = `Guest ${guestNum}`;
  const user = userDefaults({
    id: nextId(store, 'users'),
    displayName,
    handle,
    email: `${handle}@guest.justbreath.life`,
    passwordHash: '',        // guests have no password
    roleInternal: 'guest',
    bio: '',
    accent: 'violet',
    themePreference: 'dark',
    languagePreference: 'en',
    emailVerified: false,
    status: 'active',
    privacy: { profileVisibility: 'private', allowDirectMessages: 'nobody', showEmail: false, showFollowers: false, showActivity: false, allowFriendRequests: false, allowInvites: false },
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.users.push(user);
  const sessionToken = createSessionForUser(req, res, store, user.id);
  saveStore(store);
  res.status(201).json({ user: mePayload(store, user).user, sessionToken, guest: true });
});

// ── Internal mail (platform inbox) ────────────────────────────────────────────
// mail = { id, fromUserId, toUserId, subject, body, createdAt, readAt }
function ensureMail(store) {
  if (!store.mail) store.mail = [];
  if (!store.seq.mail) store.seq.mail = 0;
}

app.get('/api/mail', requireAuth, (req, res) => {
  const store = loadStore();
  ensureMail(store);
  const folder = String(req.query.folder || 'inbox');
  let items;
  if (folder === 'inbox') {
    items = store.mail.filter(m => Number(m.toUserId) === Number(req.authUser.id))
      .sort((a, b) => sortDateDesc(a, b));
  } else {
    items = store.mail.filter(m => Number(m.fromUserId) === Number(req.authUser.id))
      .sort((a, b) => sortDateDesc(a, b));
  }
  const populated = items.map(m => {
    const from = store.users.find(u => Number(u.id) === Number(m.fromUserId));
    const to   = store.users.find(u => Number(u.id) === Number(m.toUserId));
    return { ...m, from: from ? { displayName: from.displayName, handle: from.handle, avatarUrl: from.avatarUrl, avatarText: avatarText(from.displayName) } : null,
                   to:   to   ? { displayName: to.displayName,   handle: to.handle,   avatarUrl: to.avatarUrl,   avatarText: avatarText(to.displayName) }   : null };
  });
  const unread = store.mail.filter(m => Number(m.toUserId) === Number(req.authUser.id) && !m.readAt).length;
  res.json({ items: populated, unread });
});

app.post('/api/mail', requireAuth, (req, res) => {
  const store = loadStore();
  ensureMail(store);
  const handle = sanitizeText(req.body?.to || '', 60);
  const to = store.users.find(u => u.handleCanonical === canonicalHandle(handle));
  if (!to) return res.status(404).json({ error: 'Recipient not found.' });
  if (Number(to.id) === Number(req.authUser.id)) return res.status(400).json({ error: "Can't mail yourself." });
  const subject = sanitizeText(req.body?.subject || '(no subject)', 120);
  const body    = sanitizeText(req.body?.body || '', 5000);
  if (!body.trim()) return res.status(400).json({ error: 'Body required.' });
  const mail = { id: ++store.seq.mail, fromUserId: req.authUser.id, toUserId: to.id, subject, body, createdAt: nowIso(), readAt: null };
  store.mail.push(mail);
  makeNotification(store, to.id, `New mail from @${req.authUser.handle}`, subject, '/mail');
  saveStore(store);
  sseSend(to.id, 'new_mail', { id: mail.id, fromHandle: req.authUser.handle, subject });
  res.status(201).json({ mail });
});

app.post('/api/mail/:id/read', requireAuth, (req, res) => {
  const store = loadStore();
  ensureMail(store);
  const mail = store.mail.find(m => Number(m.id) === Number(req.params.id) && Number(m.toUserId) === Number(req.authUser.id));
  if (!mail) return res.status(404).json({ error: 'Mail not found.' });
  mail.readAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

app.delete('/api/mail/:id', requireAuth, (req, res) => {
  const store = loadStore();
  ensureMail(store);
  store.mail = store.mail.filter(m => !(Number(m.id) === Number(req.params.id) &&
    (Number(m.toUserId) === Number(req.authUser.id) || Number(m.fromUserId) === Number(req.authUser.id))));
  saveStore(store);
  res.json({ ok: true });
});

app.get('/api/mail/unread', requireAuth, (req, res) => {
  const store = loadStore();
  ensureMail(store);
  const count = store.mail.filter(m => Number(m.toUserId) === Number(req.authUser.id) && !m.readAt).length;
  res.json({ count });
});

// ── GIF search (Giphy) ────────────────────────────────────────────────────────
app.get('/api/gif/search', requireAuth, async (req, res) => {
  const q = sanitizeText(req.query.q || '', 80);
  const limit = Math.min(24, Number(req.query.limit || 12));
  const key = process.env.GIPHY_API_KEY || '';
  if (!key) return res.json({ results: [], error: 'GIPHY_API_KEY not set in .env' });
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${encodeURIComponent(q)}&limit=${limit}&rating=g`;
    const r = await fetch(url);
    const data = await r.json();
    const results = (data.data || []).map(item => ({
      id: item.id,
      title: item.title || '',
      url: item.images?.original?.url || '',
      preview: item.images?.fixed_height_small?.url || item.images?.original?.url || '',
    })).filter(g => g.url);
    res.json({ results });
  } catch (err) {
    console.error('[gif search]', err.message);
    res.status(500).json({ error: 'GIF search failed.', results: [] });
  }
});

// ── SEO / SSR meta injection for SPA routes ──────────────────────────────────
//
// The SPA serves the same index.html for every client-side route, but crawlers,
// preview bots (Discord, Twitter, iMessage, Telegram) and Googlebot do not execute
// JS reliably. Without per-route <title>/og: tags they all see the same empty shell.
//
// To fix that we read index.html once at startup and, on every SPA request, splice
// in per-entity <title>, description, canonical, og: and JSON-LD before sending.
const APP_ORIGIN = (APP_URL || 'https://justbreath.life').replace(/\/+$/, '');
const DEFAULT_OG_IMAGE = APP_ORIGIN + '/logo.png';
let _indexHtmlCache = '';
function loadIndexHtml() {
  try { _indexHtmlCache = readFileSync(path.join(publicDir, 'index.html'), 'utf8'); }
  catch (err) { console.error('[indexHtml]', err.message); _indexHtmlCache = ''; }
  return _indexHtmlCache;
}
loadIndexHtml();

function escSeo(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function truncateSeo(str, n = 300) {
  const s = String(str || '').replace(/\s+/g, ' ').trim();
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
}

function renderSpaShell(req, meta) {
  if (!_indexHtmlCache) loadIndexHtml();
  let html = _indexHtmlCache;
  const pathOnly = (req.path || '/');
  const canonical = (meta && meta.canonical) || (APP_ORIGIN + pathOnly);
  const title = escSeo((meta && meta.title) || 'justbreath.life — profiles, creator sites, messaging and collaboration');
  const description = escSeo(truncateSeo((meta && meta.description) || 'An open creator platform: profile, site, workspaces, chat. Build in public, keep your data yours.'));
  const ogType = escSeo((meta && meta.ogType) || 'website');
  const ogImage = escSeo((meta && meta.ogImage) || DEFAULT_OG_IMAGE);
  const robots = (meta && meta.noindex) ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1';
  const jsonLd = meta && meta.jsonLd ? meta.jsonLd : null;

  // Swap <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  // Swap <meta name="description">
  html = html.replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${description}" />`);
  // Swap robots
  html = html.replace(/<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="${robots}" />`);
  // Canonical
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escSeo(canonical)}" />`);
  // OG title/description/url/type/image
  html = html
    .replace(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${escSeo(canonical)}" />`)
    .replace(/<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${ogType}" />`)
    .replace(/<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${ogImage}" />`);
  // Twitter
  html = html
    .replace(/<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${ogImage}" />`);

  // Inject per-entity JSON-LD just before </head> (keeps default graph intact)
  if (jsonLd) {
    const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;
    html = html.replace(/<\/head>/i, `${jsonLdTag}\n</head>`);
  }
  return html;
}

function sendSpaShell(req, res, meta) {
  res.type('html').send(renderSpaShell(req, meta));
}

// ── robots.txt ──────────────────────────────────────────────────────────────
app.get('/robots.txt', (_req, res) => {
  const body = [
    'User-agent: *',
    'Disallow: /api/',
    'Disallow: /admin',
    'Disallow: /settings',
    'Disallow: /mail',
    'Disallow: /verify',
    'Disallow: /join/',
    'Allow: /',
    '',
    '# AI training bots — block unless you explicitly want to allow them.',
    'User-agent: GPTBot', 'Disallow: /',
    'User-agent: ClaudeBot', 'Disallow: /',
    'User-agent: anthropic-ai', 'Disallow: /',
    'User-agent: CCBot', 'Disallow: /',
    'User-agent: PerplexityBot', 'Disallow: /',
    'User-agent: Google-Extended', 'Disallow: /',
    '',
    `Sitemap: ${APP_ORIGIN}/sitemap.xml`,
    `Host: ${APP_ORIGIN.replace(/^https?:\/\//, '')}`,
    ''
  ].join('\n');
  res.type('text/plain').set('Cache-Control', 'public, max-age=3600').send(body);
});

// ── sitemap.xml (public profiles, projects, approved public creator sites) ──
app.get('/sitemap.xml', (_req, res) => {
  const store = loadStore();
  const urls = [];
  const push = (loc, lastmod, priority, changefreq) => urls.push({ loc, lastmod, priority, changefreq });
  const today = new Date().toISOString().slice(0, 10);
  // Static routes
  push(`${APP_ORIGIN}/`,          today, '1.0', 'daily');
  push(`${APP_ORIGIN}/feed`,      today, '0.8', 'daily');
  push(`${APP_ORIGIN}/discover`,  today, '0.8', 'daily');
  push(`${APP_ORIGIN}/sites`,     today, '0.7', 'daily');
  push(`${APP_ORIGIN}/developers`, today, '0.6', 'weekly');
  push(`${APP_ORIGIN}/privacy`,   today, '0.5', 'monthly');
  push(`${APP_ORIGIN}/terms`,     today, '0.5', 'monthly');
  push(`${APP_ORIGIN}/contact`,   today, '0.4', 'monthly');
  push(`${APP_ORIGIN}/about`,     today, '0.4', 'monthly');
  // Public users
  for (const u of (store.users || [])) {
    if (!u || u.bannedAt) continue;
    if (u.visibility && u.visibility !== 'public') continue;
    const handle = u.handleCanonical || canonicalHandle(u.handle || '');
    if (!handle) continue;
    const lastmod = (u.updatedAt || u.createdAt || new Date().toISOString()).slice(0, 10);
    push(`${APP_ORIGIN}/@${handle}`, lastmod, '0.7', 'weekly');
  }
  // Public projects
  for (const p of (store.projects || [])) {
    if (!p || p.visibility !== 'public') continue;
    const slug = p.slug || p.id;
    const lastmod = (p.updatedAt || p.createdAt || new Date().toISOString()).slice(0, 10);
    push(`${APP_ORIGIN}/project/${encodeURIComponent(slug)}`, lastmod, '0.6', 'weekly');
  }
  // Public creator sites (approved)
  for (const s of (store.sites || [])) {
    if (!s || s.visibility !== 'public') continue;
    if (s.reviewStatus && s.reviewStatus !== 'approved') continue;
    const owner = store.users.find((u) => Number(u.id) === Number(s.userId));
    if (!owner || owner.bannedAt) continue;
    const handle = owner.handleCanonical || canonicalHandle(owner.handle || '');
    if (!handle || !s.slug) continue;
    const lastmod = (s.updatedAt || s.createdAt || new Date().toISOString()).slice(0, 10);
    push(`${APP_ORIGIN}/@${handle}/${encodeURIComponent(s.slug)}`, lastmod, '0.6', 'weekly');
  }
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u =>
      `  <url>\n    <loc>${escSeo(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    ),
    '</urlset>'
  ].join('\n');
  res.type('application/xml').set('Cache-Control', 'public, max-age=600').send(xml);
});

// ── Web app manifest ────────────────────────────────────────────────────────
app.get('/manifest.webmanifest', (_req, res) => {
  res.type('application/manifest+json').set('Cache-Control', 'public, max-age=86400').json({
    name: SITE_NAME, short_name: 'justbreath',
    description: 'Open creator platform — profiles, sites, workspaces and real-time chat.',
    start_url: '/', scope: '/', display: 'standalone',
    background_color: '#111111', theme_color: '#111111',
    orientation: 'any', lang: 'en', dir: 'ltr',
    categories: ['social', 'productivity', 'utilities'],
    icons: [
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  });
});

// ── SSR meta injection for entity routes ────────────────────────────────────
function siteMetaForUser(owner) {
  if (!owner) return null;
  const handle = owner.handleCanonical || canonicalHandle(owner.handle || '');
  const canonical = `${APP_ORIGIN}/@${handle}`;
  const name = sanitizeText(owner.displayName || owner.handle || handle, 80);
  const bio = sanitizeText(owner.bio || '', 260);
  return {
    title: `${name} (@${handle}) — justbreath`,
    description: bio || `${name}'s profile on justbreath.life — follow their projects, creator sites and posts.`,
    ogType: 'profile',
    ogImage: owner.avatarUrl ? (owner.avatarUrl.startsWith('http') ? owner.avatarUrl : APP_ORIGIN + owner.avatarUrl) : DEFAULT_OG_IMAGE,
    canonical,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: canonical,
      mainEntity: {
        '@type': 'Person',
        name,
        alternateName: `@${handle}`,
        description: bio,
        url: canonical,
        image: owner.avatarUrl ? (owner.avatarUrl.startsWith('http') ? owner.avatarUrl : APP_ORIGIN + owner.avatarUrl) : undefined
      }
    }
  };
}

function siteMetaForProject(project, author) {
  if (!project) return null;
  const slug = project.slug || project.id;
  const canonical = `${APP_ORIGIN}/project/${slug}`;
  const title = sanitizeText(project.title || 'Project', 120);
  const summary = sanitizeText(project.summary || project.description || '', 280);
  return {
    title: `${title} — justbreath`,
    description: summary || `${title} — project on justbreath.life`,
    ogType: 'article',
    ogImage: project.coverUrl ? (project.coverUrl.startsWith('http') ? project.coverUrl : APP_ORIGIN + project.coverUrl) : DEFAULT_OG_IMAGE,
    canonical,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      description: summary,
      url: canonical,
      dateCreated: project.createdAt,
      dateModified: project.updatedAt,
      author: author ? { '@type': 'Person', name: author.displayName || author.handle, url: `${APP_ORIGIN}/@${author.handleCanonical || canonicalHandle(author.handle || '')}` } : undefined
    }
  };
}

function siteMetaForSite(site, owner) {
  if (!site || !owner) return null;
  const handle = owner.handleCanonical || canonicalHandle(owner.handle || '');
  const canonical = `${APP_ORIGIN}/@${handle}/${site.slug}`;
  const title = sanitizeText(site.title || 'Site', 120);
  const summary = sanitizeText(site.summary || '', 280);
  return {
    title: `${title} — ${owner.displayName || handle} on justbreath`,
    description: summary || `${title} — a creator site by @${handle} on justbreath.life`,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonical,
    noindex: site.visibility === 'unlisted',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: title,
      url: canonical,
      description: summary,
      author: { '@type': 'Person', name: owner.displayName || handle, url: `${APP_ORIGIN}/@${handle}` }
    }
  };
}

// Static SPA routes (plain index.html shell with default meta)
const spaPaths = ['/','/feed','/messages','/settings','/sites','/discover','/profile','/admin','/mail','/verify','/developers','/privacy','/terms','/contact','/about'];
for (const spaPath of spaPaths) {
  app.get(spaPath, (req, res) => sendSpaShell(req, res, null));
}
app.get(/^\/developers\/[^/]+$/, (req, res) => sendSpaShell(req, res, null));
app.get(/^\/privacy\/[^/]+$/, (req, res) => sendSpaShell(req, res, null));
app.get(/^\/terms\/[^/]+$/, (req, res) => sendSpaShell(req, res, null));
app.get(/^\/messages\/([^/]+)$/, (req, res) => sendSpaShell(req, res, { noindex: true }));
app.get(/^\/join\/([^/]+)$/, (req, res) => sendSpaShell(req, res, { noindex: true }));

// Profile: /@handle
app.get(/^\/@([^/]+)$/, (req, res) => {
  const store = loadStore();
  const handleCanonicalValue = String(req.params[0] || '').toLowerCase();
  const owner = store.users.find((u) => u.handleCanonical === handleCanonicalValue);
  sendSpaShell(req, res, siteMetaForUser(owner));
});

// Project: /project/:slug
app.get(/^\/project\/([^/]+)$/, (req, res) => {
  const store = loadStore();
  const slug = String(req.params[0] || '');
  const project = store.projects.find((p) => String(p.slug) === slug || String(p.id) === slug);
  const author = project ? store.users.find((u) => Number(u.id) === Number(project.userId)) : null;
  sendSpaShell(req, res, siteMetaForProject(project, author));
});

if (DEMO_SEED_MODE === 'on') {
  ensureSeedData();
}

// ── Automatic backups every 30 minutes (rotating, keep last 48 = 24h) ────────
function autoBackup() {
  try {
    if (!existsSync(storePath)) return;
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `auto-${ts}.json`;
    const dest = path.join(backupsDir, fileName);
    copyFileSync(storePath, dest);
  } catch (err) {
    console.error('[autoBackup]', err.message);
  }
}
function rotateBackups() {
  try {
    const files = readdirSync(backupsDir)
      .filter(f => f.startsWith('auto-') && f.endsWith('.json'))
      .map(f => ({ f, path: path.join(backupsDir, f), mtime: statSync(path.join(backupsDir, f)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime);
    files.slice(48).forEach(item => { try { unlinkSync(item.path); } catch {} });
  } catch (err) {
    console.error('[rotateBackups]', err.message);
  }
}
setInterval(() => { autoBackup(); rotateBackups(); }, 30 * 60 * 1000);
// Initial backup 1 minute after startup
setTimeout(() => { autoBackup(); rotateBackups(); }, 60000);

// Graceful shutdown — write store before exit
function gracefulShutdown(signal) {
  console.log(`\n[shutdown] received ${signal}, taking final backup...`);
  try { autoBackup(); } catch {}
  process.exit(0);
}
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

app.listen(PORT, () => {
  console.log(`${SITE_NAME} listening on http://0.0.0.0:${PORT}`);
  if (!process.env.SMTP_HOST) console.log('[smtp] SMTP_HOST not set — verification emails will print to console only');
  if (process.env.ADMIN_TOKEN === 'generate_a_random_32_char_secret_here' || !process.env.ADMIN_TOKEN) console.log('[security] ⚠️  ADMIN_TOKEN is using default value — change it in .env before going live');
  if (process.env.OWNER_PASSWORD === '12345678') console.log('[security] ⚠️  OWNER_PASSWORD is using default value — change it in .env before going live');
});
