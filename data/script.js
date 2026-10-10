// ============================================================
// I18N
// ============================================================
var I18N = {
  ca: {
    mainTitle:"Nadal", mainSubtitle:"Oriol · Paola · Emma",
    tabControl:"Control", tabScenes:"Escenes", tabSchedule:"Horari", tabXmas:"Nadal", tabSystem:"Sistema",
    stateTitle:"Estat", colorTitle:"Color", effectsTitle:"Efectes", gameHelp:"Tres en ratlla: toca el botó per moure el cursor i mantén-lo premut per jugar.", textTitle:"Text a la matriu", textHelp:"Escriu lletres o números i es mostraran desplaçant-se per la matriu.", textPlaceholder:"Ex.: BON NADAL 2026", textSend:"Mostrar text", textSent:"Text enviat a la matriu", textError:"Fes servir només lletres sense accents, números i espais (màxim 24 caràcters).", brightTitle:"Brillantor",
    brightGeneral:"General", rgbTitle:"Ajust fi RGB", red:"Vermell", green:"Verd", blue:"Blau",
    quickColors:"Colors ràpids", savedScenes:"Escenes desades",
    sceneHelp:"Toca una escena per aplicar-la. Mantén premut per sobreescriure-la amb el color actual.",
    colorOptions:"Opcions de color", gammaTitle:"Gamma 2.2", gammaDesc:"Millora el mesclat de colors",
    fadeTitle:"Transicions suaus", fadeDesc:"Els canvis de color es fonen",
    calTitle:"Calibratge per canal", calDesc:"Ajusta per igualar la lluminositat dels 3 LEDs. 100 = neutre.",
    gateTitle:"Cal connexió WiFi",
    gateSchedText:"El programador necessita l'hora real (NTP), que només s'obté connectant el dispositiu a una xarxa WiFi.",
    gateXmasText:"El compte enrere i el calendari d'Advent necessiten l'hora real (NTP), que només s'obté connectant el dispositiu a una xarxa WiFi.",
    gateBtn:"Anar a WiFi", schedTitle:"Programador",
    schedHelp:"Fins a 6 franges. Cada franja aplica color i brillantor a l'hora indicada.",
    slotsTitle:"Franges", saveSched:"Desar programador",
    countdownTitle:"Compte enrere per Nadal", days:"dies", hours:"hores", mins:"min", secs:"seg",
    adventTitle:"Calendari d'Advent", adventHelp:"Cada dia de desembre es desbloqueja una casella amb una sorpresa.",
    applyThisColor:"Aplicar aquest color", adventLocked:"Torna aquest dia per obrir-la!",
    wifiTitle:"WiFi domèstica", loading:"Carregant...", scanBtn:"Escanejar xarxes",
    ssidPh:"SSID de la xarxa", passPh:"Contrasenya", connectBtn:"Connectar", forgetBtn:"Oblidar xarxa",
    sysStateTitle:"Estat del sistema", rebootBtn:"Reiniciar dispositiu",
    apActive:"AP actiu", wifiLabel:"WiFi: ",
    notConnected:"No connectat a cap xarxa domèstica.",
    connectedTo:"Connectat", to:"a", ipLabel:"IP", signalLabel:"Senyal", access:"Accés",
    connectingTo:"Connectant a", noNetworks:"Cap xarxa trobada.", scanning:"Escanejant...",
    enterSsid:"Introdueix el SSID", sceneApplied:"Escena aplicada", sceneSaved:"Escena desada",
    errorSaving:"Error desant", schedSaved:"Programador desat", netForgotten:"Xarxa oblidada",
    rebooting:"Reiniciant...", confirmReboot:"Segur que vols reiniciar?", confirmForget:"Segur que vols oblidar la xarxa?",
    gammaOn:"Gamma activada", gammaOff:"Gamma desactivada", fadeOn:"Transicions activades", fadeOff:"Transicions desactivades",
    sceneNamePrompt:"Nom per a aquesta escena:", scene:"Escena", disconnected:"Desconnectat",
    apLine:"AP", staLine:"STA", timeLine:"Hora", ntpLine:"NTP", ntpOk:"Sincronitzat", ntpBad:"No sincronitzat",
    uptimeLine:"Encès", heapLine:"Memòria lliure", coreLine:"Versió nucli", chipLine:"Chip ID", clients:"clients",
    fxStatic:"Estàtic", fxRainbow:"Arc de St Martí", fxPulse:"Batec", fxCandle:"Espelma", fxParty:"Festa", fxSparkle:"Espurnes", fxDemo:"Demo LED", fxDrawings:"Dibuixos", fxText:"Text", fxSmiley:"Riure", fxGame:"Tres en ratlla", fxMatrix:"Matrix",
    on:"Encès", off:"Apagat",
    wifiConnecting:"Connectant", wifiConnected:"Connectat", wifiFailed:"Connexió fallida",
    wifiTimeout:"Temps d'espera esgotat. Comprova la contrasenya o apropa't al router.",
    wifiBadPass:"Contrasenya incorrecta. Torna-ho a provar.",
    wifiNoAp:"No s'ha trobat la xarxa. Comprova el SSID.",
    wifiGenericErr:"No s'ha pogut connectar. Torna-ho a intentar.",
    wifiAttempt:"Intent", of:"de",
    adminTitle:"Opcions avançades", adventAdminTitle:"Calendari obert",
    adventAdminDesc:"Permet obrir qualsevol casella del calendari",
    adminOn:"🔓 Mode admin: totes les caselles obertes", adminOff:"Tancar",
    adventOpened:"Casella oberta", adventFuture:"Aquesta casella és del futur"
  },
  fr: {
    mainTitle:"Noël", mainSubtitle:"Oriol · Paola · Emma",
    tabControl:"Contrôle", tabScenes:"Scènes", tabSchedule:"Horaire", tabXmas:"Noël", tabSystem:"Système",
    stateTitle:"État", colorTitle:"Couleur", effectsTitle:"Effets", gameHelp:"Morpion : touchez le bouton pour déplacer le curseur et maintenez-le pour jouer.", textTitle:"Texte sur la matrice", textHelp:"Saisissez des lettres ou des chiffres pour les faire défiler sur la matrice.", textPlaceholder:"Ex. : JOYEUX NOEL 2026", textSend:"Afficher le texte", textSent:"Texte envoyé à la matrice", textError:"Utilisez uniquement des lettres sans accents, des chiffres et des espaces (24 caractères maximum).", brightTitle:"Luminosité",
    brightGeneral:"Générale", rgbTitle:"Réglage fin RVB", red:"Rouge", green:"Vert", blue:"Bleu",
    quickColors:"Couleurs rapides", savedScenes:"Scènes enregistrées",
    sceneHelp:"Touchez une scène pour l'appliquer. Maintenez appuyé pour l'écraser avec la couleur actuelle.",
    colorOptions:"Options de couleur", gammaTitle:"Gamma 2.2", gammaDesc:"Améliore le mélange des couleurs",
    fadeTitle:"Transitions douces", fadeDesc:"Les changements de couleur se fondent",
    calTitle:"Étalonnage par canal", calDesc:"Ajustez pour égaliser la luminosité des 3 LEDs. 100 = neutre.",
    gateTitle:"Connexion WiFi requise",
    gateSchedText:"Le programmateur a besoin de l'heure réelle (NTP), obtenue uniquement en connectant l'appareil à un réseau WiFi.",
    gateXmasText:"Le compte à rebours et le calendrier de l'Avent ont besoin de l'heure réelle (NTP), obtenue uniquement en connectant l'appareil à un réseau WiFi.",
    gateBtn:"Aller au WiFi", schedTitle:"Programmateur",
    schedHelp:"Jusqu'à 6 plages. Chaque plage applique une couleur et une luminosité à l'heure indiquée.",
    slotsTitle:"Plages", saveSched:"Enregistrer le programmateur",
    countdownTitle:"Compte à rebours de Noël", days:"jours", hours:"heures", mins:"min", secs:"sec",
    adventTitle:"Calendrier de l'Avent", adventHelp:"Chaque jour de décembre débloque une case surprise.",
    applyThisColor:"Appliquer cette couleur", adventLocked:"Reviens ce jour-là pour l'ouvrir !",
    wifiTitle:"WiFi domestique", loading:"Chargement...", scanBtn:"Scanner les réseaux",
    ssidPh:"SSID du réseau", passPh:"Mot de passe", connectBtn:"Connecter", forgetBtn:"Oublier le réseau",
    sysStateTitle:"État du système", rebootBtn:"Redémarrer l'appareil",
    apActive:"AP actif", wifiLabel:"WiFi : ",
    notConnected:"Non connecté à un réseau domestique.",
    connectedTo:"Connecté", to:"à", ipLabel:"IP", signalLabel:"Signal", access:"Accès",
    connectingTo:"Connexion à", noNetworks:"Aucun réseau trouvé.", scanning:"Analyse en cours...",
    enterSsid:"Entrez le SSID", sceneApplied:"Scène appliquée", sceneSaved:"Scène enregistrée",
    errorSaving:"Erreur d'enregistrement", schedSaved:"Programmateur enregistré", netForgotten:"Réseau oublié",
    rebooting:"Redémarrage...", confirmReboot:"Voulez-vous vraiment redémarrer ?", confirmForget:"Voulez-vous vraiment oublier ce réseau ?",
    gammaOn:"Gamma activé", gammaOff:"Gamma désactivé", fadeOn:"Transitions activées", fadeOff:"Transitions désactivées",
    sceneNamePrompt:"Nom de cette scène :", scene:"Scène", disconnected:"Déconnecté",
    apLine:"AP", staLine:"STA", timeLine:"Heure", ntpLine:"NTP", ntpOk:"Synchronisé", ntpBad:"Non synchronisé",
    uptimeLine:"Allumé depuis", heapLine:"Mémoire libre", coreLine:"Version du noyau", chipLine:"ID de puce", clients:"clients",
    fxStatic:"Statique", fxRainbow:"Arc-en-ciel", fxPulse:"Pulsation", fxCandle:"Bougie", fxParty:"Fête", fxSparkle:"Étincelles", fxDemo:"Démo LED", fxDrawings:"Dessins", fxText:"Texte", fxSmiley:"Rire", fxGame:"Morpion", fxMatrix:"Matrix",
    on:"Allumé", off:"Éteint",
    wifiConnecting:"Connexion", wifiConnected:"Connecté", wifiFailed:"Connexion échouée",
    wifiTimeout:"Délai dépassé. Vérifiez le mot de passe ou rapprochez-vous du routeur.",
    wifiBadPass:"Mot de passe incorrect. Réessayez.",
    wifiNoAp:"Réseau introuvable. Vérifiez le SSID.",
    wifiGenericErr:"Impossible de se connecter. Réessayez.",
    wifiAttempt:"Tentative", of:"sur",
    adminTitle:"Options avancées", adventAdminTitle:"Calendrier ouvert",
    adventAdminDesc:"Permet d'ouvrir n'importe quelle case du calendrier",
    adminOn:"🔓 Mode admin : toutes les cases ouvertes", adminOff:"Fermer",
    adventOpened:"Case ouverte", adventFuture:"Cette case est du futur"
  }
};

