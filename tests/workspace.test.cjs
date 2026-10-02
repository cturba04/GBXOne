const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { randomUUID } = require('node:crypto');

const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const bootstrap = app.slice(0, app.indexOf('\nlet activeFilter'));
const management = fs.readFileSync(path.join(root, 'management.js'), 'utf8');

function boot(savedState) {
  let stored = savedState ? JSON.stringify(savedState) : null;
  const nodes = new Map();
  const documentListeners = new Map();
  const node = selector => {
    if (!nodes.has(selector)) nodes.set(selector, { value: '', options: [], checked: false, disabled: false, listeners: new Map(), addEventListener(name, callback) { this.listeners.set(name, callback); }, reset() {}, close() {} });
    return nodes.get(selector);
  };
  const context = vm.createContext({
    structuredClone, crypto: { randomUUID }, Date, Set, Map, Option: function(value) { this.value = value; },
    document: { querySelector: node, querySelectorAll: () => [], addEventListener: (name, callback) => documentListeners.set(name, callback) },
    localStorage: { getItem: () => stored, setItem: (_, value) => { stored = value; } },
    window: { addEventListener() {} }, queueMicrotask() {}, setInterval() {},
    render() {}, renderAdmin() {}, toast() {}, refreshAnnouncementStatuses() {}, setAdminTab() {}, openLinkDialog() {},
    escapeHtml: value => String(value), confirm: () => true,
    save: () => vm.runInContext("localStorage.setItem('gbx-one-state', JSON.stringify(state))", context)
  });
  vm.runInContext(bootstrap, context);
  vm.runInContext('let activeCollection = null;', context);
  vm.runInContext(management, context);
  return { context, nodes, documentListeners, run: code => vm.runInContext(code, context), saved: () => JSON.parse(stored) };
}

const initial = boot();
assert.equal(initial.run("state.items.find(item => item.id === 'nova').owner"), 'gbx');
const fixture = initial.saved();
fixture.items.push({ id: 'item-test-personal', name: 'Personal', collection: 'favorites', url: 'https://example.com', tags: [] });
fixture.items.find(item => item.id === 'nova').name = 'Edited Nova';
const workspace = boot(fixture);
assert.equal(workspace.run("state.items.find(item => item.id === 'item-test-personal').owner"), 'user');
assert.equal(workspace.run("state.items.find(item => item.id === 'nova').name"), 'Edited Nova', 'Reload must preserve admin edits');

workspace.run("selectedLinkIds.add('nova'); selectedLinkIds.add('item-test-personal'); updateSelectionControls();");
assert.equal(workspace.nodes.get('#deleteSelected').disabled, true, 'Mixed GBX/personal selections cannot be deleted');
workspace.nodes.get('#deleteSelected').listeners.get('click')();
assert.equal(workspace.run("state.items.some(item => item.id === 'item-test-personal')"), true, 'Handler must also guard mixed selection');
workspace.run("selectedLinkIds.clear(); selectedLinkIds.add('item-test-personal'); updateSelectionControls();");
assert.equal(workspace.nodes.get('#deleteSelected').disabled, false);

workspace.run("state.hiddenCollectionIds = ['favorites']; state.hiddenItemIds = []; showSelectedItems();");
assert.equal(workspace.run("state.hiddenCollectionIds.includes('favorites')"), false);
assert.equal(workspace.run("state.hiddenItemIds.includes('zoho')"), true, 'Restoring one link must not expose hidden siblings');
assert.equal(workspace.run("state.hiddenItemIds.includes('item-test-personal')"), false);
workspace.nodes.get('#deleteSelected').listeners.get('click')();
assert.equal(workspace.run("state.items.some(item => item.id === 'item-test-personal')"), false, 'Personal links can be deleted');

workspace.run("state.announcements.push({ id:'test-required', status:'sent', requireAcknowledgement:true, appId:'nova' });");
assert.equal(workspace.run("pendingRequiredAnnouncements().some(item => item.id === 'test-required')"), true);
workspace.run("state.acknowledgedAnnouncementIds.push('test-required');");
assert.equal(workspace.run("pendingRequiredAnnouncements().some(item => item.id === 'test-required')"), false);

workspace.documentListeners.get('click')({ target: { closest: () => ({ dataset: { management: 'admin-delete', id: 'nova' } }) } });
assert.equal(workspace.run("state.deletedManagedItemIds.includes('nova')"), true);
const afterDelete = boot(workspace.saved());
assert.equal(afterDelete.run("state.items.some(item => item.id === 'nova')"), false, 'Deleted managed apps must not return after reload');
console.log('Passed: ownership migration, edit persistence, mixed-selection protection, personal deletion, selective restore, acknowledgement, and managed deletion persistence.');
