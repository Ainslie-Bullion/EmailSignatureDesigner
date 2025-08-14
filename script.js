let lastSelectedOption = 'ab';

document.addEventListener('DOMContentLoaded', function () {

    addbgImage('body::before', bg);


    const abButton = document.getElementById("ab");
    switchSection("abSection");
    abButton.classList.add('pressed')


    // Load all the base64 images
    function addImage(className, image, h, w) {
        const elements = document.querySelectorAll(className);
        elements.forEach(element => {
            element.innerHTML = `<img height='${h}' width='${w}' src='${image}'>`;
        });
    }

    addImage('.abLogoImage', abLogoImage, '35', '120');
    addImage('.acLogoImage', acLogoImage, '35', '120');
    addImage('.ainslieLogoImage', ainslieLogoImage, '22', '120');
    addImage('.tmvLogoImage', tmvLogoImage, '80', '125');
    addImage('.tmvFbImage', tmvFbImage, '17', '17');
    addImage('.tmvLnImage', tmvLnImage, '17', '17');
    addImage('.tmvGImage', tmvGImage, '17', '17');
    addImage('.tmvXImage', tmvXImage, '17', '17');
    addImage('.asialImage', asialImage, '', '400');
    addImage('.ainslieSigLogo', ainslieSigLogo, '35', '160');
    addImage('.abSigLogo', abSigLogo, '45', '160');
    addImage('.acSigLogo', acSigLogo, '45', '160');
    addImage('.abFbImage', abFbImage, '32', '32');
    addImage('.abIgImage', abIgImage, '32', '32');
    addImage('.abLnImage', abLnImage, '32', '32');
    addImage('.abXImage', abXImage, '32', '32');
    addImage('.abYtImage', abYtImage, '32', '32');
    addImage('.agBannerLogoImage', agBannerLogo, '135', '420'); // New Banner
    addImage('.rvSpacer', rvSpacer, '13', '16');
    addImage('.rvLogoImage', rvLogoImage, '80', '250');
    addImage('.rvFbImage', rvFbImage, '17', '17');
    addImage('.rvLnImage', rvLnImage, '17', '17');
    addImage('.rvGImage', rvGImage, '17', '17');
});


// Reset the form
function reset() {
    location.reload();
}

function addbgImage(className, base64Image) {
    var style = document.createElement('style');
    document.head.appendChild(style);
    var css = `.${className} { background-image: url('${base64Image}'); background-repeat: repeat; }`;
    style.appendChild(document.createTextNode(css));
}


// Hide/show sections based on button press
function switchSection(sectionId) {
    console.log('sectionId: ', sectionId);
    // Hide all sections
    document.getElementById('abSection').style.display = 'none';
    document.getElementById('rvSection').style.display = 'none';
    document.getElementById('tmvSection').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';

    const logoSection = document.querySelector('.logo-section');
    if (sectionId === 'abSection') {
        logoSection.style.display = 'flex';
    } else {
        logoSection.style.display = 'none';
    }

    const officeSection = document.querySelector('.officeSelection');
    const phoneSection = document.querySelector('.phoneSection');
    if (sectionId !== 'abSection') {
        officeSection.style.display = 'none';
        phoneSection.style.display = 'flex';
    } else {
        officeSection.style.display = 'flex';
        phoneSection.style.display = 'none';
    }

    // Clear input fields
    var inputClassList = ['inputName', 'inputRole', 'inputEmail', 'inputMobile', 'inputPhone', 'inputPersonalLink'];
    inputClassList.forEach(function (inputClass) {
        var inputElements = document.getElementsByClassName(inputClass);
        Array.from(inputElements).forEach(function (inputElement) {
            inputElement.value = '';
        });
    });
}


/**
* Updates the selected option and switches the displayed section.
*
* When a button is clicked, this function updates the global
* lastSelectedOption variable to the clicked button's value.
*
* It then removes the .pressed class from all option buttons, and
* adds the .pressed class to the clicked button.
*
* Finally, it constructs a section ID from the button value and
* calls switchSection() to show the corresponding section.
*/
function setSelectedOption(clickedButton) {

    lastSelectedOption = clickedButton.value.toLowerCase();
    console.log(lastSelectedOption);
    console.log("lastSelectedOption: ", lastSelectedOption)
    document.getElementById('copyBtn').style.display = 'block';

    document.querySelectorAll('button[name="option"]').forEach(button => {
        button.classList.remove('pressed');
    });

    clickedButton.classList.add('pressed');

    const sectionId = lastSelectedOption + 'Section';
    switchSection(sectionId);
}

