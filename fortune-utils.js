// 명리학 공식, 운세 계산 함수별 분리

// 년주(간지)계산: 1864년 갑자 시작
function getYearGanZhi(year) {
  let idx = year - 1864;
  let tgIdx = idx % 10;
  let tzIdx = idx % 12;
  return {
    tg: TG[tgIdx < 0 ? tgIdx + 10 : tgIdx],
    tz: TZ[tzIdx < 0 ? tzIdx + 12 : tzIdx],
    tgIdx,
    tzIdx
  };
}

// 월주 계산 (간략/간지 공식 단순화)
function getMonthGanZhi(yearTgIdx, month) {
  // 월간: 년천간에 따라 보정(명리 정석 공식 생략, 간단 버전)
  const tgIdx = (yearTgIdx * 2 + (month + 1)) % 10;
  const tzIdx = (month + 1) % 12; // 1월=인(2)
  return {
    tg: TG[tgIdx],
    tz: TZ[tzIdx],
    tgIdx,
    tzIdx
  };
}

// 일주 계산: 1900-01-01 기준의 간지
function getDayGanZhi(date) {
  const base = new Date('1900-01-01');
  const diff = Math.floor((date - base) / (1000 * 60 * 60 * 24));
  const tgIdx = diff % 10;
  const tzIdx = diff % 12;
  return {
    tg: TG[tgIdx < 0 ? tgIdx + 10 : tgIdx],
    tz: TZ[tzIdx < 0 ? tzIdx + 12 : tzIdx],
    tgIdx,
    tzIdx
  };
}

// 시주 계산: 일간 기준, 2시간 단위
function getHourGanZhi(dayTgIdx, hour) {
  const tzIdx = Math.floor(((hour + 1) % 24) / 2);
  const tgIdx = (dayTgIdx * 2 + tzIdx) % 10;
  return {
    tg: TG[tgIdx],
    tz: TZ[tzIdx],
    tgIdx,
    tzIdx
  };
}

// 오행 분석
function getElementDesc(elements) {
  const arr = ["목", "화", "토", "금", "수"];
  let main = arr[elements.indexOf(Math.max(...elements))];
  let weak = arr[elements.indexOf(Math.min(...elements))];
  let text =
    `오행 중 <span class='keyword'>${main}</span>의 기운이 상대적으로 강하며, <span class='keyword'>${weak}</span> 기운이 약합니다.<br>균형있는 삶을 위해 약한 오행(기운)의 보완이 도움이 됩니다.`;
  return text;
}

// 오늘 운세 추천
function getTodayFortune(element, gender) {
  let arr = LUCKS[element];
  const idx = new Date().getDate() % arr.length;
  return arr[idx];
}
