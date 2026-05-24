const categoryListContainer = document.getElementById("category-list-container");
const plantsCardContainer = document.getElementById("plants-card-container");

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
    const li = document.createElement("li");
    li.classList.add(
      "py-2",
      "w-full",
      "hover:bg-primaryColor",
      "hover:text-white",
      "hover:rounded-sm",
      "pl-2",
      "cursor-pointer",
    );
    li.innerText = ctg?.category_name;

    categoryListContainer.appendChild(li);
  });
};

// load all trees data
const loadAllTrees = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllPlantsCard(data.plants));
};
loadAllTrees();

const displayAllPlantsCard = (plants) => {
  plants.forEach((plant) => {
    const { id, image, name, description, category, price } = plant || {};
    console.log(plant);
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
        <h4 class="text-darkColor text-lg font-bold">${name}</h4>
        <p class="text-grayColor text-sm text-justify"> ${description} </p>
        <div class="flex justify-between items-center py-1">
          <span class="bg-lightGreenColor py-1 px-4 rounded-full text-primaryColor">${category}</span>
          <span class="font-bold">৳${price}</span>
        </div>
        <button class="bg-primaryColor py-2 text-white w-full rounded-full cursor-pointer">Add to Cart</button>
        </div>
    `;
    plantsCardContainer.appendChild(plantCard);
  });
};
