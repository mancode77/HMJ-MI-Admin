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
    const storage = firebase.storage();


    // Menampilkan Data Ke Table
    async function getData() {
      const semester = await db.collection('smt3').get();
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
              const dosen = db.collection('smt3').doc(id);
              dosen.get().then((doc) => {                   // Function Delete IMG In Storage Start
                if(doc.exists){
                  storage.ref().child(`smt3/${doc.data().nama}.jpg`).delete();
                  console.log('berhasil');
                }                                           // Function Delete IMG In Storage End
                  dosen.delete().then(() => {         // Menghapus data Document Dari DB  Start
                    alert('Data Berhasil Dihapus');   // Tidak Termauk Dalam Baris Code 45
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  })                                  // Menghapus data Document Dari DB End
              })
            } else {
              alert('Proses Dibatalkan')
            }
          };
      }
    );

    // Update Data Start
    document.getElementById('updateData').addEventListener('click', function (){
      db.collection('smt3').doc(document.getElementById('id').value).update({
        nim : document.getElementById('inputNimUpdate').value,
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
    // Update Data End

    // Menampilkan Value Di Modal Semebelum Diubah START
    document.getElementById('data').addEventListener('click', function(e) {
      const id = e.target.dataset.id;
      if (e.target.classList.contains('editData')) {
        db.collection("smt3").doc(id).get().then((doc) => {
            if(doc.exists){
              // console.log("Document data:", doc.data().nim);
              document.getElementById('id').value = doc.id;
              document.getElementById('inputNimUpdate').value = doc.data().nim;
              document.getElementById('inputNamaUpdate').value = doc.data().nama;
              if(doc.data().kelamin === "Perempuan") {
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
    // Menampilkan Value Di Modal Semebelum Diubah END
    

    // Menambah Data START
    document.getElementById("saveData").addEventListener("click", function () {
      // Menambah Data Diri Ke DB
      db.collection("smt3").add({
        nim: document.getElementById('inputNim').value,
        nama: document.getElementById('inputNama').value,
        kelamin : document.querySelector('input[name=jenisKelamin]:checked').value
      })

      // Menambah Foto Profil Ke Storage
      function addImg(){
        const fileInput = document.getElementById('inputFiles');
        const file = fileInput.files[0];
        const fileRef = storage.ref(`smt3/${document.getElementById('inputNama').value}.jpg`);

        fileRef.put(file).on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const hasil = Math.ceil(progress)
          document.getElementById('inputSuccses').innerHTML = `<p class="m-auto">${hasil} %</p>`
          if(progress === 100){
            setTimeout(() => {
              document.getElementById('inputSuccses').innerHTML = `<p class="m-auto"><i class="fa-solid fa-user-check px-2 text-succes"></i>Data Berhasil Ditambahkan</p>`
              }, 300);
            setTimeout(() => {
              window.location.reload();
              }, 2000);
            }
        })
      }
      addImg();
    });
    // START