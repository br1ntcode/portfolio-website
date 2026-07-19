const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

const toggle = document.getElementById("theme-toggle");


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
}


toggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "🌙";
    }

});

const words = [
    "Aspiring Cloud Engineer",
    "AWS Learner",
    "Linux Enthusiast",
    "Future DevOps Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function type() {

    const currentWord = words[wordIndex];

    if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex++);
    } else {
        typing.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = deleting ? 50 : 100;

    if (!deleting && charIndex === currentWord.length + 1) {
        deleting = true;
        speed = 1500;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, speed);
}

type();

async function loadGitHubRepos() {

    const response = await fetch("https://api.github.com/users/br1ntcode/repos");

    const repos = await response.json();

    const container = document.getElementById("github-projects");

    repos.slice(0, 6).forEach(repo => {

        container.innerHTML += `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <p>${repo.description ?? "No description available."}</p>
                <p><strong>Language:</strong> ${repo.language ?? "Not specified"}</p>

                <a href="${repo.html_url}" target="_blank">
                    View Repository →
                </a>
            </div>
        `;

    });

}

loadGitHubRepos();