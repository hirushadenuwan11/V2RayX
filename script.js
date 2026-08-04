/* =====================================================
   V2RayX CUSTOMER PAGE JAVASCRIPT
===================================================== */


/*
=========================================================
API CONFIGURATION
=========================================================

දැනට empty තියන්න.

පස්සේ Google Apps Script / Backend API එක
connect කළාම මෙතන URL එක දාන්න.

Example:

const API_URL =
"https://script.google.com/macros/s/AKfycbzzg-3FoJiE73IXu1kavRGRp-JXEVmdxy7m4O2vjLggK59yE9MviWrekx2NX9SyZZEZmA/exec";

*/

const API_URL = "https://script.google.com/macros/s/AKfycbzzg-3FoJiE73IXu1kavRGRp-JXEVmdxy7m4O2vjLggK59yE9MviWrekx2NX9SyZZEZmA/exec";


/*
=========================================================
WHATSAPP NUMBER
=========================================================

+94 format එකෙන් දාන්න.

Example:

94771234567

*/

const WHATSAPP_NUMBER = "94771234567";


/*
=========================================================
CURRENT ORDER
=========================================================
*/

let currentOrder = {
    plan: "",
    duration: "",
    price: ""
};


/*
=========================================================
YEAR
=========================================================
*/

document.getElementById("year").textContent =
    new Date().getFullYear();


/*
=========================================================
MOBILE MENU
=========================================================
*/

function toggleMobileMenu(){

    const menu =
        document.getElementById("mobileMenu");

    if(menu.style.display === "block"){

        menu.style.display = "none";

    }else{

        menu.style.display = "block";

    }

}


function closeMobileMenu(){

    document.getElementById("mobileMenu")
        .style.display = "none";

}


/*
=========================================================
SCROLL TO PLANS
=========================================================
*/

function scrollToPlans(){

    const plans =
        document.getElementById("plans");

    plans.scrollIntoView({
        behavior: "smooth"
    });

}


/*
=========================================================
OPEN ORDER
=========================================================
*/

function openOrder(
    plan,
    duration,
    price
){

    currentOrder.plan = plan;
    currentOrder.duration = duration;
    currentOrder.price = price;


    document.getElementById("orderPlan")
        .textContent = plan;

    document.getElementById("orderDuration")
        .textContent = duration;

    document.getElementById("orderPrice")
        .textContent = "Rs. " + price;


    document.getElementById("orderModal")
        .style.display = "block";


    document.body.style.overflow = "hidden";

}


/*
=========================================================
CLOSE ORDER
=========================================================
*/

function closeOrder(){

    document.getElementById("orderModal")
        .style.display = "none";

    document.getElementById("orderFormArea")
        .style.display = "block";

    document.getElementById("orderSuccess")
        .style.display = "none";

    document.getElementById("orderForm")
        .reset();

    document.body.style.overflow = "";

}


/*
=========================================================
ORDER ID
=========================================================
*/

function generateOrderId(){

    const random =
        Math.floor(
            10000 +
            Math.random() * 90000
        );

    return "V2-" + random;

}


/*
=========================================================
VALIDATE PHONE
=========================================================
*/

function validatePhone(phone){

    const cleaned =
        phone.replace(/\s+/g, "");

    return /^0[0-9]{9}$/.test(cleaned);

}


/*
=========================================================
SUBMIT ORDER
=========================================================
*/

