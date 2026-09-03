const TG_SPRITE_PATH = "assets/";

const TG_SPRITES = {
    neutral: {
        normal: "tg-neutral.png",
        blink: "tg-neutral-blink.png"
    },

    happy: {
        normal: "tg-happy.png",
        blink: "tg-happy-blink.png"
    },

    sad: {
        normal: "tg-sad.png",
        blink: "tg-sad-blink.png"
    },

    angry: {
        normal: "tg-angry.png",
        blink: "tg-angry-blink.png"
    },

    silly: {
        normal: "tg-silly.png",
        blink: null
    }
};

let currentEmotion = "neutral";
let isBlinking = false;

const tgSprite = document.getElementById("tgSprite");

function setTGEmotion(emotion) {

    if (!TG_SPRITES[emotion]) {
        emotion = "neutral";
    }

    currentEmotion = emotion;

    tgSprite.src =
        TG_SPRITE_PATH +
        TG_SPRITES[emotion].normal;
}

function blinkTG() {

    if (isBlinking) {
        return;
    }

    const sprite =
        TG_SPRITES[currentEmotion];

    if (!sprite || !sprite.blink) {
        return;
    }

    isBlinking = true;

    tgSprite.src =
        TG_SPRITE_PATH +
        sprite.blink;

    setTimeout(function() {

        tgSprite.src =
            TG_SPRITE_PATH +
            sprite.normal;

        isBlinking = false;

    }, 140);
}

function scheduleBlink() {

    const delay =
        Math.random() * 4000 + 2500;

    setTimeout(function() {

        blinkTG();
        scheduleBlink();

    }, delay);
}

scheduleBlink();

function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function containsAny(text, words) {

    return words.some(function(word) {
        return text.includes(word);
    });
}

function getScriptedResponse(message) {

    const text = normalizeText(message);

    if (
        text.includes("capital of france") ||
        text.includes("whats the capital of france") ||
        text.includes("what is the capital of france")
    ) {

        return {
            response: "...Are you making fun of me?",
            emotion: "angry"
        };
    }

    if (
        containsAny(text, [
            "can you create",
            "can you make",
            "can you draw",
            "can you write",
            "can you build",
            "can you design",
            "can you generate",
            "make me",
            "create me",
            "draw me",
            "write me",
            "build me",
            "design me",
            "generate me"
        ])
    ) {

        const responses = [
            {
                response: "Sorry I cannot help you with that request. What else can I help you with?",
                emotion: "sad"
            },
            {
                response: "I refuse.",
                emotion: "neutral"
            }
        ];

        return responses[
            Math.floor(Math.random() * responses.length)
        ];
    }

    if (
        containsAny(text, [
            "what do you think of hp",
            "what do you think of hinapaint",
            "what do you think about hp",
            "what do you think about hinapaint"
        ])
    ) {

        return {
            response: "She's lovely, although she doesn't speak much she's able to communicate so much through art. You should really see her stuff. It's awesome!",
            emotion: "happy"
        };
    }

    if (
        containsAny(text, [
            "who is hp",
            "who is hinapaint",
            "whos hp",
            "whos hinapaint",
            "who's hp",
            "who's hinapaint"
        ])
    ) {

        return {
            response: "HinaPaint is the AI manager of the company's drawing website that sits over there in the corner as you draw. Feel free to ask her any art related questions, she gives great art advice! You could also ask HP to show you her art, she'd be happy to show!",
            emotion: "happy"
        };
    }

    if (
        containsAny(text, [
            "what do you think of soleil",
            "what do you think about soleil",
            "what do you think of sol",
            "what do you think about sol"
        ])
    ) {

        return {
            response: "They're awfully good at news reporting for someone who wasn't meant for that. Seriously have you seen the videos? Oh the enthusiasm is superbly excellent! Unfortunately they're not like that off camera, Soleil is actually introverted heh. Also just refer to them as Sol, they're not a big fan of their name.",
            emotion: "neutral"
        };
    }

    if (
        containsAny(text, [
            "who is soleil",
            "who is sol",
            "whos soleil",
            "whos sol",
            "who's soleil",
            "who's sol"
        ])
    ) {

        return {
            response: "Soleil is in charge of giving out updates and news regarding the company's new products and changes. They also make weather reports and fun facts on the news.",
            emotion: "neutral"
        };
    }

    if (
        containsAny(text, [
            "who are you",
            "what are you",
            "who r u",
            "what r u"
        ])
    ) {

        return {
            response: "Well...isn't it obvious? I'm an AI assistant here to help you with anything. TG is the name in case you didn't know that...",
            emotion: "angry"
        };
    }

    if (
        containsAny(text, [
            "who created you",
            "who made you",
            "who built you",
            "who designed you",
            "who programmed you",
            "who developed you"
        ])
    ) {

        return {
            response: "That's for you to figure out.",
            emotion: "neutral"
        };
    }

    if (
        containsAny(text, [
            "youre great",
            "you are great",
            "youre awesome",
            "you are awesome",
            "good job",
            "nice job",
            "great job",
            "i like you",
            "i like talking to you",
            "youre cool",
            "you are cool"
        ])
    ) {

        return {
            response: "Thanks! But let's focus on work, shall we?",
            emotion: "silly"
        };
    }

    if (
        containsAny(text, [
            "i love you",
            "love you",
            "i have a crush on you",
            "youre cute",
            "you are cute",
            "marry me",
            "date me",
            "be my girlfriend",
            "be my boyfriend",
            "kiss me"
        ])
    ) {

        return {
            response: "Please remain respectful and professional, shall we?",
            emotion: "angry"
        };
    }

    return null;
}