/**
* Adds a click event listener to the copy button that copies the content
* of the currently selected option's section to the clipboard.
*
* It first checks that an option has been selected, then constructs the
* ID of the section to copy based on the selected option. It then uses
* document.execCommand('copy') to copy the content to the clipboard.
*
* It shows a notification when copied successfully.
*/
document.getElementById('copyBtn').addEventListener('click', function () {
    const selectedOption = lastSelectedOption;
    console.log(selectedOption);

    if (!selectedOption) {
        console.error('No option selected.');
        return;
    }

    const contentToCopyId = selectedOption + 'SectionCopy';
    const contentToCopy = document.getElementById(contentToCopyId);

    console.log("contentToCopyId: ", contentToCopyId)
    console.log("contentToCopy: ", contentToCopy)

    if (window.getSelection && document.createRange) {
        const selection = window.getSelection();
        selection.removeAllRanges();

        const range = document.createRange();
        console.log("range: ", range)

        range.selectNodeContents(contentToCopy);
        selection.addRange(range);

        console.log("range.selectNodeContents(contentToCopy) ", range.selectNodeContents(contentToCopy))

        try {
            document.execCommand('copy');
            const notification = document.getElementById('copyNotification');
            notification.style.display = 'block';

            fadeIn(notification, () => {
                setTimeout(() => {
                    fadeOut(notification, () => {
                    });
                }, 2000);
            });
        } catch (err) {
            console.error('Failed to copy content: ', err);
        }

        selection.removeAllRanges();
    } else {
        console.error('Your browser does not support this copy method.');
    }
});


/**
* Adds focus and blur event listeners to all input elements
* to update their border color.
* Focusing an input will set its border color to blue.
* Blurring an input will set its border color to gray.
*/
document.querySelectorAll('input').forEach(input => {
    input.onfocus = function () {
        this.style.borderColor = '#007bff';
    };
    input.onblur = function () {
        this.style.borderColor = '#ccc';
    };
});

/**
* Adds event listeners to update the display elements when inputs change.
*
* On DOM load, sets up:
* - Input listeners on name, role, email, mobile, phone inputs
* - Update functions to update display elements or links
* - Listener on each input to call the corresponding update function
*
* The updateDisplayElement function updates a display element by class name.
*
* The updateLinkFromInput function updates link href and text based on an
* input value, by link class name. It can clean/format the input value before
* setting the link.
*
* So on each input change:
* - name and role update the display name and role elements
* - email, mobile, phone call updateLinkFromInput to update the
* corresponding link
*/
document.addEventListener('DOMContentLoaded', function () {
    function updateDisplayElement(elementClass, value) {
        console.log("updateDisplayElement function. Element class:", elementClass, "value:", value);
        console.log(lastSelectedOption, "LastSelectedOption");

        const sectionElement = document.getElementById(lastSelectedOption + 'Section');
        console.log("sectionElement:", sectionElement);

        if (sectionElement) {
            const elements = sectionElement.getElementsByClassName(elementClass);
            console.log(`#${lastSelectedOption}Section .${elementClass}`);

            if (elements.length > 0) {
                elements[0].innerHTML = value;
                console.log("Updated element:", elements[0]);
            } else {
                console.log("No elements found with class:", elementClass);
            }
        } else {
            console.log("Section element not found");
        }
    }

    function updateLinkFromInput(inputId, linkClass, prefix, cleanUpFunction = value => value) {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function () {
                const inputValue = this.value;
                const cleanedInputValue = cleanUpFunction(inputValue);
                const linkElements = document.querySelectorAll(`#${lastSelectedOption}Section .${linkClass}`);
                linkElements.forEach(linkElement => {
                    linkElement.style.display = inputValue.trim() ? '' : 'none';
                    linkElement.href = prefix + cleanedInputValue;
                    linkElement.textContent = inputValue;
                });
            });
        }
    }


    const inputs = ['name', 'role', 'mobileInput', 'phoneInput', 'personalLink'];
    const updateFunctions = {
        'name': value => updateDisplayElement('displayName', `${value}`),
        'role': value => updateDisplayElement('displayRole', `<strong>${value}</strong>`),
        'mobileInput': value => updateLinkFromInput('mobileInput', 'mobileLink', 'tel:', value => value.replace(/ +/g, "")),
        'phoneInput': value => updateLinkFromInput('phoneInput', 'phoneLink', 'tel:', value => value.replace(/ +/g, "")),
        'personalLink': value => updateLinkFromInput('personalLink', 'personalLink', 'https://', value => value.replace(/ +/g, ""))
    };

    inputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('input', function () {
            if (inputId === 'name' || inputId === 'role') {
                updateFunctions[inputId](this.value);
            } else {
                updateFunctions[inputId]();
            }
        });
    });
});


