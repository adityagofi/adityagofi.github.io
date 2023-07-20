function redirectToDataField(){
    window.location.href = "Data_Field.html";
}

function redirectToCreativeField(){
    window.location.href = "Creative_Field.html";
}

function redirectToBusinessField(){
    window.location.href = "Business_Field.html";
}

// const dropdownItems = document.querySelectorAll('.dropdown');

// dropdownItems.forEach((item) => {
//   const dropdownMenu = item.querySelector('.dropdown__menu');
//   item.addEventListener('click', () => {
//     dropdownMenu.classList.toggle('open');
//   });
// });

// var typed = new Typed(".auto-type", {
//     strings: ["Data Scientist", "Data Analyst", "AI Engineer", "Video Editor", "Motion Designer", "Graphic Designer"],
//     typeSpeed: 50,
//     backSpeed: 40,
//     loop: true
// })


window.addEventListener('scroll', () => {
    let value = window.scrollY;
  
    document.getElementById('parallex1').style.top = `${value * 0.6}px`;
    document.getElementById('parallex2').style.top = `${value * 0.4}px`;
    document.getElementById('parallex3').style.top = `${value * 0.2}px`;

  });
  