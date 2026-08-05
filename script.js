/* =====================================================
   V2RayX CUSTOMER PAGE
   FULL WORKING JAVASCRIPT
===================================================== */


/* =====================================================
   GOOGLE APPS SCRIPT URL
===================================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbxgW6zMC6dx55vzTWnbjvEwdxZpT7j1_-PZPMihQfot1HPoFpDjRXeZjAJC--YPd3rYpA/exec";


/* =====================================================
   WHATSAPP
===================================================== */

const WHATSAPP_NUMBER =
"94771234567";


/* =====================================================
   CURRENT ORDER
===================================================== */

let currentOrder = {

    plan: "",

    duration: "",

    price: ""

};


/* =====================================================
   YEAR
===================================================== */

function setYear() {

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    if (!menu) return;


    if (
        menu.style.display === "block"
    ) {

        menu.style.display =
            "none";

    } else {

        menu.style.display =
            "block";

    }

}


function closeMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    if (menu) {

        menu.style.display =
            "none";

    }

}


/* =====================================================
   SCROLL TO PLANS
===================================================== */

function scrollToPlans() {

    const plans =
        document.getElementById(
            "plans"
        );

    if (!plans) {

        console.error(
            "Plans section not found."
        );

        return;

    }


    plans.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =====================================================
   OPEN ORDER
===================================================== */

function openOrder(
    plan,
    duration,
    price
) {

    currentOrder.plan =
        plan;

    currentOrder.duration =
        duration;

    currentOrder.price =
        price;


    const orderPlan =
        document.getElementById(
            "orderPlan"
        );


    const orderDuration =
        document.getElementById(
            "orderDuration"
        );


    const orderPrice =
        document.getElementById(
            "orderPrice"
        );


    const modal =
        document.getElementById(
            "orderModal"
        );


    if (orderPlan) {

        orderPlan.textContent =
            plan;

    }


    if (orderDuration) {

        orderDuration.textContent =
            duration;

    }


    if (orderPrice) {

        orderPrice.textContent =
            "Rs. " + price;

    }


    if (modal) {

        modal.style.display =
            "block";

    }


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE ORDER
===================================================== */

function closeOrder() {

    const modal =
        document.getElementById(
            "orderModal"
        );


    const formArea =
        document.getElementById(
            "orderFormArea"
        );


    const success =
        document.getElementById(
            "orderSuccess"
        );


    const form =
        document.getElementById(
            "orderForm"
        );


    if (modal) {

        modal.style.display =
            "none";

    }


    if (formArea) {

        formArea.style.display =
            "block";

    }


    if (success) {

        success.style.display =
            "none";

    }


    if (form) {

        form.reset();

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   ORDER ID
===================================================== */

function generateOrderId() {

    const random =
        Math.floor(
            10000 +
            Math.random() * 90000
        );


    return "V2-" + random;

}


/* =====================================================
   PHONE VALIDATION
===================================================== */

function validatePhone(
    phone
) {

    const cleaned =
        String(phone)
            .replace(/\s+/g, "")
            .replace(/-/g, "");


    return /^0[0-9]{9}$/.test(
        cleaned
    );

}


/* =====================================================
   EMAIL VALIDATION
===================================================== */

function validateEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =====================================================
   SEND ORDER
===================================================== */

function sendOrderToGoogleSheet(
    orderData,
    callback
) {

    if (!API_URL) {

        alert(
            "API URL is missing."
        );

        return;

    }


    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.name =
        "v2rayOrder_" +
        Date.now();


    iframe.style.display =
        "none";


    document.body.appendChild(
        iframe
    );


    const form =
        document.createElement(
            "form"
        );


    form.method =
        "POST";


    form.action =
        API_URL;


    form.target =
        iframe.name;


    form.style.display =
        "none";


    function addField(
        name,
        value
    ) {

        const input =
            document.createElement(
                "input"
            );


        input.type =
            "hidden";


        input.name =
            name;


        input.value =
            value || "";


        form.appendChild(
            input
        );

    }


    /* IMPORTANT */

    addField(
        "action",
        "createOrder"
    );


    addField(
        "orderId",
        orderData.orderId
    );


    addField(
        "customerName",
        orderData.name
    );


    addField(
        "name",
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
        "plan",
        orderData.plan
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
        "payment",
        orderData.payment
    );


    addField(
        "paymentMethod",
        orderData.payment
    );


    addField(
        "createdAt",
        orderData.createdAt
    );


    document.body.appendChild(
        form
    );


    try {

        form.submit();


        console.log(
            "Order submitted:",
            orderData
        );


    } catch (error) {

        console.error(
            "Order error:",
            error
        );


        alert(
            "Could not send order."
        );


        form.remove();

        iframe.remove();

        return;

    }


    /*
       Apps Script response is cross-origin.
       We therefore wait for submission.
    */

    setTimeout(
        function() {

            if (callback) {

                callback();

            }


            setTimeout(
                function() {

                    form.remove();

                    iframe.remove();

                },
                3000
            );

        },
        1800
    );

}


/* =====================================================
   ORDER FORM
===================================================== */

function setupOrderForm() {

    const form =
        document.getElementById(
            "orderForm"
        );


    if (!form) {

        console.error(
            "orderForm not found."
        );

        return;

    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                )
                ?.value
                .trim() || "";


            const phone =
                document.getElementById(
                    "customerPhone"
                )
                ?.value
                .trim() || "";


            const email =
                document.getElementById(
                    "customerEmail"
                )
                ?.value
                .trim()
                .toLowerCase() || "";


            const payment =
                document.getElementById(
                    "paymentMethod"
                )
                ?.value || "";


            /* VALIDATION */

            if (
                name.length < 2
            ) {

                alert(
                    "Please enter your full name."
                );

                return;

            }


            if (
                !validatePhone(phone)
            ) {

                alert(
                    "Please enter a valid WhatsApp number."
                );

                return;

            }


            if (
                !validateEmail(email)
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            if (!payment) {

                alert(
                    "Please select payment method."
                );

                return;

            }


            if (!currentOrder.plan) {

                alert(
                    "Please select a plan."
                );

                return;

            }


            /* CREATE ORDER */

            const orderData = {

                orderId:
                    generateOrderId(),

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


            /* SAVE LOCAL */

            try {

                localStorage.setItem(

                    "lastOrder",

                    JSON.stringify(
                        orderData
                    )

                );

            } catch (error) {

                console.log(
                    "LocalStorage unavailable"
                );

            }


            /* BUTTON */

            const button =
                form.querySelector(
                    ".modal-submit"
                );


            if (button) {

                button.disabled =
                    true;

                button.textContent =
                    "Creating Order...";

            }


            /* SEND */

            sendOrderToGoogleSheet(

                orderData,

                function() {

                    showOrderSuccess(
                        orderData.orderId
                    );


                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Create Order →";

                    }

                }

            );

        }
    );

}


/* =====================================================
   SUCCESS
===================================================== */

function showOrderSuccess(
    orderId
) {

    const formArea =
        document.getElementById(
            "orderFormArea"
        );


    const success =
        document.getElementById(
            "orderSuccess"
        );


    const id =
        document.getElementById(
            "generatedOrderId"
        );


    if (formArea) {

        formArea.style.display =
            "none";

    }


    if (success) {

        success.style.display =
            "block";

    }


    if (id) {

        id.textContent =
            orderId;

    }

}


/* =====================================================
   LOGIN
===================================================== */

function openLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (!modal) return;


    modal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

}


function closeLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   REGISTER
===================================================== */

function openRegister() {

    closeLogin();


    const modal =
        document.getElementById(
            "registerModal"
        );


    if (!modal) return;


    modal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

}


function closeRegister() {

    const modal =
        document.getElementById(
            "registerModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }


    document.body.style.overflow =
        "";

}


function openLoginFromRegister() {

    closeRegister();

    openLogin();

}


/* =====================================================
   REGISTER FORM
===================================================== */

function setupRegisterForm() {

    const form =
        document.getElementById(
            "registerForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                )
                ?.value
                .trim() || "";


            const phone =
                document.getElementById(
                    "registerPhone"
                )
                ?.value
                .trim() || "";


            const email =
                document.getElementById(
                    "registerEmail"
                )
                ?.value
                .trim()
                .toLowerCase() || "";


            const password =
                document.getElementById(
                    "registerPassword"
                )
                ?.value || "";


            if (
                name.length < 2
            ) {

                alert(
                    "Please enter your name."
                );

                return;

            }


            if (
                !validatePhone(phone)
            ) {

                alert(
                    "Please enter a valid WhatsApp number."
                );

                return;

            }


            if (
                !validateEmail(email)
            ) {

                alert(
                    "Please enter a valid email."
                );

                return;

            }


            if (
                password.length < 6
            ) {

                alert(
                    "Password must be at least 6 characters."
                );

                return;

            }


            const button =
                form.querySelector(
                    ".modal-submit"
                );


            if (button) {

                button.disabled =
                    true;

                button.textContent =
                    "Creating Account...";

            }


            sendRegisterRequest(

                {

                    name:
                        name,

                    phone:
                        phone,

                    email:
                        email,

                    password:
                        password

                },

                function() {

                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Create Account";

                    }


                    form.reset();


                    closeRegister();


                    alert(
                        "Account created successfully. Please login."
                    );


                    openLogin();

                }

            );

        }
    );

}


/* =====================================================
   REGISTER REQUEST
===================================================== */

function sendRegisterRequest(
    data,
    callback
) {

    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.name =
        "register_" +
        Date.now();


    iframe.style.display =
        "none";


    document.body.appendChild(
        iframe
    );


    const form =
        document.createElement(
            "form"
        );


    form.method =
        "POST";


    form.action =
        API_URL;


    form.target =
        iframe.name;


    form.style.display =
        "none";


    function addField(
        name,
        value
    ) {

        const input =
            document.createElement(
                "input"
            );


        input.type =
            "hidden";


        input.name =
            name;


        input.value =
            value || "";


        form.appendChild(
            input
        );

    }


    addField(
        "action",
        "register"
    );


    addField(
        "name",
        data.name
    );


    addField(
        "phone",
        data.phone
    );


    addField(
        "email",
        data.email
    );


    addField(
        "password",
        data.password
    );


    document.body.appendChild(
        form
    );


    try {

        form.submit();

    } catch (error) {

        console.error(
            error
        );


        alert(
            "Registration connection failed."
        );


        form.remove();

        iframe.remove();

        return;

    }


    setTimeout(
        function() {

            if (callback) {

                callback();

            }


            setTimeout(
                function() {

                    form.remove();

                    iframe.remove();

                },
                3000
            );

        },
        1800
    );

}


/* =====================================================
   LOGIN FORM
===================================================== */

function setupLoginForm() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                )
                ?.value
                .trim()
                .toLowerCase() || "";


            const password =
                document.getElementById(
                    "loginPassword"
                )
                ?.value || "";


            if (
                !validateEmail(email)
            ) {

                alert(
                    "Please enter a valid email."
                );

                return;

            }


            if (!password) {

                alert(
                    "Please enter your password."
                );

                return;

            }


            const button =
                form.querySelector(
                    ".modal-submit"
                );


            if (button) {

                button.disabled =
                    true;

                button.textContent =
                    "Logging in...";

            }


            /*
             * JSONP
             * Used because GitHub Pages cannot
             * directly read Google Apps Script
             * cross-origin response.
             */

            const callbackName =
                "v2rayLogin_" +
                Date.now();


            window[callbackName] =
                function(data) {

                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Login";

                    }


                    if (
                        data &&
                        data.success
                    ) {


                        try {

                            localStorage.setItem(

                                "v2rayxCustomer",

                                JSON.stringify(
                                    data.customer
                                )

                            );

                        } catch (error) {

                            console.log(
                                error
                            );

                        }


                        closeLogin();


                        alert(
                            "Login successful!"
                        );


                        /*
                         * For now stay on home page.
                         * Customer dashboard will be
                         * connected next.
                         */

                        updateLoggedInUI(
                            data.customer
                        );


                    } else {

                        alert(

                            data &&
                            data.message

                                ? data.message

                                : "Login failed."

                        );

                    }


                    delete window[
                        callbackName
                    ];

                };


            const script =
                document.createElement(
                    "script"
                );


            script.src =
                API_URL +

                "?action=login" +

                "&email=" +
                encodeURIComponent(
                    email
                ) +

                "&password=" +
                encodeURIComponent(
                    password
                ) +

                "&callback=" +
                callbackName;


            script.onerror =
                function() {

                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Login";

                    }


                    alert(
                        "Unable to connect to server."
                    );


                    delete window[
                        callbackName
                    ];


                    script.remove();

                };


            document.body.appendChild(
                script
            );


            setTimeout(
                function() {

                    script.remove();

                },
                10000
            );

        }
    );

}


