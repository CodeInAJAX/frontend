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
    nama: z.string()
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
        errorMap: () => ({ message: "Peran tidak valid. Pilih antara admin, guru, atau siswa" })
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