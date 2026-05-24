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
