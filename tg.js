const TG_SPRITE_PATH = "assets/tg/";

const TG_EMOTIONS = {

    neutral: {
        normal: "neutral.png",
        blink: "neutral-blink.png"
    },

    happy: {
        normal: "happy.png",
        blink: "happy-blink.png"
    },

    confused: {
        normal: "confused.png",
        blink: "confused-blink.png"
    },

    sad: {
        normal: "sad.png",
        blink: "sad-blink.png"
    },

    angry: {
        normal: "angry.png",
        blink: "angry-blink.png"
    }

};

let currentEmotion = "neutral";

const tgSprite =
    document.getElementById("tgSprite");

function setTGEmotion(emotion) {

    if (!TG_EMOTIONS[emotion]) {
        emotion = "neutral";
    }

    currentEmotion = emotion;

    tgSprite.src =
        TG_SPRITE_PATH +
        TG_EMOTIONS[emotion].normal;
}

function blinkTG() {

    const emotion =
        TG_EMOTIONS[currentEmotion];

    if (!emotion) {
        return;
    }

    tgSprite.src =
        TG_SPRITE_PATH +
        emotion.blink;

    setTimeout(function() {

        tgSprite.src =
            TG_SPRITE_PATH +
            emotion.normal;

    }, 120);
}

function scheduleBlink() {

    const delay =
        Math.random() * 3500 + 2500;

    setTimeout(function() {

        blinkTG();
        scheduleBlink();

    }, delay);
}

scheduleBlink();

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const messages =
        document.getElementById("messages");

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }

    const playerMessage =
        document.createElement("div");

    playerMessage.className =
        "player-message";

    playerMessage.textContent =
        message;

    messages.appendChild(
        playerMessage
    );

    input.value = "";

    messages.scrollTop =
        messages.scrollHeight;

    const emotion =
        determineEmotion(message);

    setTGEmotion(emotion);

    setTimeout(function() {

        const response =
            document.createElement("div");

        response.className =
            "tg-message";

        response.innerHTML = `

            <div class="message-avatar">

                <img
                    src="assets/tg-pfp.png"
                    alt="TutorialGirl">

            </div>

            <div class="message">

                <div class="message-name">
                    TutorialGirl
                </div>

                <div class="message-text">
                    ${getTGResponse(message)}
                </div>

            </div>

        `;

        messages.appendChild(
            response
        );

        messages.scrollTop =
            messages.scrollHeight;

    }, 700);
}

function determineEmotion(message) {

    const text =
        message.toLowerCase();

    if (
        text.includes("thank") ||
        text.includes("thanks") ||
        text.includes("love") ||
        text.includes("great") ||
        text.includes("awesome") ||
        text.includes("good") ||
        text.includes("happy")
    ) {

        return "happy";

    }

    if (
        text.includes("sad") ||
        text.includes("cry") ||
        text.includes("sorry") ||
        text.includes("bad") ||
        text.includes("upset")
    ) {

        return "sad";

    }

    if (
        text.includes("angry") ||
        text.includes("mad") ||
        text.includes("hate")
    ) {

        return "angry";

    }

    if (
        text.includes("why") ||
        text.includes("what") ||
        text.includes("confused") ||
        text.includes("how")
    ) {

        return "confused";

    }

    return "neutral";
}

function getTGResponse(message) {

    const text =
        message.toLowerCase();

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey") ||
        text.includes("sup")
    ) {

        return "Hey! What's up? I'm TutorialGirl!";

    }

    if (
        text.includes("who are you") ||
        text.includes("what are you")
    ) {

        return "I'm TutorialGirl! You can call me TG. I'm here to help you with whatever creative thing you're working on!";

    }

    if (
        text.includes("creativeai") ||
        text.includes("creative ai")
    ) {

        return "CreativeAI is the company that made me! They're pretty cool, right?";

    }

    if (
        text.includes("help")
    ) {

        return "Of course! That's literally what I'm here for. Tell me what you're working on!";

    }

    if (
        text.includes("bye") ||
        text.includes("goodbye")
    ) {

        return "Bye! Come back whenever you need me!";

    }

    return "Hmm... that's interesting. Tell me more!";
}

document
    .getElementById("userInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                sendMessage();
            }

        }
    );

function toggleFullscreen() {

    const stage =
        document.getElementById("tgStage");

    if (!document.fullscreenElement) {

        stage.requestFullscreen()
            .catch(function(error) {

                console.log(
                    "Fullscreen failed:",
                    error
                );

            });

    } else {

        document.exitFullscreen();

    }
}
