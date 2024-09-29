
//Necessary Functions
function displayError(element, text) {
    let errorText = document.createTextNode(text);
    if (element.name == "username") {
        usernameError.innerHTML = "";
        usernameError.appendChild(errorText);
    }
    else if (element.name == "email") {
        emailError.innerHTML = "";
        emailError.appendChild(errorText);
    }
    else if (element.name == "phoneNumber") {
        phoneNumberError.innerHTML = "";
        phoneNumberError.appendChild(errorText);
    }
    else if (element.name == "password") {
        passwordError.innerHTML = "";
        passwordError.appendChild(errorText);
    }
    else if (element.name == "confirmedPassword") {
        confirmedPasswordError.innerHTML = "";
        confirmedPasswordError.appendChild(errorText);
    }
}
function removeError(element) {
    element.innerHTML = "";
}

//Change layout based on screen size
function changeLayout() {
    const openBtn = document.getElementById("sideMenuButton");
    const sidebar = document.getElementById("sideNav");
    const indexMainSection = document.getElementById("indexMainSection");
    const loginPageMainSection = document.getElementById("signIn");
    const registerPageMainSection = document.getElementById("main");

    //Side nav is open
    if (window.innerWidth > 992) {
        sidebar.className = "sideNavOpened"
        //Hide the icons
        const icons = document.querySelectorAll(".navCell i");
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList = "hidden"
        }
        //Contact List
        const contactContainer = document.getElementById("contactContainer");
        contactContainer.addEventListener("click", () => {
            const contactList = document.getElementById("contactList");
            contactList.classList.toggle("visible");
        });
    }

    //Side nav is closed
    else {
        sidebar.className = "hidden sideNavClosed";
        window.setTimeout(() => {
            sidebar.classList.remove("hidden");
        }, 500);
    }

    //Side nav open/close
    openBtn.addEventListener("click", (event) => {
        sidebar.classList.toggle("sideNavOpened");
        const contactContainer = document.getElementById("contactContainer");
        contactContainer.addEventListener("click", () => {
            const contactList = document.getElementById("contactList");
            contactList.classList.toggle("visible");
        });
    });
}
function changeLayout2() {
    const openBtn = document.getElementById("sideMenuButton");
    const sidebar = document.getElementById("sideNav");
    const indexMainSection = document.getElementById("indexMainSection");
    const loginPageMainSection = document.getElementById("signIn");
    const registerPageMainSection = document.getElementById("main");

    //Side nav is open
    if (window.innerWidth > 992) {
        sidebar.className = "sideNavOpened"
        //Hide the icons
        const icons = document.querySelectorAll(".navCell i");
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList = "hidden"
        }
        //Contact List
        const contactContainer = document.getElementById("contactContainer");
        contactContainer.addEventListener("click", () => {
            const contactList = document.getElementById("contactList");
            contactList.classList.toggle("visible");
        });
    }
    //Side nav is closed
    else {
        sidebar.className = "hidden sideNavClosed";
        window.setTimeout(() => {
            sidebar.classList.remove("hidden");
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', changeLayout);
window.addEventListener('orientationchange', changeLayout2);
window.addEventListener('resize', changeLayout2);


//Registration Form Validation
document.addEventListener('DOMContentLoaded', function () {

    //Get all input fields
    const inputElements = document.querySelectorAll(".inputElement");

    //Get error divs
    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const phoneNumberError = document.getElementById("phoneNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmedPasswordError = document.getElementById("confirmedPasswordError");
    const errorDivs = [usernameError, emailError, phoneNumberError, passwordError, confirmedPasswordError];

    //Get specific input fields
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phoneNumber");
    const password = document.getElementById("password");
    const confirmedPassword = document.getElementById("repeatPassword");

    //All fields are required
    document.getElementById("registerForm").addEventListener('submit', (event) => {
        for (let element of inputElements) {
            if (element.value == "null" || element.value == "") {
                event.preventDefault();
                displayError(element, "This field can't be empty!")
            }
        }
    });

    //On reset, clear error divs
    document.getElementById("registerForm").addEventListener('reset', () => {
        for (let div of errorDivs) {
            removeError(div);
        }
    });

    //Confirm email
    if (email !== null) {
        email.addEventListener("blur", () => {
            const emailValue = email.value;
            const pattern = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
            if (emailValue != "") {
                if (pattern.test(emailValue)) {
                    removeError(emailError);
                }
                else {
                    email.value = "";
                    displayError(email, "Enter a valid email!");
                }
            }
        })
    }

    //Confirm phone number
    if (phoneNumber !== null) {
        phoneNumber.addEventListener("blur", () => {
            const phoneNumberValue = phoneNumber.value.trim();
            const pattern = /^[0-9]{8}$/;
            if (phoneNumberValue != "") {
                if (pattern.test(phoneNumberValue)) {
                    removeError(phoneNumberError);
                }
                else {
                    phoneNumber.value = "";
                    displayError(phoneNumber, "Your phone number should be of 8 digits!")
                }
            }
        });
    }

    //Confirm password
    if (confirmedPassword !== null) {
        confirmedPassword.addEventListener("blur", () => {
            const firstPassword = password.value;
            const secondPassword = confirmedPassword.value;
            if (firstPassword !== secondPassword) {
                confirmedPassword.value = "";
                displayError(confirmedPassword, "Passsword doesn't match!");
            }
            else {
                removeError(confirmedPasswordError);
            }
        });
    }
});


//Adding Data(Products)
document.addEventListener('DOMContentLoaded', function () {

    cartAlert.classList.add("hidden");
    const animation = document.getElementById("animation");
    animation.className = "animation";

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            animation.className = "hidden";

            //Data of the JSON file
            const myLaptops = data;
            const section = document.getElementById("availableProducts");
            const filterBtn = document.getElementById("filter");

            //Function that adds the products
            function addProduct(product) {
                const div = document.createElement("div");
                div.classList = "card";
                const img = document.createElement("img");
                img.src = src = "Images/61Qe0euJJZL.jpg";
                const brandName = document.createElement("h4");
                brandName.innerText = product.brand;
                const price = document.createElement("p");
                price.innerText = product.price;
                const description = document.createElement("p");
                description.classList = "card-description";
                description.innerText = product.description;
                const text = document.createTextNode("Add to cart");
                const button = document.createElement("button");
                button.append(text)
                button.setAttribute("class", "addToCart");
                button.setAttribute("data-brand", product.brand);
                button.setAttribute("data-price", product.price);
                button.setAttribute("data-description", product.description);
                div.append(img);
                div.append(brandName);
                div.append(price);
                div.append(description);
                div.append(button)
                section.append(div);
            }

            //By default, display all data
            for (let i = 0; i < myLaptops.length; i++) {
                addProduct(myLaptops[i]);
            }
            window.scrollTo(0, 0);


            //Saving data to local storage - Add to cart events
            let counter = localStorage.length;
            const cartAlert = document.getElementById("cartAlert");
            document.addEventListener("click", (event) => {
                if (event.target.classList == "addToCart") {
                    const obj = {
                        brand: event.target.dataset.brand,
                        description: event.target.dataset.description,
                        price: event.target.dataset.price
                    };
                    localStorage.setItem(counter, JSON.stringify(obj));
                    counter++;
                    const objects = [];
                    for (let i = 0; i < localStorage.length; i++) {
                        const objKey = localStorage.key(i)
                        const obj = JSON.parse(localStorage.getItem(objKey));
                        objects.push(obj);
                    }
                    cartAlert.classList.remove("hidden");
                    window.setTimeout(() => {
                        cartAlert.classList.add("hidden");
                    }, 1000);
                }
            });

            //If pressed anywhere, close the list
            document.addEventListener('click', function (event) {
                if (event.target.id == "overlay") {
                    options.classList = "brands_unvisible";
                    overlay.className = "hidden overlay"
                }
            });

            //Filter Button
            //Overlay Hidden
            const overlay = document.getElementById("overlay");
            overlay.className = "hidden overlay";
            //Click filter Button
            filterBtn.addEventListener("click", () => {
                //On click code
                const options = document.getElementById("options");
                overlay.classList.toggle("visible");
                options.classList.toggle("brands_Visible");
                //Add event listeners to the options
                const optionsList = document.querySelectorAll("#options li");
                let optionChoosed = "";
                for (let i = 0; i < optionsList.length; i++) {
                    optionsList[i].addEventListener("click", () => {
                        options.classList = "brands_unvisible";
                        overlay.className = "hidden overlay"
                        section.innerHTML = "";
                        optionChoosed = optionsList[i].getAttribute('data-value');
                        for (let i = 0; i < myLaptops.length; i++) {
                            if (myLaptops[i].brand === optionChoosed) {
                                addProduct(myLaptops[i]);
                            }
                            window.scrollTo(0, 0);
                        }
                    })
                }
            })
        })
        .catch(error => {
            console.log('Error fetching the JSON file:', error);
        });
});


//Cart page
document.addEventListener("DOMContentLoaded", function () {

    //Get data in the storage
    const table = document.getElementById("table");
    const objects = [];
    for (let i = 0; i < localStorage.length; i++) {
        const objKey = localStorage.key(i);
        const obj = JSON.parse(localStorage.getItem(objKey));
        objects.push(obj);
    }

    //Fill the table with the data in the storage
    const select = document.getElementById(("selectedItems"))
    if (objects.length > 0 && table != "null") {
        emptyCart.classList.add("hidden")
        let i = 1;
        for (let element of objects) {
            const option = document.createElement("option");
            option.value = i - 1;
            option.innerText = i;
            select.append(option);
            const row = document.createElement("tr");
            const rank = document.createElement("td");
            rank.innerText = i++;
            const price = document.createElement("td");
            price.innerText = element.price;
            const description = document.createElement("td");
            description.innerText = element.description;
            const brand = document.createElement("td");
            brand.innerText = element.brand;
            row.append(rank)
            row.append(brand);
            row.append(description);
            row.append(price);
            table.append(row)
        }
    }

    //RemoveElement
    const removeItemButton = document.getElementById("removeItem");
    removeItemButton.addEventListener("click", () => {
        const selectedValue = select.value;
        const key = localStorage.key(selectedValue);
        localStorage.removeItem(key);
        window.location.reload();
    })

    //Clear Cart Button
    const button = document.getElementById("clearCart");
    button.addEventListener("click", function () {
        localStorage.clear();
        window.location.reload();
        const emptyCart = document.getElementById("emptyCart");
    })
});











