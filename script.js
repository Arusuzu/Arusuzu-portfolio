    const root = document.documentElement;
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('liam-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      root.style.colorScheme = savedTheme;
    }
    themeBtn.addEventListener('click', () => {
      const next = root.style.colorScheme === 'dark' ? 'light' : 'dark';
      root.style.colorScheme = next;
      localStorage.setItem('liam-theme', next);
    });

    const filters = [...document.querySelectorAll('.filter')];
    const projects = [...document.querySelectorAll('.project')];
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        filters.forEach(item => item.classList.remove('active'));
        filter.classList.add('active');
        const selected = filter.dataset.filter;
        projects.forEach(project => {
          const visible = selected === 'all' || project.dataset.cat.split(' ').includes(selected);
          project.classList.toggle('hidden', !visible);
        });
      });
    });

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const closeModal = document.getElementById('closeModal');
    document.querySelectorAll('.view-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.project');
        modalTitle.textContent = card.dataset.title;
        modalText.textContent = card.dataset.detail;
        modal.classList.add('open');
        closeModal.focus();
      });
    });
    const close = () => modal.classList.remove('open');
    closeModal.addEventListener('click', close);
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
