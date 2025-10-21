const B1 = `
10 "악마의 다라"
25 "압축/배척식 암흑 광선"
40 "압축/배척식 암흑 광선"
53 "상형문자 새김(탱버)"
74 "쉐어 폭발"
88 "왼쪽/오른쪽 회전"
100 "왼쪽/오른쪽 회전"
125 "악마의 코메테오"
153 "왼쪽/오른쪽 회전"
165 "왼쪽/오른쪽 회전"
188 "소환 (데몬)"
235 "소환 (가고일)"
`;

const B2 = `
16 "결전"
25 "조각내기(탱버)"
40 "위성 연계 공격"
53 "독 극락"
96 "독소 폭산"
111 "복수의 파이가 / 블리자가"
128 "델타 공격"
140 "중화포"
154 "위성 연계 공격"
169 "폭주 눈사람"
182 "펄쩍펄쩍 눈덩이"
215 "복수의 파이가 / 바이오가"
233 "델타 공격"
245 "조각내고 　　　(탱버)"
246 "　　　　 중화포"
261 "위성 연계 공격"
267 "화살표 등장"
296 "중화포"
358 "치고받기"
`;

const B3 = `
12 "모방된 별"
26 "용의 몸짓"
32 "모방된 비"
38 "모방된 고드름"
47 "용의 몸짓"
67 "공포 엄습(탱버)"
73 "모방된 비"
78 "얼음 회오리"
88 "용의 몸짓"
108 "공포 엄습(탱버)"
122 "쇠퇴의 시대"
137 "서리 강하"
161 "서리 강하"
177 "정령 등장"
213 "죽음의 산물"
225 "저주받은 물(디버프)"
245 "용의 몸짓"
`;

const B4 = `
15 "오라 해방"
30 "봉인 해방"
50 "암살자의 단검"
84 "포크 분노"
95 "탑 등장"
135 "현자의 지팡이 #1"
153 "현자의 지팡이 #2"
172 "오라 해방"
185 "봉인 해방"
205 "룬 도끼"
239 "포크 분노"
250 "탑 등장"
278 "암살자의 단검"
312 "봉인 해방"
331 "신성한 창"
`;

// Parse and display timeline data
function parseTimelineData(content) {
  const lines = content.trim().split('\n');

  return lines.map((line) => {
    let obj = {};
    const match = line.match(/^(\d+)\s+"(.*?)"/);
    if (match) {
        obj['time'] = parseFloat(match[1]);
        obj['description'] = match[2];
        // addDataToTimeline(time, description);
        // const time = parseInt(match[1], 10); // 시간 값
        // const description = match[2]; // 설명
        // console.log(`Time: ${obj.time}, Description: ${obj.description}`);
    }
    return obj;
  });
}

function csvToJson(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines.shift().split(",");

  return lines.map(line => {
    const values = line.split(",");
    let obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || "";
    });
    return obj;
  });
}