const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: false,
    headless: false,
    devtools: true,
  })
  const pages = await browser.pages();
  const page = pages.length ? pages[0] : await browser.newPage();

  function seelp(time = 5000){
    return new Promise((resolve)=>{
      setTimeout(() => resolve(), time);
    })
  }

  async function gotoNewPage(link){
    await page.goto(link, {
      timeout: 0,
      waitUntil: 'domcontentloaded'
    });

    // console.log('process.env :', process.env);

    page.on('console', msg => msg.args().map(n => console.log(`${i}: ${msg.args()[i]}`)));

    // const divsCounts = await page.$$eval('div', divs => divs.length);
    // console.log('divsCounts :', divsCounts);

    const keyword = await page.$eval('.b_searchbox', el => el.value);
    console.log('keyword :', keyword);

    // page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));

    await seelp();


  }

  const list = Array(10).fill('').map((n, i) => i);
  for (let index = list.length; index--;) {
    console.log('index :', index);
    await gotoNewPage(`https://cn.bing.com/?q=${~~(Math.random() * 1000 + 1000)}`);

    if(!index) setTimeout(async() => await page.browser().close(), 3000);
  }


})();


