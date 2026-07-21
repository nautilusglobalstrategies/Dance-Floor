/* ==================================================
   Indiana Dance Floor Rentals
   Complete script.js replacement
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");
    const yearElement = document.getElementById("year");
    const quoteForm = document.getElementById("quoteForm");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox
        ? lightbox.querySelector("img")
        : null;
    const lightboxClose = lightbox
        ? lightbox.querySelector(".lightbox-close")
        : null;

    /* Current year */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* Mobile navigation */

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.textContent = isOpen ? "✕" : "☰";
        });
    }

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navigation) {
                navigation.classList.remove("open");
            }

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            }
        });
    });

    /* Header scroll appearance */

    function updateHeader() {
        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    /* Smooth scrolling */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {
            anchor.addEventListener("click", (event) => {
                const targetId = anchor.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight = header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            });
        });

    /* Reveal animations */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("show");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("show");
        });
    }

    /* Gallery lightbox */

    const galleryImages =
        document.querySelectorAll(".gallery-item img");

    galleryImages.forEach((image) => {
        const galleryButton = image.closest(".gallery-item");

        if (!galleryButton) {
            return;
        }

        galleryButton.addEventListener("click", () => {
            if (!lightbox || !lightboxImage) {
                return;
            }

            lightboxImage.src = image.src;
            lightboxImage.alt =
                image.alt || "Expanded event image";

            lightbox.classList.add("open");
            document.body.classList.add("no-scroll");
        });
    });

    function closeLightbox() {
        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("open");
        document.body.classList.remove("no-scroll");

        if (lightboxImage) {
            lightboxImage.src = "";
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("open")
        ) {
            closeLightbox();
        }
    });

    /* Quote form */

    if (quoteForm) {
        quoteForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(quoteForm);

            const name =
                String(formData.get("name") || "").trim();

            const phone =
                String(formData.get("phone") || "").trim();

            const eventDate =
                String(formData.get("date") || "").trim();

            const eventType =
                String(
                    formData.get("eventType") || ""
                ).trim();

            const venue =
                String(formData.get("venue") || "").trim();

            const details =
                String(formData.get("details") || "").trim();

            if (!name || !phone || !eventDate || !eventType) {
                showFormMessage(
                    "Please complete your name, phone number, event date and event type.",
                    "error"
                );

                return;
            }

            const message = [
                "Dance Floor Rental Request",
                "",
                `Name: ${name}`,
                `Phone: ${phone}`,
                `Event date: ${eventDate}`,
                `Event type: ${eventType}`,
                `Venue or city: ${venue || "Not provided"}`,
                "",
                "Event details:",
                details || "No additional details provided."
            ].join("\n");

            const smsBody = encodeURIComponent(message);

            showFormMessage(
                "Your request is ready. Your messaging app will open so you can send it.",
                "success"
            );

            setTimeout(() => {
                window.location.href =
                    `sms:17652510535?&body=${smsBody}`;
            }, 500);
        });
    }

    function showFormMessage(message, type) {
        if (!quoteForm) {
            return;
        }

        let messageElement =
            quoteForm.querySelector(".form-message");

        if (!messageElement) {
            messageElement =
                document.createElement("p");

            messageElement.className = "form-message";

            quoteForm.appendChild(messageElement);
        }

        messageElement.textContent = message;
        messageElement.className =
            `form-message ${type}`;
    }

    /* Close mobile menu when clicking outside */

    document.addEventListener("click", (event) => {
        if (
            !navigation ||
            !menuButton ||
            !navigation.classList.contains("open")
        ) {
            return;
        }

        const clickedInsideNavigation =
            navigation.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideNavigation &&
            !clickedMenuButton
        ) {
            navigation.classList.remove("open");
            menuButton.textContent = "☰";
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
});
