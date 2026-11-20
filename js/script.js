/*
 * 12주차 인터랙티브반 공통 실습 시작 파일
 *
 * 현재 구현됨: 페이지 진입 애니메이션, 연도 A/B 선택에 따른 콘텐츠 전환.
 *
 * 연도 비교 부모: .unemployment-compare-section
 * 선택 버튼: .year-button-a / .year-button-b
 * 변경 대상: .year-rate / .year-description / .year-chart
 */

// 기존에 정상 작동하는 화면 진입 효과. 기능 추가 시 유지한다.
document.documentElement.classList.add('has-js');
const revealSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

// 연도 비교: 가상 학습용 데이터
const yearViewData = {
  a: {
    rate: '4.2',
    description:
      '연도 A를 선택한 초기 화면입니다. 학습용 수치를 기반으로 그래프와 설명이 표시됩니다.',
    chartSrc: 'images/year-a.svg',
    chartAlt: '가상 데이터 연도 A 실업률 추이 그래프',
  },
  b: {
    rate: '3.6',
    description:
      '연도 B를 선택한 화면입니다. 학습용 가상 데이터로 실업률이 3.6%로 표시됩니다.',
    chartSrc: 'images/year-b.svg',
    chartAlt: '가상 데이터 연도 B 실업률 추이 그래프',
  },
};

const compareSection = document.querySelector('.unemployment-compare-section');

if (compareSection) {
  const buttonA = compareSection.querySelector('.year-button-a');
  const buttonB = compareSection.querySelector('.year-button-b');
  const chartEl = compareSection.querySelector('.year-chart');
  const descriptionEl = compareSection.querySelector('.year-description');

  function setActiveButton(active) {
    const isA = active === 'a';
    buttonA.classList.toggle('active', isA);
    buttonB.classList.toggle('active', !isA);
    buttonA.setAttribute('aria-pressed', String(isA));
    buttonB.setAttribute('aria-pressed', String(!isA));
  }

  function setYearRate(value) {
    const rateEl = compareSection.querySelector('.year-rate');
    if (!rateEl) return;
    rateEl.innerHTML = `${value}<span>%</span>`;
  }

  function applyYearView(key) {
    const data = yearViewData[key];
    if (!data) return;

    setYearRate(data.rate);
    if (descriptionEl) descriptionEl.textContent = data.description;
    if (chartEl) {
      chartEl.src = data.chartSrc;
      chartEl.alt = data.chartAlt;
    }
    setActiveButton(key);
  }

  buttonA.addEventListener('click', () => applyYearView('a'));
  buttonB.addEventListener('click', () => applyYearView('b'));
}
