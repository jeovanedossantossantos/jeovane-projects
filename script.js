// Rótulos e cores de cada categoria
const CATEGORIES = {
    html_css:     { label: 'HTML e CSS',             badge: 'text-bg-danger' },
    html_css_js:  { label: 'HTML, CSS e JavaScript', badge: 'text-bg-warning' },
    react:        { label: 'React',                  badge: 'text-bg-info' },
    react_native: { label: 'React Native',           badge: 'text-bg-primary' },
    nodejs:       { label: 'Node.js',                badge: 'text-bg-success' },
    java_spring:  { label: 'Java + Spring',          badge: 'text-bg-secondary' },
    python_dango: { label: 'Python + Django',        badge: 'text-bg-dark' }
};

const state = { projects: [], filter: 'all', query: '' };

const els = {
    filters: document.getElementById('filters'),
    projects: document.getElementById('projects'),
    search: document.getElementById('search'),
    count: document.getElementById('count'),
    empty: document.getElementById('empty')
};

// Evita injeção de HTML vindo do JSON
function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

async function loadStacks() {
    const response = await fetch('stacks.json');
    if (!response.ok) throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    return response.json();
}

// Transforma { categoria: [projetos] } em uma lista única
function flatten(data) {
    return Object.entries(data).flatMap(([category, list]) =>
        list.map(project => ({ ...project, category }))
    );
}

function categoryInfo(key) {
    return CATEGORIES[key] || { label: key, badge: 'text-bg-secondary' };
}

function renderFilters() {
    const counts = state.projects.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});

    const items = [['all', 'Todos', state.projects.length],
        ...Object.keys(counts).map(key => [key, categoryInfo(key).label, counts[key]])];

    els.filters.innerHTML = items.map(([key, label, total]) => `
        <li class="nav-item" role="presentation">
            <button type="button" role="tab" data-filter="${key}"
                class="nav-link ${key === state.filter ? 'active' : ''}"
                aria-selected="${key === state.filter}">
                ${escapeHtml(label)}
                <span class="badge text-bg-secondary ms-1">${total}</span>
            </button>
        </li>`).join('');
}

function cardTemplate(project) {
    const info = categoryInfo(project.category);
    const name = escapeHtml(project.name);
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <article class="card project-card h-100 border-0 shadow-sm">
                <img src="${escapeHtml(project.img)}" class="card-img-top thumb" alt="Captura de tela do projeto ${name}"
                    loading="lazy" onerror="this.style.visibility='hidden'">
                <div class="card-body d-flex flex-column">
                    <span class="badge ${info.badge} align-self-start mb-2">${escapeHtml(info.label)}</span>
                    <h2 class="h5 card-title">${name}</h2>
                    <p class="card-text text-body-secondary flex-grow-1">${escapeHtml(project.description)}</p>
                    <a href="${escapeHtml(project.link)}" class="btn btn-primary mt-2" target="_blank"
                        rel="noopener noreferrer">
                        Ver projeto <i class="bi bi-box-arrow-up-right ms-1" aria-hidden="true"></i>
                    </a>
                </div>
            </article>
        </div>`;
}

function renderProjects() {
    const query = state.query.trim().toLowerCase();
    const visible = state.projects.filter(p =>
        (state.filter === 'all' || p.category === state.filter) &&
        (!query || `${p.name} ${p.description}`.toLowerCase().includes(query))
    );

    els.projects.innerHTML = visible.map(cardTemplate).join('');
    els.empty.classList.toggle('d-none', visible.length > 0);
    els.count.textContent = visible.length
        ? `${visible.length} ${visible.length === 1 ? 'projeto' : 'projetos'}`
        : '';
}

function showError() {
    els.projects.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger" role="alert">
                Não foi possível carregar os projetos. Se estiver abrindo o arquivo direto no navegador,
                use um servidor local (por exemplo, a extensão Live Server).
            </div>
        </div>`;
}

// Eventos
els.filters.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    state.filter = btn.dataset.filter;
    renderFilters();
    renderProjects();
});

els.search.addEventListener('input', e => {
    state.query = e.target.value;
    renderProjects();
});

// Tema claro/escuro
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    themeBtn.innerHTML = `<i class="bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}" aria-hidden="true"></i>`;
}

applyTheme(localStorage.getItem('theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
});

document.getElementById('year').textContent = new Date().getFullYear();

// Inicialização
loadStacks()
    .then(data => {
        state.projects = flatten(data);
        renderFilters();
        renderProjects();
    })
    .catch(err => {
        console.error(err);
        showError();
    });