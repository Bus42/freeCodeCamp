let form = document.getElementById("form");

let checkboxes = document.getElementById("shrodingers-checkboxes");
let comeBack = () => {
  setTimeout(() => {
    window.alert(
      "Ha! thought you were done with me? \n Click me and see what happens!"
    );
    window.location.reload(true);
  }, 1200);
};

let berate = (msg = "") => {
  window.confirm(`${msg} Don't click me!`)
    ? window.confirm("Why did you do that?")
      ? window.confirm("Do you hate me?")
        ? comeBack()
        : berate("What is wrong with you?")
      : berate("No means no!")
    : setTimeout(() => {
        window.alert("Fine then");
        comeBack();
      }, 1200);
};
form.addEventListener("submit", e => {
  e.preventDefault();
  berate();
});
let inquisition = () => {
  checkboxes.innerHTML =
    "<legend>Nobody expects the Spanish Inquisition!</legend><img src='https://res.cloudinary.com/studio42dev/image/upload/v1540585570/inquisition.gif' />";
};

checkboxes.addEventListener("click", () => {
  inquisition();
});
