const baseURL = "https://api.m-pay.com.au";
let ListofExWebhook = [];


const GetTRXStatAPIKey = document.getElementById("GetTRXStatAPIKey");
let uniqueReference = document.getElementById("uniqueReferenceInput");

let statusbyUIDBtn = document.getElementById("statusbyUIDSubmit");

let GetAllWebhooksBtn = document.getElementById("GetAllWebhooksBtn")
statusbyUIDBtn.addEventListener("click", GetTRXStatus);

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

    `
    <div class="responseBody">
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
    </div>
    `

}




// V6report

let reportV6Startdate = document.getElementById("reportV6StartDate");
let reportV6Submit = document.getElementById("reportV6Submit");
const ReportV6APIKey = document.getElementById("ReportV6APIKey")
let reportV6resultArea = document.getElementById("reportV6resultArea")
let reportV6EndDate = document.getElementById("reportV6EndDate")

reportV6Submit.addEventListener("click",RenderReportV6);

async function ReportV6(url){
  let response = await fetch(url,
    {
      method: "get",
      headers: {
        Authorization: "Basic " + btoa(ReportV6APIKey.value),
            "Content-Type": "application/octet-stream"
      },
    }
   )
  .then(response => response.text())
  .then(reportText => {
    console.log("Report:", reportText);
    // Handle the text/plain response here
    reportV6resultArea.innerHTML =`<pre class="ReporV6twidth">${reportText}</pre>`
  })
  .catch(error => {
    console.error("Error:", error);
    // Handle errors here
  });
}



function RenderReportV6() {
if(!reportV6EndDate.value){
  ReportV6(`${baseURL}/receivables/v6/report/${reportV6Startdate.value}`)
}else {
  ReportV6(`${baseURL}/receivables/v6/report/${reportV6Startdate.value}?endDate=${reportV6EndDate.value}`)
}
}















//All existing webhooks
const ListExWebAPIKey = document.getElementById("ListExWebAPIKey")
async function GetAllWebhooks() {

//   if (!uniqueReference.value){
//     alert("Enter your API Key.")
//    return
//  }

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
      <div>"eventName": [</div><br>
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
        <div>{<br></div><br></div>
        
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
  // const PaymentAPIKey = document.getElementById("PaymentAPIKey")
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
IniPayloadSubmit.addEventListener("click",RenderNPPPayment)




// Payment NPP Bank
function RenderNPPPayment(){
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

  <div> }</div><br>
  </div>`
  })

}











// POST PayID transaction Function
// const PayIdAPIKey = document.getElementById("PayIdAPIKey")
let PayIdPayloadSubmit = document.getElementById("PayIdPayloadSubmit")

PayIdPayloadSubmit.addEventListener("click",RenderPayIDPayment)

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



function RenderPayIDPayment(){
  NppCreditPayIdVariables()


  let PayIDPayLoad ={
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

const NppCreditPayIdPayloadJSON = JSON.stringify(PayIDPayLoad);
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
    let resultIniArea = document.getElementById("payidIniResArea");
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

  <div> }</div><br>
  </div>`
  })

}









//Direct Debit Initiation


let DirectDebitPayloadSubmit = document.getElementById("DirectDebitPayloadSubmit")

DirectDebitPayloadSubmit.addEventListener("click",RenderDirectDebitPayment)

function DirectDebitVariables(){
  let PayIdfields = document.querySelector('#PayIdfields')
  let AllPayIdfields = PayIdfields.querySelectorAll("section")


DirectDebitProcessTRXuniRefValue =DirectDebitProcessTRXuniRef.value//
DirectDebitDescriptionValue =DirectDebitDescription.value//
DirectDebitAccountNameValue =DirectDebitAccountName.value//
DirectDebitLodgementReferenceValue =DirectDebitLodgementReference.value//
DirectDebitEnteredAmountValue =DirectDebitEnteredAmount.value//
DirectDebitDisbursementMethodValue = DirectDebitDisbursementMethod.value//
DirectDebitBSBNumberValue =DirectDebitBSBNumber.value//
DirectDebitAccountNumberValue=DirectDebitAccountNumber.value//

}