var LANG = 'ca';

function t(k){
  var dict = I18N[LANG] || I18N.ca;
  return dict[k] || I18N.ca[k] || k;
}

function setLang(l){
  LANG = (l === 'fr') ? 'fr' : 'ca';
  try { localStorage.setItem('nadalLang', LANG); } catch(e) {}
  applyLanguage();
}

function applyLanguage(){
  var ca = document.getElementById('langCaBtn');
  var fr = document.getElementById('langFrBtn');
  if(ca) ca.classList.toggle('active', LANG === 'ca');
  if(fr) fr.classList.toggle('active', LANG === 'fr');

  // Títol i subtítol principals
  var titleEl = document.getElementById('mainTitle');
  var subEl = document.getElementById('mainSubtitle');
  if(titleEl) titleEl.textContent = t('mainTitle');
  if(subEl) subEl.textContent = t('mainSubtitle');

  var nodes = document.querySelectorAll('[data-i18n]');
  for(var i = 0; i < nodes.length; i++){
    var el = nodes[i];
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    var hasProtected = el.querySelector('span[id], .val, input, select');
    if(hasProtected){
      var replaced = false;
      for(var j = 0; j < el.childNodes.length; j++){
        var node = el.childNodes[j];
        if(node.nodeType === 3 && node.textContent.trim().length > 0){
          node.textContent = val;
          replaced = true;
          break;
        }
      }
      if(!replaced){
        el.insertBefore(document.createTextNode(val + ' '), el.firstChild);
      }
    } else {
      el.textContent = val;
    }
  }

  var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  for(var p = 0; p < placeholders.length; p++){
    placeholders[p].placeholder = t(placeholders[p].getAttribute('data-i18n-placeholder'));
  }

  var s = document.getElementById('ssidField');
  var p = document.getElementById('passField');
  if(s) s.placeholder = t('ssidPh');
  if(p) p.placeholder = t('passPh');

  try { buildPresets(); } catch(e){}
  try { buildEffectsRow(); } catch(e){}
  try { updateFooter(); } catch(e){}
  try { updateHero(); } catch(e){}

  var sys = document.getElementById('tab-system');
  if(sys && sys.classList.contains('active')){
    try { loadStaStatus(); } catch(e){}
    try { loadSysInfo(); } catch(e){}
  }
  var sch = document.getElementById('tab-schedule');
  if(sch && sch.classList.contains('active')){
    try { loadSchedule(); } catch(e){}
  }
  var xm = document.getElementById('tab-xmas');
  if(xm && xm.classList.contains('active')){
    try { buildAdventGrid(); } catch(e){}
  }
}

