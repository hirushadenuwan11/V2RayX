```javascript
/* =====================================================
   V2RayX CUSTOMER PAGE JAVASCRIPT
   FULL UPDATED VERSION
   GitHub Pages + Google Apps Script
===================================================== */


/* =====================================================
   GOOGLE APPS SCRIPT API
===================================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbwXTU2m4YgpT7qZn7MGUTOtxSDPFivZRs8fatNuJdFTPfryLuGdkT-r3xfcnGLONMWcWQ/exec";


/* =====================================================
   WHATSAPP NUMBER
===================================================== */

const WHATSAPP_NUMBER = "94771234567";


/* =====================================================
   CURRENT ORDER
===================================================== */

let currentOrder = {
    plan: "",
    duration: "",
    price: ""
};


/* =====================================================
   CURRENT CUSTOMER
===================================================== */

let currentCustomer = null;


/* =====================================================
   YEAR
===================================================== */

function setYear() {

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu() {

    const menu =
        document.getElementById("mobileMenu");

    if (!menu) return;

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}


function closeMobileMenu() {

    const menu =
        document.getElementById("mobileMenu");

    if (menu) {

        menu.style.display = "none";

    }

}


/* =====================================================
   SCROLL TO PLANS
===================================================== */

function scrollToPlans() {

    const plans =
        document.getElementById("plans");

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

    currentOrder = {

        plan: plan,

        duration: duration,

        price: price

    };


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

    const orderModal =
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


    if (orderModal) {

        orderModal.style.display =
            "block";

    }


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE ORDER
===================================================== */

function closeOrder() {

    const orderModal =
        document.getElementById(
            "orderModal"
        );

    const orderFormArea =
        document.getElementById(
            "orderFormArea"
        );

    const orderSuccess =
        document.getElementById(
            "orderSuccess"
        );

    const orderForm =
        document.getElementById(
            "orderForm"
        );


    if (orderModal) {

        orderModal.style.display =
            "none";

    }


    if (orderFormArea) {

        orderFormArea.style.display =
            "block";

    }


    if (orderSuccess) {

        orderSuccess.style.display =
            "none";

    }


    if (orderForm) {

        orderForm.reset();

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   GENERATE ORDER ID
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

function validatePhone(phone) {

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

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =====================================================
   SEND ORDER TO GOOGLE SHEETS
===================================================== */

function sendOrderToGoogleSheet(
    orderData,
    callback
) {

    if (!API_URL) {

        alert(
            "Backend URL is not configured."
        );

        return;

    }


    console.log(
        "Sending order:",
        orderData
    );


    /*
    =================================================
    CREATE HIDDEN IFRAME
    =================================================
    */

    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.name =
        "v2rayOrderFrame_" +
        Date.now();


    iframe.style.display =
        "none";


    document.body.appendChild(
        iframe
    );


    /*
    =================================================
    CREATE FORM
    =================================================
    */

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


    /*
    =================================================
    ADD FIELD
    =================================================
    */

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
            value !== undefined &&
            value !== null
                ? String(value)
                : "";


        form.appendChild(
            input
        );

    }


    /*
    =================================================
    IMPORTANT ACTION
    =================================================
    */

    addField(
        "action",
        "createOrder"
    );


    /*
    =================================================
    ORDER DATA
    =================================================
    */

    addField(
        "orderId",
        orderData.orderId
    );


    addField(
        "name",
        orderData.name
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


    /*
    =================================================
    APPEND FORM
    =================================================
    */

    document.body.appendChild(
        form
    );


    /*
    =================================================
    SUBMIT
    =================================================
    */

    try {

        form.submit();


        console.log(
            "Order submitted successfully."
        );


    } catch (error) {

        console.error(
            "Order submit error:",
            error
        );


        alert(
            "Unable to send order."
        );


        form.remove();

        iframe.remove();

        return;

    }


    /*
    =================================================
    WAIT FOR GOOGLE APPS SCRIPT
    =================================================
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
        2000
    );

}


/* =====================================================
   ORDER FORM
===================================================== */

function setupOrderForm() {

    const orderForm =
        document.getElementById(
            "orderForm"
        );


    if (!orderForm) {

        console.error(
            "orderForm not found."
        );

        return;

    }


    orderForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /*
            =========================================
            GET INPUTS
            =========================================
            */

            const nameInput =
                document.getElementById(
                    "customerName"
                );


            const phoneInput =
                document.getElementById(
                    "customerPhone"
                );


            const emailInput =
                document.getElementById(
                    "customerEmail"
                );


            const paymentInput =
                document.getElementById(
                    "paymentMethod"
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            const email =
                emailInput
                    ? emailInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const payment =
                paymentInput
                    ? paymentInput.value
                    : "";


            /*
            =========================================
            VALIDATION
            =========================================
            */

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
                    "Please select a payment method."
                );

                return;

            }


            if (!currentOrder.plan) {

                alert(
                    "Please select a plan first."
                );

                return;

            }


            /*
            =========================================
            CREATE ORDER ID
            =========================================
            */

            const orderId =
                generateOrderId();


            /*
            =========================================
            ORDER OBJECT
            =========================================
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
            =========================================
            SAVE LOCAL
            =========================================
            */

            try {

                localStorage.setItem(

                    "lastOrder",

                    JSON.stringify(
                        orderData
                    )

                );

            } catch (error) {

                console.log(
                    "LocalStorage unavailable."
                );

            }


            /*
            =========================================
            BUTTON
            =========================================
            */

            const submitButton =
                orderForm.querySelector(
                    ".modal-submit"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Creating Order...";

            }


            /*
            =========================================
            SEND
            =========================================
            */

            sendOrderToGoogleSheet(

                orderData,

                function() {


                    /*
                    ================================
                    SHOW SUCCESS
                    ================================
                    */

                    showOrderSuccess(
                        orderId
                    );


                    if (submitButton) {

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


/* =====================================================
   SHOW ORDER SUCCESS
===================================================== */

function showOrderSuccess(
    orderId
) {

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


    if (orderFormArea) {

        orderFormArea.style.display =
            "none";

    }


    if (orderSuccess) {

        orderSuccess.style.display =
            "block";

    }


    if (generatedOrderId) {

        generatedOrderId.textContent =
            orderId;

    }

}


/* =====================================================
   LOGIN MODAL
===================================================== */

function openLogin() {

    const loginModal =
        document.getElementById(
            "loginModal"
        );


    if (!loginModal) return;


    loginModal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

}


function closeLogin() {

    const loginModal =
        document.getElementById(
            "loginModal"
        );


    if (loginModal) {

        loginModal.style.display =
            "none";

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   REGISTER MODAL
===================================================== */

function openRegister() {

    closeLogin();


    const registerModal =
        document.getElementById(
            "registerModal"
        );


    if (!registerModal) return;


    registerModal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

}


function closeRegister() {

    const registerModal =
        document.getElementById(
            "registerModal"
        );


    if (registerModal) {

        registerModal.style.display =
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

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (!registerForm) return;


    registerForm.addEventListener(
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


            /*
            =========================================
            VALIDATION
            =========================================
            */

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


            if (
                password.length < 6
            ) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }


            /*
            =========================================
            BUTTON
            =========================================
            */

            const button =
                registerForm.querySelector(
                    ".modal-submit"
                );


            if (button) {

                button.disabled =
                    true;

                button.textContent =
                    "Creating Account...";

            }


            /*
            =========================================
            SEND REGISTER REQUEST
            =========================================
            */

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

                function(success, message) {


                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Create Account";

                    }


                    if (success) {

                        alert(
                            "Account created successfully. You can now login."
                        );


                        registerForm.reset();


                        closeRegister();


                        openLogin();

                    } else {

                        alert(
                            message ||
                            "Registration failed."
                        );

                    }

                }

            );

        }
    );

}


/* =====================================================
   SEND REGISTER REQUEST
===================================================== */

function sendRegisterRequest(
    data,
    callback
) {

    /*
    NOTE:
    Google Apps Script CORS can block
    normal fetch requests.

    Therefore we use hidden iframe
    + POST form.
    */

    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.name =
        "registerFrame_" +
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
            "Unable to connect to backend."
        );


        form.remove();

        iframe.remove();

        return;

    }


    /*
    Since iframe response cannot be
    safely read cross-origin,
    report success after submission.
    */

    setTimeout(
        function() {

            if (callback) {

                callback(
                    true,
                    "Registration submitted."
                );

            }


            setTimeout(
                function() {

                    form.remove();

                    iframe.remove();

                },
                3000
            );

        },
        2000
    );

}


/* =====================================================
   LOGIN FORM
===================================================== */

function setupLoginForm() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (!loginForm) return;


    loginForm.addEventListener(
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
                    "Please enter a valid email address."
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
                loginForm.querySelector(
                    ".modal-submit"
                );


            if (button) {

                button.disabled =
                    true;

                button.textContent =
                    "Logging in...";

            }


            /*
            =========================================
            LOGIN
            =========================================

            Uses GET because Google Apps Script
            doGet can return the JSON response.
            =========================================
            */

            const url =
                API_URL +
                "?action=login" +
                "&email=" +
                encodeURIComponent(email) +
                "&password=" +
                encodeURIComponent(password);


            fetch(url, {

                method: "GET"

            })

            .then(
                response =>
                    response.json()
            )

            .then(
                data => {

                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Login";

                    }


                    if (
                        data.success
                    ) {

                        currentCustomer =
                            data.customer;


                        /*
                        SAVE SESSION
                        */

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
                        Go to customer area
                        */

                        window.location.href =
                            "dashboard.html";

                    } else {

                        alert(
                            data.message ||
                            "Login failed."
                        );

                    }

                }
            )

            .catch(
                error => {

                    console.error(
                        "Login error:",
                        error
                    );


                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Login";

                    }


                    alert(
                        "Unable to connect to server."
                    );

                }
            );

        }
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
   CLOSE MODALS OUTSIDE
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
   MAKE FUNCTIONS GLOBAL
   FOR HTML onclick=""
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
   PAGE START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "================================"
        );


        console.log(
            "V2RayX JavaScript Loaded"
        );


        console.log(
            "API:",
            API_URL
        );


        console.log(
            "================================"
        );


        setYear();


        setupOrderForm();


        setupLoginForm();


        setupRegisterForm();


        setupOutsideClick();


        setupEscapeKey();

    }
);
```
