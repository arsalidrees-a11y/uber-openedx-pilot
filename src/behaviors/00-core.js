/* ----------------------------------------------------------------------
 * uber-learn behaviours. Plain ES5-compatible JS, no framework, no build.
 *
 * WHY IT LOOKS LIKE THIS
 *   This script is loaded once from /static/ and then has to survive:
 *     - markup injected into many HTML XBlocks on one page
 *     - the learning MFE swapping units without a page reload
 *     - being included twice by accident
 *   So every handler is delegated from `document` and nothing binds to a
 *   specific element at load time. There is no init step to forget.
 * -------------------------------------------------------------------- */
(function () {
  'use strict';
  if (window.UberLearn) return;             // idempotent: safe to include twice

  var D = document;
  var closest = function (el, sel) {
    return el && el.closest ? el.closest(sel) : null;
  };

  /* --- knowledge check ------------------------------------------------
     Ungraded. One answer, immediate feedback, no score. A graded question
     must use the native Problem XBlock so the grade reaches the gradebook. */
  D.addEventListener('click', function (e) {
    var opt = closest(e.target, '.u-kc__opt');
    if (!opt) return;
    var kc = closest(opt, '.u-kc');
    if (!kc || kc.getAttribute('data-answered') === 'true') return;

    kc.setAttribute('data-answered', 'true');
    var correct = opt.getAttribute('data-correct') === 'true';
    opt.setAttribute('aria-checked', 'true');
    opt.setAttribute('data-state', correct ? 'correct' : 'incorrect');

    if (!correct) {
      var right = kc.querySelector('.u-kc__opt[data-correct="true"]');
      if (right) right.setAttribute('data-state', 'correct');
    }
    var fb = kc.querySelector('.u-kc__feedback');
    if (fb) fb.hidden = false;

    kc.dispatchEvent(new CustomEvent('u:answered', {
      bubbles: true,
      detail: { correct: correct, value: opt.getAttribute('data-value') || opt.textContent.trim() }
    }));
  });

  /* --- tabs ------------------------------------------------------------ */
  D.addEventListener('click', function (e) {
    var btn = closest(e.target, '.u-tab');
    if (!btn || btn.disabled) return;
    var group = closest(btn, '.u-tabs');
    if (!group) return;

    var all = group.querySelectorAll('.u-tab');
    for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-selected', 'false');
    btn.setAttribute('aria-selected', 'true');

    var panelId = btn.getAttribute('aria-controls');
    if (panelId) {
      var scope = closest(group, '[data-u-tabscope]') || D;
      var panels = scope.querySelectorAll('[data-u-panel]');
      for (var j = 0; j < panels.length; j++) panels[j].hidden = panels[j].id !== panelId;
    }
    btn.dispatchEvent(new CustomEvent('u:tabchange', { bubbles: true, detail: { id: panelId } }));
  });

  /* --- declarative progress: data-u-progress="64" --------------------- */
  function applyProgress(root) {
    var nodes = (root || D).querySelectorAll('[data-u-progress]');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var pct = Math.max(0, Math.min(100, parseFloat(n.getAttribute('data-u-progress')) || 0));
      if (n.classList.contains('u-ring')) {
        n.style.setProperty('--pct', String(pct));
        var v = n.querySelector('.u-ring__value');
        /* Write only on change. applyProgress runs from the MutationObserver,
           and replacing identical text is itself a mutation: an endless loop. */
        var label = Math.round(pct) + '%';
        if (v && !v.getAttribute('data-keep') && v.textContent !== label) v.textContent = label;
      } else {
        n.style.setProperty('--pct', pct + '%');
      }
      n.setAttribute('aria-valuenow', String(Math.round(pct)));
    }
  }

  /* --- drag to reorder -------------------------------------------------
     Reorders live during the drag rather than animating a ghost, which keeps
     the DOM and the visual order in agreement at every moment. Arrow keys do
     the same thing, because drag alone is unusable with a switch or a
     screen reader. */
  function renumber(list) {
    var items = list.querySelectorAll('.u-drag__item');
    for (var i = 0; i < items.length; i++) {
      var n = items[i].querySelector('.u-drag__index');
      if (n) n.textContent = String(i + 1);
      items[i].setAttribute('aria-posinset', String(i + 1));
      items[i].setAttribute('aria-setsize', String(items.length));
    }
  }
  function order(list) {
    return [].map.call(list.querySelectorAll('.u-drag__item'), function (el) {
      return el.getAttribute('data-value') || el.textContent.trim();
    });
  }
  function settled(list, item) {
    renumber(list);
    list.dispatchEvent(new CustomEvent('u:reordered', {
      bubbles: true, detail: { order: order(list), moved: item.getAttribute('data-value') }
    }));
  }

  D.addEventListener('pointerdown', function (e) {
    var handle = closest(e.target, '.u-drag__grab');
    if (!handle) return;
    var item = closest(handle, '.u-drag__item');
    var list = closest(item, '.u-drag');
    if (!item || !list) return;

    e.preventDefault();
    item.setAttribute('data-dragging', 'true');
    handle.setPointerCapture(e.pointerId);

    function move(ev) {
      var siblings = list.querySelectorAll('.u-drag__item');
      for (var i = 0; i < siblings.length; i++) {
        var other = siblings[i];
        if (other === item) continue;
        var r = other.getBoundingClientRect();
        if (ev.clientY < r.top || ev.clientY > r.bottom) continue;
        var after = ev.clientY > r.top + r.height / 2;
        list.insertBefore(item, after ? other.nextSibling : other);
        return;
      }
    }
    function end() {
      item.removeAttribute('data-dragging');
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', end);
      handle.removeEventListener('pointercancel', end);
      settled(list, item);
    }
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  });

  D.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    var handle = closest(e.target, '.u-drag__grab');
    if (!handle) return;
    var item = closest(handle, '.u-drag__item');
    var list = closest(item, '.u-drag');
    if (!item || !list) return;

    e.preventDefault();
    if (e.key === 'ArrowUp' && item.previousElementSibling) {
      list.insertBefore(item, item.previousElementSibling);
    } else if (e.key === 'ArrowDown' && item.nextElementSibling) {
      list.insertBefore(item.nextElementSibling, item);
    } else {
      return;
    }
    handle.focus();
    settled(list, item);
  });

  /* --- select ----------------------------------------------------------
     Replaces <select>, which renders the OS picker and cannot be branded. */
  function closeSelects(except) {
    var open = D.querySelectorAll('.u-select__trigger[aria-expanded="true"]');
    for (var i = 0; i < open.length; i++) {
      if (open[i] === except) continue;
      open[i].setAttribute('aria-expanded', 'false');
      var list = open[i].parentNode.querySelector('.u-select__list');
      if (list) list.hidden = true;
    }
  }
  D.addEventListener('click', function (e) {
    var trigger = closest(e.target, '.u-select__trigger');
    var opt = closest(e.target, '.u-select__opt');

    if (opt) {
      var sel = closest(opt, '.u-select');
      var peers = sel.querySelectorAll('.u-select__opt');
      for (var i = 0; i < peers.length; i++) peers[i].setAttribute('aria-selected', 'false');
      opt.setAttribute('aria-selected', 'true');

      var value = sel.querySelector('.u-select__value');
      if (value) {
        value.textContent = opt.getAttribute('data-label') || opt.textContent.trim();
        value.classList.remove('u-select__value--placeholder');
      }
      sel.dispatchEvent(new CustomEvent('u:selected', {
        bubbles: true,
        detail: { value: opt.getAttribute('data-value'), label: value ? value.textContent : '' }
      }));
      closeSelects();
      return;
    }

    closeSelects(trigger);
    if (!trigger || trigger.disabled) return;
    var open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
    var list = trigger.parentNode.querySelector('.u-select__list');
    if (list) list.hidden = open;
  });
  D.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSelects();
  });

  window.UberLearn = { refresh: applyProgress, version: '0.4.0', renumber: renumber };

  /* Run once the DOM exists. A course author may paste the script tag anywhere,
     including the head with no defer, so never assume the body is parsed.
     This stays at the very end: with defer, or any late load, the DOM is
     already parsed and boot() runs at once. Called any earlier, it can reach
     code whose variables are not assigned yet. The calendar did exactly that,
     threw, and took every handler below it down with the script. */
  function boot() { applyProgress(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot);
  else boot();
  /* The learning MFE swaps units without a reload, so re-apply on DOM
     changes rather than only at load. */
  if (window.MutationObserver) {
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes.length) { applyProgress(); return; }
      }
    }).observe(D.documentElement, { childList: true, subtree: true });
  }
})();
