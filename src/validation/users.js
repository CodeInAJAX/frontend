import z from 'zod';

export const roleUser = {
    ADMIN : "admin",
    MENTOR : "mentor",
    STUDENT : "student"
}

export const genderUser = {
  MALE: "male",
  FEMALE: "female",
};

export const registerSchema = z.object({
    name: z.string()
        .min(2, { message: "Nama minimal 2 karakter" })
        .nonempty({ message: "Nama wajib diisi" }),

    email: z.string()
        .nonempty({ message: "Email wajib diisi" })
        .email({ message: "Format email tidak valid" }),

    password: z.string()
        .nonempty({ message: "Password wajib diisi" })
        .min(8, { message: "Password minimal 8 karakter" })
        .refine(
            (password) => /(?=.*[a-zA-Z])(?=.*[0-9])/.test(password),
            { message: "Password harus berisi huruf dan angka" }
        ),

    role: z.nativeEnum(roleUser, {
        errorMap: () => ({ message: "Peran tidak valid. Pilih antara guru, atau siswa" })
    }),

    gender: z.nativeEnum(genderUser, {
        errorMap: () => ({ message: "Jenis kelamin tidak valid. Pilih antara laki - laki atau perempuan" })
    }),
});

export const loginSchema = z.object({
    email: z.string()
        .nonempty({ message: "Email wajib diisi" })
        .email({ message: "Format email tidak valid" }),

    password: z.string()
        .nonempty({ message: "Password wajib diisi" })
        .min(8, { message: "Password minimal 8 karakter" })
        .refine(
            (password) => /(?=.*[a-zA-Z])(?=.*[0-9])/.test(password),
            { message: "Password harus berisi huruf dan angka" }
        ),

    confirmPassword: z.string()
        .nonempty({ message: "Konfirmasi Password wajib diisi" })
        .min(8, { message: "Password minimal 8 karakter" })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Konfirmasi Password harus sama dengan Password",
        path: ["confirmPassword"],
    });


const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const editUserSchema = z.object({
    name: z.string()
        .min(2, { message: "Nama minimal 2 karakter" })
        .nonempty({ message: "Nama wajib diisi" }),

    password: z.string()
        .nonempty({ message: "Password wajib diisi" })
        .min(8, { message: "Password minimal 8 karakter" })
        .refine(
            (password) => /(?=.*[a-zA-Z])(?=.*[0-9])/.test(password),
            { message: "Password harus berisi huruf dan angka" }
        ),

    gender: z.nativeEnum(genderUser, {
        errorMap: () => ({ message: "Jenis kelamin tidak valid. Pilih antara laki - laki atau perempuan" })
    }),

    photo: z
        .custom((file) => {
        if (!file) return true; // optional
        return file instanceof File &&
            ACCEPTED_IMAGE_TYPES.includes(file.type) &&
            file.size <= MAX_FILE_SIZE;
    }, {
        message: "Foto harus berupa gambar JPG, JPEG, atau PNG dan maksimal berukuran 2MB"
    }),
    about: z.string()
        .min(5, { message: "Tentang minimal 5 karakter" })
        .default("Tidak ada deskripsi")
});