// Ainslie Logo Selection
function imageClicked(clickedLogoClass) {
    const allTargetLogos = document.querySelectorAll('span[data-target-logo]');
    const abWebsite = document.querySelector('.abwebsite');
    const acWebsite = document.querySelector('.acwebsite');
    const ainslieWebsite = document.querySelector('.ainslie_website');
    const facebookLink = document.querySelector('.abfb');
    const xLink = document.querySelector('.abx');
    const igLink = document.querySelector('.abig');
    const abEmail = document.querySelector('.infoAtBris');

    allTargetLogos.forEach(targetLogo => {
        if (targetLogo.getAttribute('data-target-logo') === clickedLogoClass) {
            targetLogo.style.display = 'block';
        } else {
            targetLogo.style.display = 'none';
        }
    });

    // Toggle website visibility based on clicked logo
    if (clickedLogoClass === 'acLogo') {
        ainslieWebsite.style.display = 'none';
        abWebsite.style.display = 'none';
        acWebsite.style.display = 'inline';
        facebookLink.href = 'https://www.facebook.com/ainsliecrypto.com.au';
        xLink.href = 'https://twitter.com/AinslieCrypto';
        igLink.href = 'https://www.instagram.com/ainsliecrypto';
        abEmail.textContent = 'info@ainsliecrypto.com.au';
        abEmail.href = 'mailto:info@ainsliecrypto.com.au';
        abEmail.style.fontWeight = 'bold';
    }

    if (clickedLogoClass === 'abLogo') {
        ainslieWebsite.style.display = 'none';
        abWebsite.style.display = 'inline';
        acWebsite.style.display = 'none';
        facebookLink.href = 'https://www.facebook.com/AinslieBullion/';
        xLink.href = 'https://twitter.com/AinslieBullion';
        igLink.href = 'https://www.instagram.com/ainsliebullion/';
        abEmail.textContent = 'info@ainsliebullion.com.au';
        abEmail.href = 'mailto:info@ainsliebullion.com.au';
        abEmail.style.fontWeight = 'bold';
    }

    if (clickedLogoClass === 'aLogo') {
        ainslieWebsite.style.display = 'inline';
        abWebsite.style.display = 'none';
        acWebsite.style.display = 'none';
        facebookLink.href = 'https://www.facebook.com/AinslieBullion/';
        xLink.href = 'https://twitter.com/AinslieBullion';
        igLink.href = 'https://www.instagram.com/ainsliebullion/';
        abEmail.textContent = 'info@ainslie.com.au';
        abEmail.href = 'mailto:info@ainslie.com.au';
        abEmail.style.fontWeight = 'bold';
    }
}

// Ainslie Office Selection, switches office and telephone
function officeSelected(selectedOffice) {

    const phoneLinkElements = document.querySelectorAll('.phoneLink');
    const addressLine3Row = document.getElementById('addressLine3Row');

    // Hide all office-specific elements first
    document.querySelectorAll('.infoAtMelb, .infoAtBris, .infoAtGC, .officeBrisbane1, .officeBrisbane2, .officeBrisbane3, .officeMelb1, .officeMelb2, .officeMelb3, .officeGC1, .officeGC2, .officeGC3, .officeGC4').forEach(element => {
        element.style.display = 'none';
    });

    // Hide the third address row by default
    addressLine3Row.style.display = 'none';

    if (selectedOffice === 'Brisbane') {
        document.querySelectorAll('.officeBrisbane1, .officeBrisbane2, .officeBrisbane3, .infoAtBris').forEach(element => {
            element.style.display = '';
        });

        phoneLinkElements.forEach(linkElement => {
            linkElement.href = "tel:+61732210500";
            linkElement.textContent = "+61 7 3221 0500";
        });
    }
    else if (selectedOffice === 'Melbourne') {
        document.querySelectorAll('.officeMelb1, .officeMelb2, .officeMelb3, .infoAtMelb').forEach(element => {
            element.style.display = '';
        });

        phoneLinkElements.forEach(linkElement => {
            linkElement.href = "tel:+61370376255";
            linkElement.textContent = "+61 3 7037 6255";
        });
    }
    else if (selectedOffice === 'Gold Coast') {
        // Show the 3-line address elements and the specific info email
        document.querySelectorAll('.officeGC1, .officeGC2, .officeGC3, .officeGC4, .infoAtGC').forEach(element => {
            element.style.display = '';
        });
        // Show the third address row
        addressLine3Row.style.display = '';

        phoneLinkElements.forEach(linkElement => {
            linkElement.href = "tel:+61721390940";
            linkElement.textContent = "+61 7 2139 0940";
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const initialOffice = document.getElementById('inputOffice').value;
    officeSelected(initialOffice);
});


// CORRECTED logic for hiding/showing mobile number
document.addEventListener('DOMContentLoaded', function () {
    const toggleMobile = document.getElementById('toggleMobile');
    const mobileRow = document.getElementById('mobileRow');
    const mobileRowTmv = document.getElementById('mobileRowtmv');
    const mobileRowRv = document.getElementById('mobileRowRv');

    // Initial state: unchecked and hidden
    toggleMobile.checked = false;
    mobileRow.style.display = 'none';
    mobileRowTmv.style.display = 'none';
    mobileRowRv.style.display = 'none';

    toggleMobile.addEventListener('change', function () {
        const displayStyle = this.checked ? '' : 'none';
        mobileRow.style.display = displayStyle;
        mobileRowTmv.style.display = displayStyle;
        mobileRowRv.style.display = displayStyle;
    });
});

function fadeIn(element, callback = () => { }) {
    element.style.opacity = 0;
    element.style.display = 'flex';
    setTimeout(() => {
        element.style.transition = 'opacity 1s';
        element.style.opacity = 1;
        setTimeout(callback, 1000);
    }, 10);
}

function fadeOut(element, callback = () => { }) {
    element.style.transition = 'opacity 1s';
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.display = 'none';
        callback();
    }, 1000);
}