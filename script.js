/* =====================================================
   V2RayX CUSTOMER PAGE JAVASCRIPT
===================================================== */


/*
=========================================================
GOOGLE APPS SCRIPT API
=========================================================
*/

const API_URL =
"https://script.google.com/macros/s/AKfycbzzg-3FoJiE73IXu1kavRGRp-JXEVmdxy7m4O2vjLggK59yE9MviWrekx2NX9SyZZEZmA/exec";


/*
=========================================================
WHATSAPP NUMBER
=========================================================
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

document.addEventListener("DOMContentLoaded", function(){

    const year =
        document.getElementById("year");

    if(year){

        year.textContent =
            new Date().getFullYear();

    }

});


/*
=========================================================
MOBILE MENU
=========================================================
*/

function toggleMobileMenu(){

    const menu =
        document.getElementById("mobileMenu");

    if(!menu) return;


    if(menu.style.display === "block"){

        menu.style.display = "none";

    }else{

        menu.style.display = "block";

    }

}


function closeMobileMenu(){

    const menu =
        document.getElementById("mobileMenu");

    if(menu){

        menu.style.display = "none";

    }

}


/*
=========================================================
SCROLL TO PLANS
=========================================================
*/

function scrollToPlans(){

    const plans =
        document.getElementById("plans");

    if(!plans) return;


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

    currentOrder.plan =
        plan;

    currentOrder.duration =
        duration;

    currentOrder.price =
        price;


    const orderPlan =
        document.getElementById("orderPlan");

    const orderDuration =
        document.getElementById("orderDuration");

    const orderPrice =
        document.getElementById("orderPrice");

    const orderModal =
        document.getElementById("orderModal");


    if(orderPlan){

        orderPlan.textContent =
            plan;

    }


    if(orderDuration){

        orderDuration.textContent =
            duration;

    }


    if(orderPrice){

        orderPrice.textContent =
            "Rs. " + price;

    }


    if(orderModal){

        orderModal.style.display =
            "block";

    }


    document.body.style.overflow =
        "hidden";

}


/*
=========================================================
CLOSE ORDER
=========================================================
*/

function closeOrder(){

    const orderModal =
        document.getElementById("orderModal");

    const orderFormArea =
        document.getElementById("orderFormArea");

    const orderSuccess =
        document.getElementById("orderSuccess");

    const orderForm =
        document.getElementById("orderForm");


    if(orderModal){

        orderModal.style.display =
            "none";

    }


    if(orderFormArea){

        orderFormArea.style.display =
            "block";

    }


    if(orderSuccess){

        orderSuccess.style.display =
            "none";

    }


    if(orderForm){

        orderForm.reset();

    }


    document.body.style.overflow =
        "";

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


    return /^0[0-9]{9}$/.test(
        cleaned
    );

}


/*
=========================================================
SEND ORDER TO GOOGLE SHEET
=========================================================
*/

function sendOrderToGoogleSheet(
    orderData,
    callback
){

    /*
    =============================================
    CREATE HIDDEN IFRAME
    =============================================
    */

    const iframe =
        document.createElement("iframe");


    iframe.name =
        "googleOrderFrame_" +
        Date.now();


    iframe.style.display =
        "none";


    document.body.appendChild(
        iframe
    );


    /*
    =============================================
    CREATE HIDDEN FORM
    =============================================
    */

    const form =
        document.createElement("form");


    form.method =
        "POST";


    form.action =
        API_URL;


    form.target =
        iframe.name;


    form.style.display =
        "none";


    /*
    =============================================
    ADD FIELD FUNCTION
    =============================================
    */

    function addField(
        fieldName,
        fieldValue
    ){

        const input =
            document.createElement("input");


        input.type =
            "hidden";


        input.name =
            fieldName;


        input.value =
            fieldValue || "";


        form.appendChild(
            input
        );

    }


    /*
    =============================================
    SEND DATA
    =============================================
    */

    addField(
        "orderId",
        orderData.orderId
    );


    addField(
        "customerName",
        orderData.name
    );


    addField(
        "phone",
        orderData.phone
    );


    addField(
        "email",
        orderData.email
    );


    addField(
        "package",
        orderData.plan
    );


    addField(
        "duration",
        orderData.duration
    );


    addField(
        "price",
        orderData.price
    );


    addField(
        "paymentMethod",
        orderData.payment
    );


    /*
    =============================================
    ADD FORM
    =============================================
    */

    document.body.appendChild(
        form
    );


    /*
    =============================================
    SUBMIT
    =============================================
    */

    form.submit();


    /*
    =============================================
    SUCCESS CALLBACK
    =============================================
    
    Google Apps Script receives the order.
    
    Since GitHub Pages cannot directly read the
    cross-origin response, we show success after
    submitting the form.
    */

    setTimeout(function(){

        callback();


        /*
        =========================================
        CLEANUP
        =========================================
        */

        setTimeout(function(){

            form.remove();

            iframe.remove();

        }, 3000);

    }, 1200);

}


