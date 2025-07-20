function csvToJson(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines.shift().split(",");

  return lines.map(line => {
    const values = line.split(",");
    let obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || "";
      // if (obj[header.trim()] && obj[header.trim()] !== values[index]?.trim()) {
      //   if (!Array.isArray(obj[header.trim()])) {
      //     obj[header.trim()] = [obj[header.trim()]];
      //   }
      //   obj[header.trim()].push(values[index]?.trim() || "");
      // }
    });
    return obj;
  });
}

function translateText(input, locale='ko') {
    let replaceData = timelineReplace.find(r => r.locale === locale) || timelineReplace[0]; // 'ko' 찾고 없으면 기본값 사용
    let output = input;

    // replaceSync 적용 (source 값 변경)
    Object.entries(replaceData.replaceSync).forEach(([key, value]) => {
        const regex = new RegExp(`(?<=source: ")[^"]*${key}[^"]*`, 'g');
        output = output.replace(regex, value);
    });

    // replaceText 적용 (Ability 메시지 변경)
    Object.entries(replaceData.replaceText).forEach(([key, value]) => {
        const regex = new RegExp(`"([^"]*?)${key}([^"]*?)"`, 'g');
        output = output.replace(regex, `"${value}"`);
    });

    return output;
}