try {
  var savedLang = localStorage.getItem('nadalLang');
  if(savedLang === 'ca' || savedLang === 'fr') LANG = savedLang;
} catch(e){}

// ============================================================
// NEU
// ============================================================
(function(){
  var canvas = document.getElementById('snowCanvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var flakes = [];
  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function init(){
    var count = Math.min(55, Math.floor(window.innerWidth / 9));
    flakes = [];
    for(var i = 0; i < count; i++){
      flakes.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: 1 + Math.random()*2.6,
        speed: 0.35 + Math.random()*1.1,
        drift: (Math.random()-0.5)*0.7,
        alpha: 0.2 + Math.random()*0.55
      });
    }
  }
  function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#ffffff';
    for(var i = 0; i < flakes.length; i++){
      var f = flakes[i];
      ctx.globalAlpha = f.alpha;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
      ctx.fill();
      f.y += f.speed;
      f.x += f.drift;
      if(f.y > canvas.height + 5){ f.y = -5; f.x = Math.random()*canvas.width; }
      if(f.x > canvas.width + 5) f.x = -5;
      if(f.x < -5) f.x = canvas.width + 5;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', function(){ resize(); init(); });
  resize(); init(); tick();
})();

// ============================================================
// ESTAT
// ============================================================
var state = {
  r:255, g:255, b:255, bright:100, power:false, mode:0, time:"--:--:--",
  gamma:true, fade:true, cal:{r:100,g:100,b:100},
  staConnected:false, staConnecting:false, staError:"",
  ntpSynced:false, secToXmas:-1, adventDay:0, adventAdmin:false
};
var sendTimer = null;
var longPressTimer = null;
var xmasDeadline = null;
var adventOpenedDay = null;
var staLastCheck = 0;

