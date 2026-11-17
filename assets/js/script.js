const FALLBACK_SKILLS = [
    { "name": "HTML5", "icon": "https://img.icons8.com/color/48/000000/html-5--v1.png" },
    { "name": "CSS3", "icon": "https://img.icons8.com/color/48/000000/css3.png" },
    { "name": "JavaScript", "icon": "https://img.icons8.com/color/48/000000/javascript--v1.png" },
    { "name": "TypeScript", "icon": "https://img.icons8.com/color/48/000000/typescript.png" },
    { "name": "ReactJS", "icon": "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" },
    { "name": "NextJS", "icon": "https://img.icons8.com/color/48/000000/nextjs.png" },
    { "name": "Material UI", "icon": "https://img.icons8.com/color/48/000000/material-ui.png" },
    { "name": "NodeJS", "icon": "https://img.icons8.com/color/48/000000/nodejs.png" },
    { "name": "ExpressJS", "icon": "https://img.icons8.com/fluency/48/000000/node-js.png" },
    { "name": "Redux", "icon": "https://img.icons8.com/color/48/000000/redux.png" },
    { "name": "MongoDB", "icon": "https://img.icons8.com/color/48/000000/mongodb.png" },
    { "name": "PostgreSQL", "icon": "https://img.icons8.com/?size=50&id=Pv4IGT0TSpt8&format=png&color=000000" },
    { "name": "REST APIs", "icon": "https://img.icons8.com/?size=50&id=1oWQWS6qrHe3&format=png&color=000000" },
    { "name": "WebSockets", "icon": "https://img.icons8.com/?size=50&id=106729&format=png&color=000000" },
    { "name": "AWS", "icon": "https://img.icons8.com/?size=50&id=wU62u24brJ44&format=png&color=000000" },
    { "name": "GitHub", "icon": "https://img.icons8.com/glyph-neue/48/ffffff/github.png" },
    { "name": "Agentic AI", "icon": "https://img.icons8.com/?size=50&id=ETVUfl0Ylh1p&format=png&color=000000" },
    { "name": "Claude Code", "icon": "https://img.icons8.com/?size=50&id=kDfpmWz6OSCQ&format=png&color=000000" }
];

const FALLBACK_PROJECTS = [
    { "name": "Expense Tracker", "desc": "Track daily expenses with a MERN stack dashboard.", "image": "expense", "category": "MERN", "links": { "view": "https://expense-tracker-tau-pearl-78.vercel.app/", "code": "https://github.com/kushang3092/expense-tracker" } },
    { "name": "E-Challan System", "desc": "Digital challan workflow for issuing and viewing fines.", "image": "challan", "category": "MERN", "links": { "view": "https://662250873721d6c2653dbd43--singular-sprinkles-a2c4bf.netlify.app" } },
    { "name": "To-Do Application", "desc": "React to-do app for adding, completing, and clearing tasks.", "image": "todo", "category": "React", "links": { "view": "https://to-do-kush.netlify.app/", "code": "https://github.com/KushangJari3092/To-Do" } },
    { "name": "Quiz Application", "desc": "TypeScript quiz app with scored questions and results.", "image": "quiz", "category": "React-TS", "links": { "view": "https://quizz-application-kushang.netlify.app/", "code": "https://github.com/KushangPJariwala/Quiz-application-Kushang-typescript" } },
    { "name": "Omny Food", "desc": "Food ordering site built with HTML, CSS, and JavaScript.", "image": "food", "category": "HTML-CSS-JS", "links": { "view": "https://omnyfood-kush.netlify.app", "code": "https://github.com/KushangPJariwala/omnyfood" } }
];

function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer || !Array.isArray(skills)) return;
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
            </div>
        </div>`).join("");
}

function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer || !Array.isArray(projects)) return;
    const cards = projects
        .filter(project => project && project.category !== "android")
        .slice(0, 10)
        .map(project => {
            const links = project.links || {};
            const viewBtn = links.view
                ? `<a href="${links.view}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i> View</a>`
                : "";
            const codeBtn = links.code
                ? `<a href="${links.code}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>`
                : "";
            const description = project.desc || "";
            return `
        <div class="box tilt">
            <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${description}</p>
                    <div class="btns">
                        ${viewBtn}
                        ${codeBtn}
                    </div>
                </div>
            </div>
        </div>`;
        }).join("");
    projectsContainer.innerHTML = cards;

    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }
}

function renderPortfolio(skills, projects) {
    showSkills(skills);
    showProjects(projects);
}

renderPortfolio(FALLBACK_SKILLS, FALLBACK_PROJECTS);

async function refreshPortfolioFromJson() {
    try {
        const [skillsResponse, projectsResponse] = await Promise.all([
            fetch("./skills.json"),
            fetch("./projects/projects.json")
        ]);
        const skills = skillsResponse.ok ? await skillsResponse.json() : FALLBACK_SKILLS;
        const projects = projectsResponse.ok ? await projectsResponse.json() : FALLBACK_PROJECTS;
        renderPortfolio(
            Array.isArray(skills) ? skills : FALLBACK_SKILLS,
            Array.isArray(projects) ? projects : FALLBACK_PROJECTS
        );
    } catch (error) {
        renderPortfolio(FALLBACK_SKILLS, FALLBACK_PROJECTS);
    }
}

refreshPortfolioFromJson();

$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Web Development", "Full-Stack Development","Frontend Development", "Backend Development" ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// <!-- tilt js effect starts -->
if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
}
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .email', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .exp-item', { interval: 300 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });