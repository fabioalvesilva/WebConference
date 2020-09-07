const renderParticipants = async () => {
    const urlBase = "https://fcawebhook.herokuapp.com"
    const tblParticipants = document.getElementById("tblParticipants")
    
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
        <th class='w-38'>E-mail</th>
        <th class='w-10'>Ações</th>
        </tr>
    </thead><tbody>
    `
    const response = await fetch(`${urlBase}/conferences/1/participants`)
    const participants = response.json

    let i = 1

    for (const participant of participants){
        strHtml += `
        
        <tr>
            <td>${i}</td>
            <td>${participant.nomeParticipante}</td>
            <td>${participant.idParticipant}</td>
            <td><i id='${participant.idParticipant}' class='fas fa-trash-alt remove'></i></td>
        </tr>
        
        `
        i++
    }

    strHtml += `</tbody>`

    tblParticipants.innerHTML = strHtml


    const btnDelete = document.getElementsByClassName("remove")

    for (let i = 0; i < btnDelete.length; i++){

        btnDelete[i].addEventListener("click", () => {
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
                    let partcipantId = btnDelete[i].getAttribute("id")

                    try {
                        const response = await fetch (`${urlBase}/conferences/1/participants/${partcipantId}`, {
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