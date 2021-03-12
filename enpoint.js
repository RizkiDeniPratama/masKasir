export const enpoint = {
  login: 'https://pos-maskasir.herokuapp.com/api/login',
  //KETERANGAN:
  //1.sebelum masuk jika belum verivikasi maka pergi ke screen verifikasi
  //2.parameter:email,password
  //3.method: POST
  register: 'https://pos-maskasir.herokuapp.com/api/register',
  //KETERANGAN:
  //1.butuh email asli untuk mengirim verivikasi
  //2.parameter :name,email,password,password_confirmation
  //3.method: POST
  //4.isidata :
  //   "data": {
  //     "kode_member": "M20212",
  //     "name": "denipratama",
  //     "email": "denismw172@gmail.com",
  //     "email_verification": null,
  //     "alamat": null,
  //     "saldo": 0
  // },
  verifikasi: 'https://pos-maskasir.herokuapp.com/api/email/resend',
  //KETERANGAN:
  //method : GET,Butuh token untuk verivikasi
  forget: 'https://pos-maskasir.herokuapp.com/api/password/email',
  //KETERANGAN:
  //1.butuh email untuk forget password
  //2.parameter:email
  //3.method: POST
  editprofile: 'https://pos-maskasir.herokuapp.com/api/profil/edit',
  //KETERANGAN:
  //1.method: PUT
  //2.parameter:name,email,foto_profile,tgl_lahir,alamat
  ubahpassword: 'https://pos-maskasir.herokuapp.com/api/password/change',
  //KETERANGAN:
  //1.method: PUT
  //2.parameter:old_password,password,password_confirmation
  profile: 'https://pos-maskasir.herokuapp.com/api/profil',
  //KETERANGAN:
  //1.method: GET
  //2.butuh token
  // ................STAFF.................
  getallsupli: 'https://pos-maskasir.herokuapp.com/api/supplier ',
  // KETERANGAN
  //1.method: GET
  addsuplier: 'https://pos-maskasir.herokuapp.com/api/supplier ',
  // KETERANGAN
  //1.method: POST
  //2.parameter:nama_supplier,alamat,no_telepon
  getsupli: 'https://pos-maskasir.herokuapp.com/api/supplier/', // + id,
  //1.method:GET
  editsupli: 'https://pos-maskasir.herokuapp.com/api/supplier/', // + id,
  //1.method: PUT
  //2.parameter:nama_supplier,alamat,no_telepon
  getallkategori: 'https://pos-maskasir.herokuapp.com/kategori',
  //1.method : GET
  addkategori: 'https://pos-maskasir.herokuapp.com/api/kategori',
  //1.method : POST
  //2.parameter:nama_supplier,alamat,no_telepon
  getkategori: 'https://pos-maskasir.herokuapp.com/api/kategori/', // + id,
  //1.method : GET
  editkategori: 'https://pos-maskasir.herokuapp.com/api/kategori/', // + id,
  //1.method : PUTI
  //2.parameter:nama_supplier,alamat,no_telepon
  getallbarang: 'https://pos-maskasir.herokuapp.com/api/barang ',
  //1.method : GET
  addbarang: 'https://pos-maskasir.herokuapp.com/api/barang ',
  //1.method : POST
  addpembelian: 'https://pos-maskasir.herokuapp.com/api/pembelian',
  //KETERANGAN
  //1.method : POST
  //2.parameter:supplier(id),detail[index][barang(id)],detail[index][jumlah]
  addpengeluaran: 'https://pos-maskasir.herokuapp.com/api/pengeluaran',
  //KETERANGAN
  //1.method : POST
  //2.parameter: jenis_pengeluaran,nominal
  getallpengeluaran: 'https://pos-maskasir.herokuapp.com/api/pengeluaran',
  //KETERANGAN
  //1.method : GET
  addMember: 'https://pos-maskasir.herokuapp.com/api/member',
  getMember: 'https://pos-maskasir.herokuapp.com/api/member',
  editMemberKasir: 'https://pos-maskasir.herokuapp.com/api/member/',
};
