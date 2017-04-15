var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "Manny111", 
    database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
});



//function that displays products from mysql database
var displayAndBuyProducts = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        //create a table 
        var table = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price','Quantity']
        });
        //loop through all products in mysql database and push product information into a new row
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price,res[i].stock_quantity]);
        }

        console.log(`
  ╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ┌┬┐┌─┐  ╔╗ ┌─┐┌┬┐┌─┐┌─┐┌─┐┌┐┌┬
  ║║║├┤ │  │  │ ││││├┤    │ │ │  ╠╩╗├─┤│││├─┤┌─┘│ │││││
  ╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ┴ └─┘  ╚═╝┴ ┴┴ ┴┴ ┴└─┘└─┘┘└┘o
        `);
        // console.log(" **************** Welcome to Bamazon! ****************");
        console.log(table.toString());
        //Ask user the ID and quantity of the product they would like to buy
        inquirer.prompt([{
            name: "productId",
            type: "input",
            message: 'Please enter the ID # of the product you wish to purchase',
            // check that the input is a number
            validate: function(value) {
                if (value < 1 || value > res.length || isNaN(value) == true) {
                    console.log(" is an invalid ID #");
                    return false;
                }
                return true;
            }

        }, {
            name: "Quantity",
            type: "input",
            message: "How many of this item would you like to buy?",
            // check that the input is a number
            validate: 
                function(value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
        //Once the customer has placed the order, check if your store has enough of the product to meet the customer's request.
        }]).then(function(order) {
            var chosenId = order.productId - 1
            //capture chosen product in variable 
            var chosenProduct = res[chosenId] 
            //capture chosen quantity in a variable 
            var chosenQuantity = order.Quantity
            //check store quantity 
            if (chosenQuantity < chosenProduct.stock_quantity) {
                //If store has enough of the product, fulfill the customer's order.
                //show the customer the total cost of their purchase.
                console.log("Your total for " + "(" + order.Quantity + ")" + "  " + chosenProduct.product_name + " is: $" + chosenProduct.price * chosenQuantity);
                //Update the database to reflect the remaining quantity.
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: chosenProduct.stock_quantity - chosenQuantity
                }, {
                    id: chosenProduct.id
                }], function(err, res) {
                // Runs prompt again, so the user can continue shopping.                  
                displayAndBuyProducts();
                });
            //If insufficient quantity, log Insufficient quantity!, and then prevent the order from going through.
            } else {
                console.log("Insufficient quanity at this time");
                displayAndBuyProducts();
            }
        })
    })
}
// Runs prompt again, so the user can continue shopping.
displayAndBuyProducts();




