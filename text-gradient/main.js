(function() {
    let targetElement;
    let elementBackgroundImageString;
    let elementCenterX, elementCenterY;

    const updateElementVariables = (element) => {
        const computedStyle = window.getComputedStyle(element);
        const clientBoundingRect = element.getBoundingClientRect();
        
        elementBackgroundImageString = computedStyle.backgroundImage;
        elementCenterX = clientBoundingRect.x
            + parseInt(removePxSuffix(computedStyle.paddingRight))
            + parseInt(removePxSuffix(computedStyle.width)) / 2;
        elementCenterY = clientBoundingRect.y
            + parseInt(removePxSuffix(computedStyle.paddingTop))
            + parseInt(removePxSuffix(computedStyle.height)) / 2;
    };

    const getElementCenterToMousePositionAngle = (mouseEv) => {
        const angleInDegrees = Math.atan2(elementCenterY - mouseEv.y, elementCenterX - mouseEv.x) * 180 / Math.PI;
        // the linear-gradient coordinates are rotated 90 degrees counter-clockwise wrt the atan2 ones
        return Math.round(angleInDegrees + 90);
    };

    const removePxSuffix = (pixelValue) => pixelValue.substr(0, pixelValue.length - 2);

    window.onmousemove = ev => {
        const angle = getElementCenterToMousePositionAngle(ev);
        document.documentElement.style.setProperty('--linear-gradient-angle', angle + 'deg');
    };

    window.onload = () => {
        targetElement = document.querySelector('h1.gradient-header');
        updateElementVariables(targetElement);
        console.log(elementCenterX, elementCenterY);
    };

    window.onresize = () => {
        updateElementVariables(targetElement);
        console.log(elementCenterX, elementCenterY);
    }

    const rgbToColor = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

    let counter = 1;
    const frequency = .05;
    setInterval(() => {
        // see https://krazydad.com/tutorials/makecolors.php
        const r1 = Math.sin(frequency * counter + 0) * 127 + 128;
        const g1 = Math.sin(frequency * counter + 2) * 127 + 128;
        const b1 = Math.sin(frequency * counter + 4) * 127 + 128;

        const secondCounter = counter + 1;
        const r2 = Math.sin(frequency * secondCounter + 2) * 127 + 128;
        const g2 = Math.sin(frequency * secondCounter + 4) * 127 + 128;
        const b2 = Math.sin(frequency * secondCounter + 0) * 127 + 128;

        document.documentElement.style.setProperty('--linear-gradient-first-color', rgbToColor(r1, g1, b1));
        document.documentElement.style.setProperty('--linear-gradient-second-color', rgbToColor(r2, g2, b2));

        counter++;
    }, 100);
})();