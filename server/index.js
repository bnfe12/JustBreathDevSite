import compression from 'compression';
import cookie from 'cookie';
import bcrypt from 'bcryptjs';
import AdmZip from 'adm-zip';
import express from 'express';
import sharp from 'sharp';
import { spawnSync } from 'node:child_process';
import net from 'node:net';
import tls from 'node:tls';
import { createHash, randomBytes } from 'node:crypto';
import { createGunzip } from 'node:zlib';
import { mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import {
  appendFileSync,
  chmodSync,
  copyFileSync,
  createWriteStream,
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
const RAW_UPLOADED_SITES_ORIGIN = String(process.env.UPLOADED_SITES_ORIGIN || '');
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
const SWITCH_DEVICE_COOKIE = 'jb_device';
const SITE_PREVIEW_COOKIE = 'jb_site_preview';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const SWITCH_GRANT_TTL_MS = 1000 * 60 * 60 * 24 * 90;
const SITE_PREVIEW_TTL_MS = 1000 * 60 * 10;
const GOOGLE_OAUTH_TTL_MS = 1000 * 60 * 10;
const DISCORD_OAUTH_TTL_MS = 1000 * 60 * 10;
const SITE_UPLOAD_LIMIT_BYTES = 1 * 1024 * 1024;
const SITE_ZIP_LIMIT_BYTES = 5 * 1024 * 1024;
const OPERATOR_SITE_ZIP_LIMIT_BYTES = 512 * 1024 * 1024;
const SITE_ARCHIVE_EXPANDED_LIMIT_BYTES = 30 * 1024 * 1024;
const OPERATOR_SITE_ARCHIVE_EXPANDED_LIMIT_BYTES = 1536 * 1024 * 1024;
const MAX_ARCHIVE_FILE_COUNT = 4000;
const IMAGE_UPLOAD_LIMIT_BYTES = 900 * 1024;
const CHAT_MEDIA_UPLOAD_LIMIT_BYTES = 24 * 1024 * 1024;
const DISCORD_SUPPORT_URL = String(process.env.DISCORD_SUPPORT_URL || '');
const TELEGRAM_BOT_TOKEN = String(process.env.TELEGRAM_BOT_TOKEN || '');
const TELEGRAM_BOT_USERNAME = String(process.env.TELEGRAM_BOT_USERNAME || '');
const NODE_ENV = String(process.env.NODE_ENV || 'development').toLowerCase();
const ALLOW_DEV_EMAIL_LOG = String(process.env.ALLOW_DEV_EMAIL_LOG || '').toLowerCase() === '1';

const OWNER_HANDLE = String(process.env.OWNER_HANDLE || 'Tcheler');
const OWNER_DISPLAY_NAME = String(process.env.OWNER_DISPLAY_NAME || 'Tcheler');
const OWNER_EMAIL = String(process.env.OWNER_EMAIL || 'andrexarlay@gmail.com');
const OWNER_PASSWORD = String(process.env.OWNER_PASSWORD || '');
const BRAND_HANDLE = String(process.env.BRAND_HANDLE || 'justbreath');
const BRAND_DISPLAY_NAME = String(process.env.BRAND_DISPLAY_NAME || 'justbreath');
const BRAND_EMAIL = String(process.env.BRAND_EMAIL || 'justbreath.business.mail@gmail.com');
const BRAND_GITHUB_URL = String(process.env.BRAND_GITHUB_URL || 'https://github.com/bnfe12');
const SITE_CREATION_REPO_URL = String(process.env.SITE_CREATION_REPO_URL || 'https://github.com/bnfe12/JustBreathDevSite');
const SITE_CREATION_GUIDE_URL = `${SITE_CREATION_REPO_URL}/blob/main/SITE_CREATION_GUIDE.md`;
const SITE_CREATION_EXAMPLES_URL = `${SITE_CREATION_REPO_URL}/blob/main/SITE_CREATION_EXAMPLES_RU.md`;
const BRAND_PASSWORD = String(process.env.BRAND_PASSWORD || '');
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
function hasInternalRole(user, roles = []) {
  return ensureArray(roles).includes(String(user?.roleInternal || ''));
}
function isOwnerUser(user) {
  return hasInternalRole(user, ['owner']);
}
function isOperatorUser(user) {
  return hasInternalRole(user, ['owner', 'admin']);
}
function siteUploadByteLimit(user) {
  return isOperatorUser(user) ? Infinity : SITE_UPLOAD_LIMIT_BYTES;
}
function siteArchiveByteLimit(user) {
  return isOperatorUser(user) ? OPERATOR_SITE_ZIP_LIMIT_BYTES : SITE_ZIP_LIMIT_BYTES;
}
function siteArchiveExpandedByteLimit(user) {
  return isOperatorUser(user) ? OPERATOR_SITE_ARCHIVE_EXPANDED_LIMIT_BYTES : SITE_ARCHIVE_EXPANDED_LIMIT_BYTES;
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
function normalizeOrigin(raw = '') {
  try {
    const url = new URL(String(raw || '').trim());
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    return url.origin;
  } catch {
    return '';
  }
}
function originHost(origin = '') {
  try {
    return new URL(origin).host.toLowerCase();
  } catch {
    return '';
  }
}
function isLoopbackHost(raw = '') {
  const host = String(raw || '').toLowerCase().split(':')[0].trim();
  return host === 'localhost' || host.endsWith('.localhost') || host === '127.0.0.1' || host === '[::1]';
}
function derivedUploadedSitesOrigin(appOrigin = '') {
  const normalized = normalizeOrigin(appOrigin);
  if (!normalized) return '';
  try {
    const url = new URL(normalized);
    if (!isLoopbackHost(url.host)) return '';
    if (url.hostname === '127.0.0.1' || url.hostname === '[::1]') url.hostname = 'sites.localhost';
    else if (!url.hostname.startsWith('sites.')) url.hostname = `sites.${url.hostname}`;
    return url.origin;
  } catch {
    return '';
  }
}
function resolveUploadedSitesOrigin(appOrigin = '', raw = '') {
  const configured = normalizeOrigin(raw);
  if (configured && originHost(configured) !== originHost(appOrigin)) return configured;
  return derivedUploadedSitesOrigin(appOrigin);
}
const APP_ORIGIN = normalizeOrigin(APP_URL) || `http://localhost:${PORT}`;
const UPLOADED_SITES_ORIGIN = resolveUploadedSitesOrigin(APP_ORIGIN, RAW_UPLOADED_SITES_ORIGIN);
const UPLOADED_SITES_ISOLATION_ENABLED = Boolean(UPLOADED_SITES_ORIGIN && originHost(UPLOADED_SITES_ORIGIN) !== originHost(APP_ORIGIN));
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
function sanitizeStickerKind(value) {
  return value === 'animated' ? 'animated' : 'static';
}
function sanitizeStickerSourceType(value, mimeType = '') {
  const raw = String(value || '').trim().toLowerCase();
  if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webm'].includes(raw)) return raw === 'jpeg' ? 'jpg' : raw;
  if (mimeType.includes('svg')) return 'svg';
  if (mimeType.includes('gif')) return 'gif';
  if (mimeType.includes('webm')) return 'webm';
  if (mimeType.includes('jpeg')) return 'jpg';
  return 'png';
}
function sanitizeStickerDuration(value) {
  return Math.max(0, Math.min(1000, Number(value || 0)));
}
function sanitizeAttachment(value = null) {
  if (!value || typeof value !== 'object') return null;
  return {
    name: sanitizeText(value.name || '', 90),
    url: sanitizeText(value.url || '', 600),
    type: sanitizeText(value.type || '', 30),
    width: Number(value.width || 0),
    height: Number(value.height || 0),
    duration: Number(value.duration || 0),
    voice: Boolean(value.voice)
  };
}
function sanitizeAttachmentList(items = []) {
  return ensureArray(items).map((item) => sanitizeAttachment(item)).filter((item) => item?.url);
}
function stickerMediaUrl(sticker) {
  return sanitizeText(sticker?.fileUrl || sticker?.dataUrl || '', 2000000);
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
function sanitizeHiddenMessageMap(raw) {
  const out = {};
  const source = ensureObject(raw);
  for (const [key, value] of Object.entries(source)) {
    const slug = slugify(key);
    if (!slug) continue;
    const ids = Array.from(new Set(ensureArray(value).map((item) => Number(item)).filter((item) => Number.isInteger(item) && item > 0))).slice(-4000);
    if (ids.length) out[slug] = ids;
  }
  return out;
}
function hiddenMessageIdsForRoom(user, roomSlug = '') {
  const slug = slugify(roomSlug);
  if (!slug) return [];
  const map = sanitizeHiddenMessageMap(user?.settings?.hiddenMessageIdsByRoom);
  return Array.isArray(map[slug]) ? map[slug] : [];
}
function messageHiddenForUser(user, roomSlug = '', messageId = 0) {
  return hiddenMessageIdsForRoom(user, roomSlug).includes(Number(messageId));
}
function hideMessagesForUser(user, roomSlug = '', messageIds = []) {
  const slug = slugify(roomSlug);
  if (!slug || !user) return [];
  if (!user.settings || typeof user.settings !== 'object') user.settings = {};
  user.settings.hiddenMessageIdsByRoom = sanitizeHiddenMessageMap(user.settings.hiddenMessageIdsByRoom);
  const existing = Array.isArray(user.settings.hiddenMessageIdsByRoom[slug]) ? user.settings.hiddenMessageIdsByRoom[slug] : [];
  const next = Array.from(new Set(existing.concat(ensureArray(messageIds).map((item) => Number(item)).filter((item) => Number.isInteger(item) && item > 0)))).slice(-4000);
  if (next.length) user.settings.hiddenMessageIdsByRoom[slug] = next;
  return next;
}
function visibleRoomMessagesForUser(store, roomId, user = null, roomSlug = '') {
  return store.messages.filter((item) => Number(item.roomId) === Number(roomId) && !messageHiddenForUser(user, roomSlug, item.id));
}
function canDeleteMessageForEveryone(room, authUserId, message) {
  const role = room.memberRoles?.[String(authUserId)] || 'member';
  return Number(message.userId) === Number(authUserId) || ['owner', 'admin', 'moderator'].includes(role);
}
function softDeleteMessage(message) {
  if (!message || message.deletedAt) return false;
  message.deletedAt = nowIso();
  message.body = '';
  message.attachment = null;
  message.attachments = [];
  message.ciphertext = '';
  message.iv = '';
  message.stickerId = null;
  message.confirmedAt = null;
  message.confirmedByUserId = null;
  message.updatedAt = nowIso();
  return true;
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
      readReceipts: 0, typingEvents: 0, reports: 0, deletionJobs: 0
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
    reports: [],         // { id, reporterUserId, targetType, targetId, targetLabel, targetUrl, targetOwnerUserId, reason, details, status, resolutionNote, createdAt, updatedAt, resolvedAt, resolvedByUserId }
    deletionJobs: [],    // { id, targetType, targetId, targetLabel, targetUrl, targetOwnerUserId, createdAt, updatedAt, deleteAfter, scheduledByUserId, note }
    accountSwitchGrants: [], // { id, deviceHash, userId, createdAt, updatedAt, lastUsedAt, expiresAt }
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
      chatThemesByRoom: sanitizeChatThemeMap(settings.chatThemesByRoom),
      hiddenMessageIdsByRoom: sanitizeHiddenMessageMap(settings.hiddenMessageIdsByRoom)
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
    height: Number(message.attachmentHeight || 0),
    duration: Number(message.attachmentDuration || 0),
    voice: Boolean(message.attachmentVoice)
  } : null);
  return {
    id: Number(message.id || 0),
    roomId: Number(message.roomId || 0),
    userId: Number(message.userId || 0),
    body: sanitizeText(message.body || '', 4000),
    attachment: sanitizeAttachment(attachment),
    attachments: sanitizeAttachmentList(message.attachments),
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

function sanitizeSiteImportReport(raw = {}) {
  const source = ensureObject(raw);
  const optimizedAssets = ensureArray(source.optimizedAssets).map((item) => ({
    path: safeSiteBundlePath(item?.path || ''),
    mimeType: sanitizeText(item?.mimeType || '', 80),
    beforeBytes: Math.max(0, Number(item?.beforeBytes || 0)),
    afterBytes: Math.max(0, Number(item?.afterBytes || 0)),
    bytesSaved: Math.max(0, Number(item?.bytesSaved || 0))
  })).filter((item) => item.path && item.beforeBytes > 0 && item.afterBytes > 0).slice(0, 200);
  const securityWarnings = ensureArray(source.securityWarnings).map((item) => ({
    path: safeSiteBundlePath(item?.path || ''),
    code: sanitizeText(item?.code || '', 40),
    message: sanitizeText(item?.message || '', 240),
    severity: ['warning', 'blocked'].includes(String(item?.severity || 'warning')) ? String(item?.severity || 'warning') : 'warning'
  })).filter((item) => item.path && item.message).slice(0, 80);
  const antivirusFindings = ensureArray(source.antivirus?.findings).map((item) => ({
    path: safeSiteBundlePath(item?.path || ''),
    signature: sanitizeText(item?.signature || '', 180)
  })).filter((item) => item.path || item.signature).slice(0, 20);
  return {
    scannedImageCount: Math.max(0, Number(source.scannedImageCount || optimizedAssets.length || 0)),
    optimizedBytesSaved: Math.max(0, Number(source.optimizedBytesSaved || optimizedAssets.reduce((sum, item) => sum + item.bytesSaved, 0))),
    optimizedAssets,
    scannedFileCount: Math.max(0, Number(source.scannedFileCount || 0)),
    securityWarnings,
    antivirus: {
      engine: sanitizeText(source.antivirus?.engine || '', 40),
      scanned: Boolean(source.antivirus?.scanned),
      infected: Boolean(source.antivirus?.infected),
      findings: antivirusFindings
    }
  };
}

function siteDefaults(site) {
  const mode = String(site.mode || 'template');
  const uploadMode = mode === 'upload' ? (site.uploadMode === 'archive' ? 'archive' : 'html') : '';
  const templateConfig = ensureObject(site.templateConfig);
  if (mode === 'upload' && !Object.prototype.hasOwnProperty.call(templateConfig, 'polishMode')) {
    templateConfig.polishMode = 'none';
  }
  return {
    id: Number(site.id || 0),
    userId: Number(site.userId || 0),
    projectId: site.projectId ? Number(site.projectId) : null,
    slug: slugify(site.slug || site.title),
    title: sanitizeText(site.title || 'Untitled site', 100),
    summary: sanitizeText(site.summary || '', 240),
    visibility: String(site.visibility || 'public'),
    mode,
    uploadMode,
    htmlPath: sanitizeText(site.htmlPath || '', 200),
    bundleRoot: sanitizeText(site.bundleRoot || '', 200),
    importReport: sanitizeSiteImportReport(site.importReport || {}),
    templateConfig,
    reviewStatus: ['draft', 'pending', 'approved', 'rejected'].includes(site.reviewStatus) ? site.reviewStatus : 'draft',
    reviewNote: sanitizeText(site.reviewNote || '', 500),
    createdAt: site.createdAt || nowIso(),
    updatedAt: site.updatedAt || site.createdAt || nowIso()
  };
}

function siteIsApproved(site) {
  return String(site?.reviewStatus || 'draft') === 'approved';
}

function siteNeedsLaunchReview(site) {
  return Boolean(site && String(site.visibility || 'private') !== 'private');
}

function siteAppearsInPublicDirectory(site) {
  return Boolean(site && String(site.visibility || '') === 'public' && siteIsApproved(site));
}

function siteIsExternallyReachable(site) {
  return Boolean(site && ['public', 'unlisted'].includes(String(site.visibility || '')) && siteIsApproved(site));
}

function stickerPackDefaults(pack) {
  return {
    id: Number(pack.id || 0),
    userId: Number(pack.userId || 0),
    title: sanitizeText(pack.title || 'Pack', 80),
    description: sanitizeText(pack.description || '', 220),
    slug: slugify(pack.slug || pack.title),
    coverStickerId: pack.coverStickerId ? Number(pack.coverStickerId) : null,
    createdAt: pack.createdAt || nowIso(),
    updatedAt: pack.updatedAt || pack.createdAt || nowIso()
  };
}

function stickerDefaults(sticker) {
  const mimeType = sanitizeText(sticker.mimeType || 'image/svg+xml', 80);
  return {
    id: Number(sticker.id || 0),
    packId: Number(sticker.packId || 0),
    userId: Number(sticker.userId || 0),
    name: sanitizeText(sticker.name || 'Sticker', 60),
    mimeType,
    dataUrl: sanitizeText(sticker.dataUrl || '', IMAGE_UPLOAD_LIMIT_BYTES * 2),
    fileUrl: sanitizeText(sticker.fileUrl || '', 600),
    previewUrl: sanitizeText(sticker.previewUrl || sticker.fileUrl || sticker.dataUrl || '', 600),
    kind: sanitizeStickerKind(sticker.kind || (mimeType.includes('gif') || mimeType.includes('webm') ? 'animated' : 'static')),
    sourceType: sanitizeStickerSourceType(sticker.sourceType, mimeType),
    durationMs: sanitizeStickerDuration(sticker.durationMs),
    width: Math.max(0, Number(sticker.width || 0)),
    height: Math.max(0, Number(sticker.height || 0)),
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
  merged.reports = ensureArray(raw.reports).map((item) => ({
    id: Number(item.id || 0),
    reporterUserId: Number(item.reporterUserId || 0),
    targetType: ['user', 'post', 'site', 'project', 'message', 'other'].includes(item.targetType) ? item.targetType : 'other',
    targetId: item.targetId === null || item.targetId === undefined || item.targetId === '' ? null : Number(item.targetId || 0),
    targetLabel: sanitizeText(item.targetLabel || '', 180),
    targetUrl: sanitizeText(item.targetUrl || '', 320),
    targetOwnerUserId: item.targetOwnerUserId === null || item.targetOwnerUserId === undefined || item.targetOwnerUserId === '' ? null : Number(item.targetOwnerUserId || 0),
    reason: sanitizeText(item.reason || '', 60),
    details: sanitizeText(item.details || '', 1600),
    status: ['open', 'resolved', 'dismissed'].includes(item.status) ? item.status : 'open',
    resolutionNote: sanitizeText(item.resolutionNote || '', 600),
    createdAt: item.createdAt || nowIso(),
    updatedAt: item.updatedAt || item.createdAt || nowIso(),
    resolvedAt: item.resolvedAt || null,
    resolvedByUserId: item.resolvedByUserId ? Number(item.resolvedByUserId) : null
  })).filter((item) => item.reporterUserId && item.reason);
  merged.deletionJobs = ensureArray(raw.deletionJobs).map((item) => ({
    id: Number(item.id || 0),
    targetType: ['user', 'post', 'site', 'project', 'message'].includes(item.targetType) ? item.targetType : 'post',
    targetId: Number(item.targetId || 0),
    targetLabel: sanitizeText(item.targetLabel || '', 180),
    targetUrl: sanitizeText(item.targetUrl || '', 320),
    targetOwnerUserId: item.targetOwnerUserId === null || item.targetOwnerUserId === undefined || item.targetOwnerUserId === '' ? null : Number(item.targetOwnerUserId || 0),
    createdAt: item.createdAt || nowIso(),
    updatedAt: item.updatedAt || item.createdAt || nowIso(),
    deleteAfter: item.deleteAfter || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    scheduledByUserId: Number(item.scheduledByUserId || 0),
    note: sanitizeText(item.note || '', 300)
  })).filter((item) => item.id && item.targetId && item.deleteAfter);
  merged.accountSwitchGrants = ensureArray(raw.accountSwitchGrants).map((item) => ({
    id: sanitizeText(item.id || '', 120),
    deviceHash: sanitizeText(item.deviceHash || '', 120),
    userId: Number(item.userId || 0),
    createdAt: item.createdAt || nowIso(),
    updatedAt: item.updatedAt || item.createdAt || nowIso(),
    lastUsedAt: item.lastUsedAt || item.updatedAt || item.createdAt || nowIso(),
    expiresAt: item.expiresAt || futureIso(SWITCH_GRANT_TTL_MS)
  })).filter((item) => item.id && item.deviceHash && item.userId);
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
    verificationRequests: merged.verificationRequests,
    reports: merged.reports,
    deletionJobs: merged.deletionJobs
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
      sticker.sourceType = 'svg';
      sticker.kind = 'static';
    }
    if (!sticker.previewUrl) sticker.previewUrl = sticker.fileUrl || sticker.dataUrl || '';
    if (!sticker.sourceType) sticker.sourceType = sanitizeStickerSourceType('', sticker.mimeType);
    if (!sticker.kind) sticker.kind = sanitizeStickerKind(sticker.durationMs > 0 ? 'animated' : 'static');
  }
  return merged;
}

function loadStore() {
  if (!existsSync(storePath)) return emptyStore();
  try {
    const store = migrateStore(JSON.parse(readFileSync(storePath, 'utf8')));
    if (runDeletionMaintenance(store)) saveStore(store);
    return store;
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

function archiveLimitLabel(bytes = 0) {
  return `${Math.round(Number(bytes || 0) / 1024 / 1024)} MB`;
}

function archiveEntryDepth(relativePath = '') {
  const normalized = safeSiteBundlePath(relativePath);
  if (!normalized) return Number.POSITIVE_INFINITY;
  return normalized.split('/').length;
}

function preferredArchiveIndexPath(entries = []) {
  const candidates = entries
    .map((entry) => safeSiteBundlePath(entry))
    .filter((entry) => entry && path.posix.basename(entry).toLowerCase() === 'index.html');
  if (!candidates.length) return '';
  return candidates.sort((a, b) => {
    const aIsRoot = a.toLowerCase() === 'index.html' ? 0 : 1;
    const bIsRoot = b.toLowerCase() === 'index.html' ? 0 : 1;
    if (aIsRoot !== bIsRoot) return aIsRoot - bIsRoot;
    const depthDiff = archiveEntryDepth(a) - archiveEntryDepth(b);
    if (depthDiff !== 0) return depthDiff;
    return a.localeCompare(b);
  })[0];
}

function archiveRootPrefix(indexPath = '') {
  return indexPath ? indexPath.slice(0, -'index.html'.length) : '';
}

function bundleFilesFromArchive(files = [], indexPath = '') {
  const rootPrefix = archiveRootPrefix(indexPath);
  return files
    .map((file) => {
      const normalized = safeSiteBundlePath(file?.path);
      if (!normalized) return null;
      if (rootPrefix && !normalized.startsWith(rootPrefix)) return null;
      const relativePath = safeSiteBundlePath(rootPrefix ? normalized.slice(rootPrefix.length) : normalized);
      if (!relativePath) return null;
      return { path: relativePath, content: file.content };
    })
    .filter(Boolean);
}

const IMPORT_OPTIMIZABLE_RASTER_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const IMPORT_IMAGE_EXTENSIONS = new Set([...IMPORT_OPTIMIZABLE_RASTER_EXTENSIONS, '.svg']);
const UPLOADED_SITE_TEXT_TRANSFORM_EXTENSIONS = new Set(['.html', '.htm', '.css', '.js', '.mjs', '.cjs']);
const SITE_ARCHIVE_TEXT_SCAN_EXTENSIONS = new Set(['.html', '.htm', '.css', '.js', '.mjs', '.cjs', '.json', '.txt', '.md', '.svg', '.xml', '.webmanifest']);
const SITE_ARCHIVE_SCAN_TEXT_LIMIT_BYTES = 256 * 1024;
const SITE_ARCHIVE_BLOCKED_EXTENSIONS = new Map([
  ['.php', 'PHP files are not allowed in hosted static site archives.'],
  ['.phtml', 'PHP files are not allowed in hosted static site archives.'],
  ['.phar', 'PHP archives are not allowed in hosted static site archives.'],
  ['.cgi', 'Server-side CGI files are not allowed in hosted static site archives.'],
  ['.pl', 'Perl CGI files are not allowed in hosted static site archives.'],
  ['.py', 'Python server files are not allowed in hosted static site archives.'],
  ['.rb', 'Ruby server files are not allowed in hosted static site archives.'],
  ['.jsp', 'Server-rendered JSP files are not allowed in hosted static site archives.'],
  ['.jspx', 'Server-rendered JSP files are not allowed in hosted static site archives.'],
  ['.asp', 'Server-rendered ASP files are not allowed in hosted static site archives.'],
  ['.aspx', 'Server-rendered ASP files are not allowed in hosted static site archives.'],
  ['.exe', 'Executable binaries are not allowed in uploaded archives.'],
  ['.dll', 'Executable binaries are not allowed in uploaded archives.'],
  ['.so', 'Executable binaries are not allowed in uploaded archives.'],
  ['.dylib', 'Executable binaries are not allowed in uploaded archives.'],
  ['.msi', 'Installer binaries are not allowed in uploaded archives.'],
  ['.apk', 'Application binaries are not allowed in uploaded archives.'],
  ['.jar', 'Application binaries are not allowed in uploaded archives.'],
  ['.war', 'Application binaries are not allowed in uploaded archives.'],
  ['.bat', 'Shell or command scripts are not allowed in uploaded archives.'],
  ['.cmd', 'Shell or command scripts are not allowed in uploaded archives.'],
  ['.ps1', 'Shell or command scripts are not allowed in uploaded archives.'],
  ['.sh', 'Shell or command scripts are not allowed in uploaded archives.'],
  ['.bash', 'Shell or command scripts are not allowed in uploaded archives.'],
  ['.zsh', 'Shell or command scripts are not allowed in uploaded archives.']
]);
const SITE_ARCHIVE_BLOCKED_BASENAMES = new Map([
  ['.env', 'Environment files are not allowed in uploaded archives.'],
  ['.env.local', 'Environment files are not allowed in uploaded archives.'],
  ['.htaccess', 'Server configuration files are not allowed in uploaded archives.'],
  ['web.config', 'Server configuration files are not allowed in uploaded archives.'],
  ['authorized_keys', 'SSH key files are not allowed in uploaded archives.'],
  ['id_rsa', 'Private key files are not allowed in uploaded archives.'],
  ['id_ed25519', 'Private key files are not allowed in uploaded archives.']
]);
const SITE_ARCHIVE_BLOCKED_PATH_SEGMENTS = new Map([
  ['.git', 'Git metadata is not allowed in uploaded archives.'],
  ['.svn', 'VCS metadata is not allowed in uploaded archives.'],
  ['.ssh', 'SSH files are not allowed in uploaded archives.'],
  ['.aws', 'Cloud credential directories are not allowed in uploaded archives.']
]);
const SITE_ARCHIVE_WARNING_PATTERNS = [
  {
    code: 'obfuscated-js',
    message: 'Potentially obfuscated JavaScript was detected. Review this archive carefully before approval.',
    extensions: new Set(['.html', '.htm', '.js', '.mjs', '.cjs']),
    regex: /\b(?:eval\s*\(\s*(?:atob|unescape)|new\s+Function\s*\(|document\.write\s*\(\s*unescape|String\.fromCharCode\s*\()/i
  },
  {
    code: 'credential-form',
    message: 'Password-style form fields were detected. Review this archive carefully before approval to rule out credential capture.',
    extensions: new Set(['.html', '.htm']),
    regex: /<input[^>]+type=["']password["']/i
  }
];

function importedImageMimeType(ext = '') {
  return {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'
  }[String(ext || '').toLowerCase()] || 'application/octet-stream';
}

function minifyImportedSvgBuffer(buffer) {
  const source = Buffer.isBuffer(buffer) ? buffer.toString('utf8') : String(buffer || '');
  const next = source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return Buffer.from(next, 'utf8');
}

async function optimizeImportedSiteFile(relativePath = '', rawContent = Buffer.alloc(0)) {
  const ext = path.posix.extname(String(relativePath || '').toLowerCase());
  const input = Buffer.isBuffer(rawContent) ? rawContent : Buffer.from(rawContent);
  if (!IMPORT_IMAGE_EXTENSIONS.has(ext) || !input.length) {
    return { content: input, optimizedAsset: null, scannedImage: false };
  }
  if (ext === '.svg') {
    const output = minifyImportedSvgBuffer(input);
    if (output.length > 0 && output.length + 32 < input.length) {
      return {
        content: output,
        scannedImage: true,
        optimizedAsset: {
          path: relativePath,
          mimeType: importedImageMimeType(ext),
          beforeBytes: input.length,
          afterBytes: output.length,
          bytesSaved: input.length - output.length
        }
      };
    }
    return { content: input, optimizedAsset: null, scannedImage: true };
  }
  if (!IMPORT_OPTIMIZABLE_RASTER_EXTENSIONS.has(ext)) {
    return { content: input, optimizedAsset: null, scannedImage: true };
  }
  try {
    let output = null;
    if (ext === '.png') {
      output = await sharp(input, { animated: false, failOn: 'none' })
        .png({ compressionLevel: 9, effort: 10, palette: true, quality: 92 })
        .toBuffer();
    } else if (ext === '.webp') {
      output = await sharp(input, { animated: false, failOn: 'none' })
        .webp({ quality: 84, effort: 6 })
        .toBuffer();
    } else {
      output = await sharp(input, { animated: false, failOn: 'none' })
        .jpeg({ quality: 84, mozjpeg: true })
        .toBuffer();
    }
    if (output?.length && output.length + 512 < input.length) {
      return {
        content: output,
        scannedImage: true,
        optimizedAsset: {
          path: relativePath,
          mimeType: importedImageMimeType(ext),
          beforeBytes: input.length,
          afterBytes: output.length,
          bytesSaved: input.length - output.length
        }
      };
    }
  } catch {}
  return { content: input, optimizedAsset: null, scannedImage: true };
}

async function optimizeImportedSiteFiles(files = []) {
  const nextFiles = [];
  const optimizedAssets = [];
  let scannedImageCount = 0;
  for (const file of files) {
    const relativePath = safeSiteBundlePath(file?.path || '');
    if (!relativePath) continue;
    const result = await optimizeImportedSiteFile(relativePath, file?.content);
    nextFiles.push({ path: relativePath, content: result.content });
    if (result.scannedImage) scannedImageCount += 1;
    if (result.optimizedAsset) optimizedAssets.push(result.optimizedAsset);
  }
  const optimizedBytesSaved = optimizedAssets.reduce((sum, item) => sum + item.bytesSaved, 0);
  return {
    files: nextFiles,
    importReport: sanitizeSiteImportReport({
      scannedImageCount,
      optimizedBytesSaved,
      optimizedAssets
    })
  };
}

function pushArchiveScanEntry(list, seen, entry) {
  const item = {
    path: safeSiteBundlePath(entry?.path || ''),
    code: sanitizeText(entry?.code || '', 40),
    message: sanitizeText(entry?.message || '', 240),
    severity: ['warning', 'blocked'].includes(String(entry?.severity || 'warning')) ? String(entry?.severity || 'warning') : 'warning'
  };
  if (!item.path || !item.code || !item.message) return;
  const key = `${item.severity}:${item.code}:${item.path}`;
  if (seen.has(key)) return;
  seen.add(key);
  list.push(item);
}

function scanImportedSiteFiles(files = []) {
  const blocked = [];
  const securityWarnings = [];
  const blockedSeen = new Set();
  const warningSeen = new Set();
  let scannedFileCount = 0;
  for (const file of files) {
    const relativePath = safeSiteBundlePath(file?.path || '');
    if (!relativePath) continue;
    scannedFileCount += 1;
    const lowerPath = relativePath.toLowerCase();
    const baseName = path.posix.basename(lowerPath);
    const ext = path.posix.extname(lowerPath);
    const segments = lowerPath.split('/');
    for (const [segment, message] of SITE_ARCHIVE_BLOCKED_PATH_SEGMENTS.entries()) {
      if (segments.includes(segment)) {
        pushArchiveScanEntry(blocked, blockedSeen, { path: relativePath, code: 'blocked-path', message, severity: 'blocked' });
      }
    }
    if (SITE_ARCHIVE_BLOCKED_BASENAMES.has(baseName)) {
      pushArchiveScanEntry(blocked, blockedSeen, { path: relativePath, code: 'blocked-name', message: SITE_ARCHIVE_BLOCKED_BASENAMES.get(baseName), severity: 'blocked' });
    }
    if (SITE_ARCHIVE_BLOCKED_EXTENSIONS.has(ext)) {
      pushArchiveScanEntry(blocked, blockedSeen, { path: relativePath, code: 'blocked-ext', message: SITE_ARCHIVE_BLOCKED_EXTENSIONS.get(ext), severity: 'blocked' });
    }
    if (!SITE_ARCHIVE_TEXT_SCAN_EXTENSIONS.has(ext)) continue;
    const sourceText = Buffer.isBuffer(file?.content)
      ? file.content.subarray(0, SITE_ARCHIVE_SCAN_TEXT_LIMIT_BYTES).toString('utf8')
      : String(file?.content || '').slice(0, SITE_ARCHIVE_SCAN_TEXT_LIMIT_BYTES);
    if (!sourceText) continue;
    if (/<\?(?:php|=)/i.test(sourceText)) {
      pushArchiveScanEntry(blocked, blockedSeen, {
        path: relativePath,
        code: 'php-inline',
        message: 'Inline PHP code is not allowed in hosted static site archives.',
        severity: 'blocked'
      });
    }
    for (const pattern of SITE_ARCHIVE_WARNING_PATTERNS) {
      if (pattern.extensions && !pattern.extensions.has(ext)) continue;
      if (!pattern.regex.test(sourceText)) continue;
      pushArchiveScanEntry(securityWarnings, warningSeen, {
        path: relativePath,
        code: pattern.code,
        message: pattern.message,
        severity: 'warning'
      });
    }
  }
  return { scannedFileCount, blocked, securityWarnings };
}

function uploadedSiteBasePath(owner, site) {
  const ownerHandle = owner?.handleCanonical || canonicalHandle(owner?.handle || '');
  return ownerHandle && site?.slug ? `/@${ownerHandle}/${site.slug}/` : '/';
}

function uploadedSiteAssetPath(owner, site, raw = '') {
  const relativePath = safeSiteBundlePath(raw);
  if (!relativePath) return uploadedSiteBasePath(owner, site);
  return `${uploadedSiteBasePath(owner, site)}${relativePath}`;
}

function uploadedSitePublicUrl(owner, site, raw = '') {
  const assetPath = safeSiteBundlePath(raw)
    ? uploadedSiteAssetPath(owner, site, raw)
    : uploadedSiteBasePath(owner, site);
  return UPLOADED_SITES_ORIGIN ? `${UPLOADED_SITES_ORIGIN}${assetPath}` : assetPath;
}

function sitePublicUrl(owner, site) {
  if (!owner || !site) return '';
  const ownerHandle = owner.handleCanonical || canonicalHandle(owner.handle || '');
  if (!ownerHandle || !site.slug) return '';
  if (site.mode === 'upload') return uploadedSitePublicUrl(owner, site);
  return `${APP_ORIGIN}/@${ownerHandle}/${site.slug}`;
}

function uploadedSiteBundleFileSet(site, limit = 4000) {
  if (!siteUsesBundle(site)) return new Set(['index.html']);
  return new Set(listBundleFiles(site.bundleRoot, limit));
}

function splitSiteAssetUrl(raw = '') {
  const value = String(raw || '').trim();
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return { value, relativePath: '', suffix: '' };
  }
  const hashIndex = value.indexOf('#');
  const queryIndex = value.indexOf('?');
  const cutIndex = [hashIndex, queryIndex].filter((idx) => idx >= 0).sort((a, b) => a - b)[0] ?? value.length;
  const pathPart = value.slice(0, cutIndex);
  const suffix = value.slice(cutIndex);
  return {
    value,
    relativePath: safeSiteBundlePath(pathPart.slice(1)),
    suffix
  };
}

function rewriteUploadedSiteAbsoluteUrl(raw, owner, site, fileSet) {
  const { value, relativePath, suffix } = splitSiteAssetUrl(raw);
  if (!relativePath || !fileSet?.has(relativePath)) return value;
  return `${uploadedSiteBasePath(owner, site)}${relativePath}${suffix}`;
}

function rewriteUploadedSiteSrcset(raw, owner, site, fileSet) {
  return String(raw || '').split(',').map((entry) => {
    const trimmed = entry.trim();
    if (!trimmed) return trimmed;
    const [url, descriptor = ''] = trimmed.split(/\s+/, 2);
    const rewritten = rewriteUploadedSiteAbsoluteUrl(url, owner, site, fileSet);
    return descriptor ? `${rewritten} ${descriptor}` : rewritten;
  }).join(', ');
}

function rewriteUploadedSiteHtmlAttributes(html, owner, site, fileSet) {
  return String(html || '')
    .replace(/(\s(?:src|href|poster|action|xlink:href)=["'])(\/[^"']+)(["'])/gi, (_match, prefix, value, suffix) => `${prefix}${rewriteUploadedSiteAbsoluteUrl(value, owner, site, fileSet)}${suffix}`)
    .replace(/(\ssrcset=["'])([^"']+)(["'])/gi, (_match, prefix, value, suffix) => `${prefix}${rewriteUploadedSiteSrcset(value, owner, site, fileSet)}${suffix}`)
    .replace(/(<meta[^>]+\scontent=["'])(\/[^"']+)(["'][^>]*>)/gi, (_match, prefix, value, suffix) => `${prefix}${rewriteUploadedSiteAbsoluteUrl(value, owner, site, fileSet)}${suffix}`);
}

function rewriteUploadedSiteCssUrls(source, owner, site, fileSet) {
  return String(source || '').replace(/url\(\s*(["']?)(\/[^"'()]+)\1\s*\)/gi, (_match, quote, value) => `url(${quote}${rewriteUploadedSiteAbsoluteUrl(value, owner, site, fileSet)}${quote})`);
}

function rewriteUploadedSiteJsStrings(source, owner, site, fileSet) {
  return String(source || '').replace(/(["'`])\/(?!\/)([^"'`\n\r]+?)\1/g, (match, quote, tail) => {
    const rewritten = rewriteUploadedSiteAbsoluteUrl(`/${tail}`, owner, site, fileSet);
    return rewritten === `/${tail}` ? match : `${quote}${rewritten}${quote}`;
  });
}

function transformUploadedSiteTextAsset(site, owner, assetPath = '', sourceText = '') {
  const ext = path.posix.extname(String(assetPath || '').toLowerCase());
  if (!UPLOADED_SITE_TEXT_TRANSFORM_EXTENSIONS.has(ext)) return String(sourceText || '');
  const fileSet = uploadedSiteBundleFileSet(site);
  if (ext === '.css') return rewriteUploadedSiteCssUrls(sourceText, owner, site, fileSet);
  if (['.js', '.mjs', '.cjs'].includes(ext)) return rewriteUploadedSiteJsStrings(sourceText, owner, site, fileSet);
  let next = rewriteUploadedSiteHtmlAttributes(sourceText, owner, site, fileSet);
  next = rewriteUploadedSiteCssUrls(next, owner, site, fileSet);
  next = rewriteUploadedSiteJsStrings(next, owner, site, fileSet);
  return next;
}

function readUploadedSiteEntryHtml(site) {
  const assetAbsPath = siteUsesBundle(site) ? siteBundleAbsPath(site, 'index.html') : resolveDataPath(site.htmlPath);
  if (!assetAbsPath || !existsSync(assetAbsPath)) return '';
  return readFileSync(assetAbsPath, 'utf8');
}

function sendUploadedSiteAssetResponse(res, site, owner, assetPath, assetAbsPath) {
  const ext = path.posix.extname(assetPath).toLowerCase();
  if (UPLOADED_SITE_TEXT_TRANSFORM_EXTENSIONS.has(ext)) {
    const inner = readFileSync(assetAbsPath, 'utf8');
    return res.type(ext === '.css' ? 'css' : ext === '.html' || ext === '.htm' ? 'html' : 'application/javascript')
      .send(transformUploadedSiteTextAsset(site, owner, assetPath, inner));
  }
  return res.sendFile(assetAbsPath);
}

function uploadedSiteEntryPath(site) {
  if (!site?.htmlPath) return 'index.html';
  const bundleRoot = String(site.bundleRoot || '').trim();
  const htmlPath = String(site.htmlPath || '').trim();
  if (bundleRoot && htmlPath.startsWith(`${bundleRoot}/`)) {
    const relativePath = safeSiteBundlePath(htmlPath.slice(bundleRoot.length + 1));
    if (relativePath) return relativePath;
  }
  return 'index.html';
}

function looksLike7zArchive(buffer) {
  return Boolean(
    buffer?.length >= 6
    && buffer[0] === 0x37
    && buffer[1] === 0x7a
    && buffer[2] === 0xbc
    && buffer[3] === 0xaf
    && buffer[4] === 0x27
    && buffer[5] === 0x1c
  );
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

function stageSiteBundle(siteId, files = [], options = {}) {
  const dirName = siteBundleDirName(siteId);
  const stageRoot = path.join(sitesDir, `.stage-${dirName}-${randomBytes(6).toString('hex')}`);
  const bundleAbsPath = path.join(stageRoot, dirName);
  mkdirSync(bundleAbsPath, { recursive: true });
  const maxExpandedBytes = Number.isFinite(options.maxExpandedBytes)
    ? Number(options.maxExpandedBytes)
    : SITE_ZIP_LIMIT_BYTES * 6;
  let totalBytes = 0;
  const written = [];
  for (const file of files) {
    const relativePath = safeSiteBundlePath(file?.path || '');
    if (!relativePath) continue;
    const rawContent = file?.content;
    const buffer = Buffer.isBuffer(rawContent) ? rawContent : Buffer.from(String(rawContent || ''), 'utf8');
    totalBytes += buffer.length;
    if (totalBytes > maxExpandedBytes) throw new Error('Archive expands to an unsupported size.');
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
    files: written,
    stageRoot,
    stageBundleAbsPath: bundleAbsPath,
    finalBundleAbsPath: path.join(sitesDir, dirName)
  };
}

function cleanupStagedSiteBundle(stage) {
  if (!stage?.stageRoot || !existsSync(stage.stageRoot)) return;
  try {
    rmSync(stage.stageRoot, { recursive: true, force: true });
  } catch {}
}

function publishStagedSiteBundle(stage) {
  if (!stage?.stageBundleAbsPath || !stage?.finalBundleAbsPath) throw new Error('Staged site bundle is incomplete.');
  const finalBundleAbsPath = stage.finalBundleAbsPath;
  const backupAbsPath = existsSync(finalBundleAbsPath)
    ? path.join(sitesDir, `.backup-${path.basename(finalBundleAbsPath)}-${randomBytes(6).toString('hex')}`)
    : '';
  try {
    if (backupAbsPath) renameSync(finalBundleAbsPath, backupAbsPath);
    renameSync(stage.stageBundleAbsPath, finalBundleAbsPath);
    if (backupAbsPath && existsSync(backupAbsPath)) rmSync(backupAbsPath, { recursive: true, force: true });
    return {
      htmlPath: stage.htmlPath,
      bundleRoot: stage.bundleRoot,
      files: stage.files
    };
  } catch (error) {
    if (backupAbsPath && existsSync(backupAbsPath) && !existsSync(finalBundleAbsPath)) {
      try { renameSync(backupAbsPath, finalBundleAbsPath); } catch {}
    }
    throw error;
  } finally {
    cleanupStagedSiteBundle(stage);
    if (backupAbsPath && existsSync(backupAbsPath)) {
      try { rmSync(backupAbsPath, { recursive: true, force: true }); } catch {}
    }
  }
}

function ensureSiteBundle(siteId, files = [], options = {}) {
  const stage = stageSiteBundle(siteId, files, options);
  try {
    return publishStagedSiteBundle(stage);
  } catch (error) {
    cleanupStagedSiteBundle(stage);
    throw error;
  }
}

function preferredClamScanBinary() {
  const envBinary = sanitizeText(process.env.CLAMSCAN_BINARY || '', 500);
  const candidates = [envBinary, '/usr/bin/clamscan', '/usr/local/bin/clamscan'].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) || '';
}

function runAntivirusScanOnBundle(absDir = '') {
  const binary = preferredClamScanBinary();
  if (!binary || !absDir) {
    return { engine: '', scanned: false, infected: false, findings: [] };
  }
  const result = spawnSync(binary, ['--recursive', '--infected', '--no-summary', absDir], { encoding: 'utf8' });
  if (![0, 1].includes(Number(result.status))) {
    const err = new Error((result.stderr || result.stdout || '').trim() || 'Antivirus scan failed.');
    err.statusCode = 503;
    throw err;
  }
  const findings = String(result.stdout || '').split(/\r?\n/).map((line) => {
    const trimmed = line.trim();
    if (!trimmed.endsWith(' FOUND')) return null;
    const body = trimmed.slice(0, -' FOUND'.length);
    const separatorIndex = body.indexOf(':');
    const rawPath = separatorIndex >= 0 ? body.slice(0, separatorIndex).trim() : '';
    const signature = separatorIndex >= 0 ? body.slice(separatorIndex + 1).trim() : 'malware';
    const relativePath = rawPath ? path.relative(absDir, rawPath).replace(/\\/g, '/') : '';
    return {
      path: safeSiteBundlePath(relativePath) || safeSiteBundlePath(path.posix.basename(rawPath)),
      signature: sanitizeText(signature || 'malware', 180)
    };
  }).filter(Boolean);
  return {
    engine: 'clamscan',
    scanned: true,
    infected: Number(result.status) === 1,
    findings
  };
}

function createArchiveSecurityError(message, rawImportReport = {}, blockedEntries = []) {
  const err = new Error(message);
  err.statusCode = 400;
  err.importReport = sanitizeSiteImportReport(rawImportReport);
  err.securityBlocked = ensureArray(blockedEntries).map((item) => ({
    path: safeSiteBundlePath(item?.path || ''),
    code: sanitizeText(item?.code || '', 40),
    message: sanitizeText(item?.message || '', 240),
    severity: 'blocked'
  })).filter((item) => item.path && item.message);
  return err;
}

async function finalizeExtractedArchiveSiteBundle(siteId, files = [], options = {}) {
  const optimized = await optimizeImportedSiteFiles(files);
  const heuristic = scanImportedSiteFiles(optimized.files);
  const rawImportReport = {
    ...optimized.importReport,
    scannedFileCount: heuristic.scannedFileCount,
    securityWarnings: heuristic.securityWarnings
  };
  if (heuristic.blocked.length) {
    const first = heuristic.blocked[0];
    throw createArchiveSecurityError(`${first.message}${first.path ? ` (${first.path})` : ''}`, rawImportReport, heuristic.blocked);
  }
  const stage = stageSiteBundle(siteId, optimized.files, options);
  try {
    const antivirus = runAntivirusScanOnBundle(stage.stageBundleAbsPath);
    rawImportReport.antivirus = antivirus;
    if (antivirus.infected) {
      const findings = ensureArray(antivirus.findings).map((item) => ({
        path: item.path,
        code: 'antivirus',
        message: `Antivirus detected ${item.signature || 'malware'}.`,
        severity: 'blocked'
      }));
      const first = findings[0] || { message: 'Archive upload was blocked by antivirus.', path: '' };
      throw createArchiveSecurityError(`${first.message}${first.path ? ` (${first.path})` : ''}`, rawImportReport, findings);
    }
    return {
      ...publishStagedSiteBundle(stage),
      importReport: sanitizeSiteImportReport(rawImportReport)
    };
  } catch (error) {
    cleanupStagedSiteBundle(stage);
    if (!error.importReport) error.importReport = sanitizeSiteImportReport(rawImportReport);
    throw error;
  }
}

async function extractZipSiteBundle(siteId, zipBuffer, options = {}) {
  if (!zipBuffer?.length) throw new Error('ZIP file data required.');
  const maxArchiveBytes = Number.isFinite(options.maxArchiveBytes)
    ? Number(options.maxArchiveBytes)
    : SITE_ZIP_LIMIT_BYTES;
  const maxExpandedBytes = Number.isFinite(options.maxExpandedBytes)
    ? Number(options.maxExpandedBytes)
    : SITE_ARCHIVE_EXPANDED_LIMIT_BYTES;
  if (zipBuffer.length > maxArchiveBytes) throw new Error(`ZIP file must stay under ${archiveLimitLabel(maxArchiveBytes)}.`);
  const zip = new AdmZip(zipBuffer);
  const entries = zip.getEntries().filter((entry) => !entry.isDirectory);
  if (entries.length > MAX_ARCHIVE_FILE_COUNT) throw new Error('Archive contains too many files.');
  let declaredExpandedBytes = 0;
  for (const entry of entries) {
    const unixMode = Number((entry?.attr || 0) >>> 16);
    if ((unixMode & 0o170000) === 0o120000) throw new Error('Archives with symlinks are not supported.');
    declaredExpandedBytes += Math.max(0, Number(entry.header?.size || 0));
    if (declaredExpandedBytes > maxExpandedBytes) throw new Error('Archive expands to an unsupported size.');
  }
  const files = entries.map((entry) => ({ path: entry.entryName, content: entry.getData() }));
  const indexPath = preferredArchiveIndexPath(files.map((file) => file.path));
  if (!indexPath) throw new Error('ZIP must contain an index.html file.');
  return await finalizeExtractedArchiveSiteBundle(siteId, bundleFilesFromArchive(files, indexPath), options);
}

function parseTarOctal(raw = '') {
  const cleaned = String(raw || '').replace(/\0/g, '').trim();
  if (!cleaned) return 0;
  return Number.parseInt(cleaned, 8) || 0;
}

function extractTarEntries(buffer, options = {}) {
  const files = [];
  const maxExpandedBytes = Number.isFinite(options.maxExpandedBytes)
    ? Number(options.maxExpandedBytes)
    : SITE_ARCHIVE_EXPANDED_LIMIT_BYTES;
  let totalBytes = 0;
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
    totalBytes += size;
    if (totalBytes > maxExpandedBytes) throw new Error('Archive expands to an unsupported size.');
    if (files.length >= MAX_ARCHIVE_FILE_COUNT) throw new Error('Archive contains too many files.');
    files.push({ path: entryName, content: Buffer.from(buffer.subarray(dataStart, dataEnd)) });
    offset = dataStart + Math.ceil(size / 512) * 512;
  }
  return files;
}

async function extractTarSiteBundle(siteId, archiveBuffer, options = {}) {
  if (!archiveBuffer?.length) throw new Error('Archive file data required.');
  const files = extractTarEntries(archiveBuffer, options);
  const indexPath = preferredArchiveIndexPath(files.map((file) => file.path));
  if (!indexPath) throw new Error('Archive must contain an index.html file.');
  return await finalizeExtractedArchiveSiteBundle(siteId, bundleFilesFromArchive(files, indexPath), options);
}

function readArchiveDirFiles(absRoot, dir = absRoot, state = null) {
  const counters = state || { totalBytes: 0, fileCount: 0, maxExpandedBytes: SITE_ARCHIVE_EXPANDED_LIMIT_BYTES, maxFiles: MAX_ARCHIVE_FILE_COUNT };
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absPath = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error('Archives with symlinks are not supported.');
    }
    if (entry.isDirectory()) {
      files.push(...readArchiveDirFiles(absRoot, absPath, counters));
      continue;
    }
    if (!entry.isFile()) {
      throw new Error('Archive contains an unsupported filesystem entry.');
    }
    if (counters.fileCount >= counters.maxFiles) throw new Error('Archive contains too many files.');
    const content = readFileSync(absPath);
    counters.fileCount += 1;
    counters.totalBytes += content.length;
    if (counters.totalBytes > counters.maxExpandedBytes) throw new Error('Archive expands to an unsupported size.');
    files.push({
      path: path.relative(absRoot, absPath).replace(/\\/g, '/'),
      content
    });
  }
  return files;
}

function inspect7zArchive(binary, archivePath, options = {}) {
  const maxExpandedBytes = Number.isFinite(options.maxExpandedBytes)
    ? Number(options.maxExpandedBytes)
    : SITE_ARCHIVE_EXPANDED_LIMIT_BYTES;
  const result = spawnSync(binary, ['l', '-slt', archivePath], { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || '').trim() || 'Could not inspect 7z archive.');
  }
  const lines = String(result.stdout || '').split(/\r?\n/);
  let totalBytes = 0;
  let fileCount = 0;
  let currentPath = '';
  let currentSize = 0;
  let currentIsDir = false;
  const flush = () => {
    if (!currentPath || currentPath === archivePath || currentPath === path.basename(archivePath)) {
      currentPath = '';
      currentSize = 0;
      currentIsDir = false;
      return;
    }
    if (!currentIsDir) {
      fileCount += 1;
      totalBytes += Math.max(0, currentSize);
      if (fileCount > MAX_ARCHIVE_FILE_COUNT) throw new Error('Archive contains too many files.');
      if (totalBytes > maxExpandedBytes) throw new Error('Archive expands to an unsupported size.');
    }
    currentPath = '';
    currentSize = 0;
    currentIsDir = false;
  };
  for (const rawLine of lines) {
    const line = String(rawLine || '');
    if (!line.trim()) {
      flush();
      continue;
    }
    if (line.startsWith('Path = ')) {
      flush();
      currentPath = line.slice('Path = '.length).trim();
      continue;
    }
    if (line.startsWith('Size = ')) {
      currentSize = Number.parseInt(line.slice('Size = '.length).trim(), 10) || 0;
      continue;
    }
    if (line.startsWith('Folder = ')) {
      currentIsDir = line.slice('Folder = '.length).trim() === '+';
      continue;
    }
    if (line.startsWith('Attributes = ') && /\bD\b/i.test(line.slice('Attributes = '.length))) {
      currentIsDir = true;
    }
  }
  flush();
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

async function extract7zSiteBundle(siteId, archiveBuffer, options = {}) {
  const maxArchiveBytes = Number.isFinite(options.maxArchiveBytes)
    ? Number(options.maxArchiveBytes)
    : SITE_ZIP_LIMIT_BYTES;
  const maxExpandedBytes = Number.isFinite(options.maxExpandedBytes)
    ? Number(options.maxExpandedBytes)
    : SITE_ARCHIVE_EXPANDED_LIMIT_BYTES;
  if (archiveBuffer?.length > maxArchiveBytes) throw new Error(`Archive file must stay under ${archiveLimitLabel(maxArchiveBytes)}.`);
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
    inspect7zArchive(binary, archivePath, { maxExpandedBytes });
    const result = spawnSync(binary, ['x', archivePath, `-o${outDir}`, '-y'], { encoding: 'utf8' });
    if (result.status !== 0) {
      throw new Error((result.stderr || result.stdout || '').trim() || 'Could not extract 7z archive.');
    }
    const files = readArchiveDirFiles(outDir, outDir, { totalBytes: 0, fileCount: 0, maxExpandedBytes, maxFiles: MAX_ARCHIVE_FILE_COUNT });
    const indexPath = preferredArchiveIndexPath(files.map((file) => file.path));
    if (!indexPath) throw new Error('Archive must contain an index.html file.');
    return await finalizeExtractedArchiveSiteBundle(siteId, bundleFilesFromArchive(files, indexPath), options);
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

function gunzipBufferLimited(buffer, maxExpandedBytes = SITE_ARCHIVE_EXPANDED_LIMIT_BYTES) {
  return new Promise((resolve, reject) => {
    const gunzip = createGunzip();
    const chunks = [];
    let totalBytes = 0;
    gunzip.on('data', (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > maxExpandedBytes) {
        gunzip.destroy(new Error('Archive expands to an unsupported size.'));
        return;
      }
      chunks.push(chunk);
    });
    gunzip.on('end', () => resolve(Buffer.concat(chunks, totalBytes)));
    gunzip.on('error', reject);
    gunzip.end(buffer);
  });
}

async function extractArchiveSiteBundle(siteId, archiveBuffer, archiveName = '', options = {}) {
  const fileName = String(archiveName || '').trim().toLowerCase();
  const looksLikeZip = archiveBuffer[0] === 0x50 && archiveBuffer[1] === 0x4b;
  const looksLikeGzip = archiveBuffer[0] === 0x1f && archiveBuffer[1] === 0x8b;
  const looksLike7z = looksLike7zArchive(archiveBuffer);
  if (looksLikeZip || fileName.endsWith('.zip')) return await extractZipSiteBundle(siteId, archiveBuffer, options);
  if (looksLike7z || fileName.endsWith('.7z')) return await extract7zSiteBundle(siteId, archiveBuffer, options);
  const maybeTar = looksLikeGzip || fileName.endsWith('.tgz') || fileName.endsWith('.tar.gz') || fileName.endsWith('.tar');
  if (maybeTar) {
    const maxExpandedBytes = Number.isFinite(options.maxExpandedBytes)
      ? Number(options.maxExpandedBytes)
      : SITE_ARCHIVE_EXPANDED_LIMIT_BYTES;
    const tarBuffer = looksLikeGzip || fileName.endsWith('.tgz') || fileName.endsWith('.tar.gz')
      ? await gunzipBufferLimited(archiveBuffer, maxExpandedBytes)
      : archiveBuffer;
    return await extractTarSiteBundle(siteId, tarBuffer, options);
  }
  throw new Error('Unsupported archive format. Use ZIP, 7Z, TAR, TAR.GZ or TGZ.');
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

function writeSiteStudioText(site, rawPath = 'index.html', rawContent = '', { create = false, maxBytes = SITE_UPLOAD_LIMIT_BYTES } = {}) {
  ensureUploadSiteStudio(site);
  const relativePath = siteStudioEditablePath(rawPath);
  if (!relativePath) throw new Error('Only HTML, CSS, JS, JSON, SVG, markdown, XML and text files are supported.');
  const content = rawContent === undefined || rawContent === null ? '' : String(rawContent);
  if (relativePath === 'index.html' && !content.trim()) throw new Error('index.html cannot be empty.');
  if (Number.isFinite(maxBytes) && Buffer.byteLength(content, 'utf8') > maxBytes) throw new Error('Studio text files must stay under 1 MB.');
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

const SERVER_ONLY_SITE_EXTENSIONS = new Set([
  '.php', '.py', '.rb', '.pl', '.cgi', '.asp', '.aspx', '.jsp', '.jspx', '.cshtml',
  '.dll', '.exe', '.so', '.sh', '.bash', '.ps1', '.sql'
]);
const SERVER_ONLY_SITE_PREFIXES = [
  'server/', 'api/', 'functions/', '.netlify/functions/', 'netlify/functions/', 'supabase/functions/', 'lambda/'
];

function siteDiagnosticTextPaths(site, limit = 160) {
  const files = siteUsesBundle(site) ? listBundleFiles(site.bundleRoot, limit) : (site.htmlPath ? ['index.html'] : []);
  return files.filter((relativePath) => {
    if (relativePath === 'index.html') return true;
    return Boolean(siteStudioEditablePath(relativePath));
  });
}

function readSiteDiagnosticText(site, relativePath = 'index.html') {
  if (!siteUsesBundle(site)) return relativePath === 'index.html' ? (readSiteFile(site.htmlPath) || '') : '';
  const absPath = siteBundleAbsPath(site, relativePath);
  if (!absPath || !existsSync(absPath)) return '';
  return readFileSync(absPath, 'utf8');
}

function isServerOnlySitePath(relativePath = '') {
  const normalized = safeSiteBundlePath(relativePath);
  if (!normalized) return false;
  const ext = path.posix.extname(normalized).toLowerCase();
  if (SERVER_ONLY_SITE_EXTENSIONS.has(ext)) return true;
  return SERVER_ONLY_SITE_PREFIXES.some((prefix) => normalized.toLowerCase().startsWith(prefix));
}

function siteCompatibilityWarnings(site) {
  if (!site || site.mode !== 'upload') return [];
  const bundleFiles = siteUsesBundle(site) ? listBundleFiles(site.bundleRoot, 500) : ['index.html'];
  const bundleFileSet = new Set(bundleFiles);
  const warnings = [];
  const serverFiles = bundleFiles.filter((relativePath) => isServerOnlySitePath(relativePath));
  if (serverFiles.length) {
    warnings.push({
      code: 'server-files',
      title: 'Server-side files were imported as static files only.',
      message: 'PHP, Python, API handlers and similar files stay inside the package, but they do not execute on justbreath. The hosted copy remains static.',
      paths: serverFiles.slice(0, 12),
      total: serverFiles.length
    });
  }
  const textPaths = siteDiagnosticTextPaths(site, 160);
  const localApiHits = [];
  const localDevHits = [];
  const formActionHits = [];
  const requestCallPattern = /\b(?:fetch|axios(?:\.[a-z]+)?|XMLHttpRequest|EventSource|WebSocket)\s*\(\s*['"`]([^'"`]+)['"`]/gi;
  const localDevPattern = /(?:https?:\/\/|wss?:\/\/)(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?/gi;
  const formActionPattern = /<form[^>]+action=["'](?!https?:\/\/|mailto:|tel:|#)([^"']+)["'][^>]*>/gi;
  for (const relativePath of textPaths) {
    const content = readSiteDiagnosticText(site, relativePath);
    if (!content) continue;
    let requestMatch = requestCallPattern.exec(content);
    while (requestMatch) {
      const requestTarget = String(requestMatch[1] || '').trim();
      if (localDevPattern.test(requestTarget)) {
        localDevHits.push(relativePath);
      } else if (/^\/(?:api|auth|graphql|socket)\b/i.test(requestTarget)) {
        const relativeTarget = splitSiteAssetUrl(requestTarget).relativePath;
        if (!relativeTarget || !bundleFileSet.has(relativeTarget)) localApiHits.push(relativePath);
      }
      localDevPattern.lastIndex = 0;
      requestMatch = requestCallPattern.exec(content);
    }
    requestCallPattern.lastIndex = 0;
    if (localDevPattern.test(content)) localDevHits.push(relativePath);
    localDevPattern.lastIndex = 0;
    let formMatch = formActionPattern.exec(content);
    while (formMatch) {
      const actionValue = String(formMatch[1] || '').trim();
      const relativeTarget = splitSiteAssetUrl(actionValue).relativePath;
      const pointsToBundle = relativeTarget && bundleFileSet.has(relativeTarget);
      if (/^[^?#]+\.(?:php|asp|aspx|jsp|cgi)(?:[?#].*)?$/i.test(actionValue) || (/^\/(?:api|auth)\b/i.test(actionValue) && !pointsToBundle)) {
        formActionHits.push(relativePath);
        break;
      }
      formMatch = formActionPattern.exec(content);
    }
    formActionPattern.lastIndex = 0;
  }
  if (localApiHits.length) {
    warnings.push({
      code: 'server-state',
      title: 'Interactive server state stays disabled after import.',
      message: 'This site references same-origin APIs, sockets or live endpoints. The UI is imported, but those server-backed features do not come with the static copy.',
      paths: Array.from(new Set(localApiHits)).slice(0, 12),
      total: Array.from(new Set(localApiHits)).length
    });
  }
  if (localDevHits.length) {
    warnings.push({
      code: 'local-dev',
      title: 'Local development endpoints were detected.',
      message: 'Requests to localhost or local WebSocket servers do not exist on the hosted site. Replace them with static data or a real external endpoint.',
      paths: Array.from(new Set(localDevHits)).slice(0, 12),
      total: Array.from(new Set(localDevHits)).length
    });
  }
  if (formActionHits.length) {
    warnings.push({
      code: 'server-forms',
      title: 'Form handlers that need a backend will not process data here.',
      message: 'POST-style forms that target PHP/API endpoints are preserved visually, but no server-side form processing is imported with the static site.',
      paths: Array.from(new Set(formActionHits)).slice(0, 12),
      total: Array.from(new Set(formActionHits)).length
    });
  }
  return warnings;
}

function uploadedSiteDiagnostics(site, html = '') {
  if (!site || site.mode !== 'upload') return null;
  const variant = siteUsesBundle(site) || site.uploadMode === 'archive' ? 'archive' : 'html';
  const entryFile = siteUsesBundle(site) ? 'index.html' : path.posix.basename(String(site.htmlPath || 'index.html'));
  const relativeRefs = collectSiteRelativeRefs(html);
  const files = siteUsesBundle(site) ? listBundleFiles(site.bundleRoot) : (entryFile ? [entryFile] : []);
  const fileSet = new Set(files);
  const missingRefs = relativeRefs.filter((ref) => !fileSet.has(ref));
  const importReport = sanitizeSiteImportReport(site.importReport || {});
  return {
    variant,
    entryFile,
    fileCount: files.length,
    files,
    relativeRefs,
    missingRefs,
    importReport,
    compatibilityWarnings: siteCompatibilityWarnings(site)
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
  const value = safeDataUrl(dataUrl, CHAT_MEDIA_UPLOAD_LIMIT_BYTES * 2, 'audio');
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

function saveDataVideo(dataUrl, prefix = 'video') {
  const stored = saveDataMedia(dataUrl, prefix, { maxLength: CHAT_MEDIA_UPLOAD_LIMIT_BYTES * 2, allowedKinds: ['video'] });
  return stored.url || '';
}

function saveDataMedia(dataUrl, prefix = 'asset', options = {}) {
  const maxLength = Number.isFinite(options.maxLength) ? Number(options.maxLength) : IMAGE_UPLOAD_LIMIT_BYTES * 6;
  const value = safeDataUrl(dataUrl, maxLength, options.allowedKinds || ['image', 'video']);
  if (!value) return { url: '', mimeType: '' };
  const match = value.match(/^data:([a-zA-Z0-9.+-]+\/[a-zA-Z0-9.+-]+)(?:;[a-zA-Z0-9=.+-]+)*;base64,(.+)$/);
  if (!match) return { url: '', mimeType: '' };
  const mime = match[1].toLowerCase();
  const ext = mime.includes('svg')
    ? 'svg'
    : mime.split('/')[1].split('+')[0].replace('jpeg', 'jpg').replace('x-m4v', 'm4v');
  const fileName = `${prefix}-${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`;
  const absPath = path.join(uploadsDir, fileName);
  writeFileSync(absPath, Buffer.from(match[2], 'base64'));
  return { url: `/media/${fileName}`, mimeType: mime };
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

function siteWatermarkHtml(store, owner, site, innerHtml, options = {}) {
  const renderedInner = ensureDoctype(innerHtml);
  const meta = siteMetaPayload(store, site, owner, renderedInner);
  const { config } = meta;
  const profilePath = `/@${owner?.handleCanonical || canonicalHandle(owner?.handle)}`;
  const launchEntryPath = uploadedSiteEntryPath(site);
  const previewSuffix = options?.previewToken
    ? `${uploadedSitePublicUrl(owner, site, launchEntryPath).includes('?') ? '&' : '?'}previewToken=${encodeURIComponent(options.previewToken)}`
    : '';
  const launchUrl = sanitizeSiteUrl(`${uploadedSitePublicUrl(owner, site, launchEntryPath)}${previewSuffix}`, 1000);
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
    .launch-card{width:min(640px, calc(100vw - 32px));padding:28px;border:1px solid var(--line);border-radius:28px;background:var(--panel);box-shadow:0 24px 80px rgba(0,0,0,.42);display:grid;gap:18px}
    .launch-brand{display:flex;align-items:center;gap:14px}
    .launch-site-icon{width:232px;height:232px;border-radius:48px;overflow:hidden;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);display:grid;place-items:center;flex:0 0 auto}
    .launch-site-icon img{width:100%;height:100%;object-fit:cover;display:block}
    .launch-site-icon.fallback{font-size:84px;font-weight:800}
    .launch-kicker{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
    .launch h1{margin:0;font-size:clamp(30px,6vw,54px);line-height:.95;letter-spacing:-.06em}
    .launch p{margin:0;color:var(--muted);line-height:1.7}
    .launch-meta{display:grid;gap:10px;padding:14px 16px;border-radius:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
    .launch-meta strong{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#f6f8fb}
    .launch-note{font-size:14px;color:#d7dce8}
    .launch-warning{padding:14px 16px;border-radius:18px;background:rgba(251,146,60,.12);border:1px solid rgba(251,146,60,.28);color:#ffedd5}
    .launch-actions{display:flex;flex-wrap:wrap;gap:12px}
    .launch-remember{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--muted)}
    .launch-remember input{margin-top:3px}
    .button{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);text-decoration:none;font-weight:600}
    .button.primary{background:linear-gradient(135deg,var(--accent), color-mix(in srgb,var(--accent) 62%, #38bdf8));border:none}
    .watermark{position:fixed;right:18px;bottom:18px;z-index:30;display:inline-flex;align-items:center;gap:10px;padding:10px 14px;border-radius:999px;background:rgba(7,10,16,.78);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.14);color:#f6f8fb;text-decoration:none;font-size:13px;box-shadow:0 12px 34px rgba(0,0,0,.28);transition:opacity .24s ease, transform .24s ease, visibility .24s ease}
    .watermark.hidden{opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px)}
    .watermark .mark{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#8b5cf6,#38bdf8);display:block}
    .watermark .mark.image{overflow:hidden;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12)}
    .watermark .mark.image img{width:100%;height:100%;object-fit:cover;display:block}
    @media (max-width: 720px){.watermark{right:12px;bottom:12px;padding:9px 12px}.launch-card{padding:22px;border-radius:24px}.launch-site-icon{width:160px;height:160px;border-radius:36px}.launch-site-icon.fallback{font-size:60px}}
  </style>
</head>
<body>
  <iframe id="site-frame" class="frame" referrerpolicy="strict-origin" loading="eager"></iframe>
  <div id="launch" class="launch">
    <div class="launch-card">
      <div class="launch-brand">${launchIcon}<div><div class="launch-kicker">${escapeHtmlValue(config.brandName || BRAND_WORDMARK)}</div><h1>${escapeHtmlValue(site.title || 'Creator site')}</h1></div></div>
      <p>${meta.launchSummary}</p>
      <div class="launch-meta">
        <strong>About this site</strong>
        <div class="launch-note">${meta.launchEnvironment}</div>
        <div class="launch-note">Creator: ${meta.ownerName}</div>
        <div class="launch-note">Profile: <a class="button" style="min-height:34px;padding:0 12px" href="${meta.ownerProfilePath}">@${meta.ownerHandle}</a></div>
      </div>
      <div class="launch-warning">${meta.launchWarning}</div>
      <label class="launch-remember"><input type="checkbox" id="remember-launch" /><span>Remember this decision on this device and open this site directly next time.</span></label>
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
    const launchUrl = '${escapeHtmlValue(launchUrl)}';
    const rememberKey = 'jb_site_launch_ack:${meta.ownerHandle}/${site.slug}';
    if (launchUrl) iframe.src = launchUrl;
    const openSite = () => {
      launch.classList.add('hidden');
      if (watermark) watermark.classList.add('hidden');
      iframe.classList.add('live');
    };
    try {
      if (localStorage.getItem(rememberKey) === '1') openSite();
    } catch {}
    document.getElementById('launch-button').addEventListener('click', () => {
      try {
        if (document.getElementById('remember-launch')?.checked) localStorage.setItem(rememberKey, '1');
      } catch {}
      openSite();
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
  const sticker = store.stickers.find((item) => Number(item.id) === Number(id)) || null;
  if (!sticker) return null;
  return {
    id: sticker.id,
    packId: sticker.packId,
    userId: sticker.userId,
    name: sticker.name,
    mimeType: sticker.mimeType,
    dataUrl: stickerMediaUrl(sticker),
    fileUrl: sticker.fileUrl || '',
    previewUrl: sticker.previewUrl || stickerMediaUrl(sticker),
    kind: sticker.kind || 'static',
    sourceType: sticker.sourceType || sanitizeStickerSourceType('', sticker.mimeType),
    durationMs: Number(sticker.durationMs || 0),
    width: Number(sticker.width || 0),
    height: Number(sticker.height || 0),
    createdAt: sticker.createdAt,
    updatedAt: sticker.updatedAt
  };
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
  const sites = store.sites.filter((item) => Number(item.userId) === Number(userId) && siteAppearsInPublicDirectory(item));
  const messages = store.messages.filter((item) => Number(item.userId) === Number(userId)).length;
  const comments = store.comments.filter((item) => Number(item.userId) === Number(userId)).length;
  const likes = store.likes.filter((like) => posts.some((post) => post.id === like.postId)).length;
  const followers = store.follows.filter((item) => Number(item.targetUserId) === Number(userId)).length;
  return posts.length * 4 + projects.length * 6 + sites.length * 6 + messages + comments + likes * 2 + followers * 3;
}

function userProfileVisibility(user) {
  return ['public', 'handle-only', 'private'].includes(user?.privacy?.profileVisibility)
    ? user.privacy.profileVisibility
    : 'public';
}

function userAppearsInPublicDirectory(user, viewerUserId = null) {
  if (!user || user.bannedAt) return false;
  if (Number(viewerUserId || 0) === Number(user.id || 0)) return true;
  return userProfileVisibility(user) === 'public';
}

function userCanOpenPublicProfile(user, viewerUserId = null) {
  if (!user || user.bannedAt) return false;
  if (Number(viewerUserId || 0) === Number(user.id || 0)) return true;
  return userProfileVisibility(user) !== 'private';
}

function publicUser(store, user, viewerUserId = null) {
  if (!user) return null;
  const profileVisibility = userProfileVisibility(user);
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
      sites: store.sites.filter((item) => Number(item.userId) === Number(user.id) && siteAppearsInPublicDirectory(item)).length,
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

function adminUserPayload(store, user, viewerUserId = null) {
  if (!user) return null;
  const base = publicUser(store, user, viewerUserId);
  const plan = subscriptionPlan(user.billing?.planId || '');
  const siteCount = store.sites.filter((site) => Number(site.userId) === Number(user.id)).length;
  const siteLimit = userSiteLimit(user);
  const verificationRequested = store.verificationRequests.some((request) => Number(request.userId) === Number(user.id) && request.status === 'pending');
  return {
    ...base,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl,
    email: user.email,
    roleInternal: user.roleInternal,
    billing: {
      planId: user.billing?.planId || '',
      planLabel: plan?.label || 'Free',
      renewsAt: user.billing?.renewsAt || null,
      storageLimitMB: Number(user.billing?.storageLimitMB || 0)
    },
    bannedAt: user.bannedAt || null,
    banReason: user.banReason || '',
    siteCount,
    siteLimit: Number.isFinite(siteLimit) ? siteLimit : null,
    siteLimitLabel: Number.isFinite(siteLimit) ? String(siteLimit) : 'Unlimited',
    siteUnlimited: !Number.isFinite(siteLimit),
    verificationRequested
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
  const site = project.siteId
    ? store.sites.find((item) => Number(item.id) === Number(project.siteId) && (Number(viewerUserId || 0) === Number(item.userId) || siteAppearsInPublicDirectory(item)))
    : store.sites.find((item) => Number(item.projectId) === Number(project.id) && (Number(viewerUserId || 0) === Number(item.userId) || siteAppearsInPublicDirectory(item)));
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
  const launchPath = site.mode === 'upload' ? uploadedSiteBasePath(owner, site) : `/@${ownerHandle}/${site.slug}`;
  const publicUrl = sitePublicUrl(owner, site) || `${APP_ORIGIN}${launchPath}`;
  return {
    id: site.id,
    slug: site.slug,
    title: site.title,
    summary: site.summary,
    visibility: site.visibility,
    mode: site.mode,
    uploadMode: site.mode === 'upload' ? (site.uploadMode || (siteUsesBundle(site) ? 'archive' : 'html')) : '',
    templateConfig: isOwner || site.mode === 'template' ? normalizedConfig : null,
    importReport: isOwner && site.mode === 'upload' ? sanitizeSiteImportReport(site.importReport || {}) : undefined,
    reviewStatus: isOwner ? (site.reviewStatus || 'draft') : undefined,
    reviewNote: isOwner ? (site.reviewNote || '') : undefined,
    createdAt: site.createdAt,
    updatedAt: site.updatedAt,
    owner: publicUser(store, owner, viewerUserId),
    iconUrl: siteIconUrl(store, site, owner),
    path: launchPath,
    url: publicUrl,
    hostedOnSeparateOrigin: Boolean(site.mode === 'upload' && UPLOADED_SITES_ISOLATION_ENABLED),
    isolatedOrigin: site.mode === 'upload' ? (UPLOADED_SITES_ORIGIN || '') : '',
    launchInfo: {
      title: site.title,
      summary: site.summary || normalizedConfig.body || '',
      ownerName: owner?.displayName || ownerHandle || 'Creator',
      ownerHandle,
      ownerProfilePath: `/@${ownerHandle}`,
      moderationNote: 'This site is moderated by justbreath, but uploaded sites are hosted on a separate origin so they cannot run inside the main app context.',
      environmentNote: 'You are about to enter a creator-controlled environment that may look and behave differently from the main platform.'
    },
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

function normalizeReportTargetType(value) {
  if (value === 'profile') return 'user';
  return ['user', 'post', 'site', 'project', 'message', 'other'].includes(value) ? value : 'other';
}

function moderationTargetMeta(store, targetType, targetId = null) {
  const type = normalizeReportTargetType(targetType);
  if (type === 'user') {
    const user = store.users.find((item) => Number(item.id) === Number(targetId));
    if (!user) return null;
    return {
      type,
      id: user.id,
      label: `Profile @${user.handleCanonical}`,
      url: `/@${user.handleCanonical}`,
      targetOwnerUserId: Number(user.id),
      handleCanonical: user.handleCanonical
    };
  }
  if (type === 'post') {
    const post = store.posts.find((item) => Number(item.id) === Number(targetId));
    if (!post) return null;
    const author = store.users.find((item) => Number(item.id) === Number(post.userId));
    return {
      type,
      id: post.id,
      label: post.title ? `Post: ${post.title}` : `Post by @${author?.handleCanonical || post.userId}`,
      url: author ? `/@${author.handleCanonical}` : '/feed',
      targetOwnerUserId: Number(post.userId)
    };
  }
  if (type === 'site') {
    const site = store.sites.find((item) => Number(item.id) === Number(targetId));
    if (!site) return null;
    const owner = store.users.find((item) => Number(item.id) === Number(site.userId));
    const ownerHandle = owner?.handleCanonical || canonicalHandle(owner?.handle);
    return {
      type,
      id: site.id,
      label: `Site: ${site.title}`,
      url: ownerHandle ? `/@${ownerHandle}/${site.slug}` : '',
      targetOwnerUserId: Number(site.userId)
    };
  }
  if (type === 'project') {
    const project = store.projects.find((item) => Number(item.id) === Number(targetId));
    if (!project) return null;
    return {
      type,
      id: project.id,
      label: `Project: ${project.title}`,
      url: `/project/${project.slug}`,
      targetOwnerUserId: Number(project.userId)
    };
  }
  if (type === 'message') {
    const message = store.messages.find((item) => Number(item.id) === Number(targetId));
    if (!message) return null;
    const room = store.rooms.find((item) => Number(item.id) === Number(message.roomId));
    const author = store.users.find((item) => Number(item.id) === Number(message.userId));
    const roomLabel = room?.title || `room #${message.roomId}`;
    return {
      type,
      id: message.id,
      label: `Message in ${roomLabel}`,
      url: '/messages',
      targetOwnerUserId: Number(message.userId)
    };
  }
  return {
    type: 'other',
    id: null,
    label: '',
    url: '',
    targetOwnerUserId: null,
    handleCanonical: null
  };
}

function internalModerationReporterUserId(store) {
  const brand = store.users.find((item) => item.handleCanonical === canonicalHandle(BRAND_HANDLE));
  if (brand?.id) return Number(brand.id);
  const owner = store.users.find((item) => item.handleCanonical === canonicalHandle(OWNER_HANDLE));
  return owner?.id ? Number(owner.id) : 0;
}

function queueBlockedSiteUploadReport(store, authUser, error, context = {}) {
  if (!store || !authUser || !ensureArray(error?.securityBlocked).length) return null;
  if (!store.reports) store.reports = [];
  if (!store.seq?.reports) store.seq.reports = Number(store.seq?.reports || 0);
  const reporterUserId = internalModerationReporterUserId(store);
  if (!reporterUserId) return null;
  const archiveName = sanitizeText(context.archiveName || '', 160);
  const action = sanitizeText(context.action || 'site-upload', 60);
  const findings = ensureArray(error.securityBlocked)
    .slice(0, 8)
    .map((item) => `${item.path || 'unknown'}: ${item.message || 'blocked'}`)
    .join('; ');
  const details = sanitizeText([
    `Action: ${action}.`,
    archiveName ? `Archive: ${archiveName}.` : '',
    findings ? `Scanner: ${findings}.` : '',
    error?.message ? `Error: ${error.message}` : ''
  ].filter(Boolean).join(' '), 1600);
  const targetUrl = authUser.handleCanonical ? `/@${authUser.handleCanonical}` : '';
  const targetLabel = sanitizeText(`Blocked archive upload by @${authUser.handleCanonical || canonicalHandle(authUser.handle || 'member')}`, 180);
  const existing = store.reports.find((item) => (
    item.status === 'open'
    && item.reason === 'Blocked archive upload'
    && Number(item.targetOwnerUserId || 0) === Number(authUser.id || 0)
    && item.details === details
  ));
  if (existing) return existing;
  const report = {
    id: nextId(store, 'reports'),
    reporterUserId,
    targetType: 'other',
    targetId: null,
    targetLabel,
    targetUrl,
    targetOwnerUserId: Number(authUser.id || 0),
    reason: 'Blocked archive upload',
    details,
    status: 'open',
    resolutionNote: '',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    resolvedAt: null,
    resolvedByUserId: null
  };
  store.reports.push(report);
  return report;
}

function adminReportPayload(store, report, viewerUserId = null) {
  if (!report) return null;
  const reporter = store.users.find((item) => Number(item.id) === Number(report.reporterUserId));
  const target = moderationTargetMeta(store, report.targetType, report.targetId) || null;
  const pendingDeletion = findPendingDeletionJob(store, report.targetType, report.targetId);
  return {
    id: report.id,
    reason: report.reason,
    details: report.details,
    status: report.status,
    resolutionNote: report.resolutionNote || '',
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    resolvedAt: report.resolvedAt,
    resolvedByUserId: report.resolvedByUserId,
    reporter: reporter ? publicUser(store, reporter, viewerUserId) : null,
    target: {
      type: report.targetType,
      id: target?.id ?? report.targetId ?? null,
      label: target?.label || report.targetLabel || 'Removed target',
      url: target?.url || report.targetUrl || '',
      targetOwnerUserId: target?.targetOwnerUserId ?? report.targetOwnerUserId ?? null,
      handleCanonical: target?.handleCanonical || null
    },
    pendingDeletion: pendingDeletion ? adminDeletionJobPayload(store, pendingDeletion, viewerUserId) : null
  };
}

function removePostFromStore(store, postId) {
  const post = store.posts.find((item) => Number(item.id) === Number(postId));
  if (!post) return null;
  store.posts = store.posts.filter((item) => Number(item.id) !== Number(post.id));
  store.comments = store.comments.filter((item) => Number(item.postId) !== Number(post.id));
  store.likes = store.likes.filter((item) => Number(item.postId) !== Number(post.id));
  return post;
}

function removeProjectFromStore(store, projectId) {
  const project = store.projects.find((item) => Number(item.id) === Number(projectId));
  if (!project) return null;
  store.projects = store.projects.filter((item) => Number(item.id) !== Number(project.id));
  for (const site of store.sites) {
    if (Number(site.projectId) === Number(project.id)) site.projectId = null;
  }
  return project;
}

function removeSiteFromStore(store, siteId) {
  const site = store.sites.find((item) => Number(item.id) === Number(siteId));
  if (!site) return null;
  removeSiteStoredContent(site);
  store.sites = store.sites.filter((item) => Number(item.id) !== Number(site.id));
  for (const project of store.projects) {
    if (Number(project.siteId) === Number(site.id)) project.siteId = null;
  }
  return site;
}

function removeMessageFromStore(store, messageId) {
  const message = store.messages.find((item) => Number(item.id) === Number(messageId));
  if (!message) return null;
  store.messages = store.messages.filter((item) => Number(item.id) !== Number(message.id));
  store.reactions = ensureArray(store.reactions).filter((item) => Number(item.messageId) !== Number(message.id));
  store.pinnedMessages = ensureArray(store.pinnedMessages).filter((item) => Number(item.messageId) !== Number(message.id));
  return message;
}

function removeUserAccountFromStore(store, userId) {
  const numericUserId = Number(userId);
  const user = store.users.find((item) => Number(item.id) === numericUserId);
  if (!user) return null;
  const deletedPostIds = new Set(store.posts.filter((item) => Number(item.userId) === numericUserId).map((item) => Number(item.id)));
  const deletedMessageIds = new Set(store.messages.filter((item) => Number(item.userId) === numericUserId).map((item) => Number(item.id)));
  store.sessions = store.sessions.filter((item) => Number(item.userId) !== numericUserId);
  removeAccountSwitchGrantsForUser(store, numericUserId);
  store.likes = store.likes.filter((item) => Number(item.userId) !== numericUserId && !deletedPostIds.has(Number(item.postId)));
  store.comments = store.comments.filter((item) => Number(item.userId) !== numericUserId && !deletedPostIds.has(Number(item.postId)));
  store.posts = store.posts.filter((item) => Number(item.userId) !== numericUserId);
  store.messages = store.messages.filter((item) => Number(item.userId) !== numericUserId);
  store.projects = store.projects.filter((item) => Number(item.userId) !== numericUserId);
  for (const site of store.sites.filter((item) => Number(item.userId) === numericUserId && item.htmlPath)) removeSiteStoredContent(site);
  store.sites = store.sites.filter((item) => Number(item.userId) !== numericUserId);
  store.stickerPacks = store.stickerPacks.filter((item) => Number(item.userId) !== numericUserId);
  store.stickers = store.stickers.filter((item) => Number(item.userId) !== numericUserId);
  store.notifications = store.notifications.filter((item) => Number(item.userId) !== numericUserId);
  store.follows = store.follows.filter((item) => Number(item.followerUserId) !== numericUserId && Number(item.targetUserId) !== numericUserId);
  store.friendRequests = store.friendRequests.filter((item) => Number(item.fromUserId) !== numericUserId && Number(item.toUserId) !== numericUserId);
  store.verificationRequests = store.verificationRequests.filter((item) => Number(item.userId) !== numericUserId);
  store.botTokens = ensureArray(store.botTokens).filter((item) => Number(item.userId) !== numericUserId);
  store.readReceipts = ensureArray(store.readReceipts).filter((item) => Number(item.userId) !== numericUserId);
  store.reactions = ensureArray(store.reactions).filter((item) => Number(item.userId) !== numericUserId && !deletedMessageIds.has(Number(item.messageId)));
  store.pinnedMessages = ensureArray(store.pinnedMessages).filter((item) => !deletedMessageIds.has(Number(item.messageId)) && Number(item.pinnedByUserId) !== numericUserId);
  store.reports = ensureArray(store.reports).filter((item) => Number(item.reporterUserId) !== numericUserId && Number(item.targetOwnerUserId) !== numericUserId);
  store.workspaces = store.workspaces.filter((item) => Number(item.ownerUserId) !== numericUserId);
  for (const workspace of store.workspaces) {
    workspace.memberIds = workspace.memberIds.filter((id) => Number(id) !== numericUserId);
    delete workspace.memberRoles[String(numericUserId)];
  }
  for (const room of store.rooms) {
    room.memberIds = room.memberIds.filter((id) => Number(id) !== numericUserId);
    delete room.memberRoles[String(numericUserId)];
    room.archivedByUserIds = room.archivedByUserIds.filter((id) => Number(id) !== numericUserId);
    room.pinnedByUserIds = room.pinnedByUserIds.filter((id) => Number(id) !== numericUserId);
    room.mutedByUserIds = room.mutedByUserIds.filter((id) => Number(id) !== numericUserId);
  }
  store.rooms = store.rooms.filter((room) => room.memberIds.length > 0);
  store.users = store.users.filter((item) => Number(item.id) !== numericUserId);
  return user;
}

const DELETION_GRACE_MS = 24 * 60 * 60 * 1000;

function ensureDeletionJobs(store) {
  if (!store.deletionJobs) store.deletionJobs = [];
  if (!store.seq.deletionJobs) store.seq.deletionJobs = 0;
}

function normalizeDeletionTargetType(value) {
  return ['user', 'post', 'site', 'project', 'message'].includes(value) ? value : null;
}

function findPendingDeletionJob(store, targetType, targetId) {
  ensureDeletionJobs(store);
  const type = normalizeDeletionTargetType(targetType);
  const numericTargetId = Number(targetId || 0);
  if (!type || !numericTargetId) return null;
  return ensureArray(store.deletionJobs).find((job) => job.targetType === type && Number(job.targetId) === numericTargetId) || null;
}

function adminDeletionJobPayload(store, job, viewerUserId = null) {
  if (!job) return null;
  const scheduledBy = store.users.find((item) => Number(item.id) === Number(job.scheduledByUserId));
  const target = moderationTargetMeta(store, job.targetType, job.targetId) || null;
  return {
    id: job.id,
    targetType: job.targetType,
    targetId: Number(target?.id || job.targetId || 0),
    target: {
      type: job.targetType,
      id: Number(target?.id || job.targetId || 0),
      label: target?.label || job.targetLabel || 'Removed target',
      url: target?.url || job.targetUrl || '',
      targetOwnerUserId: target?.targetOwnerUserId ?? job.targetOwnerUserId ?? null
    },
    createdAt: job.createdAt,
    updatedAt: job.updatedAt || job.createdAt,
    deleteAfter: job.deleteAfter,
    note: job.note || '',
    scheduledBy: scheduledBy ? publicUser(store, scheduledBy, viewerUserId) : null
  };
}

function scheduleDeletionJob(store, targetType, targetId, actorUserId, note = '') {
  ensureDeletionJobs(store);
  const type = normalizeDeletionTargetType(targetType);
  const target = moderationTargetMeta(store, type, targetId);
  if (!type || !target?.id) return null;
  const existing = findPendingDeletionJob(store, type, target.id);
  if (existing) return existing;
  const createdAt = nowIso();
  const job = {
    id: nextId(store, 'deletionJobs'),
    targetType: type,
    targetId: Number(target.id),
    targetLabel: target.label || '',
    targetUrl: target.url || '',
    targetOwnerUserId: target.targetOwnerUserId ?? null,
    createdAt,
    updatedAt: createdAt,
    deleteAfter: new Date(Date.now() + DELETION_GRACE_MS).toISOString(),
    scheduledByUserId: Number(actorUserId || 0),
    note: sanitizeText(note || '', 300)
  };
  store.deletionJobs.push(job);
  return job;
}

function restoreDeletionJob(store, jobId) {
  ensureDeletionJobs(store);
  const index = ensureArray(store.deletionJobs).findIndex((job) => Number(job.id) === Number(jobId));
  if (index < 0) return null;
  const [job] = store.deletionJobs.splice(index, 1);
  return job || null;
}

function performDeletionJob(store, job) {
  const type = normalizeDeletionTargetType(job?.targetType);
  if (!type) return false;
  if (type === 'post') return Boolean(removePostFromStore(store, job.targetId));
  if (type === 'site') return Boolean(removeSiteFromStore(store, job.targetId));
  if (type === 'project') return Boolean(removeProjectFromStore(store, job.targetId));
  if (type === 'user') return Boolean(removeUserAccountFromStore(store, job.targetId));
  if (type === 'message') return Boolean(removeMessageFromStore(store, job.targetId));
  return false;
}

function runDeletionMaintenance(store) {
  ensureDeletionJobs(store);
  const now = Date.now();
  const keep = [];
  let changed = false;
  for (const job of ensureArray(store.deletionJobs)) {
    const dueAt = new Date(job.deleteAfter || 0).getTime();
    if (!Number.isFinite(dueAt) || dueAt > now) {
      keep.push(job);
      continue;
    }
    performDeletionJob(store, job);
    changed = true;
  }
  if (keep.length !== store.deletionJobs.length) {
    store.deletionJobs = keep;
    changed = true;
  }
  return changed;
}

function userSiteLimit(user) {
  if (isOperatorUser(user)) return Infinity;
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
  const viewer = authUserId ? (store.users.find((item) => Number(item.id) === Number(authUserId)) || null) : null;
  const author = store.users.find((item) => Number(item.id) === Number(room.createdByUserId));
  const workspace = room.workspaceId ? store.workspaces.find((item) => Number(item.id) === Number(room.workspaceId)) : null;
  const visibleMessages = viewer ? visibleRoomMessagesForUser(store, room.id, viewer, room.slug) : store.messages.filter((item) => Number(item.roomId) === Number(room.id));
  const messageCount = visibleMessages.length;
  const lastMessage = visibleMessages.sort((a, b) => sortDateDesc(a, b))[0] || null;
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
    lastMessagePreview: (lastMessage && !premiumLocked)
      ? (lastMessage.deletedAt ? '[deleted]' : (lastMessage.encrypted ? 'Encrypted message' : (lastMessage.body || (lastMessage.attachment?.name ? `[${lastMessage.attachment.name}]` : ''))))
      : ''
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
    attachment: message.deletedAt ? null : sanitizeAttachment(message.attachment || null),
    attachments: message.deletedAt ? [] : sanitizeAttachmentList(message.attachments),
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

function resolveSiteAssetUrl(raw, origin = APP_ORIGIN) {
  const value = String(raw || '').trim();
  if (!value) return '';
  if (/^(https?:\/\/|data:image\/)/i.test(value)) return value;
  if (value.startsWith('/')) return `${origin.replace(/\/+$/, '')}${value}`;
  return '';
}

function siteBundledAssetUrl(owner, site, raw = '') {
  const relativePath = safeSiteBundlePath(raw);
  if (!relativePath || !siteUsesBundle(site)) return '';
  return uploadedSitePublicUrl(owner, site, relativePath);
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
  const origin = site?.mode === 'upload' ? (UPLOADED_SITES_ORIGIN || APP_ORIGIN) : APP_ORIGIN;
  const ownerHandle = owner?.handleCanonical || canonicalHandle(owner?.handle || '');
  const canonicalFallback = site?.mode === 'upload'
    ? uploadedSitePublicUrl(owner, site)
    : `${APP_ORIGIN}/@${ownerHandle}/${site.slug}`;
  const canonicalRaw = config.canonicalUrl || (site?.mode === 'upload' ? uploadedSiteBasePath(owner, site) : `/@${ownerHandle}/${site.slug}`);
  const canonical = resolveSiteAssetUrl(canonicalRaw, origin) || canonicalFallback;
  const titlePlain = config.seoTitle || site.title || 'Creator site';
  const descriptionPlain = config.seoDescription || site.summary || config.body || `A creator site by @${ownerHandle} on ${BRAND_WORDMARK}.`;
  const indexingMode = config.indexingMode === 'index'
    ? 'index, follow, max-image-preview:large'
    : config.indexingMode === 'noindex'
      ? 'noindex, follow'
      : (siteAppearsInPublicDirectory(site) ? 'index, follow, max-image-preview:large' : 'noindex, follow');
  const iconUrl = siteIconUrl(store, site, owner, innerHtml);
  const resolvedIcon = resolveSiteAssetUrl(iconUrl, origin) || `${origin}/logo.png`;
  const ogImageUrl = config.ogImageUrl || iconUrl || `${origin}/logo.png`;
  const resolvedOgImage = resolveSiteAssetUrl(ogImageUrl, origin) || `${origin}/logo.png`;
  const legalName = config.legalName || owner?.displayName || ownerHandle || BRAND_WORDMARK;
  const ownerProfileUrl = `${APP_ORIGIN}/@${ownerHandle}`;
  const publisher = {
    '@type': config.schemaType,
    name: legalName,
    url: ownerProfileUrl
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
    jsonLd,
    ownerName: escapeHtmlValue(owner?.displayName || ownerHandle || 'Creator'),
    ownerProfilePath: `/@${ownerHandle}`,
    ownerProfileUrl,
    launchSummary: escapeHtmlValue(site.summary || config.body || 'This creator site runs on a separate site-hosting origin from the main platform.'),
    launchWarning: 'This site keeps its own layout, navigation and JavaScript. It is separated from the main app origin, so some platform controls may not appear inside it.',
    launchEnvironment: 'You are about to open a creator-managed site hosted separately from the main justbreath app.'
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
      security: {
        hasPublicKey: Boolean(user.security?.publicKeyJwk),
        hasPassword: Boolean(user.passwordHash)
      }
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
          coverSticker: pack.coverStickerId ? stickerById(store, pack.coverStickerId) : null,
          stickers: store.stickers.filter((item) => Number(item.packId) === Number(pack.id)).map((item) => stickerById(store, item.id))
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

function readSwitchDeviceToken(req) {
  return cookie.parse(req.headers.cookie || '')[SWITCH_DEVICE_COOKIE] || '';
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

function requestForwardedValue(req, headerName, fallback = '') {
  const raw = String(req.get(headerName) || fallback || '').split(',')[0].trim();
  return raw;
}

function requestProto(req) {
  return requestForwardedValue(req, 'x-forwarded-proto', req.secure ? 'https' : 'http') || 'http';
}

function requestHost(req) {
  return requestForwardedValue(req, 'x-forwarded-host', req.get('host') || `localhost:${PORT}`).toLowerCase();
}

function requestOrigin(req) {
  return `${requestProto(req)}://${requestHost(req)}`;
}

function hostMatchesOrigin(host = '', origin = '') {
  return String(host || '').trim().toLowerCase() === originHost(origin);
}

function isUploadedSiteOriginRequest(req) {
  return UPLOADED_SITES_ISOLATION_ENABLED && hostMatchesOrigin(requestHost(req), UPLOADED_SITES_ORIGIN);
}

function cookieSecure(req) {
  return requestProto(req) === 'https';
}

function sessionCookieOptions(req, maxAgeMs) {
  return { httpOnly: true, sameSite: 'lax', secure: cookieSecure(req), path: '/', maxAge: Math.floor(maxAgeMs / 1000) };
}

function switchDeviceCookieOptions(req, maxAgeMs) {
  return { httpOnly: true, sameSite: 'lax', secure: cookieSecure(req), path: '/', maxAge: Math.floor(maxAgeMs / 1000) };
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
  appendSetCookie(res, cookie.serialize(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: cookieSecure(req), path: '/', maxAge: 0 }));
}

function setSwitchDeviceCookie(req, res, token) {
  appendSetCookie(res, cookie.serialize(SWITCH_DEVICE_COOKIE, token, switchDeviceCookieOptions(req, SWITCH_GRANT_TTL_MS)));
}

function clearSwitchDeviceCookie(req, res) {
  appendSetCookie(res, cookie.serialize(SWITCH_DEVICE_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: cookieSecure(req), path: '/', maxAge: 0 }));
}

function ensureSwitchDeviceToken(req, res) {
  const current = sanitizeText(readSwitchDeviceToken(req), 120);
  if (current) {
    setSwitchDeviceCookie(req, res, current);
    return current;
  }
  const token = createToken();
  setSwitchDeviceCookie(req, res, token);
  return token;
}

function switchDeviceHash(token = '') {
  return hashToken(`switch:${token}`);
}

function cleanupAccountSwitchGrants(store) {
  const now = Date.now();
  const validUserIds = new Set(store.users.map((user) => Number(user.id)));
  store.accountSwitchGrants = ensureArray(store.accountSwitchGrants).filter((grant) => {
    if (!grant?.id || !grant?.deviceHash || !grant?.userId) return false;
    if (!validUserIds.has(Number(grant.userId))) return false;
    return new Date(grant.expiresAt || 0).getTime() > now;
  });
}

function removeAccountSwitchGrantsForUser(store, userId) {
  const numericUserId = Number(userId || 0);
  store.accountSwitchGrants = ensureArray(store.accountSwitchGrants).filter((grant) => Number(grant.userId) !== numericUserId);
}

function rememberUserForDevice(req, res, store, userId) {
  const numericUserId = Number(userId || 0);
  const user = store.users.find((item) => Number(item.id) === numericUserId);
  if (!user || isGuestUser(user)) return null;
  cleanupAccountSwitchGrants(store);
  const deviceToken = ensureSwitchDeviceToken(req, res);
  const deviceHash = switchDeviceHash(deviceToken);
  const now = nowIso();
  let grant = store.accountSwitchGrants.find((item) => item.deviceHash === deviceHash && Number(item.userId) === numericUserId);
  if (!grant) {
    grant = { id: createToken(), deviceHash, userId: numericUserId, createdAt: now, updatedAt: now, lastUsedAt: now, expiresAt: futureIso(SWITCH_GRANT_TTL_MS) };
    store.accountSwitchGrants.push(grant);
  } else {
    grant.updatedAt = now;
    grant.lastUsedAt = now;
    grant.expiresAt = futureIso(SWITCH_GRANT_TTL_MS);
  }
  const sameDevice = store.accountSwitchGrants
    .filter((item) => item.deviceHash === deviceHash)
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
  const keepIds = new Set(sameDevice.slice(0, 8).map((item) => item.id));
  store.accountSwitchGrants = store.accountSwitchGrants.filter((item) => item.deviceHash !== deviceHash || keepIds.has(item.id));
  return grant;
}

function savedAccountsPayload(store, req, currentUserId = null) {
  cleanupAccountSwitchGrants(store);
  const deviceToken = sanitizeText(readSwitchDeviceToken(req), 120);
  if (!deviceToken) return [];
  const deviceHash = switchDeviceHash(deviceToken);
  return store.accountSwitchGrants
    .filter((grant) => grant.deviceHash === deviceHash)
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .map((grant) => {
      const user = store.users.find((item) => Number(item.id) === Number(grant.userId));
      if (!user || user.bannedAt) return null;
      return {
        id: user.id,
        grantId: grant.id,
        handle: user.handle,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        avatarText: avatarText(user.displayName || user.handle),
        email: user.email || '',
        current: Number(currentUserId || 0) === Number(user.id)
      };
    })
    .filter(Boolean);
}

function removeSavedAccountGrant(store, req, grantId = '') {
  const deviceToken = sanitizeText(readSwitchDeviceToken(req), 120);
  if (!deviceToken) return false;
  const deviceHash = switchDeviceHash(deviceToken);
  const before = ensureArray(store.accountSwitchGrants).length;
  store.accountSwitchGrants = ensureArray(store.accountSwitchGrants).filter((grant) => !(grant.deviceHash === deviceHash && grant.id === grantId));
  return store.accountSwitchGrants.length !== before;
}

function setGoogleOAuthCookie(req, res, payload) {
  const value = Buffer.from(JSON.stringify(payload)).toString('base64url');
  appendSetCookie(res, cookie.serialize(GOOGLE_OAUTH_COOKIE, value, sessionCookieOptions(req, GOOGLE_OAUTH_TTL_MS)));
}

function clearGoogleOAuthCookie(req, res) {
  appendSetCookie(res, cookie.serialize(GOOGLE_OAUTH_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: cookieSecure(req), path: '/', maxAge: 0 }));
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
  appendSetCookie(res, cookie.serialize(DISCORD_OAUTH_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: cookieSecure(req), path: '/', maxAge: 0 }));
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
  const requestUrl = requestOrigin(req);
  if (isUploadedSiteOriginRequest(req)) return UPLOADED_SITES_ORIGIN || requestUrl;
  if (isLoopbackHost(requestHost(req))) return requestUrl;
  return APP_ORIGIN || requestUrl;
}

function googleCallbackUrl(req) {
  return GOOGLE_REDIRECT_URI || `${requestBaseUrl(req)}/api/auth/google/callback`;
}

function adsenseHeadSnippet() {
  if (!ADSENSE_CLIENT_ID) return '';
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}" crossorigin="anonymous"></script>`;
}

const app = express();
app.disable('x-powered-by');
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

function requestClientIp(req) {
  return String(req.ip || req.socket.remoteAddress || requestForwardedValue(req, 'x-real-ip', 'unknown') || 'unknown').split(',')[0].trim() || 'unknown';
}

function rateLimitKey(req, prefix, subject = '') {
  const normalizedSubject = String(subject || '').trim().toLowerCase();
  const subjectHash = normalizedSubject ? `:${hashToken(normalizedSubject).slice(0, 16)}` : '';
  return `${prefix}:${requestClientIp(req)}${subjectHash}`;
}

function requestHasTrustedWriteOrigin(req) {
  const origin = String(req.get('origin') || '').trim();
  const referer = String(req.get('referer') || '').trim();
  const base = requestBaseUrl(req);
  if (origin) return origin === base;
  if (referer) return referer.startsWith(`${base}/`);
  return true;
}

function isUploadedSitePathRequest(req) {
  return /^\/@[^/]+\/[^/]+(?:\/.*)?$/.test(String(req.path || ''));
}

app.use(express.json({ limit: '1gb' }));
app.use((req, res, next) => {
  const siteOriginRequest = isUploadedSiteOriginRequest(req);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (siteOriginRequest) {
    res.setHeader('Referrer-Policy', 'strict-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Origin-Agent-Cluster', '?1');
    if (cookieSecure(req)) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    if (APP_ORIGIN) {
      res.setHeader('Content-Security-Policy', `frame-ancestors ${APP_ORIGIN}`);
    }
    return next();
  }
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  res.setHeader('Origin-Agent-Cluster', '?1');
  if (cookieSecure(req)) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  const frameSrc = [
    "'self'",
    'https://www.googletagmanager.com',
    'https://pagead2.googlesyndication.com',
    'https://googleads.g.doubleclick.net',
    'https://tpc.googlesyndication.com',
    'https://ep1.adtrafficquality.google',
    'https://ep2.adtrafficquality.google',
    'https://www.google.com',
    'https://fundingchoicesmessages.google.com'
  ];
  if (UPLOADED_SITES_ISOLATION_ENABLED) frameSrc.push(UPLOADED_SITES_ORIGIN);
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagservices.com https://www.googletagmanager.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' data: blob: https:",
    "connect-src 'self' https://api.giphy.com https://discord.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://csi.gstatic.com https://www.google.com https://fundingchoicesmessages.google.com",
    `frame-src ${frameSrc.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; '));
  next();
});

app.use((req, res, next) => {
  if (!isUploadedSiteOriginRequest(req)) return next();
  if (req.path.startsWith('/media/')) return next();
  if (isUploadedSitePathRequest(req)) return next();
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API is not served from the uploaded-site host.' });
  }
  if (['GET', 'HEAD'].includes(req.method)) {
    return res.redirect(308, `${APP_ORIGIN}${req.originalUrl}`);
  }
  return res.status(404).type('text/plain').send('Uploaded site host serves creator sites only.');
});

app.use((req, res, next) => {
  if (!req.path.startsWith('/api/')) return next();
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
  if (requestHasTrustedWriteOrigin(req)) return next();
  return res.status(403).json({ error: 'Cross-site write request blocked.' });
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

app.post('/api/admin/maintenance', requireAuth, requireOwner, (req, res) => {
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
    rememberUserForDevice(req, res, store, user.id);
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
    rememberUserForDevice(req, res, store, user.id);
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
  const ip = requestClientIp(req);
  if (rateLimit(rateLimitKey(req, 'reg', sanitizeText(req.body?.email || '', 120)), 3)) return res.status(429).json({ error: 'Too many registrations from this IP. Try again later.' });
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
  createSessionForUser(req, res, store, user.id);
  rememberUserForDevice(req, res, store, user.id);
  saveStore(store);
  res.status(201).json({ user: mePayload(store, user).user });
});

app.post('/api/auth/login', (req, res) => {
  if (rateLimit(rateLimitKey(req, 'login', sanitizeText(req.body?.identity || '', 120)), 10)) return res.status(429).json({ error: 'Too many login attempts. Try again in a minute.' });
  const store = loadStore();
  const identity = sanitizeText(req.body?.identity || '', 120).toLowerCase();
  const password = String(req.body?.password || '');
  if (!identity || !password) return res.status(400).json({ error: 'Fill in every required field.' });
  const user = store.users.find((item) => item.handleCanonical === canonicalHandle(identity) || String(item.email || '').toLowerCase() === identity);
  if (!user || !user.passwordHash || !bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid credentials.' });
  if (user.bannedAt) return res.status(403).json({ error: 'This account has been suspended.' });
  createSessionForUser(req, res, store, user.id);
  rememberUserForDevice(req, res, store, user.id);
  saveStore(store);
  res.json({ user: mePayload(store, user).user });
});


app.post('/api/auth/switch', (req, res) => {
  const store = loadStore();
  const grantId = sanitizeText(req.body?.switchGrantId || '', 128);
  if (!grantId) return res.status(400).json({ error: 'Saved-account grant is required.' });
  cleanupAccountSwitchGrants(store);
  const deviceToken = sanitizeText(readSwitchDeviceToken(req), 120);
  if (!deviceToken) return res.status(401).json({ error: 'This device is not authorized for account switching.' });
  const grant = store.accountSwitchGrants.find((entry) => entry.id === grantId && entry.deviceHash === switchDeviceHash(deviceToken));
  if (!grant) return res.status(401).json({ error: 'Saved account not found on this device.' });
  const user = store.users.find((item) => Number(item.id) === Number(grant.userId));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (user.bannedAt) return res.status(403).json({ error: 'This account has been suspended.' });
  createSessionForUser(req, res, store, user.id);
  rememberUserForDevice(req, res, store, user.id);
  saveStore(store);
  res.json({ user: mePayload(store, user).user });
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

app.delete('/api/auth/saved-accounts/:grantId', (req, res) => {
  const store = loadStore();
  cleanupAccountSwitchGrants(store);
  const removed = removeSavedAccountGrant(store, req, sanitizeText(req.params.grantId || '', 128));
  if (removed) saveStore(store);
  const remaining = savedAccountsPayload(store, req, req.authUser?.id || null);
  if (!remaining.length) clearSwitchDeviceCookie(req, res);
  res.json({ ok: removed, savedAccounts: remaining });
});

app.get('/api/bootstrap', (req, res) => {
  const store = loadStore();
  const viewerId = req.authUser?.id || null;
  const publicUsers = store.users
    .filter((user) => userAppearsInPublicDirectory(user, viewerId))
    .map((user) => publicUser(store, user, viewerId))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  const publicProjects = store.projects.filter((item) => item.visibility === 'public').map((item) => publicProject(store, item, viewerId)).sort((a, b) => sortDateDesc(a, b, 'updatedAt'));
  const publicSites = store.sites.filter((item) => siteAppearsInPublicDirectory(item)).map((item) => publicSite(store, item, viewerId)).sort((a, b) => sortDateDesc(a, b, 'updatedAt'));
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
    savedAccounts: savedAccountsPayload(store, req, viewerId),
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
  const userList = store.users
    .filter((user) => userAppearsInPublicDirectory(user, viewerId))
    .map((user) => publicUser(store, user, viewerId))
    .filter(Boolean);
  const projectList = store.projects.filter((item) => item.visibility === 'public').map((item) => publicProject(store, item, viewerId));
  const siteList = store.sites.filter((item) => siteAppearsInPublicDirectory(item)).map((item) => publicSite(store, item, viewerId));
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
  if (!userCanOpenPublicProfile(user, req.authUser?.id)) return res.status(404).json({ error: 'Profile not found.' });
  const profile = publicUser(store, user, req.authUser?.id);
  const projects = store.projects.filter((item) => Number(item.userId) === Number(user.id) && item.visibility === 'public').map((item) => publicProject(store, item, req.authUser?.id));
  const sites = store.sites.filter((item) => Number(item.userId) === Number(user.id) && siteAppearsInPublicDirectory(item)).map((item) => publicSite(store, item, req.authUser?.id));
  const posts = store.posts.filter((item) => Number(item.userId) === Number(user.id) && item.status === 'published').map((item) => publicPost(store, item, req.authUser?.id)).sort((a, b) => sortDateDesc(a, b, 'publishedAt'));
  const verification = store.verificationRequests.filter((item) => Number(item.userId) === Number(user.id)).sort((a, b) => sortDateDesc(a, b))[0] || null;
  res.json({ profile, projects, sites, posts, verification, canMessage: req.authUser ? profile.relation?.following || user.privacy.allowDirectMessages !== 'followers' : false });
});

app.get('/api/public/profile/:handle/relations', (req, res) => {
  const store = loadStore();
  const handle = canonicalHandle(req.params.handle);
  const user = store.users.find((item) => item.handleCanonical === handle);
  if (!user) return res.status(404).json({ error: 'Profile not found.' });
  if (!userAppearsInPublicDirectory(user, req.authUser?.id)) return res.status(404).json({ error: 'Profile not found.' });
  const kind = String(req.query.kind || 'followers');
  const viewerId = req.authUser?.id || null;
  let list = [];
  if (kind === 'followers') {
    list = store.follows.filter((f) => Number(f.targetUserId) === Number(user.id))
      .map((f) => publicUser(store, store.users.find((u) => Number(u.id) === Number(f.followerUserId)), viewerId))
      .filter((item) => item && userAppearsInPublicDirectory(store.users.find((u) => Number(u.id) === Number(item.id)), viewerId));
  } else if (kind === 'following') {
    list = store.follows.filter((f) => Number(f.followerUserId) === Number(user.id))
      .map((f) => publicUser(store, store.users.find((u) => Number(u.id) === Number(f.targetUserId)), viewerId))
      .filter((item) => item && userAppearsInPublicDirectory(store.users.find((u) => Number(u.id) === Number(item.id)), viewerId));
  } else if (kind === 'friends') {
    const friendIds = store.friendRequests
      .filter((r) => r.status === 'accepted' && (Number(r.fromUserId) === Number(user.id) || Number(r.toUserId) === Number(user.id)))
      .map((r) => Number(r.fromUserId) === Number(user.id) ? Number(r.toUserId) : Number(r.fromUserId));
    list = friendIds
      .filter((id) => userAppearsInPublicDirectory(store.users.find((u) => Number(u.id) === Number(id)), viewerId))
      .map((id) => publicUser(store, store.users.find((u) => Number(u.id) === id), viewerId))
      .filter(Boolean);
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
  let items = store.sites.filter((item) => siteAppearsInPublicDirectory(item)).map((item) => publicSite(store, item, req.authUser?.id));
  if (q) items = items.filter((item) => [item.title, item.summary, item.owner?.displayName, item.owner?.handle].join(' ').toLowerCase().includes(q));
  if (sort === 'popularity') items.sort((a, b) => (b.owner?.score || 0) - (a.owner?.score || 0));
  else items.sort((a, b) => sortDateDesc(a, b, 'updatedAt'));
  res.json({ items });
});

app.get('/api/chat/bootstrap', requireAuth, (req, res) => {
  const store = loadStore();
  const userId = req.authUser.id;
  const selfSlug = `dm-personal-${canonicalHandle(req.authUser.handle)}--self`;
  if (!store.rooms.some((room) => room.kind === 'direct' && room.surface === 'personal' && room.slug === selfSlug)) {
    store.rooms.push(roomDefaults({
      id: nextId(store, 'rooms'),
      workspaceId: null,
      slug: selfSlug,
      title: 'Saved messages',
      description: 'Personal saved messages',
      kind: 'direct',
      surface: 'personal',
      visibility: 'private',
      createdByUserId: userId,
      ownerUserId: userId,
      memberIds: [Number(userId)],
      memberRoles: { [userId]: 'owner' },
      tags: ['dm', 'self'],
      createdAt: nowIso(),
      updatedAt: nowIso(),
      lastActivityAt: nowIso()
    }));
    saveStore(store);
  }
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
  const requestedReplyToId = Number(req.body?.replyToId || 0);
  const attachmentName = sanitizeText(req.body?.attachmentName, 90);
  const attachmentDataUrl = safeDataUrl(req.body?.attachmentDataUrl, CHAT_MEDIA_UPLOAD_LIMIT_BYTES * 2, ['image', 'audio', 'video']);
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
      const dataUrl = safeDataUrl(raw.dataUrl, CHAT_MEDIA_UPLOAD_LIMIT_BYTES * 2, ['image', 'audio', 'video']);
      if (!dataUrl) continue;
      const isAudio = raw.type === 'audio' || /^data:audio\//.test(dataUrl);
      const isVideo = raw.type === 'video' || /^data:video\//.test(dataUrl);
      const stored = isAudio
        ? saveDataAudio(dataUrl, `voice-${room.id}`)
        : isVideo
          ? saveDataVideo(dataUrl, `video-${room.id}`)
          : saveDataImage(dataUrl, `chat-${room.id}`);
      if (!stored) continue;
      attachments.push({
        name: rawName || (isAudio ? 'Voice message' : isVideo ? 'Video' : 'Image'),
        url: stored,
        type: isAudio ? 'audio' : isVideo ? 'video' : 'image',
        width: Number(raw.width || 0),
        height: Number(raw.height || 0),
        duration: Number(raw.duration || 0),
        voice: Boolean(raw.voice)
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
      const isVideo = attachmentType === 'video' || /^data:video\//.test(attachmentDataUrl);
      const stored = isAudio
        ? saveDataAudio(attachmentDataUrl, `voice-${room.id}`)
        : isVideo
          ? saveDataVideo(attachmentDataUrl, `video-${room.id}`)
          : saveDataImage(attachmentDataUrl, `chat-${room.id}`);
      if (stored) {
        attachment = {
          name: attachmentName || (isAudio ? 'Voice message' : isVideo ? 'Video' : 'Image'),
          url: stored,
          type: isAudio ? 'audio' : isVideo ? 'video' : 'image',
          width: Number(req.body?.attachmentWidth || 0),
          height: Number(req.body?.attachmentHeight || 0),
          duration: Number(req.body?.attachmentDuration || 0),
          voice: Boolean(req.body?.attachmentVoice)
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
  const replyTarget = requestedReplyToId > 0
    ? store.messages.find((item) => Number(item.id) === requestedReplyToId && Number(item.roomId) === Number(room.id))
    : null;
  const message = messageDefaults({
    id: nextId(store, 'messages'),
    roomId: room.id,
    userId: req.authUser.id,
    replyToId: replyTarget?.id || null,
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
  const selfRoom = Number(target.id) === Number(req.authUser.id);
  const allowDM = String(target.privacy?.allowDirectMessages || 'everyone');
  if (allowDM === 'nobody') return res.status(403).json({ error: 'This user is not accepting direct messages.' });
  if (allowDM === 'followers' && !followsUser(store, req.authUser.id, target.id) && Number(req.authUser.id) !== Number(target.id)) return res.status(403).json({ error: 'Follow this user before starting a direct message.' });
  const members = selfRoom
    ? [Number(req.authUser.id)]
    : [Number(req.authUser.id), Number(target.id)].sort((a, b) => a - b);
  const memberSet = new Set(members);
  const slug = selfRoom
    ? `dm-${surface}-${canonicalHandle(req.authUser.handle)}--self`
    : `dm-${surface}-${[canonicalHandle(req.authUser.handle), target.handleCanonical].sort().join('--')}`;
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
      title: selfRoom ? 'Saved messages' : target.displayName,
      description: selfRoom
        ? (surface === 'work' ? 'Personal workspace notes' : 'Personal saved messages')
        : (surface === 'work' ? 'Work direct chat' : 'Personal direct chat'),
      kind: 'direct',
      surface,
      visibility: 'private',
      createdByUserId: req.authUser.id,
      ownerUserId: req.authUser.id,
      memberIds: members,
      memberRoles: selfRoom ? { [req.authUser.id]: 'owner' } : { [req.authUser.id]: 'owner', [target.id]: 'member' },
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
    chatThemesByRoom: sanitizeChatThemeMap(user.settings.chatThemesByRoom),
    hiddenMessageIdsByRoom: sanitizeHiddenMessageMap(user.settings.hiddenMessageIdsByRoom)
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
  if (!user.passwordHash) {
    return res.status(400).json({ error: 'Set a justbreath password first. Discord/Google passwords cannot be used here.' });
  }
  if (!password) return res.status(400).json({ error: 'Password is required.' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(400).json({ error: 'Incorrect password.' });
  removeUserAccountFromStore(store, user.id);
  saveStore(store);
  clearSessionCookie(req, res);
  res.json({ ok: true });
});

app.post('/api/reports', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  if (!store.reports) store.reports = [];
  if (!store.seq.reports) store.seq.reports = 0;
  const targetType = normalizeReportTargetType(String(req.body?.targetType || '').toLowerCase());
  const targetId = req.body?.targetId === null || req.body?.targetId === undefined || req.body?.targetId === ''
    ? null
    : Number(req.body.targetId || 0);
  const reason = sanitizeText(req.body?.reason || '', 60);
  const details = sanitizeText(req.body?.details || '', 1600);
  if (!reason) return res.status(400).json({ error: 'Reason is required.' });
  let target = null;
  if (targetType === 'other') {
    target = {
      type: 'other',
      id: null,
      label: sanitizeText(req.body?.targetLabel || 'Other content', 180),
      url: sanitizeText(req.body?.targetUrl || '', 320),
      targetOwnerUserId: null,
      handleCanonical: null
    };
  } else {
    if (!targetId) return res.status(400).json({ error: 'Target is required.' });
    target = moderationTargetMeta(store, targetType, targetId);
    if (!target) return res.status(404).json({ error: 'Target not found.' });
    if (Number(target.targetOwnerUserId || 0) === Number(req.authUser.id)) {
      return res.status(400).json({ error: 'You cannot report your own content.' });
    }
  }
  const duplicate = store.reports.find((item) => (
    Number(item.reporterUserId) === Number(req.authUser.id)
    && item.status === 'open'
    && item.targetType === target.type
    && Number(item.targetId || 0) === Number(target.id || 0)
  ));
  if (duplicate) return res.status(409).json({ error: 'You already sent a report for this target.' });
  const report = {
    id: nextId(store, 'reports'),
    reporterUserId: Number(req.authUser.id),
    targetType: target.type,
    targetId: target.id ?? null,
    targetLabel: target.label || '',
    targetUrl: target.url || '',
    targetOwnerUserId: target.targetOwnerUserId ?? null,
    reason,
    details,
    status: 'open',
    resolutionNote: '',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    resolvedAt: null,
    resolvedByUserId: null
  };
  store.reports.push(report);
  saveStore(store);
  res.status(201).json({ report: adminReportPayload(store, report, req.authUser.id) });
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
    writeSiteStudioText(site, relativePath, req.body?.content || '', { create: true, maxBytes: siteUploadByteLimit(req.authUser) });
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
    writeSiteStudioText(site, relativePath, req.body?.content || '', { create: false, maxBytes: siteUploadByteLimit(req.authUser) });
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

function readArchiveBinaryMeta(req) {
  const raw = String(req.get('x-jb-site-meta') || '').trim();
  if (!raw) return {};
  try {
    return ensureObject(JSON.parse(decodeURIComponent(raw)));
  } catch {
    const err = new Error('Archive metadata header is invalid.');
    err.statusCode = 400;
    throw err;
  }
}

async function streamArchiveRequestToTempFile(req, options = {}) {
  const limitBytes = Number.isFinite(options.limitBytes) ? Number(options.limitBytes) : OPERATOR_SITE_ZIP_LIMIT_BYTES;
  const contentLength = Number(req.get('content-length') || 0);
  const declaredBytes = Number(req.get('x-jb-archive-bytes') || 0);
  if (Number.isFinite(contentLength) && contentLength > limitBytes) {
    const err = new Error(`Archive file must stay under ${archiveLimitLabel(limitBytes)}.`);
    err.statusCode = 413;
    throw err;
  }
  if (Number.isFinite(declaredBytes) && declaredBytes > limitBytes) {
    const err = new Error(`Archive file must stay under ${archiveLimitLabel(limitBytes)}.`);
    err.statusCode = 413;
    throw err;
  }
  const tempRoot = mkdtempSync(path.join(tmpdir(), 'jb-site-upload-'));
  const tempPath = path.join(tempRoot, 'archive.bin');
  const output = createWriteStream(tempPath);
  return await new Promise((resolve, reject) => {
    let totalBytes = 0;
    let settled = false;
    const cleanup = () => {
      req.off('aborted', onAborted);
      req.off('data', onData);
      req.off('end', onEnd);
      req.off('error', onReqError);
      output.off('drain', onDrain);
      output.off('error', onOutputError);
      output.off('finish', onFinish);
    };
    const fail = (error) => {
      if (settled) return;
      settled = true;
      cleanup();
      output.destroy();
      try { rmSync(tempRoot, { recursive: true, force: true }); } catch {}
      reject(error);
    };
    const onAborted = () => {
      const err = new Error('Archive upload was interrupted.');
      err.statusCode = 400;
      fail(err);
    };
    const onReqError = (error) => fail(error);
    const onOutputError = (error) => fail(error);
    const onDrain = () => req.resume();
    const onData = (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > limitBytes) {
        const err = new Error(`Archive file must stay under ${archiveLimitLabel(limitBytes)}.`);
        err.statusCode = 413;
        req.resume();
        fail(err);
        return;
      }
      if (!output.write(chunk)) req.pause();
    };
    const onEnd = () => output.end();
    const onFinish = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve({ tempRoot, tempPath, bytes: totalBytes });
    };
    req.on('aborted', onAborted);
    req.on('data', onData);
    req.on('end', onEnd);
    req.on('error', onReqError);
    output.on('drain', onDrain);
    output.on('error', onOutputError);
    output.on('finish', onFinish);
  });
}

function cleanupTempArchiveUpload(upload) {
  if (!upload?.tempRoot) return;
  try {
    rmSync(upload.tempRoot, { recursive: true, force: true });
  } catch {}
}

async function archiveCreatePayload(store, req, rawPayload = {}, archiveBuffer = null) {
  const payload = ensureObject(rawPayload);
  const title = sanitizeText(payload.title, 100);
  const slug = slugify(payload.slug || title);
  if (!title || !slug) throw new Error('Title is required.');
  if (store.sites.some((site) => Number(site.userId) === Number(req.authUser.id) && site.slug === slug)) {
    const err = new Error('That site slug already exists.');
    err.statusCode = 409;
    throw err;
  }
  let resolvedArchiveBuffer = archiveBuffer;
  if (!resolvedArchiveBuffer) {
    const archiveBase64 = String(payload.archiveBase64 || payload.zipBase64 || '');
    if (archiveBase64) resolvedArchiveBuffer = Buffer.from(archiveBase64, 'base64');
  }
  if (!resolvedArchiveBuffer?.length) {
    const err = new Error('Archive file data required.');
    err.statusCode = 400;
    throw err;
  }
  const siteId = nextId(store, 'sites');
  const extracted = await extractArchiveSiteBundle(siteId, resolvedArchiveBuffer, payload.archiveName || payload.zipName || '', {
    maxArchiveBytes: siteArchiveByteLimit(req.authUser),
    maxExpandedBytes: siteArchiveExpandedByteLimit(req.authUser)
  });
  return siteDefaults({
    id: siteId,
    userId: req.authUser.id,
    projectId: payload.projectId ? Number(payload.projectId) : null,
    slug,
    title,
    summary: sanitizeText(payload.summary, 240),
    visibility: ['public', 'unlisted', 'private'].includes(payload.visibility) ? payload.visibility : 'public',
    mode: 'upload',
    uploadMode: 'archive',
    htmlPath: extracted.htmlPath,
    bundleRoot: extracted.bundleRoot,
    importReport: extracted.importReport,
    reviewStatus: 'draft',
    templateConfig: sanitizeSiteConfig({
      polishMode: 'none',
      ...ensureObject(payload.templateConfig)
    }),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
}

async function createArchiveSiteFromRequest(store, req) {
  return await archiveCreatePayload(store, req, req.body, null);
}

async function createArchiveSiteFromBinaryRequest(store, req, upload, payload = {}) {
  return await archiveCreatePayload(store, req, payload, readFileSync(upload.tempPath));
}

async function applyArchiveBufferToSite(site, req, archiveBuffer, archiveName = '') {
  const extracted = await extractArchiveSiteBundle(site.id, archiveBuffer, archiveName, {
    maxArchiveBytes: siteArchiveByteLimit(req.authUser),
    maxExpandedBytes: siteArchiveExpandedByteLimit(req.authUser)
  });
  if (site.htmlPath && site.htmlPath !== extracted.htmlPath) removeSiteFile(site.htmlPath);
  site.htmlPath = extracted.htmlPath;
  site.bundleRoot = extracted.bundleRoot;
  site.uploadMode = 'archive';
  site.importReport = extracted.importReport;
}

async function inspectArchiveImport(req, archiveBuffer, archiveName = '') {
  const tempSite = { id: Date.now(), htmlPath: '', bundleRoot: '' };
  const extracted = await extractArchiveSiteBundle(tempSite.id, archiveBuffer, archiveName, {
    maxArchiveBytes: siteArchiveByteLimit(req.authUser),
    maxExpandedBytes: siteArchiveExpandedByteLimit(req.authUser)
  });
  tempSite.htmlPath = extracted.htmlPath;
  tempSite.bundleRoot = extracted.bundleRoot;
  const html = readSiteFile(extracted.htmlPath) || '';
  const diagnostics = uploadedSiteDiagnostics({
    mode: 'upload',
    uploadMode: 'archive',
    htmlPath: extracted.htmlPath,
    bundleRoot: extracted.bundleRoot,
    importReport: extracted.importReport
  }, html);
  removeSiteStoredContent(tempSite);
  return {
    archiveName: sanitizeText(archiveName, 180),
    importReport: extracted.importReport,
    diagnostics
  };
}

function siteImportCapabilitiesPayload(user = null) {
  return {
    htmlLimitBytes: siteUploadByteLimit(user),
    archiveLimitBytes: siteArchiveByteLimit(user),
    archiveExpandedLimitBytes: siteArchiveExpandedByteLimit(user),
    supportedArchiveFormats: ['zip', 'tar', 'tgz', 'tar.gz', '7z'],
    supportedSiteModes: ['single-html', 'archive-package'],
    studioEditableExtensions: Array.from(SITE_STUDIO_EDITABLE_EXTENSIONS),
    notes: [
      'index.html must exist at archive root',
      'server-side and executable files are blocked before publish',
      'local bundled assets and extra pages are supported'
    ]
  };
}

app.post('/api/me/sites/upload', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const userSites = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id));
  const limit = userSiteLimit(req.authUser);
  if (userSites.length >= limit) return res.status(403).json({ error: `You've reached your site limit (\${limit}). Upgrade your plan to create more.`, upgradeRequired: true });
  const title = sanitizeText(req.body?.title, 100);
  const slug = slugify(req.body?.slug || title);
  const htmlContent = String(req.body?.htmlContent || '');
  const htmlLimit = siteUploadByteLimit(req.authUser);
  if (!title || !slug || !htmlContent) return res.status(400).json({ error: 'Title, slug and HTML content are required.' });
  if (Number.isFinite(htmlLimit) && Buffer.byteLength(htmlContent, 'utf8') > htmlLimit) return res.status(400).json({ error: 'The uploaded site must stay under 1 MB.' });
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
    templateConfig: sanitizeSiteConfig({
      polishMode: 'none',
      ...ensureObject(req.body?.templateConfig)
    }),
    htmlPath,
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.sites.push(site);
  saveStore(store);
  res.status(201).json({ site: ownerSiteDetails(store, site, req.authUser.id) });
});

app.delete('/api/me/sites/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  removeSiteFromStore(store, site.id);
  saveStore(store);
  res.json({ ok: true });
});

function applySitePatchFields(site, payload = {}) {
  let touchedContent = false;
  if (payload?.title !== undefined) site.title = sanitizeText(payload.title, 100) || site.title;
  if (payload?.summary !== undefined) site.summary = sanitizeText(payload.summary, 240);
  if (payload?.visibility !== undefined && ['public', 'unlisted', 'private'].includes(payload.visibility)) site.visibility = payload.visibility;
  if (payload?.templateConfig && typeof payload.templateConfig === 'object') {
    touchedContent = true;
    site.templateConfig = sanitizeSiteConfig(payload.templateConfig, site.templateConfig || {});
  }
  return touchedContent;
}

// ── Update site template config ───────────────────────────────────────────────
app.patch('/api/me/sites/:id', requireAuth, requireMember, async (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  let touchedContent = applySitePatchFields(site, req.body);
  if (site.mode === 'upload' && req.body?.archiveBase64) {
    try {
      await applyArchiveBufferToSite(site, req, Buffer.from(String(req.body.archiveBase64 || ''), 'base64'), req.body?.archiveName || '');
      touchedContent = true;
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Could not read archive.' });
    }
  }
  if (site.mode === 'upload' && req.body?.htmlContent !== undefined) {
    const htmlContent = String(req.body.htmlContent || '');
    const htmlLimit = siteUploadByteLimit(req.authUser);
    if (!htmlContent) return res.status(400).json({ error: 'HTML content is required.' });
    if (Number.isFinite(htmlLimit) && Buffer.byteLength(htmlContent, 'utf8') > htmlLimit) return res.status(400).json({ error: 'The uploaded site must stay under 1 MB.' });
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
  res.json({ site: ownerSiteDetails(store, site, req.authUser.id) });
});

app.post('/api/me/sites/upload-archive-binary', requireAuth, requireMember, async (req, res) => {
  if (rateLimit(`site-upload-binary:${req.authUser.id}`, 6)) return res.status(429).json({ error: 'Too many archive uploads. Wait a minute and try again.' });
  const store = loadStore();
  const userSites = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id));
  const limit = userSiteLimit(req.authUser);
  if (userSites.length >= limit) return res.status(403).json({ error: `Site limit reached (\${limit}). Upgrade to create more.`, upgradeRequired: true });
  let upload = null;
  let payload = {};
  try {
    payload = readArchiveBinaryMeta(req);
    upload = await streamArchiveRequestToTempFile(req, { limitBytes: siteArchiveByteLimit(req.authUser) });
    const site = await createArchiveSiteFromBinaryRequest(store, req, upload, payload);
    store.sites.push(site);
    saveStore(store);
    res.status(201).json({ site: ownerSiteDetails(store, site, req.authUser.id) });
  } catch (err) {
    req.resume();
    console.error('[sites/upload-archive-binary]', err.message);
    if (queueBlockedSiteUploadReport(store, req.authUser, err, { action: 'site-upload-binary', archiveName: payload.archiveName || payload.zipName || '' })) saveStore(store);
    res.status(err.statusCode || 400).json({ error: err.message || 'Could not read archive.' });
  } finally {
    cleanupTempArchiveUpload(upload);
  }
});

app.post('/api/me/sites/import-inspect', requireAuth, requireMember, async (req, res) => {
  if (rateLimit(`site-import-inspect:${req.authUser.id}`, 20)) return res.status(429).json({ error: 'Too many import inspections. Wait a minute and try again.' });
  try {
    const archiveBase64 = String(req.body?.archiveBase64 || req.body?.zipBase64 || '');
    const archiveName = sanitizeText(req.body?.archiveName || req.body?.zipName || 'archive.zip', 180);
    if (!archiveBase64) return res.status(400).json({ error: 'Archive file data required.' });
    const inspection = await inspectArchiveImport(req, Buffer.from(archiveBase64, 'base64'), archiveName);
    res.json(inspection);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message || 'Could not inspect archive.' });
  }
});

app.get('/api/me/sites/import-capabilities', requireAuth, (req, res) => {
  res.json(siteImportCapabilitiesPayload(req.authUser));
});

app.get('/api/developers/capabilities', (_req, res) => {
  res.json(siteImportCapabilitiesPayload(null));
});

app.put('/api/me/sites/:id/archive-binary', requireAuth, requireMember, async (req, res) => {
  if (rateLimit(`site-update-binary:${req.authUser.id}`, 6)) return res.status(429).json({ error: 'Too many archive updates. Wait a minute and try again.' });
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  let touchedContent = false;
  let upload = null;
  let payload = {};
  try {
    payload = readArchiveBinaryMeta(req);
    touchedContent = applySitePatchFields(site, payload);
    upload = await streamArchiveRequestToTempFile(req, { limitBytes: siteArchiveByteLimit(req.authUser) });
    await applyArchiveBufferToSite(site, req, readFileSync(upload.tempPath), payload.archiveName || '');
    touchedContent = true;
  } catch (error) {
    req.resume();
    if (queueBlockedSiteUploadReport(store, req.authUser, error, { action: 'site-update-binary', archiveName: payload.archiveName || payload.zipName || '' })) saveStore(store);
    return res.status(error.statusCode || 400).json({ error: error.message || 'Could not read archive.' });
  } finally {
    cleanupTempArchiveUpload(upload);
  }
  if (site.reviewStatus === 'approved' && touchedContent) site.reviewStatus = 'draft';
  site.updatedAt = nowIso();
  saveStore(store);
  res.json({ site: ownerSiteDetails(store, site, req.authUser.id) });
});

// ── Submit site for review ────────────────────────────────────────────────────
app.post('/api/me/sites/:id/submit-review', requireAuth, requireMember, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  if (!siteNeedsLaunchReview(site)) return res.status(400).json({ error: 'Private sites do not need launch approval.' });
  if (site.reviewStatus === 'pending') return res.status(400).json({ error: 'Already submitted for review.' });
  if (site.reviewStatus === 'approved') return res.status(400).json({ error: 'Site is already approved.' });
  site.reviewStatus = 'pending';
  site.updatedAt = nowIso();
  saveStore(store);
  res.json({ site: publicSite(store, site, req.authUser.id) });
});

async function handleSiteArchiveUpload(req, res) {
  if (rateLimit(`site-upload-form:${req.authUser.id}`, 6)) return res.status(429).json({ error: 'Too many archive uploads. Wait a minute and try again.' });
  const store = loadStore();
  const userSites = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id));
  const limit = userSiteLimit(req.authUser);
  if (userSites.length >= limit) return res.status(403).json({ error: `Site limit reached (\${limit}). Upgrade to create more.`, upgradeRequired: true });
  try {
    const site = await createArchiveSiteFromRequest(store, req);
    store.sites.push(site);
    saveStore(store);
    res.status(201).json({ site: ownerSiteDetails(store, site, req.authUser.id) });
  } catch (err) {
    console.error('[sites/upload-archive]', err.message);
    if (queueBlockedSiteUploadReport(store, req.authUser, err, { action: 'site-upload-form', archiveName: req.body?.archiveName || req.body?.zipName || '' })) saveStore(store);
    res.status(err.statusCode || 400).json({ error: err.message || 'Could not read archive.' });
  }
}

app.post('/api/me/sites/upload-archive', requireAuth, requireMember, handleSiteArchiveUpload);
app.post('/api/me/sites/upload-zip', requireAuth, requireMember, handleSiteArchiveUpload);
app.post('/api/me/sites/upload-tar', requireAuth, requireMember, handleSiteArchiveUpload);
app.post('/api/me/sites/upload-tgz', requireAuth, requireMember, handleSiteArchiveUpload);
app.post('/api/me/sites/upload-7z', requireAuth, requireMember, handleSiteArchiveUpload);
app.post('/api/me/sites/upload-bundle', requireAuth, requireMember, handleSiteArchiveUpload);
app.post('/api/me/sites/upload-bundle-binary', requireAuth, requireMember, async (req, res) => {
  const store = loadStore();
  const userSites = store.sites.filter((site) => Number(site.userId) === Number(req.authUser.id));
  const limit = userSiteLimit(req.authUser);
  if (userSites.length >= limit) return res.status(403).json({ error: `Site limit reached (\${limit}). Upgrade to create more.`, upgradeRequired: true });
  let upload = null;
  let payload = {};
  try {
    payload = readArchiveBinaryMeta(req);
    upload = await streamArchiveRequestToTempFile(req, { limitBytes: siteArchiveByteLimit(req.authUser) });
    const site = await createArchiveSiteFromBinaryRequest(store, req, upload, payload);
    store.sites.push(site);
    saveStore(store);
    res.status(201).json({ site: ownerSiteDetails(store, site, req.authUser.id) });
  } catch (err) {
    req.resume();
    if (queueBlockedSiteUploadReport(store, req.authUser, err, { action: 'site-upload-bundle-binary', archiveName: payload.archiveName || payload.zipName || '' })) saveStore(store);
    res.status(err.statusCode || 400).json({ error: err.message || 'Could not read archive.' });
  } finally {
    cleanupTempArchiveUpload(upload);
  }
});

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
  const packs = store.stickerPacks
    .filter((pack) => Number(pack.userId) === Number(req.authUser.id) || Number(pack.userId) === Number(brand?.id))
    .map((pack) => ({
      ...pack,
      coverSticker: pack.coverStickerId ? stickerById(store, pack.coverStickerId) : null,
      stickers: store.stickers.filter((item) => Number(item.packId) === Number(pack.id)).map((item) => stickerById(store, item.id))
    }));
  res.json({ packs });
});

app.post('/api/me/sticker-packs', requireAuth, (req, res) => {
  const store = loadStore();
  const title = sanitizeText(req.body?.title, 80);
  const description = sanitizeText(req.body?.description, 220);
  if (!title) return res.status(400).json({ error: 'Pack title is required.' });
  const pack = stickerPackDefaults({ id: nextId(store, 'stickerPacks'), userId: req.authUser.id, title, description, slug: slugify(req.body?.slug || title), createdAt: nowIso(), updatedAt: nowIso() });
  store.stickerPacks.push(pack);
  saveStore(store);
  res.status(201).json({ pack });
});

app.patch('/api/me/sticker-packs/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const pack = store.stickerPacks.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!pack) return res.status(404).json({ error: 'Pack not found.' });
  const title = sanitizeText(req.body?.title, 80);
  const description = sanitizeText(req.body?.description, 220);
  pack.title = title || pack.title;
  pack.description = description;
  if (req.body?.coverStickerId !== undefined) {
    const coverStickerId = req.body?.coverStickerId ? Number(req.body.coverStickerId) : null;
    const sticker = coverStickerId ? store.stickers.find((item) => Number(item.id) === coverStickerId && Number(item.packId) === Number(pack.id)) : null;
    if (coverStickerId && !sticker) return res.status(400).json({ error: 'Cover sticker must belong to this pack.' });
    pack.coverStickerId = sticker ? sticker.id : null;
  }
  pack.updatedAt = nowIso();
  saveStore(store);
  res.json({ pack: { ...pack, coverSticker: pack.coverStickerId ? stickerById(store, pack.coverStickerId) : null } });
});

app.delete('/api/me/sticker-packs/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const pack = store.stickerPacks.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!pack) return res.status(404).json({ error: 'Pack not found.' });
  store.stickerPacks = store.stickerPacks.filter((item) => Number(item.id) !== Number(pack.id));
  store.stickers = store.stickers.filter((item) => Number(item.packId) !== Number(pack.id));
  saveStore(store);
  res.json({ ok: true });
});

app.post('/api/me/sticker-packs/:id/stickers', requireAuth, (req, res) => {
  const store = loadStore();
  const pack = store.stickerPacks.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!pack) return res.status(404).json({ error: 'Pack not found.' });
  const dataUrl = safeDataUrl(req.body?.dataUrl, IMAGE_UPLOAD_LIMIT_BYTES * 8, ['image', 'video']);
  const name = sanitizeText(req.body?.name, 60);
  const durationMs = sanitizeStickerDuration(req.body?.durationMs);
  if (!dataUrl || !name) return res.status(400).json({ error: 'Provide a sticker image and a name.' });
  const mimeType = dataUrl.match(/^data:([a-zA-Z0-9.+-]+\/[a-zA-Z0-9.+-]+);/)?.[1] || 'image/png';
  const sourceType = sanitizeStickerSourceType(req.body?.sourceType, mimeType);
  const isAnimated = ['gif', 'webm'].includes(sourceType);
  if (isAnimated && (!durationMs || durationMs > 1000)) return res.status(400).json({ error: 'Animated stickers must stay within 1 second.' });
  const stored = mimeType.includes('svg')
    ? { url: '', mimeType }
    : saveDataMedia(dataUrl, `sticker-${pack.id}`, { maxLength: IMAGE_UPLOAD_LIMIT_BYTES * 8, allowedKinds: ['image', 'video'] });
  const sticker = stickerDefaults({
    id: nextId(store, 'stickers'),
    packId: pack.id,
    userId: req.authUser.id,
    name,
    mimeType: stored.mimeType || mimeType,
    dataUrl: mimeType.includes('svg') ? dataUrl : '',
    fileUrl: mimeType.includes('svg') ? '' : stored.url,
    previewUrl: mimeType.includes('svg') ? dataUrl : stored.url,
    kind: isAnimated ? 'animated' : 'static',
    sourceType,
    durationMs,
    width: Number(req.body?.width || 0),
    height: Number(req.body?.height || 0),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  store.stickers.push(sticker);
  if (!pack.coverStickerId) pack.coverStickerId = sticker.id;
  pack.updatedAt = nowIso();
  saveStore(store);
  res.status(201).json({ sticker: stickerById(store, sticker.id) });
});

app.delete('/api/me/stickers/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const sticker = store.stickers.find((item) => Number(item.id) === Number(req.params.id) && Number(item.userId) === Number(req.authUser.id));
  if (!sticker) return res.status(404).json({ error: 'Sticker not found.' });
  store.stickers = store.stickers.filter((item) => Number(item.id) !== Number(sticker.id));
  for (const pack of store.stickerPacks) {
    if (Number(pack.coverStickerId) === Number(sticker.id)) {
      const nextSticker = store.stickers.find((item) => Number(item.packId) === Number(pack.id));
      pack.coverStickerId = nextSticker ? nextSticker.id : null;
      pack.updatedAt = nowIso();
    }
  }
  saveStore(store);
  res.json({ ok: true });
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
  if (!site || !owner) return false;
  if (Number(authUserId || 0) === Number(owner.id || 0)) return true;
  return siteIsExternallyReachable(site);
}

const _sitePreviewTokens = new Map();

function cleanupSitePreviewTokens() {
  const now = Date.now();
  for (const [token, entry] of _sitePreviewTokens.entries()) {
    if (!entry || Number(entry.expiresAt || 0) <= now) _sitePreviewTokens.delete(token);
  }
}

function readSitePreviewToken(req) {
  return cookie.parse(req.headers.cookie || '')[SITE_PREVIEW_COOKIE] || '';
}

function setSitePreviewCookie(req, res, site, owner, token) {
  appendSetCookie(res, cookie.serialize(SITE_PREVIEW_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: cookieSecure(req),
    path: uploadedSiteBasePath(owner, site),
    maxAge: Math.floor(SITE_PREVIEW_TTL_MS / 1000)
  }));
}

function clearSitePreviewCookie(req, res, site, owner) {
  appendSetCookie(res, cookie.serialize(SITE_PREVIEW_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: cookieSecure(req),
    path: uploadedSiteBasePath(owner, site),
    maxAge: 0
  }));
}

function createSitePreviewToken(site, userId) {
  cleanupSitePreviewTokens();
  const token = createToken();
  _sitePreviewTokens.set(token, {
    siteId: Number(site?.id || 0),
    userId: Number(userId || 0),
    expiresAt: Date.now() + SITE_PREVIEW_TTL_MS
  });
  return token;
}

function validateSitePreviewToken(token, site) {
  cleanupSitePreviewTokens();
  const entry = _sitePreviewTokens.get(token);
  if (!entry || Number(entry.siteId) !== Number(site?.id || 0)) return false;
  if (Number(entry.expiresAt || 0) <= Date.now()) {
    _sitePreviewTokens.delete(token);
    return false;
  }
  entry.expiresAt = Date.now() + SITE_PREVIEW_TTL_MS;
  return true;
}

function requestHasSitePreviewAccess(req, res, site, owner) {
  const queryToken = sanitizeText(req.query?.previewToken || '', 128);
  if (queryToken && validateSitePreviewToken(queryToken, site)) {
    setSitePreviewCookie(req, res, site, owner, queryToken);
    return true;
  }
  const cookieToken = sanitizeText(readSitePreviewToken(req), 128);
  if (cookieToken && validateSitePreviewToken(cookieToken, site)) return true;
  if (cookieToken) clearSitePreviewCookie(req, res, site, owner);
  return false;
}

function canViewUploadedSiteRequest(req, res, site, owner) {
  return canViewSite(site, owner, req.authUser?.id) || requestHasSitePreviewAccess(req, res, site, owner);
}

app.get(/^\/@([^/]+)\/([^/]+)\/(.*)$/, (req, res, next) => {
  const store = loadStore();
  const { owner, site } = findSiteByHandleAndSlug(store, req.params[0], req.params[1]);
  if (!owner || !site || !canViewUploadedSiteRequest(req, res, site, owner)) return next();
  if (site.mode !== 'upload') return next();
  const rawAssetPath = String(req.params[2] || '');
  const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
  if (!isUploadedSiteOriginRequest(req)) {
    if (!UPLOADED_SITES_ISOLATION_ENABLED) {
      return res.status(503).type('text/plain').send('Uploaded site hosting is not configured on a separate origin.');
    }
    if (!rawAssetPath) {
      const inner = readUploadedSiteEntryHtml(site);
      if (!inner) return next();
      const previewToken = !canViewSite(site, owner, null) && Number(req.authUser?.id || 0) === Number(owner.id || 0)
        ? createSitePreviewToken(site, req.authUser.id)
        : '';
      return res.type('html').send(siteWatermarkHtml(store, owner, site, inner, { previewToken }));
    }
    return res.redirect(308, `${uploadedSitePublicUrl(owner, site, rawAssetPath)}${query}`);
  }
  const assetPath = rawAssetPath ? safeSiteBundlePath(rawAssetPath) : uploadedSiteEntryPath(site);
  if (!assetPath) return next();
  if (!siteUsesBundle(site) && assetPath !== 'index.html') return next();
  const assetAbsPath = siteUsesBundle(site) ? siteBundleAbsPath(site, assetPath) : resolveDataPath(site.htmlPath);
  if (!assetAbsPath || !existsSync(assetAbsPath)) return next();
  return sendUploadedSiteAssetResponse(res, site, owner, assetPath, assetAbsPath);
});

app.get(/^\/@([^/]+)\/([^/]+)$/, (req, res, next) => {
  const store = loadStore();
  const { owner, site } = findSiteByHandleAndSlug(store, req.params[0], req.params[1]);
  if (!owner || !site || !canViewUploadedSiteRequest(req, res, site, owner)) return next();
  if (site.mode === 'upload') {
    const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    if (isUploadedSiteOriginRequest(req)) {
      return res.redirect(308, `${uploadedSitePublicUrl(owner, site)}${query}`);
    }
    return res.redirect(308, `${req.path}/${query}`);
  }
  const inner = buildTemplateSiteHtml(store, site, owner);
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
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const scope = req.body?.scope === 'everyone' ? 'everyone' : 'self';
  if (scope === 'self') {
    hideMessagesForUser(user, room.slug, [message.id]);
    user.updatedAt = nowIso();
    saveStore(store);
    sseSend(req.authUser.id, 'messages_hidden', { ids: [message.id], roomId: room.id, roomSlug: room.slug });
    return res.json({ ok: true, scope, id: message.id, user: mePayload(store, user).user });
  }
  if (!canDeleteMessageForEveryone(room, req.authUser.id, message)) return res.status(403).json({ error: 'Not allowed.' });
  softDeleteMessage(message);
  saveStore(store);
  sseBroadcastRoom(store, room.id, 'message_deleted', { id: message.id, roomId: room.id, roomSlug: room.slug });
  res.json({ ok: true, scope, id: message.id });
});

app.post('/api/chat/rooms/:slug/messages/delete', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find((item) => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  if (room.kind !== 'direct' && !room.memberIds.includes(Number(req.authUser.id))) return res.status(403).json({ error: 'Join this room first.' });
  const user = store.users.find((item) => Number(item.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const ids = Array.from(new Set(ensureArray(req.body?.ids).map((item) => Number(item)).filter((item) => Number.isInteger(item) && item > 0))).slice(0, 100);
  if (!ids.length) return res.status(400).json({ error: 'Select at least one message.' });
  const messages = ids
    .map((id) => store.messages.find((item) => Number(item.id) === id && Number(item.roomId) === Number(room.id)))
    .filter(Boolean);
  if (!messages.length) return res.status(404).json({ error: 'Message not found.' });
  const scope = req.body?.scope === 'everyone' ? 'everyone' : 'self';
  if (scope === 'self') {
    hideMessagesForUser(user, room.slug, messages.map((item) => item.id));
    user.updatedAt = nowIso();
    saveStore(store);
    sseSend(req.authUser.id, 'messages_hidden', { ids: messages.map((item) => item.id), roomId: room.id, roomSlug: room.slug });
    return res.json({ ok: true, scope, ids: messages.map((item) => item.id), user: mePayload(store, user).user });
  }
  const forbidden = messages.find((item) => !canDeleteMessageForEveryone(room, req.authUser.id, item));
  if (forbidden) return res.status(403).json({ error: 'Not allowed to delete one or more messages for everyone.' });
  for (const message of messages) softDeleteMessage(message);
  saveStore(store);
  for (const message of messages) {
    sseBroadcastRoom(store, room.id, 'message_deleted', { id: message.id, roomId: room.id, roomSlug: room.slug });
  }
  res.json({ ok: true, scope, ids: messages.map((item) => item.id) });
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
  if (targetRole === 'owner' && myRole !== 'owner') return res.status(403).json({ error: 'Only the primary platform account can change another protected manager.' });
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
  if (targetRole === 'owner' && myRole !== 'owner') return res.status(403).json({ error: 'Only the primary platform account can remove another protected manager.' });
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
  removeProjectFromStore(store, project.id);
  saveStore(store);
  res.json({ ok: true });
});

// ── Post delete ───────────────────────────────────────────────────────────────
app.delete('/api/me/posts/:id', requireAuth, (req, res) => {
  const store = loadStore();
  const post = store.posts.find(p => Number(p.id) === Number(req.params.id) && Number(p.userId) === Number(req.authUser.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  removePostFromStore(store, post.id);
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
  if (!newPassword) return res.status(400).json({ error: 'New password is required.' });
  if (user.passwordHash) {
    if (!currentPassword) return res.status(400).json({ error: 'Current password is required.' });
    if (!bcrypt.compareSync(currentPassword, user.passwordHash)) return res.status(401).json({ error: 'Current password is wrong.' });
  }
  if (String(newPassword).length < 8) return res.status(400).json({ error: 'New password must be 8+ characters.' });
  user.passwordHash = bcrypt.hashSync(newPassword, 12);
  store.sessions = store.sessions.filter((session) => Number(session.userId) !== Number(user.id));
  removeAccountSwitchGrantsForUser(store, user.id);
  createSessionForUser(req, res, store, user.id);
  rememberUserForDevice(req, res, store, user.id);
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true, created: !currentPassword });
});

app.patch('/api/me/email', requireAuth, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'Not found.' });
  const { password, email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  if (!user.passwordHash) return res.status(400).json({ error: 'Set a justbreath password first. Discord/Google passwords cannot be used here.' });
  if (!password) return res.status(400).json({ error: 'Password is required.' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: 'Wrong password.' });
  const newEmail = sanitizeText(email, 120).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) return res.status(400).json({ error: 'Please enter a valid email address.' });
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
  if (!isOwnerUser(req.authUser)) return res.status(403).json({ error: 'Owner only.' });
  next();
}

function requireOperator(req, res, next) {
  if (!isOperatorUser(req.authUser)) return res.status(403).json({ error: 'Operator only.' });
  next();
}

app.get('/api/admin/stats', requireAuth, requireOwner, (req, res) => {
  const store = loadStore();
  const now = Date.now();
  const day = 86400000;
  ensureDeletionJobs(store);
  res.json({
    users: { total: store.users.length, banned: store.users.filter(u => u.bannedAt).length, newToday: store.users.filter(u => now - new Date(u.createdAt).getTime() < day).length },
    messages: { total: store.messages.length, today: store.messages.filter(m => now - new Date(m.createdAt).getTime() < day).length },
    posts: { total: store.posts.length },
    reports: { total: ensureArray(store.reports).length, open: ensureArray(store.reports).filter((item) => item.status === 'open').length },
    deletions: { scheduled: ensureArray(store.deletionJobs).length },
    rooms: { total: store.rooms.length, direct: store.rooms.filter(r => r.kind === 'direct').length, channels: store.rooms.filter(r => r.kind === 'channel').length },
    sites: { total: store.sites.length, public: store.sites.filter((site) => siteAppearsInPublicDirectory(site)).length },
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

app.get('/api/admin/users', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  let users = store.users;
  if (q) users = users.filter(u => (u.handleCanonical + u.email + u.displayName).toLowerCase().includes(q));
  res.json({ users: users.map(u => adminUserPayload(store, u, req.authUser.id)).sort((a, b) => b.score - a.score) });
});

app.get('/api/admin/reports', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const reports = ensureArray(store.reports)
    .sort((a, b) => {
      if (a.status === b.status) return new Date(b.createdAt) - new Date(a.createdAt);
      if (a.status === 'open') return -1;
      if (b.status === 'open') return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 120)
    .map((item) => adminReportPayload(store, item, req.authUser.id))
    .filter(Boolean);
  res.json({ reports });
});

app.get('/api/admin/deletions', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  ensureDeletionJobs(store);
  const jobs = ensureArray(store.deletionJobs)
    .sort((a, b) => new Date(a.deleteAfter) - new Date(b.deleteAfter))
    .map((job) => adminDeletionJobPayload(store, job, req.authUser.id))
    .filter(Boolean);
  res.json({ jobs });
});

app.post('/api/admin/deletions/:id/restore', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const job = restoreDeletionJob(store, req.params.id);
  if (!job) return res.status(404).json({ error: 'Deletion job not found.' });
  saveStore(store);
  res.json({ ok: true, restored: adminDeletionJobPayload(store, job, req.authUser.id) });
});

app.patch('/api/admin/reports/:id', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const report = ensureArray(store.reports).find((item) => Number(item.id) === Number(req.params.id));
  if (!report) return res.status(404).json({ error: 'Report not found.' });
  const status = ['open', 'resolved', 'dismissed'].includes(req.body?.status) ? req.body.status : report.status;
  report.status = status;
  report.resolutionNote = sanitizeText(req.body?.resolutionNote || report.resolutionNote || '', 600);
  report.updatedAt = nowIso();
  report.resolvedAt = status === 'open' ? null : nowIso();
  report.resolvedByUserId = status === 'open' ? null : Number(req.authUser.id);
  saveStore(store);
  res.json({ report: adminReportPayload(store, report, req.authUser.id) });
});

app.get('/api/admin/posts', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const q = sanitizeText(req.query.q || '', 120).toLowerCase();
  let posts = store.posts.slice();
  if (q) {
    posts = posts.filter((post) => {
      const author = store.users.find((item) => Number(item.id) === Number(post.userId));
      const haystack = `${post.title || ''} ${post.body || ''} ${author?.handleCanonical || ''} ${author?.displayName || ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }
  posts = posts.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)).slice(0, 80);
  res.json({ posts: posts.map((item) => publicPost(store, item, req.authUser.id)) });
});

app.patch('/api/admin/users/:handle/billing', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const user = store.users.find(u => u.handleCanonical === canonicalHandle(req.params.handle));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (!isOwnerUser(req.authUser) && isOwnerUser(user)) {
    return res.status(403).json({ error: 'Only the primary platform account can change protected billing access.' });
  }
  const planId = sanitizeText(req.body?.planId || '', 24);
  if (planId && !subscriptionPlan(planId)) return res.status(400).json({ error: 'Plan not found.' });
  applyBillingPlan(user, planId);
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ user: adminUserPayload(store, user, req.authUser.id) });
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

app.delete('/api/admin/posts/:id', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const post = store.posts.find((item) => Number(item.id) === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  const author = store.users.find((item) => Number(item.id) === Number(post.userId));
  if (!isOwnerUser(req.authUser) && isOwnerUser(author)) {
    return res.status(403).json({ error: 'Protected platform posts can only be removed from the primary platform account.' });
  }
  const job = scheduleDeletionJob(store, 'post', post.id, req.authUser.id, 'Scheduled from operations console.');
  saveStore(store);
  res.json({ ok: true, scheduled: adminDeletionJobPayload(store, job, req.authUser.id) });
});

app.delete('/api/admin/sites/:id', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const site = store.sites.find((item) => Number(item.id) === Number(req.params.id));
  if (!site) return res.status(404).json({ error: 'Site not found.' });
  const owner = store.users.find((item) => Number(item.id) === Number(site.userId));
  if (!isOwnerUser(req.authUser) && isOwnerUser(owner)) {
    return res.status(403).json({ error: 'Protected platform sites can only be removed from the primary platform account.' });
  }
  const job = scheduleDeletionJob(store, 'site', site.id, req.authUser.id, 'Scheduled from operations console.');
  saveStore(store);
  res.json({ ok: true, scheduled: adminDeletionJobPayload(store, job, req.authUser.id) });
});

app.delete('/api/admin/projects/:id', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const project = store.projects.find((item) => Number(item.id) === Number(req.params.id));
  if (!project) return res.status(404).json({ error: 'Project not found.' });
  const owner = store.users.find((item) => Number(item.id) === Number(project.userId));
  if (!isOwnerUser(req.authUser) && isOwnerUser(owner)) {
    return res.status(403).json({ error: 'Protected platform projects can only be removed from the primary platform account.' });
  }
  const job = scheduleDeletionJob(store, 'project', project.id, req.authUser.id, 'Scheduled from operations console.');
  saveStore(store);
  res.json({ ok: true, scheduled: adminDeletionJobPayload(store, job, req.authUser.id) });
});

app.delete('/api/admin/users/:handle', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const user = store.users.find((item) => item.handleCanonical === canonicalHandle(req.params.handle));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (Number(user.id) === Number(req.authUser.id)) return res.status(400).json({ error: 'Delete your own account from settings instead.' });
  if (!isOwnerUser(req.authUser) && isOwnerUser(user)) {
    return res.status(403).json({ error: 'Protected platform accounts can only be removed from the primary platform account.' });
  }
  const job = scheduleDeletionJob(store, 'user', user.id, req.authUser.id, 'Scheduled from operations console.');
  saveStore(store);
  res.json({ ok: true, scheduled: adminDeletionJobPayload(store, job, req.authUser.id) });
});

app.delete('/api/admin/messages/:id', requireAuth, requireOperator, (req, res) => {
  const store = loadStore();
  const message = store.messages.find((item) => Number(item.id) === Number(req.params.id));
  if (!message) return res.status(404).json({ error: 'Message not found.' });
  const author = store.users.find((item) => Number(item.id) === Number(message.userId));
  if (!isOwnerUser(req.authUser) && isOwnerUser(author)) {
    return res.status(403).json({ error: 'Protected platform messages can only be removed from the primary platform account.' });
  }
  const job = scheduleDeletionJob(store, 'message', message.id, req.authUser.id, 'Scheduled from operations console.');
  saveStore(store);
  res.json({ ok: true, scheduled: adminDeletionJobPayload(store, job, req.authUser.id) });
});

// Paginated messages endpoint
app.get('/api/chat/rooms/:slug/messages', requireAuth, (req, res) => {
  const store = loadStore();
  const room = store.rooms.find(item => item.slug === slugify(req.params.slug));
  if (!room || !roomAccessible(room, req.authUser.id)) return res.status(404).json({ error: 'Room not found.' });
  const joined = room.memberIds.includes(Number(req.authUser.id));
  const viewer = store.users.find((item) => Number(item.id) === Number(req.authUser.id)) || req.authUser;
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
  let messages = visibleRoomMessagesForUser(store, room.id, viewer, room.slug);
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
    hasMore: visibleRoomMessagesForUser(store, room.id, viewer, room.slug).filter((m) => (before > 0 ? m.id < before : true)).length > limit,
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
  const ip = requestClientIp(req);
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
    sites: store.sites.filter((site) => siteAppearsInPublicDirectory(site)).length,
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
function canLogDevEmails() {
  return ALLOW_DEV_EMAIL_LOG || (NODE_ENV !== 'production' && isLoopbackHost(originHost(APP_ORIGIN)));
}

function sendEmail(to, subject, body) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || process.env.BRAND_EMAIL || 'noreply@justbreath.life';

  if (!host || !user || !pass) {
    if (!canLogDevEmails()) {
      throw new Error('Email delivery is not configured on the server.');
    }
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
  if (rateLimit(rateLimitKey(req, 'verify-send', req.authUser?.email || req.authUser?.id || ''), 6)) {
    return res.status(429).json({ error: 'Too many verification emails sent. Try again later.' });
  }
  const store = loadStore();
  const user = store.users.find(u => Number(u.id) === Number(req.authUser.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  if (user.emailVerified) return res.status(400).json({ error: 'Email already verified.' });
  const code = genCode();
  _pendingCodes[user.email] = { code, expiresAt: Date.now() + 15 * 60000, userId: user.id };
  try {
    sendEmail(user.email, 'Verify your justbreath.life account',
      `Your verification code: ${code}\n\nExpires in 15 minutes.\n\nIf you didn't request this, ignore this email.`);
    res.json({ ok: true, hint: `Code sent to ${user.email.replace(/(.{2}).*@/, '$1***@')}` });
  } catch (error) {
    delete _pendingCodes[user.email];
    res.status(503).json({ error: error.message || 'Verification email is unavailable right now.' });
  }
});

app.post('/api/auth/verify-email', requireAuth, (req, res) => {
  if (rateLimit(rateLimitKey(req, 'verify-check', req.authUser?.email || req.authUser?.id || ''), 12)) {
    return res.status(429).json({ error: 'Too many verification attempts. Try again later.' });
  }
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
  if (rateLimit(rateLimitKey(req, 'login-code-send', email), 6)) return res.status(429).json({ error: 'Too many sign-in codes requested. Try again later.' });
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
  try {
    sendEmail(email, 'Your justbreath.life sign-in code',
      `Your sign-in code: ${code}\n\nExpires in 15 minutes.\n\nIf you didn't request this, ignore this email.`);
    res.json({ ok: true, hint: `Code sent to ${email.replace(/(.{2}).*@/, '$1***@')}` });
  } catch (error) {
    delete _pendingCodes[`login:${email}`];
    res.status(503).json({ error: error.message || 'Sign-in email is unavailable right now.' });
  }
});

app.post('/api/auth/login-code', (req, res) => {
  const store = loadStore();
  const email = sanitizeText(req.body?.email || '', 120).toLowerCase();
  const code = sanitizeText(req.body?.code || '', 8);
  const displayName = sanitizeText(req.body?.displayName || '', 60);
  if (!email || !code) return res.status(400).json({ error: 'Email and code are required.' });
  if (rateLimit(rateLimitKey(req, 'login-code-check', email), 12)) return res.status(429).json({ error: 'Too many code attempts. Try again later.' });
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
  createSessionForUser(req, res, store, user.id);
  rememberUserForDevice(req, res, store, user.id);
  saveStore(store);
  res.json({ user: mePayload(store, user).user });
});

// Password reset via email
app.post('/api/auth/forgot-password', (req, res) => {
  const store = loadStore();
  const email = sanitizeText(req.body?.email || '', 120).toLowerCase();
  if (!email) return res.status(400).json({ error: 'Email required.' });
  if (rateLimit(rateLimitKey(req, 'reset-send', email), 6)) return res.status(429).json({ error: 'Too many reset emails requested. Try again later.' });
  const user = store.users.find(u => u.email === email);
  if (!user) return res.json({ ok: true }); // don't reveal if email exists
  const code = genCode();
  _pendingCodes[`reset:${email}`] = { code, expiresAt: Date.now() + 30 * 60000, userId: user.id };
  try {
    sendEmail(email, 'Reset your justbreath.life password',
      `Your password reset code: ${code}\n\nExpires in 30 minutes.\n\nIf you didn't request this, ignore this email.`);
    res.json({ ok: true, hint: `Code sent to ${email.replace(/(.{2}).*@/, '$1***@')}` });
  } catch (error) {
    delete _pendingCodes[`reset:${email}`];
    res.status(503).json({ error: error.message || 'Password reset email is unavailable right now.' });
  }
});

app.post('/api/auth/reset-password', (req, res) => {
  const store = loadStore();
  const email = sanitizeText(req.body?.email || '', 120).toLowerCase();
  const code = sanitizeText(req.body?.code || '', 8);
  const newPassword = String(req.body?.newPassword || '');
  if (!email || !code || !newPassword) return res.status(400).json({ error: 'All fields required.' });
  if (rateLimit(rateLimitKey(req, 'reset-check', email), 12)) return res.status(429).json({ error: 'Too many reset attempts. Try again later.' });
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
  removeAccountSwitchGrantsForUser(store, user.id);
  user.updatedAt = nowIso();
  saveStore(store);
  res.json({ ok: true });
});

// ── Guest login ───────────────────────────────────────────────────────────────
app.post('/api/auth/guest', (req, res) => {
  if (rateLimit(rateLimitKey(req, 'guest'), 12)) return res.status(429).json({ error: 'Too many guest sessions created. Try again later.' });
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
  createSessionForUser(req, res, store, user.id);
  saveStore(store);
  res.status(201).json({ user: mePayload(store, user).user, guest: true });
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

function publicNavLink(pathOnly, href, label) {
  const active = pathOnly === href || pathOnly.startsWith(href + '/');
  return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
}

function renderPublicChrome(pathOnly, bodyHtml) {
  return `<div class="public-shell">
    <main class="public-main">
      <header class="public-header">
        <a class="public-brand" href="/">
          <img src="/logo.png" alt="justbreath logo" width="48" height="48" />
          <span>justbreath<span>.life</span></span>
        </a>
        <nav class="public-nav" aria-label="Public">
          ${publicNavLink(pathOnly, '/developers', 'Developers')}
          ${publicNavLink(pathOnly, '/about', 'About')}
          ${publicNavLink(pathOnly, '/privacy', 'Privacy')}
          ${publicNavLink(pathOnly, '/terms', 'Terms')}
          ${publicNavLink(pathOnly, '/contact', 'Contact')}
          <a href="${BRAND_GITHUB_URL}" target="_blank" rel="noopener">GitHub</a>
        </nav>
      </header>
      ${bodyHtml}
    </main>
    <footer class="public-footer">
      <span>justbreath.life — creator pages, private spaces, and team collaboration.</span>
      <div class="public-footer-links">
        <a href="/developers">Developers</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
        <a href="${BRAND_GITHUB_URL}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </footer>
  </div>`;
}

function currentStaticSection(pathOnly, basePath, sections) {
  const raw = pathOnly === basePath ? '' : String(pathOnly.slice(basePath.length + 1).split('/')[0] || '');
  return sections.find((section) => section.id === raw) || sections[0];
}

function renderPublicDocPage(pathOnly, config) {
  const current = currentStaticSection(pathOnly, config.basePath, config.sections);
  return renderPublicChrome(pathOnly, `
    <section class="public-section">
      <div class="public-docs">
        <aside class="public-docs-nav">
          <p class="public-kicker">${config.eyebrow}</p>
          <h1 class="public-docs-title">${config.title}</h1>
          <p class="public-lead">${config.lead}</p>
          ${config.downloadHref ? `<a class="public-button public-button-secondary public-button-small" href="${config.downloadHref}" download>Download .md</a>` : ''}
          <nav class="public-docs-list" aria-label="${config.title} sections">
            ${config.sections.map((section, index) => {
              const href = index === 0 ? config.basePath : `${config.basePath}/${section.id}`;
              return `<a class="public-docs-link ${current.id === section.id ? 'active' : ''}" href="${href}">${section.label}</a>`;
            }).join('')}
          </nav>
        </aside>
        <article class="public-docs-body">
          <p class="public-kicker">${config.eyebrow}</p>
          <h2>${current.label}</h2>
          ${current.body}
        </article>
      </div>
    </section>`);
}

function renderStaticPublicShell(pathOnly) {
  if (pathOnly === '/developers' || pathOnly.startsWith('/developers/')) {
    const sections = [
      {
        id: 'overview',
        label: 'Overview',
        body: `<p>Build on justbreath.life with a small REST API, real-time events, bot tokens, and static creator-site uploads.</p>
          <ul>
            <li><strong>Base URL:</strong> <code>${APP_ORIGIN}</code></li>
            <li><strong>Public reads:</strong> profiles, posts, creator sites, and project pages.</li>
            <li><strong>Authenticated:</strong> messages, rooms, settings, uploads, and workspace actions.</li>
            <li><strong>Real-time:</strong> Server-Sent Events at <code>/api/events</code>.</li>
          </ul>
          <p>Full creator-site repository and setup docs: <a href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">JustBreathDevSite</a>, <a href="${SITE_CREATION_GUIDE_URL}" target="_blank" rel="noopener">SITE_CREATION_GUIDE.md</a>, and <a href="${SITE_CREATION_EXAMPLES_URL}" target="_blank" rel="noopener">SITE_CREATION_EXAMPLES_RU.md</a>.</p>
          <pre class="public-code">GET ${APP_ORIGIN}/api/public/profile/:handle
GET ${APP_ORIGIN}/api/public/sites
GET ${APP_ORIGIN}/api/public/projects/:slug</pre>`
      },
      {
        id: 'auth',
        label: 'Authentication',
        body: `<p>The browser client uses the <code>jb_sid</code> session cookie. Automation uses long-lived bot tokens created in Settings.</p>
          <ul>
            <li><strong>Browser auth:</strong> cookie-based sessions after sign-in.</li>
            <li><strong>Bot auth:</strong> <code>Authorization: Bearer jb_xxx</code>.</li>
            <li><strong>Token creation:</strong> Settings → API Tokens inside the full app.</li>
          </ul>
          <pre class="public-code">curl -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"body":"Hello from my bot"}' \\
  ${APP_ORIGIN}/api/bot/rooms/&lt;room-slug&gt;/messages</pre>`
      },
      {
        id: 'api',
        label: 'REST API',
        body: `<p>The API stays deliberately small and concrete.</p>
          <ul>
            <li><code>GET /api/public/profile/:handle</code> — public profile and posts.</li>
            <li><code>GET /api/public/posts</code> — recent public posts.</li>
            <li><code>GET /api/public/sites</code> — listed creator sites.</li>
            <li><code>GET /api/developers/capabilities</code> — public import and studio capabilities.</li>
            <li><code>GET /api/me</code> — full signed-in payload.</li>
            <li><code>POST /api/posts</code> — publish a post.</li>
            <li><code>POST /api/me/sites/upload</code> — single-file HTML creator site.</li>
            <li><code>POST /api/me/sites/upload-archive</code> — archive upload with <code>index.html</code>.</li>
            <li><code>POST /api/me/sites/upload-tar</code>, <code>/upload-tgz</code>, <code>/upload-7z</code>, <code>/upload-bundle</code> — extra archive aliases.</li>
            <li><code>POST /api/me/sites/import-inspect</code> — inspect archive warnings before creating the site.</li>
            <li><code>GET /api/me/sites/import-capabilities</code> — account-specific limits and supported formats.</li>
          </ul>`
      },
      {
        id: 'bots',
        label: 'Bots & tokens',
        body: `<p>Bot tokens inherit the room and posting permissions of the account that created them.</p>
          <ol>
            <li>Create or choose the account you want to automate.</li>
            <li>Open Settings → API Tokens in the full app.</li>
            <li>Name the token and store it securely when shown.</li>
          </ol>
          <p>Revoking a token invalidates it immediately.</p>`
      },
      {
        id: 'site-imports',
        label: 'Site imports',
        body: `<p>Creator sites support more than a single ZIP.</p>
          <ul>
            <li><strong>Formats:</strong> <code>.zip</code>, <code>.tar</code>, <code>.tgz</code>, <code>.tar.gz</code>, and <code>.7z</code>.</li>
            <li><strong>Structure:</strong> keep <code>index.html</code> at archive root.</li>
            <li><strong>Extras:</strong> local assets, extra HTML pages, SVG/JSON/webmanifest, and text files for Site Studio are preserved.</li>
            <li><strong>Preview:</strong> call <code>POST /api/me/sites/import-inspect</code> before upload to see optimization and review warnings.</li>
          </ul>
          <pre class="public-code">curl -X POST ${APP_ORIGIN}/api/me/sites/import-inspect \\
  -H "Content-Type: application/json" \\
  -H "Cookie: jb_sid=..." \\
  -d '{"archiveName":"site.tgz","archiveBase64":"..."}'</pre>`
      },
      {
        id: 'webhooks',
        label: 'Webhooks & SSE',
        body: `<p>There are no outgoing webhooks yet. For real-time events, connect to the SSE stream.</p>
          <pre class="public-code">const es = new EventSource('/api/events', { withCredentials: true });
es.addEventListener('new_message', (event) =&gt; console.log(JSON.parse(event.data)));
es.addEventListener('typing', (event) =&gt; console.log(JSON.parse(event.data)));
es.addEventListener('notification', (event) =&gt; console.log(JSON.parse(event.data)));</pre>
          <p>Available events include messages, typing, reactions, notifications, and presence.</p>`
      },
      {
        id: 'telegram',
        label: 'Telegram bridge',
        body: `<p>The Telegram bridge remains a preview feature for self-hosted setups.</p>
          <ul>
            <li>Create a Telegram bot with <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a>.</li>
            <li>Configure <code>TELEGRAM_BOT_TOKEN</code> and <code>TELEGRAM_BOT_USERNAME</code>.</li>
            <li>Point Telegram to <code>/api/integrations/telegram/webhook</code>.</li>
          </ul>
          <p>Telegram users must message your bot first; you cannot cold-DM arbitrary accounts.</p>`
      },
      {
        id: 'rules',
        label: 'Rules & limits',
        body: `<p>justbreath does not promise “unlimited” usage. Limits stay explicit.</p>
          <ul>
            <li><strong>Creator sites:</strong> Free 2, Plus 6, Max 25.</li>
            <li><strong>Rooms you own:</strong> Free 10, Plus 40, Max 150.</li>
            <li><strong>Archive site upload:</strong> 5 MB standard, up to 512 MB for internal operators, with <code>index.html</code>.</li>
            <li><strong>Bot tokens:</strong> Free 2, Plus 5, Max 20.</li>
          </ul>
          <p>Archive imports are served as raw static bundles after quarantine checks. Executable or server-side files are blocked before publish, and review warnings stay attached to the bundle.</p>
          <p>Uploads containing malware, phishing, copyright abuse, or hostile automation are removed.</p>`
      }
    ];
    return renderPublicDocPage(pathOnly, {
      eyebrow: 'developers',
      title: 'API & docs',
      lead: 'Everything you need to build on justbreath.life without reverse-engineering the client.',
      basePath: '/developers',
      sections,
      downloadHref: '',
    });
  }

  if (pathOnly === '/privacy' || pathOnly.startsWith('/privacy/')) {
    const sections = [
      {
        id: 'overview',
        label: 'Overview',
        body: `<p><strong>Effective date:</strong> 19 April 2026. justbreath.life collects only what is required to run accounts, creator sites, chat, and abuse protection.</p>
          <ul>
            <li>We do not sell personal data.</li>
            <li>We store data on our own servers.</li>
            <li>You can export or delete your account inside Settings.</li>
            <li>Ads are served through Google AdSense.</li>
          </ul>`
      },
      {
        id: 'data',
        label: 'Data we collect',
        body: `<p>We collect account data, content you publish, technical logs for security, and anonymous telemetry for performance.</p>
          <ul>
            <li><strong>Account:</strong> email, handle, display name, password hash, OAuth subject IDs.</li>
            <li><strong>Content:</strong> posts, messages, uploads, avatars, creator-site files.</li>
            <li><strong>Technical:</strong> IP for rate limits, user-agent, session cookie, request logs.</li>
            <li><strong>Telemetry:</strong> pageviews, JS errors, and Core Web Vitals without message contents.</li>
          </ul>`
      },
      {
        id: 'cookies',
        label: 'Cookies',
        body: `<p>We use essential cookies for sign-in plus local storage for client preferences.</p>
          <ul>
            <li><code>jb_sid</code> — session cookie for signed-in users.</li>
            <li><code>jb_google_oauth</code> and <code>jb_discord_oauth</code> — short-lived OAuth state cookies.</li>
            <li><code>jb_lang</code> and <code>jb_guest_mode</code> — client-side preferences in local storage.</li>
          </ul>
          <p>Google AdSense may set its own cookies. Manage them in <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ad Settings</a>.</p>`
      },
      {
        id: 'sharing',
        label: 'Sharing',
        body: `<p>We share data only with providers needed to operate the service.</p>
          <ul>
            <li>Google AdSense for ads.</li>
            <li>Google and Discord when you choose those sign-in methods.</li>
            <li>SMTP infrastructure for verification and recovery emails.</li>
            <li>Cloudflare for edge delivery and DNS.</li>
          </ul>
          <p>We do not sell message contents, private posts, or creator-site content.</p>`
      },
      {
        id: 'retention',
        label: 'Retention & backups',
        body: `<p>Live data stays until you delete the account. Backups rotate every 30 minutes and keep the last 48 snapshots, roughly 24 hours.</p>
          <ul>
            <li>Request logs rotate after 30 days.</li>
            <li>Anonymous telemetry files keep 180 days.</li>
            <li>Deleted accounts are purged from the next backup rotation.</li>
          </ul>`
      },
      {
        id: 'rights',
        label: 'Your rights',
        body: `<p>If you are covered by GDPR, UK GDPR, CCPA, or similar law, you may request access, export, rectification, erasure, portability, and restriction.</p>
          <p>Email <a href="mailto:${BRAND_EMAIL}">${BRAND_EMAIL}</a> for any privacy request. We reply within 30 days.</p>`
      },
      {
        id: 'security',
        label: 'Security',
        body: `<p>We use TLS, HttpOnly sessions, bcrypt password hashing, rate limits, CSP, and static-safe creator-site handling.</p>
          <ul>
            <li>Passwords are hashed with bcrypt.</li>
            <li>Authentication endpoints are rate-limited.</li>
            <li>Uploaded creator-site code is stored and served as static files only; backend handlers inside imports do not execute.</li>
          </ul>`
      },
      {
        id: 'children',
        label: 'Minors',
        body: `<p>The service is not directed at children under 13. In jurisdictions with a higher digital-consent age, minors need parental or guardian consent.</p>`
      },
      {
        id: 'changes',
        label: 'Changes',
        body: `<p>If we materially change the policy, we notify registered users by email and place a banner on the site before changes take effect.</p>
          <p>You can also download the full markdown version at <a href="/PRIVACY.md" target="_blank" rel="noopener">PRIVACY.md</a>.</p>`
      },
      {
        id: 'contact',
        label: 'Contact',
        body: `<p>Privacy questions and subject-access requests go to <a href="mailto:${BRAND_EMAIL}">${BRAND_EMAIL}</a>.</p>`
      }
    ];
    return renderPublicDocPage(pathOnly, {
      eyebrow: 'legal',
      title: 'Privacy Policy',
      lead: 'How justbreath.life collects, stores, shares, and protects data.',
      basePath: '/privacy',
      sections,
      downloadHref: '/PRIVACY.md',
    });
  }

  if (pathOnly === '/terms' || pathOnly.startsWith('/terms/')) {
    const sections = [
      {
        id: 'overview',
        label: 'Overview',
        body: `<p><strong>Effective date:</strong> 19 April 2026. By creating an account, signing in, or using guest mode, you agree to these Terms.</p>`
      },
      {
        id: 'account',
        label: 'Your account',
        body: `<ul>
            <li>You must be at least 13 years old, subject to stricter local law where applicable.</li>
            <li>You are responsible for keeping credentials secure.</li>
            <li>Handles are unique and case-insensitive.</li>
            <li>We may reclaim handles used for impersonation or trademark abuse.</li>
          </ul>`
      },
      {
        id: 'content',
        label: 'Your content',
        body: `<p>You keep ownership of what you publish. You grant justbreath a limited license to host, display, and distribute your content as required to operate the service.</p>
          <p>Public content can be indexed by search engines; unlisted content can still be reached by direct link.</p>`
      },
      {
        id: 'prohibited',
        label: 'Prohibited uses',
        body: `<ul>
            <li>Illegal content or activity.</li>
            <li>Content exploiting minors or non-consensual intimate imagery.</li>
            <li>Harassment, doxxing, threats, phishing, or malware.</li>
            <li>Unauthorized data collection or undisclosed trackers.</li>
            <li>Spammy automation or copyright infringement.</li>
          </ul>`
      },
      {
        id: 'payments',
        label: 'Paid tiers',
        body: `<p>Paid subscriptions unlock higher quotas such as extra creator sites, storage, and priority review. Billing periods may be monthly, quarterly, semi-annual, or annual depending on the plan.</p>
          <p>Refunds are pro-rated within the first 14 days of a billing period.</p>`
      },
      {
        id: 'termination',
        label: 'Termination',
        body: `<p>You may delete your account at any time in Settings. We may suspend or terminate accounts that violate these Terms or applicable law.</p>
          <p>Data remains in rotating backups for up to 24 hours after deletion.</p>`
      },
      {
        id: 'liability',
        label: 'Liability',
        body: `<p>The service is provided “as is”. To the extent allowed by law, our aggregate liability is limited to what you paid in the previous 12 months, or €50 if you paid nothing.</p>`
      },
      {
        id: 'law',
        label: 'Governing law',
        body: `<p>These Terms are governed by the laws of Germany. Berlin courts apply unless mandatory consumer-protection law gives you a better forum.</p>`
      },
      {
        id: 'contact',
        label: 'Contact',
        body: `<p>Legal notices, DMCA requests, and policy questions: <a href="mailto:${BRAND_EMAIL}">${BRAND_EMAIL}</a>.</p>`
      }
    ];
    return renderPublicDocPage(pathOnly, {
      eyebrow: 'legal',
      title: 'Terms of Service',
      lead: 'The platform rules in plain language: account use, content ownership, prohibited behavior, and billing.',
      basePath: '/terms',
      sections,
      downloadHref: '/TERMS.md',
    });
  }

  if (pathOnly === '/about') {
    return renderPublicChrome(pathOnly, `
      <section class="public-hero">
        <div>
          <p class="public-kicker">about</p>
          <h1 class="public-title">A creator platform built to be understandable.</h1>
          <p class="public-lead">justbreath.life combines public pages, creator sites, private spaces, messaging, and collaboration in one product without hiding the basics behind layers of abstraction.</p>
          <div class="public-inline-list">
            <a href="/developers">Developers & API</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="${BRAND_GITHUB_URL}" target="_blank" rel="noopener">GitHub</a>
            <a href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">JustBreathDevSite</a>
          </div>
        </div>
        <aside class="public-hero-rail">
          <p class="public-rail-title">Product thesis</p>
          <div class="public-lane">
            <strong>One home in public</strong>
            <p>Public identity, pinned context, creator site, and next action in one place.</p>
          </div>
          <div class="public-lane">
            <strong>Private when needed</strong>
            <p>Audience rooms, team spaces, and controlled access without splitting the product.</p>
          </div>
          <div class="public-lane">
            <strong>Portable by default</strong>
            <p>Static HTML for creator sites, REST APIs, and exportable data instead of opaque lock-in.</p>
          </div>
        </aside>
      </section>
      <section class="public-section">
        <h2>Why this exists.</h2>
        <div class="public-grid-three">
          <article class="public-feature">
            <strong>Too many stitched-together stacks</strong>
            <p>Creators and small teams keep jumping between link hubs, chat servers, docs, and lightweight CRMs. justbreath tries to collapse that sprawl.</p>
          </article>
          <article class="public-feature">
            <strong>Public pages should still rank</strong>
            <p>The public surface uses crawlable links, route-level meta, and creator pages that behave like real pages instead of JS-only traps.</p>
          </article>
          <article class="public-feature">
            <strong>Software should stay readable</strong>
            <p>The stack remains intentionally small: one Node server, one vanilla client, one CSS file, plain files on disk.</p>
          </article>
        </div>
        <p class="public-lead" style="margin-top:24px">Site creation source, examples, and setup docs live in <a href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">bnfe12/JustBreathDevSite</a>.</p>
      </section>`);
  }

  if (pathOnly === '/contact') {
    return renderPublicChrome(pathOnly, `
      <section class="public-section">
        <p class="public-kicker">contact</p>
        <h1 class="public-docs-title">Get in touch.</h1>
        <p class="public-lead">Support, legal, privacy, security, repository, and partnership requests all go through one mailbox.</p>
        <div class="public-grid-three">
          <article class="public-feature">
            <strong>General support</strong>
            <p><a href="mailto:${BRAND_EMAIL}">${BRAND_EMAIL}</a></p>
          </article>
          <article class="public-feature">
            <strong>Legal / DMCA / privacy</strong>
            <p>Use the same address and mark the subject line with <code>[LEGAL]</code>, <code>[DMCA]</code>, or <code>[PRIVACY]</code>.</p>
          </article>
          <article class="public-feature">
            <strong>Platform reports</strong>
            <p>Use <code>[REPORT]</code> in the subject for operational or trust-and-safety issues.</p>
          </article>
        </div>
        <div class="public-inline-list">
          <a href="/@justbreath">Platform profile</a>
          <a href="${BRAND_GITHUB_URL}" target="_blank" rel="noopener">GitHub</a>
          <a href="${SITE_CREATION_REPO_URL}" target="_blank" rel="noopener">JustBreathDevSite</a>
          <a href="/developers">Developers</a>
        </div>
      </section>`);
  }

  return null;
}

function staticPageMetaForPath(pathOnly) {
  if (pathOnly === '/developers' || pathOnly.startsWith('/developers/')) {
    const canonical = pathOnly === '/developers/overview' ? `${APP_ORIGIN}/developers` : APP_ORIGIN + pathOnly;
    return {
      title: 'Developers — justbreath API, bots, SSE, and creator-site rules',
      description: 'Build on justbreath.life with REST APIs, bot tokens, real-time events, and static creator-site upload rules.',
      canonical
    };
  }
  if (pathOnly === '/privacy' || pathOnly.startsWith('/privacy/')) {
    const canonical = pathOnly === '/privacy/overview' ? `${APP_ORIGIN}/privacy` : APP_ORIGIN + pathOnly;
    return {
      title: 'Privacy Policy — justbreath.life',
      description: 'How justbreath.life collects, stores, shares, and protects account, content, and telemetry data.',
      canonical
    };
  }
  if (pathOnly === '/terms' || pathOnly.startsWith('/terms/')) {
    const canonical = pathOnly === '/terms/overview' ? `${APP_ORIGIN}/terms` : APP_ORIGIN + pathOnly;
    return {
      title: 'Terms of Service — justbreath.life',
      description: 'Platform rules for justbreath.life: accounts, content ownership, prohibited uses, billing, and liability.',
      canonical
    };
  }
  if (pathOnly === '/about') {
    return {
      title: 'About justbreath.life — creator pages, private spaces, and team collaboration',
      description: 'What justbreath.life is, why it exists, and how it combines public pages, private spaces, and collaboration.',
      canonical: APP_ORIGIN + pathOnly
    };
  }
  if (pathOnly === '/contact') {
    return {
      title: 'Contact — justbreath.life',
      description: 'Support, legal, privacy, security, press, and partnership contact information for justbreath.life.',
      canonical: APP_ORIGIN + pathOnly
    };
  }
  return null;
}

function renderSpaShell(req, meta) {
  if (!_indexHtmlCache) loadIndexHtml();
  let html = _indexHtmlCache;
  const pathOnly = (req.path || '/');
  const mergedMeta = { ...(staticPageMetaForPath(pathOnly) || {}), ...(meta || {}) };
  const canonical = mergedMeta.canonical || (APP_ORIGIN + pathOnly);
  const title = escSeo(mergedMeta.title || 'justbreath.life — creator pages, private spaces, and team collaboration');
  const description = escSeo(truncateSeo(mergedMeta.description || 'Create a public creator page, launch static sites, collaborate with your team, and chat with your audience in one place.'));
  const ogType = escSeo(mergedMeta.ogType || 'website');
  const ogImage = escSeo(mergedMeta.ogImage || DEFAULT_OG_IMAGE);
  const robots = mergedMeta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1';
  const jsonLd = mergedMeta.jsonLd || null;
  const publicShell = renderStaticPublicShell(pathOnly);

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
  if (publicShell) {
    html = html.replace(/<!-- PUBLIC_SHELL_START -->[\s\S]*?<!-- PUBLIC_SHELL_END -->/i, `<!-- PUBLIC_SHELL_START -->\n${publicShell}\n    <!-- PUBLIC_SHELL_END -->`);
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
    if (!userAppearsInPublicDirectory(u, null)) continue;
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
    push(sitePublicUrl(owner, s) || `${APP_ORIGIN}/@${handle}/${encodeURIComponent(s.slug)}`, lastmod, '0.6', 'weekly');
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
    description: 'Creator pages, static sites, private spaces, and team collaboration.',
    start_url: '/', scope: '/', display: 'standalone',
    background_color: '#111111', theme_color: '#111111',
    orientation: 'any', lang: 'en', dir: 'ltr',
    categories: ['social', 'productivity', 'utilities'],
    icons: [
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      { src: '/logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' }
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
  const canonical = site.mode === 'upload'
    ? (sitePublicUrl(owner, site) || `${APP_ORIGIN}/@${handle}/${site.slug}`)
    : `${APP_ORIGIN}/@${handle}/${site.slug}`;
  const title = sanitizeText(site.title || 'Site', 120);
  const summary = sanitizeText(site.summary || '', 280);
  return {
    title: `${title} — ${owner.displayName || handle} on justbreath`,
    description: summary || `${title} — a creator site by @${handle} on justbreath.life`,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonical,
    noindex: site.visibility !== 'public' || !siteIsApproved(site),
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
  if (!process.env.SMTP_HOST) {
    if (canLogDevEmails()) console.log('[smtp] SMTP_HOST not set — auth emails will print to console only for local development');
    else console.log('[smtp] ⚠️  SMTP is not configured — email verification and recovery routes will return errors until SMTP is set');
  }
  if (!UPLOADED_SITES_ISOLATION_ENABLED) {
    console.log('[security] ⚠️  UPLOADED_SITES_ORIGIN is not configured on a separate host — uploaded creator sites will not be served publicly until it is set');
  } else {
    console.log(`[security] Uploaded creator sites isolated on ${UPLOADED_SITES_ORIGIN}`);
  }
  if (process.env.OWNER_PASSWORD === '12345678') console.log('[security] ⚠️  OWNER_PASSWORD is using default value — change it in .env before going live');
});
