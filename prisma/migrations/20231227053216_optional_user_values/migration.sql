-- AlterTable
ALTER TABLE `User` MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `updated_by` VARCHAR(191) NULL,
    MODIFY `removed_at` DATETIME(3) NULL,
    MODIFY `removed_by` VARCHAR(191) NULL;
