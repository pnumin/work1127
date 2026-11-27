// ============================================================================
// Data: 대학 AI 활용 윤리 가이드라인 (교육부 · 한국대학교육협의회, 2026.08)
// ============================================================================
const PRINCIPLES = [
  {
    id: "01",
    name: "학문적 진실성",
    summary: "교육 목적과 원칙에 따라 AI를 활용하며, 학습의 전 과정에서 윤리적 기준을 준수합니다.",
    subs: [
      { title: "① 학문적 윤리 준수", desc: "소속 기관의 학문 윤리 및 AI 활용 지침을 준수하고, 교육 목적에 맞게 사용하며 잠재적 위험성을 인지합니다." },
      { title: "② 인용 및 출처 표기", desc: "정해진 기준(APA, MLA 등)에 따라 AI 활용 방식과 범위, 인용 및 출처를 명확히 표기합니다." }
    ]
  },
  {
    id: "02",
    name: "인간 중심성과 책임성",
    summary: "AI는 인간의 가치를 존중하는 범위 내에서 활용하며, 최종 의사결정 권한과 책임은 사용자에게 있습니다.",
    subs: [
      { title: "③ 결과에 대한 책임", desc: "의사결정 통제권을 유지하고 신중하게 활용하며, 결과에 대한 최종 책임을 다합니다." },
      { title: "④ 상호합의적 활용", desc: "교수자와 학습자가 상호 합의를 바탕으로 규칙을 지도하고 지침을 숙지·수용합니다." },
      { title: "⑤ 인간 중심 결정", desc: "자율성·존엄·인권을 존중하며, AI 생성물 사용에 관한 최종 판단과 결정은 인간이 내립니다." }
    ]
  },
  {
    id: "03",
    name: "투명성과 신뢰성",
    summary: "AI 사용 사실과 과정을 투명하게 공개하고, 결과에 대한 사실을 검증하여 정보의 정확성을 유지합니다.",
    subs: [
      { title: "⑥ 사용 사실 공개", desc: "작업 산출물에 AI를 활용한 경우 사용 사실과 범위, 내용을 투명하게 공개합니다." },
      { title: "⑦ 사용 과정 공개", desc: "활용 범위·목적, 판단 근거 및 의사결정 과정(프롬프트, 재구성 방식 등)을 명확히 설명합니다." },
      { title: "⑧ 정보 검증 의무", desc: "오류·편향·환각(Hallucination) 가능성을 인지하고 신뢰할 수 있는 1차 문헌·데이터로 검증합니다." }
    ]
  },
  {
    id: "04",
    name: "공정성",
    summary: "개인과 집단의 특성과 배경에 따른 차별 없이 모든 사용자가 AI를 공정하게 사용할 수 있어야 합니다.",
    subs: [
      { title: "⑨ 형평성과 비차별 원칙", desc: "성별·인종·사회적 배경에 따른 차별이나 일반화가 발생하지 않도록 검토 후 수정·재구성합니다." },
      { title: "⑩ 포용성", desc: "장애 학생을 포함해 AI 접근성이 취약한 모든 학습자가 포용적이고 공평하게 활용할 수 있어야 합니다." }
    ]
  },
  {
    id: "05",
    name: "정보 보호 및 보안",
    summary: "AI 활용 과정에서 입력되는 정보의 보안 원칙을 이해하고, 개인·집단의 정보 보호와 안전성을 고려합니다.",
    subs: [
      { title: "⑪ 개인정보 및 보안", desc: "입력 정보의 제3자 수집 가능성을 인지하고 개인정보, 기밀·민감 정보, 비공개 수업자료 입력을 금지합니다." },
      { title: "⑫ 안전성", desc: "대학이 승인했거나 기술적 안전성이 검증된 AI 도구를 활용하며 과도한 의존을 경계합니다." }
    ]
  }
];