/*
=========================================================
SUBMIT ORDER
=========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const orderForm =
            document.getElementById(
                "orderForm"
            );


        if(!orderForm) return;


        orderForm.addEventListener(
            "submit",
            function(event){

                event.preventDefault();


                /*
                =============================================
                GET CUSTOMER DETAILS
                =============================================
                */

                const name =
                    document
                        .getElementById(
                            "customerName"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "customerPhone"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "customerEmail"
                        )
                        .value
                        .trim();


                const payment =
                    document
                        .getElementById(
                            "paymentMethod"
                        )
                        .value;


                /*
                =============================================
                VALIDATION
                =============================================
                */

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


                /*
                =============================================
                CREATE ORDER ID
                =============================================
                */

                const orderId =
                    generateOrderId();


                /*
                =============================================
                ORDER DATA
                =============================================
                */

                const orderData = {

                    orderId:
                        orderId,

                    name:
                        name,

                    phone:
                        phone,

                    email:
                        email,

                    plan:
                        currentOrder.plan,

                    duration:
                        currentOrder.duration,

                    price:
                        currentOrder.price,

                    payment:
                        payment,

                    createdAt:
                        new Date().toISOString()

                };


                /*
                =============================================
                SAVE LOCAL COPY
                =============================================
                */

                localStorage.setItem(
                    "lastOrder",
                    JSON.stringify(
                        orderData
                    )
                );


                /*
                =============================================
                BUTTON
                =============================================
                */

                const submitButton =
                    orderForm.querySelector(
                        ".modal-submit"
                    );


                if(submitButton){

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Creating Order...";

                }


                /*
                =============================================
                SEND TO GOOGLE SHEET
                =============================================
                */

                sendOrderToGoogleSheet(
                    orderData,
                    function(){

                        showOrderSuccess(
                            orderId
                        );


                        if(submitButton){

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                "Continue to Payment →";

                        }

                    }
                );

            }
        );

    }
);


/*
=========================================================
SHOW ORDER SUCCESS
=========================================================
*/

function showOrderSuccess(
    orderId
){

    const orderFormArea =
        document.getElementById(
            "orderFormArea"
        );


    const orderSuccess =
        document.getElementById(
            "orderSuccess"
        );


    const generatedOrderId =
        document.getElementById(
            "generatedOrderId"
        );


    if(orderFormArea){

        orderFormArea.style.display =
            "none";

    }


    if(orderSuccess){

        orderSuccess.style.display =
            "block";

    }


    if(generatedOrderId){

        generatedOrderId.textContent =
            orderId;

    }

}


/*
=========================================================
LOGIN MODAL
=========================================================
*/

function openLogin(){

    const loginModal =
        document.getElementById(
            "loginModal"
        );


    if(!loginModal) return;


    loginModal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

}


function closeLogin(){

    const loginModal =
        document.getElementById(
            "loginModal"
        );


    if(loginModal){

        loginModal.style.display =
            "none";

    }


    document.body.style.overflow =
        "";

}


/*
=========================================================
REGISTER MODAL
=========================================================
*/

function openRegister(){

    closeLogin();


    const registerModal =
        document.getElementById(
            "registerModal"
        );


    if(!registerModal) return;


    registerModal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

}


function closeRegister(){

    const registerModal =
        document.getElementById(
            "registerModal"
        );


    if(registerModal){

        registerModal.style.display =
            "none";

    }


    document.body.style.overflow =
        "";

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

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if(!loginForm) return;


        loginForm.addEventListener(
            "submit",
            function(event){

                event.preventDefault();


                alert(
                    "Login backend is not connected yet."
                );

            }
        );

    }
);


/*
=========================================================
REGISTER DEMO
=========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const registerForm =
            document.getElementById(
                "registerForm"
            );


        if(!registerForm) return;


        registerForm.addEventListener(
            "submit",
            function(event){

                event.preventDefault();


                alert(
                    "Registration backend is not connected yet."
                );

            }
        );

    }
);


/*
=========================================================
WHATSAPP
=========================================================
*/

function openWhatsApp(){

    if(!WHATSAPP_NUMBER){

        alert(
            "WhatsApp number is not configured."
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


        if(
            orderModal &&
            event.target === orderModal
        ){

            closeOrder();

        }


        if(
            loginModal &&
            event.target === loginModal
        ){

            closeLogin();

        }


        if(
            registerModal &&
            event.target === registerModal
        ){

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
