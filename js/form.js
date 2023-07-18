const form = document.querySelector("form");
const statusTxt = form.querySelector(".button-area span");

const fomin = document.getElementById("form");
let formData1 = new FormData(fomin);
console.log(formData1);

form.onsubmit = (e) => {
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("post", "../php/form_action.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = xhr.response;
      if (
        response.indexOf("Email and message field is required!") != -1 ||
        response.indexOf("Enter a valid email address!") != -1 ||
        response.indexOf("Sorry, failed to send your message!") != -1
      ) {
        statusTxt.style.color = "red";
      } else {
        form.reset();
        setTimeout(() => {
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  };
  let formData = new FormData(form);
  console.log(form.values);
  xhr.send(formData);
};
