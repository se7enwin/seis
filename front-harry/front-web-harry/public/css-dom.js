// Working with Dom

// Execute Css After Loading Html 
(document.addEventListener('DOMContentLoaded', () => {






    // Css from tag - Render one - Id one 

    const one = document.getElementById('one');
    const two = document.getElementById('two');
    const three = document.getElementById('three');
    const four = document.getElementById('four');
    one.setAttribute('style', "display:flex;justify-content:center;align-items:center;width:270px;height:30px;font-size:15px;color:white;background-color:blue;border:1px dotted yellow;border-radius:10%;box-shadow:2px 2px 8px blue;");

    // Css from style tag hml - Render two - Id two

    const head = document.querySelector('head');
    const style = document.createElement('style');
    style.innerHTML += '#two {display:flex;justify-content:center;align-items:center;width:270px;height:30px;font-size:15px;color:white;background-color:red;border:1px dotted yellow;border-radius:10%;box-shadow:2px 2px 8px red;}'
    head.appendChild(style);

    // Css from external css file - Render three , four - Id three, four

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './styleslynk.css');
    head.appendChild(link);

    // Hide Id one,two,three,four

    if (one) one.style.display = 'none';
    if (two) two.style.display = 'none';
    if (three) three.style.display = 'none';
    if (four) four.style.display = 'none';

    // Main background
    const body = document.querySelector('body');
    body.id = 'main';
    body.setAttribute('style', 'background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),url("./Img/Background-1.png"); background-Size: cover;   background-position: center;background-repeat: no-repeat;background-attachment: fixed;')
    // Update title
    document.querySelector('title').text = 'Harry Potter';

}))()


