const API='/api';
function showSection(id){document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');loadData();}
async function loadData(){const [b,c,o,r]=await Promise.all([fetch(API+'/books').then(x=>x.json()),fetch(API+'/customers').then(x=>x.json()),fetch(API+'/orders').then(x=>x.json()),fetch(API+'/reports').then(x=>x.json())]);
bookCount.textContent=b.length;customerCount.textContent=c.length;orderCount.textContent=o.length;salesTotal.textContent='₹'+r.totalSales;
booksTable.innerHTML=b.map(x=>`<tr><td>${x.id}</td><td>${x.title}</td><td>${x.author}</td><td>₹${x.price}</td><td>${x.stock}</td></tr>`).join('');
customersTable.innerHTML=c.map(x=>`<tr><td>${x.id}</td><td>${x.name}</td><td>${x.phone}</td><td>${x.email}</td></tr>`).join('');
customerSelect.innerHTML=c.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
bookSelect.innerHTML=b.filter(x=>x.stock>0).map(x=>`<option value="${x.id}">${x.title} - ₹${x.price} (${x.stock} left)</option>`).join('');
ordersTable.innerHTML=o.map(x=>`<tr><td>${x.id}</td><td>${x.customer}</td><td>${x.book}</td><td>${x.quantity}</td><td>₹${x.total}</td></tr>`).join('');
reportOrders.textContent=r.totalOrders;reportSales.textContent='₹'+r.totalSales;reportBooks.textContent=r.booksSold;}
bookForm.onsubmit=async e=>{e.preventDefault();await fetch(API+'/books',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:title.value,author:author.value,price:+price.value,stock:+stock.value})});e.target.reset();loadData()};
customerForm.onsubmit=async e=>{e.preventDefault();await fetch(API+'/customers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:customerName.value,phone:phone.value,email:email.value})});e.target.reset();loadData()};
orderForm.onsubmit=async e=>{e.preventDefault();const res=await fetch(API+'/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({customerId:+customerSelect.value,bookId:+bookSelect.value,quantity:+quantity.value})});const data=await res.json();if(!res.ok)alert(data.error);loadData()};
loadData();