// ============================================================
// TABS
// ============================================================
function showTab(name){
  var panels = document.querySelectorAll('.tab-panel');
  for(var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
  var btns = document.querySelectorAll('.tab-btn');
  for(var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  var target = document.getElementById('tab-' + name);
  if(target) target.classList.add('active');
  var btn = document.querySelector('.tab-btn[data-tab="' + name + '"]');
  if(btn) btn.classList.add('active');

  if(name === 'scenes'){ try { loadScenes(); } catch(e){} }
  if(name === 'schedule'){ try { loadSchedule(); } catch(e){} }
  if(name === 'system'){ try { loadStaStatus(); loadSysInfo(); loadAdventAdminState(); } catch(e){} }
  if(name === 'xmas'){ try { buildAdventGrid(); } catch(e){} }
}

// ============================================================
// TOAST
// ============================================================
function toast(msg, type){
  var el = document.getElementById('toast');
  if(!el) return;
  el.textContent = msg;
  el.className = 'toast ' + (type || '');
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(function(){ el.classList.remove('show'); }, 2600);
}

// ============================================================
// COLOR: HSV <-> RGB
// ============================================================
function hsvToRgb(h, s, v){
  h = ((h % 360) + 360) % 360;
  var c = v * s;
  var x = c * (1 - Math.abs(((h/60) % 2) - 1));
  var m = v - c;
  var r=0,g=0,b=0;
  if(h < 60){ r=c; g=x; b=0; }
  else if(h < 120){ r=x; g=c; b=0; }
  else if(h < 180){ r=0; g=c; b=x; }
  else if(h < 240){ r=0; g=x; b=c; }
  else if(h < 300){ r=x; g=0; b=c; }
  else { r=c; g=0; b=x; }
  return [Math.round((r+m)*255), Math.round((g+m)*255), Math.round((b+m)*255)];
}

function rgbToHsv(r, g, b){
  r/=255; g/=255; b/=255;
  var max=Math.max(r,g,b), min=Math.min(r,g,b);
  var d=max-min;
  var h=0;
  if(d === 0) h = 0;
  else if(max === r) h = 60*(((g-b)/d)%6);
  else if(max === g) h = 60*(((b-r)/d)+2);
  else h = 60*(((r-g)/d)+4);
  if(h < 0) h += 360;
  var s = max === 0 ? 0 : d/max;
  return [h, s, max];
}

function rgbToHex(r,g,b){
  return '#' + [r,g,b].map(function(v){ return v.toString(16).padStart(2,'0'); }).join('');
}
function hexToRgb(hex){
  var v = parseInt(hex.slice(1), 16);
  return [(v>>16)&255, (v>>8)&255, v&255];
}
function glowShadow(r,g,b){ return '0 6px 20px rgba(' + r + ',' + g + ',' + b + ',0.5)'; }

// ============================================================
// RODA CROMÀTICA (offset corregit)
// ============================================================
var WHEEL_OFFSET = 180;
var wheel = document.getElementById('wheel');
var pointer = document.getElementById('pointer');

function updatePointerFromRgb(r,g,b){
  if(!wheel || !pointer) return;
  var radius = wheel.clientWidth / 2;
  var hsv = rgbToHsv(r,g,b);
  var h = hsv[0];
  var s = hsv[1];
  var angleRad = (h - WHEEL_OFFSET) * Math.PI / 180;
  var dist = Math.min(s, 1) * radius;
  var px = radius + Math.cos(angleRad) * dist;
  var py = radius + Math.sin(angleRad) * dist;
  pointer.style.left = px + 'px';
  pointer.style.top  = py + 'px';
}

function handleWheel(e){
  if(!wheel || !pointer) return;
  var rect = wheel.getBoundingClientRect();
  var cx = rect.left + rect.width / 2;
  var cy = rect.top  + rect.height / 2;
  var clientX = e.touches ? e.touches[0].clientX : e.clientX;
  var clientY = e.touches ? e.touches[0].clientY : e.clientY;
  var dx = clientX - cx;
  var dy = clientY - cy;
  var radius = rect.width / 2;
  var dist = Math.sqrt(dx*dx + dy*dy);
  var sat = Math.min(dist / radius, 1);
  var angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;
  var hue = angleDeg + WHEEL_OFFSET;
  hue = ((hue % 360) + 360) % 360;
  var rgb = hsvToRgb(hue, sat, 1);
  state.r = rgb[0]; state.g = rgb[1]; state.b = rgb[2];
  state.power = true; state.mode = 0;
  document.getElementById('powerToggle').checked = true;
  highlightEffect();
  var px = Math.max(13, Math.min(rect.width - 13, clientX - rect.left));
  var py = Math.max(13, Math.min(rect.height - 13, clientY - rect.top));
  pointer.style.left = px + 'px';
  pointer.style.top  = py + 'px';
  updateRgbUI();
  scheduleSend();
}

if(wheel){
  wheel.addEventListener('mousedown', function(e){ e.preventDefault(); handleWheel(e); });
  wheel.addEventListener('touchstart', function(e){ e.preventDefault(); handleWheel(e); }, {passive:false});
  wheel.addEventListener('touchmove',  function(e){ e.preventDefault(); handleWheel(e); }, {passive:false});
}

// ============================================================
// SLIDERS
// ============================================================
function onRgbInput(){
  state.r = parseInt(document.getElementById('rSlider').value);
  state.g = parseInt(document.getElementById('gSlider').value);
  state.b = parseInt(document.getElementById('bSlider').value);
  state.power = true; state.mode = 0;
  document.getElementById('powerToggle').checked = true;
  highlightEffect();
  updateRgbUI();
  scheduleSend();
}
function updateRgbUI(){
  document.getElementById('rSlider').value = state.r;
  document.getElementById('gSlider').value = state.g;
  document.getElementById('bSlider').value = state.b;
  document.getElementById('rVal').textContent = state.r;
  document.getElementById('gVal').textContent = state.g;
  document.getElementById('bVal').textContent = state.b;
  var c = 'rgb(' + state.r + ',' + state.g + ',' + state.b + ')';
  document.getElementById('previewBar').style.background = c;
  document.getElementById('previewBar').style.boxShadow =
    'inset 0 0 40px rgba(0,0,0,0.8), 0 10px 28px rgba(' + state.r + ',' + state.g + ',' + state.b + ',0.4)';
  updatePointerFromRgb(state.r, state.g, state.b);
  updateHero();
}
function updateHero(){
  var root = document.documentElement.style;
  root.setProperty('--live-r', state.r);
  root.setProperty('--live-g', state.g);
  root.setProperty('--live-b', state.b);
  var glow = document.getElementById('heroGlow');
  if(glow) glow.style.opacity = state.power ? Math.max(0.4, state.bright/100) : 0.06;
  var badge = document.getElementById('heroBadge');
  if(badge){
    badge.textContent = state.power ? t('on') : t('off');
    badge.classList.toggle('on', state.power);
  }
}
function updateFooter(){
  document.getElementById('clockInline').textContent = state.time;
  document.getElementById('netInfo').textContent = state.staConnected ? t('wifiLabel') : t('apActive');
}

// ============================================================
// BRILLANTOR
// ============================================================
function onBrightInput(v){ document.getElementById('brightVal').textContent = v + '%'; }
function onBrightChange(v){
  state.bright = parseInt(v);
  state.power = true;
  document.getElementById('powerToggle').checked = true;
  updateHero();
  scheduleSend();
}

// ============================================================
// ENVIAR
// ============================================================
function scheduleSend(){
  if(sendTimer) clearTimeout(sendTimer);
  sendTimer = setTimeout(sendColor, 60);
}
function sendColor(){
  var p = state.power ? 1 : 0;
  fetch('/api/set?r=' + state.r + '&g=' + state.g + '&b=' + state.b + '&bright=' + state.bright + '&power=' + p)
    .catch(function(){});
}
function togglePower(){
  fetch('/api/toggle').then(function(r){ return r.text(); }).then(function(txt){
    state.power = (txt === 'ON');
    document.getElementById('powerToggle').checked = state.power;
    updateHero();
  }).catch(function(){});
}

// ============================================================
// EFECTES
// ============================================================
var EFFECTS = [
  {mode:0, icon:'💡', key:'fxStatic'},
  {mode:9, icon:'😄', key:'fxSmiley'},
  {mode:1, icon:'🌈', key:'fxRainbow'},
  {mode:2, icon:'💓', key:'fxPulse'},
  {mode:3, icon:'🕯️', key:'fxCandle'},
  {mode:4, icon:'🎉', key:'fxParty'},
  {mode:5, icon:'❄️', key:'fxSparkle'},
  {mode:6, icon:'✨', key:'fxDemo'},
  {mode:7, icon:'🎄', key:'fxDrawings'},
  {mode:8, icon:'🔤', key:'fxText'},
  {mode:10, icon:'⭕', key:'fxGame'},
  {mode:11, icon:'🟢', key:'fxMatrix'}
];
function buildEffectsRow(){
  var row = document.getElementById('effectsRow');
  if(!row) return;
  var curMode = (typeof state !== 'undefined' && state.mode != null) ? state.mode : 0;
  row.innerHTML = '';
  EFFECTS.forEach(function(fx){
    var btn = document.createElement('button');
    btn.className = 'fx-btn' + (curMode === fx.mode ? ' active' : '');
    btn.dataset.mode = fx.mode;
    btn.innerHTML = '<span class="ic">' + fx.icon + '</span><span>' + t(fx.key) + '</span>';
    btn.onclick = function(){ setEffect(fx.mode); };
    row.appendChild(btn);
  });
}
function highlightEffect(){
  var btns = document.querySelectorAll('.fx-btn');
  for(var i = 0; i < btns.length; i++){
    btns[i].classList.toggle('active', parseInt(btns[i].dataset.mode) === state.mode);
  }
}
function setEffect(m){
  state.mode = m;
  if(m !== 0){ state.power = true; document.getElementById('powerToggle').checked = true; }
  highlightEffect();
  fetch('/api/mode?mode=' + m).catch(function(){});
}
function sendDisplayText(event){
  event.preventDefault();
  var input = document.getElementById('displayTextInput');
  var text = input.value.trim().toUpperCase();
  if(!/^[A-Z0-9 ]{1,24}$/.test(text)){
    toast(t('textError'), 'error');
    return;
  }
  fetch('/api/text?value=' + encodeURIComponent(text)).then(function(response){
    if(!response.ok) throw new Error('Text rejected');
    state.mode = 8;
    state.power = true;
    document.getElementById('powerToggle').checked = true;
    highlightEffect();
    updateHero();
    toast(t('textSent'), 'ok');
  }).catch(function(){ toast(t('textError'), 'error'); });
}

// ============================================================
// PREDEFINITS
// ============================================================
var PRESETS = [
  { key:{ca:'Blanc',fr:'Blanc'}, c:[255,255,255] },
  { key:{ca:'Càlid',fr:'Chaud'}, c:[255,200,140] },
  { key:{ca:'Fred',fr:'Froid'}, c:[200,220,255] },
  { key:{ca:'Taronja',fr:'Orange'}, c:[255,150,50] },
  { key:{ca:'Vermell',fr:'Rouge'}, c:[255,0,0] },
  { key:{ca:'Verd',fr:'Vert'}, c:[0,255,0] },
  { key:{ca:'Blau',fr:'Bleu'}, c:[0,0,255] },
  { key:{ca:'Groc',fr:'Jaune'}, c:[255,255,0] },
  { key:{ca:'Cian',fr:'Cyan'}, c:[0,255,255] },
  { key:{ca:'Magenta',fr:'Magenta'}, c:[255,0,255] },
  { key:{ca:'Salmó',fr:'Saumon'}, c:[255,120,120] },
  { key:{ca:'Lila',fr:'Lilas'}, c:[160,110,255] }
];
function buildPresets(){
  var grid = document.getElementById('presetsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  PRESETS.forEach(function(p){
    var btn = document.createElement('button');
    btn.className = 'color-btn';
    btn.style.background = 'rgb(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ')';
    btn.style.boxShadow = glowShadow(p.c[0],p.c[1],p.c[2]);
    var lum = (p.c[0]*299 + p.c[1]*587 + p.c[2]*114) / 1000;
    btn.style.color = lum > 128 ? '#000' : '#fff';
    btn.textContent = p.key[LANG] || p.key.ca;
    btn.onclick = function(){ applyColor(p.c[0], p.c[1], p.c[2]); };
    grid.appendChild(btn);
  });
}
function applyColor(r,g,b){
  state.r = r; state.g = g; state.b = b;
  state.power = true; state.mode = 0;
  document.getElementById('powerToggle').checked = true;
  highlightEffect();
  updateRgbUI();
  sendColor();
  fetch('/api/mode?mode=0').catch(function(){});
}

