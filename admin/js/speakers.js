
const frmSpeaker = document.getElementById("frmSpeaker")
const urlBase = "https://fcawebhook.herokuapp.com" 

frmSpeaker.addEventListener("submit", async (event) => {

    event.preventDefault()

    const response = await fetch (`${urlBase}/speakers`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded"

        },
        method: "POST",
        body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twiiter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}`
    })

    const isNewSpeaker = await response.json()

    const newSpeakerId = await response.headers.get("Location")
    const newUrl = `${urlBase}/conferences/1/speakers/${newSpeakerId}`

    const response2 = await fetch (newUrl, {
        headers: { "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
    })

    const isNewSpeaker2 = await response2.json()

})

const renderSpeakers = async () => {

    const tblSpeakers = document.getElementById("tblSpeakers")

    let strHtml = `

    <thead>
        <tr>
            <th class='w-100 text-center bg-warning' colspan='4'>
            Lista de Participantes
            </th>
        </tr>
        <tr class='big-info'>
            <th class='w-2'>#</th>
            <th class='w-50'>Nome</th>
            <th class='w-38'>Cargo</th>
            <th class='w-10'>Ações</th>
        </tr>
    </thead><tbody>
    `

    const response = await fetch (`${urlBase}/conferences/speakers`)
    const speakers = response.json()

    let i = 1

    for (speaker of speakers){
        strHtml += `
        <tr>
            <td>${i}</td>
            <td>${speaker.nome}</td>
            <td>${speaker.cargo}</td>
            <td><i id='${speaker.idSpeaker}' class='fas fa-edit edit'></i></td>
            <td><i id='${speaker.idSpeaker}' class='fas fa-trash-alt remove'></i></td>
        </tr>
        `

        i++
    }

    strHtml += `</tbody>`

    const btnEdit = document.getElementsByClassName("edit")

    for (let i = 0; i < btnEdit.length; i++){

        btnEdit.addEventListener("click", () =>{
            isNew = false
            for (const speaker of speakers){
                if (speaker.idSpeaker == btnEdit[i].getAttribute("id")){
                    document.getElementById("txtSpeakerId").value = speaker.idSpeaker
                    document.getElementById("txtName").value = speaker.nome
                    document.getElementById("txtJob").value = speaker.cargo
                    document.getElementById("txtPhoto").value = speaker.foto
                    document.getElementById("txtFacebook").value = speaker.facebook
                    document.getElementById("txtTwitter").value = speaker.twitter
                    document.getElementById("txtLinkedin").value = speaker.linkedin
                    document.getElementById("txtBio").value = speaker.bio

                }
            }
        })   
    }

    if (isNew){
        const response = await fetch (`${urlBase}/speakers`, {
            headers: { "Content-Type": "application/x-www-form-urlencoded"
    
            },
            method: "POST",
            body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twiiter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}`
        })
    }else {
        const response = await fetch (`${urlBase}/speakers/${txtSpeakerId}`, {
            headers: { "Content-Type": "application/x-www-form-urlencoded"
    
            },
            method: "PUT",
            body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twiiter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}`
        })

        const newSpeaker = await response.json()
    }

    const btnDelete = document.getElementsByClassName("remove")

    for (let i = 0; i < btnDelete.length; i++){

        btnDelete.addEventListener ("click", () => {
            swal({
                title: 'Tem a certeza?',
                text: "Não será possível reverter a remoção!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Remover'
            }).then (async (result) => {
                if (result.value) {
                    let speakerId = btnDelete[i].getAttribute("id")

                    try {
                        const response = await fetch (`${urlBase}/conferences/1/speaker/${speakerId}`, {
                            method: "DELETE"
                        })
                        const isRemoved = await response.json()

                        swal ('Remoção de Inscrição',
                        isRemoved.message.pt,
                        (isRemoved.success) ? 'success': 'error')
                        renderParticipants()
                    }catch (err) {
                        swal ({
                            type: 'error',
                            title: 'Remoção de Inscrição',
                            text: err
                        })
                    }
                }
            })
        })
    }

}