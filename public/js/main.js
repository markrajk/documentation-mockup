const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((accordionHeader) => {
  const target = document.getElementById(
    accordionHeader.getAttribute("target")
  );

  accordionHeader.addEventListener("click", function (e) {
    target.classList.toggle("open");
  });
});

if (module.hot) {
  module.hot.accept();
}
