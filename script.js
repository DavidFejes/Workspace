// A dokumentum betöltése után lefutó kód
document.addEventListener("DOMContentLoaded", function() {

    // AOS (Animate on Scroll) könyvtár inicializálása
    // Ez felelős az elemek "beúszásáért" görgetés közben
    AOS.init({
        duration: 800, // Animáció időtartama (ms)
        once: true,    // Minden animáció csak egyszer fusson le
        offset: 50,    // Eltolás az elem megjelenése előtt (px)
    });

});