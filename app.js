
/**
 * LINHAS & FORMAS — SCRIPT DE MOVIMENTO & EXPERIÊNCIA (ETAPA 04)
 * Linguagem de Movimento Cinematográfica, Editorial e Arquitetônica
 * Princípio: "MOVIMENTO DEVE GUIAR O OLHAR" · CONTENT > MOTION
 */

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const isDesktop = window.matchMedia('(min-width: 801px)').matches;

  // ------------------------------------------------------------------------
  // 01. CURSOR CONTEXTUAL SUTIL (DESKTOP / MOUSE ONLY)
  // ------------------------------------------------------------------------
  const cursor = document.querySelector('.cursor');
  if (cursor && isFinePointer && !isReducedMotion) {
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });

    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      if (!isVisible) {
        cursor.classList.add('show');
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('show');
      isVisible = false;
    });

    const contextMap = [
      { selector: 'a, button:not(.hotspot), .outline-btn, .mini-link, .wa, .filter, .next-action-pill', cls: 'cursor--link' },
      { selector: '.p-card, .ambiente-card, .block-next-card, .shot, .split-image, .full-image, .story-main, .story-small', cls: 'cursor--view' },
      { selector: '.hotspot', cls: 'cursor--hotspot' },
      { selector: '.reel-card, .vertical-card', cls: 'cursor--drag' }
    ];

    contextMap.forEach(({ selector, cls }) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add(cls), { passive: true });
        el.addEventListener('mouseleave', () => cursor.classList.remove(cls), { passive: true });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 02. CABEÇALHO & SCROLL SPY ATIVO
  // ------------------------------------------------------------------------
  const header = document.querySelector('header');
  if (header) {
    let isScrolled = false;
    let headerTicking = false;

    const updateHeaderState = () => {
      const scrolled = window.scrollY > 48;
      if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        header.classList.toggle('scrolled', isScrolled);
      }
      headerTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!headerTicking) {
        window.requestAnimationFrame(updateHeaderState);
        headerTicking = true;
      }
    }, { passive: true });

    updateHeaderState();
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.menu-nav-main a[href^="#"], .menu-nav-main a[href*="#"]');

  if (sections.length > 0 && navLinks.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = `#${entry.target.getAttribute('id')}`;
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === currentId) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // ------------------------------------------------------------------------
  // 03. MENU OVERLAY EDITORIAL CINEMÁTICO (DUAS COLUNAS COM PREVIEW)
  // ------------------------------------------------------------------------
  const menuBtn = document.querySelector('.menu-btn');
  const menuOverlay = document.querySelector('#menuOverlay');
  const menuCloseBtn = document.querySelector('.menu-close-btn');
  const menuCloseLinks = document.querySelectorAll('.menu-close-link');
  const menuNavLinks = document.querySelectorAll('.menu-nav-main a');
  const menuColLabels = document.querySelectorAll('.menu-col-label');
  const menuColPreview = document.querySelector('.menu-col-preview');
  const menuPreviewImg = document.getElementById('menuPreviewImg');
  const menuPreviewCat = document.getElementById('menuPreviewCat');
  const menuPreviewSub = document.getElementById('menuPreviewSub');
  const menuSubgrid = document.querySelector('.menu-overlay-subgrid');
  const menuOverlayFooter = document.querySelector('.menu-overlay-footer');

  if (menuBtn && menuOverlay) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !menuOverlay.classList.contains('open');
      menuOverlay.classList.toggle('open', isOpen);
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.classList.toggle('menu-open', isOpen);

      if (isOpen) {
        document.body.style.overflow = 'hidden';

        if (!isReducedMotion && typeof gsap !== 'undefined') {
          // Reset antes de animar
          gsap.set(menuNavLinks, { opacity: 0, y: 28, filter: 'blur(10px)' });
          gsap.set(menuColLabels, { opacity: 0, y: 8 });
          if (menuColPreview) gsap.set(menuColPreview, { opacity: 0, scale: 0.96, y: 16 });
          if (menuSubgrid) gsap.set(menuSubgrid, { opacity: 0, y: 12 });
          if (menuOverlayFooter) gsap.set(menuOverlayFooter, { opacity: 0 });

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          // Labels
          tl.to(menuColLabels,
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' },
            0.06
          );

          // Links principais com blur bloom
          tl.to(menuNavLinks,
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.06 },
            0.1
          );

          // Visual Preview Card (Desktop)
          if (menuColPreview) {
            tl.to(menuColPreview,
              { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power2.out' },
              0.2
            );
          }

          // Subgrid
          if (menuSubgrid) {
            tl.to(menuSubgrid,
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              0.3
            );
          }

          // Footer
          if (menuOverlayFooter) {
            tl.to(menuOverlayFooter,
              { opacity: 1, duration: 0.45, ease: 'power2.out' },
              0.4
            );
          }
        } else {
          // Sem animação: apenas mostrar
          if (menuNavLinks.length) gsap.set(menuNavLinks, { opacity: 1, y: 0, filter: 'none' });
          if (menuColLabels.length) gsap.set(menuColLabels, { opacity: 1, y: 0 });
          if (menuColPreview) gsap.set(menuColPreview, { opacity: 1, scale: 1, y: 0 });
          if (menuSubgrid) gsap.set(menuSubgrid, { opacity: 1, y: 0 });
          if (menuOverlayFooter) gsap.set(menuOverlayFooter, { opacity: 1 });
        }
      } else {
        document.body.style.overflow = '';
      }
    };

    menuBtn.addEventListener('click', () => toggleMenu());

    if (menuCloseBtn) {
      menuCloseBtn.addEventListener('click', () => toggleMenu(false));
    }

    menuCloseLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Preview crossfade ao passar o mouse pelos links do menu no desktop
    if (menuPreviewImg && isDesktop) {
      let currentSrc = menuPreviewImg.getAttribute('src');

      menuNavLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          const newSrc = link.getAttribute('data-preview-img');
          const newCat = link.getAttribute('data-preview-cat');
          const newSub = link.getAttribute('data-preview-sub');

          if (newSrc && newSrc !== currentSrc) {
            currentSrc = newSrc;
            
            if (typeof gsap !== 'undefined' && !isReducedMotion) {
              gsap.to(menuPreviewImg, {
                opacity: 0.25,
                scale: 1.04,
                duration: 0.18,
                ease: 'power2.in',
                onComplete: () => {
                  menuPreviewImg.src = newSrc;
                  if (menuPreviewCat && newCat) menuPreviewCat.textContent = newCat;
                  if (menuPreviewSub && newSub) menuPreviewSub.textContent = newSub;
                  gsap.to(menuPreviewImg, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.35,
                    ease: 'power2.out'
                  });
                }
              });
            } else {
              menuPreviewImg.src = newSrc;
              if (menuPreviewCat && newCat) menuPreviewCat.textContent = newCat;
              if (menuPreviewSub && newSub) menuPreviewSub.textContent = newSub;
            }
          }
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOverlay.classList.contains('open')) {
        toggleMenu(false);
        menuBtn.focus();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 04. LIGHTBOX IMERSIVO POR ORIGEM (CASE STUDY & CANVAS LIVRE)
  // ------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxFigure = document.querySelector('.lightbox-figure');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger, .case-card-main, .case-card-detail');

  if (lightboxModal && lightboxTriggers.length > 0) {
    const items = Array.from(lightboxTriggers).map((trigger) => {
      const img = trigger.querySelector('img');
      const badge = trigger.querySelector('.shot-badge');
      return {
        src: img ? img.src : '',
        alt: img ? img.alt : '',
        caption: badge ? badge.textContent : (trigger.getAttribute('data-caption') || (img ? img.alt : '')),
        triggerEl: trigger
      };
    });

    let currentIndex = 0;
    let activeTrigger = null;

    const updateLightboxContent = (index, animate = true) => {
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];

      if (lightboxCounter) {
        lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = item.caption;
      }

      if (animate && typeof gsap !== 'undefined' && !isReducedMotion) {
        gsap.to(lightboxImg, {
          opacity: 0,
          scale: 0.98,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            lightboxImg.src = item.src;
            lightboxImg.alt = item.alt;
            gsap.fromTo(
              lightboxImg,
              { opacity: 0, scale: 0.98 },
              { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
            );
          }
        });
      } else {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
      }
    };

    const openLightbox = (index, triggerEl) => {
      currentIndex = index;
      activeTrigger = triggerEl;
      const item = items[currentIndex];

      lightboxModal.classList.add('open');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      if (lightboxCounter) {
        lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = item.caption;
      }

      if (typeof gsap !== 'undefined' && !isReducedMotion && triggerEl) {
        const rect = triggerEl.getBoundingClientRect();
        const startX = rect.left + rect.width / 2 - window.innerWidth / 2;
        const startY = rect.top + rect.height / 2 - window.innerHeight / 2;

        gsap.fromTo(
          lightboxBackdrop,
          { opacity: 0 },
          { opacity: 1, duration: 0.45, ease: 'power2.out' }
        );

        gsap.fromTo(
          lightboxFigure,
          {
            x: startX,
            y: startY,
            scale: 0.4,
            opacity: 0.3,
            borderRadius: '24px'
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            borderRadius: '12px',
            duration: 0.55,
            ease: 'power3.out'
          }
        );

        gsap.fromTo(
          ['.lightbox-head', '.lightbox-footer', '.lightbox-nav-btn'],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.2, ease: 'power2.out' }
        );
      }
    };

    const closeLightbox = () => {
      if (!lightboxModal.classList.contains('open')) return;

      if (typeof gsap !== 'undefined' && !isReducedMotion && activeTrigger) {
        const rect = activeTrigger.getBoundingClientRect();
        const endX = rect.left + rect.width / 2 - window.innerWidth / 2;
        const endY = rect.top + rect.height / 2 - window.innerHeight / 2;

        gsap.to(['.lightbox-head', '.lightbox-footer', '.lightbox-nav-btn'], {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        });

        gsap.to(lightboxFigure, {
          x: endX,
          y: endY,
          scale: 0.4,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
          onComplete: () => {
            lightboxModal.classList.remove('open');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            gsap.set(lightboxFigure, { x: 0, y: 0, scale: 1, opacity: 1 });
            if (activeTrigger) activeTrigger.focus();
          }
        });

        gsap.to(lightboxBackdrop, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in'
        });
      } else {
        lightboxModal.classList.remove('open');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (activeTrigger) activeTrigger.focus();
      }
    };

    lightboxTriggers.forEach((trigger, idx) => {
      trigger.addEventListener('click', () => openLightbox(idx, trigger));
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx, trigger);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => updateLightboxContent(currentIndex - 1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => updateLightboxContent(currentIndex + 1));

    // Teclado
    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('open')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        updateLightboxContent(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateLightboxContent(currentIndex + 1);
      }
    });

    // Touch Swipe no Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          updateLightboxContent(currentIndex + 1);
        } else {
          updateLightboxContent(currentIndex - 1);
        }
      }
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // 04. HOTSPOTS DE MATERIAIS & FOCO CONTEXTUAL
  // ------------------------------------------------------------------------
  const materialStage = document.getElementById('materialStage');
  const materialPopover = document.getElementById('materialPopover');
  const popoverClose = document.getElementById('popoverClose');
  const hotspots = document.querySelectorAll('.hotspot');
  const detailsData = [
    {
      num: '01 — MATERIAL',
      title: 'Material',
      desc: 'Superfícies minerais com alta resistência, veios contínuos e corte milimétrico para bancadas e áreas úmidas.'
    },
    {
      num: '02 — FERRAGEM',
      title: 'Ferragem',
      desc: 'Sistemas pensados para movimento suave, durabilidade e conforto no uso diário.'
    },
    {
      num: '03 — ACABAMENTO',
      title: 'Acabamento',
      desc: 'Encaixes precisos, alinhamento milimétrico de veios e texturas táteis que trazem aconchego visual.'
    },
    {
      num: '04 — ILUMINAÇÃO',
      title: 'Iluminação',
      desc: 'Perfis LED embutidos com difusor leitoso, criando iluminação indireta funcional e acolhedora.'
    }
  ];

  if (materialStage && materialPopover && hotspots.length > 0) {
    const popoverNum = document.getElementById('popoverNum');
    const popoverTitle = document.getElementById('popoverTitle');
    const popoverDesc = document.getElementById('popoverDesc');

    const updatePopoverPosition = (btn) => {
      if (!btn || !materialStage || !materialPopover) return;

      if (window.innerWidth <= 800) {
        materialPopover.style.left = '';
        materialPopover.style.top = '';
        materialPopover.style.bottom = '';
        materialPopover.style.right = '';
        materialPopover.style.transform = '';
        return;
      }

      const stageRect = materialStage.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      const btnCenterX = btnRect.left - stageRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top - stageRect.top + btnRect.height / 2;

      const popoverWidth = materialPopover.offsetWidth || 300;
      const popoverHeight = materialPopover.offsetHeight || 150;

      let left, top;
      const spacing = 18;

      if (btnCenterY > stageRect.height * 0.62) {
        // Hotspot near bottom -> place card ABOVE the hotspot
        top = btnCenterY - popoverHeight - spacing;
        if (btnCenterX > stageRect.width / 2) {
          left = btnCenterX - popoverWidth + 20;
        } else {
          left = btnCenterX - 20;
        }
      } else if (btnCenterX > stageRect.width / 2) {
        // Hotspot on right -> place card to the LEFT
        left = btnCenterX - popoverWidth - spacing;
        top = btnCenterY - popoverHeight / 2;
      } else {
        // Hotspot on left -> place card to the RIGHT
        left = btnCenterX + spacing;
        top = btnCenterY - popoverHeight / 2;
      }

      // Ensure card stays neatly inside the materialStage container
      left = Math.max(20, Math.min(stageRect.width - popoverWidth - 20, left));
      top = Math.max(20, Math.min(stageRect.height - popoverHeight - 20, top));

      materialPopover.style.left = `${Math.round(left)}px`;
      materialPopover.style.top = `${Math.round(top)}px`;
      materialPopover.style.bottom = 'auto';
      materialPopover.style.right = 'auto';
    };

    const activateHotspot = (btn, index, shouldAnimate = true) => {
      hotspots.forEach((h) => {
        h.classList.remove('active');
        h.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      materialStage.classList.add('has-focus');

      const data = detailsData[index] || detailsData[0];
      if (popoverNum) popoverNum.textContent = data.num;
      if (popoverTitle) popoverTitle.textContent = data.title;
      if (popoverDesc) popoverDesc.textContent = data.desc;

      updatePopoverPosition(btn);

      if (isReducedMotion || !shouldAnimate) {
        materialPopover.style.opacity = '1';
        materialPopover.style.display = 'block';
        return;
      }

      gsap.fromTo(
        materialPopover,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    };

    hotspots.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        activateHotspot(btn, index);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateHotspot(btn, index);
        }
      });
    });

    if (popoverClose) {
      popoverClose.addEventListener('click', (e) => {
        e.stopPropagation();
        gsap.to(materialPopover, { opacity: 0, scale: 0.96, duration: 0.2, onComplete: () => {
          materialStage.classList.remove('has-focus');
          hotspots.forEach(h => {
            h.classList.remove('active');
            h.setAttribute('aria-pressed', 'false');
          });
        }});
      });
    }

    document.addEventListener('click', (e) => {
      if (materialStage && materialStage.classList.contains('has-focus') && !e.target.closest('#materialStage')) {
        gsap.to(materialPopover, { opacity: 0, scale: 0.96, duration: 0.2, onComplete: () => {
          materialStage.classList.remove('has-focus');
          hotspots.forEach(h => {
            h.classList.remove('active');
            h.setAttribute('aria-pressed', 'false');
          });
        }});
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && materialStage && materialStage.classList.contains('has-focus')) {
        gsap.to(materialPopover, { opacity: 0, scale: 0.96, duration: 0.2, onComplete: () => {
          materialStage.classList.remove('has-focus');
          hotspots.forEach(h => {
            h.classList.remove('active');
            h.setAttribute('aria-pressed', 'false');
          });
        }});
      }
    });

    // Inicializar e recalcular em resize / load
    const initFirstHotspot = () => {
      const firstActive = document.querySelector('.hotspot.active') || hotspots[0];
      if (firstActive) {
        activateHotspot(firstActive, 0, false);
      }
    };

    initFirstHotspot();
    window.addEventListener('resize', () => {
      const activeBtn = document.querySelector('.hotspot.active') || hotspots[0];
      if (activeBtn) updatePopoverPosition(activeBtn);
    }, { passive: true });

    const stageImg = materialStage.querySelector('img');
    if (stageImg) {
      if (stageImg.complete) {
        initFirstHotspot();
      } else {
        stageImg.addEventListener('load', initFirstHotspot, { once: true });
      }
    }
  }

  // ------------------------------------------------------------------------
  // 05. FILTRO DE PORTFÓLIO & PROJETOS
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter, .filter-idx');
  const projectCards = document.querySelectorAll('.portfolio-grid .p-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterValue = btn.dataset.filter;

        const outgoing = [];
        const incoming = [];

        projectCards.forEach((card) => {
          const cat = card.dataset.cat;
          const match = filterValue === 'all' || cat === filterValue;

          if (match) {
            incoming.push(card);
          } else {
            outgoing.push(card);
          }
        });

        if (isReducedMotion) {
          outgoing.forEach((card) => {
            card.style.display = 'none';
          });
          incoming.forEach((card) => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'none';
          });
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
          return;
        }

        gsap.to(outgoing, {
          opacity: 0,
          scale: 0.97,
          duration: 0.22,
          ease: 'power2.in',
          onComplete: () => {
            outgoing.forEach((card) => (card.style.display = 'none'));

            incoming.forEach((card) => {
              card.style.display = 'block';
            });

            gsap.fromTo(
              incoming,
              { opacity: 0, y: 18, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.42,
                stagger: 0.05,
                ease: 'power2.out',
                onComplete: () => {
                  if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                  }
                }
              }
            );
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 06. BOTÕES MAGNÉTICOS (DESKTOP ONLY)
  // ------------------------------------------------------------------------
  if (isFinePointer && !isReducedMotion) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const maxShift = 10;
        const xRaw = (e.clientX - rect.left - rect.width / 2) * 0.16;
        const yRaw = (e.clientY - rect.top - rect.height / 2) * 0.16;
        const x = Math.max(-maxShift, Math.min(maxShift, xRaw));
        const y = Math.max(-maxShift, Math.min(maxShift, yRaw));

        gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
      }, { passive: true });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 07. GERENCIAMENTO DE VÍDEOS (AUTOPLAY INTELIGENTE)
  // ------------------------------------------------------------------------
  const autoplayVideos = document.querySelectorAll('video[data-autoplay]');
  if (autoplayVideos.length > 0 && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    autoplayVideos.forEach((vid) => videoObserver.observe(vid));
  }

  // ------------------------------------------------------------------------
  // 08. LINGUAGEM DE MOVIMENTO EDITORIAL COM GSAP & LENIS
  // ------------------------------------------------------------------------
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    let lenis = null;

    if (!isReducedMotion && typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.4
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Barra de progresso de leitura
      const progressBar = document.querySelector('.progress');
      if (progressBar) {
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            progressBar.style.width = self.progress * 100 + '%';
          }
        });
      }

      // Smooth scroll para links com âncora interna
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              lenis.scrollTo(targetEl, { offset: -24, duration: 1.1 });
            }
          }
        });
      });
    }

    // MATCHMEDIA: DESKTOP (801px+) vs MOBILE (<=800px)
    const mm = gsap.matchMedia();

    // ========================================================================
    // DESKTOP MOTION
    // ========================================================================
    mm.add('(min-width: 801px)', () => {
      if (isReducedMotion) return;

    // ─── STAGGER DE LOAD DO PORTFÓLIO (projetos.html) ───────────────────────
    // Os cards surgem progressivamente ao carregar a página — não apenas no scroll.
    // Isso cria o efeito de "tudo emerge suavemente" da referência.
    const isPortfolioPage = document.querySelector('.portfolio-grid');
    if (isPortfolioPage) {
      const portHead = document.querySelectorAll('.projects-head > *, .editorial-index');
      const portCards = document.querySelectorAll('.portfolio-grid .p-card');

      const portfolioTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (portHead.length > 0) {
        portfolioTl.fromTo(
          portHead,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.07 },
          0.15
        );
      }

      if (portCards.length > 0) {
        portfolioTl.fromTo(
          portCards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.09 },
          portHead.length > 0 ? '-=0.4' : 0.1
        );
      }
    }

    // 1. Sequência Hierárquica do Hero
      const heroCard = document.querySelector('.hero-card, .project-hero-inner');
      const heroMedia = document.querySelector('.hero-media img, .project-hero-bg img');
      const heroEyebrow = document.querySelector('.eyebrow, .project-hero-copy .kicker');
      const heroHeadline = document.querySelector('.hero h1, .project-hero-copy h1');
      const heroCopy = document.querySelector('.hero-copy, .project-hero-copy p');
      const heroCta = document.querySelector('.hero .outline-btn, .hero .wa');
      const heroMeta = document.querySelectorAll('.hero-index, .hero-sign, .scroll, .project-no');

      if (heroCard) {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Frame e imagem expandem com peso e calma
        heroTl.fromTo(heroCard, { scale: 0.985, opacity: 0.9 }, { scale: 1, opacity: 1, duration: 1.1 });
        if (heroMedia) {
          heroTl.fromTo(heroMedia, { scale: 1.08 }, { scale: 1.04, duration: 1.4, ease: 'power2.out' }, '<');
        }

        // Revelação da Linha Interna Arquitetônica (Passe-partout 1px Nítido)
        const heroInnerFrame = heroCard.querySelector('.inner-frame');
        if (heroInnerFrame) {
          heroTl.fromTo(
            heroInnerFrame,
            { opacity: 0, scale: 0.99 },
            { opacity: 0.85, scale: 1, duration: 1.2, ease: 'power2.out' },
            '-=0.9'
          );
        }

        // Revelação tipográfica hierárquica (bloco editorial)
        if (heroEyebrow) {
          heroTl.fromTo(heroEyebrow, { y: 14, opacity: 0 }, { y: 0, opacity: 0.85, duration: 0.6 }, '-=0.85');
        }
        if (heroHeadline) {
          heroTl.fromTo(heroHeadline, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, '-=0.55');
        }
        if (heroCopy) {
          heroTl.fromTo(heroCopy, { y: 16, opacity: 0 }, { y: 0, opacity: 0.8, duration: 0.7 }, '-=0.65');
        }
        if (heroCta) {
          heroTl.fromTo(heroCta, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.55');
        }
        if (heroMeta.length > 0) {
          heroTl.fromTo(heroMeta, { opacity: 0 }, { opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power2.out' }, '-=0.4');
        }
      }

      // Breadcrumb Editorial Entrada
      const breadcrumb = document.querySelector('.editorial-breadcrumb');
      if (breadcrumb) {
        gsap.fromTo(
          breadcrumb,
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.15 }
        );
      }

      // 2. Parallax Sutil de Baixa Amplitude no Hero
      if (heroMedia) {
        gsap.to(heroMedia, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero, .project-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      }

      // 3. Revelação Dinâmica dos Ambientes (Cards Espalhados com Glide Lateral e Blur)
      const ambienteCards = document.querySelectorAll('.ambiente-card');
      if (ambienteCards.length > 0) {
        ambienteCards.forEach((card) => {
          const flow = card.dataset.flow || 'left';
          const xOffset = flow === 'left' ? -70 : 70;

          gsap.fromTo(
            card,
            { x: xOffset, y: 35, opacity: 0, filter: 'blur(10px)' },
            {
              x: 0,
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                once: true
              }
            }
          );
        });
      }

      // 3.5 SEÇÃO DE TRANSFORMAÇÃO NARRATIVA SCROLL-DRIVEN (LINHAS & FORMAS EDITORIAL)
      const transformStory = document.querySelector('.transform-story');
      if (transformStory) {
        const canvas = transformStory.querySelector('.transform-canvas');
        const timeVal = transformStory.querySelector('.geo-meta-time .time-val');
        const counterCur = transformStory.querySelector('.geo-meta-counter .counter-cur');

        // Momentos editoriais
        const intro = transformStory.querySelector('.geo-intro');
        const m1 = transformStory.querySelector('.geo-m1');
        const m2 = transformStory.querySelector('.geo-m2');
        const m3 = transformStory.querySelector('.geo-m3');
        const m4 = transformStory.querySelector('.geo-m4');
        const mFinal = transformStory.querySelector('.geo-final');

        // Grupos SVG & Linhas de Chamada
        const svgM1 = transformStory.querySelector('.geo-svg-m1');
        const svgM2 = transformStory.querySelector('.geo-svg-m2');
        const svgM3 = transformStory.querySelector('.geo-svg-m3');
        const svgM4 = transformStory.querySelector('.geo-svg-m4');

        const lineM1 = transformStory.querySelector('.geo-line-m1');
        const lineM2 = transformStory.querySelector('.geo-line-m2');
        const lineM3 = transformStory.querySelector('.geo-line-m3');
        const lineM4 = transformStory.querySelector('.geo-line-m4');

        // Inicializa animação de traçado vetorial (stroke-dash)
        [lineM1, lineM2, lineM3, lineM4].forEach((line) => {
          if (line && line.getTotalLength) {
            const len = Math.ceil(line.getTotalLength());
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
          }
        });

        // Configuração inicial limpa (sem interferência visual antes da hora)
        gsap.set(intro, { opacity: 1, y: 0 });
        gsap.set([m1, m2, m3, m4, mFinal], { opacity: 0, pointerEvents: 'none' });
        gsap.set([svgM1, svgM2, svgM3, svgM4], { opacity: 0 });
        gsap.set(m1, { y: 12, opacity: 0 });
        gsap.set(m2, { y: 12, opacity: 0 });
        gsap.set(m3, { y: 12, opacity: 0 });
        gsap.set(m4, { y: 12, opacity: 0 });
        gsap.set(mFinal, { y: 20, opacity: 0 });

        // Canvas Frame Sequence Engine (120 frames a 60fps instantâneo sem lag)
        const totalFrames = 120;
        const frames = new Array(totalFrames);
        let currentFrameIndex = 0;
        const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;

        function renderCanvasFrame(index) {
          if (!canvas || !ctx) return;
          currentFrameIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(index)));
          const img = frames[currentFrameIndex];
          if (img && img.complete && img.naturalWidth > 0) {
            drawCoverImage(img);
          } else {
            for (let d = 1; d < 30; d++) {
              const p = frames[currentFrameIndex - d];
              if (p && p.complete && p.naturalWidth > 0) { drawCoverImage(p); return; }
              const n = frames[currentFrameIndex + d];
              if (n && n.complete && n.naturalWidth > 0) { drawCoverImage(n); return; }
            }
          }
        }

        function drawCoverImage(img) {
          const cw = canvas.width;
          const ch = canvas.height;
          const iw = img.naturalWidth || 1280;
          const ih = img.naturalHeight || 720;
          const scale = Math.max(cw / iw, ch / ih);
          const nw = iw * scale;
          const nh = ih * scale;
          const ox = (cw - nw) / 2;
          const oy = (ch - nh) / 2;
          ctx.drawImage(img, ox, oy, nw, nh);
        }

        function resizeTransformCanvas() {
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = Math.round((rect.width || window.innerWidth) * dpr);
          const h = Math.round((rect.height || window.innerHeight) * dpr);
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            renderCanvasFrame(currentFrameIndex);
          }
        }

        if (canvas) {
          resizeTransformCanvas();
          window.addEventListener('resize', resizeTransformCanvas, { passive: true });

          const firstImg = new Image();
          firstImg.src = 'assets/frames/frame_0001.jpg';
          firstImg.onload = () => {
            frames[0] = firstImg;
            renderCanvasFrame(0);
          };

          for (let i = 0; i < totalFrames; i++) {
            if (i === 0) continue;
            const img = new Image();
            const num = String(i + 1).padStart(4, '0');
            img.src = `assets/frames/frame_${num}.jpg`;
            frames[i] = img;
          }
        }

        const transformTl = gsap.timeline({
          scrollTrigger: {
            trigger: transformStory,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const target = p * (totalFrames - 1);
              renderCanvasFrame(target);

              // Atualiza metadados dinâmicos de tempo e contador
              if (timeVal && counterCur) {
                if (p < 0.14) {
                  timeVal.textContent = '00s';
                  counterCur.textContent = '01';
                } else if (p < 0.35) {
                  timeVal.textContent = '02s';
                  counterCur.textContent = '02';
                } else if (p < 0.57) {
                  timeVal.textContent = '04s';
                  counterCur.textContent = '03';
                } else if (p < 0.77) {
                  timeVal.textContent = '06s';
                  counterCur.textContent = '03';
                } else if (p < 0.89) {
                  timeVal.textContent = '08s';
                  counterCur.textContent = '04';
                } else {
                  timeVal.textContent = '10s';
                  counterCur.textContent = '04';
                }
              }
            }
          }
        });

        // 0.00 -> 0.12: Intro
        transformTl.to(intro, { opacity: 0, y: -18, duration: 0.12, ease: 'power2.in', pointerEvents: 'none' }, 0.02);

        // 0.14 -> 0.34: Momento 01 (FORMAS - Parede Curva)
        transformTl.to(svgM1, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.14);
        if (lineM1) transformTl.to(lineM1, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.14);
        transformTl.to(m1, { opacity: 1, y: 0, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.16);
        transformTl.to([svgM1, m1], { opacity: 0, duration: 0.06, ease: 'power2.in', pointerEvents: 'none' }, 0.32);

        // 0.36 -> 0.56: Momento 02 (DETALHES - Ripado)
        transformTl.to(svgM2, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.36);
        if (lineM2) transformTl.to(lineM2, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.36);
        transformTl.to(m2, { opacity: 1, y: 0, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.38);
        transformTl.to([svgM2, m2], { opacity: 0, duration: 0.06, ease: 'power2.in', pointerEvents: 'none' }, 0.54);

        // 0.58 -> 0.76: Momento 03 (MATÉRIA - Marcenaria c/ Recorte)
        transformTl.to(svgM3, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.58);
        if (lineM3) transformTl.to(lineM3, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.58);
        transformTl.to(m3, { opacity: 1, y: 0, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.60);
        transformTl.to([svgM3, m3], { opacity: 0, duration: 0.06, ease: 'power2.in', pointerEvents: 'none' }, 0.74);

        // 0.77 -> 0.89: Momento 04 (CONEXÕES / ESPAÇO - Curvatura do Piso)
        transformTl.to(svgM4, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.77);
        if (lineM4) transformTl.to(lineM4, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.77);
        transformTl.to(m4, { opacity: 1, y: 0, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.79);
        transformTl.to([svgM4, m4], { opacity: 0, duration: 0.05, ease: 'power2.in', pointerEvents: 'none' }, 0.88);

        // 0.89 -> 1.00: Momento 05 Final (Linhas & Formas — Projetos que se vivem)
        transformTl.to(mFinal, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out', pointerEvents: 'auto' }, 0.90);
      }

      // 4. NARRATIVA SCROLL-DRIVEN DA SEÇÃO DE PROCESSO (ACOMPANHAMENTO DE PONTA A PONTA)
      const processStory = document.querySelector('.process-story');
      if (processStory) {
        const mediaFrame = processStory.querySelector('.process-media-frame');
        const mediaImg = processStory.querySelector('.process-media-frame img');
        const mediaScrim = processStory.querySelector('.process-media-scrim');
        const hint = processStory.querySelector('.process-hint');
        const kicker = processStory.querySelector('.process-narrative .kicker');
        const title = processStory.querySelector('.process-title');
        const accentLine = processStory.querySelector('.process-accent-line');
        const desc = processStory.querySelector('.process-desc');
        const actions = processStory.querySelector('.process-actions');
        const stepNodes = processStory.querySelectorAll('.process-step-node');
        const connectorFill = processStory.querySelector('.connector-path-fill');
        const microBadge = processStory.querySelector('.process-micro-badge');

        if (connectorFill) {
          const pathLength = connectorFill.getTotalLength ? connectorFill.getTotalLength() : 350;
          gsap.set(connectorFill, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        }

        // Configuração inicial limpa
        gsap.set(hint, { opacity: 1, y: 0 });
        gsap.set([kicker, title, desc, actions, microBadge], { opacity: 0, y: 24 });
        gsap.set(accentLine, { scaleX: 0, transformOrigin: 'left center', opacity: 0 });
        gsap.set(stepNodes, { opacity: 0, x: 28 });

        const processTl = gsap.timeline({
          scrollTrigger: {
            trigger: processStory,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        // 0.00 -> 0.14: Hint inicial desaparece suavemente
        processTl.to(hint, { opacity: 0, y: -10, duration: 0.14, ease: 'power2.out' }, 0);

        // 0.04 -> 0.82: Moldura expande organicamente (42vw -> 94vw, 50vh -> 88vh)
        processTl.fromTo(mediaFrame,
          { width: '42vw', height: '50vh', borderRadius: '20px' },
          { width: '94vw', height: '88vh', borderRadius: '28px', ease: 'power1.inOut', duration: 0.80 },
          0.04
        );

        // 0.04 -> 0.82: Zoom out suave na foto interna
        processTl.fromTo(mediaImg,
          { scale: 1.14 },
          { scale: 1.0, ease: 'power1.inOut', duration: 0.80 },
          0.04
        );

        // 0.15 -> 0.65: Scrim escurecedor acentua para proteger contraste do texto
        processTl.fromTo(mediaScrim,
          { opacity: 0.55 },
          { opacity: 0.90, ease: 'power1.out', duration: 0.50 },
          0.15
        );

        // 0.20 -> 0.45: Kicker surge
        processTl.to(kicker, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.20);

        // 0.26 -> 0.55: Título editorial principal entra
        processTl.to(title, { opacity: 1, y: 0, duration: 0.30, ease: 'power2.out' }, 0.26);

        // 0.34 -> 0.58: Linha de destaque se desenha
        processTl.to(accentLine, { opacity: 0.85, scaleX: 1, duration: 0.24, ease: 'power2.out' }, 0.34);

        // 0.38 -> 0.66: Descrição narrativa surge
        processTl.to(desc, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, 0.38);

        // 0.48 -> 0.76: CTA de projetos aparece
        processTl.to(actions, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, 0.48);

        // 0.32 -> 0.84: 4 Passos lineares entram em cascata com a linha conectora
        if (stepNodes.length >= 4) {
          processTl.to(stepNodes[0], { opacity: 1, x: 0, duration: 0.16, ease: 'power2.out' }, 0.32);
          processTl.to(stepNodes[1], { opacity: 1, x: 0, duration: 0.16, ease: 'power2.out' }, 0.48);
          processTl.to(stepNodes[2], { opacity: 1, x: 0, duration: 0.16, ease: 'power2.out' }, 0.64);
          processTl.to(stepNodes[3], { opacity: 1, x: 0, duration: 0.16, ease: 'power2.out' }, 0.78);
        }

        // Desenho da linha SVG conectando os 4 pontos
        if (connectorFill) {
          processTl.to(connectorFill, { strokeDashoffset: 0, duration: 0.54, ease: 'none' }, 0.32);
        }

        // 0.68 -> 0.90: Micro-badge no canto inferior direito
        processTl.to(microBadge, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.68);
      }

      // 5. Parallax Sutil em Mídia Imersiva do Case Study
      const canvasFullImg = document.querySelector('.block-media[data-width="full"] img, .full-image img');
      if (canvasFullImg) {
        gsap.fromTo(
          canvasFullImg,
          { scale: 1.05 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: canvasFullImg.closest('.editorial-block, .full-image'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      }

      // 6. Ritmo Editorial no Grid do Portfólio (projetos.html)
      const portCards = document.querySelectorAll('.portfolio-grid .p-card');
      if (portCards.length > 0) {
        portCards.forEach((card) => {
          const isTall = card.classList.contains('tall');
          const isWide = card.classList.contains('wide');
          const yDist = isTall ? 36 : isWide ? 20 : 28;

          gsap.fromTo(
            card,
            { y: yDist, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                once: true
              }
            }
          );
        });
      }

      // 7. Revelação Suave das Linhas Internas Arquitetônicas (1px Puro & Nítido)
      const innerFrames = document.querySelectorAll('.ambiente-card .inner-frame, .p-card .inner-frame, .media-frame .inner-frame, .block-next-card .inner-frame');
      if (innerFrames.length > 0) {
        innerFrames.forEach((frame) => {
          const parentBlock = frame.closest('.ambiente-card, .p-card, .media-frame, .block-next-card, .editorial-block') || frame;
          gsap.fromTo(
            frame,
            { opacity: 0, scale: 0.99 },
            {
              opacity: 0.85,
              scale: 1,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: parentBlock,
                start: 'top 84%',
                once: true
              }
            }
          );
        });
      }

      // 7. Revelação dos Blocos Modulares do Canvas Editorial (projeto-01.html)
      const editorialBlocks = document.querySelectorAll('.editorial-block');
      if (editorialBlocks.length > 0) {
        editorialBlocks.forEach((block) => {
          const blockType = block.dataset.blockType;
          
          if (blockType === 'grid') {
            const frames = block.querySelectorAll('.media-frame');
            if (frames.length > 0) {
              gsap.fromTo(
                frames,
                { y: 32, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.85,
                  stagger: 0.15,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: block,
                    start: 'top 82%',
                    once: true
                  }
                }
              );
            }
          } else if (blockType === 'media-text') {
            const mediaCol = block.querySelector('.media-col');
            const textCol = block.querySelector('.text-col');
            if (mediaCol && textCol) {
              gsap.fromTo(
                [mediaCol, textCol],
                { y: 28, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.12,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: block,
                    start: 'top 82%',
                    once: true
                  }
                }
              );
            }
          } else {
            gsap.fromTo(
              block,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: block,
                  start: 'top 84%',
                  once: true
                }
              }
            );
          }
        });
      }

      // 8. BLUEPRINT ARQUITETÔNICO NO FOOTER (TRAÇADO VETORIAL NO SCROLL)
      const footerArchitectural = document.querySelector('.footer-architectural');
      if (footerArchitectural) {
        const bpLines = footerArchitectural.querySelectorAll('.bp-line');
        bpLines.forEach((line) => {
          if (line.getTotalLength) {
            const length = Math.ceil(line.getTotalLength());
            gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          }
        });

        gsap.to(bpLines, {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.035,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerArchitectural,
            start: 'top 85%',
            once: true
          }
        });
      }
    });

    // ========================================================================
    // MOBILE MOTION (SIMPLES, RÁPIDO, BATERIA & LEITURA FIRST)
    // ========================================================================
    mm.add('(max-width: 800px)', () => {
      if (isReducedMotion) return;

      const heroTexts = document.querySelectorAll('.hero-content > *, .project-hero-copy > *');
      if (heroTexts.length > 0) {
        gsap.fromTo(
          heroTexts,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out'
          }
        );
      }

      // Transform Story Mobile Scroll (Linhas & Formas Editorial)
      const transformStoryMob = document.querySelector('.transform-story');
      if (transformStoryMob) {
        const canvasMob = transformStoryMob.querySelector('.transform-canvas');
        const timeValMob = transformStoryMob.querySelector('.geo-meta-time .time-val');
        const counterCurMob = transformStoryMob.querySelector('.geo-meta-counter .counter-cur');

        const introMob = transformStoryMob.querySelector('.geo-intro');
        const m1Mob = transformStoryMob.querySelector('.geo-m1');
        const m2Mob = transformStoryMob.querySelector('.geo-m2');
        const m3Mob = transformStoryMob.querySelector('.geo-m3');
        const m4Mob = transformStoryMob.querySelector('.geo-m4');
        const mFinalMob = transformStoryMob.querySelector('.geo-final');

        const svgM1Mob = transformStoryMob.querySelector('.geo-svg-m1');
        const svgM2Mob = transformStoryMob.querySelector('.geo-svg-m2');
        const svgM3Mob = transformStoryMob.querySelector('.geo-svg-m3');
        const svgM4Mob = transformStoryMob.querySelector('.geo-svg-m4');

        const lineM1Mob = transformStoryMob.querySelector('.geo-line-m1');
        const lineM2Mob = transformStoryMob.querySelector('.geo-line-m2');
        const lineM3Mob = transformStoryMob.querySelector('.geo-line-m3');
        const lineM4Mob = transformStoryMob.querySelector('.geo-line-m4');

        [lineM1Mob, lineM2Mob, lineM3Mob, lineM4Mob].forEach((line) => {
          if (line && line.getTotalLength) {
            const len = Math.ceil(line.getTotalLength());
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
          }
        });

        gsap.set(introMob, { opacity: 1, y: 0 });
        gsap.set([m1Mob, m2Mob, m3Mob, m4Mob, mFinalMob], { opacity: 0, pointerEvents: 'none' });
        gsap.set([svgM1Mob, svgM2Mob, svgM3Mob, svgM4Mob], { opacity: 0 });

        const totalFramesMob = 120;
        const framesMob = new Array(totalFramesMob);
        let currentFrameIndexMob = 0;
        const ctxMob = canvasMob ? canvasMob.getContext('2d', { alpha: false }) : null;

        function renderMobFrame(index) {
          if (!canvasMob || !ctxMob) return;
          currentFrameIndexMob = Math.max(0, Math.min(totalFramesMob - 1, Math.round(index)));
          const img = framesMob[currentFrameIndexMob];
          if (img && img.complete && img.naturalWidth > 0) {
            drawCoverImageMob(img);
          } else {
            for (let d = 1; d < 30; d++) {
              const p = framesMob[currentFrameIndexMob - d];
              if (p && p.complete && p.naturalWidth > 0) { drawCoverImageMob(p); return; }
              const n = framesMob[currentFrameIndexMob + d];
              if (n && n.complete && n.naturalWidth > 0) { drawCoverImageMob(n); return; }
            }
          }
        }

        function drawCoverImageMob(img) {
          const cw = canvasMob.width;
          const ch = canvasMob.height;
          const iw = img.naturalWidth || 1280;
          const ih = img.naturalHeight || 720;
          const scale = Math.max(cw / iw, ch / ih);
          const nw = iw * scale;
          const nh = ih * scale;
          const ox = (cw - nw) / 2;
          const oy = (ch - nh) / 2;
          ctxMob.drawImage(img, ox, oy, nw, nh);
        }

        function resizeMobCanvas() {
          if (!canvasMob) return;
          const rect = canvasMob.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = Math.round((rect.width || window.innerWidth) * dpr);
          const h = Math.round((rect.height || window.innerHeight) * dpr);
          if (canvasMob.width !== w || canvasMob.height !== h) {
            canvasMob.width = w;
            canvasMob.height = h;
            renderMobFrame(currentFrameIndexMob);
          }
        }

        if (canvasMob) {
          resizeMobCanvas();
          window.addEventListener('resize', resizeMobCanvas, { passive: true });

          const firstImg = new Image();
          firstImg.src = 'assets/frames/frame_0001.jpg';
          firstImg.onload = () => {
            framesMob[0] = firstImg;
            renderMobFrame(0);
          };

          for (let i = 0; i < totalFramesMob; i++) {
            if (i === 0) continue;
            const img = new Image();
            const num = String(i + 1).padStart(4, '0');
            img.src = `assets/frames/frame_${num}.jpg`;
            framesMob[i] = img;
          }
        }

        const mobTransformTl = gsap.timeline({
          scrollTrigger: {
            trigger: transformStoryMob,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const target = p * (totalFramesMob - 1);
              renderMobFrame(target);

              if (timeValMob && counterCurMob) {
                if (p < 0.14) {
                  timeValMob.textContent = '00s';
                  counterCurMob.textContent = '01';
                } else if (p < 0.35) {
                  timeValMob.textContent = '02s';
                  counterCurMob.textContent = '02';
                } else if (p < 0.57) {
                  timeValMob.textContent = '04s';
                  counterCurMob.textContent = '03';
                } else if (p < 0.77) {
                  timeValMob.textContent = '06s';
                  counterCurMob.textContent = '03';
                } else if (p < 0.89) {
                  timeValMob.textContent = '08s';
                  counterCurMob.textContent = '04';
                } else {
                  timeValMob.textContent = '10s';
                  counterCurMob.textContent = '04';
                }
              }
            }
          }
        });

        // 0.00 -> 0.12: Intro
        mobTransformTl.to(introMob, { opacity: 0, duration: 0.12, ease: 'power2.in', pointerEvents: 'none' }, 0.02);

        // 0.14 -> 0.34: Momento 01 (FORMAS)
        mobTransformTl.to(svgM1Mob, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.14);
        if (lineM1Mob) mobTransformTl.to(lineM1Mob, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.14);
        mobTransformTl.to(m1Mob, { opacity: 1, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.15);
        mobTransformTl.to([svgM1Mob, m1Mob], { opacity: 0, duration: 0.06, ease: 'power2.in', pointerEvents: 'none' }, 0.32);

        // 0.36 -> 0.56: Momento 02 (DETALHES)
        mobTransformTl.to(svgM2Mob, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.36);
        if (lineM2Mob) mobTransformTl.to(lineM2Mob, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.36);
        mobTransformTl.to(m2Mob, { opacity: 1, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.37);
        mobTransformTl.to([svgM2Mob, m2Mob], { opacity: 0, duration: 0.06, ease: 'power2.in', pointerEvents: 'none' }, 0.54);

        // 0.58 -> 0.76: Momento 03 (MATÉRIA)
        mobTransformTl.to(svgM3Mob, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.58);
        if (lineM3Mob) mobTransformTl.to(lineM3Mob, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.58);
        mobTransformTl.to(m3Mob, { opacity: 1, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.59);
        mobTransformTl.to([svgM3Mob, m3Mob], { opacity: 0, duration: 0.06, ease: 'power2.in', pointerEvents: 'none' }, 0.74);

        // 0.77 -> 0.89: Momento 04 (CONEXÕES)
        mobTransformTl.to(svgM4Mob, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.77);
        if (lineM4Mob) mobTransformTl.to(lineM4Mob, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' }, 0.77);
        mobTransformTl.to(m4Mob, { opacity: 1, duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' }, 0.78);
        mobTransformTl.to([svgM4Mob, m4Mob], { opacity: 0, duration: 0.05, ease: 'power2.in', pointerEvents: 'none' }, 0.88);

        // 0.89 -> 1.00: Momento 05 Final
        mobTransformTl.to(mFinalMob, { opacity: 1, duration: 0.10, ease: 'power2.out', pointerEvents: 'auto' }, 0.89);
      }

      // Process Story Mobile Scroll
      const processStoryMob = document.querySelector('.process-story');
      if (processStoryMob) {
        const mediaFrameMob = processStoryMob.querySelector('.process-media-frame');
        const hintMob = processStoryMob.querySelector('.process-hint');
        const narrativeItemsMob = processStoryMob.querySelectorAll('.process-narrative > *');
        const stepNodesMob = processStoryMob.querySelectorAll('.process-step-node');
        const connectorFillMob = processStoryMob.querySelector('.connector-path-fill');

        if (connectorFillMob) {
          const pathLen = connectorFillMob.getTotalLength ? connectorFillMob.getTotalLength() : 350;
          gsap.set(connectorFillMob, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
        }

        gsap.set(stepNodesMob, { opacity: 0, x: 16 });
        gsap.set(narrativeItemsMob, { opacity: 0, y: 14 });

        const mobTl = gsap.timeline({
          scrollTrigger: {
            trigger: processStoryMob,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 1.0,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        mobTl.to(hintMob, { opacity: 0, duration: 0.12, ease: 'power2.out' }, 0);
        mobTl.fromTo(mediaFrameMob,
          { width: '68vw', height: '38vh', borderRadius: '16px' },
          { width: '94vw', height: '92vh', borderRadius: '22px', duration: 0.80, ease: 'power1.inOut' },
          0.04
        );
        mobTl.to(narrativeItemsMob,
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.40, ease: 'power2.out' },
          0.20
        );
        mobTl.to(stepNodesMob,
          { opacity: 1, x: 0, stagger: 0.12, duration: 0.45, ease: 'power2.out' },
          0.35
        );
        if (connectorFillMob) {
          mobTl.to(connectorFillMob, { strokeDashoffset: 0, duration: 0.50, ease: 'none' }, 0.35);
        }
      }

      // Blueprint Footer Mobile
      const footerArchitecturalMob = document.querySelector('.footer-architectural');
      if (footerArchitecturalMob) {
        const bpLinesMob = footerArchitecturalMob.querySelectorAll('.bp-line');
        bpLinesMob.forEach((line) => {
          if (line.getTotalLength) {
            const length = Math.ceil(line.getTotalLength());
            gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          }
        });

        gsap.to(bpLinesMob, {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerArchitecturalMob,
            start: 'top 85%',
            once: true
          }
        });
      }
    });

    // ========================================================================
    // ENTRADA DOS ELEMENTOS .REVEAL (GERAL)
    // ========================================================================
    if (!isReducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => {
        // Evita duplicar elementos já tratados em timelines específicas
        if (el.closest('.portfolio-grid') || el.closest('.story-grid')) return;

        gsap.fromTo(
          el,
          { y: isDesktop ? 24 : 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: isDesktop ? 0.75 : 0.55,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true
            }
          }
        );
      });
    } else {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }

    // ========================================================================
    // 05. FILTRO DINÂMICO DE PROJETOS & NAVEGAÇÃO POR CATEGORIA (HOME -> PROJETOS)
    // ========================================================================
    const filterButtons = document.querySelectorAll('.filter-idx');
    const projectCards = document.querySelectorAll('.portfolio-grid .p-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
      const normalizeCat = (cat) => {
        if (!cat) return 'all';
        const c = cat.toLowerCase().trim();
        if (c === 'cozinha' || c === 'cozinhas') return 'cozinha';
        if (c === 'quarto' || c === 'quartos' || c === 'dormitorio' || c === 'dormitorios') return 'quarto';
        if (c === 'closet' || c === 'closets') return 'closet';
        if (c === 'sala' || c === 'salas') return 'sala';
        if (c === 'escritorio' || c === 'escritorios' || c === 'comercial') return 'escritorio';
        return c;
      };

      const filterProjects = (targetCat, animate = true) => {
        const normalized = normalizeCat(targetCat);

        filterButtons.forEach((btn) => {
          const btnCat = normalizeCat(btn.getAttribute('data-filter'));
          const isActive = btnCat === normalized || (normalized === 'all' && btnCat === 'all');
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        const matchingCards = [];
        const nonMatchingCards = [];

        projectCards.forEach((card) => {
          const cardCat = normalizeCat(card.getAttribute('data-cat'));
          if (normalized === 'all' || cardCat === normalized) {
            matchingCards.push(card);
          } else {
            nonMatchingCards.push(card);
          }
        });

        if (typeof gsap !== 'undefined' && !isReducedMotion && animate) {
          if (nonMatchingCards.length > 0) {
            gsap.to(nonMatchingCards, {
              opacity: 0,
              scale: 0.96,
              duration: 0.25,
              ease: 'power2.in',
              onComplete: () => {
                nonMatchingCards.forEach((card) => (card.style.display = 'none'));
                matchingCards.forEach((card) => (card.style.display = 'flex'));
                gsap.fromTo(
                  matchingCards,
                  { opacity: 0, scale: 0.96, y: 16 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
                );
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
              }
            });
          } else {
            matchingCards.forEach((card) => (card.style.display = 'flex'));
            gsap.fromTo(
              matchingCards,
              { opacity: 0, scale: 0.96, y: 16 },
              { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
            );
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          }
        } else {
          nonMatchingCards.forEach((card) => (card.style.display = 'none'));
          matchingCards.forEach((card) => {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'none';
          });
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }
      };

      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const filterVal = btn.getAttribute('data-filter');
          filterProjects(filterVal, true);
        });
      });

      // Checa parâmetro de URL (ex: ?cat=cozinha) ou hash (ex: #cozinhas)
      const urlParams = new URLSearchParams(window.location.search);
      const initialCat = urlParams.get('cat') || urlParams.get('filtro') || (window.location.hash ? window.location.hash.replace('#', '') : null);

      if (initialCat) {
        const normalizedInitial = normalizeCat(initialCat);
        if (normalizedInitial && normalizedInitial !== 'all') {
          filterProjects(normalizedInitial, false);

          // Scroll suave até o grid de projetos (com compensação de altura do header fixo)
          const projectsSection = document.getElementById('projetos');
          if (projectsSection) {
            setTimeout(() => {
              const headerOffset = 84;
              const elemPos = projectsSection.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: Math.max(0, elemPos - headerOffset),
                behavior: 'smooth'
              });
            }, 350);
          }
        }
      }
    }

    // Debounced Refresh do ScrollTrigger
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });

    // ========================================================================
    // 06. MODAL LIGHTBOX INTERATIVO DE PROJETOS (FULL GALLERY)
    // ========================================================================
    const projectModal = document.getElementById('projectModal');
    if (projectModal && typeof PROJECTS_DATA !== 'undefined') {
      const modalBackdrop = document.getElementById('modalBackdrop');
      const modalCloseBtn = document.getElementById('modalCloseBtn');
      const modalMainImg = document.getElementById('modalMainImg');
      const modalCategoryBadge = document.getElementById('modalCategoryBadge');
      const modalLocation = document.getElementById('modalLocation');
      const modalArea = document.getElementById('modalArea');
      const modalYear = document.getElementById('modalYear');
      const modalTitle = document.getElementById('modalTitle');
      const modalDesc = document.getElementById('modalDesc');
      const modalHighlights = document.getElementById('modalHighlights');
      const modalWaBtn = document.getElementById('modalWaBtn');
      const modalThumbs = document.getElementById('modalThumbs');
      const modalPrevBtn = document.getElementById('modalPrevBtn');
      const modalNextBtn = document.getElementById('modalNextBtn');
      const modalCounter = document.getElementById('modalCounter');

      let currentProjectIndex = 0;

      const renderProjectModal = (index) => {
        if (index < 0) index = PROJECTS_DATA.length - 1;
        if (index >= PROJECTS_DATA.length) index = 0;
        currentProjectIndex = index;

        const proj = PROJECTS_DATA[index];
        if (!proj) return;

        modalMainImg.src = proj.coverImage;
        modalMainImg.alt = proj.title;
        modalCategoryBadge.textContent = proj.categoryLabel || proj.category;
        modalLocation.textContent = proj.location || 'Itabuna — BA';
        modalArea.textContent = proj.area || '';
        modalYear.textContent = proj.year || '2026';
        modalTitle.textContent = proj.title;
        modalDesc.textContent = proj.description;

        // Highlights list
        modalHighlights.innerHTML = '';
        if (proj.highlights && proj.highlights.length > 0) {
          proj.highlights.forEach((h) => {
            const li = document.createElement('li');
            li.textContent = h;
            modalHighlights.appendChild(li);
          });
        }

        // WhatsApp button link pre-filled
        const waText = encodeURIComponent(`Olá! Vi o projeto "${proj.title}" no site da Linhas & Formas e gostaria de solicitar um orçamento similar.`);
        modalWaBtn.href = `https://wa.me/5573988541250?text=${waText}`;

        // Thumbnails
        modalThumbs.innerHTML = '';
        const galleryImages = proj.gallery && proj.gallery.length > 0 ? proj.gallery : [{ src: proj.coverImage, title: proj.title }];
        
        if (galleryImages.length > 1) {
          modalThumbs.style.display = 'flex';
          galleryImages.forEach((imgObj, i) => {
            const thumb = document.createElement('button');
            thumb.className = `modal-thumb ${i === 0 ? 'active' : ''}`;
            thumb.setAttribute('aria-label', `Ver foto ${i + 1}: ${imgObj.title || proj.title}`);
            thumb.innerHTML = `<img src="${imgObj.src}" alt="${imgObj.title || proj.title}" loading="lazy">`;
            thumb.addEventListener('click', () => {
              modalMainImg.src = imgObj.src;
              modalThumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
              thumb.classList.add('active');
            });
            modalThumbs.appendChild(thumb);
          });
        } else {
          modalThumbs.style.display = 'none';
        }

        modalCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(PROJECTS_DATA.length).padStart(2, '0')}`;
      };

      const openModal = (projectId) => {
        const foundIndex = PROJECTS_DATA.findIndex(p => p.id === projectId || p.slug === projectId);
        renderProjectModal(foundIndex !== -1 ? foundIndex : 0);
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };

      const closeModal = () => {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      // Card triggers
      document.querySelectorAll('.portfolio-grid .p-card').forEach((card) => {
        const pId = card.getAttribute('data-project-id');
        card.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(pId);
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(pId);
          }
        });
      });

      if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
      if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

      if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => renderProjectModal(currentProjectIndex - 1));
      }
      if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => renderProjectModal(currentProjectIndex + 1));
      }

      window.addEventListener('keydown', (e) => {
        if (!projectModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') renderProjectModal(currentProjectIndex - 1);
        if (e.key === 'ArrowRight') renderProjectModal(currentProjectIndex + 1);
      });
    }
  }
});



