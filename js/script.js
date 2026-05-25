const categoryListContainer = document.getElementById("category-list-container");
const plantsCardContainer = document.getElementById("plants-card-container");
const allTreesBtn = document.getElementById("all-trees-btn");
const modalContainer = document.getElementById("modal-container");

// Load all category data
const loadAllCategory = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((category) => displayAllCategory(category.categories));
};
loadAllCategory();
const displayAllCategory = (category) => {
  category.forEach((ctg) => {
    const id = ctg.id;
    const li = document.createElement("li");
    li.classList.add(
      "ctg-btn",
      "py-2",
      "w-full",
      "hover:bg-primaryColor",
      "hover:text-gray-50",
      "hover:rounded-sm",
      "pl-2",
      "cursor-pointer",
    );
    li.innerText = ctg?.category_name;
    li.setAttribute("id", id);
    categoryListContainer.appendChild(li);
  });
};

// load all trees data
const loadAllTrees = () => {
  allTreesBtn.classList.add("bg-primaryColor", "hover:text-white", "text-white");
  // category button base rendering card
  categoryListContainer.addEventListener("click", (event) => {
    plantsCardContainer.innerText = "";
    if (event.target.classList.contains("ctg-btn")) {
      const selectedBtnId = event.target.getAttribute("id");
      const url = `https://openapi.programming-hero.com/api/category/${selectedBtnId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => displayAllPlantsCard(data.plants));
      // remove all category button design
      document.querySelectorAll(".ctg-btn").forEach((btn) => {
        btn.classList.remove("bg-primaryColor", "hover:text-white", "text-white");
        allTreesBtn.classList.remove("bg-primaryColor", "hover:text-white", "text-white");
      });
      event.target.classList.add("bg-primaryColor", "hover:text-white", "text-white");
    }
  });

  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllPlantsCard(data.plants));
};
loadAllTrees();

allTreesBtn.addEventListener("click", () => {
  loadAllTrees();
  document.querySelectorAll(".ctg-btn").forEach((btn) => {
    btn.classList.remove("bg-primaryColor", "hover:text-white", "text-white");
    allTreesBtn.classList.add("bg-primaryColor", "hover:text-white", "text-white");
  });
});

const handleCloseBtn = () => {
  modalContainer.innerText = "";
}

const handleModal = () => {
  document.body.classList.add("overflow-hidden");
  plantsCardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("heading")) {
      const id = event.target.getAttribute("id");

      fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then((data) => displayModalData(data.plants));

      const displayModalData = (plantData) => {
        modalContainer.classList.remove("hidden");
        modalContainer.innerText = "";

        const card = document.createElement("div");
        card.classList.add("bg-black/40", "w-full", "h-full", "rounded-sm", "shadow-md", "bg-white", "p-6", "space-y-4");
        card.innerHTML = `
            <h2 class="text-2xl font-bold text-darkColor">${plantData.name}</h2>
            <img class="w-full h-[200px] 2xl:h-[300px]" src="${plantData.image}">
            <p class="text-grayColor"> <span class="text-darkColor font-bold">Category: </span> ${plantData.category} </p>
            <p class="text-grayColor"> <span class="text-darkColor font-bold">Price: </span> ৳ ${plantData.price} </p>
            <p class="text-grayColor"> <span class="text-darkColor font-bold">Description: </span> ${plantData.description} </p>
            </div>
        <button onclick="handleCloseBtn()" class="bg-primaryColor py-2 text-white w-full rounded-full cursor-pointer">Close</button>
        </div>
      `;
        modalContainer.appendChild(card);
      };
    }
  });
};

const displayAllPlantsCard = (plants) => {
  plants.forEach((plant) => {
    const { id, image, name, description, category, price } = plant || {};
    const plantCard = document.createElement("div");
    plantCard.classList.add(
      "w-full",
      "bg-white",
      "rounded-lg",
      "p-4",
      "shadow-lg",
      "space-y-4",
      "flex",
      "flex-col",
      "justify-between",
      "items-center",
    );
    plantCard.innerHTML = `
      <div class="w-full h-[165px]">
        <img class="w-full h-full rounded-sm" src="${image}">
      </div>

      <div class="space-y-3">
        <h4 onclick="handleModal()" id="${id}" class="heading cursor-pointer text-darkColor text-lg font-bold">${name}</h4>
        <p class="text-grayColor text-sm text-justify"> ${description} </p>
        <div class="flex justify-between items-center py-1">
          <p class="bg-lightGreenColor py-1 px-4 rounded-full text-primaryColor">${category}</p>
          <p class="font-bold">৳<span class="price">${price}</span> </p>
        </div>
        <button class="add-to-cart-btn bg-primaryColor py-2 text-white w-full rounded-full cursor-pointer">Add to Cart</button>
        </div>
    `;
    plantsCardContainer.appendChild(plantCard);
  });
};

const addToCart = () => {

}
let totalPrice = 0
plantsCardContainer.addEventListener("click", (event)=>{
  if(event.target.classList.contains("add-to-cart-btn")){
    document.getElementById("cart-empty").classList.add("hidden");
    const card = event.target.parentElement;
    console.log(card.parentElement.parentElement)
    const name = card.querySelector(".heading").innerText;
    const price = card.querySelector(".price").innerText;
    totalPrice = parseInt(totalPrice) + parseInt(price);
    const addToCartDiv = document.getElementById("add-to-cart-div");
    const plant = document.createElement("div");
    plant.classList.add("bg-lightGreenColor", "p-3", "rounded-sm", "flex", "justify-between", "items-center", "mb-3");
    plant.innerHTML = `
    <div class="space-y-2">
      <p class="font-semibold text-darkColor">${name}</p>
      <p class="text-grayColor">৳ <span>${price}</span> x 1</p>
    </div>
      <i class="cursor-pointer fa-solid fa-x"></i>
    `
    addToCartDiv.appendChild(plant);
    document.getElementById("total-price-element").innerText = totalPrice;
  }
})
console.log(totalPrice)
