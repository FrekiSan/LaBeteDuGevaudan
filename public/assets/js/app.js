document.addEventListener("DOMContentLoaded", () => {
  (function(){
    const fn = (window.Manager && typeof Manager.startGlobalTimer === 'function')
      ? Manager.startGlobalTimer
      : (typeof window.startGlobalTimer === 'function' ? window.startGlobalTimer : null);
    if (fn) { try { fn(); } catch(e){} } else {
      try { localStorage.setItem('escape_global_started', String(Date.now())); } catch(e){}
    }
  })();

  const $ = (sel,root=document)=>root.querySelector(sel);
  const $$ = (sel,root=document)=>Array.from(root.querySelectorAll(sel));

  const overlay = $("#modalOverlay");

  window.openModal = function(id){
    const modal = document.getElementById(id);
    if (!modal) return;
    if (overlay) overlay.style.display = "block";
    modal.style.display = "block";
    if (id === "classementModal" && typeof loadClassement === "function") {
      try { loadClassement(); } catch(e){}
    }
  };
  window.closeModal = function(id){
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
    const anyOpen = $$('.modal').some(m => getComputedStyle(m).display !== 'none');
    if (!anyOpen && overlay) overlay.style.display = "none";
  };

  overlay?.addEventListener('click', () => {
    $$('.modal').forEach(m => m.style.display = 'none');
    overlay.style.display = 'none';
  });
  $$('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeModal(modal.id);
    });
  });
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') {
      const open = $$('.modal').find(m => getComputedStyle(m).display !== 'none');
      if (open) window.closeModal(open.id);
    }
  });

  $("#openContact")?.addEventListener("click", (e)=>{ e.preventDefault(); openModal('modalContact'); });
  $("#openCredits")?.addEventListener("click", (e)=>{ e.preventDefault(); openModal('modalCredits'); });
  $("#openClassement")?.addEventListener("click", (e)=>{ e.preventDefault(); openModal('classementModal'); });

  $$('.spoiler').forEach(el => el.addEventListener('click', ()=> el.classList.toggle('revealed')));

  (async () => {
    try {
      const res = await fetch('api/me.php', {credentials:'include'});
      document.querySelectorAll('[data-auth="guest"]').forEach(el => el.style.display = logged ? 'none' : '');
      document.querySelectorAll('[data-auth="logged"]').forEach(el => el.style.display = logged ? '' : 'none');
      const me  = await res.json().catch(()=>({}));
      const logged = !!me.authenticated;
      const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
              logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                  await fetch('api/logout.php', { method: 'POST', credentials: 'include' });
                } catch {}
                // Nettoyage côté client (timer global, etc.)
                try {
                  localStorage.removeItem('escape_global_started');
                  localStorage.removeItem('globalTimerStartISO');
                  localStorage.removeItem('startTime');
                } catch {}
                location.href = 'index.html';
              });
            }

      ;

      const path = location.pathname.toLowerCase();
      const isEnigme = /enigme[0-9ab]*\.html$/.test(path);
      if (!logged && isEnigme) location.href = 'index.html?auth=required';
    } catch (e) {}
  })();

  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const consent = document.getElementById('reg-consent');
      if (!consent || !consent.checked) { alert('Pour créer un compte, vous devez accepter la Politique de confidentialité.'); return; }
      const fd = new FormData(regForm);
      const res = await fetch('api/register.php', { method:'POST', body:fd, credentials:'include' });
      const data = await res.json().catch(()=>({}));
      if (res.ok && data.ok) {
        const u = fd.get('username'), p = fd.get('password');
        const r2 = await fetch('api/login.php', {
          method:'POST', body: new URLSearchParams({ username:String(u||''), password:String(p||'') }),
          credentials:'include'
        });
        if (r2.ok) { closeModal('loginModal'); location.reload(); }
        else { alert('Compte créé, mais connexion auto impossible.'); }
      } else {
        alert(data.error || 'Inscription impossible.');
      }
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const res = await fetch('api/login.php', { method:'POST', body:fd, credentials:'include' });
      const data = await res.json().catch(()=>({}));
      if (res.ok && data.ok) { closeModal('loginModal'); location.reload(); }
      else { alert('Identifiants invalides.'); }
    });
  }

  window.checkAnswer = function(expected, nextPage){
    const input = document.getElementById('answer');
    const val = input ? String(input.value||'').toLowerCase().trim() : '';
    if (val === String(expected||'').toLowerCase().trim()) {
      const block = document.getElementById('video');
      if (block) block.style.display = 'block';
      setTimeout(()=>{ window.location.href = nextPage; }, 8000);
    }
  };
});