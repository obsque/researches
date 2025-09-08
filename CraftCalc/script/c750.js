const SLOTS = [
  '1머리', '2몸통', '3손', '4다리', '5발',
  'a귀', 'b목', 'c팔', 'd반지',
  'x주', 'y보조',
];
const JOBS = [
  '1대장', '2목수', '3갑주', '4보석',
  '5가죽', '6재봉', '7연금', '8요리',
  'a광부', 'b원예', 'c어부',
  '#',
  "제작",
  "채집",
];

class Recipe {
  constructor(num, crafter, slot='etc', jcategory='', materials=[]) {
    this.num = num;
    this.crafter = crafter;
    this.slot = slot;
    this.jcategory = jcategory;
    this.materials = materials;
  }
};


function ReadData(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines.shift().split(",");
  // #,제작,부위,직군,q,item,q,item,q,item,q,item,q,item

  return lines.map(line => {
    const values = line.split(",");

    let recipe = new Recipe(
      Number(values[0].trim()), //isNaN(values[0]) ? values[0] :
      CJOBS.indexOf(values[1].trim()), //; // 제작
      SLOTS.indexOf(values[2].trim()), // 부위
      JOBS.indexOf(values[3].trim()), // 직군
    );
    // materials
    for (let i = 4; i < values.length - 1; i += 2) {
      if ((values[i] && values[i].trim() !== "")
        // && (values[i+1] && values[i+1].trim() !== "")
      ) {
        let mat_id = material_DB.findIndex(mat => mat.name === values[i + 1].trim());
        let matrials = {
          'amount': Number(values[i]),
          'material': mat_id, //values[i + 1].trim()
        };
        recipe.materials.push(matrials);
      }
    }

    return recipe;
  });
}

