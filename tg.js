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



    /* Clear input */

    input.value = "";



    /* Scroll down */

    messages.scrollTop =
        messages.scrollHeight;



    setTimeout(function() {


        const response =
            document.createElement("div");


        response.className =
            "tg-message";


        response.innerHTML = `

            <div class="message-avatar">
            </div>

            <div class="message">
                ${getTGResponse(message)}
            </div>

        `;


        messages.appendChild(
            response
        );


        messages.scrollTop =
            messages.scrollHeight;


    }, 700);

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


            if (
                event.key === "Enter"
            ) {

                sendMessage();

            }

        }
    );


function toggleFullscreen() {


    const stage =
        document.getElementById("tgStage");



    if (
        !document.fullscreenElement
    ) {


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
