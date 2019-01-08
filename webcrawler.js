const webCrawler = (url, max = 10) => {
  // url is the starting point of the crawl
  // max is the maximum amount of urls you want to crawl through
  // default is 10 for performance purposes
  const visited = [],
  foundURLs = [];
  let crawlCount = 0;
  const crawl = (crawled = url) => {
    let result;
    if (visited.includes(crawled) || crawlCount > max) return;
    crawlCount++;
    const query = new Promise((resolve, reject) => {
      console.log(crawlCount, visited);
      const request = new XMLHttpRequest();
      request.open('GET', crawled);
      request.responseType = 'document';
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          const body = request.response.body;
          Array.prototype.forEach.call(body.getElementsByTagName('a'), linkTag => {
            if (linkTag.href.replace(/(#.*$)|(\$.*$)/, '') === body.baseURI) reject();
            else {
              foundURLs.push(linkTag.href);
              crawl(linkTag.href);
              if (crawlCount >= max) resolve(foundURLs);
              reject();
            }
          });
        }
      }
      request.send();
    });
    query.then((success) => {
        result = success;
    });
    if (result !== undefined) return result;
  };

  return crawl(url);
};