const SCOPE_DATA = {
  ban: {
    badge: "유형 1 · 사용 금지",
    syllabus: "[강의계획서 예시] 본 과목은 기초 지식 및 핵심 역량 형성을 목표로 하므로, 수업 활동·과제·시험 전 과정에서 생성형 AI 사용을 전면 금지합니다. AI 사용 시 학문적 부정행위로 간주됩니다.",
    note: "교수자는 AI 사용을 허용하지 않는 합리적 근거를 첫 수업 시간에 명확히 설명해야 합니다."
  },
  limited: {
    badge: "유형 2 · 제한적 사용",
    syllabus: "[강의계획서 예시] 본 과목은 교수자가 사전 승인한 과제(예: 아이디어 탐색, 문장 교정)에 한해 지정된 AI 도구 사용을 허용합니다. 사용 시 도구명, 사용 목적, 프롬프트 및 출처를 반드시 명시해야 합니다.",
    note: "사용 사실을 공개하지 않고 제출하면 출처 미인용(표절)과 동일한 문제로 판단할 수 있습니다."
  },
  allow: {
    badge: "유형 3 · 사용 허용 (자유 사용)",
    syllabus: "[강의계획서 예시] 본 과목은 수업 및 과제 수행 시 제약 없이 AI 활용을 허용합니다. 단, AI 생성물을 학습자의 검토·수정 없이 그대로 제출할 경우 부정행위에 해당할 수 있으며, 출처 표기가 필수입니다.",
    note: "교수자는 단순 요약이 아닌 비판적 분석과 창의적 사고력을 요구하는 과제를 설계합니다."
  }
};

const ROLE_CARDS = {
  instructor: [
    {
      num: "01",
      title: "방침 설정 및 상호 합의",
      items: [
        "강의 목적·평가 방식을 고려해 3단계 활용 범위 설정 및 강의계획서 명시",
        "첫 수업 시간에 구두 설명 및 질의응답으로 오해 방지",
        "팀티칭·조교 간 AI 활용 지침 일관되게 공유"
      ]
    },
    {
      num: "02",
      title: "부정행위 예방 및 소명 보장",
      items: [
        "APA·MLA 스타일 출처 표기 및 수정·가공 사용 지도",
        "수행 과정, 구두 확인, 단계별 산출물 등 정성적 평가 병행",
        "부정행위 판단 전 면담·소명 절차를 통해 충분한 소명 기회 보장"
      ]
    },
    {
      num: "03",
      title: "과제·평가 설계 및 탐지 도구 한계",
      items: [
        "과정 중심·문제 해결·사례 분석 과제 권장 (단순 암기·번역·요약 지양)",
        "오프라인 시험 권장, 온라인 시 서술형·구술 인터뷰·배점 분산",
        "AI 탐지 도구는 참고자료로만 활용하며 징계의 결정적 증거로 불인정"
      ]
    }
  ],
  student: [
    {
      num: "01",
      title: "방침 확인 및 본인 책임 원칙",
      items: [
        "강의계획서·공지사항 확인 및 불분명 시 반드시 교수자에게 사전 확인",
        "AI는 학습 보조 도구로만 활용하며 오류·최신성 결여 한계 인식",
        "결과물의 진실성, 성적, 저작권·초상권 등 모든 책임은 본인에게 있음"
      ]
    },
    {
      num: "02",
      title: "사용 공개 및 2차 자료 검증",
      items: [
        "사용 도구, 단계, 프롬프트, 재구성 방식 등 요구 사항 투명 공개",
        "AI 생성 정보를 2차 자료로 간주해 신뢰할 수 있는 1차 출처로 검증",
        "편향·차별 표현 발견 시 그대로 쓰지 않고 수정·재구성"
      ]
    },
    {
      num: "03",
      title: "6대 부정행위 및 입력 금지 정보",
      items: [
        "허용되지 않은 과목/방식 사용, 사용 사실 미공개, 가공 없는 복붙·출처 미표기·무단 공유 금지",
        "개인정보(이름·학번 등), 비공개 수업·시험 자료, 기밀·미발표 연구 절대 입력 금지",
        "외부 서비스 약관 확인 및 대학 승인·허용 도구 우선 사용"
      ]
    }
  ]
};

