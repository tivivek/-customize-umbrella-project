const uploadButton = document.querySelector(".upload-file");
const imgUpload = document.querySelector(".img-upload");

const umbrellaImage = document.querySelector("[data-image");
const imageContainer = document.querySelector(".image-container");

const logoContainer = document.querySelector(".logo-container");
const logoImage = document.querySelector(".image");
const inputUploadLogo = document.querySelector("#upload");
const uploadIcon = document.querySelector(".upload-icon");

let currentColor = "blue";
let hasLogo = false;
let currentLogo = "";
// color array for umbrella and theme
const umbrellas = {
  blue: {
    image: "./assets/Blue umbrella.png",
    color: "#34B5E5",
    backgroundColor: "rgba(52, 181, 229, 0.3)",
  },
  yellow: {
    image: "./assets/Yello umbrella.png",
    color: "#FED34E",
    backgroundColor: "rgba(254, 211, 78,0.3)",
  },
  pink: {
    image: "./assets/Pink umbrella.png",
    color: "#D9378D",
    backgroundColor: "rgba(217, 55, 141,0.3)",
  },
};


//Loader
const showLoading = (callback) => {
  umbrellaImage.src = "./assets/loader_icon.svg";
  umbrellaImage.classList.add("loader-icon");

  imageContainer.classList.add("loader-logo");

  logoContainer.innerHTML =
    '<img src="" alt="" id="uploaded-image" class="image" style="display: none" />';

  setTimeout(() => {
    umbrellaImage.classList.remove("loader-icon");

    uploadIcon.src = "./assets/upload_icon.svg";
    uploadIcon.classList.remove("loader-icon");

    imageContainer.classList.remove("loader-logo");
    callback();
  }, 4000);
  uploadIcon.classList.add("loader-icon");
  uploadIcon.src = "./assets/loader_icon.svg";
};

const handleUmbrellaChange = (newColor) => {
  currentColor = newColor;
  const { image, color, backgroundColor } = umbrellas[newColor];
  umbrellaImage.src = image;
  imgUpload.style.backgroundColor = color;
  document.body.style.backgroundColor = backgroundColor;
};

const changeColorOnCheck = (color) => {
  if (color === currentColor) return;

  if (hasLogo) showLoading(() => handleUmbrellaChange(color));
  else handleUmbrellaChange(color);
};

(() => {
  document.body.style.backgroundColor = "rgba(52, 181, 229, 0.3)";
})();

uploadButton.addEventListener("change", () => {
  hasLogo = true;
// UpLoader
  showLoading(() => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(inputUploadLogo.files[0]);
    fileReader.addEventListener("load", () => {
      logoContainer.innerHTML = `<img src=${fileReader.result} alt"upload-image" style="display : inline-block; height: 0%; width:60%"/>`;
      uploadIcon.src = "./assets/upload_icon.svg";
    });
    umbrellaImage.src = umbrellas[currentColor].image;
  });
});