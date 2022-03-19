const tesseract = require("tesseract.js");
const gerador = require('gerador-nome')

function rec() {
    var user = getUsername();
    var pass = getPassword();
    var nome = getNome();
    var nome1 = nome.split(' ')
    console.log("=================================================");
    console.log("[CONTA GERADA COM SUCESSO]");
    console.log("\nUsuário criado com sucesso > \n" + nome);
    console.log("\nUsername > \n" + user);
    console.log("\nSenha > \n" + pass);
    console.log("\nPesquisar foto > \n" + nome1[0]+" pinterest profile photo instagram");
    console.log("=================================================");
}

function getPassword() {
    var chars ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%&*";
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

    var n1 = gerador.geradorNomeFeminino().toLowerCase();
    var n2 = gerador.geradorNomeFeminino().toLowerCase();
    var n3 = numeros;
    var nome = n1 + "." + n2 + "." + n3;
    return nome;
}

function getNome() {
    var n1 = gerador.geradorNomeFeminino();
    var n2 = gerador.geradorNomeFeminino();
    var n3 = gerador.geradorNomeFeminino();
    var nome = n1 + " " + n2 + " " + n3;
    return nome;
}
rec();