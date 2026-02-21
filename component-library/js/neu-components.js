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
            // Skip dynamically generated tables (handled by createDataTable)
            if (wrapper.hasAttribute('data-neu-dt-dynamic')) return;
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

    // ─── Dynamic Data Table Factory ───
    NeuUI.createDataTable = function (container, config) {
        if (!container || !config) return;

        const cols = config.columns || [];
        const actions = config.actions || [];
        const allData = (config.data || []).map((row, i) => ({ ...row, _idx: i }));
        const perPageOpts = config.perPageOptions || [5, 10, 25, 50];
        const defaultPerPage = config.defaultPerPage || 10;
        const searchable = config.searchable !== false;
        const onAction = config.onAction || (() => {});
        const onCellEdit = config.onCellEdit || (() => {});
        const hasActions = actions.length > 0;
        const hasDateCol = cols.some(c => c.type === 'date');
        const filterCols = cols.filter(c => c.filter);

        // ── Normalize filter options to [{key, value}] ──
        function normalizeFilterOptions(opts) {
            if (!opts) return [];
            if (Array.isArray(opts)) {
                return opts.map(o => {
                    if (typeof o === 'object' && o.key !== undefined) return { key: String(o.key), value: String(o.value) };
                    return { key: String(o), value: String(o) };
                });
            }
            if (typeof opts === 'object') {
                return Object.entries(opts).map(([k, v]) => ({ key: String(k), value: String(v) }));
            }
            return [];
        }

        // Pre-normalize all filter options
        cols.forEach(col => {
            if (col.filter) {
                col.filter._normalized = normalizeFilterOptions(col.filter.options);
            }
        });

        // ── Flatten value for search/sort ──
        function flattenValue(val) {
            if (val == null) return '';
            if (typeof val === 'string' || typeof val === 'number') return String(val);
            if (Array.isArray(val)) return val.map(flattenValue).join(', ');
            if (typeof val === 'object') return Object.values(val).map(flattenValue).join(' ');
            return String(val);
        }

        // Effective column list (user cols + optional actions)
        const effectiveCols = [...cols];
        if (hasActions) {
            effectiveCols.push({ key: '_actions', label: 'Actions', _isActions: true });
        }

        // ── Build HTML ──
        const wrapper = document.createElement('div');
        wrapper.className = 'neu-data-table';
        wrapper.setAttribute('data-neu-datatable', '');
        wrapper.setAttribute('data-neu-dt-dynamic', '');

        const dateColIdx = effectiveCols.findIndex(c => c.type === 'date');
        if (dateColIdx >= 0) wrapper.setAttribute('data-date-col', dateColIdx);

        // — Toolbar —
        let toolbarHTML = `<div class="neu-dt-toolbar"><div class="neu-dt-toolbar-left">`;
        if (filterCols.length > 0) {
            toolbarHTML += `<button class="neu-dt-filter-btn">☰ Filter</button>`;
        }
        if (searchable) {
            toolbarHTML += `<div class="neu-dt-search"><span class="neu-dt-search-icon">🔍</span><input type="text" placeholder="Search records..."></div>`;
        }
        if (hasDateCol) {
            toolbarHTML += `<div class="neu-dt-date"><span class="neu-dt-date-label">From</span><input type="date" class="neu-dt-from"><span class="neu-dt-date-label">To</span><input type="date" class="neu-dt-to"></div>`;
        }
        toolbarHTML += `<button class="neu-dt-reset">↻ Reset</button></div>`;
        toolbarHTML += `<div class="neu-dt-toolbar-right">`;
        toolbarHTML += `<div class="neu-dt-col-manager"><button class="neu-dt-col-manager-btn">⚙ Columns</button><div class="neu-dt-col-panel"><div class="neu-dt-col-panel-title">Manage Columns</div><div class="neu-dt-col-list"></div></div></div>`;
        toolbarHTML += `<div class="neu-dt-per-page"><span class="neu-dt-per-page-label">Show</span><select>`;
        perPageOpts.forEach(n => {
            toolbarHTML += `<option value="${n}" ${n === defaultPerPage ? 'selected' : ''}>${n}</option>`;
        });
        toolbarHTML += `</select></div></div></div>`;
        wrapper.innerHTML = toolbarHTML;

        // — Filter Panel (key-value options) —
        if (filterCols.length > 0) {
            const fp = document.createElement('div');
            fp.className = 'neu-dt-filters';
            filterCols.forEach(col => {
                const colIdx = effectiveCols.indexOf(col);
                const opts = col.filter._normalized || [];
                let groupHTML = `<div class="neu-dt-filter-group"><label>${col.label}</label><div class="neu-dt-filter-select-wrap"><select data-filter-col="${colIdx}"><option value="">All ${col.label}</option>`;
                opts.forEach(o => {
                    groupHTML += `<option value="${o.key}">${o.value}</option>`;
                });
                groupHTML += `</select></div></div>`;
                fp.innerHTML += groupHTML;
            });
            wrapper.appendChild(fp);
        }

        // — Active Filter Tags —
        const activeFiltersDiv = document.createElement('div');
        activeFiltersDiv.className = 'neu-dt-active-filters';
        wrapper.appendChild(activeFiltersDiv);

        // — Table —
        const tableWrap = document.createElement('div');
        tableWrap.className = 'neu-dt-table-wrap';
        const table = document.createElement('table');
        table.className = 'neu-dt-table';

        const thead = document.createElement('thead');
        let headerHTML = '<tr>';
        effectiveCols.forEach(col => {
            if (col._isActions) {
                headerHTML += `<th style="text-align:center;">Actions</th>`;
            } else if (col.sortable) {
                headerHTML += `<th class="neu-dt-sortable">${col.label} <span class="neu-dt-sort-icon"><span class="up">▲</span><span class="down">▼</span></span></th>`;
            } else {
                headerHTML += `<th>${col.label}</th>`;
            }
        });
        headerHTML += '</tr>';
        thead.innerHTML = headerHTML;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        tableWrap.appendChild(table);
        wrapper.appendChild(tableWrap);

        const footer = document.createElement('div');
        footer.className = 'neu-dt-footer';
        footer.innerHTML = `<div class="neu-dt-info"></div><div class="neu-dt-pages"></div>`;
        wrapper.appendChild(footer);

        container.innerHTML = '';
        container.appendChild(wrapper);

        // ── State ──
        let filteredData = [...allData];
        let currentPage = 1;
        let perPage = defaultPerPage;
        const stickyState = {};

        effectiveCols.forEach((col, i) => {
            if (col.sticky === 'left' || col.sticky === 'right') stickyState[i] = col.sticky;
        });

        // ── DOM references ──
        const searchInput = wrapper.querySelector('.neu-dt-search input');
        const fromDate = wrapper.querySelector('.neu-dt-from');
        const toDate = wrapper.querySelector('.neu-dt-to');
        const perPageSelect = wrapper.querySelector('.neu-dt-per-page select');
        const resetBtn = wrapper.querySelector('.neu-dt-reset');
        const filterBtn = wrapper.querySelector('.neu-dt-filter-btn');
        const filterPanel = wrapper.querySelector('.neu-dt-filters');
        const filterSelects = wrapper.querySelectorAll('.neu-dt-filters select[data-filter-col]');
        const colManager = wrapper.querySelector('.neu-dt-col-manager');
        const colManagerBtn = wrapper.querySelector('.neu-dt-col-manager-btn');
        const colList = wrapper.querySelector('.neu-dt-col-list');
        const footerEl = wrapper.querySelector('.neu-dt-footer');
        const activeFiltersContainer = wrapper.querySelector('.neu-dt-active-filters');
        const allThs = () => Array.from(thead.querySelectorAll('th'));

        // ── Lookup filter display value from key ──
        function filterDisplayValue(col, key) {
            if (!col.filter || !col.filter._normalized) return key;
            const found = col.filter._normalized.find(o => o.key === String(key));
            return found ? found.value : key;
        }

        // ── Cell Renderer ──
        function renderCell(col, row) {
            if (col._isActions) {
                const rowActions = row._actions; // array of allowed action keys
                const visibleActions = rowActions
                    ? actions.filter(act => act.divider || (act.key && rowActions.includes(act.key)))
                    : actions;
                if (visibleActions.length === 0 || visibleActions.every(a => a.divider)) return '';
                let html = `<button class="neu-dt-action-btn">⋮</button><div class="neu-dt-action-menu">`;
                visibleActions.forEach(act => {
                    if (act.divider) html += `<div class="neu-dt-action-divider"></div>`;
                    else html += `<button class="neu-dt-action-item ${act.danger ? 'danger' : ''}" data-action="${act.key}">${act.label}</button>`;
                });
                html += `</div>`;
                return html;
            }
            const val = row[col.key];
            if (col.render) return col.render(val, row);
            // Default rendering for different data types
            if (val == null) return '';
            if (typeof val === 'object' && !Array.isArray(val)) {
                const entries = Object.values(val).filter(v => v != null);
                if (entries.length === 0) return '';
                return `<div class="neu-dt-cell-main">${entries[0]}</div>${entries.length > 1 ? `<div class="neu-dt-cell-sub">${entries.slice(1).join(', ')}</div>` : ''}`;
            }
            if (Array.isArray(val)) return val.join(', ');
            // If column has filter options, display the value not the key
            if (col.filter && col.filter._normalized) {
                return filterDisplayValue(col, val);
            }
            return String(val);
        }

        // ── Build a <tr> from row data ──
        function buildRow(row) {
            const tr = document.createElement('tr');
            tr.setAttribute('data-row-idx', row._idx);
            effectiveCols.forEach((col, colIdx) => {
                const td = document.createElement('td');
                if (col._isActions) td.className = 'neu-dt-action-cell';
                if (col.editable) td.classList.add('neu-dt-editable');
                td.innerHTML = renderCell(col, row);
                // Editable cell: dblclick to edit
                if (col.editable && !col._isActions) {
                    td.addEventListener('dblclick', () => startCellEdit(td, col, row));
                }
                tr.appendChild(td);
            });
            return tr;
        }

        // ── Inline Cell Editing ──
        function startCellEdit(td, col, row) {
            if (td.classList.contains('neu-dt-editing')) return;
            td.classList.add('neu-dt-editing');
            
            const isObj = typeof row[col.key] === 'object' && row[col.key] !== null;
            const currentVal = (isObj && col.editField) ? row[col.key][col.editField] : row[col.key];
            const inputType = col.inputType || 'text';

            let editor;
            if (inputType === 'dropdown') {
                editor = document.createElement('select');
                editor.className = 'neu-dt-cell-editor';
                const opts = (col.filter && col.filter._normalized) || [];
                opts.forEach(o => {
                    const opt = document.createElement('option');
                    opt.value = o.key;
                    opt.textContent = o.value;
                    if (String(o.key) === String(currentVal)) opt.selected = true;
                    editor.appendChild(opt);
                });
            } else if (inputType === 'textarea') {
                editor = document.createElement('textarea');
                editor.className = 'neu-dt-cell-editor';
                editor.value = flattenValue(currentVal);
            } else {
                editor = document.createElement('input');
                editor.className = 'neu-dt-cell-editor';
                editor.type = inputType === 'number' ? 'number' : 'text';
                editor.value = flattenValue(currentVal);
            }

            td.innerHTML = '';
            td.appendChild(editor);
            editor.focus();
            if (editor.select) editor.select();

            function commitEdit() {
                if (!td.classList.contains('neu-dt-editing')) return;
                td.classList.remove('neu-dt-editing');
                const newVal = editor.value;
                const parsedVal = inputType === 'number' ? parseFloat(newVal) || 0 : newVal;
                
                if (isObj && col.editField) {
                    row[col.key][col.editField] = parsedVal;
                } else {
                    row[col.key] = parsedVal;
                }
                
                // Update allData
                const srcRow = allData.find(r => r._idx === row._idx);
                if (srcRow) {
                    if (typeof srcRow[col.key] === 'object' && srcRow[col.key] !== null && col.editField) {
                        srcRow[col.key][col.editField] = parsedVal;
                    } else {
                        srcRow[col.key] = parsedVal;
                    }
                }
                
                td.innerHTML = renderCell(col, row);
                // Add dblclick back
                td.addEventListener('dblclick', () => startCellEdit(td, col, row));
                // Fire callbacks
                const cleanRow = { ...row }; delete cleanRow._idx;
                if (col.cellMethod) {
                    const fn = typeof col.cellMethod === 'function' ? col.cellMethod : window[col.cellMethod];
                    if (typeof fn === 'function') fn(col.key, parsedVal, cleanRow);
                }
                onCellEdit(col.key, parsedVal, cleanRow);
            }

            editor.addEventListener('blur', commitEdit);
            editor.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && inputType !== 'textarea') { e.preventDefault(); commitEdit(); }
                if (e.key === 'Escape') {
                    td.classList.remove('neu-dt-editing');
                    td.innerHTML = renderCell(col, row);
                    td.addEventListener('dblclick', () => startCellEdit(td, col, row));
                }
            });
            if (inputType === 'dropdown') editor.addEventListener('change', commitEdit);
        }

        // ── Filter Toggle ──
        if (filterBtn && filterPanel) {
            filterBtn.addEventListener('click', () => {
                filterBtn.classList.toggle('active');
                filterPanel.classList.toggle('open');
            });
        }

        // ── Dropdown Filters ──
        filterSelects.forEach(sel => {
            sel.addEventListener('change', applyFilters);
        });

        // ── Sort ──
        let currentSortCol = -1;
        let currentSortDir = '';
        wrapper.querySelectorAll('.neu-dt-sortable').forEach(th => {
            th.addEventListener('click', () => {
                const colIdx = Array.from(th.parentElement.children).indexOf(th);
                const current = th.getAttribute('data-sort');
                wrapper.querySelectorAll('.neu-dt-sortable').forEach(h => h.removeAttribute('data-sort'));

                let dir = 'asc';
                if (current === 'asc') dir = 'desc';
                else if (current === 'desc') dir = '';

                currentSortCol = dir ? colIdx : -1;
                currentSortDir = dir;

                if (dir) {
                    th.setAttribute('data-sort', dir);
                    const col = effectiveCols[colIdx];
                    if (col) {
                        filteredData.sort((a, b) => {
                            let aVal = flattenValue(a[col.key]);
                            let bVal = flattenValue(b[col.key]);
                            const aNum = parseFloat(aVal);
                            const bNum = parseFloat(bVal);
                            if (!isNaN(aNum) && !isNaN(bNum)) {
                                return dir === 'asc' ? aNum - bNum : bNum - aNum;
                            }
                            return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                        });
                    }
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

            filteredData = allData.filter(row => {
                // Text search across all columns
                if (query) {
                    const allText = cols.map(c => flattenValue(row[c.key])).join(' ').toLowerCase();
                    if (!allText.includes(query)) return false;
                }

                // Date range filter
                if (dateColIdx >= 0 && (from || to)) {
                    const dateCol = effectiveCols[dateColIdx];
                    const cellVal = row[dateCol.key];
                    const cellDate = new Date(flattenValue(cellVal));
                    if (!isNaN(cellDate)) {
                        if (from && cellDate < new Date(from)) return false;
                        if (to && cellDate > new Date(to + 'T23:59:59')) return false;
                    }
                }

                // Dropdown filters
                for (const sel of filterSelects) {
                    const val = sel.value;
                    if (!val) continue;
                    const colIdx = parseInt(sel.getAttribute('data-filter-col'));
                    const col = effectiveCols[colIdx];
                    if (!col) continue;
                    
                    const cellVal = row[col.key];
                    // If exact key match (for normalized key-value options), it's good
                    if (cellVal != null && String(cellVal) === val) continue;
                    // Otherwise fallback string match
                    const cellText = flattenValue(cellVal).toLowerCase();
                    if (!cellText.includes(val.toLowerCase())) return false;
                }

                return true;
            });

            // Re-apply current sort
            if (currentSortCol >= 0 && currentSortDir) {
                const col = effectiveCols[currentSortCol];
                if (col) {
                    filteredData.sort((a, b) => {
                        let aVal = flattenValue(a[col.key]); 
                        let bVal = flattenValue(b[col.key]);
                        const aNum = parseFloat(aVal); 
                        const bNum = parseFloat(bVal);
                        if (!isNaN(aNum) && !isNaN(bNum)) return currentSortDir === 'asc' ? aNum - bNum : bNum - aNum;
                        return currentSortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                    });
                }
            }

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
            if (perPageSelect) { perPageSelect.value = String(defaultPerPage); perPage = defaultPerPage; }
            filterSelects.forEach(sel => { sel.value = ''; });
            wrapper.querySelectorAll('.neu-dt-sortable').forEach(h => h.removeAttribute('data-sort'));
            currentSortCol = -1;
            currentSortDir = '';
            filteredData = [...allData];
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
                wrapper.querySelectorAll('.neu-dt-action-cell.open').forEach(c => {
                    if (c !== cell) c.classList.remove('open');
                });
                cell.classList.toggle('open');
                return;
            }
            const actionItem = e.target.closest('.neu-dt-action-item');
            if (actionItem) {
                const key = actionItem.getAttribute('data-action');
                const rowEl = actionItem.closest('tr');
                const rowIdx = rowEl ? parseInt(rowEl.getAttribute('data-row-idx')) : -1;
                const rowData = allData.find(r => r._idx === rowIdx) || {};
                wrapper.querySelectorAll('.neu-dt-action-cell.open').forEach(c => c.classList.remove('open'));
                onAction(key, rowData);
                return;
            }
        });
        document.addEventListener('click', () => {
            wrapper.querySelectorAll('.neu-dt-action-cell.open').forEach(c => c.classList.remove('open'));
        });

        // ── Column Resize ──
        allThs().forEach(th => {
            const handle = document.createElement('div');
            handle.className = 'neu-dt-resize-handle';
            th.appendChild(handle);

            let startX, startW;
            handle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
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
                    th.style.width = Math.max(50, startW + diff) + 'px';
                };
                const onUp = () => {
                    handle.classList.remove('active');
                    document.body.classList.remove('neu-dt-resizing');
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                    applyStickyPositions();
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        });

        // ── Column Manager (Visibility + Reorder + Sticky) ──
        if (colManager && colManagerBtn && colList) {
            colManagerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                colManager.classList.toggle('open');
            });
            document.addEventListener('click', (e) => {
                if (!colManager.contains(e.target)) colManager.classList.remove('open');
            });

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

                    // Pin toggle
                    item.querySelector('.neu-dt-col-pin').addEventListener('click', (e) => {
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
                        tbody.querySelectorAll('tr').forEach(row => {
                            const cell = row.children[i];
                            if (cell) cell.classList.toggle('neu-dt-col-hidden', hidden);
                        });
                        eyeBtn.classList.toggle('hidden', hidden);
                        eyeBtn.textContent = hidden ? '👁‍🗨' : '👁';
                        applyStickyPositions();
                    });

                    // Drag reorder
                    item.addEventListener('dragstart', (e) => {
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
                    item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
                    item.addEventListener('drop', (e) => {
                        e.preventDefault();
                        item.classList.remove('drag-over');
                        const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
                        if (fromIdx === i) return;
                        Object.keys(stickyState).forEach(k => delete stickyState[k]);
                        moveColumn(fromIdx, i);
                        // Also reorder effectiveCols to keep in sync
                        const movedCol = effectiveCols.splice(fromIdx, 1)[0];
                        effectiveCols.splice(i, 0, movedCol);
                        applyStickyPositions();
                        buildColumnList();
                    });
                });
            }

            function moveColumn(from, to) {
                const headerRow = thead.querySelector('tr');
                const ths = Array.from(headerRow.children);
                const movedTh = ths[from];
                if (from < to) headerRow.insertBefore(movedTh, ths[to].nextSibling);
                else headerRow.insertBefore(movedTh, ths[to]);
                tbody.querySelectorAll('tr').forEach(row => {
                    const cells = Array.from(row.children);
                    const movedCell = cells[from];
                    if (from < to) row.insertBefore(movedCell, cells[to].nextSibling);
                    else row.insertBefore(movedCell, cells[to]);
                });
            }

            buildColumnList();
        }

        // ── Sticky Positions ──
        function applyStickyPositions() {
            const ths = allThs();
            ths.forEach(th => {
                th.classList.remove('neu-dt-sticky-left', 'neu-dt-sticky-right', 'neu-dt-sticky-edge');
                th.style.left = ''; th.style.right = '';
            });
            tbody.querySelectorAll('tr').forEach(row => {
                Array.from(row.children).forEach(td => {
                    td.classList.remove('neu-dt-sticky-left', 'neu-dt-sticky-right', 'neu-dt-sticky-edge');
                    td.style.left = ''; td.style.right = '';
                });
            });

            const leftCols = [], rightCols = [];
            ths.forEach((th, i) => {
                const state = stickyState[i] || 'none';
                if (state === 'left' && !th.classList.contains('neu-dt-col-hidden')) leftCols.push(i);
                if (state === 'right' && !th.classList.contains('neu-dt-col-hidden')) rightCols.push(i);
            });

            let leftOffset = 0;
            leftCols.forEach((colIdx, order) => {
                const th = ths[colIdx];
                const w = th.offsetWidth;
                th.classList.add('neu-dt-sticky-left');
                th.style.left = leftOffset + 'px';
                if (order === leftCols.length - 1) th.classList.add('neu-dt-sticky-edge');
                tbody.querySelectorAll('tr').forEach(row => {
                    const td = row.children[colIdx];
                    if (td) {
                        td.classList.add('neu-dt-sticky-left');
                        td.style.left = leftOffset + 'px';
                        if (order === leftCols.length - 1) td.classList.add('neu-dt-sticky-edge');
                    }
                });
                leftOffset += w;
            });

            let rightOffset = 0;
            rightCols.reverse().forEach((colIdx, order) => {
                const th = ths[colIdx];
                const w = th.offsetWidth;
                th.classList.add('neu-dt-sticky-right');
                th.style.right = rightOffset + 'px';
                if (order === rightCols.length - 1) th.classList.add('neu-dt-sticky-edge');
                tbody.querySelectorAll('tr').forEach(row => {
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

        // ── Active Filter Tags ──
        function renderTags() {
            if (!activeFiltersContainer) return;
            const tags = [];
            const query = searchInput ? searchInput.value.trim() : '';
            if (query) tags.push({ label: 'Search', value: query, clear: () => { searchInput.value = ''; } });
            const from = fromDate ? fromDate.value : '';
            const to = toDate ? toDate.value : '';
            if (from) tags.push({ label: 'From', value: from, clear: () => { fromDate.value = ''; } });
            if (to) tags.push({ label: 'To', value: to, clear: () => { toDate.value = ''; } });
            filterSelects.forEach(sel => {
                if (sel.value) {
                    const labelEl = sel.closest('.neu-dt-filter-group')?.querySelector('label');
                    const labelText = labelEl ? labelEl.textContent : 'Filter';
                    const colIdx = parseInt(sel.getAttribute('data-filter-col'));
                    const col = effectiveCols[colIdx];
                    const displayVal = col ? filterDisplayValue(col, sel.value) : sel.value;
                    tags.push({ label: labelText, value: displayVal, clear: () => { sel.value = ''; } });
                }
            });

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

            activeFiltersContainer.querySelectorAll('.neu-dt-tag-close').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.getAttribute('data-tag-idx'));
                    if (tags[idx]) { tags[idx].clear(); applyFilters(); }
                });
            });
            const clearAllBtn = activeFiltersContainer.querySelector('.neu-dt-clear-all');
            if (clearAllBtn) clearAllBtn.addEventListener('click', () => { if (resetBtn) resetBtn.click(); });
        }

        // ── Render ──
        function render() {
            const total = filteredData.length;
            const totalPages = Math.max(1, Math.ceil(total / perPage));
            if (currentPage > totalPages) currentPage = totalPages;
            const start = (currentPage - 1) * perPage;
            const end = Math.min(start + perPage, total);
            const pageData = filteredData.slice(start, end);

            // Clear & fill tbody
            tbody.innerHTML = '';
            if (pageData.length === 0) {
                const emptyRow = document.createElement('tr');
                const colCount = effectiveCols.length;
                emptyRow.innerHTML = `<td colspan="${colCount}"><div class="neu-dt-empty"><div class="neu-dt-empty-icon">📭</div>No records found</div></td>`;
                tbody.appendChild(emptyRow);
            } else {
                pageData.forEach(row => tbody.appendChild(buildRow(row)));
            }

            // Footer info
            if (footerEl) {
                const info = footerEl.querySelector('.neu-dt-info');
                if (info) {
                    info.innerHTML = `Showing <strong>${total === 0 ? 0 : start + 1}</strong> to <strong>${end}</strong> of <strong>${total}</strong> records`;
                }

                const pagesContainer = footerEl.querySelector('.neu-dt-pages');
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

            // Re-apply sticky after render
            applyStickyPositions();
        }

        // Initial render
        render();

        // Return API for external control
        return {
            refresh: render,
            setData: (newData) => {
                allData.length = 0;
                newData.forEach((row, i) => allData.push({ ...row, _idx: i }));
                filteredData = [...allData];
                currentPage = 1;
                render();
                renderTags();
            },
            getData: () => allData.map(r => { const { _idx, ...rest } = r; return rest; }),
            getFilteredData: () => filteredData.map(r => { const { _idx, ...rest } = r; return rest; }),
            getWrapper: () => wrapper
        };
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
