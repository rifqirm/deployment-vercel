				Ringkasan/Resume Authentication in React

	Apa itu token-based authentication dalam react? Token-based authentication adalah teknik autentikasi yang menggunakan token untuk mengidentifikasi pengguna yang sedang melakukan permintaan ke server. Teknik autentikasi ini cukup umum digunakan pada aplikasi web modern, termasuk dalam pengembangan aplikasi React.

Dalam token-based authentication, server tidak perlu menyimpan informasi pengguna yang sedang melakukan permintaan pada session, sehingga memungkinkan aplikasi untuk menjadi stateless dan meningkatkan skalabilitas aplikasi.


--> Bagaimana cara kerja token-based authentication dalam react?

1. Pengguna melakukan proses login dengan memasukkan username dan password.
2. Server memverifikasi kredensial yang diberikan dan mengembalikan token yang berisi informasi pengguna dan waktu kedaluwarsa token.
3. Aplikasi menyimpan token tersebut pada local storage atau session storage.
4. Setiap kali pengguna melakukan permintaan ke server, aplikasi akan menambahkan token tersebut pada header Authorization pada permintaan.
5. Server memverifikasi token yang diberikan dan mengekstrak informasi pengguna dari token tersebut.

--> Apa yang dilakukan jika token expire atau tidak valid lagi?
Jika token expire atau tidak valid lagi, maka aplikasi perlu melakukan proses refresh token. Refresh token adalah token tambahan yang diberikan bersamaan dengan token utama (access token) pada saat proses autentikasi. Refresh token berfungsi untuk memperpanjang masa berlaku token utama ketika masa berlakunya sudah habis atau token utama sudah tidak valid lagi.

Untuk memperbarui token, aplikasi perlu mengirimkan permintaan ke server dengan menggunakan refresh token sebagai kredensial. Jika refresh token valid, server akan mengirimkan access token yang baru. Access token tersebut dapat digunakan kembali untuk mengakses API.

Jika proses refresh token gagal karena refresh token juga sudah tidak valid atau terjadi kesalahan lain, maka pengguna harus melakukan proses autentikasi ulang untuk mendapatkan access token yang baru.

