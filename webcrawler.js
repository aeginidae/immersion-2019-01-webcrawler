const webCrawler = (url, max = 10) => {
  // url is the starting point of the crawl
  // max is the maximum amount of urls you want to crawl through
  // default is 10 for performance purposes
  const visited = [],
  foundURLs = [];
  let crawlCount = 0;
  const crawl = (crawled = url) => {
    if (visited.includes(crawled)) return;
    else if (crawlCount >= max) return foundURLs;
    else {
      crawlCount++;
      visited.push(crawled);
      // console.log(crawlCount, visited);
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
              foundURLs.push(linkTag.href);
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