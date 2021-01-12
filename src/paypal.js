const addPayPalSdk = async (totalOrder) => {
    const clientId = await getPaypalClientId();

    if(!window.paypal){
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://www.paypalobjects.com/api/checkout.js";
        script.async = true;
        script.onload = () => handlePayment(clientId, totalOrder);
        document.body.appendChild(script);
    }
    else{
        handlePayment(clientId, totalOrder);
    }
};
const handlePayment = (clientId, totalOrder) => {
    window.paypal.Button.render({
        env: 'sandbox',
        client: {
            sandbox: clientId,
            production: '',
        },
        locale: 'pt_PT',
        style: {
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
        },

        commit: true,
        payment(data, actions) {
            return actions.payment.create({
                transactions: [
                    {
                        amount: {
                            total: totalOrder,
                            currency: 'EUR',
                        },
                    },
                ],
            });
        },
        onAuthorize(data, actions){
            return actions.payment.execute().then(async() => {
                //showLoading();
                //call pay order
                //hideLoading();
                alert("JS Payment was successfull");
            });
        },
    },
    '#paypal-button'
    ).then( () => {
        //hideLoading();
    });


};
export default {addPayPalSdk, handlePayment};