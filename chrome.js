// Shared site chrome: nav + footer + small interactions.
// Call SiteChrome.init({ active: 'home' | 'solutions' | 'pricing' }) on page load.

// ── ANALYTICS ─────────────────────────────────────────────────────────────
// Active GA4 Measurement ID: G-0D679KWTZ2 (VolaPos property, June 2026).
// Get yours at: https://analytics.google.com → Admin → Data Streams → Web
// ──────────────────────────────────────────────────────────────────────────
(function initAnalytics(){
  const GA_ID = 'G-0D679KWTZ2'; // VolaPos GA4 property
  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return; // stub guard — inactive until real ID set

  // Inject GA4 script
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: true });

  // Track chatbot form submission
  document.addEventListener('volapos:lead_submitted', function(e){
    gtag('event', 'lead_submitted', {
      event_category: 'Chatbot',
      event_label: e.detail && e.detail.venue ? e.detail.venue : 'unknown',
    });
  });
})();

(function(){
  const NAV_LINKS = [
    { id:'home',      label:'Home',      href:'index.html' },
    { id:'solutions', label:'Solutions', href:'solutions.html' },
    { id:'volavoice', label:'VolaVoice', href:'volavoice.html' },
    { id:'pricing',   label:'Pricing',   href:'pricing.html' },
    { id:'contact',   label:'Contact',   href:'contact.html' },
  ];

  function el(html){
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function buildNav(active){
    const links = NAV_LINKS.map(l =>
      `<li><a href="${l.href}" class="${l.id===active?'active':''}">${l.label}</a></li>`
    ).join('');
    return `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand">
          <span class="brand-mark">
            <img src="assets/volapos-icon-light.png" alt="VolaPos"/>
          </span>
          <span class="brand-name"><span class="vola">Vola</span><span class="pos">Pos</span></span>
          <span class="brand-tag mono">Hospitality OS</span>
        </a>
        <ul class="nav-links">${links}</ul>
        <div class="nav-cta">
          <a href="chatbot.html" class="btn btn-primary">
            Get started
            <span class="arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </a>
        </div>
        <button class="nav-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>`;
  }

  function buildFooter(){
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <a href="index.html" class="brand">
              <span class="brand-mark">
                <img src="assets/volapos-icon-light.png" alt="VolaPos"/>
              </span>
              <span class="brand-name"><span class="vola">Vola</span><span class="pos">Pos</span></span>
            </a>
            <p>The hospitality operating system — point of sale, payments, online ordering and kiosk in one platform, built for UK restaurants, takeaways, cafés and bars.</p>
          </div>
          <div class="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="solutions.html">VolaPos Desktop</a></li>
              <li><a href="solutions.html">VolaPos Online</a></li>
              <li><a href="solutions.html">Online Ordering</a></li>
              <li><a href="solutions.html">Self-Service Kiosks</a></li>
              <li><a href="solutions.html">Kitchen Display</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="index.html">About</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="chatbot.html">Book a demo</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Status</h4>
            <ul>
              <li><span style="display:inline-flex;align-items:center;gap:8px;color:var(--muted);font-size:0.92rem"><span style="display:inline-block;width:8px;height:8px;background:#1F8B5C;border-radius:50%;"></span>All systems operational</span></li>
              <li><span style="color:var(--muted);font-size:0.92rem">Uptime · 99.99%</span></li>
              <li><span style="color:var(--muted);font-size:0.92rem">UK-based support</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© 2026 Volapos Ltd · All rights reserved</div>
          <div style="display:flex;gap:20px;align-items:center;justify-content:flex-end">
            <a href="terms.html" style="color:var(--muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s" onmouseover="this.style.color='var(--teal)'" onmouseout="this.style.color='var(--muted)'">Terms and Conditions</a>
            <span style="color:var(--line)">·</span>
            <a href="privacy.html" style="color:var(--muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s" onmouseover="this.style.color='var(--teal)'" onmouseout="this.style.color='var(--muted)'">Privacy Notice</a>
            <span style="color:var(--line)">·</span>
            <span style="font-size:0.85rem;color:var(--muted)">Built in the UK for Businesses</span>
          </div>
        </div>
      </div>
    </footer>`;
  }

  function liveClock(){
    const elTime = document.querySelector('[data-live-time]');
    if(!elTime) return;
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2,'0');
      const mm = String(d.getMinutes()).padStart(2,'0');
      const ss = String(d.getSeconds()).padStart(2,'0');
      return `${hh}:${mm}:${ss} UTC`;
    };
    elTime.textContent = fmt();
    setInterval(()=> elTime.textContent = fmt(), 1000);
  }

  function faqToggle(){
    document.querySelectorAll('.faq-q').forEach(q => {
      // Set cursor style to indicate clickability
      q.style.cursor = 'pointer';
      
      q.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const parent = q.parentElement;
        if (parent) {
          // Close all other open FAQ items (optional, for accordion behavior)
          // document.querySelectorAll('.faq-item.open').forEach(item => {
          //   if (item !== parent) item.classList.remove('open');
          // });
          
          parent.classList.toggle('open');
        }
      });
      
      // Make it keyboard accessible
      q.setAttribute('role', 'button');
      q.setAttribute('tabindex', '0');
      q.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const parent = q.parentElement;
          if (parent) parent.classList.toggle('open');
        }
      });
    });
  }

  function mobileMenuToggle(){
    // Delay slightly to ensure DOM is fully ready
    setTimeout(() => {
      const toggle = document.querySelector('.nav-toggle');
      const nav = document.querySelector('.nav');
      const navLinks = document.querySelector('.nav-links');
      const navCta = document.querySelector('.nav-cta');
      
      if(!toggle || !nav) return;
      
      // Toggle button click handler
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = toggle.classList.contains('active');
        
        if (isOpen) {
          toggle.classList.remove('active');
          nav.classList.remove('menu-open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          toggle.classList.add('active');
          nav.classList.add('menu-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
      
      // Close menu when a link is clicked
      if (navLinks) {
        navLinks.addEventListener('click', (e) => {
          if (e.target.tagName === 'A') {
            toggle.classList.remove('active');
            nav.classList.remove('menu-open');
          }
        });
      }
      
      if (navCta) {
        navCta.addEventListener('click', (e) => {
          if (e.target.tagName === 'A') {
            toggle.classList.remove('active');
            nav.classList.remove('menu-open');
          }
        });
      }
      
      // Close menu when clicking outside (with safeguard)
      const closeMenuOnClickOutside = (e) => {
        if (nav.classList.contains('menu-open')) {
          const isClickInNav = nav.contains(e.target);
          const isClickOnToggle = toggle.contains(e.target);
          
          if (!isClickInNav && !isClickOnToggle) {
            toggle.classList.remove('active');
            nav.classList.remove('menu-open');
          }
        }
      };
      
      document.addEventListener('click', closeMenuOnClickOutside);
      
      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        document.removeEventListener('click', closeMenuOnClickOutside);
      });
    }, 100);
  }

  window.SiteChrome = {
    init(opts={}){
      const navHost = document.querySelector('[data-site-nav]');
      const footHost = document.querySelector('[data-site-footer]');
      if(navHost) navHost.replaceWith(el(buildNav(opts.active||'')));
      if(footHost) footHost.replaceWith(el(buildFooter()));
      liveClock();
      faqToggle();
      mobileMenuToggle();
    }
  };
})();
