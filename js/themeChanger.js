const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

function toggleTheme(){
    if (themeToggle.checked){
        htmlElement.setAttribute('data-theme', 'dark');
    }else{
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light')
    }
}

function loadTheme(){
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark'){
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    } else {
        htmlElement.removeAttribute('data-theme');
        themeToggle.checked = false;
    }
}

themeToggle.addEventListener('change', toggleTheme);

loadTheme();