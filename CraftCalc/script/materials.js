const CJOBS = [ '목수', '대장', '갑주', '보석', '가죽', '재봉', '연금', '요리', '대장/갑주' ];

class Material {
  constructor(num, crafter, name = '', materials = []) {
    this.num = num;
    this.crafter = crafter;
    this.name = name;
    this.materials = materials;
  }
};


function ReadMaterials(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines.shift().split(",");
  // #,제작,이름,q,item,q,item,q,item,q,item,q,item

  return lines.map(line => {
    const values = line.split(",");

    let mrecipe = new Material(
      Number(values[0].trim()), //isNaN(values[0]) ? values[0] :
      CJOBS.indexOf(values[1].trim()), //; // 제작
      values[2].trim(), // 이름
    );
    // materials
    for (let i = 3; i < values.length - 1; i += 2) {
      if ((values[i] && values[i].trim() !== "")
        // && (values[i+1] && values[i+1].trim() !== "")
      ) {
        let matrials = {
          'amount': Number(values[i]),
          'material': values[i + 1].trim()
        };
        mrecipe.materials.push(matrials);
      }
    }

    return mrecipe;
  });
}

const csv740m = `
#,제작,이름,q,재료,q,재료,q,재료,q,재료
21,목수,개송양나무 목재,4,개송양나무 원목,2,침투성 방부 도료,,,,
22,대장/갑주,옥타헤드라이트 덩어리,4,옥타헤드라이트,2,샬로니 코크스,,,,
23,보석,능망간석,4,능망간석 원석,2,신왕국 연마제,,,,
24,가죽,크로노피오 가죽,4,샬로니 커피,2,크로노피오 생가죽,,,,
25,재봉,디아트리마 펠트,4,코치닐 염료,2,디아트리마 털,,,,
26,연금,힘의 보석수,1,섬전암,1,야크텔 천연수,1,바람 파슬리,1,황금의 에테르 모래
27,연금,민첩성의 보석수,1,섬전암,1,야크텔 천연수,1,코자말루 캐모마일,1,황금의 에테르 모래
28,연금,활력의 보석수,1,섬전암,1,야크텔 천연수,1,바람 월계수잎,1,황금의 에테르 모래
29,연금,지능의 보석수,1,섬전암,1,야크텔 천연수,1,유칼립투스,1,황금의 에테르 모래
30,연금,정신력의 보석수,1,섬전암,1,야크텔 천연수,1,진주풀,1,황금의 에테르 모래
1,목수,연호두나무 목재,5,연호두나무 원목,,,,,,
2,대장/갑주,흑철 주괴,5,흑철 광석,1,마그네시아 가루,,,,
3,보석,흑성옥,3,흑성옥 원석,1,마그네시아 숫돌,,,,
4,가죽,가르강튀아 가죽,4,가르강튀아 생가죽,1,에블라나 명반,,,,
5,재봉,선더야드 비단,5,번개고치,,,,,,
6,연금,텅스텐 마법 잉크,2,코발트 텅스텐 광석,1,챠이챠 칼날발톱,1,하늘물,1,무지개목화
11,광부,환암의 에테르 모래,,,,,,,,
12,원예,환엽의 에테르 모래,,,,,,,,
13,어부,환해의 에테르 모래,,,,,,,,
10,#,황금의 에테르 모래,,,,,,,,
`
const material_DB = ReadMaterials(csv740m);
// console.log(material_DB);
