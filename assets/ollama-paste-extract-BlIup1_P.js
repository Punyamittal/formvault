import{r as e}from"./rolldown-runtime-CMxvf4Kt.js";import{n as t}from"./ollama-client-BIlaja_W.js";var n=e({PASTE_FIELD_DEFINITIONS:()=>s,buildExtractionPrompt:()=>m,extractFieldsWithOllamaDirect:()=>h,fieldsFromJson:()=>p}),r=2e4,i=5500,a=4500,o=2e3,s=[{jsonKey:`fullName`,key:`fullName`,label:`Full Name`,category:`name`},{jsonKey:`fatherName`,key:`fatherName`,label:`Father's Name`,category:`fatherName`},{jsonKey:`motherName`,key:`motherName`,label:`Mother's Name`,category:`motherName`},{jsonKey:`dateOfBirth`,key:`dateOfBirth`,label:`Date of Birth`,category:`dateOfBirth`},{jsonKey:`gender`,key:`gender`,label:`Gender`,category:`custom`},{jsonKey:`aadhaar`,key:`aadhaar`,label:`Aadhaar Number`,category:`aadhaar`},{jsonKey:`pan`,key:`pan`,label:`PAN Number`,category:`pan`},{jsonKey:`passport`,key:`passport`,label:`Passport Number`,category:`passport`},{jsonKey:`drivingLicense`,key:`drivingLicense`,label:`Driving License`,category:`drivingLicense`},{jsonKey:`email`,key:`email`,label:`Email Address`,category:`email`},{jsonKey:`phone`,key:`phone`,label:`Phone Number`,category:`phone`},{jsonKey:`permanentAddress`,key:`permanentAddress`,label:`Permanent Address`,category:`permanentAddress`},{jsonKey:`temporaryAddress`,key:`temporaryAddress`,label:`Temporary Address`,category:`temporaryAddress`},{jsonKey:`education`,key:`education`,label:`Education`,category:`education`},{jsonKey:`institute`,key:`institute`,label:`Institute / University`,category:`education`},{jsonKey:`skills`,key:`skills`,label:`Skills`,category:`skills`},{jsonKey:`workExperience`,key:`workExperience`,label:`Work Experience`,category:`workExperience`},{jsonKey:`internshipDuration`,key:`internshipDuration`,label:`Internship Duration`,category:`workExperience`},{jsonKey:`companyName`,key:`companyName`,label:`Company / Employer`,category:`custom`},{jsonKey:`projectName`,key:`projectName`,label:`Project / Platform`,category:`custom`},{jsonKey:`signatory`,key:`signatory`,label:`Authorised Signatory`,category:`custom`},{jsonKey:`github`,key:`github`,label:`GitHub URL`,category:`socialLinks`},{jsonKey:`linkedin`,key:`linkedin`,label:`LinkedIn URL`,category:`socialLinks`},{jsonKey:`portfolio`,key:`portfolio`,label:`Portfolio URL`,category:`socialLinks`},{jsonKey:`emergencyContact`,key:`emergencyContact`,label:`Emergency Contact`,category:`emergencyContact`},{jsonKey:`documentTitle`,key:`documentTitle`,label:`Title`,category:`custom`},{jsonKey:`documentType`,key:`documentType`,label:`Document Type`,category:`custom`},{jsonKey:`authors`,key:`authors`,label:`Authors`,category:`custom`},{jsonKey:`affiliation`,key:`affiliation`,label:`Affiliation`,category:`custom`},{jsonKey:`abstract`,key:`abstract`,label:`Abstract / Summary`,category:`custom`},{jsonKey:`keyFindings`,key:`keyFindings`,label:`Key Findings`,category:`custom`},{jsonKey:`contributions`,key:`contributions`,label:`Main Contributions`,category:`custom`},{jsonKey:`methodology`,key:`methodology`,label:`Methodology`,category:`custom`},{jsonKey:`dataset`,key:`dataset`,label:`Dataset / Data Source`,category:`custom`},{jsonKey:`results`,key:`results`,label:`Results`,category:`custom`},{jsonKey:`technologies`,key:`technologies`,label:`Technologies / Tools`,category:`skills`},{jsonKey:`keywords`,key:`keywords`,label:`Keywords / Topics`,category:`custom`},{jsonKey:`publicationVenue`,key:`publicationVenue`,label:`Publication / Venue`,category:`custom`},{jsonKey:`doi`,key:`doi`,label:`DOI`,category:`custom`},{jsonKey:`publishedDate`,key:`publishedDate`,label:`Published / Agreement Date`,category:`custom`},{jsonKey:`orderId`,key:`orderId`,label:`Order ID`,category:`custom`},{jsonKey:`invoiceNumber`,key:`invoiceNumber`,label:`Invoice Number`,category:`custom`},{jsonKey:`gstin`,key:`gstin`,label:`GSTIN`,category:`custom`},{jsonKey:`invoiceSubtotal`,key:`invoiceSubtotal`,label:`Invoice Subtotal`,category:`custom`},{jsonKey:`invoiceTotalWords`,key:`invoiceTotalWords`,label:`Invoice Total (words)`,category:`custom`},{jsonKey:`state`,key:`state`,label:`State`,category:`custom`},{jsonKey:`notes`,key:`notes`,label:`Other Important Notes`,category:`custom`}];function c(e){return typeof e==`number`?String(e):typeof e==`string`?e.replace(/\s+/g,` `).trim():``}function l(e){if(Array.isArray(e)){let t=e.map(e=>c(e)).filter(Boolean);return t.length===0?``:t.map(e=>`• ${e}`).join(`
`)}return c(e&&typeof e==`object`?JSON.stringify(e):e)}function u(e){let t=e.replace(/\D/g,``);return t.length===12?t.replace(/(\d{4})(\d{4})(\d{4})/,`$1 $2 $3`):e.trim()}function d(e){if(e.length<=r)return e;let t=[e.slice(0,i)];for(let n of[/\bABSTRACT\b/i,/\bINTRODUCTION\b/i,/\bMETHODS?\b/i,/\bRESULTS?\b/i,/\bCONCLUSION\b/i,/\bREFERENCES\b/i,/\bSIGNATURES?\b/i,/\bAGREEMENT\b/i]){let r=n.exec(e);if(r?.index===void 0)continue;let s=r.index;s<i||s>e.length-a||t.push(e.slice(s,s+o))}return t.push(e.slice(-4500)),t.join(`

---

`).slice(0,r)}function f(e){let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim()??t;try{return JSON.parse(n)}catch{let e=n.indexOf(`{`),t=n.lastIndexOf(`}`);if(e>=0&&t>e)return JSON.parse(n.slice(e,t+1));throw Error(`Model did not return valid JSON`)}}function p(e){if(!e||typeof e!=`object`||Array.isArray(e))return[];let t=[],n=new Set;for(let r of s){let i=l(e[r.jsonKey]);if(!i||r.key===`aadhaar`&&(i=u(i),!i))continue;(r.key===`abstract`||r.key===`keyFindings`||r.key===`methodology`)&&i.length>1200&&(i=`${i.slice(0,1197)}...`);let a=`${r.key}:${i.slice(0,80)}`;n.has(a)||(n.add(a),t.push({key:r.key,label:r.label,value:i,category:r.category,confidence:.93,approved:!1}))}return t}function m(e){let t=d(e);return{systemPrompt:`You extract structured information from pasted text. The text may be a resume, ID details, research paper, contract, NDA, internship agreement, tax invoice, receipt, article, notes, or mixed content. Return ONLY valid JSON. Never invent values — use empty string for missing fields. Summarize long sections concisely but keep the most important facts, numbers, and names.`,userPrompt:`Analyze the pasted text and extract the most important information.

Return JSON with exactly these keys (use "" when not present):
{
  "documentType": "",
  "documentTitle": "",
  "authors": "",
  "affiliation": "",
  "abstract": "",
  "keyFindings": "",
  "contributions": "",
  "methodology": "",
  "dataset": "",
  "results": "",
  "technologies": "",
  "keywords": "",
  "publicationVenue": "",
  "doi": "",
  "publishedDate": "",
  "orderId": "",
  "invoiceNumber": "",
  "gstin": "",
  "invoiceSubtotal": "",
  "invoiceTotalWords": "",
  "state": "",
  "fullName": "",
  "fatherName": "",
  "motherName": "",
  "dateOfBirth": "",
  "gender": "",
  "aadhaar": "",
  "pan": "",
  "passport": "",
  "drivingLicense": "",
  "email": "",
  "phone": "",
  "permanentAddress": "",
  "temporaryAddress": "",
  "education": "",
  "institute": "",
  "skills": "",
  "workExperience": "",
  "internshipDuration": "",
  "companyName": "",
  "projectName": "",
  "signatory": "",
  "github": "",
  "linkedin": "",
  "portfolio": "",
  "emergencyContact": "",
  "notes": ""
}

Rules:
- For research papers: fill documentTitle, authors, affiliation, abstract, keyFindings, contributions, methodology, dataset, results, technologies, keywords, publicationVenue, doi.
- For contracts, NDAs, internship or employment agreements: fill documentTitle, documentType, fullName (intern/employee/party name), companyName, projectName, signatory, institute, internshipDuration, publishedDate (agreement date), and a short abstract (purpose of agreement).
- For tax invoices and receipts: fill documentTitle, documentType, fullName (customer/bill-to name), companyName (vendor/platform), permanentAddress (customer address), orderId, invoiceNumber, gstin, publishedDate (invoice date), invoiceSubtotal, invoiceTotalWords, state.
- For resumes/profiles: prioritize fullName, email, phone, education, institute, skills, workExperience.
- For ID documents: prioritize aadhaar, pan, passport, dateOfBirth, fullName.
- documentType: one of "research paper", "resume", "id document", "contract", "nda", "internship agreement", "tax invoice", "receipt", "article", "notes", "other".
- Use only information from the text. Do not guess.
${e.length>4e3?`- The text may be truncated — focus on title, parties, dates, and key terms.`:``}

Pasted text:
---
${t}
---`}}async function h(e){let n=e.text.trim();if(!n)throw Error(`Paste some text to extract fields from`);let{systemPrompt:r,userPrompt:i}=m(n),a=p(f(await t({endpoint:e.endpoint,model:e.model,systemPrompt:r,userPrompt:i,jsonMode:!0,maxTokens:2800})));if(a.length===0)throw Error(`No fields could be extracted from the pasted text`);return a}export{n,h as t};