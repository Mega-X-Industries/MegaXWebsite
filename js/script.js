/*
    Mega X Industries
    Main JavaScript File
*/

const navbar = document.querySelector(".navbar");
const navigation = document.querySelector(".navigation");
const mobileMenuButton = document.querySelector(".mobile-menu-button");

if (navbar && navigation && mobileMenuButton) {
    // Enable the collapsible navigation only after its controls are ready.
    navbar.classList.add("mobile-menu-ready");

    function closeMobileNavigation() {
        navigation.classList.remove("navigation-open");
        mobileMenuButton.setAttribute("aria-expanded", "false");
        mobileMenuButton.setAttribute("aria-label", "Open navigation menu");
        mobileMenuButton.querySelector("span").textContent = "☰";
    }

    mobileMenuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("navigation-open");
        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        mobileMenuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        mobileMenuButton.querySelector("span").textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMobileNavigation);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMobileNavigation();
            mobileMenuButton.focus();
        }
    });

    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target)) {
            closeMobileNavigation();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 600) {
            closeMobileNavigation();
        }
    });
}

/* Scroll reveal: content remains visible if the browser lacks support. */
const sections = document.querySelectorAll(".section");
const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const sectionObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    sections.forEach(function (section) {
        section.classList.add("section-hidden");
        sectionObserver.observe(section);
    });
}

/* Keep the footer year current. */
const copyright = document.querySelector(".copyright");

if (copyright) {
    copyright.textContent =
        `© ${new Date().getFullYear()} Mega X Industries. All rights reserved.`;
}
