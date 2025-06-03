import z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createCourseSchema = z.object({
    title: z
        .string()
        .min(4, { message: "Judul kursus minimal 4 karakter"})
        .nonempty({ message: "Judul kursus wajib diisi"}),

    description: z
        .string()
        .min(2, { message: "Deskripsi kursus minimal 2 karakter"})
        .nonempty({ message: "Deskripsi kursus wajib diisi"}),

    price: z
        .number()
        .gte(0, { message: "Harga kursus harus lebih sama dengan 0"}),

    currency: z
        .string()
        .min(1, { message: "Mata uang harga kursus minimal 1 karakter"})
        .max(5, { message: "Mata uang harga kursus maksimal 5 karakter" }),

    thumbnail: z
        .custom((file) => {
            if (!file) return false;
            return file instanceof File &&
                ACCEPTED_IMAGE_TYPES.includes(file.type) &&
                file.size <= MAX_FILE_SIZE;
        }, {
            message: "Foto thumbnail kursus harus berupa gambar JPG, JPEG, atau PNG dan maksimal berukuran 10MB"
        })
})

export const updateCourseSchema = createCourseSchema.extend({
    thumbnail: z
        .union([
            z.instanceof(File).refine(
                (file) =>
                    ACCEPTED_IMAGE_TYPES.includes(file.type) &&
                    file.size <= MAX_FILE_SIZE,
                {
                    message:
                        "Foto thumbnail harus berupa gambar JPG, JPEG, atau PNG dan maksimal berukuran 10MB",
                }
            ),
            z.string().url().optional(),
        ])
        .optional(),
});
