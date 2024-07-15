const zombie = document.querySelector('.avatar');

window.addEventListener("load", () => {
    let i = 1;
    const interval = setInterval(() => {
        zombie.src = `../assets/sprites/1/Idle 1 (${i}).png`; // Adjust to the actual path of the images
        i++;
        if (i > 10) i = 1;
    }, 125); // Adjust the interval time as needed
});