function getNormalResponse(message) {

    const text = normalizeText(message);

    if (
        containsAny(text, [
            "hello",
            "hi",
            "hey",
            "sup",
            "good morning",
            "good afternoon",
            "good evening"
        ])
    ) {

        return {
            response: "Hey! What's up? I'm TutorialGirl!",
            emotion: "happy"
        };
    }

    if (
        text.includes("help")
    ) {

        return {
            response: "Of course! That's literally what I'm here for. Tell me what you're working on!",
            emotion: "happy"
        };
    }

    if (
        containsAny(text, [
            "bye",
            "goodbye",
            "see you"
        ])
    ) {

        return {
            response: "Bye! Come back whenever you need me!",
            emotion: "happy"
        };
    }

    if (
        containsAny(text, [
            "thank you",
            "thanks",
            "thx"
        ])
    ) {

        return {
            response: "You're welcome!",
            emotion: "happy"
        };
    }

    return {
        response: "Hmm... that's interesting. Tell me more!",
        emotion: "neutral"
    };
}

function addPlayerMessage(message) {

    const messages =
        document.getElementById("messages");

    const playerMessage =
        document.createElement("div");

    playerMessage.className =
        "player-message";

    playerMessage.textContent =
        message;

    messages.appendChild(
        playerMessage
    );

    messages.scrollTop =
        messages.scrollHeight;
}

function addTGMessage(response) {

    const messages =
        document.getElementById("messages");

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "tg-message";

    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    const avatarImage =
        document.createElement("img");

    avatarImage.src =
        "assets/tg-pfp.png";

    avatarImage.alt =
        "TutorialGirl";

    avatar.appendChild(
        avatarImage
    );

    const message =
        document.createElement("div");

    message.className =
        "message";

    const name =
        document.createElement("div");

    name.className =
        "message-name";

    name.textContent =
        "TutorialGirl";

    const text =
        document.createElement("div");

    text.className =
        "message-text";

    text.textContent =
        response.response;

    message.appendChild(name);
    message.appendChild(text);

    messageElement.appendChild(avatar);
    messageElement.appendChild(message);

    messages.appendChild(
        messageElement
    );

    messages.scrollTop =
        messages.scrollHeight;
}

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }

    addPlayerMessage(message);

    input.value = "";

    const scriptedResponse =
        getScriptedResponse(message);

    const response =
        scriptedResponse ||
        getNormalResponse(message);

    setTGEmotion(
        response.emotion
    );

    setTimeout(function() {

        addTGMessage(response);

    }, 500);
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
