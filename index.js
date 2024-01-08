// all variables is here
const drawerBtn = document.querySelector(".drawer-button");
const productContainer = document.querySelector("#product-container");
const itemCount = document.querySelector("#item-count");

const cartIds = [];
const cartItems = [];

const foodsItems = [
  {
    id: "1",
    name: "Chicken Fry",
    image:
      "https://images.unsplash.com/photo-1626082896492-766af4eb6501?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZWQlMjBjaGlja2VufGVufDB8fDB8fHww",
    price: 50,
    description:
      "Crispy, golden chicken fry with a flavorful blend of spices,tender on the inside and irresistibly delicious -a perfect balance of crunch and taste.",
  },
  {
    id: "2",
    name: "Chicken fajitas",
    image:
      "https://media.istockphoto.com/id/507532058/photo/mexican-grilled-chicken-fajitas-in-iron-skillet.jpg?s=612x612&w=0&k=20&c=kiYNoqQFc3-qAVV4VYYc0qSKKExzCBBf1qv4a1X-BH4=",
    price: 250,
    description:
      "Sizzling chicken fajitas: Juicy grilled chicken, vibrant bell peppers, and onions, wrapped in warm tortillas. A zesty fiesta of flavors in every bite!",
  },
  {
    id: "3",
    name: "Chicken Masala",
    image:
      "https://media.istockphoto.com/id/1093661590/photo/traditional-indian-dish-chicken-tikka-masala-with-spicy-curry-meat-in-bowl-basmati-rice-bread.jpg?s=612x612&w=0&k=20&c=DCwxqEciOTaN14A13ym6F4p2UnprhNarn7OwIaOLNNo=",
    price: 450,
    description:
      "Savory chicken masala:Succulent pieces in a rich,aromatic blend of spices and tomatoes.Indian flavors that tantalize the taste buds.",
  },
];

let ab = 1;

const closeDrawer = () => {
    itemCount.innerHTML = (`<span>${cartItems?.length ? cartItems?.length : 0}</span>`);
    ab = 1;
    drawerBtn.click();
};

const handleAddToCart = (id) => {

    if(cartIds.includes(id)) {
        return;
    }
    cartIds.push(id);

    const item = foodsItems.find(item => parseInt(item.id) === id);
    cartItems.push(item);
    itemCount.innerHTML = (`<span>${cartItems?.length ? cartItems?.length : 0}</span>`);

    const updatedCards = foodsItems.map((item) => {
        return `
          <div class="card bg-[#ebedef] shadow-xl">
              <figure class="p-3 pb-0">
                  <img src="${item?.image}" class="h-44 w-full object-cover rounded-lg" alt="Shoes" class="rounded-xl" />
              </figure>
              <div class="card-body items-center px-4 pb-4 pt-4">
                  <h2 class=" w-full md:text-xl text-lg font-bold">${item?.name}</h2>
                  <p class="md:text-lg w-full text-base font-medium">
                      ${item?.price}$/each
                  </p>
                  <p class="md:text-sm text-xs text-justify">${item?.description}</p>
                  <div class="card-actions w-full mt-2">
                        ${cartIds.includes(parseInt(item?.id)) ? `<button disabled class="btn btn-primary bg-[#fd5442] text-white border-none uppercase w-full block">Added To Cart</button>` :`<button onclick="handleAddToCart(${item?.id})" class="btn btn-primary bg-[#fd5442] text-white border-none uppercase w-full block">Add To Order</button>` }
                      <button class="btn btn-primary text-[#fd5442] border-2 border-[#fd5442] bg-transparent uppercase w-full block">Customize</button>
                  </div>
              </div>
          </div> 
        `;
      });

      productContainer.innerHTML = updatedCards.join("");
      if(ab === 1) {
        drawerBtn.click();
        ab=0;
      }
}

const allCards = foodsItems.map((item) => {
  return `
    <div class="card bg-[#ebedef] shadow-xl">
        <figure class="p-3 pb-0">
            <img src="${item?.image}" class="h-44 w-full object-cover rounded-lg" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center px-4 pb-4 pt-4">
            <h2 class=" w-full md:text-xl text-lg font-bold">${item?.name}</h2>
            <p class="md:text-lg w-full text-base font-medium">
                ${item?.price}$/each
            </p>
            <p class="md:text-sm text-xs text-justify">${item?.description}</p>
            <div class="card-actions w-full mt-2">
                <button onclick="handleAddToCart(${item?.id})" class="btn btn-primary bg-[#fd5442] text-white border-none uppercase w-full block">Add To Order</button>
                <button class="btn btn-primary text-[#fd5442] border-2 border-[#fd5442] bg-transparent uppercase w-full block">Customize</button>
            </div>
        </div>
    </div>  
  `;
});

productContainer.innerHTML = allCards.join("");
