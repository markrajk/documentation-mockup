function docReady(fn) {
  //see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    //call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

//execute code when document is ready
docReady(() => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  //open close accordion
  accordionHeaders.forEach((accordionHeader) => {
    const target = document.getElementById(
      accordionHeader.getAttribute("target")
    );

    accordionHeader.addEventListener("click", function (e) {
      target.classList.toggle("open");
    });
  });

  //SEARCH FUNCTIONS
  const searchInput = document.getElementById("search-input");
  const dimensionsSection = document.getElementById("dimensions");
  const metricsSection = document.getElementById("metrics");
  const noResultsPlaceholder = document.querySelector(".no-search-results");
  const dimensionAccordios = dimensionsSection.querySelectorAll(".accordion");
  const metricAccordios = metricsSection.querySelectorAll(".accordion");

  //serches single section
  const searchSection = (e, accordionElements, section) => {
    let accordionCounter = 0;
    const searchValue = e.currentTarget.value.toLowerCase();

    //go trough accordions
    [...accordionElements].forEach((accordion) => {
      let columnCounter = 0;
      accordion.classList.add("open");
      //get all first column text from single accordion
      const firstColEls = accordion.querySelectorAll(
        ".table tbody tr td:first-child p"
      );

      //loop trough table rows show if there are results else hide
      firstColEls.forEach((firstCol) => {
        if (firstCol.innerHTML.toLowerCase().includes(searchValue)) {
          firstCol.parentElement.parentElement.classList.remove("hide");
          columnCounter++;
        } else {
          firstCol.parentElement.parentElement.classList.add("hide");
        }
      });

      //if any 1st column conains phrase dont hide accordion else hide accordion
      if (columnCounter) {
        accordion.classList.remove("hide");
        accordionCounter++;
      } else {
        accordion.classList.add("hide");
      }
    });
    //if any on section's accordions has results dont hide section else hide section
    accordionCounter
      ? section.classList.remove("hide")
      : section.classList.add("hide");
    return accordionCounter;
  };

  //searches both section
  const search = (e) => {
    const dimensionsResults = searchSection(
      e,
      dimensionAccordios,
      dimensionsSection
    );
    const metricsResults = searchSection(e, metricAccordios, metricsSection);

    if (!dimensionsResults && !metricsResults) {
      noResultsPlaceholder.classList.add("show");
    } else {
      noResultsPlaceholder.classList.remove("show");
    }
  };

  //avent listener for search
  searchInput.addEventListener("keyup", search);

  //EXPAND/COLLAPSE SECTION FUNCTIONS
  const expandButtons = document.querySelectorAll(".expand");
  const collapseButtons = document.querySelectorAll(".collapse");

  //expand section on button click
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

  //listener for expand
  expandButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      expandSection(e, true);
    })
  );

  //listener for collapse
  collapseButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      expandSection(e, false);
    })
  );
});

if (module.hot) {
  module.hot.accept();
}