function RenderDirectDebitPayment(){
  DirectDebitVariables()


  let DirectDebitPayLoad ={
    
        uniqueReference: DirectDebitProcessTRXuniRefValue,
        totalAmount: DirectDebitEnteredAmountValue,
        paymentSource: DirectDebitDisbursementMethodValue,
        lodgementReference:DirectDebitLodgementReferenceValue,
      directDebit: {
              bsbNumber: DirectDebitBSBNumberValue,
              accountNumber: DirectDebitAccountNumberValue,
              accountName: DirectDebitAccountNameValue,
              lodgementReference: DirectDebitLodgementReferenceValue
                   }
    };




  if (!DirectDebitEnteredAmountValue){
    alert("Do not leave amount empty.")
 }else if(!DirectDebitDisbursementMethodValue){
   alert("Do not leave payment source fields empty.")
 }else if(!DirectDebitBSBNumberValue){
  alert("Do not leave BSB number fields empty.")
}else if(!DirectDebitAccountNumberValue){
  alert("Do not leave account number fields empty.")
  return
}

const DirectDebitPayLoadPayloadJSON = JSON.stringify(DirectDebitPayLoad);
  fetch(`${baseURL}/financial/v2/transaction/execute`, {
  method: "POST",
  headers: {
    Authorization: "Basic " + btoa(DirectDebitAPIKey.value),
    "Content-Type": "application/json",
    

  },
  body: DirectDebitPayLoadPayloadJSON
  
})
  .then(response => response.json())
  .then(result => {
    console.log("API response:", result);
    // Handle the response from the API here
    let resultIniArea = document.getElementById("DirectDebitIniResArea");
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

  <div> }</div><br>
  </div>`
  })

}






//create Automatcher
let CreateAutomatcherPayloadSubmit = document.getElementById("CreateAutomatcherPayloadSubmit")

CreateAutomatcherPayloadSubmit.addEventListener("click",RenderCreateAutomatcher)


function CreateAutomatcherVariables(){

  let CreateAutomatcherfields = document.querySelector('#CreateAutomatcherfields')
  let AllCreateAutomatcherfields = CreateAutomatcherfields.querySelectorAll("section")

  CreateAutomatcherAPIKeyValue =CreateAutomatcherAPIKey.value
  CreateAutomatcherACNameValue =CreateAutomatcherACName.value
  CreateAutomatcherUniqIDValue =CreateAutomatcherUniqID.value
  CreateAutomatcherstatusValue =CreateAutomatcherstatus.value


}



function RenderCreateAutomatcher(){
  CreateAutomatcherVariables()


  let CreateAutomatcherPayLoad ={
      bankAccountName: CreateAutomatcherACNameValue,
      clientUniqueId: CreateAutomatcherUniqIDValue,
      isActive: CreateAutomatcherstatusValue
    
    };




  if (!CreateAutomatcherACNameValue){
    alert("Do not leave account name fields empty")
  return
}


  fetch(`${baseURL}/receivables/v1/create`, {
  method: "POST",
  headers: {
    Authorization: "Basic " + btoa(CreateAutomatcherAPIKey.value),
    "Content-Type": "application/json",
    

  },
  body: JSON.stringify(CreateAutomatcherPayLoad)
  
})
  .then(response => response.json())
  .then(result => {
    console.log("API response:", result);
    // Handle the response from the API here
    let resultIniArea = document.getElementById("CreateAutomatcherResultArea");
  resultIniArea.innerHTML =    

`
<div class="responseBody">
<br>
<div> Endpoint Response </div>
<br>
<div>{</div>
<div>"durationMs": ${result.durationMs},</div>
<div>"status": ${result.status},</div>
<div> <span>"status Description": ${result.statusDescription},</div></span>
<div> <span>"bsb": ${result.bsb},</div></span>
<div> <span>"bank Account Number": ${result.bankAccountNumber},</div></span>
<div> <span>"bank Account Name": ${result.bankAccountName},</div></span>
  <div> <span>"client UniqueId": ${result.clientUniqueId},</div></span>
  <div> <span>"isActive": ${result.isActive},</div></span>
<div>}</div><br>
`
  })

}




//Set Account Status
let SetACStatusPayloadSubmit = document.getElementById("SetACStatusPayloadSubmit")

SetACStatusPayloadSubmit.addEventListener("click",RenderSetACStatus)


function SetACStatusVariables(){

  let SetACStatusfields = document.querySelector('#SetACStatusfields')
  let AllSetACStatusfields = SetACStatusfields.querySelectorAll("section")

  SetACStatusAPIKeyValue =SetACStatusAPIKey.value
  SetACStatusUniqIDValue =SetACStatusUniqID.value
  SetACStatusValue =SetACStatus.value
  SetACStatusACNumberValue=SetACStatusACNumber.value

}



function RenderSetACStatus(){
  SetACStatusVariables()


  let SetACStatusPayLoad ={
      
      bankAccountNumber     : SetACStatusACNumberValue,
      clientUniqueId: SetACStatusUniqIDValue,
      isActive: SetACStatusValue
    
    };




  if (!SetACStatusUniqIDValue){
    alert("Do not leave Unique ID empty")}
    else if(!SetACStatusACNumberValue){
      alert("Do not leave account number empty")}
      else if(!SetACStatusValue){
        alert("Do not leave account status empty")
        return
      }
  



  fetch(`${baseURL}/receivables/v1/status`, {
  method: "POST",
  headers: {
    Authorization: "Basic " + btoa(SetACStatusAPIKey.value),
    "Content-Type": "application/json",
    

  },
  body: JSON.stringify(SetACStatusPayLoad)
  
})
  .then(response => response.json())
  .then(result => {
    console.log("API response:", result);
    // Handle the response from the API here
    let resultIniArea = document.getElementById("SetACStatusResultArea");
  resultIniArea.innerHTML =    

`
<div class="responseBody">
<br>
<div> Endpoint Response </div>
<br>
<div>{</div>
<div>"durationMs": ${result.durationMs},</div>
<div>"status": ${result.status},</div>
<div> <span>"status Description": ${result.statusDescription},</div></span>
<div> <span>"bsb": ${result.bsb},</div></span>
<div> <span>"bank Account Number": ${result.bankAccountNumber},</div></span>
<div> <span>"bank Account Name": ${result.bankAccountName},</div></span>
  <div> <span>"client UniqueId": ${result.clientUniqueId},</div></span>
  <div> <span>"isActive": ${result.isActive},</div></span>
<div>}</div><br>
`
  })

}






// Get Account Status By BankAccount

let GetACStatbyACResultArea = document.getElementById("GetACStatbyACResultArea")
let GetACStatbyACSubmit = document.getElementById("GetACStatbyACSubmit")


GetACStatbyACSubmit.addEventListener("click",renderGetACStatbyAC)






async function renderGetACStatbyAC() {
  const GetACStatbyACAPIKey = document.getElementById("GetACStatbyACAPIKey")
  const GetACStatbyACNumber = document.getElementById("GetACStatbyACNumber")

//   if (!GetACStatbyACAPIKey.value){
//    alert("Do not leave API key empty.")
    
// }else if(!GetACStatbyACNumber.value){
//   alert("Enter your account number.")
//   return
// }

    let response = await fetch(
      `${baseURL}/receivables/v1/statusByBankAccount/${GetACStatbyACNumber.value}`,
      {
        method: "get",
        headers: {
          Authorization: "Basic " + btoa(GetACStatbyACAPIKey.value),
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
      console.log("this is data", data)
      let resultArea = document.getElementById("GetACStatbyACResultArea");
      resultArea.innerHTML =    

    `
    <div class="responseBody">
    <br>
    <div> Endpoint Response </div>
    <br>
    <div>{</div>
    <div>"durationMs": ${data.durationMs},</div>
    <div>"status": "${data.status}",</div>
    <div>"statusDescription": "${data.statusDescription}",</div>
    <div><span>"BSB": "${data.bsb}",</span></div>
    <div><span>"Bank Account Number": ${data.bankAccountNumber},</span></div>
    <div><span>"Bank Account Name": ${data.bankAccountName},</span></div>
    <div><span>"Client Unique Id": ${data.clientUniqueId},</span></div>
    <div> <span> "isActive": "${data.isActive}",</span></div>
    <div> }</div>
    <br>
    </div>
    `

}



// Get Account Status By ClientUniqueId

let GetACStatbyUniqueIDResultArea = document.getElementById("GetACStatbyUniqueIDResultArea")
let GetACStatbyUniqueIDSubmit = document.getElementById("GetACStatbyUniqueIDSubmit")


GetACStatbyUniqueIDSubmit.addEventListener("click",renderGetACStatbyUniqueID)






async function renderGetACStatbyUniqueID() {
  const GetACStatbyUniqueIDAPIKey = document.getElementById("GetACStatbyUniqueIDAPIKey")
  const GetACStatbyUniqueIDNumber = document.getElementById("GetACStatbyUniqueIDNumber")

//   if (!GetACStatbyUniqueIDAPIKey.value){
//    alert("Do not leave API key empty.")
    
// }else if(!GetACStatbyUniqueIDNumber.value){
//   alert("Enter your account number.")
//   return
// }

    let response = await fetch(
      `${baseURL}/receivables/v1/statusByClientID/${GetACStatbyUniqueIDNumber.value}`,
      {
        method: "get",
        headers: {
          Authorization: "Basic " + btoa(GetACStatbyUniqueIDAPIKey.value),
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
      console.log("this is data", data)
      let resultArea = document.getElementById("GetACStatbyUniqueIDResultArea");
      resultArea.innerHTML =    

    `
    <div class="responseBody">
    <br>
    <div> Endpoint Response </div>
    <br>
    <div>{</div>
    <div>"durationMs": ${data.durationMs},</div>
    <div>"status": "${data.status}",</div>
    <div>"statusDescription": "${data.statusDescription}",</div>
    <div><span>"BSB": "${data.bsb}",</span></div>
    <div><span>"Bank Account Number": ${data.bankAccountNumber},</span></div>
    <div><span>"Bank Account Name": ${data.bankAccountName},</span></div>
    <div><span>"Client Unique Id": ${data.clientUniqueId},</span></div>
    <div> <span> "isActive": "${data.isActive}",</span></div>
    <div> }</div>
    <br>
    </div>
    `
}