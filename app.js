const COLORS = {
  navy: '#2e4057', teal: '#2f5962', rust: '#b95f3b', sage: '#6b806a', gold: '#b5893d', plum: '#76506a'
};

const BOARD_GRID = 20;

const BUILTIN_BRANDS = {
  zoho: { logo: 'https://www.google.com/s2/favicons?domain=zoho.com&sz=128', symbol: 'Z' },
  office: { logo: 'https://www.google.com/s2/favicons?domain=microsoft365.com&sz=128', symbol: '▦' },
  impact: { logo: 'https://www.google.com/s2/favicons?domain=gbxgroup.com&sz=128', symbol: 'GBX' },
  approvals: { symbol: '✓' }, dealroom: { symbol: '◇' }, draw: { symbol: '▣' },
  hr: { symbol: '♙' }, docs: { symbol: '▤' }, expenses: { symbol: '$' },
  'shared-map': { logo: 'https://www.google.com/s2/favicons?domain=gbxgroup.com&sz=128', symbol: 'GBX' },
  'shared-brand': { symbol: '◆' }
};

const seed = {
  collections: [
    { id: 'favorites', name: 'Favorites', color: '#c59a46' },
    { id: 'daily', name: 'Everyday essentials', color: '#2f5962' },
    { id: 'deal', name: 'Deals & projects', color: '#b95f3b' },
    { id: 'people', name: 'People & operations', color: '#c59a46' },
    { id: 'tax', name: 'Tax', color: '#76506a' },
    { id: 'hr', name: 'HR', color: '#6b806a' },
    { id: 'bd', name: 'BD', color: '#b95f3b' },
    { id: 'projects', name: 'Projects', color: '#2e4057' }
  ],
  items: [
    { id: 'zoho', name: 'Zoho CRM', url: 'https://www.zoho.com/crm/', collection: 'favorites', color: 'teal', tags: ['Zoho', 'CRM'], notes: 'Contacts, leads, and opportunities', favorite: true, shared: false, icon: 'Z' },
    { id: 'office', name: 'Microsoft 365', url: 'https://www.microsoft365.com/', collection: 'daily', color: 'navy', tags: ['Microsoft'], notes: 'Email, Teams, and shared documents', favorite: false, shared: false, icon: 'M' },
    { id: 'approvals', name: 'Approval Center', url: 'https://example.com/approvals', collection: 'favorites', color: 'gold', tags: ['Approvals'], notes: 'Review items waiting on you', favorite: true, shared: false, icon: 'A' },
    { id: 'dealroom', name: 'DealRoom', url: 'https://example.com/deal-room', collection: 'deal', color: 'rust', tags: ['Deals', 'GBX app'], notes: 'Pipeline and diligence workspace', favorite: false, shared: false, icon: 'DR' },
    { id: 'draw', name: 'Draw Request Center', url: 'https://example.com/draw-requests', collection: 'deal', color: 'plum', tags: ['Documents', 'GBX app'], notes: 'Create and track draw packages', favorite: false, shared: true, icon: 'D' },
    { id: 'impact', name: 'Impact Reports', url: 'https://gbxgroup.com/real-estate/our-impact/impact-reports/', collection: 'favorites', color: 'sage', tags: ['Reports'], notes: 'Economic impact research and reports', favorite: true, shared: false, icon: 'IR' },
    { id: 'hr', name: 'People Hub', url: 'https://example.com/people', collection: 'people', color: 'sage', tags: ['HR', 'Benefits'], notes: 'Benefits, policies, and time off', favorite: false, shared: false, icon: 'P' },
    { id: 'docs', name: 'Document Generator', url: 'https://example.com/documents', collection: 'people', color: 'navy', tags: ['Documents', 'GBX app'], notes: 'Build approved documents from templates', favorite: false, shared: false, icon: 'DG' },
    { id: 'expenses', name: 'Expense Reports', url: 'https://example.com/expenses', collection: 'people', color: 'gold', tags: ['Finance'], notes: 'Submit receipts and reimbursements', favorite: false, shared: true, icon: 'ER' },
    { id: 'form-8283-generator', name: 'Form 8283 Generator', url: 'https://8283-generation-aaajfkgaeegfdjby.eastus-01.azurewebsites.net/', collection: 'tax', color: 'plum', tags: ['Form', 'Tax', '8283'], notes: 'Prepare and generate IRS Form 8283 packages.', favorite: false, shared: false, icon: '8283', managed: true, deploymentAudience: 'Tax' },
    { id: 'nova', name: 'Nova', url: 'https://brave-water-039c2cf0f.2.azurestaticapps.net/okrs', collection: 'hr', color: 'sage', tags: ['OKR', 'HR'], notes: 'Set, align, and track company and team OKRs.', favorite: false, shared: false, icon: '✦', forceSymbol: true, managed: true, deploymentAudience: 'Everyone, HR' },
    { id: 'bd-app', name: 'BD App', url: 'https://bd-app-hzfqbbexh9etcnff.eastus-01.azurewebsites.net/', collection: 'bd', color: 'rust', tags: ['Fundraising', 'BD'], notes: 'Manage fundraising activity and business development workflows.', favorite: false, shared: false, icon: 'BD', managed: true, deploymentAudience: 'BD' },
    { id: 'project-wires-archive', name: 'Project Wires Archive', url: 'https://gbx-project-wires-report.azurewebsites.net/', collection: 'projects', color: 'navy', tags: ['Report', 'Accounting', 'Finance', 'Projects'], notes: 'Search and review archived project wire reports.', favorite: false, shared: false, icon: '≋', managed: true, deploymentAudience: 'Project Wires Team Members' }
  ],
  requests: [
    { id: 'r1', from: 'Alex Morgan', initials: 'AM', item: { id: 'shared-map', name: 'GBX Project Map', url: 'https://gbxgroup.com/real-estate/project-map/', collection: 'deal', color: 'rust', tags: ['Projects', 'Map'], notes: 'Interactive map of our work nationwide', shared: true, icon: 'PM' }, message: 'Handy for the developer calls this week.' },
    { id: 'r2', from: 'Jamie Chen', initials: 'JC', item: { id: 'shared-brand', name: 'Brand Resource Library', url: 'https://example.com/brand', collection: 'daily', color: 'teal', tags: ['Brand', 'Resources'], notes: 'Logos, templates, and brand guidance', shared: true, icon: 'BR' }, message: 'Here is the latest set of approved materials.' }
  ],
  view: 'grid',
  workspaceView: 'launchpad',
  collectionLayouts: {},
  deletedCollectionIds: [],
  boardLayoutVersion: 4,
  announcement: true,
  announcements: [
    {
      id: 'announcement-impact-forum',
      title: 'Quarterly Impact Forum is next Thursday at 10:00 AM.',
      details: 'Join us in the Foundry or on Teams.',
      audience: 'Everyone',
      status: 'sent',
      actionLabel: 'View details',
      actionUrl: '',
      sentAt: '2026-07-17T09:00:00'
    }
  ],
  catalogDrafts: [
    {
      id: 'atlas',
      name: 'Atlas',
      collection: 'projects',
      color: 'navy',
      tags: ['Reports', 'Project Management'],
      notes: 'Project reporting and management workspace.',
      icon: 'A',
      deploymentAudience: 'EPMs, AMs',
      status: 'needs-url'
    }
  ]
};

