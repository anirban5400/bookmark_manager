/**
 * NEU UI — Interactive Components
 * Lightweight vanilla JS for neumorphic component interactivity
 */

(function () {
    'use strict';

    const NeuUI = {};

    // ─── Theme Toggle ───
    NeuUI.initTheme = function () {
        const saved = localStorage.getItem('neu-theme');
        if (saved) document.documentElement.setAttribute('data-theme', saved);

        document.querySelectorAll('[data-neu-theme-toggle]').forEach(btn => {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('neu-theme', next);
                btn.textContent = next === 'dark' ? '☀️' : '🌙';
            });
        });
    };

    // ─── Tabs ───
    NeuUI.initTabs = function () {
        document.querySelectorAll('[data-neu-tabs]').forEach(tabContainer => {
            const nav = tabContainer.querySelector('.neu-tab-nav');
            const panels = tabContainer.querySelectorAll('.neu-tab-panel');
            if (!nav) return;

            nav.querySelectorAll('.neu-tab-item').forEach(tab => {
                tab.addEventListener('click', () => {
                    nav.querySelectorAll('.neu-tab-item').forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    tab.classList.add('active');
                    const target = tab.getAttribute('data-tab');
                    const panel = tabContainer.querySelector(`[data-tab-panel="${target}"]`);
                    if (panel) panel.classList.add('active');
                });
            });
        });
    };

    // ─── Accordion / Collapse ───
    NeuUI.initCollapse = function () {
        document.querySelectorAll('.neu-collapse-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const collapse = trigger.closest('.neu-collapse');
                if (!collapse) return;

                const accordion = collapse.closest('.neu-accordion');
                if (accordion) {
                    accordion.querySelectorAll('.neu-collapse').forEach(c => {
                        if (c !== collapse) c.classList.remove('open');
                    });
                }
                collapse.classList.toggle('open');
            });
        });
    };

    // ─── Dropdown ───
    NeuUI.initDropdowns = function () {
        document.querySelectorAll('.neu-dropdown').forEach(dropdown => {
            const trigger = dropdown.querySelector('.neu-dropdown-trigger');
            if (!trigger) return;

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close others
                document.querySelectorAll('.neu-dropdown.active').forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                dropdown.classList.toggle('active');
            });

            dropdown.querySelectorAll('.neu-dropdown-item').forEach(item => {
                item.addEventListener('click', () => {
                    dropdown.classList.remove('active');
                });
            });
        });

        // Close on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.neu-dropdown.active').forEach(d => d.classList.remove('active'));
        });
    };

    // ─── Popover ───
    NeuUI.initPopovers = function () {
        document.querySelectorAll('.neu-popover').forEach(popover => {
            const trigger = popover.querySelector('[data-neu-popover-trigger]') || popover.children[0];
            const closeBtn = popover.querySelector('.neu-popover-close');

            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.neu-popover.active').forEach(p => {
                        if (p !== popover) p.classList.remove('active');
                    });
                    popover.classList.toggle('active');
                });
            }
            if (closeBtn) {
                closeBtn.addEventListener('click', () => popover.classList.remove('active'));
            }
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.neu-popover.active').forEach(p => p.classList.remove('active'));
        });
    };

    // ─── Modal ───
    NeuUI.initModals = function () {
        document.querySelectorAll('[data-neu-modal]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const target = document.querySelector(trigger.getAttribute('data-neu-modal'));
                if (target) target.classList.add('active');
            });
        });

        document.querySelectorAll('.neu-modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('active');
            });
            overlay.querySelectorAll('.neu-modal-close').forEach(btn => {
                btn.addEventListener('click', () => overlay.classList.remove('active'));
            });
        });
    };

    // ─── Drawer ───
    NeuUI.initDrawers = function () {
        document.querySelectorAll('[data-neu-drawer]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const drawerId = trigger.getAttribute('data-neu-drawer');
                const overlay = document.querySelector(drawerId + '-overlay');
                const drawer = document.querySelector(drawerId);
                if (overlay) overlay.classList.add('active');
                if (drawer) drawer.classList.add('active');
            });
        });

        document.querySelectorAll('.neu-drawer-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('active');
                document.querySelectorAll('.neu-drawer.active').forEach(d => d.classList.remove('active'));
            });
        });

        document.querySelectorAll('.neu-drawer-close').forEach(btn => {
            btn.addEventListener('click', () => {
                const drawer = btn.closest('.neu-drawer');
                if (drawer) drawer.classList.remove('active');
                document.querySelectorAll('.neu-drawer-overlay.active').forEach(o => o.classList.remove('active'));
            });
        });
    };

    // ─── Contextual Help ───
    NeuUI.initHelp = function () {
        document.querySelectorAll('.neu-help').forEach(help => {
            const trigger = help.querySelector('.neu-help-trigger');
            if (!trigger) return;

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.neu-help.active').forEach(h => {
                    if (h !== help) h.classList.remove('active');
                });
                help.classList.toggle('active');
            });
        });
        document.addEventListener('click', () => {
            document.querySelectorAll('.neu-help.active').forEach(h => h.classList.remove('active'));
        });
    };

    // ─── Toast / Notification ───
    NeuUI.toast = function (message, type = 'info', duration = 3000) {
        let container = document.querySelector('.neu-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'neu-toast-container';
            document.body.appendChild(container);
        }

        const icons = { success: '✅', danger: '❌', warning: '⚠️', info: 'ℹ️' };
        const toast = document.createElement('div');
        toast.className = `neu-toast neu-toast-${type}`;
        toast.innerHTML = `
            <span class="neu-toast-icon">${icons[type] || icons.info}</span>
            <span class="neu-toast-content">${message}</span>
            <button class="neu-toast-close" onclick="this.parentElement.remove()">✕</button>
        `;
        toast.style.animation = `neu-toast-in 0.3s ease`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'neu-toast-out 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // ─── Tree View ───
    NeuUI.initTreeView = function () {
        document.querySelectorAll('.neu-tree-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggle.classList.toggle('open');
                const node = toggle.closest('.neu-tree-item');
                if (node) {
                    const children = node.nextElementSibling;
                    if (children && children.classList.contains('neu-tree-children')) {
                        children.classList.toggle('open');
                    }
                }
            });
        });
    };

    // ─── Carousel ───
    NeuUI.initCarousels = function () {
        document.querySelectorAll('.neu-carousel').forEach(carousel => {
            const track = carousel.querySelector('.neu-carousel-track');
            const slides = carousel.querySelectorAll('.neu-carousel-slide');
            const prev = carousel.querySelector('.neu-carousel-prev');
            const next = carousel.querySelector('.neu-carousel-next');
            const dots = carousel.querySelectorAll('.neu-carousel-dot');
            let current = 0;

            function goTo(index) {
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;
                current = index;
                track.style.transform = `translateX(-${current * 100}%)`;
                dots.forEach((d, i) => d.classList.toggle('active', i === current));
            }

            if (prev) prev.addEventListener('click', () => goTo(current - 1));
            if (next) next.addEventListener('click', () => goTo(current + 1));
            dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
            goTo(0);
        });
    };

    // ─── Scroll Shadow ───
    NeuUI.initScrollShadow = function () {
        document.querySelectorAll('.neu-scroll-shadow').forEach(wrapper => {
            const inner = wrapper.querySelector('.neu-scroll-shadow-inner');
            if (!inner) return;

            function update() {
                wrapper.classList.toggle('shadow-top', inner.scrollTop > 0);
                wrapper.classList.toggle('shadow-bottom',
                    inner.scrollTop + inner.clientHeight < inner.scrollHeight - 1);
            }
            inner.addEventListener('scroll', update);
            update();
        });
    };

    // ─── Data Table ───
    NeuUI.initDataTables = function () {
        document.querySelectorAll('[data-neu-datatable]').forEach(wrapper => {
            const table = wrapper.querySelector('.neu-dt-table');
            if (!table) return;

            const tbody = table.querySelector('tbody');
            const allRows = Array.from(tbody.querySelectorAll('tr'));
            const searchInput = wrapper.querySelector('.neu-dt-search input');
            const fromDate = wrapper.querySelector('.neu-dt-from');
            const toDate = wrapper.querySelector('.neu-dt-to');
            const perPageSelect = wrapper.querySelector('.neu-dt-per-page select');
            const resetBtn = wrapper.querySelector('.neu-dt-reset');
            const footer = wrapper.querySelector('.neu-dt-footer');
            const dateCol = parseInt(wrapper.getAttribute('data-date-col') || '-1');
            const activeFiltersContainer = wrapper.querySelector('.neu-dt-active-filters');

            // ── Filter Toggle ──
            const filterBtn = wrapper.querySelector('.neu-dt-filter-btn');
            const filterPanel = wrapper.querySelector('.neu-dt-filters');
            if (filterBtn && filterPanel) {
                filterBtn.addEventListener('click', () => {
                    filterBtn.classList.toggle('active');
                    filterPanel.classList.toggle('open');
                });
            }

            // ── Dropdown Filters ──
            const filterSelects = wrapper.querySelectorAll('.neu-dt-filters select[data-filter-col]');
            filterSelects.forEach(sel => {
                sel.addEventListener('change', applyFilters);
            });

            let filteredRows = [...allRows];
            let currentPage = 1;
            let perPage = perPageSelect ? parseInt(perPageSelect.value) : 10;

            // ── Sort ──
            wrapper.querySelectorAll('.neu-dt-sortable').forEach(th => {
                th.addEventListener('click', () => {
                    const colIdx = Array.from(th.parentElement.children).indexOf(th);
                    const current = th.getAttribute('data-sort');
                    wrapper.querySelectorAll('.neu-dt-sortable').forEach(h => h.removeAttribute('data-sort'));

                    let dir = 'asc';
                    if (current === 'asc') dir = 'desc';
                    else if (current === 'desc') dir = '';

                    if (dir) {
                        th.setAttribute('data-sort', dir);
                        filteredRows.sort((a, b) => {
                            const aVal = a.children[colIdx]?.textContent.trim() || '';
                            const bVal = b.children[colIdx]?.textContent.trim() || '';
                            const aNum = parseFloat(aVal);
                            const bNum = parseFloat(bVal);
                            if (!isNaN(aNum) && !isNaN(bNum)) {
                                return dir === 'asc' ? aNum - bNum : bNum - aNum;
                            }
                            return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                        });
                    }
                    currentPage = 1;
                    render();
                });
            });

            // ── Filter ──
            function applyFilters() {
                const query = searchInput ? searchInput.value.toLowerCase() : '';
                const from = fromDate ? fromDate.value : '';
                const to = toDate ? toDate.value : '';

                filteredRows = allRows.filter(row => {
                    const text = row.textContent.toLowerCase();
                    if (query && !text.includes(query)) return false;

                    if (dateCol >= 0 && (from || to)) {
                        const cellVal = row.children[dateCol]?.textContent.trim() || '';
                        const cellDate = new Date(cellVal);
                        if (isNaN(cellDate)) return true;
                        if (from && cellDate < new Date(from)) return false;
                        if (to && cellDate > new Date(to + 'T23:59:59')) return false;
                    }

                    // Dropdown filters
                    for (const sel of filterSelects) {
                        const val = sel.value;
                        if (!val) continue;
                        const col = parseInt(sel.getAttribute('data-filter-col'));
                        if (col < 0) continue;
                        const cellText = row.children[col]?.textContent.trim().toLowerCase() || '';
                        if (!cellText.includes(val.toLowerCase())) return false;
                    }

                    return true;
                });
                currentPage = 1;
                render();
                renderTags();
            }

            if (searchInput) searchInput.addEventListener('input', applyFilters);
            if (fromDate) fromDate.addEventListener('change', applyFilters);
            if (toDate) toDate.addEventListener('change', applyFilters);
            if (perPageSelect) perPageSelect.addEventListener('change', () => {
                perPage = parseInt(perPageSelect.value);
                currentPage = 1;
                render();
            });
            if (resetBtn) resetBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                if (fromDate) fromDate.value = '';
                if (toDate) toDate.value = '';
                if (perPageSelect) { perPageSelect.value = '10'; perPage = 10; }
                filterSelects.forEach(sel => { sel.value = ''; });
                wrapper.querySelectorAll('.neu-dt-sortable').forEach(h => h.removeAttribute('data-sort'));
                filteredRows = [...allRows];
                currentPage = 1;
                render();
                renderTags();
            });

            // ── Action Menus ──
            wrapper.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('.neu-dt-action-btn');
                if (actionBtn) {
                    e.stopPropagation();
                    const cell = actionBtn.closest('.neu-dt-action-cell');
                    // Close all other action menus
                    wrapper.querySelectorAll('.neu-dt-action-cell.open').forEach(c => {
                        if (c !== cell) c.classList.remove('open');
                    });
                    cell.classList.toggle('open');
                    return;
                }
                // Close if clicked action item
                const actionItem = e.target.closest('.neu-dt-action-item');
                if (actionItem) {
                    wrapper.querySelectorAll('.neu-dt-action-cell.open').forEach(c => c.classList.remove('open'));
                    return;
                }
            });
            // Close action menus on outside click
            document.addEventListener('click', () => {
                wrapper.querySelectorAll('.neu-dt-action-cell.open').forEach(c => c.classList.remove('open'));
            });

            // ── Column Resize ──
            const thead = table.querySelector('thead');
            const allThs = () => Array.from(thead.querySelectorAll('th'));
            allThs().forEach(th => {
                const handle = document.createElement('div');
                handle.className = 'neu-dt-resize-handle';
                th.appendChild(handle);

                let startX, startW;
                handle.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Switch to fixed layout on first resize
                    if (!table.classList.contains('resizable')) {
                        allThs().forEach(h => { h.style.width = h.offsetWidth + 'px'; });
                        table.classList.add('resizable');
                    }
                    startX = e.pageX;
                    startW = th.offsetWidth;
                    handle.classList.add('active');
                    document.body.classList.add('neu-dt-resizing');

                    const onMove = (e2) => {
                        const diff = e2.pageX - startX;
                        const newW = Math.max(50, startW + diff);
                        th.style.width = newW + 'px';
                    };
                    const onUp = () => {
                        handle.classList.remove('active');
                        document.body.classList.remove('neu-dt-resizing');
                        document.removeEventListener('mousemove', onMove);
                        document.removeEventListener('mouseup', onUp);
                    };
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                });
            });

            // ── Column Manager (Visibility + Reorder + Sticky) ──
            const colManager = wrapper.querySelector('.neu-dt-col-manager');
            const colManagerBtn = wrapper.querySelector('.neu-dt-col-manager-btn');
            const colList = wrapper.querySelector('.neu-dt-col-list');
            if (colManager && colManagerBtn && colList) {
                // Toggle dropdown
                colManagerBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    colManager.classList.toggle('open');
                });
                document.addEventListener('click', (e) => {
                    if (!colManager.contains(e.target)) colManager.classList.remove('open');
                });

                // Track sticky state per column (keyed by column text)
                const stickyState = {}; // { colIdx: 'none' | 'left' | 'right' }

                // Build column list
                function buildColumnList() {
                    const ths = allThs();
                    colList.innerHTML = '';
                    ths.forEach((th, i) => {
                        const name = th.textContent.replace(/[▲▼⋮]/g, '').trim();
                        const isHidden = th.classList.contains('neu-dt-col-hidden');
                        const sticky = stickyState[i] || 'none';
                        const pinClass = sticky === 'left' ? 'pinned-left' : sticky === 'right' ? 'pinned-right' : '';
                        const pinTitle = sticky === 'none' ? 'Pin column' : sticky === 'left' ? 'Pinned left (click: pin right)' : 'Pinned right (click: unpin)';
                        const item = document.createElement('div');
                        item.className = 'neu-dt-col-item';
                        item.setAttribute('draggable', 'true');
                        item.setAttribute('data-col-idx', i);
                        item.innerHTML = `<span class="neu-dt-col-grip">⠿</span><span class="neu-dt-col-name">${name}</span><button class="neu-dt-col-pin ${pinClass}" title="${pinTitle}">📌</button><button class="neu-dt-col-eye ${isHidden ? 'hidden' : ''}">${isHidden ? '👁‍🗨' : '👁'}</button>`;
                        colList.appendChild(item);

                        // Pin toggle: none → left → right → none
                        const pinBtn = item.querySelector('.neu-dt-col-pin');
                        pinBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const cur = stickyState[i] || 'none';
                            if (cur === 'none') stickyState[i] = 'left';
                            else if (cur === 'left') stickyState[i] = 'right';
                            else stickyState[i] = 'none';
                            applyStickyPositions();
                            buildColumnList();
                        });

                        // Eye toggle
                        const eyeBtn = item.querySelector('.neu-dt-col-eye');
                        eyeBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const hidden = !th.classList.contains('neu-dt-col-hidden');
                            th.classList.toggle('neu-dt-col-hidden', hidden);
                            allRows.forEach(row => {
                                const cell = row.children[i];
                                if (cell) cell.classList.toggle('neu-dt-col-hidden', hidden);
                            });
                            eyeBtn.classList.toggle('hidden', hidden);
                            eyeBtn.textContent = hidden ? '👁‍🗨' : '👁';
                            applyStickyPositions();
                        });

                        // Drag events for reorder
                        let dragSrcItem = null;
                        item.addEventListener('dragstart', (e) => {
                            dragSrcItem = item;
                            item.classList.add('dragging');
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('text/plain', i.toString());
                        });
                        item.addEventListener('dragend', () => {
                            item.classList.remove('dragging');
                            colList.querySelectorAll('.neu-dt-col-item').forEach(el => el.classList.remove('drag-over'));
                        });
                        item.addEventListener('dragover', (e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            colList.querySelectorAll('.neu-dt-col-item').forEach(el => el.classList.remove('drag-over'));
                            item.classList.add('drag-over');
                        });
                        item.addEventListener('dragleave', () => {
                            item.classList.remove('drag-over');
                        });
                        item.addEventListener('drop', (e) => {
                            e.preventDefault();
                            item.classList.remove('drag-over');
                            const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
                            const toIdx = i;
                            if (fromIdx === toIdx) return;
                            // Remap sticky states when columns move
                            const fromSticky = stickyState[fromIdx] || 'none';
                            const newState = {};
                            const oldKeys = Object.keys(stickyState).map(Number).sort((a,b) => a - b);
                            // Simple: just swap the from into to position
                            const ths2 = allThs();
                            ths2.forEach((_, idx) => {
                                if (idx === fromIdx) return;
                                if (stickyState[idx]) newState[idx] = stickyState[idx];
                            });
                            // This gets reindexed after moveColumn, so clear and rebuild
                            Object.keys(stickyState).forEach(k => delete stickyState[k]);
                            moveColumn(fromIdx, toIdx);
                            // Reindex: after move, old indices shift
                            // Just clear all sticky and let user re-pin if needed
                            applyStickyPositions();
                            buildColumnList();
                        });
                    });
                }

                function moveColumn(from, to) {
                    const headerRow = thead.querySelector('tr');
                    const ths = Array.from(headerRow.children);
                    const movedTh = ths[from];
                    if (from < to) {
                        headerRow.insertBefore(movedTh, ths[to].nextSibling);
                    } else {
                        headerRow.insertBefore(movedTh, ths[to]);
                    }
                    allRows.forEach(row => {
                        const cells = Array.from(row.children);
                        const movedCell = cells[from];
                        if (from < to) {
                            row.insertBefore(movedCell, cells[to].nextSibling);
                        } else {
                            row.insertBefore(movedCell, cells[to]);
                        }
                    });
                }

                // Apply sticky positions to th and td
                function applyStickyPositions() {
                    const ths = allThs();
                    const allTableRows = [thead.querySelector('tr'), ...allRows];

                    // Clear all sticky classes and inline styles
                    ths.forEach((th, i) => {
                        th.classList.remove('neu-dt-sticky-left', 'neu-dt-sticky-right', 'neu-dt-sticky-edge');
                        th.style.left = '';
                        th.style.right = '';
                    });
                    allRows.forEach(row => {
                        Array.from(row.children).forEach(td => {
                            td.classList.remove('neu-dt-sticky-left', 'neu-dt-sticky-right', 'neu-dt-sticky-edge');
                            td.style.left = '';
                            td.style.right = '';
                        });
                    });

                    // Collect left and right sticky column indices
                    const leftCols = [];
                    const rightCols = [];
                    ths.forEach((th, i) => {
                        const state = stickyState[i] || 'none';
                        if (state === 'left' && !th.classList.contains('neu-dt-col-hidden')) leftCols.push(i);
                        if (state === 'right' && !th.classList.contains('neu-dt-col-hidden')) rightCols.push(i);
                    });

                    // Apply left sticky with cumulative offsets
                    let leftOffset = 0;
                    leftCols.forEach((colIdx, order) => {
                        const th = ths[colIdx];
                        const w = th.offsetWidth;
                        th.classList.add('neu-dt-sticky-left');
                        th.style.left = leftOffset + 'px';
                        // Mark last left-sticky as edge
                        if (order === leftCols.length - 1) th.classList.add('neu-dt-sticky-edge');
                        allRows.forEach(row => {
                            const td = row.children[colIdx];
                            if (td) {
                                td.classList.add('neu-dt-sticky-left');
                                td.style.left = leftOffset + 'px';
                                if (order === leftCols.length - 1) td.classList.add('neu-dt-sticky-edge');
                            }
                        });
                        leftOffset += w;
                    });

                    // Apply right sticky with cumulative offsets (from right)
                    let rightOffset = 0;
                    rightCols.reverse().forEach((colIdx, order) => {
                        const th = ths[colIdx];
                        const w = th.offsetWidth;
                        th.classList.add('neu-dt-sticky-right');
                        th.style.right = rightOffset + 'px';
                        // Mark first right-sticky (rightmost in reversed) as edge
                        if (order === rightCols.length - 1) th.classList.add('neu-dt-sticky-edge');
                        allRows.forEach(row => {
                            const td = row.children[colIdx];
                            if (td) {
                                td.classList.add('neu-dt-sticky-right');
                                td.style.right = rightOffset + 'px';
                                if (order === rightCols.length - 1) td.classList.add('neu-dt-sticky-edge');
                            }
                        });
                        rightOffset += w;
                    });
                }

                buildColumnList();
            }

            // ── Active Filter Tags ──
            function renderTags() {
                if (!activeFiltersContainer) return;
                const tags = [];

                // Search tag
                const query = searchInput ? searchInput.value.trim() : '';
                if (query) {
                    tags.push({ label: 'Search', value: query, clear: () => { searchInput.value = ''; } });
                }

                // Date tags
                const from = fromDate ? fromDate.value : '';
                const to = toDate ? toDate.value : '';
                if (from) {
                    tags.push({ label: 'From', value: from, clear: () => { fromDate.value = ''; } });
                }
                if (to) {
                    tags.push({ label: 'To', value: to, clear: () => { toDate.value = ''; } });
                }

                // Dropdown filter tags
                filterSelects.forEach(sel => {
                    if (sel.value) {
                        const labelEl = sel.closest('.neu-dt-filter-group')?.querySelector('label');
                        const labelText = labelEl ? labelEl.textContent : 'Filter';
                        tags.push({ label: labelText, value: sel.value, clear: () => { sel.value = ''; } });
                    }
                });

                // Render
                if (tags.length === 0) {
                    activeFiltersContainer.classList.remove('has-tags');
                    activeFiltersContainer.innerHTML = '';
                    return;
                }

                let html = '<span class="neu-dt-active-filters-label">Filters:</span>';
                tags.forEach((tag, i) => {
                    html += `<span class="neu-dt-tag"><span class="neu-dt-tag-label">${tag.label}:</span> ${tag.value} <button class="neu-dt-tag-close" data-tag-idx="${i}">✕</button></span>`;
                });
                html += '<button class="neu-dt-clear-all">Clear all</button>';

                activeFiltersContainer.innerHTML = html;
                activeFiltersContainer.classList.add('has-tags');

                // Tag close handlers
                activeFiltersContainer.querySelectorAll('.neu-dt-tag-close').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const idx = parseInt(btn.getAttribute('data-tag-idx'));
                        if (tags[idx]) {
                            tags[idx].clear();
                            applyFilters();
                        }
                    });
                });

                // Clear all handler
                const clearAllBtn = activeFiltersContainer.querySelector('.neu-dt-clear-all');
                if (clearAllBtn) {
                    clearAllBtn.addEventListener('click', () => {
                        if (resetBtn) resetBtn.click();
                    });
                }
            }

            // ── Render ──
            function render() {
                const total = filteredRows.length;
                const totalPages = Math.max(1, Math.ceil(total / perPage));
                if (currentPage > totalPages) currentPage = totalPages;
                const start = (currentPage - 1) * perPage;
                const end = Math.min(start + perPage, total);
                const pageRows = filteredRows.slice(start, end);

                // Clear & fill tbody
                tbody.innerHTML = '';
                if (pageRows.length === 0) {
                    const emptyRow = document.createElement('tr');
                    const cols = table.querySelectorAll('thead th').length;
                    emptyRow.innerHTML = `<td colspan="${cols}"><div class="neu-dt-empty"><div class="neu-dt-empty-icon">📭</div>No records found</div></td>`;
                    tbody.appendChild(emptyRow);
                } else {
                    pageRows.forEach(r => tbody.appendChild(r));
                }

                // Footer info
                if (footer) {
                    const info = footer.querySelector('.neu-dt-info');
                    if (info) {
                        info.innerHTML = `Showing <strong>${total === 0 ? 0 : start + 1}</strong> to <strong>${end}</strong> of <strong>${total}</strong> records`;
                    }

                    // Pagination
                    const pagesContainer = footer.querySelector('.neu-dt-pages');
                    if (pagesContainer) {
                        let html = `<button class="neu-dt-page-btn" data-page="prev" ${currentPage <= 1 ? 'disabled' : ''}>‹</button>`;

                        const maxVisible = 5;
                        let pStart = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                        let pEnd = Math.min(totalPages, pStart + maxVisible - 1);
                        if (pEnd - pStart < maxVisible - 1) pStart = Math.max(1, pEnd - maxVisible + 1);

                        if (pStart > 1) {
                            html += `<button class="neu-dt-page-btn" data-page="1">1</button>`;
                            if (pStart > 2) html += `<span class="neu-dt-page-ellipsis">…</span>`;
                        }

                        for (let p = pStart; p <= pEnd; p++) {
                            html += `<button class="neu-dt-page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
                        }

                        if (pEnd < totalPages) {
                            if (pEnd < totalPages - 1) html += `<span class="neu-dt-page-ellipsis">…</span>`;
                            html += `<button class="neu-dt-page-btn" data-page="${totalPages}">${totalPages}</button>`;
                        }

                        html += `<button class="neu-dt-page-btn" data-page="next" ${currentPage >= totalPages ? 'disabled' : ''}>›</button>`;
                        pagesContainer.innerHTML = html;

                        pagesContainer.querySelectorAll('.neu-dt-page-btn').forEach(btn => {
                            btn.addEventListener('click', () => {
                                const val = btn.getAttribute('data-page');
                                if (val === 'prev') currentPage--;
                                else if (val === 'next') currentPage++;
                                else currentPage = parseInt(val);
                                render();
                            });
                        });
                    }
                }
            }

            render();
        });
    };

    // ─── Init All ───
    NeuUI.init = function () {
        NeuUI.initTheme();
        NeuUI.initTabs();
        NeuUI.initCollapse();
        NeuUI.initDropdowns();
        NeuUI.initPopovers();
        NeuUI.initModals();
        NeuUI.initDrawers();
        NeuUI.initHelp();
        NeuUI.initTreeView();
        NeuUI.initCarousels();
        NeuUI.initScrollShadow();
        NeuUI.initDataTables();
    };

    // Auto-init on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', NeuUI.init);
    } else {
        NeuUI.init();
    }

    // Expose globally
    window.NeuUI = NeuUI;
})();