// ============================================================
// ESCENES
// ============================================================
function loadScenes(){
  fetch('/api/scenes').then(function(r){ return r.json(); }).then(function(scenes){
    var grid = document.getElementById('scenesGrid');
    if(!grid) return;
    grid.innerHTML = '';
    scenes.forEach(function(s, i){
      var btn = document.createElement('button');
      btn.className = 'color-btn';
      btn.style.height = '76px';
      btn.style.background = 'rgb(' + s.r + ',' + s.g + ',' + s.b + ')';
      btn.style.boxShadow = glowShadow(s.r,s.g,s.b);
      var lum = (s.r*299 + s.g*587 + s.b*114) / 1000;
      btn.style.color = lum > 128 ? '#000' : '#fff';
      btn.innerHTML = '<div style="font-size:0.7rem;">' + (s.name || (t('scene') + ' ' + (i+1))) + '</div>';
      var pressed = false;
      var startPress = function(){
        longPressTimer = setTimeout(function(){ saveSceneTo(i); pressed = true; }, 700);
      };
      var endPress = function(){
        clearTimeout(longPressTimer);
        if(!pressed) applyScene(s);
        pressed = false;
      };
      btn.addEventListener('touchstart', startPress);
      btn.addEventListener('touchend', endPress);
      btn.addEventListener('mousedown', startPress);
      btn.addEventListener('mouseup', endPress);
      grid.appendChild(btn);
    });
  }).catch(function(){});
}
function applyScene(s){
  state.r = s.r; state.g = s.g; state.b = s.b;
  state.bright = s.bright; state.power = true; state.mode = 0;
  document.getElementById('brightSlider').value = s.bright;
  document.getElementById('brightVal').textContent = s.bright + '%';
  document.getElementById('powerToggle').checked = true;
  highlightEffect();
  updateRgbUI();
  sendColor();
  fetch('/api/mode?mode=0').catch(function(){});
  toast(t('sceneApplied'), 'ok');
}
function saveSceneTo(i){
  var name = prompt(t('sceneNamePrompt'), t('scene') + ' ' + (i+1));
  if(name === null) return;
  fetch('/api/scene/save?i=' + i + '&r=' + state.r + '&g=' + state.g + '&b=' + state.b + '&bright=' + state.bright + '&name=' + encodeURIComponent(name.slice(0,11)))
    .then(function(){ toast(t('sceneSaved'), 'ok'); loadScenes(); })
    .catch(function(){ toast(t('errorSaving'), 'err'); });
}

// ============================================================
// GAMMA / FADE / CAL
// ============================================================
function toggleGamma(){
  var v = document.getElementById('gammaToggle').checked ? 1 : 0;
  fetch('/api/options?gamma=' + v).then(function(){ toast(v ? t('gammaOn') : t('gammaOff'), 'ok'); });
}
function toggleFade(){
  var v = document.getElementById('fadeToggle').checked ? 1 : 0;
  fetch('/api/options?fade=' + v).then(function(){ toast(v ? t('fadeOn') : t('fadeOff'), 'ok'); });
}
function onCalInput(ch){
  var v = document.getElementById('cal' + ch).value;
  document.getElementById('cal' + ch + 'Val').textContent = v;
  fetch('/api/options?cal' + ch.toLowerCase() + '=' + v).catch(function(){});
}