const saved = localStorage.getItem('gbx-one-state');
let storedState = null;
let state;
try {
  storedState = saved ? JSON.parse(saved) : null;
  state = storedState ? { ...seed, ...storedState } : structuredClone(seed);
}
catch { state = structuredClone(seed); }
if (!Array.isArray(state.announcements)) state.announcements = structuredClone(seed.announcements);
if (!Array.isArray(state.catalogDrafts)) state.catalogDrafts = structuredClone(seed.catalogDrafts);
if (!Array.isArray(state.deletedCollectionIds)) state.deletedCollectionIds = [];
for (const key of ['hiddenItemIds', 'hiddenCollectionIds', 'deletedManagedItemIds', 'acknowledgedAnnouncementIds']) {
  if (!Array.isArray(state[key])) state[key] = [];
}
state.adminSettings = { organization: 'GBX', defaultAudience: 'Everyone', tags: ['HR', 'Tax', 'Finance', 'Projects'], requireAcknowledgement: true, ...state.adminSettings };
if (!state.collectionLayouts || typeof state.collectionLayouts !== 'object') state.collectionLayouts = {};
if (!['launchpad', 'board'].includes(state.workspaceView)) state.workspaceView = 'launchpad';
if (storedState?.boardLayoutVersion !== seed.boardLayoutVersion) {
  state.collectionLayouts = {};
  state.boardLayoutVersion = seed.boardLayoutVersion;
}
const managedCollectionIds = new Set(['tax', 'hr', 'bd', 'projects']);
seed.collections.filter(collection => managedCollectionIds.has(collection.id)).forEach(collection => {
  if (!state.deletedCollectionIds.includes(collection.id) && !state.collections.some(existing => existing.id === collection.id)) state.collections.push(structuredClone(collection));
});
const managedItemIds = new Set(['form-8283-generator', 'nova', 'bd-app', 'project-wires-archive']);
seed.items.filter(item => managedItemIds.has(item.id)).forEach(item => {
  if (!state.deletedManagedItemIds.includes(item.id) && !state.items.some(existing => existing.id === item.id)) state.items.push(structuredClone(item));
});
state.items.forEach(item => {
  if (!item.owner) item.owner = item.id.startsWith('item-') ? 'user' : (seed.items.some(entry => entry.id === item.id) || item.managed ? 'gbx' : 'shared');
  if (item.owner === 'gbx') item.managed = true;
});
state.collections.forEach(collection => {
  if (!collection.owner) collection.owner = collection.id.startsWith('collection-') ? 'user' : 'gbx';
});
localStorage.setItem('gbx-one-state', JSON.stringify(state));
if (!state.collections.some(collection => collection.id === 'favorites')) {
  state.collections.unshift({ id: 'favorites', name: 'Favorites', color: '#c59a46' });
  state.items.filter(item => item.favorite).forEach(item => { item.collection = 'favorites'; });
  localStorage.setItem('gbx-one-state', JSON.stringify(state));
}

let activeFilter = 'all';
let activeCollection = null;
let query = '';
let draggedId = null;

const board = document.querySelector('#board');
const emptyState = document.querySelector('#emptyState');
const itemCount = document.querySelector('#itemCount');
const boardTitle = document.querySelector('#boardTitle');
const collectionNav = document.querySelector('#collectionNav');
const globalSearch = document.querySelector('#globalSearch');
const searchStatus = document.querySelector('#searchStatus');
const notificationPanel = document.querySelector('#notificationPanel');
const panelScrim = document.querySelector('#panelScrim');

