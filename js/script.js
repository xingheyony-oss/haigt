// ==================== 谜题库 ====================
const puzzles = [
  {
    id: 1,
    title: '海龟汤',
    face: '一个男人走进一家餐厅，点了一碗海龟汤。他喝了一口后，走出餐厅，开枪自杀了。为什么？',
    bottom: '这个男人多年前与妻子出海时遭遇海难，妻子失踪。他一直以为妻子已死。多年后，他在餐厅喝到海龟汤，发现味道与他当年在海上喝到的"海龟汤"完全不同——原来当年他喝的不是海龟汤，而是用他妻子煮的汤。意识到真相后，他崩溃自杀。',
    keywords: ['妻子','海难','失踪','味道','不同','煮','人肉','海上','船','回忆']
  },
  {
    id: 2,
    title: '酒吧与水',
    face: '一个男人走进酒吧，向酒保要了一杯水。酒保突然拔出一把枪指着他。男人愣了一下，然后说"谢谢"，高兴地走出了酒吧。为什么？',
    bottom: '这个男人正在打嗝，所以他去酒吧要一杯水想止住打嗝。酒保看出他在打嗝，于是用枪吓唬他。惊吓成功地止住了他的打嗝。所以男人说谢谢后高兴地离开。',
    keywords: ['打嗝','吓','惊吓','止住','偏方','酒吧','酒保']
  },
  {
    id: 3,
    title: '电梯之谜',
    face: '有一个男人住在10楼。每天早上他坐电梯到1楼去上班。但每天下班回来，他只会坐到7楼，然后走楼梯上10楼。为什么？（电梯没有坏，下雨天他会直接坐到10楼）',
    bottom: '这个男人是侏儒（身材矮小）。他只能按到电梯按钮的第7层。下雨天他会带伞，用伞柄可以按到第10层的按钮。',
    keywords: ['矮','侏儒','身高','按不到','按钮','伞','伞柄','下雨']
  },
  {
    id: 4,
    title: '红色高跟鞋',
    face: '一个女人买了一双红色高跟鞋，穿上后不久就死了。为什么？',
    bottom: '这个女人是马戏团的杂技演员，表演"人肉飞刀"节目。她穿着红色高跟鞋表演时，助手蒙眼投掷飞刀。但红色高跟鞋太显眼，在灯光下反光晃到了助手的眼睛，导致飞刀偏离，刺中了她。',
    keywords: ['马戏团','杂技','飞刀','表演','反光','晃眼','灯光','助手','失误']
  },
  {
    id: 5,
    title: '生日蛋糕',
    face: '一个人收到了一个生日蛋糕，但他打开后非常愤怒，把蛋糕扔在地上。为什么？',
    bottom: '这个人是盲人。他过生日时收到了一个蛋糕，非常开心。但当他打开盒子时，发现蛋糕上插满了点燃的蜡烛——他能感觉到热度。他认为这是朋友在残忍地嘲笑他的失明——明明看不见却给他点蜡烛。实际朋友们只是想给他一个正常的生日惊喜，忘记了他的盲人身份。',
    keywords: ['盲人','看不见','失明','蜡烛','火','热','嘲笑','朋友']
  },
  {
    id: 6,
    title: '对面的灯光',
    face: '一个女人每天晚上都会看到对面楼的一个房间里有一盏灯亮着。某天晚上那盏灯没有亮，她立刻打电话报了警。为什么？',
    bottom: '对面住着一位独居老人，每晚都会开灯报平安。那天灯没亮，女人担心老人出事了于是报警。警察赶到后发现老人已经去世。',
    keywords: ['老人','平安','信号','约定','邻居','独居','摔倒','去世','担心']
  },
  {
    id: 7,
    title: '半个人',
    face: '一个人住在沙漠边缘的小屋里。某天有人敲门，他打开门，看到门外只有半个人。他立刻关上门，收拾行李离开了沙漠。为什么？',
    bottom: '这个人有一个朋友住在沙漠另一边的绿洲。一天朋友穿越沙漠来访，不幸陷入流沙。路过的旅人发现了困在流沙中的朋友，但只来得及拖出上半身（朋友已经死了）。他们带着半截尸体来敲门。男人吓坏了，决定离开沙漠。',
    keywords: ['流沙','陷','埋','沙漠','死','上半身','尸体','危险','旅人']
  },
  {
    id: 8,
    title: '深夜敲门声',
    face: '凌晨3点，一个女人听到有人在敲她的门。她从猫眼看出去，外面空无一人。但敲门声仍在继续。她打开门，门外确实没有人。但当她低下头时，她尖叫了起来。为什么？',
    bottom: '门外是一个没有腿的乞丐，他用手支撑着身体在地上爬行。因为他太矮了，从猫眼看不到他。他用仅有的一只手敲门，所以女人打开门往下看时才看到他。他只是在乞讨。',
    keywords: ['乞丐','残疾人','没有腿','爬','猫眼','看不到','往下看','地上','乞讨']
  }
];

