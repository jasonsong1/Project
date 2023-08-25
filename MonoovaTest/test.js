const baseURL = "https://api.m-pay.com.au";
let ListofExWebhook = [];


const GetTRXStatAPIKey = document.getElementById("GetTRXStatAPIKey");


let uniqueReference = document.getElementById("uniqueReferenceInput");
// let reportV6date = document.getElementById("reportV6Input");



let statusbyUIDBtn = document.getElementById("statusbyUIDSubmit");
// let reportV6Btn = document.getElementById("reportV6Submit");
let GetAllWebhooksBtn = document.getElementById("GetAllWebhooksBtn")


statusbyUIDBtn.addEventListener("click", GetTRXStatus);
// reportV6Btn.addEventListener("click",ReportV6);
GetAllWebhooksBtn.addEventListener("click",GetAllWebhooks)





async function GetTRXStatus() {

  if (!uniqueReference.value){
   alert("Do not leave Reference fields empty.")
    
}else if(!GetTRXStatAPIKey.value){
  alert("Enter your API Key.")
  return
}

    let response = await fetch(
      `${baseURL}/financial/v2/status/${uniqueReference.value}`,
      {
        method: "get",
        headers: {
          Authorization: "Basic " + btoa(GetTRXStatAPIKey.value),
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
      console.log("this is data", data)
      let resultArea = document.getElementById("TrxStatResultArea");
      resultArea.innerHTML =    

    `<div class="responseBody">
    <br>
    <div> Endpoint Response </div>
    <br>
    <div>{</div>
    <div>"durationMs": ${data.durationMs},</div>
    <div>"status": "${data.status}",</div>
    <div><span>"statusDescription": "${data.statusDescription}",</span></div>
    <div><span>"completedDate": "${data.completedDate}",</span></div>
    <div>"dishonouredDate": ${data.dishonouredDate},</div>
    <div>"expectedClearanceDateForFunds": ${data.expectedClearanceDateForFunds},</div>
    <div>"fundsClearedDate": ${data.fundsClearedDate},</div>
    <div> <span> "transactionStatus": "${data.transactionStatus}",</span></div>
    <div> "uniqueReference": "${data.uniqueReference}"</div>
    <div> }</div>
    <br>
    </div>`

}






// async function ReportV6() {


//   let response = await fetch(
//       `${baseURL}/receivables/v6/report/${reportV6date.value}`,
//       {
//         method: "get",
//         headers: {
//           Authorization: "Basic " + btoa(secretAPIKey.value),
//               "Content-Type": "text/plain"

//         },
//       }
//      )
//     .then(response => response.text())
//     .then(reportText => {
//       console.log("Report:", reportText);
//       // Handle the text/plain response here
//     })
//     .catch(error => {
//       console.error("Error:", error);
//       // Handle errors here
//     });
//   }











//All existing webhooks
const ListExWebAPIKey = document.getElementById("ListExWebAPIKey")
async function GetAllWebhooks() {

  if (!uniqueReference.value){
    alert("Enter your API Key.")
   return
 }

    let res = await fetch(
      `${baseURL}/subscriptions/v1/list`,
      {
        method: "get",
        headers: {
          Authorization: "Basic " + btoa(ListExWebAPIKey.value),
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();

    console.log("this is data", data)
    
    
      let resultArea = document.getElementById("AllExistingHooksResultArray");
      let resultHeader = document.getElementById("AllExistingHooksResultArea");
      
      resultHeader.innerHTML=`<div class="responseBody">
      <br>
      <div> Endpoint Response </div>

      <div>"statusDescription": ${data.statusDescription}, </div>
      <div>"eventName": [</div>
      </div>`


      resultArea.innerHTML = ``;    
      Existinghooks = data.eventName
      resultArea.innerHTML = Existinghooks.map(Existinghooks=>{
        return  ` 
        
        <div class="responseBody">
        <br>
        <div>"createdDate": ${Existinghooks.createdDate}, </div>
        <div><span>"eventName": ${Existinghooks.eventName},</span> </div>
        <div><span>"id": ${Existinghooks.id},</span> </div>
        <div>"lastUpdated": ${Existinghooks.lastUpdated}, </div>
        <div><span>"status": ${Existinghooks.status},</span> </div>
        <div><span>"targetUrl": ${Existinghooks.targetUrl},</span> </div>
        <div>{</div></div>
        <br>
        `
      }).join('')
}
















function openPayment(evt,paymentRail){
  let i, tabcontents, tablinks
  tabcontents = document.getElementsByClassName("tabcontents")
  for(i=0; i<tabcontents.length; i++){
    tabcontents[i].style.display="none"
  }

  tablinks=document.getElementsByClassName("tablinks")
for(i=0; i<tablinks.length; i++){
  tablinks[i].className =tablinks[i].className.replace("active","")

}

document.getElementById(paymentRail).style.display="block"
evt.currentTarget.className+= "active"

}

document.getElementById("defaultOpen").click()

















// POST transaction Function
let IniPayloadSubmit = document.getElementById("IniPayloadSubmit")





function NppCreditBankAccountVariables(){
  let NPPBankPayfields = document.querySelector('#NPPBankPayfields')
  let AllNPPBankPayfields = NPPBankPayfields.querySelectorAll("section")

ProcessTRXuniRefValue =ProcessTRXuniRef.value
DescriptionValue =Description.value
DisbursementMethodValue = DisbursementMethod.value
BSBNumberValue =BSBNumber.value
AccountNumberValue =AccountNumber.value
AccountNameValue =AccountName.value
RemitterNameValue =RemitterName.value
LodgementReferenceValue =LodgementReference.value
EndToEndIdValue =EndToEndId.value
EnteredAmountValue =EnteredAmount.value
}






// Click event
IniPayloadSubmit.addEventListener("click",Inipayload)




// Payment NPP Bank
function Inipayload(){
  NppCreditBankAccountVariables()


  let NppPayBankAccountPayLoad ={
  disbursements: [
  {
     disbursementMethod: DisbursementMethodValue,
      toNppCreditBankAccountDetails: {
        bsbNumber: BSBNumberValue,
        accountNumber: AccountNumberValue,
        accountName: AccountNameValue,
         endToEndId: EndToEndIdValue,
         remitterName: RemitterNameValue
          },
        lodgementReference: LodgementReferenceValue,
        amount: EnteredAmountValue
        }
        ]
        };




  if (!EnteredAmountValue){
    alert("Do not leave amount empty.")
     
 }else if(!DisbursementMethodValue){
   alert("Do not leave disbursement method fields empty.")
 }else if(!BSBNumberValue){
  alert("Do not leave BSB number fields empty.")
}else if(!AccountNumberValue){
  alert("Do not leave account number fields empty.")
}else if(!AccountNameValue){
  alert("Do not leave account name fields empty.")
  return
}

const NppPayBankAccountPayLoadJSON = JSON.stringify(NppPayBankAccountPayLoad);
  fetch(`${baseURL}/financial/v2/transaction/execute`, {
  method: "POST",
  headers: {
    Authorization: "Basic " + btoa(PaymentAPIKey.value),
    "Content-Type": "application/json",
    

  },
  body: NppPayBankAccountPayLoadJSON
  
})
  .then(response => response.json())
  .then(result => {
    console.log("API response:", result);
    // Handle the response from the API here
    let resultIniArea = document.getElementById("TrxIniResArea");
  resultIniArea.innerHTML =    

`
<div class="responseBody">
<br>
<div> Endpoint Response </div>
<br>
<div>{</div>
  <div>"durationMs": ${result.durationMs},</div>
  <div> <span>"status": ${result.status},</div></span>
  <div> <span>"statusDescription": ${result.statusDescription},</div></span>
  <div> <span> "transactionId": ${result.transactionId},</div></span>
  <div> "feeAmountExcludingGst": ${result.feeAmountExcludingGst},</div>
  <div> "feeAmountGstComponent": ${result.feeAmountGstComponent},</div>
  <div> "feeAmountIncludingGst": ${result.feeAmountIncludingGst},</div>
  <div> <span>"callerUniqueReference": ${result.callerUniqueReference},</div></span>

  <div> }</div>
  </div>`
  })

}








// POST PayID transaction Function

let PayIdPayloadSubmit = document.getElementById("PayIdPayloadSubmit")

PayIdPayloadSubmit.addEventListener("click",NppCreditPayIdPayload)

function NppCreditPayIdVariables(){
  let PayIdfields = document.querySelector('#PayIdfields')
  let AllPayIdfields = PayIdfields.querySelectorAll("section")

PayIdProcessTRXuniRefValue =PayIdProcessTRXuniRef.value
PayIdDescriptionValue =PayIdDescription.value
PayIdAccountNameValue =PayIdAccountName.value
PayIdRemitterNameValue =PayIdRemitterName.value
PayIdLodgementReferenceValue =PayIdLodgementReference.value
PayIdEndToEndIdValue =PayIdEndToEndId.value
PayIdEnteredAmountValue =PayIdEnteredAmount.value
PayIdDisbursementMethodValue = PayIdDisbursementMethod.value
PayIdValue =PayId.value
PayIdTypeValue =PayIdType.value

}



function NppCreditPayIdPayload(){
  NppCreditPayIdVariables()


  let NppPayBankAccountPayLoad ={
  disbursements: [
  {
     disbursementMethod: PayIdDisbursementMethodValue,
     toNppCreditPayIdDetails: {
        payId: PayIdValue,
        payIdType: PayIdTypeValue,
        accountName: PayIdAccountNameValue,
         endToEndId: PayIdEndToEndIdValue,
         remitterName: PayIdRemitterNameValue
          },
        lodgementReference: PayIdLodgementReferenceValue,
        amount: PayIdEnteredAmountValue
        }
        ]
        };

console.log(NppPayBankAccountPayLoad)


  if (!PayIdEnteredAmountValue){
    alert("Do not leave amount empty.")
 }else if(!PayIdDisbursementMethodValue){
   alert("Do not leave disbursement method fields empty.")
 }else if(!PayIdTypeValue){
  alert("Do not leave BSB number fields empty.")
}else if(!PayIdValue){
  alert("Do not leave account number fields empty.")
  return
}

const NppCreditPayIdPayloadJSON = JSON.stringify(NppCreditPayIdPayload);
  fetch(`${baseURL}/financial/v2/transaction/execute`, {
  method: "POST",
  headers: {
    Authorization: "Basic " + btoa(PayIdAPIKey.value),
    "Content-Type": "application/json",
    

  },
  body: NppCreditPayIdPayloadJSON
  
})
  .then(response => response.json())
  .then(result => {
    console.log("API response:", result);
    // Handle the response from the API here
    let resultIniArea = document.getElementById("TrxIniResArea");
  resultIniArea.innerHTML =    

`
<div class="responseBody">
<br>
<div> Endpoint Response </div>
<br>
<div>{</div>
  <div>"durationMs": ${result.durationMs},</div>
  <div> <span>"status": ${result.status},</div></span>
  <div> <span>"statusDescription": ${result.statusDescription},</div></span>
  <div> <span> "transactionId": ${result.transactionId},</div></span>
  <div> "feeAmountExcludingGst": ${result.feeAmountExcludingGst},</div>
  <div> "feeAmountGstComponent": ${result.feeAmountGstComponent},</div>
  <div> "feeAmountIncludingGst": ${result.feeAmountIncludingGst},</div>
  <div> <span>"callerUniqueReference": ${result.callerUniqueReference},</div></span>

  <div> }</div>
  </div>`
  })

}


