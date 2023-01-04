let addSectionBtn = document.getElementById("addSectionBtn")
let sectionList = document.querySelector(".sectionList")
let sectionDiv = document.querySelectorAll(".sectionDiv")[0]

let createTextArea = function () {
  const textArea = document.createElement("textarea")
  textArea.className = "form-group"
}

let counter = 1
addSectionBtn.addEventListener("click", function () {
  let newSections = sectionDiv.cloneNode(true)
  newSections.getElementsByTagName("input")[0].value = ""
  newSections.getElementsByTagName("input")[1].value = ""
  let newTextAreaContainer = newSections.querySelector("#textarea-container-0")
  newTextAreaContainer.id = `textarea-container-${counter}`
  counter++
  newTextAreaContainer.innerHTML = ""
  const textArea = document.createElement("textarea")
  textArea.className = "form-control"
  textArea.setAttribute("name", "body")
  newTextAreaContainer.appendChild(textArea)
  sectionList.appendChild(newSections)
  tinymce.init({
    selector: "textarea",
    plugins: "lists link image table code help wordcount",
    height: 539,
  })
})
