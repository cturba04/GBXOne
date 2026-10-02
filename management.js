// Publishing and personal workspace controls for the local prototype.
const selectedLinkIds = new Set();
const selectedCollectionIds = new Set();
let requiredAnnouncementId = null;

function prepareAdminSettings() {
  document.querySelector('#adminDefaultAudience').textContent = state.adminSettings.defaultAudience;
  document.querySelector('#setupOrganization').value = state.adminSettings.organization;
  document.querySelector('#setupAudience').value = state.adminSettings.defaultAudience;
  document.querySelector('#setupTags').value = state.adminSettings.tags.join(', ');
  document.querySelector('#setupRequireAcknowledgement').checked = state.adminSettings.requireAcknowledgement;
  document.querySelector('#adminTagOptions').innerHTML = state.adminSettings.tags.map(tag => `<option value="${escapeHtml(tag)}"></option>`).join('');
  const select = document.querySelector('#adminAnnouncementApp');
  const previous = select.value;
  select.innerHTML = '<option value="">General announcement</option>' + state.items.filter(item => item.owner === 'gbx').map(item => `<option value="${item.id}">${escapeHtml(item.name)}</option>`).join('');
  if (state.items.some(item => item.id === previous)) select.value = previous;
  if (!document.querySelector('#adminEditId').value) document.querySelector('#adminAppAudience').value = state.adminSettings.defaultAudience;
  if (!document.querySelector('#adminAnnouncementTitle').value) document.querySelector('#adminAnnouncementRequired').checked = state.adminSettings.requireAcknowledgement;
}

function resetAdminAppForm() {
  document.querySelector('#adminAppForm').reset();
  document.querySelector('#adminEditId').value = '';
  document.querySelector('#adminAppSubmit').textContent = 'Publish app';
  document.querySelector('#cancelAdminEdit').hidden = true;
  prepareAdminSettings();
}

function createAppAnnouncement(item) {
  const announcement = {
    id: `announcement-${crypto.randomUUID()}`,
    title: `${item.name} is available`,
    details: item.notes || `Find ${item.name} in your launchpad.`,
    audience: item.deploymentAudience || state.adminSettings.defaultAudience,
    appId: item.id, actionLabel: 'Open app', actionUrl: item.url,
    status: 'sent', sentAt: new Date().toISOString(),
    requireAcknowledgement: true
  };
  state.announcements.push(announcement);
  state.announcement = true;
  return announcement;
}

function pendingRequiredAnnouncements() {
  refreshAnnouncementStatuses();
  return state.announcements.filter(item => item.status === 'sent' && item.requireAcknowledgement && !state.acknowledgedAnnouncementIds.includes(item.id));
}

function presentRequiredAnnouncement() {
  const dialog = document.querySelector('#requiredAnnouncementDialog');
  if (dialog.open || [...document.querySelectorAll('dialog')].some(item => item.open)) return;
  const pending = pendingRequiredAnnouncements();
  if (!pending.length) return;
  const announcement = pending[0];
  requiredAnnouncementId = announcement.id;
  document.querySelector('#requiredAnnouncementTitle').textContent = announcement.title;
  document.querySelector('#requiredAnnouncementDialog .modal-kicker').textContent = `${state.adminSettings.organization} UPDATE`;
  document.querySelector('#requiredAnnouncementDetails').textContent = announcement.details || 'Please read this update before continuing.';
  const link = document.querySelector('#requiredAnnouncementLink');
  link.hidden = !announcement.actionUrl;
  if (announcement.actionUrl) link.href = announcement.actionUrl;
  document.querySelector('#announcementRead').checked = false;
  document.querySelector('#acknowledgeAnnouncement').disabled = true;
  document.querySelector('#acknowledgementProgress').textContent = pending.length > 1 ? `${pending.length} announcements to acknowledge` : 'Your acknowledgement is saved automatically.';
  dialog.showModal();
}

function itemIsHidden(item) {
  return state.hiddenItemIds.includes(item.id) || state.hiddenCollectionIds.includes(item.collection);
}