// ============================================================
// HORARI
// ============================================================
function slotHtml(i){
  var onTxt = (LANG === 'ca') ? 'Encendre' : 'Allumer';
  var offTxt = (LANG === 'ca') ? 'Apagar' : 'Éteindre';
  var brightLbl = (LANG === 'ca') ? 'Brill.' : 'Lum.';
  return '<div class="slot">' +
    '<div class="slot-head">' +
      '<label class="switch" style="width:48px;height:28px;">' +
        '<input type="checkbox" id="slot' + i + '_en">' +
        '<span class="slider-toggle"></span>' +
      '</label>' +
      '<input type="time" id="slot' + i + '_time" value="08:00">' +
    '</div>' +
    '<div class="slot-body">' +
      '<input type="color" id="slot' + i + '_color" value="#ffffff">' +
      '<select id="slot' + i + '_pow">' +
        '<option value="1">' + onTxt + '</option>' +
        '<option value="0">' + offTxt + '</option>' +
      '</select>' +
      '<span class="lbl">' + brightLbl + '</span>' +
      '<input type="number" id="slot' + i + '_bright" min="0" max="100" value="100">' +
    '</div>' +
  '</div>';
}
function loadSchedule(){
  var html = '';
  for(var i = 0; i < 6; i++) html += slotHtml(i);
  document.getElementById('slotsContainer').innerHTML = html;
  fetch('/api/schedule/status').then(function(r){ return r.json(); }).then(function(d){
    document.getElementById('schedToggle').checked = d.enable;
    d.slots.forEach(function(s, i){
      document.getElementById('slot' + i + '_en').checked = s.en;
      document.getElementById('slot' + i + '_time').value =
        String(s.h).padStart(2,'0') + ':' + String(s.m).padStart(2,'0');
      document.getElementById('slot' + i + '_color').value = rgbToHex(s.r, s.g, s.b);
      document.getElementById('slot' + i + '_pow').value = s.pow ? "1" : "0";
      document.getElementById('slot' + i + '_bright').value = s.bright;
    });
  }).catch(function(){});
}
function saveSchedule(){
  var p = 'enable=' + (document.getElementById('schedToggle').checked ? 1 : 0);
  for(var i = 0; i < 6; i++){
    var en = document.getElementById('slot' + i + '_en').checked ? 1 : 0;
    var tm = document.getElementById('slot' + i + '_time').value || "00:00";
    var parts = tm.split(':');
    var h = parts[0], m = parts[1];
    var rgb = hexToRgb(document.getElementById('slot' + i + '_color').value);
    var pw = document.getElementById('slot' + i + '_pow').value;
    var br = document.getElementById('slot' + i + '_bright').value;
    p += '&slot' + i + '_en=' + en + '&slot' + i + '_h=' + h + '&slot' + i + '_m=' + m +
         '&slot' + i + '_r=' + rgb[0] + '&slot' + i + '_g=' + rgb[1] + '&slot' + i + '_b=' + rgb[2] +
         '&slot' + i + '_bright=' + br + '&slot' + i + '_pow=' + pw;
  }
  fetch('/api/schedule?' + p).then(function(){ toast(t('schedSaved'), 'ok'); })
    .catch(function(){ toast(t('errorSaving'), 'err'); });
}

// ============================================================
// ADVENT
// ============================================================
var ADVENT = [
  {ca:"Que comenci la màgia de Nadal!", fr:"Que la magie de Noël commence !", c:[255,80,80]},
  {ca:"Un llumet de calidesa per a avui.", fr:"Une petite lumière chaleureuse pour aujourd'hui.", c:[255,180,90]},
  {ca:"Els millors moments són els compartits.", fr:"Les meilleurs moments sont ceux qu'on partage.", c:[120,200,255]},
  {ca:"Avui toca color de festa!", fr:"Aujourd'hui, couleur de fête !", c:[255,60,180]},
  {ca:"Respira, encara falten dies per gaudir.", fr:"Respire, il reste encore des jours à savourer.", c:[150,255,180]},
  {ca:"Un toc daurat per il·luminar la nit.", fr:"Une touche dorée pour illuminer la nuit.", c:[255,210,90]},
  {ca:"El fred de fora, l'escalfor de dins.", fr:"Le froid dehors, la chaleur dedans.", c:[180,220,255]},
  {ca:"Meitat de mes, meitat de màgia!", fr:"Milieu du mois, moitié de la magie !", c:[255,120,60]},
  {ca:"Un vermell intens per als valents.", fr:"Un rouge intense pour les courageux.", c:[220,20,40]},
  {ca:"Verd de pi, aroma de Nadal.", fr:"Vert de sapin, arôme de Noël.", c:[40,160,90]},
  {ca:"Blanc com la neu que encara no ha caigut.", fr:"Blanc comme la neige qui n'est pas encore tombée.", c:[240,240,255]},
  {ca:"Avui, un lila per somiar despert.", fr:"Aujourd'hui, un lilas pour rêver éveillé.", c:[170,120,255]},
  {ca:"Meitat de camí cap a la nit màgica.", fr:"À mi-chemin de la nuit magique.", c:[255,150,180]},
  {ca:"Un blau profund com el cel d'hivern.", fr:"Un bleu profond comme le ciel d'hiver.", c:[40,80,200]},
  {ca:"Falten deu dies! El compte enrere s'escalfa.", fr:"Plus que dix jours ! Le compte à rebours chauffe.", c:[255,100,40]},
  {ca:"Un toc turquesa per refrescar l'ànim.", fr:"Une touche turquoise pour rafraîchir l'esprit.", c:[40,220,220]},
  {ca:"Nou dies. Ja se sent l'olor de torrons.", fr:"Neuf jours. On sent déjà l'odeur des friandises.", c:[255,190,140]},
  {ca:"Vuit dies i comptant, com les campanes.", fr:"Huit jours et ça continue, comme les cloches.", c:[255,215,0]},
  {ca:"Set dies: un color coral per celebrar.", fr:"Sept jours : une couleur corail pour célébrer.", c:[255,100,90]},
  {ca:"Sis dies. El fred convida a la llum càlida.", fr:"Six jours. Le froid invite à la lumière chaude.", c:[255,170,60]},
  {ca:"Cinc dies! Un rosa festiu per avui.", fr:"Cinq jours ! Un rose festif pour aujourd'hui.", c:[255,110,170]},
  {ca:"Quatre dies. Verd i vermell ja es barallen.", fr:"Quatre jours. Le vert et le rouge se disputent déjà.", c:[200,30,60]},
  {ca:"Tres dies! Que comenci la comptessa final.", fr:"Trois jours ! Que commence le décompte final.", c:[60,180,255]},
  {ca:"Dos dies! Nadal ja truca a la porta.", fr:"Deux jours ! Noël frappe déjà à la porte.", c:[255,60,60]},
  {ca:"Nit de Nadal! Un color daurat i festiu.", fr:"Nuit de Noël ! Une couleur dorée et festive.", c:[255,200,60]}
];
function secondsToHMS(totalSec){
  totalSec = Math.max(0, Math.floor(totalSec));
  return {
    d: Math.floor(totalSec/86400),
    h: Math.floor((totalSec%86400)/3600),
    m: Math.floor((totalSec%3600)/60),
    s: totalSec%60
  };
}
function tickCountdown(){
  if(xmasDeadline === null) return;
  var remaining = (xmasDeadline - Date.now())/1000;
  var hms = secondsToHMS(remaining);
  var dEl = document.getElementById('cdDays');
  var hEl = document.getElementById('cdHours');
  var mEl = document.getElementById('cdMins');
  var sEl = document.getElementById('cdSecs');
  if(dEl) dEl.textContent = hms.d;
  if(hEl) hEl.textContent = String(hms.h).padStart(2,'0');
  if(mEl) mEl.textContent = String(hms.m).padStart(2,'0');
  if(sEl) sEl.textContent = String(hms.s).padStart(2,'0');
}
setInterval(tickCountdown, 1000);