function save() { localStorage.setItem('gbx-one-state', JSON.stringify(state)); }
function initials(name) { return name.split(/\s+/).map(word => word[0]).join('').slice(0, 2).toUpperCase(); }
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]); }
function hostname(url) { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; } }
function autoLogo(url) {
  const host = hostname(url);
  return host && host !== 'example.com' ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128` : '';
}
function brandFor(item) {
  const builtIn = BUILTIN_BRANDS[item.id] || {};
  return { logo: item.forceSymbol ? '' : (item.logo || builtIn.logo || autoLogo(item.url)), symbol: builtIn.symbol || item.icon || '↗' };
}

function formatDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
}

function refreshAnnouncementStatuses() {
  const now = Date.now();
  let changed = false;
  state.announcements.forEach(announcement => {
    if (announcement.status === 'scheduled' && announcement.sendAt && new Date(announcement.sendAt).getTime() <= now) {
      announcement.status = 'sent';
      announcement.sentAt = announcement.sendAt;
      changed = true;
    }
  });
  if (changed) save();
}

function currentAnnouncement() {
  refreshAnnouncementStatuses();
  return [...state.announcements]
    .filter(announcement => announcement.status === 'sent')
    .sort((a, b) => new Date(b.sentAt || 0) - new Date(a.sentAt || 0))[0] || null;
}

function renderAnnouncement() {
  const announcement = currentAnnouncement();
  const banner = document.querySelector('#announcement');
  banner.hidden = !announcement || !state.announcement;
  if (!announcement) return;
  document.querySelector('#announcementTitle').textContent = announcement.title;
  document.querySelector('#announcementDetails').textContent = announcement.details || announcement.audience;
  const link = document.querySelector('#announcementLink');
  link.innerHTML = `${escapeHtml(announcement.actionLabel || 'View details')} <span>→</span>`;
  link.hidden = !announcement.actionUrl;
  link.dataset.url = announcement.actionUrl || '';
  document.querySelector('#dismissAnnouncement').hidden = Boolean(announcement.requireAcknowledgement && !state.acknowledgedAnnouncementIds.includes(announcement.id));
}

function setAdminTab(name) {
  document.querySelectorAll('[data-admin-tab]').forEach(button => {
    const active = button.dataset.adminTab === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-admin-panel]').forEach(panel => {
    const active = panel.dataset.adminPanel === name;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });
}

function renderAdmin() {
  refreshAnnouncementStatuses();
  document.querySelector('#adminAppCount').textContent = state.items.length;
  document.querySelector('#adminScheduledCount').textContent = state.announcements.filter(item => item.status === 'scheduled').length;
  document.querySelector('#adminLibraryCount').textContent = `${state.items.length} live · ${state.catalogDrafts.length} draft`;
  const collectionSelect = document.querySelector('#adminAppCollection');
  const selectedCollection = collectionSelect.value;
  collectionSelect.innerHTML = state.collections.map(collection => `<option value="${collection.id}">${escapeHtml(collection.name)}</option>`).join('');
  if (state.collections.some(collection => collection.id === selectedCollection)) collectionSelect.value = selectedCollection;

  const liveAppRows = state.items.map(item => {
    const collection = state.collections.find(entry => entry.id === item.collection);
    const audience = item.deploymentAudience || 'Everyone';
    return `<div class="admin-list-item">
      <div class="admin-list-primary">
        <span class="admin-list-icon" style="--item-color:${COLORS[item.color] || item.color || COLORS.teal}">${escapeHtml(initials(item.name))}</span>
        <span class="admin-list-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(collection?.name || 'Unassigned')} · ${escapeHtml(audience)}</small></span>
      </div>
      <div class="admin-row-actions">
        <span class="status-pill">${item.owner === 'user' ? 'Personal' : 'GBX'}</span>
        ${item.owner === 'gbx' ? `<button type="button" class="button secondary" data-management="admin-edit" data-id="${item.id}">Edit</button><button type="button" class="button secondary" data-management="admin-announce" data-id="${item.id}">Announce</button><button type="button" class="button danger-button" data-management="admin-delete" data-id="${item.id}">Delete</button>` : ''}
      </div>
      ${(item.tags || []).length ? `<div class="admin-tags">${item.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
    </div>`;
  }).join('');
  const draftAppRows = state.catalogDrafts.map(item => {
    const collection = state.collections.find(entry => entry.id === item.collection);
    return `<div class="admin-list-item">
      <div class="admin-list-primary">
        <span class="admin-list-icon" style="--item-color:${COLORS[item.color] || item.color || COLORS.navy}">${escapeHtml(item.icon || initials(item.name))}</span>
        <span class="admin-list-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(collection?.name || 'Unassigned')} · ${escapeHtml(item.deploymentAudience)} · URL needed</small></span>
      </div>
      <span class="status-pill scheduled">Draft</span>
    </div>`;
  }).join('');
  document.querySelector('#adminAppList').innerHTML = liveAppRows + draftAppRows;

  const announcements = [...state.announcements].sort((a, b) => new Date(b.sendAt || b.sentAt || 0) - new Date(a.sendAt || a.sentAt || 0));
  document.querySelector('#adminAnnouncementList').innerHTML = announcements.length ? announcements.map(announcement => {
    const when = announcement.status === 'scheduled' ? `Scheduled ${formatDateTime(announcement.sendAt)}` : `Sent ${formatDateTime(announcement.sentAt)}`;
    return `<div class="admin-list-item">
      <div class="admin-list-primary">
        <span class="admin-list-icon" style="--item-color:${announcement.status === 'scheduled' ? COLORS.gold : COLORS.teal}">A</span>
        <span class="admin-list-copy"><strong>${escapeHtml(announcement.title)}</strong><small>${escapeHtml(announcement.audience)} · ${escapeHtml(when)}</small></span>
      </div>
      <div class="admin-row-actions"><span class="status-pill ${announcement.status === 'scheduled' ? 'scheduled' : ''}">${escapeHtml(announcement.status)}</span><button type="button" class="button danger-button" data-management="delete-announcement" data-id="${announcement.id}">Delete</button></div>
    </div>`;
  }).join('') : '<div class="admin-empty">No announcements have been created yet.</div>';
}

function openAdminDialog() {
  renderAdmin();
  if (typeof prepareAdminSettings === 'function') prepareAdminSettings();
  setAdminTab('apps');
  document.querySelector('#adminDialog').showModal();
}

function filteredItems() {
  return state.items.filter(item => {
    if (state.hiddenItemIds.includes(item.id) || state.hiddenCollectionIds.includes(item.collection)) return false;
    const haystack = [item.name, item.notes, item.url, ...(item.tags || [])].join(' ').toLowerCase();
    const matchesQuery = !query || haystack.includes(query.toLowerCase());
    const matchesCollection = !activeCollection || item.collection === activeCollection;
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'favorite' && item.favorite) || (activeFilter === 'shared' && item.shared) || activeFilter === 'recent';
    return matchesQuery && matchesCollection && matchesFilter;
  });
}

function minimumCollectionHeight(itemCount, width) {
  const tileSize = 132;
  const tileGap = 12;
  const contentWidth = Math.max(1, width - 34);
  const columns = Math.max(1, Math.min(itemCount || 1, Math.floor((contentWidth + tileGap) / (112 + tileGap))));
  const rows = Math.max(1, Math.ceil(itemCount / columns));
  return 56 + 36 + rows * tileSize + (rows - 1) * tileGap;
}

function snapBoardValue(value) {
  return Math.round(value / BOARD_GRID) * BOARD_GRID;
}

function snapBoardSize(value, minimum = BOARD_GRID) {
  return Math.max(minimum, Math.ceil(value / BOARD_GRID) * BOARD_GRID);
}

function defaultCollectionLayout(itemCount, containerWidth) {
  const tileSize = 132;
  const tileGap = 12;
  const columns = Math.min(3, Math.max(1, itemCount));
  const width = Math.min(containerWidth, snapBoardSize(Math.max(240, columns * tileSize + (columns - 1) * tileGap + 34)));
  const height = snapBoardSize(minimumCollectionHeight(itemCount, width));
  return {
    x: 0,
    y: 0,
    w: width,
    h: height
  };
}

function rectanglesOverlap(first, second, gap = 10) {
  return !(
    first.left + first.width + gap <= second.left ||
    second.left + second.width + gap <= first.left ||
    first.top + first.height + gap <= second.top ||
    second.top + second.height + gap <= first.top
  );
}

function findOpenBoardPosition(desired, width, height, containerWidth, placed) {
  const maxLeft = Math.max(0, containerWidth - width);
  const preferred = { left: Math.min(Math.max(0, desired.left), maxLeft), top: Math.max(0, desired.top), width, height };
  if (!placed.some(rectangle => rectanglesOverlap(preferred, rectangle))) return preferred;

  const xCandidates = [...new Set([0, ...placed.map(rectangle => Math.min(maxLeft, rectangle.left + rectangle.width + 16))])].sort((a, b) => a - b);
  const yCandidates = [...new Set([0, ...placed.map(rectangle => rectangle.top + rectangle.height + 16)])].sort((a, b) => a - b);
  for (const top of yCandidates) {
    for (const left of xCandidates) {
      const candidate = { left, top, width, height };
      if (!placed.some(rectangle => rectanglesOverlap(candidate, rectangle))) return candidate;
    }
  }
  const fallbackTop = placed.reduce((maximum, rectangle) => Math.max(maximum, rectangle.top + rectangle.height + 16), 0);
  return { left: 0, top: fallbackTop, width, height };
}