function renderUserEditor() {
  document.querySelector('#userEditList').innerHTML = state.collections.map(collection => {
    const items = state.items.filter(item => item.collection === collection.id);
    return `<section class="edit-collection">
      <label class="edit-collection-heading"><input type="checkbox" data-select-collection="${collection.id}" ${selectedCollectionIds.has(collection.id) ? 'checked' : ''} />
        <strong>${escapeHtml(collection.name)}</strong><span>${items.length} links · ${collection.owner === 'user' ? 'Your collection' : 'GBX collection'}${state.hiddenCollectionIds.includes(collection.id) ? ' · Hidden' : ''}</span>
      </label>
      ${items.map(item => `<div class="edit-link-row"><label><input type="checkbox" data-select-link="${item.id}" ${selectedLinkIds.has(item.id) ? 'checked' : ''} />
        <span><strong>${escapeHtml(item.name)}</strong><small>${item.owner === 'user' ? 'Created by you' : item.owner === 'gbx' ? 'Published by GBX' : 'Shared with you'}${itemIsHidden(item) ? ' · Hidden' : ''}</small></span></label>
        ${item.owner === 'user' ? `<button class="button secondary" type="button" data-management="personal-edit" data-id="${item.id}">Edit</button>` : '<span class="managed-label">Hide only</span>'}
      </div>`).join('') || '<p class="edit-empty">No links in this collection yet.</p>'}
    </section>`;
  }).join('');
  updateSelectionControls();
}

function updateSelectionControls() {
  const selectedItems = state.items.filter(item => selectedLinkIds.has(item.id));
  const selectedCollections = state.collections.filter(collection => selectedCollectionIds.has(collection.id));
  const anythingSelected = Boolean(selectedItems.length || selectedCollections.length);
  const canDelete = anythingSelected && selectedItems.every(item => item.owner === 'user') && selectedCollections.every(collection => collection.owner === 'user');
  document.querySelector('#selectionSummary').textContent = anythingSelected ? `${selectedItems.length} links · ${selectedCollections.length} collections selected` : 'Nothing selected';
  for (const id of ['hideSelected', 'showSelected']) document.querySelector(`#${id}`).disabled = !anythingSelected;
  document.querySelector('#deleteSelected').disabled = !canDelete;
  document.querySelector('#deleteSelectionHint').textContent = anythingSelected && !canDelete ? 'Your selection includes GBX or shared items. You can hide them, but cannot delete them.' : 'Deleting your own links is permanent. Hidden items can be restored here.';
  const selectAll = document.querySelector('#selectAllLinks');
  selectAll.checked = state.collections.length > 0 && selectedCollections.length === state.collections.length;
  selectAll.indeterminate = anythingSelected && !selectAll.checked;
  document.querySelectorAll('[data-select-collection]').forEach(input => {
    const items = state.items.filter(item => item.collection === input.dataset.selectCollection);
    const count = items.filter(item => selectedLinkIds.has(item.id)).length;
    input.indeterminate = !selectedCollectionIds.has(input.dataset.selectCollection) && count > 0;
  });
}

function showSelectedItems() {
  // Showing one link from a hidden collection keeps its siblings hidden.
  for (const item of state.items.filter(entry => selectedLinkIds.has(entry.id))) {
    if (state.hiddenCollectionIds.includes(item.collection) && !selectedCollectionIds.has(item.collection)) {
      state.items.filter(sibling => sibling.collection === item.collection && !selectedLinkIds.has(sibling.id)).forEach(sibling => {
        if (!state.hiddenItemIds.includes(sibling.id)) state.hiddenItemIds.push(sibling.id);
      });
      state.hiddenCollectionIds = state.hiddenCollectionIds.filter(id => id !== item.collection);
    }
  }
  state.hiddenCollectionIds = state.hiddenCollectionIds.filter(id => !selectedCollectionIds.has(id));
  state.hiddenItemIds = state.hiddenItemIds.filter(id => !selectedLinkIds.has(id));
}

