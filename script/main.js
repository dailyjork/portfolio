const experience = document.getElementById('experience');
const projects = document.getElementById('projects');
const about = document.getElementById('aboutMe');
const skills = document.getElementById('skills');
const contact = document.getElementById('contact');
const school = document.getElementById('school');


function goDiv(id) {
    window.scroll(0, findPos(id));
}

function findPos(div) {
    let currenttop = -150;
    if (div.offsetParent) {
        do {
            currenttop += div.offsetTop;
        } while ((div = div.offsetParent));
        return [currenttop];
    }
}


const theme = document.getElementById('cMode')


theme.addEventListener ("click", function() { 
    switchMode();
});

const body = document.body;
const gitLogo = document.getElementById('git');

function switchMode() {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        gitLogo.innerHTML =  '<a href="https://github.com/dailyjork" target="_blank"><img src="images/githubLight.png"></img></a>'
        theme.innerText = ("Light mode");
        console.log("Modus: licht");
    } else {
        gitLogo.innerHTML = '<a href="https://github.com/dailyjork" target="_blank"><img src="images/github.png"></img></a>'
        theme.innerText = ("Dark mode");
        console.log("Modus: donker");
    }
}