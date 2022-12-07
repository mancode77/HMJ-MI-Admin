    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const Config = {
      apiKey: "AIzaSyB8v7ecpBIo7kRZjqjkejker5nVqgoyEVE",
      authDomain: "hmj-mi-project.firebaseapp.com",
      projectId: "hmj-mi-project",
      storageBucket: "hmj-mi-project.appspot.com",
      messagingSenderId: "469988837084",
      appId: "1:469988837084:web:69c8f101a6371576271619",
      measurementId: "G-ZHYP0WJQV4"
    };

    // Initialize Firebase
    firebase.initializeApp(Config);

    const db = firebase.firestore();


    // Menampilkan Data Ke Table
    async function getData() {
      const semester = await db.collection('semester3').get();
      semester.docs.forEach((smt, i) => {
        document.getElementById('data').innerHTML += `
        <tr>
              <th class="text-center align-middle">${i + 1}</th>
              <th class="align-middle">${smt.data().nim}</th>
              <th class="align-middle">${smt.data().nama}</th>
              <th>
              <button class="btn btn-warning m-1 editData" data-id="${smt.id}" data-bs-toggle="modal"
          data-bs-target="#modalUpdate">Edit</button>
              <button class="btn btn-danger m-1 hapusData" data-id="${smt.id}">Hapus</button>
              </th>
            </tr>
        `
      });
    };
    getData()

    // Menghapus Data
    document.getElementById('data').addEventListener('click', function(e){
        const id = e.target.dataset.id
        if (e.target.classList.contains('hapusData')) {
            if (confirm("Apakah Anda Ingin Menghapusnya?")) {
              db.collection("semester3").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
                alert('Data Berhasil Dihapus')
              }).catch((error) => {
                console.error("Error removing document: ", error);
              });
            } else {
              alert('Proses Dibatalkan')
            }
          };
      }
    );

    // Update Data Start
    document.getElementById('updateData').addEventListener('click', function (){
      db.collection('semester3').doc(document.getElementById('id').value).update({
        nim : document.getElementById('inputNimUpdate').value,
        nama : document.getElementById('inputNamaUpdate').value
      })
      .then(() => {
        console.log("Document successfully updated!");
        setTimeout(() => {
          document.getElementById('inputUpdateSuccses').innerHTML = `<p class="m-auto"><i class="fa-solid fa-user-check px-2 text-succes"></i>Data Berhasil Diupdate</p>`
        }, 1000);
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
    });
    // Update Data End

    // Menampilkan Value Di Modal Semebelum Diubah START
    document.getElementById('data').addEventListener('click', function(e) {
      const id = e.target.dataset.id;
      if (e.target.classList.contains('editData')) {
        db.collection("semester3").doc(id).get().then((doc) => {
            if(doc.exists){
              // console.log("Document data:", doc.data().nim);
              document.getElementById('id').value = doc.id;
              document.getElementById('inputNimUpdate').value = doc.data().nim;
              document.getElementById('inputNamaUpdate').value = doc.data().nama;
            }else{
              console.log("Document data:", doc.data());
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
      }  
    })
    // Menampilkan Value Di Modal Semebelum Diubah END
    

    // Menambah Data START
    document.getElementById("saveData").addEventListener("click", function () {
      db.collection("semester3").add({
        nim: document.getElementById('inputNim').value,
        nama: document.getElementById('inputNama').value
      }).then(() => {
        // console.log("Document written with ID: ", docRef.id);
        setTimeout(() => {
          document.getElementById('inputSuccses').innerHTML = `<p class="m-auto"><i class="fa-solid fa-user-check px-2 text-succes"></i>Data Berhasil Ditambahkan</p>`
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    });
    // START