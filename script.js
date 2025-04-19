// Função para renderizar os projetos
async function loadStacks() {
    try {
        const response = await fetch('stacks.json'); // Caminho para o arquivo JSON
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
        }
        const data = await response.json(); // Converte o conteúdo para JSON
        return data; // Retorna os dados para uso
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
    }
}
async function renderProjects(filter) {


    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = '';
    loadStacks().then(data => {
        if (!data) {
            return
        }

        for (const [category, projects] of Object.entries(data)) {
            if (filter !== 'all' && filter !== category) continue;

            projects.forEach(project => {
                const card = `
                <div class="col-md-4">
                <div class="card">
                    <img src="${project.img}" height="200px" class="card-img-top" alt="${project.name}">
                    <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary" target="_blank">Ver Projeto</a>
                    </div>
                </div>
                </div>
                `;
                projectsContainer.innerHTML += card;
            });
        }
    })


}

// Evento de filtro
document.getElementById('filter').addEventListener('change', (e) => {
    renderProjects(e.target.value);
});

// Renderizar todos os projetos ao carregar a página
renderProjects('all');