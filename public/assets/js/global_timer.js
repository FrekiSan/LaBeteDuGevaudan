// global_timer.js
(function(){
  const el = document.getElementById('global-timer')|| document.getElementById('timer');
  if(!el) return;

  const STORAGE_KEY = 'globalTimerStartISO';
  let startISO = localStorage.getItem(STORAGE_KEY);

  // If no start time exists, don't overwrite in case other pages set it;
  // create one here as fallback.
  if(!startISO){
    startISO = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, startISO);
  }

  const start = new Date(startISO);

  function fmt(n){ return String(n).padStart(2,'0'); }
  function tick(){
    const now = new Date();
    let delta = Math.max(0, Math.floor((now - start)/1000));
    const h = Math.floor(delta/3600);
    const m = Math.floor((delta%3600)/60);
    const s = delta%60;
    el.textContent = `${fmt(h)}:${fmt(m)}:${fmt(s)}`;
    requestAnimationFrame(tick);
  }
  tick();
})();
