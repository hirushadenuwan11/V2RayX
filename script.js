/* =====================================================
   V2RayX CUSTOMER PAGE JAVASCRIPT
   GitHub Pages Fixed Version
===================================================== */


/* =====================================================
   GOOGLE APPS SCRIPT API
===================================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbyQ29jT0MI7s2og8YqX9QDgkQrWwvSXvA7CXFYMtBxRotJT59oSQbzLRugnvdCZZy7Waw/exec";


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

        console.error("Plans section not found.");

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
        document.getElementById("orderPlan");

    const orderDuration =
        document.getElementById("orderDuration");

    const orderPrice =
        document.getElementById("orderPrice");

    const orderModal =
        document.getElementById("orderModal");


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
        document.getElementById("orderModal");

    const orderFormArea =
        document.getElementById("orderFormArea");

    const orderSuccess =
        document.getElementById("orderSuccess");

    const orderForm =
        document.getElementById("orderForm");


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
        phone.replace(/\s+/g, "");

    return /^0[0-9]{9}$/.test(cleaned);

}


/* =====================================================
   SEND ORDER TO GOOGLE APPS SCRIPT
===================================================== */

function sendOrderToGoogleSheet(
    orderData,
    callback
) {

    if (!API_URL) {

        console.error(
            "Google Apps Script URL is empty."
        );

        alert(
            "Backend URL is not configured."
        );

        return;

    }


    /*
    Create hidden iframe
    */

    const iframe =
        document.createElement("iframe");

    iframe.name =
        "v2rayOrderFrame_" +
        Date.now();

    iframe.style.display =
        "none";

    document.body.appendChild(
        iframe
    );


    /*
    Create hidden form
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
    Add input
    */

    function addField(
        name,
        value
    ) {

        const input =
            document.createElement("input");

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


    /*
    Send order fields
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


    document.body.appendChild(
        form
    );


    /*
    Submit
    */

    try {

        form.submit();

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
    Google Apps Script response
    is cross-origin, so we don't
    read it directly.

    */

    setTimeout(function() {

        if (callback) {

            callback();

        }

        setTimeout(function() {

            form.remove();
            iframe.remove();

        }, 3000);

    }, 1500);

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
                nameInput ?
                nameInput.value.trim() :
                "";

            const phone =
                phoneInput ?
                phoneInput.value.trim() :
                "";

            const email =
                emailInput ?
                emailInput.value.trim() :
                "";

            const payment =
                paymentInput ?
                paymentInput.value :
                "";


            /* =========================
               VALIDATION
            ========================= */

            if (name.length < 2) {

                alert(
                    "Please enter your full name."
                );

                return;

            }


            if (!validatePhone(phone)) {

                alert(
                    "Please enter a valid WhatsApp number."
                );

                return;

            }


            if (!email) {

                alert(
                    "Please enter your email address."
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


            /* =========================
               CREATE ORDER
            ========================= */

            const orderId =
                generateOrderId();


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


            /* =========================
               LOCAL STORAGE
            ========================= */

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


            /* =========================
               BUTTON
            ========================= */

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


            /* =========================
               SEND
            ========================= */

            sendOrderToGoogleSheet(
                orderData,
                function() {

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
   LOGIN
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
   REGISTER
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

            alert(
                "Login backend is not connected yet."
            );

        }
    );

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

            alert(
                "Registration backend is not connected yet."
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
                event.target === orderModal
            ) {

                closeOrder();

            }


            if (
                loginModal &&
                event.target === loginModal
            ) {

                closeLogin();

            }


            if (
                registerModal &&
                event.target === registerModal
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
                event.key === "Escape"
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
   IMPORTANT FOR HTML onclick=""
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
            "V2RayX JavaScript Loaded Successfully"
        );


        setYear();

        setupOrderForm();

        setupLoginForm();

        setupRegisterForm();

        setupOutsideClick();

        setupEscapeKey();

    }
);
