(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{16:function(e,n,t){e.exports=t(40)},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(15),u=t.n(c),o=t(2),l=function(e){var n=e.person,t=e.removeEntry;return r.a.createElement("tr",null,r.a.createElement("td",null,n.name),r.a.createElement("td",null,n.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return t(n)}},"Delete")))},m=function(e){var n=e.persons,t=e.searchName,a=e.remoteEntry;return r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("tbody",null,n.map((function(e){return 0===t.length||-1!==e.name.search(t)?r.a.createElement(l,{key:e.name,person:e,removeEntry:a}):[]})))))},i=function(e){var n=e.addPerson,t=e.handleChange,a=e.newName,c=e.setNewName,u=e.newNumber,o=e.setNewNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:a,onChange:t(c)})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:t(o)})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.text;return r.a.createElement("h2",null,n)},d=function(e){var n=e.searchName,t=e.handleChange,a=e.setSearchName;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t(a)}))},f=t(3),h=t.n(f),b="https://rocky-earth-30698.herokuapp.com/api/persons",E=function(e){return h.a.post(b,e).then((function(e){return e.data}))},v=function(){return h.a.get(b).then((function(e){return e.data}))},p=function(e){return h.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},N=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){var n=e.message,t=e.success;return null===n?null:t?r.a.createElement("div",{className:"success"},n):r.a.createElement("div",{className:"error"},n)},g=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),l=Object(o.a)(u,2),f=l[0],h=l[1],b=Object(a.useState)(""),g=Object(o.a)(b,2),j=g[0],O=g[1],k=Object(a.useState)(""),y=Object(o.a)(k,2),C=y[0],S=y[1],x=Object(a.useState)(null),P=Object(o.a)(x,2),D=P[0],I=P[1],J=Object(a.useState)(null),A=Object(o.a)(J,2),B=A[0],R=A[1];Object(a.useEffect)((function(){v().then((function(e){c(e)})).catch((function(e){console.log(e),q("Could not retrieve data",!1)}))}),[]);var T=function(e){return function(n){e(n.target.value)}},q=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];I(e),R(n),setTimeout((function(){I(null),R(null)}),3e3)};return r.a.createElement("div",null,r.a.createElement(s,{text:"Phonebook"}),r.a.createElement(w,{message:D,success:B}),r.a.createElement(d,{searchName:C,handleChange:T,setSearchName:S}),r.a.createElement(s,{text:"add a new"}),r.a.createElement(i,{addPerson:function(e){e.preventDefault();var n={name:f,number:j};if(t.find((function(e){return e.name===f}))){var a=t.find((function(e){return e.name===f})),r=Object.assign(a,n);window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))&&N(a.id,n).then((function(){c(t.map((function(e){return e.name===f?r:e}))),h(""),O(""),q("".concat(r.name,"'s phone number has been updated"))}))}else E(n).then((function(e){c(t.concat(e)),h(""),O(""),q("Added ".concat(n.name))}))},handleChange:T,newName:f,setNewName:h,newNumber:j,setNewNumber:O}),r.a.createElement(s,{text:"Numbers"}),r.a.createElement("div",null,r.a.createElement(m,{persons:t,searchName:C,remoteEntry:function(e){window.confirm("Remove ".concat(e.name,"?"))&&p(e.id).then((function(){c(t.filter((function(n){return n.id!==e.id}))),q("".concat(e.name," has been removed from the phone book"))})).catch((function(n){q("Information of ".concat(e.name," has already been removed from server"),!1)}))}})))};t(39);u.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.ce93103d.chunk.js.map