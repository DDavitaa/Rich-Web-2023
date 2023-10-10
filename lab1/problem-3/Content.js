//array of images
let metalPipe_images = [
    "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_535,q_auto,w_950/c_pad,h_535,w_950/R0190844-01?pgw=1&pgwact=1",
    "https://www.kloecknermetals.com/wp-content/uploads/2017/08/70______-Kopie.jpg",
    "https://i.ebayimg.com/images/g/ImIAAOSwjytdUCyo/s-l1200.jpg",
    "https://i.ebayimg.com/images/g/kIYAAOSw8tZhSs6g/s-l1600.jpg",
	"https://www.reliance-foundry.com/wp-content/uploads/steel-pipe.jpg",
    "https://i.makeagif.com/media/2-19-2023/k3unyo.gif",
    "https://steamuserimages-a.akamaihd.net/ugc/2023843663332715309/C93F2040476F4845F66A5888B9206236B8EED0FC/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://www.steelandpipes.com/cdn/shop/files/Pipes_540x540.gif?v=1675360229"
];

window.onload = function() {
    // changes background image
    document.body.style.backgroundImage = `url(${metalPipe_images[Math.floor(Math.random() * metalPipe_images.length)]})`;

    // changes all images
    const imgs = document.getElementsByTagName("img");
    for(let i = 0; i < imgs.length; i++) {
        const randomImg = Math.floor(Math.random() * metalPipe_images.length)
        imgs[i].src = metalPipe_images[randomImg]
    }

    // changes all h1
    const headers = document.getElementsByTagName("h1");
    for (let i = 0; i < headers.length; i++){
        headers[i].innerText = "METAL PIPE IS TAKING OVER";
    }

    // changes all h2
    const headers2 = document.getElementsByTagName("h2");
    for (let i = 0; i < headers2.length; i++){
        headers2[i].innerText = "I LOVE METAL PIPE";
    }

    // changes all h3
    const headers3 = document.getElementsByTagName("h3");
    for (let i = 0; i < headers3.length; i++){
        headers3[i].innerText = "METAL PIPE IS MY LIFE";
    }

    // changes all p
    const p = document.getElementsByTagName("p");
    for (let i = 0; i < p.length; i++){
        p[i].innerText = "METAL PIPE";
    }

    // changes all buttons
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++){
        buttons[i].innerText = "PRESS FOR METAL PIPE";
        buttons[i].style.backgroundImage = `url(${metalPipe_images[Math.floor(Math.random() * metalPipe_images.length)]})`;
        buttons[i].style.color = "black";
    }

    // changes every link
    const links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++){
        links[i].href = "https://www.metalpipe.com";
    }

    // changes every list item
    const li = document.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++){
        li[i].innerText = "METAL PIPE YES";
    }

    // changes every div
    const divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "transparent";
        divs[i].style.backgroundImage = "transparent";
    }

    // changes every span
    const spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++){
        spans[i].style.color = "red";
        spans[i].style.fontWeight = "bold";
        spans[i].style.textDecoration = "underline";
        spans[i].style.textTransform = "uppercase";
    }

    const title = document.getElementsByTagName("title");
    for (let i = 0; i < title.length; i++){
        title[i].innerText = "METAL PIPE |";
    }

    // changes icons of tabs (sometimes doesn't work)
    var ListOfLinks = document.getElementsByTagName("link");
    for (var i = 0; i < ListOfLinks.length; i++)
    {
        if((ListOfLinks[i].getAttribute("rel") == "icon")||(ListOfLinks[i].getAttribute("rel") == "shortcut icon")||(ListOfLinks[i].getAttribute("rel") == "apple-touch-icon")||(ListOfLinks[i].getAttribute("rel") == "mask-icon"))
        {
            ListOfLinks[i].setAttribute("href", metalPipe_images[Math.floor(Math.random() * metalPipe_images.length)]);
        }
    }    

    // adds a video to the page before h1 elements
    const metalPipe_video = "https://www.youtube.com/embed/Euq7uTeYCP0?autoplay=1&loop=1";
    
    const iframe = document.createElement("iframe");
    iframe.src = metalPipe_video;
    iframe.allow = "autoplay; encrypted-media";
    iframe.height = "300px";
    iframe.width = "535px";
    iframe.style.zIndex = "999";
    document.body.appendChild(iframe);

    const h1 = document.getElementsByTagName("h1")[0];
    h1.parentNode.insertBefore(iframe, h1);
    
    
}