const QUIZ_DATA = [
  {
    q: "Q1. AI 사용이 '자유롭게 허용'된 수업이라면, AI가 작성한 글이나 코드를 수정 없이 그대로 제출해도 문제가 없다.",
    answer: "X",
    explain: "사용이 허용된 경우라도 학습자의 검토 및 수정 없이 그대로 제출할 경우 부정행위(표절)에 해당할 수 있으며, 사용 부분 명시와 출처 표기가 필요합니다."
  },
  {
    q: "Q2. AI 탐지 도구에서 높은 AI 생성 확률이 나왔다면, 별도 확인 없이 그 결과만으로 부정행위 징계를 확정할 수 있다.",
    answer: "X",
    explain: "현 시점에서 AI 탐지 도구의 정확도와 신뢰도에는 한계가 있으므로 참고자료로만 활용해야 하며, 징계의 결정적 증거로 인정하지 않습니다. 판단 전 충분한 소명 기회도 보장해야 합니다."
  },
  {
    q: "Q3. 강의계획서에 AI 활용 가능 여부가 명확히 적혀 있지 않다면, 학습자는 사전에 교수자에게 확인하고 동의를 받아야 한다.",
    answer: "O",
    explain: "활용 가능 여부가 불분명하거나 명확하지 않은 경우 반드시 사전에 교수자에게 확인하고 동의를 받은 후 활용해야 합니다."
  },
  {
    q: "Q4. 교수자가 학생이 제출한 과제나 비공개 시험 문제를 AI 도구에 입력해 채점·요약에 활용하는 것은 정보 보안상 금지된다.",
    answer: "O",
    explain: "과제, 시험 문제, 학생이 제출한 과제, 교수자 피드백 등 비공개 학습자료와 개인정보·기밀 정보는 AI 도구에 절대 입력하지 않아야 합니다."
  },
  {
    q: "Q5. AI가 제공한 정보나 참고문헌은 허위·편향·환각(Hallucination)이 있을 수 있으므로 1차 문헌과 대조해 검증해야 한다.",
    answer: "O",
    explain: "AI 생성 정보는 2차 자료로 간주하고 신뢰할 수 있는 1차 문헌·데이터로 사실 여부를 직접 검증한 뒤 재구성해야 합니다."
  }
];

const CHECKLISTS = {
  instructor_guide: [
    "강의 목적·학습 목표·평가 방법을 고려해 자체 AI 활용 방침을 수립했는가?",
    "강의계획서에 AI 활용 방침(범위·출처·부정행위 기준 등)을 명시했는가?",
    "첫 수업 시간에 AI 활용 방침과 근거를 설명하고 학습자와 논의했는가?",
    "AI 생성물의 사실 검증 의무 및 수정·출처 표기(표절 예방)를 안내했는가?",
    "AI 활용으로 발생하는 모든 문제의 책임이 사용자 본인에게 있음을 안내했는가?",
    "개인정보 및 민감·기밀 정보 입력 금지 유의사항을 안내했는가?",
    "AI 활용의 장점과 한계, 과도한 의존 주의사항을 충분히 설명했는가?",
    "AI 활용 관련 부정행위 판단 전 학습자에게 충분한 소명 기회를 보장했는가?"
  ],
  instructor_self: [
    "소속 기관의 학문 윤리 및 AI 활용 지침을 확인했는가?",
    "강의자료에 AI 생성물을 포함한 경우 인용 및 출처를 표기하였는가?",
    "강의자료의 AI 생성물에 대해 사실 여부 검증 및 차별적 표현 검토를 거쳤는가?",
    "모든 구성원이 공평하게 접근·활용할 수 있는 AI 도구로 수업을 설계하였는가?",
    "개인정보 및 비공개 수업·시험 자료 입력 금지 유의사항을 인지했는가?",
    "시험 문제 출제 시 AI가 생성할 수 있는 답변을 사전에 검토해 변별력을 점검했는가?",
    "AI 탐지 도구를 전적으로 신뢰할 수 없음을 인지하고 참고자료로만 고려했는가?"
  ],
  student_self: [
    "강의계획서 및 공지사항에 명시된 AI 활용 방침을 확인했는가?",
    "AI를 학습 목표 달성을 위한 보조도구로 신중하게 활용했는가?",
    "교수자가 지정한 인용 및 출처 표기 방법(또는 APA/MLA)에 따라 출처를 표기했는가?",
    "AI 생성물을 가공 없이 그대로 사용하거나 출처를 누락하면 표절임을 인지했는가?",
    "AI 생성물에 대해 신뢰할 수 있는 출처로 사실 여부를 검증했는가?",
    "AI 활용으로 발생하는 모든 책임(성적·저작권 등)이 본인에게 있음을 인지했는가?",
    "개인정보 및 비공개 수업·과제·시험 자료를 입력하지 않았는가?",
    "대학이 공식 승인하고 교수자가 허용한 AI 도구를 활용했는가?"
  ]
};

