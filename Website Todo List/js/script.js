const button = document.querySelector('.add_list');
const form = document.querySelector('.memo-form');
const modalmemo= document.querySelector('.modal-memo');
const listmemo = document.querySelector('.list-memo')


button.onclick = () => {
    modalmemo.classList.toggle('active');
}

document.addEventListener('click', function(e) {
    if (!button.contains(e.target) && !form.contains(e.target)) {
        modalmemo.classList.remove('active');
    }
})
function checkmemo(){
    if (!listmemo.children.length) {
        const p = document.createElement('p');
        p.textContent = 'Silahkan Isi Memo';
        listmemo.append(p);

    }
}


function buatmemo(){
    const time = new Date();

    const judulmemo = document.querySelector('#judul-memo');
    const isimemo = document.querySelector('#text-memo');

    const stringjudul = judulmemo.value.trim();
    const stringmemo = isimemo.value.trim();

    const listmemo = document.querySelector('.list-memo')

    if (stringjudul === '' && stringmemo === '') {
        alert("Silahkan Isi Judul dan Isi Memo");
        return;
    }
    if (document.getElementById('reminder') != null) {
        document.getElementById('reminder').remove();
    }

    const div = document.createElement('div');
    div.classList.add('card-memo');

    // judul Memo
    const judul = document.createElement('div');
    judul.classList.add('judul-memo');

    const title = document.createElement('h3');
    title.textContent = stringjudul;

    const waktu = document.createElement('p');
    waktu.textContent = `Created At ${time.toLocaleTimeString()}`;
    judul.append(title, waktu)

    // Isi Memo
    const description = document.createElement('p');
    description.textContent = stringmemo;

    // Button Hapus
    const hapus = document.createElement('Button');
    hapus.textContent = "Hapus Memo";
    modalmemo.classList.remove('active');

    hapus.addEventListener('click', (e) => {
        e.target.parentElement.remove()
        checkmemo()
    })



    div.append(judul,description, hapus);
    listmemo.append(div);

    judulmemo.value="";
    isimemo.value="";



}
