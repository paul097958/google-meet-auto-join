require('dotenv').config();
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const xpatharr = require('./xpath.json')
const by = webdriver.By;
const until = webdriver.until;
const options = new chrome.Options()
    .addArguments('allow-file-access-from-files')
    .addArguments('use-fake-device-for-media-stream')
    .addArguments('use-fake-ui-for-media-stream');//allow mi and cam

options.addArguments('--log-level=3');//close console
options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });//close notifications
async function autojoin() {
    let driver = await new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();
    driver.get('https://www.google.com.tw/');


    async function findElement(style, xpath, time, mass) {
        if (time != 0) {
            if (style == 'clickstyle') {
                setTimeout(async function () {
                    var contiP = await driver.wait(until.elementLocated(by.xpath(xpath)));
                    contiP.click();
                }, time);
            } else {
                setTimeout(async function () {
                    var writePassword = await driver.wait(until.elementLocated(by.xpath(xpath)));
                    writePassword.sendKeys(mass);
                }, time);
            }

        } else {
            if (style == 'clickstyle') {
                var contiP = await driver.wait(until.elementLocated(by.xpath(xpath)));
                contiP.click();
            } else {
                var writePassword = await driver.wait(until.elementLocated(by.xpath(xpath)));
                writePassword.sendKeys(mass);
            }
        }
    }


    async function enterSomething() {
        for (let p = 0; p < xpatharr.length; p++) {
            if (xpatharr[p]['mass'] == "process.env.gmail") {
                await findElement(xpatharr[p]['style'], xpatharr[p]['xpath'], xpatharr[p]['time'], process.env.gmail);
            } else if (xpatharr[p]['mass'] == "process.env.password") {
                await findElement(xpatharr[p]['style'], xpatharr[p]['xpath'], xpatharr[p]['time'], process.env.password);
            } else if (xpatharr[p]['mass'] == "process.env.googlemeet") {
                await findElement(xpatharr[p]['style'], xpatharr[p]['xpath'], xpatharr[p]['time'], process.env.googlemeet);
            } else {
                await findElement(xpatharr[p]['style'], xpatharr[p]['xpath'], xpatharr[p]['time'], xpatharr[p]['mass']);
            }
        }

    }
    enterSomething()
}
autojoin()





