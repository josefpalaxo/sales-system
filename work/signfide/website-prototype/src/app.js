// Browser-local presentation only. No network requests, storage, analytics, or submission endpoints.
const nav = document.querySelector('#main-nav');
const menuToggle = document.querySelector('.menu-toggle');
function closeNav(returnFocus = false) {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-group').forEach(group => { group.open = false; });
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
document.querySelectorAll('.nav-group').forEach(group => {
  group.addEventListener('toggle', () => {
    if (group.open) document.querySelectorAll('.nav-group').forEach(other => { if (other !== group) other.open = false; });
  });
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-group')) document.querySelectorAll('.nav-group').forEach(group => { group.open = false; });
  if (!event.target.closest('.site-header') && nav.classList.contains('is-open')) closeNav();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openGroup = document.querySelector('.nav-group[open]');
  if (openGroup) { openGroup.open = false; openGroup.querySelector('summary').focus(); }
  else if (nav.classList.contains('is-open')) closeNav(true);
});
matchMedia('(min-width: 901px)').addEventListener('change', () => closeNav());
const dialog = document.querySelector('#demo-dialog');
let lastTrigger;
document.querySelectorAll('[data-open-demo]').forEach(button => button.addEventListener('click', () => {
  lastTrigger = button;
  closeNav();
  resetForm('demo');
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('.dialog-close').focus();
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button,input,select,textarea,a[href],[tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
  const first = controls[0], last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  resetForm('demo');
  // A mobile navigation CTA becomes hidden when its menu closes.
  if (lastTrigger && lastTrigger.getClientRects().length) lastTrigger.focus();
  else menuToggle.focus();
});
function validateField(field) {
  const empty = field.required && !field.value.trim();
  const valid = !empty && field.validity.valid;
  field.setAttribute('aria-invalid', String(!valid));
  const error = document.getElementById(field.id + '-error');
  if (error) error.hidden = valid;
  return valid;
}
function resetForm(kind) {
  const form = document.querySelector(`[data-enquiry="${kind}"]`);
  if (!form) return;
  form.reset();
  form.hidden = false;
  form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
  form.querySelectorAll('.field-error,.form-error').forEach(error => { error.hidden = true; });
  document.querySelector(`[data-success="${kind}"]`).hidden = true;
}
document.querySelectorAll('[data-enquiry]').forEach(form => {
  form.querySelectorAll('input[required],select[required]').forEach(field => field.addEventListener('blur', () => validateField(field)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input[required],select[required]')];
    const results = fields.map(validateField);
    if (results.includes(false)) {
      form.querySelector('.form-error').hidden = false;
      fields[results.indexOf(false)].focus();
      return;
    }
    form.reset();
    form.hidden = true;
    const success = document.querySelector(`[data-success="${form.dataset.enquiry}"]`);
    success.hidden = false;
    success.focus();
  });
});
document.querySelectorAll('[data-reset-form]').forEach(button => button.addEventListener('click', () => {
  resetForm(button.dataset.resetForm);
  document.querySelector(`[data-enquiry="${button.dataset.resetForm}"] input`).focus();
}));
document.querySelectorAll('[data-agreement]').forEach(demo => {
  const panel = demo.querySelector('[role=tabpanel]');
  const original = panel.innerHTML;
  const tabs = [...demo.querySelectorAll('[role=tab]')];
  let stage = 0;
  const sign = `<div class="document-head"><span class="document-monogram">M / R</span><span>Fictional example<br>Morgan & Reed</span></div><p class="document-type">RECIPIENT VIEW · CONCEPT</p><h3>A clear next step<br>for every signer.</h3><p class="document-intro">Review the example before adding a fictional signature.</p><div class="document-copy"><strong>Engagement letter · Alex Morgan</strong><p>This is an illustrative interaction. It does not authenticate anyone, create a binding agreement, or sign a real document.</p></div><div class="signature-area"><span class="small">Fictional recipient</span><span class="signature-placeholder">Alex Morgan</span></div><button class="button demo-next" data-demo-next>Add example signature <span aria-hidden="true">→</span></button>`;
  const record = `<div class="document-head"><span class="document-monogram">M / R</span><span>Fictional example<br>Morgan & Reed</span></div><div class="record-heading"><span aria-hidden="true">✓</span>Example complete</div><h3>The agreement.<br>And its story.</h3><div class="signature-area"><span class="signature-name">Alex Morgan</span><span class="small">Fictional signature · no legal effect</span></div><ol class="record-log"><li>Document prepared</li><li>Example reviewed</li><li>Fictional signature added</li></ol><p class="demo-disclaimer">Illustrative record only. Actual evidence, identity checks, timestamps, and export capabilities require confirmation.</p><button class="button secondary demo-next" data-demo-reset>Explore again <span aria-hidden="true">↺</span></button>`;
  function showStage(next) {
    stage = next;
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === stage)); tab.tabIndex = i === stage ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tabs[stage].id);
    panel.innerHTML = stage === 0 ? original : stage === 1 ? sign : record;
  }
  demo.addEventListener('click', event => {
    const tab = event.target.closest('[data-stage]');
    if (tab) showStage(Number(tab.dataset.stage));
    if (event.target.closest('[data-demo-next]')) { showStage(Math.min(stage + 1, 2)); panel.focus({ preventScroll: true }); }
    if (event.target.closest('[data-demo-reset]')) { showStage(0); tabs[0].focus({ preventScroll: true }); }
  });
  bindTabKeys(tabs, showStage);
});
function bindTabKeys(tabs, change) {
  tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); change(next); tabs[next].focus(); }
  }));
}
const workflow = document.querySelector('[data-workflow]');
if (workflow) {
  const tabs = [...workflow.querySelectorAll('[role=tab]')];
  const panels = [...workflow.querySelectorAll('[role=tabpanel]')];
  const change = next => {
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === next)); tab.tabIndex = i === next ? 0 : -1; panels[i].hidden = i !== next; });
  };
  tabs.forEach((tab, i) => tab.addEventListener('click', () => change(i)));
  bindTabKeys(tabs, change);
}
const checklist = document.querySelector('[data-checklist]');
if (checklist) {
  const checks = [...checklist.querySelectorAll('input')];
  const status = document.querySelector('[data-checklist-status]');
  const update = () => { status.textContent = `${checks.filter(input => input.checked).length} of ${checks.length} topics reviewed. Your selections stay on this page only.`; };
  checklist.addEventListener('change', update);
  document.querySelector('[data-reset-checklist]').addEventListener('click', () => { checks.forEach(input => { input.checked = false; }); update(); });
}
