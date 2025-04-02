// import the installed libraries
require("dotenv").config()
const m = require("masto")

const messages = [
    ["hey"],
    [
      "no worries if you're busy",
      "i just thought maybe you'd say something by now"
    ],
    [
      "i literally saw you online",
      "it said \"active 10m ago\""
    ],
    [
      "you posted",
      "so at least i know you're alive and selectively silent",
      "which is cool",
      "and fine",
      "and totally not cruel"
    ],
    [
      "if you want space just say that",
      "are you being emotionally constipated as usual"
    ],
    [
      "okay",
      "now i'm starting to feel insane",
      "like am i annoying",
      "or is this your way of punishing me"
    ],
    ["reply"],
    [
      "just say anything",
      "even a thumbs up"
    ],
    [
      "did you mute me or block me",
      "i tried to check your story and it's just gone"
    ],
    [
      "actually nvm",
      "you probably just archived it",
      "not that i checked twice from my alt"
    ],
    [
      "i told myself i wouldn't spiral",
      "and yet here i am",
      "rewatching your old reels like a clown"
    ],
    [
      "i'm literally so chill about this",
      "like disturbingly chill"
    ],
    [
      "seriously",
      "i can't see your tweets anymore",
      "are you shadowbanning me irl"
    ],
    [
      "if this is your way of setting a boundary it's very modern of you",
      "passive ghosting is so in right now"
    ],
    [
      "if you died just say that",
      "otherwise this is insane behavior"
    ],
    [
      "you're literally logged on and posting memes",
      "how do you have the energy for memes and not this"
    ],
    [
      "reply",
      "please"
    ],
    [
      "ok wait",
      "did your friend tell you something about me",
      "be honest",
      "is this because of that one night when i said the thing about my ex",
      "because if so grow up"
    ],
    [
      "blocking someone mid-silent treatment is actually revolutionary",
      "you should write a Medium post about it"
    ],
    [
      "fine",
      "you win",
      "i care too much",
      "congrats",
      "enjoy the power trip"
    ],
    ["idk what i'm expecting at this point"],
    [
      "you know what's crazy",
      "i'd still take you back",
      "if you texted \"lol\""
    ],
    ["this silence is actually abuse btw"],
    [
      "ok",
      "cool",
      "just text me if you ever unblock me",
      "then we can pretend none of this happened",
    ]
];

const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN
})

async function makeStatus(text){
    const status = await masto.v1.statuses.create({
        // the thing that will be posted
        status: text,
        visibility: "public"
    })

    console.log(status.url)
}

let groupIndex = 0
let messageIndex = 0

async function postMessagesFromGroup() {

    if (groupIndex >= messages.length) {
        // console.log("finished")
        clearInterval(hourlyInterval)
        return
    }

    const currentGroup = messages[groupIndex]
    
    // if (messageIndex === 0) {
    //     console.log(`Starting message group ${groupIndex + 1} of ${messages.length}`)
    // }

    await makeStatus(currentGroup[messageIndex])
    // console.log(`Posted message ${messageIndex + 1} from group ${groupIndex + 1}`)
    
    messageIndex++
    
    if (messageIndex >= currentGroup.length) {
        groupIndex++
        messageIndex = 0
        // console.log(`Completed message group ${groupIndex} of ${messages.length}`)
    } else {
        setTimeout(postMessagesFromGroup, 60000)
    }

}

postMessagesFromGroup()

const hourlyInterval = setInterval(() => {
    if (messageIndex === 0) {
        postMessagesFromGroup()
    }
}, 3600000)