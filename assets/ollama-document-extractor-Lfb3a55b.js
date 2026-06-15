import{n as e,r as t}from"./ocr-client-Cb363o5z.js";import{i as n,l as r,r as i,s as a}from"./ollama-client-BIlaja_W.js";import{n as o,r as s}from"./chrome-settings-C3GsVKzb.js";var c=[{jsonKey:`fullName`,key:`fullName`,label:`Full Name`,category:`name`},{jsonKey:`fatherName`,key:`fatherName`,label:`Father's Name`,category:`fatherName`},{jsonKey:`motherName`,key:`motherName`,label:`Mother's Name`,category:`motherName`},{jsonKey:`dateOfBirth`,key:`dateOfBirth`,label:`Date of Birth`,category:`dateOfBirth`},{jsonKey:`gender`,key:`gender`,label:`Gender`,category:`custom`},{jsonKey:`aadhaar`,key:`aadhaar`,label:`Aadhaar Number`,category:`aadhaar`},{jsonKey:`pan`,key:`pan`,label:`PAN Number`,category:`pan`},{jsonKey:`passport`,key:`passport`,label:`Passport Number`,category:`passport`},{jsonKey:`drivingLicense`,key:`drivingLicense`,label:`Driving License`,category:`drivingLicense`},{jsonKey:`phone`,key:`phone`,label:`Phone Number`,category:`phone`},{jsonKey:`email`,key:`email`,label:`Email Address`,category:`email`},{jsonKey:`permanentAddress`,key:`permanentAddress`,label:`Permanent Address`,category:`permanentAddress`}];async function l(e){try{return await a(e)}catch{if(typeof chrome>`u`||!chrome.runtime?.sendMessage)return[];let t=await chrome.runtime.sendMessage({type:`LIST_OLLAMA_MODELS`,payload:{endpoint:e}});return Array.isArray(t)?t:[]}}async function u(){let e=await o(),t=e.ollamaEndpoint??`http://127.0.0.1:11434`;if(e.documentScanProvider===`tesseract`)return null;let i=e.ollamaVisionModel?.trim();if(i)return{endpoint:t,model:i,source:`settings.ollamaVisionModel`};if(!(await n(t)).ok&&!(await chrome.runtime.sendMessage({type:`CHECK_OLLAMA`,payload:{endpoint:t}}))?.ok)return null;let a=await l(t),c=r(a,e.ollamaModel,e.ollamaVisionModel);if(c)return e.ollamaVisionModel||await s({ollamaVisionModel:c}),{endpoint:t,model:c,source:`auto-detected vision model`};let u=e.ollamaModel?.trim();return u&&a.some(e=>e.name===u)?{endpoint:t,model:u,source:`settings.ollamaModel`}:null}function d(e,t){return`Read this ${e===`aadhaar`?`Indian Aadhaar card`:e===`pan`?`Indian PAN card`:e===`passport`?`passport`:e===`drivingLicense`?`driving license`:`identity document`} image (${t}) and extract visible fields.

Return ONLY valid JSON with exactly these keys:
{
  "fullName": "",
  "fatherName": "",
  "motherName": "",
  "dateOfBirth": "",
  "gender": "",
  "aadhaar": "",
  "pan": "",
  "passport": "",
  "drivingLicense": "",
  "phone": "",
  "email": "",
  "permanentAddress": "",
  "rawText": ""
}

Rules:
- Extract ONLY text clearly visible in the image. Never guess or invent values.
- Use "" for missing fields.
- fullName must be the person's actual name, not labels like "Name" or random OCR fragments.
- aadhaar must be exactly 12 digits formatted "XXXX XXXX XXXX" when visible.
- dateOfBirth format DD/MM/YYYY when visible.
- gender must be Male or Female when visible.
- phone must be a valid phone number (10+ digits), not partial card numbers.
- rawText: all other visible text from the document.`}function f(e){let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim()??t;try{return JSON.parse(n)}catch{let e=n.indexOf(`{`),t=n.lastIndexOf(`}`);if(e>=0&&t>e)return JSON.parse(n.slice(e,t+1));throw Error(`Ollama vision did not return valid JSON`)}}function p(e){return typeof e==`string`?e.replace(/\s+/g,` `).trim():``}function m(e){let t=e.replace(/\D/g,``);return t.length===12?t.replace(/(\d{4})(\d{4})(\d{4})/,`$1 $2 $3`):``}function h(e){let t=e.replace(/\D/g,``);return t.length>=10&&t.length<=13}function g(e,t){let n=[],r=p(e.rawText);for(let r of c){let i=p(e[r.jsonKey]);i&&(r.key===`aadhaar`&&(i=m(i),!i)||r.key===`phone`&&!h(i)||r.key===`fullName`&&i.length<3||n.push({key:r.key,label:r.label,value:i,category:r.category,confidence:t===`other`?.88:.94,approved:!1}))}return{fields:n,rawText:r}}async function _(e){return i({endpoint:e.endpoint,model:e.model,prompt:e.prompt,imageBase64:e.imageBase64})}async function v(e){try{return await _(e)}catch(t){let n=t instanceof Error?t.message:`Ollama vision failed`,r=await chrome.runtime.sendMessage({type:`EXTRACT_DOCUMENT_VISION`,payload:e});if(r?.error)throw Error(r.error);if(typeof r?.content!=`string`)throw Error(n);return r.content}}async function y(t){if((await o()).documentScanProvider===`tesseract`)return{ok:!1,skipped:!0,reason:`Document scanning set to Tesseract only`,fields:[],rawText:``};let n=await u();if(!n)return{ok:!1,skipped:!0,reason:`No Ollama vision model configured. In Settings, pick a vision model or run: ollama pull llama3.2-vision`,fields:[],rawText:``};try{let r=e(t.data),i=d(t.documentType,t.filename),{fields:a,rawText:o}=g(f(await v({endpoint:n.endpoint,model:n.model,prompt:i,imageBase64:r})),t.documentType);return a.length===0&&!o?{ok:!1,error:`${n.model} could not read fields from this image`,fields:[],rawText:``,model:n.model}:{ok:!0,fields:a,rawText:o,model:n.model}}catch(e){return{ok:!1,error:e instanceof Error?e.message:`Ollama vision scan failed`,fields:[],rawText:``,model:n.model}}}async function b(e){return y({data:t(e.dataBase64),mimeType:e.mimeType,filename:e.filename,documentType:e.documentType})}export{_ as extractDocumentWithOllamaVisionDirect,b as scanDocumentWithOllamaFromBase64};