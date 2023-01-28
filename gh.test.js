let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 7000);
});

test.only("Pricing Github header tests", async () => {
  await page.goto("https://github.com/");

  // const firstLink = await page.$(
  //   "body div div header div div div nav ul li:nth-child(4) > a");
  const btnSelector =
    ".HeaderMenu-link no-underline px-0 px-lg-2 py-3 py-lg-2 d-block d-lg-inline-block";
  await page.waitForSelector(btnSelector, {
    visible: true,
  });
  const firstLink = await page
    .$eval(btnSelector, (link) => link.textContent)
    .toContain("Pricing");
  await firstLink.click();
  await page.waitForSelector("h1");
  const title2 = await page.title();
  expect(title2).toContain("Get the complete");
}, 50000);

// test("The first link attribute", async () => {
//   const actual = await page.$eval("a", (link) => link.getAttribute("href"));
//   expect(actual).toEqual("#start-of-content");
// }, 3000);

// test("The page contains Sign in button", async () => {
//   const btnSelector = ".btn-large-mktg.btn-mktg";
//   await page.waitForSelector(btnSelector, {
//     visible: true,
//   });
//   const actual = await page.$eval(btnSelector, (link) => link.textContent);
//   expect(actual).toContain("Sign up for free");
// }, 6000);