// = import('../data/c750');
const csvdata =
`
10,대장,x주,1목수,3,Craftsman's Tri-solution,3,옥타헤드라이트 덩어리,2,개송양나무 목재,3,Mason's Abrasive
11,대장,z보조,1목수,3,Desert Lapis,3,옥타헤드라이트 덩어리,2,개송양나무 목재,3,Mason's Abrasive
12,대장,x주,2대장,3,Craftsman's Tri-solution,3,옥타헤드라이트 덩어리,2,개송양나무 목재,3,Mason's Abrasive
13,대장,z보조,2대장,3,Desert Lapis,3,옥타헤드라이트 덩어리,2,크로노피오 가죽,3,Mason's Abrasive
14,대장,x주,3갑주,3,Craftsman's Tri-solution,3,옥타헤드라이트 덩어리,2,크로노피오 가죽,3,Mason's Abrasive
15,대장,z보조,3갑주,3,Desert Lapis,4,옥타헤드라이트 덩어리,1,능망간석,3,Mason's Abrasive
16,대장,x주,4보석,3,Craftsman's Tri-solution,3,옥타헤드라이트 덩어리,2,능망간석,3,Mason's Abrasive
1,목수,z보조,4보석,3,Desert Lapis,3,개송양나무 목재,2,능망간석,3,Mason's Abrasive
17,대장,x주,5가죽,3,Craftsman's Tri-solution,4,옥타헤드라이트 덩어리,1,개송양나무 목재,3,Mason's Abrasive
18,대장,z보조,5가죽,3,Desert Lapis,3,옥타헤드라이트 덩어리,2,크로노피오 가죽,3,Mason's Abrasive
27,보석,x주,6재봉,3,Craftsman's Tri-solution,3,능망간석,2,옥타헤드라이트 덩어리,3,Mason's Abrasive
2,목수,z보조,6재봉,3,Desert Lapis,3,개송양나무 목재,2,옥타헤드라이트 덩어리,3,Mason's Abrasive
25,갑주,x주,7연금,3,Craftsman's Tri-solution,3,옥타헤드라이트 덩어리,2,능망간석,3,Mason's Abrasive
19,대장,z보조,7연금,3,Desert Lapis,3,옥타헤드라이트 덩어리,2,개송양나무 목재,3,Mason's Abrasive
26,갑주,x주,8요리,3,Craftsman's Tri-solution,3,옥타헤드라이트 덩어리,2,능망간석,3,Mason's Abrasive
20,대장,z보조,8요리,3,Desert Lapis,3,옥타헤드라이트 덩어리,2,개송양나무 목재,3,Mason's Abrasive
21,대장,x주,a광부,3,Craftsman's Tri-solution,4,옥타헤드라이트 덩어리,1,크로노피오 가죽,3,Mason's Abrasive
22,대장,z보조,a광부,3,Desert Lapis,3,옥타헤드라이트 덩어리,2,개송양나무 목재,3,Mason's Abrasive
23,대장,x주,b원예,3,Craftsman's Tri-solution,3,옥타헤드라이트 덩어리,2,개송양나무 목재,3,Mason's Abrasive
24,대장,z보조,b원예,3,Desert Lapis,3,옥타헤드라이트 덩어리,2,크로노피오 가죽,3,Mason's Abrasive
3,목수,x주,c어부,3,Craftsman's Tri-solution,3,개송양나무 목재,2,옥타헤드라이트 덩어리,3,Mason's Abrasive
32,재봉,1머리,제작,3,Craftsman's Tri-solution,2,디아트리마 펠트,3,능망간석,3,Mason's Abrasive
34,재봉,2몸통,제작,4,Craftsman's Tri-solution,5,디아트리마 펠트,2,능망간석,4,Mason's Abrasive
36,재봉,3손,제작,3,Craftsman's Tri-solution,3,디아트리마 펠트,2,크로노피오 가죽,3,Mason's Abrasive
37,재봉,4다리,제작,4,Craftsman's Tri-solution,4,디아트리마 펠트,3,크로노피오 가죽,4,Mason's Abrasive
31,가죽,5발,제작,3,Craftsman's Tri-solution,3,크로노피오 가죽,2,디아트리마 펠트,3,Mason's Abrasive
4,목수,a귀,제작,2,Desert Lapis,2,개송양나무 목재,2,옥타헤드라이트 덩어리,2,Mason's Abrasive
28,보석,b목,제작,2,Desert Lapis,2,옥타헤드라이트 덩어리,2,개송양나무 목재,2,Mason's Abrasive
6,목수,c팔,제작,2,Desert Lapis,2,개송양나무 목재,2,옥타헤드라이트 덩어리,2,Mason's Abrasive
8,목수,d반지,제작,2,Desert Lapis,2,개송양나무 목재,1,능망간석,2,Mason's Abrasive
33,재봉,1머리,채집,3,Craftsman's Tri-solution,4,디아트리마 펠트,1,크로노피오 가죽,3,Mason's Abrasive
35,재봉,2몸통,채집,4,Craftsman's Tri-solution,4,디아트리마 펠트,3,능망간석,4,Mason's Abrasive
30,가죽,3손,채집,3,Craftsman's Tri-solution,3,크로노피오 가죽,2,디아트리마 펠트,3,Mason's Abrasive
38,재봉,4다리,채집,4,Craftsman's Tri-solution,4,디아트리마 펠트,3,크로노피오 가죽,4,Mason's Abrasive
32,가죽,5발,채집,3,Craftsman's Tri-solution,4,크로노피오 가죽,1,디아트리마 펠트,3,Mason's Abrasive
5,목수,a귀,채집,2,Desert Lapis,2,개송양나무 목재,2,옥타헤드라이트 덩어리,2,Mason's Abrasive
29,보석,b목,채집,2,Desert Lapis,2,옥타헤드라이트 덩어리,2,개송양나무 목재,2,Mason's Abrasive
7,목수,c팔,채집,2,Desert Lapis,2,개송양나무 목재,2,옥타헤드라이트 덩어리,2,Mason's Abrasive
9,목수,d반지,채집,2,Desert Lapis,2,개송양나무 목재,1,능망간석,2,Mason's Abrasive
`;

const craft_DB = ReadData(csvdata);
// console.log(craft_DB);