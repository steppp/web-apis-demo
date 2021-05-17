(function () {
    var height = 0, preScrollHeight = 0, postScrollHeight = 0;
    const initialWindowHeight = 1000;

    const fullScreenAnimation = [
        { top: 0, left: 0, width: '100vw', height: '100vh'}
    ];
    const animationOptions = { duration: 10000, fill: 'forwards'};
    var animation;
    var targetElement;
    var targetElementInitialOffsetY = 0;
    const startAtPercent = 0, endAtPercent = 50;
    
    window.onload = () => {
        const body = document.body, html = document.documentElement;
        height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,
            html.scrollHeight, html.offsetHeight);
        preScrollHeight = height * startAtPercent / 100;
        postScrollHeight = height * (100 - (endAtPercent - startAtPercent)) / 100;
        console.log(height);

        targetElement = document.getElementById('main-res');
        targetElementInitialOffsetY = getComputedStyle(targetElement).top.split('p')[0];
        console.log(targetElementInitialOffsetY);

        animation = targetElement
            .animate(fullScreenAnimation, animationOptions);
        animation.pause();
    };
    
    window.onscroll = (scrollEvent) => {
        const keyframeProgress =
            Math.min(
                (window.scrollY - preScrollHeight) / (height - window.innerHeight - postScrollHeight) * 100,
                100);
        console.log(animationOptions.duration * keyframeProgress / 100);

        // targetElement.style.transform = "translateY("
        //     + keyframeProgress / 100 * targetElementInitialOffsetY + "px)";
        animation.currentTime = animationOptions.duration * keyframeProgress / 100;
    }; 
})();