document
    .getElementById("orderForm")
    .addEventListener(
        "submit",
        async function(event){

            event.preventDefault();


            const name =
                document
                    .getElementById("customerName")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("customerPhone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("customerEmail")
                    .value
                    .trim();


            const payment =
                document
                    .getElementById("paymentMethod")
                    .value;


            if(name.length < 2){

                alert(
                    "Please enter your full name."
                );

                return;

            }


            if(!validatePhone(phone)){

                alert(
                    "Please enter a valid WhatsApp number."
                );

                return;

            }


            if(!email){

                alert(
                    "Please enter your email address."
                );

                return;

            }


            if(!payment){

                alert(
                    "Please select a payment method."
                );

                return;

            }


            const orderId =
                generateOrderId();


            const orderData = {

                orderId: orderId,

                name: name,

                phone: phone,

                email: email,

                plan: currentOrder.plan,

                duration: currentOrder.duration,

                price: currentOrder.price,

                payment: payment,

                createdAt:
                    new Date().toISOString()

            };


            /*
            =============================================
            DEMO MODE
            =============================================
            */

            if(!API_URL){

                localStorage.setItem(
                    "lastOrder",
                    JSON.stringify(orderData)
                );


                showOrderSuccess(orderId);


                return;

            }


            /*
            =============================================
            BACKEND MODE
            =============================================
            */

            try{

                const submitButton =
                    document.querySelector(
                        ".modal-submit"
                    );


                submitButton.disabled = true;

                submitButton.textContent =
                    "Creating Order...";


                const response =
                    await fetch(
                        API_URL,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify(
                                    orderData
                                )

                        }
                    );


                const result =
                    await response.json();


                if(result.success){

                    showOrderSuccess(
                        result.orderId ||
                        orderId
                    );

                }else{

                    throw new Error(
                        result.message ||
                        "Order creation failed."
                    );

                }


            }catch(error){

                console.error(error);

                alert(
                    "Unable to create order. " +
                    "Please try again."
                );


            }finally{

                const submitButton =
                    document.querySelector(
                        ".modal-submit"
                    );


                submitButton.disabled = false;

                submitButton.textContent =
                    "Continue to Payment →";

            }

        }
    );


/*
=========================================================
SHOW ORDER SUCCESS
=========================================================
*/

function showOrderSuccess(orderId){

    document.getElementById("orderFormArea")
        .style.display = "none";


    document.getElementById("orderSuccess")
        .style.display = "block";


    document.getElementById("generatedOrderId")
        .textContent = orderId;

}


/*
=========================================================
LOGIN MODAL
=========================================================
*/

function openLogin(){

    document.getElementById("loginModal")
        .style.display = "block";

    document.body.style.overflow = "hidden";

}


function closeLogin(){

    document.getElementById("loginModal")
        .style.display = "none";

    document.body.style.overflow = "";

}


/*
=========================================================
REGISTER MODAL
=========================================================
*/

function openRegister(){

    closeLogin();

    document.getElementById("registerModal")
        .style.display = "block";

    document.body.style.overflow = "hidden";

}


function closeRegister(){

    document.getElementById("registerModal")
        .style.display = "none";

    document.body.style.overflow = "";

}


function openLoginFromRegister(){

    closeRegister();

    openLogin();

}


/*
=========================================================
LOGIN DEMO
=========================================================
*/

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            alert(
                "Login backend is not connected yet."
            );

        }
    );


/*
=========================================================
REGISTER DEMO
=========================================================
*/

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            alert(
                "Registration backend is not connected yet."
            );

        }
    );


/*
=========================================================
WHATSAPP
=========================================================
*/

function openWhatsApp(){

    if(
        !WHATSAPP_NUMBER ||
        WHATSAPP_NUMBER === "94771234567"
    ){

        alert(
            "Please add your WhatsApp number in script.js"
        );

        return;

    }


    const message =
        encodeURIComponent(
            "Hello, I need help with V2Ray service."
        );


    window.open(
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        message,
        "_blank"
    );

}


/*
=========================================================
CLOSE MODALS WHEN CLICK OUTSIDE
=========================================================
*/

window.addEventListener(
    "click",
    function(event){

        const orderModal =
            document.getElementById(
                "orderModal"
            );

        const loginModal =
            document.getElementById(
                "loginModal"
            );

        const registerModal =
            document.getElementById(
                "registerModal"
            );


        if(event.target === orderModal){

            closeOrder();

        }


        if(event.target === loginModal){

            closeLogin();

        }


        if(event.target === registerModal){

            closeRegister();

        }

    }
);


/*
=========================================================
ESC KEY CLOSE MODALS
=========================================================
*/

document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Escape"){

            closeOrder();

            closeLogin();

            closeRegister();

        }

    }
);
