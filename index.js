import { menuArray } from '/data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let cartItemsArr = []


document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        addItemToCart(e.target.dataset.add)
        document.querySelector('.order-container').classList.remove('hidden')
    } else if (e.target.dataset.remove) {
        removeItemFromCart(e.target.dataset.remove)
    } else if (e.target.id === 'purchase-btn') {
        if (cartItemsArr.length > 0) {
            paymentDetails()
        }
    } else if (e.target.id === 'pay-btn') {
        message()
    }
})
   

function addItemToCart(itemID) {
     const itemObj = menuArray.filter(item => {
         return item.id === Number(itemID)
     })[0]
     
     cartItemsArr.push({
         id: uuidv4(),
         name: itemObj.name,
         price: itemObj.price   
     })
     renderCart()
 }
  
  
function renderCart() {
    document.querySelector('.cart').innerHTML = getCartHtml()
    document.querySelector('.sum').innerHTML = totalPrice()
}

function getCartHtml() {
    return cartItemsArr.map(item => {
        return `
       <div class="cart">
            <div class="cart-item">
            <h3>${item.name}</h3>
            <button data-remove="${item.id}">remove</button>
            <p>$${item.price}</p>
            </div>
        </div>
      `
  }).join('')
 } 

// remove items from cart
function removeItemFromCart(itemID) {
    const targetIndex = cartItemsArr.findIndex(item => {
        return item.id == itemID
    })
    
    if (targetIndex !== -1) {
        cartItemsArr.splice(targetIndex, 1)
        renderCart()
    }
    
    if (cartItemsArr.length === 0) {
     document.querySelector('.order-container').classList.add('hidden')   
    }   
}

// total price of orders
function totalPrice() {
    let total = 0
    cartItemsArr.forEach(item => {
        total += item.price
    })
    return `$${total}`
}

// display payment modal
 function paymentDetails() {
     document.querySelector('.modal').style.display = 'block';
 }
 
 // After pressing pay button
 function message() {
     const payInfo = document.getElementById('form')
     const formData = new FormData(payInfo)
     const fullName = formData.get('fullName')
     document.querySelector('.modal').innerHTML = `
     <div class="modal-text">
         <h2>Thank you <span class="modal-display-name">${fullName}</span>, 
         we've received your order!</h2>
     </div>
     `
 }


// render menu
function getMenuHtml() {
    
    return menuArray.map(item => {
        return `
    <div class="item-container">
        <div class="food-container">
            <div class="food-icons">${item.emoji}</div> 
            <div class="description">
                <h3 class="item-name">${item.name}</h3>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <i class="fa-solid fa-cart-plus" data-add="${item.id}"></i>                             
        </div>
    </div>
    `
    }).join('')
}
    
function renderMenu() {
    document.querySelector('.menu-container').innerHTML = getMenuHtml()
}
renderMenu()
   

















