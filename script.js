const candyTable = document.getElementById("candy-table");
const addCandyForm = document.getElementById("add-candy-form");

// function to update the candy quantity
function buyCandy(rowNum) {
  const quantityCell = candyTable.rows[rowNum + 1].cells[3];
  let quantity = parseInt(quantityCell.innerHTML);
  if (quantity > 0) {
    quantity--;
    quantityCell.innerHTML = quantity;
  } else {
    alert("Sorry, this candy is sold out!");
  }
}

// function to add a new candy to the table
function addCandy(candyName, description, price, quantity) {
  const newRow = candyTable.insertRow(-1);
  newRow.innerHTML = `<td>${candyName}</td><td>${description}</td><td>${price}</td><td>${quantity}</td><td><button class="buy-button" onclick="buyCandy(${candyTable.rows.length - 2})">Buy</button></td>`;
}

// add event listener for form submission
addCandyForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const candyName = document.getElementById("candy-name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const data = {
    "candyName": candyName,
    "description": description,
    "price": price,
    "quantity": quantity
  };
  fetch("https://crudcrud.com/api/b9ea7f92b8514aada438504bbbaf07d4/candies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    addCandy(data.candyName, data.description, data.price, data.quantity);
    addCandyForm.reset();
  })
  .catch(error => console.error(error));
});

	
  
    

  
  

  