// ==================== 全局状态 ====================
let players = [];           // { name, color, avatarChar }
let hostName = '主持人';
let currentTurnIndex = 0;  // 当前轮到哪位玩家
let qaHistory = [];
let currentPuzzleIndex = 0;
let enabledPuzzles = [];
let pendingQuestion = null; // 等待主持人判断的问题
let puzzleDone = new Set(); // 已完成的谜题

let userRole = null; // 'host' | 'player'
let playerName = '';   // 玩家模式下自己的名字

const AVATAR_COLORS = ['#e8945a','#5a8dc8','#9b7fd4','#5cb88d','#c85a5a','#5aa8a0','#d4a853','#8ab45a'];

// ==================== 角色选择 ====================
function selectRole(role) {
  userRole = role;
  document.getElementById('rolePage').style.display = 'none';
  if (role === 'host') {
    document.getElementById('setupPage').style.display = 'flex';
    updateStartButton();
  } else {
    document.getElementById('playerJoinPage').style.display = 'flex';
    document.getElementById('playerNameInput').focus();
  }
}

function goBackToRole() {
  userRole = null;
  document.body.classList.remove('is-host');
  document.getElementById('playerJoinPage').style.display = 'none';
  document.getElementById('setupPage').style.display = 'none';
  document.getElementById('gamePage').style.display = 'none';
  document.getElementById('rolePage').style.display = 'flex';
}

function joinAsPlayer() {
  const input = document.getElementById('playerNameInput');
  playerName = input.value.trim();
  if (!playerName) { showToast('请输入你的名字'); return; }

  document.getElementById('playerJoinPage').style.display = 'none';
  document.getElementById('gamePage').style.display = 'flex';
  document.getElementById('displayHostName').textContent = hostName;
  document.getElementById('puzzleTotal').textContent = enabledPuzzles.length;

  currentPuzzleIndex = 0;
  puzzleDone.clear();
  qaHistory = [];
  currentTurnIndex = 0;

  updateRoleUI();
  renderPlayerPanel();
  loadPuzzle(enabledPuzzles[0]);
  showToast(`🎮 ${playerName}，欢迎加入！`);
}

function updateRoleUI() {
  const hostOnlyEls = document.querySelectorAll('.host-only');
  if (userRole === 'host') {
    hostOnlyEls.forEach(el => { el.style.display = ''; });
  } else {
    hostOnlyEls.forEach(el => { el.style.display = 'none'; });
  }
}

// ==================== 初始化设置页 ====================
document.addEventListener('DOMContentLoaded', () => {
  renderPuzzleCheckboxes();
  updateInviteUrl();
  document.getElementById('hostName').addEventListener('input', () => {
    hostName = document.getElementById('hostName').value.trim() || '主持人';
    updateInviteUrl();
  });
});