/* =====================================================
   UPDATE LOGGED IN UI
===================================================== */

function updateLoggedInUI(
    customer
) {

    if (!customer) return;


    const loginButtons =
        document.querySelectorAll(
            ".login-btn"
        );


    loginButtons.forEach(
        function(button) {

            button.textContent =
                "Account";

        }
    );


    console.log(
        "Logged in customer:",
        customer
    );

}


/* =====================================================
   WHATSAPP
===================================================== */

function openWhatsApp() {

    if (!WHATSAPP_NUMBER) {

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


/* =====================================================
   OUTSIDE CLICK
===================================================== */

function setupOutsideClick() {

    window.addEventListener(
        "click",
        function(event) {

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


            if (
                orderModal &&
                event.target ===
                    orderModal
            ) {

                closeOrder();

            }


            if (
                loginModal &&
                event.target ===
                    loginModal
            ) {

                closeLogin();

            }


            if (
                registerModal &&
                event.target ===
                    registerModal
            ) {

                closeRegister();

            }

        }
    );

}


/* =====================================================
   ESC KEY
===================================================== */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeOrder();

                closeLogin();

                closeRegister();

            }

        }
    );

}


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.toggleMobileMenu =
    toggleMobileMenu;

window.closeMobileMenu =
    closeMobileMenu;

window.scrollToPlans =
    scrollToPlans;

window.openOrder =
    openOrder;

window.closeOrder =
    closeOrder;

window.openLogin =
    openLogin;

window.closeLogin =
    closeLogin;

window.openRegister =
    openRegister;

window.closeRegister =
    closeRegister;

window.openLoginFromRegister =
    openLoginFromRegister;

window.openWhatsApp =
    openWhatsApp;


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "V2RayX JS Loaded Successfully"
        );


        setYear();

        setupOrderForm();

        setupLoginForm();

        setupRegisterForm();

        setupOutsideClick();

        setupEscapeKey();

    }
);
