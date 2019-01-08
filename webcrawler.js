const webCrawler = (url, max = 10) => {
  const visited = [];
  let crawlCount = 0;
  const crawl = (crawled = url) => {
    if (visited.includes(crawled) || crawlCount > max) return;
    else {
      crawlCount++;
      visited.push(crawled);
      console.log(crawlCount, visited);
      const request = new XMLHttpRequest();
      request.open('GET', crawled);
      request.responseType = 'document';
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          const body = request.response.body;
          Array.prototype.forEach.call(body.getElementsByTagName('a'), linkTag => {
            // console.log(linkTag.href.replace(/(#.*$)|(\$.*$)/, '') === body.baseURI);
            if (linkTag.href.replace(/(#.*$)|(\$.*$)/, '') === body.baseURI) return;
            else {
              console.log(linkTag.href);
              crawl(linkTag.href);
            }
          });
        }
      }
      request.send();
    }
  }
  return crawl;
}