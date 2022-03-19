const gerador = require("gerador-nome");
const puppeteer = require("puppeteer");
var ncp = require("copy-paste");
var {
  pessoas
} = require("../peoples");
var readline = require("readline");
const {
  connect
} = require("./connect");
const tesseract = require("tesseract.js");
puppeteer.launch({
  headless: false
}).then((client) => start(client))
const urlInstagram = "https://www.instagram.com/accounts/emailsignup/";
const cadastroFB = "https://pt-br.facebook.com/reg/";
const urlMail = "https://temp-mail.org/pt/";
async function restart(client) {
  await start(client);
  return;
}
async function start(client) {

  const context = await client.createIncognitoBrowserContext();

  console.log('Iniciando processo de criacão de conta...\n')
  var user = getUsername();
  var pass = getPassword();
  var nome = getNome();

  console.log("=================================================");
  console.log("[CONTA GERADA COM SUCESSO]");
  console.log("\nUsuário criado com sucesso > \n" + nome);
  console.log("\nUsername > \n" + user);
  console.log("\nSenha > \n" + pass);
  console.log("=================================================");

  const mail = await context.newPage();

  await mail.goto(urlMail);

  await delay(7);

  await mail.screenshot({
    path: "./app/img/email.png",
  });
  console.log('Print obtido do e-mail.')
  await delay(2);
  console.log('Iniciando reconhecimento artificial...')
  tesseract.recognize("./app/img/email.png", "eng").then(async (res) => {
    let i = 0;
    var str = JSON.stringify(res.data.text);
    var splitStr = str.split("\\n");
    let verificar = splitStr[i].includes('@')
    if (verificar != true) {
      i++;
      verificar = splitStr[i].includes('@')
    }
    if (verificar != true) {
      i++;
      verificar = splitStr[i].includes('@')
    }
    if (verificar != true) {
      i++;
      verificar = splitStr[i].includes('@')
    }
    if (verificar != true) {
      i++;
      verificar = splitStr[i].includes('@')
    }
    if (verificar != true) {
      i++;
      verificar = splitStr[i].includes('@')
    }
    if (verificar != true) {
      i++;
      verificar = splitStr[i].includes('@')
    }
    var splitMail = splitStr[i].split(" ");
    let validate = await validarEmail(splitMail[0]);
    let email = '';
    if (validate != false) {
      email = splitMail[0];
    }

    console.log("E-mail detectado: " + email);
    console.log("Iniciando cadastro em Instagram.");


    const instagram = await context.newPage();

    await instagram.goto(urlInstagram);

    //Passo 1 - criar uma conta no instagram
    await instagram.bringToFront();
    await delay(1);
    //input nome e sobrenome
    //..... esperar buscar o email
    await instagram.waitForXPath('//*[@id="react-root"]/section/main/div/div/div[1]/div/form/div[3]/div/label/input').catch(async (err) => {
      if (err) {
        console.log('Ocorreu um erro ao acessar página de cadastro.')
        await client.close();

        return;

      }
    })
    await instagram.type('input[name="emailOrPhone"]', email);
    await instagram.type('input[name="fullName"]', nome);
    //input email
    await instagram.type('input[name="username"]', user);
    //input senha
    await instagram.type('input[name="password"]', pass);

    await instagram.click('button[type="submit"]');


    await delay(5)
    await instagram.waitForXPath('//*[@id="react-root"]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[1]/select').catch(async (err) => {
      if (err) {
        await client.close();
        return;
      }
    })
    await instagram.select('select[title="Mês:"]', "9");
    await instagram.select('select[title="Dia:"]', "11");
    await instagram.select('select[title="Ano:"]', "1999");
    await instagram.click('button[class="sqdOP  L3NKy _4pI4F  y3zKF     "]');

    await delay(5)

    await mail.bringToFront();

    await mail.evaluate(async () => {
      window.scrollBy(0, window.innerHeight);

    });
    await mail.waitForSelector('#mail');
    await delay(20)
    await mail.screenshot({
      path: './app/img/mailcode.png'
    })
    console.log('Print do código obtido')
    await delay(1)
    console.log('Descriptografando código.')
    tesseract.recognize("./app/img/mailcode.png", "eng").then(async (res) => {

      let i = 0;
      var str = JSON.stringify(res.data.text);
      var splitStr = str.split("\\n");
      let validate = splitStr[i].includes('Instagram');
      if (validate <= 0) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      if (validate != true) {
        i++;
        validate = splitStr[i].includes('Instagram');
      }
      var splitCode = splitStr[i].split(" ");
      splitCode = JSON.stringify(splitCode)

      let code = await regexNum(splitCode);

      await instagram.bringToFront();
      await delay(3)

      if (code.length < 6) {
        code = 0 + `${code}`;
      }
      await mail.close();
      console.log("Codigo de confirmação descriptografado: " + code)
      await instagram.type('input[name="email_confirmation_code"]', `${code}`),
        await instagram.click('button[type="submit"]');

      await delay(20)
      await instagram.waitForSelector('#react-root > section > main > div > div > div:nth-child(1) > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > form > div > div:nth-child(1) > input').then(async (achou) => {
        if (achou) {
          console.log('Ocorreu um erro ao criar sua conta.\nReiniciando processo...')
          await client.close();

          return;

        } else {
          await instagram.waitForXPath('//*[@id="react-root"]/section/main/div[1]/div/div[2]/button').then(async (achou2) => {
            if (achou2) {
              console.log('Conta bloqueada, descartando...')
              await client.close();

              return;

            }
          }).catch(async (err2) => {
            if (err2) {
              const conn = await connect();
              const sql = `INSERT INTO users (nome, usuario, senha)  VALUES ('${nome}','${user}','${pass}');`;
              conn.query(sql);
              console.log("=================================================");
              console.log("\nUsuário criado com sucesso > \n" + nome);
              console.log("Username > \n" + user);
              console.log("Senha > \n" + pass);
              console.log("\n=================================================");
              console.log("Dados salvos no banco de dados!");
              await client.close();

              return;

            }
          })
        }
      })
      await client.close();

      return;
    });
  });
}

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}
async function regexNum(string) {
  var numsStr = string.replace(/[^0-9]/g, '');
  return parseInt(numsStr);
}
async function validarEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function getPassword() {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%&*";
  var passwordLength = 16;
  var password = "";

  for (var i = 0; i < passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

function getUsername() {
  var chars = "0123456789";
  var passwordLength = 4;
  var numeros = "";

  for (var i = 0; i < passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    numeros += chars.substring(randomNumber, randomNumber + 1);
  }

  var n1 = gerador.geradorNome().toLowerCase();
  var n2 = gerador.geradorNome().toLowerCase();
  var n3 = numeros;
  var nome = n1 + "." + n2 + "." + n3;
  return nome;
}

function getNome() {
  var n1 = gerador.geradorNome();
  var n2 = gerador.geradorNome();
  var n3 = gerador.geradorNome();
  var nome = n1 + " " + n2 + " " + n3;
  return nome;
}