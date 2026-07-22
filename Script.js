document.addEventListener("DOMContentLoaded", () => {
  const siteHeader =
    document.getElementById("siteHeader");

  const menuButton =
    document.getElementById("menuButton");

  const navigation =
    document.getElementById("navigation");

  const quoteForm =
    document.getElementById("quoteForm");

  const formMessage =
    document.getElementById("formMessage");

  const year =
    document.getElementById("year");

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const lightboxClose =
    document.getElementById("lightboxClose");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

  function updateHeader() {
    if (!siteHeader) {
      return;
    }

    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 35
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

  if (menuButton && navigation) {
    menuButton.addEventListener(
      "click",
      () => {
        const menuIsOpen =
          navigation.classList.toggle("open");

        menuButton.setAttribute(
          "aria-expanded",
          String(menuIsOpen)
        );
      }
    );
  }

  if (navigation && menuButton) {
    navigation
      .querySelectorAll("a")
      .forEach((link) => {
        link.addEventListener(
          "click",
          () => {
            navigation.classList.remove("open");

            menuButton.setAttribute(
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
        !navigation ||
        !menuButton ||
        !navigation.classList.contains("open")
      ) {
        return;
      }

      const clickedNavigation =
        navigation.contains(event.target);

      const clickedButton =
        menuButton.contains(event.target);

      if (!clickedNavigation && !clickedButton) {
        navigation.classList.remove("open");

        menuButton.setAttribute(
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
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -45px 0px"
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  const galleryImages =
    document.querySelectorAll(
      ".gallery-card img"
    );

  galleryImages.forEach((image) => {
    const galleryButton =
      image.closest(".gallery-card");

    if (!galleryButton) {
      return;
    }

    galleryButton.addEventListener(
      "click",
      () => {
        if (!lightbox || !lightboxImage) {
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

  if (lightboxClose) {
    lightboxClose.addEventListener(
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

        const formData =
          new FormData(quoteForm);

        const name =
          String(
            formData.get("name") || ""
          ).trim();

        const phone =
          String(
            formData.get("phone") || ""
          ).trim();

        const eventDate =
          String(
            formData.get("date") || ""
          ).trim();

        const eventType =
          String(
            formData.get("eventType") || ""
          ).trim();

        const venue =
          String(
            formData.get("venue") || ""
          ).trim();

        const details =
          String(
            formData.get("details") || ""
          ).trim();

        if (
          !name ||
          !phone ||
          !eventDate ||
          !eventType
        ) {
          if (formMessage) {
            formMessage.textContent =
              "Please complete your name, phone number, date and event type.";

            formMessage.className =
              "form-message error";
          }

          return;
        }

        const textMessage = [
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
            "No additional information provided."
        ].join("\n");

        if (formMessage) {
          formMessage.textContent =
            "Opening your text message now.";

          formMessage.className =
            "form-message success";
        }

        const encodedMessage =
          encodeURIComponent(textMessage);

        setTimeout(() => {
          window.location.href =
            `sms:17652510535?&body=${encodedMessage}`;
        }, 350);
      }
    );
  }
});
