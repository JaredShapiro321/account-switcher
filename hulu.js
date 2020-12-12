const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

let email = "jaredshapirogp+1@gmail.com";
let password = "1904passwordforhulu";
let name = "Jared";
let birthdayMonth = "3";
let birthdayDay = "4";
let birthdayYear = "2000";
let gender = "Male";
let cn = "60606060";
let expiry = "0000";
let cvc = "666";
let zip = "45102";

hulu(
    email,
    password,
    name,
    birthdayDay,
    birthdayMonth,
    birthdayYear,
    gender,
    cn,
    expiry,
    cvc,
    zip
);

function hulu(
    email,
    password,
    name,
    birthdayDay,
    birthdayMonth,
    birthdayYear,
    gender,
    cn,
    expiry,
    cvc,
    zip
) {
    const year = new Date().getFullYear();
    const birthdayDaySelector = "#birthdayDay-item-" + (birthdayDay - 1);
    const birthdayYearSelector = "#birthdayYear-item-" + (year - birthdayYear);
    const birthdayMonthSelector = "#birthdayMonth-item-" + (birthdayMonth - 1);
    let genderSelector = "#gender-item-";

    if (gender === "Female") {
        genderSelector += "0";
    } else if (gender === "Male") {
        genderSelector += "1";
    } else {
        genderSelector += "2";
    }

    nightmare
        .goto("https://signup.hulu.com/plans")
        .wait(3000)
        .click("#plan-2 > div > div > button")
        .wait(3000)
        .type("#email", email)
        .type("#password", password)
        .type("#firstName", name)
        .click(birthdayYearSelector)
        .click(birthdayMonthSelector)
        .click(birthdayDaySelector)
        .click(genderSelector)
        .click("#root > div > main > div.page__body > div > form > button")
        .wait(3000)
        .type("#creditCard", cn)
        .type("#expiry", expiry)
        .type("#cvc", cvc)
        .type("#zip", zip)
        .click("#root > div > main > div.page__body > form > button")
        .wait(3000)
        .evaluate(() => document.querySelector("body").innerHTML)
        .end()
        .then((response) => {
            // Call getSubData while passing in the (response) variable returned by evaluate
            //return 1;
        })
        .catch((err) => {
            console.log(err);
        });
}