function buildAdventGrid(){
  var grid = document.getElementById('adventGrid');
  if(!grid) return;
  grid.innerHTML = '';
  var unlocked = state.adventDay;
  var admin = state.adventAdmin;
  var openedSet = [];
  try { openedSet = JSON.parse(localStorage.getItem('nadalAdventOpened') || '[]'); }
  catch(e){ openedSet = []; }
  for(var i = 1; i <= 24; i++){
    var cell = document.createElement('div');
    var isUnlocked = admin || (i <= unlocked);
    var isOpened = openedSet.indexOf(i) >= 0;
    cell.className = 'advent-cell' + (isUnlocked ? ' unlocked' : '') + (isOpened ? ' opened' : '');
    cell.innerHTML = isUnlocked ? (isOpened ? '✓' : i) : '<span class="lockic">🔒</span>';
    if(isUnlocked){
      (function(day){
        cell.onclick = function(){ openAdventDay(day); };
      })(i);
    } else {
      cell.title = t('adventLocked');
    }
    grid.appendChild(cell);
  }
  // Mostrar/amagar la barra d'admin
  var adminBar = document.getElementById('adventAdminBar');
  if(adminBar) adminBar.style.display = admin ? 'flex' : 'none';
}
function openAdventDay(i){
  var entry = ADVENT[i-1];
  adventOpenedDay = i;
  document.getElementById('adventSwatch').style.background =
    'rgb(' + entry.c[0] + ',' + entry.c[1] + ',' + entry.c[2] + ')';
  document.getElementById('adventMsg').textContent = entry[LANG] || entry.ca;
  document.getElementById('adventReveal').classList.add('show');
  var openedSet = [];
  try { openedSet = JSON.parse(localStorage.getItem('nadalAdventOpened') || '[]'); }
  catch(e){ openedSet = []; }
  if(openedSet.indexOf(i) < 0){
    openedSet.push(i);
    try { localStorage.setItem('nadalAdventOpened', JSON.stringify(openedSet)); } catch(e){}
  }
  buildAdventGrid();
}
function applyAdventColor(){
  if(adventOpenedDay === null) return;
  var entry = ADVENT[adventOpenedDay-1];
  state.r = entry.c[0]; state.g = entry.c[1]; state.b = entry.c[2];
  state.power = true; state.mode = 0;
  document.getElementById('powerToggle').checked = true;
  highlightEffect();
  updateRgbUI();
  sendColor();
  fetch('/api/mode?mode=0').catch(function(){});
  toast(t('sceneApplied'), 'ok');
}
function updateGates(){
  var timeReady = state.staConnected && state.ntpSynced;
  var schedGate = document.getElementById('scheduleGate');
  var schedContent = document.getElementById('scheduleContent');
  var xmasGate = document.getElementById('xmasGate');
  var xmasContent = document.getElementById('xmasContent');
  if(schedGate) schedGate.style.display = timeReady ? 'none' : 'block';
  if(schedContent) schedContent.style.display = timeReady ? 'block' : 'none';
  if(xmasGate) xmasGate.style.display = timeReady ? 'none' : 'block';
  if(xmasContent) xmasContent.style.display = timeReady ? 'block' : 'none';
  if(timeReady && state.secToXmas >= 0){
    xmasDeadline = Date.now() + state.secToXmas*1000;
    tickCountdown();
  }
}

// Admin del calendari
function toggleAdventAdmin(){
  var v = !state.adventAdmin;
  fetch('/api/advent/admin?on=' + (v ? 1 : 0)).then(function(){
    state.adventAdmin = v;
    var cb = document.getElementById('adventAdminToggle');
    if(cb) cb.checked = v;
    buildAdventGrid();
    toast(v ? '🔓 Calendari obert' : '🔒 Calendari tancat', 'ok');
  }).catch(function(){});
}
function loadAdventAdminState(){
  fetch('/api/status').then(function(r){ return r.json(); }).then(function(d){
    state.adventAdmin = !!d.adventAdmin;
    var cb = document.getElementById('adventAdminToggle');
    if(cb) cb.checked = state.adventAdmin;
  }).catch(function(){});
}

// ============================================================
// WIFI
// ============================================================
function renderStaStatus(d){
  var box = document.getElementById('staStatus');
  if(!box) return;
  box.className = 'status-box';

  if(d.connecting){
    box.classList.add('connecting');
    box.innerHTML =
      '<div class="status-title"><span class="spinner"></span> ' + t('wifiConnecting') + '...</div>' +
      '<div class="status-detail">' + t('connectingTo') + ' <b>' + d.attemptSsid + '</b> · ' +
      t('wifiAttempt') + ' ' + (d.attempts || 1) + ' ' + t('of') + ' 2</div>';
    return;
  }
  if(d.connected){
    box.classList.add('connected');
    box.innerHTML =
      '<div class="status-title">✅ <span class="ok">' + t('wifiConnected') + '</span></div>' +
      '<div class="status-detail">' +
        t('connectedTo') + ' <b>' + d.ssid + '</b><br>' +
        t('ipLabel') + ': ' + d.ip + ' · ' + t('signalLabel') + ': ' + d.rssi + ' dBm<br>' +
        t('access') + ': <a href="http://nadal.local/">http://nadal.local/</a>' +
      '</div>';
    return;
  }
  if(d.lastError && d.lastError.length > 0){
    box.classList.add('error');
    box.innerHTML =
      '<div class="status-title">❌ <span class="err">' + t('wifiFailed') + '</span></div>' +
      '<div class="status-detail">' + d.lastError + '</div>';
    return;
  }
  box.innerHTML =
    '<div class="status-title">📶 ' + t('notConnected') + '</div>' +
    '<div class="status-detail">' + t('apActive') + '</div>';
}