function renderPuzzleCheckboxes() {
  const container = document.getElementById('puzzleCheckboxes');
  container.innerHTML = puzzles.map((p, i) => `
    <label class="checkbox-item checked" data-index="${i}" onclick="togglePuzzle(${i}, this)">
      ${p.id}. ${p.title}
      <input type="checkbox" checked>
    </label>
  `).join('');
  enabledPuzzles = puzzles.map((_, i) => i);
}

function togglePuzzle(index, el) {
  el.classList.toggle('checked');
  const checkbox = el.querySelector('input');
  checkbox.checked = el.classList.contains('checked');
  updateEnabledPuzzles();
}

function updateEnabledPuzzles() {
  const checkboxes = document.querySelectorAll('#puzzleCheckboxes .checkbox-item');
  enabledPuzzles = [];
  checkboxes.forEach(cb => {
    if (cb.classList.contains('checked')) {
      enabledPuzzles.push(parseInt(cb.dataset.index));
    }
  });
  const btn = document.getElementById('startBtn');
  btn.textContent = enabledPuzzles.length === 0
    ? '⚠️ 请至少选择1道谜题'
    : `🚀 开始游戏（${enabledPuzzles.length}题）`;
}

function addPlayer() {
  const input = document.getElementById('newPlayerInput');
  const name = input.value.trim();
  if (!name) return;
  if (players.find(p => p.name === name)) {
    showToast('玩家名称已存在');
    return;
  }
  if (players.length >= 12) {
    showToast('最多12位玩家');
    return;
  }

  players.push({
    name: name,
    color: AVATAR_COLORS[players.length % AVATAR_COLORS.length],
    avatarChar: name[0].toUpperCase()
  });

  renderPlayerTags();
  input.value = '';
  input.focus();
  updateInviteUrl();
  updateStartButton();
}

function removePlayer(index) {
  players.splice(index, 1);
  renderPlayerTags();
  updateInviteUrl();
  updateStartButton();
}

function renderPlayerTags() {
  const container = document.getElementById('playerTags');
  container.innerHTML = players.map((p, i) => `
    <span class="player-tag">
      <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${p.color};color:#1a1a24;font-size:0.7em;font-weight:bold;">${p.avatarChar}</span>
      ${escapeHtml(p.name)}
      <span class="remove-tag" onclick="removePlayer(${i})">×</span>
    </span>
  `).join('');
}

function updateStartButton() {
  const btn = document.getElementById('startBtn');
  btn.disabled = players.length === 0 || enabledPuzzles.length === 0;
}

// ==================== 开始游戏 ====================
function startGame() {
  updateEnabledPuzzles();
  if (enabledPuzzles.length === 0) { showToast('请至少选择1道谜题'); return; }
  if (players.length === 0) { showToast('请至少添加1位玩家'); return; }

  hostName = document.getElementById('hostName').value.trim() || '主持人';

  document.getElementById('setupPage').style.display = 'none';
  document.getElementById('gamePage').style.display = 'flex';

  updateRoleUI();

  document.getElementById('displayHostName').textContent = hostName;
  document.getElementById('puzzleTotal').textContent = enabledPuzzles.length;

  currentPuzzleIndex = 0;
  puzzleDone.clear();
  qaHistory = [];
  currentTurnIndex = 0;

  renderPlayerPanel();
  loadPuzzle(enabledPuzzles[0]);
  updateInviteUrl();
}

// ==================== 玩家面板 ====================
function renderPlayerPanel() {
  const container = document.getElementById('playerPanel');
  container.innerHTML = players.map((p, i) => `
    <div class="player-card${i === currentTurnIndex ? ' active' : ''}" id="playerCard${i}">
      <span class="player-avatar" style="background:${p.color};">${p.avatarChar}</span>
      <span class="player-name">${escapeHtml(p.name)}</span>
    </div>
  `).join('');

  document.getElementById('currentTurn').textContent =
    players.length > 0 ? players[currentTurnIndex].name : '—';

  // 更新输入框状态
  updateInputState();
}