document.querySelector('#editLaunchpadBtn').addEventListener('click', () => {
  selectedLinkIds.clear(); selectedCollectionIds.clear();
  renderUserEditor();
  document.querySelector('#userEditDialog').showModal();
});
document.querySelector('#userEditList').addEventListener('change', event => {
  const input = event.target;
  if (input.dataset.selectCollection) {
    const id = input.dataset.selectCollection;
    if (input.checked) selectedCollectionIds.add(id); else selectedCollectionIds.delete(id);
    state.items.filter(item => item.collection === id).forEach(item => {
      if (input.checked) selectedLinkIds.add(item.id); else selectedLinkIds.delete(item.id);
    });
    renderUserEditor();
  } else if (input.dataset.selectLink) {
    const item = state.items.find(entry => entry.id === input.dataset.selectLink);
    if (input.checked) selectedLinkIds.add(item.id); else selectedLinkIds.delete(item.id);
    selectedCollectionIds.delete(item.collection);
    renderUserEditor();
  }
});
document.querySelector('#selectAllLinks').addEventListener('change', event => {
  selectedLinkIds.clear(); selectedCollectionIds.clear();
  if (event.target.checked) {
    state.items.forEach(item => selectedLinkIds.add(item.id));
    state.collections.forEach(collection => selectedCollectionIds.add(collection.id));
  }
  renderUserEditor();
});
document.querySelector('#hideSelected').addEventListener('click', () => {
  state.hiddenItemIds = [...new Set([...state.hiddenItemIds, ...selectedLinkIds])];
  state.hiddenCollectionIds = [...new Set([...state.hiddenCollectionIds, ...selectedCollectionIds])];
  save(); render(); renderUserEditor(); toast('Selected items hidden from your launchpad');
});
document.querySelector('#showSelected').addEventListener('click', () => {
  showSelectedItems(); save(); render(); renderUserEditor(); toast('Selected items restored to your launchpad');
});
document.querySelector('#deleteSelected').addEventListener('click', () => {
  const items = state.items.filter(item => selectedLinkIds.has(item.id));
  const collections = state.collections.filter(collection => selectedCollectionIds.has(collection.id));
  if ((!items.length && !collections.length) || items.some(item => item.owner !== 'user') || collections.some(item => item.owner !== 'user')) return;
  if (!confirm(`Permanently delete ${items.length} personal links and ${collections.length} personal collections?`)) return;
  state.items = state.items.filter(item => !selectedLinkIds.has(item.id));
  state.collections = state.collections.filter(collection => !selectedCollectionIds.has(collection.id));
  state.hiddenItemIds = state.hiddenItemIds.filter(id => !selectedLinkIds.has(id));
  state.hiddenCollectionIds = state.hiddenCollectionIds.filter(id => !selectedCollectionIds.has(id));
  selectedCollectionIds.forEach(id => { delete state.collectionLayouts[id]; });
  if (selectedCollectionIds.has(activeCollection)) activeCollection = null;
  selectedLinkIds.clear(); selectedCollectionIds.clear();
  save(); render(); renderUserEditor(); toast('Your selected items were deleted');
});

