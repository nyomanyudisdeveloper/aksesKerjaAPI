export const templateTopSuccess = (first_name,last_name,top_up_amount,balance) => {
    return `
        <div style="background-color: aqua; padding:20px">
            <h1 style="text-align: center;">CONTRACT SIM</h1>
            <div 
                style=
                    "background-color: white; 
                    margin-left: 20px; 
                    margin-right: 20px; 
                    padding: 20px;
                    border-radius: 10px;
                    "
            >
                <h3>Hi ${first_name} ${last_name}</h3>
                <p>
                    Transaksi top up anda berhasil sebesar ${top_up_amount}, balance di membership anda 
                    saat ini adalah ${balance}
                </p>
            </div>
        </div>
    `
}

export const templateTransactionServiceSuccess = (first_name,last_name,invoice_number,service_code,service_name,total_amount,created_on) => {
    return `
    <div style="background-color: aqua; padding:20px">
        <h1 style="text-align: center;">CONTRACT SIM</h1>
        <div 
            style=
                "background-color: white; 
                margin-left: 20px; 
                margin-right: 20px; 
                padding: 20px;
                border-radius: 10px;
                "
        >
            <h3>Hi ${first_name} ${last_name}</h3>
            <p>
                Transaksi untuk layanan ${service_name} sukses dengan detail sebagai berikut:
            </p>
            <ul>
                <li>Invoice Number : ${invoice_number}</li>
                <li>Service Code   : ${service_code}</li>
                <li>Service Name   : ${service_name}</li>
                <li>Total Amount   : ${total_amount}</li>
                <li>Created On     : ${created_on}</li>
            </ul>
        </div>
    </div>
    `
}