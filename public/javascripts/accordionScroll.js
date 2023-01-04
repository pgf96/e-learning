let accordionEl = document.querySelector(".accordion-item")

accordionEl.addEventListener("click", function () {
  this.scrollIntoView({
    alignToTop: true,
    behavior: "smooth",
    block: "start",
  })
})
