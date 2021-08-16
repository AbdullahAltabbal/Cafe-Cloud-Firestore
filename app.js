const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

const renderCafe = (doc) => {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let xDelete = document.createElement('div');

    xDelete.classList.add('delete');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    xDelete.textContent = 'X';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(xDelete);


    cafeList.appendChild(li);

    // data löschen
    xDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })

}

// nur wenn ich nach einem suche!!
// < ist alles bevor eine Buchtabe
// > ist alles nach eine Buchtabe
// db.collection('cafes').where('city', '==', 'Syria').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })

// // data fetching normal 
// db.collection('cafes').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })


// Data Fetching Asyc
db.collection('cafes').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderCafe(change.doc)
        }
        else if (change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})



// Data Speichern 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
})


// extra funktionen zum bearbeiten update einer datensatz 
// db.collection('cafes').doc(id).set({name: , city:})          ==> hier wird das gesamte datensatz gesetzt 
// db.collection('cafes').doc(id).update({name: OR city: OR beide... })          ==> hier wird nur das da in {} geupdatet