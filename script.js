// A vászon elem, amire rajzolni fogunk
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Beállítjuk a vászon méretét a teljes ablakra
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// A karakterek, amikből az eső áll (katakana, plusz számok, betűk)
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const characters = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize; // Oszlopok száma

// Minden oszlophoz létrehozunk egy "esőcseppet"
const rainDrops = [];
for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

// A rajzoló funkció, ami újra és újra lefut
function draw() {
    // Félig áttetsző fekete réteget teszünk a vászonra minden képkockánál,
    // hogy a "fakulás" effektust elérjük
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // A klasszikus zöld szín
    ctx.font = fontSize + 'px monospace';

    // Végigmegyünk minden oszlopon
    for (let i = 0; i < rainDrops.length; i++) {
        // Véletlenszerű karaktert választunk
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Kirajzoljuk a karaktert az aktuális pozícióra
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Ha az esőcsepp a képernyő aljára ér, visszaküldjük a tetejére
        // egy kis véletlenszerűséggel fűszerezve
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        
        // Növeljük az esőcsepp pozícióját (lefelé mozog)
        rainDrops[i]++;
    }
}

// Elindítjuk a digitális esőt, ami 30 képkocka/másodperc sebességgel fut
setInterval(draw, 33);