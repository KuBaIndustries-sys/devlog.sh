function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

async function loadPosts() {
  const main = document.getElementById('posts');
  const tocList = document.getElementById('toc-list');

  try {
    const response = await fetch('../posts.json');
    if (!response.ok) throw new Error('Nie udało się wczytać wpisów');
    const posts = await response.json();

    main.innerHTML = '';
    tocList.innerHTML = '';

    posts.forEach(post => {
      // Tworzymy artykuł z id
      const article = document.createElement('article');
      article.classList.add('post');
      article.id = `post-${post.id}`;

      article.innerHTML = `
        <h2>${post.title}</h2>
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <p>${post.summary}</p>
        <a href="${post.url}" class="read-more">Czytaj więcej →</a>
      `;

      main.appendChild(article);

      // Dodajemy link do spisu treści
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#post-${post.id}`;
      a.textContent = post.title;
      li.appendChild(a);
      tocList.appendChild(li);
    });

  } catch (err) {
    main.innerHTML = `<p>Błąd podczas ładowania wpisów: ${err.message}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', loadPosts);
document.addEventListener('DOMContentLoaded', () => {
  const tocToggle = document.getElementById('toc-toggle');
  const toc = document.getElementById('toc');

  tocToggle.addEventListener('click', () => {
    toc.classList.toggle('hidden');
    tocToggle.textContent = toc.classList.contains('hidden') ? 'Pokaż spis treści' : 'Ukryj spis treści';
  });
});