function collectionWouldOverlap(section, left, top, width, height) {
  const candidate = { left, top, width, height };
  return [...board.querySelectorAll('.collection')]
    .filter(other => other !== section)
    .some(other => rectanglesOverlap(candidate, {
      left: other.offsetLeft,
      top: other.offsetTop,
      width: other.offsetWidth,
      height: other.offsetHeight
    }));
}

function updateBoardCanvasHeight() {
  if (state.workspaceView !== 'board') {
    board.style.minHeight = '';
    return;
  }
  const sections = [...board.querySelectorAll('.collection')];
  const bottom = sections.reduce((maximum, section) => Math.max(maximum, section.offsetTop + section.offsetHeight), 0);
  board.style.minHeight = `${Math.max(420, bottom + 22)}px`;
}

function applyBoardLayouts() {
  const sections = [...board.querySelectorAll('.collection')];
  if (window.innerWidth <= 760) {
    sections.forEach(section => {
      ['left', 'top', 'width', 'height'].forEach(property => section.style.removeProperty(property));
    });
    board.style.minHeight = '';
    return;
  }
  const containerWidth = Math.max(280, board.clientWidth || 900);
  let created = false;
  let normalized = false;
  const placed = [];
  sections.forEach((section, index) => {
    const id = section.dataset.collection;
    if (!state.collectionLayouts[id]) {
      state.collectionLayouts[id] = defaultCollectionLayout(section.querySelectorAll('.link-tile').length, containerWidth);
      created = true;
    }
    const savedLayout = state.collectionLayouts[id];
    const minimumWidth = Math.min(240, containerWidth);
    const width = Math.min(snapBoardSize(Math.max(Number(savedLayout.w) || minimumWidth, minimumWidth), minimumWidth), containerWidth);
    const contentMinimumHeight = minimumCollectionHeight(section.querySelectorAll('.link-tile').length, width);
    const height = Math.min(snapBoardSize(Math.max(Number(savedLayout.h) || contentMinimumHeight, contentMinimumHeight), contentMinimumHeight), 640);
    const desiredLeft = snapBoardValue(Number(savedLayout.x) || 0);
    const desiredTop = snapBoardValue(Number(savedLayout.y) || 0);
    const position = findOpenBoardPosition({ left: desiredLeft, top: desiredTop }, width, height, containerWidth, placed);
    if (position.left !== Number(savedLayout.x) || position.top !== Number(savedLayout.y)) normalized = true;
    section.style.left = `${position.left}px`;
    section.style.top = `${position.top}px`;
    section.style.width = `${width}px`;
    section.style.height = `${height}px`;
    placed.push(position);
    if (normalized && window.innerWidth > 760) {
      state.collectionLayouts[id] = { x: position.left, y: position.top, w: width, h: height };
    }
  });
  if (created || (normalized && window.innerWidth > 760)) save();
  updateBoardCanvasHeight();
}

function saveCollectionLayout(section) {
  state.collectionLayouts[section.dataset.collection] = {
    x: Math.round(parseFloat(section.style.left) || section.offsetLeft),
    y: Math.round(parseFloat(section.style.top) || section.offsetTop),
    w: Math.round(section.offsetWidth),
    h: Math.round(section.offsetHeight)
  };
  save();
}

function saveAllCollectionLayouts() {
  board.querySelectorAll('.collection').forEach(section => {
    state.collectionLayouts[section.dataset.collection] = {
      x: Math.round(section.offsetLeft),
      y: Math.round(section.offsetTop),
      w: Math.round(section.offsetWidth),
      h: Math.round(section.offsetHeight)
    };
  });
  save();
}

function pushCollidingCollectionsDown(source) {
  const queue = [source];
  const processed = new Set();
  while (queue.length) {
    const current = queue.shift();
    if (processed.has(current)) continue;
    processed.add(current);
    const currentRect = { left: current.offsetLeft, top: current.offsetTop, width: current.offsetWidth, height: current.offsetHeight };
    board.querySelectorAll('.collection').forEach(other => {
      if (other === current) return;
      const otherRect = { left: other.offsetLeft, top: other.offsetTop, width: other.offsetWidth, height: other.offsetHeight };
      if (!rectanglesOverlap(currentRect, otherRect)) return;
      const pushedTop = snapBoardValue(currentRect.top + currentRect.height + BOARD_GRID);
      if (other.offsetTop < pushedTop) {
        other.style.top = `${pushedTop}px`;
        queue.push(other);
      }
    });
  }
}

