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
              <th class="align-middle">${i + 1}</th>
              <th class="align-middle">${dsn.data().nim}</th>
              <th class="align-middle">${dsn.data().nama}</th>
              <th>
              <button class="btn btn-warning m-1">Edit</button>
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
              console.log("Document successfully deleted!");
              alert('Data Berhasil Dihapus')
            }).catch((error) => {
              console.error("Error removing document: ", error);
            });
          } else {
            alert('Proses Dibatalkan')
          }
        }
      }
    );

    // Menambah Data
    document.getElementById("saveData").addEventListener("click", function () {
      db.collection("dosen").add({
        nim: document.getElementById('inputNim').value,
        nama: document.getElementById('inputNama').value
      }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setTimeout(() => {
          document.getElementById('inputSuccses').innerHTML = `<p class="m-auto"><i class="bi bi-check-circle-fill px-2 text-success"></i>Data Berhasil Ditambahkan</p>`
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    });