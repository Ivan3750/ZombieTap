document.addEventListener("DOMContentLoaded", () => {
    const zombie = document.querySelector('.avatar');
    const num = Array.from({ length: 10 }, (_, i) => i + 1); // Generates an array [1, 2, ..., 10]
    const preloadImages = [];

    // Preload images
    num.forEach(i => {
        const img = new Image();
        // Додайте повний шлях до зображення
        img.src = `/static/assets/sprites/1/Idle1(${i}).png`;
        preloadImages.push(img);
    });

    let i = 1;
    const interval = setInterval(() => {
        let newSrc = `/static/assets/sprites/1/Idle1(${i}).png`;
        console.log(newSrc); // Відладковий код для перевірки URL-адреси
        zombie.src = newSrc;
        i++;
        if (i > 10) i = 1;
    }, 125); // Adjust the interval time as needed
});