// ============================================================================
// Search Index & Rendering
// ============================================================================
const SEARCH_ITEMS = [
  ...PRINCIPLES.flatMap(p => [
    { cat: `핵심원칙 ${p.id}`, title: p.name, text: p.summary },
    ...p.subs.map(s => ({ cat: p.name, title: s.title, text: s.desc }))
  ]),
  ...ROLE_CARDS.instructor.map(c => ({ cat: "교수자 가이드", title: c.title, text: c.items.join(" / ") })),
  ...ROLE_CARDS.student.map(c => ({ cat: "학습자 가이드", title: c.title, text: c.items.join(" / ") }))
];

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchResultsBox = document.getElementById("searchResultsBox");
const quickTags = document.getElementById("quickTags");

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  if (!q || q === "all") {
    searchResultsBox.classList.add("hidden");
    searchResultsBox.innerHTML = "";
    return;
  }
  const matches = SEARCH_ITEMS.filter(
    it => it.cat.toLowerCase().includes(q) || it.title.toLowerCase().includes(q) || it.text.toLowerCase().includes(q)
  );
  searchResultsBox.classList.remove("hidden");
  if (matches.length === 0) {
    searchResultsBox.innerHTML = `<div class="sr-item"><strong>"${escapeHtml(query)}"</strong>에 대한 검색 결과가 없습니다.</div>`;
    return;
  }
  searchResultsBox.innerHTML = matches
    .slice(0, 6)
    .map(m => `
      <div class="sr-item">
        <span class="sr-cat">${escapeHtml(m.cat)}</span>
        <strong>${escapeHtml(m.title)}</strong>
        <p style="font-size:13px; color:#5c4d4e; margin-top:4px;">${escapeHtml(m.text)}</p>
      </div>
    `).join("");
}

searchInput.addEventListener("input", () => {
  quickTags.querySelectorAll(".q-tag").forEach(b => b.classList.remove("active"));
  renderSearchResults(searchInput.value);
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderSearchResults("");
  quickTags.querySelectorAll(".q-tag").forEach((b, i) => b.classList.toggle("active", i === 0));
});

quickTags.addEventListener("click", (e) => {
  const btn = e.target.closest(".q-tag");
  if (!btn) return;
  quickTags.querySelectorAll(".q-tag").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  if (f === "all") {
    searchInput.value = "";
    renderSearchResults("");
  } else {
    searchInput.value = f;
    renderSearchResults(f);
  }
});

// ============================================================================
// 5 Core Principles Explorer
// ============================================================================
const principleTabs = document.getElementById("principleTabs");
const principleDetail = document.getElementById("principleDetail");
let activePrincipleIdx = 0;

function renderPrinciples() {
  principleTabs.innerHTML = PRINCIPLES.map((p, idx) => `
    <button class="p-tab ${idx === activePrincipleIdx ? "active" : ""}" data-idx="${idx}" role="tab" aria-selected="${idx === activePrincipleIdx}">
      <span class="p-num">${p.id}</span>
      <span class="p-label">${p.name}</span>
    </button>
  `).join("");

  const cur = PRINCIPLES[activePrincipleIdx];
  principleDetail.innerHTML = `
    <h3 style="font-size:19px; margin-bottom:6px;">${cur.id}. ${cur.name}</h3>
    <p style="font-size:14px; color:#5c4d4e;">${cur.summary}</p>
    <div class="sub-principles-grid">
      ${cur.subs.map(s => `
        <div class="sub-p-box">
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>
      `).join("")}
    </div>
  `;
}

principleTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".p-tab");
  if (!btn) return;
  activePrincipleIdx = Number(btn.dataset.idx);
  renderPrinciples();
});

// ============================================================================
// Role Switcher & 3-Stage Scope Simulator
// ============================================================================
const scopeButtons = document.getElementById("scopeButtons");
const scopeOutput = document.getElementById("scopeOutput");
const roleCardsGrid = document.getElementById("roleCardsGrid");
let currentRole = "instructor";
let currentScope = "ban";

