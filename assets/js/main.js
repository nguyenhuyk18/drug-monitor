let url = location.host;//so it works locally and online

$("table").rtResponsiveTables();//for the responsive tables plugin

$("#add_drug").submit(function (event) {//on a submit event on the element with id add_drug
    alert($("#name").val() + " sent successfully!");//alert this in the browser
})

$('#drug_days').submit(function (event) {
    const data = $(this).serializeArray();

    const request = {
        "url": `http://localhost:3000/api/drugs/filter/${data[0].value}`,
        "method": "GET",
        // "data": data
    }
    $('#purchase_table tbody').html('');
    $.ajax(request).done(function (response) {
        let html = ``;
        // console.log(response)
        let stt = 0
        for (const tmp1 of response) {
            stt++;
            html += `
            
    <tr>
        <td>${stt}</td>
        <td>${tmp1.name}</td>
        <td>${tmp1.cardToBuy}
          (${tmp1.tmp}
          ${tmp1.tmp < 2 ? ' card ' : ' cards '} per pack)</td>
        <td>${tmp1.packToBuy}</td>
    </tr>
            `
        }
        $('#purchase_table tbody').append(html);
    })
})

$("#update_drug").submit(function (event) {// on clicking submit
    event.preventDefault();//prevent default submit behaviour

    //var unindexed_array = $("#update_drug");
    var unindexed_array = $(this).serializeArray();//grab data from form
    var data = {}

    $.map(unindexed_array, function (n, i) {//assign keys and values from form data
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://${url}/api/drugs/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert(data.name + " Updated Successfully!");
        window.location.href = "/manage";//redirects to index after alert is closed
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // jqXHR.status = mã HTTP trả về (400, 404, 500,...)
        // textStatus = "timeout", "error", "abort", "parsererror"
        // errorThrown = message của lỗi từ server

        // console.log(jqXHR)
        const message = JSON.parse(jqXHR.responseText)
        console.log()
        // console.error("Chi tiết:", message.message);
        alert("Lỗi: " + message.message);
    })

})




if (window.location.pathname == "/manage") {//since items are listed on manage
    $ondelete = $("table tbody td a.delete"); //select the anchor with class delete
    $ondelete.click(function () {//add click event listener
        let id = $(this).attr("data-id") // pick the value from the data-id

        let request = {//save API request in variable
            "url": `http://${url}/api/drugs/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this drug?")) {// bring out confirm box
            $.ajax(request).done(function (response) {// if confirmed, send API request
                alert("Drug deleted Successfully!");//show an alert that it's done
                location.reload();//reload the page
            }).fail(function (jqXHR, textStatus, errorThrown) {
                // jqXHR.status = mã HTTP trả về (400, 404, 500,...)
                // textStatus = "timeout", "error", "abort", "parsererror"
                // errorThrown = message của lỗi từ server

                // console.log(jqXHR)
                const message = JSON.parse(jqXHR.responseText)
                // console.log()
                // console.error("Chi tiết:", message.message);
                alert("Lỗi: " + message.message);
            })
        }

    })
}

if (window.location.pathname == "/purchase") {
    //$("#purchase_table").hide();

    $("#drug_days").submit(function (event) {//on a submit event on the element with id add_drug
        event.preventDefault();//prevent default submit behaviour
        $("#purchase_table").show();
        days = +$("#days").val();
        alert("Drugs for " + days + " days!");//alert this in the browser
    })

}
