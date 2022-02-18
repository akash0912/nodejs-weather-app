const formEl = document.querySelector('form');
const input = document.querySelector('input');
const message_1 = document.querySelector('.message-1'); 
const message_2 = document.querySelector('.message-2'); 


formEl.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = input.value;
    console.log('fetching Location')

    if(!location){
        return console.log("Please enter location")
    }

    message_1.textContent = "Loading..."
    message_2.textContent = ""
    fetch(`http://localhost:3000/weather?address=${location}`).then(response=>{
    response.json().then(data=>{
        if(data.error)
        message_1.textContent = data.error
        else{
            message_1.textContent = data.address
            message_2.textContent = data.forecast
            console.log(data)
            // console.log(data)
        }
    })
})
})