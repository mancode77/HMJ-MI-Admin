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
      const dosen = await db.collection('dosen').get();
      dosen.docs.forEach((dsn, i) => {
        document.getElementById('data').innerHTML += `
        <tr>
              <th class="text-center align-middle">${i + 1}</th>
              <th class="align-middle">${dsn.data().nama}</th>
              <th>
              <button class="btn btn-warning m-1 editData" data-id="${dsn.id}" data-bs-toggle="modal"
          data-bs-target="#modalUpdate">Edit</button>
              <button class="btn btn-danger m-1 hapusData" data-id="${dsn.id}">Hapus</button>
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
              db.collection("dosen").doc(id).delete().then(() => {
                alert('Data Berhasil Dihapus')
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              })
            } else {
              alert('Proses Dibatalkan')
            }
          };
      }
    );

    // Update Data Start
      // Input Update
    document.getElementById('updateData').addEventListener('click', function (){
      db.collection('dosen').doc(document.getElementById('id').value).update({
        nama : document.getElementById('inputNamaUpdate').value,
        kelamin : document.querySelector('input[name=jenisKelamin]:checked').value
      })
      setTimeout(() => {
        document.getElementById('inputUpdateSuccses').innerHTML = `<p class="m-auto"><i class="fa-solid fa-user-check px-2 text-success"></i>Data Berhasil Diupdate</p>`
      }, 300);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });


    // Menampilkan Value Awal Sebelum Dirubah
    document.getElementById('data').addEventListener('click', function(e) {
      const id = e.target.dataset.id;
      if (e.target.classList.contains('editData')) {
        db.collection("dosen").doc(id).get().then((doc) => {
            if(doc.exists){
              // console.log("Document data:", doc.data().nim);
              document.getElementById('id').value = doc.id;
              document.getElementById('inputNamaUpdate').value = doc.data().nama;
              if(doc.data().kelamin == "Perempuan") {
                document.getElementById("inputSexFemale").checked = true;
              } else {
                document.getElementById("inputSexMale").checked = true;
              }
            }else{
              console.log("Document data:", doc.data());
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
      }  
    })
    

    // Menambah Data
    document.getElementById("saveData").addEventListener("click", function () {
      db.collection("dosen").add({
        nama: document.getElementById('inputNama').value,
        kelamin : document.querySelector('input[name=jenisKelamin]:checked').value
        })
          setTimeout(() => {
            document.getElementById('inputSuccses').innerHTML = `<p class="m-auto"><i class="fa-solid fa-user-check px-2 text-succes"></i>Data Berhasil Ditambahkan</p>`
          }, 300);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      });
      
      
      

      
      

    