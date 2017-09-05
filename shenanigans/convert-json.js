var fs = require('fs');

var pessoas = fs.readFileSync('lista-pessoas.txt', 'utf8').split('\n').filter(Boolean);
var i = 1;

var json = pessoas.map(pessoa => ({
    id: i++,
    nome: pessoa.split(' ').map(parte => capitalize(parte)).join(' '),
    confirmado: false,
    acompanhantes: []
}));

fs.writeFile(`lista-pessoas.json`, JSON.stringify({convidados: json}), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log(`The file was saved!`);
});

function capitalize(palavra) {
    var _palavra = palavra.trim().toLowerCase();

    if (!shouldCapitalize(_palavra)) {
        return palavra;
    }

    var arr = palavra.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}

function shouldCapitalize(palavra) {   
    var shouldNot = ['de', 'da', 'do', 'e', 'dos', 'das'];
    return shouldNot.indexOf(palavra) === -1;
}
