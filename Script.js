document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const quoteForm = document.getElementById("quoteForm");
  const formMessage = document.getElementById("formMessage");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox.querySelector("img");
  const closeLightboxButton =
    lightbox.querySelector(".lightbox-close");
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }

  function updateHeader() {
    if (!header) {
      return;
    }

    header.classList.toggle(
      "scrolled",
      window.scrollY > 24
    );
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );

  if (menuToggle && navLinks) {
    menuToggle.addEventListener(
      "click",
      () => {
        const isOpen =
          navLinks.classList.toggle("open");

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );
      }
    );
  }

  if (navLinks && menuToggle) {
    navLinks
      .querySelectorAll("a")
      .forEach((link) => {
        link.addEventListener(
          "click",
          () => {
            navLinks.classList.remove("open");

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        );
      });
  }

  document.addEventListener(
    "click",
    (event) => {
      if (
        !navLinks ||
        !menuToggle ||
        !navLinks.classList.contains("open")
      ) {
        return;
      }

      const clickedInsideNavigation =
        navLinks.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

      if (
        !clickedInsideNavigation &&
        !clickedMenuButton
      ) {
        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  );

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");

              revealObserver.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -35px 0px"
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

  document
    .querySelectorAll(".gallery-item img")
    .forEach((image) => {
      const galleryItem =
        image.closest(".gallery-item");

      if (!galleryItem) {
        return;
      }

      galleryItem.addEventListener(
        "click",
        () => {
          if (
            !lightbox ||
            !lightboxImage
          ) {
            return;
          }

          lightboxImage.src = image.src;
          lightboxImage.alt = image.alt;

          lightbox.classList.add("open");

          document.body.classList.add(
            "no-scroll"
          );
        }
      );
    });

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("open");

    document.body.classList.remove(
      "no-scroll"
    );

    if (lightboxImage) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }
  }

  if (closeLightboxButton) {
    closeLightboxButton.addEventListener(
      "click",
      closeLightbox
    );
  }

  if (lightbox) {
    lightbox.addEventListener(
      "click",
      (event) => {
        if (event.target === lightbox) {
          closeLightbox();
        }
      }
    );
  }

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        lightbox &&
        lightbox.classList.contains("open")
      ) {
        closeLightbox();
      }
    }
  );

  if (quoteForm) {
    quoteForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const data =
          new FormData(quoteForm);

        const name =
          String(
            data.get("name") || ""
          ).trim();

        const phone =
          String(
            data.get("phone") || ""
          ).trim();

        const eventDate =
          String(
            data.get("date") || ""
          ).trim();

        const eventType =
          String(
            data.get("eventType") || ""
          ).trim();

        const venue =
          String(
            data.get("venue") || ""
          ).trim();

        const details =
          String(
            data.get("details") || ""
          ).trim();

        if (
          !name ||
          !phone ||
          !eventDate ||
          !eventType
        ) {
          if (formMessage) {
            formMessage.textContent =
              "Please complete the required fields.";

            formMessage.className =
              "form-message error";
          }

          return;
        }

        const message = [
          "Dance Floor Rental Request",
          "",
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Event date: ${eventDate}`,
          `Event type: ${eventType}`,
          `Venue or city: ${
            venue || "Not provided"
          }`,
          "",
          "Event details:",
          details ||
            "No additional details provided."
        ].join("\n");

        if (formMessage) {
          formMessage.textContent =
            "Opening your text message now.";

          formMessage.className =
            "form-message success";
        }

        setTimeout(() => {
          window.location.href =
            `sms:17652510535?&body=${
              encodeURIComponent(message)
            }`;
        }, 350);
      }
    );
  }
});
