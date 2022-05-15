function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// execute code when document is ready
docReady(() => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  // Open close accordion
  accordionHeaders.forEach((accordionHeader) => {
    const target = document.getElementById(
      accordionHeader.getAttribute("target")
    );

    accordionHeader.addEventListener("click", function (e) {
      target.classList.toggle("open");
    });
  });

  // Search
  const searchInput = document.getElementById("search-input");
  const dimensionsSection = document.getElementById("dimensions");
  const metricsSection = document.getElementById("metrics");
  const noResultsPlaceholder = document.querySelector(".no-search-results");

  const searchSection = (e, section) => {
    let counter = 0;
    const searchValue = e.currentTarget.value.toLowerCase();
    const accordionElements = section.querySelectorAll(".accordion");

    // go trough accordions
    [...accordionElements].forEach((accordion) => {
      //get all first column text from single accordion
      const firstColEls = accordion.querySelectorAll(
        ".table tbody tr td:first-child"
      );
      const firstColTexts = [...firstColEls]
        .map((text) => text.innerText.toLowerCase())
        .join(" ");

      //if any 1st column conains phrase dont hide accordion else hide accordion
      if (firstColTexts.includes(searchValue)) {
        accordion.classList.remove("hide");
        counter++;
      } else {
        accordion.classList.add("hide");
      }
    });

    //if any on section's accordions has results dont hide section else hide section
    counter ? section.classList.remove("hide") : section.classList.add("hide");
    return counter;
  };

  const search = (e) => {
    const dimensionsResults = searchSection(e, dimensionsSection);
    const metricsResults = searchSection(e, metricsSection);

    if (!dimensionsResults && !metricsResults) {
      noResultsPlaceholder.classList.add("show");
    } else {
      noResultsPlaceholder.classList.remove("show");
    }
  };

  searchInput.addEventListener("keyup", search);

  // Expand/Collapse
  const expandButtons = document.querySelectorAll(".expand");
  const collapseButtons = document.querySelectorAll(".collapse");

  const expandSection = (e, bool) => {
    const target = document.getElementById(
      e.currentTarget.getAttribute("target")
    );
    const childrenAccordions = target.querySelectorAll(".accordion");

    childrenAccordions.forEach((accordion) => {
      bool
        ? accordion.classList.add("open")
        : accordion.classList.remove("open");
    });
  };

  expandButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      expandSection(e, true);
    })
  );

  collapseButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      expandSection(e, false);
    })
  );
});

if (module.hot) {
  module.hot.accept();
}
