"use strict";
module.exports = [
    {
        Question: 'Dozvoljena brzina u gradu ?',
        Answers: [
            { text: '30 km/h' },
            { text: '50 km/h', correct: true },
            { text: '80 km/h' }
        ]
    },
    {
        Question: 'Dozvoljena brzina kretanja na autoputu ?',
        Answers: [
            { text: '120 km/h', correct: true },
            { text: '70 km/h' },
            { text: '90 km/h' }
        ]
    },
    {
        Question: 'Vozilo koje prati vozilo koje prelazi propisane dimenzije, odnosno vozilo koje sa teretom prekoračuje dozvoljene dimenzije, mora da ima ?',
        Answers: [
            { text: 'uključeno crveno rotaciono ili trepćuće svetlo.' },
            { text: 'uključene sve pokazivače pravca' },
            { text: 'uključeno žuto rotaciono ili trepćuće svetlo, kada je to određeno u dozvoli za vanredni prevoz,', correct: true }
        ]
    },
    {
        Question: 'Ako se na sredni kolovoza, na kojem se saobraćaj odvija u oba smera, nalazi površina koja nije namenjena za saobraćaj vozila, objekat ili uređaj:',
        Answers: [
            { text: 'vozila moraju da ih obilaze sa leve strane' },
            { text: 'vozila moraju da ih obilaze sa desne strane,', correct: true },
            { text: 'vozila mogu da ih obilaze sa obe strane.' }
        ]
    }
];