function updateInputState() {
  const input = document.getElementById('questionInput');
  const submitBtn = document.getElementById('submitBtn');
  const judgeBtns = document.getElementById('judgeBtns');

  if (players.length === 0) return;

  if (pendingQuestion !== null) {
    // 有待判断的问题
    input.disabled = true;
    submitBtn.disabled = true;
    judgeBtns.style.display = 'flex';
  } else {
    input.disabled = false;
    submitBtn.disabled = false;
    judgeBtns.style.display = 'none';
    input.placeholder = `${players[currentTurnIndex]?.name || '玩家'} 在此输入问题...`;
  }
}

// ==================== 谜题加载 ====================
function loadPuzzle(index) {
  currentPuzzleIndex = index;
  const p = puzzles[enabledPuzzles[index]];
  qaHistory = [];
  pendingQuestion = null;
  document.getElementById('soupFace').textContent = p.face;
  document.getElementById('soupBottom').textContent = p.bottom;
  document.getElementById('puzzleTitle').textContent = `题${p.id}：${p.title}`;
  document.getElementById('puzzleIndex').textContent = index + 1;
  document.getElementById('qaLog').innerHTML = '<div class="qa-empty">等待玩家提问...</div>';
  document.getElementById('qaCount').textContent = '共 0 条';
  document.getElementById('questionInput').value = '';
  document.getElementById('judgeBtns').style.display = 'none';

  currentTurnIndex = 0;
  renderPlayerPanel();
  renderPuzzleNav();
  updateInputState();

  // 高亮动画
  const card = document.getElementById('faceCard');
  card.classList.add('highlight');
  setTimeout(() => card.classList.remove('highlight'), 600);
}

function renderPuzzleNav() {
  const nav = document.getElementById('puzzleNav');
  nav.innerHTML = enabledPuzzles.map((pi, i) => {
    const p = puzzles[pi];
    let cls = 'puzzle-dot';
    if (i === currentPuzzleIndex) cls += ' active';
    else if (puzzleDone.has(pi)) cls += ' done';
    return `<button class="${cls}" onclick="switchPuzzle(${i})">${p.id}</button>`;
  }).join('');
}

function switchPuzzle(index) {
  if (index >= 0 && index < enabledPuzzles.length) {
    loadPuzzle(index);
  }
}

// ==================== 提交问题 ====================
function submitQuestion() {
  const input = document.getElementById('questionInput');
  const question = input.value.trim();
  if (!question) return;
  if (players.length === 0) return;

  const playerName = players[currentTurnIndex].name;
  pendingQuestion = { playerIndex: currentTurnIndex, playerName, question };

  // 显示在记录中（待判状态）
  addQAEntry(playerName, question, 'pending');
  input.value = '';
  updateInputState();

  document.getElementById('judgeBtns').style.display = 'flex';
}

// ==================== 主持人判断 ====================
function hostJudge(judgment) {
  if (!pendingQuestion) return;

  // 更新最后一条QA记录
  const lastEntry = qaHistory[qaHistory.length - 1];
  if (lastEntry && lastEntry.judgment === 'pending') {
    lastEntry.judgment = judgment;
  }
  refreshQALog();

  pendingQuestion = null;
  updateInputState();

  // 自动切换到下一位玩家
  if (players.length > 0) {
    currentTurnIndex = (currentTurnIndex + 1) % players.length;
    renderPlayerPanel();
  }
}

// ==================== 回合控制 ====================
function nextTurn() {
  if (pendingQuestion !== null) {
    showToast('请先对当前问题进行判断');
    return;
  }
  if (players.length === 0) return;
  currentTurnIndex = (currentTurnIndex + 1) % players.length;
  renderPlayerPanel();
  document.getElementById('questionInput').value = '';
}