document.addEventListener('click', event => {
  const button = event.target.closest('[data-management]');
  if (!button) return;
  const item = state.items.find(entry => entry.id === button.dataset.id);
  switch (button.dataset.management) {
    case 'admin-edit':
      if (!item || item.owner !== 'gbx') return;
      document.querySelector('#adminEditId').value = item.id;
      for (const [field, value] of Object.entries({Name:item.name, Url:item.url, Logo:item.logo || '', Collection:item.collection, Color:item.color, Tags:(item.tags || []).join(', '), Notes:item.notes || '', Audience:item.deploymentAudience || 'Everyone'})) {
        const input = document.querySelector(`#adminApp${field}`);
        if (field === 'Audience' && ![...input.options].some(option => option.value === value)) input.add(new Option(value, value));
        input.value = value;
      }
      document.querySelector('#adminAppAnnounce').checked = false;
      document.querySelector('#adminAppSubmit').textContent = 'Save changes';
      document.querySelector('#cancelAdminEdit').hidden = false;
      setAdminTab('apps'); document.querySelector('#adminAppName').focus();
      break;
    case 'admin-delete':
      if (!item || item.owner !== 'gbx' || !confirm(`Delete the published link “${item.name}” from the GBX library?`)) return;
      state.deletedManagedItemIds = [...new Set([...state.deletedManagedItemIds, item.id])];
      state.items = state.items.filter(entry => entry.id !== item.id);
      state.catalogDrafts = state.catalogDrafts.filter(entry => entry.id !== item.id);
      state.announcements = state.announcements.filter(entry => entry.appId !== item.id);
      save(); render(); renderAdmin(); resetAdminAppForm(); toast('Published link deleted');
      break;
    case 'admin-announce':
      if (!item || item.owner !== 'gbx') return;
      prepareAdminSettings();
      document.querySelector('#adminAnnouncementApp').value = item.id;
      document.querySelector('#adminAnnouncementTitle').value = `${item.name} is available`;
      document.querySelector('#adminAnnouncementDetails').value = item.notes || '';
      document.querySelector('#adminAnnouncementUrl').value = item.url;
      document.querySelector('#adminAnnouncementAction').value = 'Open app';
      document.querySelector('#adminAnnouncementRequired').checked = true;
      document.querySelector('#adminAnnouncementRequired').disabled = true;
      setAdminTab('announcements');
      break;
    case 'personal-edit':
      if (!item || item.owner !== 'user') return;
      document.querySelector('#userEditDialog').close(); openLinkDialog(item);
      break;
    case 'hide-collection':
      if (!state.hiddenCollectionIds.includes(button.dataset.id)) state.hiddenCollectionIds.push(button.dataset.id);
      if (activeCollection === button.dataset.id) activeCollection = null;
      save(); render(); toast('Collection hidden. Restore it in Edit my launchpad.');
      break;
    case 'delete-announcement':
      if (!confirm('Delete this announcement?')) return;
      state.announcements = state.announcements.filter(entry => entry.id !== button.dataset.id);
      save(); render(); renderAdmin();
      break;
  }
});
document.querySelector('#cancelAdminEdit').addEventListener('click', resetAdminAppForm);
document.querySelector('#adminSetupForm').addEventListener('submit', event => {
  event.preventDefault();
  state.adminSettings = {
    organization: document.querySelector('#setupOrganization').value.trim(),
    defaultAudience: document.querySelector('#setupAudience').value,
    tags: [...new Set(document.querySelector('#setupTags').value.split(',').map(tag => tag.trim()).filter(Boolean))],
    requireAcknowledgement: document.querySelector('#setupRequireAcknowledgement').checked
  };
  save(); prepareAdminSettings(); toast('Admin settings saved');
});
document.querySelector('#adminAnnouncementApp').addEventListener('change', event => {
  const item = state.items.find(entry => entry.id === event.target.value);
  document.querySelector('#adminAnnouncementRequired').disabled = Boolean(item);
  document.querySelector('#adminAnnouncementRequired').checked = Boolean(item) || state.adminSettings.requireAcknowledgement;
  if (!item) return;
  document.querySelector('#adminAnnouncementTitle').value = `${item.name} is available`;
  document.querySelector('#adminAnnouncementDetails').value = item.notes || '';
  document.querySelector('#adminAnnouncementUrl').value = item.url;
  document.querySelector('#adminAnnouncementAction').value = 'Open app';
});
document.querySelector('#requiredAnnouncementDialog').addEventListener('cancel', event => event.preventDefault());
document.querySelector('#announcementRead').addEventListener('change', event => {
  document.querySelector('#acknowledgeAnnouncement').disabled = !event.target.checked;
});
document.querySelector('#acknowledgeAnnouncement').addEventListener('click', () => {
  if (!document.querySelector('#announcementRead').checked || !requiredAnnouncementId) return;
  if (!state.acknowledgedAnnouncementIds.includes(requiredAnnouncementId)) state.acknowledgedAnnouncementIds.push(requiredAnnouncementId);
  save(); requiredAnnouncementId = null;
  document.querySelector('#requiredAnnouncementDialog').close(); render();
});
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', () => queueMicrotask(presentRequiredAnnouncement)));
window.addEventListener('beforeunload', event => {
  if (pendingRequiredAnnouncements().length) { event.preventDefault(); event.returnValue = ''; }
});
prepareAdminSettings();
render();
setInterval(presentRequiredAnnouncement, 30000);