function loadStaStatus(){
  var box = document.getElementById('staStatus');
  if(!box) return;
  fetch('/api/wifi/status').then(function(r){ return r.json(); }).then(function(d){
    renderStaStatus(d);
    state.staConnected = d.connected;
    state.staConnecting = d.connecting;
    if(d.connecting) setTimeout(loadStaStatus, 1500);
  }).catch(function(){});
}

function scanNetworks(){
  var list = document.getElementById('netList');
  if(!list) return;
  list.innerHTML = '<div style="padding:14px;color:var(--muted);font-size:0.85rem;text-align:center;">' + t('scanning') + '</div>';
  fetch('/api/scan').then(function(r){ return r.json(); }).then(function(nets){
    if(!nets.length){
      list.innerHTML = '<div style="padding:14px;color:var(--muted);font-size:0.85rem;text-align:center;">' + t('noNetworks') + '</div>';
      return;
    }
    list.innerHTML = '';
    nets.forEach(function(n){
      var d = document.createElement('div');
      d.className = 'net-item';
      d.innerHTML = '<span>' + (n.secure ? '🔒 ' : '📶 ') + n.ssid + '</span>' +
                    '<span class="sig">' + n.rssi + ' dBm</span>';
      d.onclick = function(){ document.getElementById('ssidField').value = n.ssid; };
      list.appendChild(d);
    });
  }).catch(function(){});
}

function connectWifi(){
  var ssid = document.getElementById('ssidField').value.trim();
  var pass = document.getElementById('passField').value;
  if(!ssid){ toast(t('enterSsid'), 'err'); return; }

  var btn = document.getElementById('connectBtn');
  if(btn){
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> ' + t('wifiConnecting') + '...';
  }

  // Mostrem l'estat de "connectant" immediatament
  var box = document.getElementById('staStatus');
  if(box){
    box.className = 'status-box connecting';
    box.innerHTML =
      '<div class="status-title"><span class="spinner"></span> ' + t('wifiConnecting') + '...</div>' +
      '<div class="status-detail">' + t('connectingTo') + ' <b>' + ssid + '</b></div>';
  }

  fetch('/api/wifi/connect?ssid=' + encodeURIComponent(ssid) + '&pass=' + encodeURIComponent(pass))
    .then(function(){ setTimeout(loadStaStatus, 800); })
    .catch(function(){
      if(box){
        box.className = 'status-box error';
        box.innerHTML = '<div class="status-title">❌ <span class="err">' + t('wifiFailed') + '</span></div>' +
                        '<div class="status-detail">' + t('wifiGenericErr') + '</div>';
      }
    })
    .finally(function(){
      setTimeout(function(){
        if(btn){
          btn.disabled = false;
          btn.textContent = t('connectBtn');
        }
      }, 1500);
    });
}

function forgetWifi(){
  if(!confirm(t('confirmForget'))) return;
  fetch('/api/wifi/forget').then(function(){ toast(t('netForgotten'), 'ok'); loadStaStatus(); });
}

// ============================================================
// SISTEMA
// ============================================================
function loadSysInfo(){
  var box = document.getElementById('sysInfo');
  if(!box) return;
  fetch('/api/debug').then(function(r){ return r.json(); }).then(function(d){
    box.innerHTML =
      '<div class="debug-line"><span>' + t('apLine') + '</span><span>' + d.ap.ssid + ' · ' + d.ap.clients + ' ' + t('clients') + '</span></div>' +
      '<div class="debug-line"><span>' + t('staLine') + '</span><span class="' + (d.sta.connected ? 'ok' : '') + '">' + (d.sta.connected ? d.sta.ssid : t('disconnected')) + '</span></div>' +
      '<div class="debug-line"><span>' + t('timeLine') + '</span><span>' + d.time + '</span></div>' +
      '<div class="debug-line"><span>' + t('ntpLine') + '</span><span class="' + (d.ntpSynced ? 'ok' : 'err') + '">' + (d.ntpSynced ? t('ntpOk') : t('ntpBad')) + '</span></div>' +
      '<div class="debug-line"><span>' + t('uptimeLine') + '</span><span>' + d.uptime + '</span></div>' +
      '<div class="debug-line"><span>' + t('heapLine') + '</span><span>' + d.freeHeap + ' B</span></div>' +
      '<div class="debug-line"><span>' + t('coreLine') + '</span><span>' + d.sdkVersion + '</span></div>' +
      '<div class="debug-line"><span>' + t('chipLine') + '</span><span>' + d.chipId + '</span></div>';
  }).catch(function(){});
}
function reboot(){
  if(!confirm(t('confirmReboot'))) return;
  toast(t('rebooting'), '');
  fetch('/api/reboot').then(function(){ setTimeout(function(){ location.reload(); }, 3000); });
}

// ============================================================
// POLLING
// ============================================================
function loadStatus(){
  fetch('/api/status').then(function(r){ return r.json(); }).then(function(d){
    state.r = d.r; state.g = d.g; state.b = d.b;
    state.bright = d.bright; state.power = d.power; state.mode = d.mode;
    state.time = d.time; state.gamma = d.gamma; state.fade = d.fade;
    state.cal = d.cal;
    state.staConnected = d.sta && d.sta.connected;
    state.ntpSynced = d.ntpSynced;
    state.secToXmas = d.secToXmas;
    state.adventDay = d.adventDay;
    state.adventAdmin = !!d.adventAdmin;

    document.getElementById('powerToggle').checked = state.power;
    document.getElementById('brightSlider').value = state.bright;
    document.getElementById('brightVal').textContent = state.bright + '%';
    document.getElementById('gammaToggle').checked = state.gamma;
    document.getElementById('fadeToggle').checked = state.fade;
    document.getElementById('calR').value = state.cal.r;
    document.getElementById('calG').value = state.cal.g;
    document.getElementById('calB').value = state.cal.b;
    document.getElementById('calRVal').textContent = state.cal.r;
    document.getElementById('calGVal').textContent = state.cal.g;
    document.getElementById('calBVal').textContent = state.cal.b;

    var cbAdm = document.getElementById('adventAdminToggle');
    if(cbAdm) cbAdm.checked = state.adventAdmin;

    updateFooter();
    updateRgbUI();
    highlightEffect();
    updateGates();

    var xmas = document.getElementById('tab-xmas');
    if(xmas && xmas.classList.contains('active')){
      buildAdventGrid();
    }
  }).catch(function(){});
}

// ============================================================
// INICIALITZACIÓ
// ============================================================
window.addEventListener('load', function(){
  try { applyLanguage(); } catch(e){}
  try { loadStatus(); } catch(e){}
  setInterval(function(){
    try { loadStatus(); } catch(e){}
  }, 4000);
});
