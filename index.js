let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {

    navbar.style.top = "-87px";
  } else {

    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

  const slideIndices = {
    france: 0,
    japan: 0
  };

  function moveSlide(tour, direction) {
    const track = document.getElementById(`track-${tour}`);
    const slides = track.querySelectorAll('img');
    const totalSlides = slides.length;

    slideIndices[tour] += direction;

    if (slideIndices[tour] < 0) {
      slideIndices[tour] = totalSlides - 1;
    } else if (slideIndices[tour] >= totalSlides) {
      slideIndices[tour] = 0;
    }

    const slideWidth = slides[0].clientWidth;
    const offset = -slideIndices[tour] * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

function showCarousel(tour) {
  document.getElementById("carousel-france").style.display = "none";
  document.getElementById("carousel-japan").style.display = "none";

  const buttons = document.querySelectorAll(".selector-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(`carousel-${tour}`).style.display = "flex";

  const activeBtn = Array.from(buttons).find((btn) =>
    btn.getAttribute("onclick").includes(tour)
  );
  if (activeBtn) activeBtn.classList.add("active");
}

const bookingModal = document.getElementById("bookingModal");
const closeBooking = document.getElementById("closeBooking");
const bookingForm = document.getElementById("bookingForm");

const tourPackageSelect = document.getElementById("tourPackage");
const tourPriceInput = document.getElementById("tourPrice");

const multiPackageTours = {
  Egypt: {
    "Egypt Tour Package 1": "₱105,099",
    "Egypt Tour Package 2": "₱141,499",
  },
  Davao: {
    "Davao Tour Package 1": "₱24,499",
    "Davao Tour Package 2": "₱32,799",
  },
};

function resetPackageSelect() {
  tourPackageSelect.innerHTML = ""; 
  tourPriceInput.value = "";
  tourPackageSelect.removeAttribute("readonly");
  tourPackageSelect.disabled = false;
}

function setupBookingFormForTour(tourName, packageName, packagePrice) {
  if (multiPackageTours[tourName]) {
    resetPackageSelect();

    const packages = multiPackageTours[tourName];
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a package";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    tourPackageSelect.appendChild(defaultOption);

    for (const [pkgName, price] of Object.entries(packages)) {
      const option = document.createElement("option");
      option.value = pkgName;
      option.textContent = pkgName;
      tourPackageSelect.appendChild(option);
    }

    if (packageName && packages[packageName]) {
      tourPackageSelect.value = packageName;
      tourPriceInput.value = packages[packageName];
    }

    tourPackageSelect.addEventListener("change", () => {
      const selected = tourPackageSelect.value;
      tourPriceInput.value = packages[selected] || "";
    });
  } else {
    tourPackageSelect.innerHTML = ""; 
    tourPackageSelect.value = packageName || "";
    tourPriceInput.value = packagePrice || "";
    tourPackageSelect.setAttribute("readonly", true);
    tourPackageSelect.disabled = true;
  }
}

document.querySelectorAll(".book-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tourName = btn.dataset.tour; 
    const packageName = btn.dataset.package; 
    const price = btn.dataset.price; 

    setupBookingFormForTour(tourName, packageName, price);

    bookingModal.style.display = "flex";
  });
});

closeBooking.addEventListener("click", () => {
  bookingModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.style.display = "none";
  }
});

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const first = bookingForm.firstName.value.trim();
  const last = bookingForm.lastName.value.trim();
  const packageName = tourPackageSelect.value;
  const packagePrice = tourPriceInput.value;
  const payment = bookingForm.paymentMethod.value;

  alert(
    `Thank you for booking, ${first} ${last}!\n` +
      `Tour Package Booked: ${packageName}\n` +
      `Price: ${packagePrice}\n` +
      `Preferred payment: ${payment}\n` +
      `Please await our response for further instructions.`
  );

  bookingModal.style.display = "none";
  bookingForm.reset();
  tourPriceInput.value = "";
  tourPackageSelect.value = "";
});