function skipTurn() {
  if (pendingQuestion !== null) {
    showToast('请先对当前问题进行判断');
    return;
  }
  if (players.length === 0) return;
  currentTurnIndex = (currentTurnIndex + 1) % players.length;
  renderPlayerPanel();
  document.getElementById('questionInput').value = '';
  showToast(`已跳过，轮到 ${players[currentTurnIndex].name}`);
}

// ==================== QA记录 ====================
function addQAEntry(speaker, question, judgment) {
  qaHistory.push({ speaker, question, judgment });
  refreshQALog();
}

function refreshQALog() {
  const log = document.getElementById('qaLog');
  if (qaHistory.length === 0) {
    log.innerHTML = '<div class="qa-empty">等待玩家提问...</div>';
    document.getElementById('qaCount').textContent = '共 0 条';
    return;
  }
  document.getElementById('qaCount').textContent = `共 ${qaHistory.length} 条`;
  log.innerHTML = qaHistory.map(qa => {
    const badgeClass = qa.judgment || 'pending';
    const badgeText = qa.judgment === 'yes' ? '✅ 是' : qa.judgment === 'no' ? '❌ 否' : qa.judgment === 'irrelevant' ? '➖ 无关' : '⏳ 待判';
    return `<div class="qa-entry">
      <span class="qa-speaker">${escapeHtml(qa.speaker)}</span>
      <span class="qa-badge ${badgeClass}">${badgeText}</span>
      <span class="qa-question">${escapeHtml(qa.question)}</span>
    </div>`;
  }).join('');
  log.scrollTop = log.scrollHeight;
}

// ==================== 邀请弹窗 ====================
function showInviteModal() {
  document.getElementById('inviteModal').style.display = 'flex';
  updateInviteModalContent();
}

function closeInviteModal() {
  document.getElementById('inviteModal').style.display = 'none';
}

function updateInviteModalContent() {
  updateInviteUrl();
  document.getElementById('invitePlayerList').textContent =
    '👑 ' + hostName + '（主持人）  |  👥 ' + players.map(p => p.name).join('、');
}

function updateInviteUrl() {
  document.getElementById('inviteUrl').textContent = window.location.href;
}

function copyInviteLink() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('✅ 链接已复制！分享给朋友们吧'));
  } else {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✅ 链接已复制！分享给朋友们吧');
  }
}

// ==================== 重置 ====================
function resetGame() {
  if (pendingQuestion !== null) {
    if (!confirm('还有待判断的问题，确定要退出吗？')) return;
  }
  if (userRole === 'host') {
    document.getElementById('setupPage').style.display = 'flex';
  }
  document.getElementById('gamePage').style.display = 'none';
  puzzleDone.clear();
  qaHistory = [];
  pendingQuestion = null;
  currentTurnIndex = 0;
  if (userRole === 'host') {
    updateStartButton();
  } else {
    document.getElementById('rolePage').style.display = 'flex';
    userRole = null;
  }
}

// ==================== 工具函数 ====================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove('show'), 2000);
}

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', (e) => {
  // 设置页：Enter添加玩家
  if (document.getElementById('setupPage').style.display !== 'none') {
    if (e.key === 'Enter' && document.activeElement === document.getElementById('newPlayerInput')) {
      e.preventDefault();
      addPlayer();
    }
    return;
  }

  // 游戏页快捷键
  if (e.target.tagName === 'INPUT') return; // 不在输入框时

  if (e.key === 'y' || e.key === 'Y') hostJudge('yes');
  if (e.key === 'n' || e.key === 'N') hostJudge('no');
  if (e.key === 'i' || e.key === 'I') hostJudge('irrelevant');
  if (e.key === 'ArrowRight' && e.ctrlKey) nextTurn();
  if (e.key === '/' && !e.ctrlKey) {
    e.preventDefault();
    document.getElementById('questionInput').focus();
  }
  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    const details = document.querySelector('details');
    if (details) details.open = !details.open;
  }
});
