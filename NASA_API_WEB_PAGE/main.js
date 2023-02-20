const apiKey = "KTuFEtvLk0btyhWsn2QAjbX3fO63ZwUYcSChUrPT";
const apodUrl = "https://api.nasa.gov/planetary/apod";


let date_mas=[]

function contentLoaded(){
    const apodElement = document.getElementById("apod");
    let main_img_date=''
    
    
    fetch(`${apodUrl}?api_key=${apiKey}`)
    .then(res=>res.json())
    .then(data=>{
        main_img_date=data.date        
        let media = "";
        if(data.media_type === "image"){
            media = `<img onclick="window.open('${data.hdurl}')" class="responsive-img" src="${data.url}">`
            
        } 
       
        function check_copyright(data){
            if (typeof(data.copyright) != "undefined"){
                return `© ${data.copyright}`
                
            }else{
                return "© Public domain"
            }
        }

        const d=new Date(data.date)
        const today_date=("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." + d.getFullYear()
        apodElement.innerHTML = (`
            <div class="card-image">
                ${media}
                <span class="card-title">${data.title}
                <p>${today_date}</p>
                <p>${check_copyright(data)}</span>
            </div>
            <div style="background-color: black;" class="card-content">
                <p>
                    <form name="myForm" id="inpform"  class="validate_form"   >
                        <div class="rating-area">
                            <input type="radio" id="star-10" name="rating" value="10">
                            <label for="star-10" title="Оценка «10»"></label>  

                            <input  type="radio" id="star-9" name="rating" value="9">
                            <label for="star-9" title="Оценка «9»"></label>    

                            <input  type="radio" id="star-8" name="rating" value="8">
                            <label for="star-8" title="Оценка «8»"></label>  

                            <input  type="radio" id="star-7" name="rating" value="7">
                            <label for="star-7" title="Оценка «7»"></label>    

                            <input  type="radio" id="star-6" name="rating" value="6">
                            <label for="star-6" title="Оценка «6»"></label>

                            <input  type="radio" id="star-5" name="rating" value="5">
                            <label for="star-5" title="Оценка «5»"></label>  

                            <input  type="radio" id="star-4" name="rating" value="4">
                            <label for="star-4" title="Оценка «4»"></label>    

                            <input  type="radio" id="star-3" name="rating" value="3">
                            <label for="star-3" title="Оценка «3»"></label>  

                            <input  type="radio" id="star-2" name="rating" value="2">
                            <label for="star-2" title="Оценка «2»"></label>    

                            <input  type="radio" id="star-1" name="rating" value="1">
                            <label for="star-1" title="Оценка «1»"></label>
                        </div>
                        <br><button type="submit">Submit</button>
                    </form>   
                </p>
                <div id="response" class="rating-result-container">
                    <div class="rating-result"></div>
                </div>
            </div>
            
        `)
        const formElement=document.getElementById('inpform')
        let result=document.querySelector(".rating-result")

        formElement.addEventListener('submit',(e)=>{
            e.preventDefault()
            const formData=new FormData(formElement)
            const rating=formData.get('rating')
            if(rating===null){
                alert('Rate, please!')
            }else{
                console.log("rating: ",rating)
            console.log(main_img_date)

            rating_coded=encodeURIComponent(rating)

            let xhr= new XMLHttpRequest()

            xhr.open("POST","http://localhost:8090/NASA_API_WEB_PAGE/backend.php")
            
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")

            xhr.onreadystatechange=function(){
                if(xhr.readyState===4 && xhr.status===200){
                    console.log(xhr.responseText)
                    result.textContent=xhr.responseText
                }
                else{
                    console.log("статус:" + xhr.status)
                    console.log("состояние:" + xhr.readyState)
                }
            }

            xhr.send("rating="+ rating+"&date="+main_img_date)

            }
            
            
        })
        

        

         
    }).catch(handleError);

    fetch(`${apodUrl}?api_key=${apiKey}&count=7`)
    .then(res=>res.json())
    .then(data=>{
            data = data.filter(function( obj ) {
                return obj.date !== main_img_date;
            });
            data.sort()
            for (let i of data) {
                date_mas.push(i.date);
            }
            date_mas.push(main_img_date)
            const lil_pictures_element=document.getElementById("lil-pictures-container")
            lil_pictures_element.innerHTML=(`
                                            <div class="lil-image-container">
                                                <img onclick="window.open('${data[0].hdurl}')" class="lil-image" src="${data[0].url}">
                                            </div>
                                            <div class="lil-image-container">
                                                <img onclick="window.open('${data[1].hdurl}')" class="lil-image" src="${data[1].url}">
                                            </div>
                                            <div class="lil-image-container">
                                                <img onclick="window.open('${data[2].hdurl}')" class="lil-image" src="${data[2].url}">
                                            </div>
                                            <div class="lil-image-container">
                                                <img onclick="window.open('${data[3].hdurl}')" class="lil-image" src="${data[3].url}">
                                            </div>
                                            <div class="lil-image-container">
                                                <img onclick="window.open('${data[4].hdurl}')" class="lil-image" src="${data[4].url}">
                                            </div>
                                            <div class="lil-image-container">
                                                <img onclick="window.open('${data[5].hdurl}')" class="lil-image" src="${data[5].url}">
                                            </div>
            `)
            
        }).catch(handleError);
    
        }
    
    
    function handleError(error){
        console.warn(error.message);
    }
    
    function showMore(){
        const more_lil_pictures_element=document.getElementById("more-lil-pictures-container")
        fetch(`${apodUrl}?api_key=${apiKey}&count=7`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            data[1].date='2023-02-19'
            data=data.filter(item => !date_mas.includes(item.date))
            console.log(data)
    
            data.sort()
            
            more_lil_pictures_element.innerHTML=(`
                                                <div class="more-lil-image-container">
                                                    <img onclick="window.open('${data[0].hdurl}')" class="more-lil-image" src="${data[0].url}">
                                                </div>
                                                <div class="more-lil-image-container">
                                                    <img onclick="window.open('${data[1].hdurl}')" class="more-lil-image" src="${data[1].url}">
                                                </div>
                                                <div class="more-lil-image-container">
                                                    <img onclick="window.open('${data[2].hdurl}')" class="more-lil-image" src="${data[2].url}">
                                                </div>
                                                <div class="more-lil-image-container">
                                                    <img onclick="window.open('${data[3].hdurl}')" class="more-lil-image" src="${data[3].url}">
                                                </div>
                                                <div class="more-lil-image-container">
                                                    <img onclick="window.open('${data[4].hdurl}')" class="more-lil-image" src="${data[4].url}">
                                                </div>
                                                <div class="more-lil-image-container">
                                                    <img onclick="window.open('${data[5].hdurl}')" class="more-lil-image" src="${data[5].url}">
                                                </div>
                `)
            }).catch(handleError);
            document.querySelector('#show-more-button').remove();
        }
        
// добавление еще 6 превью при нажатии
document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault()
    document.querySelector('#show-more-button').addEventListener('click', showMore);
    
});
//добавление основной картинки и 6 превью
window.addEventListener("DOMContentLoaded", contentLoaded)

