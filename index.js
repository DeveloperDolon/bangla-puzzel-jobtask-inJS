// all variables is here
const drawerBtn = document.querySelector(".drawer-button");
const productContainer = document.querySelector("#product-container");
const itemCount = document.querySelector("#item-count");
const cartItemsContainer = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");

let cartIds = [];
let cartItems = [];

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

let quantity = 1;

const closeDrawer = () => {
    itemCount.innerHTML = (`<span>${cartItems?.length ? cartItems?.length : 0}</span>`);
    ab = 1;

    drawerBtn.click();
};

const changeToNumber = () => {
    ab = 1;
}

const handleIncrease = (id, price) => {
    quantity++;
    document.querySelector(`#productQuantity_${id}`).innerHTML = quantity + "";
    document.querySelector(`#product_price_${id}`).innerHTML = quantity * price;
}

const handleDecrease = (id, price) => {
    if(quantity > 1) {
        quantity--;
        document.querySelector(`#productQuantity_${id}`).innerHTML = quantity + "";
        document.querySelector(`#product_price_${id}`).innerHTML = quantity * price;
    }
}


const handleRemoveItem = (id) => {
    cartIds = cartIds.filter(item => item !== id);
    cartItems = cartItems.filter(item => parseInt(item?.id) !== id);
    
    cartItemsContainer.innerHTML = cartItems?.map(item =>  {
        return `<div class='border-2 border-white grid grid-cols-5 rounded-lg relative p-2 gap-5'>
            <div class='col-span-2'>
                <img src=${item?.image} class='w-full h-[100px] object-cover rounded-lg' alt="" />
            </div>

            <div class='col-span-3'>
                <h5 class='md:text-lg text-base font-semibold text-white'>${item?.name}</h5>
                <p class='md:text-sm text-xs font-medium text-white'>${item?.price}$/each</p>

                <div class='flex mt-3 items-center'>
                    <button onclick="handleDecrease(${item?.id}, ${item?.price})" class='px-[8.5px] py-1 font-bold bg-gray-200 rounded-md'> - </button>
                    <span id="productQuantity_${item?.id}" class='px-4 bg-white md:text-sm text-xs font-semibold py-[2px]'>${quantity}</span>
                    <button onclick="handleIncrease(${item?.id}, ${item?.price})" class='px-[6px] py-1 font-bold bg-gray-200 rounded-md'> + </button>
                </div>

                <p id="product_price_${item?.id}" class="absolute bottom-1 right-1 md:text-lg text-base font-medium text-white">
                    ${item?.price}$
                </p>

                <button onclick="handleRemoveItem(${item?.id})" class="absolute bg-white text-[#fd5442] -top-2 z-40 px-1 -right-2 rounded-md"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `
    })

    cartCount.innerHTML = cartItems?.length;
    itemCount.innerHTML = (`<span>${cartItems?.length ? cartItems?.length : 0}</span>`);

    if(cartItems?.length === 0) {
        cartCount.classList.add("hidden");
        cartCount.classList.remove("flex");
    }

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
}

const handleAddToCart = (id) => {

    if(cartIds.includes(id)) {
        return;
    }
    cartIds.push(id);


    const item = foodsItems.find(item => parseInt(item.id) === id);
    cartItems.push(item);
    itemCount.innerHTML = (`<span>${cartItems?.length ? cartItems?.length : 0}</span>`);

    cartItemsContainer.innerHTML = cartItems?.map(item =>  {
        return `<div class='border-2 border-white grid grid-cols-5 rounded-lg relative p-2 gap-5'>
            <div class='col-span-2'>
                <img src=${item?.image} class='w-full h-[100px] object-cover rounded-lg' alt="" />
            </div>

            <div class='col-span-3'>
                <h5 class='md:text-lg text-base font-semibold text-white'>${item?.name}</h5>
                <p class='md:text-sm text-xs font-medium text-white'>${item?.price}$/each</p>

                <div class='flex mt-3 items-center'>
                    <button onclick="handleDecrease(${item?.id}, ${item?.price})" class='px-[8.5px] py-1 font-bold bg-gray-200 rounded-md'> - </button>
                    <span id="productQuantity_${item?.id}" class='px-4 bg-white md:text-sm text-xs font-semibold py-[2px]'>${quantity}</span>
                    <button onclick="handleIncrease(${item?.id}, ${item?.price})" class='px-[6px] py-1 font-bold bg-gray-200 rounded-md'> + </button>
                </div>

                <p id="product_price_${item?.id}" class="absolute bottom-1 right-1 md:text-lg text-base font-medium text-white">
                    ${item?.price}$
                </p>

                <button onclick="handleRemoveItem(${item?.id})" class="absolute bg-white text-[#fd5442] -top-2 z-40 px-1 -right-2 rounded-md"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `
    })

    cartCount.innerHTML = cartItems?.length;

    if(cartItems?.length > 0) {
        cartCount.classList.remove("hidden");
        cartCount.classList.add("flex");
    }

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
