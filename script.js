function updateLayout() {
    const video = document.getElementById('bg-video');
    const content = document.getElementById('text-container');
    const svg = document.querySelector('.mask-svg');
    const mask = svg.querySelector('#text-mask');
  
    // 1. Устанавливаем высоту видео по содержимому
    const contentHeight = content.offsetHeight;
    video.style.height = `${contentHeight}px`;
  
    // 2. Очищаем старые вырезы маски
    [...mask.querySelectorAll('rect:not(:first-child)')].forEach(el => el.remove());
  
    // 3. Обработка всех span.reveal
    const spans = document.querySelectorAll('.reveal');
  
    spans.forEach(span => {
        if (span.classList.contains('full-line')) {
          const spanRect = span.getBoundingClientRect();
          const parentRect = span.parentElement.getBoundingClientRect();
      
          const remainingWidth = Math.max(parentRect.right - spanRect.left, 0);
      
          // Устанавливаем width явно — это ключевой момент
          span.style.setProperty('width', `${remainingWidth}px`);
        } else {
          span.style.width = '';
        }
      
        // создаём вырез в маске
        const r = span.getBoundingClientRect();
        const s = svg.getBoundingClientRect();
      
        const x = r.left - s.left;
        const y = r.top - s.top;
        const w = r.width;
        const h = r.height;
      
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", w);
        rect.setAttribute("height", h);
        rect.setAttribute("fill", "black");
        mask.appendChild(rect);
      });
           
  
    // 4. Обновляем высоту фона-маски (overlay)
    document.querySelector('.overlay-bg').style.height = `${contentHeight}px`;
    svg.style.height = `${contentHeight}px`;
  }
  
  // Привязка к событиям
  window.addEventListener('load', updateLayout);
  window.addEventListener('resize', updateLayout);
  