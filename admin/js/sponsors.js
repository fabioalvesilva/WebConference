const frmSpeaker = document.getElementById("frmSponsor")
const urlBase = "https://fcawebhook.herokuapp.com" 

frmSpeaker.addEventListener("submit", async (event) => {

    event.preventDefault()

    const response = await fetch (`${urlBase}/sponsors`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded"

        },
        method: "POST",
        body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twiiter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}`
    })
})