function bindCollectionBoardInteractions() {
  board.querySelectorAll('.collection').forEach(section => {
    const header = section.querySelector('.collection-header');
    const resizeHandles = section.querySelectorAll('.collection-resize-handle');

    header.addEventListener('pointerdown', event => {
      if (window.innerWidth <= 760) return;
      if (event.button !== 0 || event.target.closest('button')) return;
      event.preventDefault();
      const boardRect = board.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const start = { x: event.clientX, y: event.clientY, left: sectionRect.left - boardRect.left, top: sectionRect.top - boardRect.top };
      section.classList.add('collection-moving');
      section.style.zIndex = '5';
      header.setPointerCapture(event.pointerId);

      const move = moveEvent => {
        const maxLeft = Math.max(0, board.clientWidth - section.offsetWidth);
        const nextLeft = Math.min(maxLeft, Math.max(0, snapBoardValue(start.left + moveEvent.clientX - start.x)));
        const nextTop = Math.max(0, snapBoardValue(start.top + moveEvent.clientY - start.y));
        section.style.left = `${nextLeft}px`;
        section.style.top = `${nextTop}px`;
        updateBoardCanvasHeight();
      };
      const finish = () => {
        header.removeEventListener('pointermove', move);
        header.removeEventListener('pointerup', finish);
        header.removeEventListener('pointercancel', finish);
        section.classList.remove('collection-moving');
        section.style.zIndex = '';
        pushCollidingCollectionsDown(section);
        saveAllCollectionLayouts();
        updateBoardCanvasHeight();
      };
      header.addEventListener('pointermove', move);
      header.addEventListener('pointerup', finish);
      header.addEventListener('pointercancel', finish);
    });

    resizeHandles.forEach(resizeHandle => resizeHandle.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      const corner = resizeHandle.dataset.resizeCorner;
      const start = {
        x: event.clientX,
        y: event.clientY,
        left: section.offsetLeft,
        top: section.offsetTop,
        width: section.offsetWidth,
        height: section.offsetHeight
      };
      const originalLayouts = new Map([...board.querySelectorAll('.collection')].map(other => [other, {
        left: other.offsetLeft,
        top: other.offsetTop,
        width: other.offsetWidth,
        height: other.offsetHeight
      }]));
      section.classList.add('collection-resizing');
      section.style.zIndex = '5';
      resizeHandle.setPointerCapture(event.pointerId);

      const resize = moveEvent => {
        const dx = moveEvent.clientX - start.x;
        const dy = moveEvent.clientY - start.y;
        const minimumWidth = Math.min(240, board.clientWidth);
        const appCount = section.querySelectorAll('.link-tile').length;
        const right = start.left + start.width;
        const bottom = start.top + start.height;
        let nextLeft = start.left;
        let nextTop = start.top;
        let nextWidth = start.width;
        let nextHeight = start.height;

        if (corner.includes('e')) nextWidth = Math.min(board.clientWidth - start.left, snapBoardSize(start.width + dx, minimumWidth));
        if (corner.includes('w')) {
          nextLeft = Math.min(right - minimumWidth, Math.max(0, snapBoardValue(start.left + dx)));
          nextWidth = right - nextLeft;
        }
        const minimumHeight = minimumCollectionHeight(appCount, nextWidth);
        if (corner.includes('s')) nextHeight = Math.min(640, snapBoardSize(start.height + dy, minimumHeight));
        if (corner.includes('n')) {
          nextTop = Math.min(bottom - minimumHeight, Math.max(0, snapBoardValue(start.top + dy)));
          nextHeight = bottom - nextTop;
        }

        originalLayouts.forEach((layout, other) => {
          if (other === section) return;
          other.style.left = `${layout.left}px`;
          other.style.top = `${layout.top}px`;
        });
        section.style.left = `${nextLeft}px`;
        section.style.top = `${nextTop}px`;
        section.style.width = `${nextWidth}px`;
        section.style.height = `${nextHeight}px`;

        const bottomDelta = nextTop + nextHeight - (start.top + start.height);
        if (bottomDelta !== 0) {
          originalLayouts.forEach((layout, other) => {
            if (other !== section && layout.top > start.top + 4) other.style.top = `${Math.max(0, layout.top + bottomDelta)}px`;
          });
        }
        pushCollidingCollectionsDown(section);
        updateBoardCanvasHeight();
      };
      const finish = () => {
        resizeHandle.removeEventListener('pointermove', resize);
        resizeHandle.removeEventListener('pointerup', finish);
        resizeHandle.removeEventListener('pointercancel', finish);
        section.classList.remove('collection-resizing');
        section.style.zIndex = '';
        saveAllCollectionLayouts();
        updateBoardCanvasHeight();
      };
      resizeHandle.addEventListener('pointermove', resize);
      resizeHandle.addEventListener('pointerup', finish);
      resizeHandle.addEventListener('pointercancel', finish);
    }));
  });
}

