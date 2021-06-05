(function() {
    let targetElement;
    let elementBackgroundImageString;
    let elementCenterX, elementCenterY;
    const degRexep = new RegExp(/([-]?[\d]+)deg/).compile();

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
        // TODO: since we are considering only the sin value, the angle has the same value in both the upper and lower quadrants
        const sinValue = elementCenterX - mouseEv.x;
        const radiusLength = Math.sqrt(Math.pow(elementCenterY - mouseEv.y, 2) + Math.pow(sinValue, 2));
        return Math.asin(sinValue / radiusLength);
    };

    const removePxSuffix = (pixelValue) => pixelValue.substr(0, pixelValue.length - 2);

    window.onmousemove = ev => {
        const angle = getElementCenterToMousePositionAngle(ev);
        const regExpFoundGroups = degRexep.exec(elementBackgroundImageString);

        console.log(angle);
        console.log(regExpFoundGroups);
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
})();