function renderScope() {
  const d = SCOPE_DATA[currentScope];
  scopeOutput.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:8px;">
      <strong>${d.badge}</strong>
      <button type="button" class="mini-btn" id="copySyllabusBtn">강의계획서 예시 복사</button>
    </div>
    <p style="margin-bottom:6px; color:#2b2728;">${d.syllabus}</p>
    <p style="font-size:12.5px; color:#8e6464;">💡 ${d.note}</p>
  `;
  document.getElementById("copySyllabusBtn").addEventListener("click", () => {
    copyText(d.syllabus, "강의계획서 예시 문구가 복사되었습니다!");
  });
}

scopeButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".scope-btn");
  if (!btn) return;
  scopeButtons.querySelectorAll(".scope-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentScope = btn.dataset.scope;
  renderScope();
});

function renderRoleCards() {
  const list = ROLE_CARDS[currentRole];
  roleCardsGrid.innerHTML = list.map(c => `
    <article class="memo-card">
      <div class="memo-badge">${c.num}</div>
      <h3>${c.title}</h3>
      <ul>${c.items.map(it => `<li>${escapeHtml(it)}</li>`).join("")}</ul>
    </article>
  `).join("");
}

document.querySelector("#roles .role-toggle").addEventListener("click", (e) => {
  const btn = e.target.closest(".role-btn");
  if (!btn) return;
  document.querySelectorAll("#roles .role-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentRole = btn.dataset.role;
  renderRoleCards();
});

// ============================================================================
// Interactive O/X Quiz
// ============================================================================
const quizCard = document.getElementById("quizCard");
const quizScorePill = document.getElementById("quizScorePill");
let quizIdx = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {
  quizScorePill.textContent = `점수: ${quizScore} / ${QUIZ_DATA.length}`;
  if (quizIdx >= QUIZ_DATA.length) {
    quizCard.innerHTML = `
      <h3 style="font-size:19px; margin-bottom:8px;">퀴즈 완료! 🎉</h3>
      <p style="font-size:14.5px; color:#5c4d4e; margin-bottom:16px;">
        총 <strong>${QUIZ_DATA.length}문제 중 ${quizScore}문제</strong>를 맞히셨습니다.
      </p>
      <button type="button" class="primary-btn" style="max-width:220px;" id="restartQuizBtn">다시 풀기</button>
    `;
    document.getElementById("restartQuizBtn").addEventListener("click", () => {
      quizIdx = 0;
      quizScore = 0;
      quizAnswered = false;
      renderQuiz();
    });
    return;
  }

  const item = QUIZ_DATA[quizIdx];
  quizCard.innerHTML = `
    <span class="kicker">QUESTION ${quizIdx + 1} OF ${QUIZ_DATA.length}</span>
    <p class="quiz-q">${escapeHtml(item.q)}</p>
    <div class="quiz-actions">
      <button type="button" class="ox-btn" data-ans="O" ${quizAnswered ? "disabled" : ""}>O (그렇다)</button>
      <button type="button" class="ox-btn" data-ans="X" ${quizAnswered ? "disabled" : ""}>X (아니다)</button>
    </div>
    <div id="quizFeedback"></div>
  `;

  quizCard.querySelectorAll(".ox-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const pick = btn.dataset.ans;
      const ok = pick === item.answer;
      if (ok) quizScore++;
      quizScorePill.textContent = `점수: ${quizScore} / ${QUIZ_DATA.length}`;

      quizCard.querySelectorAll(".ox-btn").forEach(b => (b.disabled = true));
      document.getElementById("quizFeedback").innerHTML = `
        <div class="quiz-feedback">
          <strong>${ok ? "✅ 정답입니다!" : `❌ 오답입니다. (정답: ${item.answer})`}</strong>
          <p style="margin-top:6px;">${escapeHtml(item.explain)}</p>
          <button type="button" class="mini-btn" style="margin-top:10px; padding:6px 14px;" id="nextQuizBtn">
            ${quizIdx + 1 < QUIZ_DATA.length ? "다음 문제 →" : "결과 보기 →"}
          </button>
        </div>
      `;
      document.getElementById("nextQuizBtn").addEventListener("click", () => {
        quizIdx++;
        quizAnswered = false;
        renderQuiz();
      });
    });
  });
}

// ============================================================================
// Interactive Checklist & Contribution Calculator
// ============================================================================
const checkTabs = document.getElementById("checkTabs");
const checklistItems = document.getElementById("checklistItems");
const checkProgressLabel = document.getElementById("checkProgressLabel");
const checkProgressBar = document.getElementById("checkProgressBar");
const resetChecklistBtn = document.getElementById("resetChecklistBtn");

let activeCheckKey = "instructor_guide";
let checkState = JSON.parse(localStorage.getItem("ai_ethics_checks_v1") || "{}");

function renderChecklist() {
  const list = CHECKLISTS[activeCheckKey];
  const saved = checkState[activeCheckKey] || [];
  checklistItems.innerHTML = list.map((text, idx) => {
    const checked = Boolean(saved[idx]);
    return `
      <li>
        <label class="${checked ? "done" : ""}">
          <input type="checkbox" data-idx="${idx}" ${checked ? "checked" : ""} />
          <span>${escapeHtml(text)}</span>
        </label>
      </li>
    `;
  }).join("");

  const doneCount = list.filter((_, i) => Boolean(saved[i])).length;
  const pct = Math.round((doneCount / list.length) * 100);
  checkProgressLabel.textContent = `완료: ${doneCount} / ${list.length} (${pct}%)`;
  checkProgressBar.style.width = `${pct}%`;
}

checklistItems.addEventListener("change", (e) => {
  const cb = e.target;
  if (cb.type !== "checkbox") return;
  const idx = Number(cb.dataset.idx);
  if (!checkState[activeCheckKey]) checkState[activeCheckKey] = [];
  checkState[activeCheckKey][idx] = cb.checked;
  localStorage.setItem("ai_ethics_checks_v1", JSON.stringify(checkState));
  renderChecklist();
});

checkTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".role-btn");
  if (!btn) return;
  checkTabs.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCheckKey = btn.dataset.check;
  renderChecklist();
});

resetChecklistBtn.addEventListener("click", () => {
  checkState[activeCheckKey] = [];
  localStorage.setItem("ai_ethics_checks_v1", JSON.stringify(checkState));
  renderChecklist();
  showToast("현재 체크리스트를 초기화했습니다.");
});

// Contribution Report Builder
const repCourse = document.getElementById("repCourse");
const repTool = document.getElementById("repTool");
const repStage = document.getElementById("repStage");
const repSlider = document.getElementById("repSlider");
const aiPctText = document.getElementById("aiPctText");
const mePctText = document.getElementById("mePctText");
const reportPreview = document.getElementById("reportPreview");
const copyReportBtn = document.getElementById("copyReportBtn");

function updateReportPreview() {
  const aiPct = Number(repSlider.value);
  const mePct = 100 - aiPct;
  aiPctText.textContent = `${aiPct}%`;
  mePctText.textContent = `${mePct}%`;

  const course = repCourse.value.trim() || "(과목명 미입력)";
  const tool = repTool.value.trim() || "(사용 AI 도구 미입력)";
  const stage = repStage.value.trim() || "(활용 단계 미입력)";

  reportPreview.textContent =
`[AI 활용 내역 자가 보고서]
- 과목명: ${course}
- 사용한 AI 도구: ${tool}
- 주요 활용 단계: ${stage}
- 기여도 평가: AI 기여도 ${aiPct}% / 본인 기여도 ${mePct}%
- 검증 확인: AI 생성 결과물의 사실 여부 및 출처를 직접 검증·재구성하였습니다.`;
}

[repCourse, repTool, repStage, repSlider].forEach(el => el.addEventListener("input", updateReportPreview));
copyReportBtn.addEventListener("click", () => {
  copyText(reportPreview.textContent, "AI 활용 보고서 문구가 복사되었습니다!");
});

// ============================================================================
// Utilities
// ============================================================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function copyText(text, msg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(msg)).catch(() => showToast("복사에 실패했습니다."));
  } else {
    showToast(msg);
  }
}

// ============================================================================
// Video Chapter Jump Controls
// ============================================================================
const guideVideo = document.getElementById("guideVideo");
const videoChapters = document.getElementById("videoChapters");

if (guideVideo && videoChapters) {
  videoChapters.addEventListener("click", (e) => {
    const btn = e.target.closest(".chapter-btn");
    if (!btn) return;
    videoChapters.querySelectorAll(".chapter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    guideVideo.currentTime = Number(btn.dataset.time) || 0;
    guideVideo.play().catch(() => {});
  });
}

// Initialize App
renderPrinciples();
renderScope();
renderRoleCards();
renderQuiz();
renderChecklist();
updateReportPreview();
