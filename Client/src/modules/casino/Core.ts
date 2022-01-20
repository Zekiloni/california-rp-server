/* Big thanks to MrPancakers2 for his resources and research! */



mp.events.add("CLIENT::CASINO:ENTER", () => {
    mp.events.call('CLIENT::CASINO:WALLS:LOAD'); // Animated casino walls
    mp.events.call('CLIENT::CASINO:WHEEL:LOAD'); // Lucky wheel
});

mp.events.call('CLIENT::CASINO:ENTER');