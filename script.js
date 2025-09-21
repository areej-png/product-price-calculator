const products = [
    {id:1, name:"Laptop", price:800, category:"Electronics", stock:50, rating:4.5, qty:1, image:"laptop.png"},
    {id:2, name:"Smartphone", price:600, category:"Electronics", stock:100, rating:4.7, qty:1, image:"smartphone.png"},
    {id:3, name:"Headphones", price:150, category:"Accessories", stock:200, rating:4.3, qty:1, image:"headphones.png"},
];

const tbody = document.querySelector("#product-table tbody");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const shippingInput = document.getElementById("shipping");
const discountInput = document.getElementById("discount");

function format(n){ return n.toFixed(2); }

function render(){
    tbody.innerHTML = "";
    products.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${p.image}" alt="${p.name}" width="50"></td>
            <td class="product-name">${p.name}</td>
            <td class="product-price">$${format(p.price)}</td>
            <td>
            <div class="quantity-controls">
                <button class="decrease" data-id="${p.id}">-</button>
                <input type="number" class="quantity" data-id="${p.id}" value="${p.qty}" min="1">
                <button class="increase" data-id="${p.id}">+</button>
            </div>
            </td>
            <td class="row-total">$<span class="row-sub" data-id="${p.id}">${format(p.price * p.qty)}</span></td>
            <td><button class="remove-btn" data-id="${p.id}">Remove</button></td>
        `;
        tbody.appendChild(tr);
    });
    attachEvents();
    recalc();
}

function recalc(){
    let subtotal = products.reduce((s,p) => s + p.price * p.qty, 0);
    const shipping = parseFloat(shippingInput.value) || 0;
    const discount = parseFloat(discountInput.value) || 0;
    const total = subtotal + shipping - discount;
    subtotalElement.innerText = format(subtotal);
    totalElement.innerText = format(total >= 0 ? total : 0);

    // update row subtotals
    products.forEach(p => {
        const el = document.querySelector(`.row-sub[data-id="${p.id}"]`);
        if(el) el.innerText = format(p.price * p.qty);
    });
}

function attachEvents(){
    document.querySelectorAll(".increase").forEach(b => b.onclick = e => {
        const id = +e.target.dataset.id;
        const p = products.find(p=>p.id===id);
        p.qty++;
        render();
    });

    document.querySelectorAll(".decrease").forEach(b => b.onclick = e => {
        const id = +e.target.dataset.id;
        const p = products.find(p=>p.id===id);
        if(p.qty>1) p.qty--;
        render();
    });

    document.querySelectorAll(".quantity").forEach(inp => inp.oninput = e => {
        const id = +e.target.dataset.id;
        const val = parseInt(e.target.value) || 1;
        products.find(p=>p.id===id).qty = val;
        recalc();
    });

    document.querySelectorAll(".remove-btn").forEach(b => b.onclick = e => {
        const id = +e.target.dataset.id;
        const idx = products.findIndex(p=>p.id===id);
        if(idx!==-1) products.splice(idx,1);
        render();
    });
}

// shipping/discount listeners
shippingInput.oninput = recalc;
discountInput.oninput = recalc;

document.getElementById("save-local").onclick = () => {
    localStorage.setItem("ppc_products", JSON.stringify(products));
    alert("Saved");
};
document.getElementById("clear-local").onclick = () => {
    localStorage.removeItem("ppc_products");
    alert("Cleared");
};

render();
// load from localStorage if available
const saved = localStorage.getItem("ppc_products");
if(saved){
    const arr = JSON.parse(saved);
    if(Array.isArray(arr) && arr.length){
        products.length = 0;
        arr.forEach(p => products.push(p));
        render();
    }
}

// End of cart Functionality 
// Array method practice - filter, map, reduce
let count = 0;
for (let i= 0 ; i <products.length ; i++){
    count ++;
}
console.log(count); 
products.forEach(product => {
    if (product.stock >= 100){
        console.log(product.name);
    }
});
const highestProduct = products.reduce((acc, product) => {
    return (!acc || product.price > acc.price) ? product : acc;
}, null);
console.log(`Highest priced product: ${highestProduct.name} at $${highestProduct.price}`);

const totalquantity = products.reduce((sum, product) => sum + product.qty, 0);
console.log(`Total quantity of all products: ${totalquantity}`);
 const mapped = products.map(product => ({ name: product.name, price: product.price }));
 console.log(mapped);

 const filtered = products.filter(product => product.price >= 500);
    console.log(filtered); 
 const find =products.find(product => product.rating > 4.5);
 console.log(find.name);
 const some = products.some(product => product.stock < 0 );
    console.log(some);
    const every = products.every(product => product.rating <4 );
    console.log(every);

