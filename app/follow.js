const puppeteer = require("puppeteer");
var {
    pessoa
} = require("../peoples");
puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome'
}).then(client => Follow(client))

var readline = require('readline');
const {
    connect
} = require("./connect");

const urlGoogle = "https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp";
const registerInstagram = "https://www.instagram.com/accounts/emailsignup/";
const urlInstagram = "https://www.instagram.com/";

async function Follow(client) {


    const conn = await connect();
    const sql = `SELECT * FROM users`;
    const [res] = await conn.query(sql);
    var leitor = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    leitor.question("Digite o @user para iniciar sequência de follows: ", async function (user) {
        
        let j = 0;
        for (let i in res) {
            
            console.log('Logando na conta de: ' + res[i].nome)


            const page = await client.newPage();
            await page.goto(urlInstagram);

            await page.waitForXPath('//*[@id="loginForm"]/div/div[1]/div/label/input')

            await page.type('input[name="username"]', res[i].usuario)
            await page.type('input[name="password"]', res[i].senha)
            await page.click('button[type="submit"]')



            await page.waitForXPath('//*[@id="react-root"]/section/main/div/div').catch(async (err) => {
                if (err) {
                    await page.click('div[class="_7UhW9    vy6Bb     MMzan   KV-D4          uL8Hv         "]')
                    throw err;
                }
            });

            await page.goto(`https://www.instagram.com/${user}`)


            await page.click('button[class="_5f5mN       jIbKX  _6VtSN     yZn4P   "]').then(async (success)=>{
                j++;
            }).catch(async (err) => {
                console.log(`O usuário ${res[i].usuario} já é seguidor de ${user}`)
            })
            

            await page.click('span[class="_2dbep qNELH"]')

            await page.waitForXPath('//*[@id="react-root"]/section/nav/div[2]/div/div/div[3]/div/div[6]/div[2]/div[2]')
            await page.click('hr[class="W4P49"]')

            await page.waitForXPath('//*[@id="loginForm"]/div/div[1]/div/label/input');
        
            await page.close();
        }
        await client.close();

        console.log('Processo finalizado, nenhuma falha.')
        console.log('Total de seguidores gerados: '+ j)
    });
}

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}