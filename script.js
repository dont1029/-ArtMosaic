// Load JSON and render cards
async function loadTrends(genderFilter = null) {
  try {
    const response = await fetch('trends.json');
    const trends = await response.json();

    const container = document.getElementById('trends-container');
    container.innerHTML = ''; // clear before adding

    trends
      .filter(trend => !genderFilter || trend.gender === genderFilter)
      .forEach(trend => {
        const card = document.createElement('div');
        card.classList.add('trend-card');

        card.innerHTML = `
          <img src="${trend.image}" alt="${trend.title}">
          <h3>${trend.title}</h3>
          <p class="prompt-text">${trend.displayPrompt}</p>
          <div class="card-buttons">
            <button class="copy-btn">📋 Copy Prompt</button>
            <button class="open-btn">🚀 Create</button>
          </div>
        `;

        // Copy button
        const copyBtn = card.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(trend.allPrompts).then(() => {
            copyBtn.textContent = "✅ Copied";
            setTimeout(() => { copyBtn.textContent = "📋 Copy Prompt"; }, 2000);
          });
        });

        // Open button
        const openBtn = card.querySelector('.open-btn');
        openBtn.addEventListener('click', () => {
          window.open(trend.links, '_blank');
        });

        container.appendChild(card);
      });
  } catch (error) {
    console.error('Error loading trends:', error);
  }
}

// Gender filter buttons
const maleBtn = document.getElementById('male-btn');
const femaleBtn = document.getElementById('female-btn');

maleBtn.addEventListener('click', () => {
  if (maleBtn.classList.contains('active')) {
    maleBtn.classList.remove('active');
    loadTrends();
  } else {
    maleBtn.classList.add('active');
    femaleBtn.classList.remove('active');
    loadTrends('m');
  }
});

femaleBtn.addEventListener('click', () => {
  if (femaleBtn.classList.contains('active')) {
    femaleBtn.classList.remove('active');
    loadTrends();
  } else {
    femaleBtn.classList.add('active');
    maleBtn.classList.remove('active');
    loadTrends('f');
  }
});

// Initial load
loadTrends();