function render() {
  renderNav();
  const items = filteredItems();
  const visibleCollections = state.collections.filter(collection => !state.hiddenCollectionIds.includes(collection.id) && (!activeCollection || collection.id === activeCollection));
  const boardView = state.workspaceView === 'board';
  document.body.classList.toggle('workspace-board-active', boardView);
  board.className = `board view-${state.view}${boardView ? ' board-mode' : ''}`;
  board.innerHTML = visibleCollections.map(collection => {
    const collectionItems = items.filter(item => item.collection === collection.id);
    if ((query || activeFilter !== 'all') && !collectionItems.length) return '';
    return `
      <section class="collection" style="--collection-color:${collection.color}" data-collection="${collection.id}">
        <header class="collection-header">
          <span class="collection-accent"></span>
          <h3>${escapeHtml(collection.name)}</h3>
          <span class="collection-size">${collectionItems.length}</span>
          <button class="collection-share" data-action="share-collection" data-id="${collection.id}" aria-label="Share ${escapeHtml(collection.name)}">
            <svg class="share-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"></circle><circle cx="6" cy="12" r="2.5"></circle><circle cx="18" cy="19" r="2.5"></circle><path d="M8.2 10.8 15.8 6.3M8.2 13.2l7.6 4.5"></path></svg>
            <span>Share</span>
          </button>
          <div class="collection-menu-wrap">
            <button class="collection-menu" data-action="toggle-collection-menu" data-id="${collection.id}" aria-label="Open menu for ${escapeHtml(collection.name)}">•••</button>
            <div class="collection-menu-popover" data-collection-menu="${collection.id}" hidden>
              <button type="button" data-management="hide-collection" data-id="${collection.id}">Hide collection</button>
              ${collection.owner === 'user' ? `<button type="button" data-action="rename-collection" data-id="${collection.id}">Rename</button><button type="button" class="danger" data-action="delete-collection" data-id="${collection.id}">Delete</button>` : ''}
            </div>
          </div>
        </header>
        <div class="tile-list" data-collection="${collection.id}">
          ${collectionItems.map(tileTemplate).join('')}
        </div>
        <span class="collection-resize-handle resize-nw" data-resize-corner="nw" aria-hidden="true"></span>
        <span class="collection-resize-handle resize-ne" data-resize-corner="ne" aria-hidden="true"></span>
        <span class="collection-resize-handle resize-sw" data-resize-corner="sw" aria-hidden="true"></span>
        <span class="collection-resize-handle resize-se" data-resize-corner="se" aria-hidden="true"></span>
      </section>`;
  }).join('');

  itemCount.textContent = `${items.length} ${items.length === 1 ? 'item' : 'items'}`;
  if (!activeCollection) boardTitle.textContent = boardView ? 'My board' : 'My launchpad';
  document.querySelector('#boardModeHelp').hidden = !boardView;
  document.querySelector('#organizeBtn').textContent = boardView ? 'Reset board' : 'Organize';
  document.querySelectorAll('[data-workspace-view]').forEach(button => {
    const active = button.dataset.workspaceView === state.workspaceView;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  emptyState.hidden = items.length > 0;
  board.hidden = items.length === 0;
  searchStatus.hidden = !query;
  searchStatus.textContent = query ? `Showing results for “${query}” across names, notes, and tags.` : '';
  document.querySelectorAll('.view-button').forEach(button => button.classList.toggle('active', button.dataset.view === state.view));
  renderAnnouncement();
  document.querySelectorAll('.logo-image').forEach(image => image.addEventListener('error', () => {
    image.hidden = true;
    const fallback = image.nextElementSibling;
    if (fallback) fallback.style.display = 'grid';
  }, { once: true }));
  bindDragAndDrop();
  if (boardView) {
    applyBoardLayouts();
    bindCollectionBoardInteractions();
  }
  renderRequests();
  if (typeof presentRequiredAnnouncement === 'function') queueMicrotask(presentRequiredAnnouncement);
}

function tileTemplate(item) {
  const color = COLORS[item.color] || item.color || COLORS.teal;
  const brand = brandFor(item);
  if (state.workspaceView === 'board' && !item.logo && !BUILTIN_BRANDS[item.id]?.logo && /\.(azurewebsites|azurestaticapps)\.net$/.test(hostname(item.url))) {
    brand.logo = '';
  }
  const logo = brand.logo ? `<img class="logo-image" src="${escapeHtml(brand.logo)}" alt="" loading="lazy" referrerpolicy="no-referrer" />` : '';
  return `
    <article class="link-tile" draggable="true" data-id="${item.id}" style="--tile-color:${color}" tabindex="0" aria-label="${escapeHtml(item.name)}">
      <div class="tile-top">
        <div class="tile-actions">
          <button class="tile-action" data-action="favorite" data-id="${item.id}" aria-label="${item.favorite ? 'Remove from' : 'Add to'} favorites">${item.favorite ? '★' : '☆'}</button>
          <button class="tile-action" data-action="share" data-id="${item.id}" aria-label="Share ${escapeHtml(item.name)}">↗</button>
          <button class="tile-action" data-action="edit" data-id="${item.id}" aria-label="Edit ${escapeHtml(item.name)}">•••</button>
        </div>
      </div>
      <div class="logo-stage" data-action="open" data-id="${item.id}">
        <span class="app-logo">${logo}<span class="logo-symbol${brand.symbol.length > 2 ? ' logo-monogram' : ''}"${brand.logo ? ' style="display:none"' : ''}>${escapeHtml(brand.symbol)}</span></span>
      </div>
      <div class="tile-content" data-action="open" data-id="${item.id}">
        <h4 class="tile-title">${escapeHtml(item.name)}</h4>
        <p class="tile-notes">${escapeHtml(hostname(item.url) || item.notes || 'GBX application')}</p>
        <div class="tile-footer">
          <div class="tag-list">${(item.tags || []).slice(0, 2).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
          <span class="open-arrow">↗</span>
        </div>
      </div>
    </article>`;
}

function renderNav() {
  collectionNav.innerHTML = state.collections.filter(collection => !state.hiddenCollectionIds.includes(collection.id)).map(collection => `
    <button class="nav-item ${activeCollection === collection.id ? 'active' : ''}" data-collection-filter="${collection.id}">
      <span class="collection-dot" style="background:${collection.color}"></span><span>${escapeHtml(collection.name)}</span>
    </button>`).join('');
}

function renderRequests() {
  const badge = document.querySelector('#notificationBadge');
  badge.textContent = state.requests.length;
  badge.hidden = state.requests.length === 0;
  document.querySelectorAll('.nav-count').forEach(el => el.textContent = state.requests.length);
  const container = document.querySelector('#shareRequests');
  container.innerHTML = state.requests.length ? state.requests.map(request => `
    <article class="share-request">
      <div class="request-meta"><span class="request-avatar">${request.initials}</span><div><strong>${escapeHtml(request.from)} shared a link</strong><small>Just now · GBX One</small></div></div>
      <div class="request-link" style="--request-color:${COLORS[request.item.color]}"><strong>${escapeHtml(request.item.name)}</strong><p>${escapeHtml(request.message)}</p></div>
      <div class="request-actions"><button class="button secondary" data-request-action="decline" data-id="${request.id}">Decline</button><button class="button primary" data-request-action="accept" data-id="${request.id}">Add to launchpad</button></div>
    </article>`).join('') : '<div class="request-done">You’re all caught up. Shared links will appear here.</div>';
}

function bindDragAndDrop() {
  document.querySelectorAll('.link-tile').forEach(tile => {
    tile.addEventListener('dragstart', event => { draggedId = tile.dataset.id; tile.classList.add('dragging'); event.dataTransfer.effectAllowed = 'move'; });
    tile.addEventListener('dragend', () => { draggedId = null; tile.classList.remove('dragging'); document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over')); });
  });
  document.querySelectorAll('.tile-list').forEach(list => {
    list.addEventListener('dragover', event => { event.preventDefault(); list.classList.add('drag-over'); });
    list.addEventListener('dragleave', event => { if (!list.contains(event.relatedTarget)) list.classList.remove('drag-over'); });
    list.addEventListener('drop', event => {
      event.preventDefault(); list.classList.remove('drag-over');
      if (!draggedId) return;
      const item = state.items.find(entry => entry.id === draggedId);
      const targetTile = event.target.closest('.link-tile');
      item.collection = list.dataset.collection;
      if (targetTile && targetTile.dataset.id !== draggedId) {
        const from = state.items.findIndex(entry => entry.id === draggedId);
        const to = state.items.findIndex(entry => entry.id === targetTile.dataset.id);
        const [moved] = state.items.splice(from, 1); state.items.splice(to, 0, moved);
      }
      save(); render(); toast('Launchpad order updated');
    });
  });
}

function openLinkDialog(item = null, collectionId = null) {
  if (item && item.owner !== 'user') { toast('GBX links can be hidden. Use Admin center to edit published links.'); return; }
  document.querySelector('#linkDialogTitle').textContent = item ? 'Edit link' : 'Add a link';
  document.querySelector('#editId').value = item?.id || '';
  document.querySelector('#linkName').value = item?.name || '';
  document.querySelector('#linkUrl').value = item?.url || 'https://';
  document.querySelector('#linkLogo').value = item?.logo || '';
  document.querySelector('#linkColor').value = item?.color || 'teal';
  document.querySelector('#linkTags').value = (item?.tags || []).join(', ');
  document.querySelector('#linkNotes').value = item?.notes || '';
  const select = document.querySelector('#linkCollection');
  select.innerHTML = state.collections.map(collection => `<option value="${collection.id}">${escapeHtml(collection.name)}</option>`).join('');
  select.value = item?.collection || collectionId || state.collections[0]?.id;
  document.querySelector('#linkDialog').showModal();
  setTimeout(() => document.querySelector('#linkName').focus(), 50);
}

function openShareDialog(item) {
  document.querySelector('#shareDialogTitle').textContent = 'Send link to a coworker';
  document.querySelector('#shareCollectionId').value = '';
  document.querySelector('#shareItemId').value = item.id;
  document.querySelector('#sharePreview').style.setProperty('--preview-color', COLORS[item.color]);
  document.querySelector('#sharePreview').innerHTML = `<span class="app-icon">${escapeHtml(item.icon)}</span><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.url)}</small></div>`;
  document.querySelector('#shareForm').reset();
  document.querySelector('#shareItemId').value = item.id;
  document.querySelector('#shareDialog').showModal();
}

function openCollectionShare(collection) {
  const count = state.items.filter(item => item.collection === collection.id).length;
  document.querySelector('#shareForm').reset();
  document.querySelector('#shareDialogTitle').textContent = 'Share a collection';
  document.querySelector('#shareItemId').value = '';
  document.querySelector('#shareCollectionId').value = collection.id;
  document.querySelector('#sharePreview').style.setProperty('--preview-color', collection.color);
  document.querySelector('#sharePreview').innerHTML = `<span class="collection-preview-icon">▦</span><div><strong>${escapeHtml(collection.name)}</strong><small>${count} ${count === 1 ? 'link' : 'links'} · shared as a collection</small></div>`;
  document.querySelector('#shareDialog').showModal();
}

function setPanel(open) {
  notificationPanel.classList.toggle('open', open); panelScrim.classList.toggle('open', open);
  notificationPanel.setAttribute('aria-hidden', String(!open));
}

function toast(message) {
  const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = `<span class="toast-mark">✓</span><span>${escapeHtml(message)}</span>`;
  document.querySelector('#toastRegion').append(el); setTimeout(() => el.remove(), 3200);
}

document.addEventListener('click', event => {
  if (!event.target.closest('.collection-menu-wrap')) {
    document.querySelectorAll('.collection-menu-popover').forEach(menu => { menu.hidden = true; });
  }
  const close = event.target.closest('[data-close]'); if (close) document.querySelector(`#${close.dataset.close}`).close();
  if (event.target.closest('[data-action="add-link"]')) openLinkDialog();
  const action = event.target.closest('[data-action]'); if (!action) return;
  const item = state.items.find(entry => entry.id === action.dataset.id);
  if (action.dataset.action === 'toggle-collection-menu') {
    const targetMenu = document.querySelector(`[data-collection-menu="${action.dataset.id}"]`);
    document.querySelectorAll('.collection-menu-popover').forEach(menu => {
      if (menu !== targetMenu) menu.hidden = true;
    });
    targetMenu.hidden = !targetMenu.hidden;
  }
  if (action.dataset.action === 'share-collection') {
    const collection = state.collections.find(entry => entry.id === action.dataset.id);
    if (collection) openCollectionShare(collection);
  }
  if (action.dataset.action === 'add-to') openLinkDialog(null, action.dataset.collection);
  if (action.dataset.action === 'favorite' && item) { item.favorite = !item.favorite; save(); render(); toast(item.favorite ? 'Added to favorites' : 'Removed from favorites'); }
  if (action.dataset.action === 'share' && item) openShareDialog(item);
  if (action.dataset.action === 'edit' && item) openLinkDialog(item);
  if (action.dataset.action === 'open' && item) window.open(item.url, '_blank', 'noopener,noreferrer');
  if (action.dataset.action === 'rename-collection') {
    const collection = state.collections.find(entry => entry.id === action.dataset.id);
    if (!collection || collection.owner !== 'user') return;
    const name = prompt('Rename this collection', collection.name);
    if (name?.trim()) { collection.name = name.trim(); save(); render(); toast('Collection renamed'); }
  }
  if (action.dataset.action === 'delete-collection') {
    const collection = state.collections.find(entry => entry.id === action.dataset.id);
    if (!collection || collection.owner !== 'user') return;
    const appCount = state.items.filter(entry => entry.collection === collection.id).length;
    const message = appCount
      ? `Delete ${collection.name}? Its ${appCount} ${appCount === 1 ? 'app' : 'apps'} will move to Favorites.`
      : `Delete ${collection.name}?`;
    if (!confirm(message)) return;
    state.items.filter(entry => entry.collection === collection.id).forEach(entry => { entry.collection = 'favorites'; });
    state.collections = state.collections.filter(entry => entry.id !== collection.id);
    if (!state.deletedCollectionIds.includes(collection.id)) state.deletedCollectionIds.push(collection.id);
    delete state.collectionLayouts[collection.id];
    if (activeCollection === collection.id) activeCollection = null;
    save();
    render();
    toast(`${collection.name} deleted${appCount ? '; apps moved to Favorites' : ''}`);
  }
});

document.querySelector('#addLinkBtn').addEventListener('click', () => openLinkDialog());
document.querySelectorAll('#newCollectionBtn, #newCollectionSide').forEach(button => button.addEventListener('click', () => document.querySelector('#collectionDialog').showModal()));
document.querySelector('#notificationBtn').addEventListener('click', () => setPanel(true));
document.querySelector('#closeNotifications').addEventListener('click', () => setPanel(false));
panelScrim.addEventListener('click', () => setPanel(false));
document.querySelector('#dismissAnnouncement').addEventListener('click', () => { state.announcement = false; save(); render(); });
document.querySelectorAll('[data-workspace-view]').forEach(button => button.addEventListener('click', () => {
  state.workspaceView = button.dataset.workspaceView;
  if (state.workspaceView === 'board') {
    activeCollection = null;
    activeFilter = 'all';
    query = '';
    globalSearch.value = '';
  }
  save();
  render();
  toast(state.workspaceView === 'board' ? 'Board view ready — move and resize your collections' : 'Compact launchpad restored');
}));
document.querySelector('#organizeBtn').addEventListener('click', () => {
  if (state.workspaceView === 'board') {
    if (!confirm('Reset every collection to the default board arrangement?')) return;
    state.collectionLayouts = {};
    save();
    render();
    toast('Board arrangement reset');
    return;
  }
  document.querySelector('#sortHint').textContent = 'Grab any tile and drop it in a new spot';
  toast('Organization mode ready — drag any tile');
});
document.querySelector('#customizeBtn').addEventListener('click', openAdminDialog);
document.querySelector('#announcementLink').addEventListener('click', event => {
  const url = event.currentTarget.dataset.url;
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('[data-admin-tab]').forEach(button => button.addEventListener('click', () => setAdminTab(button.dataset.adminTab)));

document.querySelector('#adminAnnouncementDelivery').addEventListener('change', event => {
  const scheduled = event.target.value === 'scheduled';
  document.querySelector('#scheduleField').hidden = !scheduled;
  document.querySelector('#adminAnnouncementSendAt').required = scheduled;
  document.querySelector('#announcementSubmit').textContent = scheduled ? 'Schedule announcement' : 'Send announcement';
  document.querySelector('#announcementDeliveryHint').textContent = scheduled
    ? 'The announcement will appear automatically at the selected time.'
    : 'This message will appear as soon as you send it.';
});

document.querySelector('#adminAppForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#adminAppName').value.trim();
  const editingId = document.querySelector('#adminEditId').value;
  const existing = state.items.find(item => item.id === editingId && item.owner === 'gbx');
  if (editingId && !existing) return;
  const publishedItem = {
    id: existing?.id || `managed-${crypto.randomUUID()}`,
    name,
    url: document.querySelector('#adminAppUrl').value.trim(),
    logo: document.querySelector('#adminAppLogo').value.trim(),
    collection: document.querySelector('#adminAppCollection').value,
    color: document.querySelector('#adminAppColor').value,
    tags: document.querySelector('#adminAppTags').value.split(',').map(tag => tag.trim()).filter(Boolean),
    notes: document.querySelector('#adminAppNotes').value.trim(),
    favorite: existing?.favorite || false,
    shared: existing?.shared || false,
    icon: initials(name),
    managed: true,
    owner: 'gbx',
    deploymentAudience: document.querySelector('#adminAppAudience').value,
    deployedAt: new Date().toISOString()
  };
  if (existing) Object.assign(existing, publishedItem);
  else state.items.push(publishedItem);
  if (document.querySelector('#adminAppAnnounce').checked) createAppAnnouncement(publishedItem);
  save();
  event.currentTarget.reset();
  resetAdminAppForm();
  render();
  renderAdmin();
  toast(`${name} ${existing ? 'updated' : 'published'}`);
});

document.querySelector('#announcementForm').addEventListener('submit', event => {
  event.preventDefault();
  const delivery = document.querySelector('#adminAnnouncementDelivery').value;
  const scheduled = delivery === 'scheduled';
  const sendAt = document.querySelector('#adminAnnouncementSendAt').value;
  const title = document.querySelector('#adminAnnouncementTitle').value.trim();
  state.announcements.push({
    id: `announcement-${Date.now()}`,
    title,
    details: document.querySelector('#adminAnnouncementDetails').value.trim(),
    audience: document.querySelector('#adminAnnouncementAudience').value,
    appId: document.querySelector('#adminAnnouncementApp').value || null,
    requireAcknowledgement: Boolean(document.querySelector('#adminAnnouncementApp').value) || document.querySelector('#adminAnnouncementRequired').checked,
    status: scheduled ? 'scheduled' : 'sent',
    sendAt: scheduled ? sendAt : null,
    sentAt: scheduled ? null : new Date().toISOString(),
    actionLabel: document.querySelector('#adminAnnouncementAction').value.trim() || 'View details',
    actionUrl: document.querySelector('#adminAnnouncementUrl').value.trim()
  });
  if (!scheduled) state.announcement = true;
  save();
  event.currentTarget.reset();
  document.querySelector('#scheduleField').hidden = true;
  document.querySelector('#adminAnnouncementSendAt').required = false;
  document.querySelector('#announcementSubmit').textContent = 'Send announcement';
  document.querySelector('#adminAnnouncementRequired').disabled = false;
  document.querySelector('#adminAnnouncementRequired').checked = state.adminSettings.requireAcknowledgement;
  document.querySelector('#announcementDeliveryHint').textContent = 'This message will appear as soon as you send it.';
  render();
  renderAdmin();
  toast(scheduled ? `${title} scheduled` : `${title} sent to employees`);
});

document.querySelector('#linkForm').addEventListener('submit', () => {
  const id = document.querySelector('#editId').value;
  if (id && !state.items.some(item => item.id === id && item.owner === 'user')) return;
  const data = {
    name: document.querySelector('#linkName').value.trim(), url: document.querySelector('#linkUrl').value.trim(), logo: document.querySelector('#linkLogo').value.trim(),
    collection: document.querySelector('#linkCollection').value, color: document.querySelector('#linkColor').value,
    tags: document.querySelector('#linkTags').value.split(',').map(tag => tag.trim()).filter(Boolean),
    notes: document.querySelector('#linkNotes').value.trim()
  };
  if (id) Object.assign(state.items.find(item => item.id === id), data);
  else state.items.push({ id: `item-${crypto.randomUUID()}`, ...data, favorite: false, shared: false, icon: initials(data.name), owner: 'user', managed: false });
  save(); render(); toast(id ? 'Link updated' : 'Link added to your launchpad');
});

document.querySelector('#collectionForm').addEventListener('submit', () => {
  const name = document.querySelector('#collectionName').value.trim();
  state.collections.push({ id: `collection-${crypto.randomUUID()}`, name, color: document.querySelector('#collectionColor').value, owner: 'user' });
  save(); render(); document.querySelector('#collectionForm').reset(); toast(`${name} created`);
});

document.querySelector('#shareForm').addEventListener('submit', () => {
  const person = document.querySelector('#sharePerson').value;
  const collectionId = document.querySelector('#shareCollectionId').value;
  const collection = state.collections.find(entry => entry.id === collectionId);
  toast(collection ? `${collection.name} shared with ${person}` : `Link sent to ${person}`);
  document.querySelector('#shareForm').reset();
});

document.querySelector('#shareRequests').addEventListener('click', event => {
  const button = event.target.closest('[data-request-action]'); if (!button) return;
  const index = state.requests.findIndex(request => request.id === button.dataset.id); if (index < 0) return;
  const [request] = state.requests.splice(index, 1);
  if (button.dataset.requestAction === 'accept') {
    if (!state.items.some(item => item.id === request.item.id)) state.items.push(request.item);
    toast(`${request.item.name} added to your launchpad`);
  } else toast(`Share from ${request.from} declined`);
  save(); render();
});

globalSearch.addEventListener('input', event => { query = event.target.value.trim(); render(); });
document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); globalSearch.focus(); } });

document.querySelectorAll('.nav-list .nav-item').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter; activeCollection = null; query = ''; globalSearch.value = '';
  document.querySelectorAll('.nav-list .nav-item').forEach(entry => entry.classList.toggle('active', entry === button));
  boardTitle.textContent = button.querySelector('span:nth-child(2)').textContent; render();
}));

collectionNav.addEventListener('click', event => {
  const button = event.target.closest('[data-collection-filter]'); if (!button) return;
  if (state.workspaceView === 'board') {
    const section = board.querySelector(`[data-collection="${button.dataset.collectionFilter}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      section.classList.add('collection-focused');
      setTimeout(() => section.classList.remove('collection-focused'), 900);
    }
    return;
  }
  activeCollection = activeCollection === button.dataset.collectionFilter ? null : button.dataset.collectionFilter;
  activeFilter = 'all'; boardTitle.textContent = activeCollection ? state.collections.find(c => c.id === activeCollection).name : 'My launchpad'; render();
});

document.querySelectorAll('.view-button').forEach(button => button.addEventListener('click', () => { state.view = button.dataset.view; save(); render(); }));

window.addEventListener('resize', () => {
  if (state.workspaceView === 'board') applyBoardLayouts();
});

render();
