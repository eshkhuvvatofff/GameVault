let emojes = [
    "🎮",
    "👾",
    "🎲",
    "🎯",
    "🎳",
    "🎰",
    "🏹",
]
let urlAnimate = () => {
    window.location.hash = emojes[Math.floor((Date.now() / 1000) % emojes.length)]
    setTimeout(urlAnimate, 70)
}
urlAnimate();