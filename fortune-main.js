// 메인 사주 UI/풀이, 이벤트 관리
document.getElementById('fortuneForm').onsubmit = function(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const birthdate = new Date(document.getElementById('birthdate').value);
  const birthhour = parseInt(document.getElementById('birthhour').value, 10);

  if(isNaN(birthhour)||birthhour<0||birthhour>23){
    alert('태어난 시를 정확히 입력하세요.');
    return;
  }

  let yearInfo = getYearGanZhi(birthdate.getFullYear());
  let monthInfo = getMonthGanZhi(yearInfo.tgIdx, birthdate.getMonth());
  let dayInfo = getDayGanZhi(birthdate);
  let hourInfo = getHourGanZhi(dayInfo.tgIdx, birthhour);

  let elements = [0,0,0,0,0];
  [yearInfo, monthInfo, dayInfo, hourInfo].forEach(i=>{
    elements[["목","화","토","금","수"].indexOf(TG_ELEMENT[i.tgIdx])] += 1;
    elements[["목","화","토","금","수"].indexOf(TZ_ELEMENT[i.tzIdx])] += 1;
  });

  let elementDesc = getElementDesc(elements);
  let todayLuck = getTodayFortune(["목","화","토","금","수"][elements.indexOf(Math.max(...elements))], gender);

  let ilganIdx = dayInfo.tgIdx;
  let jiseongDesc = JISEONG_DESC[ilganIdx];

  const resultHTML = `
    <div class="section">
      <h3>사주 팔자(명리학 간지)</h3>
      <div class="desc">
        <b>년주:</b> ${yearInfo.tg} ${yearInfo.tz} <br>
        <b>월주:</b> ${monthInfo.tg} ${monthInfo.tz} <br>
        <b>일주:</b> ${dayInfo.tg} ${dayInfo.tz} <br>
        <b>시주:</b> ${hourInfo.tg} ${hourInfo.tz}
      </div>
    </div>
    <div class="section">
      <h3>오행 및 기운 분석</h3>
      <div class="desc">
        ${elementDesc}
        <br>( 목 : ${elements[0]}, 화 : ${elements[1]}, 토 : ${elements[2]}, 금 : ${elements[3]}, 수 : ${elements[4]} )
      </div>
    </div>
    <div class="section">
      <h3>주요 성격/직업 키워드</h3>
      <div class="desc">${jiseongDesc}</div>
    </div>
    <div class="fortune section">
      <h3>오늘의 운세</h3>
      <div>${todayLuck}</div>
    </div>
    <hr>
    <span style="font-size:14px;color:#888">(결과는 기본 명리학 공식에 의한 예시 풀이입니다. 실제 해석은 전문가 상담을 참고하세요)</span>
  `;
  document.getElementById('result').style.display = 'block';
  document.getElementById('result').innerHTML = `<b>${name}</b>님의 풀이<br><br>` + resultHTML;
}
