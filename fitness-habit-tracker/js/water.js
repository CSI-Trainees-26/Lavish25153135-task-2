/* 
   WATER TRACKER
 */

const DAILY_GOAL = 2500;

let totalWater = 1500;


/* 
   ELEMENTS
 */

const waterAmount = document.getElementById("waterAmount");
const percentage = document.getElementById("percentage");
const progress = document.getElementById("progress");
const remaining = document.getElementById("remaining");
const total = document.getElementById("total");

const customAmount = document.getElementById("customAmount");
const addCustom = document.getElementById("addCustom");

const intakeList = document.getElementById("intakeList");



/* 
   UPDATE UI
 */

function updateWaterUI() {

    // Calculate percentage

    let percent = Math.round(
        (totalWater / DAILY_GOAL) * 100
    );

    // Don't allow progress bar above 100%

    let progressPercent = Math.min(percent, 100);


    // Update amount

    waterAmount.textContent =
        (totalWater / 1000).toFixed(2) + " L";


    // Remove unnecessary zero

    if (waterAmount.textContent.endsWith("0 L")) {
        waterAmount.textContent =
            (totalWater / 1000).toFixed(1) + " L";
    }


    // Update percentage

    percentage.textContent =
        percent + "%";


    // Update progress bar

    progress.style.width =
        progressPercent + "%";


    // Update remaining

    const remainingAmount =
        DAILY_GOAL - totalWater;


    if (remainingAmount > 0) {

        remaining.textContent =
            formatWater(remainingAmount) +
            " more to go. Keep going!";

    } else {

        remaining.textContent =
            "Daily goal reached. Great work!";

    }


    // Update total

    total.textContent =
        formatWater(totalWater);
}



/* 
   FORMAT WATER
 */

function formatWater(amount) {

    if (amount >= 1000) {

        let liters =
            amount / 1000;

        return liters
            .toFixed(2)
            .replace(/\.00$/, "")
            .replace(/(\.\d)0$/, "$1")
            + " L";

    }

    return amount + " ml";
}



/* 
   ADD WATER
 */

function addWater(amount) {

    if (!amount || amount <= 0) {
        return;
    }


    totalWater += amount;


    // Create new intake row

    const row =
        document.createElement("div");

    row.className = "intake-row";


    const currentTime =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    row.innerHTML = `

        <div class="intake-icon">
            <i class='bx bx-droplet'></i>
        </div>

        <span>
            ${currentTime}
        </span>

        <strong>
            ${amount} ml
        </strong>

        <button class="delete-btn">
            <i class='bx bx-trash'></i>
        </button>

    `;


    intakeList.prepend(row);


    // Delete button

    const deleteButton =
        row.querySelector(".delete-btn");


    deleteButton.addEventListener(
        "click",
        function () {

            totalWater -= amount;

            row.remove();

            updateWaterUI();

        }
    );


    updateWaterUI();
}



/* 
   QUICK BUTTONS
 */

const quickButtons =
    document.querySelectorAll(".quick-btn");


quickButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const amount =
                Number(
                    button.dataset.amount
                );

            addWater(amount);

        }
    );

});



/* 
   CUSTOM AMOUNT
 */

addCustom.addEventListener(
    "click",
    function () {

        const amount =
            Number(customAmount.value);


        if (!amount || amount <= 0) {

            customAmount.focus();

            return;

        }


        addWater(amount);


        customAmount.value = "";

    }
);



/* 
   ENTER KEY
 */

customAmount.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addCustom.click();

        }

    }
);



/* 
   DELETE EXISTING ROWS
 */

document
    .querySelectorAll(".delete-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest(".intake-row");

                const amountText =
                    row.querySelector("strong")
                        .textContent
                        .trim();


                const amount =
                    parseInt(amountText);


                totalWater -= amount;


                row.remove();


                updateWaterUI();

            }
        );

    });




updateWaterUI();