-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `address_street` VARCHAR(191) NOT NULL,
    `address_number` INTEGER NOT NULL,
    `address_complement` VARCHAR(191) NOT NULL,
    `address_neighborhood` VARCHAR(191) NOT NULL,
    `address_city` VARCHAR(191) NOT NULL,
    `address_state` VARCHAR(191) NOT NULL,
    `address_cep` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` VARCHAR(191) NOT NULL,
    `removed_at` DATETIME(3) NOT NULL,
    `removed_by` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
