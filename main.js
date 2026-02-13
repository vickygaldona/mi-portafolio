// ========== Configuración Inicial ==========
const projectsData = [
    {
        title: "Página para inscribirse a un curso",
        description: "Sistema gestión  que permite a los usuarios informarse y poder inscribirse.  Interfaz intuitiva y responsive para una experiencia de aprendizaje óptima.",
        tech: ["JavaScript", "HTML", "CSS", "Netlify"],
        demoUrl: "https://carnetmanipulacionalimentos.netlify.app/",
        
    },
    {
        title: "Minimarket Digital",
        description: "Página para minimarket con catálogo de productos dinámico. Implementa categorización de productos y Diseño responsive adaptado para dispositivos móviles y desktop.",
        tech: ["JavaScript", "HTML", "CSS", "Netlify"],
        demoUrl: "https://minimarketbebidasalpaso.netlify.app/",
        
    },
    {
        title: "Sistema de Gestión de Turnos",
        description: "Página web para agendamiento y administración de turnos en tiempo real. Permite a los usuarios reservar citas, genera mensaje automáticas y gestionar su calendario.",
        tech: ["JavaScript", "HTML", "CSS", "Netlify"],
        demoUrl: "https://bauti-fade-studio.netlify.app/",
        
    }
];


// ========== Partículas de Fondo ==========
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        init();
    }

    function init() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle(canvas));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        // Conectar partículas cercanas
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationId);
    };
}

// ========== Efecto de Escritura ==========
function typeWriter() {
    const texts = [
        "Desarrolladora Web",
        "Estudiante de Programación",
        "Apasionada por el Código",
        "Creadora de Soluciones Digitales"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById('typedText');
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ========== Navegación Móvil ==========
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animar hamburguesa
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========== Modo Claro/Oscuro ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ========== Scroll Suave y Navbar ==========
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ocultar/mostrar navbar
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;

        // Animaciones de entrada
        const elements = document.querySelectorAll('.project-card, .skill-card, .contact-card');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // Inicializar elementos ocultos (ejecutar después de que se carguen los proyectos)
    setTimeout(() => {
        const elements = document.querySelectorAll('.project-card, .skill-card, .contact-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }, 100);
}
// ========== Cargar Proyectos ==========
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoUrl}" class="project-link link-demo" target="_blank" rel="noopener">
                        Ver Demo
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// ========== Formulario de Contacto ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        // Simular envío (aquí conectarías con tu backend)
        formStatus.className = 'form-status';
        formStatus.textContent = 'Enviando mensaje...';
        formStatus.style.display = 'block';

        // Simulación de envío exitoso
        setTimeout(() => {
            formStatus.className = 'form-status success';
            formStatus.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
            form.reset();
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);

        // Para conectar con backend real:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = '¡Mensaje enviado con éxito!';
                form.reset();
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Error al enviar el mensaje. Intenta nuevamente.';
        }
        */
    });
}
// ========== Descargar CV ==========
function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    const downloadNavBtn = document.getElementById('downloadCVNav');
    
    const handleDownload = (e) => {
        e.preventDefault();
        
        // Abrir el CV en una nueva pestaña
        window.open('/assets/cv-victoria.jpg', '_blank');
        
        // O si prefieres forzar la descarga:
        /*
        const link = document.createElement('a');
        link.href = '/assets/cv-victoria.jpg';
        link.download = 'CV-Victoria-Galdona.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        */
    };
    
    downloadBtn.addEventListener('click', handleDownload);
    downloadNavBtn.addEventListener('click', handleDownload);
}




// ========== Animación de Números/Stats (Opcional) ==========
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========== Inicialización ==========
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initParticles();
    typeWriter();
    initMobileNav();
    initThemeToggle();
    initScrollEffects();
    loadProjects();
    initContactForm();
    initDownloadCV();

    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🚀 Portafolio cargado exitosamente!');
});